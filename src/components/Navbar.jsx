import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

// ---- Theme (matches Preloader) -----------------------------------------
const THEME = {
  bg: '#2A0406',                    // deep dark red
  bgDeep: '#0E0102',                // near-black red
  fill: '#FCEBEC',                  // soft cream
  dim: 'rgba(252,235,236,0.65)',
  accent: '#FF3B47',                // vivid red
  accentSoft: 'rgba(255,59,71,0.35)',
};

const EASE = [0.22, 1, 0.36, 1];

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 40);
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Lock body scroll while drawer is open
  useEffect(() => {
    document.body.style.overflow = isOpen ? 'hidden' : '';
    return () => {
      document.body.style.overflow = '';
    };
  }, [isOpen]);

  const navLinks = [
    'Home',
    'About',
    'Expertise',
    'Skills',
    'Projects', 
    'Contact',
  ];

  return (
    <motion.nav
      initial={{ y: -80, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.9, ease: EASE, delay: 0.2 }}
      className="fixed top-0 left-0 w-full z-50"
    >
      {/* Backdrop layer */}
      <div
        className={`absolute inset-0 transition-all duration-500 ${
          isScrolled
            ? 'backdrop-blur-xl border-b'
            : 'backdrop-blur-0'
        }`}
        style={{
          backgroundColor: isScrolled
            ? 'rgba(42,4,6,0.72)'
            : 'transparent',
          borderColor: isScrolled ? 'rgba(255,59,71,0.18)' : 'transparent',
          boxShadow: isScrolled
            ? '0 8px 40px rgba(0,0,0,0.45)'
            : 'none',
        }}
      />

      {/* Subtle red glow on scroll */}
      {isScrolled && (
        <div
          className="pointer-events-none absolute inset-x-0 -bottom-px h-px"
          style={{
            background: `linear-gradient(90deg, transparent, ${THEME.accentSoft}, transparent)`,
          }}
        />
      )}

      <div className="relative max-w-7xl mx-auto px-6 md:px-12">
        <div
          className={`flex justify-between items-center transition-all duration-500 ${
            isScrolled ? 'py-3' : 'py-5'
          }`}
        >
          {/* ---- Logo ---- */}
          <a
            href="#"
            className="relative text-2xl font-black tracking-tight group"
            style={{ color: THEME.fill }}
          >
            <span className="relative z-10">
              Rohit{' '}
              <span style={{ color: THEME.accent }}>.</span>
            </span>
            {/* Hover glow */}
            <span
              className="absolute inset-0 -z-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 blur-lg"
              style={{ background: THEME.accentSoft, borderRadius: '999px' }}
            />
          </a>

          {/* ---- Desktop Links ---- */}
          <div className="hidden md:flex items-center gap-7 lg:gap-8">
            {navLinks.map((link, i) => (
              <motion.a
                key={link}
                href={`#${link.toLowerCase()}`}
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.3 + i * 0.05, duration: 0.6, ease: EASE }}
                className="group relative font-semibold text-sm tracking-wide transition-colors duration-300"
                style={{ color: THEME.dim }}
                onMouseEnter={(e) => (e.currentTarget.style.color = THEME.fill)}
                onMouseLeave={(e) => (e.currentTarget.style.color = THEME.dim)}
              >
                {link}
                {/* Animated underline */}
                <span
                  className="absolute -bottom-1 left-0 w-0 h-[2px] transition-all duration-300 group-hover:w-full rounded-full"
                  style={{
                    background: `linear-gradient(90deg, ${THEME.accent}, #FF7A82)`,
                    boxShadow: `0 0 8px ${THEME.accentSoft}`,
                  }}
                />
                {/* Glow dot on hover */}
                <span
                  className="absolute -bottom-[6px] left-1/2 -translate-x-1/2 w-1 h-1 rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                  style={{
                    background: THEME.accent,
                    boxShadow: `0 0 10px ${THEME.accent}`,
                  }}
                />
              </motion.a>
            ))}
          </div>

          {/* ---- Desktop CTA ---- */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.6, duration: 0.7, ease: EASE }}
            className="hidden md:block"
          >
            <a
              href="#contact"
              className="group relative inline-flex items-center gap-2 px-6 py-2.5 rounded-full text-sm font-black overflow-hidden transition-transform duration-300 hover:scale-[1.03]"
              style={{
                background: `linear-gradient(135deg, ${THEME.accent}, #C81E2A)`,
                color: THEME.fill,
                boxShadow: `0 8px 24px rgba(255,59,71,0.28)`,
              }}
            >
              {/* Shine sweep */}
              <span
                className="absolute inset-y-0 -left-1/3 w-1/3 -skew-x-12 opacity-0 group-hover:opacity-100 group-hover:left-[120%] transition-all duration-700"
                style={{
                  background:
                    'linear-gradient(90deg, transparent, rgba(255,255,255,0.35), transparent)',
                }}
              />
              <span className="relative z-10">Hire Me</span>
              <svg
                className="relative z-10 w-4 h-4 transition-transform duration-300 group-hover:translate-x-1"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2.5"
                  d="M5 12h14M13 5l7 7-7 7"
                />
              </svg>
            </a>
          </motion.div>

          {/* ---- Mobile Hamburger ---- */}
          <button
            onClick={() => setIsOpen(!isOpen)}
            aria-label="Toggle navigation menu"
            className="md:hidden relative w-11 h-11 flex items-center justify-center rounded-full transition-all duration-300"
            style={{
              background: isOpen
                ? 'rgba(255,59,71,0.18)'
                : 'rgba(252,235,236,0.06)',
              border: `1px solid ${
                isOpen ? THEME.accentSoft : 'rgba(252,235,236,0.12)'
              }`,
              color: THEME.fill,
            }}
          >
            <div className="relative w-5 h-5">
              <span
                className="absolute left-0 right-0 h-[2px] rounded-full transition-all duration-300"
                style={{
                  top: isOpen ? '50%' : '20%',
                  transform: isOpen
                    ? 'translateY(-50%) rotate(45deg)'
                    : 'translateY(-50%)',
                  background: isOpen ? THEME.accent : THEME.fill,
                }}
              />
              <span
                className="absolute left-0 right-0 h-[2px] rounded-full transition-all duration-300"
                style={{
                  top: '50%',
                  transform: 'translateY(-50%)',
                  opacity: isOpen ? 0 : 1,
                  background: THEME.fill,
                }}
              />
              <span
                className="absolute left-0 right-0 h-[2px] rounded-full transition-all duration-300"
                style={{
                  top: isOpen ? '50%' : '80%',
                  transform: isOpen
                    ? 'translateY(-50%) rotate(-45deg)'
                    : 'translateY(-50%)',
                  background: isOpen ? THEME.accent : THEME.fill,
                }}
              />
            </div>
          </button>
        </div>
      </div>

      {/* ---- Mobile Drawer ---- */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            key="mobile-menu"
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.4, ease: EASE }}
            className="md:hidden absolute top-full left-0 w-full overflow-hidden"
            style={{
              background:
                'linear-gradient(180deg, rgba(42,4,6,0.98), rgba(14,1,2,0.99))',
              backdropFilter: 'blur(24px)',
              borderTop: `1px solid ${THEME.accentSoft}`,
              boxShadow: '0 20px 60px rgba(0,0,0,0.6)',
            }}
          >
            {/* Decorative glow */}
            <div
              className="pointer-events-none absolute inset-0 opacity-60"
              style={{
                background: `radial-gradient(circle at 50% 0%, rgba(255,59,71,0.15), transparent 60%)`,
              }}
            />

            <div className="relative flex flex-col px-6 py-6 gap-1">
              {navLinks.map((link, i) => (
                <motion.a
                  key={link}
                  href={`#${link.toLowerCase()}`}
                  onClick={() => setIsOpen(false)}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{
                    delay: 0.05 + i * 0.05,
                    duration: 0.45,
                    ease: EASE,
                  }}
                  className="group flex items-center justify-between py-3.5 border-b transition-colors"
                  style={{ borderColor: 'rgba(252,235,236,0.06)' }}
                >
                  <span
                    className="font-extrabold text-base transition-colors duration-300 group-hover:text-[color:var(--accent)]"
                    style={{ color: THEME.fill, '--accent': THEME.accent }}
                  >
                    {link}
                  </span>
                  <svg
                    className="w-4 h-4 opacity-40 transition-all duration-300 group-hover:opacity-100 group-hover:translate-x-1"
                    style={{ color: THEME.accent }}
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2.5"
                      d="M5 12h14M13 5l7 7-7 7"
                    />
                  </svg>
                </motion.a>
              ))}

              <motion.a
                href="#contact"
                onClick={() => setIsOpen(false)}
                initial={{ opacity: 0, y: 12 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.4, duration: 0.5, ease: EASE }}
                className="mt-5 inline-flex items-center justify-center gap-2 px-6 py-3.5 rounded-full font-black text-sm transition-all duration-300"
                style={{
                  background: `linear-gradient(135deg, ${THEME.accent}, #C81E2A)`,
                  color: THEME.fill,
                  boxShadow: '0 12px 30px rgba(255,59,71,0.35)',
                }}
              >
                Hire Me
                <svg
                  className="w-4 h-4"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2.5"
                    d="M5 12h14M13 5l7 7-7 7"
                  />
                </svg>
              </motion.a>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.nav>
  );
};

export default Navbar;