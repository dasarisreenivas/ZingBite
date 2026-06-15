import{t as e}from"./chevron-right-HgQaJnam.js";import{t}from"./indian-rupee-B84qsRLX.js";import{n,t as r}from"./ChatWidget-BWyb8r-y.js";import{A as i,D as a,N as o,O as ee,P as s,T as c,c as te,d as ne,g as l,i as re,j as ie,k as u,n as d,o as f,r as p,s as ae,t as oe,v as m}from"./index-CV7g5-d6.js";var h=a(`check`,[[`path`,{d:`M20 6 9 17l-5-5`,key:`1gmf2c`}]]),se=a(`user-check`,[[`path`,{d:`m16 11 2 2 4-4`,key:`9rsbq5`}],[`path`,{d:`M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2`,key:`1yyitq`}],[`circle`,{cx:`9`,cy:`7`,r:`4`,key:`nufk8`}]]),g=s(o(),1),_=u(),v=g.memo(({app:e,actionLoading:t,onChat:r,onUpdateStatus:i})=>(0,_.jsxs)(`tr`,{children:[(0,_.jsx)(`td`,{style:{fontWeight:700},children:e.candidateName}),(0,_.jsxs)(`td`,{children:[(0,_.jsx)(`div`,{style:{fontSize:`0.85rem`},children:e.email}),(0,_.jsx)(`div`,{style:{fontSize:`0.8rem`,color:`var(--text-secondary)`},children:e.phone})]}),(0,_.jsx)(`td`,{children:e.appliedDate}),(0,_.jsx)(`td`,{children:(0,_.jsxs)(`a`,{href:e.resumeUrl,target:`_blank`,rel:`noreferrer`,style:{display:`inline-flex`,alignItems:`center`,gap:`4px`,fontSize:`0.85rem`},children:[(0,_.jsx)(m,{size:14}),` Resume`]})}),(0,_.jsx)(`td`,{children:(0,_.jsxs)(`button`,{onClick:()=>r(e.id),style:{background:`transparent`,color:`#8b5cf6`,border:`1px solid #8b5cf6`,padding:`6px 10px`,borderRadius:`4px`,fontSize:`0.8rem`,fontWeight:700,cursor:`pointer`,display:`flex`,alignItems:`center`,gap:`4px`},children:[(0,_.jsx)(n,{size:12}),` Chat`]})}),(0,_.jsx)(`td`,{children:(0,_.jsx)(`span`,{className:`badge ${e.status.toLowerCase().includes(`applied`)?`applied`:e.status.toLowerCase().includes(`interview`)?`interview`:e.status.toLowerCase().includes(`offer`)?`offered`:`rejected`}`,children:e.status})}),(0,_.jsx)(`td`,{children:(0,_.jsxs)(`div`,{style:{display:`flex`,gap:`8px`},children:[(0,_.jsxs)(`button`,{disabled:t===`app-${e.id}`||e.status===`Offer Extended`,onClick:()=>i(e.id,`Offer Extended`),style:{background:`#4bc0c0`,color:`white`,border:`none`,padding:`6px 12px`,borderRadius:`4px`,fontSize:`0.8rem`,fontWeight:700,cursor:`pointer`,display:`flex`,alignItems:`center`,gap:`4px`,opacity:e.status===`Offer Extended`?.6:1},children:[(0,_.jsx)(h,{size:12}),` Approve Rider`]}),(0,_.jsxs)(`button`,{disabled:t===`app-${e.id}`||e.status===`Rejected`,onClick:()=>i(e.id,`Rejected`),style:{background:`var(--danger)`,color:`white`,border:`none`,padding:`6px 12px`,borderRadius:`4px`,fontSize:`0.8rem`,fontWeight:700,cursor:`pointer`,display:`flex`,alignItems:`center`,gap:`4px`,opacity:e.status===`Rejected`?.6:1},children:[(0,_.jsx)(d,{size:12}),` Reject Rider`]})]})})]},e.id));v.displayName=`RiderApplicationRow`;var y=6,b=()=>{let{user:a,logout:o,loading:s}=(0,g.useContext)(ee),u=ie(),{showAlert:b}=oe(),[x,S]=(0,g.useState)(`metrics`),[C,ce]=(0,g.useState)({userCount:0,restaurantCount:0,orderCount:0,totalRevenue:0,users:[],applications:[],restaurantRequests:[]}),[le,ue]=(0,g.useState)(!0),[w,T]=(0,g.useState)(null),[E,D]=(0,g.useState)(null),[O,k]=(0,g.useState)(null),[A,de]=(0,g.useState)(y),[j,fe]=(0,g.useState)(y),[M,pe]=(0,g.useState)(y),[N,me]=(0,g.useState)(y),[P,he]=(0,g.useState)(y),[F,I]=(0,g.useState)({name:``,cuisine:``,address:``,deliveryTime:``,imagePath:``}),[L,R]=(0,g.useState)({title:``,department:``,location:``,description:``}),[z,B]=(0,g.useState)(!1),[V,H]=(0,g.useState)(!1),[U,ge]=(0,g.useState)(null),[_e,W]=(0,g.useState)(!0),[G,ve]=(0,g.useState)(!1),K=async()=>{try{W(!0),ge((await i.get(`/api/analytics`)).data)}catch(e){console.error(`Failed to fetch analytics`,e)}finally{W(!1)}},q=async(e=!1)=>{try{ce((await i.get(`/api/super-admin`)).data),e||T(null)}catch(t){console.error(t),e||T(t.response?.data?.error||`Access denied or failed to load super admin stats.`)}finally{e||ue(!1)}};(0,g.useEffect)(()=>{if(s)return;if(!a){u(`/login?redirect=/admin`);return}q(!1);let e=window.location.pathname.startsWith(`/zingbite`)?`/zingbite/api/stream?topic=admin_requests`:`/api/stream?topic=admin_requests`,t=new EventSource(e);return t.onmessage=e=>{try{let t=JSON.parse(e.data);if(console.log(`[ZingBite SSE] Received real-time admin update:`,t),t&&t.event===`new_request`)try{let e=new Audio(`https://assets.mixkit.co/active_storage/sfx/2869/2869-84.wav`);e.volume=.5,e.play()}catch{}q(!0)}catch(e){console.error(`[ZingBite SSE] Error on message:`,e)}},t.onerror=e=>{console.error(`[ZingBite SSE] EventSource connection error:`,e)},()=>{t.close()}},[a,s]),(0,g.useEffect)(()=>{x===`metrics`&&K()},[x]);let ye=async(e,t)=>{D(`role-${e}`);try{await i.post(`/api/super-admin`,{action:`changeUserRole`,userId:e,role:t}),await q()}catch{b(`Failed to update user role.`,`error`)}finally{D(null)}},J=async(e,t)=>{D(`app-${e}`);try{await i.post(`/api/super-admin`,{action:`updateApplicationStatus`,appId:e,status:t}),await q()}catch{b(`Failed to update application status.`,`error`)}finally{D(null)}},Y=async(e,t)=>{D(`req-${e}`);try{await i.post(`/api/super-admin`,{action:`reviewRestaurant`,requestId:e,status:t}),b(`Restaurant Request successfully ${t}!`,`success`),await q()}catch{b(`Failed to review restaurant request.`,`error`)}finally{D(null)}},be=async e=>{if(e.preventDefault(),!F.name||!F.cuisine||!F.address){b(`Please fill out all required fields.`,`warning`);return}B(!0);try{await i.post(`/api/super-admin`,{action:`addRestaurant`,name:F.name,cuisine:F.cuisine,address:F.address,deliveryTime:F.deliveryTime||void 0,imagePath:F.imagePath||void 0}),b(`Restaurant added successfully!`,`success`),I({name:``,cuisine:``,address:``,deliveryTime:``,imagePath:``}),await q()}catch{b(`Failed to create restaurant.`,`error`)}finally{B(!1)}},xe=async e=>{if(e.preventDefault(),!L.title||!L.department||!L.location||!L.description){b(`Please fill out all required fields.`,`warning`);return}H(!0);try{await i.post(`/api/super-admin`,{action:`addJob`,title:L.title,department:L.department,location:L.location,description:L.description}),b(`Job listing published successfully!`,`success`),R({title:``,department:``,location:``,description:``}),await q()}catch{b(`Failed to create job posting.`,`error`)}finally{H(!1)}},X=(0,g.useMemo)(()=>(C.restaurantRequests||[]).filter(e=>e.status===`Pending`),[C.restaurantRequests]),Z=(0,g.useMemo)(()=>(C.restaurantRequests||[]).filter(e=>e.status!==`Pending`),[C.restaurantRequests]),Q=(0,g.useMemo)(()=>(C.applications||[]).filter(e=>e.jobTitle===`Delivery Rider`),[C.applications]),$=(0,g.useMemo)(()=>(C.applications||[]).filter(e=>e.jobTitle!==`Delivery Rider`),[C.applications]),Se=(0,g.useMemo)(()=>X.slice(0,A),[X,A]),Ce=(0,g.useMemo)(()=>Z.slice(0,j),[Z,j]),we=(0,g.useMemo)(()=>(C.users||[]).slice(0,M),[C.users,M]),Te=(0,g.useMemo)(()=>Q.slice(0,N),[Q,N]),Ee=(0,g.useMemo)(()=>$.slice(0,P),[$,P]),De=(0,g.useMemo)(()=>A<X.length,[A,X.length]),Oe=(0,g.useMemo)(()=>j<Z.length,[j,Z.length]),ke=(0,g.useMemo)(()=>M<(C.users||[]).length,[M,C.users]),Ae=(0,g.useMemo)(()=>N<Q.length,[N,Q.length]),je=(0,g.useMemo)(()=>P<$.length,[P,$.length]);return s||le?(0,_.jsx)(`div`,{style:{display:`flex`,justifyContent:`center`,alignItems:`center`,flex:1,minHeight:`400px`},children:(0,_.jsx)(l,{size:36,style:{animation:`spin 1s linear infinite`,color:`var(--brand-red)`}})}):w?(0,_.jsxs)(`div`,{style:{maxWidth:`600px`,margin:`80px auto`,textAlign:`center`,padding:`32px`,background:`#fff`,border:`1px solid var(--border-medium)`,borderRadius:`12px`,boxShadow:`var(--shadow-md)`},className:`fade-in`,children:[(0,_.jsx)(re,{size:48,style:{color:`var(--brand-red)`,marginBottom:`16px`,margin:`0 auto 16px`}}),(0,_.jsx)(`h3`,{style:{fontSize:`1.4rem`,fontWeight:800},children:`Access Restricted`}),(0,_.jsx)(`p`,{style:{color:`var(--text-secondary)`,marginTop:`8px`,marginBottom:`24px`},children:w}),(0,_.jsxs)(`div`,{style:{display:`flex`,justifyContent:`center`,gap:`12px`},children:[(0,_.jsx)(`button`,{onClick:()=>u(`/login?redirect=/admin`),className:`btn-primary`,style:{width:`auto`,padding:`10px 20px`,fontSize:`0.9rem`,borderRadius:`4px`},children:`Switch Account`}),(0,_.jsx)(`button`,{onClick:async()=>{await o(),u(`/login?redirect=/admin`)},className:`portal-logout-btn`,children:`Logout`})]})]}):(0,_.jsxs)(_.Fragment,{children:[(0,_.jsx)(`style`,{children:`
        .admin-container {
          max-width: 1200px;
          margin: 32px auto;
          padding: 0 20px;
          perspective: 1200px;
        }
        .stats-grid {
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(220px, 1fr));
          gap: 20px;
          margin-bottom: 32px;
          perspective: 1200px;
          transform-style: preserve-3d;
        }
        .stat-card {
          background: linear-gradient(145deg, #fff 0%, #fafafa 100%);
          border: 1px solid var(--border-medium);
          border-radius: var(--radius-md);
          padding: 24px;
          display: flex;
          align-items: center;
          gap: 16px;
          box-shadow: 0 2px 8px rgba(0,0,0,0.04), 0 8px 24px rgba(0,0,0,0.03);
          transition: transform 0.45s cubic-bezier(0.25, 0.8, 0.25, 1), box-shadow 0.45s cubic-bezier(0.25, 0.8, 0.25, 1), border-color 0.35s ease;
          transform: translateZ(0) scale(1);
          transform-style: preserve-3d;
          backface-visibility: hidden;
          position: relative;
          overflow: hidden;
        }
        .stat-card::before {
          content: '';
          position: absolute;
          top: 0; left: 0; right: 0;
          height: 3px;
          background: linear-gradient(90deg, transparent, var(--brand-red), #ff6b6b, transparent);
          opacity: 0;
          transition: opacity 0.45s ease;
          z-index: 1;
        }
        .stat-card::after {
          content: '';
          position: absolute;
          inset: 0;
          background: linear-gradient(135deg, transparent 40%, rgba(247,55,79,0.02) 100%);
          opacity: 0;
          transition: opacity 0.45s ease;
          border-radius: var(--radius-md);
        }
        .stat-card:hover::before { opacity: 0.8; }
        .stat-card:hover::after { opacity: 1; }
        .stat-card:hover {
          transform: translateY(-6px) translateZ(12px) rotateX(2deg) scale(1.02);
          box-shadow: 0 16px 40px rgba(247,55,79,0.12), 0 8px 24px rgba(0,0,0,0.06);
          border-color: rgba(247,55,79,0.15);
        }
        .stat-icon {
          width: 48px;
          height: 48px;
          border-radius: var(--radius-sm);
          display: flex;
          align-items: center;
          justify-content: center;
          transition: transform 0.5s cubic-bezier(0.25, 0.8, 0.25, 1);
          transform-style: preserve-3d;
          backface-visibility: hidden;
        }
        .stat-card:hover .stat-icon {
          transform: scale(1.12) rotateY(-8deg) rotateZ(-3deg) translateZ(8px);
        }
        .stat-icon.red { background: rgba(247,55,79,0.08); color: var(--brand-red); }
        .stat-icon.blue { background: rgba(54,162,235,0.08); color: #36a2eb; }
        .stat-icon.green { background: rgba(75,192,192,0.08); color: #4bc0c0; }
        .stat-icon.purple { background: rgba(153,102,255,0.08); color: #9966ff; }
        .stat-number { font-size: 1.8rem; font-weight: 800; line-height: 1.1; margin-top: 4px; transition: text-shadow 0.3s ease; }
        .stat-card:hover .stat-number { text-shadow: 0 0 20px rgba(247,55,79,0.1); }
        
        .tab-bar {
          display: flex;
          border-bottom: 2px solid var(--border-light);
          margin-bottom: 24px;
          gap: 24px;
          overflow-x: auto;
          scrollbar-width: none;
          -ms-overflow-style: none;
          perspective: 1200px;
        }
        .tab-bar::-webkit-scrollbar { display: none; }
        .tab-btn {
          background: none;
          border: none;
          padding: 12px 4px;
          font-weight: 700;
          font-size: 1rem;
          color: var(--text-secondary);
          cursor: pointer;
          position: relative;
          transition: color 0.3s ease, transform 0.4s cubic-bezier(0.25, 0.8, 0.25, 1);
          white-space: nowrap;
          transform-style: preserve-3d;
          backface-visibility: hidden;
        }
        .tab-btn:hover {
          color: var(--brand-red);
          transform: translateZ(4px);
        }
        .tab-btn.active {
          color: var(--brand-red);
          transform: translateZ(6px);
        }
        .tab-btn.active::after {
          content: '';
          position: absolute;
          bottom: -2px;
          left: 0;
          right: 0;
          height: 3px;
          background: linear-gradient(90deg, var(--brand-red), #ff6b6b);
          box-shadow: 0 0 10px rgba(247,55,79,0.3), 0 0 20px rgba(247,55,79,0.1);
          animation: tabIndicatorPulse 2s ease-in-out infinite;
        }
        @keyframes tabIndicatorPulse {
          0%, 100% { opacity: 1; box-shadow: 0 0 10px rgba(247,55,79,0.3), 0 0 20px rgba(247,55,79,0.1); }
          50% { opacity: 0.7; box-shadow: 0 0 16px rgba(247,55,79,0.4), 0 0 30px rgba(247,55,79,0.15); }
        }
        .admin-table-wrapper {
          background: #fff;
          border: 1px solid var(--border-medium);
          border-radius: var(--radius-md);
          overflow-x: auto;
          box-shadow: 0 2px 8px rgba(0,0,0,0.04);
          margin-bottom: 32px;
          perspective: 1200px;
        }
        .admin-table {
          width: 100%;
          border-collapse: collapse;
          text-align: left;
          transform-style: preserve-3d;
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
          transition: background 0.3s ease, transform 0.35s cubic-bezier(0.25, 0.8, 0.25, 1);
          transform: translateZ(0);
        }
        .admin-table tr {
          transition: transform 0.35s cubic-bezier(0.25, 0.8, 0.25, 1), box-shadow 0.35s ease;
          transform-style: preserve-3d;
        }
        .admin-table tr:hover td {
          background: rgba(247,55,79,0.03);
        }
        .admin-table tr:hover {
          transform: translateZ(4px) scale(1.005);
          box-shadow: 0 2px 8px rgba(247,55,79,0.04);
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
          transition: all 0.25s ease, transform 0.3s ease;
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
          transform: translateZ(2px);
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
          perspective: 1200px;
        }
        .form-card {
          background: #fff;
          border: 1px solid var(--border-medium);
          border-radius: var(--radius-md);
          padding: 28px;
          box-shadow: 0 2px 8px rgba(0,0,0,0.04);
          transition: transform 0.45s cubic-bezier(0.25, 0.8, 0.25, 1), box-shadow 0.45s ease;
          transform: translateZ(0);
          transform-style: preserve-3d;
          backface-visibility: hidden;
        }
        .form-card:hover {
          transform: translateY(-4px) translateZ(8px) rotateX(1deg);
          box-shadow: 0 12px 32px rgba(0,0,0,0.06), 0 4px 16px rgba(247,55,79,0.04);
          border-color: rgba(247,55,79,0.1);
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
          transition: all 0.25s ease, transform 0.3s ease;
          transform: translateZ(0);
        }
        .form-group input:hover, .form-group textarea:hover, .form-group select:hover {
          transform: translateZ(2px);
          border-color: rgba(247,55,79,0.2);
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
          box-shadow: 0 0 0 3px rgba(247,55,79,0.1), 0 8px 24px rgba(0,0,0,0.04);
          transform: translateZ(4px);
        }
        .btn-primary {
          background: linear-gradient(135deg, var(--brand-red) 0%, #ff6b6b 100%);
          color: white;
          padding: 12px 20px;
          border: none;
          border-radius: var(--radius-sm);
          font-weight: 700;
          cursor: pointer;
          display: flex;
          align-items: center;
          gap: 8px;
          transition: transform 0.4s cubic-bezier(0.25, 0.8, 0.25, 1), box-shadow 0.4s cubic-bezier(0.25, 0.8, 0.25, 1);
          transform: translateZ(0);
          position: relative;
          overflow: hidden;
          backface-visibility: hidden;
        }
        .btn-primary::after {
          content: '';
          position: absolute;
          inset: -2px;
          border-radius: calc(var(--radius-sm) + 2px);
          background: linear-gradient(135deg, var(--brand-red), #ff6b6b, var(--brand-red));
          z-index: -1;
          opacity: 0;
          filter: blur(8px);
          transition: opacity 0.4s ease;
        }
        .btn-primary:hover::after { opacity: 0.5; }
        .btn-primary:hover {
          transform: translateY(-2px) translateZ(6px) scale(1.02);
          box-shadow: 0 6px 20px rgba(247,55,79,0.3), 0 0 24px rgba(247,55,79,0.08);
        }
        .btn-primary:active {
          transform: translateY(0) translateZ(0) scale(0.98);
        }
        .badge {
          padding: 4px 8px;
          border-radius: 4px;
          font-size: 0.72rem;
          font-weight: 700;
          text-transform: uppercase;
          transition: transform 0.3s ease, box-shadow 0.3s ease;
          display: inline-block;
        }
        .badge:hover {
          transform: translateY(-1px) translateZ(4px) scale(1.05);
          box-shadow: 0 2px 8px rgba(0,0,0,0.1);
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
          box-shadow: 0 2px 8px rgba(0,0,0,0.04);
          transition: transform 0.4s cubic-bezier(0.25, 0.8, 0.25, 1), box-shadow 0.4s ease, border-color 0.4s ease;
          transform: translateZ(0);
          transform-style: preserve-3d;
          backface-visibility: hidden;
        }
        .request-card:hover {
          transform: translateY(-3px) translateZ(8px) rotateX(1deg);
          box-shadow: 0 8px 24px rgba(0,0,0,0.06), 0 4px 12px rgba(247,55,79,0.04);
          border-color: rgba(247,55,79,0.1);
        }
        .doc-verify-row {
          display: grid;
          grid-template-columns: repeat(3, 1fr);
          gap: 16px;
          background: var(--bg-surface);
          padding: 14px;
          border-radius: var(--radius-sm);
          margin-top: 14px;
          transition: background 0.3s ease;
        }
        .doc-verify-row:hover {
          background: var(--bg-surface-hover);
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
          transition: all 0.3s ease, transform 0.3s ease;
          transform: translateZ(0);
          backface-visibility: hidden;
        }
        .portal-logout-btn:hover {
          border-color: var(--danger);
          color: var(--danger);
          background: rgba(226, 55, 68, 0.04);
          transform: translateY(-1px) translateZ(4px);
          box-shadow: 0 4px 12px rgba(226,55,68,0.08);
        }
        
        .analytics-dashboard {
          display: grid;
          grid-template-columns: 3fr 2fr;
          gap: 24px;
          margin-bottom: 32px;
          width: 100%;
          perspective: 1200px;
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
          box-shadow: 0 8px 32px 0 rgba(31, 38, 135, 0.05), 0 0 0 1px rgba(255,255,255,0.1);
          border-radius: var(--radius-md);
          padding: 24px;
          color: var(--text-primary);
          transition: transform 0.4s cubic-bezier(0.25, 0.8, 0.25, 1), box-shadow 0.4s ease;
          transform: translateZ(0);
          transform-style: preserve-3d;
          backface-visibility: hidden;
          position: relative;
        }
        .analytics-card::before {
          content: '';
          position: absolute;
          inset: -1px;
          border-radius: var(--radius-md);
          padding: 1px;
          background: linear-gradient(135deg, rgba(247,55,79,0.1), rgba(54,162,235,0.1), rgba(75,192,192,0.1), transparent);
          -webkit-mask: linear-gradient(#fff 0 0) content-box, linear-gradient(#fff 0 0);
          -webkit-mask-composite: xor;
          mask-composite: exclude;
          pointer-events: none;
        }
        .analytics-card:hover {
          transform: translateY(-3px) translateZ(8px) rotateX(1deg);
          box-shadow: 0 16px 40px rgba(31, 38, 135, 0.08);
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
          transition: all 0.3s ease, transform 0.35s cubic-bezier(0.25, 0.8, 0.25, 1);
          transform: translateZ(0);
        }
        .search-item:hover {
          transform: translateX(6px) translateZ(4px);
          border-color: rgba(247, 55, 79, 0.2);
          background: rgba(255, 255, 255, 0.9);
          box-shadow: 0 4px 12px rgba(247,55,79,0.04);
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
        @keyframes float3D {
          0%, 100% { transform: translateY(0) translateZ(0); }
          50% { transform: translateY(-6px) translateZ(12px) rotateX(2deg); }
        }
      `}),(0,_.jsxs)(`div`,{className:`admin-container fade-in page-enter`,children:[(0,_.jsx)(`div`,{style:{display:`flex`,justifyContent:`space-between`,alignItems:`center`,gap:`12px`,marginBottom:`24px`,flexWrap:`wrap`},children:(0,_.jsxs)(`div`,{style:{display:`flex`,alignItems:`center`,gap:`12px`},children:[(0,_.jsx)(te,{size:32,style:{color:`var(--brand-red)`}}),(0,_.jsxs)(`div`,{children:[(0,_.jsx)(`h1`,{style:{fontSize:`1.8rem`,fontWeight:800},children:`Super Admin Command Center`}),(0,_.jsx)(`p`,{style:{color:`var(--text-secondary)`,fontSize:`0.9rem`,marginTop:`2px`},children:`Site statistics, role allocation, and listings management.`})]})]})}),(0,_.jsxs)(`div`,{className:`stats-grid`,children:[(0,_.jsxs)(`div`,{className:`stat-card`,style:{animation:`float3D 4s ease-in-out infinite`,animationDelay:`0s`},children:[(0,_.jsx)(`div`,{className:`stat-icon red`,children:(0,_.jsx)(p,{size:24})}),(0,_.jsxs)(`div`,{children:[(0,_.jsx)(`span`,{style:{fontSize:`0.85rem`,color:`var(--text-muted)`,fontWeight:600},children:`Active Users`}),(0,_.jsx)(`div`,{className:`stat-number`,children:C?.userCount||0})]})]}),(0,_.jsxs)(`div`,{className:`stat-card`,style:{animation:`float3D 4s ease-in-out infinite`,animationDelay:`0.5s`},children:[(0,_.jsx)(`div`,{className:`stat-icon blue`,children:(0,_.jsx)(f,{size:24})}),(0,_.jsxs)(`div`,{children:[(0,_.jsx)(`span`,{style:{fontSize:`0.85rem`,color:`var(--text-muted)`,fontWeight:600},children:`Restaurants`}),(0,_.jsx)(`div`,{className:`stat-number`,children:C?.restaurantCount||0})]})]}),(0,_.jsxs)(`div`,{className:`stat-card`,style:{animation:`float3D 4s ease-in-out infinite`,animationDelay:`1s`},children:[(0,_.jsx)(`div`,{className:`stat-icon green`,children:(0,_.jsx)(ae,{size:24})}),(0,_.jsxs)(`div`,{children:[(0,_.jsx)(`span`,{style:{fontSize:`0.85rem`,color:`var(--text-muted)`,fontWeight:600},children:`Orders Placed`}),(0,_.jsx)(`div`,{className:`stat-number`,children:C?.orderCount||0})]})]}),(0,_.jsxs)(`div`,{className:`stat-card`,style:{animation:`float3D 4s ease-in-out infinite`,animationDelay:`1.5s`},children:[(0,_.jsx)(`div`,{className:`stat-icon purple`,children:(0,_.jsx)(t,{size:24})}),(0,_.jsxs)(`div`,{children:[(0,_.jsx)(`span`,{style:{fontSize:`0.85rem`,color:`var(--text-muted)`,fontWeight:600},children:`Gross Revenue`}),(0,_.jsxs)(`div`,{className:`stat-number`,children:[`₹`,(C?.totalRevenue??0).toFixed(2)]})]})]})]}),(0,_.jsxs)(`div`,{className:`tab-bar`,children:[(0,_.jsx)(`button`,{className:`tab-btn ${x===`metrics`?`active`:``}`,onClick:()=>S(`metrics`),children:`Overview & Creators`}),(0,_.jsxs)(`button`,{className:`tab-btn ${x===`requests`?`active`:``}`,onClick:()=>S(`requests`),children:[`Restaurant Requests `,X.length>0&&`(${X.length})`]}),(0,_.jsxs)(`button`,{className:`tab-btn ${x===`users`?`active`:``}`,onClick:()=>S(`users`),children:[`Users Control (`,(C?.users||[]).length,`)`]}),(0,_.jsxs)(`button`,{className:`tab-btn ${x===`applications`?`active`:``}`,onClick:()=>S(`applications`),children:[`Applications Review (`,(C?.applications||[]).length,`)`]})]}),x===`metrics`&&(0,_.jsxs)(`div`,{children:[_e||!U?(0,_.jsxs)(`div`,{className:`analytics-card`,style:{display:`flex`,flexDirection:`column`,alignItems:`center`,justifyContent:`center`,minHeight:`300px`,marginBottom:`32px`},children:[(0,_.jsx)(l,{size:36,style:{animation:`spin 1s linear infinite`,color:`var(--brand-red)`}}),(0,_.jsx)(`p`,{style:{marginTop:`12px`,color:`var(--text-secondary)`,fontWeight:600},children:`Assembling telemetry pipeline...`})]}):(0,_.jsxs)(`div`,{className:`analytics-dashboard`,children:[(0,_.jsxs)(`div`,{className:`analytics-card`,children:[(0,_.jsxs)(`div`,{style:{display:`flex`,justifyContent:`space-between`,alignItems:`center`,marginBottom:`20px`},children:[(0,_.jsxs)(`h2`,{style:{fontSize:`1.25rem`,fontWeight:800,display:`flex`,alignItems:`center`,gap:`8px`,margin:0},children:[(0,_.jsx)(f,{size:20,style:{color:`var(--brand-red)`}}),` Platform Conversion Funnel`]}),(0,_.jsx)(`button`,{onClick:K,className:`portal-logout-btn`,style:{padding:`4px 10px`,fontSize:`0.8rem`,borderRadius:`8px`},children:`Refresh`})]}),(0,_.jsxs)(`div`,{className:`funnel-container`,children:[(0,_.jsxs)(`div`,{className:`funnel-step`,children:[(0,_.jsxs)(`div`,{className:`funnel-step-header`,children:[(0,_.jsx)(`span`,{children:`1. Discovery (Page Views)`}),(0,_.jsxs)(`div`,{style:{display:`flex`,alignItems:`center`,gap:`8px`},children:[(0,_.jsx)(`span`,{style:{fontWeight:800},children:U.pageViews}),(0,_.jsx)(`span`,{className:`funnel-conversion-badge`,children:`Baseline`})]})]}),(0,_.jsx)(`div`,{className:`funnel-step-bar-outer`,children:(0,_.jsx)(`div`,{className:`funnel-step-bar-inner`,style:{width:`100%`}})})]}),(0,_.jsxs)(`div`,{className:`funnel-step`,children:[(0,_.jsxs)(`div`,{className:`funnel-step-header`,children:[(0,_.jsx)(`span`,{children:`2. Intent (Cart Additions)`}),(0,_.jsxs)(`div`,{style:{display:`flex`,alignItems:`center`,gap:`8px`},children:[(0,_.jsx)(`span`,{style:{fontWeight:800},children:U.cartAdditions}),(0,_.jsxs)(`span`,{className:`funnel-conversion-badge`,children:[U.conversionRates.pageToCart,`%`]})]})]}),(0,_.jsx)(`div`,{className:`funnel-step-bar-outer`,children:(0,_.jsx)(`div`,{className:`funnel-step-bar-inner`,style:{width:`${Math.min(U.conversionRates.pageToCart,100)}%`}})})]}),(0,_.jsxs)(`div`,{className:`funnel-step`,children:[(0,_.jsxs)(`div`,{className:`funnel-step-header`,children:[(0,_.jsx)(`span`,{children:`3. Conversion (Completed Orders)`}),(0,_.jsxs)(`div`,{style:{display:`flex`,alignItems:`center`,gap:`8px`},children:[(0,_.jsx)(`span`,{style:{fontWeight:800},children:U.ordersPlaced}),(0,_.jsxs)(`span`,{className:`funnel-conversion-badge`,children:[U.conversionRates.overall,`%`]})]})]}),(0,_.jsx)(`div`,{className:`funnel-step-bar-outer`,children:(0,_.jsx)(`div`,{className:`funnel-step-bar-inner`,style:{width:`${Math.min(U.conversionRates.overall,100)}%`}})}),(0,_.jsxs)(`p`,{style:{fontSize:`0.78rem`,color:`var(--text-muted)`,margin:`6px 0 0 0`,textAlign:`right`},children:[`Cart-to-Order Conversion Rate: `,(0,_.jsxs)(`strong`,{children:[U.conversionRates.cartToOrder,`%`]})]})]})]})]}),(0,_.jsxs)(`div`,{className:`analytics-card`,children:[(0,_.jsxs)(`h2`,{style:{fontSize:`1.25rem`,fontWeight:800,marginBottom:`20px`,display:`flex`,alignItems:`center`,gap:`8px`},children:[(0,_.jsx)(p,{size:20,style:{color:`var(--brand-red)`}}),` Popular Searches`]}),U.popularSearches&&U.popularSearches.length>0?(0,_.jsx)(`div`,{className:`popular-searches-list`,children:U.popularSearches.map((e,t)=>(0,_.jsxs)(`div`,{className:`search-item`,children:[(0,_.jsxs)(`div`,{style:{display:`flex`,alignItems:`center`,gap:`8px`},children:[(0,_.jsxs)(`span`,{style:{fontSize:`0.8rem`,color:`var(--text-muted)`,fontWeight:800},children:[`#`,t+1]}),(0,_.jsx)(`span`,{className:`search-tag`,children:e.query})]}),(0,_.jsxs)(`span`,{style:{fontSize:`0.85rem`,fontWeight:800,color:`var(--brand-red)`,background:`rgba(247, 55, 79, 0.05)`,padding:`2px 8px`,borderRadius:`6px`},children:[e.count,` query`,e.count>1?`ies`:`y`]})]},t))}):(0,_.jsx)(`div`,{style:{textAlign:`center`,padding:`48px 16px`,color:`var(--text-secondary)`},children:`No search query data recorded.`})]})]}),(0,_.jsx)(`div`,{style:{display:`flex`,justifyContent:`center`,marginTop:`16px`,marginBottom:`24px`},children:(0,_.jsxs)(`button`,{onClick:()=>ve(!G),className:`portal-logout-btn`,style:{padding:`10px 24px`,borderRadius:`12px`,display:`flex`,alignItems:`center`,gap:`8px`,background:G?`rgba(247, 55, 79, 0.04)`:`transparent`,color:G?`var(--brand-red)`:`var(--text-secondary)`},children:[G?(0,_.jsx)(d,{size:16}):(0,_.jsx)(ne,{size:16}),G?`Hide Creation Portal`:`Show Direct Creation Portal (Manual Restaurant/Jobs)`]})}),G&&(0,_.jsxs)(`div`,{className:`management-grid`,style:{animation:`fadeIn 0.3s ease-out both`},children:[(0,_.jsxs)(`div`,{className:`form-card`,children:[(0,_.jsxs)(`h2`,{style:{fontSize:`1.25rem`,fontWeight:800,marginBottom:`20px`,display:`flex`,alignItems:`center`,gap:`8px`},children:[(0,_.jsx)(f,{size:20,style:{color:`var(--brand-red)`}}),` Register New Restaurant (Direct)`]}),(0,_.jsxs)(`form`,{onSubmit:be,children:[(0,_.jsxs)(`div`,{className:`form-group`,children:[(0,_.jsx)(`label`,{children:`Restaurant Name *`}),(0,_.jsx)(`input`,{type:`text`,required:!0,placeholder:`e.g. Royal Biryani House`,value:F.name,onChange:e=>I(t=>({...t,name:e.target.value}))})]}),(0,_.jsxs)(`div`,{className:`form-group`,children:[(0,_.jsx)(`label`,{children:`Cuisine Type *`}),(0,_.jsx)(`input`,{type:`text`,required:!0,placeholder:`e.g. North Indian, Mughlai`,value:F.cuisine,onChange:e=>I(t=>({...t,cuisine:e.target.value}))})]}),(0,_.jsxs)(`div`,{className:`form-group`,children:[(0,_.jsx)(`label`,{children:`Full Address *`}),(0,_.jsx)(`input`,{type:`text`,required:!0,placeholder:`Street, City, State`,value:F.address,onChange:e=>I(t=>({...t,address:e.target.value}))})]}),(0,_.jsxs)(`div`,{className:`form-group`,children:[(0,_.jsx)(`label`,{children:`Delivery Time (e.g., "35 mins")`}),(0,_.jsx)(`input`,{type:`text`,placeholder:`e.g. 30 mins`,value:F.deliveryTime,onChange:e=>I(t=>({...t,deliveryTime:e.target.value}))})]}),(0,_.jsxs)(`div`,{className:`form-group`,children:[(0,_.jsx)(`label`,{children:`Cover Image URL`}),(0,_.jsx)(`input`,{type:`url`,placeholder:`https://images.unsplash.com/...`,value:F.imagePath,onChange:e=>I(t=>({...t,imagePath:e.target.value}))})]}),(0,_.jsx)(`button`,{type:`submit`,disabled:z,className:`btn-primary`,style:{width:`100%`},children:z?(0,_.jsx)(l,{size:16,style:{animation:`spin 1s linear infinite`}}):`Add Restaurant`})]})]}),(0,_.jsxs)(`div`,{className:`form-card`,children:[(0,_.jsxs)(`h2`,{style:{fontSize:`1.25rem`,fontWeight:800,marginBottom:`20px`,display:`flex`,alignItems:`center`,gap:`8px`},children:[(0,_.jsx)(c,{size:20,style:{color:`var(--brand-red)`}}),` Publish New Job Opening`]}),(0,_.jsxs)(`form`,{onSubmit:xe,children:[(0,_.jsxs)(`div`,{className:`form-group`,children:[(0,_.jsx)(`label`,{children:`Job Title *`}),(0,_.jsx)(`input`,{type:`text`,required:!0,placeholder:`e.g. Operations Manager`,value:L.title,onChange:e=>R(t=>({...t,title:e.target.value}))})]}),(0,_.jsxs)(`div`,{className:`form-group`,children:[(0,_.jsx)(`label`,{children:`Department *`}),(0,_.jsxs)(`select`,{required:!0,value:L.department,onChange:e=>R(t=>({...t,department:e.target.value})),children:[(0,_.jsx)(`option`,{value:``,children:`Select Department`}),(0,_.jsx)(`option`,{value:`Engineering`,children:`Engineering`}),(0,_.jsx)(`option`,{value:`Operations`,children:`Operations`}),(0,_.jsx)(`option`,{value:`Culinary`,children:`Culinary`}),(0,_.jsx)(`option`,{value:`Marketing`,children:`Marketing`})]})]}),(0,_.jsxs)(`div`,{className:`form-group`,children:[(0,_.jsx)(`label`,{children:`Location *`}),(0,_.jsx)(`input`,{type:`text`,required:!0,placeholder:`e.g. Bangalore, KA (or Remote)`,value:L.location,onChange:e=>R(t=>({...t,location:e.target.value}))})]}),(0,_.jsxs)(`div`,{className:`form-group`,children:[(0,_.jsx)(`label`,{children:`Job Description *`}),(0,_.jsx)(`textarea`,{required:!0,rows:`4`,placeholder:`Outline job responsibilities, skills needed, compensation details...`,value:L.description,onChange:e=>R(t=>({...t,description:e.target.value}))})]}),(0,_.jsx)(`button`,{type:`submit`,disabled:V,className:`btn-primary`,style:{width:`100%`},children:V?(0,_.jsx)(l,{size:16,style:{animation:`spin 1s linear infinite`}}):`Publish Job Listing`})]})]})]})]}),x===`requests`&&(0,_.jsxs)(`div`,{children:[(0,_.jsxs)(`h2`,{style:{fontSize:`1.3rem`,fontWeight:800,marginBottom:`18px`},children:[`Pending Approvals (`,X.length,`)`]}),X.length===0?(0,_.jsx)(`div`,{style:{textAlign:`center`,padding:`40px`,border:`1px dashed var(--border-medium)`,borderRadius:`12px`,background:`#fff`,marginBottom:`32px`},children:(0,_.jsx)(`p`,{style:{color:`var(--text-secondary)`},children:`No pending restaurant onboarding requests found.`})}):(0,_.jsxs)(`div`,{style:{marginBottom:`32px`},children:[Se.map(e=>(0,_.jsxs)(`div`,{className:`request-card`,children:[(0,_.jsxs)(`div`,{style:{display:`flex`,justifyContent:`space-between`,alignItems:`flex-start`,flexWrap:`wrap`,gap:`16px`},children:[(0,_.jsxs)(`div`,{children:[(0,_.jsxs)(`div`,{style:{display:`flex`,alignItems:`center`,gap:`10px`},children:[(0,_.jsx)(`h3`,{style:{fontSize:`1.2rem`,fontWeight:800},children:e.restaurantName}),(0,_.jsx)(`span`,{className:`badge pending`,children:`Pending verification`})]}),(0,_.jsxs)(`p`,{style:{fontSize:`0.85rem`,color:`var(--text-secondary)`,marginTop:`4px`},children:[`Cuisine: `,e.cuisineType,` | Address: `,e.address]}),(0,_.jsxs)(`p`,{style:{fontSize:`0.78rem`,color:`var(--text-muted)`,marginTop:`2px`},children:[`Submitted by Partner ID: #`,e.adminId,` on `,e.submittedDate]})]}),(0,_.jsxs)(`div`,{style:{display:`flex`,gap:`10px`},children:[(0,_.jsxs)(`button`,{disabled:E===`req-${e.id}`,onClick:()=>Y(e.id,`Approved`),className:`btn-primary`,style:{background:`var(--success)`,padding:`8px 16px`,fontSize:`0.85rem`},children:[(0,_.jsx)(h,{size:16}),` Approve`]}),(0,_.jsxs)(`button`,{disabled:E===`req-${e.id}`,onClick:()=>Y(e.id,`Rejected`),className:`btn-primary`,style:{background:`var(--danger)`,padding:`8px 16px`,fontSize:`0.85rem`},children:[(0,_.jsx)(d,{size:16}),` Reject`]})]})]}),(0,_.jsxs)(`div`,{className:`doc-verify-row`,children:[(0,_.jsxs)(`div`,{className:`doc-item`,children:[`License Certificate`,(0,_.jsx)(`strong`,{children:e.licenseNo})]}),(0,_.jsxs)(`div`,{className:`doc-item`,children:[`GST Registration`,(0,_.jsx)(`strong`,{children:e.gstNo})]}),(0,_.jsxs)(`div`,{className:`doc-item`,children:[`Aadhaar Number`,(0,_.jsx)(`strong`,{children:e.aadhaarNo})]})]})]},e.id)),De&&(0,_.jsx)(`div`,{className:`load-more-wrap`,style:{margin:`8px auto 0`},children:(0,_.jsxs)(`button`,{type:`button`,className:`load-more-btn`,onClick:()=>de(e=>e+y),children:[`Load more pending requests (`,X.length-A,` left) `,(0,_.jsx)(e,{className:`load-more-icon`,size:16})]})})]}),(0,_.jsx)(`h2`,{style:{fontSize:`1.3rem`,fontWeight:800,marginBottom:`18px`},children:`Log Registry (Reviewed)`}),Z.length===0?(0,_.jsx)(`div`,{style:{textAlign:`center`,padding:`32px`,border:`1px dashed var(--border-medium)`,borderRadius:`12px`,background:`#fff`},children:(0,_.jsx)(`p`,{style:{color:`var(--text-secondary)`},children:`Reviewed onboarding requests log will appear here.`})}):(0,_.jsxs)(`div`,{children:[Ce.map(e=>(0,_.jsx)(`div`,{className:`request-card`,style:{opacity:.8},children:(0,_.jsxs)(`div`,{style:{display:`flex`,justifyContent:`space-between`,alignItems:`center`},children:[(0,_.jsxs)(`div`,{children:[(0,_.jsx)(`h4`,{style:{fontWeight:800},children:e.restaurantName}),(0,_.jsxs)(`p`,{style:{fontSize:`0.8rem`,color:`var(--text-secondary)`,marginTop:`2px`},children:[`Address: `,e.address]})]}),(0,_.jsx)(`span`,{className:`badge ${e.status===`Approved`?`approved`:`rejected`}`,children:e.status})]})},e.id)),Oe&&(0,_.jsx)(`div`,{className:`load-more-wrap`,style:{margin:`8px auto 0`},children:(0,_.jsxs)(`button`,{type:`button`,className:`load-more-btn`,onClick:()=>fe(e=>e+y),children:[`Load more reviewed requests (`,Z.length-j,` left) `,(0,_.jsx)(e,{className:`load-more-icon`,size:16})]})})]})]}),x===`users`&&(0,_.jsxs)(`div`,{className:`admin-table-wrapper`,children:[(0,_.jsxs)(`table`,{className:`admin-table`,children:[(0,_.jsx)(`thead`,{children:(0,_.jsxs)(`tr`,{children:[(0,_.jsx)(`th`,{children:`User ID`}),(0,_.jsx)(`th`,{children:`Username`}),(0,_.jsx)(`th`,{children:`Email`}),(0,_.jsx)(`th`,{children:`Phone Number`}),(0,_.jsx)(`th`,{children:`Rider Status`}),(0,_.jsx)(`th`,{children:`Role Control`})]})}),(0,_.jsx)(`tbody`,{children:we.map(e=>(0,_.jsxs)(`tr`,{children:[(0,_.jsxs)(`td`,{style:{fontWeight:700},children:[`#`,e.userID]}),(0,_.jsx)(`td`,{children:e.userName}),(0,_.jsx)(`td`,{children:e.email}),(0,_.jsx)(`td`,{children:e.phoneNumber||`N/A`}),(0,_.jsx)(`td`,{children:e.role===`delivery_partner`||e.riderStatus?(0,_.jsx)(`span`,{className:`badge ${e.riderStatus===`Active`?`approved`:e.riderStatus===`Pending`?`pending`:`rejected`}`,children:e.riderStatus||`N/A`}):(0,_.jsx)(`span`,{style:{fontSize:`0.8rem`,color:`var(--text-muted)`},children:`—`})}),(0,_.jsx)(`td`,{children:(0,_.jsxs)(`div`,{style:{display:`flex`,alignItems:`center`,gap:`8px`},children:[(0,_.jsxs)(`select`,{className:`role-selector`,value:e.role||`customer`,disabled:E===`role-${e.userID}`,onChange:t=>ye(e.userID,t.target.value),children:[(0,_.jsx)(`option`,{value:`customer`,children:`Customer`}),(0,_.jsx)(`option`,{value:`delivery_partner`,children:`Delivery Partner`}),(0,_.jsx)(`option`,{value:`restaurant_admin`,children:`Restaurant Admin`}),(0,_.jsx)(`option`,{value:`super_admin`,children:`Super Admin`})]}),E===`role-${e.userID}`&&(0,_.jsx)(l,{size:14,style:{animation:`spin 1s linear infinite`,color:`var(--brand-red)`}})]})})]},e.userID))})]}),ke&&(0,_.jsx)(`div`,{className:`load-more-wrap`,style:{margin:`16px auto`},children:(0,_.jsxs)(`button`,{type:`button`,className:`load-more-btn`,onClick:()=>pe(e=>e+y),children:[`Load more users (`,(C.users||[]).length-M,` left) `,(0,_.jsx)(e,{className:`load-more-icon`,size:16})]})})]}),x===`applications`&&(0,_.jsxs)(`div`,{children:[(0,_.jsxs)(`h2`,{style:{fontSize:`1.3rem`,fontWeight:800,marginBottom:`16px`,marginTop:`16px`,display:`flex`,alignItems:`center`,gap:`8px`},children:[(0,_.jsx)(se,{size:20,style:{color:`var(--brand-red)`}}),` Delivery Rider Onboarding Queue (`,Q.length,`)`]}),(0,_.jsxs)(`div`,{className:`admin-table-wrapper`,style:{marginBottom:`40px`},children:[Q.length===0?(0,_.jsx)(`div`,{style:{textAlign:`center`,padding:`32px`},children:(0,_.jsx)(`p`,{style:{color:`var(--text-secondary)`},children:`No delivery rider applications pending review.`})}):(0,_.jsxs)(`table`,{className:`admin-table`,children:[(0,_.jsx)(`thead`,{children:(0,_.jsxs)(`tr`,{children:[(0,_.jsx)(`th`,{children:`Candidate Name`}),(0,_.jsx)(`th`,{children:`Email / Phone`}),(0,_.jsx)(`th`,{children:`Applied Date`}),(0,_.jsx)(`th`,{children:`Resume`}),(0,_.jsx)(`th`,{children:`Chat Review`}),(0,_.jsx)(`th`,{children:`Status`}),(0,_.jsx)(`th`,{children:`Rider Onboarding Action`})]})}),(0,_.jsx)(`tbody`,{children:Te.map(e=>(0,_.jsx)(v,{app:e,actionLoading:E,onChat:k,onUpdateStatus:J},e.id))})]}),Ae&&(0,_.jsx)(`div`,{className:`load-more-wrap`,style:{margin:`16px auto`},children:(0,_.jsxs)(`button`,{type:`button`,className:`load-more-btn`,onClick:()=>me(e=>e+y),children:[`Load more rider applications (`,Q.length-N,` left) `,(0,_.jsx)(e,{className:`load-more-icon`,size:16})]})})]}),(0,_.jsxs)(`h2`,{style:{fontSize:`1.3rem`,fontWeight:800,marginBottom:`16px`,display:`flex`,alignItems:`center`,gap:`8px`},children:[(0,_.jsx)(c,{size:20,style:{color:`var(--brand-red)`}}),` General Career Applications (`,$.length,`)`]}),(0,_.jsxs)(`div`,{className:`admin-table-wrapper`,children:[$.length===0?(0,_.jsx)(`div`,{style:{textAlign:`center`,padding:`32px`},children:(0,_.jsx)(`p`,{style:{color:`var(--text-secondary)`},children:`No other career applications received.`})}):(0,_.jsxs)(`table`,{className:`admin-table`,children:[(0,_.jsx)(`thead`,{children:(0,_.jsxs)(`tr`,{children:[(0,_.jsx)(`th`,{children:`Candidate Name`}),(0,_.jsx)(`th`,{children:`Target Role`}),(0,_.jsx)(`th`,{children:`Email / Phone`}),(0,_.jsx)(`th`,{children:`Applied Date`}),(0,_.jsx)(`th`,{children:`Resume`}),(0,_.jsx)(`th`,{children:`Chat`}),(0,_.jsx)(`th`,{children:`Status Action`})]})}),(0,_.jsx)(`tbody`,{children:Ee.map(e=>(0,_.jsxs)(`tr`,{children:[(0,_.jsx)(`td`,{style:{fontWeight:700},children:e.candidateName}),(0,_.jsx)(`td`,{children:e.jobTitle}),(0,_.jsxs)(`td`,{children:[(0,_.jsx)(`div`,{style:{fontSize:`0.85rem`},children:e.email}),(0,_.jsx)(`div`,{style:{fontSize:`0.8rem`,color:`var(--text-secondary)`},children:e.phone})]}),(0,_.jsx)(`td`,{children:e.appliedDate}),(0,_.jsx)(`td`,{children:(0,_.jsxs)(`a`,{href:e.resumeUrl,target:`_blank`,rel:`noreferrer`,style:{display:`inline-flex`,alignItems:`center`,gap:`4px`,fontSize:`0.85rem`},children:[(0,_.jsx)(m,{size:14}),` Resume`]})}),(0,_.jsx)(`td`,{children:(0,_.jsxs)(`button`,{onClick:()=>k(e.id),style:{background:`transparent`,color:`#8b5cf6`,border:`1px solid #8b5cf6`,padding:`6px 10px`,borderRadius:`4px`,fontSize:`0.8rem`,fontWeight:700,cursor:`pointer`,display:`flex`,alignItems:`center`,gap:`4px`,transition:`all 0.3s ease`},onMouseEnter:e=>{e.target.style.background=`#8b5cf6`,e.target.style.color=`#fff`},onMouseLeave:e=>{e.target.style.background=`transparent`,e.target.style.color=`#8b5cf6`},children:[(0,_.jsx)(n,{size:12}),` Chat`]})}),(0,_.jsx)(`td`,{children:(0,_.jsxs)(`div`,{style:{display:`flex`,alignItems:`center`,gap:`8px`},children:[(0,_.jsxs)(`select`,{className:`role-selector`,value:e.status||`Applied`,disabled:E===`app-${e.id}`,onChange:t=>J(e.id,t.target.value),children:[(0,_.jsx)(`option`,{value:`Applied`,children:`Applied`}),(0,_.jsx)(`option`,{value:`Interview Scheduled`,children:`Interview Scheduled`}),(0,_.jsx)(`option`,{value:`Offer Extended`,children:`Offer Extended`}),(0,_.jsx)(`option`,{value:`Rejected`,children:`Rejected`})]}),E===`app-${e.id}`&&(0,_.jsx)(l,{size:14,style:{animation:`spin 1s linear infinite`,color:`var(--brand-red)`}})]})})]},e.id))})]}),je&&(0,_.jsx)(`div`,{className:`load-more-wrap`,style:{margin:`16px auto`},children:(0,_.jsxs)(`button`,{type:`button`,className:`load-more-btn`,onClick:()=>he(e=>e+y),children:[`Load more applications (`,$.length-P,` left) `,(0,_.jsx)(e,{className:`load-more-icon`,size:16})]})})]})]})]}),O&&(0,_.jsx)(r,{type:`application`,targetId:O,userId:a?.userID||a?.userId,userName:a?.userName||a?.username,receiverId:(C?.applications||[]).find(e=>e.id===O)?.userId||0,initialOpen:!0,onClose:()=>k(null)},O)]})};export{b as default};