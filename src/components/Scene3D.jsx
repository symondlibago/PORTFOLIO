import React, { useEffect, useRef } from 'react';
import * as THREE from 'three';

/**
 * Persistent 3D object living behind the whole page.
 *
 * The canvas is fixed and full-viewport; the knot travels from the top of the
 * screen to the bottom as overall scroll progress goes 0 -> 1, weaving between
 * the left and right margins so it stays out from behind the text column.
 *
 * Raw three.js rather than @react-three/fiber + drei: this needs one mesh and
 * three lights, and the R3F/drei pair would add far more bundle than the whole
 * effect is worth. Lazy-loaded by the parent so three never lands in the
 * initial chunk.
 */
const Scene3D = () => {
  const mountRef = useRef(null);

  useEffect(() => {
    const mount = mountRef.current;
    if (!mount) return undefined;

    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(45, mount.clientWidth / mount.clientHeight, 0.1, 100);
    camera.position.z = 7;

    const renderer = new THREE.WebGLRenderer({ alpha: true, antialias: true, powerPreference: 'low-power' });
    renderer.setPixelRatio(Math.min(window.devicePixelRatio || 1, 2));
    renderer.setSize(mount.clientWidth, mount.clientHeight);
    renderer.setClearColor(0x000000, 0);
    mount.appendChild(renderer.domElement);

    const readBrand = () => {
      const hex = getComputedStyle(document.documentElement).getPropertyValue('--brand').trim();
      return new THREE.Color(hex || '#a855f7');
    };
    const isDark = () => document.documentElement.classList.contains('dark');

    // Solid shaded body plus a wireframe shell sitting just outside it — the
    // double layer is what makes it read as "technical" rather than a blob.
    const geometry = new THREE.TorusKnotGeometry(1.45, 0.42, 220, 32);
    const material = new THREE.MeshStandardMaterial({
      color: readBrand(),
      roughness: 0.28,
      metalness: 0.75,
      transparent: true,
      opacity: 0.34,
    });
    const mesh = new THREE.Mesh(geometry, material);

    const wireMaterial = new THREE.MeshBasicMaterial({
      color: readBrand(),
      wireframe: true,
      transparent: true,
      opacity: 0.11,
    });
    const wireMesh = new THREE.Mesh(geometry, wireMaterial);
    wireMesh.scale.setScalar(1.06);

    const group = new THREE.Group();
    group.add(mesh);
    group.add(wireMesh);
    scene.add(group);

    const ambient = new THREE.AmbientLight(0xffffff, isDark() ? 0.5 : 1.1);
    const key = new THREE.PointLight(readBrand(), 55, 60);
    key.position.set(5, 4, 6);
    const rim = new THREE.PointLight(0xffffff, 22, 60);
    rim.position.set(-6, -3, 4);
    scene.add(ambient, key, rim);

    const applyTheme = () => {
      const c = readBrand();
      material.color.copy(c);
      wireMaterial.color.copy(c);
      key.color.copy(c);
      ambient.intensity = isDark() ? 0.5 : 1.1;
      // Kept low on purpose: this is atmosphere behind body copy, so it has to
      // lose every legibility contest with the text in front of it.
      material.opacity = isDark() ? 0.34 : 0.26;
      wireMaterial.opacity = isDark() ? 0.11 : 0.16;
    };
    const themeObserver = new MutationObserver(applyTheme);
    themeObserver.observe(document.documentElement, { attributes: true, attributeFilter: ['class'] });

    let progress = 0;
    let targetProgress = 0;
    const pointer = { x: 0, y: 0, tx: 0, ty: 0 };

    const onScroll = () => {
      const max = document.documentElement.scrollHeight - window.innerHeight;
      targetProgress = max > 0 ? Math.min(1, Math.max(0, window.scrollY / max)) : 0;
    };
    const onPointer = (e) => {
      pointer.tx = (e.clientX / window.innerWidth) * 2 - 1;
      pointer.ty = (e.clientY / window.innerHeight) * 2 - 1;
    };
    const onResize = () => {
      camera.aspect = mount.clientWidth / mount.clientHeight;
      camera.updateProjectionMatrix();
      renderer.setSize(mount.clientWidth, mount.clientHeight);
    };

    let raf = 0;
    let running = true;
    const clock = new THREE.Clock();

    const animate = () => {
      if (!running) return;
      const t = clock.getElapsedTime();

      // Ease toward the real scroll value so Lenis' smoothing isn't doubled up
      // into something laggy.
      progress += (targetProgress - progress) * 0.06;
      pointer.x += (pointer.tx - pointer.x) * 0.04;
      pointer.y += (pointer.ty - pointer.y) * 0.04;

      // Travel top -> bottom across the page, weaving between the right and
      // left margins so it stays out from behind the main text column.
      group.position.y = 2.9 - progress * 5.8;
      group.position.x = 2.5 * Math.cos(progress * Math.PI * 1.6) + pointer.x * 0.3;
      group.rotation.y = t * 0.14 + progress * Math.PI * 2.2;
      group.rotation.x = t * 0.09 + progress * Math.PI * 0.9 + pointer.y * 0.18;
      group.scale.setScalar(0.62 + Math.sin(progress * Math.PI) * 0.18);

      renderer.render(scene, camera);
      raf = requestAnimationFrame(animate);
    };

    const onVisibility = () => {
      running = !document.hidden;
      if (running) { clock.getDelta(); raf = requestAnimationFrame(animate); }
      else cancelAnimationFrame(raf);
    };

    applyTheme();
    onScroll();
    progress = targetProgress;
    animate();

    window.addEventListener('scroll', onScroll, { passive: true });
    window.addEventListener('resize', onResize);
    window.addEventListener('pointermove', onPointer, { passive: true });
    document.addEventListener('visibilitychange', onVisibility);

    return () => {
      running = false;
      cancelAnimationFrame(raf);
      window.removeEventListener('scroll', onScroll);
      window.removeEventListener('resize', onResize);
      window.removeEventListener('pointermove', onPointer);
      document.removeEventListener('visibilitychange', onVisibility);
      themeObserver.disconnect();
      geometry.dispose();
      material.dispose();
      wireMaterial.dispose();
      renderer.dispose();
      if (renderer.domElement.parentNode === mount) mount.removeChild(renderer.domElement);
    };
  }, []);

  return <div ref={mountRef} aria-hidden="true" className="h-full w-full" />;
};

export default Scene3D;
