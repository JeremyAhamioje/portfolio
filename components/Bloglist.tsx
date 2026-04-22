import { BLOG_POSTS } from "./blogData";
// blogData.ts must be in src/components/ alongside this file
 
type BlogListProps = {
  onSelectPost: (slug: string) => void;
  onBack: () => void;
};
 
export function BlogList({ onSelectPost, onBack }: BlogListProps) {
  const featured = BLOG_POSTS[0];
  const rest = BLOG_POSTS.slice(1);
 
  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Anton&family=DM+Sans:ital,wght@0,300;0,400;0,700;1,300;1,400&display=swap');
        .bl-cond { font-family:'Anton','Arial Narrow',Impact,sans-serif; font-weight:400; letter-spacing:-0.02em; }
        .bl-body { font-family:'DM Sans',sans-serif; }
        .bl-it   { font-family:'DM Sans',Georgia,serif; font-style:italic; font-weight:300; }
 
        @keyframes blMq { 0%{transform:translateX(0)} 100%{transform:translateX(-50%)} }
        .bl-mq { display:flex; width:max-content; animation:blMq 20s linear infinite; }
 
        .bl-card { transition:transform .25s ease, border-color .25s ease; cursor:pointer; }
        .bl-card:hover { transform:translateY(-4px); }
        .bl-card:hover .bl-card-img { transform:scale(1.04); }
        .bl-card-img { transition:transform .4s ease; }
 
        .bl-feat { transition:border-color .25s ease; cursor:pointer; }
        .bl-feat:hover .bl-feat-img { transform:scale(1.03); }
        .bl-feat-img { transition:transform .5s ease; }
 
        .bl-back { transition:color .2s ease; cursor:pointer; }
        .bl-back:hover { color:#f97316 !important; }
      `}</style>
 
      <div style={{ background:"#000", minHeight:"100vh", color:"#fff" }}>
 
        {/* ── Nav ── */}
        <nav style={{display:"flex",alignItems:"center",justifyContent:"space-between",padding:"22px 48px",borderBottom:"1px solid rgba(255,255,255,0.06)"}}>
          <button onClick={onBack} className="bl-body bl-back"
            style={{background:"none",border:"none",color:"rgba(255,255,255,0.45)",fontSize:"12px",letterSpacing:"0.20em",textTransform:"uppercase",padding:0,display:"flex",alignItems:"center",gap:"8px"}}>
            ← Back to Portfolio
          </button>
          <span className="bl-body" style={{color:"#fff",fontSize:"15px",fontWeight:700,letterSpacing:"0.04em"}}>Jeremy A.</span>
          <span className="bl-body" style={{color:"rgba(255,255,255,0.30)",fontSize:"11px",letterSpacing:"0.22em",textTransform:"uppercase"}}>Build Log</span>
        </nav>
 
        <div style={{maxWidth:"1400px",margin:"0 auto",padding:"clamp(32px,6vw,80px) 48px"}}>
 
          {/* Section header */}
          <div style={{marginBottom:"60px"}}>
            <p className="bl-body" style={{color:"rgba(255,255,255,0.30)",fontSize:"11px",letterSpacing:"0.45em",textTransform:"uppercase",marginBottom:"16px"}}>Build Logs & Project Write-ups</p>
            <div className="bl-cond" style={{fontSize:"clamp(3rem,8vw,7rem)",lineHeight:0.88,marginBottom:"8px"}}>
              THE BUILD<br/><span style={{color:"rgba(255,255,255,0.15)"}}>LOG</span>
            </div>
            <div style={{marginTop:"16px",height:"1px",background:"linear-gradient(to right,#f97316,rgba(249,115,22,0.2),transparent)"}}/>
          </div>
 
          {/* ── Featured post ── */}
          <div className="bl-feat" onClick={() => onSelectPost(featured.slug)}
            style={{display:"grid",gridTemplateColumns:"1fr 1fr",gap:0,border:"1px solid rgba(255,255,255,0.08)",marginBottom:"48px",overflow:"hidden"}}>
            {/* Image */}
            <div style={{overflow:"hidden",aspectRatio:"16/10",position:"relative"}}>
              <img src={featured.coverImage} alt={featured.title}
                className="bl-feat-img"
                style={{width:"100%",height:"100%",objectFit:"cover",display:"block"}}/>
              <div style={{position:"absolute",inset:0,background:"linear-gradient(to right,transparent 60%,rgba(0,0,0,0.5))",pointerEvents:"none"}}/>
            </div>
            {/* Text */}
            <div style={{padding:"clamp(24px,4vw,48px)",display:"flex",flexDirection:"column",justifyContent:"center",background:"#0a0a0a"}}>
              <div style={{display:"flex",alignItems:"center",gap:"12px",marginBottom:"20px"}}>
                <span className="bl-body" style={{padding:"3px 10px",border:"1px solid rgba(249,115,22,0.5)",color:"#f97316",fontSize:"10px",letterSpacing:"0.22em",textTransform:"uppercase"}}>Featured</span>
                <span className="bl-body" style={{color:"rgba(255,255,255,0.25)",fontSize:"10px",letterSpacing:"0.18em",textTransform:"uppercase"}}>{featured.category}</span>
              </div>
              <h2 className="bl-cond" style={{fontSize:"clamp(1.6rem,3.5vw,3rem)",lineHeight:0.92,marginBottom:"16px",color:"#fff"}}>{featured.title}</h2>
              <p className="bl-body" style={{color:"rgba(255,255,255,0.50)",fontSize:"clamp(0.8rem,1.2vw,0.95rem)",lineHeight:1.7,marginBottom:"24px"}}>{featured.excerpt}</p>
              <div style={{display:"flex",flexWrap:"wrap",gap:"6px",marginBottom:"24px"}}>
                {featured.tags.map(t => (
                  <span key={t} className="bl-body" style={{padding:"3px 8px",border:"1px solid rgba(255,255,255,0.10)",color:"rgba(255,255,255,0.35)",fontSize:"10px",letterSpacing:"0.15em",textTransform:"uppercase"}}>{t}</span>
                ))}
              </div>
              <div style={{display:"flex",alignItems:"center",gap:"16px"}}>
                <span className="bl-body" style={{color:"rgba(255,255,255,0.25)",fontSize:"11px",letterSpacing:"0.15em",textTransform:"uppercase"}}>{featured.date} · {featured.readTime}</span>
                <span style={{color:"#f97316",fontSize:"14px"}}>→</span>
              </div>
            </div>
          </div>
 
          {/* ── Post grid ── */}
          <div style={{display:"grid",gridTemplateColumns:"repeat(auto-fill,minmax(320px,1fr))",gap:"24px"}}>
            {rest.map(post => (
              <div key={post.slug}
                className="bl-card"
                onClick={() => !post.placeholder && onSelectPost(post.slug)}
                style={{border:"1px solid rgba(255,255,255,0.08)",overflow:"hidden",cursor:post.placeholder?"default":"pointer",opacity:post.placeholder?0.55:1}}>
                <div style={{overflow:"hidden",aspectRatio:"16/9",position:"relative"}}>
                  <img src={post.coverImage} alt={post.title}
                    className="bl-card-img"
                    style={{width:"100%",height:"100%",objectFit:"cover",display:"block"}}/>
                  {post.placeholder && (
                    <div style={{position:"absolute",inset:0,display:"flex",alignItems:"center",justifyContent:"center",background:"rgba(0,0,0,0.6)"}}>
                      <span className="bl-body" style={{color:"rgba(255,255,255,0.5)",fontSize:"11px",letterSpacing:"0.3em",textTransform:"uppercase"}}>Coming Soon</span>
                    </div>
                  )}
                </div>
                <div style={{padding:"24px",background:"#0a0a0a"}}>
                  <div style={{display:"flex",alignItems:"center",gap:"8px",marginBottom:"12px"}}>
                    <span className="bl-body" style={{color:"rgba(255,255,255,0.25)",fontSize:"10px",letterSpacing:"0.20em",textTransform:"uppercase"}}>{post.category}</span>
                    <span style={{color:"rgba(255,255,255,0.12)"}}>·</span>
                    <span className="bl-body" style={{color:"rgba(255,255,255,0.20)",fontSize:"10px",letterSpacing:"0.15em"}}>{post.date}</span>
                  </div>
                  <h3 className="bl-cond" style={{fontSize:"clamp(1.2rem,2.5vw,1.8rem)",lineHeight:0.95,color:"#fff",marginBottom:"10px"}}>{post.title}</h3>
                  <p className="bl-body" style={{color:"rgba(255,255,255,0.40)",fontSize:"13px",lineHeight:1.6,marginBottom:"16px"}}>{post.excerpt}</p>
                  <span className="bl-body" style={{color:"rgba(249,115,22,0.7)",fontSize:"11px",letterSpacing:"0.18em",textTransform:"uppercase"}}>{post.placeholder ? "In Progress" : "Read →"}</span>
                </div>
              </div>
            ))}
          </div>
        </div>
 
        {/* Marquee footer strip */}
        <div style={{borderTop:"1px solid rgba(255,255,255,0.06)",padding:"12px 0",overflow:"hidden",marginTop:"80px"}}>
          <div className="bl-mq bl-cond" style={{color:"rgba(255,255,255,0.08)",fontSize:"13px",textTransform:"uppercase",letterSpacing:"0.25em"}}>
            {[0,1,2,3].map(i => <span key={i} style={{flexShrink:0}}>BUILD LOG · MECHANICAL ENGINEERING · ELECTRONICS · AUTOMATION · FABRICATION · </span>)}
          </div>
        </div>
      </div>
    </>
  );
}
 