import React, { useEffect, useState, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import AOS from 'aos';
import 'aos/dist/aos.css';

// ---- Theme (all direct hex colors) -------------------------------------
const THEME = {
  bg: '#3D0709',
  bgDeep: '#2A0406',
  bgDeeper: '#1A0203',
  fill: '#FCEBEC',
  dim: '#B8A6A7',
  accent: '#FF3B47',
  accentSoft: '#8A1F26',
  accentFaint: '#5A1218',
  card: '#240406',
  cardSoft: '#2E0608',
};

const EASE = [0.22, 1, 0.36, 1];

const TOOLS = ['Excel', 'SQL', 'Power BI', 'Python'];

const AI_GREETING =
  "Hey there! 👋 Welcome to Rohit's portfolio. I'm his AI assistant — take a look around, I think you'll like what you see.";

const SUGGESTIONS = ['Skills', 'Projects', 'Experience'];

// =========================================================================
// Sound engine — Web Audio API (no external files needed)
// =========================================================================
const useSoundEngine = () => {
  const ctxRef = useRef(null);
  const [enabled, setEnabled] = useState(false);

  const getCtx = () => {
    if (!ctxRef.current) {
      const AudioCtx =
        window.AudioContext || window.webkitAudioContext;
      if (!AudioCtx) return null;
      ctxRef.current = new AudioCtx();
    }
    return ctxRef.current;
  };

  // Soft "blip" — for typing
  const playBlip = (freq = 780) => {
    if (!enabled) return;
    const ctx = getCtx();
    if (!ctx) return;
    const osc = ctx.createOscillator();
    const gain = ctx.createGain();
    osc.type = 'sine';
    osc.frequency.setValueAtTime(freq, ctx.currentTime);
    gain.gain.setValueAtTime(0.0001, ctx.currentTime);
    gain.gain.exponentialRampToValueAtTime(0.035, ctx.currentTime + 0.005);
    gain.gain.exponentialRampToValueAtTime(0.0001, ctx.currentTime + 0.06);
    osc.connect(gain);
    gain.connect(ctx.destination);
    osc.start();
    osc.stop(ctx.currentTime + 0.07);
  };

  // Soft "pop" — for bubble / chips
  const playPop = () => {
    if (!enabled) return;
    const ctx = getCtx();
    if (!ctx) return;
    const osc = ctx.createOscillator();
    const gain = ctx.createGain();
    osc.type = 'triangle';
    osc.frequency.setValueAtTime(320, ctx.currentTime);
    osc.frequency.exponentialRampToValueAtTime(720, ctx.currentTime + 0.12);
    gain.gain.setValueAtTime(0.0001, ctx.currentTime);
    gain.gain.exponentialRampToValueAtTime(0.06, ctx.currentTime + 0.02);
    gain.gain.exponentialRampToValueAtTime(0.0001, ctx.currentTime + 0.22);
    osc.connect(gain);
    gain.connect(ctx.destination);
    osc.start();
    osc.stop(ctx.currentTime + 0.24);
  };

  // Warm "chime" — for welcome moment
  const playChime = () => {
    if (!enabled) return;
    const ctx = getCtx();
    if (!ctx) return;

    const notes = [523.25, 659.25, 783.99]; // C5, E5, G5
    notes.forEach((freq, i) => {
      const osc = ctx.createOscillator();
      const gain = ctx.createGain();
      osc.type = 'sine';
      osc.frequency.setValueAtTime(freq, ctx.currentTime + i * 0.08);
      gain.gain.setValueAtTime(0.0001, ctx.currentTime + i * 0.08);
      gain.gain.exponentialRampToValueAtTime(
        0.05,
        ctx.currentTime + i * 0.08 + 0.02
      );
      gain.gain.exponentialRampToValueAtTime(
        0.0001,
        ctx.currentTime + i * 0.08 + 0.5
      );
      osc.connect(gain);
      gain.connect(ctx.destination);
      osc.start(ctx.currentTime + i * 0.08);
      osc.stop(ctx.currentTime + i * 0.08 + 0.55);
    });
  };

  return { enabled, setEnabled, playBlip, playPop, playChime };
};

// =========================================================================
// AI Agent — warm welcome on page load
// =========================================================================
const AIAgent = () => {
  const [displayed, setDisplayed] = useState('');
  const [typing, setTyping] = useState(false);
  const [showBubble, setShowBubble] = useState(false);
  const [showSuggestions, setShowSuggestions] = useState(false);
  const [blink, setBlink] = useState(false);
  const [soundOn, setSoundOn] = useState(false);

  const { enabled, setEnabled, playBlip, playPop, playChime } =
    useSoundEngine();

  const chars = [...AI_GREETING];
  const blipTickRef = useRef(0);

  // ============ Sound toggle ============
  useEffect(() => {
    setEnabled(soundOn);
  }, [soundOn, setEnabled]);

  // ============ Kick off welcome ============
  useEffect(() => {
    // Don't auto-start with sound; wait until user interacts OR default silent
    const t = setTimeout(() => {
      setShowBubble(true);
      setTyping(true);
      // Chime only plays if sound is on
      if (soundOn) playChime();
    }, 1500);
    return () => clearTimeout(t);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // ============ Typewriter + typing blips ============
  useEffect(() => {
    if (!typing) return;
    if (displayed.length >= chars.length) {
      setTyping(false);
      const t = setTimeout(() => {
        setShowSuggestions(true);
        if (soundOn) playPop();
      }, 400);
      return () => clearTimeout(t);
    }
    const t = setTimeout(() => {
      setDisplayed(chars.slice(0, displayed.length + 1).join(''));

      // Soft typing blip every 2nd character (avoid overload)
      blipTickRef.current += 1;
      if (soundOn && blipTickRef.current % 2 === 0) {
        // slight freq variation for organic feel
        const f = 720 + Math.random() * 140;
        playBlip(f);
      }
    }, 32);
    return () => clearTimeout(t);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [displayed, typing, chars, soundOn]);

  // ============ Blink loop ============
  useEffect(() => {
    const interval = setInterval(() => {
      setBlink(true);
      setTimeout(() => setBlink(false), 140);
    }, 3200);
    return () => clearInterval(interval);
  }, []);

  // ============ Chime on toggle-on ============
  const handleToggleSound = () => {
    const next = !soundOn;
    setSoundOn(next);
    // If turning on, play a confirmation chime after a tiny delay
    if (next) {
      setTimeout(() => {
        setEnabled(true);
        playChime();
      }, 30);
    }
  };

  return (
    <div className="relative w-full flex flex-col items-center justify-center">

      {/* Sound toggle — top-right of the agent block */}
      <motion.button
        initial={{ opacity: 0, y: -8 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 1.0, ease: EASE }}
        onClick={handleToggleSound}
        aria-label={soundOn ? 'Mute sounds' : 'Enable sounds'}
        className="absolute top-0 right-0 md:top-2 md:right-2 z-30 w-9 h-9 rounded-full flex items-center justify-center transition-all duration-300 hover:scale-105"
        style={{
          background: soundOn ? THEME.accent : 'rgba(255,59,71,0.1)',
          border: `1px solid ${
            soundOn ? THEME.accent : THEME.accentSoft
          }`,
          color: soundOn ? THEME.fill : THEME.accent,
          boxShadow: soundOn
            ? '0 0 20px rgba(255,59,71,0.5)'
            : 'none',
        }}
      >
        {soundOn ? (
          <svg
            className="w-4 h-4"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M19.114 5.636a9 9 0 010 12.728M16.463 8.288a5.25 5.25 0 010 7.424M6.75 8.25l4.72-4.72a.75.75 0 011.28.53v15.88a.75.75 0 01-1.28.53l-4.72-4.72H4.51c-.88 0-1.704-.507-1.938-1.354A9.01 9.01 0 012.25 12c0-.83.112-1.633.322-2.396C2.806 8.756 3.63 8.25 4.51 8.25H6.75z"
            />
          </svg>
        ) : (
          <svg
            className="w-4 h-4"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M17.25 9.75L19.5 12m0 0l2.25 2.25M19.5 12l-2.25 2.25M19.5 12l2.25-2.25M19.5 12l-2.25 2.25m-10.5-6L4.5 9H1.5v6h3l4.5 3.75V5.25z"
            />
          </svg>
        )}

        {/* Pulse ring when on */}
        {soundOn && (
          <motion.span
            className="absolute inset-0 rounded-full pointer-events-none"
            style={{ border: `1px solid ${THEME.accent}` }}
            animate={{ scale: [1, 1.5], opacity: [0.7, 0] }}
            transition={{ duration: 1.8, repeat: Infinity, ease: 'easeOut' }}
          />
        )}
      </motion.button>

      {/* Ambient red glow */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1.4, delay: 0.8 }}
        className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 pointer-events-none"
        style={{
          width: 420,
          height: 420,
          background: `radial-gradient(circle, rgba(255,59,71,0.25) 0%, transparent 62%)`,
          filter: 'blur(40px)',
        }}
      />

      {/* Rotating dashed ring */}
      <motion.svg
        className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 pointer-events-none"
        style={{ width: 380, height: 380, opacity: 0.35 }}
        viewBox="0 0 400 400"
        animate={{ rotate: 360 }}
        transition={{ duration: 70, repeat: Infinity, ease: 'linear' }}
      >
        <circle
          cx="200"
          cy="200"
          r="180"
          fill="none"
          stroke={THEME.accentSoft}
          strokeWidth="0.8"
          strokeDasharray="3 10"
        />
        <circle
          cx="200"
          cy="200"
          r="150"
          fill="none"
          stroke={THEME.accent}
          strokeWidth="1"
          strokeDasharray="100 800"
          strokeLinecap="round"
        />
      </motion.svg>

      {/* ==================== Speech Bubble ==================== */}
      <div className="relative z-10 flex flex-col items-center max-w-[340px] md:max-w-[400px] mb-8">
        <AnimatePresence>
          {showBubble && (
            <motion.div
              initial={{ opacity: 0, y: 20, scale: 0.85 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              transition={{ duration: 0.6, ease: EASE }}
              className="relative w-full"
            >
              <div
                className="relative rounded-2xl px-5 py-4 md:px-6 md:py-5"
                style={{
                  background: `linear-gradient(180deg, ${THEME.cardSoft} 0%, ${THEME.card} 100%)`,
                  border: `1px solid ${THEME.accentSoft}`,
                  boxShadow: `
                    0 20px 50px -12px rgba(0,0,0,0.6),
                    0 0 0 1px rgba(255,59,71,0.06),
                    inset 0 1px 0 rgba(255,255,255,0.04)
                  `,
                }}
              >
                {/* Header */}
                <div className="flex items-center justify-between mb-2">
                  <div className="flex items-center gap-2">
                    <motion.span
                      className="w-1.5 h-1.5 rounded-full"
                      style={{ background: '#4ADE80' }}
                      animate={{ opacity: [1, 0.4, 1] }}
                      transition={{
                        duration: 1.6,
                        repeat: Infinity,
                        ease: 'easeInOut',
                      }}
                    />
                    <span
                      className="text-[9px] md:text-[10px] font-black tracking-[0.28em] uppercase"
                      style={{ color: THEME.accent }}
                    >
                      AI Assistant
                    </span>
                  </div>
                  <span
                    className="text-[9px] font-bold tracking-wider"
                    style={{ color: THEME.dim, opacity: 0.6 }}
                  >
                    online
                  </span>
                </div>

                <div
                  className="w-full h-px mb-3"
                  style={{ background: 'rgba(255,59,71,0.15)' }}
                />

                {/* Message */}
                <p
                  className="text-[13px] md:text-sm font-medium leading-relaxed"
                  style={{ color: THEME.fill }}
                >
                  {displayed}
                  {typing && (
                    <motion.span
                      className="inline-block w-[2px] h-[14px] ml-0.5 align-middle"
                      style={{ background: THEME.accent }}
                      animate={{ opacity: [1, 0] }}
                      transition={{ duration: 0.6, repeat: Infinity }}
                    />
                  )}
                </p>

                {/* Suggestions */}
                <AnimatePresence>
                  {showSuggestions && (
                    <motion.div
                      initial={{ opacity: 0, y: 8 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.5, ease: EASE }}
                      className="flex flex-wrap items-center gap-1.5 mt-4 pt-3"
                      style={{ borderTop: '1px solid rgba(255,59,71,0.15)' }}
                    >
                      <span
                        className="text-[9px] font-black tracking-[0.2em] uppercase mr-1"
                        style={{ color: THEME.dim, opacity: 0.6 }}
                      >
                        Try:
                      </span>
                      {SUGGESTIONS.map((s, i) => (
                        <motion.button
                          key={s}
                          initial={{ opacity: 0, scale: 0.85 }}
                          animate={{ opacity: 1, scale: 1 }}
                          transition={{ duration: 0.35, delay: i * 0.08 }}
                          whileHover={{ y: -2, scale: 1.05 }}
                          onClick={() => {
                            if (soundOn) playPop();
                            const target = document.getElementById(
                              s.toLowerCase()
                            );
                            if (target) {
                              target.scrollIntoView({
                                behavior: 'smooth',
                                block: 'start',
                              });
                            }
                          }}
                          className="px-2.5 py-1 rounded-full text-[10px] md:text-[11px] font-bold transition-colors duration-300"
                          style={{
                            color: THEME.fill,
                            background: 'rgba(255,59,71,0.12)',
                            border: `1px solid ${THEME.accentSoft}`,
                          }}
                        >
                          {s}
                        </motion.button>
                      ))}
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>

              {/* Bubble tail */}
              <div className="absolute left-1/2 -bottom-[7px] -translate-x-1/2">
                <div
                  className="w-3.5 h-3.5 rotate-45"
                  style={{
                    background: THEME.card,
                    borderRight: `1px solid ${THEME.accentSoft}`,
                    borderBottom: `1px solid ${THEME.accentSoft}`,
                  }}
                />
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      {/* ==================== Robot ==================== */}
      <motion.div
        initial={{ opacity: 0, y: 30, scale: 0.6 }}
        animate={{ opacity: 1, y: 0, scale: 1 }}
        transition={{ duration: 0.9, delay: 0.4, ease: EASE }}
        className="relative z-10 w-[180px] h-[180px] md:w-[220px] md:h-[220px]"
      >
        <motion.div
          animate={{ y: [0, -10, 0] }}
          transition={{ duration: 4.5, repeat: Infinity, ease: 'easeInOut' }}
          className="relative w-full h-full"
        >
          <svg viewBox="0 0 200 220" className="w-full h-full overflow-visible">
            <defs>
              <radialGradient id="headGrad" cx="50%" cy="40%" r="65%">
                <stop offset="0%" stopColor="#4A0A0E" />
                <stop offset="100%" stopColor="#1A0203" />
              </radialGradient>
              <radialGradient id="faceGrad" cx="50%" cy="50%" r="70%">
                <stop offset="0%" stopColor="#0F0506" />
                <stop offset="100%" stopColor="#2A0406" />
              </radialGradient>
              <filter id="glow" x="-50%" y="-50%" width="200%" height="200%">
                <feGaussianBlur stdDeviation="3" result="blur" />
                <feMerge>
                  <feMergeNode in="blur" />
                  <feMergeNode in="SourceGraphic" />
                </feMerge>
              </filter>
            </defs>

            {/* Antenna */}
            <line
              x1="100"
              y1="55"
              x2="100"
              y2="22"
              stroke={THEME.accentSoft}
              strokeWidth="2.5"
              strokeLinecap="round"
            />
            <motion.circle
              cx="100"
              cy="18"
              r="6"
              fill={THEME.accent}
              filter="url(#glow)"
              animate={{ opacity: [1, 0.5, 1], r: [6, 7.5, 6] }}
              transition={{ duration: 1.8, repeat: Infinity, ease: 'easeInOut' }}
            />
            <motion.circle
              cx="100"
              cy="18"
              r="10"
              fill="none"
              stroke={THEME.accent}
              strokeWidth="1"
              animate={{ r: [8, 20], opacity: [0.7, 0] }}
              transition={{ duration: 2, repeat: Infinity, ease: 'easeOut' }}
            />

            {/* Ears */}
            <rect
              x="24"
              y="94"
              width="14"
              height="26"
              rx="6"
              fill={THEME.accentFaint}
              stroke={THEME.accentSoft}
              strokeWidth="1.5"
            />
            <rect
              x="162"
              y="94"
              width="14"
              height="26"
              rx="6"
              fill={THEME.accentFaint}
              stroke={THEME.accentSoft}
              strokeWidth="1.5"
            />

            {/* Head */}
            <circle
              cx="100"
              cy="105"
              r="62"
              fill="url(#headGrad)"
              stroke={THEME.accentSoft}
              strokeWidth="2"
            />

            {/* Face */}
            <rect
              x="50"
              y="68"
              width="100"
              height="74"
              rx="36"
              fill="url(#faceGrad)"
              stroke={THEME.accentSoft}
              strokeWidth="1.5"
            />

            {/* Eyes */}
            <motion.g
              animate={blink ? { scaleY: 0.15 } : { scaleY: 1 }}
              transition={{ duration: 0.12 }}
              style={{ transformOrigin: '100px 105px' }}
            >
              <circle
                cx="78"
                cy="105"
                r="8"
                fill={THEME.accent}
                filter="url(#glow)"
              />
              <circle
                cx="122"
                cy="105"
                r="8"
                fill={THEME.accent}
                filter="url(#glow)"
              />
              <circle cx="75" cy="102" r="2.5" fill="#FFFFFF" opacity="0.85" />
              <circle cx="119" cy="102" r="2.5" fill="#FFFFFF" opacity="0.85" />
            </motion.g>

            {/* Smile */}
            <path
              d="M 82 128 Q 100 140 118 128"
              fill="none"
              stroke={THEME.accent}
              strokeWidth="2.5"
              strokeLinecap="round"
              opacity="0.85"
            />

            {/* Body */}
            <rect
              x="60"
              y="172"
              width="80"
              height="42"
              rx="20"
              fill="url(#headGrad)"
              stroke={THEME.accentSoft}
              strokeWidth="2"
            />

            {/* Tech lines */}
            {[78, 90, 102, 114, 126].map((x, i) => (
              <line
                key={x}
                x1={x}
                y1="186"
                x2={x}
                y2="200"
                stroke={THEME.accent}
                strokeWidth="2"
                strokeLinecap="round"
                opacity={i % 2 === 0 ? 0.6 : 0.4}
              />
            ))}

            {/* Chest light */}
            <motion.circle
              cx="100"
              cy="158"
              r="4"
              fill={THEME.accent}
              filter="url(#glow)"
              animate={{ opacity: [0.5, 1, 0.5] }}
              transition={{ duration: 2, repeat: Infinity, ease: 'easeInOut' }}
            />

            {/* Left arm (waves) */}
            <motion.g
              style={{ transformOrigin: '60px 180px' }}
              animate={{ rotate: [0, -14, 0, -14, 0] }}
              transition={{
                duration: 2.4,
                repeat: Infinity,
                ease: 'easeInOut',
                repeatDelay: 1.5,
              }}
            >
              <line
                x1="60"
                y1="180"
                x2="34"
                y2="172"
                stroke={THEME.accentSoft}
                strokeWidth="6"
                strokeLinecap="round"
              />
              <circle
                cx="32"
                cy="171"
                r="6"
                fill={THEME.accentFaint}
                stroke={THEME.accentSoft}
                strokeWidth="1.2"
              />
            </motion.g>

            {/* Right arm */}
            <line
              x1="140"
              y1="180"
              x2="166"
              y2="172"
              stroke={THEME.accentSoft}
              strokeWidth="6"
              strokeLinecap="round"
            />
            <circle
              cx="168"
              cy="171"
              r="6"
              fill={THEME.accentFaint}
              stroke={THEME.accentSoft}
              strokeWidth="1.2"
            />

            {/* Shadow */}
            <ellipse
              cx="100"
              cy="220"
              rx="40"
              ry="4"
              fill={THEME.accent}
              opacity="0.15"
            />
          </svg>
        </motion.div>

        {/* Floating particles */}
        {[
          { top: '10%', left: '8%', d: 0 },
          { top: '70%', left: '90%', d: 1.2 },
          { top: '20%', left: '92%', d: 2.4 },
          { top: '85%', left: '12%', d: 0.6 },
        ].map((p, i) => (
          <motion.div
            key={i}
            className="absolute rounded-full pointer-events-none"
            style={{
              top: p.top,
              left: p.left,
              width: 5,
              height: 5,
              background: THEME.accent,
              boxShadow: `0 0 10px ${THEME.accent}`,
            }}
            animate={{
              scale: [1, 1.8, 1],
              opacity: [0.3, 1, 0.3],
              y: [0, -10, 0],
            }}
            transition={{
              duration: 3.6,
              repeat: Infinity,
              ease: 'easeInOut',
              delay: p.d,
            }}
          />
        ))}
      </motion.div>

      {/* Label */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.8, delay: 2.2 }}
        className="mt-4 text-center"
      >
        <span
          className="text-[9px] md:text-[10px] font-black tracking-[0.4em] uppercase"
          style={{ color: THEME.dim, opacity: 0.6 }}
        >
          {soundOn ? 'Sound on · Always here to help' : 'Always here to help'}
        </span>
      </motion.div>
    </div>
  );
};

// =========================================================================
// Hero
// =========================================================================
const Hero = () => {
  useEffect(() => {
    AOS.init({ duration: 1000, once: true, easing: 'ease-out' });
  }, []);

  return (
    <section
      id="home"
      className="relative w-full min-h-screen overflow-hidden"
      style={{ backgroundColor: THEME.bg }}
    >
      {/* Shapes */}
      <div className="pointer-events-none absolute inset-0 z-[3]">
        <motion.div
          className="absolute hidden md:block"
          style={{
            top: '20%',
            right: '22%',
            width: 90,
            height: 90,
            border: `1px solid ${THEME.accentSoft}`,
          }}
          animate={{ rotate: [0, 90, 180, 270, 360] }}
          transition={{ duration: 30, repeat: Infinity, ease: 'linear' }}
        />

        <motion.svg
          className="absolute hidden md:block"
          style={{ bottom: '24%', left: '18%', width: 70, height: 70 }}
          viewBox="0 0 100 100"
          animate={{ rotate: [0, 360], y: [0, -12, 0] }}
          transition={{
            rotate: { duration: 24, repeat: Infinity, ease: 'linear' },
            y: { duration: 5, repeat: Infinity, ease: 'easeInOut' },
          }}
        >
          <polygon
            points="50,8 92,86 8,86"
            fill="none"
            stroke={THEME.accentSoft}
            strokeWidth="1.2"
          />
        </motion.svg>

        {[
          { top: '18%', left: '40%' },
          { top: '70%', left: '60%' },
          { top: '35%', left: '12%' },
        ].map((p, i) => (
          <motion.div
            key={i}
            className="absolute"
            style={{
              top: p.top,
              left: p.left,
              width: 14,
              height: 14,
            }}
            animate={{ rotate: [0, 90, 0], opacity: [0.5, 1, 0.5] }}
            transition={{
              duration: 6 + i * 2,
              repeat: Infinity,
              ease: 'easeInOut',
            }}
          >
            <div
              className="absolute top-1/2 left-0 right-0 h-px -translate-y-1/2"
              style={{ background: THEME.accent }}
            />
            <div
              className="absolute left-1/2 top-0 bottom-0 w-px -translate-x-1/2"
              style={{ background: THEME.accent }}
            />
          </motion.div>
        ))}

        {[
          { top: '28%', left: '58%', d: 0 },
          { top: '62%', left: '30%', d: 1.2 },
          { top: '48%', left: '82%', d: 2.4 },
          { top: '12%', left: '72%', d: 0.6 },
          { top: '78%', left: '48%', d: 1.8 },
        ].map((p, i) => (
          <motion.div
            key={i}
            className="absolute rounded-full"
            style={{
              top: p.top,
              left: p.left,
              width: 6,
              height: 6,
              background: THEME.accent,
            }}
            animate={{ scale: [1, 1.6, 1], opacity: [0.5, 1, 0.5] }}
            transition={{
              duration: 3,
              repeat: Infinity,
              ease: 'easeInOut',
              delay: p.d,
            }}
          />
        ))}

        <motion.svg
          className="absolute hidden md:block"
          style={{ top: '-40px', left: '-40px', width: 260, height: 260 }}
          viewBox="0 0 200 200"
          animate={{ rotate: 360 }}
          transition={{ duration: 90, repeat: Infinity, ease: 'linear' }}
        >
          <circle
            cx="100"
            cy="100"
            r="88"
            fill="none"
            stroke={THEME.accentSoft}
            strokeWidth="0.8"
            strokeDasharray="1 6"
          />
        </motion.svg>

        <motion.svg
          className="absolute hidden md:block"
          style={{ top: '8%', right: '-6%', width: 520, height: 520 }}
          viewBox="0 0 400 400"
          animate={{ rotate: 360 }}
          transition={{ duration: 80, repeat: Infinity, ease: 'linear' }}
        >
          <circle
            cx="200"
            cy="200"
            r="180"
            fill="none"
            stroke={THEME.accentSoft}
            strokeWidth="0.8"
            strokeDasharray="3 9"
          />
          <circle
            cx="200"
            cy="200"
            r="150"
            fill="none"
            stroke={THEME.accent}
            strokeWidth="1.2"
            strokeDasharray="180 700"
            strokeLinecap="round"
          />
        </motion.svg>

        <motion.svg
          className="absolute hidden md:block"
          style={{ bottom: '10%', left: '-4%', width: 340, height: 340 }}
          viewBox="0 0 400 400"
          animate={{ rotate: -360 }}
          transition={{ duration: 55, repeat: Infinity, ease: 'linear' }}
        >
          <circle
            cx="200"
            cy="200"
            r="160"
            fill="none"
            stroke={THEME.accentSoft}
            strokeWidth="0.7"
            strokeDasharray="2 8"
          />
          <circle
            cx="200"
            cy="200"
            r="120"
            fill="none"
            stroke={THEME.accent}
            strokeWidth="1"
            strokeDasharray="100 500"
            strokeLinecap="round"
          />
        </motion.svg>
      </div>

      {/* Grid */}
      <div
        className="pointer-events-none absolute inset-0 z-[6]"
        style={{
          backgroundImage: `linear-gradient(${THEME.accentFaint} 1px, transparent 1px), linear-gradient(90deg, ${THEME.accentFaint} 1px, transparent 1px)`,
          backgroundSize: '80px 80px',
          maskImage:
            'radial-gradient(circle at 50% 50%, black 40%, transparent 85%)',
          WebkitMaskImage:
            'radial-gradient(circle at 50% 50%, black 40%, transparent 85%)',
        }}
      />

      {/* Grain */}
      <div
        className="pointer-events-none absolute inset-0 z-[7] mix-blend-overlay"
        style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='2'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)'/%3E%3C/svg%3E")`,
        }}
      />

      {/* Content */}
      <div className="relative z-20 px-6 md:px-12 max-w-7xl mx-auto w-full min-h-screen flex flex-col md:flex-row md:items-center md:justify-between gap-12 md:gap-8 pt-28 md:pt-24 pb-20 md:pb-0">
        {/* LEFT */}
        <div className="flex flex-col items-start text-left max-w-lg lg:max-w-xl w-full md:w-1/2">
          <motion.span
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, ease: EASE, delay: 0.15 }}
            className="mb-4 text-[10px] md:text-xs font-bold tracking-[0.4em] uppercase"
            style={{ color: THEME.accent }}
          >
            Data Analyst
          </motion.span>

          <motion.h1
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, ease: EASE, delay: 0.3 }}
            className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-black mb-5 tracking-tight leading-[1.05]"
            style={{ color: THEME.fill }}
          >
            Hi, I'm a <br />
            <span style={{ color: THEME.accent }}>Data Analyst</span>
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.9, ease: EASE, delay: 0.5 }}
            className="text-sm md:text-base lg:text-lg font-medium mb-8 max-w-md md:max-w-xl leading-relaxed"
            style={{ color: THEME.dim }}
          >
            I turn raw data into clear, actionable insights using{' '}
            <span style={{ color: THEME.fill }} className="font-bold">
              Excel, SQL, Power BI
            </span>{' '}
            and{' '}
            <span style={{ color: THEME.fill }} className="font-bold">
              Python
            </span>
            — building dashboards, automating reports and helping teams make
            smarter decisions.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.9, ease: EASE, delay: 0.65 }}
            className="flex flex-wrap gap-2 md:gap-3 mb-8"
          >
            {TOOLS.map((tool, i) => (
              <motion.span
                key={tool}
                initial={{ opacity: 0, scale: 0.85 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{
                  duration: 0.5,
                  ease: EASE,
                  delay: 0.7 + i * 0.08,
                }}
                whileHover={{ y: -3 }}
                className="px-4 py-1.5 rounded-full text-[11px] md:text-xs font-bold tracking-wide"
                style={{
                  color: THEME.fill,
                  border: `1px solid ${THEME.accentSoft}`,
                  background: THEME.accentFaint,
                }}
              >
                {tool}
              </motion.span>
            ))}
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.9, ease: EASE, delay: 0.85 }}
            className="flex flex-row items-center gap-4 w-full"
          >
            <a
              href="#projects"
              className="group relative inline-flex items-center gap-2 px-6 py-2.5 md:px-7 md:py-3 text-xs md:text-sm rounded-full font-black overflow-hidden transition-transform duration-300 hover:scale-[1.04]"
              style={{ background: THEME.accent, color: THEME.fill }}
            >
              <span className="relative z-10">View My Work</span>
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

            <a
              href="#contact"
              className="group relative inline-flex items-center gap-2 px-6 py-2.5 md:px-7 md:py-3 text-xs md:text-sm rounded-full font-black transition-all duration-300 hover:scale-[1.04]"
              style={{
                color: THEME.fill,
                border: `1px solid ${THEME.accentSoft}`,
                background: THEME.accentFaint,
              }}
            >
              <span className="relative z-10">Contact Me</span>
            </a>
          </motion.div>
        </div>

        {/* RIGHT — AI agent */}
        <div className="w-full md:w-1/2 flex items-center justify-center md:justify-end relative">
          <AIAgent />
        </div>
      </div>

      {/* Scroll indicator */}
      <motion.div
        initial={{ opacity: 0, y: -10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1, delay: 1.2, ease: EASE }}
        className="hidden md:flex absolute bottom-8 left-1/2 -translate-x-1/2 z-20 flex-col items-center gap-2 pointer-events-none"
      >
        <span
          className="text-[9px] font-bold tracking-[0.4em] uppercase"
          style={{ color: THEME.dim }}
        >
          Scroll
        </span>
        <div className="animate-bounce">
          <svg
            className="w-4 h-4"
            style={{ color: THEME.accent }}
            fill="none"
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="2.5"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path d="M19 14l-7 7m0 0l-7-7m7 7V3"></path>
          </svg>
        </div>
      </motion.div>
    </section>
  );
};

export default Hero;