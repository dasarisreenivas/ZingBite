import{t as e}from"./chevron-right-HgQaJnam.js";import{n as t,t as n}from"./ChatWidget-BWyb8r-y.js";import{A as r,C as i,D as a,N as o,O as s,P as c,_ as ee,g as l,h as u,j as d,k as f,l as te,p,t as ne,v as re,w as ie}from"./index-CV7g5-d6.js";var m=a(`key-round`,[[`path`,{d:`M2.586 17.414A2 2 0 0 0 2 18.828V21a1 1 0 0 0 1 1h3a1 1 0 0 0 1-1v-1a1 1 0 0 1 1-1h1a1 1 0 0 0 1-1v-1a1 1 0 0 1 1-1h.172a2 2 0 0 0 1.414-.586l.814-.814a6.5 6.5 0 1 0-4-4z`,key:`1s6t7t`}],[`circle`,{cx:`16.5`,cy:`7.5`,r:`.5`,fill:`currentColor`,key:`w0ekpg`}]]),h=c(o(),1),g=f(),_=5,v={jobs:null,timestamp:0},y=()=>{let{user:a}=(0,h.useContext)(s),o=d(),{showAlert:c}=ne(),[f,y]=(0,h.useState)(`jobs`),[b,x]=(0,h.useState)([]),[S,ae]=(0,h.useState)([]),[C,oe]=(0,h.useState)([]),[w,T]=(0,h.useState)(!0),[E,D]=(0,h.useState)(!1),[O,k]=(0,h.useState)(!1),[A,j]=(0,h.useState)(null),[M,N]=(0,h.useState)(_),[P,F]=(0,h.useState)(_),[I,L]=(0,h.useState)(_),[R,z]=(0,h.useState)(null),[B,V]=(0,h.useState)({name:``,email:``,phone:``,resumeUrl:``}),[H,U]=(0,h.useState)(!1),[W,G]=(0,h.useState)(!1),[K,q]=(0,h.useState)(``),[J,se]=(0,h.useState)(`1234`),[Y,X]=(0,h.useState)(``),ce=async(e=!1)=>{let t=v.jobs!==null,n=t&&Date.now()-v.timestamp>3e4;if(t){if(x(v.jobs),e||T(!1),!n)return}else e||T(!0);try{let e=await r.get(`/api/careers?action=jobs`);x(e.data),v={jobs:e.data,timestamp:Date.now()}}catch(e){console.error(`Failed to load jobs:`,e)}finally{e||T(!1)}},Z=async(e=!1)=>{if(a){e||D(!0);try{ae((await r.get(`/api/careers?action=applications`)).data)}catch(e){console.error(`Failed to load applications:`,e)}finally{e||D(!1)}}},Q=async(e=!1)=>{if(a){e||k(!0);try{oe((await r.get(`/api/careers?action=notifications`)).data)}catch(e){console.error(`Failed to load notifications:`,e)}finally{e||k(!1)}}};(0,h.useEffect)(()=>{ce(!1),a&&(Z(!1),Q(!1))},[a]),(0,h.useEffect)(()=>{a&&V({name:a.userName||a.username||``,email:a.email||``,phone:String(a.phoneNumber||a.mobile||``),resumeUrl:``})},[a]),(0,h.useEffect)(()=>{N(_),F(_),L(_)},[f]);let le=b.slice(0,M),$=S.slice(0,P),ue=C.slice(0,I),de=M<b.length,fe=P<S.length,pe=I<C.length;return w?(0,g.jsx)(`div`,{style:{display:`flex`,justifyContent:`center`,alignItems:`center`,height:`400px`},children:(0,g.jsx)(l,{size:36,style:{animation:`spin 1s linear infinite`,color:`var(--brand-red)`}})}):(0,g.jsxs)(g.Fragment,{children:[(0,g.jsx)(`style`,{children:`
        /* ===== 3D PREMIUM ANIMATIONS FOR CAREER PORTAL ===== */

        .careers-container {
          max-width: 1200px;
          margin: 32px auto;
          padding: 0 20px;
        }

        /* ---- Hero Banner with 3D Floating Particles ---- */
        .hero-banner {
          background: linear-gradient(135deg, var(--brand-red) 0%, #ff6b7d 100%);
          color: white;
          border-radius: var(--radius-lg);
          padding: 48px 32px;
          text-align: center;
          margin-bottom: 32px;
          box-shadow: var(--shadow-md);
          position: relative;
          overflow: hidden;
          transform-style: preserve-3d;
          perspective: 800px;
        }
        .hero-banner::after {
          content: '';
          position: absolute;
          top: -50%;
          left: -50%;
          width: 200%;
          height: 200%;
          background: radial-gradient(circle, rgba(255,255,255,0.06) 0%, transparent 60%);
          animation: heroShimmer 8s ease-in-out infinite;
        }
        @keyframes heroShimmer {
          0%, 100% { transform: translate(-10%, -10%); }
          50% { transform: translate(10%, 10%); }
        }
        .hero-banner::before {
          content: '';
          position: absolute;
          width: 300px;
          height: 300px;
          border-radius: 50%;
          background: radial-gradient(circle, rgba(255,255,255,0.08) 0%, transparent 70%);
          top: -60px;
          right: -60px;
          animation: heroParticle1 6s ease-in-out infinite;
          pointer-events: none;
        }
        @keyframes heroParticle1 {
          0%, 100% { transform: translateZ(0) translate(0, 0) scale(1); }
          33% { transform: translateZ(20px) translate(-30px, 40px) scale(1.1); }
          66% { transform: translateZ(10px) translate(20px, -20px) scale(0.95); }
        }
        .hero-banner .hero-particle-2 {
          position: absolute;
          width: 200px;
          height: 200px;
          border-radius: 50%;
          background: radial-gradient(circle, rgba(255,255,255,0.05) 0%, transparent 70%);
          bottom: -40px;
          left: -40px;
          animation: heroParticle2 8s ease-in-out infinite;
          pointer-events: none;
        }
        @keyframes heroParticle2 {
          0%, 100% { transform: translateZ(0) translate(0, 0) scale(1); }
          50% { transform: translateZ(30px) translate(40px, -30px) scale(1.2); }
        }
        .hero-banner h1 {
          position: relative;
          z-index: 1;
        }

        /* ---- Tab Bar with 3D Animated Active Indicator ---- */
        .tab-bar {
          display: flex;
          border-bottom: 2px solid var(--border-light);
          margin-bottom: 24px;
          gap: 24px;
          overflow-x: auto;
          scrollbar-width: none;
          -ms-overflow-style: none;
          perspective: 600px;
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
          transition: all 0.3s cubic-bezier(0.25, 0.46, 0.45, 0.94);
          white-space: nowrap;
          transform-style: preserve-3d;
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
          height: 2px;
          background: var(--brand-red);
          animation: tabIndicator3d 0.4s cubic-bezier(0.25, 0.46, 0.45, 0.94) both;
          transform-origin: left;
        }
        @keyframes tabIndicator3d {
          0% { transform: scaleX(0) translateZ(-4px); opacity: 0; }
          100% { transform: scaleX(1) translateZ(0); opacity: 1; }
        }

        /* ---- Job Grid with 3D Staggered Reveal ---- */
        .job-grid {
          display: grid;
          grid-template-columns: 1fr;
          gap: 20px;
        }
        .job-grid .job-card {
          animation: jobCardIn 0.5s cubic-bezier(0.25, 0.46, 0.45, 0.94) both;
          transform-style: preserve-3d;
        }
        .job-grid .job-card:nth-child(1) { animation-delay: 0.05s; }
        .job-grid .job-card:nth-child(2) { animation-delay: 0.1s; }
        .job-grid .job-card:nth-child(3) { animation-delay: 0.15s; }
        .job-grid .job-card:nth-child(4) { animation-delay: 0.2s; }
        .job-grid .job-card:nth-child(5) { animation-delay: 0.25s; }

        @keyframes jobCardIn {
          0% { opacity: 0; transform: rotateX(4deg) translateY(20px) translateZ(-16px); }
          100% { opacity: 1; transform: rotateX(0) translateY(0) translateZ(0); }
        }

        .job-card {
          background: #fff;
          border: 1px solid var(--border-medium);
          border-radius: var(--radius-md);
          padding: 24px;
          box-shadow: var(--shadow-sm);
          display: flex;
          justify-content: space-between;
          align-items: center;
          flex-wrap: wrap;
          gap: 20px;
          transition: all 0.4s cubic-bezier(0.25, 0.46, 0.45, 0.94);
          transform-style: preserve-3d;
          backface-visibility: hidden;
          position: relative;
          overflow: hidden;
        }
        .job-card::before {
          content: '';
          position: absolute;
          top: 0;
          left: 0;
          right: 0;
          height: 4px;
          background: linear-gradient(90deg, var(--brand-red), #ff6b8b);
          opacity: 0;
          transition: opacity 0.3s ease;
          z-index: 1;
        }
        .job-card:hover::before {
          opacity: 1;
        }
        .job-card:hover {
          transform: rotateX(-3deg) rotateY(2deg) translateZ(16px) translateY(-4px);
          box-shadow: 0 24px 48px rgba(28,28,28,0.12);
          border-color: rgba(247,55,79,0.2);
        }
        .job-info {
          flex: 2;
          min-width: 280px;
        }
        .job-actions {
          flex: 1;
          min-width: 150px;
          display: flex;
          justify-content: flex-end;
        }
        
        /* ---- 3D Gradient Buttons with Depth ---- */
        .btn-primary {
          background: var(--brand-red);
          color: white;
          padding: 12px 24px;
          border: none;
          border-radius: var(--radius-sm);
          font-weight: 700;
          cursor: pointer;
          display: flex;
          align-items: center;
          gap: 8px;
          transition: all 0.3s cubic-bezier(0.25, 0.46, 0.45, 0.94);
          position: relative;
          overflow: hidden;
          transform-style: preserve-3d;
          background: linear-gradient(135deg, var(--brand-red), #ff6b8b, var(--brand-red));
          background-size: 200% 100%;
        }
        .btn-primary::before {
          content: '';
          position: absolute;
          inset: 0;
          background: linear-gradient(135deg, rgba(255,255,255,0.15), transparent);
          pointer-events: none;
        }
        .btn-primary:hover {
          transform: translateZ(12px) translateY(-2px) scale(1.03);
          box-shadow: 0 12px 32px rgba(247,55,79,0.35);
          background-position: 100% 0;
        }
        .btn-primary:active {
          transform: translateZ(0) translateY(0);
        }

        /* ---- Badges with 3D Floating ---- */
        .badge {
          padding: 4px 8px;
          border-radius: 4px;
          font-size: 0.72rem;
          font-weight: 700;
          text-transform: uppercase;
          transition: transform 0.3s ease;
          transform-style: preserve-3d;
        }
        .badge:hover {
          transform: translateZ(8px) scale(1.05);
        }
        .badge.dept { background: rgba(247,55,79,0.08); color: var(--brand-red); }
        .badge.applied { background: rgba(54,162,235,0.08); color: #36a2eb; }
        .badge.interview { background: rgba(255,159,64,0.08); color: #ff9f40; }
        .badge.offered { background: rgba(75,192,192,0.08); color: #4bc0c0; }
        .badge.rejected { background: rgba(226,55,68,0.08); color: var(--danger); }
        
        /* ---- Modal with 3D Entrance ---- */
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
          animation: overlayIn 0.3s ease;
        }
        @keyframes overlayIn {
          from { opacity: 0; }
          to { opacity: 1; }
        }
        .modal-content {
          background: white;
          padding: 32px;
          border-radius: var(--radius-lg);
          max-width: 500px;
          width: 100%;
          box-shadow: var(--shadow-lg);
          animation: modal3dIn 0.5s cubic-bezier(0.25, 0.46, 0.45, 0.94) both;
          transform-style: preserve-3d;
        }
        @keyframes modal3dIn {
          0% { opacity: 0; transform: rotateX(10deg) scale(0.9) translateY(30px) translateZ(-40px); }
          100% { opacity: 1; transform: rotateX(0) scale(1) translateY(0) translateZ(0); }
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
        .form-group input {
          width: 100%;
          padding: 10px 12px;
          border: 1px solid var(--border-medium);
          border-radius: var(--radius-sm);
          font-size: 0.95rem;
          outline: none;
          transition: all 0.3s cubic-bezier(0.25, 0.46, 0.45, 0.94);
          transform-style: preserve-3d;
        }
        .form-group input:focus {
          border-color: var(--brand-red);
          transform: translateZ(6px) scale(1.01);
          box-shadow: 0 8px 24px rgba(247,55,79,0.1);
        }

        /* ---- Inbox / Email Cards with 3D Slide-In ---- */
        .inbox-list {
          display: flex;
          flex-direction: column;
          gap: 16px;
        }
        .email-card {
          background: white;
          border: 1px solid var(--border-medium);
          border-radius: var(--radius-md);
          padding: 20px;
          box-shadow: var(--shadow-sm);
          transition: all 0.4s cubic-bezier(0.25, 0.46, 0.45, 0.94);
          position: relative;
          overflow: hidden;
          transform-style: preserve-3d;
          animation: emailSlideIn 0.4s cubic-bezier(0.25, 0.46, 0.45, 0.94) both;
        }
        .email-card:nth-child(1) { animation-delay: 0.05s; }
        .email-card:nth-child(2) { animation-delay: 0.1s; }
        .email-card:nth-child(3) { animation-delay: 0.15s; }
        .email-card:nth-child(4) { animation-delay: 0.2s; }
        .email-card:nth-child(5) { animation-delay: 0.25s; }
        @keyframes emailSlideIn {
          0% { opacity: 0; transform: translateX(-20px) translateZ(-12px) rotateY(2deg); }
          100% { opacity: 1; transform: translateX(0) translateZ(0) rotateY(0); }
        }
        .email-card:hover {
          transform: translateX(6px) translateZ(8px);
          border-color: rgba(247,55,79,0.15);
          box-shadow: var(--shadow-md);
        }

        /* ---- OTP Input with 3D Floating ---- */
        .otp-input {
          text-align: center !important;
          font-size: 1.4rem !important;
          letter-spacing: 8px !important;
          font-weight: 800 !important;
          width: 180px !important;
          padding: 8px !important;
          transition: all 0.3s cubic-bezier(0.25, 0.46, 0.45, 0.94) !important;
          transform-style: preserve-3d !important;
        }
        .otp-input:focus {
          transform: translateZ(12px) scale(1.02) !important;
          box-shadow: 0 12px 32px rgba(247,55,79,0.15) !important;
        }

        /* ---- Load More Button with 3D Hover ---- */
        .load-more-wrap {
          margin: 4px auto 0;
        }
        .load-more-btn {
          background: transparent;
          color: var(--brand-red);
          border: 2px solid var(--brand-red);
          padding: 10px 24px;
          border-radius: var(--radius-sm);
          font-weight: 700;
          cursor: pointer;
          font-size: 0.9rem;
          display: inline-flex;
          align-items: center;
          gap: 8px;
          transition: all 0.3s cubic-bezier(0.25, 0.46, 0.45, 0.94);
          transform-style: preserve-3d;
          width: auto;
        }
        .load-more-btn:hover {
          background: var(--brand-red);
          color: white;
          transform: translateZ(8px) translateY(-2px);
          box-shadow: 0 8px 24px rgba(247,55,79,0.3);
        }
        .load-more-btn:hover .load-more-icon {
          transform: translateX(4px);
        }
        .load-more-icon {
          transition: transform 0.3s ease;
        }

        /* ---- Chat Widget Trigger with 3D Pulse ---- */
        .chat-widget-trigger {
          animation: chatPulse3d 2s ease-in-out infinite;
          transform-style: preserve-3d;
        }
        @keyframes chatPulse3d {
          0%, 100% { box-shadow: 0 0 0 0 rgba(247,55,79,0.4); transform: scale(1) translateZ(0); }
          50% { box-shadow: 0 0 0 12px rgba(247,55,79,0); transform: scale(1.05) translateZ(8px); }
        }

        /* ---- Status badges with floating animation ---- */
        .badge.applied, .badge.interview, .badge.offered, .badge.rejected {
          animation: badgeFloat 3s ease-in-out infinite;
        }
        @keyframes badgeFloat {
          0%, 100% { transform: translateY(0) translateZ(0); }
          50% { transform: translateY(-2px) translateZ(4px); }
        }

        /* ---- Application Cards with 3D Depth ---- */
        .job-card.application-card {
          perspective: 600px;
        }
        .job-card.application-card:hover {
          transform: rotateX(-2deg) translateZ(12px) translateY(-4px);
        }

        @media (max-width: 600px) {
          .hero-banner {
            padding: 32px 16px;
          }
          .hero-banner h1 {
            font-size: 1.8rem !important;
          }
          .hero-banner p {
            font-size: 0.95rem !important;
          }
          .job-card {
            flex-direction: column;
            align-items: stretch;
            gap: 16px;
            padding: 16px;
          }
          .job-actions {
            justify-content: stretch;
            min-width: 100%;
          }
          .job-actions button {
            width: 100%;
            justify-content: center;
          }
          .modal-content {
            padding: 20px;
            margin: 12px;
          }
        }
        @keyframes spin {
          from { transform: rotate(0deg); }
          to { transform: rotate(360deg); }
        }
      `}),(0,g.jsxs)(`div`,{className:`careers-container fade-in page-enter`,children:[(0,g.jsxs)(`div`,{className:`hero-banner`,children:[(0,g.jsx)(`div`,{className:`hero-particle-2`}),(0,g.jsx)(`h1`,{style:{fontSize:`2.4rem`,fontWeight:800},children:`Grow Your Career with ZingBite`}),(0,g.jsx)(`p`,{style:{fontSize:`1.1rem`,marginTop:`8px`,opacity:.9},children:`Join our mission to deliver delight. Explore dynamic roles in technology, operations, and culinary arts.`})]}),(0,g.jsxs)(`div`,{className:`tab-bar`,children:[(0,g.jsxs)(`button`,{className:`tab-btn ${f===`jobs`?`active`:``}`,onClick:()=>y(`jobs`),children:[`Open Positions (`,b.length,`)`]}),(0,g.jsxs)(`button`,{className:`tab-btn ${f===`applications`?`active`:``}`,onClick:()=>{y(`applications`),Z()},children:[`My Applications `,a&&S.length>0&&`(${S.length})`]}),(0,g.jsxs)(`button`,{className:`tab-btn ${f===`inbox`?`active`:``}`,onClick:()=>{y(`inbox`),Q()},children:[`Inbox Notifications `,a&&C.length>0&&`(${C.length})`]})]}),f===`jobs`&&(0,g.jsxs)(`div`,{className:`job-grid stagger-children`,children:[le.map(e=>(0,g.jsxs)(`div`,{className:`job-card`,children:[(0,g.jsxs)(`div`,{className:`job-info`,children:[(0,g.jsxs)(`div`,{style:{display:`flex`,alignItems:`center`,gap:`8px`,marginBottom:`8px`},children:[(0,g.jsx)(`span`,{className:`badge dept`,children:e.department}),(0,g.jsxs)(`span`,{style:{fontSize:`0.8rem`,color:`var(--text-muted)`,display:`flex`,alignItems:`center`,gap:`4px`},children:[(0,g.jsx)(ie,{size:12}),` Posted `,e.posted_date]})]}),(0,g.jsx)(`h3`,{style:{fontSize:`1.3rem`,fontWeight:800,marginBottom:`8px`},children:e.title}),(0,g.jsxs)(`p`,{style:{display:`flex`,alignItems:`center`,gap:`4px`,fontSize:`0.9rem`,color:`var(--text-secondary)`,marginBottom:`12px`},children:[(0,g.jsx)(p,{size:14}),` `,e.location]}),(0,g.jsx)(`p`,{style:{fontSize:`0.9rem`,color:`var(--text-secondary)`,lineHeight:`1.5`},children:e.description})]}),(0,g.jsx)(`div`,{className:`job-actions`,children:(0,g.jsxs)(`button`,{className:`btn-primary`,onClick:()=>{a?z(e):o(`/login?redirect=/careers`)},children:[`Apply Now `,(0,g.jsx)(te,{size:14})]})})]},e.id)),de&&(0,g.jsx)(`div`,{className:`load-more-wrap`,style:{margin:`4px auto 0`},children:(0,g.jsxs)(`button`,{type:`button`,className:`load-more-btn`,onClick:()=>N(e=>e+_),children:[`Load more positions (`,b.length-M,` left) `,(0,g.jsx)(e,{className:`load-more-icon`,size:16})]})})]}),f===`applications`&&(0,g.jsx)(`div`,{children:a?E?(0,g.jsx)(`div`,{style:{display:`flex`,justifyContent:`center`,padding:`48px`},children:(0,g.jsx)(l,{size:24,style:{animation:`spin 1s linear infinite`,color:`var(--brand-red)`}})}):S.length===0?(0,g.jsx)(`div`,{style:{textAlign:`center`,padding:`48px`,border:`1px dashed var(--border-medium)`,borderRadius:`12px`},children:(0,g.jsx)(`p`,{style:{color:`var(--text-secondary)`},children:`You haven't applied to any roles yet. View open positions to apply!`})}):(0,g.jsxs)(`div`,{className:`job-grid`,children:[$.map(e=>(0,g.jsxs)(`div`,{className:`job-card application-card`,children:[(0,g.jsxs)(`div`,{className:`job-info`,children:[(0,g.jsxs)(`div`,{style:{display:`flex`,alignItems:`center`,gap:`8px`,marginBottom:`8px`},children:[(0,g.jsx)(`span`,{className:`badge dept`,children:e.department}),(0,g.jsxs)(`span`,{style:{fontSize:`0.8rem`,color:`var(--text-muted)`},children:[`Applied on `,e.appliedDate]})]}),(0,g.jsx)(`h3`,{style:{fontSize:`1.2rem`,fontWeight:800,marginBottom:`6px`},children:e.jobTitle}),(0,g.jsxs)(`p`,{style:{display:`flex`,alignItems:`center`,gap:`4px`,fontSize:`0.85rem`,color:`var(--text-secondary)`},children:[(0,g.jsx)(p,{size:12}),` `,e.location||`HQ`]}),(0,g.jsxs)(`a`,{href:e.resumeUrl,target:`_blank`,rel:`noreferrer`,style:{display:`inline-flex`,alignItems:`center`,gap:`4px`,fontSize:`0.8rem`,marginTop:`12px`,fontWeight:600},children:[(0,g.jsx)(re,{size:12}),` View Submitted Resume`]})]}),(0,g.jsx)(`div`,{children:(0,g.jsxs)(`div`,{style:{display:`flex`,flexDirection:`column`,alignItems:`flex-end`,gap:`6px`},children:[(0,g.jsx)(`span`,{style:{fontSize:`0.78rem`,color:`var(--text-muted)`,fontWeight:600},children:`Application Status`}),(0,g.jsx)(`span`,{className:`badge ${e.status.toLowerCase().includes(`applied`)?`applied`:e.status.toLowerCase().includes(`interview`)?`interview`:e.status.toLowerCase().includes(`offer`)?`offered`:`rejected`}`,style:{padding:`6px 12px`,fontSize:`0.8rem`},children:e.status}),(0,g.jsxs)(`button`,{onClick:()=>j(e.id),style:{background:`transparent`,color:`var(--brand-red)`,border:`1px solid var(--brand-red)`,padding:`6px 12px`,borderRadius:`4px`,fontSize:`0.75rem`,fontWeight:700,cursor:`pointer`,display:`flex`,alignItems:`center`,gap:`4px`,marginTop:`8px`},children:[(0,g.jsx)(t,{size:12}),` Chat with Recruiter`]})]})})]},e.id)),fe&&(0,g.jsx)(`div`,{className:`load-more-wrap`,style:{margin:`4px auto 0`},children:(0,g.jsxs)(`button`,{type:`button`,className:`load-more-btn`,onClick:()=>F(e=>e+_),children:[`Load more applications (`,S.length-P,` left) `,(0,g.jsx)(e,{className:`load-more-icon`,size:16})]})})]}):(0,g.jsxs)(`div`,{style:{textAlign:`center`,padding:`48px`,border:`1px dashed var(--border-medium)`,borderRadius:`12px`},children:[(0,g.jsx)(i,{size:36,style:{color:`var(--brand-red)`,margin:`0 auto 12px`}}),(0,g.jsx)(`h3`,{children:`Sign in to track your applications`}),(0,g.jsx)(`p`,{style:{color:`var(--text-secondary)`,marginTop:`8px`,marginBottom:`16px`},children:`Log in with your ZingBite account to view and check statuses.`}),(0,g.jsx)(`button`,{className:`btn-primary`,style:{margin:`0 auto`},onClick:()=>o(`/login?redirect=/careers`),children:`Login to Account`})]})}),f===`inbox`&&(0,g.jsx)(`div`,{children:a?O?(0,g.jsx)(`div`,{style:{display:`flex`,justifyContent:`center`,padding:`48px`},children:(0,g.jsx)(l,{size:24,style:{animation:`spin 1s linear infinite`,color:`var(--brand-red)`}})}):C.length===0?(0,g.jsx)(`div`,{style:{textAlign:`center`,padding:`48px`,border:`1px dashed var(--border-medium)`,borderRadius:`12px`,background:`#fff`},children:(0,g.jsx)(`p`,{style:{color:`var(--text-secondary)`},children:`Your inbox is empty. We will email you here when your application status changes!`})}):(0,g.jsxs)(`div`,{className:`inbox-list`,children:[ue.map(e=>(0,g.jsxs)(`div`,{className:`email-card`,children:[(0,g.jsxs)(`div`,{style:{display:`flex`,justifyContent:`space-between`,borderBottom:`1px solid var(--border-light)`,paddingBottom:`12px`,marginBottom:`12px`},children:[(0,g.jsxs)(`div`,{children:[(0,g.jsx)(`span`,{style:{fontSize:`0.8rem`,color:`var(--text-muted)`,fontWeight:600},children:`FROM: ZingBite Operations <careers@zingbite.com>`}),(0,g.jsx)(`h4`,{style:{fontSize:`1rem`,fontWeight:800,marginTop:`4px`,color:`var(--text-primary)`},children:e.subject})]}),(0,g.jsx)(`span`,{style:{fontSize:`0.78rem`,color:`var(--text-muted)`},children:e.sentDate})]}),(0,g.jsx)(`p`,{style:{fontSize:`0.9rem`,color:`var(--text-secondary)`,whiteSpace:`pre-line`,lineHeight:`1.6`},children:e.body})]},e.id)),pe&&(0,g.jsx)(`div`,{className:`load-more-wrap`,style:{margin:`4px auto 0`},children:(0,g.jsxs)(`button`,{type:`button`,className:`load-more-btn`,onClick:()=>L(e=>e+_),children:[`Load more inbox notes (`,C.length-I,` left) `,(0,g.jsx)(e,{className:`load-more-icon`,size:16})]})})]}):(0,g.jsxs)(`div`,{style:{textAlign:`center`,padding:`48px`,border:`1px dashed var(--border-medium)`,borderRadius:`12px`},children:[(0,g.jsx)(ee,{size:36,style:{color:`var(--text-secondary)`,margin:`0 auto 12px`}}),(0,g.jsx)(`h3`,{children:`Sign in to view your inbox`}),(0,g.jsx)(`p`,{style:{color:`var(--text-secondary)`,marginTop:`8px`},children:`Log in to view email notifications generated for your account.`})]})})]}),R&&!W&&(0,g.jsx)(`div`,{className:`modal-overlay`,onClick:()=>z(null),children:(0,g.jsxs)(`div`,{className:`modal-content`,onClick:e=>e.stopPropagation(),children:[(0,g.jsx)(`h2`,{style:{fontSize:`1.4rem`,fontWeight:800,marginBottom:`8px`},children:`Apply for Position`}),(0,g.jsxs)(`p`,{style:{color:`var(--brand-red)`,fontWeight:700,fontSize:`0.95rem`,marginBottom:`20px`},children:[R.title,` — `,R.department]}),(0,g.jsxs)(`form`,{onSubmit:e=>{if(e.preventDefault(),!a){o(`/login?redirect=/careers`);return}if(!B.name||!B.email||!B.phone){c(`Please fill out all required fields.`,`warning`);return}se(String(Math.floor(1e3+Math.random()*9e3))),q(``),X(``),G(!0)},children:[(0,g.jsxs)(`div`,{className:`form-group`,children:[(0,g.jsx)(`label`,{children:`Full Name *`}),(0,g.jsx)(`input`,{type:`text`,required:!0,placeholder:`Enter full name`,value:B.name,onChange:e=>V(t=>({...t,name:e.target.value}))})]}),(0,g.jsxs)(`div`,{className:`form-group`,children:[(0,g.jsx)(`label`,{children:`Email Address *`}),(0,g.jsx)(`input`,{type:`email`,required:!0,placeholder:`name@domain.com`,value:B.email,onChange:e=>V(t=>({...t,email:e.target.value}))})]}),(0,g.jsxs)(`div`,{className:`form-group`,children:[(0,g.jsx)(`label`,{children:`Phone Number *`}),(0,g.jsx)(`input`,{type:`tel`,required:!0,placeholder:`e.g. 9876543210`,value:B.phone,onChange:e=>V(t=>({...t,phone:e.target.value}))})]}),(0,g.jsxs)(`div`,{className:`form-group`,children:[(0,g.jsx)(`label`,{children:`Resume PDF Link (Optional)`}),(0,g.jsx)(`input`,{type:`url`,placeholder:`https://example.com/my-resume.pdf`,value:B.resumeUrl,onChange:e=>V(t=>({...t,resumeUrl:e.target.value}))})]}),(0,g.jsxs)(`div`,{style:{display:`flex`,justifyContent:`flex-end`,gap:`12px`,marginTop:`24px`},children:[(0,g.jsx)(`button`,{type:`button`,className:`btn-primary`,onClick:()=>z(null),style:{background:`#f0f0f0`,color:`var(--text-primary)`,border:`1px solid var(--border-medium)`},children:`Cancel`}),(0,g.jsxs)(`button`,{type:`submit`,className:`btn-primary`,children:[`Verify Credentials `,(0,g.jsx)(m,{size:14})]})]})]})]})}),W&&(0,g.jsx)(`div`,{className:`modal-overlay`,children:(0,g.jsxs)(`div`,{className:`modal-content`,style:{maxWidth:`400px`,textAlign:`center`,padding:`32px`},children:[(0,g.jsx)(u,{size:36,style:{color:`var(--brand-red)`,margin:`0 auto 12px`}}),(0,g.jsx)(`h2`,{style:{fontSize:`1.25rem`,fontWeight:800},children:`Verify Email & Mobile`}),(0,g.jsxs)(`p`,{style:{fontSize:`0.85rem`,color:`var(--text-secondary)`,marginTop:`8px`,lineHeight:`1.5`},children:[`We have simulated sending a verification OTP to `,(0,g.jsx)(`strong`,{children:B.email}),` and `,(0,g.jsx)(`strong`,{children:B.phone}),`.`]}),(0,g.jsxs)(`form`,{onSubmit:async e=>{if(e.preventDefault(),X(``),K!==J){X(`Invalid OTP code. Please enter the correct code shown below.`);return}U(!0);try{await r.post(`/api/careers`,{jobId:R.id,name:B.name,email:B.email,phone:B.phone,resumeUrl:B.resumeUrl||`https://zingbite.com/resumes/demo.pdf`}),c(`Verification successful! Application submitted successfully.`,`success`),G(!1),z(null),V(e=>({...e,resumeUrl:``})),await Z(),await Q()}catch{c(`Failed to submit application. Please try again.`,`error`)}finally{U(!1)}},style:{marginTop:`20px`},children:[(0,g.jsx)(`div`,{className:`form-group`,style:{marginWidth:`100px`,display:`inline-block`},children:(0,g.jsx)(`input`,{type:`text`,required:!0,maxLength:`4`,placeholder:`Enter 4-digit code`,value:K,onChange:e=>q(e.target.value),className:`otp-input`})}),Y&&(0,g.jsx)(`div`,{style:{color:`var(--danger)`,fontSize:`0.8rem`,marginTop:`4px`,fontWeight:600},children:Y}),(0,g.jsxs)(`div`,{style:{background:`var(--bg-surface)`,padding:`8px`,borderRadius:`4px`,fontSize:`0.8rem`,color:`var(--text-muted)`,marginTop:`12px`},children:[`DEMO SIMULATOR OTP CODE: `,(0,g.jsx)(`strong`,{children:J})]}),(0,g.jsxs)(`div`,{style:{display:`flex`,justifyContent:`center`,gap:`12px`,marginTop:`24px`},children:[(0,g.jsx)(`button`,{type:`button`,className:`btn-primary`,onClick:()=>G(!1),style:{background:`#f0f0f0`,color:`var(--text-primary)`,border:`1px solid var(--border-medium)`,padding:`10px 18px`},children:`Back`}),(0,g.jsx)(`button`,{type:`submit`,disabled:H,className:`btn-primary`,style:{padding:`10px 18px`},children:H?(0,g.jsx)(l,{size:16,style:{animation:`spin 1s linear infinite`}}):`Verify & Submit`})]})]})]})}),A&&(0,g.jsx)(n,{type:`application`,targetId:A,userId:a?.userID||a?.userId,userName:a?.userName||a?.username,receiverId:1,initialOpen:!0,onClose:()=>j(null)},A)]})};export{y as default};