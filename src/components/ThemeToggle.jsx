import React, { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Sun, Moon } from 'lucide-react';
import { useTheme } from 'next-themes';

/** Inline square toggle that sits in the nav bar. Hard edges, no shadow. */
const ThemeToggle = () => {
  const { resolvedTheme, setTheme } = useTheme();
  const [mounted, setMounted] = useState(false);

  // next-themes only knows the real theme after mount, so hold the icon back
  // for one frame rather than flashing the wrong one.
  useEffect(() => setMounted(true), []);

  const isDark = resolvedTheme === 'dark';

  // Keep the mobile browser chrome in step with the active theme.
  useEffect(() => {
    if (!mounted) return;
    const meta = document.querySelector('meta[name="theme-color"]');
    if (meta) meta.setAttribute('content', isDark ? '#0b0b0b' : '#ffffff');
  }, [isDark, mounted]);

  return (
    <button
      type="button"
      onClick={() => setTheme(isDark ? 'light' : 'dark')}
      aria-label={isDark ? 'Switch to light mode' : 'Switch to dark mode'}
      title={isDark ? 'Switch to light mode' : 'Switch to dark mode'}
      // Inherits --nav-fg so it stays visible over the always-dark intro plate.
      className="grid h-10 w-10 place-items-center border border-current/25 text-[var(--nav-fg,var(--ink))] transition-colors hover:border-current cursor-pointer"
    >
      <AnimatePresence mode="wait" initial={false}>
        {mounted && (
          <motion.span
            key={isDark ? 'moon' : 'sun'}
            initial={{ opacity: 0, rotate: -80, scale: 0.7 }}
            animate={{ opacity: 1, rotate: 0, scale: 1 }}
            exit={{ opacity: 0, rotate: 80, scale: 0.7 }}
            transition={{ duration: 0.2 }}
            className="grid place-items-center"
          >
            {isDark ? <Moon className="h-[18px] w-[18px]" /> : <Sun className="h-[18px] w-[18px]" />}
          </motion.span>
        )}
      </AnimatePresence>
    </button>
  );
};

export default ThemeToggle;
