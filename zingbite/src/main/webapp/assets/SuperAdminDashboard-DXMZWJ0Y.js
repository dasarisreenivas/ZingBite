import{t as e}from"./indian-rupee-CUB8zqXe.js";import{n as t,t as n}from"./ChatWidget-EQ7M9cVI.js";import{A as r,D as i,E as a,O as o,S as s,T as c,a as l,h as u,i as d,j as f,m as p,n as m,o as h,r as g,s as _,t as v,w as y}from"./index-DA02D76-.js";var b=y(`check`,[[`path`,{d:`M20 6 9 17l-5-5`,key:`1gmf2c`}]]),x=y(`user-check`,[[`path`,{d:`m16 11 2 2 4-4`,key:`9rsbq5`}],[`path`,{d:`M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2`,key:`1yyitq`}],[`circle`,{cx:`9`,cy:`7`,r:`4`,key:`nufk8`}]]),S=f(r(),1),C=a(),w=()=>{let{user:r,logout:a,loading:f}=(0,S.useContext)(c),y=o(),{showAlert:w}=v(),[T,E]=(0,S.useState)(`metrics`),[D,O]=(0,S.useState)({userCount:0,restaurantCount:0,orderCount:0,totalRevenue:0,users:[],applications:[],restaurantRequests:[]}),[ee,k]=(0,S.useState)(!0),[A,j]=(0,S.useState)(null),[M,N]=(0,S.useState)(null),[P,F]=(0,S.useState)(null),[I,L]=(0,S.useState)({name:``,cuisine:``,address:``,deliveryTime:``,imagePath:``}),[R,z]=(0,S.useState)({title:``,department:``,location:``,description:``}),[B,V]=(0,S.useState)(!1),[H,U]=(0,S.useState)(!1),W=async(e=!1)=>{try{O((await i.get(`/api/super-admin`)).data),e||j(null)}catch(t){console.error(t),e||j(t.response?.data?.error||`Access denied or failed to load super admin stats.`)}finally{e||k(!1)}};(0,S.useEffect)(()=>{if(f)return;if(!r){y(`/login?redirect=/admin`);return}W(!1);let e=new EventSource(`/api/stream?topic=admin_requests`);return e.onmessage=e=>{try{let t=JSON.parse(e.data);if(console.log(`[ZingBite SSE] Received real-time admin update:`,t),t&&t.event===`new_request`)try{let e=new Audio(`https://assets.mixkit.co/active_storage/sfx/2869/2869-84.wav`);e.volume=.5,e.play()}catch{}W(!0)}catch(e){console.error(`[ZingBite SSE] Error on message:`,e)}},e.onerror=e=>{console.error(`[ZingBite SSE] EventSource connection error:`,e)},()=>{e.close()}},[r,f]);let G=async(e,t)=>{N(`role-${e}`);try{await i.post(`/api/super-admin`,{action:`changeUserRole`,userId:e,role:t}),await W()}catch{w(`Failed to update user role.`,`error`)}finally{N(null)}},K=async(e,t)=>{N(`app-${e}`);try{await i.post(`/api/super-admin`,{action:`updateApplicationStatus`,appId:e,status:t}),await W()}catch{w(`Failed to update application status.`,`error`)}finally{N(null)}},q=async(e,t)=>{N(`req-${e}`);try{await i.post(`/api/super-admin`,{action:`reviewRestaurant`,requestId:e,status:t}),w(`Restaurant Request successfully ${t}!`,`success`),await W()}catch{w(`Failed to review restaurant request.`,`error`)}finally{N(null)}},J=async e=>{if(e.preventDefault(),!I.name||!I.cuisine||!I.address){w(`Please fill out all required fields.`,`warning`);return}V(!0);try{await i.post(`/api/super-admin`,{action:`addRestaurant`,name:I.name,cuisine:I.cuisine,address:I.address,deliveryTime:I.deliveryTime||void 0,imagePath:I.imagePath||void 0}),w(`Restaurant added successfully!`,`success`),L({name:``,cuisine:``,address:``,deliveryTime:``,imagePath:``}),await W()}catch{w(`Failed to create restaurant.`,`error`)}finally{V(!1)}},Y=async e=>{if(e.preventDefault(),!R.title||!R.department||!R.location||!R.description){w(`Please fill out all required fields.`,`warning`);return}U(!0);try{await i.post(`/api/super-admin`,{action:`addJob`,title:R.title,department:R.department,location:R.location,description:R.description}),w(`Job listing published successfully!`,`success`),z({title:``,department:``,location:``,description:``}),await W()}catch{w(`Failed to create job posting.`,`error`)}finally{U(!1)}};if(f||ee)return(0,C.jsx)(`div`,{style:{display:`flex`,justifyContent:`center`,alignItems:`center`,flex:1,minHeight:`400px`},children:(0,C.jsx)(p,{size:36,style:{animation:`spin 1s linear infinite`,color:`var(--brand-red)`}})});if(A)return(0,C.jsxs)(`div`,{style:{maxWidth:`600px`,margin:`80px auto`,textAlign:`center`,padding:`32px`,background:`#fff`,border:`1px solid var(--border-medium)`,borderRadius:`12px`,boxShadow:`var(--shadow-md)`},className:`fade-in`,children:[(0,C.jsx)(d,{size:48,style:{color:`var(--brand-red)`,marginBottom:`16px`,margin:`0 auto 16px`}}),(0,C.jsx)(`h3`,{style:{fontSize:`1.4rem`,fontWeight:800},children:`Access Restricted`}),(0,C.jsx)(`p`,{style:{color:`var(--text-secondary)`,marginTop:`8px`,marginBottom:`24px`},children:A}),(0,C.jsxs)(`div`,{style:{display:`flex`,justifyContent:`center`,gap:`12px`},children:[(0,C.jsx)(`button`,{onClick:()=>y(`/login?redirect=/admin`),className:`btn-primary`,style:{width:`auto`,padding:`10px 20px`,fontSize:`0.9rem`,borderRadius:`4px`},children:`Switch Account`}),(0,C.jsx)(`button`,{onClick:async()=>{await a(),y(`/login?redirect=/admin`)},className:`portal-logout-btn`,children:`Logout`})]})]});let X=(D.restaurantRequests||[]).filter(e=>e.status===`Pending`),Z=(D.restaurantRequests||[]).filter(e=>e.status!==`Pending`),Q=(D.applications||[]).filter(e=>e.jobTitle===`Delivery Rider`),$=(D.applications||[]).filter(e=>e.jobTitle!==`Delivery Rider`);return(0,C.jsxs)(C.Fragment,{children:[(0,C.jsx)(`style`,{children:`
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
      `}),(0,C.jsxs)(`div`,{className:`admin-container fade-in`,children:[(0,C.jsx)(`div`,{style:{display:`flex`,justifyContent:`space-between`,alignItems:`center`,gap:`12px`,marginBottom:`24px`,flexWrap:`wrap`},children:(0,C.jsxs)(`div`,{style:{display:`flex`,alignItems:`center`,gap:`12px`},children:[(0,C.jsx)(_,{size:32,style:{color:`var(--brand-red)`}}),(0,C.jsxs)(`div`,{children:[(0,C.jsx)(`h1`,{style:{fontSize:`1.8rem`,fontWeight:800},children:`Super Admin Command Center`}),(0,C.jsx)(`p`,{style:{color:`var(--text-secondary)`,fontSize:`0.9rem`,marginTop:`2px`},children:`Site statistics, role allocation, and listings management.`})]})]})}),(0,C.jsxs)(`div`,{className:`stats-grid`,children:[(0,C.jsxs)(`div`,{className:`stat-card`,children:[(0,C.jsx)(`div`,{className:`stat-icon red`,children:(0,C.jsx)(g,{size:24})}),(0,C.jsxs)(`div`,{children:[(0,C.jsx)(`span`,{style:{fontSize:`0.85rem`,color:`var(--text-muted)`,fontWeight:600},children:`Active Users`}),(0,C.jsx)(`div`,{className:`stat-number`,children:D?.userCount||0})]})]}),(0,C.jsxs)(`div`,{className:`stat-card`,children:[(0,C.jsx)(`div`,{className:`stat-icon blue`,children:(0,C.jsx)(l,{size:24})}),(0,C.jsxs)(`div`,{children:[(0,C.jsx)(`span`,{style:{fontSize:`0.85rem`,color:`var(--text-muted)`,fontWeight:600},children:`Restaurants`}),(0,C.jsx)(`div`,{className:`stat-number`,children:D?.restaurantCount||0})]})]}),(0,C.jsxs)(`div`,{className:`stat-card`,children:[(0,C.jsx)(`div`,{className:`stat-icon green`,children:(0,C.jsx)(h,{size:24})}),(0,C.jsxs)(`div`,{children:[(0,C.jsx)(`span`,{style:{fontSize:`0.85rem`,color:`var(--text-muted)`,fontWeight:600},children:`Orders Placed`}),(0,C.jsx)(`div`,{className:`stat-number`,children:D?.orderCount||0})]})]}),(0,C.jsxs)(`div`,{className:`stat-card`,children:[(0,C.jsx)(`div`,{className:`stat-icon purple`,children:(0,C.jsx)(e,{size:24})}),(0,C.jsxs)(`div`,{children:[(0,C.jsx)(`span`,{style:{fontSize:`0.85rem`,color:`var(--text-muted)`,fontWeight:600},children:`Gross Revenue`}),(0,C.jsxs)(`div`,{className:`stat-number`,children:[`₹`,(D?.totalRevenue??0).toFixed(2)]})]})]})]}),(0,C.jsxs)(`div`,{className:`tab-bar`,children:[(0,C.jsx)(`button`,{className:`tab-btn ${T===`metrics`?`active`:``}`,onClick:()=>E(`metrics`),children:`Overview & Creators`}),(0,C.jsxs)(`button`,{className:`tab-btn ${T===`requests`?`active`:``}`,onClick:()=>E(`requests`),children:[`Restaurant Requests `,X.length>0&&`(${X.length})`]}),(0,C.jsxs)(`button`,{className:`tab-btn ${T===`users`?`active`:``}`,onClick:()=>E(`users`),children:[`Users Control (`,(D?.users||[]).length,`)`]}),(0,C.jsxs)(`button`,{className:`tab-btn ${T===`applications`?`active`:``}`,onClick:()=>E(`applications`),children:[`Applications Review (`,(D?.applications||[]).length,`)`]})]}),T===`metrics`&&(0,C.jsxs)(`div`,{className:`management-grid`,children:[(0,C.jsxs)(`div`,{className:`form-card`,children:[(0,C.jsxs)(`h2`,{style:{fontSize:`1.25rem`,fontWeight:800,marginBottom:`20px`,display:`flex`,alignItems:`center`,gap:`8px`},children:[(0,C.jsx)(l,{size:20,style:{color:`var(--brand-red)`}}),` Register New Restaurant (Direct)`]}),(0,C.jsxs)(`form`,{onSubmit:J,children:[(0,C.jsxs)(`div`,{className:`form-group`,children:[(0,C.jsx)(`label`,{children:`Restaurant Name *`}),(0,C.jsx)(`input`,{type:`text`,required:!0,placeholder:`e.g. Royal Biryani House`,value:I.name,onChange:e=>L(t=>({...t,name:e.target.value}))})]}),(0,C.jsxs)(`div`,{className:`form-group`,children:[(0,C.jsx)(`label`,{children:`Cuisine Type *`}),(0,C.jsx)(`input`,{type:`text`,required:!0,placeholder:`e.g. North Indian, Mughlai`,value:I.cuisine,onChange:e=>L(t=>({...t,cuisine:e.target.value}))})]}),(0,C.jsxs)(`div`,{className:`form-group`,children:[(0,C.jsx)(`label`,{children:`Full Address *`}),(0,C.jsx)(`input`,{type:`text`,required:!0,placeholder:`Street, City, State`,value:I.address,onChange:e=>L(t=>({...t,address:e.target.value}))})]}),(0,C.jsxs)(`div`,{className:`form-group`,children:[(0,C.jsx)(`label`,{children:`Delivery Time (e.g., "35 mins")`}),(0,C.jsx)(`input`,{type:`text`,placeholder:`e.g. 30 mins`,value:I.deliveryTime,onChange:e=>L(t=>({...t,deliveryTime:e.target.value}))})]}),(0,C.jsxs)(`div`,{className:`form-group`,children:[(0,C.jsx)(`label`,{children:`Cover Image URL`}),(0,C.jsx)(`input`,{type:`url`,placeholder:`https://images.unsplash.com/...`,value:I.imagePath,onChange:e=>L(t=>({...t,imagePath:e.target.value}))})]}),(0,C.jsx)(`button`,{type:`submit`,disabled:B,className:`btn-primary`,style:{width:`100%`},children:B?(0,C.jsx)(p,{size:16,style:{animation:`spin 1s linear infinite`}}):`Add Restaurant`})]})]}),(0,C.jsxs)(`div`,{className:`form-card`,children:[(0,C.jsxs)(`h2`,{style:{fontSize:`1.25rem`,fontWeight:800,marginBottom:`20px`,display:`flex`,alignItems:`center`,gap:`8px`},children:[(0,C.jsx)(s,{size:20,style:{color:`var(--brand-red)`}}),` Publish New Job Opening`]}),(0,C.jsxs)(`form`,{onSubmit:Y,children:[(0,C.jsxs)(`div`,{className:`form-group`,children:[(0,C.jsx)(`label`,{children:`Job Title *`}),(0,C.jsx)(`input`,{type:`text`,required:!0,placeholder:`e.g. Operations Manager`,value:R.title,onChange:e=>z(t=>({...t,title:e.target.value}))})]}),(0,C.jsxs)(`div`,{className:`form-group`,children:[(0,C.jsx)(`label`,{children:`Department *`}),(0,C.jsxs)(`select`,{required:!0,value:R.department,onChange:e=>z(t=>({...t,department:e.target.value})),children:[(0,C.jsx)(`option`,{value:``,children:`Select Department`}),(0,C.jsx)(`option`,{value:`Engineering`,children:`Engineering`}),(0,C.jsx)(`option`,{value:`Operations`,children:`Operations`}),(0,C.jsx)(`option`,{value:`Culinary`,children:`Culinary`}),(0,C.jsx)(`option`,{value:`Marketing`,children:`Marketing`})]})]}),(0,C.jsxs)(`div`,{className:`form-group`,children:[(0,C.jsx)(`label`,{children:`Location *`}),(0,C.jsx)(`input`,{type:`text`,required:!0,placeholder:`e.g. Bangalore, KA (or Remote)`,value:R.location,onChange:e=>z(t=>({...t,location:e.target.value}))})]}),(0,C.jsxs)(`div`,{className:`form-group`,children:[(0,C.jsx)(`label`,{children:`Job Description *`}),(0,C.jsx)(`textarea`,{required:!0,rows:`4`,placeholder:`Outline job responsibilities, skills needed, compensation details...`,value:R.description,onChange:e=>z(t=>({...t,description:e.target.value}))})]}),(0,C.jsx)(`button`,{type:`submit`,disabled:H,className:`btn-primary`,style:{width:`100%`},children:H?(0,C.jsx)(p,{size:16,style:{animation:`spin 1s linear infinite`}}):`Publish Job Listing`})]})]})]}),T===`requests`&&(0,C.jsxs)(`div`,{children:[(0,C.jsxs)(`h2`,{style:{fontSize:`1.3rem`,fontWeight:800,marginBottom:`18px`},children:[`Pending Approvals (`,X.length,`)`]}),X.length===0?(0,C.jsx)(`div`,{style:{textAlign:`center`,padding:`40px`,border:`1px dashed var(--border-medium)`,borderRadius:`12px`,background:`#fff`,marginBottom:`32px`},children:(0,C.jsx)(`p`,{style:{color:`var(--text-secondary)`},children:`No pending restaurant onboarding requests found.`})}):(0,C.jsx)(`div`,{style:{marginBottom:`32px`},children:X.map(e=>(0,C.jsxs)(`div`,{className:`request-card`,children:[(0,C.jsxs)(`div`,{style:{display:`flex`,justifyContent:`space-between`,alignItems:`flex-start`,flexWrap:`wrap`,gap:`16px`},children:[(0,C.jsxs)(`div`,{children:[(0,C.jsxs)(`div`,{style:{display:`flex`,alignItems:`center`,gap:`10px`},children:[(0,C.jsx)(`h3`,{style:{fontSize:`1.2rem`,fontWeight:800},children:e.restaurantName}),(0,C.jsx)(`span`,{className:`badge pending`,children:`Pending verification`})]}),(0,C.jsxs)(`p`,{style:{fontSize:`0.85rem`,color:`var(--text-secondary)`,marginTop:`4px`},children:[`Cuisine: `,e.cuisineType,` | Address: `,e.address]}),(0,C.jsxs)(`p`,{style:{fontSize:`0.78rem`,color:`var(--text-muted)`,marginTop:`2px`},children:[`Submitted by Partner ID: #`,e.adminId,` on `,e.submittedDate]})]}),(0,C.jsxs)(`div`,{style:{display:`flex`,gap:`10px`},children:[(0,C.jsxs)(`button`,{disabled:M===`req-${e.id}`,onClick:()=>q(e.id,`Approved`),className:`btn-primary`,style:{background:`var(--success)`,padding:`8px 16px`,fontSize:`0.85rem`},children:[(0,C.jsx)(b,{size:16}),` Approve`]}),(0,C.jsxs)(`button`,{disabled:M===`req-${e.id}`,onClick:()=>q(e.id,`Rejected`),className:`btn-primary`,style:{background:`var(--danger)`,padding:`8px 16px`,fontSize:`0.85rem`},children:[(0,C.jsx)(m,{size:16}),` Reject`]})]})]}),(0,C.jsxs)(`div`,{className:`doc-verify-row`,children:[(0,C.jsxs)(`div`,{className:`doc-item`,children:[`License Certificate`,(0,C.jsx)(`strong`,{children:e.licenseNo})]}),(0,C.jsxs)(`div`,{className:`doc-item`,children:[`GST Registration`,(0,C.jsx)(`strong`,{children:e.gstNo})]}),(0,C.jsxs)(`div`,{className:`doc-item`,children:[`Aadhaar Number`,(0,C.jsx)(`strong`,{children:e.aadhaarNo})]})]})]},e.id))}),(0,C.jsx)(`h2`,{style:{fontSize:`1.3rem`,fontWeight:800,marginBottom:`18px`},children:`Log Registry (Reviewed)`}),Z.length===0?(0,C.jsx)(`div`,{style:{textAlign:`center`,padding:`32px`,border:`1px dashed var(--border-medium)`,borderRadius:`12px`,background:`#fff`},children:(0,C.jsx)(`p`,{style:{color:`var(--text-secondary)`},children:`Reviewed onboarding requests log will appear here.`})}):(0,C.jsx)(`div`,{children:Z.map(e=>(0,C.jsx)(`div`,{className:`request-card`,style:{opacity:.8},children:(0,C.jsxs)(`div`,{style:{display:`flex`,justifyContent:`space-between`,alignItems:`center`},children:[(0,C.jsxs)(`div`,{children:[(0,C.jsx)(`h4`,{style:{fontWeight:800},children:e.restaurantName}),(0,C.jsxs)(`p`,{style:{fontSize:`0.8rem`,color:`var(--text-secondary)`,marginTop:`2px`},children:[`Address: `,e.address]})]}),(0,C.jsx)(`span`,{className:`badge ${e.status===`Approved`?`approved`:`rejected`}`,children:e.status})]})},e.id))})]}),T===`users`&&(0,C.jsx)(`div`,{className:`admin-table-wrapper`,children:(0,C.jsxs)(`table`,{className:`admin-table`,children:[(0,C.jsx)(`thead`,{children:(0,C.jsxs)(`tr`,{children:[(0,C.jsx)(`th`,{children:`User ID`}),(0,C.jsx)(`th`,{children:`Username`}),(0,C.jsx)(`th`,{children:`Email`}),(0,C.jsx)(`th`,{children:`Phone Number`}),(0,C.jsx)(`th`,{children:`Role Control`})]})}),(0,C.jsx)(`tbody`,{children:D.users.map(e=>(0,C.jsxs)(`tr`,{children:[(0,C.jsxs)(`td`,{style:{fontWeight:700},children:[`#`,e.userID]}),(0,C.jsx)(`td`,{children:e.userName}),(0,C.jsx)(`td`,{children:e.email}),(0,C.jsx)(`td`,{children:e.phoneNumber||`N/A`}),(0,C.jsx)(`td`,{children:(0,C.jsxs)(`div`,{style:{display:`flex`,alignItems:`center`,gap:`8px`},children:[(0,C.jsxs)(`select`,{className:`role-selector`,value:e.role||`customer`,disabled:M===`role-${e.userID}`,onChange:t=>G(e.userID,t.target.value),children:[(0,C.jsx)(`option`,{value:`customer`,children:`Customer`}),(0,C.jsx)(`option`,{value:`delivery_partner`,children:`Delivery Partner`}),(0,C.jsx)(`option`,{value:`restaurant_admin`,children:`Restaurant Admin`}),(0,C.jsx)(`option`,{value:`super_admin`,children:`Super Admin`})]}),M===`role-${e.userID}`&&(0,C.jsx)(p,{size:14,style:{animation:`spin 1s linear infinite`,color:`var(--brand-red)`}})]})})]},e.userID))})]})}),T===`applications`&&(0,C.jsxs)(`div`,{children:[(0,C.jsxs)(`h2`,{style:{fontSize:`1.3rem`,fontWeight:800,marginBottom:`16px`,marginTop:`16px`,display:`flex`,alignItems:`center`,gap:`8px`},children:[(0,C.jsx)(x,{size:20,style:{color:`var(--brand-red)`}}),` Delivery Rider Onboarding Queue (`,Q.length,`)`]}),(0,C.jsx)(`div`,{className:`admin-table-wrapper`,style:{marginBottom:`40px`},children:Q.length===0?(0,C.jsx)(`div`,{style:{textAlign:`center`,padding:`32px`},children:(0,C.jsx)(`p`,{style:{color:`var(--text-secondary)`},children:`No delivery rider applications pending review.`})}):(0,C.jsxs)(`table`,{className:`admin-table`,children:[(0,C.jsx)(`thead`,{children:(0,C.jsxs)(`tr`,{children:[(0,C.jsx)(`th`,{children:`Candidate Name`}),(0,C.jsx)(`th`,{children:`Email / Phone`}),(0,C.jsx)(`th`,{children:`Applied Date`}),(0,C.jsx)(`th`,{children:`Resume`}),(0,C.jsx)(`th`,{children:`Chat Review`}),(0,C.jsx)(`th`,{children:`Status`}),(0,C.jsx)(`th`,{children:`Rider Onboarding Action`})]})}),(0,C.jsx)(`tbody`,{children:Q.map(e=>(0,C.jsxs)(`tr`,{children:[(0,C.jsx)(`td`,{style:{fontWeight:700},children:e.candidateName}),(0,C.jsxs)(`td`,{children:[(0,C.jsx)(`div`,{style:{fontSize:`0.85rem`},children:e.email}),(0,C.jsx)(`div`,{style:{fontSize:`0.8rem`,color:`var(--text-secondary)`},children:e.phone})]}),(0,C.jsx)(`td`,{children:e.appliedDate}),(0,C.jsx)(`td`,{children:(0,C.jsxs)(`a`,{href:e.resumeUrl,target:`_blank`,rel:`noreferrer`,style:{display:`inline-flex`,alignItems:`center`,gap:`4px`,fontSize:`0.85rem`},children:[(0,C.jsx)(u,{size:14}),` Resume`]})}),(0,C.jsx)(`td`,{children:(0,C.jsxs)(`button`,{onClick:()=>F(e.id),style:{background:`transparent`,color:`#8b5cf6`,border:`1px solid #8b5cf6`,padding:`6px 10px`,borderRadius:`4px`,fontSize:`0.8rem`,fontWeight:700,cursor:`pointer`,display:`flex`,alignItems:`center`,gap:`4px`},children:[(0,C.jsx)(t,{size:12}),` Chat`]})}),(0,C.jsx)(`td`,{children:(0,C.jsx)(`span`,{className:`badge ${e.status.toLowerCase().includes(`applied`)?`applied`:e.status.toLowerCase().includes(`interview`)?`interview`:e.status.toLowerCase().includes(`offer`)?`offered`:`rejected`}`,children:e.status})}),(0,C.jsx)(`td`,{children:(0,C.jsxs)(`div`,{style:{display:`flex`,gap:`8px`},children:[(0,C.jsxs)(`button`,{disabled:M===`app-${e.id}`||e.status===`Offer Extended`,onClick:()=>K(e.id,`Offer Extended`),style:{background:`#4bc0c0`,color:`white`,border:`none`,padding:`6px 12px`,borderRadius:`4px`,fontSize:`0.8rem`,fontWeight:700,cursor:`pointer`,display:`flex`,alignItems:`center`,gap:`4px`,opacity:e.status===`Offer Extended`?.6:1},children:[(0,C.jsx)(b,{size:12}),` Approve Rider`]}),(0,C.jsxs)(`button`,{disabled:M===`app-${e.id}`||e.status===`Rejected`,onClick:()=>K(e.id,`Rejected`),style:{background:`var(--danger)`,color:`white`,border:`none`,padding:`6px 12px`,borderRadius:`4px`,fontSize:`0.8rem`,fontWeight:700,cursor:`pointer`,display:`flex`,alignItems:`center`,gap:`4px`,opacity:e.status===`Rejected`?.6:1},children:[(0,C.jsx)(m,{size:12}),` Reject Rider`]})]})})]},e.id))})]})}),(0,C.jsxs)(`h2`,{style:{fontSize:`1.3rem`,fontWeight:800,marginBottom:`16px`,display:`flex`,alignItems:`center`,gap:`8px`},children:[(0,C.jsx)(s,{size:20,style:{color:`var(--brand-red)`}}),` General Career Applications (`,$.length,`)`]}),(0,C.jsx)(`div`,{className:`admin-table-wrapper`,children:$.length===0?(0,C.jsx)(`div`,{style:{textAlign:`center`,padding:`32px`},children:(0,C.jsx)(`p`,{style:{color:`var(--text-secondary)`},children:`No other career applications received.`})}):(0,C.jsxs)(`table`,{className:`admin-table`,children:[(0,C.jsx)(`thead`,{children:(0,C.jsxs)(`tr`,{children:[(0,C.jsx)(`th`,{children:`Candidate Name`}),(0,C.jsx)(`th`,{children:`Target Role`}),(0,C.jsx)(`th`,{children:`Email / Phone`}),(0,C.jsx)(`th`,{children:`Applied Date`}),(0,C.jsx)(`th`,{children:`Resume`}),(0,C.jsx)(`th`,{children:`Chat`}),(0,C.jsx)(`th`,{children:`Status Action`})]})}),(0,C.jsx)(`tbody`,{children:$.map(e=>(0,C.jsxs)(`tr`,{children:[(0,C.jsx)(`td`,{style:{fontWeight:700},children:e.candidateName}),(0,C.jsx)(`td`,{children:e.jobTitle}),(0,C.jsxs)(`td`,{children:[(0,C.jsx)(`div`,{style:{fontSize:`0.85rem`},children:e.email}),(0,C.jsx)(`div`,{style:{fontSize:`0.8rem`,color:`var(--text-secondary)`},children:e.phone})]}),(0,C.jsx)(`td`,{children:e.appliedDate}),(0,C.jsx)(`td`,{children:(0,C.jsxs)(`a`,{href:e.resumeUrl,target:`_blank`,rel:`noreferrer`,style:{display:`inline-flex`,alignItems:`center`,gap:`4px`,fontSize:`0.85rem`},children:[(0,C.jsx)(u,{size:14}),` Resume`]})}),(0,C.jsx)(`td`,{children:(0,C.jsxs)(`button`,{onClick:()=>F(e.id),style:{background:`transparent`,color:`#8b5cf6`,border:`1px solid #8b5cf6`,padding:`6px 10px`,borderRadius:`4px`,fontSize:`0.8rem`,fontWeight:700,cursor:`pointer`,display:`flex`,alignItems:`center`,gap:`4px`},children:[(0,C.jsx)(t,{size:12}),` Chat`]})}),(0,C.jsx)(`td`,{children:(0,C.jsxs)(`div`,{style:{display:`flex`,alignItems:`center`,gap:`8px`},children:[(0,C.jsxs)(`select`,{className:`role-selector`,value:e.status||`Applied`,disabled:M===`app-${e.id}`,onChange:t=>K(e.id,t.target.value),children:[(0,C.jsx)(`option`,{value:`Applied`,children:`Applied`}),(0,C.jsx)(`option`,{value:`Interview Scheduled`,children:`Interview Scheduled`}),(0,C.jsx)(`option`,{value:`Offer Extended`,children:`Offer Extended`}),(0,C.jsx)(`option`,{value:`Rejected`,children:`Rejected`})]}),M===`app-${e.id}`&&(0,C.jsx)(p,{size:14,style:{animation:`spin 1s linear infinite`,color:`var(--brand-red)`}})]})})]},e.id))})]})})]})]}),P&&(0,C.jsx)(n,{type:`application`,targetId:P,userId:r?.userID||r?.userId,userName:r?.userName||r?.username,receiverId:(D?.applications||[]).find(e=>e.id===P)?.userId||0,initialOpen:!0,onClose:()=>F(null)},P)]})};export{w as default};