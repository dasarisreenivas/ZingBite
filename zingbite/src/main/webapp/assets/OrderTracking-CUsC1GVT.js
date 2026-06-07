import{n as e,t}from"./ChatWidget-D40BqyOP.js";import{A as n,C as r,D as i,E as a,O as o,S as s,T as c,d as l,f as u,g as d,k as f,l as p,m,t as ee,v as h,w as te,y as g}from"./index-BxGC8YKb.js";var _=r(`arrow-left`,[[`path`,{d:`m12 19-7-7 7-7`,key:`1l729n`}],[`path`,{d:`M19 12H5`,key:`x3x0zl`}]]),v=r(`settings`,[[`path`,{d:`M9.671 4.136a2.34 2.34 0 0 1 4.659 0 2.34 2.34 0 0 0 3.319 1.915 2.34 2.34 0 0 1 2.33 4.033 2.34 2.34 0 0 0 0 3.831 2.34 2.34 0 0 1-2.33 4.033 2.34 2.34 0 0 0-3.319 1.915 2.34 2.34 0 0 1-4.659 0 2.34 2.34 0 0 0-3.32-1.915 2.34 2.34 0 0 1-2.33-4.033 2.34 2.34 0 0 0 0-3.831A2.34 2.34 0 0 1 6.35 6.051a2.34 2.34 0 0 0 3.319-1.915`,key:`1i5ecw`}],[`circle`,{cx:`12`,cy:`12`,r:`3`,key:`1v7zrd`}]]),y=n(f(),1),b=c(),ne=({orderDetail:e,leafletLoaded:t,currentLat:n,currentLng:r,isRealGPS:i})=>{let a=y.useRef(null),o=y.useRef(null),s=y.useRef(null),c=y.useRef(null),l=y.useRef(null),u=y.useRef(null);return(0,y.useEffect)(()=>{if(!t||!a.current||o.current)return;let e=window.L;if(!e)return;let i=e.map(a.current,{zoomControl:!0,scrollWheelZoom:!0}).setView([12.977,77.601],14);o.current=i,e.tileLayer(`https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png`,{maxZoom:19,attribution:`&copy; OpenStreetMap contributors`}).addTo(i);let d=e.divIcon({html:`<div style="font-size: 24px; text-align: center; line-height: 24px;">🍳</div>`,className:`custom-map-marker-restaurant`,iconSize:[24,24],iconAnchor:[12,12]}),f=e.divIcon({html:`<div style="font-size: 24px; text-align: center; line-height: 24px;">🏠</div>`,className:`custom-map-marker-customer`,iconSize:[24,24],iconAnchor:[12,12]}),p=e.divIcon({html:`<div style="font-size: 28px; text-align: center; line-height: 28px; filter: drop-shadow(0 2px 4px rgba(0,0,0,0.3));">🛵</div>`,className:`custom-map-marker-rider`,iconSize:[28,28],iconAnchor:[14,14]});return c.current=e.marker([12.9716,77.5946],{icon:d}).addTo(i).bindPopup(`<b>ZingBite Kitchen (Restaurant)</b>`),l.current=e.marker([12.9821,77.6085],{icon:f}).addTo(i).bindPopup(`<b>Delivery Address (Home)</b>`),u.current=e.polyline([[12.9716,77.5946],[12.9716,77.601],[12.9821,77.601],[12.9821,77.6085]],{color:`#8b5cf6`,weight:4,opacity:.7,dashArray:`8, 8`}).addTo(i),s.current=e.marker([n,r],{icon:p}).addTo(i).bindPopup(`<b>Rider (Live Location)</b>`),i.fitBounds([[12.9716,77.5946],[12.9821,77.6085]],{padding:[40,40]}),setTimeout(()=>{o.current&&o.current.invalidateSize()},200),()=>{o.current&&(o.current.remove(),o.current=null,s.current=null,c.current=null,l.current=null,u.current=null)}},[t,e.id]),(0,y.useEffect)(()=>{!t||!s.current||s.current.setLatLng([n,r])},[n,r,t]),(0,b.jsxs)(`div`,{className:`map-wrapper`,style:{height:`320px`,position:`relative`},children:[(0,b.jsx)(`div`,{className:`map-overlay-text`,style:{zIndex:10},children:i?`🔴 LIVE REAL-TIME MAP`:`📍 PROJECTED ROUTE MAP`}),(0,b.jsx)(`div`,{ref:a,style:{width:`100%`,height:`100%`,borderRadius:`inherit`,zIndex:1,visibility:t?`visible`:`hidden`}}),!t&&(0,b.jsxs)(`div`,{style:{position:`absolute`,top:0,left:0,width:`100%`,height:`100%`,display:`flex`,flexDirection:`column`,justifyContent:`center`,alignItems:`center`,background:`#f4f6f8`,gap:`12px`,zIndex:5,borderRadius:`inherit`},children:[(0,b.jsx)(m,{size:24,style:{animation:`spin 1s linear infinite`,color:`#8b5cf6`}}),(0,b.jsx)(`span`,{style:{fontSize:`0.85rem`,fontWeight:600,color:`var(--text-secondary)`},children:`Loading Leaflet Interactive Map...`})]})]})},x=()=>{let n=i(),{showAlert:r}=ee(),[c]=o(),f=c.get(`orderId`),{user:x,loading:re}=(0,y.useContext)(te),[S,C]=(0,y.useState)([]),[w,ie]=(0,y.useState)(!0),[T,ae]=(0,y.useState)(``),[E,D]=(0,y.useState)(``),[O,k]=(0,y.useState)(null),[A,j]=(0,y.useState)(0),[M,N]=(0,y.useState)(!1),[P,F]=(0,y.useState)(null),[I,L]=(0,y.useState)(!1),[oe,R]=(0,y.useState)([]),[se,ce]=(0,y.useState)(!1),[le,z]=(0,y.useState)(!1);(0,y.useEffect)(()=>{ce(!0)},[]);let B=[`Placed`,`Accepted`,`Preparing`,`Waiting to Dispatch`,`Out for Delivery`,`Delivered`],V=O?B.indexOf(O.status||`Placed`):0;O&&V/(B.length-1)*100,(0,y.useEffect)(()=>{x&&(async()=>{try{C((await a.get(`/api/profile?action=orders`)).data)}catch(e){console.error(`Failed to load orders for tracking:`,e)}finally{ie(!1)}})()},[x]),(0,y.useEffect)(()=>{if(!f)return;let e=String(f).replace(/^ZB-/,``).trim(),t=new EventSource(`/api/order/stream?orderId=${e}`);return t.onmessage=t=>{try{let n=JSON.parse(t.data);n&&String(n.orderId)===e&&C(t=>t.map(t=>{if(String(t.id||t.orderId||``).replace(/^ZB-/,``).trim()===e){let e={...t};return n.status&&(e.status=n.status),n.gpsProgress!==void 0&&(e.gpsProgress=n.gpsProgress),n.gpsCoordinates!==void 0&&(e.gpsCoordinates=n.gpsCoordinates),e}return t}))}catch(e){console.error(`Failed to parse SSE update data:`,e)}},t.onerror=e=>{console.error(`SSE connection error:`,e)},()=>{t.close()}},[f]),(0,y.useEffect)(()=>{if(S.length===0){k(null);return}let e=null;if(f===`ZB-latest`)e=S[0];else if(f){let t=String(f).replace(/^ZB-/,``).trim();e=S.find(e=>String(e.id||``).replace(/^ZB-/,``).trim()===t)}k(e||null)},[S,f]),(0,y.useEffect)(()=>{if(O)if(O.status===`Out for Delivery`){let e=O.gpsProgress||0,t,n=()=>{j(r=>{let i=e-r;if(Math.abs(i)<.2)return e;let a=r+i*.08;return t=requestAnimationFrame(n),a})};return t=requestAnimationFrame(n),()=>cancelAnimationFrame(t)}else O.status===`Delivered`?j(100):j(0)},[O?.gpsProgress,O?.status]);let H=async e=>{if(!O)return;F(e);let t=parseInt(String(O.id).replace(/^ZB-/,``),10);try{await a.post(`/api/delivery`,{orderId:t,status:e}),k(t=>({...t,status:e}))}catch(e){console.error(`Failed to simulate status change:`,e)}finally{F(null)}};(0,y.useEffect)(()=>{if(!I||!O)return;let e=(B.indexOf(O.status||`Placed`)+1)%B.length,t=setTimeout(async()=>{await H(B[e]),e===B.length-1&&L(!1)},3500);return()=>clearTimeout(t)},[I,O?.status]),(0,y.useEffect)(()=>{if(O?.status===`Delivered`){R(Array.from({length:80}).map((e,t)=>({id:t,left:Math.random()*100+`vw`,top:`-10px`,color:[`#f7374f`,`#4bc0c0`,`#ff9f40`,`#9966ff`,`#ffcd56`][Math.floor(Math.random()*5)],size:Math.random()*8+4+`px`,delay:Math.random()*.5+`s`,duration:Math.random()*2+2+`s`,angle:Math.random()*360+`deg`})));let e=setTimeout(()=>R([]),6e3);return()=>clearTimeout(e)}else R([])},[O?.status]);let[ue,U]=(0,y.useState)(typeof window<`u`&&!!window.L);(e=>{if(e<=0)return{x:80,y:140};if(e>=100)return{x:300,y:110};let t=e/100*350;return t<=80?{x:80+t,y:140}:t<=160?{x:160,y:140-(t-80)}:t<=300?{x:160+(t-160),y:60}:{x:300,y:60+(t-300)}})(A),350-A/100*350;let W=12.9716+A/100*.0105,G=77.5946+A/100*.0139,K=!1;if(O&&O.gpsCoordinates){let e=O.gpsCoordinates.split(`,`);if(e.length===2){let t=parseFloat(e[0]),n=parseFloat(e[1]);!isNaN(t)&&!isNaN(n)&&(W=t,G=n,K=!0)}}(0,y.useEffect)(()=>{if(window.L){U(!0);return}let e=document.querySelector(`link[href*="leaflet.css"]`);e||(e=document.createElement(`link`),e.rel=`stylesheet`,e.href=`https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.9.4/leaflet.css`,document.head.appendChild(e));let t=document.querySelector(`script[src*="leaflet.js"]`);if(!t)t=document.createElement(`script`),t.src=`https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.9.4/leaflet.js`,t.async=!0,t.onload=()=>{let e=setInterval(()=>{window.L&&(U(!0),clearInterval(e))},50)},document.body.appendChild(t);else{let e=setInterval(()=>{window.L&&(U(!0),clearInterval(e))},50);return()=>clearInterval(e)}},[]);let q=25,J=`3.5 km`,Y=`Order Placed`,X=`Your food is being processed.`;if(O){let e=O.status;if(e===`Placed`)q=25,J=`3.5 km`,Y=`Order Placed`,X=`The restaurant is reviewing your order.`;else if(e===`Accepted`)q=22,J=`3.5 km`,Y=`Order Confirmed`,X=`A rider has accepted and is proceeding to restaurant.`;else if(e===`Preparing`)q=18,J=`3.5 km`,Y=`Preparing Food`,X=`Our kitchen partners are cooking your hot fresh meal.`;else if(e===`Waiting to Dispatch`)q=15,J=`3.5 km`,Y=`Food Prepared`,X=`Your food is ready and waiting for dispatch.`;else if(e===`Out for Delivery`){let e=1-A/100;q=Math.max(1,Math.round(10*e)),J=(3.2*e).toFixed(1)+` km`,Y=`Arriving in ${q} mins`,X=`Rider is on the way! Distance left: ${J} (${K?`Real GPS`:`Projected`}: ${W.toFixed(5)}° N, ${G.toFixed(5)}° E)`}else e===`Delivered`&&(q=0,J=`0 km`,Y=`Order Delivered!`,X=`Enjoy your delicious hot meal!`)}let Z=e=>{if(!O)return`pending`;let t=B.indexOf(e);return V>t?`completed`:V===t?`active`:`pending`};if(re)return(0,b.jsx)(`div`,{style:{display:`flex`,justifyContent:`center`,alignItems:`center`,flex:1,minHeight:`400px`},children:(0,b.jsx)(m,{size:36,style:{animation:`spin 1s linear infinite`,color:`var(--brand-red)`}})});let de=e=>{if(e.preventDefault(),!T.trim())return;let t=T.trim().replace(/^ZB-/,``),r=S.find(e=>String(e.id)===t||String(e.orderId)===t);r?(D(``),n(`/track-order?orderId=${r.id}`)):D(`No order found with ID "ZB-${T.trim()}".`)},Q=S.filter(e=>e.status!==`Delivered`),$=S.filter(e=>e.status===`Delivered`);return(0,b.jsxs)(b.Fragment,{children:[(0,b.jsx)(`style`,{children:`
        .tracking-layout {
          max-width: 1000px;
          margin: 24px auto 48px;
          padding: 0 20px;
          display: grid;
          grid-template-columns: 1fr 400px;
          gap: 32px;
          align-items: start;
        }
        
        .tracking-main-box {
          background: #fff;
          border: 1px solid var(--border-medium);
          border-radius: var(--radius-md);
          padding: 24px;
          box-shadow: var(--shadow-sm);
        }
        
        .tracking-header {
          display: flex;
          justify-content: space-between;
          align-items: center;
          margin-bottom: 24px;
          padding: 16px 20px;
          border-radius: var(--radius-md);
          border: 1px solid var(--border-medium);
          background: #fff;
          transition: all 0.5s ease;
        }
        
        .tracking-header.placed { background: rgba(54, 162, 235, 0.03); border-color: rgba(54, 162, 235, 0.15); }
        .tracking-header.accepted { background: rgba(54, 162, 235, 0.03); border-color: rgba(54, 162, 235, 0.15); }
        .tracking-header.preparing { background: rgba(255, 159, 64, 0.03); border-color: rgba(255, 159, 64, 0.15); }
        .tracking-header.waiting-to-dispatch { background: rgba(255, 206, 86, 0.03); border-color: rgba(255, 206, 86, 0.15); }
        .tracking-header.out-for-delivery { background: rgba(153, 102, 255, 0.03); border-color: rgba(153, 102, 255, 0.15); }
        .tracking-header.delivered { background: rgba(75, 192, 192, 0.03); border-color: rgba(75, 192, 192, 0.15); }
        
        .eta-display h3 {
          font-size: 1.6rem;
          font-weight: 800;
          color: var(--text-primary);
          margin-bottom: 4px;
          transition: color 0.3s;
        }
        
        .tracking-header.placed .eta-display h3 { color: #36a2eb; }
        .tracking-header.accepted .eta-display h3 { color: #36a2eb; }
        .tracking-header.preparing .eta-display h3 { color: #ff9f40; }
        .tracking-header.waiting-to-dispatch .eta-display h3 { color: #e09f00; }
        .tracking-header.out-for-delivery .eta-display h3 { color: #9966ff; }
        .tracking-header.delivered .eta-display h3 { color: #4bc0c0; }
        
        .eta-display p {
          color: var(--text-secondary);
          font-size: 0.88rem;
          font-weight: 500;
        }
        
        .order-info-pill {
          background: var(--bg-surface);
          border: 1px solid var(--border-medium);
          padding: 8px 16px;
          border-radius: 20px;
          font-size: 0.85rem;
          font-weight: 600;
        }
        
        /* Map Simulator */
        .map-wrapper {
          background: #f4f6f8;
          border-radius: var(--radius-md);
          border: 1px solid var(--border-medium);
          position: relative;
          overflow: hidden;
          margin-bottom: 24px;
          height: 240px;
          box-shadow: inset 0 2px 8px rgba(0,0,0,0.05);
        }
        
        .map-overlay-text {
          position: absolute;
          top: 12px;
          left: 12px;
          background: rgba(255,255,255,0.9);
          padding: 4px 10px;
          border-radius: 12px;
          font-size: 0.75rem;
          font-weight: 700;
          color: var(--text-secondary);
          border: 1px solid var(--border-medium);
          z-index: 10;
        }
        
        .tracking-map-svg {
          width: 100%;
          height: 100%;
        }
        
        .map-point {
          transition: all 0.3s;
        }
        
        @keyframes mapGlowGreen {
          0% { filter: drop-shadow(0 0 2px rgba(96,178,70,0.4)); }
          50% { filter: drop-shadow(0 0 8px rgba(96,178,70,0.8)); }
          100% { filter: drop-shadow(0 0 2px rgba(96,178,70,0.4)); }
        }
        @keyframes mapGlowRed {
          0% { filter: drop-shadow(0 0 2px rgba(247,55,79,0.4)); }
          50% { filter: drop-shadow(0 0 8px rgba(247,55,79,0.8)); }
          100% { filter: drop-shadow(0 0 2px rgba(247,55,79,0.4)); }
        }
        .map-point.glow {
          animation-duration: 2s;
          animation-iteration-count: infinite;
        }
        .map-point.glow[transform*="80,"] {
          animation-name: mapGlowGreen;
        }
        .map-point.glow[transform*="300,"] {
          animation-name: mapGlowRed;
        }
        
        .map-rider-marker {
          transition: all 0.1s linear;
          animation: riderPulse 2s infinite ease-in-out;
        }
        @keyframes riderPulse {
          0%, 100% { filter: drop-shadow(0 0 1px rgba(23,26,41,0.2)); }
          50% { filter: drop-shadow(0 0 4px rgba(23,26,41,0.6)); }
        }
        
        .map-label {
          font-size: 8px;
          font-weight: bold;
          font-family: sans-serif;
          fill: var(--text-secondary);
        }
        
        /* Timeline Spacing */
        .status-timeline {
          display: flex;
          flex-direction: column;
          position: relative;
          padding-left: 8px;
        }

        .timeline-step {
          display: flex;
          gap: 16px;
          position: relative;
          padding-bottom: 24px;
        }

        .timeline-step:last-child {
          padding-bottom: 0;
        }

        .step-left-column {
          display: flex;
          flex-direction: column;
          align-items: center;
          position: relative;
          width: 20px;
        }

        .step-line-segment {
          position: absolute;
          width: 2px;
          left: 50%;
          transform: translateX(-50%);
          top: 10px;
          bottom: -14px;
          background: var(--border-medium);
          transition: background-color 0.5s ease;
          z-index: 1;
        }

        .timeline-step.completed .step-line-segment {
          background: var(--success);
        }
        
        .step-icon-circle {
          width: 20px;
          height: 20px;
          border-radius: 50%;
          background: #fff;
          border: 2px solid var(--border-medium);
          display: flex;
          align-items: center;
          justify-content: center;
          transition: all 0.5s cubic-bezier(0.34, 1.56, 0.64, 1);
          z-index: 2;
          position: relative;
        }
        
        .timeline-step.completed .step-icon-circle {
          background: var(--success);
          border-color: var(--success);
          transform: scale(1.05);
        }
        
        @keyframes activePulse {
          0% { transform: scale(1); box-shadow: 0 0 0 0px rgba(247, 55, 79, 0.35); }
          50% { transform: scale(1.2); box-shadow: 0 0 0 8px rgba(247, 55, 79, 0.15); }
          100% { transform: scale(1); box-shadow: 0 0 0 0px rgba(247, 55, 79, 0.35); }
        }

        .timeline-step.active .step-icon-circle {
          background: white;
          border-color: var(--brand-red);
          animation: activePulse 2s infinite ease-in-out;
        }
        
        .step-dot {
          width: 6px;
          height: 6px;
          border-radius: 50%;
          background: var(--border-medium);
        }
        
        .timeline-step.completed .step-dot {
          background: #fff;
          width: 8px;
          height: 8px;
        }
        
        .timeline-step.active .step-dot {
          background: var(--brand-red);
          animation: pulse 1.2s infinite;
        }
        
        .step-details h4 {
          font-size: 0.95rem;
          margin-bottom: 2px;
          color: var(--text-muted);
        }
        
        .timeline-step.active .step-details h4,
        .timeline-step.completed .step-details h4 {
          color: var(--text-primary);
          font-weight: 700;
        }
        
        .step-details p {
          font-size: 0.8rem;
          color: var(--text-muted);
          line-height: 1.4;
        }
        
        /* Rider Panel */
        .rider-panel-box {
          background: #fff;
          border: 1px solid var(--border-medium);
          border-radius: var(--radius-md);
          padding: 24px;
          box-shadow: var(--shadow-sm);
        }
        
        .rider-card-header {
          font-size: 1.1rem;
          font-weight: 700;
          margin-bottom: 16px;
          display: flex;
          align-items: center;
          gap: 8px;
        }
        
        .rider-profile {
          display: flex;
          align-items: center;
          gap: 16px;
          padding-bottom: 20px;
          border-bottom: 1px solid var(--border-light);
          margin-bottom: 20px;
        }
        
        .rider-avatar {
          width: 52px;
          height: 52px;
          border-radius: 50%;
          background: var(--brand-red);
          display: flex;
          align-items: center;
          justify-content: center;
          font-weight: 700;
          color: #fff;
          border: 1px solid var(--border-medium);
        }
        
        .rider-info h4 {
          font-size: 1rem;
          margin-bottom: 2px;
        }
        
        .rider-info p {
          font-size: 0.8rem;
          color: var(--text-muted);
        }
        
        .rider-contact-row {
          display: flex;
          gap: 10px;
        }
        
        .rider-contact-btn {
          flex: 1;
          display: flex;
          align-items: center;
          justify-content: center;
          gap: 8px;
          padding: 10px;
          border-radius: var(--radius-sm);
          font-size: 0.85rem;
          font-weight: 700;
          cursor: pointer;
          transition: all 0.2s;
        }
        
        .rider-contact-btn.call {
          background: var(--success);
          color: #fff;
          border: none;
        }
        
        .rider-contact-btn.call:hover {
          background: #50a037;
        }
        
        .rider-contact-btn.chat {
          background: transparent;
          border: 1px solid var(--border-medium);
          color: var(--text-secondary);
        }
        
        .rider-contact-btn.chat:hover {
          border-color: var(--brand-red);
          color: var(--brand-red);
        }

        .rider-waiting-box {
          display: flex;
          flex-direction: column;
          align-items: center;
          justify-content: center;
          padding: 24px 16px;
          text-align: center;
          background: var(--bg-surface);
          border-radius: var(--radius-sm);
          border: 1px dashed var(--border-medium);
        }
        
        .rider-waiting-spinner {
          width: 32px;
          height: 32px;
          border: 3px solid var(--border-medium);
          border-top-color: var(--brand-red);
          border-radius: 50%;
          animation: spin 1s linear infinite;
          margin-bottom: 12px;
        }

        @keyframes spin {
          to { transform: rotate(360deg); }
        }
        
        .receipt-summary {
          margin-top: 24px;
          padding-top: 20px;
          border-top: 1px solid var(--border-light);
        }
        
        .receipt-row {
          display: flex;
          justify-content: space-between;
          font-size: 0.85rem;
          color: var(--text-secondary);
          margin-bottom: 8px;
        }
        
        .receipt-total {
          font-weight: 700;
          color: var(--text-primary);
          font-size: 0.95rem;
          margin-top: 12px;
          padding-top: 8px;
          border-top: 1px dashed var(--border-medium);
        }
        
        .back-home-btn {
          display: flex;
          align-items: center;
          gap: 8px;
          background: transparent;
          border: none;
          color: var(--brand-red);
          font-weight: 700;
          cursor: pointer;
          margin-bottom: 16px;
          font-size: 0.9rem;
        }
        
        .back-home-btn:hover {
          color: var(--brand-red-hover);
        }
 
        @keyframes pulse {
          0%, 100% { transform: scale(1); opacity: 1; }
          50% { transform: scale(1.5); opacity: 0.7; }
        }
 
        @media (max-width: 900px) {
          .tracking-layout {
            grid-template-columns: 1fr;
            gap: 24px;
          }
        }

        /* Simulator Panel */
        .simulator-trigger-btn {
          position: fixed;
          bottom: 24px;
          right: 24px;
          width: 52px;
          height: 52px;
          border-radius: 50%;
          background: var(--brand-red);
          color: white;
          border: none;
          box-shadow: 0 4px 12px rgba(247,55,79,0.4);
          cursor: pointer;
          display: flex;
          align-items: center;
          justify-content: center;
          z-index: 999;
          transition: all 0.3s cubic-bezier(0.175, 0.885, 0.32, 1.275);
        }
        .simulator-trigger-btn:hover {
          transform: scale(1.1) rotate(15deg);
        }
        .simulator-panel {
          position: fixed;
          bottom: 90px;
          right: 24px;
          width: 320px;
          background: rgba(255, 255, 255, 0.85);
          backdrop-filter: blur(16px);
          border: 1px solid rgba(255, 255, 255, 0.4);
          border-radius: var(--radius-md);
          box-shadow: 0 8px 32px rgba(0, 0, 0, 0.15);
          padding: 20px;
          z-index: 998;
          display: flex;
          flex-direction: column;
          gap: 12px;
          transition: all 0.3s cubic-bezier(0.175, 0.885, 0.32, 1.275);
          transform: translateY(20px);
          opacity: 0;
          pointer-events: none;
        }
        .simulator-panel.show {
          transform: translateY(0);
          opacity: 1;
          pointer-events: auto;
        }
        .simulator-title {
          font-size: 0.95rem;
          font-weight: 800;
          color: var(--text-primary);
          border-bottom: 1px solid var(--border-medium);
          padding-bottom: 8px;
          margin-bottom: 4px;
          display: flex;
          align-items: center;
          gap: 6px;
        }
        .simulator-grid {
          display: grid;
          grid-template-columns: 1fr;
          gap: 8px;
        }
        .simulator-btn {
          width: 100%;
          padding: 8px 12px;
          border-radius: var(--radius-sm);
          font-weight: 700;
          font-size: 0.8rem;
          border: 1px solid var(--border-medium);
          background: white;
          color: var(--text-secondary);
          cursor: pointer;
          transition: all 0.2s;
          display: flex;
          align-items: center;
          justify-content: space-between;
        }
        .simulator-btn:hover {
          border-color: var(--brand-red);
          color: var(--brand-red);
          background: rgba(247,55,79,0.02);
        }
        .simulator-btn.active {
          background: var(--brand-red);
          border-color: var(--brand-red);
          color: white;
          box-shadow: 0 2px 6px rgba(247,55,79,0.3);
        }

        .confetti-particle {
          position: fixed;
          z-index: 10000;
          pointer-events: none;
          animation: confettiFall linear forwards;
          border-radius: 2px;
        }
        @keyframes confettiFall {
          0% {
            transform: translateY(0) rotate(0deg);
            opacity: 1;
          }
          100% {
            transform: translateY(105vh) rotate(720deg);
            opacity: 0;
          }
        }

        /* General Tracking Portal Dashboard styles */
        .tracking-portal-empty {
          max-width: 500px;
          margin: 80px auto;
          text-align: center;
          display: flex;
          flex-direction: column;
          align-items: center;
          padding: 32px;
          background: #fff;
          border: 1px solid var(--border-medium);
          border-radius: var(--radius-lg);
          box-shadow: var(--shadow-md);
        }
        
        .tracking-portal-empty h2 {
          font-size: 1.8rem;
          margin-bottom: 8px;
          font-weight: 800;
        }
        
        .tracking-portal-empty p {
          color: var(--text-secondary);
          margin-bottom: 24px;
          line-height: 1.5;
        }

        .portal-container {
          max-width: 800px;
          margin: 32px auto 60px;
          padding: 0 20px;
        }

        .portal-header {
          text-align: center;
          margin-bottom: 32px;
        }

        .portal-header h2 {
          font-size: 2.2rem;
          font-weight: 800;
          margin-bottom: 8px;
          color: var(--text-primary);
        }

        .portal-header p {
          color: var(--text-secondary);
          font-size: 1rem;
        }

        .tracking-search-form {
          margin-bottom: 40px;
          position: relative;
        }

        .tracking-search-form .search-input-wrapper {
          position: relative;
          width: 100%;
        }

        .tracking-search-form input {
          width: 100%;
          padding: 16px 120px 16px 44px;
          border: 1px solid var(--border-medium);
          border-radius: var(--radius-md);
          font-size: 1rem;
          outline: none;
          background: #fff;
          box-shadow: var(--shadow-sm);
          transition: all 0.3s;
        }

        .tracking-search-form input:focus {
          border-color: var(--brand-red);
          box-shadow: 0 4px 18px rgba(247,55,79,0.1);
        }

        .tracking-search-form .search-icon-inside {
          position: absolute;
          left: 16px;
          top: 50%;
          transform: translateY(-50%);
          color: var(--text-muted);
        }

        .search-submit-btn {
          position: absolute;
          right: 8px;
          top: 8px;
          bottom: 8px;
          background: var(--brand-red);
          color: white;
          border: none;
          padding: 0 24px;
          border-radius: var(--radius-sm);
          font-weight: 700;
          font-size: 0.85rem;
          cursor: pointer;
          transition: background-color 0.2s;
        }

        .search-submit-btn:hover {
          background: var(--brand-red-hover);
        }

        .search-error-text {
          color: var(--danger);
          font-size: 0.85rem;
          margin-top: 10px;
          font-weight: 600;
          padding-left: 16px;
          display: flex;
          align-items: center;
          gap: 6px;
        }

        .portal-section-title {
          font-size: 1.3rem;
          font-weight: 800;
          margin-bottom: 20px;
          display: flex;
          align-items: center;
          gap: 8px;
          color: var(--text-primary);
          border-bottom: 1px solid var(--border-light);
          padding-bottom: 10px;
        }

        .active-orders-grid {
          display: flex;
          flex-direction: column;
          gap: 16px;
          margin-bottom: 40px;
        }

        .active-order-card {
          background: #fff;
          border: 1px solid var(--border-medium);
          border-radius: var(--radius-md);
          padding: 20px 24px;
          box-shadow: var(--shadow-sm);
          display: flex;
          justify-content: space-between;
          align-items: center;
          transition: transform 0.2s, box-shadow 0.2s;
        }

        .active-order-card:hover {
          transform: translateY(-2px);
          box-shadow: var(--shadow-md);
        }

        .active-order-info h3 {
          font-size: 1.25rem;
          margin-bottom: 4px;
          color: var(--text-primary);
        }

        .active-order-meta {
          font-size: 0.82rem;
          color: var(--text-muted);
          margin-bottom: 8px;
        }

        .active-order-status-wrapper {
          display: flex;
          align-items: center;
          gap: 8px;
        }

        .active-order-status-dot {
          width: 8px;
          height: 8px;
          border-radius: 50%;
          background: var(--success);
          animation: pulse 1.5s infinite;
        }

        .active-order-status-text {
          font-size: 0.85rem;
          font-weight: 700;
          color: var(--success);
        }

        .track-button-link {
          background: var(--brand-red);
          color: white;
          padding: 10px 24px;
          border-radius: 30px;
          font-weight: 700;
          font-size: 0.85rem;
          border: none;
          cursor: pointer;
          display: flex;
          align-items: center;
          gap: 8px;
          transition: all 0.2s;
          box-shadow: 0 4px 12px rgba(247,55,79,0.25);
        }

        .track-button-link:hover {
          background: var(--brand-red-hover);
          transform: scale(1.03);
          box-shadow: 0 6px 16px rgba(247,55,79,0.35);
        }

        .empty-active-orders {
          text-align: center;
          padding: 40px 20px;
          border: 1px dashed var(--border-medium);
          border-radius: var(--radius-md);
          background: var(--bg-surface);
          color: var(--text-secondary);
        }

        .recent-orders-list {
          display: flex;
          flex-direction: column;
          gap: 12px;
        }

        .recent-order-item {
          background: #fff;
          border: 1px solid var(--border-light);
          border-radius: var(--radius-sm);
          padding: 16px 20px;
          display: flex;
          justify-content: space-between;
          align-items: center;
        }

        .recent-order-details h4 {
          font-size: 0.95rem;
          margin-bottom: 2px;
        }

        .recent-order-details p {
          font-size: 0.78rem;
          color: var(--text-muted);
        }

        .view-track-history-btn {
          background: transparent;
          border: 1px solid var(--border-medium);
          color: var(--text-secondary);
          padding: 6px 14px;
          border-radius: 20px;
          font-size: 0.8rem;
          font-weight: 600;
          cursor: pointer;
          transition: all 0.2s;
        }

        .view-track-history-btn:hover {
          border-color: var(--brand-red);
          color: var(--brand-red);
        }
      `}),x?f?w&&!O?(0,b.jsxs)(`div`,{style:{display:`flex`,flexDirection:`column`,justifyContent:`center`,alignItems:`center`,flex:1,minHeight:`400px`,gap:`12px`},children:[(0,b.jsx)(m,{size:36,style:{animation:`spin 1s linear infinite`,color:`var(--brand-red)`}}),(0,b.jsx)(`p`,{style:{color:`var(--text-secondary)`,fontSize:`0.9rem`},children:`Locating your order run...`})]}):O?(0,b.jsxs)(`div`,{className:`tracking-layout fade-in`,children:[(0,b.jsxs)(`div`,{children:[(0,b.jsxs)(`button`,{onClick:()=>n(`/track-order`),className:`back-home-btn`,children:[(0,b.jsx)(_,{size:16}),` Back to Tracker Portal`]}),(0,b.jsxs)(`main`,{className:`tracking-main-box`,children:[(0,b.jsxs)(`div`,{className:`tracking-header ${(O?.status||`Placed`).toLowerCase().replace(/\s+/g,`-`)}`,children:[(0,b.jsxs)(`div`,{className:`eta-display`,children:[(0,b.jsx)(`h3`,{children:Y}),(0,b.jsx)(`p`,{children:X})]}),(0,b.jsxs)(`div`,{className:`order-info-pill`,children:[`ID: `,O?O.id:f]})]}),(0,b.jsx)(ne,{orderDetail:O,leafletLoaded:ue,currentLat:W,currentLng:G,isRealGPS:K}),(0,b.jsxs)(`div`,{className:`status-timeline`,children:[(0,b.jsxs)(`div`,{className:`timeline-step ${Z(`Placed`)}`,children:[(0,b.jsxs)(`div`,{className:`step-left-column`,children:[(0,b.jsx)(`div`,{className:`step-icon-circle`,children:(0,b.jsx)(`div`,{className:`step-dot`})}),(0,b.jsx)(`div`,{className:`step-line-segment`})]}),(0,b.jsxs)(`div`,{className:`step-details`,children:[(0,b.jsx)(`h4`,{children:`Order Placed`}),(0,b.jsx)(`p`,{children:`Your order has been received and sent to the restaurant.`})]})]}),(0,b.jsxs)(`div`,{className:`timeline-step ${Z(`Accepted`)}`,children:[(0,b.jsxs)(`div`,{className:`step-left-column`,children:[(0,b.jsx)(`div`,{className:`step-icon-circle`,children:(0,b.jsx)(`div`,{className:`step-dot`})}),(0,b.jsx)(`div`,{className:`step-line-segment`})]}),(0,b.jsxs)(`div`,{className:`step-details`,children:[(0,b.jsx)(`h4`,{children:`Rider Accepted`}),(0,b.jsx)(`p`,{children:`A delivery partner has accepted your delivery request.`})]})]}),(0,b.jsxs)(`div`,{className:`timeline-step ${Z(`Preparing`)}`,children:[(0,b.jsxs)(`div`,{className:`step-left-column`,children:[(0,b.jsx)(`div`,{className:`step-icon-circle`,children:(0,b.jsx)(`div`,{className:`step-dot`})}),(0,b.jsx)(`div`,{className:`step-line-segment`})]}),(0,b.jsxs)(`div`,{className:`step-details`,children:[(0,b.jsx)(`h4`,{children:`Preparing Food`}),(0,b.jsx)(`p`,{children:`Our kitchen partners are preparing your meal using fresh ingredients.`})]})]}),(0,b.jsxs)(`div`,{className:`timeline-step ${Z(`Waiting to Dispatch`)}`,children:[(0,b.jsxs)(`div`,{className:`step-left-column`,children:[(0,b.jsx)(`div`,{className:`step-icon-circle`,children:(0,b.jsx)(`div`,{className:`step-dot`})}),(0,b.jsx)(`div`,{className:`step-line-segment`})]}),(0,b.jsxs)(`div`,{className:`step-details`,children:[(0,b.jsx)(`h4`,{children:`Food Ready`}),(0,b.jsx)(`p`,{children:`Food is packed and ready! Awaiting kitchen dispatch to rider.`})]})]}),(0,b.jsxs)(`div`,{className:`timeline-step ${Z(`Out for Delivery`)}`,children:[(0,b.jsxs)(`div`,{className:`step-left-column`,children:[(0,b.jsx)(`div`,{className:`step-icon-circle`,children:(0,b.jsx)(`div`,{className:`step-dot`})}),(0,b.jsx)(`div`,{className:`step-line-segment`})]}),(0,b.jsxs)(`div`,{className:`step-details`,children:[(0,b.jsx)(`h4`,{children:`Out for Delivery`}),(0,b.jsx)(`p`,{children:`Our delivery partner is riding swiftly on the route to your home.`})]})]}),(0,b.jsxs)(`div`,{className:`timeline-step ${Z(`Delivered`)}`,children:[(0,b.jsx)(`div`,{className:`step-left-column`,children:(0,b.jsx)(`div`,{className:`step-icon-circle`,children:(0,b.jsx)(`div`,{className:`step-dot`})})}),(0,b.jsxs)(`div`,{className:`step-details`,children:[(0,b.jsx)(`h4`,{children:`Order Arrived`}),(0,b.jsx)(`p`,{children:`Rider has arrived at your address. Grab your meal and enjoy!`})]})]})]})]})]}),(0,b.jsx)(`aside`,{children:(0,b.jsxs)(`div`,{className:`rider-panel-box`,children:[(0,b.jsxs)(`h3`,{className:`rider-card-header`,children:[(0,b.jsx)(s,{size:18,color:`var(--brand-red)`}),` Delivery Partner`]}),O&&O.riderName?(0,b.jsxs)(b.Fragment,{children:[(0,b.jsxs)(`div`,{className:`rider-profile`,children:[(0,b.jsx)(`div`,{className:`rider-avatar`,children:O.riderName.split(` `).map(e=>e[0]).join(``).toUpperCase()}),(0,b.jsxs)(`div`,{className:`rider-info`,children:[(0,b.jsx)(`h4`,{children:O.riderName}),(0,b.jsx)(`p`,{children:`Splendor (KA-03-EX-9921)`})]})]}),(0,b.jsxs)(`div`,{className:`rider-contact-row`,children:[(0,b.jsxs)(`button`,{onClick:()=>r(`Calling rider ${O.riderName} at ${O.riderPhone}...`,`info`),className:`rider-contact-btn call`,children:[(0,b.jsx)(l,{size:14}),` Call Rider`]}),(0,b.jsxs)(`button`,{onClick:()=>z(e=>!e),className:`rider-contact-btn chat`,children:[(0,b.jsx)(e,{size:14}),` Chat`]})]})]}):(0,b.jsxs)(`div`,{className:`rider-waiting-box`,children:[(0,b.jsx)(`div`,{className:`rider-waiting-spinner`}),(0,b.jsx)(`h4`,{children:`Assigning Rider...`}),(0,b.jsx)(`p`,{children:`We are matching your order with a nearby delivery partner.`})]}),(0,b.jsxs)(`div`,{className:`receipt-summary`,children:[(0,b.jsx)(`h4`,{style:{fontSize:`0.9rem`,marginBottom:`12px`},children:`Order Receipt`}),(0,b.jsxs)(`div`,{className:`receipt-row`,children:[(0,b.jsx)(`span`,{children:`Payment Mode`}),(0,b.jsx)(`span`,{children:`Razorpay (Online)`})]}),(0,b.jsxs)(`div`,{className:`receipt-row`,children:[(0,b.jsx)(`span`,{children:`Restaurant Name`}),(0,b.jsx)(`span`,{children:O?O.restaurantName:`ZingBite Hotspot`})]}),O&&O.items&&(0,b.jsxs)(`div`,{style:{marginTop:`12px`,borderTop:`1px dashed var(--border-medium)`,paddingTop:`12px`,marginBottom:`12px`},children:[(0,b.jsx)(`h5`,{style:{fontSize:`0.8rem`,marginBottom:`8px`,color:`var(--text-secondary)`},children:`Items:`}),O.items.map((e,t)=>(0,b.jsxs)(`div`,{className:`receipt-row`,style:{fontSize:`0.8rem`,marginBottom:`4px`},children:[(0,b.jsxs)(`span`,{children:[e.name,` × `,e.qty]}),(0,b.jsxs)(`span`,{children:[`₹`,(e.price*e.qty).toFixed(2)]})]},t))]}),(0,b.jsxs)(`div`,{className:`receipt-total receipt-row`,style:{borderTop:O?`none`:`1px dashed var(--border-medium)`,marginTop:O?0:`12px`},children:[(0,b.jsx)(`strong`,{children:`Amount Paid`}),(0,b.jsxs)(`strong`,{children:[`₹`,O?O.total.toFixed(2):`0.00`]})]})]})]})})]}):(0,b.jsxs)(`div`,{className:`tracking-portal-empty fade-in`,children:[(0,b.jsx)(g,{size:64,color:`var(--brand-red)`,style:{marginBottom:`16px`}}),(0,b.jsx)(`h2`,{children:`Order Not Found`}),(0,b.jsxs)(`p`,{children:[`We couldn't find any active or past order matching ID "ZB-`,f,`".`]}),(0,b.jsxs)(`div`,{style:{display:`flex`,gap:`12px`},children:[(0,b.jsx)(`button`,{onClick:()=>n(`/track-order`),className:`btn-primary`,style:{width:`auto`,padding:`12px 24px`,borderRadius:`30px`},children:`BACK TO PORTAL`}),(0,b.jsx)(`button`,{onClick:()=>n(`/`),className:`btn-primary`,style:{width:`auto`,padding:`12px 24px`,borderRadius:`30px`,background:`transparent`,border:`1px solid var(--border-medium)`,color:`var(--text-secondary)`},children:`GO HOME`})]})]}):(0,b.jsxs)(`div`,{className:`portal-container fade-in`,children:[(0,b.jsxs)(`div`,{className:`portal-header`,children:[(0,b.jsx)(`h2`,{children:`Order Tracking Portal`}),(0,b.jsx)(`p`,{children:`Track your active food deliveries and search order histories in real time.`})]}),(0,b.jsxs)(`form`,{onSubmit:de,className:`tracking-search-form`,children:[(0,b.jsxs)(`div`,{className:`search-input-wrapper`,children:[(0,b.jsx)(p,{className:`search-icon-inside`,size:18}),(0,b.jsx)(`input`,{type:`text`,placeholder:`Enter Order ID (e.g. ZB-2)`,value:T,onChange:e=>ae(e.target.value)}),(0,b.jsx)(`button`,{type:`submit`,className:`search-submit-btn`,children:`TRACK`})]}),E&&(0,b.jsxs)(`p`,{className:`search-error-text`,children:[(0,b.jsx)(g,{size:14,style:{display:`inline`,marginRight:`4px`}}),` `,E]})]}),(0,b.jsxs)(`div`,{children:[(0,b.jsxs)(`h3`,{className:`portal-section-title`,children:[(0,b.jsx)(d,{size:18,color:`var(--brand-red)`}),` Active Deliveries`]}),w?(0,b.jsx)(`div`,{style:{textAlign:`center`,padding:`30px 0`},children:(0,b.jsx)(m,{size:24,style:{animation:`spin 1s linear infinite`,color:`var(--brand-red)`}})}):Q.length===0?(0,b.jsxs)(`div`,{className:`empty-active-orders`,children:[(0,b.jsx)(`p`,{style:{fontWeight:600,marginBottom:`4px`},children:`No Active Deliveries`}),(0,b.jsx)(`p`,{style:{fontSize:`0.85rem`},children:`You don't have any orders in progress right now.`})]}):(0,b.jsx)(`div`,{className:`active-orders-grid`,children:Q.map(e=>(0,b.jsxs)(`div`,{className:`active-order-card`,children:[(0,b.jsxs)(`div`,{className:`active-order-info`,children:[(0,b.jsx)(`h3`,{children:e.restaurantName||`ZingBite Kitchen`}),(0,b.jsxs)(`p`,{className:`active-order-meta`,children:[`Order ID: ZB-`,e.id,` • `,e.items?e.items.length:0,` items`]}),(0,b.jsxs)(`div`,{className:`active-order-status-wrapper`,children:[(0,b.jsx)(`div`,{className:`active-order-status-dot`}),(0,b.jsx)(`span`,{className:`active-order-status-text`,children:e.status})]})]}),(0,b.jsxs)(`button`,{onClick:()=>n(`/track-order?orderId=${e.id}`),className:`track-button-link`,children:[(0,b.jsx)(u,{size:16}),` Track Live`]})]},e.id))})]}),(0,b.jsxs)(`div`,{style:{marginTop:`40px`},children:[(0,b.jsxs)(`h3`,{className:`portal-section-title`,children:[(0,b.jsx)(h,{size:18,color:`var(--success)`}),` Recently Delivered`]}),w?(0,b.jsx)(`div`,{style:{textAlign:`center`,padding:`30px 0`},children:(0,b.jsx)(m,{size:24,style:{animation:`spin 1s linear infinite`,color:`var(--success)`}})}):$.length===0?(0,b.jsx)(`div`,{className:`empty-active-orders`,style:{background:`transparent`},children:(0,b.jsx)(`p`,{style:{fontSize:`0.85rem`},children:`No recently delivered orders found.`})}):(0,b.jsx)(`div`,{className:`recent-orders-list`,children:$.slice(0,5).map(e=>(0,b.jsxs)(`div`,{className:`recent-order-item`,children:[(0,b.jsxs)(`div`,{className:`recent-order-details`,children:[(0,b.jsx)(`h4`,{children:e.restaurantName||`ZingBite Kitchen`}),(0,b.jsxs)(`p`,{children:[`Order ID: ZB-`,e.id,` • Delivered successfully on `,e.date||`today`]})]}),(0,b.jsx)(`button`,{onClick:()=>n(`/track-order?orderId=${e.id}`),className:`view-track-history-btn`,children:`View History`})]},e.id))})]})]}):(0,b.jsxs)(`div`,{className:`tracking-portal-empty fade-in`,children:[(0,b.jsx)(u,{size:64,color:`var(--brand-red)`,style:{marginBottom:`16px`}}),(0,b.jsx)(`h2`,{children:`Track Your Order`}),(0,b.jsx)(`p`,{children:`Please log in to track your active deliveries and view your order history.`}),(0,b.jsx)(`button`,{onClick:()=>n(`/login?redirect=/track-order`),className:`btn-primary`,style:{width:`auto`,padding:`12px 32px`,borderRadius:`30px`},children:`LOG IN TO TRACK`})]}),O&&(0,b.jsxs)(b.Fragment,{children:[(0,b.jsx)(`button`,{className:`simulator-trigger-btn`,onClick:()=>N(e=>!e),title:`Toggle Order Status Simulator`,children:(0,b.jsx)(v,{size:22,className:M?`spin`:``})}),(0,b.jsxs)(`div`,{className:`simulator-panel ${M?`show`:``}`,children:[(0,b.jsxs)(`div`,{style:{display:`flex`,justifyContent:`space-between`,alignItems:`center`,borderBottom:`1px solid var(--border-medium)`,paddingBottom:`8px`,marginBottom:`8px`},children:[(0,b.jsxs)(`h4`,{className:`simulator-title`,style:{border:`none`,margin:0,padding:0},children:[(0,b.jsx)(v,{size:16}),` Simulator`]}),(0,b.jsx)(`button`,{onClick:()=>L(e=>!e),className:`simulator-btn ${I?`active`:``}`,style:{width:`auto`,padding:`4px 8px`,fontSize:`0.7rem`,margin:0},children:I?`Stop Auto`:`Auto Play`})]}),(0,b.jsxs)(`p`,{style:{fontSize:`0.72rem`,color:`var(--text-muted)`,marginBottom:`8px`,lineHeight:`1.4`},children:[`Simulate restaurant and rider actions on the active order (`,(0,b.jsx)(`strong`,{children:O.id}),`) to test animations.`]}),(0,b.jsx)(`div`,{className:`simulator-grid`,children:B.map(e=>{let t=O.status===e;return(0,b.jsxs)(`button`,{disabled:P!==null,onClick:()=>H(e),className:`simulator-btn ${t?`active`:``}`,children:[(0,b.jsx)(`span`,{children:e}),P===e?(0,b.jsx)(`span`,{className:`rider-waiting-spinner`,style:{width:`12px`,height:`12px`,margin:0}}):t?(0,b.jsx)(h,{size:12}):null]},e)})})]})]}),oe.map(e=>(0,b.jsx)(`div`,{className:`confetti-particle`,style:{left:e.left,top:e.top,backgroundColor:e.color,width:e.size,height:e.size,animationDelay:e.delay,animationDuration:e.duration,transform:`rotate(${e.angle})`}},e.id)),le&&O&&O.riderId&&(0,b.jsx)(t,{type:`order`,targetId:parseInt(String(O.id).replace(/^ZB-/,``),10),userId:x?.userID||x?.userId,userName:x?.userName||x?.username,receiverId:O.riderId,initialOpen:!0,onClose:()=>z(!1)},O.id)]})};export{x as default};