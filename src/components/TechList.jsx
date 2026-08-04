import React from 'react';
import { techIcons } from '../lib/tech-icons';

/**
 * Inline icon + label row for a project's stack. Deliberately unboxed — no
 * pills or borders, so it reads as a caption rather than a row of buttons.
 */
const TechList = ({ items = [], className = '', size = 'sm' }) => {
  const text = size === 'sm' ? 'text-[13px]' : 'text-sm';
  const icon = size === 'sm' ? 'text-[15px]' : 'text-base';

  return (
    <ul className={`flex flex-wrap items-center gap-x-4 gap-y-2 ${className}`}>
      {items.map((tech) => (
        <li key={tech} className={`flex items-center gap-1.5 text-subtle ${text}`}>
          <span className={`${icon} text-ink/70`} aria-hidden="true">
            {techIcons[tech] ?? null}
          </span>
          {tech}
        </li>
      ))}
    </ul>
  );
};

export default TechList;
