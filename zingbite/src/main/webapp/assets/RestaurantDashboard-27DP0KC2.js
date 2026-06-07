import{t as e}from"./indian-rupee-QXLsQZT7.js";import{A as t,C as n,D as r,E as i,T as a,_ as o,a as s,d as c,f as l,h as ee,k as u,l as te,m as d,t as ne,u as re,v as f,w as p,y as m}from"./index-BxGC8YKb.js";var ie=n(`chevron-right`,[[`path`,{d:`m9 18 6-6-6-6`,key:`mthhwq`}]]),h=n(`utensils`,[[`path`,{d:`M3 2v7c0 1.1.9 2 2 2h4a2 2 0 0 0 2-2V2`,key:`cjf0a3`}],[`path`,{d:`M7 2v20`,key:`1473qp`}],[`path`,{d:`M21 15V2a5 5 0 0 0-5 5v6c0 1.1.9 2 2 2h3Zm0 0v7`,key:`j28e5`}]]),g=t(u(),1),_=a(),v=()=>{let{user:t,logout:n,loading:a}=(0,g.useContext)(p),u=r(),{showAlert:v}=ne(),[y,b]=(0,g.useState)(`orders`),[x,S]=(0,g.useState)({restaurant:null,menu:[],orders:[],request:null}),[ae,C]=(0,g.useState)(!0),[w,T]=(0,g.useState)(null),[E,D]=(0,g.useState)({name:``,cuisine:``,address:``,deliveryTime:`30 mins`,imagePath:``,licenseNo:``,aadhaarNo:``,gstNo:``}),[O,k]=(0,g.useState)(!1),[A,j]=(0,g.useState)(!1),[M,N]=(0,g.useState)({name:``,price:``,description:``,imagePath:``}),[P,F]=(0,g.useState)(!1),[I,L]=(0,g.useState)(null),[R,oe]=(0,g.useState)(``),[z,B]=(0,g.useState)(`All`),V=async(e=!1)=>{try{S((await i.get(`/api/restaurant-admin`)).data),e||T(null)}catch(t){console.error(t),e||T(t.response?.data?.error||`Failed to load restaurant data.`)}finally{e||C(!1)}};(0,g.useEffect)(()=>{if(a)return;if(!t){u(`/login?redirect=/restaurant-admin`);return}if(t.role!==`restaurant_admin`&&t.role!==`customer`){T(`Access Restricted. You are currently logged in as a `+t.role+`. Only Restaurant Admins or onboarding partners can access this portal.`),C(!1);return}V(!1);let e=setInterval(()=>{document.visibilityState===`visible`&&V(!0)},1e4);return()=>clearInterval(e)},[t,a]);let H=async e=>{if(e.preventDefault(),!E.name||!E.cuisine||!E.address||!E.licenseNo||!E.aadhaarNo||!E.gstNo){v(`Please fill out all required fields.`,`warning`);return}k(!0);try{await i.post(`/api/restaurant-admin`,{action:`submitRestaurantRequest`,name:E.name,cuisine:E.cuisine,address:E.address,deliveryTime:E.deliveryTime,imagePath:E.imagePath||void 0,licenseNo:E.licenseNo,aadhaarNo:E.aadhaarNo,gstNo:E.gstNo}),v(`Onboarding request submitted successfully! Super admin will verify your documents.`,`success`),await V()}catch{v(`Failed to submit onboarding request.`,`error`)}finally{k(!1)}},U=async(e,t)=>{try{await i.post(`/api/restaurant-admin`,{action:`toggleAvailability`,menuId:e,isAvailable:!t}),S(n=>({...n,menu:(n.menu||[]).map(n=>n.menuId===e?{...n,isAvailable:!t}:n)}))}catch{v(`Failed to update availability.`,`error`)}},W=async e=>{if(e.preventDefault(),!M.name||!M.price||!M.description){v(`Please fill out all required fields.`,`warning`);return}F(!0);try{await i.post(`/api/restaurant-admin`,{action:`addMenuItem`,name:M.name,price:parseFloat(M.price),description:M.description,imagePath:M.imagePath||void 0,restaurantId:x.restaurant.restaurantId}),j(!1),N({name:``,price:``,description:``,imagePath:``}),await V()}catch{v(`Failed to add menu item.`,`error`)}finally{F(!1)}},G=async(e,t)=>{L(e);try{await i.post(`/api/restaurant-admin`,{action:`updateOrderStatus`,orderId:e,status:t}),await V()}catch{v(`Failed to update order status.`,`error`)}finally{L(null)}},K=e=>{let t=(e=>{switch(e){case`Placed`:case`Accepted`:return 0;case`Preparing`:return 1;case`Waiting to Dispatch`:return 2;case`Out for Delivery`:return 3;case`Delivered`:return 5;default:return 0}})(e.status);return(0,_.jsx)(`div`,{className:`premium-stepper-container`,children:(0,_.jsx)(`div`,{className:`premium-stepper`,children:[{key:0,label:`Placed`,statusName:`Accepted`},{key:1,label:`Preparing`,statusName:`Preparing`,actionLabel:`Start Cooking`},{key:2,label:`Food Ready`,statusName:`Waiting to Dispatch`,actionLabel:`Mark Ready`},{key:3,label:`Dispatched`,statusName:`Out for Delivery`,actionLabel:`Dispatch`},{key:4,label:`Delivered`,statusName:`Delivered`}].map((n,r)=>{let i=t>r,a=t===r,o=t<r,s=r===1&&t===0||r===2&&t===1||r===3&&t===2,c=`stepper-node`;return i&&(c+=` completed`),a&&(c+=` active`),o&&(c+=` pending`),s&&(c+=` actionable`),(0,_.jsxs)(g.Fragment,{children:[r>0&&(0,_.jsx)(`div`,{className:`stepper-line ${i||a?`active`:``}`}),(0,_.jsxs)(`div`,{className:c,children:[s?(0,_.jsxs)(`button`,{disabled:I===e.orderId,onClick:()=>G(e.orderId,n.statusName),className:`stepper-btn-node`,title:n.actionLabel,children:[I===e.orderId?(0,_.jsx)(d,{className:`spin`,size:14}):r===1?(0,_.jsx)(h,{size:14}):r===2?(0,_.jsx)(f,{size:14}):(0,_.jsx)(ie,{size:14}),(0,_.jsx)(`span`,{className:`stepper-btn-label`,children:n.actionLabel})]}):(0,_.jsx)(`div`,{className:`stepper-circle`,children:i?(0,_.jsx)(f,{size:14}):r+1}),(0,_.jsx)(`span`,{className:`stepper-label`,children:n.label})]})]},n.key)})})})};if(a||ae)return(0,_.jsx)(`div`,{style:{display:`flex`,justifyContent:`center`,alignItems:`center`,flex:1,minHeight:`400px`},children:(0,_.jsx)(d,{size:36,style:{animation:`spin 1s linear infinite`,color:`var(--brand-red)`}})});if(w)return(0,_.jsxs)(`div`,{style:{maxWidth:`600px`,margin:`80px auto`,textAlign:`center`,padding:`32px`,background:`#fff`,border:`1px solid var(--border-medium)`,borderRadius:`12px`,boxShadow:`var(--shadow-md)`},className:`fade-in`,children:[(0,_.jsx)(m,{size:48,style:{color:`var(--brand-red)`,marginBottom:`16px`,margin:`0 auto 16px`}}),(0,_.jsx)(`h3`,{style:{fontSize:`1.4rem`,fontWeight:800},children:`Access Restricted`}),(0,_.jsx)(`p`,{style:{color:`var(--text-secondary)`,marginTop:`8px`,marginBottom:`24px`},children:w}),(0,_.jsxs)(`div`,{style:{display:`flex`,justifyContent:`center`,gap:`12px`},children:[(0,_.jsx)(`button`,{onClick:()=>u(`/login?redirect=/restaurant-admin`),className:`btn-primary`,style:{width:`auto`,padding:`10px 20px`,fontSize:`0.9rem`,borderRadius:`4px`},children:`Switch Account`}),(0,_.jsx)(`button`,{onClick:async()=>{await n(),u(`/login?redirect=/restaurant-admin`)},className:`portal-logout-btn`,children:`Logout`})]})]});let{restaurant:q,menu:se=[],orders:J=[],request:Y}=x||{},X=(J||[]).filter(e=>(e.status||``).toLowerCase()===`delivered`),ce=(J||[]).filter(e=>(e.status||``).toLowerCase()!==`delivered`).length,Z=X.reduce((e,t)=>e+(t.total||0),0),le=X.length>0?Z/X.length:0;if(!q){let e=Y&&Y.status===`Pending`,t=Y&&Y.status===`Rejected`;return(0,_.jsxs)(_.Fragment,{children:[(0,_.jsx)(`style`,{children:`
          .onboard-container {
            max-width: 650px;
            margin: 48px auto;
            padding: 32px;
            background: #fff;
            border: 1px solid var(--border-medium);
            border-radius: var(--radius-lg);
            box-shadow: var(--shadow-md);
          }
          .form-row-2 {
            display: grid;
            grid-template-columns: 1fr 1fr;
            gap: 16px;
          }
          @media (max-width: 600px) {
            .onboard-container {
              padding: 20px 16px;
              margin: 24px 12px;
            }
            .form-row-2 {
              grid-template-columns: 1fr;
              gap: 12px;
            }
          }
          .form-title {
            font-size: 1.6rem;
            font-weight: 800;
            margin-bottom: 8px;
            display: flex;
            align-items: center;
            gap: 8px;
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
          .form-group input, .form-group textarea {
            width: 100%;
            padding: 10px 12px;
            border: 1px solid var(--border-medium);
            border-radius: var(--radius-sm);
            font-size: 0.95rem;
            outline: none;
          }
          .form-group input:focus, .form-group textarea:focus {
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
            width: 100%;
            display: flex;
            align-items: center;
            justify-content: center;
            gap: 8px;
            transition: background 0.2s;
          }
          .btn-primary:hover {
            background: var(--brand-red-hover);
          }
          .status-panel {
            text-align: center;
            padding: 40px 24px;
          }
        `}),(0,_.jsx)(`div`,{className:`onboard-container fade-in`,children:e?(0,_.jsxs)(`div`,{className:`status-panel`,children:[(0,_.jsx)(d,{size:48,style:{animation:`spin 2s linear infinite`,color:`#ff9f40`,margin:`0 auto 16px`}}),(0,_.jsx)(`h2`,{style:{fontSize:`1.4rem`,fontWeight:800},children:`Onboarding Application Submitted`}),(0,_.jsxs)(`p`,{style:{color:`var(--text-secondary)`,marginTop:`8px`,fontSize:`0.95rem`,lineHeight:`1.6`},children:[`Your application for `,(0,_.jsx)(`strong`,{children:Y.restaurantName}),` is currently pending. The Super Admin is reviewing your License (`,(0,_.jsx)(`strong`,{children:Y.licenseNo}),`), Aadhaar, and GST details.`]}),(0,_.jsx)(`div`,{style:{background:`rgba(255,159,64,0.06)`,border:`1px solid rgba(255,159,64,0.2)`,padding:`12px`,borderRadius:`8px`,marginTop:`20px`,fontSize:`0.82rem`,color:`#ff9f40`,fontWeight:700},children:`STATUS: PENDING SUPER ADMIN VERIFICATION`})]}):(0,_.jsxs)(`div`,{children:[(0,_.jsxs)(`div`,{className:`form-title`,children:[(0,_.jsx)(s,{size:26,style:{color:`var(--brand-red)`}}),` Partner Onboarding Application`]}),(0,_.jsx)(`p`,{style:{color:`var(--text-secondary)`,marginBottom:`24px`,fontSize:`0.9rem`},children:`Register your kitchen on ZingBite. Provide business identification documents for verification to unlock your merchant portal.`}),t&&(0,_.jsxs)(`div`,{style:{background:`rgba(226,55,68,0.06)`,border:`1px solid rgba(226,55,68,0.2)`,padding:`14px`,borderRadius:`8px`,color:`var(--danger)`,fontSize:`0.88rem`,fontWeight:600,marginBottom:`20px`},children:[(0,_.jsx)(m,{size:16,style:{display:`inline`,verticalAlign:`middle`,marginRight:`6px`}}),`Your previous request was rejected. Please check your document identifiers and re-submit details.`]}),(0,_.jsxs)(`form`,{onSubmit:H,children:[(0,_.jsxs)(`div`,{className:`form-group`,children:[(0,_.jsx)(`label`,{children:`Restaurant Name *`}),(0,_.jsx)(`input`,{type:`text`,required:!0,placeholder:`e.g. Punjabi Tadka Kitchen`,value:E.name,onChange:e=>D({...E,name:e.target.value})})]}),(0,_.jsxs)(`div`,{className:`form-row-2`,children:[(0,_.jsxs)(`div`,{className:`form-group`,style:{marginBottom:0},children:[(0,_.jsx)(`label`,{children:`Cuisine Type *`}),(0,_.jsx)(`input`,{type:`text`,required:!0,placeholder:`e.g. North Indian`,value:E.cuisine,onChange:e=>D({...E,cuisine:e.target.value})})]}),(0,_.jsxs)(`div`,{className:`form-group`,style:{marginBottom:0},children:[(0,_.jsx)(`label`,{children:`Avg Delivery Time *`}),(0,_.jsx)(`input`,{type:`text`,required:!0,placeholder:`e.g. 35 mins`,value:E.deliveryTime,onChange:e=>D({...E,deliveryTime:e.target.value})})]})]}),(0,_.jsxs)(`div`,{className:`form-group`,children:[(0,_.jsx)(`label`,{children:`Full Address *`}),(0,_.jsx)(`input`,{type:`text`,required:!0,placeholder:`Street, City, State`,value:E.address,onChange:e=>D({...E,address:e.target.value})})]}),(0,_.jsxs)(`div`,{className:`form-group`,children:[(0,_.jsx)(`label`,{children:`Image URL (Cover Banner)`}),(0,_.jsx)(`input`,{type:`url`,placeholder:`https://images.unsplash.com/...`,value:E.imagePath,onChange:e=>D({...E,imagePath:e.target.value})})]}),(0,_.jsx)(`div`,{style:{height:`1px`,background:`var(--border-medium)`,margin:`20px 0`}}),(0,_.jsxs)(`h3`,{style:{fontSize:`1rem`,fontWeight:700,marginBottom:`12px`,display:`flex`,alignItems:`center`,gap:`6px`},children:[(0,_.jsx)(ee,{size:16}),` Licensing & Identification Verification`]}),(0,_.jsxs)(`div`,{className:`form-group`,children:[(0,_.jsx)(`label`,{children:`FSSAI Food License Number *`}),(0,_.jsx)(`input`,{type:`text`,required:!0,placeholder:`14-digit FSSAI Number`,value:E.licenseNo,onChange:e=>D({...E,licenseNo:e.target.value})})]}),(0,_.jsxs)(`div`,{className:`form-row-2`,children:[(0,_.jsxs)(`div`,{className:`form-group`,style:{marginBottom:0},children:[(0,_.jsx)(`label`,{children:`Owner Aadhaar Number *`}),(0,_.jsx)(`input`,{type:`text`,required:!0,placeholder:`12-digit Aadhaar`,value:E.aadhaarNo,onChange:e=>D({...E,aadhaarNo:e.target.value})})]}),(0,_.jsxs)(`div`,{className:`form-group`,style:{marginBottom:0},children:[(0,_.jsx)(`label`,{children:`GSTIN Registration Number *`}),(0,_.jsx)(`input`,{type:`text`,required:!0,placeholder:`15-digit GSTIN`,value:E.gstNo,onChange:e=>D({...E,gstNo:e.target.value})})]})]}),(0,_.jsx)(`button`,{type:`submit`,disabled:O,className:`btn-primary`,children:O?(0,_.jsx)(d,{size:16,style:{animation:`spin 1s linear infinite`}}):`Submit Onboarding Request`})]})]})})]})}let Q=(se||[]).filter(e=>(e.menuName||``).toLowerCase().includes(R.toLowerCase())||(e.description||``).toLowerCase().includes(R.toLowerCase())),$=(J||[]).filter(e=>z===`All`?!0:(e.status||``).toLowerCase()===z.toLowerCase());return(0,_.jsxs)(_.Fragment,{children:[(0,_.jsx)(`style`,{children:`
        .admin-container {
          max-width: 1200px;
          margin: 40px auto;
          padding: 0 24px;
        }
        .restaurant-header-banner {
          position: relative;
          background-color: #1e1e24;
          color: white;
          border-radius: var(--radius-lg);
          padding: 40px 32px;
          display: flex;
          align-items: center;
          justify-content: space-between;
          flex-wrap: wrap;
          gap: 24px;
          margin-bottom: 32px;
          overflow: hidden;
          box-shadow: var(--shadow-lg);
          z-index: 1;
        }
        .banner-overlay {
          position: absolute;
          top: 0;
          left: 0;
          right: 0;
          bottom: 0;
          background: linear-gradient(to right, rgba(0, 0, 0, 0.85) 0%, rgba(0, 0, 0, 0.4) 100%);
          backdrop-filter: blur(6px);
          z-index: -1;
        }
        .banner-info-wrap {
          display: flex;
          align-items: center;
          gap: 24px;
          flex-wrap: wrap;
        }
        .restaurant-img {
          width: 100px;
          height: 100px;
          border-radius: var(--radius-md);
          object-fit: cover;
          border: 4px solid rgba(255,255,255,0.25);
          box-shadow: 0 8px 20px rgba(0,0,0,0.2);
          transition: transform 0.2s ease;
        }
        .restaurant-img:hover {
          transform: scale(1.05);
        }
        .banner-details {
          display: flex;
          flex-direction: column;
          gap: 6px;
        }
        .banner-title-row {
          display: flex;
          align-items: center;
          gap: 12px;
          flex-wrap: wrap;
        }
        .banner-title {
          font-size: 2.2rem;
          font-weight: 800;
          margin: 0;
          letter-spacing: -0.5px;
          text-shadow: 0 2px 4px rgba(0,0,0,0.3);
        }
        .banner-badge {
          background: var(--brand-red);
          color: white;
          padding: 4px 10px;
          border-radius: 12px;
          font-size: 0.75rem;
          font-weight: 700;
          text-transform: uppercase;
          letter-spacing: 0.5px;
          box-shadow: 0 2px 8px rgba(247, 55, 79, 0.3);
        }
        .banner-subtext {
          display: flex;
          align-items: center;
          gap: 6px;
          font-size: 0.95rem;
          color: rgba(255,255,255,0.9);
          text-shadow: 0 1px 2px rgba(0,0,0,0.3);
        }
        .banner-subtext span {
          line-height: 1;
        }
        .kpi-grid {
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(220px, 1fr));
          gap: 20px;
          margin-bottom: 32px;
        }
        .kpi-card {
          background: #fff;
          border: 1px solid var(--border-medium);
          border-radius: var(--radius-md);
          padding: 20px;
          display: flex;
          align-items: center;
          gap: 16px;
          position: relative;
          box-shadow: var(--shadow-sm);
          transition: all 0.3s ease;
        }
        .kpi-card:hover {
          transform: translateY(-3px);
          box-shadow: var(--shadow-md);
          border-color: rgba(247, 55, 79, 0.2);
        }
        .kpi-icon-wrap {
          width: 48px;
          height: 48px;
          border-radius: 50%;
          display: flex;
          align-items: center;
          justify-content: center;
        }
        .kpi-card.revenue .kpi-icon-wrap {
          background: rgba(96, 178, 70, 0.1);
          color: var(--success);
        }
        .kpi-card.active-orders .kpi-icon-wrap {
          background: rgba(255, 159, 64, 0.1);
          color: #ff9f40;
        }
        .kpi-card.total-orders .kpi-icon-wrap {
          background: rgba(54, 162, 235, 0.1);
          color: #36a2eb;
        }
        .kpi-card.avg-value .kpi-icon-wrap {
          background: rgba(153, 102, 255, 0.1);
          color: #9966ff;
        }
        .kpi-info {
          display: flex;
          flex-direction: column;
        }
        .kpi-label {
          font-size: 0.8rem;
          font-weight: 600;
          color: var(--text-secondary);
        }
        .kpi-value {
          font-size: 1.4rem;
          font-weight: 800;
          color: var(--text-primary);
          margin-top: 2px;
        }
        .kpi-badge {
          position: absolute;
          top: 10px;
          right: 12px;
          font-size: 0.65rem;
          font-weight: 700;
          padding: 2px 6px;
          border-radius: 8px;
          text-transform: uppercase;
        }
        .kpi-badge.positive {
          background: rgba(96, 178, 70, 0.1);
          color: var(--success);
        }
        .kpi-badge.text {
          background: var(--bg-surface);
          color: var(--text-muted);
        }
        .kpi-badge.pulsing {
          background: rgba(226, 55, 68, 0.1);
          color: var(--danger);
          animation: pulseGlow 1.5s infinite;
        }
        @keyframes pulseGlow {
          0% { box-shadow: 0 0 0 0px rgba(226, 55, 68, 0.4); }
          70% { box-shadow: 0 0 0 6px rgba(226, 55, 68, 0); }
          100% { box-shadow: 0 0 0 0px rgba(226, 55, 68, 0); }
        }

        .dashboard-content-layout {
          display: grid;
          grid-template-columns: 1fr 300px;
          gap: 28px;
          align-items: start;
        }
        @media (max-width: 992px) {
          .dashboard-content-layout {
            grid-template-columns: 1fr;
          }
        }
        .main-content-area {
          min-width: 0;
        }
        .dashboard-sidebar {
          display: flex;
          flex-direction: column;
          gap: 24px;
        }
        .sidebar-card {
          background: #fff;
          border: 1px solid var(--border-medium);
          border-radius: var(--radius-md);
          padding: 20px;
          box-shadow: var(--shadow-sm);
        }
        .sidebar-card-title {
          font-size: 1.1rem;
          font-weight: 800;
          color: var(--text-primary);
          margin-bottom: 16px;
          padding-bottom: 8px;
          border-bottom: 1px solid var(--border-light);
        }
        .profile-item {
          display: flex;
          flex-direction: column;
          gap: 4px;
        }
        .profile-label {
          font-size: 0.75rem;
          font-weight: 600;
          color: var(--text-secondary);
          text-transform: uppercase;
          letter-spacing: 0.5px;
        }
        .profile-value {
          font-size: 0.9rem;
          font-weight: 700;
          color: var(--text-primary);
        }
        .code-font {
          font-family: monospace;
          letter-spacing: 0.5px;
        }
        .stacked-bar-container {
          display: flex;
          height: 12px;
          border-radius: 6px;
          overflow: hidden;
          background: var(--bg-surface);
          margin-bottom: 16px;
        }
        .stacked-segment {
          height: 100%;
          transition: width 0.3s ease;
        }
        .stacked-segment.placed { background: #36a2eb; }
        .stacked-segment.cooking { background: #ff9f40; }
        .stacked-segment.ready { background: #ffcd56; }
        .stacked-segment.shipping { background: #9966ff; }
        .stacked-segment.delivered { background: #4bc0c0; }

        .stacked-legend {
          display: flex;
          flex-direction: column;
          gap: 8px;
        }
        .legend-item {
          display: flex;
          align-items: center;
          gap: 8px;
          font-size: 0.8rem;
          font-weight: 600;
          color: var(--text-secondary);
        }
        .legend-item .dot {
          width: 8px;
          height: 8px;
          border-radius: 50%;
          display: inline-block;
        }
        .legend-item .dot.placed { background: #36a2eb; }
        .legend-item .dot.cooking { background: #ff9f40; }
        .legend-item .dot.ready { background: #ffcd56; }
        .legend-item .dot.shipping { background: #9966ff; }
        .legend-item .dot.delivered { background: #4bc0c0; }

        .tab-bar {
          display: flex;
          background: var(--bg-surface);
          border-radius: 30px;
          padding: 6px;
          margin-bottom: 28px;
          gap: 4px;
          max-width: fit-content;
          border: 1px solid var(--border-medium);
          box-shadow: inset 0 2px 4px rgba(0,0,0,0.02);
        }
        .tab-btn {
          background: transparent;
          border: none;
          padding: 10px 24px;
          font-weight: 700;
          font-size: 0.95rem;
          color: var(--text-secondary);
          cursor: pointer;
          border-radius: 24px;
          transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
          white-space: nowrap;
        }
        .tab-btn.active {
          background: white;
          color: var(--brand-red);
          box-shadow: 0 4px 12px rgba(0, 0, 0, 0.05), 0 1px 3px rgba(0, 0, 0, 0.02);
        }
        .search-bar-container {
          display: flex;
          gap: 12px;
          margin-bottom: 28px;
          align-items: center;
          flex-wrap: wrap;
        }
        .search-input-wrapper {
          position: relative;
          flex: 1;
          min-width: 250px;
        }
        .search-input-wrapper input {
          width: 100%;
          padding: 12px 16px 12px 40px;
          border: 1px solid var(--border-medium);
          border-radius: var(--radius-sm);
          font-size: 0.95rem;
          outline: none;
          transition: border-color var(--transition-fast);
        }
        .search-input-wrapper input:focus {
          border-color: var(--brand-red);
        }
        .search-icon-inside {
          position: absolute;
          left: 14px;
          top: 50%;
          transform: translateY(-50%);
          color: var(--text-muted);
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
          transition: all 0.2s ease;
        }
        .btn-primary:hover {
          background: var(--brand-red-hover);
          transform: translateY(-1px);
          box-shadow: 0 4px 12px rgba(247, 55, 79, 0.2);
        }
        .menu-grid {
          display: grid;
          grid-template-columns: repeat(auto-fill, minmax(280px, 1fr));
          gap: 24px;
        }
        .menu-item-card {
          background: #fff;
          border: 1px solid var(--border-medium);
          border-radius: var(--radius-lg);
          overflow: hidden;
          box-shadow: var(--shadow-sm);
          display: flex;
          flex-direction: column;
          transition: all 0.3s cubic-bezier(0.25, 0.8, 0.25, 1);
          opacity: 0;
          transform: translateY(20px);
        }
        .menu-item-card:hover {
          transform: translateY(-5px);
          box-shadow: var(--shadow-md);
          border-color: rgba(247, 55, 79, 0.25);
        }
        .menu-item-img-wrapper {
          position: relative;
          height: 160px;
          width: 100%;
          overflow: hidden;
          background: var(--bg-surface);
        }
        .menu-item-img {
          width: 100%;
          height: 100%;
          object-fit: cover;
          transition: transform 0.5s cubic-bezier(0.25, 0.8, 0.25, 1);
        }
        .menu-item-card:hover .menu-item-img {
          transform: scale(1.08);
        }
        .menu-item-body {
          padding: 18px;
          flex: 1;
          display: flex;
          flex-direction: column;
          justify-content: space-between;
        }
        .admin-toggle-switch {
          position: relative;
          width: 48px;
          height: 24px;
          background-color: var(--border-medium);
          border-radius: 12px;
          transition: background-color 0.3s ease;
          cursor: pointer;
          display: inline-block;
        }
        .admin-toggle-switch.available {
          background-color: var(--success);
        }
        .admin-toggle-knob {
          position: absolute;
          top: 3px;
          left: 3px;
          width: 18px;
          height: 18px;
          background-color: white;
          border-radius: 50%;
          transition: transform 0.3s cubic-bezier(0.25, 0.8, 0.25, 1);
          box-shadow: 0 1px 3px rgba(0,0,0,0.2);
        }
        .admin-toggle-switch.available .admin-toggle-knob {
          transform: translateX(24px);
        }
        .animate-card {
          animation: cardFadeInUp 0.55s cubic-bezier(0.25, 0.8, 0.25, 1) both;
        }
        @keyframes cardFadeInUp {
          from {
            opacity: 0;
            transform: translateY(24px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
        .order-list {
          display: flex;
          flex-direction: column;
          gap: 20px;
        }
        .order-card {
          background: #fff;
          border: 1px solid var(--border-medium);
          border-left: 6px solid var(--border-medium);
          border-radius: var(--radius-md);
          padding: 24px;
          box-shadow: var(--shadow-sm);
          display: flex;
          justify-content: space-between;
          align-items: flex-start;
          flex-wrap: wrap;
          gap: 20px;
          transition: transform 0.2s ease, box-shadow 0.2s ease;
        }
        .order-card:hover {
          transform: translateY(-2px);
          box-shadow: var(--shadow-md);
        }
        
        .order-card.status-placed, .order-card.status-accepted { border-left-color: #36a2eb; }
        .order-card.status-preparing { border-left-color: #ff9f40; }
        .order-card.status-waiting-to-dispatch { border-left-color: #ffcd56; }
        .order-card.status-out-for-delivery { border-left-color: #9966ff; }
        .order-card.status-delivered { border-left-color: #4bc0c0; }

        .order-info-section {
          flex: 2;
          min-width: 280px;
        }
        .order-actions-section {
          flex: 1;
          min-width: 200px;
          display: flex;
          flex-direction: column;
          align-items: flex-end;
          justify-content: space-between;
          height: 100%;
          gap: 12px;
        }
        .customer-info-box {
          background: var(--bg-surface);
          border: 1px solid var(--border-light);
          padding: 16px;
          border-radius: var(--radius-sm);
          margin-bottom: 16px;
          transition: background-color var(--transition-fast);
        }
        .customer-info-box:hover {
          background: var(--bg-surface-hover);
        }
        .customer-name {
          font-weight: 700;
          font-size: 0.95rem;
          color: var(--text-primary);
          margin-bottom: 8px;
          display: flex;
          align-items: center;
          gap: 6px;
        }
        .customer-detail {
          display: flex;
          align-items: center;
          gap: 8px;
          font-size: 0.85rem;
          color: var(--text-secondary);
          margin-top: 6px;
        }
        .call-customer-btn {
          display: inline-flex;
          align-items: center;
          gap: 4px;
          background: rgba(96, 178, 70, 0.1);
          color: var(--success);
          border: 1px solid rgba(96, 178, 70, 0.2);
          padding: 4px 10px;
          border-radius: 12px;
          font-size: 0.75rem;
          font-weight: 700;
          cursor: pointer;
          margin-left: 8px;
          transition: all 0.2s ease;
          text-decoration: none;
        }
        .call-customer-btn:hover {
          background: var(--success);
          color: white;
          box-shadow: 0 2px 6px rgba(96, 178, 70, 0.25);
        }
        .modal-overlay {
          position: fixed;
          top: 0;
          left: 0;
          right: 0;
          bottom: 0;
          background: rgba(0,0,0,0.5);
          display: flex;
          align-items: center;
          justify-content: center;
          z-index: 1000;
          backdrop-filter: blur(4px);
        }
        .modal-content {
          background: white;
          padding: 32px;
          border-radius: var(--radius-lg);
          max-width: 500px;
          width: 100%;
          box-shadow: var(--shadow-lg);
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
        .portal-banner-logout-btn {
          display: flex;
          align-items: center;
          gap: 6px;
          background: rgba(255, 255, 255, 0.15);
          border: 1px solid rgba(255, 255, 255, 0.25);
          color: white;
          font-weight: 700;
          padding: 10px 20px;
          border-radius: 24px;
          cursor: pointer;
          backdrop-filter: blur(4px);
          transition: all 0.25s ease;
          z-index: 10;
        }
        .portal-banner-logout-btn:hover {
          background: rgba(255, 255, 255, 0.25) !important;
          border-color: rgba(255, 255, 255, 0.4) !important;
          transform: translateY(-2px);
          box-shadow: 0 4px 12px rgba(0,0,0,0.1);
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
        .form-group input, .form-group textarea {
          width: 100%;
          padding: 10px 12px;
          border: 1px solid var(--border-medium);
          border-radius: var(--radius-sm);
          font-size: 0.95rem;
          outline: none;
        }
        .form-group input:focus, .form-group textarea:focus {
          border-color: var(--brand-red);
        }
        .badge {
          padding: 6px 12px;
          border-radius: 12px;
          font-size: 0.75rem;
          font-weight: 700;
          text-transform: uppercase;
          letter-spacing: 0.5px;
        }
        .badge.placed { background: rgba(54,162,235,0.08); color: #36a2eb; }
        .badge.accepted { background: rgba(54,162,235,0.08); color: #36a2eb; }
        .badge.preparing { background: rgba(255,159,64,0.08); color: #ff9f40; }
        .badge.waiting-to-dispatch { background: rgba(255,206,86,0.08); color: #e09f00; }
        .badge.out-for-delivery { background: rgba(153,102,255,0.08); color: #9966ff; }
        .badge.delivered { background: rgba(75,192,192,0.08); color: #4bc0c0; }
        .pill-filter {
          padding: 8px 16px;
          border: 1px solid var(--border-medium);
          border-radius: 24px;
          background: white;
          cursor: pointer;
          font-weight: 700;
          font-size: 0.85rem;
          color: var(--text-secondary);
          transition: all 0.25s ease;
          white-space: nowrap;
          box-shadow: 0 2px 6px rgba(0,0,0,0.02);
        }
        .pill-filter:hover {
          border-color: var(--brand-red);
          color: var(--brand-red);
          background: rgba(247, 55, 79, 0.02);
        }
        .pill-filter.active {
          background: var(--brand-red);
          border-color: var(--brand-red);
          color: white;
          box-shadow: 0 4px 12px rgba(247, 55, 79, 0.2);
        }
        .hide-scrollbar::-webkit-scrollbar {
          display: none;
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
        @media (max-width: 768px) {
          .admin-container {
            margin: 20px auto;
            padding: 0 16px;
          }
          .restaurant-header-banner {
            flex-direction: column;
            align-items: center;
            text-align: center;
            padding: 32px 20px;
            gap: 20px;
          }
          .banner-info-wrap {
            flex-direction: column;
            align-items: center;
            gap: 16px;
            width: 100%;
          }
          .banner-details {
            align-items: center;
          }
          .banner-title-row {
            flex-direction: column;
            align-items: center;
            gap: 8px;
          }
          .banner-title {
            font-size: 1.8rem;
          }
          .banner-subtext {
            justify-content: center;
            font-size: 0.88rem;
          }
          .tab-bar {
            max-width: 100%;
            width: 100%;
          }
          .tab-btn {
            flex: 1;
            text-align: center;
            padding: 10px 12px;
            font-size: 0.88rem;
          }
          .search-bar-container {
            flex-direction: column;
            align-items: stretch;
            gap: 12px;
          }
          .search-input-wrapper {
            width: 100%;
            min-width: 100%;
          }
          .search-bar-container button {
            width: 100%;
            justify-content: center;
          }
          .order-card {
            flex-direction: column;
            align-items: stretch;
            gap: 16px;
            padding: 16px;
          }
          .order-info-section {
            min-width: 100%;
          }
          .order-actions-section {
            align-items: flex-start;
            min-width: 100%;
            text-align: left;
            margin-top: 8px;
          }
          .order-actions-section div {
            text-align: left !important;
          }
          .order-actions-section button {
            width: 100%;
          }
        }
        @media (max-width: 600px) {
          .modal-content {
            padding: 20px;
            margin: 12px;
          }
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
        @media (max-width: 480px) {
          .stepper-label {
            display: none;
          }
          .stepper-node {
            min-width: 32px;
          }
          .stepper-circle {
            width: 22px;
            height: 22px;
            font-size: 0.65rem;
          }
          .stepper-line {
            transform: translateY(-9px);
            height: 2px;
          }
          .stepper-btn-node {
            transform: translateY(-9px);
            padding: 4px 8px;
            font-size: 0.68rem;
          }
          @keyframes actionPulseRider {
            0% { transform: translateY(-9px) scale(1); }
            50% { transform: translateY(-9px) scale(1.03); box-shadow: 0 4px 10px rgba(75, 192, 192, 0.3); }
            100% { transform: translateY(-9px) scale(1); }
          }
        }
      `}),(0,_.jsxs)(`div`,{className:`admin-container fade-in`,children:[q&&(0,_.jsxs)(`div`,{className:`restaurant-header-banner`,style:{backgroundImage:`url(${q.imagePath||`https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?q=80&w=2070&auto=format&fit=crop`})`,backgroundSize:`cover`,backgroundPosition:`center`},children:[(0,_.jsx)(`div`,{className:`banner-overlay`}),(0,_.jsxs)(`div`,{className:`banner-info-wrap`,children:[(0,_.jsx)(`img`,{src:q.imagePath||`https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?q=80&w=2070&auto=format&fit=crop`,onError:e=>{e.target.onerror=null,e.target.src=`https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?q=80&w=2070&auto=format&fit=crop`},alt:q.restaurantName,className:`restaurant-img`}),(0,_.jsxs)(`div`,{className:`banner-details`,children:[(0,_.jsxs)(`div`,{className:`banner-title-row`,children:[(0,_.jsx)(`h1`,{className:`banner-title`,children:q.restaurantName}),(0,_.jsx)(`span`,{className:`banner-badge`,children:`Portal Admin`})]}),(0,_.jsxs)(`p`,{className:`banner-subtext`,children:[(0,_.jsx)(l,{size:16}),` `,(0,_.jsx)(`span`,{children:q.address})]}),q.cuisineType&&(0,_.jsxs)(`p`,{className:`banner-subtext`,style:{marginTop:`4px`},children:[(0,_.jsx)(h,{size:14}),` `,(0,_.jsxs)(`span`,{children:[`Cuisine: `,q.cuisineType]})]})]})]})]}),q&&(0,_.jsxs)(`div`,{className:`kpi-grid`,children:[(0,_.jsxs)(`div`,{className:`kpi-card revenue`,children:[(0,_.jsx)(`div`,{className:`kpi-icon-wrap`,children:(0,_.jsx)(e,{size:20})}),(0,_.jsxs)(`div`,{className:`kpi-info`,children:[(0,_.jsx)(`span`,{className:`kpi-label`,children:`Total Revenue`}),(0,_.jsxs)(`h3`,{className:`kpi-value`,children:[`₹`,Z.toFixed(2)]})]}),(0,_.jsx)(`div`,{className:`kpi-badge positive`,children:`Delivered`})]}),(0,_.jsxs)(`div`,{className:`kpi-card active-orders`,children:[(0,_.jsx)(`div`,{className:`kpi-icon-wrap`,children:(0,_.jsx)(o,{size:20})}),(0,_.jsxs)(`div`,{className:`kpi-info`,children:[(0,_.jsx)(`span`,{className:`kpi-label`,children:`Active Orders`}),(0,_.jsx)(`h3`,{className:`kpi-value`,children:ce})]}),(0,_.jsx)(`div`,{className:`kpi-badge pulsing`,children:`Live`})]}),(0,_.jsxs)(`div`,{className:`kpi-card total-orders`,children:[(0,_.jsx)(`div`,{className:`kpi-icon-wrap`,children:(0,_.jsx)(s,{size:20})}),(0,_.jsxs)(`div`,{className:`kpi-info`,children:[(0,_.jsx)(`span`,{className:`kpi-label`,children:`Total Orders`}),(0,_.jsx)(`h3`,{className:`kpi-value`,children:J.length})]}),(0,_.jsx)(`div`,{className:`kpi-badge text`,children:`Lifetime`})]}),(0,_.jsxs)(`div`,{className:`kpi-card avg-value`,children:[(0,_.jsx)(`div`,{className:`kpi-icon-wrap`,children:(0,_.jsx)(h,{size:20})}),(0,_.jsxs)(`div`,{className:`kpi-info`,children:[(0,_.jsx)(`span`,{className:`kpi-label`,children:`Avg Order Value`}),(0,_.jsxs)(`h3`,{className:`kpi-value`,children:[`₹`,le.toFixed(2)]})]}),(0,_.jsx)(`div`,{className:`kpi-badge text`,children:`Delivered`})]})]}),(0,_.jsxs)(`div`,{className:`tab-bar`,children:[(0,_.jsx)(`button`,{className:`tab-btn ${y===`orders`?`active`:``}`,onClick:()=>b(`orders`),children:`Orders Manager`}),(0,_.jsx)(`button`,{className:`tab-btn ${y===`menu`?`active`:``}`,onClick:()=>b(`menu`),children:`Menu Manager`})]}),y===`menu`&&(0,_.jsxs)(`div`,{className:`fade-in`,children:[(0,_.jsxs)(`div`,{className:`search-bar-container`,children:[(0,_.jsxs)(`div`,{className:`search-input-wrapper`,children:[(0,_.jsx)(te,{size:18,className:`search-icon-inside`}),(0,_.jsx)(`input`,{type:`text`,placeholder:`Search dishes by name or description...`,value:R,onChange:e=>oe(e.target.value)})]}),(0,_.jsxs)(`button`,{className:`btn-primary`,onClick:()=>j(!0),children:[(0,_.jsx)(re,{size:18}),` Add Menu Item`]})]}),Q.length===0?(0,_.jsx)(`div`,{style:{textAlign:`center`,padding:`48px`,border:`1px dashed var(--border-medium)`,borderRadius:`12px`},children:(0,_.jsx)(`p`,{style:{color:`var(--text-secondary)`},children:`No menu items found. Add some delicious dishes to get started!`})}):(0,_.jsx)(`div`,{className:`menu-grid`,children:Q.map((t,n)=>(0,_.jsxs)(`div`,{className:`menu-item-card animate-card`,style:{animationDelay:`${n*.04}s`},children:[(0,_.jsx)(`div`,{className:`menu-item-img-wrapper`,children:(0,_.jsx)(`img`,{src:t.imagePath||`https://images.unsplash.com/photo-1546069901-ba9599a7e63c?q=80&w=2080&auto=format&fit=crop`,onError:e=>{e.target.onerror=null,e.target.src=`https://images.unsplash.com/photo-1546069901-ba9599a7e63c?q=80&w=2080&auto=format&fit=crop`},alt:t.menuName,className:`menu-item-img`})}),(0,_.jsxs)(`div`,{className:`menu-item-body`,children:[(0,_.jsxs)(`div`,{children:[(0,_.jsxs)(`div`,{style:{display:`flex`,justifyContent:`space-between`,alignItems:`flex-start`,marginBottom:`8px`},children:[(0,_.jsx)(`h4`,{style:{fontSize:`1.1rem`,fontWeight:700},children:t.menuName}),(0,_.jsxs)(`span`,{style:{fontWeight:800,color:`var(--brand-red)`,display:`flex`,alignItems:`center`},children:[(0,_.jsx)(e,{size:14}),t.price]})]}),(0,_.jsx)(`p`,{style:{fontSize:`0.85rem`,color:`var(--text-secondary)`,marginBottom:`16px`,lineHeight:`1.4`},children:t.description})]}),(0,_.jsxs)(`div`,{style:{display:`flex`,justifyContent:`space-between`,alignItems:`center`,borderTop:`1px solid var(--border-light)`,paddingTop:`12px`},children:[(0,_.jsx)(`span`,{style:{fontSize:`0.8rem`,color:`var(--text-secondary)`},children:`Status:`}),(0,_.jsxs)(`div`,{style:{display:`flex`,alignItems:`center`,gap:`8px`},children:[(0,_.jsx)(`span`,{style:{fontSize:`0.85rem`,fontWeight:700,color:t.isAvailable?`var(--success)`:`var(--text-muted)`},children:t.isAvailable?`Available`:`Unavailable`}),(0,_.jsx)(`button`,{className:`toggle-container-btn`,style:{background:`none`,border:`none`,padding:0,cursor:`pointer`},onClick:()=>U(t.menuId,t.isAvailable),"aria-label":`Toggle availability`,children:(0,_.jsx)(`div`,{className:`admin-toggle-switch ${t.isAvailable?`available`:``}`,children:(0,_.jsx)(`div`,{className:`admin-toggle-knob`})})})]})]})]})]},t.menuId))})]}),y===`orders`&&(0,_.jsxs)(`div`,{className:`dashboard-content-layout fade-in`,children:[(0,_.jsxs)(`div`,{className:`main-content-area`,children:[(0,_.jsx)(`div`,{style:{display:`flex`,gap:`8px`,marginBottom:`24px`,overflowX:`auto`,paddingBottom:`8px`,scrollbarWidth:`none`,msOverflowStyle:`none`},className:`hide-scrollbar`,children:[`All`,`Placed`,`Accepted`,`Preparing`,`Out for Delivery`,`Delivered`].map(e=>(0,_.jsx)(`button`,{className:`pill-filter ${z===e?`active`:``}`,onClick:()=>B(e),children:e},e))}),$.length===0?(0,_.jsx)(`div`,{style:{textAlign:`center`,padding:`48px`,border:`1px dashed var(--border-medium)`,borderRadius:`12px`},children:(0,_.jsx)(`p`,{style:{color:`var(--text-secondary)`},children:`No orders in this category.`})}):(0,_.jsx)(`div`,{className:`order-list`,children:$.map(e=>(0,_.jsxs)(`div`,{className:`order-card status-${(e.status||``).toLowerCase().replace(/\s+/g,`-`)}`,children:[(0,_.jsxs)(`div`,{className:`order-info-section`,children:[(0,_.jsxs)(`div`,{style:{display:`flex`,alignItems:`center`,gap:`12px`,marginBottom:`12px`,flexWrap:`wrap`},children:[(0,_.jsxs)(`h3`,{style:{fontSize:`1.2rem`,fontWeight:800},children:[`ID: `,e.formattedId]}),(0,_.jsx)(`span`,{className:`badge ${(e.status||``).toLowerCase().replace(/\s+/g,`-`)}`,children:e.status}),(0,_.jsxs)(`span`,{style:{fontSize:`0.8rem`,color:`var(--text-muted)`},children:[`Ordered `,e.time]})]}),(0,_.jsxs)(`div`,{className:`customer-info-box`,children:[(0,_.jsxs)(`div`,{className:`customer-name`,children:[`Customer: `,e.userName]}),(0,_.jsxs)(`div`,{className:`customer-detail`,children:[(0,_.jsx)(c,{size:12}),(0,_.jsx)(`span`,{children:e.userPhone}),(0,_.jsxs)(`a`,{href:`tel:${e.userPhone}`,className:`call-customer-btn`,children:[(0,_.jsx)(c,{size:10}),` Call`]})]}),(0,_.jsxs)(`div`,{className:`customer-detail`,style:{alignItems:`flex-start`},children:[(0,_.jsx)(l,{size:12,style:{flexShrink:0,marginTop:`2px`}}),(0,_.jsxs)(`span`,{children:[`Address: `,e.userAddress]})]})]})]}),(0,_.jsxs)(`div`,{className:`order-actions-section`,children:[(0,_.jsxs)(`div`,{style:{textAlign:`right`},children:[(0,_.jsx)(`span`,{style:{fontSize:`0.8rem`,color:`var(--text-muted)`},children:`Amount Earned`}),(0,_.jsxs)(`div`,{style:{fontSize:`1.4rem`,fontWeight:800,color:`var(--text-primary)`},children:[`₹`,(e.total||0).toFixed(2)]})]}),e.riderName?(0,_.jsxs)(`div`,{style:{fontSize:`0.78rem`,color:`var(--text-secondary)`,textAlign:`right`,marginTop:`8px`},children:[`Rider: `,(0,_.jsx)(`strong`,{children:e.riderName})]}):(0,_.jsx)(`div`,{style:{fontSize:`0.78rem`,color:`#ff9f40`,textAlign:`right`,marginTop:`8px`,fontWeight:600},children:`Awaiting Rider Match...`})]}),K(e)]},e.orderId))})]}),q&&(0,_.jsxs)(`div`,{className:`dashboard-sidebar`,children:[(0,_.jsxs)(`div`,{className:`sidebar-card`,children:[(0,_.jsx)(`h3`,{className:`sidebar-card-title`,children:`Kitchen Profile`}),(0,_.jsxs)(`div`,{style:{display:`flex`,flexDirection:`column`,gap:`16px`},children:[(0,_.jsxs)(`div`,{className:`profile-item`,children:[(0,_.jsx)(`span`,{className:`profile-label`,children:`Average Delivery Time`}),(0,_.jsx)(`span`,{className:`profile-value`,children:q.deliveryTime||`30 mins`})]}),(0,_.jsxs)(`div`,{className:`profile-item`,children:[(0,_.jsx)(`span`,{className:`profile-label`,children:`Food License (FSSAI)`}),(0,_.jsx)(`span`,{className:`profile-value code-font`,children:q.licenseNo||`14-digit Number`})]}),(0,_.jsxs)(`div`,{className:`profile-item`,children:[(0,_.jsx)(`span`,{className:`profile-label`,children:`GSTIN ID`}),(0,_.jsx)(`span`,{className:`profile-value code-font`,children:q.gstNo||`15-digit ID`})]}),(0,_.jsxs)(`div`,{className:`profile-item`,children:[(0,_.jsx)(`span`,{className:`profile-label`,children:`Owner Aadhaar`}),(0,_.jsx)(`span`,{className:`profile-value code-font`,children:q.aadhaarNo?`XXXX-XXXX-${q.aadhaarNo.slice(-4)}`:`XXXX-XXXX-XXXX`})]})]})]}),(0,_.jsxs)(`div`,{className:`sidebar-card`,children:[(0,_.jsx)(`h3`,{className:`sidebar-card-title`,children:`Order Status Summary`}),(0,_.jsx)(`div`,{className:`progress-bar-stacked`,children:J.length>0?(()=>{let e=J.filter(e=>[`placed`,`accepted`].includes((e.status||``).toLowerCase())).length,t=J.filter(e=>(e.status||``).toLowerCase()===`preparing`).length,n=J.filter(e=>(e.status||``).toLowerCase()===`waiting to dispatch`).length,r=J.filter(e=>(e.status||``).toLowerCase()===`out for delivery`).length,i=J.filter(e=>(e.status||``).toLowerCase()===`delivered`).length,a=e=>(e/J.length*100).toFixed(1);return(0,_.jsxs)(_.Fragment,{children:[(0,_.jsxs)(`div`,{className:`stacked-bar-container`,children:[(0,_.jsx)(`div`,{className:`stacked-segment placed`,style:{width:`${a(e)}%`},title:`Placed/Accepted: ${e}`}),(0,_.jsx)(`div`,{className:`stacked-segment cooking`,style:{width:`${a(t)}%`},title:`Preparing: ${t}`}),(0,_.jsx)(`div`,{className:`stacked-segment ready`,style:{width:`${a(n)}%`},title:`Ready: ${n}`}),(0,_.jsx)(`div`,{className:`stacked-segment shipping`,style:{width:`${a(r)}%`},title:`Out for Delivery: ${r}`}),(0,_.jsx)(`div`,{className:`stacked-segment delivered`,style:{width:`${a(i)}%`},title:`Delivered: ${i}`})]}),(0,_.jsxs)(`div`,{className:`stacked-legend`,children:[(0,_.jsxs)(`div`,{className:`legend-item`,children:[(0,_.jsx)(`span`,{className:`dot placed`}),` Placed (`,e,`)`]}),(0,_.jsxs)(`div`,{className:`legend-item`,children:[(0,_.jsx)(`span`,{className:`dot cooking`}),` Cooking (`,t,`)`]}),(0,_.jsxs)(`div`,{className:`legend-item`,children:[(0,_.jsx)(`span`,{className:`dot ready`}),` Ready (`,n,`)`]}),(0,_.jsxs)(`div`,{className:`legend-item`,children:[(0,_.jsx)(`span`,{className:`dot shipping`}),` Out (`,r,`)`]}),(0,_.jsxs)(`div`,{className:`legend-item`,children:[(0,_.jsx)(`span`,{className:`dot delivered`}),` Delivered (`,i,`)`]})]})]})})():(0,_.jsx)(`p`,{style:{fontSize:`0.85rem`,color:`var(--text-secondary)`},children:`No order data available yet.`})})]})]})]})]}),A&&(0,_.jsx)(`div`,{className:`modal-overlay`,onClick:()=>j(!1),children:(0,_.jsxs)(`div`,{className:`modal-content`,onClick:e=>e.stopPropagation(),children:[(0,_.jsx)(`h2`,{style:{fontSize:`1.4rem`,fontWeight:800,marginBottom:`20px`},children:`Add New Menu Item`}),(0,_.jsxs)(`form`,{onSubmit:W,children:[(0,_.jsxs)(`div`,{className:`form-group`,children:[(0,_.jsx)(`label`,{children:`Dish Name *`}),(0,_.jsx)(`input`,{type:`text`,required:!0,placeholder:`e.g. Garlic Butter Naan`,value:M.name,onChange:e=>N(t=>({...t,name:e.target.value}))})]}),(0,_.jsxs)(`div`,{className:`form-group`,children:[(0,_.jsx)(`label`,{children:`Price (INR) *`}),(0,_.jsx)(`input`,{type:`number`,required:!0,step:`0.01`,placeholder:`e.g. 120.00`,value:M.price,onChange:e=>N(t=>({...t,price:e.target.value}))})]}),(0,_.jsxs)(`div`,{className:`form-group`,children:[(0,_.jsx)(`label`,{children:`Description *`}),(0,_.jsx)(`textarea`,{required:!0,rows:`3`,placeholder:`Describe the dish ingredients, taste, portion...`,value:M.description,onChange:e=>N(t=>({...t,description:e.target.value}))})]}),(0,_.jsxs)(`div`,{className:`form-group`,children:[(0,_.jsx)(`label`,{children:`Image URL (Optional)`}),(0,_.jsx)(`input`,{type:`url`,placeholder:`https://images.unsplash.com/...`,value:M.imagePath,onChange:e=>N(t=>({...t,imagePath:e.target.value}))})]}),(0,_.jsxs)(`div`,{style:{display:`flex`,justifyContent:`flex-end`,gap:`12px`,marginTop:`24px`},children:[(0,_.jsx)(`button`,{type:`button`,className:`pill-filter`,onClick:()=>j(!1),style:{borderRadius:`var(--radius-sm)`},children:`Cancel`}),(0,_.jsx)(`button`,{type:`submit`,disabled:P,className:`btn-primary`,style:{width:`auto`},children:P?(0,_.jsx)(d,{size:16,style:{animation:`spin 1s linear infinite`}}):`Add Item`})]})]})]})})]})};export{v as default};