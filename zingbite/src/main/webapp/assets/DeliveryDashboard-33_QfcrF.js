import{t as e}from"./indian-rupee-CUB8zqXe.js";import{n as t,t as n}from"./ChatWidget-EQ7M9cVI.js";import{A as r,C as i,D as a,E as o,O as s,T as c,f as l,i as u,j as d,m as f,p,t as m,w as h,y as g}from"./index-DA02D76-.js";var _=h(`clipboard-check`,[[`rect`,{width:`8`,height:`4`,x:`8`,y:`2`,rx:`1`,ry:`1`,key:`tgr4d6`}],[`path`,{d:`M16 4h2a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H6a2 2 0 0 1-2-2V6a2 2 0 0 1 2-2h2`,key:`116196`}],[`path`,{d:`m9 14 2 2 4-4`,key:`df797q`}]]),v=h(`navigation`,[[`polygon`,{points:`3 11 22 2 13 21 11 13 3 11`,key:`1ltx0t`}]]),y=d(r(),1),b=o(),x=(e,t)=>{if(!e||e.length===0)return null;if(e.length===1)return e[0];let n=[],r=0;for(let t=0;t<e.length-1;t++){let i=e[t],a=e[t+1],o=a[0]-i[0],s=a[1]-i[1],c=Math.sqrt(o*o+s*s);n.push({from:i,to:a,length:c}),r+=c}if(r===0)return e[0];let i=t/100*r,a=0;for(let e of n){if(a+e.length>=i){let t=e.length>0?(i-a)/e.length:0;return[e.from[0]+(e.to[0]-e.from[0])*t,e.from[1]+(e.to[1]-e.from[1])*t]}a+=e.length}return e[e.length-1]},S=({order:e})=>{let[t,n]=(0,y.useState)(typeof window<`u`&&!!window.L),r=y.useRef(null),i=y.useRef(null),a=y.useRef(null),o=y.useRef(null),s=y.useRef(null),c=y.useRef(null),l=y.useRef(null),u=y.useRef(null);(0,y.useEffect)(()=>{if(window.L){n(!0);return}let e=document.querySelector(`link[href*="leaflet.css"]`);e||(e=document.createElement(`link`),e.rel=`stylesheet`,e.href=`https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.9.4/leaflet.css`,document.head.appendChild(e));let t=document.querySelector(`script[src*="leaflet.js"]`);if(!t)t=document.createElement(`script`),t.src=`https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.9.4/leaflet.js`,t.async=!0,t.onload=()=>{let e=setInterval(()=>{window.L&&(n(!0),clearInterval(e))},50)},document.body.appendChild(t);else{let e=setInterval(()=>{window.L&&(n(!0),clearInterval(e))},50);return()=>clearInterval(e)}},[]),(0,y.useEffect)(()=>{if(!t||!r.current||i.current)return;let e=window.L;if(!e)return;let n=e.map(r.current,{zoomControl:!0,scrollWheelZoom:!0}).setView([12.977,77.601],14);return i.current=n,e.tileLayer(`https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png`,{maxZoom:19,attribution:`&copy; OpenStreetMap contributors`}).addTo(n),setTimeout(()=>{i.current&&i.current.invalidateSize()},200),()=>{i.current&&(i.current.remove(),i.current=null,a.current=null,o.current=null,s.current=null,c.current=null,l.current=null,u.current=null)}},[t,e?.orderId]);let d=12.9716,p=77.5946,m=12.9821,h=77.6085,g=d,_=p,v=!1;if(e&&e.gpsCoordinates){let t=e.gpsCoordinates.split(`,`);if(t.length===2){let e=parseFloat(t[0]),n=parseFloat(t[1]);!isNaN(e)&&!isNaN(n)&&(g=e,_=n,v=!0)}}if(!v&&e){let t=e.gpsProgress||0,n=[];if(e.status===`Out for Delivery`?e.pathLM1&&e.pathLM1.length>0&&(n=e.pathLM1.map(e=>[e.latitude,e.longitude])):e.pathFM&&e.pathFM.length>0&&(n=e.pathFM.map(e=>[e.latitude,e.longitude])),n.length>0){let e=x(n,t);e&&(g=e[0],_=e[1])}else g=d+t/100*(m-d),_=p+t/100*(h-p)}return(0,y.useEffect)(()=>{if(!t||!i.current)return;let n=i.current,r=window.L;if(!r)return;let f=r.divIcon({html:`<div style="font-size: 24px; text-align: center; line-height: 24px;">🍳</div>`,className:`custom-map-marker-restaurant`,iconSize:[24,24],iconAnchor:[12,12]}),v=r.divIcon({html:`<div style="font-size: 24px; text-align: center; line-height: 24px;">🏠</div>`,className:`custom-map-marker-customer`,iconSize:[24,24],iconAnchor:[12,12]}),y=r.divIcon({html:`<div style="font-size: 28px; text-align: center; line-height: 28px; filter: drop-shadow(0 2px 4px rgba(0,0,0,0.3));">🛵</div>`,className:`custom-map-marker-rider`,iconSize:[28,28],iconAnchor:[14,14]}),b=[d,p],x=[m,h];if(e?.pathFM&&e.pathFM.length>0){let t=e.pathFM[e.pathFM.length-1];b=[t.latitude,t.longitude]}if(e?.pathLM1&&e.pathLM1.length>0){let t=e.pathLM1[e.pathLM1.length-1];x=[t.latitude,t.longitude]}o.current?o.current.setLatLng(b):o.current=r.marker(b,{icon:f}).addTo(n).bindPopup(`<b>ZingBite Kitchen</b>`),s.current?s.current.setLatLng(x):s.current=r.marker(x,{icon:v}).addTo(n).bindPopup(`<b>Customer Address</b>`),a.current?a.current.setLatLng([g,_]):a.current=r.marker([g,_],{icon:y}).addTo(n).bindPopup(`<b>Rider (You)</b>`),c.current&&=(c.current.remove(),null),l.current&&=(l.current.remove(),null),u.current&&=(u.current.remove(),null);let S=!1;if(e?.pathFM&&e.pathFM.length>0){let t=e.pathFM.map(e=>[e.latitude,e.longitude]);l.current=r.polyline(t,{color:`#06b6d4`,weight:4,opacity:.8}).addTo(n),S=!0}if(e?.pathLM1&&e.pathLM1.length>0){let t=e.pathLM1.map(e=>[e.latitude,e.longitude]);u.current=r.polyline(t,{color:`#8b5cf6`,weight:4,opacity:.8,dashArray:`6, 6`}).addTo(n),S=!0}if(!S){let e=[[g,_],b,x];c.current=r.polyline(e,{color:`#8b5cf6`,weight:4,opacity:.7,dashArray:`8, 8`}).addTo(n)}let C=r.latLngBounds([[g,_],b,x]);n.fitBounds(C,{padding:[40,40]})},[t,e?.pathFM,e?.pathLM1,g,_]),(0,b.jsxs)(`div`,{className:`map-wrapper`,style:{height:`200px`,position:`relative`,marginTop:`16px`,borderRadius:`8px`,overflow:`hidden`,border:`1px solid var(--border-medium)`},children:[(0,b.jsx)(`div`,{className:`map-overlay-text`,style:{position:`absolute`,top:`8px`,left:`8px`,background:`rgba(255,255,255,0.9)`,padding:`4px 8px`,borderRadius:`4px`,fontSize:`0.7rem`,fontWeight:700,color:`#8b5cf6`,zIndex:10,boxShadow:`0 2px 4px rgba(0,0,0,0.1)`},children:v?`🔴 LIVE GPS MAP`:`📍 PROJECTED ROUTE MAP`}),(0,b.jsx)(`div`,{ref:r,style:{width:`100%`,height:`100%`,zIndex:1,visibility:t?`visible`:`hidden`}}),!t&&(0,b.jsxs)(`div`,{style:{position:`absolute`,top:0,left:0,width:`100%`,height:`100%`,display:`flex`,flexDirection:`column`,justifyContent:`center`,alignItems:`center`,background:`#f4f6f8`,gap:`8px`,zIndex:5},children:[(0,b.jsx)(f,{size:20,className:`spin`,style:{color:`#8b5cf6`}}),(0,b.jsx)(`span`,{style:{fontSize:`0.75rem`,fontWeight:600,color:`var(--text-secondary)`},children:`Loading Leaflet Interactive Map...`})]})]})},C=()=>{let{user:r,logout:o,loading:d}=(0,y.useContext)(c),h=s(),{showAlert:x}=m(),[C,w]=(0,y.useState)({available:[],active:[],completed:[],totalEarnings:0,completedCount:0}),[T,E]=(0,y.useState)(!0),[D,O]=(0,y.useState)(null),[k,A]=(0,y.useState)({}),[j,M]=(0,y.useState)({}),[N,P]=(0,y.useState)(null),F=(e,t)=>{let n=e-12.9716,r=t-77.5946,i=(n*.010500000000000398+r*.013900000000006685)/.0003034600000001942;return Math.max(0,Math.min(100,i*100))},I=async(e,t,n=null,r=null)=>{try{let i={action:`updateGPS`,orderId:e,progress:t};n!==null&&r!==null&&(i.latitude=n,i.longitude=r);let o=await a.post(`/api/delivery`,i);w(i=>({...i,active:(i.active||[]).map(i=>i.orderId===e?{...i,gpsProgress:t,gpsCoordinates:n===null?i.gpsCoordinates:`${n.toFixed(5)},${r.toFixed(5)}`,pathFM:o.data.pathFM||i.pathFM,pathLM1:o.data.pathLM1||i.pathLM1}:i)}))}catch(e){console.error(`Failed to update GPS progress:`,e)}},L=(e,t=0)=>{if(k[e])clearInterval(k[e]),A(t=>{let n={...t};return delete n[e],n});else{let n=t>=100?0:t,r=setInterval(async()=>{n=Math.min(100,n+5),await I(e,n),n>=100&&(clearInterval(r),A(t=>{let n={...t};return delete n[e],n}))},1200);A(t=>({...t,[e]:r}))}},R=e=>{if(j[e])navigator.geolocation.clearWatch(j[e]),M(t=>{let n={...t};return delete n[e],n});else{if(!navigator.geolocation){x(`Geolocation is not supported by your browser or is blocked in insecure contexts.`,`error`,`Geolocation Blocked/Unsupported`);return}if(window.location.protocol!==`https:`&&window.location.hostname!==`localhost`&&window.location.hostname!==`127.0.0.1`){x(`Real-time device Geolocation API is restricted by modern browsers to Secure Contexts (HTTPS) or localhost.

Since you are accessing via HTTP/IP, please use the 'Auto-Simulation' or manual range slider instead, or run the app on localhost/HTTPS.`,`error`,`Browser Security Block`);return}k[e]&&L(e);let t=navigator.geolocation.watchPosition(t=>{let{latitude:n,longitude:r}=t.coords;I(e,F(n,r),n,r)},t=>{console.error(`Geolocation watch error:`,t),t.code===t.PERMISSION_DENIED?x(`Please allow location access in your browser settings to track live rider coordinates, or use the 'Auto-Simulation' / manual range slider instead.`,`error`,`Geolocation Permission Denied`):x(`Error retrieving geolocation: `+t.message,`error`,`Geolocation Error`),M(t=>{let n={...t};return delete n[e],n})},{enableHighAccuracy:!0,maximumAge:1e3});M(n=>({...n,[e]:t}))}};(0,y.useEffect)(()=>()=>{Object.values(k).forEach(e=>clearInterval(e)),Object.values(j).forEach(e=>navigator.geolocation.clearWatch(e))},[k,j]);let z=async(e=!1)=>{try{w((await a.get(`/api/delivery`)).data)}catch(e){console.error(e)}finally{e||E(!1)}};(0,y.useEffect)(()=>{if(d)return;if(!r){h(`/login?redirect=/delivery`);return}if(r.role!==`delivery_partner`){E(!1);return}z(!1);let e=new EventSource(`/api/stream?topic=rider_orders`);return e.onmessage=e=>{try{console.log(`[ZingBite SSE] Received real-time rider dashboard update`),z(!0)}catch(e){console.error(`[ZingBite SSE] Error on message:`,e)}},e.onerror=e=>{console.error(`[ZingBite SSE] EventSource connection error:`,e)},()=>{e.close()}},[r,d]);let B=async e=>{O(e);try{await a.post(`/api/delivery`,{action:`acceptOrder`,orderId:e}),x(`Delivery run claimed successfully! It is now in your active runs feed.`,`success`,`Claim Run Success`),await z()}catch(e){x(e.response?.data?.error||`Failed to claim delivery run. Please try again.`,`error`,`Claim Run Failed`)}finally{O(null)}},V=async(e,t)=>{O(e);try{await a.post(`/api/delivery`,{orderId:e,status:t}),await z()}catch{x(`Failed to update status. Please try again.`,`error`,`Status Update Failed`)}finally{O(null)}},H=async()=>{await o(),h(`/login?redirect=/delivery`)},U=e=>{let t=(e=>{switch(e){case`Placed`:case`Accepted`:return 0;case`Preparing`:return 1;case`Waiting to Dispatch`:return 2;case`Out for Delivery`:return 3;case`Delivered`:return 4;default:return 0}})(e.status);return(0,b.jsxs)(`div`,{className:`premium-stepper-container`,children:[(0,b.jsx)(`div`,{className:`premium-stepper`,children:[{key:0,label:`Claimed`},{key:1,label:`Cooking`},{key:2,label:`Ready`},{key:3,label:`In Transit`,targetStatus:`Delivered`,actionLabel:`Deliver`},{key:4,label:`Delivered`}].map((n,r)=>{let i=t>r,a=t===r,o=t<r,s=r===3&&t===3,c=`stepper-node`;return i&&(c+=` completed`),a&&(c+=` active`),o&&(c+=` pending`),s&&(c+=` actionable`),(0,b.jsxs)(y.Fragment,{children:[r>0&&(0,b.jsx)(`div`,{className:`stepper-line ${i||a?`active`:``}`}),(0,b.jsxs)(`div`,{className:c,children:[s?(0,b.jsxs)(`button`,{disabled:D===e.orderId,onClick:()=>V(e.orderId,`Delivered`),className:`stepper-btn-node`,title:n.actionLabel,children:[D===e.orderId?(0,b.jsx)(f,{className:`spin`,size:14}):(0,b.jsx)(g,{size:14}),(0,b.jsx)(`span`,{className:`stepper-btn-label`,children:n.actionLabel})]}):(0,b.jsx)(`div`,{className:`stepper-circle`,children:i?(0,b.jsx)(g,{size:14}):r+1}),(0,b.jsx)(`span`,{className:`stepper-label`,children:n.label})]})]},n.key)})}),t===0&&(0,b.jsx)(`div`,{style:{padding:`8px 12px`,background:`rgba(54,162,235,0.04)`,border:`1px solid rgba(54,162,235,0.1)`,borderRadius:`6px`,marginTop:`16px`,fontSize:`0.78rem`,color:`#36a2eb`,fontWeight:600,textAlign:`center`},children:`Waiting for restaurant to start cooking...`}),t===1&&(0,b.jsx)(`div`,{style:{padding:`8px 12px`,background:`rgba(255,159,64,0.04)`,border:`1px solid rgba(255,159,64,0.1)`,borderRadius:`6px`,marginTop:`16px`,fontSize:`0.78rem`,color:`#ff9f40`,fontWeight:600,textAlign:`center`},children:`Kitchen is preparing the food...`}),t===2&&(0,b.jsx)(`div`,{style:{padding:`8px 12px`,background:`rgba(255,206,86,0.04)`,border:`1px solid rgba(255,206,86,0.1)`,borderRadius:`6px`,marginTop:`16px`,fontSize:`0.78rem`,color:`#e09f00`,fontWeight:600,textAlign:`center`},children:`Food is ready! Waiting for dispatch...`}),t===3&&(0,b.jsx)(`div`,{style:{padding:`8px 12px`,background:`rgba(75,192,192,0.04)`,border:`1px solid rgba(75,192,192,0.1)`,borderRadius:`6px`,marginTop:`16px`,fontSize:`0.78rem`,color:`#4bc0c0`,fontWeight:600,textAlign:`center`},children:`In transit! Click "Deliver" above to complete.`})]})};return d||T?(0,b.jsx)(`div`,{style:{display:`flex`,justifyContent:`center`,alignItems:`center`,flex:1,minHeight:`400px`},children:(0,b.jsx)(f,{size:36,style:{animation:`spin 1s linear infinite`,color:`var(--brand-red)`}})}):r&&r.role!==`delivery_partner`?(0,b.jsxs)(`div`,{style:{maxWidth:`600px`,margin:`80px auto`,textAlign:`center`,padding:`32px`,background:`#fff`,border:`1px solid var(--border-medium)`,borderRadius:`12px`,boxShadow:`var(--shadow-md)`},className:`fade-in`,children:[(0,b.jsx)(u,{size:48,style:{color:`var(--brand-red)`,marginBottom:`16px`,margin:`0 auto 16px`}}),(0,b.jsx)(`h3`,{style:{fontSize:`1.4rem`,fontWeight:800},children:`Access Restricted`}),(0,b.jsxs)(`p`,{style:{color:`var(--text-secondary)`,marginTop:`8px`,marginBottom:`24px`},children:[`You do not have permission to access the Delivery Partner Portal. You are currently logged in as a `,(0,b.jsx)(`strong`,{children:r.role}),`.`]}),(0,b.jsxs)(`div`,{style:{display:`flex`,justifyContent:`center`,gap:`12px`},children:[(0,b.jsx)(`button`,{onClick:()=>h(`/login?redirect=/delivery`),className:`action-btn claim`,style:{width:`auto`,marginTop:0,padding:`10px 20px`,borderRadius:`4px`},children:`Switch Account`}),(0,b.jsx)(`button`,{onClick:H,className:`portal-logout-btn`,children:`Logout`})]})]}):(0,b.jsxs)(b.Fragment,{children:[(0,b.jsx)(`style`,{children:`
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
      `}),(0,b.jsxs)(`div`,{className:`delivery-container fade-in`,children:[(0,b.jsxs)(`div`,{className:`dashboard-header`,children:[(0,b.jsxs)(`div`,{children:[(0,b.jsx)(`h1`,{style:{fontSize:`1.8rem`,fontWeight:800},children:`Delivery Partner Portal`}),(0,b.jsxs)(`p`,{style:{color:`var(--text-secondary)`,marginTop:`4px`},children:[`Welcome back, `,r?.userName||`Delivery Rider`,`!`]})]}),(0,b.jsxs)(`div`,{style:{display:`flex`,alignItems:`center`,gap:`12px`},children:[(0,b.jsx)(`span`,{className:`badge out`,style:{padding:`8px 16px`,borderRadius:`20px`,fontWeight:700},children:`ACTIVE RIDER`}),(0,b.jsxs)(`button`,{onClick:H,className:`portal-logout-btn`,children:[(0,b.jsx)(p,{size:16}),` Logout`]})]})]}),(0,b.jsxs)(`div`,{className:`stats-grid`,children:[(0,b.jsxs)(`div`,{className:`stat-card`,children:[(0,b.jsx)(`div`,{className:`stat-icon green`,children:(0,b.jsx)(e,{size:24})}),(0,b.jsxs)(`div`,{children:[(0,b.jsx)(`span`,{style:{fontSize:`0.85rem`,color:`var(--text-muted)`,fontWeight:600},children:`Rider Earnings`}),(0,b.jsxs)(`div`,{className:`stat-number`,children:[`₹`,(C?.totalEarnings??0).toFixed(2)]})]})]}),(0,b.jsxs)(`div`,{className:`stat-card`,children:[(0,b.jsx)(`div`,{className:`stat-icon blue`,children:(0,b.jsx)(g,{size:24})}),(0,b.jsxs)(`div`,{children:[(0,b.jsx)(`span`,{style:{fontSize:`0.85rem`,color:`var(--text-muted)`,fontWeight:600},children:`Completed Trips`}),(0,b.jsx)(`div`,{className:`stat-number`,children:C?.completedCount??0})]})]}),(0,b.jsxs)(`div`,{className:`stat-card`,children:[(0,b.jsx)(`div`,{className:`stat-icon red`,children:(0,b.jsx)(i,{size:24})}),(0,b.jsxs)(`div`,{children:[(0,b.jsx)(`span`,{style:{fontSize:`0.85rem`,color:`var(--text-muted)`,fontWeight:600},children:`Active Runs`}),(0,b.jsx)(`div`,{className:`stat-number`,children:(C?.active||[]).length})]})]})]}),(0,b.jsxs)(`h2`,{className:`section-title`,children:[`Available Delivery Runs (`,(C?.available||[]).length,`)`]}),(C?.available||[]).length===0?(0,b.jsxs)(`div`,{className:`empty-state`,children:[(0,b.jsx)(u,{size:32,style:{margin:`0 auto 12px`,color:`var(--text-muted)`}}),(0,b.jsx)(`p`,{children:`No available delivery runs at the moment. Waiting for new customer orders...`})]}):(0,b.jsx)(`div`,{className:`orders-grid`,children:(C?.available||[]).map(e=>(0,b.jsxs)(`div`,{className:`delivery-card`,children:[(0,b.jsxs)(`div`,{children:[(0,b.jsxs)(`div`,{className:`delivery-card-header`,children:[(0,b.jsxs)(`span`,{style:{fontWeight:800},children:[`ID: `,e.formattedId]}),(0,b.jsx)(`span`,{className:`badge placed`,children:`UNCLAIMED`})]}),(0,b.jsx)(`h4`,{style:{fontSize:`1.05rem`,fontWeight:700},children:e.restaurantName}),(0,b.jsx)(`div`,{className:`loc-box`,children:(0,b.jsxs)(`p`,{style:{display:`flex`,alignItems:`center`,gap:`4px`},children:[(0,b.jsx)(l,{size:12,style:{flexShrink:0}}),` Delivery to: `,(0,b.jsx)(`strong`,{children:e.customerAddress})]})}),(0,b.jsxs)(`p`,{style:{fontSize:`0.85rem`,color:`var(--text-secondary)`,marginTop:`12px`},children:[`Payout Incentives: `,(0,b.jsx)(`strong`,{style:{color:`var(--success)`},children:`₹45.00`})]})]}),(0,b.jsx)(`button`,{disabled:D===e.orderId,onClick:()=>B(e.orderId),className:`action-btn claim`,children:D===e.orderId?(0,b.jsx)(f,{size:16,style:{animation:`spin 1s linear infinite`}}):(0,b.jsxs)(b.Fragment,{children:[(0,b.jsx)(_,{size:16}),` ACCEPT RUN`]})})]},e.orderId))}),(0,b.jsxs)(`h2`,{className:`section-title`,children:[`My Active Tasks (`,(C?.active||[]).length,`)`]}),(C?.active||[]).length===0?(0,b.jsx)(`div`,{className:`empty-state`,style:{marginBottom:`32px`},children:(0,b.jsx)(`p`,{children:`No active delivery runs claimed. Accept a run from the feed above!`})}):(0,b.jsx)(`div`,{className:`orders-grid`,children:(C?.active||[]).map(e=>(0,b.jsxs)(`div`,{className:`delivery-card`,children:[(0,b.jsxs)(`div`,{children:[(0,b.jsxs)(`div`,{className:`delivery-card-header`,children:[(0,b.jsxs)(`span`,{style:{fontWeight:800},children:[`ID: `,e.formattedId]}),(0,b.jsx)(`span`,{className:`badge ${(e.status||``).toLowerCase().replace(/\s+/g,`-`)}`,children:e.status})]}),(0,b.jsx)(`h4`,{style:{fontSize:`1.05rem`,fontWeight:700},children:e.restaurantName}),(0,b.jsxs)(`div`,{className:`loc-box`,style:{background:`#f5f0ff`},children:[(0,b.jsxs)(`p`,{style:{fontWeight:700,marginBottom:`4px`,display:`flex`,justifyContent:`space-between`,alignItems:`center`},children:[(0,b.jsxs)(`span`,{children:[`Customer: `,e.customerName]}),(0,b.jsxs)(`button`,{onClick:()=>P(e.orderId),style:{background:`none`,border:`none`,color:`var(--brand-red)`,cursor:`pointer`,display:`flex`,alignItems:`center`,gap:`4px`,fontSize:`0.78rem`,fontWeight:700},children:[(0,b.jsx)(t,{size:14}),` Chat`]})]}),(0,b.jsxs)(`p`,{style:{display:`flex`,alignItems:`center`,gap:`4px`},children:[(0,b.jsx)(l,{size:12,style:{flexShrink:0}}),` Address: `,e.customerAddress]})]}),(0,b.jsxs)(`p`,{style:{fontSize:`0.85rem`,color:`var(--text-secondary)`,marginTop:`12px`},children:[`Collect Amount: `,(0,b.jsxs)(`strong`,{children:[`₹`,(e.total??0).toFixed(2)]}),` (`,e.payment,`)`]})]}),U(e),(0,b.jsx)(S,{order:e}),e.status===`Out for Delivery`&&(0,b.jsxs)(`div`,{style:{marginTop:`20px`,padding:`16px`,background:`#fcfaff`,border:`1px solid #dcd3ff`,borderRadius:`8px`},children:[(0,b.jsxs)(`h5`,{style:{fontSize:`0.88rem`,fontWeight:700,color:`#9966ff`,display:`flex`,alignItems:`center`,gap:`6px`,marginBottom:`8px`,margin:`0 0 8px 0`},children:[(0,b.jsx)(i,{size:16}),` Live GPS Telemetry & Geolocation`]}),(0,b.jsxs)(`p`,{style:{fontSize:`0.78rem`,color:`var(--text-secondary)`,marginBottom:`12px`,margin:`0 0 12px 0`},children:[`Route Progress: `,(0,b.jsxs)(`strong`,{children:[(e.gpsProgress||0).toFixed(0),`%`]}),k[e.orderId]&&(0,b.jsx)(`span`,{style:{color:`#ff9f40`,fontWeight:700,marginLeft:`8px`},children:`• Auto-Simulating...`}),j[e.orderId]&&(0,b.jsx)(`span`,{style:{color:`#2ec4b6`,fontWeight:700,marginLeft:`8px`},children:`• Live GPS Active...`})]}),e.gpsCoordinates&&(0,b.jsxs)(`p`,{style:{fontSize:`0.75rem`,color:`var(--text-secondary)`,margin:`-6px 0 10px 0`,fontFamily:`monospace`},children:[`Coords: `,e.gpsCoordinates]}),(0,b.jsx)(`div`,{style:{display:`flex`,alignItems:`center`,gap:`10px`,marginBottom:`12px`},children:(0,b.jsx)(`input`,{type:`range`,min:`0`,max:`100`,step:`1`,value:e.gpsProgress||0,onChange:t=>I(e.orderId,parseFloat(t.target.value)),style:{flex:1,accentColor:`#9966ff`,cursor:`pointer`},disabled:!!k[e.orderId]||!!j[e.orderId]})}),(0,b.jsxs)(`div`,{style:{display:`flex`,flexDirection:`column`,gap:`8px`},children:[(0,b.jsx)(`button`,{onClick:()=>L(e.orderId,e.gpsProgress||0),style:{width:`100%`,padding:`8px`,fontSize:`0.78rem`,fontWeight:700,background:k[e.orderId]?`#ff9f40`:`#9966ff`,color:`#fff`,border:`none`,borderRadius:`4px`,cursor:`pointer`,transition:`background 0.2s`,opacity:j[e.orderId]?.5:1},disabled:!!j[e.orderId],children:k[e.orderId]?`STOP AUTO-SIMULATION`:`START AUTO-SIMULATION`}),(0,b.jsxs)(`button`,{onClick:()=>R(e.orderId),style:{width:`100%`,padding:`8px`,fontSize:`0.78rem`,fontWeight:700,background:j[e.orderId]?`#ff4d4f`:`#2ec4b6`,color:`#fff`,border:`none`,borderRadius:`4px`,cursor:`pointer`,transition:`background 0.2s`,display:`flex`,alignItems:`center`,justifyContent:`center`,gap:`6px`},children:[(0,b.jsx)(v,{size:12,className:j[e.orderId]?`animate-pulse`:``}),j[e.orderId]?`STOP WATCHING REAL LOCATION`:`USE REAL GEOLOCATION API`]})]})]})]},e.orderId))}),(0,b.jsx)(`h2`,{className:`section-title`,children:`Trip Log (Completed)`}),(C?.completed||[]).length===0?(0,b.jsx)(`div`,{className:`empty-state`,children:(0,b.jsx)(`p`,{children:`Your completed delivery logs will show up here.`})}):(0,b.jsx)(`div`,{className:`orders-grid`,children:(C?.completed||[]).map(e=>(0,b.jsxs)(`div`,{className:`delivery-card`,style:{opacity:.8},children:[(0,b.jsxs)(`div`,{children:[(0,b.jsxs)(`div`,{className:`delivery-card-header`,children:[(0,b.jsxs)(`span`,{style:{fontWeight:700,color:`var(--text-muted)`},children:[`ID: `,e.formattedId]}),(0,b.jsx)(`span`,{className:`badge delivered`,children:e.status})]}),(0,b.jsx)(`h4`,{style:{fontSize:`1rem`,color:`var(--text-muted)`,fontWeight:700},children:e.restaurantName}),(0,b.jsxs)(`p`,{style:{fontSize:`0.85rem`,color:`var(--text-muted)`,marginTop:`4px`},children:[`Total Amount: ₹`,(e.total??0).toFixed(2)]})]}),(0,b.jsxs)(`div`,{style:{marginTop:`16px`,fontSize:`0.78rem`,color:`#4bc0c0`,fontWeight:700,display:`flex`,alignItems:`center`,gap:`4px`},children:[(0,b.jsx)(g,{size:12}),` EARNINGS CREDITED (+₹45.00)`]})]},e.orderId))})]}),N&&(0,b.jsx)(n,{type:`order`,targetId:N,userId:r?.userID||r?.userId,userName:r?.userName||r?.username,receiverId:(C?.active||[]).find(e=>e.orderId===N)?.customerId||0,initialOpen:!0,onClose:()=>P(null)},N)]})};export{C as default};