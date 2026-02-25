import { motion } from "framer-motion";
import { useInView } from "react-intersection-observer";
import { useState } from "react";

// ─── TYPES ────────────────────────────────────────────────────────────────────

type SkillItem = {
  title: string;
  subtitle: string;
  description: string;
  image: string;
};

// ─── DATA ─────────────────────────────────────────────────────────────────────

const SKILLS: SkillItem[] = [
  {
    title: "CAD DESIGN",
    subtitle: "SOLIDWORKS, FUSION 360",
    description: "3D modelling and product development. Parts, assemblies, and full mechanisms from scratch with precision and intent.",
    image: "https://res.cloudinary.com/dz6kxumoo/image/upload/v1772035247/Phase_3%EF%B8%8F%E2%83%A3_Design_Finalization_Engineering_Tooling_Debug_Pre-Production_Factory_Visits_Adjustments_Full_Production__Our_Phase_3_-_Is_where_the_product_comes_to_life._We_do_last_minu_uqtvop.jpg",
  },
  {
    title: "MECHANICAL SYSTEMS",
    subtitle: "KINEMATICS, STATICS",
    description: "Linkages, mechanisms, and motion transfer. Understanding how forces move through a structure and designing accordingly.",
    image: "https://res.cloudinary.com/dz6kxumoo/image/upload/v1772035247/9_s7hkdf.jpg",
  },
  {
    title: "TECHNICAL DRAWINGS",
    subtitle: "GD&T, ANSI/ISO",
    description: "Manufacturing-ready documentation with proper dimensioning, tolerances, and geometric specifications that communicate design intent.",
    image: "https://res.cloudinary.com/dz6kxumoo/image/upload/v1772035247/Logiciel_dessin_technique_gratuit_vxztgj.jpg",
  },
];

const MARQUEE =
  "CONTINUOUS LEARNING · CONTINUOUS BUILDING · CONTINUOUS LEARNING · CONTINUOUS BUILDING · ";

// ─── SKILL CARD ───────────────────────────────────────────────────────────────

type SkillCardProps = {
  skill: SkillItem;
  index: number;
  inView: boolean;
};

function SkillCard({ skill, index, inView }: SkillCardProps) {
  const [isHovered, setIsHovered] = useState(false);
  const [isExpanded, setIsExpanded] = useState(false);

  return (
    <motion.div
      initial={{ opacity: 0, y: 40 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.8, delay: index * 0.15, ease: [0.22, 1, 0.36, 1] }}
      className="border-b cursor-pointer"
      style={{ borderColor: "rgba(255,255,255,0.08)" }}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      onClick={() => setIsExpanded(!isExpanded)}
    >
      {/* Main row */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-0 py-12 md:py-16">
        
        {/* Left: Text */}
        <div className="flex flex-col justify-center pr-0 lg:pr-12">
          <motion.h3
            className="font-condensed uppercase leading-[0.9] mb-4"
            style={{ 
              fontSize: "clamp(3rem, 8vw, 7rem)",
              color: isHovered ? "#f97316" : "#fff",
              transition: "color 0.4s ease"
            }}
          >
            {skill.title}
          </motion.h3>
          
          <p 
            className="font-body text-xs uppercase tracking-[0.35em] mb-6"
            style={{ 
              color: isHovered ? "rgba(249,115,22,0.6)" : "rgba(255,255,255,0.25)",
              transition: "color 0.4s ease"
            }}
          >
            {skill.subtitle}
          </p>

          <motion.div
            initial={{ scaleX: 0 }}
            animate={inView ? { scaleX: 1 } : {}}
            transition={{ duration: 1, delay: index * 0.15 + 0.3, ease: [0.22, 1, 0.36, 1] }}
            className="h-px w-20 mb-6 origin-left"
            style={{ 
              background: isHovered ? "#f97316" : "rgba(255,255,255,0.2)",
              transition: "background 0.4s ease"
            }}
          />

          <p 
            className="font-body text-sm md:text-base leading-relaxed max-w-md"
            style={{ 
              color: isHovered ? "rgba(255,255,255,0.65)" : "rgba(255,255,255,0.4)",
              transition: "color 0.4s ease"
            }}
          >
            {skill.description}
          </p>
        </div>

        {/* Right: Image */}
        <div className="relative overflow-hidden mt-8 lg:mt-0 aspect-[4/3]">
          <motion.img
            src={skill.image}
            alt={skill.title}
            className="w-full h-full object-cover"
            style={{
              filter: isHovered ? "grayscale(0%) brightness(1)" : "grayscale(100%) brightness(0.4)",
              transition: "filter 0.6s ease",
              scale: isHovered ? 1.05 : 1,
            }}
            animate={{ scale: isHovered ? 1.05 : 1 }}
            transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
          />
          
          {/* Overlay gradient */}
          <div 
            className="absolute inset-0 pointer-events-none"
            style={{
              background: "linear-gradient(to right, rgba(0,0,0,0.3), transparent)",
              opacity: isHovered ? 0 : 1,
              transition: "opacity 0.6s ease"
            }}
          />
        </div>
      </div>

      {/* Expandable details */}
      <motion.div
        initial={false}
        animate={{ 
          height: isExpanded ? "auto" : 0,
          opacity: isExpanded ? 1 : 0
        }}
        transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
        className="overflow-hidden"
      >
        <div 
          className="pb-8 pt-0 font-body text-sm leading-relaxed"
          style={{ color: "rgba(255,255,255,0.35)" }}
        >
          <p className="max-w-2xl">
            Additional details and project examples related to {skill.title.toLowerCase()}  
             are shown in the projects section. That section gives a clean, expandable interface 
            which describes the skills in more depth.
          </p>
        </div>
      </motion.div>
    </motion.div>
  );
}

// ─── MAIN SECTION ─────────────────────────────────────────────────────────────

export function Skills() {
  const { ref, inView } = useInView({ triggerOnce: true, threshold: 0.05 });
  const { ref: bottomRef, inView: bottomInView } = useInView({ triggerOnce: true, threshold: 0.1 });

  return (
    <section
      id="skills"
      className="relative overflow-hidden"
      style={{ background: "#050505" }}
    >
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Anton&family=DM+Sans:ital,wght@0,300;0,400;0,700;1,300&display=swap');
        .font-condensed { font-family:'Anton','Arial Narrow',Impact,sans-serif; font-weight:400; letter-spacing:-0.01em; }
        .font-body      { font-family:'DM Sans',sans-serif; }
        .font-serif-it  { font-family:'DM Sans',Georgia,serif; font-style:italic; font-weight:300; }
        @keyframes marqueeSkills {
          0%   { transform:translateX(0); }
          100% { transform:translateX(-50%); }
        }
        .sparkle-star {
          display:inline-block;
          animation:sparkleSk 2.5s ease-in-out infinite;
          color:rgba(249,115,22,0.7);
        }
        @keyframes sparkleSk {
          0%,100% { opacity:1;   transform:scale(1)   rotate(0deg);  }
          50%     { opacity:0.5; transform:scale(1.4)  rotate(20deg); }
        }
      `}</style>

      {/* ── Main content ── */}
      <div ref={ref} className="max-w-[1600px] mx-auto px-6 md:px-12 pt-32 md:pt-44 pb-20">

        {/* Section header */}
        <div className="mb-20 md:mb-28">
          <motion.p
            initial={{ opacity: 0 }}
            animate={inView ? { opacity: 1 } : {}}
            transition={{ duration: 0.6 }}
            className="font-body text-xs uppercase tracking-[0.45em] mb-8"
            style={{ color: "rgba(255,255,255,0.25)" }}
          >
            Core Competencies
          </motion.p>

          <div className="overflow-hidden">
            {(
              [
                { text: "WHAT I",  muted: false },
                { text: "DO WELL", muted: true  },
              ] as { text: string; muted: boolean }[]
            ).map(({ text, muted }, i) => (
              <motion.div
                key={text}
                initial={{ opacity: 0, y: 60 }}
                animate={inView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.75, delay: 0.1 + i * 0.1, ease: [0.22, 1, 0.36, 1] }}
                className="font-condensed uppercase leading-[0.88] select-none"
                style={{
                  fontSize: "clamp(4rem, 12vw, 10rem)",
                  color: muted ? "rgba(255,255,255,0.10)" : "#fff",
                  paddingLeft: muted ? "clamp(3rem, 10vw, 10rem)" : 0,
                }}
              >
                {text}
              </motion.div>
            ))}
          </div>

          <motion.div
            initial={{ scaleX: 0 }}
            animate={inView ? { scaleX: 1 } : {}}
            transition={{ duration: 1, delay: 0.3, ease: [0.22, 1, 0.36, 1] }}
            className="mt-10 h-px origin-left"
            style={{ background: "linear-gradient(to right, #f97316, rgba(249,115,22,0.2), transparent)" }}
          />
        </div>

        {/* Skill cards */}
        {SKILLS.map((skill, i) => (
          <SkillCard
            key={skill.title}
            skill={skill}
            index={i}
            inView={inView}
          />
        ))}
      </div>

      {/* ── Philosophy panel ── */}
      <div
        ref={bottomRef}
        className="border-t"
        style={{ background: "#020202", borderColor: "rgba(255,255,255,0.08)" }}
      >
        <div className="max-w-[1600px] mx-auto px-6 md:px-12 py-20 md:py-28">
          <div className="grid md:grid-cols-12 gap-12 items-center">

            {/* Quote */}
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              animate={bottomInView ? { opacity: 1, x: 0 } : {}}
              transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
              className="md:col-span-7"
            >
              <span className="sparkle-star text-3xl mb-6 block">✦</span>
              <p
                className="font-serif-it leading-snug"
                style={{ fontSize: "clamp(1.4rem, 3vw, 2.4rem)", color: "rgba(255,255,255,0.55)" }}
              >
                "Continuous learning.<br />Continuous building."
              </p>
              <div className="flex items-center gap-4 mt-8">
                <div className="h-px w-12" style={{ background: "#f97316" }} />
                <span
                  className="font-body text-xs uppercase tracking-[0.35em]"
                  style={{ color: "rgba(255,255,255,0.20)" }}
                >
                  Engineering Mindset
                </span>
              </div>
            </motion.div>

            {/* Empty space for balance */}
            <div className="md:col-span-5" />
          </div>
        </div>
      </div>

      {/* ── Marquee ── */}
      <div
        className="border-t overflow-hidden py-4"
        style={{ background: "#000", borderColor: "rgba(255,255,255,0.08)" }}
      >
        <div
          style={{
            display: "flex",
            width: "max-content",
            animation: "marqueeSkills 16s linear infinite",
          }}
        >
          {([...Array(4)] as undefined[]).map((_, i: number) => (
            <span
              key={i}
              className="font-condensed uppercase text-xl md:text-2xl tracking-widest flex-shrink-0"
              style={{ color: "rgba(255,255,255,0.08)" }}
            >
              {MARQUEE}
            </span>
          ))}
        </div>
      </div>
    </section>
  );
}