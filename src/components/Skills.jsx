import React, { useState } from 'react';
import { motion } from 'framer-motion';

const Skills = () => {
  const skillsData = [
    {
      number: '01',
      category: 'Data Analytics',
      tagline: 'Turning data into decisions',
      role: 'Data Analyst',
      description:
        'I clean, analyze and visualize raw data to uncover trends — building dashboards, automated reports and models that drive smarter decisions.',
      skills: [
        'Excel',
        'SQL',
        'Power BI',
        'Python',
        'Pandas',
        'NumPy',
        'Matplotlib',
      ],
    },
    {
      number: '02',
      category: 'Frontend Development',
      tagline: 'Crafting fast, responsive UIs',
      role: 'Frontend Developer',
      description:
        'I build responsive, accessible interfaces with modern frameworks — translating designs into pixel-perfect experiences that feel fast on every device.',
      skills: [
        'React',
        'React Native',
        'JavaScript',
        'HTML5',
        'CSS3',
        'Tailwind CSS',
      ],
    },
    {
      number: '03',
      category: 'Backend Development',
      tagline: 'Scalable APIs & data layers',
      role: 'Backend Developer',
      description:
        'I design secure server-side systems, REST APIs and databases focused on scalability, performance and clean architecture.',
      skills: [
        'Node.js',
        'Express.js',
        'MySQL',
        'MongoDB',
        'Redis',
        'REST APIs',
      ],
    },
    {
      number: '04',
      category: 'Tools & Workflow',
      tagline: 'Day-to-day toolkit',
      role: 'Engineering Workflow',
      description:
        'The tools and practices I use daily — version control, notebooks, API testing and Linux — to ship code and insights with speed.',
      skills: [
        'Git',
        'GitHub',
        'Jupyter',
        'VS Code',
        'Postman',
        'Linux',
      ],
    },
  ];

  const SkillCard = ({ number, category, tagline, role, description, skills, index }) => {
    const [hovered, setHovered] = useState(false);

    return (
      <motion.div
        initial={{ opacity: 0, y: 40 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.15 }}
        transition={{
          duration: 0.6,
          delay: index * 0.12,
          ease: [0.22, 1, 0.36, 1],
        }}
        onHoverStart={() => setHovered(true)}
        onHoverEnd={() => setHovered(false)}
        className="group relative h-full w-full"
      >
        <motion.div
          animate={
            hovered
              ? {
                  rotate: [0, -4, 4, -2, 0],
                  y: -8,
                  scale: 1.02,
                }
              : {
                  rotate: 0,
                  y: 0,
                  scale: 1,
                }
          }
          transition={
            hovered
              ? {
                  rotate: { duration: 0.6, ease: 'easeInOut' },
                  y: { type: 'spring', stiffness: 260, damping: 20 },
                  scale: { type: 'spring', stiffness: 260, damping: 20 },
                }
              : {
                  type: 'spring',
                  stiffness: 260,
                  damping: 20,
                }
          }
          className="relative rounded-3xl p-5 md:p-6 transition-colors duration-500 overflow-hidden h-full flex flex-col"
          style={{
            backgroundColor: hovered ? '#3D0709' : '#FFFFFF',
            border: hovered ? '2px solid #FF2A2A' : '2px solid #5A0A0E',
            boxShadow: hovered
              ? '0 12px 0 #FF2A2A, 0 22px 44px -12px rgba(255,42,42,0.5)'
              : '0 8px 0 #5A0A0E',
          }}
        >
          {/* Red corner accent */}
          <div
            className="absolute -top-px -left-px w-16 h-16 rounded-tl-3xl overflow-hidden pointer-events-none transition-opacity duration-300"
            style={{ opacity: hovered ? 0 : 1 }}
            aria-hidden
          >
            <div
              className="absolute top-0 left-0 w-full h-full"
              style={{
                background:
                  'linear-gradient(135deg, #FF2A2A 0%, #FF2A2A 40%, transparent 40%)',
              }}
            />
          </div>

          {/* Radial glow on hover */}
          <div
            className="absolute inset-0 pointer-events-none rounded-3xl transition-opacity duration-500"
            style={{
              opacity: hovered ? 1 : 0,
              background:
                'radial-gradient(circle at 50% 0%, rgba(255,42,42,0.28), transparent 70%)',
            }}
          />

          {/* Content */}
          <div className="relative z-10 flex flex-col">
            {/* Number + tagline row */}
            <div className="flex items-start justify-between mb-3 ms-5">
              <span
                className="text-sm md:text-base font-black tracking-[0.28em] uppercase transition-colors duration-300"
                style={{ color: hovered ? '#FF8B92' : '#FF2A2A' }}
              >
                {number}
              </span>
              <span
                className="text-[11px] md:text-xs font-bold tracking-wider uppercase text-right max-w-[150px] transition-colors duration-300"
                style={{
                  color: hovered ? 'rgba(255,255,255,0.7)' : 'rgba(0,0,0,0.45)',
                }}
              >
                {tagline}
              </span>
            </div>

            {/* Title + role chip */}
            <div className="flex flex-wrap items-center gap-x-3 gap-y-1.5 mb-3">
              <h3
                className="text-xl md:text-2xl font-black tracking-tight leading-tight transition-colors duration-300"
                style={{ color: hovered ? '#FFFFFF' : '#000000' }}
              >
                {category}
              </h3>

              <div
                className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full transition-colors duration-300"
                style={{
                  backgroundColor: hovered
                    ? 'rgba(255,42,42,0.18)'
                    : 'rgba(90,10,14,0.06)',
                  border: hovered
                    ? '1px solid rgba(255,42,42,0.5)'
                    : '1px solid rgba(90,10,14,0.15)',
                }}
              >
                <span
                  className="w-1.5 h-1.5 rounded-full transition-colors duration-300"
                  style={{ backgroundColor: hovered ? '#FF8B92' : '#FF2A2A' }}
                />
                <span
                  className="text-[11px] md:text-xs font-black tracking-[0.12em] uppercase transition-colors duration-300"
                  style={{ color: hovered ? '#FFFFFF' : '#5A0A0E' }}
                >
                  {role}
                </span>
              </div>
            </div>

            {/* Divider */}
            <div
              className="w-full h-px mb-3 transition-colors duration-300"
              style={{
                backgroundColor: hovered
                  ? 'rgba(255,255,255,0.18)'
                  : 'rgba(0,0,0,0.12)',
              }}
            />

            {/* Description */}
            <p
              className="text-sm md:text-[15px] leading-relaxed mb-4 transition-colors duration-300"
              style={{
                color: hovered
                  ? 'rgba(255,255,255,0.78)'
                  : 'rgba(0,0,0,0.65)',
              }}
            >
              {description}
            </p>

            {/* Skills pills */}
            <div className="flex flex-wrap gap-2">
              {skills.map((skill, idx) => (
                <motion.span
                  key={idx}
                  initial={{ opacity: 0, scale: 0.9 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  viewport={{ once: true }}
                  transition={{ delay: 0.3 + idx * 0.04, duration: 0.35 }}
                  whileHover={{ y: -2, scale: 1.06 }}
                  className="px-3 py-1.5 text-xs md:text-sm font-bold rounded-full cursor-default select-none transition-colors duration-300"
                  style={{
                    color: hovered ? '#FFFFFF' : '#000000',
                    backgroundColor: hovered
                      ? 'rgba(255,42,42,0.22)'
                      : '#F4F4F4',
                    border: hovered
                      ? '1.5px solid rgba(255,42,42,0.6)'
                      : '1.5px solid rgba(0,0,0,0.1)',
                  }}
                >
                  {skill}
                </motion.span>
              ))}
            </div>
          </div>
        </motion.div>
      </motion.div>
    );
  };

  return (
    <section
      id="skills"
      className="relative w-full py-16 md:py-24 overflow-hidden"
      style={{ backgroundColor: '#FFFFFF' }}
    >
      {/* Grid pattern */}
      <div className="absolute inset-0 pointer-events-none">
        <div
          className="absolute inset-0"
          style={{
            backgroundImage:
              'linear-gradient(90deg, rgba(90,10,14,0.06) 1px, transparent 1px), linear-gradient(0deg, rgba(90,10,14,0.06) 1px, transparent 1px)',
            backgroundSize: '60px 60px',
            maskImage:
              'radial-gradient(circle at 50% 50%, black 30%, transparent 85%)',
            WebkitMaskImage:
              'radial-gradient(circle at 50% 50%, black 30%, transparent 85%)',
          }}
        />
      </div>

      {/* Floating red blobs */}
      <motion.div
        animate={{ y: [0, 10, 0], opacity: [0.05, 0.1, 0.05] }}
        transition={{ duration: 7, repeat: Infinity, ease: 'easeInOut' }}
        className="absolute top-12 -right-12 w-64 h-64 rounded-full blur-3xl pointer-events-none"
        style={{ backgroundColor: '#FF2A2A' }}
      />
      <motion.div
        animate={{ y: [0, -10, 0], opacity: [0.04, 0.08, 0.04] }}
        transition={{ duration: 9, repeat: Infinity, ease: 'easeInOut' }}
        className="absolute -bottom-10 -left-10 w-72 h-72 rounded-full blur-3xl pointer-events-none"
        style={{ backgroundColor: '#FF2A2A' }}
      />

      <div className="relative z-10 max-w-5xl mx-auto px-6 md:px-8">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: -16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
          className="mb-10 md:mb-14"
        >
          <div className="mb-4">
            <span
              className="inline-block text-xs md:text-sm font-black uppercase tracking-[0.3em] px-4 py-2 rounded-full"
              style={{
                color: '#000000',
                backgroundColor: '#FFFFFF',
                border: '2px solid #5A0A0E',
              }}
            >
              Technical Stack
            </span>
          </div>

          <h2
            className="text-4xl md:text-5xl lg:text-6xl font-black mb-4 tracking-tight leading-[1.05]"
            style={{ color: '#000000' }}
          >
            Technologies I{' '}
            <span style={{ color: '#FF2A2A' }}>Work With</span>
          </h2>

          <p
            className="text-base md:text-lg font-medium max-w-2xl leading-relaxed"
            style={{ color: 'rgba(0,0,0,0.6)' }}
          >
            A focused toolkit across data analytics, full-stack development and
            modern workflows — everything I use to ship clean, data-driven
            products.
          </p>
        </motion.div>

        {/* Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-5 md:gap-6">
          {skillsData.map((item, idx) => (
            <SkillCard
              key={idx}
              index={idx}
              number={item.number}
              category={item.category}
              tagline={item.tagline}
              role={item.role}
              description={item.description}
              skills={item.skills}
            />
          ))}
        </div>
      </div>
    </section>
  );
};

export default Skills;