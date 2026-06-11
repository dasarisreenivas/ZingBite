import{t as e}from"./chevron-right-D7Q9x3d1.js";import{n as t,t as n}from"./ChatWidget-Cly2Cb9B.js";import{A as r,C as i,D as a,N as o,O as s,P as c,_ as ee,g as l,h as u,j as d,k as f,l as te,p,t as ne,v as re,w as ie}from"./index-CXn8uLcV.js";var m=a(`key-round`,[[`path`,{d:`M2.586 17.414A2 2 0 0 0 2 18.828V21a1 1 0 0 0 1 1h3a1 1 0 0 0 1-1v-1a1 1 0 0 1 1-1h1a1 1 0 0 0 1-1v-1a1 1 0 0 1 1-1h.172a2 2 0 0 0 1.414-.586l.814-.814a6.5 6.5 0 1 0-4-4z`,key:`1s6t7t`}],[`circle`,{cx:`16.5`,cy:`7.5`,r:`.5`,fill:`currentColor`,key:`w0ekpg`}]]),h=c(o(),1),g=f(),_=5,v={jobs:null,timestamp:0},y=()=>{let{user:a}=(0,h.useContext)(s),o=d(),{showAlert:c}=ne(),[f,y]=(0,h.useState)(`jobs`),[b,x]=(0,h.useState)([]),[S,ae]=(0,h.useState)([]),[C,oe]=(0,h.useState)([]),[w,T]=(0,h.useState)(!0),[E,D]=(0,h.useState)(!1),[O,k]=(0,h.useState)(!1),[A,j]=(0,h.useState)(null),[M,N]=(0,h.useState)(_),[P,F]=(0,h.useState)(_),[I,L]=(0,h.useState)(_),[R,z]=(0,h.useState)(null),[B,V]=(0,h.useState)({name:``,email:``,phone:``,resumeUrl:``}),[H,U]=(0,h.useState)(!1),[W,G]=(0,h.useState)(!1),[K,q]=(0,h.useState)(``),[J,se]=(0,h.useState)(`1234`),[Y,X]=(0,h.useState)(``),ce=async(e=!1)=>{let t=v.jobs!==null,n=t&&Date.now()-v.timestamp>3e4;if(t){if(x(v.jobs),e||T(!1),!n)return}else e||T(!0);try{let e=await r.get(`/api/careers?action=jobs`);x(e.data),v={jobs:e.data,timestamp:Date.now()}}catch(e){console.error(`Failed to load jobs:`,e)}finally{e||T(!1)}},Z=async(e=!1)=>{if(a){e||D(!0);try{ae((await r.get(`/api/careers?action=applications`)).data)}catch(e){console.error(`Failed to load applications:`,e)}finally{e||D(!1)}}},Q=async(e=!1)=>{if(a){e||k(!0);try{oe((await r.get(`/api/careers?action=notifications`)).data)}catch(e){console.error(`Failed to load notifications:`,e)}finally{e||k(!1)}}};(0,h.useEffect)(()=>{ce(!1),a&&(Z(!1),Q(!1))},[a]),(0,h.useEffect)(()=>{a&&V({name:a.userName||a.username||``,email:a.email||``,phone:String(a.phoneNumber||a.mobile||``),resumeUrl:``})},[a]),(0,h.useEffect)(()=>{N(_),F(_),L(_)},[f]);let le=b.slice(0,M),$=S.slice(0,P),ue=C.slice(0,I),de=M<b.length,fe=P<S.length,pe=I<C.length;return w?(0,g.jsx)(`div`,{style:{display:`flex`,justifyContent:`center`,alignItems:`center`,height:`400px`},children:(0,g.jsx)(l,{size:36,style:{animation:`spin 1s linear infinite`,color:`var(--brand-red)`}})}):(0,g.jsxs)(g.Fragment,{children:[(0,g.jsx)(`style`,{children:`
        .careers-container {
          max-width: 1200px;
          margin: 32px auto;
          padding: 0 20px;
        }
        .hero-banner {
          background: linear-gradient(135deg, var(--brand-red) 0%, #ff6b7d 100%);
          color: white;
          border-radius: var(--radius-lg);
          padding: 48px 32px;
          text-align: center;
          margin-bottom: 32px;
          box-shadow: var(--shadow-md);
        }
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
        .job-grid {
          display: grid;
          grid-template-columns: 1fr;
          gap: 20px;
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
          transition: transform 0.2s, box-shadow 0.2s;
        }
        .job-card:hover {
          transform: translateY(-2px);
          box-shadow: var(--shadow-md);
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
        .badge.dept { background: rgba(247,55,79,0.08); color: var(--brand-red); }
        .badge.applied { background: rgba(54,162,235,0.08); color: #36a2eb; }
        .badge.interview { background: rgba(255,159,64,0.08); color: #ff9f40; }
        .badge.offered { background: rgba(75,192,192,0.08); color: #4bc0c0; }
        .badge.rejected { background: rgba(226,55,68,0.08); color: var(--danger); }
        
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
        }
        .form-group input:focus {
          border-color: var(--brand-red);
        }
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
        }
        .premium-btn-shimmer {
          background: linear-gradient(135deg, var(--brand-red), #ff6b8b, var(--brand-red));
          background-size: 200% 100%;
          animation: shimmerSweep 2s ease-in-out infinite;
        }
        @keyframes shimmerSweep {
          0% { background-position: 200% 0; }
          100% { background-position: -200% 0; }
        }
        .job-card {
          position: relative;
          overflow: hidden;
          transition: all 0.3s var(--ease-premium);
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
        }
        .job-card:hover::before {
          opacity: 1;
        }
        .job-card:hover {
          transform: translateY(-4px);
          box-shadow: 0 16px 32px rgba(28,28,28,0.08);
        }
        .email-card {
          transition: all 0.3s var(--ease-premium);
          position: relative;
          overflow: hidden;
        }
        .email-card:hover {
          transform: translateX(4px);
          border-color: rgba(247,55,79,0.15);
          box-shadow: var(--shadow-md);
        }
        .hero-banner {
          position: relative;
          overflow: hidden;
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
        .btn-primary {
          position: relative;
          overflow: hidden;
        }
        .btn-primary:hover {
          transform: translateY(-2px);
          box-shadow: 0 8px 20px rgba(247,55,79,0.3);
        }
        .modal-content {
          animation: modalSlideUp 0.3s ease-out;
        }
        @keyframes modalSlideUp {
          from { transform: translateY(20px); opacity: 0; }
          to { transform: translateY(0); opacity: 1; }
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
      `}),(0,g.jsxs)(`div`,{className:`careers-container fade-in page-enter`,children:[(0,g.jsxs)(`div`,{className:`hero-banner`,children:[(0,g.jsx)(`h1`,{style:{fontSize:`2.4rem`,fontWeight:800},children:`Grow Your Career with ZingBite`}),(0,g.jsx)(`p`,{style:{fontSize:`1.1rem`,marginTop:`8px`,opacity:.9},children:`Join our mission to deliver delight. Explore dynamic roles in technology, operations, and culinary arts.`})]}),(0,g.jsxs)(`div`,{className:`tab-bar`,children:[(0,g.jsxs)(`button`,{className:`tab-btn ${f===`jobs`?`active`:``}`,onClick:()=>y(`jobs`),children:[`Open Positions (`,b.length,`)`]}),(0,g.jsxs)(`button`,{className:`tab-btn ${f===`applications`?`active`:``}`,onClick:()=>{y(`applications`),Z()},children:[`My Applications `,a&&S.length>0&&`(${S.length})`]}),(0,g.jsxs)(`button`,{className:`tab-btn ${f===`inbox`?`active`:``}`,onClick:()=>{y(`inbox`),Q()},children:[`Inbox Notifications `,a&&C.length>0&&`(${C.length})`]})]}),f===`jobs`&&(0,g.jsxs)(`div`,{className:`job-grid stagger-children`,children:[le.map(e=>(0,g.jsxs)(`div`,{className:`job-card`,children:[(0,g.jsxs)(`div`,{className:`job-info`,children:[(0,g.jsxs)(`div`,{style:{display:`flex`,alignItems:`center`,gap:`8px`,marginBottom:`8px`},children:[(0,g.jsx)(`span`,{className:`badge dept`,children:e.department}),(0,g.jsxs)(`span`,{style:{fontSize:`0.8rem`,color:`var(--text-muted)`,display:`flex`,alignItems:`center`,gap:`4px`},children:[(0,g.jsx)(ie,{size:12}),` Posted `,e.posted_date]})]}),(0,g.jsx)(`h3`,{style:{fontSize:`1.3rem`,fontWeight:800,marginBottom:`8px`},children:e.title}),(0,g.jsxs)(`p`,{style:{display:`flex`,alignItems:`center`,gap:`4px`,fontSize:`0.9rem`,color:`var(--text-secondary)`,marginBottom:`12px`},children:[(0,g.jsx)(p,{size:14}),` `,e.location]}),(0,g.jsx)(`p`,{style:{fontSize:`0.9rem`,color:`var(--text-secondary)`,lineHeight:`1.5`},children:e.description})]}),(0,g.jsx)(`div`,{className:`job-actions`,children:(0,g.jsxs)(`button`,{className:`btn-primary`,onClick:()=>{a?z(e):o(`/login?redirect=/careers`)},children:[`Apply Now `,(0,g.jsx)(te,{size:14})]})})]},e.id)),de&&(0,g.jsx)(`div`,{className:`load-more-wrap`,style:{margin:`4px auto 0`},children:(0,g.jsxs)(`button`,{type:`button`,className:`load-more-btn`,onClick:()=>N(e=>e+_),children:[`Load more positions (`,b.length-M,` left) `,(0,g.jsx)(e,{className:`load-more-icon`,size:16})]})})]}),f===`applications`&&(0,g.jsx)(`div`,{children:a?E?(0,g.jsx)(`div`,{style:{display:`flex`,justifyContent:`center`,padding:`48px`},children:(0,g.jsx)(l,{size:24,style:{animation:`spin 1s linear infinite`,color:`var(--brand-red)`}})}):S.length===0?(0,g.jsx)(`div`,{style:{textAlign:`center`,padding:`48px`,border:`1px dashed var(--border-medium)`,borderRadius:`12px`},children:(0,g.jsx)(`p`,{style:{color:`var(--text-secondary)`},children:`You haven't applied to any roles yet. View open positions to apply!`})}):(0,g.jsxs)(`div`,{className:`job-grid`,children:[$.map(e=>(0,g.jsxs)(`div`,{className:`job-card`,children:[(0,g.jsxs)(`div`,{className:`job-info`,children:[(0,g.jsxs)(`div`,{style:{display:`flex`,alignItems:`center`,gap:`8px`,marginBottom:`8px`},children:[(0,g.jsx)(`span`,{className:`badge dept`,children:e.department}),(0,g.jsxs)(`span`,{style:{fontSize:`0.8rem`,color:`var(--text-muted)`},children:[`Applied on `,e.appliedDate]})]}),(0,g.jsx)(`h3`,{style:{fontSize:`1.2rem`,fontWeight:800,marginBottom:`6px`},children:e.jobTitle}),(0,g.jsxs)(`p`,{style:{display:`flex`,alignItems:`center`,gap:`4px`,fontSize:`0.85rem`,color:`var(--text-secondary)`},children:[(0,g.jsx)(p,{size:12}),` `,e.location||`HQ`]}),(0,g.jsxs)(`a`,{href:e.resumeUrl,target:`_blank`,rel:`noreferrer`,style:{display:`inline-flex`,alignItems:`center`,gap:`4px`,fontSize:`0.8rem`,marginTop:`12px`,fontWeight:600},children:[(0,g.jsx)(re,{size:12}),` View Submitted Resume`]})]}),(0,g.jsx)(`div`,{children:(0,g.jsxs)(`div`,{style:{display:`flex`,flexDirection:`column`,alignItems:`flex-end`,gap:`6px`},children:[(0,g.jsx)(`span`,{style:{fontSize:`0.78rem`,color:`var(--text-muted)`,fontWeight:600},children:`Application Status`}),(0,g.jsx)(`span`,{className:`badge ${e.status.toLowerCase().includes(`applied`)?`applied`:e.status.toLowerCase().includes(`interview`)?`interview`:e.status.toLowerCase().includes(`offer`)?`offered`:`rejected`}`,style:{padding:`6px 12px`,fontSize:`0.8rem`},children:e.status}),(0,g.jsxs)(`button`,{onClick:()=>j(e.id),style:{background:`transparent`,color:`var(--brand-red)`,border:`1px solid var(--brand-red)`,padding:`6px 12px`,borderRadius:`4px`,fontSize:`0.75rem`,fontWeight:700,cursor:`pointer`,display:`flex`,alignItems:`center`,gap:`4px`,marginTop:`8px`},children:[(0,g.jsx)(t,{size:12}),` Chat with Recruiter`]})]})})]},e.id)),fe&&(0,g.jsx)(`div`,{className:`load-more-wrap`,style:{margin:`4px auto 0`},children:(0,g.jsxs)(`button`,{type:`button`,className:`load-more-btn`,onClick:()=>F(e=>e+_),children:[`Load more applications (`,S.length-P,` left) `,(0,g.jsx)(e,{className:`load-more-icon`,size:16})]})})]}):(0,g.jsxs)(`div`,{style:{textAlign:`center`,padding:`48px`,border:`1px dashed var(--border-medium)`,borderRadius:`12px`},children:[(0,g.jsx)(i,{size:36,style:{color:`var(--brand-red)`,margin:`0 auto 12px`}}),(0,g.jsx)(`h3`,{children:`Sign in to track your applications`}),(0,g.jsx)(`p`,{style:{color:`var(--text-secondary)`,marginTop:`8px`,marginBottom:`16px`},children:`Log in with your ZingBite account to view and check statuses.`}),(0,g.jsx)(`button`,{className:`btn-primary`,style:{margin:`0 auto`},onClick:()=>o(`/login?redirect=/careers`),children:`Login to Account`})]})}),f===`inbox`&&(0,g.jsx)(`div`,{children:a?O?(0,g.jsx)(`div`,{style:{display:`flex`,justifyContent:`center`,padding:`48px`},children:(0,g.jsx)(l,{size:24,style:{animation:`spin 1s linear infinite`,color:`var(--brand-red)`}})}):C.length===0?(0,g.jsx)(`div`,{style:{textAlign:`center`,padding:`48px`,border:`1px dashed var(--border-medium)`,borderRadius:`12px`,background:`#fff`},children:(0,g.jsx)(`p`,{style:{color:`var(--text-secondary)`},children:`Your inbox is empty. We will email you here when your application status changes!`})}):(0,g.jsxs)(`div`,{className:`inbox-list`,children:[ue.map(e=>(0,g.jsxs)(`div`,{className:`email-card`,children:[(0,g.jsxs)(`div`,{style:{display:`flex`,justifyContent:`space-between`,borderBottom:`1px solid var(--border-light)`,paddingBottom:`12px`,marginBottom:`12px`},children:[(0,g.jsxs)(`div`,{children:[(0,g.jsx)(`span`,{style:{fontSize:`0.8rem`,color:`var(--text-muted)`,fontWeight:600},children:`FROM: ZingBite Operations <careers@zingbite.com>`}),(0,g.jsx)(`h4`,{style:{fontSize:`1rem`,fontWeight:800,marginTop:`4px`,color:`var(--text-primary)`},children:e.subject})]}),(0,g.jsx)(`span`,{style:{fontSize:`0.78rem`,color:`var(--text-muted)`},children:e.sentDate})]}),(0,g.jsx)(`p`,{style:{fontSize:`0.9rem`,color:`var(--text-secondary)`,whiteSpace:`pre-line`,lineHeight:`1.6`},children:e.body})]},e.id)),pe&&(0,g.jsx)(`div`,{className:`load-more-wrap`,style:{margin:`4px auto 0`},children:(0,g.jsxs)(`button`,{type:`button`,className:`load-more-btn`,onClick:()=>L(e=>e+_),children:[`Load more inbox notes (`,C.length-I,` left) `,(0,g.jsx)(e,{className:`load-more-icon`,size:16})]})})]}):(0,g.jsxs)(`div`,{style:{textAlign:`center`,padding:`48px`,border:`1px dashed var(--border-medium)`,borderRadius:`12px`},children:[(0,g.jsx)(ee,{size:36,style:{color:`var(--text-secondary)`,margin:`0 auto 12px`}}),(0,g.jsx)(`h3`,{children:`Sign in to view your inbox`}),(0,g.jsx)(`p`,{style:{color:`var(--text-secondary)`,marginTop:`8px`},children:`Log in to view email notifications generated for your account.`})]})})]}),R&&!W&&(0,g.jsx)(`div`,{className:`modal-overlay`,onClick:()=>z(null),children:(0,g.jsxs)(`div`,{className:`modal-content`,onClick:e=>e.stopPropagation(),children:[(0,g.jsx)(`h2`,{style:{fontSize:`1.4rem`,fontWeight:800,marginBottom:`8px`},children:`Apply for Position`}),(0,g.jsxs)(`p`,{style:{color:`var(--brand-red)`,fontWeight:700,fontSize:`0.95rem`,marginBottom:`20px`},children:[R.title,` — `,R.department]}),(0,g.jsxs)(`form`,{onSubmit:e=>{if(e.preventDefault(),!a){o(`/login?redirect=/careers`);return}if(!B.name||!B.email||!B.phone){c(`Please fill out all required fields.`,`warning`);return}se(String(Math.floor(1e3+Math.random()*9e3))),q(``),X(``),G(!0)},children:[(0,g.jsxs)(`div`,{className:`form-group`,children:[(0,g.jsx)(`label`,{children:`Full Name *`}),(0,g.jsx)(`input`,{type:`text`,required:!0,placeholder:`Enter full name`,value:B.name,onChange:e=>V(t=>({...t,name:e.target.value}))})]}),(0,g.jsxs)(`div`,{className:`form-group`,children:[(0,g.jsx)(`label`,{children:`Email Address *`}),(0,g.jsx)(`input`,{type:`email`,required:!0,placeholder:`name@domain.com`,value:B.email,onChange:e=>V(t=>({...t,email:e.target.value}))})]}),(0,g.jsxs)(`div`,{className:`form-group`,children:[(0,g.jsx)(`label`,{children:`Phone Number *`}),(0,g.jsx)(`input`,{type:`tel`,required:!0,placeholder:`e.g. 9876543210`,value:B.phone,onChange:e=>V(t=>({...t,phone:e.target.value}))})]}),(0,g.jsxs)(`div`,{className:`form-group`,children:[(0,g.jsx)(`label`,{children:`Resume PDF Link (Optional)`}),(0,g.jsx)(`input`,{type:`url`,placeholder:`https://example.com/my-resume.pdf`,value:B.resumeUrl,onChange:e=>V(t=>({...t,resumeUrl:e.target.value}))})]}),(0,g.jsxs)(`div`,{style:{display:`flex`,justifyContent:`flex-end`,gap:`12px`,marginTop:`24px`},children:[(0,g.jsx)(`button`,{type:`button`,className:`btn-primary`,onClick:()=>z(null),style:{background:`#f0f0f0`,color:`var(--text-primary)`,border:`1px solid var(--border-medium)`},children:`Cancel`}),(0,g.jsxs)(`button`,{type:`submit`,className:`btn-primary`,children:[`Verify Credentials `,(0,g.jsx)(m,{size:14})]})]})]})]})}),W&&(0,g.jsx)(`div`,{className:`modal-overlay`,children:(0,g.jsxs)(`div`,{className:`modal-content`,style:{maxWidth:`400px`,textAlign:`center`,padding:`32px`},children:[(0,g.jsx)(u,{size:36,style:{color:`var(--brand-red)`,margin:`0 auto 12px`}}),(0,g.jsx)(`h2`,{style:{fontSize:`1.25rem`,fontWeight:800},children:`Verify Email & Mobile`}),(0,g.jsxs)(`p`,{style:{fontSize:`0.85rem`,color:`var(--text-secondary)`,marginTop:`8px`,lineHeight:`1.5`},children:[`We have simulated sending a verification OTP to `,(0,g.jsx)(`strong`,{children:B.email}),` and `,(0,g.jsx)(`strong`,{children:B.phone}),`.`]}),(0,g.jsxs)(`form`,{onSubmit:async e=>{if(e.preventDefault(),X(``),K!==J){X(`Invalid OTP code. Please enter the correct code shown below.`);return}U(!0);try{await r.post(`/api/careers`,{jobId:R.id,name:B.name,email:B.email,phone:B.phone,resumeUrl:B.resumeUrl||`https://zingbite.com/resumes/demo.pdf`}),c(`Verification successful! Application submitted successfully.`,`success`),G(!1),z(null),V(e=>({...e,resumeUrl:``})),await Z(),await Q()}catch{c(`Failed to submit application. Please try again.`,`error`)}finally{U(!1)}},style:{marginTop:`20px`},children:[(0,g.jsx)(`div`,{className:`form-group`,style:{marginWidth:`100px`,display:`inline-block`},children:(0,g.jsx)(`input`,{type:`text`,required:!0,maxLength:`4`,placeholder:`Enter 4-digit code`,value:K,onChange:e=>q(e.target.value),style:{textAlign:`center`,fontSize:`1.4rem`,letterSpacing:`8px`,fontWeight:800,width:`180px`,padding:`8px`}})}),Y&&(0,g.jsx)(`div`,{style:{color:`var(--danger)`,fontSize:`0.8rem`,marginTop:`4px`,fontWeight:600},children:Y}),(0,g.jsxs)(`div`,{style:{background:`var(--bg-surface)`,padding:`8px`,borderRadius:`4px`,fontSize:`0.8rem`,color:`var(--text-muted)`,marginTop:`12px`},children:[`DEMO SIMULATOR OTP CODE: `,(0,g.jsx)(`strong`,{children:J})]}),(0,g.jsxs)(`div`,{style:{display:`flex`,justifyContent:`center`,gap:`12px`,marginTop:`24px`},children:[(0,g.jsx)(`button`,{type:`button`,className:`btn-primary`,onClick:()=>G(!1),style:{background:`#f0f0f0`,color:`var(--text-primary)`,border:`1px solid var(--border-medium)`,padding:`10px 18px`},children:`Back`}),(0,g.jsx)(`button`,{type:`submit`,disabled:H,className:`btn-primary`,style:{padding:`10px 18px`},children:H?(0,g.jsx)(l,{size:16,style:{animation:`spin 1s linear infinite`}}):`Verify & Submit`})]})]})]})}),A&&(0,g.jsx)(n,{type:`application`,targetId:A,userId:a?.userID||a?.userId,userName:a?.userName||a?.username,receiverId:1,initialOpen:!0,onClose:()=>j(null)},A)]})};export{y as default};