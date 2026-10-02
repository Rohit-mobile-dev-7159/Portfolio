import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence, animate, useMotionValue, useSpring, useTransform } from 'framer-motion';

const THEME = {
  bg: '#2A0406',
  bgDeep: '#0E0102',
  fill: '#FCEBEC',
  dim: 'rgba(252,235,236,0.12)',
  accent: '#FF3B47',
  accentSoft: 'rgba(255,59,71,0.35)',
};

const NAME = 'Rohit Kumar';
const EASE = [0.22, 1, 0.36, 1];
const EASE_IN_OUT = [0.65, 0, 0.35, 1];
const EASE_OUT_EXPO = [0.76, 0, 0.24, 1];

const Preloader = () => {
  const [isLoading, setIsLoading] = useState(true);
  const [progress, setProgress] = useState(0);
  const [hasMounted, setHasMounted] = useState(false);

  // Mouse parallax
  const mx = useMotionValue(0);
  const my = useMotionValue(0);
  const sx = useSpring(mx, { stiffness: 50, damping: 18 });
  const sy = useSpring(my, { stiffness: 50, damping: 18 });
  const ringX = useTransform(sx, (v) => v * 18);
  const ringY = useTransform(sy, (v) => v * 18);
  const contentX = useTransform(sx, (v) => v * -6);
  const contentY = useTransform(sy, (v) => v * -6);

  useEffect(() => {
    setHasMounted(true);
    const onMove = (e) => {
      const w = window.innerWidth;
      const h = window.innerHeight;
      mx.set((e.clientX - w / 2) / w);
      my.set((e.clientY - h / 2) / h);
    };
    window.addEventListener('mousemove', onMove);
    return () => window.removeEventListener('mousemove', onMove);
  }, [mx, my]);

  // Progress counter
  useEffect(() => {
    const controls = animate(0, 100, {
      duration: 1.7,
      delay: 0.55,
      ease: EASE_IN_OUT,
      onUpdate: (v) => setProgress(Math.round(v)),
    });
    return () => controls.stop();
  }, []);

  useEffect(() => {
    const t = setTimeout(() => setIsLoading(false), 2600);
    return () => clearTimeout(t);
  }, []);

  const letters = NAME.split('');

  return (
    <AnimatePresence>
      {isLoading && (
        <motion.div
          key="preloader"
          initial={{ y: 0 }}
          exit={{ y: '-100%' }}
          transition={{ duration: 1.1, ease: EASE_OUT_EXPO }}
          className="fixed inset-0 w-full h-screen z-[100000] flex items-center justify-center overflow-hidden"
          style={{ backgroundColor: THEME.bg }}
        >
          {/* Radial glow */}
          <div
            className="pointer-events-none absolute inset-0"
            style={{
              background: `radial-gradient(circle at 50% 55%, rgba(255,59,71,0.18), transparent 55%)`,
            }}
          />
          {/* Vignette */}
          <div
            className="pointer-events-none absolute inset-0"
            style={{
              background: `radial-gradient(circle at 50% 50%, transparent 35%, ${THEME.bgDeep} 120%)`,
            }}
          />
          {/* Grain */}
          <div
            className="pointer-events-none absolute inset-0 opacity-[0.08] mix-blend-overlay"
            style={{
              backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='2' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)'/%3E%3C/svg%3E")`,
            }}
          />

          {/* Scanning vertical line */}
          <motion.div
            className="pointer-events-none absolute top-0 bottom-0 w-px"
            style={{
              background: `linear-gradient(180deg, transparent, ${THEME.accentSoft}, transparent)`,
            }}
            initial={{ left: '0%', opacity: 0 }}
            animate={{ left: '100%', opacity: [0, 0.7, 0.7, 0] }}
            transition={{ duration: 2.8, delay: 0.2, ease: 'easeInOut' }}
          />

          {/* Corner brackets */}
          {[
            { pos: 'top-6 left-6 md:top-10 md:left-10', rot: 0 },
            { pos: 'top-6 right-6 md:top-10 md:right-10', rot: 90 },
            { pos: 'bottom-6 right-6 md:bottom-10 md:right-10', rot: 180 },
            { pos: 'bottom-6 left-6 md:bottom-10 md:left-10', rot: 270 },
          ].map((c, i) => (
            <motion.div
              key={i}
              className={`pointer-events-none absolute w-6 h-6 md:w-10 md:h-10 ${c.pos}`}
              style={{ rotate: c.rot }}
              initial={{ opacity: 0, scale: 0.5 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.3 + i * 0.08, duration: 0.7, ease: EASE }}
            >
              <div className="absolute top-0 left-0 w-full h-px" style={{ background: THEME.accentSoft }} />
              <div className="absolute top-0 left-0 h-full w-px" style={{ background: THEME.accentSoft }} />
            </motion.div>
          ))}

          {/* Rotating rings */}
          <motion.div
            className="pointer-events-none absolute"
            style={{ x: ringX, y: ringY }}
          >
            <svg
              viewBox="0 0 400 400"
              className="w-[440px] h-[440px] md:w-[620px] md:h-[620px]"
            >
              <defs>
                <linearGradient id="ringGrad" x1="0" y1="0" x2="1" y2="1">
                  <stop offset="0%" stopColor={THEME.accent} stopOpacity="0" />
                  <stop offset="50%" stopColor={THEME.accent} stopOpacity="0.9" />
                  <stop offset="100%" stopColor={THEME.accent} stopOpacity="0" />
                </linearGradient>
              </defs>
              <motion.circle
                cx="200" cy="200" r="175"
                fill="none"
                stroke={THEME.accentSoft}
                strokeWidth="1"
                strokeDasharray="2 10"
                animate={{ rotate: 360 }}
                transition={{ duration: 40, repeat: Infinity, ease: 'linear' }}
                style={{ transformOrigin: '200px 200px' }}
              />
              <motion.circle
                cx="200" cy="200" r="150"
                fill="none"
                stroke="url(#ringGrad)"
                strokeWidth="1.2"
                strokeDasharray="120 500"
                strokeLinecap="round"
                animate={{ rotate: -360 }}
                transition={{ duration: 9, repeat: Infinity, ease: 'linear' }}
                style={{ transformOrigin: '200px 200px' }}
              />
              <motion.circle
                cx="200" cy="200" r="130"
                fill="none"
                stroke={THEME.accentSoft}
                strokeWidth="0.5"
                strokeDasharray="1 6"
                animate={{ rotate: 360 }}
                transition={{ duration: 22, repeat: Infinity, ease: 'linear' }}
                style={{ transformOrigin: '200px 200px' }}
              />
            </svg>
          </motion.div>

          {/* Content */}
          <motion.div
            style={{ x: contentX, y: contentY }}
            exit={{ opacity: 0, y: -30, filter: 'blur(8px)' }}
            transition={{ duration: 0.5, ease: 'easeOut' }}
            className="relative flex flex-col items-center px-6"
          >
            {/* Name */}
            <div className="relative text-[13vw] sm:text-6xl md:text-7xl lg:text-8xl font-black tracking-tighter leading-none select-none">
              {/* Base dim letters */}
              <div className="flex">
                {letters.map((ch, i) => (
                  <motion.span
                    key={i}
                    initial={{ y: 60, opacity: 0, filter: 'blur(14px)' }}
                    animate={{ y: 0, opacity: 1, filter: 'blur(0px)' }}
                    transition={{
                      delay: 0.15 + i * 0.045,
                      duration: 0.8,
                      ease: EASE,
                    }}
                    style={{ color: THEME.dim, display: 'inline-block' }}
                  >
                    {ch === ' ' ? '\u00A0' : ch}
                  </motion.span>
                ))}
              </div>

              {/* Bright fill overlay */}
              <motion.div
                className="absolute inset-0 flex"
                initial={{ clipPath: 'inset(100% 0 0 0)' }}
                animate={{ clipPath: 'inset(0% 0 0 0)' }}
                transition={{ duration: 1.3, delay: 0.95, ease: EASE_IN_OUT }}
              >
                {letters.map((ch, i) => (
                  <span
                    key={i}
                    style={{ color: THEME.fill, display: 'inline-block' }}
                  >
                    {ch === ' ' ? '\u00A0' : ch}
                  </span>
                ))}
              </motion.div>

              {/* Accent dot */}
              <motion.span
                className="absolute top-0"
                style={{
                  left: '100%',
                  color: THEME.accent,
                  transform: 'translateX(-0.05em)',
                }}
                initial={{ opacity: 0, scale: 0 }}
                animate={{ opacity: 1, scale: [0, 1.3, 1] }}
                transition={{ delay: 1.05, duration: 0.7, ease: EASE }}
              >
                .
              </motion.span>

              {/* Fill sweep line */}
              <div className="pointer-events-none absolute inset-0 overflow-visible">
                <motion.div
                  className="absolute left-0 right-0 h-[2px]"
                  style={{
                    background: `linear-gradient(90deg, transparent, ${THEME.accent}, transparent)`,
                    boxShadow: `0 0 14px ${THEME.accent}`,
                  }}
                  initial={{ top: '100%', opacity: 0 }}
                  animate={{ top: '-2%', opacity: [0, 1, 1, 0] }}
                  transition={{ duration: 1.3, delay: 0.95, ease: EASE_IN_OUT }}
                />
              </div>
            </div>

            {/* Progress row */}
            <div className="mt-10 md:mt-14 flex items-center gap-5 w-[240px] md:w-[320px]">
              <div
                className="relative h-[2px] flex-1 overflow-hidden rounded-full"
                style={{ backgroundColor: 'rgba(252,235,236,0.10)' }}
              >
                <motion.div
                  className="absolute inset-y-0 left-0 rounded-full"
                  style={{
                    background: `linear-gradient(90deg, ${THEME.accent}, #FF7A82)`,
                    boxShadow: `0 0 10px ${THEME.accentSoft}`,
                  }}
                  initial={{ width: '0%' }}
                  animate={{ width: '100%' }}
                  transition={{ duration: 1.7, delay: 0.55, ease: EASE_IN_OUT }}
                />
                {/* Moving shine */}
                <motion.div
                  className="absolute inset-y-0 w-16"
                  style={{
                    background: `linear-gradient(90deg, transparent, rgba(255,255,255,0.6), transparent)`,
                  }}
                  initial={{ left: '-20%' }}
                  animate={{ left: '110%' }}
                  transition={{ duration: 2.2, delay: 0.9, ease: 'easeInOut' }}
                />
              </div>

              <span
                className="font-mono text-xs md:text-sm tabular-nums tracking-widest w-10 text-right"
                style={{ color: THEME.accent }}
              >
                {String(progress).padStart(3, '0')}
              </span>
            </div>

            {/* Sub label */}
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 1.2, duration: 0.9, ease: EASE }}
              className="mt-6 flex items-center gap-3"
            >
              <span className="w-6 h-px" style={{ background: THEME.accentSoft }} />
              <span
                className="text-[10px] md:text-[11px] uppercase tracking-[0.5em] font-medium"
                style={{ color: 'rgba(252,235,236,0.4)' }}
              >
                Portfolio
              </span>
              <span className="w-6 h-px" style={{ background: THEME.accentSoft }} />
            </motion.div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default Preloader;