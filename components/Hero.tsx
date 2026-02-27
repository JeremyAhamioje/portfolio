import { useState, useEffect } from "react";
import { motion } from "framer-motion";

const MARQUEE_TEXT =
  "MECHANICAL ENGINEER · CAD DESIGN · SOLIDWORKS · MOTION STUDY · TECHNICAL DRAWINGS · ASSEMBLY · GD&T · ";

const HERO_IMAGE =
  "https://res.cloudinary.com/dz6kxumoo/image/upload/v1771895356/Gemini_Generated_Image_xg2milxg2milxg2m_l8ek3e.png";

export function Hero() {
  const [currentDate, setCurrentDate] = useState({ day: "", month: "" });
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const now = new Date();
    const monthNames = ["jan","feb","mar","apr","may","jun","jul","aug","sep","oct","nov","dec"];
    setCurrentDate({ day: String(now.getDate()), month: monthNames[now.getMonth()] });
  }, []);

  useEffect(() => {
    const handler = (): void => setScrolled(window.scrollY > 80);
    window.addEventListener("scroll", handler, { passive: true });
    return () => window.removeEventListener("scroll", handler);
  }, []);

  const scrollTo = (id: string): void => {
    document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });
  };

  const accent = scrolled ? "#facc15" : "#f97316";

  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Anton&family=DM+Sans:ital,wght@0,300;0,400;0,700;1,300;1,400&display=swap');
        
        .font-condensed { 
          font-family:'Anton','Arial Narrow',Impact,sans-serif; 
          font-weight:400; 
          letter-spacing:-0.02em; 
        }
        .font-body { 
          font-family:'DM Sans',sans-serif; 
        }
        .font-italic-serif { 
          font-family:'DM Sans',Georgia,serif; 
          font-style:italic; 
          font-weight:300; 
        }

        @keyframes heroMarquee {
          0%   { transform:translateX(0); }
          100% { transform:translateX(-50%); }
        }
        .marquee-track {
          display:flex; 
          width:max-content;
          animation:heroMarquee 22s linear infinite;
        }

        @keyframes sparkleHero {
          0%,100%{ opacity:1; transform:scale(1) rotate(0deg); }
          50%    { opacity:.6; transform:scale(1.3) rotate(15deg); }
        }
        .sparkle { 
          animation:sparkleHero 2.5s ease-in-out infinite; 
          display:inline-block; 
        }

        * {
          box-sizing: border-box;
        }

        .cta-solid {
          background: ${accent} !important;
          color: #000 !important;
          transition: all 0.45s ease;
        }
        .cta-outline {
          background: transparent !important;
          color: ${accent} !important;
          border: 2px solid ${accent} !important;
          transition: all 0.45s ease;
        }
      `}</style>

      <section
        id="home"
        className="relative w-full min-h-screen overflow-hidden flex flex-col"
        style={{ background: "#080808" }}
      >
        {/* Hero image */}
        <motion.img
          src={HERO_IMAGE}
          alt=""
          aria-hidden="true"
          draggable={false}
          initial={{ scale: 1.08, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ duration: 1.6, ease: "easeOut" }}
          className="absolute inset-0 w-full h-full max-w-none object-cover object-center pointer-events-none select-none"
          style={{ filter: "grayscale(40%) brightness(0.52)" }}
        />

        {/* Scrims */}
        <div className="absolute inset-0 pointer-events-none"
          style={{ background: "linear-gradient(to bottom,rgba(0,0,0,.5) 0%,rgba(0,0,0,.08) 38%,rgba(0,0,0,.12) 60%,rgba(0,0,0,.88) 100%)" }} />
        <div className="absolute inset-y-0 left-0 w-2/5 pointer-events-none"
          style={{ background: "linear-gradient(to right,rgba(0,0,0,.78),transparent)" }} />
        <div className="absolute inset-y-0 right-0 w-1/4 pointer-events-none"
          style={{ background: "linear-gradient(to left,rgba(0,0,0,.55),transparent)" }} />

        {/* Content wrapper */}
        <div className="relative z-10 w-full h-full min-h-screen max-w-7xl mx-auto px-4 sm:px-6 md:px-10 flex flex-col overflow-hidden">

     

          {/* Main content */}
          <div className="flex-1 flex flex-col overflow-hidden">

            <motion.p
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.7, delay: 0.3 }}
              className="font-italic-serif text-base md:text-lg mt-6 md:mt-10 self-start"
              style={{ color: "rgba(255,255,255,0.6)" }}
            >
              creative
            </motion.p>

            {/* Heading words */}
            <div className="mt-2 md:mt-4 overflow-hidden w-full">
              {(["MECHANICAL", "ENGINEER", "& BUILDER"] as const).map((word, i) => (
                <motion.div
                  key={word}
                  initial={{ opacity: 0, y: 60 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.75, delay: 0.35 + i * 0.1, ease: [0.22, 1, 0.36, 1] }}
                  className="font-condensed leading-[0.88] uppercase select-none break-words"
                  style={{
                    fontSize: "clamp(3rem, 14vw, 13rem)",
                    color: word.startsWith("&") ? "rgba(255,255,255,0.22)" : "#fff",
                    marginLeft: word === "& BUILDER" ? "clamp(0.5rem, 3vw, 6rem)" : 0,
                    maxWidth: "100%",
                  }}
                >
                  {word}
                </motion.div>
              ))}
            </div>

            {/* Bottom cluster */}
            <div className="flex flex-col md:flex-row justify-center md:justify-end mt-auto mb-6 md:mb-10 gap-6 md:gap-10 items-center md:items-end w-full">

              {/* Description + buttons */}
              <motion.div
                initial={{ opacity: 0, x: 30 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.8, delay: 0.9 }}
                className="font-body text-center md:text-right w-full md:w-auto md:max-w-sm"
              >
                <p className="text-sm md:text-base font-light uppercase tracking-wider leading-relaxed"
                  style={{ color: "rgba(255,255,255,0.8)" }}>
                  I AM A <span className="font-bold text-white">MECHANICAL ENGINEER</span> FOCUSED ON{" "}
                  <span className="font-bold text-white">DESIGNING MECHANISMS</span> AND{" "}
                  <span className="font-bold text-white">ENGINEERING MOTION</span>.
                </p>
                <p className="text-xs md:text-sm mt-2 leading-relaxed tracking-wide uppercase"
                  style={{ color: "rgba(255,255,255,0.5)" }}>
                  I LOVE <span style={{ color: "rgba(255,255,255,0.8)" }}>CAD DESIGN</span>,{" "}
                  <span style={{ color: "rgba(255,255,255,0.8)" }}>TECHNICAL DRAWINGS</span>, AND{" "}
                  <span style={{ color: "rgba(255,255,255,0.8)" }}>BUILDING REAL THINGS</span>.
                </p>

                <div className="mt-6 flex flex-col sm:flex-row gap-3 justify-center md:justify-end items-stretch sm:items-center">
                  <motion.button
                    onClick={() => scrollTo("contact")}
                    whileHover={{ scale: 1.04 }}
                    whileTap={{ scale: 0.96 }}
                    className="btn-hero cta-solid font-body font-bold uppercase tracking-[0.18em] rounded-full px-6 md:px-8 py-3 md:py-4 text-sm md:text-base"
                    style={{ minWidth: "140px", border: "none", cursor: "pointer" }}
                  >
                    Contact Me
                  </motion.button>

                  <motion.a
                    href="/JeremyAhamiojeCV.pdf"
                    download="Jeremy_A_CV.pdf"
                    whileHover={{ scale: 1.04 }}
                    whileTap={{ scale: 0.96 }}
                    className="btn-hero cta-outline font-body font-bold uppercase tracking-[0.18em] rounded-full px-6 md:px-8 py-3 md:py-4 text-sm md:text-base flex items-center justify-center gap-2"
                    style={{
                      minWidth: "160px",
                      cursor: "pointer",
                      textDecoration: "none",
                    }}
                  >
                    <svg width="14" height="14" viewBox="0 0 14 14" fill="none" style={{ flexShrink: 0 }}>
                      <path d="M7 1.5v8M3.5 7 7 10.5 10.5 7M1.5 12.5h11"
                        stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round" />
                    </svg>
                    Download CV
                  </motion.a>
                </div>
              </motion.div>

              {/* Date badge */}
              <motion.div
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.7, delay: 0.8, ease: "backOut" }}
                className="font-condensed text-white text-center md:text-right leading-none select-none flex-shrink-0"
                style={{ minWidth: "clamp(7rem, 20vw, 9rem)" }}
              >
                <div className="flex items-start justify-center md:justify-end mb-1">
                  <span className="sparkle text-2xl md:text-3xl text-yellow-300">✦</span>
                </div>
                <div className="font-condensed"
                  style={{ fontSize: "clamp(4rem, 16vw, 14rem)", lineHeight: 0.85, letterSpacing: "-0.04em" }}>
                  {currentDate.day}
                </div>
                <div className="font-body text-center md:text-right mt-2">
                  <div className="text-white text-base md:text-lg font-light tracking-wide">
                    {currentDate.month}
                  </div>
                  <div className="text-xs uppercase tracking-[0.25em] mt-0.5" style={{ color: "rgba(255,255,255,0.5)" }}>
                    available<br />for internship
                  </div>
                </div>
              </motion.div>
            </div>
          </div>
        </div>

        {/* Marquee */}
        <div className="relative z-10 overflow-hidden border-t py-3"
          style={{ background: "rgba(0,0,0,0.5)", borderColor: "rgba(255,255,255,0.1)" }}>
          <div className="marquee-track font-condensed text-xs md:text-sm uppercase tracking-[0.25em]"
            style={{ color: "rgba(255,255,255,0.4)" }}>
            {([...Array(4)] as undefined[]).map((_: undefined, i: number) => (
              <span key={i}>{MARQUEE_TEXT}</span>
            ))}
          </div>
        </div>

        {/* Scroll indicator */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.5 }}
          className="absolute bottom-14 left-1/2 -translate-x-1/2 z-10"
        >
          <motion.div
            animate={{ y: [0, 8, 0] }}
            transition={{ duration: 1.6, repeat: Infinity, ease: "easeInOut" }}
            className="w-5 h-9 border rounded-full flex justify-center pt-1.5"
            style={{ borderColor: "rgba(255,255,255,0.25)" }}
          >
            <div className="w-0.5 h-2 rounded-full" style={{ background: "rgba(255,255,255,0.4)" }} />
          </motion.div>
        </motion.div>
      </section>
    </>
  );
}