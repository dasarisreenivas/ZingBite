import{a as e,g as t,m as n,n as r,r as i,t as a}from"./createLucideIcon-DnU5s7Zs.js";import{t as o}from"./arrow-right-DKH1dmjK.js";import{t as s}from"./clock-Brf-ALnK.js";import{t as c}from"./search-BK_SMHKo.js";import{t as l}from"./star-BRmND74T.js";import{t as u}from"./truck-BhgCY32Y.js";import{t as d}from"./users-C-F8quHz.js";import{C as f,l as p,m,p as h}from"./index-DcSzLqUg.js";var ee=a(`award`,[[`path`,{d:`m15.477 12.89 1.515 8.526a.5.5 0 0 1-.81.47l-3.58-2.687a1 1 0 0 0-1.197 0l-3.586 2.686a.5.5 0 0 1-.81-.469l1.514-8.526`,key:`1yiouv`}],[`circle`,{cx:`12`,cy:`8`,r:`6`,key:`1vp47v`}]]),g=a(`shield-check`,[[`path`,{d:`M20 13c0 5-3.5 7.5-7.66 8.95a1 1 0 0 1-.67-.01C7.5 20.5 4 18 4 13V6a1 1 0 0 1 1-1c2 0 4.5-1.2 6.24-2.72a1.17 1.17 0 0 1 1.52 0C14.51 3.81 17 5 19 5a1 1 0 0 1 1 1z`,key:`oel41y`}],[`path`,{d:`m9 12 2 2 4-4`,key:`dzmm74`}]]),_=a(`utensils-crossed`,[[`path`,{d:`m16 2-2.3 2.3a3 3 0 0 0 0 4.2l1.8 1.8a3 3 0 0 0 4.2 0L22 8`,key:`n7qcjb`}],[`path`,{d:`M15 15 3.3 3.3a4.2 4.2 0 0 0 0 6l7.3 7.3c.7.7 2 .7 2.8 0L15 15Zm0 0 7 7`,key:`d0u48b`}],[`path`,{d:`m2.1 21.8 6.4-6.3`,key:`yn04lh`}],[`path`,{d:`m19 5-7 7`,key:`194lzd`}]]),v=a(`zap`,[[`path`,{d:`M4 14a1 1 0 0 1-.78-1.63l9.9-10.2a.5.5 0 0 1 .86.46l-1.92 6.02A1 1 0 0 0 13 10h7a1 1 0 0 1 .78 1.63l-9.9 10.2a.5.5 0 0 1-.86-.46l1.92-6.02A1 1 0 0 0 11 14z`,key:`1xq2db`}]]),y=t(n(),1),b=r();function x({children:e,className:t=``,style:n={}}){let r=(0,y.useRef)(null),[i,a]=(0,y.useState)(!1);return(0,y.useEffect)(()=>{let e=r.current;if(!e)return;let t=new IntersectionObserver(([n])=>{n.isIntersecting&&(a(!0),t.unobserve(e))},{threshold:.1,rootMargin:`0px 0px -40px 0px`});return t.observe(e),()=>t.disconnect()},[]),(0,b.jsx)(`div`,{ref:r,className:`${t} ${i?`visible`:``}`,style:n,children:e})}var S=y.memo(x),C=`https://images.unsplash.com/photo-1543353071-10c8ba85a904?q=80&w=2200&auto=format&fit=crop`,w=`https://images.unsplash.com/photo-1504674900247-0877df9cc836?q=80&w=2070&auto=format&fit=crop`,T=8,E=e=>{let t=String(e??``).match(/\d+/);return t?Number(t[0]):2**53-1},D=e=>{let t=String(e??``).trim();return t?/\b(min|mins|minutes)\b/i.test(t)?t:`${t} min`:`30-40 min`},O=e=>{let t=Number(e);return Number.isFinite(t)&&t>0?t.toFixed(1):`New`};function k(){return(0,b.jsx)(`div`,{className:`particles-bg`,children:(0,y.useMemo)(()=>Array.from({length:12},(e,t)=>({id:t,left:`${(t*8.3+5)%100}%`,size:4+t%4*2,delay:t*.7,duration:7+t%5*2})),[]).map(e=>(0,b.jsx)(`div`,{className:`particle`,style:{left:e.left,width:e.size,height:e.size,animationDelay:`${e.delay}s`,animationDuration:`${e.duration}s`}},e.id))})}function A({target:e,suffix:t=``,duration:n=2e3}){let[r,i]=(0,y.useState)(0),a=(0,y.useRef)(null),o=(0,y.useRef)(!1);return(0,y.useEffect)(()=>{let t=a.current;if(!t)return;let r=new IntersectionObserver(([a])=>{if(a.isIntersecting&&!o.current){o.current=!0;let a=Date.now(),s=()=>{let t=Date.now()-a,r=Math.min(t/n,1),o=1-(1-r)**3;i(Math.floor(o*e)),r<1&&requestAnimationFrame(s)};requestAnimationFrame(s),r.unobserve(t)}},{threshold:.3});return r.observe(t),()=>r.disconnect()},[e,n]),(0,b.jsxs)(`span`,{ref:a,className:`count-up`,children:[r,t]})}var j={restaurants:null,suggestion:null,resultCount:0,isSearch:!1,timestamp:0,key:``},M=()=>{let[t,n]=(0,y.useState)([]),[r,a]=(0,y.useState)(!0),[l,x]=(0,y.useState)(``),[w,D]=(0,y.useState)(``),[O,M]=(0,y.useState)(``),[P,F]=(0,y.useState)(`All`),[I,te]=(0,y.useState)(`default`),[L,R]=(0,y.useState)(T),[z,B]=(0,y.useState)(null),[ne,V]=(0,y.useState)(0),[H,U]=(0,y.useState)(!1),[W,G]=(0,y.useState)(null),[K,q]=(0,y.useState)(!1),[J,Y]=(0,y.useState)(0),X=(0,y.useRef)(null),Z=(0,y.useRef)(``);(0,y.useEffect)(()=>{let e=()=>{Y(window.scrollY*.15)};return window.addEventListener(`scroll`,e,{passive:!0}),()=>window.removeEventListener(`scroll`,e)},[]),(0,y.useEffect)(()=>{let e=new Image;e.src=C,e.onload=()=>q(!0)},[]);let Q=async()=>{let e=JSON.stringify({q:O.trim(),lat:W?.lat,lng:W?.lng}),t=j.restaurants!==null&&j.key===e,r=t&&Date.now()-j.timestamp>15e3;if(t){if(n(j.restaurants),B(j.suggestion),V(j.resultCount),U(j.isSearch),a(!1),x(``),!r)return}else a(!0),x(``);try{let t=new URLSearchParams;O.trim()&&t.append(`q`,O.trim()),W&&(t.append(`lat`,W.lat),t.append(`lng`,W.lng));let r=t.toString(),a=r?`/api/home?${r}`:`/api/home`,o=await i.get(a),s,c,l,u;o.data&&typeof o.data==`object`&&!Array.isArray(o.data)?(s=o.data.restaurants||[],c=o.data.suggestion||null,l=o.data.resultCount||0,u=o.data.isSearch||!1):(s=Array.isArray(o.data)?o.data:[],c=null,l=o.data?o.data.length:0,u=!1),n(s),B(c),V(l),U(u),j={restaurants:s,suggestion:c,resultCount:l,isSearch:u,timestamp:Date.now(),key:e},x(``)}catch(e){console.error(e),t||x(`We could not load restaurants right now. Please try again.`)}finally{t||a(!1)}},re=()=>Q();(0,y.useEffect)(()=>{navigator.geolocation&&navigator.geolocation.getCurrentPosition(e=>G({lat:e.coords.latitude,lng:e.coords.longitude}),e=>console.warn(`Geolocation permission denied or failed, falling back.`,e),{enableHighAccuracy:!1,timeout:5e3,maximumAge:6e4})},[]),(0,y.useEffect)(()=>{Q()},[O,W]),(0,y.useEffect)(()=>{let e=setTimeout(()=>M(w),400);return()=>clearTimeout(e)},[w]),(0,y.useEffect)(()=>{let e=O.trim();e&&e!==Z.current&&(f(`SEARCH`,{query:e}),Z.current=e)},[O]),(0,y.useEffect)(()=>{R(T)},[O,P,I,W]);let $=t.filter(e=>{let t=e.cusineType?e.cusineType.toLowerCase():``;return P===`All`||t.includes(P.toLowerCase())}).sort((e,t)=>I===`rating`?Number(t.rating||0)-Number(e.rating||0):I===`time`?E(e.deliveryTime)-E(t.deliveryTime):0),ie=$.slice(0,L),ae=L<$.length,oe=$.length-L;return(0,b.jsxs)(b.Fragment,{children:[(0,b.jsx)(`style`,{children:`
        /* ===== HERO SECTION ===== */
        .home-hero {
          position: relative;
          min-height: min(75vh, 660px);
          padding: 80px 20px;
          display: flex;
          align-items: center;
          overflow: hidden;
          background-color: #0d0d0d;
          color: #fff;
        }
        .home-hero-bg {
          position: absolute;
          inset: 0;
          background-image:
            linear-gradient(90deg, rgba(0,0,0,0.85) 0%, rgba(0,0,0,0.5) 50%, rgba(0,0,0,0.25) 100%),
            url('${C}');
          background-size: cover;
          background-position: center;
          transform: scale(1.05);
          transition: transform 0.1s linear, opacity 0.8s ease;
          opacity: ${+!!K};
        }
        .home-hero::before {
          content: '';
          position: absolute;
          inset: 0;
          background: linear-gradient(180deg, rgba(0,0,0,0) 60%, rgba(247,55,79,0.12) 100%);
          pointer-events: none;
          z-index: 1;
        }
        .home-hero::after {
          content: '';
          position: absolute;
          top: 0;
          left: 0;
          right: 0;
          height: 1px;
          background: linear-gradient(90deg, transparent, rgba(247,55,79,0.2), transparent);
          z-index: 2;
        }
        .hero-content {
          max-width: 700px;
          width: min(92%, 1400px);
          margin: 0 auto;
          position: relative;
          z-index: 3;
          text-align: left;
        }
        .hero-tag {
          display: inline-flex;
          align-items: center;
          gap: 6px;
          background: rgba(255,255,255,0.1);
          backdrop-filter: blur(8px);
          color: #fff;
          border: 1px solid rgba(255,255,255,0.15);
          padding: 6px 16px;
          border-radius: 20px;
          font-size: 0.85rem;
          font-weight: 600;
          margin-bottom: 16px;
          animation: premiumFadeIn 0.6s var(--ease-premium) both;
        }
        .hero-title {
          font-family: 'Outfit', sans-serif;
          font-size: clamp(2.4rem, 5vw, 3.8rem);
          font-weight: 800;
          letter-spacing: -0.5px;
          line-height: 1.08;
          margin-bottom: 16px;
          color: #fff;
          animation: premiumFadeIn 0.6s var(--ease-premium) 0.1s both;
        }
        .hero-title .highlight {
          background: linear-gradient(135deg, var(--brand-red), #ff8a9e);
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
          background-clip: text;
        }
        .hero-subtitle {
          font-size: 1.05rem;
          color: rgba(255,255,255,0.75);
          line-height: 1.65;
          max-width: 560px;
          margin: 0;
          animation: premiumFadeIn 0.6s var(--ease-premium) 0.2s both;
        }
        .hero-actions {
          display: flex;
          flex-wrap: wrap;
          gap: 12px;
          margin-top: 28px;
          animation: premiumSlideUp 0.5s var(--ease-premium) 0.3s both;
        }
        .hero-btn {
          display: inline-flex;
          align-items: center;
          justify-content: center;
          gap: 8px;
          min-height: 48px;
          padding: 0 24px;
          border-radius: 999px;
          font-size: 0.92rem;
          font-weight: 800;
          text-decoration: none;
          transition: all 0.35s var(--ease-premium);
          position: relative;
          overflow: hidden;
        }
        .hero-btn.primary {
          background: linear-gradient(135deg, var(--brand-red), #ff6b7a);
          color: #fff;
          box-shadow: 0 12px 30px rgba(247,55,79,0.35);
        }
        .hero-btn.primary::after {
          content: '';
          position: absolute;
          inset: 0;
          background: linear-gradient(90deg, transparent, rgba(255,255,255,0.15), transparent);
          transform: translateX(-100%);
          transition: transform 0.6s ease;
        }
        .hero-btn.primary:hover::after {
          transform: translateX(100%);
        }
        .hero-btn.primary:hover {
          transform: translateY(-2px) scale(1.02);
          box-shadow: 0 16px 40px rgba(247,55,79,0.45);
        }
        .hero-btn.secondary {
          background: rgba(255,255,255,0.08);
          backdrop-filter: blur(8px);
          color: #fff;
          border: 1px solid rgba(255,255,255,0.2);
        }
        .hero-btn.secondary:hover {
          background: rgba(255,255,255,0.15);
          transform: translateY(-2px);
          color: #fff;
        }
        .hero-chips {
          display: flex;
          justify-content: flex-start;
          gap: 10px;
          flex-wrap: wrap;
          margin-top: 28px;
          animation: premiumSlideUp 0.5s var(--ease-premium) 0.4s both;
        }
        .hero-chip {
          display: flex;
          align-items: center;
          gap: 6px;
          background: rgba(255,255,255,0.06);
          backdrop-filter: blur(8px);
          border: 1px solid rgba(255,255,255,0.1);
          padding: 8px 16px;
          border-radius: 30px;
          font-size: 0.85rem;
          font-weight: 500;
          color: rgba(255,255,255,0.85);
          transition: all 0.35s var(--ease-premium);
          cursor: default;
        }
        .hero-chip:hover {
          background: rgba(255,255,255,0.12);
          transform: translateY(-3px);
          box-shadow: 0 8px 24px rgba(0,0,0,0.15);
        }

        /* ===== STATS BAR ===== */
        .stats-bar {
          display: flex;
          justify-content: center;
          gap: 40px;
          max-width: 1400px;
          width: 92%;
          margin: -32px auto 32px;
          padding: 24px 32px;
          background: rgba(255,255,255,0.95);
          backdrop-filter: blur(16px);
          border: 1px solid rgba(247,55,79,0.08);
          border-radius: var(--radius-lg);
          box-shadow: 0 8px 30px rgba(28,28,28,0.06);
          position: relative;
          z-index: 5;
          flex-wrap: wrap;
        }
        .stat-item {
          display: flex;
          align-items: center;
          gap: 12px;
          padding: 0 16px;
        }
        .stat-icon {
          width: 44px;
          height: 44px;
          border-radius: 12px;
          background: rgba(247,55,79,0.08);
          display: flex;
          align-items: center;
          justify-content: center;
          color: var(--brand-red);
          flex-shrink: 0;
        }
        .stat-info {
          display: flex;
          flex-direction: column;
        }
        .stat-number {
          font-family: 'Outfit', sans-serif;
          font-size: 1.4rem;
          font-weight: 800;
          color: var(--text-primary);
          line-height: 1.2;
        }
        .stat-label {
          font-size: 0.82rem;
          color: var(--text-muted);
          font-weight: 500;
        }

        /* ===== HOME STATUS CARD ===== */
        .home-status-card {
          grid-column: 1 / -1;
          text-align: center;
          padding: 56px 24px;
          color: var(--text-secondary);
          border: 1px dashed rgba(247,55,79,0.18);
          border-radius: var(--radius-lg);
          background: rgba(255,255,255,0.96);
        }
        .home-status-card strong {
          display: block;
          color: var(--text-primary);
          font-size: 1.1rem;
          margin-bottom: 8px;
        }
        .retry-btn {
          margin-top: 18px;
          border: none;
          background: var(--brand-red);
          color: #fff;
          border-radius: 999px;
          padding: 10px 18px;
          font-weight: 800;
          cursor: pointer;
          transition: background var(--transition-fast), transform var(--transition-fast);
        }
        .retry-btn:hover {
          background: var(--brand-red-hover);
          transform: translateY(-1px);
        }

        /* ===== SECTION TITLE ===== */
        .section-title-row {
          display: flex;
          justify-content: space-between;
          align-items: center;
          max-width: 1400px;
          width: 92%;
          margin: 0 auto 16px;
          padding-bottom: 12px;
          border-bottom: 1px solid var(--border-light);
        }
        .section-title-row h2 {
          font-size: 1.45rem;
          color: var(--text-primary);
        }
        .section-count {
          color: var(--text-muted);
          font-size: 0.85rem;
        }

        /* ===== RESTAURANT GRID ===== */
        .restaurant-grid {
          display: grid;
          grid-template-columns: repeat(auto-fill, minmax(280px, 1fr));
          gap: 20px;
          max-width: 1400px;
          width: 92%;
          margin: 0 auto 48px;
        }
        .rest-card {
          border-radius: var(--radius-lg);
          overflow: hidden;
          background: rgba(255,255,255,0.96);
          border: 1px solid rgba(247,55,79,0.08);
          text-decoration: none;
          color: inherit;
          transition: all 0.4s var(--ease-premium);
          position: relative;
          display: flex;
          flex-direction: column;
          opacity: 0;
          transform: translateY(20px);
        }
        .rest-card.visible {
          opacity: 1;
          transform: translateY(0);
        }
        .rest-card:hover {
          transform: translateY(-8px) scale(1.01);
          box-shadow: 0 24px 48px rgba(28,28,28,0.12);
          border-color: rgba(247,55,79,0.2);
        }
        .rest-card-img-wrap {
          position: relative;
          width: 100%;
          padding-top: 60%;
          overflow: hidden;
          border-radius: var(--radius-lg);
        }
        .rest-card-img {
          position: absolute;
          inset: 0;
          width: 100%;
          height: 100%;
          object-fit: cover;
          transition: transform 0.6s var(--ease-premium);
        }
        .rest-card:hover .rest-card-img {
          transform: scale(1.08);
        }
        .rest-card-img-overlay {
          position: absolute;
          bottom: 0;
          left: 0;
          right: 0;
          height: 50%;
          background: linear-gradient(to top, rgba(0,0,0,0.55) 0%, transparent 100%);
          pointer-events: none;
          z-index: 1;
        }
        .rest-card-offer {
          position: absolute;
          bottom: 10px;
          left: 12px;
          z-index: 2;
          background: linear-gradient(135deg, #171a29 0%, #2d3143 100%);
          color: #fff;
          padding: 4px 10px;
          font-size: 0.8rem;
          font-weight: 700;
          border-radius: 6px;
          letter-spacing: 0.5px;
          text-transform: uppercase;
        }
        .rest-card-rating {
          position: absolute;
          top: 12px;
          right: 12px;
          z-index: 2;
          background: rgba(255,255,255,0.95);
          backdrop-filter: blur(4px);
          padding: 4px 8px;
          border-radius: 6px;
          display: flex;
          align-items: center;
          gap: 3px;
          font-weight: 700;
          font-size: 0.85rem;
          color: var(--text-primary);
          box-shadow: 0 2px 8px rgba(0,0,0,0.1);
        }
        .rest-card-rating .star {
          color: #FFB800;
        }
        .rest-card-details {
          padding: 12px 4px 8px;
        }
        .rest-card-name {
          font-family: 'Outfit', sans-serif;
          font-size: 1.15rem;
          font-weight: 700;
          margin: 0 0 4px;
          white-space: nowrap;
          overflow: hidden;
          text-overflow: ellipsis;
          color: var(--text-primary);
        }
        .rest-card-meta {
          display: flex;
          align-items: center;
          gap: 6px;
          color: var(--text-secondary);
          font-size: 0.85rem;
        }
        .rest-card-meta .dot {
          width: 3px;
          height: 3px;
          background: var(--text-muted);
          border-radius: 50%;
        }

        /* ===== CONTROL BAR ===== */
        .control-bar {
          display: flex;
          justify-content: space-between;
          align-items: center;
          max-width: 1400px;
          width: 92%;
          margin: 24px auto 12px;
          gap: 16px;
        }
        .search-container {
          display: flex;
          flex-direction: column;
          gap: 6px;
          width: 100%;
          max-width: 400px;
        }
        .search-box {
          display: flex;
          align-items: center;
          gap: 10px;
          background: var(--bg-surface);
          border: 1px solid rgba(247,55,79,0.12);
          padding: 8px 16px;
          border-radius: 30px;
          width: 100%;
          transition: all 0.3s var(--ease-premium);
        }
        .search-box:focus-within {
          border-color: var(--brand-red);
          background: #fff;
          box-shadow: 0 0 0 4px rgba(247,55,79,0.08);
          transform: scale(1.01);
        }
        .search-box input {
          border: none;
          background: transparent;
          outline: none;
          width: 100%;
          font-size: 0.95rem;
          color: var(--text-primary);
        }
        .suggestion-box {
          font-size: 0.85rem;
          color: var(--text-secondary);
          padding-left: 12px;
          animation: slideUp 0.3s var(--ease-premium) both;
        }
        .suggestion-btn {
          background: none;
          border: none;
          color: var(--brand-red);
          font-weight: 600;
          cursor: pointer;
          text-decoration: underline;
          padding: 0;
          font-family: inherit;
          font-size: inherit;
          transition: color var(--transition-fast);
        }
        .suggestion-btn:hover {
          color: var(--brand-red-hover);
        }
        .sort-box {
          display: flex;
          align-items: center;
          gap: 8px;
        }
        .sort-box label {
          font-size: 0.9rem;
          color: var(--text-secondary);
          font-weight: 500;
        }
        .sort-box select {
          padding: 8px 36px 8px 16px;
          border-radius: 30px;
          border: 1px solid rgba(247,55,79,0.12);
          background: #fff;
          font-size: 0.9rem;
          font-family: inherit;
          color: var(--text-primary);
          outline: none;
          cursor: pointer;
          transition: all 0.25s var(--ease-premium);
        }
        .sort-box select:hover {
          border-color: var(--brand-red);
        }
        .sort-box select:focus {
          border-color: var(--brand-red);
          box-shadow: 0 0 0 3px rgba(247,55,79,0.1);
        }

        /* ===== CUISINE FILTERS ===== */
        .cuisine-filters {
          display: flex;
          justify-content: center;
          gap: 10px;
          max-width: 1400px;
          width: 92%;
          margin: 0 auto 20px;
          overflow-x: auto;
          padding: 4px 0;
        }
        .cuisine-chip {
          padding: 8px 18px;
          background: rgba(255,255,255,0.94);
          border: 1px solid rgba(247,55,79,0.12);
          border-radius: 30px;
          font-size: 0.85rem;
          font-weight: 500;
          color: var(--text-secondary);
          cursor: pointer;
          transition: all 0.25s var(--ease-premium);
          white-space: nowrap;
        }
        .cuisine-chip:hover {
          border-color: var(--brand-red);
          color: var(--brand-red);
          transform: translateY(-1px);
        }
        .cuisine-chip.active {
          background: var(--brand-red);
          border-color: var(--brand-red);
          color: #fff;
          box-shadow: 0 4px 12px rgba(247,55,79,0.25);
        }

        @media (max-width: 768px) {
          .home-hero { padding: 40px 16px 32px; min-height: 70vh; }
          .hero-title { font-size: 2rem; }
          .hero-content { text-align: center; }
          .hero-subtitle { margin: 0 auto; }
          .hero-actions, .hero-chips { justify-content: center; }
          .stats-bar { flex-direction: column; gap: 16px; margin-top: -24px; padding: 20px; }
          .stat-item { justify-content: center; }
          .restaurant-grid { grid-template-columns: 1fr; gap: 16px; margin-bottom: 32px; }
          .control-bar { flex-direction: column; align-items: stretch; gap: 12px; }
          .search-container { max-width: 100%; }
          .sort-box { justify-content: space-between; }
          .sort-box select { flex: 1; max-width: 200px; }
          .cuisine-filters { justify-content: flex-start; padding-bottom: 8px; }
        }
      `}),(0,b.jsxs)(`div`,{children:[(0,b.jsxs)(`section`,{className:`home-hero`,ref:X,children:[(0,b.jsx)(k,{}),(0,b.jsx)(`div`,{className:`home-hero-bg`,style:{transform:`scale(1.05) translateY(${J}px)`}}),(0,b.jsxs)(`div`,{className:`hero-content`,children:[(0,b.jsxs)(`div`,{className:`hero-tag`,children:[(0,b.jsx)(m,{size:16}),` Fresh meals, fast routes`]}),(0,b.jsxs)(`h2`,{className:`hero-title`,children:[`Your food,`,` `,(0,b.jsx)(`span`,{className:`highlight`,children:`delivered with love`}),(0,b.jsx)(`br`,{}),`right on time.`]}),(0,b.jsx)(`p`,{className:`hero-subtitle`,children:`Explore trusted local restaurants, order in a few taps, and track every step from kitchen prep to doorstep delivery.`}),(0,b.jsxs)(`div`,{className:`hero-actions`,children:[(0,b.jsxs)(`a`,{href:`#restaurants`,className:`hero-btn primary`,children:[`Explore restaurants `,(0,b.jsx)(o,{size:17})]}),(0,b.jsxs)(e,{to:`/track-order`,className:`hero-btn secondary`,children:[(0,b.jsx)(p,{size:16}),` Track an order`]})]}),(0,b.jsxs)(`div`,{className:`hero-chips`,children:[(0,b.jsxs)(`div`,{className:`hero-chip`,children:[(0,b.jsx)(v,{size:16}),` Fast checkout`]}),(0,b.jsxs)(`div`,{className:`hero-chip`,children:[(0,b.jsx)(u,{size:16}),` Live delivery updates`]}),(0,b.jsxs)(`div`,{className:`hero-chip`,children:[(0,b.jsx)(_,{size:16}),` Local favorites`]}),(0,b.jsxs)(`div`,{className:`hero-chip`,children:[(0,b.jsx)(g,{size:16}),` Secure payments`]})]})]})]}),(0,b.jsx)(S,{children:(0,b.jsxs)(`div`,{className:`stats-bar`,children:[(0,b.jsxs)(`div`,{className:`stat-item`,children:[(0,b.jsx)(`div`,{className:`stat-icon`,children:(0,b.jsx)(ee,{size:22})}),(0,b.jsxs)(`div`,{className:`stat-info`,children:[(0,b.jsx)(`span`,{className:`stat-number`,children:(0,b.jsx)(A,{target:200,suffix:`+`})}),(0,b.jsx)(`span`,{className:`stat-label`,children:`Restaurant Partners`})]})]}),(0,b.jsxs)(`div`,{className:`stat-item`,children:[(0,b.jsx)(`div`,{className:`stat-icon`,children:(0,b.jsx)(d,{size:22})}),(0,b.jsxs)(`div`,{className:`stat-info`,children:[(0,b.jsx)(`span`,{className:`stat-number`,children:(0,b.jsx)(A,{target:50,suffix:`K+`})}),(0,b.jsx)(`span`,{className:`stat-label`,children:`Happy Customers`})]})]}),(0,b.jsxs)(`div`,{className:`stat-item`,children:[(0,b.jsx)(`div`,{className:`stat-icon`,children:(0,b.jsx)(p,{size:22})}),(0,b.jsxs)(`div`,{className:`stat-info`,children:[(0,b.jsx)(`span`,{className:`stat-number`,children:(0,b.jsx)(A,{target:25,suffix:`+`})}),(0,b.jsx)(`span`,{className:`stat-label`,children:`Cities Covered`})]})]}),(0,b.jsxs)(`div`,{className:`stat-item`,children:[(0,b.jsx)(`div`,{className:`stat-icon`,children:(0,b.jsx)(s,{size:22})}),(0,b.jsxs)(`div`,{className:`stat-info`,children:[(0,b.jsx)(`span`,{className:`stat-number`,children:(0,b.jsx)(A,{target:28,suffix:` min`})}),(0,b.jsx)(`span`,{className:`stat-label`,children:`Avg. Delivery Time`})]})]})]})}),(0,b.jsxs)(`div`,{className:`control-bar page-enter`,children:[(0,b.jsxs)(`div`,{className:`search-container`,children:[(0,b.jsxs)(`div`,{className:`search-box`,children:[(0,b.jsx)(c,{size:18,color:`var(--text-secondary)`}),(0,b.jsx)(`input`,{type:`text`,placeholder:`Search for restaurants or cuisines...`,"aria-label":`Search restaurants or cuisines`,value:w,onChange:e=>D(e.target.value)})]}),z&&(0,b.jsxs)(`div`,{className:`suggestion-box`,children:[`Did you mean:`,` `,(0,b.jsx)(`button`,{type:`button`,className:`suggestion-btn`,onClick:()=>D(z),children:z})]})]}),(0,b.jsxs)(`div`,{className:`sort-box`,children:[(0,b.jsx)(`label`,{children:`Sort By:`}),(0,b.jsxs)(`select`,{value:I,onChange:e=>te(e.target.value),children:[(0,b.jsx)(`option`,{value:`default`,children:`Relevance`}),(0,b.jsx)(`option`,{value:`rating`,children:`Rating: High to Low`}),(0,b.jsx)(`option`,{value:`time`,children:`Delivery Time: Fastest`})]})]})]}),(0,b.jsx)(`div`,{className:`cuisine-filters page-enter`,style:{animationDelay:`0.1s`},children:[`All`,`Biryani`,`Burger`,`Pizza`,`Chinese`,`Indian`,`Desserts`].map((e,t)=>(0,b.jsx)(`button`,{className:`cuisine-chip ${P===e?`active`:``}`,onClick:()=>F(e),style:{animation:`premiumFadeIn 0.4s var(--ease-premium) ${t*.06}s both`},children:e},e))}),(0,b.jsxs)(`div`,{id:`restaurants`,className:`section-title-row page-enter`,style:{animationDelay:`0.15s`},children:[(0,b.jsx)(`h2`,{children:H&&O.trim()?`Search Results for "${O}"`:`Restaurants near you`}),!r&&!l&&(0,b.jsxs)(`span`,{className:`section-count`,children:[$.length,` `,$.length===1?`restaurant`:`restaurants`]})]}),(0,b.jsx)(`section`,{className:`restaurant-grid`,children:r?Array.from({length:6}).map((e,t)=>(0,b.jsx)(`div`,{style:{height:`300px`,borderRadius:`var(--radius-lg)`},className:`skeleton-premium`},t)):l?(0,b.jsxs)(`div`,{className:`home-status-card`,children:[(0,b.jsx)(`strong`,{children:`Restaurants are taking a little longer to load.`}),(0,b.jsx)(`span`,{children:l}),(0,b.jsx)(`br`,{}),(0,b.jsx)(`button`,{type:`button`,className:`retry-btn`,onClick:re,children:`Retry`})]}):$.length>0?ie.map((e,t)=>(0,b.jsx)(N,{restaurant:e,index:t},e.restaurantId)):(0,b.jsxs)(`div`,{className:`home-status-card`,children:[(0,b.jsx)(`strong`,{children:`No restaurants found`}),(0,b.jsx)(`span`,{children:`Try a different search term, cuisine, or sort option.`})]})}),ae&&(0,b.jsx)(`div`,{className:`load-more-wrap`,children:(0,b.jsxs)(`button`,{type:`button`,className:`load-more-btn`,onClick:()=>R(e=>e+T),children:[`Load more restaurants (`,oe,` left) `,(0,b.jsx)(o,{className:`load-more-icon`,size:16})]})}),(0,b.jsx)(S,{children:(0,b.jsxs)(`section`,{style:{maxWidth:`1400px`,width:`92%`,margin:`0 auto 60px`,padding:`48px 0`,borderTop:`1px solid var(--border-light)`,textAlign:`center`},children:[(0,b.jsx)(`span`,{style:{fontSize:`0.8rem`,fontWeight:800,color:`var(--brand-red)`,textTransform:`uppercase`,letterSpacing:`1px`},children:`Why ZingBite`}),(0,b.jsxs)(`h3`,{style:{fontFamily:`'Outfit', sans-serif`,fontSize:`clamp(1.5rem, 3vw, 2.2rem)`,fontWeight:800,margin:`8px 0 36px`,color:`var(--text-primary)`},children:[`We `,(0,b.jsx)(h,{size:20,fill:`var(--brand-red)`,color:`var(--brand-red)`,style:{display:`inline`}}),` good food`]}),(0,b.jsx)(`div`,{style:{display:`grid`,gridTemplateColumns:`repeat(auto-fit, minmax(260px, 1fr))`,gap:`24px`},children:[{icon:(0,b.jsx)(m,{size:24}),title:`Handpicked Restaurants`,desc:`Every restaurant is vetted for quality, hygiene, and taste.`},{icon:(0,b.jsx)(u,{size:24}),title:`Lightning Fast Delivery`,desc:`Our route optimization gets your food to you in record time.`},{icon:(0,b.jsx)(g,{size:24}),title:`Secure & Easy Payments`,desc:`Multiple payment options with bank-grade encryption.`}].map((e,t)=>(0,b.jsxs)(`div`,{className:`promise-card`,style:{background:`rgba(255,255,255,0.96)`,border:`1px solid var(--border-light)`,borderRadius:`20px`,padding:`32px 24px`,transition:`all 0.35s var(--ease-premium)`,opacity:0,transform:`translateY(20px)`,animation:`premiumSlideUp 0.5s var(--ease-premium) ${.15+t*.1}s both`},children:[(0,b.jsx)(`div`,{style:{width:`56px`,height:`56px`,borderRadius:`16px`,background:`rgba(247,55,79,0.08)`,color:`var(--brand-red)`,display:`flex`,alignItems:`center`,justifyContent:`center`,margin:`0 auto 20px`},children:e.icon}),(0,b.jsx)(`h4`,{style:{fontFamily:`'Outfit', sans-serif`,fontSize:`1.15rem`,fontWeight:700,margin:`0 0 10px`},children:e.title}),(0,b.jsx)(`p`,{style:{fontSize:`0.88rem`,color:`var(--text-secondary)`,lineHeight:1.6,margin:0},children:e.desc})]},t))})]})})]})]})};function N({restaurant:t,index:n}){let r=(0,y.useRef)(null),[i,a]=(0,y.useState)(!1);return(0,y.useEffect)(()=>{let e=r.current;if(!e)return;let t=new IntersectionObserver(([r])=>{r.isIntersecting&&(setTimeout(()=>a(!0),n*60),t.unobserve(e))},{threshold:.1});return t.observe(e),()=>t.disconnect()},[n]),(0,b.jsxs)(e,{ref:r,to:`/menu?restaurantId=${t.restaurantId}&restaurantName=${encodeURIComponent(t.restaurantName)}`,className:`rest-card ${i?`visible`:``}`,style:{transitionDelay:i?`${n*.05}s`:`0s`},children:[(0,b.jsxs)(`div`,{className:`rest-card-img-wrap`,children:[(0,b.jsx)(`img`,{src:t.imagePath||w,alt:`${t.restaurantName||`Restaurant`} dishes`,className:`rest-card-img`,loading:`lazy`,onError:e=>{e.currentTarget.onerror=null,e.currentTarget.src=w}}),(0,b.jsx)(`div`,{className:`rest-card-img-overlay`}),(0,b.jsx)(`div`,{className:`rest-card-offer`,children:`Free Delivery`}),(0,b.jsxs)(`div`,{className:`rest-card-rating`,children:[(0,b.jsx)(`span`,{className:`star`,children:(0,b.jsx)(l,{size:14,fill:`#FFB800`,color:`#FFB800`})}),` `,O(t.rating)]})]}),(0,b.jsxs)(`div`,{className:`rest-card-details`,children:[(0,b.jsx)(`h3`,{className:`rest-card-name`,children:t.restaurantName}),(0,b.jsxs)(`div`,{className:`rest-card-meta`,children:[(0,b.jsx)(`span`,{children:t.cusineType}),(0,b.jsx)(`span`,{className:`dot`}),(0,b.jsx)(`span`,{children:D(t.deliveryTime)})]})]})]})}export{M as default};