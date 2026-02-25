import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useInView } from "react-intersection-observer";

// ─── TYPES ────────────────────────────────────────────────────────────────────

type Tab = "render" | "exploded" | "motion" | "drawings";

type LightboxState = {
  images: string[];
  idx: number;
} | null;

type ProjectType = {
  id: string | number;
  title: string;
  subtitle: string;
  category: string;
  year: string;
  tags: string[];
  problem: string;
  solution: string;
  thumb: string;
  exploded: string;
  video?: string;
  drawings: string[];
  specs: string[];
};

type LightboxProps = {
  images: string[];
  startIdx: number;
  onClose: () => void;
};

type CaseDetailProps = {
  project: ProjectType;
};

type ProjectCardProps = {
  project: ProjectType;
  index: number;
  inView: boolean;
};

// ─── DATA ─────────────────────────────────────────────────────────────────────

const PROJECTS: ProjectType[] = [
  {
    id: 1,
    title: "SCISSOR JACK",
    subtitle: "CAR LIFTING MECHANISM",
    year: "2025",
    category: "Mechanical Design",
    tags: ["SolidWorks", "Motion Study", "Assembly", "Technical Drawing"],
    problem:
      "Design a compact, reliable car-lifting scissor jack that converts rotary screw motion into powerful vertical lift through a crossed-linkage mechanism.",
    solution:
      "A fully modelled scissor jack with lead screw actuation, pivot joints, and lifting pad — designed for real-world load transfer and ease of manufacture.",
    thumb:
      "https://res.cloudinary.com/dz6kxumoo/image/upload/v1771896340/Car_Scissor_Jack_Assembly.png_fspnaz.png",
    exploded:
      "https://res.cloudinary.com/dz6kxumoo/image/upload/v1771895342/Screenshot_2026-02-24_005631_cvbaxw.png",
    video:
      "https://res.cloudinary.com/dz6kxumoo/video/upload/v1771896379/Screen_Recording_2026-02-24_005824_cslrmp.mp4",
    drawings: [
      "https://res.cloudinary.com/dz6kxumoo/image/upload/v1771896658/Mechanical_scissor_jack_Drawing_page-0001_xh5dng.jpg",
      "https://res.cloudinary.com/dz6kxumoo/image/upload/v1771896664/Mechanical_scissor_jack_Drawing_page-0002_kc6rn4.jpg",
      "https://res.cloudinary.com/dz6kxumoo/image/upload/v1771896664/Mechanical_scissor_jack_Drawing_page-0003_bulwcm.jpg",
      "https://res.cloudinary.com/dz6kxumoo/image/upload/v1771896664/Mechanical_scissor_jack_Drawing_page-0004_bsmwzt.jpg",
      "https://res.cloudinary.com/dz6kxumoo/image/upload/v1771896655/Mechanical_scissor_jack_Drawing_page-0005_deczrp.jpg",
      "https://res.cloudinary.com/dz6kxumoo/image/upload/v1771896655/Mechanical_scissor_jack_Drawing_page-0006_j2q3ng.jpg",
      "https://res.cloudinary.com/dz6kxumoo/image/upload/v1771896656/Mechanical_scissor_jack_Drawing_page-0007_ochg3f.jpg",
      "https://res.cloudinary.com/dz6kxumoo/image/upload/v1771896657/Mechanical_scissor_jack_Drawing_page-0008_xq725k.jpg",
      "https://res.cloudinary.com/dz6kxumoo/image/upload/v1771896657/Mechanical_scissor_jack_Drawing_page-0010_fvdgdw.jpg",
    ],
    specs: ["Lead Screw Actuation", "Crossed-Linkage Arms", "Pivot Joint Design", "2-Tonne Capacity"],
  },
  {
    id: 2,
    title: "COMING SOON",
    subtitle: "IN DEVELOPMENT",
    year: "2025",
    category: "Mechanical Design",
    tags: ["SolidWorks"],
    problem: "New project in development.",
    solution: "Details coming soon.",
    thumb: "https://res.cloudinary.com/dz6kxumoo/image/upload/v1772033858/download_7_sjo2r4.jpg",
    exploded: "https://res.cloudinary.com/dz6kxumoo/image/upload/v1772033858/download_7_sjo2r4.jpg",
    drawings: [],
    specs: [],
  },
  {
    id: 3,
    title: "COMING SOON",
    subtitle: "IN DEVELOPMENT",
    year: "2025",
    category: "Mechanical Design",
    tags: ["SolidWorks"],
    problem: "New project in development.",
    solution: "Details coming soon.",
    thumb: "https://res.cloudinary.com/dz6kxumoo/image/upload/v1772033858/download_7_sjo2r4.jpg",
    exploded: "https://res.cloudinary.com/dz6kxumoo/image/upload/v1772033858/download_7_sjo2r4.jpg",
    drawings: [],
    specs: [],
  },
];

// ─── LIGHTBOX ─────────────────────────────────────────────────────────────────

function Lightbox({ images, startIdx, onClose }: LightboxProps) {
  const [idx, setIdx] = useState<number>(startIdx);

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      onClick={onClose}
      className="fixed inset-0 z-[100] flex items-center justify-center"
      style={{ background: "rgba(0,0,0,0.97)" }}
    >
      <motion.div
        initial={{ scale: 0.92, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        exit={{ scale: 0.92, opacity: 0 }}
        transition={{ duration: 0.3 }}
        onClick={(e: React.MouseEvent<HTMLDivElement>) => e.stopPropagation()}
        className="relative w-full max-w-6xl mx-6"
      >
        <button
          onClick={onClose}
          className=" absolute -top-12 right-0 text-white/40 hover:text-white transition-colors text-2xl font-light"
        >
          ✕ close
        </button>

        <img
          src={images[idx]}
          alt=""
          className="w-full rounded"
          style={{ maxHeight: "82vh", objectFit: "contain" }}
        />

        <div className="flex items-center justify-between mt-5">
          <button
            onClick={() => setIdx((i) => (i - 1 + images.length) % images.length)}
            className=" font-condensed text-white/40 hover:text-white text-sm uppercase tracking-widest transition-colors"
          >
            ← Prev
          </button>
          <span className="font-body text-white/20 text-xs tracking-widest">
            {String(idx + 1).padStart(2, "0")} / {String(images.length).padStart(2, "0")}
          </span>
          <button
            onClick={() => setIdx((i) => (i + 1) % images.length)}
            className="font-condensed text-white/40 hover:text-white text-sm uppercase tracking-widest transition-colors"
          >
            Next →
          </button>
        </div>
      </motion.div>
    </motion.div>
  );
}

// ─── CASE DETAIL ──────────────────────────────────────────────────────────────

function CaseDetail({ project }: CaseDetailProps) {
  const [activeTab, setActiveTab] = useState<Tab>("render");
  const [lightbox, setLightbox] = useState<LightboxState>(null);

  const TABS: { id: Tab; label: string }[] = [
    { id: "render", label: "3D Render" },
    { id: "exploded", label: "Sketch View" },
    { id: "motion", label: "Motion Study" },
    { id: "drawings", label: "Tech Drawings" },
  ];

  return (
    <motion.div
      initial={{ opacity: 0, height: 0 }}
      animate={{ opacity: 1, height: "auto" }}
      exit={{ opacity: 0, height: 0 }}
      transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
      style={{ overflow: "hidden" }}
    >
      <div className="py-12 md:py-16" style={{ background: "#0a0a0a" }}>
        <div className="max-w-[1600px] mx-auto px-6 md:px-12">
          {/* Tags */}
          <div className="flex flex-wrap gap-2 mb-10">
            {project.tags.map((tag) => (
              <span
                key={tag}
                className="font-body text-xs uppercase tracking-[0.2em] px-3 py-1.5 border"
                style={{ borderColor: "rgba(249,115,22,0.35)", color: "rgba(249,115,22,0.85)" }}
              >
                {tag}
              </span>
            ))}
          </div>

          {/* Problem / Solution */}
          <div className="grid md:grid-cols-2 gap-8 mb-12">
            {[
              { label: "Problem", text: project.problem },
              { label: "Solution", text: project.solution },
            ].map(({ label, text }) => (
              <div key={label} className="py-6 border-t" style={{ borderColor: "rgba(255,255,255,0.08)" }}>
                <p className="font-body text-xs uppercase tracking-[0.35em] text-orange-500 mb-4">{label}</p>
                <p className="font-body text-white/55 leading-relaxed text-sm md:text-base">{text}</p>
              </div>
            ))}
          </div>

          {/* Tab switcher */}
          <div className="flex gap-0 mb-0 border-b border-white/10 overflow-x-auto" style={{ scrollbarWidth: "none" }}>
            {TABS.map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className="btn-hero font-body relative px-6 py-4 text-xs uppercase tracking-[0.25em] whitespace-nowrap transition-colors duration-200 flex-shrink-0"
                style={{ color: activeTab === tab.id ? "#fff" : "rgba(255,255,255,0.3)" }}
              >
                {tab.label}
                {activeTab === tab.id && (
                  <motion.div layoutId="tab-indicator" className="absolute bottom-0 left-0 right-0 h-px bg-orange-500" />
                )}
              </button>
            ))}
          </div>

          {/* Tab content */}
          <div
            className="border border-t-0"
            style={{ minHeight: "400px", background: "#070707", borderColor: "rgba(255,255,255,0.08)" }}
          >
            <AnimatePresence mode="wait">
              {activeTab === "render" && (
                <motion.div
                  key="render"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: 0.35 }}
                  className="p-8 md:p-12 flex items-center justify-center"
                >
                  <img
                    src={project.thumb}
                    alt="3D Render"
                    className="max-h-[500px] w-auto max-w-full object-contain cursor-zoom-in hover:scale-[1.02] transition-transform duration-500"
                    onClick={() => setLightbox({ images: [project.thumb], idx: 0 })}
                  />
                </motion.div>
              )}

              {activeTab === "exploded" && (
                <motion.div
                  key="exploded"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: 0.35 }}
                  className="p-8 md:p-12 flex items-center justify-center"
                >
                  <img
                    src={project.exploded}
                    alt="Exploded View"
                    className="max-h-[500px] w-auto max-w-full object-contain cursor-zoom-in hover:scale-[1.02] transition-transform duration-500"
                    onClick={() => setLightbox({ images: [project.exploded], idx: 0 })}
                  />
                </motion.div>
              )}

              {activeTab === "motion" && (
                <motion.div
                  key="motion"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: 0.35 }}
                  className="p-8 md:p-12 flex items-center justify-center"
                >
                  {project.video ? (
                    <video src={project.video} controls autoPlay loop muted playsInline className="max-h-[500px] w-full max-w-4xl" />
                  ) : (
                    <p className="font-body text-white/30 text-sm uppercase tracking-widest">No motion study available</p>
                  )}
                </motion.div>
              )}

              {activeTab === "drawings" && (
                <motion.div
                  key="drawings"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: 0.35 }}
                  className="p-6 md:p-8"
                >
                  {project.drawings.length > 0 ? (
                    <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-3">
                      {project.drawings.map((src, i) => (
                        <motion.div
                          key={i}
                          whileHover={{ scale: 1.04 }}
                          onClick={() => setLightbox({ images: project.drawings, idx: i })}
                          className="group relative cursor-zoom-in overflow-hidden"
                          style={{ aspectRatio: "4/3", background: "#fff" }}
                        >
                          <img
                            src={src}
                            alt={`Drawing ${i + 1}`}
                            className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                          />
                          <div className="absolute inset-0 bg-black/0 group-hover:bg-black/25 transition-colors duration-300 flex items-center justify-center">
                            <span className="font-body text-white text-xs uppercase tracking-widest opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                              {String(i + 1).padStart(2, "0")}
                            </span>
                          </div>
                        </motion.div>
                      ))}
                    </div>
                  ) : (
                    <p className="font-body text-white/30 text-sm uppercase tracking-widest text-center py-12">
                      Technical drawings coming soon
                    </p>
                  )}
                </motion.div>
              )}
            </AnimatePresence>
          </div>

          {/* Specs */}
          {project.specs.length > 0 && (
            <div className="flex flex-wrap gap-x-10 gap-y-3 mt-8 pt-8 border-t" style={{ borderColor: "rgba(255,255,255,0.08)" }}>
              {project.specs.map((spec) => (
                <span key={spec} className="font-body text-white/30 text-xs uppercase tracking-[0.25em] flex items-center gap-2">
                  <span className="text-orange-500">◆</span> {spec}
                </span>
              ))}
            </div>
          )}
        </div>
      </div>

      <AnimatePresence>{lightbox && <Lightbox images={lightbox.images} startIdx={lightbox.idx} onClose={() => setLightbox(null)} />}</AnimatePresence>
    </motion.div>
  );
}

// ─── PROJECT CARD ─────────────────────────────────────────────────────────────

function ProjectCard({ project, index, inView }: ProjectCardProps) {
  const [isHovered, setIsHovered] = useState(false);
  const [isExpanded, setIsExpanded] = useState(false);
  const isComingSoon = project.title === "COMING SOON";
  
  // Alternate layout: even index = text left, odd index = text right
  const isReversed = index % 2 !== 0;

  return (
    <div className="border-b" style={{ borderColor: "rgba(255,255,255,0.08)" }}>
      <motion.div
        initial={{ opacity: 0, y: 40 }}
        animate={inView ? { opacity: 1, y: 0 } : {}}
        transition={{ duration: 0.8, delay: index * 0.15, ease: [0.22, 1, 0.36, 1] }}
        className="py-12 md:py-16"
        style={{ cursor: isComingSoon ? "default" : "pointer" }}
        onMouseEnter={() => !isComingSoon && setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
        onClick={() => !isComingSoon && setIsExpanded(!isExpanded)}
      >
        {/* Main row with alternating layout */}
        <div className={`grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12 ${isReversed ? 'lg:grid-flow-dense' : ''}`}>
          {/* Text content */}
          <div className={`flex flex-col justify-center ${isReversed ? 'lg:col-start-2 lg:pl-12' : 'lg:pr-12'}`}>
            <motion.h3
              className="font-condensed uppercase leading-[0.88] mb-3"
              style={{
                fontSize: "clamp(3rem, 8vw, 7rem)",
                color: isComingSoon ? "rgba(255,255,255,0.15)" : isHovered ? "#f97316" : "#fff",
                transition: "color 0.4s ease",
              }}
            >
              {project.title}
            </motion.h3>

            <p
              className="font-body text-xs uppercase tracking-[0.35em] mb-6"
              style={{
                color: isComingSoon ? "rgba(255,255,255,0.15)" : isHovered ? "rgba(249,115,22,0.6)" : "rgba(255,255,255,0.25)",
                transition: "color 0.4s ease",
              }}
            >
              {project.subtitle}
            </p>

            <motion.div
              initial={{ scaleX: 0 }}
              animate={inView ? { scaleX: 1 } : {}}
              transition={{ duration: 1, delay: index * 0.15 + 0.3, ease: [0.22, 1, 0.36, 1] }}
              className="h-px w-20 mb-6 origin-left"
              style={{
                background: isComingSoon ? "rgba(255,255,255,0.1)" : isHovered ? "#f97316" : "rgba(255,255,255,0.2)",
                transition: "background 0.4s ease",
              }}
            />

            <div className="flex items-center gap-6 mb-4">
              <span className="font-body text-xs tracking-widest" style={{ color: "rgba(255,255,255,0.3)" }}>
                {project.year}
              </span>
              <span className="font-body text-xs uppercase tracking-[0.25em]" style={{ color: "rgba(255,255,255,0.25)" }}>
                {project.category}
              </span>
            </div>

            {!isComingSoon && (
              <p
                className="font-body text-sm leading-relaxed max-w-md"
                style={{
                  color: isHovered ? "rgba(255,255,255,0.65)" : "rgba(255,255,255,0.4)",
                  transition: "color 0.4s ease",
                }}
              >
                {project.problem}
              </p>
            )}
          </div>

          {/* Image */}
          <div className={`relative overflow-hidden aspect-[4/3] ${isReversed ? 'lg:col-start-1 lg:row-start-1' : ''}`}>
            <motion.img
              src={project.thumb}
              alt={project.title}
              className="w-full h-full object-cover"
              style={{
                filter: isComingSoon
                  ? "grayscale(100%) brightness(0.3)"
                  : isHovered
                  ? "grayscale(0%) brightness(1)"
                  : "grayscale(100%) brightness(0.4)",
                transition: "filter 0.6s ease",
              }}
              animate={{ scale: isHovered && !isComingSoon ? 1.05 : 1 }}
              transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
            />

            {/* Overlay gradient */}
            <div
              className="absolute inset-0 pointer-events-none"
              style={{
                background: isReversed 
                  ? "linear-gradient(to left, rgba(0,0,0,0.3), transparent)"
                  : "linear-gradient(to right, rgba(0,0,0,0.3), transparent)",
                opacity: isHovered && !isComingSoon ? 0 : 1,
                transition: "opacity 0.6s ease",
              }}
            />
          </div>
        </div>
      </motion.div>

      {/* Expandable details */}
      <AnimatePresence>
        {isExpanded && !isComingSoon && <CaseDetail project={project} />}
      </AnimatePresence>
    </div>
  );
}

// ─── MAIN EXPORT ──────────────────────────────────────────────────────────────

export function Projects() {
  const { ref, inView } = useInView({ triggerOnce: true, threshold: 0.05 });

  return (
    <section id="projects" className="relative bg-black py-32 md:py-44">
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Anton&family=DM+Sans:wght@300;400;500;700&display=swap');
        .font-condensed { font-family:'Anton','Arial Narrow',Impact,sans-serif; font-weight:400; letter-spacing:-0.01em; }
        .font-body      { font-family:'DM Sans',sans-serif; }
      `}</style>

      <div ref={ref} className="max-w-[1600px] mx-auto px-6 md:px-12">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
          className="mb-20 md:mb-28"
        >
          <p className="font-body text-white/30 text-xs uppercase tracking-[0.45em] mb-8">Selected Cases</p>
          <div className="overflow-hidden">
            <h2
              className="font-condensed uppercase leading-[0.88]"
              style={{ fontSize: "clamp(4rem, 12vw, 10rem)", letterSpacing: "-0.02em", color: "#fff" }}
            >
              PROJECTS
            </h2>
          </div>
          <motion.div
            initial={{ scaleX: 0 }}
            animate={inView ? { scaleX: 1 } : {}}
            transition={{ duration: 1, delay: 0.3, ease: [0.22, 1, 0.36, 1] }}
            className="mt-10 h-px origin-left"
            style={{ background: "linear-gradient(to right, #f97316 0%, rgba(249,115,22,0.3) 40%, transparent 70%)" }}
          />
        </motion.div>

        {/* Project cards */}
        {PROJECTS.map((project, i) => (
          <ProjectCard key={project.id} project={project} index={i} inView={inView} />
        ))}
      </div>
    </section>
  );
}