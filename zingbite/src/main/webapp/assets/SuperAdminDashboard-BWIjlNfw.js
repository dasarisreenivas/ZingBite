import{t as e}from"./chevron-right-uDcv4LMR.js";import{t}from"./indian-rupee-CNnbRF2f.js";import{n,t as ee}from"./ChatWidget-CuvZE_aw.js";import{A as r,D as i,E as a,O as te,S as o,T as ne,a as s,h as c,i as re,j as l,m as u,n as d,o as ie,r as f,s as ae,t as oe,u as se,w as p}from"./index-DQCTz_V-.js";var m=p(`check`,[[`path`,{d:`M20 6 9 17l-5-5`,key:`1gmf2c`}]]),ce=p(`user-check`,[[`path`,{d:`m16 11 2 2 4-4`,key:`9rsbq5`}],[`path`,{d:`M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2`,key:`1yyitq`}],[`circle`,{cx:`9`,cy:`7`,r:`4`,key:`nufk8`}]]),h=l(r(),1),g=a(),_=6,v=()=>{let{user:r,logout:a,loading:l}=(0,h.useContext)(ne),p=te(),{showAlert:v}=oe(),[y,b]=(0,h.useState)(`metrics`),[x,le]=(0,h.useState)({userCount:0,restaurantCount:0,orderCount:0,totalRevenue:0,users:[],applications:[],restaurantRequests:[]}),[S,ue]=(0,h.useState)(!0),[C,w]=(0,h.useState)(null),[T,E]=(0,h.useState)(null),[D,O]=(0,h.useState)(null),[k,de]=(0,h.useState)(_),[A,fe]=(0,h.useState)(_),[j,pe]=(0,h.useState)(_),[M,me]=(0,h.useState)(_),[N,he]=(0,h.useState)(_),[P,F]=(0,h.useState)({name:``,cuisine:``,address:``,deliveryTime:``,imagePath:``}),[I,L]=(0,h.useState)({title:``,department:``,location:``,description:``}),[R,z]=(0,h.useState)(!1),[B,V]=(0,h.useState)(!1),[H,ge]=(0,h.useState)(null),[_e,U]=(0,h.useState)(!0),[W,ve]=(0,h.useState)(!1),G=async()=>{try{U(!0),ge((await i.get(`/api/analytics`)).data)}catch(e){console.error(`Failed to fetch analytics`,e)}finally{U(!1)}},K=async(e=!1)=>{try{le((await i.get(`/api/super-admin`)).data),e||w(null)}catch(t){console.error(t),e||w(t.response?.data?.error||`Access denied or failed to load super admin stats.`)}finally{e||ue(!1)}};(0,h.useEffect)(()=>{if(l)return;if(!r){p(`/login?redirect=/admin`);return}K(!1);let e=window.location.pathname.startsWith(`/zingbite`)?`/zingbite/api/stream?topic=admin_requests`:`/api/stream?topic=admin_requests`,t=new EventSource(e);return t.onmessage=e=>{try{let t=JSON.parse(e.data);if(console.log(`[ZingBite SSE] Received real-time admin update:`,t),t&&t.event===`new_request`)try{let e=new Audio(`https://assets.mixkit.co/active_storage/sfx/2869/2869-84.wav`);e.volume=.5,e.play()}catch{}K(!0)}catch(e){console.error(`[ZingBite SSE] Error on message:`,e)}},t.onerror=e=>{console.error(`[ZingBite SSE] EventSource connection error:`,e)},()=>{t.close()}},[r,l]),(0,h.useEffect)(()=>{y===`metrics`&&G()},[y]);let ye=async(e,t)=>{E(`role-${e}`);try{await i.post(`/api/super-admin`,{action:`changeUserRole`,userId:e,role:t}),await K()}catch{v(`Failed to update user role.`,`error`)}finally{E(null)}},q=async(e,t)=>{E(`app-${e}`);try{await i.post(`/api/super-admin`,{action:`updateApplicationStatus`,appId:e,status:t}),await K()}catch{v(`Failed to update application status.`,`error`)}finally{E(null)}},J=async(e,t)=>{E(`req-${e}`);try{await i.post(`/api/super-admin`,{action:`reviewRestaurant`,requestId:e,status:t}),v(`Restaurant Request successfully ${t}!`,`success`),await K()}catch{v(`Failed to review restaurant request.`,`error`)}finally{E(null)}},be=async e=>{if(e.preventDefault(),!P.name||!P.cuisine||!P.address){v(`Please fill out all required fields.`,`warning`);return}z(!0);try{await i.post(`/api/super-admin`,{action:`addRestaurant`,name:P.name,cuisine:P.cuisine,address:P.address,deliveryTime:P.deliveryTime||void 0,imagePath:P.imagePath||void 0}),v(`Restaurant added successfully!`,`success`),F({name:``,cuisine:``,address:``,deliveryTime:``,imagePath:``}),await K()}catch{v(`Failed to create restaurant.`,`error`)}finally{z(!1)}},xe=async e=>{if(e.preventDefault(),!I.title||!I.department||!I.location||!I.description){v(`Please fill out all required fields.`,`warning`);return}V(!0);try{await i.post(`/api/super-admin`,{action:`addJob`,title:I.title,department:I.department,location:I.location,description:I.description}),v(`Job listing published successfully!`,`success`),L({title:``,department:``,location:``,description:``}),await K()}catch{v(`Failed to create job posting.`,`error`)}finally{V(!1)}};if(l||S)return(0,g.jsx)(`div`,{style:{display:`flex`,justifyContent:`center`,alignItems:`center`,flex:1,minHeight:`400px`},children:(0,g.jsx)(u,{size:36,style:{animation:`spin 1s linear infinite`,color:`var(--brand-red)`}})});if(C)return(0,g.jsxs)(`div`,{style:{maxWidth:`600px`,margin:`80px auto`,textAlign:`center`,padding:`32px`,background:`#fff`,border:`1px solid var(--border-medium)`,borderRadius:`12px`,boxShadow:`var(--shadow-md)`},className:`fade-in`,children:[(0,g.jsx)(re,{size:48,style:{color:`var(--brand-red)`,marginBottom:`16px`,margin:`0 auto 16px`}}),(0,g.jsx)(`h3`,{style:{fontSize:`1.4rem`,fontWeight:800},children:`Access Restricted`}),(0,g.jsx)(`p`,{style:{color:`var(--text-secondary)`,marginTop:`8px`,marginBottom:`24px`},children:C}),(0,g.jsxs)(`div`,{style:{display:`flex`,justifyContent:`center`,gap:`12px`},children:[(0,g.jsx)(`button`,{onClick:()=>p(`/login?redirect=/admin`),className:`btn-primary`,style:{width:`auto`,padding:`10px 20px`,fontSize:`0.9rem`,borderRadius:`4px`},children:`Switch Account`}),(0,g.jsx)(`button`,{onClick:async()=>{await a(),p(`/login?redirect=/admin`)},className:`portal-logout-btn`,children:`Logout`})]})]});let Y=(x.restaurantRequests||[]).filter(e=>e.status===`Pending`),X=(x.restaurantRequests||[]).filter(e=>e.status!==`Pending`),Z=(x.applications||[]).filter(e=>e.jobTitle===`Delivery Rider`),Q=(x.applications||[]).filter(e=>e.jobTitle!==`Delivery Rider`),Se=Y.slice(0,k),Ce=X.slice(0,A),we=(x.users||[]).slice(0,j),$=Z.slice(0,M),Te=Q.slice(0,N),Ee=k<Y.length,De=A<X.length,Oe=j<(x.users||[]).length,ke=M<Z.length,Ae=N<Q.length;return(0,g.jsxs)(g.Fragment,{children:[(0,g.jsx)(`style`,{children:`
        .admin-container {
          max-width: 1200px;
          margin: 32px auto;
          padding: 0 20px;
        }
        .stats-grid {
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(220px, 1fr));
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
        .stat-icon.red { background: rgba(247,55,79,0.08); color: var(--brand-red); }
        .stat-icon.blue { background: rgba(54,162,235,0.08); color: #36a2eb; }
        .stat-icon.green { background: rgba(75,192,192,0.08); color: #4bc0c0; }
        .stat-icon.purple { background: rgba(153,102,255,0.08); color: #9966ff; }
        .stat-number { font-size: 1.8rem; font-weight: 800; line-height: 1.1; margin-top: 4px; }
        
        .tab-bar {
          display: flex;
          border-bottom: 2px solid var(--border-light);
          margin-bottom: 24px;
          gap: 24px;
          overflow-x: auto;
          scrollbar-width: none;
          -ms-overflow-style: none;
        }
        .tab-bar::-webkit-scrollbar {
          display: none;
        }
        .tab-btn {
          background: none;
          border: none;
          padding: 12px 4px;
          font-weight: 700;
          font-size: 1rem;
          color: var(--text-secondary);
          cursor: pointer;
          position: relative;
          transition: color 0.2s;
          white-space: nowrap;
        }
        .tab-btn.active {
          color: var(--brand-red);
        }
        .tab-btn.active::after {
          content: '';
          position: absolute;
          bottom: -2px;
          left: 0;
          right: 0;
          height: 2px;
          background: var(--brand-red);
        }
        .admin-table-wrapper {
          background: #fff;
          border: 1px solid var(--border-medium);
          border-radius: var(--radius-md);
          overflow-x: auto;
          box-shadow: var(--shadow-sm);
          margin-bottom: 32px;
        }
        .admin-table {
          width: 100%;
          border-collapse: collapse;
          text-align: left;
        }
        .admin-table th {
          background: var(--bg-surface);
          padding: 16px;
          font-weight: 700;
          border-bottom: 1px solid var(--border-medium);
          font-size: 0.9rem;
        }
        .admin-table td {
          padding: 16px;
          border-bottom: 1px solid var(--border-light);
          font-size: 0.9rem;
        }
        .admin-table tr:last-child td {
          border-bottom: none;
        }
        .role-selector {
          padding: 6px 10px;
          border: 1px solid var(--border-medium);
          border-radius: 4px;
          font-size: 0.85rem;
          background: white;
          outline: none;
          font-weight: 600;
        }
        .role-selector:focus {
          border-color: var(--brand-red);
        }
        .management-grid {
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(280px, 1fr));
          gap: 32px;
        }
        .form-card {
          background: #fff;
          border: 1px solid var(--border-medium);
          border-radius: var(--radius-md);
          padding: 28px;
          box-shadow: var(--shadow-sm);
        }
        .form-group {
          margin-bottom: 16px;
        }
        .form-group label {
          display: block;
          margin-bottom: 6px;
          font-weight: 600;
          font-size: 0.9rem;
        }
        .form-group input, .form-group textarea, .form-group select {
          width: 100%;
          padding: 10px 12px;
          border: 1px solid var(--border-medium);
          border-radius: var(--radius-sm);
          font-size: 0.95rem;
          outline: none;
        }
        .form-group input:focus, .form-group textarea:focus, .form-group select:focus {
          border-color: var(--brand-red);
        }
        .btn-primary {
          background: var(--brand-red);
          color: white;
          padding: 12px 20px;
          border: none;
          border-radius: var(--radius-sm);
          font-weight: 700;
          cursor: pointer;
          display: flex;
          align-items: center;
          gap: 8px;
          transition: background 0.2s;
        }
        .btn-primary:hover {
          background: var(--brand-red-hover);
        }
        .badge {
          padding: 4px 8px;
          border-radius: 4px;
          font-size: 0.72rem;
          font-weight: 700;
          text-transform: uppercase;
        }
        .badge.applied { background: rgba(54,162,235,0.08); color: #36a2eb; }
        .badge.interview { background: rgba(255,159,64,0.08); color: #ff9f40; }
        .badge.offered { background: rgba(75,192,192,0.08); color: #4bc0c0; }
        .badge.rejected { background: rgba(226,55,68,0.08); color: var(--danger); }
        .badge.pending { background: rgba(255,159,64,0.08); color: #ff9f40; }
        .badge.approved { background: rgba(75,192,192,0.08); color: #4bc0c0; }
        
        .request-card {
          background: white;
          border: 1px solid var(--border-medium);
          border-radius: var(--radius-md);
          padding: 20px;
          margin-bottom: 16px;
          box-shadow: var(--shadow-sm);
        }
        .doc-verify-row {
          display: grid;
          grid-template-columns: repeat(3, 1fr);
          gap: 16px;
          background: var(--bg-surface);
          padding: 14px;
          border-radius: var(--radius-sm);
          margin-top: 14px;
        }
        .doc-item {
          font-size: 0.82rem;
          color: var(--text-secondary);
        }
        .doc-item strong {
          color: var(--text-primary);
          display: block;
          margin-top: 2px;
          font-family: monospace;
        }
        @media (max-width: 600px) {
          .doc-verify-row {
            grid-template-columns: 1fr;
            gap: 12px;
          }
          .form-card {
            padding: 16px;
          }
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
        
        /* Glassmorphic Analytics Dashboard Styles */
        .analytics-dashboard {
          display: grid;
          grid-template-columns: 3fr 2fr;
          gap: 24px;
          margin-bottom: 32px;
          width: 100%;
        }
        @media (max-width: 992px) {
          .analytics-dashboard {
            grid-template-columns: 1fr;
          }
        }
        .analytics-card {
          background: rgba(255, 255, 255, 0.45);
          backdrop-filter: blur(12px);
          -webkit-backdrop-filter: blur(12px);
          border: 1px solid rgba(255, 255, 255, 0.25);
          box-shadow: 0 8px 32px 0 rgba(31, 38, 135, 0.05);
          border-radius: var(--radius-md);
          padding: 24px;
          color: var(--text-primary);
        }
        .funnel-container {
          display: flex;
          flex-direction: column;
          gap: 22px;
          margin-top: 18px;
        }
        .funnel-step {
          position: relative;
        }
        .funnel-step-header {
          display: flex;
          justify-content: space-between;
          align-items: center;
          margin-bottom: 8px;
          font-weight: 700;
          font-size: 0.9rem;
        }
        .funnel-step-bar-outer {
          height: 14px;
          background: rgba(0, 0, 0, 0.05);
          border-radius: 999px;
          overflow: hidden;
          position: relative;
          border: 1px solid rgba(255, 255, 255, 0.2);
        }
        .funnel-step-bar-inner {
          height: 100%;
          border-radius: 999px;
          background: linear-gradient(90deg, var(--brand-red) 0%, #ff6b8b 100%);
          box-shadow: 0 0 10px rgba(247, 55, 79, 0.3);
          transition: width 1.2s cubic-bezier(0.25, 0.8, 0.25, 1);
        }
        .funnel-conversion-badge {
          background: rgba(247, 55, 79, 0.08);
          color: var(--brand-red);
          font-size: 0.75rem;
          padding: 2px 8px;
          border-radius: 999px;
          font-weight: 800;
          border: 1px solid rgba(247, 55, 79, 0.15);
        }
        .popular-searches-list {
          display: flex;
          flex-direction: column;
          gap: 12px;
          margin-top: 16px;
        }
        .search-item {
          display: flex;
          justify-content: space-between;
          align-items: center;
          padding: 10px 14px;
          background: rgba(255, 255, 255, 0.7);
          border-radius: 12px;
          border: 1px solid var(--border-light);
          transition: all 0.2s ease;
        }
        .search-item:hover {
          transform: translateX(4px);
          border-color: rgba(247, 55, 79, 0.2);
          background: rgba(255, 255, 255, 0.9);
        }
        .search-tag {
          font-family: monospace;
          background: rgba(0, 0, 0, 0.05);
          padding: 2px 6px;
          border-radius: 4px;
          font-size: 0.85rem;
          color: var(--text-primary);
          font-weight: 600;
        }
      `}),(0,g.jsxs)(`div`,{className:`admin-container fade-in`,children:[(0,g.jsx)(`div`,{style:{display:`flex`,justifyContent:`space-between`,alignItems:`center`,gap:`12px`,marginBottom:`24px`,flexWrap:`wrap`},children:(0,g.jsxs)(`div`,{style:{display:`flex`,alignItems:`center`,gap:`12px`},children:[(0,g.jsx)(ae,{size:32,style:{color:`var(--brand-red)`}}),(0,g.jsxs)(`div`,{children:[(0,g.jsx)(`h1`,{style:{fontSize:`1.8rem`,fontWeight:800},children:`Super Admin Command Center`}),(0,g.jsx)(`p`,{style:{color:`var(--text-secondary)`,fontSize:`0.9rem`,marginTop:`2px`},children:`Site statistics, role allocation, and listings management.`})]})]})}),(0,g.jsxs)(`div`,{className:`stats-grid`,children:[(0,g.jsxs)(`div`,{className:`stat-card`,children:[(0,g.jsx)(`div`,{className:`stat-icon red`,children:(0,g.jsx)(f,{size:24})}),(0,g.jsxs)(`div`,{children:[(0,g.jsx)(`span`,{style:{fontSize:`0.85rem`,color:`var(--text-muted)`,fontWeight:600},children:`Active Users`}),(0,g.jsx)(`div`,{className:`stat-number`,children:x?.userCount||0})]})]}),(0,g.jsxs)(`div`,{className:`stat-card`,children:[(0,g.jsx)(`div`,{className:`stat-icon blue`,children:(0,g.jsx)(s,{size:24})}),(0,g.jsxs)(`div`,{children:[(0,g.jsx)(`span`,{style:{fontSize:`0.85rem`,color:`var(--text-muted)`,fontWeight:600},children:`Restaurants`}),(0,g.jsx)(`div`,{className:`stat-number`,children:x?.restaurantCount||0})]})]}),(0,g.jsxs)(`div`,{className:`stat-card`,children:[(0,g.jsx)(`div`,{className:`stat-icon green`,children:(0,g.jsx)(ie,{size:24})}),(0,g.jsxs)(`div`,{children:[(0,g.jsx)(`span`,{style:{fontSize:`0.85rem`,color:`var(--text-muted)`,fontWeight:600},children:`Orders Placed`}),(0,g.jsx)(`div`,{className:`stat-number`,children:x?.orderCount||0})]})]}),(0,g.jsxs)(`div`,{className:`stat-card`,children:[(0,g.jsx)(`div`,{className:`stat-icon purple`,children:(0,g.jsx)(t,{size:24})}),(0,g.jsxs)(`div`,{children:[(0,g.jsx)(`span`,{style:{fontSize:`0.85rem`,color:`var(--text-muted)`,fontWeight:600},children:`Gross Revenue`}),(0,g.jsxs)(`div`,{className:`stat-number`,children:[`₹`,(x?.totalRevenue??0).toFixed(2)]})]})]})]}),(0,g.jsxs)(`div`,{className:`tab-bar`,children:[(0,g.jsx)(`button`,{className:`tab-btn ${y===`metrics`?`active`:``}`,onClick:()=>b(`metrics`),children:`Overview & Creators`}),(0,g.jsxs)(`button`,{className:`tab-btn ${y===`requests`?`active`:``}`,onClick:()=>b(`requests`),children:[`Restaurant Requests `,Y.length>0&&`(${Y.length})`]}),(0,g.jsxs)(`button`,{className:`tab-btn ${y===`users`?`active`:``}`,onClick:()=>b(`users`),children:[`Users Control (`,(x?.users||[]).length,`)`]}),(0,g.jsxs)(`button`,{className:`tab-btn ${y===`applications`?`active`:``}`,onClick:()=>b(`applications`),children:[`Applications Review (`,(x?.applications||[]).length,`)`]})]}),y===`metrics`&&(0,g.jsxs)(`div`,{children:[_e||!H?(0,g.jsxs)(`div`,{className:`analytics-card`,style:{display:`flex`,flexDirection:`column`,alignItems:`center`,justifyContent:`center`,minHeight:`300px`,marginBottom:`32px`},children:[(0,g.jsx)(u,{size:36,style:{animation:`spin 1s linear infinite`,color:`var(--brand-red)`}}),(0,g.jsx)(`p`,{style:{marginTop:`12px`,color:`var(--text-secondary)`,fontWeight:600},children:`Assembling telemetry pipeline...`})]}):(0,g.jsxs)(`div`,{className:`analytics-dashboard`,children:[(0,g.jsxs)(`div`,{className:`analytics-card`,children:[(0,g.jsxs)(`div`,{style:{display:`flex`,justifyContent:`space-between`,alignItems:`center`,marginBottom:`20px`},children:[(0,g.jsxs)(`h2`,{style:{fontSize:`1.25rem`,fontWeight:800,display:`flex`,alignItems:`center`,gap:`8px`,margin:0},children:[(0,g.jsx)(s,{size:20,style:{color:`var(--brand-red)`}}),` Platform Conversion Funnel`]}),(0,g.jsx)(`button`,{onClick:G,className:`portal-logout-btn`,style:{padding:`4px 10px`,fontSize:`0.8rem`,borderRadius:`8px`},children:`Refresh`})]}),(0,g.jsxs)(`div`,{className:`funnel-container`,children:[(0,g.jsxs)(`div`,{className:`funnel-step`,children:[(0,g.jsxs)(`div`,{className:`funnel-step-header`,children:[(0,g.jsx)(`span`,{children:`1. Discovery (Page Views)`}),(0,g.jsxs)(`div`,{style:{display:`flex`,alignItems:`center`,gap:`8px`},children:[(0,g.jsx)(`span`,{style:{fontWeight:800},children:H.pageViews}),(0,g.jsx)(`span`,{className:`funnel-conversion-badge`,children:`Baseline`})]})]}),(0,g.jsx)(`div`,{className:`funnel-step-bar-outer`,children:(0,g.jsx)(`div`,{className:`funnel-step-bar-inner`,style:{width:`100%`}})})]}),(0,g.jsxs)(`div`,{className:`funnel-step`,children:[(0,g.jsxs)(`div`,{className:`funnel-step-header`,children:[(0,g.jsx)(`span`,{children:`2. Intent (Cart Additions)`}),(0,g.jsxs)(`div`,{style:{display:`flex`,alignItems:`center`,gap:`8px`},children:[(0,g.jsx)(`span`,{style:{fontWeight:800},children:H.cartAdditions}),(0,g.jsxs)(`span`,{className:`funnel-conversion-badge`,children:[H.conversionRates.pageToCart,`%`]})]})]}),(0,g.jsx)(`div`,{className:`funnel-step-bar-outer`,children:(0,g.jsx)(`div`,{className:`funnel-step-bar-inner`,style:{width:`${Math.min(H.conversionRates.pageToCart,100)}%`}})})]}),(0,g.jsxs)(`div`,{className:`funnel-step`,children:[(0,g.jsxs)(`div`,{className:`funnel-step-header`,children:[(0,g.jsx)(`span`,{children:`3. Conversion (Completed Orders)`}),(0,g.jsxs)(`div`,{style:{display:`flex`,alignItems:`center`,gap:`8px`},children:[(0,g.jsx)(`span`,{style:{fontWeight:800},children:H.ordersPlaced}),(0,g.jsxs)(`span`,{className:`funnel-conversion-badge`,children:[H.conversionRates.overall,`%`]})]})]}),(0,g.jsx)(`div`,{className:`funnel-step-bar-outer`,children:(0,g.jsx)(`div`,{className:`funnel-step-bar-inner`,style:{width:`${Math.min(H.conversionRates.overall,100)}%`}})}),(0,g.jsxs)(`p`,{style:{fontSize:`0.78rem`,color:`var(--text-muted)`,margin:`6px 0 0 0`,textAlign:`right`},children:[`Cart-to-Order Conversion Rate: `,(0,g.jsxs)(`strong`,{children:[H.conversionRates.cartToOrder,`%`]})]})]})]})]}),(0,g.jsxs)(`div`,{className:`analytics-card`,children:[(0,g.jsxs)(`h2`,{style:{fontSize:`1.25rem`,fontWeight:800,marginBottom:`20px`,display:`flex`,alignItems:`center`,gap:`8px`},children:[(0,g.jsx)(f,{size:20,style:{color:`var(--brand-red)`}}),` Popular Searches`]}),H.popularSearches&&H.popularSearches.length>0?(0,g.jsx)(`div`,{className:`popular-searches-list`,children:H.popularSearches.map((e,t)=>(0,g.jsxs)(`div`,{className:`search-item`,children:[(0,g.jsxs)(`div`,{style:{display:`flex`,alignItems:`center`,gap:`8px`},children:[(0,g.jsxs)(`span`,{style:{fontSize:`0.8rem`,color:`var(--text-muted)`,fontWeight:800},children:[`#`,t+1]}),(0,g.jsx)(`span`,{className:`search-tag`,children:e.query})]}),(0,g.jsxs)(`span`,{style:{fontSize:`0.85rem`,fontWeight:800,color:`var(--brand-red)`,background:`rgba(247, 55, 79, 0.05)`,padding:`2px 8px`,borderRadius:`6px`},children:[e.count,` query`,e.count>1?`ies`:`y`]})]},t))}):(0,g.jsx)(`div`,{style:{textAlign:`center`,padding:`48px 16px`,color:`var(--text-secondary)`},children:`No search query data recorded.`})]})]}),(0,g.jsx)(`div`,{style:{display:`flex`,justifyContent:`center`,marginTop:`16px`,marginBottom:`24px`},children:(0,g.jsxs)(`button`,{onClick:()=>ve(!W),className:`portal-logout-btn`,style:{padding:`10px 24px`,borderRadius:`12px`,display:`flex`,alignItems:`center`,gap:`8px`,background:W?`rgba(247, 55, 79, 0.04)`:`transparent`,color:W?`var(--brand-red)`:`var(--text-secondary)`},children:[W?(0,g.jsx)(d,{size:16}):(0,g.jsx)(se,{size:16}),W?`Hide Creation Portal`:`Show Direct Creation Portal (Manual Restaurant/Jobs)`]})}),W&&(0,g.jsxs)(`div`,{className:`management-grid`,style:{animation:`fadeIn 0.3s ease-out both`},children:[(0,g.jsxs)(`div`,{className:`form-card`,children:[(0,g.jsxs)(`h2`,{style:{fontSize:`1.25rem`,fontWeight:800,marginBottom:`20px`,display:`flex`,alignItems:`center`,gap:`8px`},children:[(0,g.jsx)(s,{size:20,style:{color:`var(--brand-red)`}}),` Register New Restaurant (Direct)`]}),(0,g.jsxs)(`form`,{onSubmit:be,children:[(0,g.jsxs)(`div`,{className:`form-group`,children:[(0,g.jsx)(`label`,{children:`Restaurant Name *`}),(0,g.jsx)(`input`,{type:`text`,required:!0,placeholder:`e.g. Royal Biryani House`,value:P.name,onChange:e=>F(t=>({...t,name:e.target.value}))})]}),(0,g.jsxs)(`div`,{className:`form-group`,children:[(0,g.jsx)(`label`,{children:`Cuisine Type *`}),(0,g.jsx)(`input`,{type:`text`,required:!0,placeholder:`e.g. North Indian, Mughlai`,value:P.cuisine,onChange:e=>F(t=>({...t,cuisine:e.target.value}))})]}),(0,g.jsxs)(`div`,{className:`form-group`,children:[(0,g.jsx)(`label`,{children:`Full Address *`}),(0,g.jsx)(`input`,{type:`text`,required:!0,placeholder:`Street, City, State`,value:P.address,onChange:e=>F(t=>({...t,address:e.target.value}))})]}),(0,g.jsxs)(`div`,{className:`form-group`,children:[(0,g.jsx)(`label`,{children:`Delivery Time (e.g., "35 mins")`}),(0,g.jsx)(`input`,{type:`text`,placeholder:`e.g. 30 mins`,value:P.deliveryTime,onChange:e=>F(t=>({...t,deliveryTime:e.target.value}))})]}),(0,g.jsxs)(`div`,{className:`form-group`,children:[(0,g.jsx)(`label`,{children:`Cover Image URL`}),(0,g.jsx)(`input`,{type:`url`,placeholder:`https://images.unsplash.com/...`,value:P.imagePath,onChange:e=>F(t=>({...t,imagePath:e.target.value}))})]}),(0,g.jsx)(`button`,{type:`submit`,disabled:R,className:`btn-primary`,style:{width:`100%`},children:R?(0,g.jsx)(u,{size:16,style:{animation:`spin 1s linear infinite`}}):`Add Restaurant`})]})]}),(0,g.jsxs)(`div`,{className:`form-card`,children:[(0,g.jsxs)(`h2`,{style:{fontSize:`1.25rem`,fontWeight:800,marginBottom:`20px`,display:`flex`,alignItems:`center`,gap:`8px`},children:[(0,g.jsx)(o,{size:20,style:{color:`var(--brand-red)`}}),` Publish New Job Opening`]}),(0,g.jsxs)(`form`,{onSubmit:xe,children:[(0,g.jsxs)(`div`,{className:`form-group`,children:[(0,g.jsx)(`label`,{children:`Job Title *`}),(0,g.jsx)(`input`,{type:`text`,required:!0,placeholder:`e.g. Operations Manager`,value:I.title,onChange:e=>L(t=>({...t,title:e.target.value}))})]}),(0,g.jsxs)(`div`,{className:`form-group`,children:[(0,g.jsx)(`label`,{children:`Department *`}),(0,g.jsxs)(`select`,{required:!0,value:I.department,onChange:e=>L(t=>({...t,department:e.target.value})),children:[(0,g.jsx)(`option`,{value:``,children:`Select Department`}),(0,g.jsx)(`option`,{value:`Engineering`,children:`Engineering`}),(0,g.jsx)(`option`,{value:`Operations`,children:`Operations`}),(0,g.jsx)(`option`,{value:`Culinary`,children:`Culinary`}),(0,g.jsx)(`option`,{value:`Marketing`,children:`Marketing`})]})]}),(0,g.jsxs)(`div`,{className:`form-group`,children:[(0,g.jsx)(`label`,{children:`Location *`}),(0,g.jsx)(`input`,{type:`text`,required:!0,placeholder:`e.g. Bangalore, KA (or Remote)`,value:I.location,onChange:e=>L(t=>({...t,location:e.target.value}))})]}),(0,g.jsxs)(`div`,{className:`form-group`,children:[(0,g.jsx)(`label`,{children:`Job Description *`}),(0,g.jsx)(`textarea`,{required:!0,rows:`4`,placeholder:`Outline job responsibilities, skills needed, compensation details...`,value:I.description,onChange:e=>L(t=>({...t,description:e.target.value}))})]}),(0,g.jsx)(`button`,{type:`submit`,disabled:B,className:`btn-primary`,style:{width:`100%`},children:B?(0,g.jsx)(u,{size:16,style:{animation:`spin 1s linear infinite`}}):`Publish Job Listing`})]})]})]})]}),y===`requests`&&(0,g.jsxs)(`div`,{children:[(0,g.jsxs)(`h2`,{style:{fontSize:`1.3rem`,fontWeight:800,marginBottom:`18px`},children:[`Pending Approvals (`,Y.length,`)`]}),Y.length===0?(0,g.jsx)(`div`,{style:{textAlign:`center`,padding:`40px`,border:`1px dashed var(--border-medium)`,borderRadius:`12px`,background:`#fff`,marginBottom:`32px`},children:(0,g.jsx)(`p`,{style:{color:`var(--text-secondary)`},children:`No pending restaurant onboarding requests found.`})}):(0,g.jsxs)(`div`,{style:{marginBottom:`32px`},children:[Se.map(e=>(0,g.jsxs)(`div`,{className:`request-card`,children:[(0,g.jsxs)(`div`,{style:{display:`flex`,justifyContent:`space-between`,alignItems:`flex-start`,flexWrap:`wrap`,gap:`16px`},children:[(0,g.jsxs)(`div`,{children:[(0,g.jsxs)(`div`,{style:{display:`flex`,alignItems:`center`,gap:`10px`},children:[(0,g.jsx)(`h3`,{style:{fontSize:`1.2rem`,fontWeight:800},children:e.restaurantName}),(0,g.jsx)(`span`,{className:`badge pending`,children:`Pending verification`})]}),(0,g.jsxs)(`p`,{style:{fontSize:`0.85rem`,color:`var(--text-secondary)`,marginTop:`4px`},children:[`Cuisine: `,e.cuisineType,` | Address: `,e.address]}),(0,g.jsxs)(`p`,{style:{fontSize:`0.78rem`,color:`var(--text-muted)`,marginTop:`2px`},children:[`Submitted by Partner ID: #`,e.adminId,` on `,e.submittedDate]})]}),(0,g.jsxs)(`div`,{style:{display:`flex`,gap:`10px`},children:[(0,g.jsxs)(`button`,{disabled:T===`req-${e.id}`,onClick:()=>J(e.id,`Approved`),className:`btn-primary`,style:{background:`var(--success)`,padding:`8px 16px`,fontSize:`0.85rem`},children:[(0,g.jsx)(m,{size:16}),` Approve`]}),(0,g.jsxs)(`button`,{disabled:T===`req-${e.id}`,onClick:()=>J(e.id,`Rejected`),className:`btn-primary`,style:{background:`var(--danger)`,padding:`8px 16px`,fontSize:`0.85rem`},children:[(0,g.jsx)(d,{size:16}),` Reject`]})]})]}),(0,g.jsxs)(`div`,{className:`doc-verify-row`,children:[(0,g.jsxs)(`div`,{className:`doc-item`,children:[`License Certificate`,(0,g.jsx)(`strong`,{children:e.licenseNo})]}),(0,g.jsxs)(`div`,{className:`doc-item`,children:[`GST Registration`,(0,g.jsx)(`strong`,{children:e.gstNo})]}),(0,g.jsxs)(`div`,{className:`doc-item`,children:[`Aadhaar Number`,(0,g.jsx)(`strong`,{children:e.aadhaarNo})]})]})]},e.id)),Ee&&(0,g.jsx)(`div`,{className:`load-more-wrap`,style:{margin:`8px auto 0`},children:(0,g.jsxs)(`button`,{type:`button`,className:`load-more-btn`,onClick:()=>de(e=>e+_),children:[`Load more pending requests (`,Y.length-k,` left) `,(0,g.jsx)(e,{className:`load-more-icon`,size:16})]})})]}),(0,g.jsx)(`h2`,{style:{fontSize:`1.3rem`,fontWeight:800,marginBottom:`18px`},children:`Log Registry (Reviewed)`}),X.length===0?(0,g.jsx)(`div`,{style:{textAlign:`center`,padding:`32px`,border:`1px dashed var(--border-medium)`,borderRadius:`12px`,background:`#fff`},children:(0,g.jsx)(`p`,{style:{color:`var(--text-secondary)`},children:`Reviewed onboarding requests log will appear here.`})}):(0,g.jsxs)(`div`,{children:[Ce.map(e=>(0,g.jsx)(`div`,{className:`request-card`,style:{opacity:.8},children:(0,g.jsxs)(`div`,{style:{display:`flex`,justifyContent:`space-between`,alignItems:`center`},children:[(0,g.jsxs)(`div`,{children:[(0,g.jsx)(`h4`,{style:{fontWeight:800},children:e.restaurantName}),(0,g.jsxs)(`p`,{style:{fontSize:`0.8rem`,color:`var(--text-secondary)`,marginTop:`2px`},children:[`Address: `,e.address]})]}),(0,g.jsx)(`span`,{className:`badge ${e.status===`Approved`?`approved`:`rejected`}`,children:e.status})]})},e.id)),De&&(0,g.jsx)(`div`,{className:`load-more-wrap`,style:{margin:`8px auto 0`},children:(0,g.jsxs)(`button`,{type:`button`,className:`load-more-btn`,onClick:()=>fe(e=>e+_),children:[`Load more reviewed requests (`,X.length-A,` left) `,(0,g.jsx)(e,{className:`load-more-icon`,size:16})]})})]})]}),y===`users`&&(0,g.jsxs)(`div`,{className:`admin-table-wrapper`,children:[(0,g.jsxs)(`table`,{className:`admin-table`,children:[(0,g.jsx)(`thead`,{children:(0,g.jsxs)(`tr`,{children:[(0,g.jsx)(`th`,{children:`User ID`}),(0,g.jsx)(`th`,{children:`Username`}),(0,g.jsx)(`th`,{children:`Email`}),(0,g.jsx)(`th`,{children:`Phone Number`}),(0,g.jsx)(`th`,{children:`Role Control`})]})}),(0,g.jsx)(`tbody`,{children:we.map(e=>(0,g.jsxs)(`tr`,{children:[(0,g.jsxs)(`td`,{style:{fontWeight:700},children:[`#`,e.userID]}),(0,g.jsx)(`td`,{children:e.userName}),(0,g.jsx)(`td`,{children:e.email}),(0,g.jsx)(`td`,{children:e.phoneNumber||`N/A`}),(0,g.jsx)(`td`,{children:(0,g.jsxs)(`div`,{style:{display:`flex`,alignItems:`center`,gap:`8px`},children:[(0,g.jsxs)(`select`,{className:`role-selector`,value:e.role||`customer`,disabled:T===`role-${e.userID}`,onChange:t=>ye(e.userID,t.target.value),children:[(0,g.jsx)(`option`,{value:`customer`,children:`Customer`}),(0,g.jsx)(`option`,{value:`delivery_partner`,children:`Delivery Partner`}),(0,g.jsx)(`option`,{value:`restaurant_admin`,children:`Restaurant Admin`}),(0,g.jsx)(`option`,{value:`super_admin`,children:`Super Admin`})]}),T===`role-${e.userID}`&&(0,g.jsx)(u,{size:14,style:{animation:`spin 1s linear infinite`,color:`var(--brand-red)`}})]})})]},e.userID))})]}),Oe&&(0,g.jsx)(`div`,{className:`load-more-wrap`,style:{margin:`16px auto`},children:(0,g.jsxs)(`button`,{type:`button`,className:`load-more-btn`,onClick:()=>pe(e=>e+_),children:[`Load more users (`,(x.users||[]).length-j,` left) `,(0,g.jsx)(e,{className:`load-more-icon`,size:16})]})})]}),y===`applications`&&(0,g.jsxs)(`div`,{children:[(0,g.jsxs)(`h2`,{style:{fontSize:`1.3rem`,fontWeight:800,marginBottom:`16px`,marginTop:`16px`,display:`flex`,alignItems:`center`,gap:`8px`},children:[(0,g.jsx)(ce,{size:20,style:{color:`var(--brand-red)`}}),` Delivery Rider Onboarding Queue (`,Z.length,`)`]}),(0,g.jsxs)(`div`,{className:`admin-table-wrapper`,style:{marginBottom:`40px`},children:[Z.length===0?(0,g.jsx)(`div`,{style:{textAlign:`center`,padding:`32px`},children:(0,g.jsx)(`p`,{style:{color:`var(--text-secondary)`},children:`No delivery rider applications pending review.`})}):(0,g.jsxs)(`table`,{className:`admin-table`,children:[(0,g.jsx)(`thead`,{children:(0,g.jsxs)(`tr`,{children:[(0,g.jsx)(`th`,{children:`Candidate Name`}),(0,g.jsx)(`th`,{children:`Email / Phone`}),(0,g.jsx)(`th`,{children:`Applied Date`}),(0,g.jsx)(`th`,{children:`Resume`}),(0,g.jsx)(`th`,{children:`Chat Review`}),(0,g.jsx)(`th`,{children:`Status`}),(0,g.jsx)(`th`,{children:`Rider Onboarding Action`})]})}),(0,g.jsx)(`tbody`,{children:$.map(e=>(0,g.jsxs)(`tr`,{children:[(0,g.jsx)(`td`,{style:{fontWeight:700},children:e.candidateName}),(0,g.jsxs)(`td`,{children:[(0,g.jsx)(`div`,{style:{fontSize:`0.85rem`},children:e.email}),(0,g.jsx)(`div`,{style:{fontSize:`0.8rem`,color:`var(--text-secondary)`},children:e.phone})]}),(0,g.jsx)(`td`,{children:e.appliedDate}),(0,g.jsx)(`td`,{children:(0,g.jsxs)(`a`,{href:e.resumeUrl,target:`_blank`,rel:`noreferrer`,style:{display:`inline-flex`,alignItems:`center`,gap:`4px`,fontSize:`0.85rem`},children:[(0,g.jsx)(c,{size:14}),` Resume`]})}),(0,g.jsx)(`td`,{children:(0,g.jsxs)(`button`,{onClick:()=>O(e.id),style:{background:`transparent`,color:`#8b5cf6`,border:`1px solid #8b5cf6`,padding:`6px 10px`,borderRadius:`4px`,fontSize:`0.8rem`,fontWeight:700,cursor:`pointer`,display:`flex`,alignItems:`center`,gap:`4px`},children:[(0,g.jsx)(n,{size:12}),` Chat`]})}),(0,g.jsx)(`td`,{children:(0,g.jsx)(`span`,{className:`badge ${e.status.toLowerCase().includes(`applied`)?`applied`:e.status.toLowerCase().includes(`interview`)?`interview`:e.status.toLowerCase().includes(`offer`)?`offered`:`rejected`}`,children:e.status})}),(0,g.jsx)(`td`,{children:(0,g.jsxs)(`div`,{style:{display:`flex`,gap:`8px`},children:[(0,g.jsxs)(`button`,{disabled:T===`app-${e.id}`||e.status===`Offer Extended`,onClick:()=>q(e.id,`Offer Extended`),style:{background:`#4bc0c0`,color:`white`,border:`none`,padding:`6px 12px`,borderRadius:`4px`,fontSize:`0.8rem`,fontWeight:700,cursor:`pointer`,display:`flex`,alignItems:`center`,gap:`4px`,opacity:e.status===`Offer Extended`?.6:1},children:[(0,g.jsx)(m,{size:12}),` Approve Rider`]}),(0,g.jsxs)(`button`,{disabled:T===`app-${e.id}`||e.status===`Rejected`,onClick:()=>q(e.id,`Rejected`),style:{background:`var(--danger)`,color:`white`,border:`none`,padding:`6px 12px`,borderRadius:`4px`,fontSize:`0.8rem`,fontWeight:700,cursor:`pointer`,display:`flex`,alignItems:`center`,gap:`4px`,opacity:e.status===`Rejected`?.6:1},children:[(0,g.jsx)(d,{size:12}),` Reject Rider`]})]})})]},e.id))})]}),ke&&(0,g.jsx)(`div`,{className:`load-more-wrap`,style:{margin:`16px auto`},children:(0,g.jsxs)(`button`,{type:`button`,className:`load-more-btn`,onClick:()=>me(e=>e+_),children:[`Load more rider applications (`,Z.length-M,` left) `,(0,g.jsx)(e,{className:`load-more-icon`,size:16})]})})]}),(0,g.jsxs)(`h2`,{style:{fontSize:`1.3rem`,fontWeight:800,marginBottom:`16px`,display:`flex`,alignItems:`center`,gap:`8px`},children:[(0,g.jsx)(o,{size:20,style:{color:`var(--brand-red)`}}),` General Career Applications (`,Q.length,`)`]}),(0,g.jsxs)(`div`,{className:`admin-table-wrapper`,children:[Q.length===0?(0,g.jsx)(`div`,{style:{textAlign:`center`,padding:`32px`},children:(0,g.jsx)(`p`,{style:{color:`var(--text-secondary)`},children:`No other career applications received.`})}):(0,g.jsxs)(`table`,{className:`admin-table`,children:[(0,g.jsx)(`thead`,{children:(0,g.jsxs)(`tr`,{children:[(0,g.jsx)(`th`,{children:`Candidate Name`}),(0,g.jsx)(`th`,{children:`Target Role`}),(0,g.jsx)(`th`,{children:`Email / Phone`}),(0,g.jsx)(`th`,{children:`Applied Date`}),(0,g.jsx)(`th`,{children:`Resume`}),(0,g.jsx)(`th`,{children:`Chat`}),(0,g.jsx)(`th`,{children:`Status Action`})]})}),(0,g.jsx)(`tbody`,{children:Te.map(e=>(0,g.jsxs)(`tr`,{children:[(0,g.jsx)(`td`,{style:{fontWeight:700},children:e.candidateName}),(0,g.jsx)(`td`,{children:e.jobTitle}),(0,g.jsxs)(`td`,{children:[(0,g.jsx)(`div`,{style:{fontSize:`0.85rem`},children:e.email}),(0,g.jsx)(`div`,{style:{fontSize:`0.8rem`,color:`var(--text-secondary)`},children:e.phone})]}),(0,g.jsx)(`td`,{children:e.appliedDate}),(0,g.jsx)(`td`,{children:(0,g.jsxs)(`a`,{href:e.resumeUrl,target:`_blank`,rel:`noreferrer`,style:{display:`inline-flex`,alignItems:`center`,gap:`4px`,fontSize:`0.85rem`},children:[(0,g.jsx)(c,{size:14}),` Resume`]})}),(0,g.jsx)(`td`,{children:(0,g.jsxs)(`button`,{onClick:()=>O(e.id),style:{background:`transparent`,color:`#8b5cf6`,border:`1px solid #8b5cf6`,padding:`6px 10px`,borderRadius:`4px`,fontSize:`0.8rem`,fontWeight:700,cursor:`pointer`,display:`flex`,alignItems:`center`,gap:`4px`},children:[(0,g.jsx)(n,{size:12}),` Chat`]})}),(0,g.jsx)(`td`,{children:(0,g.jsxs)(`div`,{style:{display:`flex`,alignItems:`center`,gap:`8px`},children:[(0,g.jsxs)(`select`,{className:`role-selector`,value:e.status||`Applied`,disabled:T===`app-${e.id}`,onChange:t=>q(e.id,t.target.value),children:[(0,g.jsx)(`option`,{value:`Applied`,children:`Applied`}),(0,g.jsx)(`option`,{value:`Interview Scheduled`,children:`Interview Scheduled`}),(0,g.jsx)(`option`,{value:`Offer Extended`,children:`Offer Extended`}),(0,g.jsx)(`option`,{value:`Rejected`,children:`Rejected`})]}),T===`app-${e.id}`&&(0,g.jsx)(u,{size:14,style:{animation:`spin 1s linear infinite`,color:`var(--brand-red)`}})]})})]},e.id))})]}),Ae&&(0,g.jsx)(`div`,{className:`load-more-wrap`,style:{margin:`16px auto`},children:(0,g.jsxs)(`button`,{type:`button`,className:`load-more-btn`,onClick:()=>he(e=>e+_),children:[`Load more applications (`,Q.length-N,` left) `,(0,g.jsx)(e,{className:`load-more-icon`,size:16})]})})]})]})]}),D&&(0,g.jsx)(ee,{type:`application`,targetId:D,userId:r?.userID||r?.userId,userName:r?.userName||r?.username,receiverId:(x?.applications||[]).find(e=>e.id===D)?.userId||0,initialOpen:!0,onClose:()=>O(null)},D)]})};export{v as default};