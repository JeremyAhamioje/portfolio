import { useEffect, useState } from "react";
import { HeroCarousel } from "../components/HeroCarousel";
import { About }        from "../components/About";
import { Projects }     from "../components/Projects";
import { Skills }       from "../components/Skills";
import { Footer }       from "../components/Footer";
import { BlogList }     from "../components/BlogList";
import { BlogPost }     from "../components/BlogPost";
 
// ─── Simple in-app router (no react-router needed) ───────────────────────────
type Page =
  | { view: "home" }
  | { view: "blog-list" }
  | { view: "blog-post"; slug: string };
 
export default function App() {
  const [page, setPage] = useState<Page>({ view: "home" });
 
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
 
  // Scroll to top on page change
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  }, [page]);
 
  const goHome     = () => setPage({ view: "home" });
  const goBlogList = () => setPage({ view: "blog-list" });
  const goPost     = (slug: string) => setPage({ view: "blog-post", slug });
 
  return (
    <div className="relative bg-black text-white overflow-x-hidden">
      <style>{`
        *, *::before, *::after { margin:0; padding:0; box-sizing:border-box; }
 
        body {
          background:#000; color:#fff; overflow-x:hidden;
          -webkit-font-smoothing:antialiased;
          -moz-osx-font-smoothing:grayscale;
        }
 
        html { scroll-behavior:smooth; }
 
        ::-webkit-scrollbar       { width:4px; }
        ::-webkit-scrollbar-track { background:#000; }
        ::-webkit-scrollbar-thumb { background:#f97316; border-radius:2px; }
        ::-webkit-scrollbar-thumb:hover { background:#ea580c; }
 
        ::selection { background:#f97316; color:#000; }
 
        .custom-cursor {
          width:18px; height:18px;
          border:1.5px solid rgba(249,115,22,0.6);
          border-radius:50%; position:fixed; pointer-events:none;
          z-index:9999; transform:translate(-50%,-50%);
          transition:transform 0.15s ease;
          mix-blend-mode:difference;
        }
 
        .no-scrollbar::-webkit-scrollbar { display:none; }
        .no-scrollbar { -ms-overflow-style:none; scrollbar-width:none; }
      `}</style>
 
      {/* Custom cursor */}
      <div className="custom-cursor hidden md:block" />
 
      {/* ── Page routing ── */}
      {page.view === "home" && (
        <main>
          <HeroCarousel onNavigateBlog={goBlogList} />
          <Projects />
          <About />
          <Skills />
          <Footer />
        </main>
      )}
 
      {page.view === "blog-list" && (
        <BlogList
          onSelectPost={goPost}
          onBack={goHome}
        />
      )}
 
      {page.view === "blog-post" && (
        <BlogPost
          slug={page.slug}
          onBack={goHome}
          onBackToList={goBlogList}
        />
      )}
    </div>
  );
}