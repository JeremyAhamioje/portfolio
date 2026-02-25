import { useEffect } from "react";
import { Navbar } from "../components/Navbar";                            
import { Hero } from "../components/Hero";
import { About } from "../components/About";
import { Projects } from "../components/Projects";
import { Skills } from "../components/Skills";
import { Footer } from "../components/Footer";

// ─── NOTE ─────────────────────────────────────────────────────────────────────
// <Navbar> is intentionally removed — the Hero component contains its own
// inline nav (z-20, overlaid on the full-bleed hero image). Adding a separate
// Navbar component on top would double-stack the nav and push the hero image
// down, breaking the full-bleed layout.
//
// The body font-family is NOT set here. Each section imports Anton + DM Sans
// via @import in its own <style> block, and applies them through .font-condensed
// / .font-body classes. Setting a global font-family: 'Inter' here would
// override those classes and strip the custom typography.
// ─────────────────────────────────────────────────────────────────────────────

export default function App() {
  useEffect(() => {
    document.documentElement.style.scrollBehavior = "smooth";

    const handleMouseMove = (e: MouseEvent) => {
      const cursor = document.querySelector(".custom-cursor") as HTMLElement | null;
      if (cursor) {
        cursor.style.left = `${e.clientX}px`;
        cursor.style.top  = `${e.clientY}px`;
      }
    };

    document.addEventListener("mousemove", handleMouseMove);
    return () => document.removeEventListener("mousemove", handleMouseMove);
  }, []);

  return (
    <div className="relative bg-black overflow-x-hidden">

    <style>{`
  @import url('https://fonts.googleapis.com/css2?family=Anton&family=DM+Sans:wght@300;400;500;700&display=swap');

  *, *::before, *::after {
    margin: 0;
    padding: 0;
    box-sizing: border-box;
  }

  body {
    background: #000;
    color: #fff;
    overflow-x: hidden;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
  }

  html {
    scroll-behavior: smooth;
  }

  /* Custom button for hero/other buttons */
  .btn-hero {
    font-family: 'DM Sans', sans-serif;
    font-weight: 500;
    font-size: 0.875rem; /* smaller, cleaner */
    letter-spacing: 0.05em;
    text-transform: uppercase;
    padding: 0.6rem 1.2rem;
    border-radius: 0.375rem; /* 6px */
    border: 1px solid #f97316;
    background-color: #111; /* subtle dark background */
    color: #f97316;
    transition: all 0.3s ease;
  }

  .btn-hero:hover {
    background-color: #f97316;
    color: #000;
    transform: scale(1.05);
  }

  .btn-hero:active {
    transform: scale(0.98);
  }

  /* Custom Cursor */
  .custom-cursor {
    width: 18px;
    height: 18px;
    border: 1.5px solid rgba(249, 115, 22, 0.6);
    border-radius: 50%;
    position: fixed;
    pointer-events: none;
    z-index: 9999;
    transform: translate(-50%, -50%);
    transition: transform 0.15s ease;
    mix-blend-mode: difference;
  }
`}</style>

      {/* Custom cursor — desktop only */}
      <div className="custom-cursor hidden md:block" />

      {/* ── Sections ──────────────────────────────────────────────────────────
          Hero contains the nav. Order matches scroll sequence.
      ──────────────────────────────────────────────────────────────────────── */}
      <main>
        <Navbar />                  
        <Hero />
        <Projects />
        <About />
        <Skills />
        <Footer />
      </main>
    </div>
  );
}