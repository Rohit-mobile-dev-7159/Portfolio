import React, { useRef, useEffect, useState } from 'react';
import { motion, useScroll, useTransform, useSpring } from 'framer-motion';

// ---- Projects Data ------------------------------------------------------
const PROJECTS = [
    {
        tag: 'AI · NLP · LLM',
        title: 'PolicyGuard AI',
        description:
            'An AI-powered policy analysis platform that processes documents, extracts risk models, and provides intelligent pipeline Q&A using LLMs.',
        stack: ['React', 'Python', 'LLMs', 'NLP'],
        link: '#',
    },
    {
        tag: 'PERFORMANCE · FINANCE',
        title: 'Virtualized Financial Grid',
        description:
            'High-performance financial grid rendering 1,000,000 rows with custom manual virtualization, built for sub-millisecond updates.',
        stack: ['React', 'Vite', 'Vanilla CSS', 'Nginx'],
        link: '#',
    },
    {
        tag: 'SAAS · SECURITY · ISOLATION',
        title: 'Multi-Tenant SaaS Platform',
        description:
            'Scalable multi-tenant architecture with robust JWT authentication, fine-grained role-based access control (RBAC), and tenant isolation.',
        stack: ['Node.js', 'JWT', 'Docker', 'PostgreSQL'],
        link: '#',
    },
    {
        tag: 'DATA · ANALYTICS · DASHBOARD',
        title: 'Sales Insight Dashboard',
        description:
            'Interactive Power BI dashboard surfacing revenue trends, cohort analysis, and forecasting for a mid-market retail client.',
        stack: ['Power BI', 'SQL', 'Excel', 'Python'],
        link: '#',
    },
    {
        tag: 'PYTHON · AUTOMATION · ETL',
        title: 'AutoReport Pipeline',
        description:
            'End-to-end ETL pipeline that pulls data from multiple sources, cleanses it, and generates automated Excel and PDF reports on schedule.',
        stack: ['Python', 'Pandas', 'MySQL', 'Redis'],
        link: '#',
    },
    {
        tag: 'ML · FORECASTING · TIME SERIES',
        title: 'Demand Forecast Engine',
        description:
            'Time-series forecasting engine using Prophet and LSTM models to predict weekly SKU demand with 92% accuracy for inventory planning.',
        stack: ['Python', 'Scikit-learn', 'Prophet', 'FastAPI'],
        link: '#',
    },
];

// ---- Layout constants ---------------------------------------------------
const GAP = 36;
const CARD_W_DESKTOP = 480;
const CARD_W_MOBILE = 320;

// ---- Theme (dark red hover) --------------------------------------------
const DARK_RED = '#3D0709';
const BRIGHT_RED = '#E11D2E';

// =========================================================================
// Project Card
// =========================================================================
const ProjectCard = ({ project, index, total, progress, cardWidth }) => {
    const [hovered, setHovered] = useState(false);

    const centerP = total > 1 ? index / (total - 1) : 0.5;
    const range = 0.14;

    const scale = useTransform(
        progress,
        [centerP - range, centerP, centerP + range],
        [0.84, 1, 0.84],
        { clamp: true }
    );

    const opacity = useTransform(
        progress,
        [centerP - range, centerP, centerP + range],
        [0.4, 1, 0.4],
        { clamp: true }
    );

    const yOffset = useTransform(
        progress,
        [centerP - range, centerP, centerP + range],
        [30, 0, 30],
        { clamp: true }
    );

    return (
        <motion.div
            style={{
                width: cardWidth,
                scale,
                opacity,
                y: yOffset,
                transformOrigin: 'center center',

            }}
            className="shrink-0 will-change-transform"
        >
            <div
                onMouseEnter={() => setHovered(true)}
                onMouseLeave={() => setHovered(false)}
                className="relative rounded-[2rem] p-8 flex flex-col h-full cursor-pointer transition-all duration-500"
                style={{
                    backgroundColor: hovered ? DARK_RED : '#FFFFFF',
                    border: hovered
                        ? `2px solid ${BRIGHT_RED}`
                        : '1px solid rgba(0,0,0,0.08)',
                    boxShadow: hovered
                        ? `0 30px 60px -20px ${BRIGHT_RED}, 0 0 0 1px rgba(225,29,46,0.2)`
                        : '0 24px 48px -24px rgba(0,0,0,0.18)',
                    minHeight: 320,
                }}
            >
                {/* Hole punch */}
                <div
                    className="absolute -top-3 left-1/2 -translate-x-1/2 w-6 h-6 rounded-full transition-all duration-500"
                    style={{
                        background: hovered
                            ? `radial-gradient(circle at 40% 35%, #6B0F13, ${DARK_RED})`
                            : 'radial-gradient(circle at 40% 35%, #F5F5F5, #D0D0D0)',
                        boxShadow: hovered
                            ? 'inset 0 2px 4px rgba(0,0,0,0.6), 0 0 12px rgba(225,29,46,0.5)'
                            : 'inset 0 2px 4px rgba(0,0,0,0.2), 0 1px 0 rgba(255,255,255,0.8)',
                        border: hovered
                            ? `1px solid ${BRIGHT_RED}`
                            : '1px solid rgba(0,0,0,0.08)',
                    }}
                />

                {/* Tag / category line */}
                <div
                    className="text-[11px] font-black tracking-[0.22em] uppercase mb-4 mt-2 transition-colors duration-500"
                    style={{ color: hovered ? '#FF6B72' : BRIGHT_RED }}
                >
                    {project.tag}
                </div>

                {/* Title */}
                <h3
                    className="text-2xl font-black mb-4 tracking-tight leading-tight transition-colors duration-500"
                    style={{ color: hovered ? '#FFFFFF' : '#000000' }}
                >
                    {project.title}
                </h3>

                {/* Description */}
                <p
                    className="text-sm md:text-[15px] leading-relaxed mb-6 transition-colors duration-500"
                    style={{ color: hovered ? 'rgba(255,255,255,0.75)' : 'rgba(0,0,0,0.55)' }}
                >
                    {project.description}
                </p>

                {/* Stack pills */}
                <div className="flex flex-wrap gap-2 mb-8">
                    {project.stack.map((s) => (
                        <span
                            key={s}
                            className="px-3 py-1.5 text-[11px] font-semibold rounded-lg transition-all duration-500"
                            style={{
                                background: hovered
                                    ? 'rgba(225,29,46,0.18)'
                                    : '#F4F4F5',
                                color: hovered ? '#FFFFFF' : '#000000',
                                border: hovered
                                    ? '1px solid rgba(225,29,46,0.5)'
                                    : '1px solid rgba(0,0,0,0.06)',
                            }}
                        >
                            {s}
                        </span>
                    ))}
                </div>

                {/* Source link pinned to bottom */}
                <div className="mt-auto">
                    <a
                        href={project.link}
                        onClick={(e) => e.stopPropagation()}
                        className="inline-flex items-center gap-2 text-sm font-bold transition-colors duration-500"
                        style={{ color: hovered ? '#FFFFFF' : '#000000' }}
                    >
                        Source Code
                        <svg
                            className="w-4 h-4 transition-transform duration-300 group-hover:translate-x-1"
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
                </div>
            </div>
        </motion.div>
    );
};

// =========================================================================
// Projects Section
// =========================================================================
const Projects = () => {
    const sectionRef = useRef(null);
    const [viewportW, setViewportW] = useState(0);

    useEffect(() => {
        const update = () => setViewportW(window.innerWidth);
        update();
        window.addEventListener('resize', update);
        return () => window.removeEventListener('resize', update);
    }, []);

    const isMobile = viewportW < 768;
    const cardWidth = isMobile ? CARD_W_MOBILE : CARD_W_DESKTOP;

    const { scrollYProgress } = useScroll({
        target: sectionRef,
        offset: ['start start', 'end end'],
    });

    const smoothProgress = useSpring(scrollYProgress, {
        stiffness: 80,
        damping: 22,
        restDelta: 0.001,
    });

    const total = PROJECTS.length;
    const travel = (total - 1) * (cardWidth + GAP);

    const x = useTransform(smoothProgress, [0, 1], [0, -travel]);

    const paddingLeft = viewportW > 0 ? viewportW / 2 - cardWidth / 2 : 0;

    return (
        <section
            ref={sectionRef}
            id="projects"
            className="relative w-full"
            style={{
                height: isMobile ? '400vh' : '400vh',
                backgroundColor: '#FFFFFF',
            }}
        >
            {/* ---- Sticky viewport (flex column: header / carousel / bottom bar) ---- */}
            <div className="sticky top-0 h-screen w-full overflow-hidden flex flex-col">
                {/* Background grid */}
                <div className="absolute inset-0 pointer-events-none">
                    <div
                        className="absolute inset-0"
                        style={{
                            backgroundImage:
                                'linear-gradient(90deg, rgba(0,0,0,0.045) 1px, transparent 1px), linear-gradient(0deg, rgba(0,0,0,0.045) 1px, transparent 1px)',
                            backgroundSize: '80px 80px',
                            maskImage:
                                'radial-gradient(ellipse at 50% 50%, black 20%, transparent 78%)',
                            WebkitMaskImage:
                                'radial-gradient(ellipse at 50% 50%, black 20%, transparent 78%)',
                        }}
                    />
                </div>

                {/* Soft red ambient glow */}
                <div
                    className="pointer-events-none absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-[80vw] h-[60vh] rounded-full blur-3xl"
                    style={{ background: 'rgba(225,29,46,0.06)' }}
                />

                {/* ========== Header ========== */}
                <div className="relative z-10 shrink-0 max-w-6xl mx-auto w-full px-6 md:px-12 pt-20 md:pt-24 pb-10 md:pb-14">
                    <motion.h2
                        initial={{ opacity: 0, y: 24 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
                        className="text-2xl md:text-3xl lg:text-4xl font-black tracking-tight leading-[1.15]"
                        style={{ color: '#000000' }}
                    >
                        Projects That Define
                        <br />
                        <span className="relative inline-block">
                            My Journey
                            {/* Curved red underline */}
                            <svg
                                className="absolute left-0 right-0 -bottom-5 w-full"
                                height="14"
                                viewBox="0 0 300 14"
                                preserveAspectRatio="none"
                                fill="none" 
                            >
                                <motion.path
                                    d="M 4 8 Q 150 -4 296 8"
                                    stroke={BRIGHT_RED}
                                    strokeWidth="5"
                                    strokeLinecap="round"
                                    fill="none"
                                    initial={{ pathLength: 0, opacity: 0 }}
                                    whileInView={{ pathLength: 1, opacity: 0.9 }}
                                    viewport={{ once: true }}
                                    transition={{
                                        duration: 0.9,
                                        delay: 0.4,
                                        ease: [0.22, 1, 0.36, 1],
                                    }}
                                />
                            </svg>
                        </span>
                    </motion.h2>

                    <motion.p
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{
                            duration: 0.8,
                            delay: 0.15,
                            ease: [0.22, 1, 0.36, 1],
                        }}
                        className="mt-8 text-sm md:text-base font-medium max-w-xl leading-relaxed"
                        style={{ color: 'rgba(0,0,0,0.55)' }}
                    >
                        A curated portfolio of production-grade platforms, full-stack
                        microservices, and AI models built for scale and speed.
                    </motion.p>
                </div>

                {/* ========== Carousel (flex-1 fills remaining space, centers cards) ========== */}
                <div className="relative z-10 flex-1 flex items-center w-full min-h-0">
                    <motion.div
                        style={{ x, paddingLeft }}
                        className="flex items-stretch gap-9 will-change-transform"
                    >
                        {PROJECTS.map((project, i) => (
                            <ProjectCard
                                key={project.title}
                                project={project}
                                index={i}
                                total={total}
                                progress={smoothProgress}
                                cardWidth={cardWidth}
                            />
                        ))}
                    </motion.div>
                </div>

                {/* ========== Bottom bar (progress + hint) ========== */}
                <div className="relative z-20 shrink-0 w-full pb-6 md:pb-10 pt-10">
                    <div className="flex flex-col items-center gap-2">
                        {/* Progress bar */}
                        <div className="w-40 md:w-64">
                            <div
                                className="h-[3px] rounded-full overflow-hidden"
                                style={{ backgroundColor: 'rgba(0,0,0,0.08)' }}
                            >
                                <motion.div
                                    className="h-full origin-left"
                                    style={{
                                        scaleX: smoothProgress,
                                        backgroundColor: BRIGHT_RED,
                                    }}
                                />
                            </div>
                        </div>

                        {/* Hint */}
                        <div
                            className="text-[10px] font-bold tracking-[0.3em] uppercase"
                            style={{ color: 'rgba(0,0,0,0.4)' }}
                        >
                            Scroll to explore
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default Projects;