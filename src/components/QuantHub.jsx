import { useState } from "react";

// ─── DATA ─────────────────────────────────────────────────────────────────────

const SOURCES = [
  // Academic
  { id:1,  name:"SSRN Finance",               category:"Academic",   access:"free",     url:"https://ssrn.com/en/index.cfm/topic/4/",                                               description:"World's largest preprint repository for finance and economics. Search by topic, author, or JEL code — the essential first stop for any strategy or factor research.",                                            tags:["preprints"] },
  { id:2,  name:"arXiv q-fin",                 category:"Academic",   access:"free",     url:"https://arxiv.org/list/q-fin/recent",                                                   description:"Daily-updated quantitative finance preprints. Best for cutting-edge ML applications, portfolio theory, statistical arbitrage, and trading microstructure research.",                                            tags:["ML","preprints"] },
  { id:3,  name:"Journal of Portfolio Mgmt",   category:"Academic",   access:"paid",     url:"https://jpm.pm-research.com/",                                                          description:"Practitioner-focused journal bridging academic theory and real-world portfolio construction. Long track record of foundational factor, allocation, and risk research.",                                          tags:["journal"] },
  { id:4,  name:"Financial Analysts Journal",  category:"Academic",   access:"paid",     url:"https://www.tandfonline.com/journals/ufaj20",                                           description:"CFA Institute's flagship publication. Research with direct investment management applications, long-horizon perspective, and rigorous empirical standards.",                                                     tags:["journal"] },
  { id:5,  name:"Review of Financial Studies", category:"Academic",   access:"paid",     url:"https://academic.oup.com/rfs",                                                          description:"Top-tier academic journal covering asset pricing, corporate finance, and market microstructure. One of the three most prestigious finance journals globally.",                                                  tags:["journal"] },
  // Buyside
  { id:6,  name:"AQR Insights",                category:"Buyside",    access:"free",     url:"https://www.aqr.com/Insights/Research",                                                 description:"Cliff Asness & team's prolific output on factors, momentum, value, and alternative risk premia. The most cited buyside research publisher in systematic finance.",                                              tags:["factors"] },
  { id:7,  name:"Man Institute",               category:"Buyside",    access:"free",     url:"https://www.man.com/maninstitute",                                                      description:"Man Group's research arm covering ML applications, macro strategies, systematic approaches, and alternative data. High editorial quality with genuine intellectual depth.",                                       tags:["ML","macro"] },
  { id:8,  name:"Verdad Capital",              category:"Buyside",    access:"free",     url:"https://verdadcap.com/research",                                                        description:"Weekly free research on value investing, leveraged buyout mechanics, and credit strategies. Among the most consistent and frank free publishers in the industry.",                                               tags:["value","credit"] },
  { id:9,  name:"Alpha Architect",             category:"Buyside",    access:"free",     url:"https://alphaarchitect.com/blog/",                                                      description:"Practitioner-friendly deep dives into value and momentum factor investing. Translates academic literature into actionable insights with transparent data and code.",                                              tags:["factors"] },
  { id:10, name:"Robeco Insights",             category:"Buyside",    access:"free",     url:"https://www.robeco.com/en-int/insights",                                                description:"Quantitative equity, factor investing, and sustainable finance research from one of Europe's leading systematic asset managers. Strong empirical methodology.",                                                   tags:["factors"] },
  { id:11, name:"Two Sigma Articles",          category:"Buyside",    access:"free",     url:"https://www.twosigma.com/articles/",                                                    description:"Research on systematic trading, ML applications in finance, and data science. Sporadic but high signal — each piece reflects genuine internal research thinking.",                                               tags:["ML"] },
  { id:12, name:"Winton Research",             category:"Buyside",    access:"free",     url:"https://www.winton.com/research",                                                       description:"Data-driven CTA research on markets, statistical methodology, and systematic strategy development from one of the original trend-following firms.",                                                              tags:["CTA"] },
  { id:13, name:"Acadian AM Research",         category:"Buyside",    access:"free",     url:"https://www.acadian-asset.com/investment-research",                                     description:"Quantitative equity research including factor models and portfolio construction from Acadian, a systematic long-only manager with deep academic roots.",                                                         tags:["factors"] },
  // Aggregator
  { id:14, name:"Quantocracy",                 category:"Aggregator", access:"free",     url:"https://quantocracy.com/",                                                              description:"The single best curated aggregator of quant blogs. Covers dozens of practitioner blogs and academic preprints — bookmark it and check daily without exception.",                                                tags:[] },
  { id:15, name:"Quantpedia",                  category:"Aggregator", access:"freemium", url:"https://quantpedia.com/strategies/",                                                    description:"Database of 900+ summarized trading strategies with return statistics, complexity ratings, and source paper references. Free tier provides access to a large subset.",                                          tags:["strategies"] },
  { id:16, name:"Allocate Smartly",            category:"Aggregator", access:"paid",     url:"https://allocatesmartly.com/",                                                          description:"Live tracking and backtesting of tactical asset allocation strategies drawn directly from published academic papers. The definitive reference for TAA strategy research.",                                        tags:["TAA"] },
  { id:17, name:"OSAM Research",               category:"Aggregator", access:"free",     url:"https://osam.com/Commentary",                                                           description:"O'Shaughnessy's deep factor research — historical return analysis and narrative deconstructions of factor premia. Now part of Franklin Templeton's research output.",                                           tags:["factors"] },
  // Blog
  { id:18, name:"Flirting with Models",        category:"Blog",       access:"free",     url:"https://blog.thinknewfound.com/",                                                       description:"Newfound Research's rigorous work on portfolio construction, signal timing, and rebalancing. Among the most technically precise independent quant writing available.",                                           tags:["portfolio"] },
  { id:19, name:"Robot Wealth",                category:"Blog",       access:"free",     url:"https://robotwealth.com/blog/",                                                         description:"Implementation-focused quant trading research that bridges academic ideas and live execution — code, data, and real trade analysis throughout.",                                                                 tags:[] },
  { id:20, name:"Ernest Chan Blog",            category:"Blog",       access:"free",     url:"https://epchan.blogspot.com/",                                                          description:"Mean reversion, statistical arbitrage, and practical systematic trading by Ernie Chan — author of three canonical books on quantitative trading strategies.",                                                   tags:["stat-arb"] },
  { id:21, name:"Factor Research",             category:"Blog",       access:"free",     url:"https://www.factorresearch.com/",                                                       description:"Accessible factor deconstruction by Nicolas Rabener. Complex factor ideas presented clearly with clean empirical data, minimal jargon, and honest skepticism.",                                                  tags:["factors"] },
  { id:22, name:"Practical Quant",             category:"Blog",       access:"free",     url:"https://practicalquant.substack.com/",                                                  description:"Practical applications of quant methods with real-world implementation insights, reproducible notebooks, and a focus on what actually works in live trading.",                                                   tags:[] },
  // ML / Alt Data
  { id:23, name:"López de Prado (SSRN)",       category:"ML/AltData", access:"free",     url:"https://papers.ssrn.com/sol3/cf_dev/AbsByAuth.cfm?per_id=434076",                      description:"Author of Advances in Financial ML — seminal papers on backtesting bias, feature engineering, combinatorial purged cross-validation, and ML for asset management.",                                            tags:["ML"] },
  { id:24, name:"Hudson & Thames",             category:"ML/AltData", access:"free",     url:"https://hudsonthames.org/blog/",                                                        description:"Open-source ML finance research and production implementations. The MlFinLab library brings peer-reviewed academic strategies directly to production-grade Python code.",                                         tags:["ML","open-source"] },
  { id:25, name:"Numerai Forum",               category:"ML/AltData", access:"free",     url:"https://forum.numer.ai/",                                                               description:"Crowdsourced hedge fund community. Practitioners share ML feature ideas, model insights, and meta-model strategies — raw, unfiltered signal from active participants.",                                          tags:["ML"] },
];

const CATEGORIES = ["All","Academic","Buyside","Aggregator","Blog","ML/AltData"];

const CAT = {
  Academic:    { color:"#4a80f0", icon:"◎", bg:"rgba(74,128,240,0.11)" },
  Buyside:     { color:"#38b87c", icon:"◈", bg:"rgba(56,184,124,0.11)" },
  Aggregator:  { color:"#9060d0", icon:"◉", bg:"rgba(144,96,208,0.11)" },
  Blog:        { color:"#d07838", icon:"◆", bg:"rgba(208,120,56,0.11)" },
  "ML/AltData":{ color:"#c048a8", icon:"◇", bg:"rgba(192,72,168,0.11)" },
};

const ACC = {
  free:     { label:"Free",     color:"#38b87c", bg:"#071a10" },
  freemium: { label:"Freemium", color:"#c8a45a", bg:"#1c1408" },
  paid:     { label:"Paid",     color:"#7888a8", bg:"#12141e" },
};

const TAG = {
  preprints:    { color:"#5090f0", bg:"#0a1528" },
  ML:           { color:"#c048a8", bg:"#1e0818" },
  macro:        { color:"#7878d8", bg:"#101028" },
  journal:      { color:"#7080a0", bg:"#141820" },
  strategies:   { color:"#9868d0", bg:"#160a28" },
  portfolio:    { color:"#38b8b8", bg:"#081e1e" },
  value:        { color:"#c89030", bg:"#1a1004" },
  credit:       { color:"#d05858", bg:"#200808" },
  CTA:          { color:"#5070d8", bg:"#0c1228" },
  TAA:          { color:"#38a898", bg:"#081a18" },
  "stat-arb":   { color:"#70b838", bg:"#102008" },
  "open-source":{ color:"#38c060", bg:"#081804" },
  factors:      { color:"#5090f0", bg:"#0a1528" },
};

// ─── APP ──────────────────────────────────────────────────────────────────────

export default function App() {
  const [category, setCategory] = useState("All");
  const [access,   setAccess]   = useState("All");
  const [search,   setSearch]   = useState("");

  const filtered = SOURCES.filter(s => {
    if (category !== "All" && s.category !== category) return false;
    if (access   !== "All" && s.access   !== access)   return false;
    if (!search) return true;
    const q = search.toLowerCase();
    return s.name.toLowerCase().includes(q) ||
           s.description.toLowerCase().includes(q) ||
           s.category.toLowerCase().includes(q) ||
           s.tags.some(t => t.includes(q));
  });

  const catCnt = c => c === "All" ? SOURCES.length : SOURCES.filter(s => s.category === c).length;
  const accCnt = a => a === "All" ? SOURCES.length : SOURCES.filter(s => s.access   === a).length;
  const hasFilter = category !== "All" || access !== "All" || !!search;
  const reset = () => { setCategory("All"); setAccess("All"); setSearch(""); };

  return (
    <div className="app">

      {/* ── HEADER ────────────────────────────────────── */}
      <header className="hdr">
        <div className="hdr-in">
          <div className="logo">
            <span className="logo-glyph">◈</span>
            <div>
              <div className="logo-name">QuantHub</div>
              <div className="logo-sub">Research Source Directory</div>
            </div>
          </div>
          <input className="search-input" type="text"
            placeholder="Search name, topic, tag…"
            value={search} onChange={e => setSearch(e.target.value)} />
          <div className="hdr-tally">
            <span className="tally-n">{SOURCES.length}</span>
            <span className="tally-l">sources</span>
          </div>
        </div>
      </header>

      {/* ── FILTER BAR ────────────────────────────────── */}
      <div className="fbar">
        <div className="fbar-in">
          {/* Category */}
          <div className="frow">
            <span className="flabel">CATEGORY</span>
            <div className="chips">
              {CATEGORIES.map(cat => {
                const active = category === cat;
                const c = cat === "All" ? "#c8a45a" : CAT[cat]?.color;
                return (
                  <button key={cat} className="chip" onClick={() => setCategory(cat)}
                    style={{ background: active ? c+"1c" : "#131620",
                             color:      active ? c : "#48506a",
                             borderColor:active ? c+"55" : "#1e2230" }}>
                    {cat !== "All" && <span style={{opacity:.8}}>{CAT[cat]?.icon} </span>}
                    {cat}
                    <span className="chip-n" style={{ background: active ? c+"20" : "#1a1e2c",
                                                      color: active ? c : "#2e364e" }}>
                      {catCnt(cat)}
                    </span>
                  </button>
                );
              })}
            </div>
          </div>
          {/* Access */}
          <div className="frow">
            <span className="flabel">ACCESS</span>
            <div className="chips">
              {[["All","#c8a45a","All"],["free","#38b87c","Free"],["freemium","#c8a45a","Freemium"],["paid","#7888a8","Paid"]].map(([a,c,lbl]) => {
                const active = access === a;
                return (
                  <button key={a} className="chip" onClick={() => setAccess(a)}
                    style={{ background: active ? c+"1c" : "#131620",
                             color:      active ? c : "#48506a",
                             borderColor:active ? c+"55" : "#1e2230" }}>
                    {a !== "All" && <span className="dot" style={{background: c}} />}
                    {lbl}
                    <span className="chip-n" style={{ background: active ? c+"20" : "#1a1e2c",
                                                      color: active ? c : "#2e364e" }}>
                      {accCnt(a)}
                    </span>
                  </button>
                );
              })}
            </div>
          </div>
        </div>
      </div>

      {/* ── RESULTS STRIP ─────────────────────────────── */}
      <div className="rstrip">
        <div className="rstrip-in">
          <span className="rcnt">
            {filtered.length} SOURCE{filtered.length !== 1 ? "S" : ""}
          </span>
          {hasFilter && filtered.length > 0 && (
            <span className="rbreakdown">
              {(["free","freemium","paid"]).map(t => {
                const n = filtered.filter(s => s.access === t).length;
                return n ? <span key={t} style={{color: ACC[t].color}}>{n} {ACC[t].label.toLowerCase()}</span> : null;
              })}
            </span>
          )}
          {hasFilter && (
            <button className="rreset" onClick={reset}>Reset ✕</button>
          )}
        </div>
      </div>

      {/* ── GRID ──────────────────────────────────────── */}
      <main className="grid-wrap">
        <div className="grid">
          {filtered.map(s => <SourceCard key={s.id} source={s} />)}
          {filtered.length === 0 && (
            <div className="empty">
              <div className="empty-glyph">◎</div>
              <div className="empty-title">No sources match</div>
              <div className="empty-body">Adjust your filters or clear the search</div>
              <button className="empty-btn" onClick={reset}>Reset all filters</button>
            </div>
          )}
        </div>
      </main>

      <style>{CSS}</style>
    </div>
  );
}

// ─── SOURCE CARD ──────────────────────────────────────────────────────────────

function SourceCard({ source }) {
  const cat = CAT[source.category] || { color:"#808098", icon:"○", bg:"rgba(0,0,0,0)" };
  const acc = ACC[source.access]   || ACC.free;
  const cardBg = "#14151b";
  const hoverBg = "#191c24";

  return (
    <a href={source.url} target="_blank" rel="noopener noreferrer" className="card"
      onMouseEnter={e => { e.currentTarget.style.borderColor = cat.color+"55"; e.currentTarget.style.background = hoverBg; e.currentTarget.querySelector(".desc-fade").style.backgroundImage = `linear-gradient(to bottom, transparent, ${hoverBg})`; }}
      onMouseLeave={e => { e.currentTarget.style.borderColor = "#1e2230"; e.currentTarget.style.background = cardBg; e.currentTarget.querySelector(".desc-fade").style.backgroundImage = `linear-gradient(to bottom, transparent, ${cardBg})`; }}>

      {/* Left category bar */}
      <div style={{ width:4, flexShrink:0, background: cat.color, opacity:.8 }} />

      <div className="cbody">
        {/* Name + access badge */}
        <div className="cheader">
          <div className="cname">{source.name}</div>
          <div className="accbadge" style={{ color: acc.color, background: acc.bg }}>
            <span className="dot" style={{ background: acc.color }} />
            {acc.label}
          </div>
        </div>

        {/* Category */}
        <div className="catbadge" style={{ color: cat.color, background: cat.bg }}>
          {cat.icon} {source.category}
        </div>

        {/* Description with fade */}
        <div className="desc-wrap">
          <div className="cdesc">{source.description}</div>
          <div className="desc-fade" style={{ backgroundImage: `linear-gradient(to bottom, transparent, ${cardBg})` }} />
        </div>

        {/* Tags + arrow */}
        <div className="cfooter">
          <div className="ctags">
            {source.tags.map(tag => {
              const tc = TAG[tag] || { color:"#607090", bg:"#101828" };
              return <span key={tag} className="ctag" style={{ color: tc.color, background: tc.bg }}>{tag}</span>;
            })}
          </div>
          <span className="carrow">↗</span>
        </div>
      </div>
    </a>
  );
}

// ─── CSS ──────────────────────────────────────────────────────────────────────

const CSS = `
@import url('https://fonts.googleapis.com/css2?family=DM+Mono:wght@400;500&family=Inter:wght@400;500;600;700&display=swap');

*,*::before,*::after{box-sizing:border-box;margin:0;padding:0;}
.app{font-family:'Inter',system-ui,sans-serif;background:#0f1014;min-height:100vh;color:#d0d0e8;}

/* HEADER */
.hdr{background:#111318;border-bottom:1px solid #1c2030;position:sticky;top:0;z-index:100;padding:0 20px;}
.hdr-in{max-width:1440px;margin:0 auto;display:flex;align-items:center;gap:18px;height:60px;}
.logo{display:flex;align-items:center;gap:10px;flex-shrink:0;}
.logo-glyph{color:#c8a45a;font-size:22px;line-height:1;}
.logo-name{font-weight:700;font-size:16px;color:#f0f0f8;letter-spacing:-0.02em;}
.logo-sub{font-size:10px;color:#2e3450;letter-spacing:0.10em;text-transform:uppercase;margin-top:2px;}
.search-input{flex:1;max-width:380px;background:#181c28;border:1px solid #22263a;border-radius:8px;padding:8px 14px;font-size:13px;color:#b0b8d0;outline:none;font-family:inherit;transition:border-color .2s;}
.search-input:focus{border-color:rgba(200,164,90,.35);}
.search-input::placeholder{color:#262c40;}
.hdr-tally{margin-left:auto;flex-shrink:0;text-align:right;}
.tally-n{display:block;font-size:22px;font-weight:700;color:#c8a45a;line-height:1;font-family:'DM Mono',monospace;}
.tally-l{font-size:9px;color:#2e3450;letter-spacing:.10em;text-transform:uppercase;}

/* FILTER BAR */
.fbar{background:#0e1018;border-bottom:1px solid #1c2030;position:sticky;top:60px;z-index:99;padding:10px 20px;}
.fbar-in{max-width:1440px;margin:0 auto;display:flex;flex-direction:column;gap:7px;}
.frow{display:flex;align-items:center;gap:10px;}
.flabel{font-size:9px;color:#22263a;font-family:'DM Mono',monospace;letter-spacing:.14em;width:68px;flex-shrink:0;}
.chips{display:flex;gap:5px;overflow-x:auto;scrollbar-width:none;padding-bottom:1px;}
.chips::-webkit-scrollbar{display:none;}
.chip{display:inline-flex;align-items:center;gap:5px;padding:4px 10px;border-radius:14px;border:1px solid;font-size:12px;cursor:pointer;font-family:inherit;white-space:nowrap;transition:opacity .1s;}
.chip:hover{opacity:.85;}
.chip-n{font-size:10px;padding:1px 5px;border-radius:8px;font-variant-numeric:tabular-nums;transition:background .15s,color .15s;}
.dot{width:6px;height:6px;border-radius:50%;flex-shrink:0;}

/* RESULTS STRIP */
.rstrip{padding:9px 20px 5px;}
.rstrip-in{max-width:1440px;margin:0 auto;display:flex;align-items:center;gap:14px;}
.rcnt{font-size:10.5px;color:#22283c;font-family:'DM Mono',monospace;letter-spacing:.07em;}
.rbreakdown{display:flex;gap:10px;}
.rbreakdown span{font-size:10.5px;opacity:.65;font-family:'DM Mono',monospace;}
.rreset{margin-left:auto;background:none;border:none;font-size:11px;color:#2e3450;cursor:pointer;font-family:inherit;transition:color .15s;padding:3px 0;}
.rreset:hover{color:#c8a45a;}

/* GRID */
.grid-wrap{max-width:1440px;margin:0 auto;padding:8px 20px 56px;}
.grid{display:grid;grid-template-columns:repeat(auto-fill,minmax(320px,1fr));gap:10px;}

/* EMPTY */
.empty{grid-column:1/-1;text-align:center;padding:80px 20px;}
.empty-glyph{font-size:38px;color:#1c2030;margin-bottom:14px;}
.empty-title{font-size:15px;font-weight:600;color:#2e3858;margin-bottom:6px;}
.empty-body{font-size:13px;color:#1e2438;margin-bottom:18px;line-height:1.5;}
.empty-btn{background:#13161e;border:1px solid #22263a;border-radius:8px;padding:8px 18px;font-size:12px;color:#404868;cursor:pointer;font-family:inherit;transition:all .15s;}
.empty-btn:hover{border-color:rgba(200,164,90,.4);color:#c8a45a;}

/* CARD */
.card{display:flex;text-decoration:none;background:#14151b;border:1px solid #1e2230;border-radius:10px;overflow:hidden;}
.cbody{padding:14px 14px 13px 13px;flex:1;min-width:0;display:flex;flex-direction:column;}
.cheader{display:flex;justify-content:space-between;align-items:flex-start;gap:8px;margin-bottom:8px;}
.cname{font-family:'DM Mono',monospace;font-size:12.5px;font-weight:500;color:#c8cce8;line-height:1.35;flex:1;min-width:0;}
.accbadge{display:inline-flex;align-items:center;gap:4px;font-size:10px;font-weight:600;padding:3px 8px;border-radius:4px;letter-spacing:.05em;flex-shrink:0;white-space:nowrap;}
.catbadge{display:inline-flex;align-items:center;gap:4px;font-size:10.5px;font-weight:500;padding:3px 8px;border-radius:4px;margin-bottom:9px;width:fit-content;}
.desc-wrap{position:relative;height:57px;overflow:hidden;margin-bottom:11px;flex:1;}
.cdesc{font-size:12px;color:#3c4560;line-height:1.58;}
.desc-fade{position:absolute;bottom:0;left:0;right:0;height:22px;pointer-events:none;}
.cfooter{display:flex;justify-content:space-between;align-items:flex-end;margin-top:auto;padding-top:2px;}
.ctags{display:flex;gap:5px;flex-wrap:wrap;flex:1;}
.ctag{font-size:10px;padding:2px 7px;border-radius:3px;font-weight:500;letter-spacing:.02em;}
.carrow{font-size:16px;color:#1e2438;transition:color .15s;flex-shrink:0;margin-left:8px;}
.card:hover .carrow{color:#c8a45a;}

/* RESPONSIVE */
@media(max-width:767px){
  .hdr{padding:0 14px;}
  .hdr-in{height:52px;}
  .hdr-tally,.logo-sub{display:none;}
  .fbar{padding:8px 14px;top:52px;}
  .flabel{display:none;}
  .rstrip{padding:7px 14px 3px;}
  .rbreakdown{display:none;}
  .grid-wrap{padding:6px 14px 40px;}
  .grid{grid-template-columns:1fr;}
}
@media(min-width:1300px){
  .grid{grid-template-columns:repeat(auto-fill,minmax(340px,1fr));}
}
`;
