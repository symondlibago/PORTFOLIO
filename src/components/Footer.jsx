import React from 'react';
import { useLenis } from 'lenis/react';
import { ArrowUp } from 'lucide-react';

const Footer = () => {
  const lenis = useLenis();
  const toTop = () => {
    if (lenis) lenis.scrollTo(0, { duration: 1.4 });
    else window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer className="py-12 md:py-16">
      <div className="mx-auto max-w-[1600px] px-5 md:px-8">
        {/* Oversized wordmark as the sign-off, cropped by the section edge. */}
        <div className="mb-12 overflow-hidden">
          <p className="font-display text-[19vw] font-bold uppercase leading-[0.8] tracking-tight text-ink">
            Symond
          </p>
        </div>

        <div className="flex flex-col gap-6 border-t border-line pt-8 sm:flex-row sm:items-center sm:justify-between">
          <p className="text-sm text-subtle">
            © {new Date().getFullYear()} Symond Libago. All rights reserved.
          </p>
          <div className="flex items-center gap-8">
            <a
              href="mailto:libago.symond1@gmail.com"
              className="font-display text-[11px] font-semibold uppercase tracking-[0.2em] text-ink transition-opacity hover:opacity-60"
            >
              Email
            </a>
            <button
              onClick={toTop}
              className="group inline-flex items-center gap-2 font-display text-[11px] font-semibold uppercase tracking-[0.2em] text-ink transition-opacity hover:opacity-60 cursor-pointer"
            >
              Back to top
              <ArrowUp className="h-3.5 w-3.5 transition-transform duration-300 group-hover:-translate-y-1" />
            </button>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
