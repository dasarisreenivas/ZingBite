import{g as e,m as t,n,r,t as i,u as ee}from"./createLucideIcon-DnU5s7Zs.js";import{t as a}from"./chevron-right-DJz7G5nn.js";import{t as o}from"./file-text-DKlaPzre.js";import{t as te}from"./indian-rupee-C7HKEesK.js";import{n as s,t as ne}from"./ChatWidget-C3LcoAOn.js";import{t as re}from"./plus-B3XK3hIx.js";import{t as ie}from"./shopping-bag-C8IdowiG.js";import{t as c}from"./users-C-F8quHz.js";import{a as ae,b as l,c as oe,d as u,n as se,o as d,r as f,w as ce}from"./index-CLDdiuGX.js";var p=i(`check`,[[`path`,{d:`M20 6 9 17l-5-5`,key:`1gmf2c`}]]),le=i(`user-check`,[[`path`,{d:`m16 11 2 2 4-4`,key:`9rsbq5`}],[`path`,{d:`M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2`,key:`1yyitq`}],[`circle`,{cx:`9`,cy:`7`,r:`4`,key:`nufk8`}]]),m=e(t(),1),h=n(),g=m.memo(({app:e,actionLoading:t,onChat:n,onUpdateStatus:r,onUpdateRiderStatus:i})=>(0,h.jsxs)(`tr`,{children:[(0,h.jsx)(`td`,{style:{fontWeight:700},children:e.candidateName}),(0,h.jsxs)(`td`,{children:[(0,h.jsx)(`div`,{style:{fontSize:`0.85rem`},children:e.email}),(0,h.jsx)(`div`,{style:{fontSize:`0.8rem`,color:`var(--text-secondary)`},children:e.phone})]}),(0,h.jsx)(`td`,{children:e.appliedDate}),(0,h.jsx)(`td`,{children:(0,h.jsxs)(`a`,{href:e.resumeUrl,target:`_blank`,rel:`noreferrer`,style:{display:`inline-flex`,alignItems:`center`,gap:`4px`,fontSize:`0.85rem`},children:[(0,h.jsx)(o,{size:14}),` Resume`]})}),(0,h.jsx)(`td`,{children:(0,h.jsxs)(`button`,{onClick:()=>n(e.id),style:{background:`transparent`,color:`#8b5cf6`,border:`1px solid #8b5cf6`,padding:`6px 10px`,borderRadius:`4px`,fontSize:`0.8rem`,fontWeight:700,cursor:`pointer`,display:`flex`,alignItems:`center`,gap:`4px`},children:[(0,h.jsx)(s,{size:12}),` Chat`]})}),(0,h.jsx)(`td`,{children:(0,h.jsx)(`span`,{className:`badge ${e.status.toLowerCase().includes(`applied`)?`applied`:e.status.toLowerCase().includes(`interview`)?`interview`:e.status.toLowerCase().includes(`offer`)?`offered`:`rejected`}`,children:e.status})}),(0,h.jsx)(`td`,{children:(0,h.jsxs)(`div`,{style:{display:`flex`,flexDirection:`column`,gap:`6px`,alignItems:`flex-start`},children:[(0,h.jsx)(`span`,{className:`badge ${(e.riderStatus||`Pending`).toLowerCase()===`active`?`approved`:(e.riderStatus||`Pending`).toLowerCase()===`pending`?`pending`:`rejected`}`,children:e.riderStatus||`Pending`}),(0,h.jsxs)(`div`,{style:{display:`flex`,gap:`6px`},children:[(0,h.jsxs)(`button`,{disabled:t===`rider-${e.userId}`||(e.riderStatus||`Pending`)===`Active`,onClick:()=>i(e.userId,`Active`),style:{background:`#4bc0c0`,color:`white`,border:`none`,padding:`4px 10px`,borderRadius:`4px`,fontSize:`0.75rem`,fontWeight:700,cursor:`pointer`,display:`flex`,alignItems:`center`,gap:`3px`,opacity:(e.riderStatus||`Pending`)===`Active`?.6:1},children:[(0,h.jsx)(p,{size:10}),` Approve`]}),(0,h.jsxs)(`button`,{disabled:t===`rider-${e.userId}`||(e.riderStatus||`Pending`)===`Suspended`,onClick:()=>i(e.userId,`Suspended`),style:{background:`var(--danger)`,color:`white`,border:`none`,padding:`4px 10px`,borderRadius:`4px`,fontSize:`0.75rem`,fontWeight:700,cursor:`pointer`,display:`flex`,alignItems:`center`,gap:`3px`,opacity:(e.riderStatus||`Pending`)===`Suspended`?.6:1},children:[(0,h.jsx)(f,{size:10}),` Reject`]})]})]})}),(0,h.jsx)(`td`,{children:(0,h.jsxs)(`div`,{style:{display:`flex`,gap:`8px`},children:[(0,h.jsxs)(`button`,{disabled:t===`app-${e.id}`||e.status===`Offered`,onClick:()=>r(e.id,`Offered`),style:{background:`#4bc0c0`,color:`white`,border:`none`,padding:`6px 12px`,borderRadius:`4px`,fontSize:`0.8rem`,fontWeight:700,cursor:`pointer`,display:`flex`,alignItems:`center`,gap:`4px`,opacity:e.status===`Offered`?.6:1},children:[(0,h.jsx)(p,{size:12}),` Approve Rider`]}),(0,h.jsxs)(`button`,{disabled:t===`app-${e.id}`||e.status===`Rejected`,onClick:()=>r(e.id,`Rejected`),style:{background:`var(--danger)`,color:`white`,border:`none`,padding:`6px 12px`,borderRadius:`4px`,fontSize:`0.8rem`,fontWeight:700,cursor:`pointer`,display:`flex`,alignItems:`center`,gap:`4px`,opacity:e.status===`Rejected`?.6:1},children:[(0,h.jsx)(f,{size:12}),` Reject Rider`]})]})})]}));g.displayName=`RiderApplicationRow`;var _=6,v=()=>{let{user:e,logout:t,loading:n}=(0,m.useContext)(ce),i=ee(),{showAlert:v}=se(),[y,b]=(0,m.useState)(`metrics`),[x,ue]=(0,m.useState)({userCount:0,restaurantCount:0,orderCount:0,totalRevenue:0,users:[],applications:[],restaurantRequests:[]}),[de,fe]=(0,m.useState)(!0),[S,C]=(0,m.useState)(null),[w,T]=(0,m.useState)(null),[E,D]=(0,m.useState)(null),[O,pe]=(0,m.useState)(_),[k,me]=(0,m.useState)(_),[A,he]=(0,m.useState)(_),[j,ge]=(0,m.useState)(_),[M,_e]=(0,m.useState)(_),[N,P]=(0,m.useState)({name:``,cuisine:``,address:``,deliveryTime:``,imagePath:``}),[F,I]=(0,m.useState)({title:``,department:``,location:``,description:``}),[L,R]=(0,m.useState)(!1),[z,B]=(0,m.useState)(!1),[V,ve]=(0,m.useState)(null),[ye,H]=(0,m.useState)(!0),[U,be]=(0,m.useState)(!1),W=async()=>{try{H(!0),ve((await r.get(`/api/analytics`)).data)}catch(e){console.error(`Failed to fetch analytics`,e)}finally{H(!1)}},G=async(e=!1)=>{try{ue((await r.get(`/api/super-admin`)).data),e||C(null)}catch(t){console.error(t),e||C(t.response?.data?.error||`Access denied or failed to load super admin stats.`)}finally{e||fe(!1)}};(0,m.useEffect)(()=>{if(n)return;if(!e){i(`/login?redirect=/admin`);return}G(!1);let t=window.location.pathname.startsWith(`/zingbite`)?`/zingbite/api/stream?topic=admin_requests`:`/api/stream?topic=admin_requests`,r=new EventSource(t);return r.onmessage=e=>{try{let t=JSON.parse(e.data);if(console.log(`[ZingBite SSE] Received real-time admin update:`,t),t&&t.event===`new_request`)try{let e=new Audio(`https://assets.mixkit.co/active_storage/sfx/2869/2869-84.wav`);e.volume=.5,e.play()}catch{}G(!0)}catch(e){console.error(`[ZingBite SSE] Error on message:`,e)}},r.onerror=e=>{console.error(`[ZingBite SSE] EventSource connection error:`,e)},()=>{r.close()}},[e,n]),(0,m.useEffect)(()=>{y===`metrics`&&W()},[y]);let K=async(e,t)=>{T(`rider-${e}`);try{await r.post(`/api/super-admin`,{action:`changeRiderStatus`,userId:e,riderStatus:t}),await G()}catch{v(`Failed to update rider status.`,`error`)}finally{T(null)}},xe=async(e,t)=>{T(`role-${e}`);try{await r.post(`/api/super-admin`,{action:`changeUserRole`,userId:e,role:t}),await G()}catch{v(`Failed to update user role.`,`error`)}finally{T(null)}},q=async(e,t)=>{T(`app-${e}`);try{await r.post(`/api/super-admin`,{action:`updateApplicationStatus`,appId:e,status:t}),await G()}catch{v(`Failed to update application status.`,`error`)}finally{T(null)}},J=async(e,t)=>{T(`req-${e}`);try{await r.post(`/api/super-admin`,{action:`reviewRestaurant`,requestId:e,status:t}),v(`Restaurant Request successfully ${t}!`,`success`),await G()}catch{v(`Failed to review restaurant request.`,`error`)}finally{T(null)}},Se=async e=>{if(e.preventDefault(),!N.name||!N.cuisine||!N.address){v(`Please fill out all required fields.`,`warning`);return}R(!0);try{await r.post(`/api/super-admin`,{action:`addRestaurant`,name:N.name,cuisine:N.cuisine,address:N.address,deliveryTime:N.deliveryTime||void 0,imagePath:N.imagePath||void 0}),v(`Restaurant added successfully!`,`success`),P({name:``,cuisine:``,address:``,deliveryTime:``,imagePath:``}),await G()}catch{v(`Failed to create restaurant.`,`error`)}finally{R(!1)}},Ce=async e=>{if(e.preventDefault(),!F.title||!F.department||!F.location||!F.description){v(`Please fill out all required fields.`,`warning`);return}B(!0);try{await r.post(`/api/super-admin`,{action:`addJob`,title:F.title,department:F.department,location:F.location,description:F.description}),v(`Job listing published successfully!`,`success`),I({title:``,department:``,location:``,description:``}),await G()}catch{v(`Failed to create job posting.`,`error`)}finally{B(!1)}};if(n||de)return(0,h.jsx)(`div`,{style:{display:`flex`,justifyContent:`center`,alignItems:`center`,flex:1,minHeight:`400px`},children:(0,h.jsx)(u,{size:36,style:{animation:`spin 1s linear infinite`,color:`var(--brand-red)`}})});if(S)return(0,h.jsxs)(`div`,{style:{maxWidth:`600px`,margin:`80px auto`,textAlign:`center`,padding:`32px`,background:`#fff`,border:`1px solid var(--border-medium)`,borderRadius:`12px`,boxShadow:`var(--shadow-md)`},className:`fade-in`,children:[(0,h.jsx)(ae,{size:48,style:{color:`var(--brand-red)`,marginBottom:`16px`,margin:`0 auto 16px`}}),(0,h.jsx)(`h3`,{style:{fontSize:`1.4rem`,fontWeight:800},children:`Access Restricted`}),(0,h.jsx)(`p`,{style:{color:`var(--text-secondary)`,marginTop:`8px`,marginBottom:`24px`},children:S}),(0,h.jsxs)(`div`,{style:{display:`flex`,justifyContent:`center`,gap:`12px`},children:[(0,h.jsx)(`button`,{onClick:()=>i(`/login?redirect=/admin`),className:`btn-primary`,style:{width:`auto`,padding:`10px 20px`,fontSize:`0.9rem`,borderRadius:`4px`},children:`Switch Account`}),(0,h.jsx)(`button`,{onClick:async()=>{await t(),i(`/login?redirect=/admin`)},className:`portal-logout-btn`,children:`Logout`})]})]});let Y=(0,m.useMemo)(()=>(x.restaurantRequests||[]).filter(e=>e.status===`Pending`),[x.restaurantRequests]),X=(0,m.useMemo)(()=>(x.restaurantRequests||[]).filter(e=>e.status!==`Pending`),[x.restaurantRequests]),Z=(0,m.useMemo)(()=>(x.applications||[]).filter(e=>e.jobTitle===`Delivery Rider`),[x.applications]),Q=(0,m.useMemo)(()=>(x.applications||[]).filter(e=>e.jobTitle!==`Delivery Rider`),[x.applications]),we=(0,m.useMemo)(()=>Y.slice(0,O),[Y,O]),$=(0,m.useMemo)(()=>X.slice(0,k),[X,k]),Te=(0,m.useMemo)(()=>(x.users||[]).slice(0,A),[x.users,A]),Ee=(0,m.useMemo)(()=>Z.slice(0,j),[Z,j]),De=(0,m.useMemo)(()=>Q.slice(0,M),[Q,M]),Oe=(0,m.useMemo)(()=>O<Y.length,[O,Y.length]),ke=(0,m.useMemo)(()=>k<X.length,[k,X.length]),Ae=(0,m.useMemo)(()=>A<(x.users||[]).length,[A,x.users]),je=(0,m.useMemo)(()=>j<Z.length,[j,Z.length]),Me=(0,m.useMemo)(()=>M<Q.length,[M,Q.length]);return(0,h.jsxs)(h.Fragment,{children:[(0,h.jsx)(`style`,{children:`
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
          padding: 6px 32px 6px 10px;
          border: 1.5px solid var(--border-medium);
          border-radius: 8px;
          font-size: 0.85rem;
          background: #fff;
          outline: none;
          font-weight: 600;
          cursor: pointer;
          transition: all 0.2s var(--ease-premium);
          appearance: none;
          -webkit-appearance: none;
          -moz-appearance: none;
          background-image: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='11' height='11' viewBox='0 0 24 24' fill='none' stroke='%239e9e9e' stroke-width='2.5' stroke-linecap='round' stroke-linejoin='round'%3E%3Cpath d='m6 9 6 6 6-6'/%3E%3C/svg%3E");
          background-repeat: no-repeat;
          background-position: right 8px center;
          background-size: 13px;
        }
        .role-selector:hover {
          border-color: var(--brand-red);
          background-image: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='11' height='11' viewBox='0 0 24 24' fill='none' stroke='%23F7374F' stroke-width='2.5' stroke-linecap='round' stroke-linejoin='round'%3E%3Cpath d='m6 9 6 6 6-6'/%3E%3C/svg%3E");
        }
        .role-selector:focus {
          border-color: var(--brand-red);
          box-shadow: 0 0 0 3px rgba(247,55,79,0.1);
          background-image: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='11' height='11' viewBox='0 0 24 24' fill='none' stroke='%23F7374F' stroke-width='2.5' stroke-linecap='round' stroke-linejoin='round'%3E%3Cpath d='m6 9 6 6 6-6'/%3E%3C/svg%3E");
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
          padding: 10px 36px 10px 12px;
          border: 1.5px solid var(--border-medium);
          border-radius: var(--radius-sm);
          font-size: 0.95rem;
          outline: none;
          transition: all 0.25s var(--ease-premium);
        }
        .form-group select {
          cursor: pointer;
          appearance: none;
          -webkit-appearance: none;
          -moz-appearance: none;
          background-image: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='12' height='12' viewBox='0 0 24 24' fill='none' stroke='%239e9e9e' stroke-width='2.5' stroke-linecap='round' stroke-linejoin='round'%3E%3Cpath d='m6 9 6 6 6-6'/%3E%3C/svg%3E");
          background-repeat: no-repeat;
          background-position: right 12px center;
          background-size: 14px;
        }
        .form-group select:hover {
          border-color: var(--brand-red);
          background-image: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='12' height='12' viewBox='0 0 24 24' fill='none' stroke='%23F7374F' stroke-width='2.5' stroke-linecap='round' stroke-linejoin='round'%3E%3Cpath d='m6 9 6 6 6-6'/%3E%3C/svg%3E");
        }
        .form-group input:focus, .form-group textarea:focus, .form-group select:focus {
          border-color: var(--brand-red);
          box-shadow: 0 0 0 3px rgba(247,55,79,0.1);
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
      `}),(0,h.jsxs)(`div`,{className:`admin-container fade-in page-enter`,children:[(0,h.jsx)(`div`,{style:{display:`flex`,justifyContent:`space-between`,alignItems:`center`,gap:`12px`,marginBottom:`24px`,flexWrap:`wrap`},children:(0,h.jsxs)(`div`,{style:{display:`flex`,alignItems:`center`,gap:`12px`},children:[(0,h.jsx)(oe,{size:32,style:{color:`var(--brand-red)`}}),(0,h.jsxs)(`div`,{children:[(0,h.jsx)(`h1`,{style:{fontSize:`1.8rem`,fontWeight:800},children:`Super Admin Command Center`}),(0,h.jsx)(`p`,{style:{color:`var(--text-secondary)`,fontSize:`0.9rem`,marginTop:`2px`},children:`Site statistics, role allocation, and listings management.`})]})]})}),(0,h.jsxs)(`div`,{className:`stats-grid`,children:[(0,h.jsxs)(`div`,{className:`stat-card`,children:[(0,h.jsx)(`div`,{className:`stat-icon red`,children:(0,h.jsx)(c,{size:24})}),(0,h.jsxs)(`div`,{children:[(0,h.jsx)(`span`,{style:{fontSize:`0.85rem`,color:`var(--text-muted)`,fontWeight:600},children:`Active Users`}),(0,h.jsx)(`div`,{className:`stat-number`,children:x?.userCount||0})]})]}),(0,h.jsxs)(`div`,{className:`stat-card`,children:[(0,h.jsx)(`div`,{className:`stat-icon blue`,children:(0,h.jsx)(d,{size:24})}),(0,h.jsxs)(`div`,{children:[(0,h.jsx)(`span`,{style:{fontSize:`0.85rem`,color:`var(--text-muted)`,fontWeight:600},children:`Restaurants`}),(0,h.jsx)(`div`,{className:`stat-number`,children:x?.restaurantCount||0})]})]}),(0,h.jsxs)(`div`,{className:`stat-card`,children:[(0,h.jsx)(`div`,{className:`stat-icon green`,children:(0,h.jsx)(ie,{size:24})}),(0,h.jsxs)(`div`,{children:[(0,h.jsx)(`span`,{style:{fontSize:`0.85rem`,color:`var(--text-muted)`,fontWeight:600},children:`Orders Placed`}),(0,h.jsx)(`div`,{className:`stat-number`,children:x?.orderCount||0})]})]}),(0,h.jsxs)(`div`,{className:`stat-card`,children:[(0,h.jsx)(`div`,{className:`stat-icon purple`,children:(0,h.jsx)(te,{size:24})}),(0,h.jsxs)(`div`,{children:[(0,h.jsx)(`span`,{style:{fontSize:`0.85rem`,color:`var(--text-muted)`,fontWeight:600},children:`Gross Revenue`}),(0,h.jsxs)(`div`,{className:`stat-number`,children:[`₹`,(x?.totalRevenue??0).toFixed(2)]})]})]})]}),(0,h.jsxs)(`div`,{className:`tab-bar`,children:[(0,h.jsx)(`button`,{className:`tab-btn ${y===`metrics`?`active`:``}`,onClick:()=>b(`metrics`),children:`Overview & Creators`}),(0,h.jsxs)(`button`,{className:`tab-btn ${y===`requests`?`active`:``}`,onClick:()=>b(`requests`),children:[`Restaurant Requests `,Y.length>0&&`(${Y.length})`]}),(0,h.jsxs)(`button`,{className:`tab-btn ${y===`users`?`active`:``}`,onClick:()=>b(`users`),children:[`Users Control (`,(x?.users||[]).length,`)`]}),(0,h.jsxs)(`button`,{className:`tab-btn ${y===`applications`?`active`:``}`,onClick:()=>b(`applications`),children:[`Applications Review (`,(x?.applications||[]).length,`)`]})]}),y===`metrics`&&(0,h.jsxs)(`div`,{children:[ye||!V?(0,h.jsxs)(`div`,{className:`analytics-card`,style:{display:`flex`,flexDirection:`column`,alignItems:`center`,justifyContent:`center`,minHeight:`300px`,marginBottom:`32px`},children:[(0,h.jsx)(u,{size:36,style:{animation:`spin 1s linear infinite`,color:`var(--brand-red)`}}),(0,h.jsx)(`p`,{style:{marginTop:`12px`,color:`var(--text-secondary)`,fontWeight:600},children:`Assembling telemetry pipeline...`})]}):(0,h.jsxs)(`div`,{className:`analytics-dashboard`,children:[(0,h.jsxs)(`div`,{className:`analytics-card`,children:[(0,h.jsxs)(`div`,{style:{display:`flex`,justifyContent:`space-between`,alignItems:`center`,marginBottom:`20px`},children:[(0,h.jsxs)(`h2`,{style:{fontSize:`1.25rem`,fontWeight:800,display:`flex`,alignItems:`center`,gap:`8px`,margin:0},children:[(0,h.jsx)(d,{size:20,style:{color:`var(--brand-red)`}}),` Platform Conversion Funnel`]}),(0,h.jsx)(`button`,{onClick:W,className:`portal-logout-btn`,style:{padding:`4px 10px`,fontSize:`0.8rem`,borderRadius:`8px`},children:`Refresh`})]}),(0,h.jsxs)(`div`,{className:`funnel-container`,children:[(0,h.jsxs)(`div`,{className:`funnel-step`,children:[(0,h.jsxs)(`div`,{className:`funnel-step-header`,children:[(0,h.jsx)(`span`,{children:`1. Discovery (Page Views)`}),(0,h.jsxs)(`div`,{style:{display:`flex`,alignItems:`center`,gap:`8px`},children:[(0,h.jsx)(`span`,{style:{fontWeight:800},children:V.pageViews}),(0,h.jsx)(`span`,{className:`funnel-conversion-badge`,children:`Baseline`})]})]}),(0,h.jsx)(`div`,{className:`funnel-step-bar-outer`,children:(0,h.jsx)(`div`,{className:`funnel-step-bar-inner`,style:{width:`100%`}})})]}),(0,h.jsxs)(`div`,{className:`funnel-step`,children:[(0,h.jsxs)(`div`,{className:`funnel-step-header`,children:[(0,h.jsx)(`span`,{children:`2. Intent (Cart Additions)`}),(0,h.jsxs)(`div`,{style:{display:`flex`,alignItems:`center`,gap:`8px`},children:[(0,h.jsx)(`span`,{style:{fontWeight:800},children:V.cartAdditions}),(0,h.jsxs)(`span`,{className:`funnel-conversion-badge`,children:[V.conversionRates.pageToCart,`%`]})]})]}),(0,h.jsx)(`div`,{className:`funnel-step-bar-outer`,children:(0,h.jsx)(`div`,{className:`funnel-step-bar-inner`,style:{width:`${Math.min(V.conversionRates.pageToCart,100)}%`}})})]}),(0,h.jsxs)(`div`,{className:`funnel-step`,children:[(0,h.jsxs)(`div`,{className:`funnel-step-header`,children:[(0,h.jsx)(`span`,{children:`3. Conversion (Completed Orders)`}),(0,h.jsxs)(`div`,{style:{display:`flex`,alignItems:`center`,gap:`8px`},children:[(0,h.jsx)(`span`,{style:{fontWeight:800},children:V.ordersPlaced}),(0,h.jsxs)(`span`,{className:`funnel-conversion-badge`,children:[V.conversionRates.overall,`%`]})]})]}),(0,h.jsx)(`div`,{className:`funnel-step-bar-outer`,children:(0,h.jsx)(`div`,{className:`funnel-step-bar-inner`,style:{width:`${Math.min(V.conversionRates.overall,100)}%`}})}),(0,h.jsxs)(`p`,{style:{fontSize:`0.78rem`,color:`var(--text-muted)`,margin:`6px 0 0 0`,textAlign:`right`},children:[`Cart-to-Order Conversion Rate: `,(0,h.jsxs)(`strong`,{children:[V.conversionRates.cartToOrder,`%`]})]})]})]})]}),(0,h.jsxs)(`div`,{className:`analytics-card`,children:[(0,h.jsxs)(`h2`,{style:{fontSize:`1.25rem`,fontWeight:800,marginBottom:`20px`,display:`flex`,alignItems:`center`,gap:`8px`},children:[(0,h.jsx)(c,{size:20,style:{color:`var(--brand-red)`}}),` Popular Searches`]}),V.popularSearches&&V.popularSearches.length>0?(0,h.jsx)(`div`,{className:`popular-searches-list`,children:V.popularSearches.map((e,t)=>(0,h.jsxs)(`div`,{className:`search-item`,children:[(0,h.jsxs)(`div`,{style:{display:`flex`,alignItems:`center`,gap:`8px`},children:[(0,h.jsxs)(`span`,{style:{fontSize:`0.8rem`,color:`var(--text-muted)`,fontWeight:800},children:[`#`,t+1]}),(0,h.jsx)(`span`,{className:`search-tag`,children:e.query})]}),(0,h.jsxs)(`span`,{style:{fontSize:`0.85rem`,fontWeight:800,color:`var(--brand-red)`,background:`rgba(247, 55, 79, 0.05)`,padding:`2px 8px`,borderRadius:`6px`},children:[e.count,` query`,e.count>1?`ies`:`y`]})]},t))}):(0,h.jsx)(`div`,{style:{textAlign:`center`,padding:`48px 16px`,color:`var(--text-secondary)`},children:`No search query data recorded.`})]})]}),(0,h.jsx)(`div`,{style:{display:`flex`,justifyContent:`center`,marginTop:`16px`,marginBottom:`24px`},children:(0,h.jsxs)(`button`,{onClick:()=>be(!U),className:`portal-logout-btn`,style:{padding:`10px 24px`,borderRadius:`12px`,display:`flex`,alignItems:`center`,gap:`8px`,background:U?`rgba(247, 55, 79, 0.04)`:`transparent`,color:U?`var(--brand-red)`:`var(--text-secondary)`},children:[U?(0,h.jsx)(f,{size:16}):(0,h.jsx)(re,{size:16}),U?`Hide Creation Portal`:`Show Direct Creation Portal (Manual Restaurant/Jobs)`]})}),U&&(0,h.jsxs)(`div`,{className:`management-grid`,style:{animation:`fadeIn 0.3s ease-out both`},children:[(0,h.jsxs)(`div`,{className:`form-card`,children:[(0,h.jsxs)(`h2`,{style:{fontSize:`1.25rem`,fontWeight:800,marginBottom:`20px`,display:`flex`,alignItems:`center`,gap:`8px`},children:[(0,h.jsx)(d,{size:20,style:{color:`var(--brand-red)`}}),` Register New Restaurant (Direct)`]}),(0,h.jsxs)(`form`,{onSubmit:Se,children:[(0,h.jsxs)(`div`,{className:`form-group`,children:[(0,h.jsx)(`label`,{children:`Restaurant Name *`}),(0,h.jsx)(`input`,{type:`text`,required:!0,placeholder:`e.g. Royal Biryani House`,value:N.name,onChange:e=>P(t=>({...t,name:e.target.value}))})]}),(0,h.jsxs)(`div`,{className:`form-group`,children:[(0,h.jsx)(`label`,{children:`Cuisine Type *`}),(0,h.jsx)(`input`,{type:`text`,required:!0,placeholder:`e.g. North Indian, Mughlai`,value:N.cuisine,onChange:e=>P(t=>({...t,cuisine:e.target.value}))})]}),(0,h.jsxs)(`div`,{className:`form-group`,children:[(0,h.jsx)(`label`,{children:`Full Address *`}),(0,h.jsx)(`input`,{type:`text`,required:!0,placeholder:`Street, City, State`,value:N.address,onChange:e=>P(t=>({...t,address:e.target.value}))})]}),(0,h.jsxs)(`div`,{className:`form-group`,children:[(0,h.jsx)(`label`,{children:`Delivery Time (e.g., "35 mins")`}),(0,h.jsx)(`input`,{type:`text`,placeholder:`e.g. 30 mins`,value:N.deliveryTime,onChange:e=>P(t=>({...t,deliveryTime:e.target.value}))})]}),(0,h.jsxs)(`div`,{className:`form-group`,children:[(0,h.jsx)(`label`,{children:`Cover Image URL`}),(0,h.jsx)(`input`,{type:`url`,placeholder:`https://images.unsplash.com/...`,value:N.imagePath,onChange:e=>P(t=>({...t,imagePath:e.target.value}))})]}),(0,h.jsx)(`button`,{type:`submit`,disabled:L,className:`btn-primary`,style:{width:`100%`},children:L?(0,h.jsx)(u,{size:16,style:{animation:`spin 1s linear infinite`}}):`Add Restaurant`})]})]}),(0,h.jsxs)(`div`,{className:`form-card`,children:[(0,h.jsxs)(`h2`,{style:{fontSize:`1.25rem`,fontWeight:800,marginBottom:`20px`,display:`flex`,alignItems:`center`,gap:`8px`},children:[(0,h.jsx)(l,{size:20,style:{color:`var(--brand-red)`}}),` Publish New Job Opening`]}),(0,h.jsxs)(`form`,{onSubmit:Ce,children:[(0,h.jsxs)(`div`,{className:`form-group`,children:[(0,h.jsx)(`label`,{children:`Job Title *`}),(0,h.jsx)(`input`,{type:`text`,required:!0,placeholder:`e.g. Operations Manager`,value:F.title,onChange:e=>I(t=>({...t,title:e.target.value}))})]}),(0,h.jsxs)(`div`,{className:`form-group`,children:[(0,h.jsx)(`label`,{children:`Department *`}),(0,h.jsxs)(`select`,{required:!0,value:F.department,onChange:e=>I(t=>({...t,department:e.target.value})),children:[(0,h.jsx)(`option`,{value:``,children:`Select Department`}),(0,h.jsx)(`option`,{value:`Engineering`,children:`Engineering`}),(0,h.jsx)(`option`,{value:`Operations`,children:`Operations`}),(0,h.jsx)(`option`,{value:`Culinary`,children:`Culinary`}),(0,h.jsx)(`option`,{value:`Marketing`,children:`Marketing`})]})]}),(0,h.jsxs)(`div`,{className:`form-group`,children:[(0,h.jsx)(`label`,{children:`Location *`}),(0,h.jsx)(`input`,{type:`text`,required:!0,placeholder:`e.g. Bangalore, KA (or Remote)`,value:F.location,onChange:e=>I(t=>({...t,location:e.target.value}))})]}),(0,h.jsxs)(`div`,{className:`form-group`,children:[(0,h.jsx)(`label`,{children:`Job Description *`}),(0,h.jsx)(`textarea`,{required:!0,rows:`4`,placeholder:`Outline job responsibilities, skills needed, compensation details...`,value:F.description,onChange:e=>I(t=>({...t,description:e.target.value}))})]}),(0,h.jsx)(`button`,{type:`submit`,disabled:z,className:`btn-primary`,style:{width:`100%`},children:z?(0,h.jsx)(u,{size:16,style:{animation:`spin 1s linear infinite`}}):`Publish Job Listing`})]})]})]})]}),y===`requests`&&(0,h.jsxs)(`div`,{children:[(0,h.jsxs)(`h2`,{style:{fontSize:`1.3rem`,fontWeight:800,marginBottom:`18px`},children:[`Pending Approvals (`,Y.length,`)`]}),Y.length===0?(0,h.jsx)(`div`,{style:{textAlign:`center`,padding:`40px`,border:`1px dashed var(--border-medium)`,borderRadius:`12px`,background:`#fff`,marginBottom:`32px`},children:(0,h.jsx)(`p`,{style:{color:`var(--text-secondary)`},children:`No pending restaurant onboarding requests found.`})}):(0,h.jsxs)(`div`,{style:{marginBottom:`32px`},children:[we.map((e,t)=>(0,h.jsxs)(`div`,{className:`request-card`,children:[(0,h.jsxs)(`div`,{style:{display:`flex`,justifyContent:`space-between`,alignItems:`flex-start`,flexWrap:`wrap`,gap:`16px`},children:[(0,h.jsxs)(`div`,{children:[(0,h.jsxs)(`div`,{style:{display:`flex`,alignItems:`center`,gap:`10px`},children:[(0,h.jsx)(`h3`,{style:{fontSize:`1.2rem`,fontWeight:800},children:e.restaurantName}),(0,h.jsx)(`span`,{className:`badge pending`,children:`Pending verification`})]}),(0,h.jsxs)(`p`,{style:{fontSize:`0.85rem`,color:`var(--text-secondary)`,marginTop:`4px`},children:[`Cuisine: `,e.cuisineType,` | Address: `,e.address]}),(0,h.jsxs)(`p`,{style:{fontSize:`0.78rem`,color:`var(--text-muted)`,marginTop:`2px`},children:[`Submitted by Partner ID: #`,e.adminId,` on `,e.submittedDate]})]}),(0,h.jsxs)(`div`,{style:{display:`flex`,gap:`10px`},children:[(0,h.jsxs)(`button`,{disabled:w===`req-${e.id}`,onClick:()=>J(e.id,`Approved`),className:`btn-primary`,style:{background:`var(--success)`,padding:`8px 16px`,fontSize:`0.85rem`},children:[(0,h.jsx)(p,{size:16}),` Approve`]}),(0,h.jsxs)(`button`,{disabled:w===`req-${e.id}`,onClick:()=>J(e.id,`Rejected`),className:`btn-primary`,style:{background:`var(--danger)`,padding:`8px 16px`,fontSize:`0.85rem`},children:[(0,h.jsx)(f,{size:16}),` Reject`]})]})]}),(0,h.jsxs)(`div`,{className:`doc-verify-row`,children:[(0,h.jsxs)(`div`,{className:`doc-item`,children:[`License Certificate`,(0,h.jsx)(`strong`,{children:e.licenseNo})]}),(0,h.jsxs)(`div`,{className:`doc-item`,children:[`GST Registration`,(0,h.jsx)(`strong`,{children:e.gstNo})]}),(0,h.jsxs)(`div`,{className:`doc-item`,children:[`Aadhaar Number`,(0,h.jsx)(`strong`,{children:e.aadhaarNo})]})]})]},`pending-${e.id}-${e.restaurantName||``}-${t}`)),Oe&&(0,h.jsx)(`div`,{className:`load-more-wrap`,style:{margin:`8px auto 0`},children:(0,h.jsxs)(`button`,{type:`button`,className:`load-more-btn`,onClick:()=>pe(e=>e+_),children:[`Load more pending requests (`,Y.length-O,` left) `,(0,h.jsx)(a,{className:`load-more-icon`,size:16})]})})]}),(0,h.jsx)(`h2`,{style:{fontSize:`1.3rem`,fontWeight:800,marginBottom:`18px`},children:`Log Registry (Reviewed)`}),X.length===0?(0,h.jsx)(`div`,{style:{textAlign:`center`,padding:`32px`,border:`1px dashed var(--border-medium)`,borderRadius:`12px`,background:`#fff`},children:(0,h.jsx)(`p`,{style:{color:`var(--text-secondary)`},children:`Reviewed onboarding requests log will appear here.`})}):(0,h.jsxs)(`div`,{children:[$.map((e,t)=>(0,h.jsx)(`div`,{className:`request-card`,style:{opacity:.8},children:(0,h.jsxs)(`div`,{style:{display:`flex`,justifyContent:`space-between`,alignItems:`center`},children:[(0,h.jsxs)(`div`,{children:[(0,h.jsx)(`h4`,{style:{fontWeight:800},children:e.restaurantName}),(0,h.jsxs)(`p`,{style:{fontSize:`0.8rem`,color:`var(--text-secondary)`,marginTop:`2px`},children:[`Address: `,e.address]})]}),(0,h.jsx)(`span`,{className:`badge ${e.status===`Approved`?`approved`:`rejected`}`,children:e.status})]})},`reviewed-${e.id}-${e.restaurantName||``}-${t}`)),ke&&(0,h.jsx)(`div`,{className:`load-more-wrap`,style:{margin:`8px auto 0`},children:(0,h.jsxs)(`button`,{type:`button`,className:`load-more-btn`,onClick:()=>me(e=>e+_),children:[`Load more reviewed requests (`,X.length-k,` left) `,(0,h.jsx)(a,{className:`load-more-icon`,size:16})]})})]})]}),y===`users`&&(0,h.jsxs)(`div`,{className:`admin-table-wrapper`,children:[(0,h.jsxs)(`table`,{className:`admin-table`,children:[(0,h.jsx)(`thead`,{children:(0,h.jsxs)(`tr`,{children:[(0,h.jsx)(`th`,{children:`User ID`}),(0,h.jsx)(`th`,{children:`Username`}),(0,h.jsx)(`th`,{children:`Email`}),(0,h.jsx)(`th`,{children:`Phone Number`}),(0,h.jsx)(`th`,{children:`Rider Status`}),(0,h.jsx)(`th`,{children:`Rider Actions`}),(0,h.jsx)(`th`,{children:`Role Control`})]})}),(0,h.jsx)(`tbody`,{children:Te.map((e,t)=>(0,h.jsxs)(`tr`,{children:[(0,h.jsxs)(`td`,{style:{fontWeight:700},children:[`#`,e.userID]}),(0,h.jsx)(`td`,{children:e.userName}),(0,h.jsx)(`td`,{children:e.email}),(0,h.jsx)(`td`,{children:e.phoneNumber||`N/A`}),(0,h.jsx)(`td`,{children:e.role===`delivery_partner`||e.riderStatus?(0,h.jsx)(`span`,{className:`badge ${e.riderStatus===`Active`?`approved`:e.riderStatus===`Pending`?`pending`:`rejected`}`,children:e.riderStatus||`N/A`}):(0,h.jsx)(`span`,{style:{fontSize:`0.8rem`,color:`var(--text-muted)`},children:`—`})}),(0,h.jsx)(`td`,{children:e.role===`delivery_partner`||e.riderStatus?(0,h.jsxs)(`div`,{style:{display:`flex`,gap:`6px`},children:[(0,h.jsxs)(`button`,{disabled:w===`rider-${e.userID}`||e.riderStatus===`Active`,onClick:()=>K(e.userID,`Active`),style:{background:`#4bc0c0`,color:`white`,border:`none`,padding:`4px 10px`,borderRadius:`4px`,fontSize:`0.75rem`,fontWeight:700,cursor:`pointer`,opacity:e.riderStatus===`Active`?.6:1},children:[(0,h.jsx)(p,{size:10}),` Approve`]}),(0,h.jsxs)(`button`,{disabled:w===`rider-${e.userID}`||e.riderStatus===`Suspended`,onClick:()=>K(e.userID,`Suspended`),style:{background:`var(--danger)`,color:`white`,border:`none`,padding:`4px 10px`,borderRadius:`4px`,fontSize:`0.75rem`,fontWeight:700,cursor:`pointer`,opacity:e.riderStatus===`Suspended`?.6:1},children:[(0,h.jsx)(f,{size:10}),` Reject`]})]}):(0,h.jsx)(`span`,{style:{fontSize:`0.8rem`,color:`var(--text-muted)`},children:`—`})}),(0,h.jsx)(`td`,{children:(0,h.jsxs)(`div`,{style:{display:`flex`,alignItems:`center`,gap:`8px`},children:[(0,h.jsxs)(`select`,{className:`role-selector`,value:e.role||`customer`,disabled:w===`role-${e.userID}`,onChange:t=>{let n=t.target.value;if(n===`super_admin`&&!window.confirm(`WARNING: Are you sure you want to promote user "${e.name||e.email||e.userID}" to Super Admin? This grants full system access.`)){t.target.value=e.role||`customer`;return}xe(e.userID,n)},children:[(0,h.jsx)(`option`,{value:`customer`,children:`Customer`}),(0,h.jsx)(`option`,{value:`delivery_partner`,children:`Delivery Partner`}),(0,h.jsx)(`option`,{value:`restaurant_admin`,children:`Restaurant Admin`}),(0,h.jsx)(`option`,{value:`super_admin`,children:`Super Admin`})]}),w===`role-${e.userID}`&&(0,h.jsx)(u,{size:14,style:{animation:`spin 1s linear infinite`,color:`var(--brand-red)`}})]})})]},`user-${e.userID}-${e.email||``}-${t}`))})]}),Ae&&(0,h.jsx)(`div`,{className:`load-more-wrap`,style:{margin:`16px auto`},children:(0,h.jsxs)(`button`,{type:`button`,className:`load-more-btn`,onClick:()=>he(e=>e+_),children:[`Load more users (`,(x.users||[]).length-A,` left) `,(0,h.jsx)(a,{className:`load-more-icon`,size:16})]})})]}),y===`applications`&&(0,h.jsxs)(`div`,{children:[(0,h.jsxs)(`h2`,{style:{fontSize:`1.3rem`,fontWeight:800,marginBottom:`16px`,marginTop:`16px`,display:`flex`,alignItems:`center`,gap:`8px`},children:[(0,h.jsx)(le,{size:20,style:{color:`var(--brand-red)`}}),` Delivery Rider Onboarding Queue (`,Z.length,`)`]}),(0,h.jsxs)(`div`,{className:`admin-table-wrapper`,style:{marginBottom:`40px`},children:[Z.length===0?(0,h.jsx)(`div`,{style:{textAlign:`center`,padding:`32px`},children:(0,h.jsx)(`p`,{style:{color:`var(--text-secondary)`},children:`No delivery rider applications pending review.`})}):(0,h.jsxs)(`table`,{className:`admin-table`,children:[(0,h.jsx)(`thead`,{children:(0,h.jsxs)(`tr`,{children:[(0,h.jsx)(`th`,{children:`Candidate Name`}),(0,h.jsx)(`th`,{children:`Email / Phone`}),(0,h.jsx)(`th`,{children:`Applied Date`}),(0,h.jsx)(`th`,{children:`Resume`}),(0,h.jsx)(`th`,{children:`Chat Review`}),(0,h.jsx)(`th`,{children:`Status`}),(0,h.jsx)(`th`,{children:`Rider Status`}),(0,h.jsx)(`th`,{children:`Rider Onboarding Action`})]})}),(0,h.jsx)(`tbody`,{children:Ee.map((e,t)=>(0,h.jsx)(g,{app:e,actionLoading:w,onChat:D,onUpdateStatus:q,onUpdateRiderStatus:K},`rider-${e.id}-${e.userId||``}-${t}`))})]}),je&&(0,h.jsx)(`div`,{className:`load-more-wrap`,style:{margin:`16px auto`},children:(0,h.jsxs)(`button`,{type:`button`,className:`load-more-btn`,onClick:()=>ge(e=>e+_),children:[`Load more rider applications (`,Z.length-j,` left) `,(0,h.jsx)(a,{className:`load-more-icon`,size:16})]})})]}),(0,h.jsxs)(`h2`,{style:{fontSize:`1.3rem`,fontWeight:800,marginBottom:`16px`,display:`flex`,alignItems:`center`,gap:`8px`},children:[(0,h.jsx)(l,{size:20,style:{color:`var(--brand-red)`}}),` General Career Applications (`,Q.length,`)`]}),(0,h.jsxs)(`div`,{className:`admin-table-wrapper`,children:[Q.length===0?(0,h.jsx)(`div`,{style:{textAlign:`center`,padding:`32px`},children:(0,h.jsx)(`p`,{style:{color:`var(--text-secondary)`},children:`No other career applications received.`})}):(0,h.jsxs)(`table`,{className:`admin-table`,children:[(0,h.jsx)(`thead`,{children:(0,h.jsxs)(`tr`,{children:[(0,h.jsx)(`th`,{children:`Candidate Name`}),(0,h.jsx)(`th`,{children:`Target Role`}),(0,h.jsx)(`th`,{children:`Email / Phone`}),(0,h.jsx)(`th`,{children:`Applied Date`}),(0,h.jsx)(`th`,{children:`Resume`}),(0,h.jsx)(`th`,{children:`Chat`}),(0,h.jsx)(`th`,{children:`Status Action`})]})}),(0,h.jsx)(`tbody`,{children:De.map((e,t)=>(0,h.jsxs)(`tr`,{children:[(0,h.jsx)(`td`,{style:{fontWeight:700},children:e.candidateName}),(0,h.jsx)(`td`,{children:e.jobTitle}),(0,h.jsxs)(`td`,{children:[(0,h.jsx)(`div`,{style:{fontSize:`0.85rem`},children:e.email}),(0,h.jsx)(`div`,{style:{fontSize:`0.8rem`,color:`var(--text-secondary)`},children:e.phone})]}),(0,h.jsx)(`td`,{children:e.appliedDate}),(0,h.jsx)(`td`,{children:(0,h.jsxs)(`a`,{href:e.resumeUrl,target:`_blank`,rel:`noreferrer`,style:{display:`inline-flex`,alignItems:`center`,gap:`4px`,fontSize:`0.85rem`},children:[(0,h.jsx)(o,{size:14}),` Resume`]})}),(0,h.jsx)(`td`,{children:(0,h.jsxs)(`button`,{onClick:()=>D(e.id),style:{background:`transparent`,color:`#8b5cf6`,border:`1px solid #8b5cf6`,padding:`6px 10px`,borderRadius:`4px`,fontSize:`0.8rem`,fontWeight:700,cursor:`pointer`,display:`flex`,alignItems:`center`,gap:`4px`},children:[(0,h.jsx)(s,{size:12}),` Chat`]})}),(0,h.jsx)(`td`,{children:(0,h.jsxs)(`div`,{style:{display:`flex`,alignItems:`center`,gap:`8px`},children:[(0,h.jsxs)(`select`,{className:`role-selector`,value:e.status||`Applied`,disabled:w===`app-${e.id}`,onChange:t=>q(e.id,t.target.value),children:[(0,h.jsx)(`option`,{value:`Applied`,children:`Applied`}),(0,h.jsx)(`option`,{value:`Interview Scheduled`,children:`Interview Scheduled`}),(0,h.jsx)(`option`,{value:`Offer Extended`,children:`Offer Extended`}),(0,h.jsx)(`option`,{value:`Rejected`,children:`Rejected`})]}),w===`app-${e.id}`&&(0,h.jsx)(u,{size:14,style:{animation:`spin 1s linear infinite`,color:`var(--brand-red)`}})]})})]},`gen-${e.id}-${e.userId||``}-${t}`))})]}),Me&&(0,h.jsx)(`div`,{className:`load-more-wrap`,style:{margin:`16px auto`},children:(0,h.jsxs)(`button`,{type:`button`,className:`load-more-btn`,onClick:()=>_e(e=>e+_),children:[`Load more applications (`,Q.length-M,` left) `,(0,h.jsx)(a,{className:`load-more-icon`,size:16})]})})]})]})]}),E&&(0,h.jsx)(ne,{type:`application`,targetId:E,userId:e?.userID||e?.userId,userName:e?.userName||e?.username,receiverId:(x?.applications||[]).find(e=>e.id===E)?.userId||0,initialOpen:!0,onClose:()=>D(null)},E)]})};export{v as default};