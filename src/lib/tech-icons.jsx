import React from 'react';
import {
  SiReact, SiLaravel, SiTailwindcss, SiMysql, SiJavascript, SiNodedotjs,
  SiHtml5, SiCss3, SiPhp, SiMui, SiAmazons3, SiAstro, SiTypescript, SiGit,
} from 'react-icons/si';
import { Globe, Cpu } from 'lucide-react';

/**
 * Single source of truth for tech-stack icons. Lives outside components/ so the
 * file exports only data — react-refresh warns when a module mixes component
 * and non-component exports.
 */
export const techIcons = {
  React: <SiReact />,
  'React JS': <SiReact />,
  Laravel: <SiLaravel />,
  'Tailwind CSS': <SiTailwindcss />,
  MySQL: <SiMysql />,
  JavaScript: <SiJavascript />,
  'Node.js': <SiNodedotjs />,
  HTML: <SiHtml5 />,
  CSS: <SiCss3 />,
  PHP: <SiPhp />,
  MUI: <SiMui />,
  'S3 Bucket': <SiAmazons3 />,
  Astro: <SiAstro />,
  TypeScript: <SiTypescript />,
  Git: <SiGit />,
  'REST APIs': <Globe />,
  'Responsive Design': <Cpu />,
};

export default techIcons;
