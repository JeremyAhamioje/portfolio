import { motion } from "framer-motion";
import { useInView } from "react-intersection-observer";

// ─── TYPES ────────────────────────────────────────────────────────────────────

type SkillBarItem = {
  label: string;
  pct: number;
};

type StatItem = {
  num: string;
  label: string;
};

type HeadingLine = {
  text: string;
  muted: boolean;
};

type SkillRowProps = {
  label: string;
  pct: number;
  delay: number;
  inView: boolean;
};

type ContactMarqueeProps = {
  href: string;
};

// ─── DATA ─────────────────────────────────────────────────────────────────────

const SKILLS_LIST: SkillBarItem[] = [
  { label: "SolidWorks",        pct: 88 },
  { label: "3D Assembly",       pct: 85 },
  { label: "Technical Drawing", pct: 82 },
  { label: "Motion Study",      pct: 78 },
  { label: "GD&T",              pct: 72 },
  { label: "FEA Basics",        pct: 65 },
];

const INTERESTS: string[] = [
  "CAD DESIGN",
  "TECHNICAL DRAWINGS",
  "MECHANISMS",
  "ROBOTICS",
  "MANUFACTURING",
  "MOTION STUDY",
];

const STATS: StatItem[] = [
  { num: "01+",  label: "Projects\nCompleted" },
  { num: "03+",  label: "CAD\nSoftware"       },
  { num: "500+", label: "Hours\nPracticed"    },
  { num: "12+",  label: "Skills\nLearned"     },
];

const HEADING_LINES: HeadingLine[] = [
  { text: "I AM",       muted: false },
  { text: "JEREMY A.",  muted: false },
  { text: "& I BUILD",  muted: true  },
  { text: "MECHANISMS", muted: false },
];

const CONTACT_LABEL = "HIRE ME · GET IN TOUCH · HIRE ME · GET IN TOUCH · ";

// ─── SKILL BAR ROW ────────────────────────────────────────────────────────────

function SkillRow({ label, pct, delay, inView }: SkillRowProps) {
  return (
    <motion.div
      initial={{ opacity: 0, x: -20 }}
      animate={inView ? { opacity: 1, x: 0 } : {}}
      transition={{ duration: 0.6, delay }}
      className="group flex items-center gap-6 py-4 cursor-default border-t"
      style={{ borderColor: "rgba(255,255,255,0.08)" }}
    >
      {/* Label */}
      <span
        className="font-body text-xs uppercase tracking-[0.3em] w-36 flex-shrink-0 group-hover:text-white transition-colors duration-300"
        style={{ color: "rgba(255,255,255,0.40)" }}
      >
        {label}
      </span>

      {/* Bar track */}
      <div
        className="flex-1 h-px relative overflow-visible"
        style={{ background: "rgba(255,255,255,0.08)" }}
      >
        {/* Filled bar */}
        <motion.div
          className="absolute top-1/2 -translate-y-1/2 h-px"
          style={{ background: "linear-gradient(to right, #f97316, rgba(249,115,22,0.4))" }}
          initial={{ width: 0 }}
          animate={inView ? { width: `${pct}%` } : { width: 0 }}
          transition={{ duration: 1.1, delay: delay + 0.2, ease: [0.22, 1, 0.36, 1] }}
        />
        {/* Dot */}
        <motion.div
          className="absolute top-1/2 -translate-y-1/2 w-1.5 h-1.5 rounded-full bg-orange-500"
          initial={{ left: 0, opacity: 0 }}
          animate={inView ? { left: `${pct}%`, opacity: 1 } : { left: 0, opacity: 0 }}
          transition={{ duration: 1.1, delay: delay + 0.2, ease: [0.22, 1, 0.36, 1] }}
        />
      </div>

      {/* Percentage */}
      <span
        className="font-condensed text-sm w-10 text-right flex-shrink-0 group-hover:text-orange-500 transition-colors duration-300"
        style={{ color: "rgba(255,255,255,0.20)" }}
      >
        {pct}
      </span>
    </motion.div>
  );
}

// ─── CONTACT MARQUEE PILL ─────────────────────────────────────────────────────

function ContactMarquee({ href }: ContactMarqueeProps) {
  return (
    <a
      href={href}
      className="relative flex items-center overflow-hidden rounded-full"
      style={{
        background: "#fff",
        height: "56px",
        maxWidth: "420px",
        textDecoration: "none",
        transition: "background 0.3s ease",
      }}
      onMouseEnter={(e: React.MouseEvent<HTMLAnchorElement>) => {
        e.currentTarget.style.background = "#f97316";
      }}
      onMouseLeave={(e: React.MouseEvent<HTMLAnchorElement>) => {
        e.currentTarget.style.background = "#fff";
      }}
    >
      <div
        style={{
          display: "flex",
          width: "max-content",
          animation: "marqueeContact 8s linear infinite",
        }}
      >
        {([...Array(6)] as undefined[]).map((_, i: number) => (
          <span
            key={i}
            className="font-condensed uppercase text-black text-sm tracking-[0.2em] pr-8 flex-shrink-0 whitespace-nowrap"
          >
            {CONTACT_LABEL}
          </span>
        ))}
      </div>
    </a>
  );
}

// ─── MAIN SECTION ─────────────────────────────────────────────────────────────

export function About() {
  // Object destructure — useInView returns object, not array
  const { ref,            inView       } = useInView({ triggerOnce: true, threshold: 0.05 });
  const { ref: skillsRef, inView: skillsInView } = useInView({ triggerOnce: true, threshold: 0.1  });

  return (
    <section id="about" className="relative bg-black overflow-hidden">

      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Anton&family=DM+Sans:ital,wght@0,300;0,400;0,700;1,300&display=swap');
        .font-condensed { font-family:'Anton','Arial Narrow',Impact,sans-serif; font-weight:400; letter-spacing:-0.01em; }
        .font-body      { font-family:'DM Sans',sans-serif; }
        .font-serif-it  { font-family:'DM Sans',Georgia,serif; font-style:italic; font-weight:300; }
        @keyframes marqueeContact {
          0%   { transform:translateX(0); }
          100% { transform:translateX(-50%); }
        }
        @keyframes sparkleAbout {
          0%,100% { opacity:1;   transform:scale(1)   rotate(0deg);  }
          50%     { opacity:0.5; transform:scale(1.4)  rotate(20deg); }
        }
      `}</style>

      {/* ── 1. HELLO INTRO BLOCK ── */}
      <div ref={ref} className="max-w-[1600px] mx-auto px-6 md:px-12 pt-32 md:pt-44 pb-24">

        <motion.p
          initial={{ opacity: 0, x: -20 }}
          animate={inView ? { opacity: 1, x: 0 } : {}}
          transition={{ duration: 0.7, delay: 0.1 }}
          className="font-serif-it text-lg md:text-xl mb-6"
          style={{ color: "rgba(255,255,255,0.40)" }}
        >
          Hello.
        </motion.p>

        {/* Giant heading lines */}
        <div className="overflow-hidden">
          {HEADING_LINES.map(({ text, muted }: HeadingLine, i: number) => (
            <motion.div
              key={text}
              initial={{ opacity: 0, y: 70 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.75, delay: 0.15 + i * 0.09, ease: [0.22, 1, 0.36, 1] }}
              className="font-condensed uppercase leading-[0.88] select-none"
              style={{
                fontSize: "clamp(3.5rem, 11vw, 10rem)",
                color: muted ? "rgba(255,255,255,0.14)" : "#fff",
                paddingLeft: muted ? "clamp(2rem, 8vw, 8rem)" : 0,
              }}
            >
              {text}
            </motion.div>
          ))}
        </div>

        {/* Orange rule */}
        <motion.div
          initial={{ scaleX: 0 }}
          animate={inView ? { scaleX: 1 } : {}}
          transition={{ duration: 1, delay: 0.5, ease: [0.22, 1, 0.36, 1] }}
          className="mt-10 h-px origin-left"
          style={{ background: "linear-gradient(to right, #f97316, rgba(249,115,22,0.2), transparent)" }}
        />

        {/* Body copy + stats grid */}
        <div className="mt-14 md:mt-20 grid md:grid-cols-12 gap-12 md:gap-16 items-start">

          {/* Left — prose */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.8, delay: 0.55 }}
            className="md:col-span-7 space-y-6"
          >
            <p className="font-body text-lg md:text-xl leading-relaxed" style={{ color: "rgba(255,255,255,0.60)" }}>
              I use my curiosity and hands-on mindset to build mechanical things that actually work.
              Mechanical engineering students don't often show their work early —
              I decided to start now.
            </p>
            <p className="font-body text-base md:text-lg leading-relaxed" style={{ color: "rgba(255,255,255,0.45)" }}>
              I focus on{" "}
              <span className="text-white font-medium">CAD design</span>,{" "}
              <span className="text-white font-medium">mechanism modelling</span>, and{" "}
              <span className="text-white font-medium">technical documentation</span>. My projects go
              from a rough idea to full assembly — sketches, exploded views, technical drawings, and
              motion studies. I love{" "}
              <span className="text-orange-400">robotics</span>,{" "}
              <span className="text-orange-400">manufacturing</span>, and{" "}
              <span className="text-orange-400">engineering systems</span>.
            </p>
            <p className="font-body text-lg md:text-xl font-medium leading-snug pt-2" style={{ color: "rgba(255,255,255,0.80)" }}>
              Building real mechanisms to prove competence.
            </p>

            {/* Sparkle disclaimer */}
            <div className="flex items-center gap-4 pt-6">
              <span
                className="text-2xl"
                style={{ animation: "sparkleAbout 2.5s ease-in-out infinite", display: "inline-block" }}
              >
                ✦
              </span>
              <p className="font-serif-it text-sm" style={{ color: "rgba(255,255,255,0.25)" }}>
                I am not a graduate yet — but the work is real.
              </p>
            </div>

            {/* Contact marquee pill */}
            <div className="pt-4">
              <ContactMarquee href="mailto:jeremy@example.com" />
            </div>
          </motion.div>

          {/* Right — ghost stats */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            animate={inView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.8, delay: 0.65 }}
            className="md:col-span-5 grid grid-cols-2 gap-0"
          >
            {STATS.map(({ num, label }: StatItem, i: number) => (
              <motion.div
                key={num}
                initial={{ opacity: 0, y: 20 }}
                animate={inView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.6, delay: 0.7 + i * 0.08 }}
                className="p-6 md:p-8 border-t group cursor-default"
                style={{
                  borderColor: "rgba(255,255,255,0.08)",
                  borderLeft: i % 2 === 1 ? "1px solid rgba(255,255,255,0.08)" : "none",
                  borderBottom: i < 2 ? "1px solid rgba(255,255,255,0.08)" : "none",
                }}
              >
                <div
                  className="font-condensed leading-none select-none group-hover:text-orange-500 transition-colors duration-300"
                  style={{ fontSize: "clamp(2.8rem, 6vw, 5rem)", color: "rgba(255,255,255,0.08)" }}
                >
                  {num}
                </div>
                <div
                  className="font-body text-xs uppercase tracking-[0.25em] mt-3 leading-relaxed whitespace-pre-line group-hover:text-white/50 transition-colors duration-300"
                  style={{ color: "rgba(255,255,255,0.30)" }}
                >
                  {label}
                </div>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </div>

      {/* ── 2. SKILLS BLOCK ── */}
      <div
        ref={skillsRef}
        className="border-t"
        style={{ background: "#070707", borderColor: "rgba(255,255,255,0.08)" }}
      >
        <div className="max-w-[1600px] mx-auto px-6 md:px-12 py-20 md:py-28">
          <div className="grid md:grid-cols-12 gap-12 md:gap-20">

            {/* Left — label + interests */}
            <div className="md:col-span-4">
              <motion.p
                initial={{ opacity: 0 }}
                animate={skillsInView ? { opacity: 1 } : {}}
                transition={{ duration: 0.6 }}
                className="font-body text-xs uppercase tracking-[0.45em] mb-8"
                style={{ color: "rgba(255,255,255,0.25)" }}
              >
                Technical Skills
              </motion.p>

              <motion.div
                initial={{ opacity: 0, y: 30 }}
                animate={skillsInView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.7, delay: 0.1, ease: [0.22, 1, 0.36, 1] }}
                className="font-condensed uppercase leading-none mb-10"
                style={{ fontSize: "clamp(2rem, 5vw, 4rem)", color: "#fff" }}
              >
                What I<br />
                <span style={{ color: "rgba(255,255,255,0.18)" }}>Work With</span>
              </motion.div>

              <div className="space-y-3 mt-4">
                {INTERESTS.map((interest: string, i: number) => (
                  <motion.div
                    key={interest}
                    initial={{ opacity: 0, x: -15 }}
                    animate={skillsInView ? { opacity: 1, x: 0 } : {}}
                    transition={{ duration: 0.5, delay: 0.2 + i * 0.06 }}
                    className="font-body text-xs uppercase tracking-[0.35em] flex items-center gap-3 hover:text-orange-400 transition-colors duration-200 cursor-default"
                    style={{ color: "rgba(255,255,255,0.20)" }}
                  >
                    <span style={{ color: "rgba(249,115,22,0.40)" }}>◆</span>
                    {interest}
                  </motion.div>
                ))}
              </div>
            </div>

            {/* Right — skill bars */}
            <div className="md:col-span-8">
              <div className="pt-0 md:pt-12">
                {SKILLS_LIST.map((skill: SkillBarItem, i: number) => (
                  <SkillRow
                    key={skill.label}
                    label={skill.label}
                    pct={skill.pct}
                    delay={0.1 + i * 0.08}
                    inView={skillsInView}
                  />
                ))}
                <div className="border-t mt-0" style={{ borderColor: "rgba(255,255,255,0.08)" }} />
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* ── 3. PHILOSOPHY QUOTE ── */}
      <div className="border-t" style={{ borderColor: "rgba(255,255,255,0.08)" }}>
        <div className="max-w-[1600px] mx-auto px-6 md:px-12 py-24 md:py-36">
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.3 }}
            transition={{ duration: 0.9, ease: [0.22, 1, 0.36, 1] }}
          >
            <p
              className="font-serif-it leading-tight"
              style={{
                fontSize: "clamp(1.6rem, 4vw, 3.2rem)",
                maxWidth: "900px",
                color: "rgba(255,255,255,0.70)",
              }}
            >
              "The best engineers don't just solve problems — they communicate
              solutions clearly through design, documentation,
              and real working prototypes."
            </p>
            <div className="flex items-center gap-6 mt-8">
              <div className="h-px w-12" style={{ background: "#f97316" }} />
              <p
                className="font-body text-xs uppercase tracking-[0.4em]"
                style={{ color: "rgba(255,255,255,0.25)" }}
              >
                Design Philosophy
              </p>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}