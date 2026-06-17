import{g as e,m as t,n,r,t as i,u as ee}from"./createLucideIcon-DnU5s7Zs.js";import{t as a}from"./arrow-right-DKH1dmjK.js";import{t as o}from"./building-2-CBGrLSsR.js";import{t as te}from"./clipboard-list-IUnuS8xY.js";import{t as ne}from"./clock-Brf-ALnK.js";import{t as re}from"./log-out-D7j0DOFc.js";import{t as ie}from"./phone-DOvBU6-6.js";import{t as ae}from"./plus-B3XK3hIx.js";import{t as s}from"./shopping-bag-C8IdowiG.js";import{t as oe}from"./sun-CGc-e8-l.js";import{t as se}from"./trash-2-BMx355-Q.js";import{S as ce,_ as le,c as ue,d as c,i as l,l as u,n as de,t as fe,u as d,w as pe,x as me,y as he}from"./index-CLDdiuGX.js";var ge=i(`moon`,[[`path`,{d:`M20.985 12.486a9 9 0 1 1-9.473-9.472c.405-.022.617.46.402.803a6 6 0 0 0 8.268 8.268c.344-.215.825-.004.803.401`,key:`kfwtm`}]]),_e=i(`package`,[[`path`,{d:`M11 21.73a2 2 0 0 0 2 0l7-4A2 2 0 0 0 21 16V8a2 2 0 0 0-1-1.73l-7-4a2 2 0 0 0-2 0l-7 4A2 2 0 0 0 3 8v8a2 2 0 0 0 1 1.73z`,key:`1a0edw`}],[`path`,{d:`M12 22V12`,key:`d0xqtd`}],[`polyline`,{points:`3.29 7 12 12 20.71 7`,key:`ousv84`}],[`path`,{d:`m7.5 4.27 9 5.15`,key:`1c824w`}]]),ve=i(`square-pen`,[[`path`,{d:`M12 3H5a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7`,key:`1m0v6g`}],[`path`,{d:`M18.375 2.625a1 1 0 0 1 3 3l-9.013 9.014a2 2 0 0 1-.853.505l-2.873.84a.5.5 0 0 1-.62-.62l.84-2.873a2 2 0 0 1 .506-.852z`,key:`ohrbg2`}]]),f=e(t(),1),p=n(),m=5,h=()=>{let{user:e,logout:t,updateUser:n,loading:i}=(0,f.useContext)(pe),{addToCart:h}=ce(),g=ee(),{showAlert:_}=de(),{darkMode:v,toggleTheme:ye}=fe(),[y,be]=(0,f.useState)(`orders`),[b,x]=(0,f.useState)(!1),[S,C]=(0,f.useState)(!1),[xe,w]=(0,f.useState)(!1),[T,E]=(0,f.useState)({username:e?.userName||e?.username||`Guest User`,email:e?.email||`guest@zingbite.com`,mobile:String(e?.phoneNumber||e?.mobile||``),address:e?.address||`123 Main Street`,latitude:null,longitude:null,city:``}),[D,O]=(0,f.useState)(()=>{let t=localStorage.getItem(`addresses_${e?.email}`);return t?JSON.parse(t):[{id:1,type:`Home`,address:e?.address||`123 Main Street, Indiranagar, Bangalore`},{id:2,type:`Work`,address:`456 Tech Park, Whitefield, Bangalore`}]}),[k,Se]=(0,f.useState)(`Other`),[A,j]=(0,f.useState)(``),[Ce,M]=(0,f.useState)(null),[we,N]=(0,f.useState)(null),[Te,P]=(0,f.useState)(``),[F,I]=(0,f.useState)(!1),[L,R]=(0,f.useState)(!1),[z,B]=(0,f.useState)({action:``,loading:!1}),[V,Ee]=(0,f.useState)([]),[De,Oe]=(0,f.useState)(!0),[H,ke]=(0,f.useState)(m),Ae=(0,f.useRef)(null),[U,W]=(0,f.useState)(typeof window<`u`&&!!window.L),G=(0,f.useRef)(null),K=(0,f.useRef)(null),q=(0,f.useRef)(null),[J,Y]=(0,f.useState)(!1);(0,f.useEffect)(()=>{if(window.L){W(!0);return}let e=document.querySelector(`link[href*="leaflet.css"]`);e||(e=document.createElement(`link`),e.rel=`stylesheet`,e.href=`https://unpkg.com/leaflet@1.9.4/dist/leaflet.css`,document.head.appendChild(e));let t=document.querySelector(`script[src*="leaflet.js"]`);t||(t=document.createElement(`script`),t.src=`https://unpkg.com/leaflet@1.9.4/dist/leaflet.js`,t.async=!0,t.onload=()=>{let e=setInterval(()=>{window.L&&(W(!0),clearInterval(e))},50)},document.body.appendChild(t))},[]);let X=async(e,t,n)=>{Y(!0);try{let r=await(await fetch(`https://nominatim.openstreetmap.org/reverse?format=json&lat=${e}&lon=${t}&zoom=18`)).json();if(r&&r.display_name){let i=r.address?.city||r.address?.town||r.address?.village||r.address?.county||``;n===`profile`?E(n=>({...n,address:r.display_name,latitude:e,longitude:t,city:i})):(j(r.display_name),M(e),N(t),P(i))}}catch(e){console.error(`Reverse geocoding error:`,e)}finally{Y(!1)}},Z=e=>{if(!navigator.geolocation){_(`Geolocation is not supported by your browser.`,`error`);return}navigator.geolocation.getCurrentPosition(t=>{let{latitude:n,longitude:r}=t.coords;K.current&&(K.current.setView([n,r],16),q.current&&q.current.setLatLng([n,r])),X(n,r,e)},e=>{_(`Error retrieving location: `+e.message,`error`)})};(0,f.useEffect)(()=>{let e=y===`details`&&b||y===`addresses`&&F;if(!U||!G.current||!e){K.current&&(K.current.remove(),K.current=null,q.current=null);return}if(K.current)return;let t=window.L;if(!t)return;let n=T.latitude??12.9716,r=T.longitude??77.5946,i=t.map(G.current).setView([n,r],14);K.current=i,t.tileLayer(`https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png`,{maxZoom:19,attribution:`&copy; OpenStreetMap contributors`}).addTo(i);let ee=t.divIcon({html:`<div style="font-size: 24px; text-align: center; line-height: 24px;">📍</div>`,className:`custom-profile-marker`,iconSize:[24,24],iconAnchor:[12,12]}),a=t.marker([n,r],{icon:ee,draggable:!0}).addTo(i);q.current=a;let o=y===`details`?`profile`:`newAddress`;return a.on(`dragend`,()=>{let e=a.getLatLng();X(e.lat,e.lng,o)}),i.on(`click`,e=>{a.setLatLng(e.latlng),X(e.latlng.lat,e.latlng.lng,o)}),X(defaultLat,defaultLng,o),()=>{K.current&&(K.current.remove(),K.current=null,q.current=null)}},[U,y,b,F]),(0,f.useEffect)(()=>{e&&E({username:e.userName||e.username||`Guest User`,email:e.email||`guest@zingbite.com`,mobile:String(e.phoneNumber||e.mobile||``),address:e.address||`123 Main Street`})},[e]),(0,f.useEffect)(()=>{e?.email&&localStorage.setItem(`addresses_${e.email}`,JSON.stringify(D))},[D,e?.email]),(0,f.useEffect)(()=>{let t=async(e=!1)=>{try{Ee((await r.get(`/api/profile?action=orders`)).data)}catch(e){console.error(`Error fetching past orders:`,e)}finally{e||Oe(!1)}};if(e){t(!1);let e=window.location.pathname.startsWith(`/zingbite`)?`/zingbite/api/stream?topic=user_orders`:`/api/stream?topic=user_orders`,n=new EventSource(e);return n.onmessage=e=>{try{console.log(`[ZingBite SSE] Received real-time user profile orders update`),t(!0)}catch(e){console.error(`[ZingBite SSE] Error on message:`,e)}},n.onerror=e=>{console.error(`[ZingBite SSE] EventSource connection error:`,e)},()=>{n.close()}}},[e]);let Q=e=>{e!==y&&(w(!0),setTimeout(()=>{be(e),setTimeout(()=>w(!1),50)},200))},je=async e=>{e.preventDefault(),C(!0);try{let e=await r.post(`/api/profile`,{action:`update`,username:T.username,mobile:T.mobile,address:T.address,...T.latitude!=null&&{latitude:T.latitude},...T.longitude!=null&&{longitude:T.longitude},...T.city&&{city:T.city}});e.data.success&&(n(e.data.user),x(!1))}catch(e){_(e.response?.data?.error||`Failed to update profile`,`error`)}finally{C(!1)}},Me=e=>{e.preventDefault(),A&&(O([...D,{id:Date.now(),type:k,address:A,latitude:Ce,longitude:we,city:Te}]),j(``),M(null),N(null),P(``),I(!1))},Ne=e=>{O(D.filter(t=>t.id!==e))},Pe=async e=>{R(!0);try{for(let t of e)await h(t.id,t.qty);g(`/cart`)}catch(e){console.error(e),_(`Error during reordering. Please try again.`,`error`)}finally{R(!1)}},Fe=V.slice(0,H),Ie=H<V.length;V.filter(e=>(e.status||``).toLowerCase()===`delivered`).length;let $=async e=>{B({action:e,loading:!0});try{if(e===`restaurant_admin`){g(`/partner-with-us`);return}else if(e===`delivery_partner`){g(`/ride-with-us`);return}(await r.post(`/api/profile`,{action:`upgradeRole`,role:e})).data.success&&_(`Role upgrade request submitted for admin review.`,`success`)}catch(e){_(e.response?.data?.error||`Failed to submit upgrade request.`,`error`)}finally{B({action:``,loading:!1})}};return i?(0,p.jsx)(`div`,{style:{display:`flex`,justifyContent:`center`,alignItems:`center`,flex:1,minHeight:`400px`},children:(0,p.jsx)(c,{size:36,style:{animation:`spin 1s linear infinite`,color:`var(--brand-red)`}})}):e?(0,p.jsxs)(`div`,{className:`page-enter`,children:[(0,p.jsx)(`style`,{children:`
        .profile-wrap {
          max-width: 1200px;
          margin: 0 auto 60px;
          padding: 0 20px;
        }

        .profile-cover {
          background: linear-gradient(135deg, var(--brand-red) 0%, #d42d42 100%);
          border-radius: 0 0 28px 28px;
          padding: 32px 32px 24px;
          margin: 0 -20px;
          position: relative;
          overflow: hidden;
        }
        .profile-cover::before {
          content: '';
          position: absolute;
          inset: 0;
          background: radial-gradient(ellipse at 30% 50%, rgba(255,255,255,0.15) 0%, transparent 60%);
        }
        .profile-cover::after {
          content: '';
          position: absolute;
          top: -40%;
          right: -10%;
          width: 300px;
          height: 300px;
          border-radius: 50%;
          background: rgba(255,255,255,0.06);
        }
        .profile-cover-inner {
          position: relative;
          z-index: 1;
          display: flex;
          align-items: center;
          gap: 24px;
          color: #fff;
        }
        .cover-avatar {
          width: 80px;
          height: 80px;
          border-radius: 50%;
          background: rgba(255,255,255,0.2);
          border: 3px solid rgba(255,255,255,0.5);
          display: flex;
          align-items: center;
          justify-content: center;
          font-size: 2rem;
          font-weight: 800;
          flex-shrink: 0;
          backdrop-filter: blur(4px);
        }
        .cover-info h1 {
          font-size: 1.6rem;
          font-weight: 700;
          margin: 0 0 4px;
        }
        .cover-info p {
          opacity: 0.85;
          font-size: 0.9rem;
          margin: 0;
        }
        .cover-info .cover-email {
          display: flex;
          align-items: center;
          gap: 6px;
          font-size: 0.85rem;
          opacity: 0.75;
          margin-top: 4px;
        }

        .profile-body {
          display: grid;
          grid-template-columns: 200px 1fr;
          gap: 28px;
          margin-top: -16px;
          position: relative;
          z-index: 2;
          align-items: start;
        }

        .profile-nav {
          background: #fff;
          border-radius: 16px;
          box-shadow: 0 4px 24px rgba(0,0,0,0.06);
          border: 1px solid var(--border-light);
          overflow: hidden;
          padding: 8px;
        }
        .profile-nav-item {
          display: flex;
          align-items: center;
          gap: 10px;
          width: 100%;
          padding: 12px 14px;
          border: none;
          background: transparent;
          color: var(--text-secondary);
          font-size: 0.9rem;
          font-weight: 600;
          cursor: pointer;
          border-radius: 10px;
          transition: all 0.25s var(--ease-premium);
          text-align: left;
          position: relative;
        }
        .profile-nav-item svg {
          flex-shrink: 0;
          transition: transform 0.25s var(--ease-premium);
        }
        .profile-nav-item:hover {
          background: rgba(247,55,79,0.05);
          color: var(--brand-red);
        }
        .profile-nav-item:hover svg {
          transform: scale(1.1);
        }
        .profile-nav-item.active {
          background: linear-gradient(135deg, var(--brand-red), #d42d42);
          color: #fff;
          box-shadow: 0 4px 12px rgba(247,55,79,0.25);
        }
        .profile-nav-divider {
          height: 1px;
          background: var(--border-light);
          margin: 8px 0;
        }
        .profile-nav-item.logout-item {
          border-radius: 0;
          color: var(--danger);
        }
        .theme-toggle-switch {
          width: 40px;
          height: 22px;
          background: var(--border-medium);
          border-radius: 11px;
          position: relative;
          cursor: pointer;
          transition: background 0.3s ease;
          flex-shrink: 0;
        }
        .theme-toggle-switch.on {
          background: var(--brand-red);
        }
        .theme-toggle-knob {
          position: absolute;
          top: 2px;
          left: 2px;
          width: 18px;
          height: 18px;
          border-radius: 50%;
          background: #fff;
          transition: transform 0.3s var(--ease-premium);
          box-shadow: 0 1px 3px rgba(0,0,0,0.2);
        }
        .theme-toggle-switch.on .theme-toggle-knob {
          transform: translateX(18px);
        }
        .profile-nav-item.logout-item:hover {
          background: rgba(226,55,68,0.06);
        }
        .profile-nav-item.logout-item.active {
          background: var(--danger);
          color: #fff;
          border-radius: 10px;
        }

        .profile-panel {
          background: #fff;
          border-radius: 16px;
          box-shadow: 0 4px 24px rgba(0,0,0,0.06);
          border: 1px solid var(--border-light);
          padding: 28px;
          min-height: 400px;
          transition: opacity 0.3s var(--ease-premium), transform 0.3s var(--ease-premium);
        }
        .profile-panel.switching {
          opacity: 0;
          transform: translateY(12px) scale(0.98);
        }
        .profile-panel-header {
          display: flex;
          justify-content: space-between;
          align-items: center;
          border-bottom: 1.5px solid var(--border-light);
          padding-bottom: 16px;
          margin-bottom: 24px;
        }
        .profile-panel-header h2 {
          font-size: 1.4rem;
          margin: 0;
          display: flex;
          align-items: center;
          gap: 10px;
        }
        .profile-panel-header h2 svg {
          color: var(--brand-red);
        }

        .premium-field {
          display: flex;
          flex-direction: column;
          gap: 6px;
        }
        .premium-field label {
          font-size: 0.8rem;
          font-weight: 700;
          text-transform: uppercase;
          letter-spacing: 0.5px;
          color: var(--text-muted);
        }
        .premium-field input,
        .premium-field textarea {
          padding: 12px 14px;
          border: 1.5px solid var(--border-medium);
          border-radius: 10px;
          font-family: inherit;
          font-size: 0.95rem;
          outline: none;
          background: #fafafa;
          transition: all 0.25s var(--ease-premium);
        }
        .premium-field input:focus,
        .premium-field textarea:focus {
          border-color: var(--brand-red);
          background: #fff;
          box-shadow: 0 0 0 4px rgba(247,55,79,0.08);
        }
        .premium-field input:disabled,
        .premium-field textarea:disabled {
          background: var(--bg-surface);
          color: var(--text-muted);
          cursor: not-allowed;
          opacity: 0.7;
        }

        .profile-info-display {
          display: grid;
          gap: 20px;
        }
        .profile-info-row {
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: 20px;
        }
        .info-item {
          padding: 16px 18px;
          background: var(--bg-surface);
          border-radius: 12px;
          border: 1px solid var(--border-light);
        }
        .info-item .info-label {
          font-size: 0.75rem;
          font-weight: 700;
          text-transform: uppercase;
          letter-spacing: 0.5px;
          color: var(--text-muted);
          display: flex;
          align-items: center;
          gap: 6px;
          margin-bottom: 6px;
        }
        .info-item .info-label svg {
          color: var(--brand-red);
        }
        .info-item .info-value {
          font-size: 1rem;
          font-weight: 600;
          color: var(--text-primary);
        }

        .btn-edit {
          display: inline-flex;
          align-items: center;
          gap: 6px;
          padding: 8px 18px;
          background: transparent;
          border: 1.5px solid var(--border-medium);
          color: var(--text-secondary);
          font-weight: 700;
          font-size: 0.85rem;
          border-radius: 10px;
          cursor: pointer;
          transition: all 0.25s var(--ease-premium);
        }
        .btn-edit:hover {
          border-color: var(--brand-red);
          color: var(--brand-red);
          background: rgba(247,55,79,0.04);
        }
        .btn-save {
          padding: 12px 28px;
          background: linear-gradient(135deg, var(--brand-red), #d42d42);
          color: #fff;
          border: none;
          font-weight: 700;
          border-radius: 10px;
          cursor: pointer;
          font-size: 0.95rem;
          transition: transform 0.2s, box-shadow 0.2s;
          box-shadow: 0 4px 16px rgba(247,55,79,0.25);
          align-self: flex-start;
        }
        .btn-save:hover {
          transform: translateY(-1px);
          box-shadow: 0 6px 24px rgba(247,55,79,0.35);
        }
        .btn-save:active {
          transform: translateY(0);
        }

        .address-grid {
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: 16px;
        }
        .addr-card {
          background: var(--bg-surface);
          border: 1px solid var(--border-light);
          border-radius: 14px;
          padding: 20px;
          transition: all 0.25s var(--ease-premium);
          position: relative;
        }
        .addr-card:hover {
          border-color: rgba(247,55,79,0.2);
          box-shadow: 0 4px 16px rgba(0,0,0,0.04);
          transform: translateY(-2px);
        }
        .addr-card-badge {
          display: inline-flex;
          align-items: center;
          gap: 4px;
          background: rgba(247,55,79,0.08);
          color: var(--brand-red);
          padding: 4px 10px;
          border-radius: 6px;
          font-size: 0.72rem;
          font-weight: 700;
          text-transform: uppercase;
          margin-bottom: 10px;
        }
        .addr-card p {
          color: var(--text-secondary);
          font-size: 0.9rem;
          line-height: 1.55;
          margin: 0;
        }
        .addr-card-actions {
          display: flex;
          justify-content: flex-end;
          margin-top: 12px;
          padding-top: 12px;
          border-top: 1px solid var(--border-light);
        }
        .addr-delete-btn {
          display: inline-flex;
          align-items: center;
          gap: 4px;
          padding: 6px 12px;
          border: none;
          background: transparent;
          color: var(--text-muted);
          font-size: 0.8rem;
          font-weight: 600;
          cursor: pointer;
          border-radius: 8px;
          transition: all 0.2s;
        }
        .addr-delete-btn:hover {
          color: var(--danger);
          background: rgba(226,55,68,0.06);
        }
        .addr-add-card {
          border: 1.5px dashed var(--border-medium);
          border-radius: 14px;
          display: flex;
          flex-direction: column;
          align-items: center;
          justify-content: center;
          padding: 30px;
          cursor: pointer;
          color: var(--text-secondary);
          transition: all 0.25s var(--ease-premium);
          min-height: 140px;
          background: transparent;
        }
        .addr-add-card:hover {
          border-color: var(--brand-red);
          color: var(--brand-red);
          background: rgba(247,55,79,0.02);
          transform: translateY(-2px);
        }

        .addr-form-card {
          background: var(--bg-surface);
          border: 1.5px solid var(--brand-red);
          border-radius: 14px;
          padding: 20px;
        }

        .order-timeline {
          display: flex;
          flex-direction: column;
          gap: 16px;
        }
        .order-card-item {
          border: 1px solid var(--border-light);
          border-radius: 14px;
          padding: 20px;
          transition: all 0.25s var(--ease-premium);
        }
        .order-card-item:hover {
          border-color: rgba(247,55,79,0.15);
          box-shadow: 0 4px 20px rgba(0,0,0,0.04);
        }
        .order-card-top {
          display: flex;
          justify-content: space-between;
          align-items: flex-start;
          padding-bottom: 12px;
          border-bottom: 1px solid var(--border-light);
          margin-bottom: 12px;
        }
        .order-card-shop h4 {
          font-size: 1.1rem;
          font-weight: 700;
          margin: 0 0 4px;
        }
        .order-card-shop span {
          font-size: 0.8rem;
          color: var(--text-muted);
          display: flex;
          align-items: center;
          gap: 4px;
        }
        .order-status-pill {
          display: inline-flex;
          align-items: center;
          gap: 4px;
          font-size: 0.75rem;
          font-weight: 700;
          padding: 5px 12px;
          border-radius: 20px;
          background: rgba(96, 178, 70, 0.1);
          color: var(--success);
        }
        .order-status-pill.pending {
          background: rgba(245, 158, 11, 0.1);
          color: #f59e0b;
        }
        .order-status-pill.preparing {
          background: rgba(59, 130, 246, 0.1);
          color: #3b82f6;
        }
        .order-items {
          font-size: 0.9rem;
          color: var(--text-secondary);
          line-height: 1.7;
          margin-bottom: 14px;
        }
        .order-card-bottom {
          display: flex;
          justify-content: space-between;
          align-items: center;
        }
        .order-total {
          font-weight: 700;
          font-size: 1rem;
        }

        .load-more-wrap {
          display: flex;
          justify-content: center;
          margin-top: 4px;
        }
        .load-more-btn {
          display: inline-flex;
          align-items: center;
          gap: 8px;
          padding: 10px 24px;
          background: var(--bg-surface);
          border: 1px solid var(--border-medium);
          border-radius: 10px;
          font-weight: 600;
          font-size: 0.9rem;
          color: var(--text-secondary);
          cursor: pointer;
          transition: all 0.25s var(--ease-premium);
        }
        .load-more-btn:hover {
          border-color: var(--brand-red);
          color: var(--brand-red);
          background: rgba(247,55,79,0.03);
        }

        @media (max-width: 900px) {
          .profile-body {
            grid-template-columns: 1fr;
            gap: 20px;
          }
          .profile-nav {
            display: flex;
            overflow-x: auto;
            padding: 6px;
            gap: 4px;
            -webkit-overflow-scrolling: touch;
          }
          .profile-nav-item {
            white-space: nowrap;
            flex-shrink: 0;
            padding: 10px 14px;
            font-size: 0.85rem;
          }
          .profile-nav-item.logout-item {
            margin-top: 0;
            border-top: none;
            padding-top: 10px;
          }
          .profile-cover {
            padding: 24px 20px;
          }
          .cover-info h1 { font-size: 1.3rem; }
        }

        @media (max-width: 768px) {
          .address-grid {
            grid-template-columns: 1fr;
          }
          .profile-info-row {
            grid-template-columns: 1fr;
          }
          .profile-panel {
            padding: 20px;
          }
        }
      `}),(0,p.jsxs)(`div`,{className:`profile-wrap`,children:[(0,p.jsx)(`div`,{className:`profile-cover`,children:(0,p.jsxs)(`div`,{className:`profile-cover-inner`,children:[(0,p.jsx)(`div`,{className:`cover-avatar`,children:T.username.split(` `).map(e=>e[0]).join(``).slice(0,2).toUpperCase()}),(0,p.jsxs)(`div`,{className:`cover-info`,children:[(0,p.jsx)(`h1`,{children:T.username}),(0,p.jsxs)(`p`,{children:[`Welcome back, `,T.username.split(` `)[0],`!`]}),(0,p.jsxs)(`div`,{className:`cover-email`,children:[(0,p.jsx)(d,{size:13}),` `,T.email]})]})]})}),(0,p.jsxs)(`div`,{className:`profile-body`,children:[(0,p.jsxs)(`nav`,{className:`profile-nav`,children:[(0,p.jsxs)(`button`,{className:`profile-nav-item ${y===`orders`?`active`:``}`,onClick:()=>Q(`orders`),children:[(0,p.jsx)(te,{size:16}),` Orders`]}),(0,p.jsxs)(`button`,{className:`profile-nav-item ${y===`addresses`?`active`:``}`,onClick:()=>Q(`addresses`),children:[(0,p.jsx)(u,{size:16}),` Addresses`]}),(0,p.jsxs)(`button`,{className:`profile-nav-item ${y===`details`?`active`:``}`,onClick:()=>Q(`details`),children:[(0,p.jsx)(l,{size:16}),` Account`]}),(0,p.jsx)(`div`,{className:`profile-nav-divider`}),(0,p.jsxs)(`button`,{onClick:ye,className:`profile-nav-item`,style:{display:`flex`,alignItems:`center`,justifyContent:`space-between`,gap:`10px`},children:[(0,p.jsxs)(`span`,{style:{display:`flex`,alignItems:`center`,gap:`10px`},children:[v?(0,p.jsx)(ge,{size:16}):(0,p.jsx)(oe,{size:16}),v?`Dark Mode`:`Light Mode`]}),(0,p.jsx)(`span`,{className:`theme-toggle-switch ${v?`on`:``}`,children:(0,p.jsx)(`span`,{className:`theme-toggle-knob`})})]}),(0,p.jsxs)(`button`,{onClick:t,className:`profile-nav-item logout-item`,children:[(0,p.jsx)(re,{size:16}),` Sign Out`]})]}),(0,p.jsxs)(`main`,{ref:Ae,className:`profile-panel ${xe?`switching`:``}`,children:[y===`details`&&(0,p.jsxs)(`div`,{children:[(0,p.jsxs)(`div`,{className:`profile-panel-header`,children:[(0,p.jsxs)(`h2`,{children:[(0,p.jsx)(l,{size:20}),` Account Information`]}),!b&&(0,p.jsxs)(`button`,{onClick:()=>x(!0),className:`btn-edit`,children:[(0,p.jsx)(ve,{size:14}),` Edit Profile`]})]}),b?(0,p.jsxs)(`form`,{onSubmit:je,className:`profile-form`,style:{display:`flex`,flexDirection:`column`,gap:`18px`,maxWidth:`540px`},children:[(0,p.jsxs)(`div`,{className:`profile-info-row`,children:[(0,p.jsxs)(`div`,{className:`premium-field`,children:[(0,p.jsx)(`label`,{children:`Full Name`}),(0,p.jsx)(`input`,{type:`text`,required:!0,value:T.username,onChange:e=>E({...T,username:e.target.value})})]}),(0,p.jsxs)(`div`,{className:`premium-field`,children:[(0,p.jsx)(`label`,{children:`Email Address`}),(0,p.jsx)(`input`,{type:`email`,disabled:!0,value:T.email})]})]}),(0,p.jsxs)(`div`,{className:`premium-field`,children:[(0,p.jsx)(`label`,{children:`Mobile Number`}),(0,p.jsx)(`input`,{type:`tel`,required:!0,value:T.mobile,onChange:e=>E({...T,mobile:e.target.value})})]}),(0,p.jsxs)(`div`,{className:`premium-field`,children:[(0,p.jsx)(`label`,{children:`Default Address`}),(0,p.jsx)(`textarea`,{rows:3,required:!0,value:T.address,onChange:e=>E({...T,address:e.target.value})}),(0,p.jsxs)(`div`,{style:{marginTop:`8px`,display:`flex`,flexDirection:`column`,gap:`10px`},children:[(0,p.jsxs)(`button`,{type:`button`,onClick:()=>Z(`profile`),style:{alignSelf:`flex-start`,padding:`9px 16px`,fontSize:`0.8rem`,fontWeight:700,background:`var(--brand-red)`,color:`white`,border:`none`,borderRadius:`8px`,cursor:`pointer`,display:`flex`,alignItems:`center`,gap:`6px`,transition:`transform 0.2s, box-shadow 0.2s`,boxShadow:`0 2px 8px rgba(247,55,79,0.2)`},onMouseEnter:e=>{e.target.style.transform=`translateY(-1px)`,e.target.style.boxShadow=`0 4px 16px rgba(247,55,79,0.3)`},onMouseLeave:e=>{e.target.style.transform=``,e.target.style.boxShadow=`0 2px 8px rgba(247,55,79,0.2)`},children:[(0,p.jsx)(u,{size:13}),` `,J?`Detecting...`:`Auto-Detect Location`]}),(0,p.jsx)(`div`,{ref:G,style:{height:`180px`,borderRadius:`10px`,border:`1px solid var(--border-medium)`,zIndex:1}})]})]}),(0,p.jsx)(`button`,{type:`submit`,className:`btn-save`,disabled:S,children:S?(0,p.jsxs)(p.Fragment,{children:[(0,p.jsx)(c,{size:16,style:{animation:`spin 1s linear infinite`,marginRight:4}}),` Saving...`]}):`Save Changes`})]}):(0,p.jsxs)(`div`,{className:`profile-info-display`,children:[(0,p.jsxs)(`div`,{className:`profile-info-row`,children:[(0,p.jsxs)(`div`,{className:`info-item`,children:[(0,p.jsxs)(`div`,{className:`info-label`,children:[(0,p.jsx)(l,{size:13}),` Full Name`]}),(0,p.jsx)(`div`,{className:`info-value`,children:T.username})]}),(0,p.jsxs)(`div`,{className:`info-item`,children:[(0,p.jsxs)(`div`,{className:`info-label`,children:[(0,p.jsx)(d,{size:13}),` Email`]}),(0,p.jsx)(`div`,{className:`info-value`,children:T.email})]})]}),(0,p.jsxs)(`div`,{className:`profile-info-row`,children:[(0,p.jsxs)(`div`,{className:`info-item`,children:[(0,p.jsxs)(`div`,{className:`info-label`,children:[(0,p.jsx)(ie,{size:13}),` Mobile`]}),(0,p.jsx)(`div`,{className:`info-value`,children:T.mobile||`Not provided`})]}),(0,p.jsxs)(`div`,{className:`info-item`,children:[(0,p.jsxs)(`div`,{className:`info-label`,children:[(0,p.jsx)(ne,{size:13}),` Member Since`]}),(0,p.jsx)(`div`,{className:`info-value`,children:`2025`})]})]}),(0,p.jsxs)(`div`,{className:`info-item`,style:{gridColumn:`1 / -1`},children:[(0,p.jsxs)(`div`,{className:`info-label`,children:[(0,p.jsx)(u,{size:13}),` Default Address`]}),(0,p.jsx)(`div`,{className:`info-value`,style:{fontWeight:500,fontSize:`0.95rem`},children:T.address})]})]}),(0,p.jsxs)(`div`,{style:{marginTop:`32px`,borderTop:`1px solid var(--border-light)`,paddingTop:`24px`},children:[(0,p.jsxs)(`h3`,{style:{fontSize:`1.1rem`,fontWeight:800,marginBottom:`12px`,display:`flex`,alignItems:`center`,gap:`8px`},children:[(0,p.jsx)(ue,{size:18,color:`var(--brand-red)`}),` Role & Access`]}),(0,p.jsxs)(`div`,{style:{display:`flex`,gap:`12px`,flexWrap:`wrap`},children:[e?.role!==`restaurant_admin`&&(0,p.jsxs)(`button`,{onClick:()=>$(`restaurant_admin`),disabled:z.loading,style:{display:`flex`,alignItems:`center`,gap:`8px`,padding:`10px 18px`,border:`1px solid var(--brand-red)`,borderRadius:`10px`,background:`transparent`,color:`var(--brand-red)`,fontWeight:700,fontSize:`0.85rem`,cursor:`pointer`,transition:`all 0.2s`},children:[(0,p.jsx)(o,{size:16}),` Partner With Us`]}),e?.role!==`delivery_partner`&&(0,p.jsxs)(`button`,{onClick:()=>$(`delivery_partner`),disabled:z.loading,style:{display:`flex`,alignItems:`center`,gap:`8px`,padding:`10px 18px`,border:`1px solid #4bc0c0`,borderRadius:`10px`,background:`transparent`,color:`#4bc0c0`,fontWeight:700,fontSize:`0.85rem`,cursor:`pointer`,transition:`all 0.2s`},children:[(0,p.jsx)(me,{size:16}),` Ride With Us`]})]})]})]}),y===`addresses`&&(0,p.jsxs)(`div`,{children:[(0,p.jsx)(`div`,{className:`profile-panel-header`,children:(0,p.jsxs)(`h2`,{children:[(0,p.jsx)(u,{size:20}),` Saved Addresses`]})}),(0,p.jsxs)(`div`,{className:`address-grid`,children:[D.map(e=>(0,p.jsxs)(`div`,{className:`addr-card`,children:[(0,p.jsxs)(`div`,{className:`addr-card-badge`,children:[(0,p.jsx)(u,{size:11}),` `,e.type]}),(0,p.jsx)(`p`,{children:e.address}),(0,p.jsx)(`div`,{className:`addr-card-actions`,children:(0,p.jsxs)(`button`,{onClick:()=>Ne(e.id),className:`addr-delete-btn`,children:[(0,p.jsx)(se,{size:13}),` Remove`]})})]},e.id)),F?(0,p.jsxs)(`form`,{onSubmit:Me,className:`addr-form-card`,children:[(0,p.jsxs)(`div`,{style:{marginBottom:`14px`},children:[(0,p.jsx)(`label`,{style:{fontSize:`0.8rem`,fontWeight:700,color:`var(--text-muted)`,textTransform:`uppercase`,letterSpacing:`0.5px`,display:`block`,marginBottom:`6px`},children:`Address Label`}),(0,p.jsxs)(`select`,{value:k,onChange:e=>Se(e.target.value),className:`premium-select`,style:{width:`100%`},children:[(0,p.jsx)(`option`,{value:`Home`,children:`Home`}),(0,p.jsx)(`option`,{value:`Work`,children:`Work`}),(0,p.jsx)(`option`,{value:`Other`,children:`Other`})]})]}),(0,p.jsxs)(`div`,{style:{marginBottom:`14px`},children:[(0,p.jsx)(`label`,{style:{fontSize:`0.8rem`,fontWeight:700,color:`var(--text-muted)`,textTransform:`uppercase`,letterSpacing:`0.5px`,display:`block`,marginBottom:`6px`},children:`Full Address`}),(0,p.jsx)(`textarea`,{rows:2,required:!0,value:A,onChange:e=>j(e.target.value),placeholder:`House No, Building Name, Street, Landmark`,style:{width:`100%`,padding:`10px 12px`,border:`1.5px solid var(--border-medium)`,borderRadius:`10px`,fontFamily:`inherit`,fontSize:`0.95rem`,outline:`none`,transition:`border-color 0.25s var(--ease-premium)`,background:`#fff`},onFocus:e=>e.target.style.borderColor=`var(--brand-red)`,onBlur:e=>e.target.style.borderColor=`var(--border-medium)`}),(0,p.jsxs)(`div`,{style:{marginTop:`8px`,display:`flex`,flexDirection:`column`,gap:`10px`},children:[(0,p.jsxs)(`button`,{type:`button`,onClick:()=>Z(`newAddress`),style:{alignSelf:`flex-start`,padding:`9px 16px`,fontSize:`0.8rem`,fontWeight:700,background:`var(--brand-red)`,color:`white`,border:`none`,borderRadius:`8px`,cursor:`pointer`,display:`flex`,alignItems:`center`,gap:`6px`,transition:`transform 0.2s`,boxShadow:`0 2px 8px rgba(247,55,79,0.2)`},onMouseEnter:e=>{e.target.style.transform=`translateY(-1px)`,e.target.style.boxShadow=`0 4px 16px rgba(247,55,79,0.3)`},onMouseLeave:e=>{e.target.style.transform=``,e.target.style.boxShadow=`0 2px 8px rgba(247,55,79,0.2)`},children:[(0,p.jsx)(u,{size:13}),` `,J?`Detecting...`:`Auto-Detect Location`]}),(0,p.jsx)(`div`,{ref:G,style:{height:`160px`,borderRadius:`10px`,border:`1px solid var(--border-medium)`,zIndex:1}})]})]}),(0,p.jsxs)(`div`,{style:{display:`flex`,gap:`10px`,justifyContent:`flex-end`},children:[(0,p.jsx)(`button`,{type:`button`,onClick:()=>I(!1),style:{padding:`9px 16px`,border:`1.5px solid var(--border-medium)`,background:`transparent`,borderRadius:`10px`,cursor:`pointer`,fontWeight:600,fontSize:`0.85rem`,color:`var(--text-secondary)`,transition:`all 0.2s`},onMouseEnter:e=>{e.target.style.borderColor=`var(--brand-red)`,e.target.style.color=`var(--brand-red)`},onMouseLeave:e=>{e.target.style.borderColor=``,e.target.style.color=``},children:`Cancel`}),(0,p.jsx)(`button`,{type:`submit`,style:{padding:`9px 20px`,background:`var(--brand-red)`,color:`#fff`,border:`none`,borderRadius:`10px`,fontWeight:700,cursor:`pointer`,fontSize:`0.85rem`,transition:`transform 0.2s, box-shadow 0.2s`,boxShadow:`0 2px 8px rgba(247,55,79,0.2)`},onMouseEnter:e=>{e.target.style.transform=`translateY(-1px)`,e.target.style.boxShadow=`0 4px 16px rgba(247,55,79,0.3)`},onMouseLeave:e=>{e.target.style.transform=``,e.target.style.boxShadow=`0 2px 8px rgba(247,55,79,0.2)`},children:`Save Address`})]})]}):(0,p.jsxs)(`button`,{onClick:()=>I(!0),className:`addr-add-card`,children:[(0,p.jsx)(ae,{size:28,style:{marginBottom:`10px`,strokeWidth:2}}),(0,p.jsx)(`span`,{style:{fontWeight:600},children:`Add New Address`})]})]})]}),y===`orders`&&(0,p.jsxs)(`div`,{children:[(0,p.jsx)(`div`,{className:`profile-panel-header`,children:(0,p.jsxs)(`h2`,{children:[(0,p.jsx)(_e,{size:20}),` Past Orders`]})}),(0,p.jsx)(`div`,{className:`order-timeline`,children:De?(0,p.jsxs)(`div`,{style:{textAlign:`center`,padding:`60px 0`,color:`var(--text-muted)`},children:[(0,p.jsx)(c,{size:28,style:{animation:`spin 1s linear infinite`,margin:`0 auto 16px`}}),(0,p.jsx)(`p`,{style:{fontWeight:600},children:`Loading your order history...`})]}):V.length===0?(0,p.jsxs)(`div`,{style:{textAlign:`center`,padding:`60px 0`},children:[(0,p.jsx)(`div`,{style:{width:`72px`,height:`72px`,borderRadius:`50%`,background:`var(--bg-surface)`,display:`flex`,alignItems:`center`,justifyContent:`center`,margin:`0 auto 16px`},children:(0,p.jsx)(s,{size:32,style:{strokeWidth:1.5,color:`var(--text-muted)`}})}),(0,p.jsx)(`p`,{style:{fontWeight:700,fontSize:`1.15rem`,color:`var(--text-primary)`,marginBottom:`4px`},children:`No Orders Yet`}),(0,p.jsx)(`p`,{style:{fontSize:`0.9rem`,color:`var(--text-muted)`,marginBottom:`20px`},children:`Hungry? Your orders will appear here.`}),(0,p.jsx)(`button`,{onClick:()=>g(`/`),style:{padding:`10px 24px`,background:`var(--brand-red)`,color:`#fff`,border:`none`,borderRadius:`10px`,fontWeight:700,cursor:`pointer`},children:`Browse Restaurants`})]}):(0,p.jsxs)(p.Fragment,{children:[Fe.map(e=>{let t=(e.status||``).toLowerCase()===`delivered`?``:(e.status||``).toLowerCase()===`pending`?`pending`:(e.status||``).toLowerCase()===`preparing`?`preparing`:``;return(0,p.jsxs)(`div`,{className:`order-card-item`,children:[(0,p.jsxs)(`div`,{className:`order-card-top`,children:[(0,p.jsxs)(`div`,{className:`order-card-shop`,children:[(0,p.jsx)(`h4`,{children:e.restaurantName}),(0,p.jsxs)(`span`,{children:[(0,p.jsx)(he,{size:12}),` `,e.date||`Recent`,` • ID: `,e.id]})]}),(0,p.jsxs)(`div`,{className:`order-status-pill ${t}`,children:[(0,p.jsx)(le,{size:11}),` `,e.status||`Delivered`]})]}),(0,p.jsx)(`div`,{className:`order-items`,children:e.items.map((t,n)=>(0,p.jsxs)(`span`,{children:[t.name,` × `,t.qty,n<e.items.length-1?`, `:``]},n))}),(0,p.jsxs)(`div`,{className:`order-card-bottom`,children:[(0,p.jsxs)(`span`,{className:`order-total`,children:[`₹`,(e.total||0).toFixed(2)]}),e.status&&e.status.toLowerCase()!==`delivered`?(0,p.jsxs)(`button`,{onClick:()=>g(`/track-order?orderId=${e.id}`),style:{display:`inline-flex`,alignItems:`center`,gap:`6px`,padding:`8px 18px`,background:`var(--success)`,color:`#fff`,border:`none`,borderRadius:`10px`,fontWeight:700,fontSize:`0.85rem`,cursor:`pointer`,transition:`all 0.2s`,boxShadow:`0 2px 8px rgba(96, 178, 70, 0.2)`},onMouseEnter:e=>{e.target.style.transform=`translateY(-1px)`,e.target.style.boxShadow=`0 4px 16px rgba(96, 178, 70, 0.35)`},onMouseLeave:e=>{e.target.style.transform=``,e.target.style.boxShadow=`0 2px 8px rgba(96, 178, 70, 0.2)`},children:[(0,p.jsx)(u,{size:13}),` Track Live`]}):(0,p.jsx)(`button`,{disabled:L,onClick:()=>Pe(e.items),style:{display:`inline-flex`,alignItems:`center`,gap:`6px`,padding:`8px 18px`,background:`var(--brand-red)`,color:`#fff`,border:`none`,borderRadius:`10px`,fontWeight:700,fontSize:`0.85rem`,cursor:L?`not-allowed`:`pointer`,opacity:L?.7:1,transition:`all 0.2s`,boxShadow:`0 2px 8px rgba(247,55,79,0.2)`},onMouseEnter:e=>{L||(e.target.style.transform=`translateY(-1px)`,e.target.style.boxShadow=`0 4px 16px rgba(247,55,79,0.35)`)},onMouseLeave:e=>{e.target.style.transform=``,e.target.style.boxShadow=`0 2px 8px rgba(247,55,79,0.2)`},children:L?(0,p.jsxs)(p.Fragment,{children:[(0,p.jsx)(c,{size:13,style:{animation:`spin 1s linear infinite`}}),` Adding...`]}):(0,p.jsxs)(p.Fragment,{children:[(0,p.jsx)(s,{size:13}),` Reorder`]})})]})]},e.id)}),Ie&&(0,p.jsx)(`div`,{className:`load-more-wrap`,children:(0,p.jsxs)(`button`,{type:`button`,className:`load-more-btn`,onClick:()=>ke(e=>e+m),children:[`Show more orders (`,V.length-H,` remaining) `,(0,p.jsx)(a,{size:14})]})})]})})]})]})]})]})]}):(0,p.jsxs)(`div`,{className:`page-enter`,style:{maxWidth:`500px`,margin:`80px auto`,textAlign:`center`,display:`flex`,flexDirection:`column`,alignItems:`center`},children:[(0,p.jsx)(`div`,{style:{width:`100px`,height:`100px`,borderRadius:`50%`,background:`rgba(247,55,79,0.08)`,display:`flex`,alignItems:`center`,justifyContent:`center`,marginBottom:`24px`,border:`2px solid rgba(247,55,79,0.12)`},children:(0,p.jsx)(l,{size:48,color:`var(--brand-red)`})}),(0,p.jsx)(`h2`,{style:{fontSize:`1.8rem`,marginBottom:`8px`},children:`Please Log In`}),(0,p.jsx)(`p`,{style:{color:`var(--text-secondary)`,marginBottom:`24px`},children:`Log in to view your profile dashboard, saved addresses, and past orders.`}),(0,p.jsx)(`button`,{onClick:()=>g(`/login?redirect=/profile`),style:{padding:`14px 36px`,background:`var(--brand-red)`,color:`#fff`,border:`none`,borderRadius:`12px`,fontWeight:700,fontSize:`1rem`,cursor:`pointer`,transition:`transform 0.2s, box-shadow 0.2s`,boxShadow:`0 8px 24px rgba(247,55,79,0.25)`},children:`LOG IN NOW`})]})};export{h as default};