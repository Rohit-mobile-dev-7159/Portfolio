import React, { useEffect } from 'react';
import { motion } from 'framer-motion';
import AOS from 'aos';
import 'aos/dist/aos.css';
import stackImage from '../assets/about/profile.png';

const THEME = {
  bg: '#FF2A2A',         
  bgDeep: '#E51F1F',       
  bgDeeper: '#0F0F0F',     
  white: '#FFFFFF',        
  fill: '#FFFFFF',         
  black: '#000000',        
  dim: '#FFE4E4',
};

const EASE = [0.22, 1, 0.36, 1];

const TOOLS = [
  {
    src: 'https://api.iconify.design/vscode-icons/file-type-excel.svg',
    alt: 'Excel',
    delay: 300,
  },
  {
    src: 'https://api.iconify.design/vscode-icons/file-type-sql.svg',
    alt: 'SQL',
    delay: 450,
  },
  {
    src: 'https://api.iconify.design/vscode-icons/file-type-powerbi.svg',
    alt: 'Power BI',
    delay: 600,
  },
  {
    src: 'https://api.iconify.design/vscode-icons/file-type-python.svg',
    alt: 'Python',
    delay: 750,
  },
];

const About = () => {
  useEffect(() => {
    AOS.init({ duration: 1000, once: true, easing: 'ease-out' });
  }, []);

  return (
    <section
      id="about"
      className="relative w-full pt-24 pb-[200px] px-6 md:px-12 overflow-hidden font-sans"
      style={{ backgroundColor: THEME.bg }}
    >
      {/* ---- Background floating shapes ---- */}
      <div className="pointer-events-none absolute inset-0 z-0">
        <motion.svg
          className="absolute hidden md:block"
          style={{ top: '8%', right: '-4%', width: 320, height: 320 }}
          viewBox="0 0 200 200"
          animate={{ rotate: 360 }}
          transition={{ duration: 80, repeat: Infinity, ease: 'linear' }}
        >
          <circle
            cx="100"
            cy="100"
            r="88"
            fill="none"
            stroke={THEME.black}
            strokeWidth="0.8"
            strokeDasharray="1 6"
            opacity="0.35"
          />
        </motion.svg>

        <motion.svg
          className="absolute hidden md:block"
          style={{ bottom: '22%', left: '-4%', width: 280, height: 280 }}
          viewBox="0 0 400 400"
          animate={{ rotate: -360 }}
          transition={{ duration: 55, repeat: Infinity, ease: 'linear' }}
        >
          <circle
            cx="200"
            cy="200"
            r="160"
            fill="none"
            stroke={THEME.black}
            strokeWidth="0.7"
            strokeDasharray="2 8"
            opacity="0.35"
          />
        </motion.svg>

        {[
          { top: '14%', left: '8%' },
          { top: '72%', left: '42%' },
          { top: '30%', left: '88%' },
        ].map((p, i) => (
          <motion.div
            key={i}
            className="absolute"
            style={{ top: p.top, left: p.left, width: 14, height: 14 }}
            animate={{ rotate: [0, 90, 0], opacity: [0.3, 0.7, 0.3] }}
            transition={{ duration: 6 + i * 2, repeat: Infinity, ease: 'easeInOut' }}
          >
            <div
              className="absolute top-1/2 left-0 right-0 h-px -translate-y-1/2"
              style={{ background: THEME.black }}
            />
            <div
              className="absolute left-1/2 top-0 bottom-0 w-px -translate-x-1/2"
              style={{ background: THEME.black }}
            />
          </motion.div>
        ))}

        {[
          { top: '20%', left: '72%', d: 0 },
          { top: '58%', left: '18%', d: 1.2 },
          { top: '78%', left: '78%', d: 2.4 },
        ].map((p, i) => (
          <motion.div
            key={i}
            className="absolute rounded-full"
            style={{
              top: p.top,
              left: p.left,
              width: 6,
              height: 6,
              background: THEME.black,
            }}
            animate={{ scale: [1, 1.6, 1], opacity: [0.35, 0.8, 0.35] }}
            transition={{
              duration: 3,
              repeat: Infinity,
              ease: 'easeInOut',
              delay: p.d,
            }}
          />
        ))}
      </div>

      {/* ---- Content ---- */}
      <div className="relative z-10 max-w-6xl mx-auto flex flex-col md:flex-row gap-16 items-start">

        {/* ============= Left: ID Badge ============= */}
        <div className="flex flex-col items-center w-full md:w-[350px] shrink-0 mt-12 md:mt-0">
          <div data-aos="drop-bounce" className="relative flex justify-center w-full">
            <div
              className="absolute -top-40 left-1/2 w-2 h-44 transform -translate-x-1/2 z-0"
              style={{ background: THEME.bgDeeper }}
            />
            <div
              className="absolute -top-8 left-1/2 w-7 h-12 rounded transform -translate-x-1/2 z-10"
              style={{
                background: '#E5E5E5',
                border: `1px solid #B0B0B0`,
              }}
            />

            <motion.div
              whileHover={{ rotate: 0 }}
              className="relative z-20 w-full max-w-[280px] rounded-2xl p-3 transform -rotate-3 transition-transform duration-500"
              style={{
                backgroundColor: THEME.bgDeeper,
                border: `1px solid ${THEME.black}`,
                boxShadow: `0 20px 50px ${THEME.black}`,
              }}
            >
              <div
                className="absolute -top-3 left-1/2 w-16 h-6 rounded-t-xl transform -translate-x-1/2 flex justify-center items-center"
                style={{ backgroundColor: THEME.bgDeeper }}
              >
                <div
                  className="w-8 h-2 rounded-full"
                  style={{ backgroundColor: THEME.black }}
                />
              </div>

              <div
                className="w-full aspect-[3/4] overflow-hidden rounded-xl"
                style={{ backgroundColor: THEME.bgDeeper }}
              >
                <img
                  src={stackImage}
                  alt="Profile"
                  className="w-full h-full object-cover"
                />
              </div>

              <div className="px-2 pt-3 pb-1 flex items-center justify-between">
                <span
                  className="text-[10px] font-black tracking-[0.25em] uppercase"
                  style={{ color: THEME.fill }}
                >
                  Analyst ID
                </span>
                <span
                  className="text-[10px] font-bold tracking-widest"
                  style={{ color: THEME.dim }}
                >
                  ••01
                </span>
              </div>
            </motion.div>
          </div>
        </div>

        {/* ============= Right: Info ============= */}
        <div
          data-aos="fade-left"
          data-aos-delay="200"
          className="flex-1 relative z-20 mt-8 md:mt-0"
        >
          <h2
            className="text-5xl md:text-7xl font-black mb-6 tracking-tight leading-none"
            style={{ color: THEME.black }}
          >
            Hello!
          </h2>

          <p
            className="text-lg md:text-xl font-bold mb-6 leading-relaxed max-w-3xl"
            style={{ color: THEME.fill }}
          >
            Hi, my name is{' '}
            <span
              className="font-black mx-1 tracking-wide uppercase"
              style={{ color: THEME.black }}
            >
              Rohit Kumar
            </span>
            , a passionate{' '}
            <span style={{ color: THEME.black }} className="font-black">
              Data Analyst
            </span>{' '}
            based in Agra, dedicated to transforming raw data into clear,
            actionable insights that drive smarter business decisions.
          </p>

          <p
            className="text-base md:text-lg font-medium mb-10 leading-relaxed max-w-3xl"
            style={{ color: THEME.fill }}
          >
            I work with{' '}
            <span style={{ color: THEME.black }} className="font-black">Excel</span>,{' '}
            <span style={{ color: THEME.black }} className="font-black">SQL</span>,{' '}
            <span style={{ color: THEME.black }} className="font-black">Power BI</span>{' '}
            and{' '}
            <span style={{ color: THEME.black }} className="font-black">Python</span>{' '}
            to clean data, build dashboards, automate reports and uncover
            patterns that matter.
          </p>

          <div className="flex flex-wrap items-center gap-4 md:gap-6">
            {TOOLS.map((tool) => (
              <motion.div
                key={tool.alt}
                data-aos="zoom-in"
                data-aos-delay={tool.delay}
                whileHover={{ y: -6, scale: 1.08 }}
                transition={{ duration: 0.3, ease: EASE }}
                className="relative flex flex-col items-center gap-2 cursor-pointer"
              >
                <div
                  className="w-16 h-16 md:w-20 md:h-20 rounded-2xl flex items-center justify-center p-3"
                  style={{
                    backgroundColor: THEME.white,
                    border: `2px solid ${THEME.black}`,
                    boxShadow: `0 6px 0 ${THEME.black}`,
                  }}
                >
                  <img
                    src={tool.src}
                    alt={tool.alt}
                    loading="lazy"
                    className="w-full h-full object-contain"
                  />
                </div>
                <span
                  className="text-[10px] md:text-[11px] font-black tracking-wider uppercase"
                  style={{ color: THEME.black }}
                >
                  {tool.alt}
                </span>
              </motion.div>
            ))}
          </div>
        </div>
      </div>

      {/* ================================================================
          BOTTOM WAVE — white background, red multi-wave SVG on top
      ================================================================ */}
      <div
        className="absolute bottom-0 left-0 w-full z-30 pointer-events-none"
        style={{ height: '160px', backgroundColor: THEME.white }}
      >
        <svg
          viewBox="0 0 1200 120"
          preserveAspectRatio="none"
          className="absolute top-0 left-0 w-full"
          style={{
            height: '120px',
            display: 'block',
            fill: THEME.bg,
          }}
        >
          {/* Multi-wave path — 4 full waves for a rolling effect */}
          <path d="M0,0 L1200,0 L1200,55 C1100,115 1000,0 900,55 C800,115 700,0 600,55 C500,115 400,0 300,55 C200,115 100,0 0,55 Z" />
        </svg>
      </div>

      {/* ---- Decorative stars (black) ---- */}
      <div
        className="absolute top-10 right-10 md:right-20 animate-pulse z-10"
        style={{ color: THEME.black, opacity: 0.9 }}
      >
        <svg className="w-16 h-16" fill="currentColor" viewBox="0 0 24 24">
          <path d="M12 0l2.5 8.5L23 12l-8.5 2.5L12 23l-2.5-8.5L1 12l8.5-2.5z" />
        </svg>
      </div>
      <div
        className="absolute bottom-44 left-4 md:left-20 animate-pulse z-10"
        style={{ color: THEME.black, opacity: 0.9, animationDelay: '1s' }}
      >
        <svg className="w-20 h-20" fill="currentColor" viewBox="0 0 24 24">
          <path d="M12 0l2.5 8.5L23 12l-8.5 2.5L12 23l-2.5-8.5L1 12l8.5-2.5z" />
        </svg>
      </div>
    </section>
  );
};

export default About;