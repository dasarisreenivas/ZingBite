import{g as e,l as t,n,p as r,t as i}from"./createLucideIcon-DINBtofy.js";import{t as a}from"./axios-DSK6k93e.js";import{t as o}from"./chevron-right-DuqxsEk8.js";import{t as s}from"./indian-rupee-BZVRvDap.js";import{t as c}from"./log-out-aDnYFwjD.js";import{D as l,d as u,o as d,p as f,r as p,u as m,w as h,y as g}from"./index-KKOKVewU.js";import{t as _}from"./ChatWidget-CA1p5IVd.js";import{t as v}from"./useSSE-Cpr_BxbR.js";import{t as y}from"./useLeaflet-ClpI4epd.js";var b=i(`clipboard-check`,[[`rect`,{width:`8`,height:`4`,x:`8`,y:`2`,rx:`1`,ry:`1`,key:`tgr4d6`}],[`path`,{d:`M16 4h2a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H6a2 2 0 0 1-2-2V6a2 2 0 0 1 2-2h2`,key:`116196`}],[`path`,{d:`m9 14 2 2 4-4`,key:`df797q`}]]),x=i(`navigation`,[[`polygon`,{points:`3 11 22 2 13 21 11 13 3 11`,key:`1ltx0t`}]]),S=e(r(),1),C=n(),w=4,T=5e3,E=(e,t)=>{if(!e||e.length===0)return null;if(e.length===1)return e[0];let n=[],r=0;for(let t=0;t<e.length-1;t++){let i=e[t],a=e[t+1],o=a[0]-i[0],s=a[1]-i[1],c=Math.sqrt(o*o+s*s);n.push({from:i,to:a,length:c}),r+=c}if(r===0)return e[0];let i=t/100*r,a=0;for(let e of n){if(a+e.length>=i){let t=e.length>0?(i-a)/e.length:0;return[e.from[0]+(e.to[0]-e.from[0])*t,e.from[1]+(e.to[1]-e.from[1])*t]}a+=e.length}return e[e.length-1]},D=S.memo(({order:e})=>{let{leafletLoaded:t,L:n}=y(),r=S.useRef(null),i=S.useRef(null),a=S.useRef(null),o=S.useRef(null),s=S.useRef(null),c=S.useRef(null),l=S.useRef(null),u=S.useRef(null);(0,S.useEffect)(()=>{if(!t||!r.current||i.current||!n)return;let e=n.map(r.current,{zoomControl:!0,scrollWheelZoom:!0}).setView([12.977,77.601],14);return i.current=e,n.tileLayer(`https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png`,{maxZoom:19,attribution:`&copy; OpenStreetMap contributors`}).addTo(e),setTimeout(()=>{i.current&&i.current.invalidateSize()},200),()=>{i.current&&(i.current.remove(),i.current=null,a.current=null,o.current=null,s.current=null,c.current=null,l.current=null,u.current=null)}},[t,e?.orderId,n]);let d=12.9716,p=77.5946,m=12.9821,h=77.6085,g=d,_=p,v=!1;if(e&&e.gpsCoordinates){let t=e.gpsCoordinates.split(`,`);if(t.length===2){let e=parseFloat(t[0]),n=parseFloat(t[1]);!isNaN(e)&&!isNaN(n)&&(g=e,_=n,v=!0)}}if(!v&&e){let t=e.gpsProgress||0,n=[];if(e.status===`OUT_FOR_DELIVERY`||e.status===`Out for Delivery`?e.pathLM1&&e.pathLM1.length>0&&(n=e.pathLM1.map(e=>[e.latitude,e.longitude])):e.pathFM&&e.pathFM.length>0&&(n=e.pathFM.map(e=>[e.latitude,e.longitude])),n.length>0){let e=E(n,t);e&&(g=e[0],_=e[1])}else g=d+t/100*(m-d),_=p+t/100*(h-p)}return(0,S.useEffect)(()=>{if(!t||!i.current)return;let r=i.current;if(!n)return;let f=n.divIcon({html:`<div style="font-size: 24px; text-align: center; line-height: 24px;">🍳</div>`,className:`custom-map-marker-restaurant`,iconSize:[24,24],iconAnchor:[12,12]}),v=n.divIcon({html:`<div style="font-size: 24px; text-align: center; line-height: 24px;">🏠</div>`,className:`custom-map-marker-customer`,iconSize:[24,24],iconAnchor:[12,12]}),y=n.divIcon({html:`<div style="font-size: 28px; text-align: center; line-height: 28px; filter: drop-shadow(0 2px 4px rgba(0,0,0,0.3));">🛵</div>`,className:`custom-map-marker-rider`,iconSize:[28,28],iconAnchor:[14,14]}),b=[d,p],x=[m,h];if(e?.pathFM&&e.pathFM.length>0){let t=e.pathFM[e.pathFM.length-1];b=[t.latitude,t.longitude]}if(e?.pathLM1&&e.pathLM1.length>0){let t=e.pathLM1[e.pathLM1.length-1];x=[t.latitude,t.longitude]}o.current?o.current.setLatLng(b):o.current=n.marker(b,{icon:f}).addTo(r).bindPopup(`<b>ZingBite Kitchen</b>`),s.current?s.current.setLatLng(x):s.current=n.marker(x,{icon:v}).addTo(r).bindPopup(`<b>Customer Address</b>`),a.current?a.current.setLatLng([g,_]):a.current=n.marker([g,_],{icon:y}).addTo(r).bindPopup(`<b>Rider (You)</b>`),c.current&&=(c.current.remove(),null),l.current&&=(l.current.remove(),null),u.current&&=(u.current.remove(),null);let S=!1;if(e?.pathFM&&e.pathFM.length>0){let t=e.pathFM.map(e=>[e.latitude,e.longitude]);l.current=n.polyline(t,{color:`#06b6d4`,weight:4,opacity:.8}).addTo(r),S=!0}if(e?.pathLM1&&e.pathLM1.length>0){let t=e.pathLM1.map(e=>[e.latitude,e.longitude]);u.current=n.polyline(t,{color:`#8b5cf6`,weight:4,opacity:.8,dashArray:`6, 6`}).addTo(r),S=!0}if(!S){let e=[[g,_],b,x];c.current=n.polyline(e,{color:`#8b5cf6`,weight:4,opacity:.7,dashArray:`8, 8`}).addTo(r)}let C=n.latLngBounds([[g,_],b,x]);r.fitBounds(C,{padding:[40,40]})},[t,e?.pathFM,e?.pathLM1,g,_,e?.orderId,e?.gpsCoordinates,e?.status,e?.gpsProgress,n]),(0,C.jsxs)(`div`,{className:`map-wrapper`,style:(0,S.useMemo)(()=>({height:`200px`,position:`relative`,marginTop:`16px`,borderRadius:`8px`,overflow:`hidden`,border:`1px solid var(--border-medium)`}),[]),children:[(0,C.jsx)(`div`,{className:`map-overlay-text`,style:{position:`absolute`,top:`8px`,left:`8px`,background:`rgba(255,255,255,0.9)`,padding:`4px 8px`,borderRadius:`4px`,fontSize:`0.7rem`,fontWeight:700,color:`#8b5cf6`,zIndex:10,boxShadow:`0 2px 4px rgba(0,0,0,0.1)`},children:v?`🔴 LIVE GPS MAP`:`📍 PROJECTED ROUTE MAP`}),t&&(0,C.jsx)(`div`,{ref:r,style:{width:`100%`,height:`100%`,zIndex:1}}),!t&&(0,C.jsxs)(`div`,{style:{position:`absolute`,top:0,left:0,width:`100%`,height:`100%`,display:`flex`,flexDirection:`column`,justifyContent:`center`,alignItems:`center`,background:`#f4f6f8`,gap:`8px`,zIndex:5},children:[(0,C.jsx)(f,{size:20,className:`spin`,style:{color:`#8b5cf6`}}),(0,C.jsx)(`span`,{style:{fontSize:`0.75rem`,fontWeight:600,color:`var(--text-secondary)`},children:`Loading Leaflet Interactive Map...`})]})]})}),O=()=>{let{user:e,logout:n,loading:r}=(0,S.useContext)(l),i=t(),{showAlert:y}=p(),[E,O]=(0,S.useState)({available:[],active:[],completed:[],totalEarnings:0,completedCount:0}),[ee,k]=(0,S.useState)(!0),[A,j]=(0,S.useState)(null),[M,N]=(0,S.useState)({}),[P,F]=(0,S.useState)({}),[I,L]=(0,S.useState)(null),[R,z]=(0,S.useState)(w),[B,te]=(0,S.useState)(w),[V,ne]=(0,S.useState)(w),[H,U]=(0,S.useState)(`tasks`),[W,re]=(0,S.useState)(``),[G,ie]=(0,S.useState)({}),ae=(e,t)=>{let n=e-12.9716,r=t-77.5946,i=(n*.010500000000000398+r*.013900000000006685)/.0003034600000001942;return Math.max(0,Math.min(100,i*100))},K=async(e,t,n=null,r=null)=>{try{let i={action:`updateGPS`,orderId:e,progress:t};n!==null&&r!==null&&(i.latitude=n,i.longitude=r);let o=await a.post(`/api/delivery`,i);O(i=>({...i,active:(i.active||[]).map(i=>i.orderId===e?{...i,gpsProgress:t,gpsCoordinates:n===null?i.gpsCoordinates:`${n.toFixed(5)},${r.toFixed(5)}`,pathFM:o.data.pathFM||i.pathFM,pathLM1:o.data.pathLM1||i.pathLM1}:i)}))}catch(e){console.error(`Failed to update GPS progress:`,e)}},q=(e,t=0)=>{if(M[e])clearInterval(M[e]),N(t=>{let n={...t};return delete n[e],n});else{let n=t>=100?0:t,r=setInterval(async()=>{n=Math.min(100,n+5),await K(e,n),n>=100&&(clearInterval(r),N(t=>{let n={...t};return delete n[e],n}))},1200);N(t=>({...t,[e]:r}))}},oe=e=>{if(P[e])navigator.geolocation.clearWatch(P[e]),F(t=>{let n={...t};return delete n[e],n});else{if(!navigator.geolocation){y(`Geolocation is not supported by your browser or is blocked in insecure contexts.`,`error`,`Geolocation Blocked/Unsupported`);return}if(window.location.protocol!==`https:`&&window.location.hostname!==`localhost`&&window.location.hostname!==`127.0.0.1`){y(`Real-time device Geolocation API is restricted by modern browsers to Secure Contexts (HTTPS) or localhost.

Since you are accessing via HTTP/IP, please use the 'Auto-Simulation' or manual range slider instead, or run the app on localhost/HTTPS.`,`error`,`Browser Security Block`);return}M[e]&&q(e);let t=navigator.geolocation.watchPosition(t=>{let{latitude:n,longitude:r}=t.coords;K(e,ae(n,r),n,r)},t=>{console.error(`Geolocation watch error:`,t),t.code===t.PERMISSION_DENIED?y(`Please allow location access in your browser settings to track live rider coordinates, or use the 'Auto-Simulation' / manual range slider instead.`,`error`,`Geolocation Permission Denied`):y(`Error retrieving geolocation: `+t.message,`error`,`Geolocation Error`),F(t=>{let n={...t};return delete n[e],n})},{enableHighAccuracy:!0,maximumAge:1e3});F(n=>({...n,[e]:t}))}};(0,S.useEffect)(()=>()=>{Object.values(M).forEach(e=>clearInterval(e)),Object.values(P).forEach(e=>navigator.geolocation.clearWatch(e))},[M,P]);let J=async(e=!1)=>{try{O((await a.get(`/api/delivery`)).data)}catch(e){console.error(e)}finally{e||k(!1)}},Y=(0,S.useRef)(0);(0,S.useCallback)((e=!1)=>{let t=Date.now();e&&t-Y.current<T||(Y.current=t,J(e))},[]),(0,S.useEffect)(()=>{if(!r){if(!e){i(`/login?redirect=/delivery`);return}if(e.role!==`delivery_partner`){k(!1);return}J(!1)}},[e,r]);let se=window.location.pathname.startsWith(`/zingbite`)?`/zingbite/api/stream?topic=rider_orders`:`/api/stream?topic=rider_orders`;v(e?se:null,t=>{try{let n=JSON.parse(t.data);if(console.log(`[ZingBite SSE] Received real-time rider dashboard update:`,n),n&&(n.event===`new_order`||n.event===`new_request`)){try{let e=new Audio(`https://assets.mixkit.co/active_storage/sfx/2869/2869-84.wav`);e.volume=.5,e.play()}catch{}J(!0)}else if(n&&n.orderId)if(n.event===`rider_accepted`)e&&n.riderId===e.userID?J(!0):O(e=>({...e,available:e.available.filter(e=>e.orderId!==n.orderId)}));else{try{let e=new Audio(`https://assets.mixkit.co/active_storage/sfx/2019/2019-84.wav`);e.volume=.4,e.play()}catch{}O(e=>({...e,active:e.active.map(e=>e.orderId===n.orderId?{...e,status:n.status}:e),available:e.available.map(e=>e.orderId===n.orderId?{...e,status:n.status}:e)}))}}catch(e){console.error(`[ZingBite SSE] Error on message:`,e)}},{enabled:!!e});let ce=async e=>{try{j(e),await a.post(`/api/delivery`,{action:`acceptOrder`,orderId:e},{timeout:15e3}),y(`Delivery run claimed successfully! It is now in your active runs feed.`,`success`,`Claim Run Success`),await J()}catch(e){y(e.response?.data?.error||`Failed to claim delivery run. Please try again.`,`error`,`Claim Run Failed`)}finally{j(null)}},le=async(e,t)=>{try{j(e),await a.post(`/api/delivery`,{orderId:e,status:t},{timeout:15e3}),await J()}catch(e){y(`Failed to update status: `+(e.response?.data?.error||e.message||`Request failed`),`error`,`Status Update Failed`)}finally{j(null)}},X=async()=>{await n(),i(`/login?redirect=/delivery`)},Z=E?.available||[],Q=E?.active||[],$=E?.completed||[],ue=(0,S.useMemo)(()=>Z.slice(0,R),[Z,R]),de=(0,S.useMemo)(()=>Q.slice(0,B),[Q,B]);(0,S.useMemo)(()=>$.slice(0,V),[$,V]);let fe=R<Z.length,pe=B<Q.length;$.length;let me=e=>{let t=(e=>{switch(e){case`PLACED`:return 0;case`ACCEPTED`:return 0;case`PREPARING`:return 1;case`READY_FOR_PICKUP`:return 2;case`PICKED_UP`:return 3;case`OUT_FOR_DELIVERY`:return 4;case`DELIVERED`:return 5;default:return 0}})(e.status);return(0,C.jsxs)(`div`,{className:`premium-stepper-container`,children:[(0,C.jsx)(`div`,{className:`premium-stepper`,children:[{key:0,label:`Claimed`},{key:1,label:`Cooking`},{key:2,label:`Ready for Pickup`,targetStatus:`PICKED_UP`,actionLabel:`Pick Up`},{key:3,label:`Picked Up`,targetStatus:`OUT_FOR_DELIVERY`,actionLabel:`Start Route`},{key:4,label:`In Transit`,targetStatus:`DELIVERED`,actionLabel:`Deliver`},{key:5,label:`Delivered`}].map((n,r)=>{let i=t>r,a=t===r,o=t<r,s=n.actionLabel&&t===r,c=`stepper-node`;return i&&(c+=` completed`),a&&(c+=` active`),o&&(c+=` pending`),s&&(c+=` actionable`),(0,C.jsxs)(S.Fragment,{children:[r>0&&(0,C.jsx)(`div`,{className:`stepper-line ${i||a?`active`:``}`}),(0,C.jsxs)(`div`,{className:c,children:[s?(0,C.jsxs)(`button`,{disabled:A===e.orderId,onClick:()=>le(e.orderId,n.targetStatus),className:`stepper-btn-node`,title:n.actionLabel,children:[A===e.orderId?(0,C.jsx)(f,{className:`spin`,size:14}):(0,C.jsx)(g,{size:14}),(0,C.jsx)(`span`,{className:`stepper-btn-label`,children:n.actionLabel})]}):(0,C.jsx)(`div`,{className:`stepper-circle`,children:i?(0,C.jsx)(g,{size:14}):r+1}),(0,C.jsx)(`span`,{className:`stepper-label`,children:n.label})]})]},n.key)})}),t===0&&(0,C.jsx)(`div`,{style:{padding:`8px 12px`,background:`rgba(54,162,235,0.04)`,border:`1px solid rgba(54,162,235,0.1)`,borderRadius:`6px`,marginTop:`16px`,fontSize:`0.78rem`,color:`#36a2eb`,fontWeight:600,textAlign:`center`},children:`Waiting for restaurant to start cooking...`}),t===1&&(0,C.jsx)(`div`,{style:{padding:`8px 12px`,background:`rgba(255,159,64,0.04)`,border:`1px solid rgba(255,159,64,0.1)`,borderRadius:`6px`,marginTop:`16px`,fontSize:`0.78rem`,color:`#ff9f40`,fontWeight:600,textAlign:`center`},children:`Kitchen is preparing the food...`}),t===2&&(0,C.jsx)(`div`,{style:{padding:`8px 12px`,background:`rgba(255,206,86,0.04)`,border:`1px solid rgba(255,206,86,0.1)`,borderRadius:`6px`,marginTop:`16px`,fontSize:`0.78rem`,color:`#e09f00`,fontWeight:600,textAlign:`center`},children:`Food is ready! Click "Pick Up" above when you collect the order from the restaurant.`}),t===3&&(0,C.jsx)(`div`,{style:{padding:`8px 12px`,background:`rgba(153,102,255,0.04)`,border:`1px solid rgba(153,102,255,0.1)`,borderRadius:`6px`,marginTop:`16px`,fontSize:`0.78rem`,color:`#9966ff`,fontWeight:600,textAlign:`center`},children:`Order picked up! Click "Start Route" to begin transit.`}),t===4&&(0,C.jsx)(`div`,{style:{padding:`8px 12px`,background:`rgba(75,192,192,0.04)`,border:`1px solid rgba(75,192,192,0.1)`,borderRadius:`6px`,marginTop:`16px`,fontSize:`0.78rem`,color:`#4bc0c0`,fontWeight:600,textAlign:`center`},children:`In transit! Click "Deliver" above once the package reaches the customer.`})]})};return r||ee?(0,C.jsx)(`div`,{style:{display:`flex`,justifyContent:`center`,alignItems:`center`,flex:1,minHeight:`400px`},children:(0,C.jsx)(f,{size:36,style:{animation:`spin 1s linear infinite`,color:`var(--brand-red)`}})}):e&&e.role!==`delivery_partner`?(0,C.jsxs)(`div`,{style:{maxWidth:`600px`,margin:`80px auto`,textAlign:`center`,padding:`32px`,background:`#fff`,border:`1px solid var(--border-medium)`,borderRadius:`12px`,boxShadow:`var(--shadow-md)`},className:`fade-in`,children:[(0,C.jsx)(d,{size:48,style:{color:`var(--brand-red)`,marginBottom:`16px`,margin:`0 auto 16px`}}),(0,C.jsx)(`h3`,{style:{fontSize:`1.4rem`,fontWeight:800},children:`Access Restricted`}),(0,C.jsxs)(`p`,{style:{color:`var(--text-secondary)`,marginTop:`8px`,marginBottom:`24px`},children:[`You do not have permission to access the Delivery Partner Portal. You are currently logged in as a `,(0,C.jsx)(`strong`,{children:e.role}),`.`]}),(0,C.jsxs)(`div`,{style:{display:`flex`,justifyContent:`center`,gap:`12px`},children:[(0,C.jsx)(`button`,{onClick:()=>i(`/login?redirect=/delivery`),className:`action-btn claim`,style:{width:`auto`,marginTop:0,padding:`10px 20px`,borderRadius:`4px`},children:`Switch Account`}),(0,C.jsx)(`button`,{onClick:X,className:`portal-logout-btn`,children:`Logout`})]})]}):(0,C.jsxs)(C.Fragment,{children:[(0,C.jsx)(`style`,{children:`
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

        @media (max-width: 640px) {
          .premium-stepper-container {
            padding: 12px 0 0;
          }
          .premium-stepper {
            flex-direction: column;
            align-items: flex-start;
            gap: 12px;
          }
          .stepper-line {
            width: 3px !important;
            height: 16px !important;
            margin: 4px 0 4px 12px !important;
            transform: none !important;
            flex: none !important;
          }
          .stepper-node {
            flex-direction: row !important;
            align-items: center !important;
            gap: 12px !important;
            min-width: 0 !important;
          }
          .stepper-btn-node {
            transform: none !important;
            margin: 0 !important;
            animation: none !important;
          }
          .stepper-btn-node:hover {
            transform: scale(1.05) !important;
          }
          .stepper-label {
            margin: 0 !important;
            text-align: left !important;
            font-size: 0.8rem !important;
            display: block !important;
          }
        }
        @media (max-width: 480px) {
          .stepper-circle {
            width: 24px !important;
            height: 24px !important;
            font-size: 0.7rem !important;
          }
          .stepper-line {
            margin: 2px 0 2px 10px !important;
          }
          .stepper-btn-node {
            padding: 6px 10px !important;
            font-size: 0.72rem !important;
          }
        }
      `}),(0,C.jsxs)(`div`,{className:`delivery-container fade-in page-enter`,children:[(0,C.jsxs)(`div`,{className:`dashboard-header`,children:[(0,C.jsxs)(`div`,{children:[(0,C.jsx)(`h1`,{style:{fontSize:`1.8rem`,fontWeight:800},children:`Delivery Partner Portal`}),(0,C.jsxs)(`p`,{style:{color:`var(--text-secondary)`,marginTop:`4px`},children:[`Welcome back, `,e?.userName||`Delivery Rider`,`!`]})]}),(0,C.jsxs)(`div`,{style:{display:`flex`,alignItems:`center`,gap:`12px`},children:[(0,C.jsx)(`span`,{className:`badge out`,style:{padding:`8px 16px`,borderRadius:`20px`,fontWeight:700},children:`ACTIVE RIDER`}),(0,C.jsxs)(`button`,{onClick:X,className:`portal-logout-btn`,children:[(0,C.jsx)(c,{size:16}),` Logout`]})]})]}),(0,C.jsxs)(`div`,{className:`stats-grid`,children:[(0,C.jsxs)(`div`,{className:`stat-card`,children:[(0,C.jsx)(`div`,{className:`stat-icon green`,children:(0,C.jsx)(s,{size:24})}),(0,C.jsxs)(`div`,{children:[(0,C.jsx)(`span`,{style:{fontSize:`0.85rem`,color:`var(--text-muted)`,fontWeight:600},children:`Rider Earnings`}),(0,C.jsxs)(`div`,{className:`stat-number`,children:[`₹`,(E?.totalEarnings??0).toFixed(2)]})]})]}),(0,C.jsxs)(`div`,{className:`stat-card`,children:[(0,C.jsx)(`div`,{className:`stat-icon blue`,children:(0,C.jsx)(g,{size:24})}),(0,C.jsxs)(`div`,{children:[(0,C.jsx)(`span`,{style:{fontSize:`0.85rem`,color:`var(--text-muted)`,fontWeight:600},children:`Completed Trips`}),(0,C.jsx)(`div`,{className:`stat-number`,children:E?.completedCount??0})]})]}),(0,C.jsxs)(`div`,{className:`stat-card`,children:[(0,C.jsx)(`div`,{className:`stat-icon red`,children:(0,C.jsx)(h,{size:24})}),(0,C.jsxs)(`div`,{children:[(0,C.jsx)(`span`,{style:{fontSize:`0.85rem`,color:`var(--text-muted)`,fontWeight:600},children:`Active Runs`}),(0,C.jsx)(`div`,{className:`stat-number`,children:Q.length})]})]})]}),(0,C.jsxs)(`div`,{className:`tab-bar`,style:{display:`flex`,borderBottom:`2px solid var(--border-light)`,marginBottom:`24px`,gap:`24px`},children:[(0,C.jsx)(`button`,{className:`tab-btn ${H===`tasks`?`active`:``}`,onClick:()=>U(`tasks`),style:{background:`none`,border:`none`,padding:`12px 4px`,fontWeight:700,fontSize:`1rem`,color:H===`tasks`?`var(--brand-red)`:`var(--text-secondary)`,cursor:`pointer`,position:`relative`,borderBottom:H===`tasks`?`2px solid var(--brand-red)`:`none`,marginBottom:`-2px`},children:`Delivery Tasks`}),(0,C.jsx)(`button`,{className:`tab-btn ${H===`earnings`?`active`:``}`,onClick:()=>U(`earnings`),style:{background:`none`,border:`none`,padding:`12px 4px`,fontWeight:700,fontSize:`1rem`,color:H===`earnings`?`var(--brand-red)`:`var(--text-secondary)`,cursor:`pointer`,position:`relative`,borderBottom:H===`earnings`?`2px solid var(--brand-red)`:`none`,marginBottom:`-2px`},children:`Earnings Tracker`})]}),H===`tasks`&&(0,C.jsxs)(C.Fragment,{children:[(0,C.jsxs)(`h2`,{className:`section-title`,children:[`Available Delivery Runs (`,Z.length,`)`]}),Z.length===0?(0,C.jsxs)(`div`,{className:`empty-state`,children:[(0,C.jsx)(d,{size:32,style:{margin:`0 auto 12px`,color:`var(--text-muted)`}}),(0,C.jsx)(`p`,{children:`No available delivery runs at the moment. Waiting for new customer orders...`})]}):(0,C.jsxs)(`div`,{className:`orders-grid`,children:[ue.map(e=>(0,C.jsxs)(`div`,{className:`delivery-card`,children:[(0,C.jsxs)(`div`,{children:[(0,C.jsxs)(`div`,{className:`delivery-card-header`,children:[(0,C.jsxs)(`span`,{style:{fontWeight:800},children:[`ID: `,e.formattedId]}),(0,C.jsx)(`span`,{className:`badge placed`,children:`UNCLAIMED`})]}),(0,C.jsx)(`h4`,{style:{fontSize:`1.05rem`,fontWeight:700},children:e.restaurantName}),(0,C.jsx)(`div`,{className:`loc-box`,children:(0,C.jsxs)(`p`,{style:{display:`flex`,alignItems:`center`,gap:`4px`},children:[(0,C.jsx)(u,{size:12,style:{flexShrink:0}}),` Delivery to: `,(0,C.jsx)(`strong`,{children:e.customerAddress})]})}),(0,C.jsxs)(`p`,{style:{fontSize:`0.85rem`,color:`var(--text-secondary)`,marginTop:`12px`},children:[`Payout Incentives: `,(0,C.jsx)(`strong`,{style:{color:`var(--success)`},children:`₹45.00`})]})]}),(0,C.jsx)(`button`,{disabled:A===e.orderId,onClick:()=>ce(e.orderId),className:`action-btn claim`,children:A===e.orderId?(0,C.jsx)(f,{size:16,style:{animation:`spin 1s linear infinite`}}):(0,C.jsxs)(C.Fragment,{children:[(0,C.jsx)(b,{size:16}),` ACCEPT RUN`]})})]},e.orderId)),fe&&(0,C.jsx)(`div`,{className:`load-more-wrap`,style:{gridColumn:`1 / -1`,margin:`4px auto 0`},children:(0,C.jsxs)(`button`,{type:`button`,className:`load-more-btn`,onClick:()=>z(e=>e+w),children:[`Load more available runs (`,Z.length-R,` left) `,(0,C.jsx)(o,{className:`load-more-icon`,size:16})]})})]}),(0,C.jsxs)(`h2`,{className:`section-title`,children:[`My Active Tasks (`,Q.length,`)`]}),Q.length===0?(0,C.jsx)(`div`,{className:`empty-state`,style:{marginBottom:`32px`},children:(0,C.jsx)(`p`,{children:`No active delivery runs claimed. Accept a run from the feed above!`})}):(0,C.jsxs)(`div`,{className:`orders-grid`,children:[de.map(e=>(0,C.jsxs)(`div`,{className:`delivery-card`,children:[(0,C.jsxs)(`div`,{children:[(0,C.jsxs)(`div`,{className:`delivery-card-header`,children:[(0,C.jsxs)(`span`,{style:{fontWeight:800},children:[`ID: `,e.formattedId]}),(0,C.jsx)(`span`,{className:`badge ${(e.status||``).toLowerCase().replace(/\s+/g,`-`)}`,children:e.status})]}),(0,C.jsx)(`h4`,{style:{fontSize:`1.05rem`,fontWeight:700},children:e.restaurantName}),(0,C.jsxs)(`div`,{className:`loc-box`,style:{background:`#f5f0ff`},children:[(0,C.jsxs)(`p`,{style:{fontWeight:700,marginBottom:`4px`,display:`flex`,justifyContent:`space-between`,alignItems:`center`},children:[(0,C.jsxs)(`span`,{children:[`Customer: `,e.customerName]}),(0,C.jsxs)(`button`,{onClick:()=>L(e.orderId),style:{background:`none`,border:`none`,color:`var(--brand-red)`,cursor:`pointer`,display:`flex`,alignItems:`center`,gap:`4px`,fontSize:`0.78rem`,fontWeight:700},children:[(0,C.jsx)(m,{size:14}),` Chat`]})]}),(0,C.jsxs)(`p`,{style:{display:`flex`,alignItems:`center`,gap:`4px`},children:[(0,C.jsx)(u,{size:12,style:{flexShrink:0}}),` Address: `,e.customerAddress]})]}),(0,C.jsxs)(`p`,{style:{fontSize:`0.85rem`,color:`var(--text-secondary)`,marginTop:`12px`},children:[`Collect Amount: `,(0,C.jsxs)(`strong`,{children:[`₹`,(e.total??0).toFixed(2)]}),` (`,e.payment,`)`]})]}),me(e),(0,C.jsx)(D,{order:e}),(e.status===`OUT_FOR_DELIVERY`||e.status===`Out for Delivery`)&&(0,C.jsxs)(`div`,{style:{marginTop:`20px`,padding:`16px`,background:`#fcfaff`,border:`1px solid #dcd3ff`,borderRadius:`8px`},children:[(0,C.jsxs)(`h5`,{style:{fontSize:`0.88rem`,fontWeight:700,color:`#9966ff`,display:`flex`,alignItems:`center`,gap:`6px`,marginBottom:`8px`,margin:`0 0 8px 0`},children:[(0,C.jsx)(h,{size:16}),` Live GPS Telemetry & Geolocation`]}),(0,C.jsxs)(`p`,{style:{fontSize:`0.78rem`,color:`var(--text-secondary)`,marginBottom:`12px`,margin:`0 0 12px 0`},children:[`Route Progress: `,(0,C.jsxs)(`strong`,{children:[(e.gpsProgress||0).toFixed(0),`%`]}),M[e.orderId]&&(0,C.jsx)(`span`,{style:{color:`#ff9f40`,fontWeight:700,marginLeft:`8px`},children:`• Auto-Simulating...`}),P[e.orderId]&&(0,C.jsx)(`span`,{style:{color:`#2ec4b6`,fontWeight:700,marginLeft:`8px`},children:`• Live GPS Active...`})]}),e.gpsCoordinates&&(0,C.jsxs)(`p`,{style:{fontSize:`0.75rem`,color:`var(--text-secondary)`,margin:`-6px 0 10px 0`,fontFamily:`monospace`},children:[`Coords: `,e.gpsCoordinates]}),(0,C.jsx)(`div`,{style:{display:`flex`,alignItems:`center`,gap:`10px`,marginBottom:`12px`},children:(0,C.jsx)(`input`,{type:`range`,min:`0`,max:`100`,step:`1`,value:e.gpsProgress||0,onChange:t=>K(e.orderId,parseFloat(t.target.value)),style:{flex:1,accentColor:`#9966ff`,cursor:`pointer`},disabled:!!M[e.orderId]||!!P[e.orderId]})}),(0,C.jsxs)(`div`,{style:{display:`flex`,flexDirection:`column`,gap:`8px`},children:[(0,C.jsx)(`button`,{onClick:()=>q(e.orderId,e.gpsProgress||0),style:{width:`100%`,padding:`8px`,fontSize:`0.78rem`,fontWeight:700,background:M[e.orderId]?`#ff9f40`:`#9966ff`,color:`#fff`,border:`none`,borderRadius:`4px`,cursor:`pointer`,transition:`background 0.2s`,opacity:P[e.orderId]?.5:1},disabled:!!P[e.orderId],children:M[e.orderId]?`STOP AUTO-SIMULATION`:`START AUTO-SIMULATION`}),(0,C.jsxs)(`button`,{onClick:()=>oe(e.orderId),style:{width:`100%`,padding:`8px`,fontSize:`0.78rem`,fontWeight:700,background:P[e.orderId]?`#ff4d4f`:`#2ec4b6`,color:`#fff`,border:`none`,borderRadius:`4px`,cursor:`pointer`,transition:`background 0.2s`,display:`flex`,alignItems:`center`,justifyContent:`center`,gap:`6px`},children:[(0,C.jsx)(x,{size:12,className:P[e.orderId]?`animate-pulse`:``}),P[e.orderId]?`STOP WATCHING REAL LOCATION`:`USE REAL GEOLOCATION API`]})]})]})]},e.orderId)),pe&&(0,C.jsx)(`div`,{className:`load-more-wrap`,style:{gridColumn:`1 / -1`,margin:`4px auto 0`},children:(0,C.jsxs)(`button`,{type:`button`,className:`load-more-btn`,onClick:()=>te(e=>e+w),children:[`Load more active tasks (`,Q.length-B,` left) `,(0,C.jsx)(o,{className:`load-more-icon`,size:16})]})})]})]}),H===`earnings`&&(0,C.jsxs)(`div`,{className:`fade-in`,children:[(0,C.jsxs)(`div`,{style:{display:`grid`,gridTemplateColumns:`repeat(auto-fit, minmax(320px, 1fr))`,gap:`20px`,marginBottom:`32px`},children:[(0,C.jsxs)(`div`,{style:{background:`#fff`,border:`1px solid var(--border-medium)`,borderRadius:`12px`,padding:`24px`,boxShadow:`var(--shadow-sm)`},children:[(0,C.jsxs)(`h3`,{style:{fontSize:`1.1rem`,fontWeight:800,color:`var(--text-primary)`,marginBottom:`16px`,display:`flex`,alignItems:`center`,gap:`8px`},children:[(0,C.jsx)(`span`,{style:{width:`8px`,height:`8px`,borderRadius:`50%`,background:`var(--success)`,display:`inline-block`}}),`Daily Payouts History`]}),E.dailyEarnings&&Object.keys(E.dailyEarnings).length>0?(0,C.jsx)(`div`,{style:{display:`flex`,flexDirection:`column`,gap:`12px`,maxHeight:`200px`,overflowY:`auto`,paddingRight:`4px`},children:Object.entries(E.dailyEarnings).map(([e,t])=>(0,C.jsxs)(`div`,{style:{display:`flex`,justifyContent:`space-between`,borderBottom:`1px solid var(--border-light)`,paddingBottom:`8px`,fontSize:`0.9rem`},children:[(0,C.jsx)(`span`,{style:{fontWeight:600,color:`var(--text-secondary)`},children:e}),(0,C.jsxs)(`strong`,{style:{color:`var(--success)`},children:[`₹`,t.toFixed(2)]})]},e))}):(0,C.jsx)(`p`,{style:{color:`var(--text-muted)`,fontSize:`0.88rem`,textAlign:`center`,padding:`16px 0`},children:`No daily payout history found.`})]}),(0,C.jsxs)(`div`,{style:{background:`#fff`,border:`1px solid var(--border-medium)`,borderRadius:`12px`,padding:`24px`,boxShadow:`var(--shadow-sm)`},children:[(0,C.jsxs)(`h3`,{style:{fontSize:`1.1rem`,fontWeight:800,color:`var(--text-primary)`,marginBottom:`16px`,display:`flex`,alignItems:`center`,gap:`8px`},children:[(0,C.jsx)(`span`,{style:{width:`8px`,height:`8px`,borderRadius:`50%`,background:`#36a2eb`,display:`inline-block`}}),`Weekly Payouts History`]}),E.weeklyEarnings&&Object.keys(E.weeklyEarnings).length>0?(0,C.jsx)(`div`,{style:{display:`flex`,flexDirection:`column`,gap:`12px`,maxHeight:`200px`,overflowY:`auto`,paddingRight:`4px`},children:Object.entries(E.weeklyEarnings).map(([e,t])=>(0,C.jsxs)(`div`,{style:{display:`flex`,justifyContent:`space-between`,borderBottom:`1px solid var(--border-light)`,paddingBottom:`8px`,fontSize:`0.9rem`},children:[(0,C.jsxs)(`span`,{style:{fontWeight:600,color:`var(--text-secondary)`},children:[`Week #`,e.substring(6),` (`,e.substring(0,4),`)`]}),(0,C.jsxs)(`strong`,{style:{color:`#36a2eb`},children:[`₹`,t.toFixed(2)]})]},e))}):(0,C.jsx)(`p`,{style:{color:`var(--text-muted)`,fontSize:`0.88rem`,textAlign:`center`,padding:`16px 0`},children:`No weekly payout history found.`})]})]}),(0,C.jsxs)(`div`,{style:{background:`#fff`,border:`1px solid var(--border-medium)`,borderRadius:`12px`,padding:`24px`,boxShadow:`var(--shadow-sm)`},children:[(0,C.jsxs)(`div`,{style:{display:`flex`,justifyContent:`space-between`,alignItems:`center`,marginBottom:`20px`,flexWrap:`wrap`,gap:`12px`},children:[(0,C.jsx)(`h3`,{style:{fontSize:`1.25rem`,fontWeight:800,margin:0},children:`Completed Trip Log & Earnings Breakdown`}),(0,C.jsx)(`input`,{type:`text`,placeholder:`Search by ID, restaurant, date...`,value:W,onChange:e=>re(e.target.value),style:{padding:`8px 16px`,border:`1.5px solid var(--border-medium)`,borderRadius:`8px`,fontSize:`0.88rem`,width:`280px`,outline:`none`}})]}),$.length===0?(0,C.jsx)(`div`,{style:{textAlign:`center`,padding:`40px`,color:`var(--text-secondary)`},children:`Your completed delivery logs will show up here.`}):$.filter(e=>{let t=e.formattedId?.toLowerCase().includes(W.toLowerCase())||String(e.orderId).includes(W),n=e.restaurantName?.toLowerCase().includes(W.toLowerCase()),r=e.completedAt?.toLowerCase().includes(W.toLowerCase());return t||n||r}).length===0?(0,C.jsx)(`div`,{style:{textAlign:`center`,padding:`40px`,color:`var(--text-secondary)`},children:`No completed runs matching the search criteria.`}):(0,C.jsx)(`div`,{className:`admin-table-wrapper`,style:{boxShadow:`none`,border:`none`,margin:0},children:(0,C.jsxs)(`table`,{className:`admin-table`,style:{width:`100%`},children:[(0,C.jsx)(`thead`,{children:(0,C.jsxs)(`tr`,{children:[(0,C.jsx)(`th`,{children:`Trip ID`}),(0,C.jsx)(`th`,{children:`Completed Date`}),(0,C.jsx)(`th`,{children:`Restaurant`}),(0,C.jsx)(`th`,{children:`Customer Area`}),(0,C.jsx)(`th`,{children:`Payout`}),(0,C.jsx)(`th`,{children:`Action`})]})}),(0,C.jsx)(`tbody`,{children:$.filter(e=>{let t=e.formattedId?.toLowerCase().includes(W.toLowerCase())||String(e.orderId).includes(W),n=e.restaurantName?.toLowerCase().includes(W.toLowerCase()),r=e.completedAt?.toLowerCase().includes(W.toLowerCase());return t||n||r}).map(e=>(0,C.jsxs)(S.Fragment,{children:[(0,C.jsxs)(`tr`,{children:[(0,C.jsx)(`td`,{style:{fontWeight:700},children:e.formattedId}),(0,C.jsx)(`td`,{children:e.completedAt||`N/A`}),(0,C.jsx)(`td`,{children:e.restaurantName}),(0,C.jsx)(`td`,{children:e.customerAddress}),(0,C.jsxs)(`td`,{style:{fontWeight:700,color:`var(--success)`},children:[`₹`,(e.payoutBreakdown?.totalCommission??45).toFixed(2)]}),(0,C.jsx)(`td`,{children:(0,C.jsx)(`button`,{onClick:()=>ie(t=>({...t,[e.orderId]:!t[e.orderId]})),style:{background:`none`,border:`1px solid var(--border-medium)`,padding:`4px 10px`,borderRadius:`4px`,fontSize:`0.78rem`,fontWeight:700,cursor:`pointer`,color:`var(--text-secondary)`},children:G[e.orderId]?`Hide Breakdown`:`View Breakdown`})})]}),G[e.orderId]&&(0,C.jsx)(`tr`,{style:{background:`#fafafc`},children:(0,C.jsx)(`td`,{colSpan:`6`,style:{padding:`16px 24px`,borderBottom:`1px solid var(--border-medium)`},children:(0,C.jsxs)(`div`,{style:{display:`grid`,gridTemplateColumns:`repeat(auto-fit, minmax(180px, 1fr))`,gap:`16px`,fontSize:`0.85rem`},children:[(0,C.jsxs)(`div`,{children:[(0,C.jsx)(`span`,{style:{color:`var(--text-muted)`},children:`Base Payout Fare:`}),(0,C.jsxs)(`div`,{style:{fontWeight:700,marginTop:`4px`},children:[`₹`,(e.payoutBreakdown?.baseFare??30).toFixed(2)]})]}),(0,C.jsxs)(`div`,{children:[(0,C.jsx)(`span`,{style:{color:`var(--text-muted)`},children:`Distance Incentive:`}),(0,C.jsxs)(`div`,{style:{fontWeight:700,marginTop:`4px`},children:[`₹`,(e.payoutBreakdown?.distanceIncentive??10).toFixed(2)]})]}),(0,C.jsxs)(`div`,{children:[(0,C.jsx)(`span`,{style:{color:`var(--text-muted)`},children:`Peak Hours Surge:`}),(0,C.jsxs)(`div`,{style:{fontWeight:700,marginTop:`4px`},children:[`₹`,(e.payoutBreakdown?.surgeIncentive??5).toFixed(2)]})]}),(0,C.jsxs)(`div`,{style:{borderLeft:`1px dashed var(--border-medium)`,paddingLeft:`20px`},children:[(0,C.jsx)(`span`,{style:{color:`var(--text-muted)`},children:`Total Earnings:`}),(0,C.jsxs)(`div`,{style:{fontWeight:800,fontSize:`1rem`,color:`var(--success)`,marginTop:`4px`},children:[`₹`,(e.payoutBreakdown?.totalCommission??45).toFixed(2)]})]})]})})})]},e.orderId))})]})})]})]})]}),I&&(0,C.jsx)(_,{type:`order`,targetId:I,userId:e?.userID||e?.userId,userName:e?.userName||e?.username,receiverId:Q.find(e=>e.orderId===I)?.customerId||0,initialOpen:!0,onClose:()=>L(null)},I)]})};export{O as default};