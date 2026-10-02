import React from 'react';
import { motion } from 'framer-motion';

// =========================================================================
// All footer content in one place
// =========================================================================
const FOOTER_DATA = {
  brand: {
    name: 'ROHIT',
    fullName: 'Rohit Kumar',
    studio: 'Rohit Studio',
  },
  tagline: {
    role: 'Data Analyst & Full-Stack Developer',
    lines: [
      'Data Analytics & Visualization',
      'Full-Stack Web Development',
      'Dashboards, ETL & Automation',
    ],
  },
  experience: {
    years: '2+ years of experience',
    label: 'View Work',
    link: '#projects',
  },
  availability: {
    status: 'Worldwide Available',
    location: 'India (Remote-friendly)',
  },
  contact: {
    email: 'rohitmobiledev7159@gmail.com',
    label: 'Contact',
    link: '#contact',
  },
  socials: [
    {
      label: 'GitHub',
      href: 'https://github.com/Rohit-mobile-dev-7159',
      icon: (
        <svg viewBox="0 0 24 24" fill="currentColor" className="w-4 h-4">
          <path d="M12 .5C5.65.5.5 5.65.5 12c0 5.08 3.29 9.39 7.86 10.91.58.11.79-.25.79-.56v-2c-3.2.7-3.88-1.37-3.88-1.37-.53-1.34-1.29-1.7-1.29-1.7-1.05-.72.08-.7.08-.7 1.17.08 1.78 1.2 1.78 1.2 1.03 1.77 2.71 1.26 3.37.96.1-.75.4-1.26.73-1.55-2.55-.29-5.24-1.28-5.24-5.68 0-1.26.45-2.28 1.19-3.09-.12-.29-.52-1.46.11-3.05 0 0 .97-.31 3.18 1.18a11 11 0 0 1 5.79 0c2.2-1.49 3.17-1.18 3.17-1.18.63 1.59.23 2.76.11 3.05.74.81 1.19 1.83 1.19 3.09 0 4.41-2.7 5.38-5.26 5.66.41.36.78 1.06.78 2.14v3.17c0 .31.21.68.8.56A10.52 10.52 0 0 0 23.5 12C23.5 5.65 18.35.5 12 .5z" />
        </svg>
      ),
    },
    {
      label: 'LinkedIn',
      href: 'https://www.linkedin.com/in/rohit-kumar-85132b43b/',
      icon: (
        <svg viewBox="0 0 24 24" fill="currentColor" className="w-4 h-4">
          <path d="M20.45 20.45h-3.56v-5.57c0-1.33-.03-3.04-1.85-3.04-1.85 0-2.13 1.45-2.13 2.94v5.67H9.35V9h3.41v1.56h.05c.48-.9 1.64-1.85 3.37-1.85 3.6 0 4.27 2.37 4.27 5.46v6.28zM5.34 7.43a2.06 2.06 0 1 1 0-4.13 2.06 2.06 0 0 1 0 4.13zM7.12 20.45H3.56V9h3.56v11.45z" />
        </svg>
      ),
    },
    {
      label: 'Twitter',
      href: 'https://twitter.com/',
      icon: (
        <svg viewBox="0 0 24 24" fill="currentColor" className="w-4 h-4">
          <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24h-6.657l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231 5.45-6.231zm-1.16 17.52h1.833L7.084 4.126H5.117l11.967 15.644z" />
        </svg>
      ),
    },
  ],
  legal: {
    privacy: { label: 'Privacy Policy', href: '#' },
    terms: { label: 'Terms of Use', href: '#' },
  },
  tech: 'Built with React · Tailwind · Framer Motion',
};

const EASE = [0.22, 1, 0.36, 1];

// =========================================================================
// Footer
// =========================================================================
const Footer = () => {
  const year = new Date().getFullYear();
  const brandLetters = FOOTER_DATA.brand.name.split('');

  return (
    <footer
      className="relative bg-[#111111] text-[#d4d4d4] pt-20 pb-10 px-6 md:px-12 w-full font-mono text-[10px] md:text-xs tracking-widest overflow-hidden"
    >
      {/* ---- Background layers ---- */}
      {/* Faint grid */}
      <div className="absolute inset-0 pointer-events-none opacity-[0.05]">
        <div
          className="absolute inset-0"
          style={{
            backgroundImage:
              'linear-gradient(90deg, #ffffff 1px, transparent 1px), linear-gradient(0deg, #ffffff 1px, transparent 1px)',
            backgroundSize: '60px 60px',
            maskImage:
              'radial-gradient(ellipse at 50% 50%, black 20%, transparent 80%)',
            WebkitMaskImage:
              'radial-gradient(ellipse at 50% 50%, black 20%, transparent 80%)',
          }}
        />
      </div>

      {/* Red glow top */}
      <div
        className="absolute top-0 left-1/2 -translate-x-1/2 w-[70vw] h-40 blur-3xl pointer-events-none"
        style={{ background: 'rgba(255,42,42,0.1)' }}
      />

      {/* Red glow bottom-left */}
      <div
        className="absolute -bottom-32 -left-20 w-[40vw] h-[40vh] blur-3xl pointer-events-none"
        style={{ background: 'rgba(255,42,42,0.06)' }}
      />

      {/* ================================================================
          TOP CTA ROW — "Let's work together"
      ================================================================ */}
      <div className="relative z-10 max-w-6xl mx-auto w-full">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, ease: EASE }}
          className="flex flex-col md:flex-row md:items-end md:justify-between gap-6 md:gap-10 pb-10 md:pb-14"
        >
          <div>
            <div className="flex items-center gap-2 mb-3">
              <span
                className="w-2 h-2 rounded-full animate-pulse"
                style={{ backgroundColor: '#22C55E' }}
              />
              <span
                className="text-[9px] md:text-[10px] font-black uppercase tracking-[0.35em]"
                style={{ color: '#22C55E' }}
              >
                {FOOTER_DATA.availability.status}
              </span>
            </div>

            <h3 className="text-3xl md:text-5xl lg:text-6xl font-black tracking-tighter leading-[1.02] font-sans text-white">
              Let&apos;s build
              <br />
              <span style={{ color: '#FF2A2A' }}>something great.</span>
            </h3>
          </div>

          {/* CTA Button */}
          <a
            href={FOOTER_DATA.contact.link}
            className="group relative inline-flex items-center gap-3 px-6 py-3 md:px-7 md:py-3.5 rounded-full text-[11px] md:text-xs font-black uppercase tracking-[0.2em] w-fit overflow-hidden transition-transform duration-300 hover:scale-[1.03]"
            style={{
              background: '#FF2A2A',
              color: '#FFFFFF',
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
            <span className="relative z-10">Get in touch</span>
            <svg
              className="relative z-10 w-4 h-4 transition-transform duration-300 group-hover:translate-x-1"
              fill="none"
              stroke="currentColor"
              strokeWidth="2.5"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M5 12h14M13 5l7 7-7 7"
              />
            </svg>
          </a>
        </motion.div>

        {/* Divider */}
        <div
          className="w-full h-px mb-10 md:mb-12"
          style={{
            background:
              'linear-gradient(90deg, transparent, rgba(255,255,255,0.12), transparent)',
          }}
        />
      </div>

      {/* ================================================================
          MAIN GRID — 4 columns of info
      ================================================================ */}
      <div className="relative z-10 max-w-6xl mx-auto w-full grid grid-cols-2 md:grid-cols-4 gap-8 md:gap-6 pb-14 md:pb-20">
        {/* Column 1 — What I do */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.05, ease: EASE }}
          className="flex flex-col gap-3"
        >
          <p
            className="text-[9px] md:text-[10px] font-black uppercase tracking-[0.35em] mb-1"
            style={{ color: '#FF2A2A' }}
          >
            What I Do
          </p>
          {FOOTER_DATA.tagline.lines.map((line, i) => (
            <p key={i} className="text-[#d4d4d4] leading-relaxed">
              {line}
            </p>
          ))}
        </motion.div>

        {/* Column 2 — Experience */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.1, ease: EASE }}
          className="flex flex-col gap-3"
        >
          <p
            className="text-[9px] md:text-[10px] font-black uppercase tracking-[0.35em] mb-1"
            style={{ color: '#FF2A2A' }}
          >
            Experience
          </p>
          <p className="text-[#d4d4d4]">{FOOTER_DATA.experience.years}</p>
          <a
            href={FOOTER_DATA.experience.link}
            className="group inline-flex items-center gap-1.5 text-[#d4d4d4] hover:text-white transition-colors mt-1 w-fit"
          >
            <span className="border-b border-current pb-0.5">
              {FOOTER_DATA.experience.label}
            </span>
            <svg
              className="w-3 h-3 transition-transform duration-300 group-hover:translate-x-0.5"
              fill="none"
              stroke="currentColor"
              strokeWidth="2.2"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M14 5l7 7m0 0l-7 7m7-7H3"
              />
            </svg>
          </a>
        </motion.div>

        {/* Column 3 — Availability */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.15, ease: EASE }}
          className="flex flex-col gap-3"
        >
          <p
            className="text-[9px] md:text-[10px] font-black uppercase tracking-[0.35em] mb-1"
            style={{ color: '#FF2A2A' }}
          >
            Availability
          </p>
          <div className="flex items-center gap-2">
            <span
              className="w-1.5 h-1.5 rounded-full animate-pulse"
              style={{ backgroundColor: '#22C55E' }}
            />
            <p className="text-[#d4d4d4]">{FOOTER_DATA.availability.status}</p>
          </div>
          <p className="text-[#a3a3a3]">{FOOTER_DATA.availability.location}</p>
        </motion.div>

        {/* Column 4 — Contact */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.2, ease: EASE }}
          className="flex flex-col gap-3"
        >
          <p
            className="text-[9px] md:text-[10px] font-black uppercase tracking-[0.35em] mb-1"
            style={{ color: '#FF2A2A' }}
          >
            Contact
          </p>
          <a
            href={`mailto:${FOOTER_DATA.contact.email}`}
            className="text-[#d4d4d4] hover:text-white transition-colors lowercase break-all"
          >
            {FOOTER_DATA.contact.email}
          </a>

          {/* Socials as icon buttons */}
          <div className="flex items-center gap-2 mt-1">
            {FOOTER_DATA.socials.map((s) => (
              <a
                key={s.label}
                href={s.href}
                target="_blank"
                rel="noreferrer"
                aria-label={s.label}
                className="group relative w-9 h-9 rounded-full flex items-center justify-center transition-all duration-300"
                style={{
                  backgroundColor: 'rgba(255,255,255,0.04)',
                  border: '1px solid rgba(255,255,255,0.08)',
                  color: '#a3a3a3',
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.backgroundColor = '#FF2A2A';
                  e.currentTarget.style.borderColor = '#FF2A2A';
                  e.currentTarget.style.color = '#FFFFFF';
                  e.currentTarget.style.transform = 'translateY(-3px)';
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.backgroundColor = 'rgba(255,255,255,0.04)';
                  e.currentTarget.style.borderColor = 'rgba(255,255,255,0.08)';
                  e.currentTarget.style.color = '#a3a3a3';
                  e.currentTarget.style.transform = 'translateY(0)';
                }}
              >
                {s.icon}
              </a>
            ))}
          </div>
        </motion.div>
      </div>

      {/* ================================================================
          HUGE BRAND TEXT — letter by letter reveal
      ================================================================ */}
      <div className="relative z-10 w-full flex justify-center items-center py-6 md:py-10 overflow-hidden">
        <div className="flex items-baseline justify-center w-full">
          {brandLetters.map((letter, i) => (
            <motion.span
              key={i}
              initial={{ opacity: 0, y: 60, filter: 'blur(12px)' }}
              whileInView={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
              viewport={{ once: true }}
              transition={{
                duration: 0.8,
                delay: i * 0.06,
                ease: EASE,
              }}
              className="text-[22vw] md:text-[18vw] leading-[0.85] font-sans font-black tracking-tighter select-none inline-block"
              style={{
                color: '#F4F4F4',
                textShadow: '0 0 80px rgba(255,42,42,0.2)',
              }}
            >
              {letter}
            </motion.span>
          ))}
        </div>
      </div>

      {/* ================================================================
          BOTTOM BAR
      ================================================================ */}
      <div className="relative z-10 max-w-6xl mx-auto w-full">
        {/* Divider */}
        <div
          className="w-full h-px mb-6"
          style={{
            background:
              'linear-gradient(90deg, transparent, rgba(255,255,255,0.12), transparent)',
          }}
        />

        <div className="flex flex-col md:flex-row items-center justify-between gap-4 md:gap-6">
          {/* Left — copyright */}
          <div className="flex flex-col md:flex-row items-center gap-2 md:gap-4 text-center md:text-left">
            <p className="text-[9px] md:text-[10px] text-white/50">
              © {year} {FOOTER_DATA.brand.studio}
            </p>
            <span className="hidden md:block w-1 h-1 rounded-full bg-white/20" />
            <p className="text-[9px] md:text-[10px] text-white/40">
              {FOOTER_DATA.tech}
            </p>
          </div>

          {/* Right — legal links */}
          <div className="flex items-center gap-5">
            <a
              href={FOOTER_DATA.legal.privacy.href}
              className="group relative text-[9px] md:text-[10px] text-[#a3a3a3] hover:text-white transition-colors"
            >
              {FOOTER_DATA.legal.privacy.label}
              <span
                className="absolute -bottom-1 left-0 w-0 h-px transition-all duration-300 group-hover:w-full"
                style={{ backgroundColor: '#FF2A2A' }}
              />
            </a>
            <span className="w-1 h-1 rounded-full bg-white/20" />
            <a
              href={FOOTER_DATA.legal.terms.href}
              className="group relative text-[9px] md:text-[10px] text-[#a3a3a3] hover:text-white transition-colors"
            >
              {FOOTER_DATA.legal.terms.label}
              <span
                className="absolute -bottom-1 left-0 w-0 h-px transition-all duration-300 group-hover:w-full"
                style={{ backgroundColor: '#FF2A2A' }}
              />
            </a>

            {/* Back to top */}
            <a
              href="#home"
              aria-label="Back to top"
              className="group ml-2 w-9 h-9 rounded-full flex items-center justify-center transition-all duration-300"
              style={{
                backgroundColor: 'rgba(255,255,255,0.04)',
                border: '1px solid rgba(255,255,255,0.08)',
                color: '#d4d4d4',
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.backgroundColor = '#FF2A2A';
                e.currentTarget.style.borderColor = '#FF2A2A';
                e.currentTarget.style.color = '#FFFFFF';
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.backgroundColor = 'rgba(255,255,255,0.04)';
                e.currentTarget.style.borderColor = 'rgba(255,255,255,0.08)';
                e.currentTarget.style.color = '#d4d4d4';
              }}
            >
              <svg
                className="w-4 h-4 transition-transform duration-300 group-hover:-translate-y-0.5"
                fill="none"
                stroke="currentColor"
                strokeWidth="2.5"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M5 12h14M12 5l7 7-7 7"
                  transform="rotate(-90 12 12)"
                />
              </svg>
            </a>
          </div>
        </div>
      </div>
    </footer> 
  );
};

export default Footer;