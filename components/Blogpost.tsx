import { useState } from "react";
import { BLOG_POSTS } from "./Blogdata";
 
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
  const [lightbox, setLightbox] = useState<string | null>(null);
 
  if (!post) {
    return (
      <div style={{background:"#000",minHeight:"100vh",display:"flex",alignItems:"center",justifyContent:"center"}}>
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
        .bp-back { transition:color .2s; cursor:pointer; }
        .bp-back:hover { color:#f97316 !important; }
        .bp-step { transition:all .2s; cursor:pointer; }
        .bp-step:hover { background:rgba(255,255,255,0.04) !important; }
        .bp-step-active { border-left:3px solid #f97316 !important; background:rgba(249,115,22,0.06) !important; }
        .bp-img { cursor:zoom-in; transition:transform .3s; }
        .bp-img:hover { transform:scale(1.02); }
        .bp-code { font-family:'Fira Code','Courier New',monospace; }
        pre { scrollbar-width:thin; scrollbar-color:#333 #111; }
        pre::-webkit-scrollbar { height:4px; } pre::-webkit-scrollbar-track { background:#111; } pre::-webkit-scrollbar-thumb { background:#333; }
      `}</style>
 
      {/* Lightbox */}
      {lightbox && (
        <div onClick={() => setLightbox(null)}
          style={{position:"fixed",inset:0,zIndex:1000,background:"rgba(0,0,0,0.96)",display:"flex",alignItems:"center",justifyContent:"center",padding:"24px"}}>
          <img src={lightbox} alt="" style={{maxWidth:"90vw",maxHeight:"90vh",objectFit:"contain"}}/>
          <button onClick={() => setLightbox(null)}
            style={{position:"absolute",top:"24px",right:"32px",background:"none",border:"none",color:"rgba(255,255,255,0.5)",fontSize:"24px",cursor:"pointer",fontFamily:"Georgia,serif"}}>✕</button>
        </div>
      )}
 
      <div style={{background:"#000",minHeight:"100vh",color:"#fff"}}>
 
        {/* Nav */}
        <nav style={{display:"flex",alignItems:"center",justifyContent:"space-between",padding:"22px 48px",borderBottom:"1px solid rgba(255,255,255,0.06)",position:"sticky",top:0,zIndex:50,background:"rgba(0,0,0,0.95)",backdropFilter:"blur(10px)"}}>
          <div style={{display:"flex",gap:"16px",alignItems:"center"}}>
            <button onClick={onBack} className="bp-body bp-back"
              style={{background:"none",border:"none",color:"rgba(255,255,255,0.40)",fontSize:"11px",letterSpacing:"0.20em",textTransform:"uppercase",padding:0}}>
              ← Portfolio
            </button>
            <span style={{color:"rgba(255,255,255,0.12)"}}>·</span>
            <button onClick={onBackToList} className="bp-body bp-back"
              style={{background:"none",border:"none",color:"rgba(255,255,255,0.40)",fontSize:"11px",letterSpacing:"0.20em",textTransform:"uppercase",padding:0}}>
              Build Log
            </button>
          </div>
          <span className="bp-body" style={{color:"#fff",fontSize:"15px",fontWeight:700,letterSpacing:"0.04em"}}>Jeremy A.</span>
          <span className="bp-body" style={{color:"rgba(255,255,255,0.20)",fontSize:"11px",letterSpacing:"0.15em",textTransform:"uppercase"}}>{post.readTime}</span>
        </nav>
 
        {/* ── Hero banner ── */}
        <div style={{position:"relative",height:"clamp(280px,45vh,500px)",overflow:"hidden"}}>
          <img src={post.coverImage} alt={post.title}
            style={{width:"100%",height:"100%",objectFit:"cover",objectPosition:"center",filter:"brightness(0.45)"}}/>
          <div style={{position:"absolute",inset:0,background:"linear-gradient(to bottom,transparent 30%,rgba(0,0,0,0.9) 100%)"}}/>
          <div style={{position:"absolute",bottom:0,left:0,right:0,padding:"clamp(24px,5vw,56px) 48px"}}>
            <div style={{display:"flex",gap:"10px",marginBottom:"16px",flexWrap:"wrap"}}>
              <span className="bp-body" style={{padding:"4px 12px",border:"1px solid rgba(249,115,22,0.55)",color:"#f97316",fontSize:"10px",letterSpacing:"0.24em",textTransform:"uppercase"}}>{post.category}</span>
              <span className="bp-body" style={{padding:"4px 12px",border:"1px solid rgba(255,255,255,0.12)",color:"rgba(255,255,255,0.40)",fontSize:"10px",letterSpacing:"0.20em",textTransform:"uppercase"}}>{post.date}</span>
            </div>
            <h1 className="bp-cond" style={{fontSize:"clamp(1.8rem,5vw,4.5rem)",lineHeight:0.92,marginBottom:"16px",maxWidth:"800px"}}>{post.title}</h1>
            <p className="bp-it" style={{color:"rgba(255,255,255,0.55)",fontSize:"clamp(0.9rem,1.5vw,1.2rem)",maxWidth:"600px"}}>{post.subtitle}</p>
          </div>
        </div>
 
        {/* ── Main layout: sidebar steps + content ── */}
        <div style={{display:"grid",gridTemplateColumns:"280px 1fr",gap:0,maxWidth:"1400px",margin:"0 auto"}}>
 
          {/* ── Sidebar — step navigator ── */}
          <aside style={{borderRight:"1px solid rgba(255,255,255,0.06)",padding:"40px 0",position:"sticky",top:"72px",height:"calc(100vh - 72px)",overflowY:"auto"}}>
            <p className="bp-body" style={{color:"rgba(255,255,255,0.25)",fontSize:"10px",letterSpacing:"0.35em",textTransform:"uppercase",padding:"0 24px",marginBottom:"16px"}}>Steps</p>
            {post.steps.map((s, i) => (
              <button key={i} onClick={() => setActiveStep(i)}
                className={`bp-body bp-step ${i===activeStep?"bp-step-active":""}`}
                style={{
                  display:"block",width:"100%",textAlign:"left",
                  padding:"14px 24px",background:"none",border:"none",
                  borderLeft: i===activeStep ? undefined : "3px solid transparent",
                  color: i===activeStep ? "#fff" : "rgba(255,255,255,0.35)",
                  fontSize:"12px",lineHeight:1.5,cursor:"pointer",
                  transition:"all .2s",
                }}>
                <span style={{color:i===activeStep?"#f97316":"rgba(255,255,255,0.20)",fontSize:"10px",display:"block",letterSpacing:"0.15em",marginBottom:"2px"}}>
                  {String(i+1).padStart(2,"0")}
                </span>
                {s.title}
              </button>
            ))}
 
            {/* Tags */}
            <div style={{padding:"32px 24px 0",borderTop:"1px solid rgba(255,255,255,0.06)",marginTop:"24px"}}>
              <p className="bp-body" style={{color:"rgba(255,255,255,0.20)",fontSize:"10px",letterSpacing:"0.30em",textTransform:"uppercase",marginBottom:"12px"}}>Tags</p>
              <div style={{display:"flex",flexWrap:"wrap",gap:"6px"}}>
                {post.tags.map(t => (
                  <span key={t} className="bp-body" style={{padding:"3px 8px",border:"1px solid rgba(255,255,255,0.08)",color:"rgba(255,255,255,0.30)",fontSize:"10px",letterSpacing:"0.14em",textTransform:"uppercase"}}>{t}</span>
                ))}
              </div>
            </div>
          </aside>
 
          {/* ── Step content ── */}
          <main style={{padding:"clamp(32px,5vw,64px) clamp(24px,5vw,64px)"}}>
 
            {/* Step header */}
            <div style={{marginBottom:"36px"}}>
              <div style={{display:"flex",alignItems:"center",gap:"16px",marginBottom:"12px"}}>
                <span className="bp-cond" style={{fontSize:"clamp(2.5rem,6vw,5rem)",color:"rgba(255,255,255,0.06)",lineHeight:1}}>
                  {String(activeStep+1).padStart(2,"0")}
                </span>
                <div style={{height:"1px",flex:1,background:"rgba(255,255,255,0.06)"}}/>
              </div>
              <h2 className="bp-cond" style={{fontSize:"clamp(1.8rem,4vw,3.2rem)",lineHeight:0.92,marginBottom:"0",color:"#fff"}}>{step.title}</h2>
            </div>
 
            {/* Body text */}
            <div style={{marginBottom:"40px"}}>
              {step.body.split("\n\n").map((para, i) => (
                <p key={i} className="bp-body" style={{
                  color:"rgba(255,255,255,0.65)",
                  fontSize:"clamp(0.9rem,1.3vw,1.05rem)",
                  lineHeight:1.8, marginBottom:"20px",
                  whiteSpace:"pre-line",
                }}>{para}</p>
              ))}
            </div>
 
            {/* Code block (if present) */}
            {step.code && (
              <div style={{marginBottom:"40px"}}>
                <div style={{display:"flex",alignItems:"center",gap:"12px",marginBottom:"8px"}}>
                  <span className="bp-body" style={{color:"rgba(255,255,255,0.25)",fontSize:"10px",letterSpacing:"0.30em",textTransform:"uppercase"}}>Arduino Sketch</span>
                  <div style={{height:"1px",flex:1,background:"rgba(255,255,255,0.06)"}}/>
                </div>
                <pre style={{
                  background:"#0c0c0c", border:"1px solid rgba(255,255,255,0.08)",
                  padding:"clamp(16px,3vw,32px)", borderRadius:"0",
                  overflowX:"auto", margin:0,
                }}>
                  <code className="bp-code" style={{
                    color:"#e5e5e5", fontSize:"clamp(0.75rem,1.1vw,0.88rem)",
                    lineHeight:1.7, display:"block",
                  }}>
                    {step.code.split("\n").map((line, i) => {
                      // basic syntax highlighting
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
              <div style={{
                display:"grid",
                gridTemplateColumns: step.images.length === 1 ? "1fr" : "1fr 1fr",
                gap:"8px", marginBottom:"40px",
              }}>
                {step.images.map((src, i) => (
                  <div key={i} style={{overflow:"hidden",aspectRatio:"4/3",background:"#0a0a0a"}}>
                    <img src={src} alt={`Step ${activeStep+1} image ${i+1}`}
                      className="bp-img"
                      onClick={() => setLightbox(src)}
                      style={{width:"100%",height:"100%",objectFit:"cover",display:"block"}}/>
                  </div>
                ))}
              </div>
            )}
 
            {/* Videos (only on hydroponic post step 1) */}
            {slug === "hydroponic-system-build" && activeStep === 0 && (
              <div style={{display:"grid",gridTemplateColumns:"1fr 1fr",gap:"8px",marginBottom:"40px"}}>
                {[HYDRO_VIDEO1, HYDRO_VIDEO2].map((src, i) => (
                  <video key={i} src={src} controls muted playsInline
                    style={{width:"100%",display:"block",background:"#0a0a0a",border:"1px solid rgba(255,255,255,0.06)"}}/>
                ))}
              </div>
            )}
 
            {/* Step navigation */}
            <div style={{display:"flex",justifyContent:"space-between",paddingTop:"40px",borderTop:"1px solid rgba(255,255,255,0.06)",marginTop:"20px"}}>
              <button
                onClick={() => setActiveStep(Math.max(0, activeStep-1))}
                disabled={activeStep===0}
                className="bp-body"
                style={{background:"none",border:"1px solid rgba(255,255,255,0.12)",color:activeStep===0?"rgba(255,255,255,0.15)":"rgba(255,255,255,0.60)",padding:"12px 24px",cursor:activeStep===0?"default":"pointer",fontSize:"12px",letterSpacing:"0.18em",textTransform:"uppercase",transition:"border-color .2s,color .2s"}}>
                ← Previous
              </button>
 
              <span className="bp-body" style={{color:"rgba(255,255,255,0.20)",fontSize:"11px",letterSpacing:"0.20em",alignSelf:"center",textTransform:"uppercase"}}>
                {activeStep+1} / {post.steps.length}
              </span>
 
              {activeStep < post.steps.length - 1 ? (
                <button
                  onClick={() => setActiveStep(activeStep+1)}
                  className="bp-body"
                  style={{background:"#f97316",color:"#000",border:"none",padding:"12px 24px",cursor:"pointer",fontSize:"12px",fontWeight:700,letterSpacing:"0.18em",textTransform:"uppercase"}}>
                  Next Step →
                </button>
              ) : (
                <button onClick={onBackToList}
                  className="bp-body"
                  style={{background:"none",border:"1px solid rgba(249,115,22,0.5)",color:"#f97316",padding:"12px 24px",cursor:"pointer",fontSize:"12px",fontWeight:700,letterSpacing:"0.18em",textTransform:"uppercase"}}>
                  Back to Build Log
                </button>
              )}
            </div>
          </main>
        </div>
      </div>
    </>
  );
}