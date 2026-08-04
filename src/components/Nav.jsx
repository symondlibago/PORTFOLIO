import React, { useEffect, useState } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { motion, AnimatePresence, useReducedMotion } from 'framer-motion';
import { useLenis } from 'lenis/react';
import { Menu, X } from 'lucide-react';
import ThemeToggle from './ThemeToggle';

const LINKS = [
  { label: 'Work', to: '/', hash: 'work' },
  { label: 'About', to: '/', hash: 'about' },
  { label: 'Stack', to: '/', hash: 'stack' },
  { label: 'Contact', to: '/', hash: 'contact' },
];

/**
 * Slim fixed header. Borrows the Ryse structure: wordmark centred, compact
 * uppercase links either side, hairline rule under everything, no shadow.
 */
const Nav = () => {
  const lenis = useLenis();
  const location = useLocation();
  const navigate = useNavigate();
  const prefersReduced = useReducedMotion();
  const [open, setOpen] = useState(false);
  const [solid, setSolid] = useState(false);

  // While the always-dark intro covers the viewport, the nav has to render
  // light regardless of theme — in light mode its ink is near-black and would
  // be invisible against the plate.
  const [overIntro, setOverIntro] = useState(false);

  useEffect(() => {
    const onScroll = () => {
      setSolid(window.scrollY > 24);
      const introActive =
        location.pathname === '/' && !prefersReduced &&
        window.scrollY < window.innerHeight * 1.35 * 0.82;
      setOverIntro(introActive);
    };
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    window.addEventListener('resize', onScroll);
    return () => {
      window.removeEventListener('scroll', onScroll);
      window.removeEventListener('resize', onScroll);
    };
  }, [location.pathname, prefersReduced]);

  // Close the mobile sheet whenever the route changes.
  useEffect(() => setOpen(false), [location.pathname]);

  const go = (hash) => {
    setOpen(false);
    if (location.pathname !== '/') {
      navigate('/', { state: { scrollTo: hash } });
      return;
    }
    const el = document.getElementById(hash);
    if (!el) return;
    if (lenis) lenis.scrollTo(el, { duration: 1.2, offset: -72 });
    else el.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <header
      // Above the intro overlay (z-40) so the wordmark and theme toggle stay
      // reachable while the particle portrait is on screen.
      className={`fixed inset-x-0 top-0 z-50 border-b transition-colors duration-300 ${
        solid && !overIntro ? 'border-line bg-surface/85 backdrop-blur-md' : 'border-transparent bg-transparent'
      } ${overIntro ? '[--nav-fg:#ffffff]' : '[--nav-fg:var(--ink)]'}`}
    >
      <nav className="mx-auto flex h-16 max-w-[1600px] items-center justify-between px-5 md:px-8">
        {/* Left: primary links (desktop) */}
        <div className="hidden flex-1 items-center gap-7 md:flex">
          {LINKS.map((l) => (
            <button
              key={l.label}
              onClick={() => go(l.hash)}
              className="group relative font-display text-[13px] font-semibold uppercase tracking-[0.14em] transition-opacity hover:opacity-60 cursor-pointer text-[var(--nav-fg)]"
            >
              {l.label}
              <span className="absolute -bottom-1 left-0 h-px w-0 bg-[var(--nav-fg)] transition-all duration-300 group-hover:w-full" />
            </button>
          ))}
        </div>

        {/* Centre: wordmark */}
        <Link
          to="/"
          className="font-display text-2xl font-bold uppercase tracking-[0.3em] text-[var(--nav-fg)] md:flex-none"
        >
          Symond
        </Link>

        {/* Right: theme + mobile trigger */}
        <div className="flex flex-1 items-center justify-end gap-3">
          <ThemeToggle />
          <button
            type="button"
            aria-label={open ? 'Close menu' : 'Open menu'}
            onClick={() => setOpen((v) => !v)}
            className="grid h-10 w-10 place-items-center border border-line text-[var(--nav-fg)] transition-colors hover:border-ink md:hidden cursor-pointer"
          >
            {open ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
          </button>
        </div>
      </nav>

      <AnimatePresence>
        {open && (
          <motion.div
            initial={prefersReduced ? false : { height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={prefersReduced ? undefined : { height: 0, opacity: 0 }}
            transition={{ duration: 0.32, ease: [0.16, 1, 0.3, 1] }}
            className="overflow-hidden border-t border-line bg-surface md:hidden"
          >
            <div className="flex flex-col px-5 py-4">
              {LINKS.map((l) => (
                <button
                  key={l.label}
                  onClick={() => go(l.hash)}
                  className="border-b border-line py-4 text-left font-display text-xl font-semibold uppercase tracking-[0.12em] text-ink last:border-0 cursor-pointer"
                >
                  {l.label}
                </button>
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
};

export default Nav;
