import { useState, useEffect, useCallback } from "react";
 
// ─── TYPES ────────────────────────────────────────────────────────────────────
type HeroCarouselProps = {
  onNavigateBlog: () => void;
};
 
// ─── CONSTANTS ────────────────────────────────────────────────────────────────
const HERO_IMAGE =
  "https://res.cloudinary.com/dz6kxumoo/image/upload/v1771895356/Gemini_Generated_Image_xg2milxg2milxg2m_l8ek3e.png";
const CV_URL =
  "https://res.cloudinary.com/dz6kxumoo/image/upload/v1771903537/Name_-_CV_liv2vz.png";
const HYDRO_COVER =
  "https://res.cloudinary.com/dz6kxumoo/image/upload/v1776823079/WhatsApp_Image_2026-04-22_at_2.52.29_AM_fzju9a.jpg";
const HYDRO_IMG2 =
  "https://res.cloudinary.com/dz6kxumoo/image/upload/v1776823077/WhatsApp_Image_2026-04-22_at_2.51.50_AM_gkbxl9.jpg";
const HYDRO_IMG3 =
  "https://res.cloudinary.com/dz6kxumoo/image/upload/v1776823078/WhatsApp_Image_2026-04-22_at_2.51.34_AM_qzvxtz.jpg";
const MARQUEE = "MECHANICAL ENGINEER · CAD DESIGN · SOLIDWORKS · MOTION STUDY · TECHNICAL DRAWINGS · ASSEMBLY · GD&T · ";
 
async function triggerDownload(): Promise<void> {
  try {
    const res = await fetch(CV_URL);
    if (!res.ok) throw new Error();
    const blob = await res.blob();
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url; a.download = "Jeremy_A_CV.png";
    document.body.appendChild(a); a.click(); a.remove();
    URL.revokeObjectURL(url);
  } catch { window.open(CV_URL, "_blank"); }
}
 
// ─── COMPONENT ────────────────────────────────────────────────────────────────
export function HeroCarousel({ onNavigateBlog }: HeroCarouselProps) {
  const [slide, setSlide]       = useState(0);
  const [day, setDay]           = useState("");
  const [month, setMonth]       = useState("");
  const [accent, setAccent]     = useState("#f97316");
  const [cvLoading, setCvLoading] = useState(false);
  const [animating, setAnimating] = useState(false);
 
  useEffect(() => {
    const d = new Date();
    const months = ["jan","feb","mar","apr","may","jun","jul","aug","sep","oct","nov","dec"];
    setDay(String(d.getDate()));
    setMonth(months[d.getMonth()]);
  }, []);
 
  useEffect(() => {
    const h = () => setAccent(window.scrollY > 80 ? "#facc15" : "#f97316");
    window.addEventListener("scroll", h, { passive: true });
    return () => window.removeEventListener("scroll", h);
  }, []);
 
  const go = (id: string): void =>
    document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });
 
  const handleCV = async (): Promise<void> => {
    setCvLoading(true);
    await triggerDownload();
    setCvLoading(false);
  };
 
  const goSlide = useCallback((n: number) => {
    if (animating) return;
    setAnimating(true);
    setSlide(n);
    setTimeout(() => setAnimating(false), 600);
  }, [animating]);
 
  const prev = () => goSlide((slide + 2) % 3);
  const next = () => goSlide((slide + 1) % 3);
 
  // Auto-advance every 7s
  useEffect(() => {
    const id = setInterval(() => goSlide((slide + 1) % 3), 7000);
    return () => clearInterval(id);
  }, [slide, goSlide]);
 
  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Anton&family=DM+Sans:ital,wght@0,300;0,400;0,700;1,300;1,400&display=swap');
 
        .hc-cond { font-family:'Anton','Arial Narrow',Impact,sans-serif; font-weight:400; letter-spacing:-0.02em; }
        .hc-body { font-family:'DM Sans',sans-serif; }
        .hc-it   { font-family:'DM Sans',Georgia,serif; font-style:italic; font-weight:300; }
 
        @keyframes hcMq    { 0%{transform:translateX(0)} 100%{transform:translateX(-50%)} }
        @keyframes hcSpark { 0%,100%{opacity:1;transform:scale(1) rotate(0deg)} 50%{opacity:.5;transform:scale(1.35) rotate(15deg)} }
        @keyframes hcDot   { 0%,100%{transform:translateY(0)} 50%{transform:translateY(7px)} }
        @keyframes hcSpin  { to{transform:rotate(360deg)} }
        @keyframes hcFadeIn { from{opacity:0;transform:translateY(20px)} to{opacity:1;transform:translateY(0)} }
 
        .hc-mq    { display:flex; width:max-content; animation:hcMq 22s linear infinite; }
        .hc-spark { animation:hcSpark 2.5s ease-in-out infinite; display:inline-block; }
        .hc-dot   { animation:hcDot 1.6s ease-in-out infinite; }
        .hc-spin  { display:inline-block; width:12px; height:12px; border:2px solid currentColor; border-right-color:transparent; border-radius:50%; animation:hcSpin .7s linear infinite; }
        .hc-fadein { animation:hcFadeIn .6s ease both; }
 
        .hc-slide { position:absolute; inset:0; transition:opacity .6s ease, transform .6s ease; }
        .hc-slide-active   { opacity:1; transform:translateX(0); pointer-events:auto; }
        .hc-slide-prev     { opacity:0; transform:translateX(-40px); pointer-events:none; }
        .hc-slide-next     { opacity:0; transform:translateX(40px); pointer-events:none; }
 
        .hc-btn-solid  { transition:filter .2s, transform .1s, background-color .4s, border-color .4s; cursor:pointer; }
        .hc-btn-solid:hover  { filter:brightness(1.12); }
        .hc-btn-solid:active { transform:scale(0.97); }
        .hc-btn-out    { transition:filter .2s, transform .1s, border-color .4s, color .4s; cursor:pointer; }
        .hc-btn-out:hover  { filter:brightness(1.12); }
        .hc-btn-out:active { transform:scale(0.97); }
        .hc-arrow { transition:opacity .2s, background .2s; cursor:pointer; }
        .hc-arrow:hover { opacity:1 !important; background:rgba(249,115,22,0.25) !important; }
        .hc-navbtn { transition:color .2s; cursor:pointer; }
        .hc-navbtn:hover { color:#fff !important; }
 
        /* Featured post image grid */
        .hc-img-grid { display:grid; grid-template-columns:1fr 1fr; grid-template-rows:1fr 1fr; gap:4px; height:100%; }
        .hc-img-grid img { width:100%; height:100%; object-fit:cover; }
        .hc-img-grid img:first-child { grid-row:span 2; }
 
        /* Slide 3 — future */
        .hc-future-tag { display:inline-block; padding:4px 14px; border:1px solid rgba(249,115,22,0.45); color:rgba(249,115,22,0.85); font-size:11px; letter-spacing:.22em; text-transform:uppercase; margin-bottom:20px; }
      `}</style>
 
      <section id="home" style={{
        position:"relative", height:"100vh", overflow:"hidden",
        background:"#080808", display:"flex", flexDirection:"column",
      }}>
 
        {/* ── SLIDE CONTAINER ── */}
        <div style={{ position:"relative", flex:1, overflow:"hidden" }}>
 
          {/* ════════ SLIDE 1 — HERO ════════ */}
          <div className={`hc-slide ${slide===0?"hc-slide-active":slide<0?"hc-slide-prev":"hc-slide-next"}`}
            style={{ display:"flex", flexDirection:"column" }}>
 
            {/* Background */}
            <img src={HERO_IMAGE} alt="" aria-hidden style={{
              position:"absolute", inset:0, width:"100%", height:"100%",
              objectFit:"cover", objectPosition:"center",
              filter:"grayscale(38%) brightness(0.50)", pointerEvents:"none", zIndex:0,
            }}/>
            <div style={{position:"absolute",inset:0,zIndex:1,pointerEvents:"none",
              background:"linear-gradient(to bottom,rgba(0,0,0,.65) 0%,rgba(0,0,0,.10) 30%,rgba(0,0,0,.18) 55%,rgba(0,0,0,.94) 100%)"}}/>
            <div style={{position:"absolute",top:0,bottom:0,left:0,width:"50%",zIndex:1,pointerEvents:"none",
              background:"linear-gradient(to right,rgba(0,0,0,.88),rgba(0,0,0,.40) 60%,transparent)"}}/>
 
            {/* Nav */}
            <nav style={{position:"relative",zIndex:20,display:"flex",alignItems:"center",justifyContent:"space-between",padding:"22px 48px 0",flexShrink:0}}>
              <div style={{display:"flex",alignItems:"center",gap:"10px"}}>
                <span className="hc-body" style={{color:"#fff",fontSize:"15px",fontWeight:700,letterSpacing:"0.04em"}}>Jeremy A.</span>
                <span className="hc-body" style={{color:"rgba(255,255,255,0.32)",fontSize:"10px",letterSpacing:"0.22em",textTransform:"uppercase"}}>Mech. Eng. Student</span>
              </div>
              <div style={{display:"flex",gap:"32px",alignItems:"center"}}>
                {(["projects","about","blog","contact"] as const).map(id => (
                  <button key={id} onClick={() => id === "blog" ? onNavigateBlog() : go(id)}
                    className="hc-body hc-navbtn"
                    style={{background:"none",border:"none",color:"rgba(255,255,255,0.60)",fontSize:"11px",textTransform:"uppercase",letterSpacing:"0.20em",padding:0,fontWeight:500}}>
                    {id}
                  </button>
                ))}
              </div>
            </nav>
 
            {/* Content */}
            <div style={{position:"relative",zIndex:10,flex:1,display:"flex",flexDirection:"column",padding:"0 48px"}}>
              <p className="hc-it" style={{color:"rgba(255,255,255,0.50)",fontSize:"clamp(0.95rem,1.3vw,1.1rem)",marginTop:"24px"}}>creative</p>
 
              <div style={{marginTop:"6px"}}>
                {(["MECHANICAL","ENGINEER","& BUILDER"] as const).map((word, i) => (
                  <div key={word} className="hc-cond" style={{
                    fontSize:"clamp(3.2rem,11.5vw,10rem)", lineHeight:0.9,
                    textTransform:"uppercase", userSelect:"none",
                    color: word.startsWith("&") ? "rgba(255,255,255,0.18)" : "#fff",
                    marginLeft: i===2 ? "clamp(1rem,4vw,4rem)" : 0,
                  }}>{word}</div>
                ))}
              </div>
 
              <div style={{flex:1}}/>
 
              <div style={{display:"flex",justifyContent:"flex-end",alignItems:"flex-end",gap:"clamp(20px,4vw,48px)",marginBottom:"clamp(24px,4vh,48px)",flexWrap:"wrap"}}>
                <div className="hc-body" style={{textAlign:"right",maxWidth:"320px",flexShrink:0}}>
                  <p style={{color:"rgba(255,255,255,0.80)",fontSize:"clamp(0.70rem,1.1vw,0.88rem)",fontWeight:300,textTransform:"uppercase",letterSpacing:"0.07em",lineHeight:1.7}}>
                    I AM A <strong style={{color:"#fff"}}>MECHANICAL ENGINEER</strong> FOCUSED ON{" "}
                    <strong style={{color:"#fff"}}>DESIGNING MECHANISMS</strong> AND{" "}
                    <strong style={{color:"#fff"}}>ENGINEERING MOTION</strong>.
                  </p>
                  <p style={{color:"rgba(255,255,255,0.40)",fontSize:"clamp(0.65rem,0.90vw,0.78rem)",marginTop:"8px",textTransform:"uppercase",letterSpacing:"0.07em",lineHeight:1.7}}>
                    I LOVE <span style={{color:"rgba(255,255,255,0.75)"}}>CAD DESIGN</span>,{" "}
                    <span style={{color:"rgba(255,255,255,0.75)"}}>TECHNICAL DRAWINGS</span>, AND{" "}
                    <span style={{color:"rgba(255,255,255,0.75)"}}>BUILDING REAL THINGS</span>.
                  </p>
                  <div style={{marginTop:"20px",display:"flex",gap:"10px",justifyContent:"flex-end",flexWrap:"wrap"}}>
                    <button onClick={() => go("contact")} className="hc-body hc-btn-solid"
                      style={{background:accent,color:"#000",border:"none",borderRadius:"999px",padding:"13px 30px",fontWeight:700,fontSize:"clamp(0.70rem,1vw,0.85rem)",textTransform:"uppercase",letterSpacing:"0.18em",minWidth:"140px"}}>
                      Contact Me
                    </button>
                    <button onClick={handleCV} disabled={cvLoading} className="hc-body hc-btn-out"
                      style={{background:"transparent",border:`2px solid ${accent}`,color:accent,borderRadius:"999px",padding:"11px 24px",fontWeight:700,fontSize:"clamp(0.70rem,1vw,0.85rem)",textTransform:"uppercase",letterSpacing:"0.18em",minWidth:"150px",opacity:cvLoading?0.65:1,display:"flex",alignItems:"center",justifyContent:"center",gap:"8px"}}>
                      {cvLoading ? <><span className="hc-spin"/> Downloading…</> : <>
                        <svg width="13" height="13" viewBox="0 0 14 14" fill="none"><path d="M7 1.5v8M3.5 7 7 10.5 10.5 7M1.5 12.5h11" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round"/></svg>
                        Download CV
                      </>}
                    </button>
                  </div>
                </div>
 
                {/* Date badge */}
                <div style={{textAlign:"right",lineHeight:1,userSelect:"none",flexShrink:0}}>
                  <span className="hc-spark" style={{fontSize:"1.4rem",color:"#fde047",display:"block",marginBottom:"2px"}}>✦</span>
                  <div className="hc-cond" style={{fontSize:"clamp(3.5rem,11vw,9rem)",lineHeight:0.85,letterSpacing:"-0.04em",color:"#fff"}}>{day||"—"}</div>
                  <div className="hc-body" style={{color:"#fff",fontSize:"clamp(0.85rem,1.3vw,1.1rem)",fontWeight:300,letterSpacing:"0.06em",marginTop:"6px"}}>{month}</div>
                  <div className="hc-body" style={{color:"rgba(255,255,255,0.40)",fontSize:"10px",textTransform:"uppercase",letterSpacing:"0.24em",marginTop:"4px",lineHeight:1.6}}>available<br/>for internship</div>
                </div>
              </div>
            </div>
          </div>
 
          {/* ════════ SLIDE 2 — FEATURED POST ════════ */}
          <div className={`hc-slide ${slide===1?"hc-slide-active":"hc-slide-next"}`}
            style={{display:"flex",flexDirection:"column",background:"#050505"}}>
 
            {/* Nav (same, always visible) */}
            <nav style={{position:"relative",zIndex:20,display:"flex",alignItems:"center",justifyContent:"space-between",padding:"22px 48px 0",flexShrink:0,borderBottom:"1px solid rgba(255,255,255,0.06)"}}>
              <div style={{display:"flex",alignItems:"center",gap:"10px"}}>
                <span className="hc-body" style={{color:"#fff",fontSize:"15px",fontWeight:700,letterSpacing:"0.04em"}}>Jeremy A.</span>
                <span className="hc-body" style={{color:"rgba(255,255,255,0.32)",fontSize:"10px",letterSpacing:"0.22em",textTransform:"uppercase"}}>Mech. Eng. Student</span>
              </div>
              <div style={{display:"flex",gap:"32px",alignItems:"center"}}>
                {(["projects","about","blog","contact"] as const).map(id => (
                  <button key={id} onClick={() => id==="blog" ? onNavigateBlog() : go(id)}
                    className="hc-body hc-navbtn"
                    style={{background:"none",border:"none",color:"rgba(255,255,255,0.60)",fontSize:"11px",textTransform:"uppercase",letterSpacing:"0.20em",padding:0,fontWeight:500}}>
                    {id}
                  </button>
                ))}
              </div>
            </nav>
 
            {/* Featured content */}
            <div style={{flex:1,display:"grid",gridTemplateColumns:"1fr 1fr",overflow:"hidden"}}>
 
              {/* Left — text */}
              <div style={{display:"flex",flexDirection:"column",justifyContent:"center",padding:"clamp(32px,5vw,64px)",borderRight:"1px solid rgba(255,255,255,0.06)"}}>
                <span className="hc-body" style={{display:"inline-block",padding:"4px 12px",border:"1px solid rgba(249,115,22,0.5)",color:"#f97316",fontSize:"10px",letterSpacing:"0.25em",textTransform:"uppercase",marginBottom:"24px",alignSelf:"flex-start"}}>
                  Featured Build Log
                </span>
                <div className="hc-cond" style={{fontSize:"clamp(2rem,5vw,4.5rem)",lineHeight:0.9,color:"#fff",marginBottom:"24px"}}>
                  BUILDING A<br/>
                  <span style={{color:"#f97316"}}>HYDROPONIC</span><br/>
                  SYSTEM
                </div>
                <p className="hc-body" style={{color:"rgba(255,255,255,0.55)",fontSize:"clamp(0.8rem,1.2vw,1rem)",lineHeight:1.7,maxWidth:"420px",marginBottom:"32px"}}>
                  A fully automated soil-less farming system built from scratch — Arduino-controlled servo valves, a regulated 12V power system, and a DC pump driving two irrigation channels.
                </p>
                <div style={{display:"flex",gap:"12px",flexWrap:"wrap"}}>
                  {["Arduino","Automation","Electronics","Hydroponics"].map(t => (
                    <span key={t} className="hc-body" style={{padding:"4px 10px",border:"1px solid rgba(255,255,255,0.12)",color:"rgba(255,255,255,0.45)",fontSize:"10px",letterSpacing:"0.18em",textTransform:"uppercase"}}>{t}</span>
                  ))}
                </div>
                <div style={{marginTop:"36px",display:"flex",gap:"12px",alignItems:"center"}}>
                  <button onClick={onNavigateBlog} className="hc-body hc-btn-solid"
                    style={{background:"#f97316",color:"#000",border:"none",borderRadius:"999px",padding:"14px 32px",fontWeight:700,fontSize:"13px",textTransform:"uppercase",letterSpacing:"0.18em"}}>
                    View Build Log →
                  </button>
                  <span className="hc-body" style={{color:"rgba(255,255,255,0.25)",fontSize:"11px",letterSpacing:"0.15em",textTransform:"uppercase"}}>12 min read</span>
                </div>
              </div>
 
              {/* Right — image grid */}
              <div style={{position:"relative",overflow:"hidden"}}>
                <div style={{display:"grid",gridTemplateColumns:"1fr 1fr",gridTemplateRows:"1fr 1fr",gap:"3px",height:"100%"}}>
                  <img src={HYDRO_COVER} alt="Hydroponic system" style={{width:"100%",height:"100%",objectFit:"cover",gridRow:"span 2"}}/>
                  <img src={HYDRO_IMG2} alt="Components" style={{width:"100%",height:"100%",objectFit:"cover"}}/>
                  <img src={HYDRO_IMG3} alt="Wiring" style={{width:"100%",height:"100%",objectFit:"cover"}}/>
                </div>
                {/* Overlay gradient */}
                <div style={{position:"absolute",inset:0,background:"linear-gradient(to right,rgba(5,5,5,0.3),transparent)",pointerEvents:"none"}}/>
              </div>
            </div>
          </div>
 
          {/* ════════ SLIDE 3 — FUTURE ════════ */}
          <div className={`hc-slide ${slide===2?"hc-slide-active":"hc-slide-next"}`}
            style={{display:"flex",flexDirection:"column",background:"#050505"}}>
 
            <nav style={{position:"relative",zIndex:20,display:"flex",alignItems:"center",justifyContent:"space-between",padding:"22px 48px 0",flexShrink:0}}>
              <div style={{display:"flex",alignItems:"center",gap:"10px"}}>
                <span className="hc-body" style={{color:"#fff",fontSize:"15px",fontWeight:700,letterSpacing:"0.04em"}}>Jeremy A.</span>
                <span className="hc-body" style={{color:"rgba(255,255,255,0.32)",fontSize:"10px",letterSpacing:"0.22em",textTransform:"uppercase"}}>Mech. Eng. Student</span>
              </div>
              <div style={{display:"flex",gap:"32px",alignItems:"center"}}>
                {(["projects","about","blog","contact"] as const).map(id => (
                  <button key={id} onClick={() => id==="blog" ? onNavigateBlog() : go(id)}
                    className="hc-body hc-navbtn"
                    style={{background:"none",border:"none",color:"rgba(255,255,255,0.60)",fontSize:"11px",textTransform:"uppercase",letterSpacing:"0.20em",padding:0,fontWeight:500}}>
                    {id}
                  </button>
                ))}
              </div>
            </nav>
 
            <div style={{flex:1,display:"flex",flexDirection:"column",alignItems:"center",justifyContent:"center",padding:"48px",textAlign:"center"}}>
              <div style={{position:"absolute",inset:0,overflow:"hidden",pointerEvents:"none"}}>
                {/* Grid lines decoration */}
                {[...Array(8)].map((_,i) => (
                  <div key={i} style={{position:"absolute",left:`${(i+1)*12.5}%`,top:0,bottom:0,width:"1px",background:"rgba(255,255,255,0.03)"}}/>
                ))}
                {[...Array(5)].map((_,i) => (
                  <div key={i} style={{position:"absolute",top:`${(i+1)*20}%`,left:0,right:0,height:"1px",background:"rgba(255,255,255,0.03)"}}/>
                ))}
              </div>
 
              <span className="hc-body" style={{display:"inline-block",padding:"4px 14px",border:"1px solid rgba(249,115,22,0.4)",color:"rgba(249,115,22,0.8)",fontSize:"10px",letterSpacing:"0.25em",textTransform:"uppercase",marginBottom:"28px"}}>
                Coming Next
              </span>
 
              <div className="hc-cond" style={{fontSize:"clamp(2.5rem,8vw,7rem)",lineHeight:0.88,color:"rgba(255,255,255,0.12)",userSelect:"none",marginBottom:"32px"}}>
                MORE BUILDS<br/>IN PROGRESS
              </div>
 
              <p className="hc-it" style={{color:"rgba(255,255,255,0.40)",fontSize:"clamp(1rem,1.8vw,1.4rem)",maxWidth:"500px",lineHeight:1.6,marginBottom:"40px"}}>
                A CNC pen plotter, a solar charge controller, and a 4-DOF robotic arm — all in various stages of build.
              </p>
 
              <div style={{display:"flex",gap:"16px",flexWrap:"wrap",justifyContent:"center"}}>
                {["CNC Pen Plotter","MPPT Solar Controller","4-DOF Robotic Arm"].map(t => (
                  <span key={t} className="hc-body" style={{padding:"8px 18px",border:"1px solid rgba(255,255,255,0.10)",color:"rgba(255,255,255,0.35)",fontSize:"12px",letterSpacing:"0.15em",textTransform:"uppercase"}}>{t}</span>
                ))}
              </div>
 
              <button onClick={onNavigateBlog} className="hc-body hc-btn-out" style={{marginTop:"40px",background:"transparent",border:"2px solid rgba(249,115,22,0.5)",color:"rgba(249,115,22,0.8)",borderRadius:"999px",padding:"12px 28px",fontWeight:700,fontSize:"12px",textTransform:"uppercase",letterSpacing:"0.18em",cursor:"pointer"}}>
                Browse All Projects →
              </button>
            </div>
          </div>
        </div>
 
        {/* ── CAROUSEL CONTROLS ── */}
        <div style={{position:"absolute",bottom:"clamp(60px,10vh,90px)",left:0,right:0,zIndex:30,display:"flex",alignItems:"center",justifyContent:"center",gap:"32px"}}>
          {/* Prev */}
          <button onClick={prev} className="hc-arrow"
            style={{width:"40px",height:"40px",borderRadius:"50%",border:"1px solid rgba(255,255,255,0.20)",background:"rgba(0,0,0,0.40)",color:"rgba(255,255,255,0.70)",display:"flex",alignItems:"center",justifyContent:"center",fontSize:"16px",opacity:0.7}}>
            ←
          </button>
 
          {/* Dots */}
          <div style={{display:"flex",gap:"10px"}}>
            {[0,1,2].map(i => (
              <button key={i} onClick={() => goSlide(i)} style={{
                width: slide===i ? "28px" : "8px",
                height:"8px", borderRadius:"999px",
                background: slide===i ? "#f97316" : "rgba(255,255,255,0.25)",
                border:"none", cursor:"pointer",
                transition:"width .35s ease, background .35s ease",
                padding:0,
              }}/>
            ))}
          </div>
 
          {/* Next */}
          <button onClick={next} className="hc-arrow"
            style={{width:"40px",height:"40px",borderRadius:"50%",border:"1px solid rgba(255,255,255,0.20)",background:"rgba(0,0,0,0.40)",color:"rgba(255,255,255,0.70)",display:"flex",alignItems:"center",justifyContent:"center",fontSize:"16px",opacity:0.7}}>
            →
          </button>
        </div>
 
        {/* Slide counter */}
        <div style={{position:"absolute",bottom:"clamp(20px,4vh,32px)",right:"48px",zIndex:30}}>
          <span className="hc-body" style={{color:"rgba(255,255,255,0.20)",fontSize:"11px",letterSpacing:"0.25em"}}>
            0{slide+1} / 03
          </span>
        </div>
 
        {/* ── MARQUEE (slide 1 only) ── */}
        {slide === 0 && (
          <div style={{position:"relative",zIndex:10,overflow:"hidden",borderTop:"1px solid rgba(255,255,255,0.10)",padding:"11px 0",background:"rgba(0,0,0,0.55)",flexShrink:0}}>
            <div className="hc-mq hc-cond" style={{color:"rgba(255,255,255,0.35)",fontSize:"11px",textTransform:"uppercase",letterSpacing:"0.26em"}}>
              {[0,1,2,3].map(i => <span key={i} style={{flexShrink:0}}>{MARQUEE}</span>)}
            </div>
          </div>
        )}
 
      </section>
    </>
  );
}