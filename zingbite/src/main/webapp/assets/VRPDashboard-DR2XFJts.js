import{t as e}from"./chevron-right-HgQaJnam.js";import{A as t,C as n,D as r,N as i,O as a,P as o,a as s,g as c,i as l,j as u,k as d,p as f,y as p}from"./index-CV7g5-d6.js";var m=r(`activity`,[[`path`,{d:`M22 12h-2.48a2 2 0 0 0-1.93 1.46l-2.35 8.36a.25.25 0 0 1-.48 0L9.24 2.18a.25.25 0 0 0-.48 0l-2.35 8.36A2 2 0 0 1 4.49 12H2`,key:`169zse`}]]),h=r(`chart-column`,[[`path`,{d:`M3 3v16a2 2 0 0 0 2 2h16`,key:`c24i48`}],[`path`,{d:`M18 17V9`,key:`2bz60n`}],[`path`,{d:`M13 17V5`,key:`1frdt8`}],[`path`,{d:`M8 17v-3`,key:`17ska0`}]]),g=r(`cloud-rain`,[[`path`,{d:`M4 14.899A7 7 0 1 1 15.71 8h1.79a4.5 4.5 0 0 1 2.5 8.242`,key:`1pljnt`}],[`path`,{d:`M16 14v6`,key:`1j4efv`}],[`path`,{d:`M8 14v6`,key:`17c4r9`}],[`path`,{d:`M12 16v6`,key:`c8a4gj`}]]),_=r(`rotate-ccw`,[[`path`,{d:`M3 12a9 9 0 1 0 9-9 9.75 9.75 0 0 0-6.74 2.74L3 8`,key:`1357e3`}],[`path`,{d:`M3 3v5h5`,key:`1xhq8a`}]]),v=r(`sliders-vertical`,[[`path`,{d:`M10 8h4`,key:`1sr2af`}],[`path`,{d:`M12 21v-9`,key:`17s77i`}],[`path`,{d:`M12 8V3`,key:`13r4qs`}],[`path`,{d:`M17 16h4`,key:`h1uq16`}],[`path`,{d:`M19 12V3`,key:`o1uvq1`}],[`path`,{d:`M19 21v-5`,key:`qua636`}],[`path`,{d:`M3 14h4`,key:`bcjad9`}],[`path`,{d:`M5 10V3`,key:`cb8scm`}],[`path`,{d:`M5 21v-7`,key:`1w1uti`}]]),y=o(i(),1),b=d(),x=12.958,S=77.589,C=12.9716,w=77.5946,T=12.9821,E=77.6085,D=12.9645,O=77.6142,k=12,A=()=>{let{user:r}=(0,y.useContext)(a),i=u(),[o,d]=(0,y.useState)(null),[A,j]=(0,y.useState)(!0),[M,N]=(0,y.useState)(!1),[P,F]=(0,y.useState)(typeof window<`u`&&!!window.L),[I,L]=(0,y.useState)(k),R=(0,y.useRef)(null),z=(0,y.useRef)(null),B=(0,y.useRef)([]),V=(0,y.useRef)([]),H=(0,y.useRef)([]),U=(0,y.useRef)(null);(0,y.useEffect)(()=>{let e=U.current;if(!e)return;let t=t=>{let n=e.getBoundingClientRect(),r=(t.clientX-n.left)/n.width-.5,i=(t.clientY-n.top)/n.height-.5;e.style.setProperty(`--mx`,String(r*2)),e.style.setProperty(`--my`,String(-i*2))};return e.addEventListener(`mousemove`,t),()=>e.removeEventListener(`mousemove`,t)},[]);let W=async()=>{if(!r||r.role!==`super_admin`){j(!1);return}try{d((await t.get(`/api/delivery/vrp`)).data)}catch(e){console.error(`Failed to fetch VRP state:`,e)}finally{j(!1)}};(0,y.useEffect)(()=>{W()},[r]),(0,y.useEffect)(()=>{if(window.L){F(!0);return}let e=document.querySelector(`link[href*="leaflet.css"]`);e||(e=document.createElement(`link`),e.rel=`stylesheet`,e.href=`https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.9.4/leaflet.css`,document.head.appendChild(e));let t=document.querySelector(`script[src*="leaflet.js"]`);if(!t)t=document.createElement(`script`),t.src=`https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.9.4/leaflet.js`,t.async=!0,t.onload=()=>{let e=setInterval(()=>{window.L&&(F(!0),clearInterval(e))},50)},document.body.appendChild(t);else{let e=setInterval(()=>{window.L&&(F(!0),clearInterval(e))},50);return()=>clearInterval(e)}},[]),(0,y.useEffect)(()=>{if(!P||!R.current||!o)return;let e=window.L;if(!e)return;if(!z.current){let t=e.map(R.current,{zoomControl:!0,scrollWheelZoom:!0}).setView([12.97,77.6],13);e.tileLayer(`https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png`,{maxZoom:19,attribution:`&copy; OpenStreetMap contributors`}).addTo(t),z.current=t}let t=z.current;if(B.current.forEach(e=>e.remove()),V.current.forEach(e=>e.remove()),H.current.forEach(e=>e.remove()),B.current=[],V.current=[],H.current=[],o.surgeZones&&o.surgeZones.forEach(n=>{let r=n.incentive>25?`#ef4444`:n.incentive>0?`#ff9f40`:`#4bc0c0`,i=e.circle([n.lat,n.lon],{radius:n.radius*1e5,color:r,fillColor:r,fillOpacity:.15,weight:1.5,dashArray:`4, 4`}).addTo(t).bindPopup(`<b>${n.name}</b><br/>Surge Premium: +&#8377;${n.incentive}`);H.current.push(i)}),o.nodes&&o.nodes.forEach(n=>{let r=`📍`;n.id===0?r=`🛵`:n.id===1?r=`🍳`:n.id===2?r=`🏠`:n.id===3&&(r=`🏢`);let i=e.divIcon({html:`<div style="font-size: 20px; line-height: 20px; text-align: center;">${r}</div>`,className:`custom-vrp-marker`,iconSize:[24,24],iconAnchor:[12,12]}),a=e.marker([n.latitude,n.longitude],{icon:i}).addTo(t).bindPopup(`<b>Node ${n.id}: ${n.label}</b><br/>Coords: ${n.latitude.toFixed(5)}, ${n.longitude.toFixed(5)}`);B.current.push(a)}),o.pathFM&&o.pathFM.length>0){let n=o.pathFM.map(e=>[e.latitude,e.longitude]),r=e.polyline(n,{color:`#06b6d4`,weight:4,opacity:.8}).addTo(t);V.current.push(r)}if(o.pathLM1&&o.pathLM1.length>0){let n=o.pathLM1.map(e=>[e.latitude,e.longitude]),r=e.polyline(n,{color:`#a855f7`,weight:4,opacity:.8,dashArray:`6, 6`}).addTo(t);V.current.push(r)}if(o.pathLM2&&o.pathLM2.length>0){let n=o.pathLM2.map(e=>[e.latitude,e.longitude]),r=e.polyline(n,{color:`#ec4899`,weight:4,opacity:.8,dashArray:`3, 6`}).addTo(t);V.current.push(r)}let n=e.latLngBounds([[x,S],[C,w],[T,E],[D,O]]);t.fitBounds(n,{padding:[40,40]}),setTimeout(()=>{z.current&&z.current.invalidateSize()},200)},[P,o]);let G=async e=>{N(!0);try{await t.post(`/api/delivery/vrp`,e),await W()}catch(e){console.error(`Action failed:`,e)}finally{N(!1)}};if(!r||r.role!==`super_admin`)return(0,b.jsx)(`div`,{style:{display:`flex`,flexDirection:`column`,justifyContent:`center`,alignItems:`center`,flex:1,minHeight:`calc(100vh - 72px)`,background:`#0d0d15`,color:`#fff`,padding:`20px`,textAlign:`center`},children:(0,b.jsxs)(`div`,{className:`access-denied-card`,style:{background:`rgba(255, 255, 255, 0.03)`,border:`1px solid rgba(255, 255, 255, 0.08)`,padding:`40px`,borderRadius:`16px`,backdropFilter:`blur(16px)`,maxWidth:`480px`,width:`100%`,boxShadow:`0 8px 32px rgba(0, 0, 0, 0.24)`},children:[(0,b.jsx)(`div`,{className:`alert-3d-icon`,children:(0,b.jsx)(l,{size:64,style:{color:`#ef4444`,marginBottom:`20px`,marginLeft:`auto`,marginRight:`auto`}})}),(0,b.jsx)(`h2`,{style:{fontSize:`1.5rem`,fontWeight:800,marginBottom:`12px`},children:`Access Restricted`}),(0,b.jsx)(`p`,{style:{color:`#94a3b8`,fontSize:`0.9rem`,marginBottom:`24px`,lineHeight:`1.5`},children:`The Vehicle Routing Problem (VRP) Control Room is strictly reserved for system engineers and administrators.`}),(0,b.jsx)(`button`,{onClick:()=>i(`/`),className:`btn-toggle active`,style:{padding:`10px 24px`,fontSize:`0.9rem`,width:`100%`,cursor:`pointer`},children:`Return to Dashboard`})]})});if(A)return(0,b.jsxs)(`div`,{className:`loading-3d-wrapper`,style:{display:`flex`,flexDirection:`column`,justifyContent:`center`,alignItems:`center`,flex:1,minHeight:`500px`,background:`#0a0a0f`,color:`#fff`},children:[(0,b.jsx)(`div`,{className:`spinner-3d`,children:(0,b.jsx)(c,{size:48,className:`spin spin-3d`,style:{color:`#06b6d4`,marginBottom:`16px`}})}),(0,b.jsx)(`span`,{className:`loading-text-3d`,style:{fontSize:`1rem`,fontWeight:600,letterSpacing:`1px`},children:`INITIALIZING DYNAMIC VRP SYSTEM...`})]});if(!o)return(0,b.jsxs)(`div`,{style:{display:`flex`,flexDirection:`column`,justifyContent:`center`,alignItems:`center`,flex:1,minHeight:`500px`,background:`#0a0a0f`,color:`#fff`,padding:`20px`,textAlign:`center`},children:[(0,b.jsx)(n,{size:48,style:{color:`#ef4444`,marginBottom:`16px`}}),(0,b.jsx)(`h2`,{style:{fontSize:`1.4rem`,fontWeight:800,marginBottom:`8px`},children:`VRP data unavailable`}),(0,b.jsx)(`p`,{style:{color:`#94a3b8`,maxWidth:`480px`,marginBottom:`20px`},children:`The optimization engine did not return a valid state. Try refreshing the dispatch model.`}),(0,b.jsx)(`button`,{type:`button`,onClick:W,className:`btn-toggle active`,style:{padding:`10px 24px`,cursor:`pointer`},children:`Retry VRP Load`})]});let K=o.logs||[],q=K.slice(0,I),J=I<K.length;return(0,b.jsxs)(b.Fragment,{children:[(0,b.jsx)(`style`,{children:`
        :root {
          --ease-premium: cubic-bezier(0.16, 1, 0.3, 1);
        }

        .vrp-container {
          perspective: 1200px;
          perspective-origin: 50% 0%;
          transform-style: preserve-3d;
          background: #0d0d15;
          min-height: calc(100vh - 72px);
          color: #f1f5f9;
          font-family: 'Inter', sans-serif;
          padding: 24px;
          animation: containerEnter3d 0.8s var(--ease-premium) both;
          transform: rotateY(calc(var(--mx, 0) * 0.5deg)) rotateX(calc(var(--my, 0) * 0.5deg));
          transition: transform 0.15s ease-out;
        }

        @keyframes containerEnter3d {
          0% { opacity: 0; transform: rotateY(calc(var(--mx, 0) * 0.5deg)) rotateX(calc(var(--my, 0) * 0.5deg)) rotateX(6deg) translateZ(-120px); }
          100% { opacity: 1; transform: rotateY(calc(var(--mx, 0) * 0.5deg)) rotateX(calc(var(--my, 0) * 0.5deg)) rotateX(0deg) translateZ(0); }
        }

        .vrp-header {
          display: flex;
          justify-content: space-between;
          align-items: center;
          margin-bottom: 20px;
          border-bottom: 1px solid rgba(255,255,255,0.06);
          padding-bottom: 16px;
          transform-style: preserve-3d;
        }

        .vrp-header h1 {
          text-shadow: 0 2px 20px rgba(56,189,248,0.08);
          transform: translateZ(2px);
        }

        .vrp-grid {
          display: grid;
          grid-template-columns: 1fr 400px;
          gap: 24px;
          align-items: start;
        }

        @media (max-width: 1100px) {
          .vrp-grid {
            grid-template-columns: 1fr;
          }
        }

        .panel-card {
          position: relative;
          background: rgba(20, 20, 30, 0.6);
          backdrop-filter: blur(12px);
          border: 1px solid rgba(255,255,255,0.06);
          border-radius: 12px;
          padding: 20px;
          margin-bottom: 20px;
          transform-style: preserve-3d;
          animation: panelSlideUp3d 0.6s var(--ease-premium) both;
          transition: transform 0.4s var(--ease-premium), box-shadow 0.4s var(--ease-premium), border-color 0.4s var(--ease-premium);
          box-shadow: 0 0 0 1px rgba(255,255,255,0.06), 0 4px 20px rgba(0,0,0,0.2);
        }

        .panel-card:hover {
          transform: translateZ(10px) rotateX(1deg);
          box-shadow: 0 0 0 1px rgba(56,189,248,0.1), 0 20px 60px rgba(0,0,0,0.4), 0 0 40px rgba(56,189,248,0.04);
          border-color: rgba(56,189,248,0.12);
        }

        .panel-card:nth-child(1) { animation-delay: 0.1s; }
        .panel-card:nth-child(2) { animation-delay: 0.2s; }
        .panel-card:nth-child(3) { animation-delay: 0.3s; }

        @keyframes panelSlideUp3d {
          0% { opacity: 0; transform: translateY(40px) rotateX(4deg); }
          100% { opacity: 1; transform: translateY(0) rotateX(0); }
        }

        .panel-title {
          font-size: 1.05rem;
          font-weight: 700;
          color: #38bdf8;
          display: flex;
          align-items: center;
          gap: 8px;
          margin-top: 0;
          margin-bottom: 16px;
          text-transform: uppercase;
          letter-spacing: 0.5px;
          text-shadow: 0 0 20px rgba(56,189,248,0.06);
        }

        .log-terminal {
          position: relative;
          background: #050508;
          border: 1px solid rgba(255,255,255,0.08);
          border-radius: 8px;
          padding: 12px;
          font-family: 'Courier New', Courier, monospace;
          font-size: 0.76rem;
          color: #34d399;
          height: 180px;
          overflow-y: auto;
          white-space: pre-wrap;
          line-height: 1.4;
          box-shadow: inset 0 2px 8px rgba(0,0,0,0.8);
          transform-style: preserve-3d;
          transition: transform 0.4s var(--ease-premium), box-shadow 0.4s var(--ease-premium);
        }

        .log-terminal:hover {
          transform: translateZ(4px);
          box-shadow: inset 0 2px 8px rgba(0,0,0,0.8), 0 8px 30px rgba(52,211,153,0.06);
          border-color: rgba(52,211,153,0.12);
        }

        .log-line {
          animation: logLineFade 0.4s var(--ease-premium) both;
          animation-delay: calc(var(--i, 0) * 0.03s);
        }

        @keyframes logLineFade {
          0% { opacity: 0; transform: translateY(-6px) rotateX(2deg); }
          100% { opacity: 1; transform: translateY(0) rotateX(0); }
        }

        .btn-toggle {
          position: relative;
          background: rgba(255,255,255,0.04);
          border: 1px solid rgba(255,255,255,0.08);
          color: #94a3b8;
          padding: 8px 16px;
          border-radius: 20px;
          cursor: pointer;
          font-weight: 600;
          font-size: 0.85rem;
          transition: all 0.3s var(--ease-premium), transform 0.15s var(--ease-premium);
          transform-style: preserve-3d;
          overflow: hidden;
        }

        .btn-toggle::before {
          content: '';
          position: absolute;
          inset: 0;
          border-radius: 20px;
          background: linear-gradient(135deg, rgba(56,189,248,0), rgba(56,189,248,0.03));
          opacity: 0;
          transition: opacity 0.3s var(--ease-premium);
        }

        .btn-toggle:hover::before {
          opacity: 1;
        }

        .btn-toggle:hover {
          transform: translateZ(6px);
          background: rgba(255,255,255,0.08);
          color: #f1f5f9;
          box-shadow: 0 8px 25px rgba(0,0,0,0.3);
        }

        .btn-toggle:active {
          transform: scale(0.97) translateZ(2px);
        }

        .btn-toggle.active {
          background: rgba(56, 189, 248, 0.15);
          border-color: #38bdf8;
          color: #38bdf8;
          box-shadow: 0 0 10px rgba(56, 189, 248, 0.2);
          animation: btnPulse3d 2.5s var(--ease-premium) infinite;
        }

        .btn-toggle.active::before {
          background: linear-gradient(135deg, rgba(56,189,248,0.05), rgba(56,189,248,0.1));
          opacity: 1;
        }

        @keyframes btnPulse3d {
          0%, 100% { box-shadow: 0 0 10px rgba(56,189,248,0.2), 0 0 20px rgba(56,189,248,0.05); }
          50% { box-shadow: 0 0 25px rgba(56,189,248,0.35), 0 0 60px rgba(56,189,248,0.08), 0 0 80px rgba(56,189,248,0.03); }
        }

        .eta-meter {
          height: 8px;
          background: rgba(255,255,255,0.06);
          border-radius: 4px;
          overflow: hidden;
          margin-top: 6px;
          transform-style: preserve-3d;
        }

        .eta-segment {
          height: 100%;
          float: left;
          transition: width 0.3s ease;
          animation: etaBarGrow 0.8s var(--ease-premium) both;
          transform-origin: left;
        }

        @keyframes etaBarGrow {
          0% { transform: scaleX(0); }
          100% { transform: scaleX(1); }
        }

        .eta-tag {
          font-size: 0.72rem;
          font-weight: 700;
          padding: 2px 6px;
          border-radius: 4px;
          text-transform: uppercase;
        }

        .road-row {
          display: flex;
          justify-content: space-between;
          align-items: center;
          padding: 8px 0;
          border-bottom: 1px solid rgba(255,255,255,0.03);
          font-size: 0.84rem;
          animation: roadRowSlide 0.5s var(--ease-premium) both;
          animation-delay: calc(var(--i, 0) * 0.04s);
          transform-style: preserve-3d;
          transition: transform 0.3s var(--ease-premium), padding 0.3s var(--ease-premium);
        }

        .road-row:hover {
          transform: translateX(4px) translateZ(2px);
          padding-left: 4px;
        }

        @keyframes roadRowSlide {
          0% { opacity: 0; transform: translateX(-24px) rotateY(3deg); }
          100% { opacity: 1; transform: translateX(0) rotateY(0); }
        }

        .select-traffic {
          background: #14141e;
          border: 1.5px solid rgba(255,255,255,0.1);
          color: #f1f5f9;
          font-size: 0.78rem;
          padding: 4px 28px 4px 10px;
          border-radius: 8px;
          outline: none;
          cursor: pointer;
          transition: all 0.2s var(--ease-premium);
          appearance: none;
          -webkit-appearance: none;
          -moz-appearance: none;
          background-image: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='10' height='10' viewBox='0 0 24 24' fill='none' stroke='%23a0a0b0' stroke-width='2.5' stroke-linecap='round' stroke-linejoin='round'%3E%3Cpath d='m6 9 6 6 6-6'/%3E%3C/svg%3E");
          background-repeat: no-repeat;
          background-position: right 8px center;
          background-size: 12px;
        }

        .select-traffic:hover {
          border-color: var(--brand-red);
          background-image: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='10' height='10' viewBox='0 0 24 24' fill='none' stroke='%23F7374F' stroke-width='2.5' stroke-linecap='round' stroke-linejoin='round'%3E%3Cpath d='m6 9 6 6 6-6'/%3E%3C/svg%3E");
        }

        .select-traffic:focus {
          border-color: var(--brand-red);
          box-shadow: 0 0 0 3px rgba(247,55,79,0.15);
          background-image: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='10' height='10' viewBox='0 0 24 24' fill='none' stroke='%23F7374F' stroke-width='2.5' stroke-linecap='round' stroke-linejoin='round'%3E%3Cpath d='m6 9 6 6 6-6'/%3E%3C/svg%3E");
        }

        .select-traffic option {
          background: #1e1e2e;
          color: #f1f5f9;
        }

        .badge-surge {
          background: rgba(239, 68, 68, 0.1);
          border: 1px solid rgba(239, 68, 68, 0.2);
          color: #ef4444;
          padding: 4px 8px;
          border-radius: 12px;
          font-size: 0.72rem;
          font-weight: 700;
        }

        .spin {
          animation: spin 1s linear infinite;
        }

        @keyframes spin {
          from { transform: rotate(0deg); }
          to { transform: rotate(360deg); }
        }

        .spin-3d {
          animation: spin3d 2s var(--ease-premium) infinite;
        }

        @keyframes spin3d {
          0% { transform: rotateY(0deg); }
          50% { transform: rotateY(180deg); }
          100% { transform: rotateY(360deg); }
        }

        .legend-indicator {
          width: 10px;
          height: 10px;
          border-radius: 50%;
          display: inline-block;
        }

        .map-wrapper {
          perspective: 1000px;
          transform-style: preserve-3d;
          animation: mapFloat3d 4s var(--ease-premium) infinite;
          border: 1px solid rgba(255,255,255,0.08);
          border-radius: 12px;
          overflow: hidden;
          position: relative;
          margin-bottom: 24px;
          transition: box-shadow 0.4s var(--ease-premium);
        }

        .map-wrapper:hover {
          box-shadow: 0 0 0 1px rgba(56,189,248,0.12), 0 20px 60px rgba(0,0,0,0.3), 0 0 40px rgba(56,189,248,0.04);
        }

        @keyframes mapFloat3d {
          0%, 100% { transform: translateY(0) rotateX(0.3deg); }
          50% { transform: translateY(-4px) rotateX(-0.3deg); }
        }

        .cost-matrix-row {
          transition: transform 0.3s var(--ease-premium), background 0.3s;
          transform-style: preserve-3d;
        }

        .cost-matrix-row:hover {
          transform: rotateX(1deg) translateZ(4px);
          background: rgba(56, 189, 248, 0.04) !important;
        }

        .access-denied-card {
          transform-style: preserve-3d;
          animation: panelSlideUp3d 0.6s var(--ease-premium) both;
        }

        .alert-3d-icon {
          animation: alertFloat3d 3s var(--ease-premium) infinite;
          transform-style: preserve-3d;
        }

        @keyframes alertFloat3d {
          0%, 100% { transform: translateY(0) rotateY(0deg) translateZ(4px); }
          50% { transform: translateY(-8px) rotateY(10deg) translateZ(8px); }
        }

        .loading-3d-wrapper {
          perspective: 800px;
          transform-style: preserve-3d;
        }

        .spinner-3d {
          transform-style: preserve-3d;
          animation: spinnerFloat3d 2s var(--ease-premium) infinite;
        }

        @keyframes spinnerFloat3d {
          0%, 100% { transform: translateZ(0) rotateY(0deg); }
          50% { transform: translateZ(12px) rotateY(180deg); }
        }

        .loading-text-3d {
          display: inline-block;
          animation: loadingTextPulse 2s var(--ease-premium) infinite;
          transform-style: preserve-3d;
        }

        @keyframes loadingTextPulse {
          0%, 100% { opacity: 0.8; transform: translateZ(0); text-shadow: 0 0 10px rgba(6, 182, 212, 0.1); }
          50% { opacity: 1; transform: translateZ(4px); text-shadow: 0 0 20px rgba(6, 182, 212, 0.3), 0 0 40px rgba(6, 182, 212, 0.1); }
        }

        .load-more-wrap {
          transform-style: preserve-3d;
          perspective: 400px;
        }

        .load-more-btn {
          background: rgba(15, 23, 42, 0.92);
          color: #38bdf8;
          border: 1px solid rgba(56, 189, 248, 0.3);
          padding: 8px 20px;
          border-radius: 20px;
          cursor: pointer;
          font-weight: 600;
          font-size: 0.82rem;
          transition: all 0.3s var(--ease-premium), transform 0.15s var(--ease-premium);
          transform-style: preserve-3d;
          display: flex;
          align-items: center;
          gap: 6px;
        }

        .load-more-btn:hover {
          transform: translateZ(6px);
          box-shadow: 0 8px 25px rgba(0,0,0,0.3), 0 0 20px rgba(56,189,248,0.08);
          border-color: rgba(56,189,248,0.5);
        }

        .load-more-btn:active {
          transform: scale(0.97) translateZ(2px);
        }

        .load-more-icon {
          transition: transform 0.3s var(--ease-premium);
        }

        .load-more-btn:hover .load-more-icon {
          transform: translateX(4px);
        }

        /* Scrollbar styling */
        .log-terminal::-webkit-scrollbar,
        div[style*="overflow-y: auto"]::-webkit-scrollbar {
          width: 4px;
        }

        .log-terminal::-webkit-scrollbar-track,
        div[style*="overflow-y: auto"]::-webkit-scrollbar-track {
          background: rgba(0,0,0,0.2);
        }

        .log-terminal::-webkit-scrollbar-thumb,
        div[style*="overflow-y: auto"]::-webkit-scrollbar-thumb {
          background: rgba(56,189,248,0.2);
          border-radius: 2px;
        }

        .log-terminal::-webkit-scrollbar-thumb:hover,
        div[style*="overflow-y: auto"]::-webkit-scrollbar-thumb:hover {
          background: rgba(56,189,248,0.4);
        }
      `}),(0,b.jsxs)(`div`,{ref:U,className:`vrp-container fade-in page-enter`,children:[(0,b.jsxs)(`div`,{className:`vrp-header`,children:[(0,b.jsxs)(`div`,{children:[(0,b.jsxs)(`h1`,{style:{fontSize:`1.6rem`,fontWeight:800,margin:0,display:`flex`,alignItems:`center`,gap:`8px`},children:[(0,b.jsx)(p,{className:`spin spin-3d`,style:{color:`#38bdf8`},size:28}),` VRP Dispatch Control Room`]}),(0,b.jsx)(`p`,{style:{color:`#94a3b8`,fontSize:`0.85rem`,margin:`4px 0 0 0`},children:`Dynamic Vehicle Routing Problem (VRP) optimization engine simulation under live constraints.`})]}),(0,b.jsxs)(`button`,{disabled:M,onClick:()=>G({action:`reset`}),className:`btn-toggle`,style:{display:`flex`,alignItems:`center`,gap:`6px`},children:[(0,b.jsx)(_,{size:14}),` RESET DISPATCH`]})]}),(0,b.jsxs)(`div`,{className:`vrp-grid`,children:[(0,b.jsxs)(`div`,{className:`main-viewport`,children:[(0,b.jsxs)(`div`,{className:`map-wrapper`,style:{height:`460px`},children:[(0,b.jsx)(`div`,{ref:R,style:{width:`100%`,height:`100%`,zIndex:1,visibility:P?`visible`:`hidden`}}),!P&&(0,b.jsxs)(`div`,{style:{position:`absolute`,inset:0,display:`flex`,flexDirection:`column`,justifyContent:`center`,alignItems:`center`,background:`#14141e`,gap:`8px`,zIndex:5},children:[(0,b.jsx)(c,{size:24,className:`spin spin-3d`,style:{color:`#38bdf8`}}),(0,b.jsx)(`span`,{style:{fontSize:`0.8rem`,fontWeight:600},children:`Loading map layers...`})]}),M&&(0,b.jsxs)(`div`,{style:{position:`absolute`,top:`16px`,right:`16px`,zIndex:10,background:`rgba(10, 10, 15, 0.85)`,backdropFilter:`blur(4px)`,padding:`6px 12px`,borderRadius:`20px`,fontSize:`0.72rem`,fontWeight:700,border:`1px solid #38bdf8`,color:`#38bdf8`,display:`flex`,alignItems:`center`,gap:`6px`},children:[(0,b.jsx)(m,{size:12,className:`spin`}),` RE-ROUTING LIVE EXECUTION...`]})]}),(0,b.jsxs)(`div`,{className:`panel-card`,style:{marginBottom:`24px`},children:[(0,b.jsxs)(`div`,{className:`panel-title`,style:{display:`flex`,alignItems:`center`,gap:`8px`},children:[(0,b.jsx)(m,{size:16}),` VRPTW Optimization Engine Results`]}),(0,b.jsxs)(`div`,{style:{display:`grid`,gridTemplateColumns:`repeat(auto-fit, minmax(300px, 1fr))`,gap:`24px`},children:[(0,b.jsxs)(`div`,{children:[(0,b.jsx)(`h4`,{style:{margin:`0 0 12px 0`,fontSize:`0.9rem`,color:`#38bdf8`,fontWeight:600},children:`Customer Time Windows`}),o.timeWindows&&(0,b.jsx)(`div`,{style:{display:`flex`,flexDirection:`column`,gap:`12px`},children:Object.entries(o.timeWindows).map(([e,t])=>(0,b.jsxs)(`div`,{style:{background:`rgba(255, 255, 255, 0.02)`,border:`1px solid rgba(255,255,255,0.05)`,borderRadius:`8px`,padding:`12px`},children:[(0,b.jsxs)(`div`,{style:{display:`flex`,justifyContent:`space-between`,alignItems:`center`,marginBottom:`8px`},children:[(0,b.jsxs)(`span`,{style:{fontWeight:700,fontSize:`0.85rem`},children:[e.includes(`A`)?`🏠`:`🏢`,` `,e]}),(0,b.jsx)(`span`,{style:{fontSize:`0.72rem`,fontWeight:700,padding:`3px 8px`,borderRadius:`4px`,textTransform:`uppercase`,background:t.violated?`rgba(239, 68, 68, 0.15)`:`rgba(52, 211, 153, 0.15)`,border:t.violated?`1px solid #ef4444`:`1px solid #34d399`,color:t.violated?`#f87171`:`#34d399`},children:t.violated?`Late Violation`:`On Time`})]}),(0,b.jsxs)(`div`,{style:{display:`grid`,gridTemplateColumns:`1fr 1fr`,gap:`8px`,fontSize:`0.78rem`,color:`#94a3b8`},children:[(0,b.jsxs)(`div`,{children:[`Target Window: `,(0,b.jsxs)(`strong`,{style:{color:`#f1f5f9`},children:[`[`,t.earliest.toFixed(1),`, `,t.latest.toFixed(1),`] min`]})]}),(0,b.jsxs)(`div`,{children:[`Arrival Time: `,(0,b.jsxs)(`strong`,{style:{color:t.violated?`#f87171`:`#34d399`},children:[t.arrival.toFixed(1),` min`]})]})]})]},e))})]}),(0,b.jsxs)(`div`,{children:[(0,b.jsx)(`h4`,{style:{margin:`0 0 12px 0`,fontSize:`0.9rem`,color:`#38bdf8`,fontWeight:600},children:`Precomputed Cost Matrix (km)`}),o.costMatrix&&(0,b.jsxs)(`table`,{style:{width:`100%`,borderCollapse:`collapse`,fontSize:`0.8rem`,color:`#cbd5e1`},children:[(0,b.jsx)(`thead`,{children:(0,b.jsxs)(`tr`,{style:{borderBottom:`1px solid rgba(255,255,255,0.1)`},children:[(0,b.jsx)(`th`,{style:{padding:`6px`,textAlign:`left`,color:`#94a3b8`},children:`From \\ To`}),(0,b.jsx)(`th`,{style:{padding:`6px`,textAlign:`center`},children:`🛵 R`}),(0,b.jsx)(`th`,{style:{padding:`6px`,textAlign:`center`},children:`🍳 K`}),(0,b.jsx)(`th`,{style:{padding:`6px`,textAlign:`center`},children:`🏠 A`}),(0,b.jsx)(`th`,{style:{padding:`6px`,textAlign:`center`},children:`🏢 B`})]})}),(0,b.jsx)(`tbody`,{children:[`🛵 Rider (0)`,`🍳 Kitchen (1)`,`🏠 Cust A (2)`,`🏢 Cust B (3)`].map((e,t)=>(0,b.jsxs)(`tr`,{className:`cost-matrix-row`,style:{borderBottom:`1px solid rgba(255,255,255,0.05)`,background:t%2==0?`rgba(255,255,255,0.01)`:`transparent`},children:[(0,b.jsx)(`td`,{style:{padding:`8px 6px`,fontWeight:600,color:`#94a3b8`},children:e}),o.costMatrix[t]&&o.costMatrix[t].map((e,n)=>(0,b.jsx)(`td`,{style:{padding:`8px 6px`,textAlign:`center`,fontFamily:`monospace`,color:t===n?`#38bdf8`:`#cbd5e1`},children:e.toFixed(2)},n))]},t))})]})]})]})]}),(0,b.jsxs)(`div`,{className:`panel-card`,style:{marginBottom:0},children:[(0,b.jsxs)(`div`,{className:`panel-title`,children:[(0,b.jsx)(m,{size:16}),` VRP Step-by-Step Path Relaxation Console`]}),(0,b.jsx)(`div`,{className:`log-terminal`,children:q.map((e,t)=>(0,b.jsx)(`div`,{className:`log-line`,style:{"--i":t,color:e.startsWith(`===`)?`#38bdf8`:e.startsWith(`  - Skip`)?`#f87171`:`#34d399`},children:e},t))}),J&&(0,b.jsx)(`div`,{className:`load-more-wrap`,style:{margin:`16px auto 0`},children:(0,b.jsxs)(`button`,{type:`button`,className:`load-more-btn`,onClick:()=>L(e=>e+k),children:[`Load more logs (`,K.length-I,` left) `,(0,b.jsx)(e,{className:`load-more-icon`,size:16})]})})]})]}),(0,b.jsxs)(`div`,{className:`sidebar-panels`,children:[(0,b.jsxs)(`div`,{className:`panel-card`,children:[(0,b.jsxs)(`div`,{className:`panel-title`,children:[(0,b.jsx)(v,{size:16}),` Global Simulation Parameters`]}),(0,b.jsxs)(`div`,{style:{marginBottom:`16px`},children:[(0,b.jsx)(`span`,{style:{fontSize:`0.78rem`,color:`#94a3b8`,display:`block`,marginBottom:`6px`,fontWeight:600},children:`Pathfinding Optimizer Engine`}),(0,b.jsxs)(`div`,{style:{display:`flex`,gap:`8px`},children:[(0,b.jsx)(`button`,{onClick:()=>G({action:`toggleAStar`,useAStar:!0}),className:`btn-toggle ${o.useAStar?`active`:``}`,style:{flex:1},children:`A* (Admissible Heuristic)`}),(0,b.jsx)(`button`,{onClick:()=>G({action:`toggleAStar`,useAStar:!1}),className:`btn-toggle ${o.useAStar?``:`active`}`,style:{flex:1},children:`Dijkstra's (Standard)`})]})]}),(0,b.jsxs)(`div`,{style:{marginBottom:`16px`},children:[(0,b.jsx)(`span`,{style:{fontSize:`0.78rem`,color:`#94a3b8`,display:`block`,marginBottom:`6px`,fontWeight:600},children:`Weather Condition Surge triggers`}),(0,b.jsx)(`div`,{style:{display:`flex`,gap:`6px`},children:[`Sunny`,`Rainy`,`Stormy`].map(e=>(0,b.jsxs)(`button`,{onClick:()=>G({action:`updateWeather`,weather:e}),className:`btn-toggle ${o.weather===e?`active`:``}`,style:{flex:1,padding:`6px 8px`,fontSize:`0.8rem`},children:[e===`Sunny`&&(0,b.jsx)(s,{size:12,style:{display:`inline`,marginRight:`4px`}}),e!==`Sunny`&&(0,b.jsx)(g,{size:12,style:{display:`inline`,marginRight:`4px`}}),e]},e))})]}),(0,b.jsxs)(`div`,{style:{marginBottom:`8px`},children:[(0,b.jsxs)(`div`,{style:{display:`flex`,justifyContent:`space-between`,alignItems:`center`},children:[(0,b.jsxs)(`div`,{children:[(0,b.jsx)(`span`,{style:{fontSize:`0.82rem`,fontWeight:700,display:`block`},children:`Perishable Dispatch sequence (LIFO)`}),(0,b.jsx)(`span`,{style:{fontSize:`0.7rem`,color:`#94a3b8`},children:`Deliver hot dishes last-in, first-out to save fresh heat.`})]}),(0,b.jsx)(`input`,{type:`checkbox`,checked:o.perishableLifo,onChange:e=>G({action:`togglePerishable`,perishableLifo:e.target.checked}),style:{scale:`1.2`,cursor:`pointer`,accentColor:`#38bdf8`}})]}),(0,b.jsxs)(`div`,{style:{background:`rgba(255,255,255,0.03)`,border:`1px solid rgba(255,255,255,0.05)`,borderRadius:`6px`,padding:`8px 10px`,marginTop:`12px`,fontSize:`0.76rem`,display:`flex`,alignItems:`center`,gap:`6px`},children:[(0,b.jsx)(`span`,{style:{color:`#94a3b8`},children:`Calculated Batch sequence:`}),(0,b.jsxs)(`strong`,{style:{color:`#34d399`},children:[`ZingBite Kitchen `,(0,b.jsx)(e,{size:10,style:{display:`inline`}}),` `,o.sequence&&o.sequence.join(` -> `)]})]})]})]}),(0,b.jsxs)(`div`,{className:`panel-card`,children:[(0,b.jsxs)(`div`,{className:`panel-title`,children:[(0,b.jsx)(h,{size:16}),` ML-Powered Predictive ETA Breakdowns`]}),o.predictiveETAs&&Object.entries(o.predictiveETAs).map(([e,t])=>{let n=t.total,r=t.baseTravel,i=t.trafficDelay,a=t.weatherDelay,o=t.prepWait,s=t.navOffset,c=r/n*100,l=i/n*100,u=a/n*100,d=o/n*100,f=s/n*100;return(0,b.jsxs)(`div`,{style:{marginBottom:`18px`,borderBottom:`1px solid rgba(255,255,255,0.04)`,paddingBottom:`14px`},children:[(0,b.jsxs)(`div`,{style:{display:`flex`,justifyContent:`space-between`,alignItems:`center`,marginBottom:`4px`},children:[(0,b.jsxs)(`span`,{style:{fontSize:`0.85rem`,fontWeight:700},children:[e,` `,e===`Customer B`?`(High-Rise)`:`(Home)`]}),(0,b.jsxs)(`strong`,{style:{fontSize:`1rem`,color:`#34d399`},children:[n,` Mins`]})]}),(0,b.jsxs)(`div`,{className:`eta-meter`,children:[(0,b.jsx)(`div`,{className:`eta-segment`,style:{width:`${c}%`,background:`#38bdf8`},title:`Base travel time: ${r} mins`}),(0,b.jsx)(`div`,{className:`eta-segment`,style:{width:`${l}%`,background:`#f59e0b`},title:`Traffic delay: ${i} mins`}),(0,b.jsx)(`div`,{className:`eta-segment`,style:{width:`${u}%`,background:`#ef4444`},title:`Weather overhead: ${a} mins`}),(0,b.jsx)(`div`,{className:`eta-segment`,style:{width:`${d}%`,background:`#a855f7`},title:`Kitchen preparation delay: ${o} mins`}),(0,b.jsx)(`div`,{className:`eta-segment`,style:{width:`${f}%`,background:`#ec4899`},title:`Apartment navigation offset: ${s} mins`})]}),(0,b.jsxs)(`div`,{style:{display:`flex`,flexWrap:`wrap`,gap:`8px 12px`,marginTop:`8px`,fontSize:`0.68rem`,color:`#94a3b8`},children:[(0,b.jsxs)(`span`,{children:[(0,b.jsx)(`span`,{className:`legend-indicator`,style:{background:`#38bdf8`}}),` Travel: `,r,`m`]}),(0,b.jsxs)(`span`,{children:[(0,b.jsx)(`span`,{className:`legend-indicator`,style:{background:`#f59e0b`}}),` Traffic: +`,i,`m`]}),a>0&&(0,b.jsxs)(`span`,{children:[(0,b.jsx)(`span`,{className:`legend-indicator`,style:{background:`#ef4444`}}),` Weather: +`,a,`m`]}),o>0&&(0,b.jsxs)(`span`,{children:[(0,b.jsx)(`span`,{className:`legend-indicator`,style:{background:`#a855f7`}}),` Prep Wait: +`,o,`m`]}),(0,b.jsxs)(`span`,{children:[(0,b.jsx)(`span`,{className:`legend-indicator`,style:{background:`#ec4899`}}),` Nav Offset: +`,s,`m`]})]})]},e)})]}),(0,b.jsxs)(`div`,{className:`panel-card`,style:{marginBottom:0},children:[(0,b.jsxs)(`div`,{className:`panel-title`,style:{display:`flex`,justifyContent:`space-between`,alignItems:`center`},children:[(0,b.jsxs)(`span`,{style:{display:`flex`,alignItems:`center`,gap:`8px`},children:[(0,b.jsx)(f,{size:16}),` Live Road Network Controller`]}),o.weather!==`Sunny`&&(0,b.jsx)(`span`,{className:`badge-surge`,children:`Surge Active`})]}),(0,b.jsx)(`p`,{style:{fontSize:`0.72rem`,color:`#94a3b8`,marginTop:`-10px`,marginBottom:`14px`},children:`Simulate traffic bottlenecks or construction blockages. The VRP engine dynamically re-routes paths around closures.`}),(0,b.jsx)(`div`,{style:{maxHeight:`200px`,overflowY:`auto`,paddingRight:`4px`},children:[`Rider Pathway`,`High Street`,`Commercial Lane`,`Avenue Row`,`Kitchen Alley`,`Kitchen Exit Road`,`Market Blvd`,`Suburban Cross`,`Apartment Blvd`,`Customer A Lane`,`Customer A Way`,`Link Highway`,`Residential Crescent`,`Customer B Lane`,`Expressway Bypass`,`Sector Link`,`Transit Flyover`,`Metro Avenue`,`Crossroad Street`,`Direct Delivery Bypass`].map((e,t)=>{let n=o.edges&&o.edges.find(t=>t.roadName===e),r=n?n.trafficLevel:`Light`,i=n?n.isBlocked:!1;return(0,b.jsxs)(`div`,{className:`road-row`,style:{"--i":t},children:[(0,b.jsx)(`span`,{style:{fontWeight:500,fontSize:`0.78rem`},children:e}),(0,b.jsxs)(`div`,{style:{display:`flex`,alignItems:`center`,gap:`8px`},children:[(0,b.jsxs)(`select`,{value:r,onChange:t=>G({action:`updateTraffic`,roadName:e,trafficLevel:t.target.value,isBlocked:i}),className:`select-traffic`,style:{color:r===`Heavy`?`#ef4444`:r===`Moderate`?`#f59e0b`:`#34d399`},children:[(0,b.jsx)(`option`,{value:`Light`,children:`Light`}),(0,b.jsx)(`option`,{value:`Moderate`,children:`Mod`}),(0,b.jsx)(`option`,{value:`Heavy`,children:`Heavy`})]}),(0,b.jsx)(`button`,{onClick:()=>G({action:`updateTraffic`,roadName:e,trafficLevel:r,isBlocked:!i}),className:`btn-toggle`,style:{padding:`3px 8px`,fontSize:`0.7rem`,borderRadius:`4px`,background:i?`rgba(239,68,68,0.2)`:`rgba(255,255,255,0.03)`,borderColor:i?`#ef4444`:`rgba(255,255,255,0.1)`,color:i?`#ef4444`:`#94a3b8`},children:i?`BLOCKED`:`BLOCK`})]})]},e)})})]})]})]})]})]})};export{A as default};