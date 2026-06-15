import{t as e}from"./chevron-right-D7Q9x3d1.js";import{t}from"./indian-rupee-DVX67Jy5.js";import{n,t as r}from"./ChatWidget-Cly2Cb9B.js";import{A as i,D as a,E as o,N as s,O as c,P as l,S as u,g as d,i as f,j as p,k as m,m as h,p as g,t as _}from"./index-CXn8uLcV.js";var v=a(`clipboard-check`,[[`rect`,{width:`8`,height:`4`,x:`8`,y:`2`,rx:`1`,ry:`1`,key:`tgr4d6`}],[`path`,{d:`M16 4h2a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H6a2 2 0 0 1-2-2V6a2 2 0 0 1 2-2h2`,key:`116196`}],[`path`,{d:`m9 14 2 2 4-4`,key:`df797q`}]]),y=a(`navigation`,[[`polygon`,{points:`3 11 22 2 13 21 11 13 3 11`,key:`1ltx0t`}]]),b=l(s(),1),x=m(),S=4,C=(e,t)=>{if(!e||e.length===0)return null;if(e.length===1)return e[0];let n=[],r=0;for(let t=0;t<e.length-1;t++){let i=e[t],a=e[t+1],o=a[0]-i[0],s=a[1]-i[1],c=Math.sqrt(o*o+s*s);n.push({from:i,to:a,length:c}),r+=c}if(r===0)return e[0];let i=t/100*r,a=0;for(let e of n){if(a+e.length>=i){let t=e.length>0?(i-a)/e.length:0;return[e.from[0]+(e.to[0]-e.from[0])*t,e.from[1]+(e.to[1]-e.from[1])*t]}a+=e.length}return e[e.length-1]},w=({order:e})=>{let[t,n]=(0,b.useState)(typeof window<`u`&&!!window.L),r=b.useRef(null),i=b.useRef(null),a=b.useRef(null),o=b.useRef(null),s=b.useRef(null),c=b.useRef(null),l=b.useRef(null),u=b.useRef(null);(0,b.useEffect)(()=>{if(window.L){n(!0);return}let e=document.querySelector(`link[href*="leaflet.css"]`);e||(e=document.createElement(`link`),e.rel=`stylesheet`,e.href=`https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.9.4/leaflet.css`,document.head.appendChild(e));let t=document.querySelector(`script[src*="leaflet.js"]`);if(!t)t=document.createElement(`script`),t.src=`https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.9.4/leaflet.js`,t.async=!0,t.onload=()=>{let e=setInterval(()=>{window.L&&(n(!0),clearInterval(e))},50)},document.body.appendChild(t);else{let e=setInterval(()=>{window.L&&(n(!0),clearInterval(e))},50);return()=>clearInterval(e)}},[]),(0,b.useEffect)(()=>{if(!t||!r.current||i.current)return;let e=window.L;if(!e)return;let n=e.map(r.current,{zoomControl:!0,scrollWheelZoom:!0}).setView([12.977,77.601],14);return i.current=n,e.tileLayer(`https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png`,{maxZoom:19,attribution:`&copy; OpenStreetMap contributors`}).addTo(n),setTimeout(()=>{i.current&&i.current.invalidateSize()},200),()=>{i.current&&(i.current.remove(),i.current=null,a.current=null,o.current=null,s.current=null,c.current=null,l.current=null,u.current=null)}},[t,e?.orderId]);let f=12.9716,p=77.5946,m=12.9821,h=77.6085,g=f,_=p,v=!1;if(e&&e.gpsCoordinates){let t=e.gpsCoordinates.split(`,`);if(t.length===2){let e=parseFloat(t[0]),n=parseFloat(t[1]);!isNaN(e)&&!isNaN(n)&&(g=e,_=n,v=!0)}}if(!v&&e){let t=e.gpsProgress||0,n=[];if(e.status===`OUT_FOR_DELIVERY`||e.status===`Out for Delivery`?e.pathLM1&&e.pathLM1.length>0&&(n=e.pathLM1.map(e=>[e.latitude,e.longitude])):e.pathFM&&e.pathFM.length>0&&(n=e.pathFM.map(e=>[e.latitude,e.longitude])),n.length>0){let e=C(n,t);e&&(g=e[0],_=e[1])}else g=f+t/100*(m-f),_=p+t/100*(h-p)}return(0,b.useEffect)(()=>{if(!t||!i.current)return;let n=i.current,r=window.L;if(!r)return;let d=r.divIcon({html:`<div style="font-size: 24px; text-align: center; line-height: 24px;">🍳</div>`,className:`custom-map-marker-restaurant`,iconSize:[24,24],iconAnchor:[12,12]}),v=r.divIcon({html:`<div style="font-size: 24px; text-align: center; line-height: 24px;">🏠</div>`,className:`custom-map-marker-customer`,iconSize:[24,24],iconAnchor:[12,12]}),y=r.divIcon({html:`<div style="font-size: 28px; text-align: center; line-height: 28px; filter: drop-shadow(0 2px 4px rgba(0,0,0,0.3));">🛵</div>`,className:`custom-map-marker-rider`,iconSize:[28,28],iconAnchor:[14,14]}),b=[f,p],x=[m,h];if(e?.pathFM&&e.pathFM.length>0){let t=e.pathFM[e.pathFM.length-1];b=[t.latitude,t.longitude]}if(e?.pathLM1&&e.pathLM1.length>0){let t=e.pathLM1[e.pathLM1.length-1];x=[t.latitude,t.longitude]}o.current?o.current.setLatLng(b):o.current=r.marker(b,{icon:d}).addTo(n).bindPopup(`<b>ZingBite Kitchen</b>`),s.current?s.current.setLatLng(x):s.current=r.marker(x,{icon:v}).addTo(n).bindPopup(`<b>Customer Address</b>`),a.current?a.current.setLatLng([g,_]):a.current=r.marker([g,_],{icon:y}).addTo(n).bindPopup(`<b>Rider (You)</b>`),c.current&&=(c.current.remove(),null),l.current&&=(l.current.remove(),null),u.current&&=(u.current.remove(),null);let S=!1;if(e?.pathFM&&e.pathFM.length>0){let t=e.pathFM.map(e=>[e.latitude,e.longitude]);l.current=r.polyline(t,{color:`#06b6d4`,weight:4,opacity:.8}).addTo(n),S=!0}if(e?.pathLM1&&e.pathLM1.length>0){let t=e.pathLM1.map(e=>[e.latitude,e.longitude]);u.current=r.polyline(t,{color:`#8b5cf6`,weight:4,opacity:.8,dashArray:`6, 6`}).addTo(n),S=!0}if(!S){let e=[[g,_],b,x];c.current=r.polyline(e,{color:`#8b5cf6`,weight:4,opacity:.7,dashArray:`8, 8`}).addTo(n)}let C=r.latLngBounds([[g,_],b,x]);n.fitBounds(C,{padding:[40,40]})},[t,e?.pathFM,e?.pathLM1,g,_]),(0,x.jsxs)(`div`,{className:`map-wrapper`,style:{height:`200px`,position:`relative`,marginTop:`16px`,borderRadius:`8px`,overflow:`hidden`,border:`1px solid var(--border-medium)`},children:[(0,x.jsx)(`div`,{className:`map-overlay-text`,style:{position:`absolute`,top:`8px`,left:`8px`,background:`rgba(255,255,255,0.9)`,padding:`4px 8px`,borderRadius:`4px`,fontSize:`0.7rem`,fontWeight:700,color:`#8b5cf6`,zIndex:10,boxShadow:`0 2px 4px rgba(0,0,0,0.1)`},children:v?`🔴 LIVE GPS MAP`:`📍 PROJECTED ROUTE MAP`}),(0,x.jsx)(`div`,{ref:r,style:{width:`100%`,height:`100%`,zIndex:1,visibility:t?`visible`:`hidden`}}),!t&&(0,x.jsxs)(`div`,{style:{position:`absolute`,top:0,left:0,width:`100%`,height:`100%`,display:`flex`,flexDirection:`column`,justifyContent:`center`,alignItems:`center`,background:`#f4f6f8`,gap:`8px`,zIndex:5},children:[(0,x.jsx)(d,{size:20,className:`spin`,style:{color:`#8b5cf6`}}),(0,x.jsx)(`span`,{style:{fontSize:`0.75rem`,fontWeight:600,color:`var(--text-secondary)`},children:`Loading Leaflet Interactive Map...`})]})]})},T=()=>{let{user:a,logout:s,loading:l}=(0,b.useContext)(c),m=p(),{showAlert:C}=_(),[T,E]=(0,b.useState)({available:[],active:[],completed:[],totalEarnings:0,completedCount:0}),[D,O]=(0,b.useState)(!0),[k,A]=(0,b.useState)(null),[j,M]=(0,b.useState)({}),[N,P]=(0,b.useState)({}),[F,I]=(0,b.useState)(null),[L,R]=(0,b.useState)(S),[z,B]=(0,b.useState)(S),[V,H]=(0,b.useState)(S),U=(e,t)=>{let n=e-12.9716,r=t-77.5946,i=(n*.010500000000000398+r*.013900000000006685)/.0003034600000001942;return Math.max(0,Math.min(100,i*100))},W=async(e,t,n=null,r=null)=>{try{let a={action:`updateGPS`,orderId:e,progress:t};n!==null&&r!==null&&(a.latitude=n,a.longitude=r);let o=await i.post(`/api/delivery`,a);E(i=>({...i,active:(i.active||[]).map(i=>i.orderId===e?{...i,gpsProgress:t,gpsCoordinates:n===null?i.gpsCoordinates:`${n.toFixed(5)},${r.toFixed(5)}`,pathFM:o.data.pathFM||i.pathFM,pathLM1:o.data.pathLM1||i.pathLM1}:i)}))}catch(e){console.error(`Failed to update GPS progress:`,e)}},G=(e,t=0)=>{if(j[e])clearInterval(j[e]),M(t=>{let n={...t};return delete n[e],n});else{let n=t>=100?0:t,r=setInterval(async()=>{n=Math.min(100,n+5),await W(e,n),n>=100&&(clearInterval(r),M(t=>{let n={...t};return delete n[e],n}))},1200);M(t=>({...t,[e]:r}))}},K=e=>{if(N[e])navigator.geolocation.clearWatch(N[e]),P(t=>{let n={...t};return delete n[e],n});else{if(!navigator.geolocation){C(`Geolocation is not supported by your browser or is blocked in insecure contexts.`,`error`,`Geolocation Blocked/Unsupported`);return}if(window.location.protocol!==`https:`&&window.location.hostname!==`localhost`&&window.location.hostname!==`127.0.0.1`){C(`Real-time device Geolocation API is restricted by modern browsers to Secure Contexts (HTTPS) or localhost.

Since you are accessing via HTTP/IP, please use the 'Auto-Simulation' or manual range slider instead, or run the app on localhost/HTTPS.`,`error`,`Browser Security Block`);return}j[e]&&G(e);let t=navigator.geolocation.watchPosition(t=>{let{latitude:n,longitude:r}=t.coords;W(e,U(n,r),n,r)},t=>{console.error(`Geolocation watch error:`,t),t.code===t.PERMISSION_DENIED?C(`Please allow location access in your browser settings to track live rider coordinates, or use the 'Auto-Simulation' / manual range slider instead.`,`error`,`Geolocation Permission Denied`):C(`Error retrieving geolocation: `+t.message,`error`,`Geolocation Error`),P(t=>{let n={...t};return delete n[e],n})},{enableHighAccuracy:!0,maximumAge:1e3});P(n=>({...n,[e]:t}))}};(0,b.useEffect)(()=>()=>{Object.values(j).forEach(e=>clearInterval(e)),Object.values(N).forEach(e=>navigator.geolocation.clearWatch(e))},[j,N]);let q=async(e=!1)=>{try{E((await i.get(`/api/delivery`)).data)}catch(e){console.error(e)}finally{e||O(!1)}};(0,b.useEffect)(()=>{if(l)return;if(!a){m(`/login?redirect=/delivery`);return}if(a.role!==`delivery_partner`){O(!1);return}q(!1);let e=window.location.pathname.startsWith(`/zingbite`)?`/zingbite/api/stream?topic=rider_orders`:`/api/stream?topic=rider_orders`,t=new EventSource(e);return t.onmessage=e=>{try{console.log(`[ZingBite SSE] Received real-time rider dashboard update`),q(!0)}catch(e){console.error(`[ZingBite SSE] Error on message:`,e)}},t.onerror=e=>{console.error(`[ZingBite SSE] EventSource connection error:`,e)},()=>{t.close()}},[a,l]);let J=async e=>{A(e);try{await i.post(`/api/delivery`,{action:`acceptOrder`,orderId:e}),C(`Delivery run claimed successfully! It is now in your active runs feed.`,`success`,`Claim Run Success`),await q()}catch(e){C(e.response?.data?.error||`Failed to claim delivery run. Please try again.`,`error`,`Claim Run Failed`)}finally{A(null)}},Y=async(e,t)=>{A(e);try{await i.post(`/api/delivery`,{orderId:e,status:t}),await q()}catch{C(`Failed to update status. Please try again.`,`error`,`Status Update Failed`)}finally{A(null)}},X=async()=>{await s(),m(`/login?redirect=/delivery`)},Z=T?.available||[],Q=T?.active||[],$=T?.completed||[],ee=Z.slice(0,L),te=Q.slice(0,z),ne=$.slice(0,V),re=L<Z.length,ie=z<Q.length,ae=V<$.length,oe=e=>{let t=(e=>{switch(e){case`PLACED`:return 0;case`ACCEPTED`:return 0;case`PREPARING`:return 1;case`READY_FOR_PICKUP`:return 2;case`PICKED_UP`:return 3;case`OUT_FOR_DELIVERY`:return 4;case`DELIVERED`:return 5;default:return 0}})(e.status);return(0,x.jsxs)(`div`,{className:`premium-stepper-container`,children:[(0,x.jsx)(`div`,{className:`premium-stepper`,children:[{key:0,label:`Claimed`},{key:1,label:`Cooking`},{key:2,label:`Ready for Pickup`,targetStatus:`PICKED_UP`,actionLabel:`Pick Up`},{key:3,label:`Picked Up`,targetStatus:`OUT_FOR_DELIVERY`,actionLabel:`Start Route`},{key:4,label:`In Transit`,targetStatus:`DELIVERED`,actionLabel:`Deliver`},{key:5,label:`Delivered`}].map((n,r)=>{let i=t>r,a=t===r,o=t<r,s=n.actionLabel&&t===r,c=`stepper-node`;return i&&(c+=` completed`),a&&(c+=` active`),o&&(c+=` pending`),s&&(c+=` actionable`),(0,x.jsxs)(b.Fragment,{children:[r>0&&(0,x.jsx)(`div`,{className:`stepper-line ${i||a?`active`:``}`}),(0,x.jsxs)(`div`,{className:c,children:[s?(0,x.jsxs)(`button`,{disabled:k===e.orderId,onClick:()=>Y(e.orderId,n.targetStatus),className:`stepper-btn-node`,title:n.actionLabel,children:[k===e.orderId?(0,x.jsx)(d,{className:`spin`,size:14}):(0,x.jsx)(u,{size:14}),(0,x.jsx)(`span`,{className:`stepper-btn-label`,children:n.actionLabel})]}):(0,x.jsx)(`div`,{className:`stepper-circle`,children:i?(0,x.jsx)(u,{size:14}):r+1}),(0,x.jsx)(`span`,{className:`stepper-label`,children:n.label})]})]},n.key)})}),t===0&&(0,x.jsx)(`div`,{style:{padding:`8px 12px`,background:`rgba(54,162,235,0.04)`,border:`1px solid rgba(54,162,235,0.1)`,borderRadius:`6px`,marginTop:`16px`,fontSize:`0.78rem`,color:`#36a2eb`,fontWeight:600,textAlign:`center`},children:`Waiting for restaurant to start cooking...`}),t===1&&(0,x.jsx)(`div`,{style:{padding:`8px 12px`,background:`rgba(255,159,64,0.04)`,border:`1px solid rgba(255,159,64,0.1)`,borderRadius:`6px`,marginTop:`16px`,fontSize:`0.78rem`,color:`#ff9f40`,fontWeight:600,textAlign:`center`},children:`Kitchen is preparing the food...`}),t===2&&(0,x.jsx)(`div`,{style:{padding:`8px 12px`,background:`rgba(255,206,86,0.04)`,border:`1px solid rgba(255,206,86,0.1)`,borderRadius:`6px`,marginTop:`16px`,fontSize:`0.78rem`,color:`#e09f00`,fontWeight:600,textAlign:`center`},children:`Food is ready! Click "Pick Up" above when you collect the order from the restaurant.`}),t===3&&(0,x.jsx)(`div`,{style:{padding:`8px 12px`,background:`rgba(153,102,255,0.04)`,border:`1px solid rgba(153,102,255,0.1)`,borderRadius:`6px`,marginTop:`16px`,fontSize:`0.78rem`,color:`#9966ff`,fontWeight:600,textAlign:`center`},children:`Order picked up! Click "Start Route" to begin transit.`}),t===4&&(0,x.jsx)(`div`,{style:{padding:`8px 12px`,background:`rgba(75,192,192,0.04)`,border:`1px solid rgba(75,192,192,0.1)`,borderRadius:`6px`,marginTop:`16px`,fontSize:`0.78rem`,color:`#4bc0c0`,fontWeight:600,textAlign:`center`},children:`In transit! Click "Deliver" above once the package reaches the customer.`})]})};return l||D?(0,x.jsx)(`div`,{style:{display:`flex`,justifyContent:`center`,alignItems:`center`,flex:1,minHeight:`400px`},children:(0,x.jsx)(d,{size:36,style:{animation:`spin 1s linear infinite`,color:`var(--brand-red)`}})}):a&&a.role!==`delivery_partner`?(0,x.jsxs)(`div`,{style:{maxWidth:`600px`,margin:`80px auto`,textAlign:`center`,padding:`32px`,background:`#fff`,border:`1px solid var(--border-medium)`,borderRadius:`12px`,boxShadow:`var(--shadow-md)`},className:`fade-in`,children:[(0,x.jsx)(f,{size:48,style:{color:`var(--brand-red)`,marginBottom:`16px`,margin:`0 auto 16px`}}),(0,x.jsx)(`h3`,{style:{fontSize:`1.4rem`,fontWeight:800},children:`Access Restricted`}),(0,x.jsxs)(`p`,{style:{color:`var(--text-secondary)`,marginTop:`8px`,marginBottom:`24px`},children:[`You do not have permission to access the Delivery Partner Portal. You are currently logged in as a `,(0,x.jsx)(`strong`,{children:a.role}),`.`]}),(0,x.jsxs)(`div`,{style:{display:`flex`,justifyContent:`center`,gap:`12px`},children:[(0,x.jsx)(`button`,{onClick:()=>m(`/login?redirect=/delivery`),className:`action-btn claim`,style:{width:`auto`,marginTop:0,padding:`10px 20px`,borderRadius:`4px`},children:`Switch Account`}),(0,x.jsx)(`button`,{onClick:X,className:`portal-logout-btn`,children:`Logout`})]})]}):(0,x.jsxs)(x.Fragment,{children:[(0,x.jsx)(`style`,{children:`
        .delivery-container {
          max-width: 1200px;
          margin: 32px auto;
          padding: 0 20px;
        }
        .dashboard-header {
          display: flex;
          justify-content: space-between;
          align-items: center;
          margin-bottom: 24px;
        }
        .stats-grid {
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(240px, 1fr));
          gap: 20px;
          margin-bottom: 32px;
        }
        .stat-card {
          background: #fff;
          border: 1px solid var(--border-medium);
          border-radius: var(--radius-md);
          padding: 24px;
          display: flex;
          align-items: center;
          gap: 16px;
          box-shadow: var(--shadow-sm);
        }
        .stat-icon {
          width: 48px;
          height: 48px;
          border-radius: var(--radius-sm);
          display: flex;
          align-items: center;
          justify-content: center;
        }
        .stat-icon.blue { background: rgba(54,162,235,0.08); color: #36a2eb; }
        .stat-icon.green { background: rgba(75,192,192,0.08); color: #4bc0c0; }
        .stat-icon.red { background: rgba(247,55,79,0.08); color: var(--brand-red); }
        .stat-number { font-size: 1.8rem; font-weight: 800; line-height: 1.1; margin-top: 4px; }
        .section-title { font-size: 1.3rem; font-weight: 700; margin-bottom: 16px; margin-top: 32px; }
        .orders-grid {
          display: grid;
          grid-template-columns: repeat(auto-fill, minmax(280px, 1fr));
          gap: 20px;
          margin-bottom: 32px;
        }
        .delivery-card {
          background: #fff;
          border: 1px solid var(--border-medium);
          border-radius: var(--radius-md);
          padding: 20px;
          box-shadow: var(--shadow-sm);
          display: flex;
          flex-direction: column;
          justify-content: space-between;
          position: relative;
        }
        .delivery-card-header {
          display: flex;
          justify-content: space-between;
          align-items: center;
          margin-bottom: 12px;
        }
        .badge {
          padding: 4px 8px;
          border-radius: 4px;
          font-size: 0.72rem;
          font-weight: 700;
          text-transform: uppercase;
        }
        .badge.placed { background: rgba(54,162,235,0.08); color: #36a2eb; }
        .badge.accepted { background: rgba(54,162,235,0.08); color: #36a2eb; }
        .badge.preparing { background: rgba(255,159,64,0.08); color: #ff9f40; }
        .badge.waiting-to-dispatch { background: rgba(255,206,86,0.08); color: #e09f00; }
        .badge.out-for-delivery { background: rgba(153,102,255,0.08); color: #9966ff; }
        .badge.delivered { background: rgba(75,192,192,0.08); color: #4bc0c0; }
        .action-btn {
          width: 100%;
          padding: 12px;
          border: none;
          border-radius: var(--radius-sm);
          font-weight: 700;
          cursor: pointer;
          transition: background 0.2s;
          display: flex;
          align-items: center;
          justify-content: center;
          gap: 8px;
          margin-top: 16px;
        }
        .action-btn.claim { background: var(--brand-red); color: #fff; }
        .action-btn.claim:hover { background: var(--brand-red-hover); }
        .action-btn.start { background: #ff9f40; color: #fff; }
        .action-btn.start:hover { background: #e08b30; }
        .action-btn.out { background: #9966ff; color: #fff; }
        .action-btn.out:hover { background: #804ce6; }
        .action-btn.deliver { background: #4bc0c0; color: #fff; }
        .action-btn.deliver:hover { background: #38b0b0; }
        .empty-state {
          text-align: center;
          padding: 40px;
          border: 1px dashed var(--border-medium);
          border-radius: var(--radius-md);
          color: var(--text-muted);
          background: #fff;
        }
        .loc-box {
          background: var(--bg-surface);
          padding: 10px 14px;
          border-radius: var(--radius-sm);
          margin-top: 12px;
          font-size: 0.82rem;
          color: var(--text-secondary);
        }
        .portal-logout-btn {
          display: flex;
          align-items: center;
          gap: 6px;
          background: none;
          border: 1px solid var(--border-medium);
          color: var(--text-secondary);
          font-weight: 700;
          padding: 8px 16px;
          border-radius: 20px;
          cursor: pointer;
          transition: all 0.25s ease;
        }
        .portal-logout-btn:hover {
          border-color: var(--danger);
          color: var(--danger);
          background: rgba(226, 55, 68, 0.04);
        }
        @media (max-width: 600px) {
          .dashboard-header {
            flex-direction: column;
            align-items: flex-start;
            gap: 12px;
          }
          .dashboard-header span {
            align-self: flex-start;
          }
        }
        
        .premium-stepper-container {
          width: 100%;
          padding: 16px 8px 0;
          margin-top: 16px;
          border-top: 1px dashed var(--border-medium);
        }
        .premium-stepper {
          display: flex;
          align-items: center;
          justify-content: space-between;
          position: relative;
          width: 100%;
        }
        .stepper-line {
          flex: 1;
          height: 3px;
          background: var(--border-medium);
          margin: 0 -8px;
          transform: translateY(-12px);
          transition: background-color 0.3s ease;
        }
        .stepper-line.active {
          background: var(--success);
        }
        .stepper-node {
          display: flex;
          flex-direction: column;
          align-items: center;
          position: relative;
          z-index: 5;
          min-width: 60px;
        }
        .stepper-circle {
          width: 28px;
          height: 28px;
          border-radius: 50%;
          background: white;
          border: 2px solid var(--border-medium);
          display: flex;
          align-items: center;
          justify-content: center;
          font-size: 0.78rem;
          font-weight: 700;
          color: var(--text-muted);
          transition: all 0.3s ease;
        }
        .stepper-node.completed .stepper-circle {
          background: var(--success);
          border-color: var(--success);
          color: white;
        }
        .stepper-node.active .stepper-circle {
          background: white;
          border-color: var(--brand-red);
          color: var(--brand-red);
          box-shadow: 0 0 0 3px rgba(247, 55, 79, 0.15);
          animation: nodePulse 1.5s infinite;
        }
        .stepper-node.pending .stepper-circle {
          background: var(--bg-surface);
          border-color: var(--border-medium);
          color: var(--text-muted);
        }
        .stepper-btn-node {
          display: flex;
          align-items: center;
          gap: 6px;
          background: linear-gradient(135deg, #4bc0c0 0%, #68d8d8 100%);
          color: white;
          border: none;
          padding: 8px 12px;
          border-radius: 20px;
          font-weight: 700;
          font-size: 0.8rem;
          cursor: pointer;
          transform: translateY(-12px);
          box-shadow: 0 4px 10px rgba(75, 192, 192, 0.3);
          transition: all 0.2s ease;
          animation: actionPulseRider 2s infinite;
        }
        .stepper-btn-node:hover {
          transform: translateY(-14px) scale(1.05);
        }
        .stepper-btn-node:disabled {
          background: var(--border-medium);
          box-shadow: none;
          cursor: not-allowed;
        }
        .stepper-btn-label {
          white-space: nowrap;
        }
        .stepper-label {
          font-size: 0.72rem;
          font-weight: 700;
          color: var(--text-muted);
          margin-top: 6px;
          white-space: nowrap;
          text-align: center;
        }
        .stepper-node.completed .stepper-label,
        .stepper-node.active .stepper-label {
          color: var(--text-primary);
        }
        .stepper-node.actionable .stepper-label {
          margin-top: -6px;
          color: var(--text-primary);
        }
        .spin {
          animation: spin 1s linear infinite;
        }
        @keyframes nodePulse {
          0% { box-shadow: 0 0 0 0px rgba(247, 55, 79, 0.3); }
          70% { box-shadow: 0 0 0 6px rgba(247, 55, 79, 0); }
          100% { box-shadow: 0 0 0 0px rgba(247, 55, 79, 0); }
        }
        @keyframes actionPulseRider {
          0% { transform: translateY(-12px) scale(1); }
          50% { transform: translateY(-12px) scale(1.03); box-shadow: 0 6px 14px rgba(75, 192, 192, 0.4); }
          100% { transform: translateY(-12px) scale(1); }
        }

        @media (max-width: 600px) {
          .premium-stepper-container {
            padding: 12px 0 0;
          }
          .stepper-label {
            font-size: 0.65rem;
          }
          .stepper-btn-node {
            padding: 6px 10px;
            font-size: 0.72rem;
          }
        }
      `}),(0,x.jsxs)(`div`,{className:`delivery-container fade-in page-enter`,children:[(0,x.jsxs)(`div`,{className:`dashboard-header`,children:[(0,x.jsxs)(`div`,{children:[(0,x.jsx)(`h1`,{style:{fontSize:`1.8rem`,fontWeight:800},children:`Delivery Partner Portal`}),(0,x.jsxs)(`p`,{style:{color:`var(--text-secondary)`,marginTop:`4px`},children:[`Welcome back, `,a?.userName||`Delivery Rider`,`!`]})]}),(0,x.jsxs)(`div`,{style:{display:`flex`,alignItems:`center`,gap:`12px`},children:[(0,x.jsx)(`span`,{className:`badge out`,style:{padding:`8px 16px`,borderRadius:`20px`,fontWeight:700},children:`ACTIVE RIDER`}),(0,x.jsxs)(`button`,{onClick:X,className:`portal-logout-btn`,children:[(0,x.jsx)(h,{size:16}),` Logout`]})]})]}),(0,x.jsxs)(`div`,{className:`stats-grid`,children:[(0,x.jsxs)(`div`,{className:`stat-card`,children:[(0,x.jsx)(`div`,{className:`stat-icon green`,children:(0,x.jsx)(t,{size:24})}),(0,x.jsxs)(`div`,{children:[(0,x.jsx)(`span`,{style:{fontSize:`0.85rem`,color:`var(--text-muted)`,fontWeight:600},children:`Rider Earnings`}),(0,x.jsxs)(`div`,{className:`stat-number`,children:[`₹`,(T?.totalEarnings??0).toFixed(2)]})]})]}),(0,x.jsxs)(`div`,{className:`stat-card`,children:[(0,x.jsx)(`div`,{className:`stat-icon blue`,children:(0,x.jsx)(u,{size:24})}),(0,x.jsxs)(`div`,{children:[(0,x.jsx)(`span`,{style:{fontSize:`0.85rem`,color:`var(--text-muted)`,fontWeight:600},children:`Completed Trips`}),(0,x.jsx)(`div`,{className:`stat-number`,children:T?.completedCount??0})]})]}),(0,x.jsxs)(`div`,{className:`stat-card`,children:[(0,x.jsx)(`div`,{className:`stat-icon red`,children:(0,x.jsx)(o,{size:24})}),(0,x.jsxs)(`div`,{children:[(0,x.jsx)(`span`,{style:{fontSize:`0.85rem`,color:`var(--text-muted)`,fontWeight:600},children:`Active Runs`}),(0,x.jsx)(`div`,{className:`stat-number`,children:Q.length})]})]})]}),(0,x.jsxs)(`h2`,{className:`section-title`,children:[`Available Delivery Runs (`,Z.length,`)`]}),Z.length===0?(0,x.jsxs)(`div`,{className:`empty-state`,children:[(0,x.jsx)(f,{size:32,style:{margin:`0 auto 12px`,color:`var(--text-muted)`}}),(0,x.jsx)(`p`,{children:`No available delivery runs at the moment. Waiting for new customer orders...`})]}):(0,x.jsxs)(`div`,{className:`orders-grid`,children:[ee.map(e=>(0,x.jsxs)(`div`,{className:`delivery-card`,children:[(0,x.jsxs)(`div`,{children:[(0,x.jsxs)(`div`,{className:`delivery-card-header`,children:[(0,x.jsxs)(`span`,{style:{fontWeight:800},children:[`ID: `,e.formattedId]}),(0,x.jsx)(`span`,{className:`badge placed`,children:`UNCLAIMED`})]}),(0,x.jsx)(`h4`,{style:{fontSize:`1.05rem`,fontWeight:700},children:e.restaurantName}),(0,x.jsx)(`div`,{className:`loc-box`,children:(0,x.jsxs)(`p`,{style:{display:`flex`,alignItems:`center`,gap:`4px`},children:[(0,x.jsx)(g,{size:12,style:{flexShrink:0}}),` Delivery to: `,(0,x.jsx)(`strong`,{children:e.customerAddress})]})}),(0,x.jsxs)(`p`,{style:{fontSize:`0.85rem`,color:`var(--text-secondary)`,marginTop:`12px`},children:[`Payout Incentives: `,(0,x.jsx)(`strong`,{style:{color:`var(--success)`},children:`₹45.00`})]})]}),(0,x.jsx)(`button`,{disabled:k===e.orderId,onClick:()=>J(e.orderId),className:`action-btn claim`,children:k===e.orderId?(0,x.jsx)(d,{size:16,style:{animation:`spin 1s linear infinite`}}):(0,x.jsxs)(x.Fragment,{children:[(0,x.jsx)(v,{size:16}),` ACCEPT RUN`]})})]},e.orderId)),re&&(0,x.jsx)(`div`,{className:`load-more-wrap`,style:{gridColumn:`1 / -1`,margin:`4px auto 0`},children:(0,x.jsxs)(`button`,{type:`button`,className:`load-more-btn`,onClick:()=>R(e=>e+S),children:[`Load more available runs (`,Z.length-L,` left) `,(0,x.jsx)(e,{className:`load-more-icon`,size:16})]})})]}),(0,x.jsxs)(`h2`,{className:`section-title`,children:[`My Active Tasks (`,Q.length,`)`]}),Q.length===0?(0,x.jsx)(`div`,{className:`empty-state`,style:{marginBottom:`32px`},children:(0,x.jsx)(`p`,{children:`No active delivery runs claimed. Accept a run from the feed above!`})}):(0,x.jsxs)(`div`,{className:`orders-grid`,children:[te.map(e=>(0,x.jsxs)(`div`,{className:`delivery-card`,children:[(0,x.jsxs)(`div`,{children:[(0,x.jsxs)(`div`,{className:`delivery-card-header`,children:[(0,x.jsxs)(`span`,{style:{fontWeight:800},children:[`ID: `,e.formattedId]}),(0,x.jsx)(`span`,{className:`badge ${(e.status||``).toLowerCase().replace(/\s+/g,`-`)}`,children:e.status})]}),(0,x.jsx)(`h4`,{style:{fontSize:`1.05rem`,fontWeight:700},children:e.restaurantName}),(0,x.jsxs)(`div`,{className:`loc-box`,style:{background:`#f5f0ff`},children:[(0,x.jsxs)(`p`,{style:{fontWeight:700,marginBottom:`4px`,display:`flex`,justifyContent:`space-between`,alignItems:`center`},children:[(0,x.jsxs)(`span`,{children:[`Customer: `,e.customerName]}),(0,x.jsxs)(`button`,{onClick:()=>I(e.orderId),style:{background:`none`,border:`none`,color:`var(--brand-red)`,cursor:`pointer`,display:`flex`,alignItems:`center`,gap:`4px`,fontSize:`0.78rem`,fontWeight:700},children:[(0,x.jsx)(n,{size:14}),` Chat`]})]}),(0,x.jsxs)(`p`,{style:{display:`flex`,alignItems:`center`,gap:`4px`},children:[(0,x.jsx)(g,{size:12,style:{flexShrink:0}}),` Address: `,e.customerAddress]})]}),(0,x.jsxs)(`p`,{style:{fontSize:`0.85rem`,color:`var(--text-secondary)`,marginTop:`12px`},children:[`Collect Amount: `,(0,x.jsxs)(`strong`,{children:[`₹`,(e.total??0).toFixed(2)]}),` (`,e.payment,`)`]})]}),oe(e),(0,x.jsx)(w,{order:e}),(e.status===`OUT_FOR_DELIVERY`||e.status===`Out for Delivery`)&&(0,x.jsxs)(`div`,{style:{marginTop:`20px`,padding:`16px`,background:`#fcfaff`,border:`1px solid #dcd3ff`,borderRadius:`8px`},children:[(0,x.jsxs)(`h5`,{style:{fontSize:`0.88rem`,fontWeight:700,color:`#9966ff`,display:`flex`,alignItems:`center`,gap:`6px`,marginBottom:`8px`,margin:`0 0 8px 0`},children:[(0,x.jsx)(o,{size:16}),` Live GPS Telemetry & Geolocation`]}),(0,x.jsxs)(`p`,{style:{fontSize:`0.78rem`,color:`var(--text-secondary)`,marginBottom:`12px`,margin:`0 0 12px 0`},children:[`Route Progress: `,(0,x.jsxs)(`strong`,{children:[(e.gpsProgress||0).toFixed(0),`%`]}),j[e.orderId]&&(0,x.jsx)(`span`,{style:{color:`#ff9f40`,fontWeight:700,marginLeft:`8px`},children:`• Auto-Simulating...`}),N[e.orderId]&&(0,x.jsx)(`span`,{style:{color:`#2ec4b6`,fontWeight:700,marginLeft:`8px`},children:`• Live GPS Active...`})]}),e.gpsCoordinates&&(0,x.jsxs)(`p`,{style:{fontSize:`0.75rem`,color:`var(--text-secondary)`,margin:`-6px 0 10px 0`,fontFamily:`monospace`},children:[`Coords: `,e.gpsCoordinates]}),(0,x.jsx)(`div`,{style:{display:`flex`,alignItems:`center`,gap:`10px`,marginBottom:`12px`},children:(0,x.jsx)(`input`,{type:`range`,min:`0`,max:`100`,step:`1`,value:e.gpsProgress||0,onChange:t=>W(e.orderId,parseFloat(t.target.value)),style:{flex:1,accentColor:`#9966ff`,cursor:`pointer`},disabled:!!j[e.orderId]||!!N[e.orderId]})}),(0,x.jsxs)(`div`,{style:{display:`flex`,flexDirection:`column`,gap:`8px`},children:[(0,x.jsx)(`button`,{onClick:()=>G(e.orderId,e.gpsProgress||0),style:{width:`100%`,padding:`8px`,fontSize:`0.78rem`,fontWeight:700,background:j[e.orderId]?`#ff9f40`:`#9966ff`,color:`#fff`,border:`none`,borderRadius:`4px`,cursor:`pointer`,transition:`background 0.2s`,opacity:N[e.orderId]?.5:1},disabled:!!N[e.orderId],children:j[e.orderId]?`STOP AUTO-SIMULATION`:`START AUTO-SIMULATION`}),(0,x.jsxs)(`button`,{onClick:()=>K(e.orderId),style:{width:`100%`,padding:`8px`,fontSize:`0.78rem`,fontWeight:700,background:N[e.orderId]?`#ff4d4f`:`#2ec4b6`,color:`#fff`,border:`none`,borderRadius:`4px`,cursor:`pointer`,transition:`background 0.2s`,display:`flex`,alignItems:`center`,justifyContent:`center`,gap:`6px`},children:[(0,x.jsx)(y,{size:12,className:N[e.orderId]?`animate-pulse`:``}),N[e.orderId]?`STOP WATCHING REAL LOCATION`:`USE REAL GEOLOCATION API`]})]})]})]},e.orderId)),ie&&(0,x.jsx)(`div`,{className:`load-more-wrap`,style:{gridColumn:`1 / -1`,margin:`4px auto 0`},children:(0,x.jsxs)(`button`,{type:`button`,className:`load-more-btn`,onClick:()=>B(e=>e+S),children:[`Load more active tasks (`,Q.length-z,` left) `,(0,x.jsx)(e,{className:`load-more-icon`,size:16})]})})]}),(0,x.jsx)(`h2`,{className:`section-title`,children:`Trip Log (Completed)`}),$.length===0?(0,x.jsx)(`div`,{className:`empty-state`,children:(0,x.jsx)(`p`,{children:`Your completed delivery logs will show up here.`})}):(0,x.jsxs)(`div`,{className:`orders-grid`,children:[ne.map(e=>(0,x.jsxs)(`div`,{className:`delivery-card`,style:{opacity:.8},children:[(0,x.jsxs)(`div`,{children:[(0,x.jsxs)(`div`,{className:`delivery-card-header`,children:[(0,x.jsxs)(`span`,{style:{fontWeight:700,color:`var(--text-muted)`},children:[`ID: `,e.formattedId]}),(0,x.jsx)(`span`,{className:`badge delivered`,children:e.status})]}),(0,x.jsx)(`h4`,{style:{fontSize:`1rem`,color:`var(--text-muted)`,fontWeight:700},children:e.restaurantName}),(0,x.jsxs)(`p`,{style:{fontSize:`0.85rem`,color:`var(--text-muted)`,marginTop:`4px`},children:[`Total Amount: ₹`,(e.total??0).toFixed(2)]})]}),(0,x.jsxs)(`div`,{style:{marginTop:`16px`,fontSize:`0.78rem`,color:`#4bc0c0`,fontWeight:700,display:`flex`,alignItems:`center`,gap:`4px`},children:[(0,x.jsx)(u,{size:12}),` EARNINGS CREDITED (+₹45.00)`]})]},e.orderId)),ae&&(0,x.jsx)(`div`,{className:`load-more-wrap`,style:{gridColumn:`1 / -1`,margin:`4px auto 0`},children:(0,x.jsxs)(`button`,{type:`button`,className:`load-more-btn`,onClick:()=>H(e=>e+S),children:[`Load more completed trips (`,$.length-V,` left) `,(0,x.jsx)(e,{className:`load-more-icon`,size:16})]})})]})]}),F&&(0,x.jsx)(r,{type:`order`,targetId:F,userId:a?.userID||a?.userId,userName:a?.userName||a?.username,receiverId:Q.find(e=>e.orderId===F)?.customerId||0,initialOpen:!0,onClose:()=>I(null)},F)]})};export{T as default};