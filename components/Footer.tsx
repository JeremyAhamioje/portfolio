import { motion } from "framer-motion";
import { useInView } from "react-intersection-observer";

// ─── TYPES ────────────────────────────────────────────────────────────────────

type SocialLink = {
  label: string;
  href: string;
};

type HeadingLine = {
  text: string;
  muted: boolean;
};

// ─── DATA ─────────────────────────────────────────────────────────────────────

const SOCIAL_LINKS: SocialLink[] = [
  { label: "LinkedIn", href: "https://linkedin.com" },
  { label: "GitHub",   href: "https://github.com"   },
  { label: "Instagram",  href: "https://instagram.com"  },
];

const NAV_LINKS: string[] = ["home", "projects", "about", "skills"];

const HEADING_LINES: HeadingLine[] = [
  { text: "LET'S",   muted: false },
  { text: "CONNECT", muted: false },
  { text: "& BUILD", muted: true  },
];

const CONTACT_MARQUEE =
  "LET'S CONNECT · HIRE ME · LET'S CONNECT · HIRE ME · LET'S CONNECT · HIRE ME · ";

// ─── COMPONENT ────────────────────────────────────────────────────────────────

export function Footer() {
  const currentYear: number = new Date().getFullYear();

  // TS7006 fix: id typed as string
  const scrollTo = (id: string): void => {
    document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });
  };

  // useInView returns an object — destructure with {}
  const { ref,           inView    } = useInView({ triggerOnce: true, threshold: 0.05 });
  const { ref: imgRef,   inView: imgInView } = useInView({ triggerOnce: true, threshold: 0.1 });

  return (
    <footer id="contact" className="relative overflow-hidden" style={{ background: "#000" }}>

      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Anton&family=DM+Sans:ital,wght@0,300;0,400;0,700;1,300&display=swap');
        .font-condensed { font-family:'Anton','Arial Narrow',Impact,sans-serif; font-weight:400; letter-spacing:-0.01em; }
        .font-body      { font-family:'DM Sans',sans-serif; }
        .font-serif-it  { font-family:'DM Sans',Georgia,serif; font-style:italic; font-weight:300; }
        @keyframes marqueeFooter {
          0%   { transform:translateX(0); }
          100% { transform:translateX(-50%); }
        }
      `}</style>

      {/* ── 1. BIG CTA HEADING ── */}
      <div ref={ref} className="max-w-[1600px] mx-auto px-6 md:px-12 pt-32 md:pt-44">

        <motion.p
          initial={{ opacity: 0, x: -20 }}
          animate={inView ? { opacity: 1, x: 0 } : {}}
          transition={{ duration: 0.7, delay: 0.1 }}
          className="font-serif-it text-lg md:text-xl mb-5"
          style={{ color: "rgba(255,255,255,0.35)" }}
        >
          Are you creating a project?
        </motion.p>

        <div className="overflow-hidden mb-10">
          {HEADING_LINES.map(({ text, muted }: HeadingLine, i: number) => (
            <motion.div
              key={text}
              initial={{ opacity: 0, y: 70 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.75, delay: 0.15 + i * 0.09, ease: [0.22, 1, 0.36, 1] }}
              className="font-condensed uppercase leading-[0.88] select-none"
              style={{
                fontSize: "clamp(4rem, 13vw, 11rem)",
                color: muted ? "rgba(255,255,255,0.10)" : "#fff",
                paddingLeft: muted ? "clamp(3rem, 12vw, 12rem)" : 0,
              }}
            >
              {text}
            </motion.div>
          ))}
        </div>

        <motion.div
          initial={{ scaleX: 0 }}
          animate={inView ? { scaleX: 1 } : {}}
          transition={{ duration: 1, delay: 0.4, ease: [0.22, 1, 0.36, 1] }}
          className="h-px origin-left mb-16 md:mb-24"
          style={{ background: "linear-gradient(to right, #f97316, rgba(249,115,22,0.2), transparent)" }}
        />
      </div>

      {/* ── 2. PHOTO + CONTACT GRID ── */}
      <div ref={imgRef} className="max-w-[1600px] mx-auto px-6 md:px-12 pb-0">
        <div className="grid md:grid-cols-12 gap-0 items-end">

          {/* Photo */}
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            animate={imgInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.9, delay: 0.1, ease: [0.22, 1, 0.36, 1] }}
            className="md:col-span-5 relative"
            style={{ alignSelf: "end" }}
          >
            <div className="relative overflow-hidden" style={{ maxWidth: "420px" }}>
              <div
                className="absolute top-0 left-0 right-0 h-24 z-10 pointer-events-none"
                style={{ background: "linear-gradient(to bottom, #000, transparent)" }}
              />
              <img
                src="https://res.cloudinary.com/dz6kxumoo/image/upload/v1771901032/download_6_zgf66e.jpg"
                alt="Jeremy A."
                className="w-full object-cover object-top"
                style={{
                  filter: "grayscale(20%) contrast(1.05)",
                  display: "block",
                  maxHeight: "540px",
                  objectPosition: "center top",
                }}
              />
              <motion.p
                initial={{ opacity: 0 }}
                animate={imgInView ? { opacity: 1 } : {}}
                transition={{ duration: 0.6, delay: 0.7 }}
                className="font-serif-it text-xs absolute bottom-4 left-4 z-20"
                style={{ color: "rgba(255,255,255,0.25)" }}
              >
                I am this one.
              </motion.p>
            </div>
          </motion.div>

          {/* Contact details */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            animate={imgInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.8, delay: 0.3, ease: [0.22, 1, 0.36, 1] }}
            className="md:col-span-7 pb-12 md:pb-16 md:pl-16"
          >
            {/* Email */}
            <div className="mb-12">
              <p
                className="font-body text-xs uppercase tracking-[0.4em] mb-4"
                style={{ color: "rgba(255,255,255,0.25)" }}
              >
                Drop a line
              </p>
              <a
                href="mailto:jeremy@example.com"
                className="font-condensed uppercase text-white hover:text-orange-500 transition-colors duration-300 leading-none block"
                style={{ fontSize: "clamp(1.4rem, 3.5vw, 3rem)" }}
              >
                jeremy@example.com
              </a>
              <p
                className="font-body text-xs uppercase tracking-widest mt-3"
                style={{ color: "rgba(255,255,255,0.25)" }}
              >
                Open to relocate · Available for internships
              </p>
            </div>

            {/* Social links */}
            <div className="mb-12">
              <p
                className="font-body text-xs uppercase tracking-[0.4em] mb-5"
                style={{ color: "rgba(255,255,255,0.25)" }}
              >
                Find me on
              </p>
              <div className="flex flex-col gap-0">
                {SOCIAL_LINKS.map(({ label, href }: SocialLink, i: number) => (
                  <motion.a
                    key={label}
                    href={href}
                    target="_blank"
                    rel="noopener noreferrer"
                    initial={{ opacity: 0, x: 20 }}
                    animate={imgInView ? { opacity: 1, x: 0 } : {}}
                    transition={{ duration: 0.5, delay: 0.4 + i * 0.07 }}
                    className="group flex items-center justify-between py-4 border-t transition-colors duration-300"
                    style={{ borderColor: "rgba(255,255,255,0.08)" }}
                  >
                    <span
                      className="font-condensed uppercase group-hover:text-white transition-colors duration-300"
                      style={{ fontSize: "clamp(1.2rem, 2.5vw, 1.8rem)", color: "rgba(255,255,255,0.40)" }}
                    >
                      {label}
                    </span>
                    <motion.span
                      className="font-body group-hover:text-orange-500 transition-colors duration-300 text-lg"
                      style={{ color: "rgba(255,255,255,0.20)" }}
                      whileHover={{ x: 4 }}
                    >
                      ↗
                    </motion.span>
                  </motion.a>
                ))}
                <div className="border-t" style={{ borderColor: "rgba(255,255,255,0.08)" }} />
              </div>
            </div>

            {/* Nav links */}
            <div>
              <p
                className="font-body text-xs uppercase tracking-[0.4em] mb-4"
                style={{ color: "rgba(255,255,255,0.25)" }}
              >
                Navigate
              </p>
              <div className="flex flex-wrap gap-x-6 gap-y-2">
                {NAV_LINKS.map((s: string) => (
                  <button
                    key={s}
                    onClick={() => scrollTo(s)}
                    className="btn-hero font-body text-xs uppercase tracking-[0.25em] transition-colors duration-200"
                    style={{ color: "rgba(255,255,255,0.30)" }}
                    onMouseEnter={(e: React.MouseEvent<HTMLButtonElement>) =>
                      (e.currentTarget.style.color = "#fff")
                    }
                    onMouseLeave={(e: React.MouseEvent<HTMLButtonElement>) =>
                      (e.currentTarget.style.color = "rgba(255,255,255,0.30)")
                    }
                  >
                    {s}
                  </button>
                ))}
              </div>
            </div>
          </motion.div>
        </div>
      </div>

      {/* ── 3. MARQUEE STRIP ── */}
      <div
        className="border-t mt-0 overflow-hidden py-4"
        style={{ borderColor: "rgba(255,255,255,0.06)" }}
      >
        <div style={{ display: "flex", width: "max-content", animation: "marqueeFooter 14s linear infinite" }}>
          {([...Array(4)] as undefined[]).map((_: undefined, i: number) => (
            <span
              key={i}
              className="font-condensed uppercase text-xl md:text-2xl tracking-widest pr-0 flex-shrink-0"
              style={{ color: "rgba(255,255,255,0.08)" }}
            >
              {CONTACT_MARQUEE}
            </span>
          ))}
        </div>
      </div>

      {/* ── 4. BOTTOM BAR ── */}
      <div className="border-t" style={{ borderColor: "rgba(255,255,255,0.05)" }}>
        <div className="max-w-[1600px] mx-auto px-6 md:px-12 py-6 flex flex-col sm:flex-row items-center justify-between gap-3">
          <p
            className="font-body text-xs uppercase tracking-[0.3em]"
            style={{ color: "rgba(255,255,255,0.20)" }}
          >
            © {currentYear} Jeremy A. — Mechanical Engineer
          </p>
          <p
            className="font-body text-xs uppercase tracking-[0.25em]"
            style={{ color: "rgba(255,255,255,0.15)" }}
          >
            React · Tailwind · Motion
          </p>
          <button
            onClick={() => scrollTo("home")}
            className="btn-hero font-body text-xs uppercase tracking-[0.3em] transition-colors duration-200 flex items-center gap-2"
            style={{ color: "rgba(255,255,255,0.20)" }}
            onMouseEnter={(e: React.MouseEvent<HTMLButtonElement>) =>
              (e.currentTarget.style.color = "#f97316")
            }
            onMouseLeave={(e: React.MouseEvent<HTMLButtonElement>) =>
              (e.currentTarget.style.color = "rgba(255,255,255,0.20)")
            }
          >
            Back to top ↑
          </button>
        </div>
      </div>
    </footer>
  );
}