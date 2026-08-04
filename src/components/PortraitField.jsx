import React, { useEffect, useRef } from 'react';
import * as THREE from 'three';
import portrait from '../assets/pics.avif';
import { ICON_PATHS, CLOUD_ITEMS } from '../lib/icon-cloud';

/**
 * Particle point-cloud portrait, Epiminds-style.
 *
 * How it works: the photo is drawn to an offscreen canvas, downsampled, and one
 * particle is emitted per surviving pixel. Luminance drives BOTH which pixels
 * survive and how far each sits along Z — so the lit face pushes forward in
 * relief while the dark background and suit fall below threshold and simply
 * never become particles. That is the background removal: no cutout, no model,
 * just a brightness gate, which is also why the body dissolves into the dark
 * the same way the reference does.
 *
 * Pointer repulsion and the scroll scatter both run in the vertex shader, so
 * moving tens of thousands of points stays on the GPU.
 */

const VERT = `
  attribute float aLum;
  attribute vec3 aRand;
  uniform vec2 uPointer;
  uniform float uTime;
  uniform float uScroll;
  uniform float uSize;
  varying float vLum;
  varying float vFade;

  void main() {
    vLum = aLum;
    vec3 pos = position;

    // Idle drift so the cloud is never completely static.
    pos.x += sin(uTime * 0.6 + aRand.x * 6.2831) * 0.012;
    pos.y += cos(uTime * 0.5 + aRand.y * 6.2831) * 0.012;
    pos.z += sin(uTime * 0.4 + aRand.z * 6.2831) * 0.02;

    // Pointer repulsion — particles part around the cursor.
    vec2 d = pos.xy - uPointer;
    float dist = length(d);
    float influence = smoothstep(0.55, 0.0, dist);
    pos.xy += normalize(d + 1e-5) * influence * 0.16;
    pos.z += influence * 0.12;

    // Scroll scatter: the cloud blows apart as the intro hands off.
    pos += aRand * uScroll * 2.4;

    vFade = 1.0 - smoothstep(0.55, 1.0, uScroll);

    vec4 mv = modelViewMatrix * vec4(pos, 1.0);
    // uSize carries the real projected size of one sample cell (see JS), so a
    // point covers roughly the pixel it came from instead of a magic constant.
    // Size barely tracks luminance — when bright points were also much larger
    // AND additively blended, the rim highlight fused into a white blob.
    gl_PointSize = uSize * (0.85 + aLum * 0.3) / -mv.z;
    gl_Position = projectionMatrix * mv;
  }
`;

const FRAG = `
  uniform vec3 uColor;
  uniform vec3 uHot;
  varying float vLum;
  varying float vFade;

  void main() {
    // Round, soft-edged point.
    vec2 c = gl_PointCoord - vec2(0.5);
    float d = length(c);
    if (d > 0.5) discard;
    float alpha = smoothstep(0.5, 0.05, d);

    // Highlight rolloff. The rim light on the right cheek is far brighter than
    // anything else in the photo, so its tint and alpha are both compressed —
    // otherwise additive blending stacks it into a solid white patch.
    float hot = smoothstep(0.45, 0.95, vLum) * 0.55;
    vec3 col = mix(uColor, uHot, hot);
    float a = 0.30 + (1.0 - exp(-vLum * 1.7)) * 0.6;
    gl_FragColor = vec4(col, alpha * a * vFade);
  }
`;

/**
 * Rasterise each stack icon and scatter its filled pixels into a small particle
 * cluster, positioned around the portrait. Same shader as the face, so they
 * share the scatter, the pointer response and the theme tint for free.
 */
async function buildIconCloud() {
  const size = 44; // sampling resolution per icon
  const canvas = document.createElement('canvas');
  canvas.width = size;
  canvas.height = size;
  const ctx = canvas.getContext('2d', { willReadFrequently: true });

  const positions = [];
  const lums = [];
  const rands = [];

  for (const item of CLOUD_ITEMS) {
    const path = ICON_PATHS[item.key];
    if (!path) continue;

    const svg =
      `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="${size}" height="${size}">` +
      `<path fill="#fff" d="${path}"/></svg>`;
    const img = new Image();
    img.src = `data:image/svg+xml;utf8,${encodeURIComponent(svg)}`;
    try {
      await img.decode();
    } catch {
      continue; // a malformed path just means one fewer icon
    }

    ctx.clearRect(0, 0, size, size);
    ctx.drawImage(img, 0, 0, size, size);
    const { data } = ctx.getImageData(0, 0, size, size);

    for (let y = 0; y < size; y++) {
      for (let x = 0; x < size; x++) {
        const i = (y * size + x) * 4;
        if (data[i + 3] < 40) continue; // transparent — no particle
        const px = item.x + (x / size - 0.5) * item.s;
        const py = item.y - (y / size - 0.5) * item.s;
        positions.push(px, py, item.z);
        lums.push(0.42); // dim and uniform: background furniture, not the subject
        rands.push(
          (Math.random() - 0.5) * 2,
          (Math.random() - 0.5) * 2,
          (Math.random() - 0.5) * 2
        );
      }
    }
  }

  if (!lums.length) return null;
  const geo = new THREE.BufferGeometry();
  geo.setAttribute('position', new THREE.Float32BufferAttribute(positions, 3));
  geo.setAttribute('aLum', new THREE.Float32BufferAttribute(lums, 1));
  geo.setAttribute('aRand', new THREE.Float32BufferAttribute(rands, 3));
  return geo;
}

/**
 * Crop (as fractions of the source) framing head and shoulders. Measured from
 * the photo: the subject spans x 0.30–0.91 and its brightest band — the face —
 * sits at y ≈ 0.27. Cropping here gives the close-up the reference uses instead
 * of a small half-body floating mid-frame.
 */
const CROP = { x: 0.26, y: 0.01, w: 0.70, h: 0.47 };

/** Decode the portrait and turn surviving pixels into particle attributes. */
async function buildGeometry(sampleWidth, threshold) {
  const img = new Image();
  img.src = portrait;
  img.crossOrigin = 'anonymous';
  await img.decode();

  const sx = img.naturalWidth * CROP.x;
  const sy = img.naturalHeight * CROP.y;
  const sw = img.naturalWidth * CROP.w;
  const sh = img.naturalHeight * CROP.h;

  const w = sampleWidth;
  const h = Math.round(w * (sh / sw));

  const canvas = document.createElement('canvas');
  canvas.width = w;
  canvas.height = h;
  const ctx = canvas.getContext('2d', { willReadFrequently: true });
  ctx.drawImage(img, sx, sy, sw, sh, 0, 0, w, h);
  const { data } = ctx.getImageData(0, 0, w, h);

  const positions = [];
  const lums = [];
  const rands = [];
  const aspect = w / h;
  const HEIGHT = 3.0;            // world height of the portrait
  const WIDTH = HEIGHT * aspect;

  for (let y = 0; y < h; y++) {
    for (let x = 0; x < w; x++) {
      const i = (y * w + x) * 4;
      // Rec. 601 luma — closer to perceived brightness than a flat average.
      const lum = (0.299 * data[i] + 0.587 * data[i + 1] + 0.114 * data[i + 2]) / 255;
      if (lum < threshold) continue; // background + dark suit never emit a particle

      const px = (x / w - 0.5) * WIDTH;
      const py = -(y / h - 0.5) * HEIGHT;
      const pz = (lum - threshold) * 1.5;   // brightness becomes relief depth

      positions.push(px, py, pz);
      lums.push(lum);
      rands.push(
        (Math.random() - 0.5) * 2,
        (Math.random() - 0.5) * 2,
        (Math.random() - 0.5) * 2
      );
    }
  }

  // Most of the frame is below threshold, so the surviving cloud is much
  // smaller than the source rectangle. Fit it to the viewport by its ACTUAL
  // bounds, otherwise the subject floats tiny in the middle.
  let minX = Infinity, maxX = -Infinity, minY = Infinity, maxY = -Infinity;
  for (let i = 0; i < positions.length; i += 3) {
    if (positions[i] < minX) minX = positions[i];
    if (positions[i] > maxX) maxX = positions[i];
    if (positions[i + 1] < minY) minY = positions[i + 1];
    if (positions[i + 1] > maxY) maxY = positions[i + 1];
  }
  const cx = (minX + maxX) / 2;
  const cy = (minY + maxY) / 2;
  const TARGET_H = 3.4;
  const fit = TARGET_H / Math.max(maxY - minY, 1e-6);
  for (let i = 0; i < positions.length; i += 3) {
    positions[i] = (positions[i] - cx) * fit;
    positions[i + 1] = (positions[i + 1] - cy) * fit;
    positions[i + 2] *= fit;
  }

  const geo = new THREE.BufferGeometry();
  geo.setAttribute('position', new THREE.Float32BufferAttribute(positions, 3));
  geo.setAttribute('aLum', new THREE.Float32BufferAttribute(lums, 1));
  geo.setAttribute('aRand', new THREE.Float32BufferAttribute(rands, 3));
  // World-space gap between adjacent samples — the shader turns this into a
  // projected pixel size so points tile the portrait instead of merging.
  return { geo, count: lums.length, spacing: (HEIGHT / h) * fit };
}

const PortraitField = ({ progressRef }) => {
  const mountRef = useRef(null);

  useEffect(() => {
    const mount = mountRef.current;
    if (!mount) return undefined;

    let disposed = false;
    let raf = 0;
    let renderer;
    let geo;
    let material;
    let iconMaterial;
    let iconGeoRef;

    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(45, mount.clientWidth / mount.clientHeight, 0.1, 100);
    camera.position.z = 4.6;

    // Pinned, not theme-read: the plate is always dark, so the cloud should
    // look identical in both themes rather than dimming to the light-mode brand.
    const readVar = () => new THREE.Color('#a78bfa');
    // The intro plate is always dark (see PortraitIntro), so the cloud is
    // always rendered for a dark backdrop regardless of the site theme.
    const isDark = () => true;

    const pointer = { x: 0, y: 0, tx: 0, ty: 0 };

    /**
     * Convert the world gap between samples into the gl_PointSize numerator.
     * A point at depth z should span spacing/visibleHeight(z) of the canvas;
     * visibleHeight(z) = 2*tan(fov/2)*z, so the z terms cancel into a constant
     * the shader divides by -mv.z. Slight overlap (1.35) hides sampling gaps.
     */
    const pointScale = (spacing) => {
      const dpr = Math.min(window.devicePixelRatio || 1, 2);
      const canvasH = mount.clientHeight * dpr;
      const fov = (camera.fov * Math.PI) / 180;
      return (spacing * canvasH) / (2 * Math.tan(fov / 2)) * 1.35;
    };

    (async () => {
      // Fewer samples on small screens — this is per-pixel work.
      const sampleWidth = window.innerWidth < 768 ? 200 : 330;
      const built = await buildGeometry(sampleWidth, 0.17);
      if (disposed) return;
      geo = built.geo;

      renderer = new THREE.WebGLRenderer({ alpha: true, antialias: true, powerPreference: 'high-performance' });
      renderer.setPixelRatio(Math.min(window.devicePixelRatio || 1, 2));
      renderer.setSize(mount.clientWidth, mount.clientHeight);
      renderer.setClearColor(0x000000, 0);
      mount.appendChild(renderer.domElement);

      material = new THREE.ShaderMaterial({
        vertexShader: VERT,
        fragmentShader: FRAG,
        transparent: true,
        depthWrite: false,
        blending: isDark() ? THREE.AdditiveBlending : THREE.NormalBlending,
        uniforms: {
          uPointer: { value: new THREE.Vector2(999, 999) },
          uTime: { value: 0 },
          uScroll: { value: 0 },
          // Projected size of one sample cell, in device px, at unit distance.
          // gl_PointSize divides this by view depth, so points stay ~1 cell
          // wide however far the camera dollies in.
          uSize: { value: pointScale(built.spacing) },
          uColor: { value: readVar('--brand', '#a78bfa') },
          uHot: { value: isDark() ? new THREE.Color('#ffffff') : readVar('--ink', '#040404') },
        },
      });

      const points = new THREE.Points(geo, material);
      scene.add(points);

      // Stack-icon clusters drifting behind the portrait. Smaller points and
      // their own material so they can be dimmer than the face.
      const iconGeo = await buildIconCloud();
      iconGeoRef = iconGeo;
      let iconPoints = null;
      if (iconGeo && !disposed) {
        iconMaterial = material.clone();
        iconMaterial.uniforms = THREE.UniformsUtils.clone(material.uniforms);
        iconMaterial.uniforms.uSize.value = pointScale(built.spacing) * 0.8;
        iconPoints = new THREE.Points(iconGeo, iconMaterial);
        scene.add(iconPoints);
      }

      const applyTheme = () => {
        material.uniforms.uColor.value = readVar('--brand', '#a78bfa');
        material.uniforms.uHot.value = isDark() ? new THREE.Color('#ffffff') : readVar('--ink', '#040404');
        material.blending = isDark() ? THREE.AdditiveBlending : THREE.NormalBlending;
        material.needsUpdate = true;
      };
      const obs = new MutationObserver(applyTheme);
      obs.observe(document.documentElement, { attributes: true, attributeFilter: ['class'] });

      const onPointer = (e) => {
        // Convert to the same world units the particles live in.
        const r = mount.getBoundingClientRect();
        const nx = ((e.clientX - r.left) / r.width) * 2 - 1;
        const ny = -(((e.clientY - r.top) / r.height) * 2 - 1);
        const vFov = (camera.fov * Math.PI) / 180;
        const hWorld = 2 * Math.tan(vFov / 2) * camera.position.z;
        pointer.tx = nx * (hWorld * camera.aspect) / 2;
        pointer.ty = ny * hWorld / 2;
      };
      const onResize = () => {
        if (!renderer) return;
        camera.aspect = mount.clientWidth / mount.clientHeight;
        camera.updateProjectionMatrix();
        renderer.setSize(mount.clientWidth, mount.clientHeight);
        material.uniforms.uSize.value = pointScale(built.spacing);
      };

      const clock = new THREE.Clock();
      const tick = () => {
        if (disposed) return;
        const t = clock.getElapsedTime();
        const p = progressRef?.current ?? 0;

        pointer.x += (pointer.tx - pointer.x) * 0.06;
        pointer.y += (pointer.ty - pointer.y) * 0.06;

        material.uniforms.uTime.value = t;
        material.uniforms.uScroll.value = p;
        material.uniforms.uPointer.value.set(pointer.x, pointer.y);
        if (iconMaterial) {
          iconMaterial.uniforms.uTime.value = t;
          iconMaterial.uniforms.uScroll.value = p;
          iconMaterial.uniforms.uPointer.value.set(pointer.x, pointer.y);
          iconMaterial.uniforms.uColor.value = material.uniforms.uColor.value;
          iconMaterial.uniforms.uHot.value = material.uniforms.uHot.value;
        }

        // Dolly in as the intro hands off, and drift with the cursor.
        camera.position.z = 4.6 - p * 3.1;
        camera.position.x += (pointer.x * 0.14 - camera.position.x) * 0.05;
        camera.position.y += (pointer.y * 0.14 - camera.position.y) * 0.05;
        camera.lookAt(0, 0, 0);

        // Fully scattered: skip the draw but keep looping so scrolling back
        // up re-assembles instantly.
        if (p < 0.999) renderer.render(scene, camera);
        raf = requestAnimationFrame(tick);
      };

      window.addEventListener('pointermove', onPointer, { passive: true });
      window.addEventListener('resize', onResize);
      tick();

      mount._cleanup = () => {
        obs.disconnect();
        window.removeEventListener('pointermove', onPointer);
        window.removeEventListener('resize', onResize);
      };
    })();

    return () => {
      disposed = true;
      cancelAnimationFrame(raf);
      mount._cleanup?.();
      geo?.dispose();
      iconGeoRef?.dispose();
      material?.dispose();
      iconMaterial?.dispose();
      if (renderer) {
        renderer.dispose();
        if (renderer.domElement.parentNode === mount) mount.removeChild(renderer.domElement);
      }
    };
  }, [progressRef]);

  return <div ref={mountRef} aria-hidden="true" className="h-full w-full" />;
};

export default PortraitField;
