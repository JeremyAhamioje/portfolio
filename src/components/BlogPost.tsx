import { useState, useEffect } from "react";
import { BLOG_POSTS } from "./blogData";

type BlogPostProps = {
  slug: string;
  onBack: () => void;
  onBackToList: () => void;
};

const HYDRO_VIDEO1 = "https://res.cloudinary.com/dz6kxumoo/video/upload/v1776823165/WhatsApp_Video_2026-04-22_at_2.51.32_AM_mxujrk.mp4";
const HYDRO_VIDEO2 = "https://res.cloudinary.com/dz6kxumoo/video/upload/v1776823103/WhatsApp_Video_2026-04-22_at_2.51.49_AM_innoex.mp4";

export function BlogPost({ slug, onBack, onBackToList }: BlogPostProps) {
  const post = BLOG_POSTS.find(p => p.slug === slug);
  const [activeStep, setActiveStep] = useState(0);
  const [lightbox, setLightbox]     = useState<string | null>(null);
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [isMobile, setIsMobile]     = useState(false);

  useEffect(() => {
    const check = () => setIsMobile(window.innerWidth < 768);
    check();
    window.addEventListener("resize", check);
    return () => window.removeEventListener("resize", check);
  }, []);

  // Close sidebar when a step is picked on mobile
  const pickStep = (i: number) => {
    setActiveStep(i);
    if (isMobile) setSidebarOpen(false);
  };

  if (!post) {
    return (
      <div style={{background:"#000",minHeight:"100vh",display:"flex",alignItems:"center",justifyContent:"center",padding:"24px"}}>
        <div style={{textAlign:"center"}}>
          <p style={{color:"rgba(255,255,255,0.4)",fontFamily:"DM Sans,sans-serif",marginBottom:"16px"}}>Post not found</p>
          <button onClick={onBackToList} style={{background:"#f97316",color:"#000",border:"none",borderRadius:"999px",padding:"12px 28px",cursor:"pointer",fontWeight:700,fontSize:"13px",letterSpacing:"0.15em",textTransform:"uppercase"}}>
            Back to Blog
          </button>
        </div>
      </div>
    );
  }

  const step = post.steps[activeStep];

  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Anton&family=DM+Sans:ital,wght@0,300;0,400;0,700;1,300;1,400&display=swap');

        .bp-cond { font-family:'Anton','Arial Narrow',Impact,sans-serif; font-weight:400; letter-spacing:-0.02em; }
        .bp-body { font-family:'DM Sans',sans-serif; }
        .bp-it   { font-family:'DM Sans',Georgia,serif; font-style:italic; font-weight:300; }

        .bp-back:hover { color:#f97316 !important; }
        .bp-step:hover { background:rgba(255,255,255,0.04) !important; }
        .bp-step-active { border-left:3px solid #f97316 !important; background:rgba(249,115,22,0.06) !important; }
        .bp-img { cursor:zoom-in; transition:transform .3s; display:block; }
        .bp-img:hover { transform:scale(1.02); }
        .bp-code { font-family:'Fira Code','Courier New',monospace; }

        /* sidebar drawer on mobile */
        .bp-sidebar-drawer {
          position: fixed;
          inset: 0;
          z-index: 200;
          display: flex;
        }
        .bp-sidebar-panel {
          width: min(300px, 85vw);
          height: 100%;
          background: #0a0a0a;
          border-right: 1px solid rgba(255,255,255,0.08);
          overflow-y: auto;
          padding: 24px 0;
        }
        .bp-sidebar-backdrop {
          flex: 1;
          background: rgba(0,0,0,0.7);
        }

        /* Desktop sidebar */
        .bp-sidebar-desktop {
          border-right: 1px solid rgba(255,255,255,0.06);
          padding: 40px 0;
          position: sticky;
          top: 64px;
          height: calc(100vh - 64px);
          overflow-y: auto;
          width: 260px;
          flex-shrink: 0;
        }

        pre { scrollbar-width: thin; scrollbar-color: #333 #111; overflow-x: auto; }
        pre::-webkit-scrollbar { height: 4px; }
        pre::-webkit-scrollbar-track { background: #111; }
        pre::-webkit-scrollbar-thumb { background: #333; }

        /* step images responsive */
        .bp-img-grid-1 { display:grid; grid-template-columns:1fr; gap:8px; }
        .bp-img-grid-2 { display:grid; grid-template-columns:1fr 1fr; gap:8px; }
        @media (max-width: 480px) {
          .bp-img-grid-2 { grid-template-columns:1fr; }
        }

        /* video grid */
        .bp-video-grid { display:grid; grid-template-columns:1fr 1fr; gap:8px; }
        @media (max-width: 600px) {
          .bp-video-grid { grid-template-columns:1fr; }
        }

        /* step nav buttons */
        .bp-stepnav { display:flex; justify-content:space-between; align-items:center; gap:12px; flex-wrap:wrap; }
        .bp-stepnav button { flex-shrink:0; }

        /* Prevent body scroll when lightbox open */
        body.bp-noscroll { overflow: hidden; }
      `}</style>

      {/* ── Lightbox ── */}
      {lightbox && (
        <div
          onClick={() => setLightbox(null)}
          style={{position:"fixed",inset:0,zIndex:1000,background:"rgba(0,0,0,0.97)",display:"flex",alignItems:"center",justifyContent:"center",padding:"16px"}}
        >
          <img src={lightbox} alt=""
            style={{maxWidth:"100%",maxHeight:"90vh",objectFit:"contain",borderRadius:"2px"}}/>
          <button onClick={() => setLightbox(null)}
            style={{position:"absolute",top:"16px",right:"20px",background:"rgba(255,255,255,0.08)",border:"none",color:"rgba(255,255,255,0.7)",fontSize:"20px",cursor:"pointer",width:"36px",height:"36px",borderRadius:"50%",display:"flex",alignItems:"center",justifyContent:"center"}}>
            ✕
          </button>
        </div>
      )}

      {/* ── Mobile sidebar drawer ── */}
      {isMobile && sidebarOpen && (
        <div className="bp-sidebar-drawer">
          <div className="bp-sidebar-panel">
            <div style={{display:"flex",alignItems:"center",justifyContent:"space-between",padding:"0 20px 16px",borderBottom:"1px solid rgba(255,255,255,0.06)"}}>
              <p className="bp-body" style={{color:"rgba(255,255,255,0.35)",fontSize:"10px",letterSpacing:"0.35em",textTransform:"uppercase"}}>Steps</p>
              <button onClick={() => setSidebarOpen(false)}
                style={{background:"none",border:"none",color:"rgba(255,255,255,0.4)",fontSize:"18px",cursor:"pointer",lineHeight:1}}>✕</button>
            </div>
            {post.steps.map((s, i) => (
              <button key={i} onClick={() => pickStep(i)}
                className={`bp-body bp-step ${i===activeStep?"bp-step-active":""}`}
                style={{display:"block",width:"100%",textAlign:"left",padding:"14px 20px",background:"none",border:"none",borderLeft:i===activeStep?undefined:"3px solid transparent",color:i===activeStep?"#fff":"rgba(255,255,255,0.40)",fontSize:"13px",lineHeight:1.5,cursor:"pointer"}}>
                <span style={{color:i===activeStep?"#f97316":"rgba(255,255,255,0.25)",fontSize:"10px",display:"block",letterSpacing:"0.15em",marginBottom:"2px"}}>
                  {String(i+1).padStart(2,"0")}
                </span>
                {s.title}
              </button>
            ))}
          </div>
          <div className="bp-sidebar-backdrop" onClick={() => setSidebarOpen(false)}/>
        </div>
      )}

      <div style={{background:"#000",minHeight:"100vh",color:"#fff"}}>

        {/* ── Nav ── */}
        <nav style={{
          display:"flex",alignItems:"center",justifyContent:"space-between",
          padding:"16px 20px",
          borderBottom:"1px solid rgba(255,255,255,0.06)",
          position:"sticky",top:0,zIndex:50,
          background:"rgba(0,0,0,0.95)",backdropFilter:"blur(10px)",
          gap:"12px",
        }}>
          <div style={{display:"flex",gap:"12px",alignItems:"center",minWidth:0}}>
            <button onClick={onBack} className="bp-body bp-back"
              style={{background:"none",border:"none",color:"rgba(255,255,255,0.40)",fontSize:"11px",letterSpacing:"0.15em",textTransform:"uppercase",padding:0,cursor:"pointer",whiteSpace:"nowrap",transition:"color .2s"}}>
              ← Portfolio
            </button>
            <span style={{color:"rgba(255,255,255,0.12)"}}>·</span>
            <button onClick={onBackToList} className="bp-body bp-back"
              style={{background:"none",border:"none",color:"rgba(255,255,255,0.40)",fontSize:"11px",letterSpacing:"0.15em",textTransform:"uppercase",padding:0,cursor:"pointer",whiteSpace:"nowrap",transition:"color .2s"}}>
              Build Log
            </button>
          </div>

          <span className="bp-body" style={{color:"#fff",fontSize:"14px",fontWeight:700,letterSpacing:"0.04em",flexShrink:0}}>Jeremy A.</span>

          {/* Mobile: steps button | Desktop: read time */}
          {isMobile ? (
            <button onClick={() => setSidebarOpen(true)}
              className="bp-body"
              style={{background:"rgba(249,115,22,0.12)",border:"1px solid rgba(249,115,22,0.35)",color:"#f97316",padding:"6px 14px",fontSize:"10px",letterSpacing:"0.18em",textTransform:"uppercase",cursor:"pointer",whiteSpace:"nowrap",flexShrink:0}}>
              Steps {activeStep+1}/{post.steps.length}
            </button>
          ) : (
            <span className="bp-body" style={{color:"rgba(255,255,255,0.20)",fontSize:"11px",letterSpacing:"0.15em",textTransform:"uppercase",flexShrink:0}}>{post.readTime}</span>
          )}
        </nav>

        {/* ── Hero banner ── */}
        <div style={{position:"relative",height:"clamp(220px,40vh,480px)",overflow:"hidden"}}>
          <img src={post.coverImage} alt={post.title}
            style={{width:"100%",height:"100%",objectFit:"cover",objectPosition:"center",filter:"brightness(0.42)"}}/>
          <div style={{position:"absolute",inset:0,background:"linear-gradient(to bottom,transparent 20%,rgba(0,0,0,0.92) 100%)"}}/>
          <div style={{position:"absolute",bottom:0,left:0,right:0,padding:"clamp(20px,4vw,52px) clamp(20px,5vw,48px)"}}>
            <div style={{display:"flex",gap:"8px",marginBottom:"12px",flexWrap:"wrap"}}>
              <span className="bp-body" style={{padding:"3px 10px",border:"1px solid rgba(249,115,22,0.55)",color:"#f97316",fontSize:"9px",letterSpacing:"0.22em",textTransform:"uppercase"}}>{post.category}</span>
              <span className="bp-body" style={{padding:"3px 10px",border:"1px solid rgba(255,255,255,0.12)",color:"rgba(255,255,255,0.40)",fontSize:"9px",letterSpacing:"0.18em",textTransform:"uppercase"}}>{post.date}</span>
            </div>
            <h1 className="bp-cond" style={{fontSize:"clamp(1.5rem,5vw,4rem)",lineHeight:0.92,marginBottom:"10px",maxWidth:"800px"}}>{post.title}</h1>
            <p className="bp-it" style={{color:"rgba(255,255,255,0.50)",fontSize:"clamp(0.82rem,1.5vw,1.1rem)",maxWidth:"560px",lineHeight:1.5}}>{post.subtitle}</p>
          </div>
        </div>

        {/* ── Main layout ── */}
        <div style={{
          display: isMobile ? "block" : "flex",
          maxWidth:"1400px",
          margin:"0 auto",
        }}>

          {/* ── Desktop sidebar ── */}
          {!isMobile && (
            <aside className="bp-sidebar-desktop">
              <p className="bp-body" style={{color:"rgba(255,255,255,0.25)",fontSize:"10px",letterSpacing:"0.35em",textTransform:"uppercase",padding:"0 24px",marginBottom:"16px"}}>Steps</p>
              {post.steps.map((s, i) => (
                <button key={i} onClick={() => pickStep(i)}
                  className={`bp-body bp-step ${i===activeStep?"bp-step-active":""}`}
                  style={{
                    display:"block",width:"100%",textAlign:"left",
                    padding:"13px 24px",background:"none",border:"none",
                    borderLeft:i===activeStep?undefined:"3px solid transparent",
                    color:i===activeStep?"#fff":"rgba(255,255,255,0.35)",
                    fontSize:"12px",lineHeight:1.5,cursor:"pointer",transition:"all .2s",
                  }}>
                  <span style={{color:i===activeStep?"#f97316":"rgba(255,255,255,0.22)",fontSize:"10px",display:"block",letterSpacing:"0.15em",marginBottom:"2px"}}>
                    {String(i+1).padStart(2,"0")}
                  </span>
                  {s.title}
                </button>
              ))}
              <div style={{padding:"28px 24px 0",borderTop:"1px solid rgba(255,255,255,0.06)",marginTop:"24px"}}>
                <p className="bp-body" style={{color:"rgba(255,255,255,0.20)",fontSize:"10px",letterSpacing:"0.30em",textTransform:"uppercase",marginBottom:"12px"}}>Tags</p>
                <div style={{display:"flex",flexWrap:"wrap",gap:"6px"}}>
                  {post.tags.map(t => (
                    <span key={t} className="bp-body" style={{padding:"3px 8px",border:"1px solid rgba(255,255,255,0.08)",color:"rgba(255,255,255,0.30)",fontSize:"10px",letterSpacing:"0.14em",textTransform:"uppercase"}}>{t}</span>
                  ))}
                </div>
              </div>
            </aside>
          )}

          {/* ── Step content ── */}
          <main style={{
            flex:1,
            padding: isMobile
              ? "28px 20px 48px"
              : "clamp(32px,5vw,64px) clamp(24px,5vw,64px)",
            minWidth:0,
          }}>

            {/* Step header */}
            <div style={{marginBottom:"28px"}}>
              <div style={{display:"flex",alignItems:"center",gap:"12px",marginBottom:"10px"}}>
                <span className="bp-cond" style={{fontSize:"clamp(2rem,6vw,4.5rem)",color:"rgba(255,255,255,0.06)",lineHeight:1}}>
                  {String(activeStep+1).padStart(2,"0")}
                </span>
                <div style={{height:"1px",flex:1,background:"rgba(255,255,255,0.06)"}}/>
              </div>
              <h2 className="bp-cond" style={{fontSize:"clamp(1.5rem,4vw,3rem)",lineHeight:0.92,color:"#fff"}}>{step.title}</h2>
            </div>

            {/* Body text */}
            <div style={{marginBottom:"36px"}}>
              {step.body.split("\n\n").map((para, i) => (
                <p key={i} className="bp-body" style={{
                  color:"rgba(255,255,255,0.65)",
                  fontSize:"clamp(0.88rem,1.3vw,1.02rem)",
                  lineHeight:1.85,marginBottom:"18px",whiteSpace:"pre-line",
                }}>{para}</p>
              ))}
            </div>

            {/* Code block */}
            {step.code && (
              <div style={{marginBottom:"36px"}}>
                <div style={{display:"flex",alignItems:"center",gap:"12px",marginBottom:"8px"}}>
                  <span className="bp-body" style={{color:"rgba(255,255,255,0.25)",fontSize:"10px",letterSpacing:"0.28em",textTransform:"uppercase"}}>Arduino Sketch</span>
                  <div style={{height:"1px",flex:1,background:"rgba(255,255,255,0.06)"}}/>
                </div>
                <pre style={{
                  background:"#0c0c0c",border:"1px solid rgba(255,255,255,0.08)",
                  padding:"clamp(14px,3vw,28px)",margin:0,
                }}>
                  <code className="bp-code" style={{
                    color:"#e5e5e5",fontSize:"clamp(0.72rem,1.1vw,0.86rem)",
                    lineHeight:1.7,display:"block",
                  }}>
                    {step.code.split("\n").map((line, i) => {
                      let colour = "#e5e5e5";
                      if (line.trim().startsWith("//")) colour = "rgba(255,255,255,0.28)";
                      else if (line.includes("void ") || line.includes("int ") || line.includes("#include") || line.includes("Servo ")) colour = "#f97316";
                      else if (line.includes("(") && line.includes(")") && !line.includes("//")) colour = "#93c5fd";
                      return <span key={i} style={{color:colour,display:"block"}}>{line||" "}</span>;
                    })}
                  </code>
                </pre>
              </div>
            )}

            {/* Images */}
            {step.images && step.images.length > 0 && (
              <div
                className={step.images.length === 1 ? "bp-img-grid-1" : "bp-img-grid-2"}
                style={{marginBottom:"36px"}}
              >
                {step.images.map((src, i) => (
                  <div key={i} style={{overflow:"hidden",aspectRatio:"4/3",background:"#0a0a0a"}}>
                    <img src={src} alt={`Step ${activeStep+1} image ${i+1}`}
                      className="bp-img"
                      onClick={() => setLightbox(src)}
                      style={{width:"100%",height:"100%",objectFit:"cover"}}/>
                  </div>
                ))}
              </div>
            )}

            {/* Videos — hydroponic intro only */}
            {slug === "hydroponic-system-build" && activeStep === 0 && (
              <div className="bp-video-grid" style={{marginBottom:"36px"}}>
                {[HYDRO_VIDEO1, HYDRO_VIDEO2].map((src, i) => (
                  <video key={i} src={src} controls muted playsInline
                    style={{width:"100%",display:"block",background:"#0a0a0a",border:"1px solid rgba(255,255,255,0.06)"}}/>
                ))}
              </div>
            )}

            {/* Mobile tags (below content) */}
            {isMobile && (
              <div style={{padding:"20px 0 0",borderTop:"1px solid rgba(255,255,255,0.06)",marginBottom:"28px"}}>
                <p className="bp-body" style={{color:"rgba(255,255,255,0.20)",fontSize:"10px",letterSpacing:"0.30em",textTransform:"uppercase",marginBottom:"10px"}}>Tags</p>
                <div style={{display:"flex",flexWrap:"wrap",gap:"6px"}}>
                  {post.tags.map(t => (
                    <span key={t} className="bp-body" style={{padding:"3px 8px",border:"1px solid rgba(255,255,255,0.08)",color:"rgba(255,255,255,0.30)",fontSize:"10px",letterSpacing:"0.14em",textTransform:"uppercase"}}>{t}</span>
                  ))}
                </div>
              </div>
            )}

            {/* Step navigation */}
            <div className="bp-stepnav" style={{paddingTop:"32px",borderTop:"1px solid rgba(255,255,255,0.06)",marginTop:"12px"}}>
              <button
                onClick={() => setActiveStep(Math.max(0, activeStep-1))}
                disabled={activeStep===0}
                className="bp-body"
                style={{background:"none",border:"1px solid rgba(255,255,255,0.12)",color:activeStep===0?"rgba(255,255,255,0.15)":"rgba(255,255,255,0.60)",padding:"11px 20px",cursor:activeStep===0?"default":"pointer",fontSize:"11px",letterSpacing:"0.16em",textTransform:"uppercase",transition:"border-color .2s,color .2s"}}>
                ← Prev
              </button>

              <span className="bp-body" style={{color:"rgba(255,255,255,0.20)",fontSize:"11px",letterSpacing:"0.18em",textTransform:"uppercase"}}>
                {activeStep+1} / {post.steps.length}
              </span>

              {activeStep < post.steps.length - 1 ? (
                <button
                  onClick={() => setActiveStep(activeStep+1)}
                  className="bp-body"
                  style={{background:"#f97316",color:"#000",border:"none",padding:"11px 20px",cursor:"pointer",fontSize:"11px",fontWeight:700,letterSpacing:"0.16em",textTransform:"uppercase"}}>
                  Next →
                </button>
              ) : (
                <button onClick={onBackToList}
                  className="bp-body"
                  style={{background:"none",border:"1px solid rgba(249,115,22,0.5)",color:"#f97316",padding:"11px 20px",cursor:"pointer",fontSize:"11px",fontWeight:700,letterSpacing:"0.16em",textTransform:"uppercase"}}>
                  Back to Blog
                </button>
              )}
            </div>
          </main>
        </div>
      </div>
    </>
  );
}