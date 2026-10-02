import React, { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import mountain1 from "../assets/bg/mountain-1.png";
import mountain2 from "../assets/bg/mountain-2.png";
import mountain3 from "../assets/bg/mountain-3.png";
import mountain4 from "../assets/bg/mountain-4.png";
import mountain5 from "../assets/bg/mountain-5.png";
import mountain6 from "../assets/bg/mountain-6.png";
import cloude1 from "../assets/bg/cloude1.jpeg";
import cloude2 from "../assets/bg/cloude2.jpeg";

gsap.registerPlugin(ScrollTrigger);

// Corrected order: far background → foreground
const MOUNTAINS = [
  { src: mountain1, y: -5, scale: 1.02, opacity: 0.3 },   // farthest
  { src: mountain2, y: -10, scale: 1.04, opacity: 0.4 },
  { src: mountain3, y: -20, scale: 1.06, opacity: 0.55 },
  { src: mountain4, y: -30, scale: 1.08, opacity: 0.7 },
  { src: mountain5, y: -45, scale: 1.12, opacity: 0.85 }, // mid foreground
  { src: mountain6, y: -60, scale: 1.15, opacity: 1 },    // closest
];

const CLOUDS = [
  { src: cloude1, top: "12%", left: "-5%", width: "420px", x: -180 },
  { src: cloude2, top: "24%", left: "45%", width: "500px", x: 180 },
];

const Hero = () => {
  const wrapperRef = useRef(null);
  const mountainRefs = useRef([]);
  const cloudRefs = useRef([]);
  const contentRef = useRef(null);
  const titleRef = useRef(null);
  const subtitleRef = useRef(null);

  useEffect(() => {
    const wrapper = wrapperRef.current;
    if (!wrapper) return;

    const ctx = gsap.context(() => {
      // Initial states
      gsap.set(mountainRefs.current, { yPercent: 15, opacity: 0 });
      gsap.set(cloudRefs.current, { opacity: 0 });
      gsap.set(contentRef.current, { opacity: 0, y: 100 });

      // Intro animation
      const intro = gsap.timeline({ defaults: { ease: "power1.out" } });
      intro
        .to(mountainRefs.current, {
          yPercent: 0,
          opacity: (i) => MOUNTAINS[i].opacity,
          duration: 2.5,
          stagger: 0.2,
        })
        .to(cloudRefs.current, { opacity: 1, duration: 2, stagger: 0.25 }, "-=1.5")
        .to(contentRef.current, { opacity: 1, y: 0, duration: 1.5 }, "-=1");

      // Scroll parallax
      const scrollTimeline = gsap.timeline({
        scrollTrigger: {
          trigger: wrapper,
          start: "top top",
          end: "bottom bottom",
          scrub: 1.5,   // smoother scroll
          anticipatePin: 1,
        },
      });

      MOUNTAINS.forEach((layer, i) => {
        scrollTimeline.to(mountainRefs.current[i], {
          yPercent: layer.y,
          scale: layer.scale,
          ease: "power1.out",
        }, 0);
      });

      CLOUDS.forEach((cloud, i) => {
        scrollTimeline.to(cloudRefs.current[i], {
          x: cloud.x,
          yPercent: i % 2 === 0 ? -15 : 10,
          ease: "power1.out",
        }, 0);
      });

      scrollTimeline
        .to(titleRef.current, { yPercent: -35, scale: 0.9, ease: "none" }, 0)
        .to(subtitleRef.current, { yPercent: -60, opacity: 0, ease: "none" }, 0)
        .to(contentRef.current, { y: -180, ease: "none" }, 0);

      // Mouse depth effect
      const handleMouseMove = (e) => {
        const x = e.clientX / window.innerWidth - 0.5;
        const y = e.clientY / window.innerHeight - 0.5;
        mountainRefs.current.forEach((mountain, i) => {
          const strength = 4 + i * 4;
          gsap.to(mountain, {
            x: x * strength,
            y: `+=${y * strength * 0.15}`,
            duration: 1.4,
            ease: "power2.out",
            overwrite: "auto",
          });
        });
      };
      window.addEventListener("mousemove", handleMouseMove);

      return () => {
        window.removeEventListener("mousemove", handleMouseMove);
      };
    }, wrapper);

    return () => ctx.revert();
  }, []);

  return (
    <main>
      {/* Hero Section */}
      <section ref={wrapperRef} className="relative" style={{ height: "400vh" }}>
        <div className="sticky top-0 h-screen w-full overflow-hidden">
          {/* Sky */}
          <div
            className="absolute inset-0 z-0"
            style={{
              background:
                "linear-gradient(180deg,#86c5e8 0%,#b8dff0 38%,#dce7df 68%,#f7dfbd 100%)",
            }}
          />

          {/* Sun */}
          <div
            className="absolute right-[12%] top-[8%] z-[1] h-[420px] w-[420px] rounded-full pointer-events-none"
            style={{
              background:
                "radial-gradient(circle,rgba(255,242,190,.95) 0%,rgba(255,220,150,.45) 35%,transparent 70%)",
              filter: "blur(20px)",
            }}
          />

          {/* Mountains */}
          {MOUNTAINS.map((m, i) => (
            <div
              key={m.src}
              ref={(el) => (mountainRefs.current[i] = el)}
              className="absolute -inset-[15%] will-change-transform"
              style={{ zIndex: i + 5, opacity: m.opacity }}
            >
              <img
                src={m.src}
                alt=""
                draggable="false"
                className="absolute bottom-0 left-0 h-full w-full object-cover object-bottom select-none"
              />
            </div>
          ))}

          {/* Clouds */}
          {/* {CLOUDS.map((c, i) => (
            <img
              key={c.src}
              ref={(el) => (cloudRefs.current[i] = el)}
              src={c.src}
              alt=""
              draggable="false"
              className="absolute z-[20] pointer-events-none select-none will-change-transform"
              style={{ top: c.top, left: c.left, width: c.width }}
            />
          ))} */}

          {/* Overlay */}
          <div
            className="absolute inset-0 z-[30] pointer-events-none"
            style={{
              background:
                "linear-gradient(to bottom,transparent 45%,rgba(15,23,42,.08) 70%,rgba(15,23,42,.35) 100%)",
            }}
          />

          {/* Content */}
          <div ref={contentRef} className="absolute inset-0 z-[40] flex items-center">
            <div className="mx-auto w-full max-w-7xl px-6 md:px-12">
              <div className="max-w-2xl">
                <div className="mb-6 inline-flex rounded-full border border-white/30 bg-white/20 px-5 py-2 text-xs font-bold uppercase tracking-[.25em] text-slate-900 backdrop-blur-xl">
                  Creative Developer
                </div>

                <h1
                  ref={titleRef}
                  className="text-5xl font-black leading-[.95] tracking-tight text-slate-950 sm:text-6xl md:text-8xl"
                >
                  Building
                  <br />
                  <span className="text-slate-600">Digital</span>
                  <br />
                  Experiences.
                </h1>

                <p
                  ref={subtitleRef}
                  className="mt-8 max-w-xl text-base font-medium leading-relaxed text-slate-700 md:text-xl"
                >
                  I design and develop modern, scalable and interactive digital experiences using React, JavaScript and modern web technologies.
                </p>

                <div className="mt-8 flex gap-4">
                  <a
                    href="#projects"
                    className="rounded-full bg-slate-950 px-7 py-3 text-sm font-bold text-white shadow-xl transition hover:-translate-y-1"
                  >
                    Explore Work
                  </a>
                                   <a
                    href="#contact"
                    className="rounded-full border border-slate-900/20 bg-white/40 px-7 py-3 text-sm font-bold text-slate-900 backdrop-blur-xl transition hover:-translate-y-1"
                  >
                    Contact
                  </a>
                </div>
              </div>
            </div>
          </div>

          {/* Scroll Indicator */}
          <div className="absolute bottom-8 left-1/2 z-[50] -translate-x-1/2 text-center">
            <p className="text-[10px] font-bold uppercase tracking-[.3em] text-slate-800/70">
              Scroll
            </p>
            <div className="mx-auto mt-3 h-10 w-6 rounded-full border border-slate-900/30 p-1">
              <div className="mx-auto h-2 w-1.5 animate-bounce rounded-full bg-slate-900" />
            </div>
          </div>
        </div>
      </section>

      {/* Projects Section */}
      <section
        id="projects"
        className="relative z-[100] min-h-screen bg-slate-950 px-6 py-32 text-white"
      >
        <div className="mx-auto max-w-7xl">
          <p className="text-sm font-bold uppercase tracking-[.3em] text-slate-500">
            Selected Work
          </p>
          <h2 className="mt-5 text-5xl font-black md:text-7xl">
            Projects
          </h2>
          {/* Add your project cards or portfolio items here */}
        </div>
      </section>

      {/* Contact Section */}
      <section
        id="contact"
        className="relative z-[100] min-h-screen bg-slate-100 px-6 py-32 text-slate-900"
      >
        <div className="mx-auto max-w-7xl">
          <p className="text-sm font-bold uppercase tracking-[.3em] text-slate-500">
            Get In Touch
          </p>
          <h2 className="mt-5 text-5xl font-black md:text-7xl">
            Contact
          </h2>
          <p className="mt-6 max-w-xl text-base leading-relaxed text-slate-700 md:text-lg">
            Interested in working together or have a question? Drop me a message and I’ll get back to you.
          </p>
          <div className="mt-8">
            <a
              href="mailto:yourname@example.com"
              className="rounded-full bg-slate-950 px-7 py-3 text-sm font-bold text-white shadow-xl transition hover:-translate-y-1"
            >
              Email Me
            </a>
          </div>
        </div>
      </section>
    </main>
  );
};

export default Hero;

