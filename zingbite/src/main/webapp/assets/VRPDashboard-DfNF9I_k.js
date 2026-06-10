import{t as e}from"./chevron-right-Cym7iAIW.js";import{A as t,D as n,E as r,O as i,T as a,b as o,f as s,g as c,i as l,j as u,m as d,w as f}from"./index-CiwLLuYO.js";var p=f(`activity`,[[`path`,{d:`M22 12h-2.48a2 2 0 0 0-1.93 1.46l-2.35 8.36a.25.25 0 0 1-.48 0L9.24 2.18a.25.25 0 0 0-.48 0l-2.35 8.36A2 2 0 0 1 4.49 12H2`,key:`169zse`}]]),m=f(`chart-column`,[[`path`,{d:`M3 3v16a2 2 0 0 0 2 2h16`,key:`c24i48`}],[`path`,{d:`M18 17V9`,key:`2bz60n`}],[`path`,{d:`M13 17V5`,key:`1frdt8`}],[`path`,{d:`M8 17v-3`,key:`17ska0`}]]),h=f(`cloud-rain`,[[`path`,{d:`M4 14.899A7 7 0 1 1 15.71 8h1.79a4.5 4.5 0 0 1 2.5 8.242`,key:`1pljnt`}],[`path`,{d:`M16 14v6`,key:`1j4efv`}],[`path`,{d:`M8 14v6`,key:`17c4r9`}],[`path`,{d:`M12 16v6`,key:`c8a4gj`}]]),g=f(`rotate-ccw`,[[`path`,{d:`M3 12a9 9 0 1 0 9-9 9.75 9.75 0 0 0-6.74 2.74L3 8`,key:`1357e3`}],[`path`,{d:`M3 3v5h5`,key:`1xhq8a`}]]),_=f(`sliders-vertical`,[[`path`,{d:`M10 8h4`,key:`1sr2af`}],[`path`,{d:`M12 21v-9`,key:`17s77i`}],[`path`,{d:`M12 8V3`,key:`13r4qs`}],[`path`,{d:`M17 16h4`,key:`h1uq16`}],[`path`,{d:`M19 12V3`,key:`o1uvq1`}],[`path`,{d:`M19 21v-5`,key:`qua636`}],[`path`,{d:`M3 14h4`,key:`bcjad9`}],[`path`,{d:`M5 10V3`,key:`cb8scm`}],[`path`,{d:`M5 21v-7`,key:`1w1uti`}]]),v=f(`sun`,[[`circle`,{cx:`12`,cy:`12`,r:`4`,key:`4exip2`}],[`path`,{d:`M12 2v2`,key:`tus03m`}],[`path`,{d:`M12 20v2`,key:`1lh1kg`}],[`path`,{d:`m4.93 4.93 1.41 1.41`,key:`149t6j`}],[`path`,{d:`m17.66 17.66 1.41 1.41`,key:`ptbguv`}],[`path`,{d:`M2 12h2`,key:`1t8f8n`}],[`path`,{d:`M20 12h2`,key:`1q8mjw`}],[`path`,{d:`m6.34 17.66-1.41 1.41`,key:`1m8zz5`}],[`path`,{d:`m19.07 4.93-1.41 1.41`,key:`1shlcs`}]]),y=u(t(),1),b=r(),x=12.958,S=77.589,C=12.9716,w=77.5946,T=12.9821,E=77.6085,D=12.9645,O=77.6142,k=12,A=()=>{let{user:t}=(0,y.useContext)(a),r=i(),[u,f]=(0,y.useState)(null),[A,j]=(0,y.useState)(!0),[M,N]=(0,y.useState)(!1),[P,F]=(0,y.useState)(typeof window<`u`&&!!window.L),[I,L]=(0,y.useState)(k),R=(0,y.useRef)(null),z=(0,y.useRef)(null),B=(0,y.useRef)([]),V=(0,y.useRef)([]),H=(0,y.useRef)([]),U=async()=>{if(!t||t.role!==`super_admin`){j(!1);return}try{f((await n.get(`/api/delivery/vrp`)).data)}catch(e){console.error(`Failed to fetch VRP state:`,e)}finally{j(!1)}};(0,y.useEffect)(()=>{U()},[t]),(0,y.useEffect)(()=>{if(window.L){F(!0);return}let e=document.querySelector(`link[href*="leaflet.css"]`);e||(e=document.createElement(`link`),e.rel=`stylesheet`,e.href=`https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.9.4/leaflet.css`,document.head.appendChild(e));let t=document.querySelector(`script[src*="leaflet.js"]`);if(!t)t=document.createElement(`script`),t.src=`https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.9.4/leaflet.js`,t.async=!0,t.onload=()=>{let e=setInterval(()=>{window.L&&(F(!0),clearInterval(e))},50)},document.body.appendChild(t);else{let e=setInterval(()=>{window.L&&(F(!0),clearInterval(e))},50);return()=>clearInterval(e)}},[]),(0,y.useEffect)(()=>{if(!P||!R.current||!u)return;let e=window.L;if(!e)return;if(!z.current){let t=e.map(R.current,{zoomControl:!0,scrollWheelZoom:!0}).setView([12.97,77.6],13);e.tileLayer(`https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png`,{maxZoom:19,attribution:`&copy; OpenStreetMap contributors`}).addTo(t),z.current=t}let t=z.current;if(B.current.forEach(e=>e.remove()),V.current.forEach(e=>e.remove()),H.current.forEach(e=>e.remove()),B.current=[],V.current=[],H.current=[],u.surgeZones&&u.surgeZones.forEach(n=>{let r=n.incentive>25?`#ef4444`:n.incentive>0?`#ff9f40`:`#4bc0c0`,i=e.circle([n.lat,n.lon],{radius:n.radius*1e5,color:r,fillColor:r,fillOpacity:.15,weight:1.5,dashArray:`4, 4`}).addTo(t).bindPopup(`<b>${n.name}</b><br/>Surge Premium: +&#8377;${n.incentive}`);H.current.push(i)}),u.nodes&&u.nodes.forEach(n=>{let r=`📍`;n.id===0?r=`🛵`:n.id===1?r=`🍳`:n.id===2?r=`🏠`:n.id===3&&(r=`🏢`);let i=e.divIcon({html:`<div style="font-size: 20px; line-height: 20px; text-align: center;">${r}</div>`,className:`custom-vrp-marker`,iconSize:[24,24],iconAnchor:[12,12]}),a=e.marker([n.latitude,n.longitude],{icon:i}).addTo(t).bindPopup(`<b>Node ${n.id}: ${n.label}</b><br/>Coords: ${n.latitude.toFixed(5)}, ${n.longitude.toFixed(5)}`);B.current.push(a)}),u.pathFM&&u.pathFM.length>0){let n=u.pathFM.map(e=>[e.latitude,e.longitude]),r=e.polyline(n,{color:`#06b6d4`,weight:4,opacity:.8}).addTo(t);V.current.push(r)}if(u.pathLM1&&u.pathLM1.length>0){let n=u.pathLM1.map(e=>[e.latitude,e.longitude]),r=e.polyline(n,{color:`#a855f7`,weight:4,opacity:.8,dashArray:`6, 6`}).addTo(t);V.current.push(r)}if(u.pathLM2&&u.pathLM2.length>0){let n=u.pathLM2.map(e=>[e.latitude,e.longitude]),r=e.polyline(n,{color:`#ec4899`,weight:4,opacity:.8,dashArray:`3, 6`}).addTo(t);V.current.push(r)}let n=e.latLngBounds([[x,S],[C,w],[T,E],[D,O]]);t.fitBounds(n,{padding:[40,40]}),setTimeout(()=>{z.current&&z.current.invalidateSize()},200)},[P,u]);let W=async e=>{N(!0);try{await n.post(`/api/delivery/vrp`,e),await U()}catch(e){console.error(`Action failed:`,e)}finally{N(!1)}};if(!t||t.role!==`super_admin`)return(0,b.jsx)(`div`,{style:{display:`flex`,flexDirection:`column`,justifyContent:`center`,alignItems:`center`,flex:1,minHeight:`calc(100vh - 72px)`,background:`#0d0d15`,color:`#fff`,padding:`20px`,textAlign:`center`},children:(0,b.jsxs)(`div`,{style:{background:`rgba(255, 255, 255, 0.03)`,border:`1px solid rgba(255, 255, 255, 0.08)`,padding:`40px`,borderRadius:`16px`,backdropFilter:`blur(16px)`,maxWidth:`480px`,width:`100%`,boxShadow:`0 8px 32px rgba(0, 0, 0, 0.24)`},children:[(0,b.jsx)(l,{size:64,style:{color:`#ef4444`,marginBottom:`20px`,marginLeft:`auto`,marginRight:`auto`}}),(0,b.jsx)(`h2`,{style:{fontSize:`1.5rem`,fontWeight:800,marginBottom:`12px`},children:`Access Restricted`}),(0,b.jsx)(`p`,{style:{color:`#94a3b8`,fontSize:`0.9rem`,marginBottom:`24px`,lineHeight:`1.5`},children:`The Vehicle Routing Problem (VRP) Control Room is strictly reserved for system engineers and administrators.`}),(0,b.jsx)(`button`,{onClick:()=>r(`/`),className:`btn-toggle active`,style:{padding:`10px 24px`,fontSize:`0.9rem`,width:`100%`,cursor:`pointer`},children:`Return to Dashboard`})]})});if(A)return(0,b.jsxs)(`div`,{style:{display:`flex`,flexDirection:`column`,justifyContent:`center`,alignItems:`center`,flex:1,minHeight:`500px`,background:`#0a0a0f`,color:`#fff`},children:[(0,b.jsx)(d,{size:48,className:`spin`,style:{color:`#06b6d4`,marginBottom:`16px`}}),(0,b.jsx)(`span`,{style:{fontSize:`1rem`,fontWeight:600,letterSpacing:`1px`},children:`INITIALIZING DYNAMIC VRP SYSTEM...`})]});if(!u)return(0,b.jsxs)(`div`,{style:{display:`flex`,flexDirection:`column`,justifyContent:`center`,alignItems:`center`,flex:1,minHeight:`500px`,background:`#0a0a0f`,color:`#fff`,padding:`20px`,textAlign:`center`},children:[(0,b.jsx)(o,{size:48,style:{color:`#ef4444`,marginBottom:`16px`}}),(0,b.jsx)(`h2`,{style:{fontSize:`1.4rem`,fontWeight:800,marginBottom:`8px`},children:`VRP data unavailable`}),(0,b.jsx)(`p`,{style:{color:`#94a3b8`,maxWidth:`480px`,marginBottom:`20px`},children:`The optimization engine did not return a valid state. Try refreshing the dispatch model.`}),(0,b.jsx)(`button`,{type:`button`,onClick:U,className:`btn-toggle active`,style:{padding:`10px 24px`,cursor:`pointer`},children:`Retry VRP Load`})]});let G=u.logs||[],K=G.slice(0,I),q=I<G.length;return(0,b.jsxs)(b.Fragment,{children:[(0,b.jsx)(`style`,{children:`
        .vrp-container {
          background: #0d0d15;
          min-height: calc(100vh - 72px);
          color: #f1f5f9;
          font-family: 'Inter', sans-serif;
          padding: 24px;
        }
        .vrp-header {
          display: flex;
          justify-content: space-between;
          align-items: center;
          margin-bottom: 20px;
          border-bottom: 1px solid rgba(255,255,255,0.06);
          padding-bottom: 16px;
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
          background: rgba(20, 20, 30, 0.6);
          backdrop-filter: blur(12px);
          border: 1px solid rgba(255,255,255,0.06);
          border-radius: 12px;
          padding: 20px;
          margin-bottom: 20px;
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
        }
        .log-terminal {
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
        }
        .btn-toggle {
          background: rgba(255,255,255,0.04);
          border: 1px solid rgba(255,255,255,0.08);
          color: #94a3b8;
          padding: 8px 16px;
          border-radius: 20px;
          cursor: pointer;
          font-weight: 600;
          font-size: 0.85rem;
          transition: all 0.25s ease;
        }
        .btn-toggle.active {
          background: rgba(56, 189, 248, 0.15);
          border-color: #38bdf8;
          color: #38bdf8;
          box-shadow: 0 0 10px rgba(56, 189, 248, 0.2);
        }
        .btn-toggle:hover:not(.active) {
          background: rgba(255,255,255,0.08);
          color: #f1f5f9;
        }
        .eta-meter {
          height: 8px;
          background: rgba(255,255,255,0.06);
          border-radius: 4px;
          overflow: hidden;
          margin-top: 6px;
        }
        .eta-segment {
          height: 100%;
          float: left;
          transition: width 0.3s ease;
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
        }
        .select-traffic {
          background: #14141e;
          border: 1px solid rgba(255,255,255,0.1);
          color: #f1f5f9;
          font-size: 0.78rem;
          padding: 4px 8px;
          border-radius: 4px;
          outline: none;
          cursor: pointer;
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
        .legend-indicator {
          width: 10px;
          height: 10px;
          border-radius: 50%;
          display: inline-block;
        }
      `}),(0,b.jsxs)(`div`,{className:`vrp-container`,children:[(0,b.jsxs)(`div`,{className:`vrp-header`,children:[(0,b.jsxs)(`div`,{children:[(0,b.jsxs)(`h1`,{style:{fontSize:`1.6rem`,fontWeight:800,margin:0,display:`flex`,alignItems:`center`,gap:`8px`},children:[(0,b.jsx)(c,{className:`spin`,style:{color:`#38bdf8`},size:28}),` VRP Dispatch Control Room`]}),(0,b.jsx)(`p`,{style:{color:`#94a3b8`,fontSize:`0.85rem`,margin:`4px 0 0 0`},children:`Dynamic Vehicle Routing Problem (VRP) optimization engine simulation under live constraints.`})]}),(0,b.jsxs)(`button`,{disabled:M,onClick:()=>W({action:`reset`}),className:`btn-toggle`,style:{display:`flex`,alignItems:`center`,gap:`6px`},children:[(0,b.jsx)(g,{size:14}),` RESET DISPATCH`]})]}),(0,b.jsxs)(`div`,{className:`vrp-grid`,children:[(0,b.jsxs)(`div`,{className:`main-viewport`,children:[(0,b.jsxs)(`div`,{style:{height:`460px`,border:`1px solid rgba(255,255,255,0.08)`,borderRadius:`12px`,overflow:`hidden`,position:`relative`,marginBottom:`24px`},children:[(0,b.jsx)(`div`,{ref:R,style:{width:`100%`,height:`100%`,zIndex:1,visibility:P?`visible`:`hidden`}}),!P&&(0,b.jsxs)(`div`,{style:{position:`absolute`,inset:0,display:`flex`,flexDirection:`column`,justifyContent:`center`,alignItems:`center`,background:`#14141e`,gap:`8px`,zIndex:5},children:[(0,b.jsx)(d,{size:24,className:`spin`,style:{color:`#38bdf8`}}),(0,b.jsx)(`span`,{style:{fontSize:`0.8rem`,fontWeight:600},children:`Loading map layers...`})]}),M&&(0,b.jsxs)(`div`,{style:{position:`absolute`,top:`16px`,right:`16px`,zIndex:10,background:`rgba(10, 10, 15, 0.85)`,backdropFilter:`blur(4px)`,padding:`6px 12px`,borderRadius:`20px`,fontSize:`0.72rem`,fontWeight:700,border:`1px solid #38bdf8`,color:`#38bdf8`,display:`flex`,alignItems:`center`,gap:`6px`},children:[(0,b.jsx)(p,{size:12,className:`spin`}),` RE-ROUTING LIVE EXECUTION...`]})]}),(0,b.jsxs)(`div`,{className:`panel-card`,style:{marginBottom:`24px`},children:[(0,b.jsxs)(`div`,{className:`panel-title`,style:{display:`flex`,alignItems:`center`,gap:`8px`},children:[(0,b.jsx)(p,{size:16}),` VRPTW Optimization Engine Results`]}),(0,b.jsxs)(`div`,{style:{display:`grid`,gridTemplateColumns:`repeat(auto-fit, minmax(300px, 1fr))`,gap:`24px`},children:[(0,b.jsxs)(`div`,{children:[(0,b.jsx)(`h4`,{style:{margin:`0 0 12px 0`,fontSize:`0.9rem`,color:`#38bdf8`,fontWeight:600},children:`Customer Time Windows`}),u.timeWindows&&(0,b.jsx)(`div`,{style:{display:`flex`,flexDirection:`column`,gap:`12px`},children:Object.entries(u.timeWindows).map(([e,t])=>(0,b.jsxs)(`div`,{style:{background:`rgba(255, 255, 255, 0.02)`,border:`1px solid rgba(255,255,255,0.05)`,borderRadius:`8px`,padding:`12px`},children:[(0,b.jsxs)(`div`,{style:{display:`flex`,justifyContent:`space-between`,alignItems:`center`,marginBottom:`8px`},children:[(0,b.jsxs)(`span`,{style:{fontWeight:700,fontSize:`0.85rem`},children:[e.includes(`A`)?`🏠`:`🏢`,` `,e]}),(0,b.jsx)(`span`,{style:{fontSize:`0.72rem`,fontWeight:700,padding:`3px 8px`,borderRadius:`4px`,textTransform:`uppercase`,background:t.violated?`rgba(239, 68, 68, 0.15)`:`rgba(52, 211, 153, 0.15)`,border:t.violated?`1px solid #ef4444`:`1px solid #34d399`,color:t.violated?`#f87171`:`#34d399`},children:t.violated?`Late Violation`:`On Time`})]}),(0,b.jsxs)(`div`,{style:{display:`grid`,gridTemplateColumns:`1fr 1fr`,gap:`8px`,fontSize:`0.78rem`,color:`#94a3b8`},children:[(0,b.jsxs)(`div`,{children:[`Target Window: `,(0,b.jsxs)(`strong`,{style:{color:`#f1f5f9`},children:[`[`,t.earliest.toFixed(1),`, `,t.latest.toFixed(1),`] min`]})]}),(0,b.jsxs)(`div`,{children:[`Arrival Time: `,(0,b.jsxs)(`strong`,{style:{color:t.violated?`#f87171`:`#34d399`},children:[t.arrival.toFixed(1),` min`]})]})]})]},e))})]}),(0,b.jsxs)(`div`,{children:[(0,b.jsx)(`h4`,{style:{margin:`0 0 12px 0`,fontSize:`0.9rem`,color:`#38bdf8`,fontWeight:600},children:`Precomputed Cost Matrix (km)`}),u.costMatrix&&(0,b.jsxs)(`table`,{style:{width:`100%`,borderCollapse:`collapse`,fontSize:`0.8rem`,color:`#cbd5e1`},children:[(0,b.jsx)(`thead`,{children:(0,b.jsxs)(`tr`,{style:{borderBottom:`1px solid rgba(255,255,255,0.1)`},children:[(0,b.jsx)(`th`,{style:{padding:`6px`,textAlign:`left`,color:`#94a3b8`},children:`From \\ To`}),(0,b.jsx)(`th`,{style:{padding:`6px`,textAlign:`center`},children:`🛵 R`}),(0,b.jsx)(`th`,{style:{padding:`6px`,textAlign:`center`},children:`🍳 K`}),(0,b.jsx)(`th`,{style:{padding:`6px`,textAlign:`center`},children:`🏠 A`}),(0,b.jsx)(`th`,{style:{padding:`6px`,textAlign:`center`},children:`🏢 B`})]})}),(0,b.jsx)(`tbody`,{children:[`🛵 Rider (0)`,`🍳 Kitchen (1)`,`🏠 Cust A (2)`,`🏢 Cust B (3)`].map((e,t)=>(0,b.jsxs)(`tr`,{style:{borderBottom:`1px solid rgba(255,255,255,0.05)`,background:t%2==0?`rgba(255,255,255,0.01)`:`transparent`},children:[(0,b.jsx)(`td`,{style:{padding:`8px 6px`,fontWeight:600,color:`#94a3b8`},children:e}),u.costMatrix[t]&&u.costMatrix[t].map((e,n)=>(0,b.jsx)(`td`,{style:{padding:`8px 6px`,textAlign:`center`,fontFamily:`monospace`,color:t===n?`#38bdf8`:`#cbd5e1`},children:e.toFixed(2)},n))]},t))})]})]})]})]}),(0,b.jsxs)(`div`,{className:`panel-card`,style:{marginBottom:0},children:[(0,b.jsxs)(`div`,{className:`panel-title`,children:[(0,b.jsx)(p,{size:16}),` VRP Step-by-Step Path Relaxation Console`]}),(0,b.jsx)(`div`,{className:`log-terminal`,children:K.map((e,t)=>(0,b.jsx)(`div`,{style:{color:e.startsWith(`===`)?`#38bdf8`:e.startsWith(`  - Skip`)?`#f87171`:`#34d399`},children:e},t))}),q&&(0,b.jsx)(`div`,{className:`load-more-wrap`,style:{margin:`16px auto 0`},children:(0,b.jsxs)(`button`,{type:`button`,className:`load-more-btn`,onClick:()=>L(e=>e+k),style:{background:`rgba(15, 23, 42, 0.92)`,color:`#38bdf8`,borderColor:`rgba(56, 189, 248, 0.3)`},children:[`Load more logs (`,G.length-I,` left) `,(0,b.jsx)(e,{className:`load-more-icon`,size:16})]})})]})]}),(0,b.jsxs)(`div`,{className:`sidebar-panels`,children:[(0,b.jsxs)(`div`,{className:`panel-card`,children:[(0,b.jsxs)(`div`,{className:`panel-title`,children:[(0,b.jsx)(_,{size:16}),` Global Simulation Parameters`]}),(0,b.jsxs)(`div`,{style:{marginBottom:`16px`},children:[(0,b.jsx)(`span`,{style:{fontSize:`0.78rem`,color:`#94a3b8`,display:`block`,marginBottom:`6px`,fontWeight:600},children:`Pathfinding Optimizer Engine`}),(0,b.jsxs)(`div`,{style:{display:`flex`,gap:`8px`},children:[(0,b.jsx)(`button`,{onClick:()=>W({action:`toggleAStar`,useAStar:!0}),className:`btn-toggle ${u.useAStar?`active`:``}`,style:{flex:1},children:`A* (Admissible Heuristic)`}),(0,b.jsx)(`button`,{onClick:()=>W({action:`toggleAStar`,useAStar:!1}),className:`btn-toggle ${u.useAStar?``:`active`}`,style:{flex:1},children:`Dijkstra's (Standard)`})]})]}),(0,b.jsxs)(`div`,{style:{marginBottom:`16px`},children:[(0,b.jsx)(`span`,{style:{fontSize:`0.78rem`,color:`#94a3b8`,display:`block`,marginBottom:`6px`,fontWeight:600},children:`Weather Condition Surge triggers`}),(0,b.jsx)(`div`,{style:{display:`flex`,gap:`6px`},children:[`Sunny`,`Rainy`,`Stormy`].map(e=>(0,b.jsxs)(`button`,{onClick:()=>W({action:`updateWeather`,weather:e}),className:`btn-toggle ${u.weather===e?`active`:``}`,style:{flex:1,padding:`6px 8px`,fontSize:`0.8rem`},children:[e===`Sunny`&&(0,b.jsx)(v,{size:12,style:{display:`inline`,marginRight:`4px`}}),e!==`Sunny`&&(0,b.jsx)(h,{size:12,style:{display:`inline`,marginRight:`4px`}}),e]},e))})]}),(0,b.jsxs)(`div`,{style:{marginBottom:`8px`},children:[(0,b.jsxs)(`div`,{style:{display:`flex`,justifyContent:`space-between`,alignItems:`center`},children:[(0,b.jsxs)(`div`,{children:[(0,b.jsx)(`span`,{style:{fontSize:`0.82rem`,fontWeight:700,display:`block`},children:`Perishable Dispatch sequence (LIFO)`}),(0,b.jsx)(`span`,{style:{fontSize:`0.7rem`,color:`#94a3b8`},children:`Deliver hot dishes last-in, first-out to save fresh heat.`})]}),(0,b.jsx)(`input`,{type:`checkbox`,checked:u.perishableLifo,onChange:e=>W({action:`togglePerishable`,perishableLifo:e.target.checked}),style:{scale:`1.2`,cursor:`pointer`,accentColor:`#38bdf8`}})]}),(0,b.jsxs)(`div`,{style:{background:`rgba(255,255,255,0.03)`,border:`1px solid rgba(255,255,255,0.05)`,borderRadius:`6px`,padding:`8px 10px`,marginTop:`12px`,fontSize:`0.76rem`,display:`flex`,alignItems:`center`,gap:`6px`},children:[(0,b.jsx)(`span`,{style:{color:`#94a3b8`},children:`Calculated Batch sequence:`}),(0,b.jsxs)(`strong`,{style:{color:`#34d399`},children:[`ZingBite Kitchen `,(0,b.jsx)(e,{size:10,style:{display:`inline`}}),` `,u.sequence&&u.sequence.join(` -> `)]})]})]})]}),(0,b.jsxs)(`div`,{className:`panel-card`,children:[(0,b.jsxs)(`div`,{className:`panel-title`,children:[(0,b.jsx)(m,{size:16}),` ML-Powered Predictive ETA Breakdowns`]}),u.predictiveETAs&&Object.entries(u.predictiveETAs).map(([e,t])=>{let n=t.total,r=t.baseTravel,i=t.trafficDelay,a=t.weatherDelay,o=t.prepWait,s=t.navOffset,c=r/n*100,l=i/n*100,u=a/n*100,d=o/n*100,f=s/n*100;return(0,b.jsxs)(`div`,{style:{marginBottom:`18px`,borderBottom:`1px solid rgba(255,255,255,0.04)`,paddingBottom:`14px`},children:[(0,b.jsxs)(`div`,{style:{display:`flex`,justifyContent:`space-between`,alignItems:`center`,marginBottom:`4px`},children:[(0,b.jsxs)(`span`,{style:{fontSize:`0.85rem`,fontWeight:700},children:[e,` `,e===`Customer B`?`(High-Rise)`:`(Home)`]}),(0,b.jsxs)(`strong`,{style:{fontSize:`1rem`,color:`#34d399`},children:[n,` Mins`]})]}),(0,b.jsxs)(`div`,{className:`eta-meter`,children:[(0,b.jsx)(`div`,{className:`eta-segment`,style:{width:`${c}%`,background:`#38bdf8`},title:`Base travel time: ${r} mins`}),(0,b.jsx)(`div`,{className:`eta-segment`,style:{width:`${l}%`,background:`#f59e0b`},title:`Traffic delay: ${i} mins`}),(0,b.jsx)(`div`,{className:`eta-segment`,style:{width:`${u}%`,background:`#ef4444`},title:`Weather overhead: ${a} mins`}),(0,b.jsx)(`div`,{className:`eta-segment`,style:{width:`${d}%`,background:`#a855f7`},title:`Kitchen preparation delay: ${o} mins`}),(0,b.jsx)(`div`,{className:`eta-segment`,style:{width:`${f}%`,background:`#ec4899`},title:`Apartment navigation offset: ${s} mins`})]}),(0,b.jsxs)(`div`,{style:{display:`flex`,flexWrap:`wrap`,gap:`8px 12px`,marginTop:`8px`,fontSize:`0.68rem`,color:`#94a3b8`},children:[(0,b.jsxs)(`span`,{children:[(0,b.jsx)(`span`,{className:`legend-indicator`,style:{background:`#38bdf8`}}),` Travel: `,r,`m`]}),(0,b.jsxs)(`span`,{children:[(0,b.jsx)(`span`,{className:`legend-indicator`,style:{background:`#f59e0b`}}),` Traffic: +`,i,`m`]}),a>0&&(0,b.jsxs)(`span`,{children:[(0,b.jsx)(`span`,{className:`legend-indicator`,style:{background:`#ef4444`}}),` Weather: +`,a,`m`]}),o>0&&(0,b.jsxs)(`span`,{children:[(0,b.jsx)(`span`,{className:`legend-indicator`,style:{background:`#a855f7`}}),` Prep Wait: +`,o,`m`]}),(0,b.jsxs)(`span`,{children:[(0,b.jsx)(`span`,{className:`legend-indicator`,style:{background:`#ec4899`}}),` Nav Offset: +`,s,`m`]})]})]},e)})]}),(0,b.jsxs)(`div`,{className:`panel-card`,style:{marginBottom:0},children:[(0,b.jsxs)(`div`,{className:`panel-title`,style:{display:`flex`,justifyContent:`space-between`,alignItems:`center`},children:[(0,b.jsxs)(`span`,{style:{display:`flex`,alignItems:`center`,gap:`8px`},children:[(0,b.jsx)(s,{size:16}),` Live Road Network Controller`]}),u.weather!==`Sunny`&&(0,b.jsx)(`span`,{className:`badge-surge`,children:`Surge Active`})]}),(0,b.jsx)(`p`,{style:{fontSize:`0.72rem`,color:`#94a3b8`,marginTop:`-10px`,marginBottom:`14px`},children:`Simulate traffic bottlenecks or construction blockages. The VRP engine dynamically re-routes paths around closures.`}),(0,b.jsx)(`div`,{style:{maxHeight:`200px`,overflowY:`auto`,paddingRight:`4px`},children:[`Rider Pathway`,`High Street`,`Commercial Lane`,`Avenue Row`,`Kitchen Alley`,`Kitchen Exit Road`,`Market Blvd`,`Suburban Cross`,`Apartment Blvd`,`Customer A Lane`,`Customer A Way`,`Link Highway`,`Residential Crescent`,`Customer B Lane`,`Expressway Bypass`,`Sector Link`,`Transit Flyover`,`Metro Avenue`,`Crossroad Street`,`Direct Delivery Bypass`].map(e=>{let t=u.edges&&u.edges.find(t=>t.roadName===e),n=t?t.trafficLevel:`Light`,r=t?t.isBlocked:!1;return(0,b.jsxs)(`div`,{className:`road-row`,children:[(0,b.jsx)(`span`,{style:{fontWeight:500,fontSize:`0.78rem`},children:e}),(0,b.jsxs)(`div`,{style:{display:`flex`,alignItems:`center`,gap:`8px`},children:[(0,b.jsxs)(`select`,{value:n,onChange:t=>W({action:`updateTraffic`,roadName:e,trafficLevel:t.target.value,isBlocked:r}),className:`select-traffic`,style:{color:n===`Heavy`?`#ef4444`:n===`Moderate`?`#f59e0b`:`#34d399`},children:[(0,b.jsx)(`option`,{value:`Light`,children:`Light`}),(0,b.jsx)(`option`,{value:`Moderate`,children:`Mod`}),(0,b.jsx)(`option`,{value:`Heavy`,children:`Heavy`})]}),(0,b.jsx)(`button`,{onClick:()=>W({action:`updateTraffic`,roadName:e,trafficLevel:n,isBlocked:!r}),className:`btn-toggle`,style:{padding:`3px 8px`,fontSize:`0.7rem`,borderRadius:`4px`,background:r?`rgba(239,68,68,0.2)`:`rgba(255,255,255,0.03)`,borderColor:r?`#ef4444`:`rgba(255,255,255,0.1)`,color:r?`#ef4444`:`#94a3b8`},children:r?`BLOCKED`:`BLOCK`})]})]},e)})})]})]})]})]})]})};export{A as default};