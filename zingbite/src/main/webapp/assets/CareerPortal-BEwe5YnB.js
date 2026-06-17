import{g as e,m as t,n,r,t as i,u as ee}from"./createLucideIcon-DnU5s7Zs.js";import{t as a}from"./chevron-right-DJz7G5nn.js";import{t as o}from"./file-text-DKlaPzre.js";import{t as s}from"./lock-BudfzplA.js";import{n as te,t as c}from"./ChatWidget-C3LcoAOn.js";import{t as ne}from"./send-CBtMFMV_.js";import{d as l,f as u,l as d,n as f,v as p,w as m,y as h}from"./index-CLDdiuGX.js";var re=i(`key-round`,[[`path`,{d:`M2.586 17.414A2 2 0 0 0 2 18.828V21a1 1 0 0 0 1 1h3a1 1 0 0 0 1-1v-1a1 1 0 0 1 1-1h1a1 1 0 0 0 1-1v-1a1 1 0 0 1 1-1h.172a2 2 0 0 0 1.414-.586l.814-.814a6.5 6.5 0 1 0-4-4z`,key:`1s6t7t`}],[`circle`,{cx:`16.5`,cy:`7.5`,r:`.5`,fill:`currentColor`,key:`w0ekpg`}]]),g=e(t(),1),_=n(),v=5,y={jobs:null,timestamp:0},b=()=>{let{user:e}=(0,g.useContext)(m),t=ee(),{showAlert:n}=f(),[i,b]=(0,g.useState)(`jobs`),[x,S]=(0,g.useState)([]),[C,w]=(0,g.useState)([]),[T,ie]=(0,g.useState)([]),[E,D]=(0,g.useState)(!0),[O,k]=(0,g.useState)(!1),[ae,A]=(0,g.useState)(!1),[j,M]=(0,g.useState)(null),[N,P]=(0,g.useState)(v),[F,I]=(0,g.useState)(v),[L,R]=(0,g.useState)(v),[z,B]=(0,g.useState)(null),[V,H]=(0,g.useState)({name:``,email:``,phone:``,resumeUrl:``}),[U,W]=(0,g.useState)(!1),[G,K]=(0,g.useState)(!1),[q,J]=(0,g.useState)(``),[Y,oe]=(0,g.useState)(`1234`),[X,Z]=(0,g.useState)(``),se=async(e=!1)=>{let t=y.jobs!==null,n=t&&Date.now()-y.timestamp>3e4;if(t){if(S(y.jobs),e||D(!1),!n)return}else e||D(!0);try{let e=await r.get(`/api/careers?action=jobs`);S(e.data),y={jobs:e.data,timestamp:Date.now()}}catch(e){console.error(`Failed to load jobs:`,e)}finally{e||D(!1)}},Q=async(t=!1)=>{if(e){t||k(!0);try{w((await r.get(`/api/careers?action=applications`)).data)}catch(e){console.error(`Failed to load applications:`,e)}finally{t||k(!1)}}},$=async(t=!1)=>{if(e){t||A(!0);try{ie((await r.get(`/api/careers?action=notifications`)).data)}catch(e){console.error(`Failed to load notifications:`,e)}finally{t||A(!1)}}};(0,g.useEffect)(()=>{se(!1),e&&(Q(!1),$(!1))},[e]),(0,g.useEffect)(()=>{e&&H({name:e.userName||e.username||``,email:e.email||``,phone:String(e.phoneNumber||e.mobile||``),resumeUrl:``})},[e]),(0,g.useEffect)(()=>{P(v),I(v),R(v)},[i]);let ce=x.slice(0,N),le=C.slice(0,F),ue=T.slice(0,L),de=N<x.length,fe=F<C.length,pe=L<T.length;return E?(0,_.jsx)(`div`,{style:{display:`flex`,justifyContent:`center`,alignItems:`center`,height:`400px`},children:(0,_.jsx)(l,{size:36,style:{animation:`spin 1s linear infinite`,color:`var(--brand-red)`}})}):(0,_.jsxs)(_.Fragment,{children:[(0,_.jsx)(`style`,{children:`
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
      `}),(0,_.jsxs)(`div`,{className:`careers-container fade-in page-enter`,children:[(0,_.jsxs)(`div`,{className:`hero-banner`,children:[(0,_.jsx)(`h1`,{style:{fontSize:`2.4rem`,fontWeight:800},children:`Grow Your Career with ZingBite`}),(0,_.jsx)(`p`,{style:{fontSize:`1.1rem`,marginTop:`8px`,opacity:.9},children:`Join our mission to deliver delight. Explore dynamic roles in technology, operations, and culinary arts.`})]}),(0,_.jsxs)(`div`,{className:`tab-bar`,children:[(0,_.jsxs)(`button`,{className:`tab-btn ${i===`jobs`?`active`:``}`,onClick:()=>b(`jobs`),children:[`Open Positions (`,x.length,`)`]}),(0,_.jsxs)(`button`,{className:`tab-btn ${i===`applications`?`active`:``}`,onClick:()=>{b(`applications`),Q()},children:[`My Applications `,e&&C.length>0&&`(${C.length})`]}),(0,_.jsxs)(`button`,{className:`tab-btn ${i===`inbox`?`active`:``}`,onClick:()=>{b(`inbox`),$()},children:[`Inbox Notifications `,e&&T.length>0&&`(${T.length})`]})]}),i===`jobs`&&(0,_.jsxs)(`div`,{className:`job-grid stagger-children`,children:[ce.map(n=>(0,_.jsxs)(`div`,{className:`job-card`,children:[(0,_.jsxs)(`div`,{className:`job-info`,children:[(0,_.jsxs)(`div`,{style:{display:`flex`,alignItems:`center`,gap:`8px`,marginBottom:`8px`},children:[(0,_.jsx)(`span`,{className:`badge dept`,children:n.department}),(0,_.jsxs)(`span`,{style:{fontSize:`0.8rem`,color:`var(--text-muted)`,display:`flex`,alignItems:`center`,gap:`4px`},children:[(0,_.jsx)(h,{size:12}),` Posted `,n.posted_date]})]}),(0,_.jsx)(`h3`,{style:{fontSize:`1.3rem`,fontWeight:800,marginBottom:`8px`},children:n.title}),(0,_.jsxs)(`p`,{style:{display:`flex`,alignItems:`center`,gap:`4px`,fontSize:`0.9rem`,color:`var(--text-secondary)`,marginBottom:`12px`},children:[(0,_.jsx)(d,{size:14}),` `,n.location]}),(0,_.jsx)(`p`,{style:{fontSize:`0.9rem`,color:`var(--text-secondary)`,lineHeight:`1.5`},children:n.description})]}),(0,_.jsx)(`div`,{className:`job-actions`,children:(0,_.jsxs)(`button`,{className:`btn-primary`,onClick:()=>{e?B(n):t(`/login?redirect=/careers`)},children:[`Apply Now `,(0,_.jsx)(ne,{size:14})]})})]},n.id)),de&&(0,_.jsx)(`div`,{className:`load-more-wrap`,style:{margin:`4px auto 0`},children:(0,_.jsxs)(`button`,{type:`button`,className:`load-more-btn`,onClick:()=>P(e=>e+v),children:[`Load more positions (`,x.length-N,` left) `,(0,_.jsx)(a,{className:`load-more-icon`,size:16})]})})]}),i===`applications`&&(0,_.jsx)(`div`,{children:e?O?(0,_.jsx)(`div`,{style:{display:`flex`,justifyContent:`center`,padding:`48px`},children:(0,_.jsx)(l,{size:24,style:{animation:`spin 1s linear infinite`,color:`var(--brand-red)`}})}):C.length===0?(0,_.jsx)(`div`,{style:{textAlign:`center`,padding:`48px`,border:`1px dashed var(--border-medium)`,borderRadius:`12px`},children:(0,_.jsx)(`p`,{style:{color:`var(--text-secondary)`},children:`You haven't applied to any roles yet. View open positions to apply!`})}):(0,_.jsxs)(`div`,{className:`job-grid`,children:[le.map(e=>(0,_.jsxs)(`div`,{className:`job-card`,children:[(0,_.jsxs)(`div`,{className:`job-info`,children:[(0,_.jsxs)(`div`,{style:{display:`flex`,alignItems:`center`,gap:`8px`,marginBottom:`8px`},children:[(0,_.jsx)(`span`,{className:`badge dept`,children:e.department}),(0,_.jsxs)(`span`,{style:{fontSize:`0.8rem`,color:`var(--text-muted)`},children:[`Applied on `,e.appliedDate]})]}),(0,_.jsx)(`h3`,{style:{fontSize:`1.2rem`,fontWeight:800,marginBottom:`6px`},children:e.jobTitle}),(0,_.jsxs)(`p`,{style:{display:`flex`,alignItems:`center`,gap:`4px`,fontSize:`0.85rem`,color:`var(--text-secondary)`},children:[(0,_.jsx)(d,{size:12}),` `,e.location||`HQ`]}),(0,_.jsxs)(`a`,{href:e.resumeUrl,target:`_blank`,rel:`noreferrer`,style:{display:`inline-flex`,alignItems:`center`,gap:`4px`,fontSize:`0.8rem`,marginTop:`12px`,fontWeight:600},children:[(0,_.jsx)(o,{size:12}),` View Submitted Resume`]})]}),(0,_.jsx)(`div`,{children:(0,_.jsxs)(`div`,{style:{display:`flex`,flexDirection:`column`,alignItems:`flex-end`,gap:`6px`},children:[(0,_.jsx)(`span`,{style:{fontSize:`0.78rem`,color:`var(--text-muted)`,fontWeight:600},children:`Application Status`}),(0,_.jsx)(`span`,{className:`badge ${e.status.toLowerCase().includes(`applied`)?`applied`:e.status.toLowerCase().includes(`interview`)?`interview`:e.status.toLowerCase().includes(`offer`)?`offered`:`rejected`}`,style:{padding:`6px 12px`,fontSize:`0.8rem`},children:e.status}),(0,_.jsxs)(`button`,{onClick:()=>M(e.id),style:{background:`transparent`,color:`var(--brand-red)`,border:`1px solid var(--brand-red)`,padding:`6px 12px`,borderRadius:`4px`,fontSize:`0.75rem`,fontWeight:700,cursor:`pointer`,display:`flex`,alignItems:`center`,gap:`4px`,marginTop:`8px`},children:[(0,_.jsx)(te,{size:12}),` Chat with Recruiter`]})]})})]},e.id)),fe&&(0,_.jsx)(`div`,{className:`load-more-wrap`,style:{margin:`4px auto 0`},children:(0,_.jsxs)(`button`,{type:`button`,className:`load-more-btn`,onClick:()=>I(e=>e+v),children:[`Load more applications (`,C.length-F,` left) `,(0,_.jsx)(a,{className:`load-more-icon`,size:16})]})})]}):(0,_.jsxs)(`div`,{style:{textAlign:`center`,padding:`48px`,border:`1px dashed var(--border-medium)`,borderRadius:`12px`},children:[(0,_.jsx)(p,{size:36,style:{color:`var(--brand-red)`,margin:`0 auto 12px`}}),(0,_.jsx)(`h3`,{children:`Sign in to track your applications`}),(0,_.jsx)(`p`,{style:{color:`var(--text-secondary)`,marginTop:`8px`,marginBottom:`16px`},children:`Log in with your ZingBite account to view and check statuses.`}),(0,_.jsx)(`button`,{className:`btn-primary`,style:{margin:`0 auto`},onClick:()=>t(`/login?redirect=/careers`),children:`Login to Account`})]})}),i===`inbox`&&(0,_.jsx)(`div`,{children:e?ae?(0,_.jsx)(`div`,{style:{display:`flex`,justifyContent:`center`,padding:`48px`},children:(0,_.jsx)(l,{size:24,style:{animation:`spin 1s linear infinite`,color:`var(--brand-red)`}})}):T.length===0?(0,_.jsx)(`div`,{style:{textAlign:`center`,padding:`48px`,border:`1px dashed var(--border-medium)`,borderRadius:`12px`,background:`#fff`},children:(0,_.jsx)(`p`,{style:{color:`var(--text-secondary)`},children:`Your inbox is empty. We will email you here when your application status changes!`})}):(0,_.jsxs)(`div`,{className:`inbox-list`,children:[ue.map(e=>(0,_.jsxs)(`div`,{className:`email-card`,children:[(0,_.jsxs)(`div`,{style:{display:`flex`,justifyContent:`space-between`,borderBottom:`1px solid var(--border-light)`,paddingBottom:`12px`,marginBottom:`12px`},children:[(0,_.jsxs)(`div`,{children:[(0,_.jsx)(`span`,{style:{fontSize:`0.8rem`,color:`var(--text-muted)`,fontWeight:600},children:`FROM: ZingBite Operations <careers@zingbite.com>`}),(0,_.jsx)(`h4`,{style:{fontSize:`1rem`,fontWeight:800,marginTop:`4px`,color:`var(--text-primary)`},children:e.subject})]}),(0,_.jsx)(`span`,{style:{fontSize:`0.78rem`,color:`var(--text-muted)`},children:e.sentDate})]}),(0,_.jsx)(`p`,{style:{fontSize:`0.9rem`,color:`var(--text-secondary)`,whiteSpace:`pre-line`,lineHeight:`1.6`},children:e.body})]},e.id)),pe&&(0,_.jsx)(`div`,{className:`load-more-wrap`,style:{margin:`4px auto 0`},children:(0,_.jsxs)(`button`,{type:`button`,className:`load-more-btn`,onClick:()=>R(e=>e+v),children:[`Load more inbox notes (`,T.length-L,` left) `,(0,_.jsx)(a,{className:`load-more-icon`,size:16})]})})]}):(0,_.jsxs)(`div`,{style:{textAlign:`center`,padding:`48px`,border:`1px dashed var(--border-medium)`,borderRadius:`12px`},children:[(0,_.jsx)(u,{size:36,style:{color:`var(--text-secondary)`,margin:`0 auto 12px`}}),(0,_.jsx)(`h3`,{children:`Sign in to view your inbox`}),(0,_.jsx)(`p`,{style:{color:`var(--text-secondary)`,marginTop:`8px`},children:`Log in to view email notifications generated for your account.`})]})})]}),z&&!G&&(0,_.jsx)(`div`,{className:`modal-overlay`,onClick:()=>B(null),children:(0,_.jsxs)(`div`,{className:`modal-content`,onClick:e=>e.stopPropagation(),children:[(0,_.jsx)(`h2`,{style:{fontSize:`1.4rem`,fontWeight:800,marginBottom:`8px`},children:`Apply for Position`}),(0,_.jsxs)(`p`,{style:{color:`var(--brand-red)`,fontWeight:700,fontSize:`0.95rem`,marginBottom:`20px`},children:[z.title,` — `,z.department]}),(0,_.jsxs)(`form`,{onSubmit:r=>{if(r.preventDefault(),!e){t(`/login?redirect=/careers`);return}if(!V.name||!V.email||!V.phone){n(`Please fill out all required fields.`,`warning`);return}oe(String(Math.floor(1e3+Math.random()*9e3))),J(``),Z(``),K(!0)},children:[(0,_.jsxs)(`div`,{className:`form-group`,children:[(0,_.jsx)(`label`,{children:`Full Name *`}),(0,_.jsx)(`input`,{type:`text`,required:!0,placeholder:`Enter full name`,value:V.name,onChange:e=>H(t=>({...t,name:e.target.value}))})]}),(0,_.jsxs)(`div`,{className:`form-group`,children:[(0,_.jsx)(`label`,{children:`Email Address *`}),(0,_.jsx)(`input`,{type:`email`,required:!0,placeholder:`name@domain.com`,value:V.email,onChange:e=>H(t=>({...t,email:e.target.value}))})]}),(0,_.jsxs)(`div`,{className:`form-group`,children:[(0,_.jsx)(`label`,{children:`Phone Number *`}),(0,_.jsx)(`input`,{type:`tel`,required:!0,placeholder:`e.g. 9876543210`,value:V.phone,onChange:e=>H(t=>({...t,phone:e.target.value}))})]}),(0,_.jsxs)(`div`,{className:`form-group`,children:[(0,_.jsx)(`label`,{children:`Resume PDF Link (Optional)`}),(0,_.jsx)(`input`,{type:`url`,placeholder:`https://example.com/my-resume.pdf`,value:V.resumeUrl,onChange:e=>H(t=>({...t,resumeUrl:e.target.value}))})]}),(0,_.jsxs)(`div`,{style:{display:`flex`,justifyContent:`flex-end`,gap:`12px`,marginTop:`24px`},children:[(0,_.jsx)(`button`,{type:`button`,className:`btn-primary`,onClick:()=>B(null),style:{background:`#f0f0f0`,color:`var(--text-primary)`,border:`1px solid var(--border-medium)`},children:`Cancel`}),(0,_.jsxs)(`button`,{type:`submit`,className:`btn-primary`,children:[`Verify Credentials `,(0,_.jsx)(re,{size:14})]})]})]})]})}),G&&(0,_.jsx)(`div`,{className:`modal-overlay`,children:(0,_.jsxs)(`div`,{className:`modal-content`,style:{maxWidth:`400px`,textAlign:`center`,padding:`32px`},children:[(0,_.jsx)(s,{size:36,style:{color:`var(--brand-red)`,margin:`0 auto 12px`}}),(0,_.jsx)(`h2`,{style:{fontSize:`1.25rem`,fontWeight:800},children:`Verify Email & Mobile`}),(0,_.jsxs)(`p`,{style:{fontSize:`0.85rem`,color:`var(--text-secondary)`,marginTop:`8px`,lineHeight:`1.5`},children:[`We have simulated sending a verification OTP to `,(0,_.jsx)(`strong`,{children:V.email}),` and `,(0,_.jsx)(`strong`,{children:V.phone}),`.`]}),(0,_.jsxs)(`form`,{onSubmit:async e=>{if(e.preventDefault(),Z(``),q!==Y){Z(`Invalid OTP code. Please enter the correct code shown below.`);return}W(!0);try{await r.post(`/api/careers`,{jobId:z.id,name:V.name,email:V.email,phone:V.phone,resumeUrl:V.resumeUrl||`https://zingbite.com/resumes/demo.pdf`}),n(`Verification successful! Application submitted successfully.`,`success`),K(!1),B(null),H(e=>({...e,resumeUrl:``})),await Q(),await $()}catch{n(`Failed to submit application. Please try again.`,`error`)}finally{W(!1)}},style:{marginTop:`20px`},children:[(0,_.jsx)(`div`,{className:`form-group`,style:{marginWidth:`100px`,display:`inline-block`},children:(0,_.jsx)(`input`,{type:`text`,required:!0,maxLength:`4`,placeholder:`Enter 4-digit code`,value:q,onChange:e=>J(e.target.value),style:{textAlign:`center`,fontSize:`1.4rem`,letterSpacing:`8px`,fontWeight:800,width:`180px`,padding:`8px`}})}),X&&(0,_.jsx)(`div`,{style:{color:`var(--danger)`,fontSize:`0.8rem`,marginTop:`4px`,fontWeight:600},children:X}),(0,_.jsxs)(`div`,{style:{background:`var(--bg-surface)`,padding:`8px`,borderRadius:`4px`,fontSize:`0.8rem`,color:`var(--text-muted)`,marginTop:`12px`},children:[`DEMO SIMULATOR OTP CODE: `,(0,_.jsx)(`strong`,{children:Y})]}),(0,_.jsxs)(`div`,{style:{display:`flex`,justifyContent:`center`,gap:`12px`,marginTop:`24px`},children:[(0,_.jsx)(`button`,{type:`button`,className:`btn-primary`,onClick:()=>K(!1),style:{background:`#f0f0f0`,color:`var(--text-primary)`,border:`1px solid var(--border-medium)`,padding:`10px 18px`},children:`Back`}),(0,_.jsx)(`button`,{type:`submit`,disabled:U,className:`btn-primary`,style:{padding:`10px 18px`},children:U?(0,_.jsx)(l,{size:16,style:{animation:`spin 1s linear infinite`}}):`Verify & Submit`})]})]})]})}),j&&(0,_.jsx)(c,{type:`application`,targetId:j,userId:e?.userID||e?.userId,userName:e?.userName||e?.username,receiverId:1,initialOpen:!0,onClose:()=>M(null)},j)]})};export{b as default};