import{t as e}from"./chevron-right-Cym7iAIW.js";import{n as t,t as n}from"./ChatWidget-F-34GHAx.js";import{A as r,D as i,E as a,O as ee,T as o,b as s,c as te,f as c,h as l,j as u,m as d,t as f,w as p,x as ne}from"./index-CiwLLuYO.js";var re=p(`inbox`,[[`polyline`,{points:`22 12 16 12 14 15 10 15 8 12 2 12`,key:`o97t9d`}],[`path`,{d:`M5.45 5.11 2 12v6a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2v-6l-3.45-6.89A2 2 0 0 0 16.76 4H7.24a2 2 0 0 0-1.79 1.11z`,key:`oot6mr`}]]),m=p(`key-round`,[[`path`,{d:`M2.586 17.414A2 2 0 0 0 2 18.828V21a1 1 0 0 0 1 1h3a1 1 0 0 0 1-1v-1a1 1 0 0 1 1-1h1a1 1 0 0 0 1-1v-1a1 1 0 0 1 1-1h.172a2 2 0 0 0 1.414-.586l.814-.814a6.5 6.5 0 1 0-4-4z`,key:`1s6t7t`}],[`circle`,{cx:`16.5`,cy:`7.5`,r:`.5`,fill:`currentColor`,key:`w0ekpg`}]]),h=p(`lock`,[[`rect`,{width:`18`,height:`11`,x:`3`,y:`11`,rx:`2`,ry:`2`,key:`1w4ew1`}],[`path`,{d:`M7 11V7a5 5 0 0 1 10 0v4`,key:`fwvmzm`}]]),g=u(r(),1),_=a(),v=5,y={jobs:null,timestamp:0},b=()=>{let{user:r}=(0,g.useContext)(o),a=ee(),{showAlert:u}=f(),[p,b]=(0,g.useState)(`jobs`),[x,S]=(0,g.useState)([]),[C,w]=(0,g.useState)([]),[T,ie]=(0,g.useState)([]),[ae,E]=(0,g.useState)(!0),[oe,D]=(0,g.useState)(!1),[O,k]=(0,g.useState)(!1),[A,j]=(0,g.useState)(null),[M,N]=(0,g.useState)(v),[P,F]=(0,g.useState)(v),[I,L]=(0,g.useState)(v),[R,z]=(0,g.useState)(null),[B,V]=(0,g.useState)({name:``,email:``,phone:``,resumeUrl:``}),[H,U]=(0,g.useState)(!1),[W,G]=(0,g.useState)(!1),[K,q]=(0,g.useState)(``),[J,Y]=(0,g.useState)(`1234`),[X,Z]=(0,g.useState)(``),se=async(e=!1)=>{let t=y.jobs!==null,n=t&&Date.now()-y.timestamp>3e4;if(t){if(S(y.jobs),e||E(!1),!n)return}else e||E(!0);try{let e=await i.get(`/api/careers?action=jobs`);S(e.data),y={jobs:e.data,timestamp:Date.now()}}catch(e){console.error(`Failed to load jobs:`,e)}finally{e||E(!1)}},Q=async(e=!1)=>{if(r){e||D(!0);try{w((await i.get(`/api/careers?action=applications`)).data)}catch(e){console.error(`Failed to load applications:`,e)}finally{e||D(!1)}}},$=async(e=!1)=>{if(r){e||k(!0);try{ie((await i.get(`/api/careers?action=notifications`)).data)}catch(e){console.error(`Failed to load notifications:`,e)}finally{e||k(!1)}}};(0,g.useEffect)(()=>{se(!1),r&&(Q(!1),$(!1))},[r]),(0,g.useEffect)(()=>{r&&V({name:r.userName||r.username||``,email:r.email||``,phone:String(r.phoneNumber||r.mobile||``),resumeUrl:``})},[r]),(0,g.useEffect)(()=>{N(v),F(v),L(v)},[p]);let ce=x.slice(0,M),le=C.slice(0,P),ue=T.slice(0,I),de=M<x.length,fe=P<C.length,pe=I<T.length;return ae?(0,_.jsx)(`div`,{style:{display:`flex`,justifyContent:`center`,alignItems:`center`,height:`400px`},children:(0,_.jsx)(d,{size:36,style:{animation:`spin 1s linear infinite`,color:`var(--brand-red)`}})}):(0,_.jsxs)(_.Fragment,{children:[(0,_.jsx)(`style`,{children:`
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
      `}),(0,_.jsxs)(`div`,{className:`careers-container fade-in`,children:[(0,_.jsxs)(`div`,{className:`hero-banner`,children:[(0,_.jsx)(`h1`,{style:{fontSize:`2.4rem`,fontWeight:800},children:`Grow Your Career with ZingBite`}),(0,_.jsx)(`p`,{style:{fontSize:`1.1rem`,marginTop:`8px`,opacity:.9},children:`Join our mission to deliver delight. Explore dynamic roles in technology, operations, and culinary arts.`})]}),(0,_.jsxs)(`div`,{className:`tab-bar`,children:[(0,_.jsxs)(`button`,{className:`tab-btn ${p===`jobs`?`active`:``}`,onClick:()=>b(`jobs`),children:[`Open Positions (`,x.length,`)`]}),(0,_.jsxs)(`button`,{className:`tab-btn ${p===`applications`?`active`:``}`,onClick:()=>{b(`applications`),Q()},children:[`My Applications `,r&&C.length>0&&`(${C.length})`]}),(0,_.jsxs)(`button`,{className:`tab-btn ${p===`inbox`?`active`:``}`,onClick:()=>{b(`inbox`),$()},children:[`Inbox Notifications `,r&&T.length>0&&`(${T.length})`]})]}),p===`jobs`&&(0,_.jsxs)(`div`,{className:`job-grid stagger-children`,children:[ce.map(e=>(0,_.jsxs)(`div`,{className:`job-card`,children:[(0,_.jsxs)(`div`,{className:`job-info`,children:[(0,_.jsxs)(`div`,{style:{display:`flex`,alignItems:`center`,gap:`8px`,marginBottom:`8px`},children:[(0,_.jsx)(`span`,{className:`badge dept`,children:e.department}),(0,_.jsxs)(`span`,{style:{fontSize:`0.8rem`,color:`var(--text-muted)`,display:`flex`,alignItems:`center`,gap:`4px`},children:[(0,_.jsx)(ne,{size:12}),` Posted `,e.posted_date]})]}),(0,_.jsx)(`h3`,{style:{fontSize:`1.3rem`,fontWeight:800,marginBottom:`8px`},children:e.title}),(0,_.jsxs)(`p`,{style:{display:`flex`,alignItems:`center`,gap:`4px`,fontSize:`0.9rem`,color:`var(--text-secondary)`,marginBottom:`12px`},children:[(0,_.jsx)(c,{size:14}),` `,e.location]}),(0,_.jsx)(`p`,{style:{fontSize:`0.9rem`,color:`var(--text-secondary)`,lineHeight:`1.5`},children:e.description})]}),(0,_.jsx)(`div`,{className:`job-actions`,children:(0,_.jsxs)(`button`,{className:`btn-primary`,onClick:()=>{r?z(e):a(`/login?redirect=/careers`)},children:[`Apply Now `,(0,_.jsx)(te,{size:14})]})})]},e.id)),de&&(0,_.jsx)(`div`,{className:`load-more-wrap`,style:{margin:`4px auto 0`},children:(0,_.jsxs)(`button`,{type:`button`,className:`load-more-btn`,onClick:()=>N(e=>e+v),children:[`Load more positions (`,x.length-M,` left) `,(0,_.jsx)(e,{className:`load-more-icon`,size:16})]})})]}),p===`applications`&&(0,_.jsx)(`div`,{children:r?oe?(0,_.jsx)(`div`,{style:{display:`flex`,justifyContent:`center`,padding:`48px`},children:(0,_.jsx)(d,{size:24,style:{animation:`spin 1s linear infinite`,color:`var(--brand-red)`}})}):C.length===0?(0,_.jsx)(`div`,{style:{textAlign:`center`,padding:`48px`,border:`1px dashed var(--border-medium)`,borderRadius:`12px`},children:(0,_.jsx)(`p`,{style:{color:`var(--text-secondary)`},children:`You haven't applied to any roles yet. View open positions to apply!`})}):(0,_.jsxs)(`div`,{className:`job-grid`,children:[le.map(e=>(0,_.jsxs)(`div`,{className:`job-card`,children:[(0,_.jsxs)(`div`,{className:`job-info`,children:[(0,_.jsxs)(`div`,{style:{display:`flex`,alignItems:`center`,gap:`8px`,marginBottom:`8px`},children:[(0,_.jsx)(`span`,{className:`badge dept`,children:e.department}),(0,_.jsxs)(`span`,{style:{fontSize:`0.8rem`,color:`var(--text-muted)`},children:[`Applied on `,e.appliedDate]})]}),(0,_.jsx)(`h3`,{style:{fontSize:`1.2rem`,fontWeight:800,marginBottom:`6px`},children:e.jobTitle}),(0,_.jsxs)(`p`,{style:{display:`flex`,alignItems:`center`,gap:`4px`,fontSize:`0.85rem`,color:`var(--text-secondary)`},children:[(0,_.jsx)(c,{size:12}),` `,e.location||`HQ`]}),(0,_.jsxs)(`a`,{href:e.resumeUrl,target:`_blank`,rel:`noreferrer`,style:{display:`inline-flex`,alignItems:`center`,gap:`4px`,fontSize:`0.8rem`,marginTop:`12px`,fontWeight:600},children:[(0,_.jsx)(l,{size:12}),` View Submitted Resume`]})]}),(0,_.jsx)(`div`,{children:(0,_.jsxs)(`div`,{style:{display:`flex`,flexDirection:`column`,alignItems:`flex-end`,gap:`6px`},children:[(0,_.jsx)(`span`,{style:{fontSize:`0.78rem`,color:`var(--text-muted)`,fontWeight:600},children:`Application Status`}),(0,_.jsx)(`span`,{className:`badge ${e.status.toLowerCase().includes(`applied`)?`applied`:e.status.toLowerCase().includes(`interview`)?`interview`:e.status.toLowerCase().includes(`offer`)?`offered`:`rejected`}`,style:{padding:`6px 12px`,fontSize:`0.8rem`},children:e.status}),(0,_.jsxs)(`button`,{onClick:()=>j(e.id),style:{background:`transparent`,color:`var(--brand-red)`,border:`1px solid var(--brand-red)`,padding:`6px 12px`,borderRadius:`4px`,fontSize:`0.75rem`,fontWeight:700,cursor:`pointer`,display:`flex`,alignItems:`center`,gap:`4px`,marginTop:`8px`},children:[(0,_.jsx)(t,{size:12}),` Chat with Recruiter`]})]})})]},e.id)),fe&&(0,_.jsx)(`div`,{className:`load-more-wrap`,style:{margin:`4px auto 0`},children:(0,_.jsxs)(`button`,{type:`button`,className:`load-more-btn`,onClick:()=>F(e=>e+v),children:[`Load more applications (`,C.length-P,` left) `,(0,_.jsx)(e,{className:`load-more-icon`,size:16})]})})]}):(0,_.jsxs)(`div`,{style:{textAlign:`center`,padding:`48px`,border:`1px dashed var(--border-medium)`,borderRadius:`12px`},children:[(0,_.jsx)(s,{size:36,style:{color:`var(--brand-red)`,margin:`0 auto 12px`}}),(0,_.jsx)(`h3`,{children:`Sign in to track your applications`}),(0,_.jsx)(`p`,{style:{color:`var(--text-secondary)`,marginTop:`8px`,marginBottom:`16px`},children:`Log in with your ZingBite account to view and check statuses.`}),(0,_.jsx)(`button`,{className:`btn-primary`,style:{margin:`0 auto`},onClick:()=>a(`/login?redirect=/careers`),children:`Login to Account`})]})}),p===`inbox`&&(0,_.jsx)(`div`,{children:r?O?(0,_.jsx)(`div`,{style:{display:`flex`,justifyContent:`center`,padding:`48px`},children:(0,_.jsx)(d,{size:24,style:{animation:`spin 1s linear infinite`,color:`var(--brand-red)`}})}):T.length===0?(0,_.jsx)(`div`,{style:{textAlign:`center`,padding:`48px`,border:`1px dashed var(--border-medium)`,borderRadius:`12px`,background:`#fff`},children:(0,_.jsx)(`p`,{style:{color:`var(--text-secondary)`},children:`Your inbox is empty. We will email you here when your application status changes!`})}):(0,_.jsxs)(`div`,{className:`inbox-list`,children:[ue.map(e=>(0,_.jsxs)(`div`,{className:`email-card`,children:[(0,_.jsxs)(`div`,{style:{display:`flex`,justifyContent:`space-between`,borderBottom:`1px solid var(--border-light)`,paddingBottom:`12px`,marginBottom:`12px`},children:[(0,_.jsxs)(`div`,{children:[(0,_.jsx)(`span`,{style:{fontSize:`0.8rem`,color:`var(--text-muted)`,fontWeight:600},children:`FROM: ZingBite Operations <careers@zingbite.com>`}),(0,_.jsx)(`h4`,{style:{fontSize:`1rem`,fontWeight:800,marginTop:`4px`,color:`var(--text-primary)`},children:e.subject})]}),(0,_.jsx)(`span`,{style:{fontSize:`0.78rem`,color:`var(--text-muted)`},children:e.sentDate})]}),(0,_.jsx)(`p`,{style:{fontSize:`0.9rem`,color:`var(--text-secondary)`,whiteSpace:`pre-line`,lineHeight:`1.6`},children:e.body})]},e.id)),pe&&(0,_.jsx)(`div`,{className:`load-more-wrap`,style:{margin:`4px auto 0`},children:(0,_.jsxs)(`button`,{type:`button`,className:`load-more-btn`,onClick:()=>L(e=>e+v),children:[`Load more inbox notes (`,T.length-I,` left) `,(0,_.jsx)(e,{className:`load-more-icon`,size:16})]})})]}):(0,_.jsxs)(`div`,{style:{textAlign:`center`,padding:`48px`,border:`1px dashed var(--border-medium)`,borderRadius:`12px`},children:[(0,_.jsx)(re,{size:36,style:{color:`var(--text-secondary)`,margin:`0 auto 12px`}}),(0,_.jsx)(`h3`,{children:`Sign in to view your inbox`}),(0,_.jsx)(`p`,{style:{color:`var(--text-secondary)`,marginTop:`8px`},children:`Log in to view email notifications generated for your account.`})]})})]}),R&&!W&&(0,_.jsx)(`div`,{className:`modal-overlay`,onClick:()=>z(null),children:(0,_.jsxs)(`div`,{className:`modal-content`,onClick:e=>e.stopPropagation(),children:[(0,_.jsx)(`h2`,{style:{fontSize:`1.4rem`,fontWeight:800,marginBottom:`8px`},children:`Apply for Position`}),(0,_.jsxs)(`p`,{style:{color:`var(--brand-red)`,fontWeight:700,fontSize:`0.95rem`,marginBottom:`20px`},children:[R.title,` — `,R.department]}),(0,_.jsxs)(`form`,{onSubmit:e=>{if(e.preventDefault(),!r){a(`/login?redirect=/careers`);return}if(!B.name||!B.email||!B.phone){u(`Please fill out all required fields.`,`warning`);return}Y(String(Math.floor(1e3+Math.random()*9e3))),q(``),Z(``),G(!0)},children:[(0,_.jsxs)(`div`,{className:`form-group`,children:[(0,_.jsx)(`label`,{children:`Full Name *`}),(0,_.jsx)(`input`,{type:`text`,required:!0,placeholder:`Enter full name`,value:B.name,onChange:e=>V(t=>({...t,name:e.target.value}))})]}),(0,_.jsxs)(`div`,{className:`form-group`,children:[(0,_.jsx)(`label`,{children:`Email Address *`}),(0,_.jsx)(`input`,{type:`email`,required:!0,placeholder:`name@domain.com`,value:B.email,onChange:e=>V(t=>({...t,email:e.target.value}))})]}),(0,_.jsxs)(`div`,{className:`form-group`,children:[(0,_.jsx)(`label`,{children:`Phone Number *`}),(0,_.jsx)(`input`,{type:`tel`,required:!0,placeholder:`e.g. 9876543210`,value:B.phone,onChange:e=>V(t=>({...t,phone:e.target.value}))})]}),(0,_.jsxs)(`div`,{className:`form-group`,children:[(0,_.jsx)(`label`,{children:`Resume PDF Link (Optional)`}),(0,_.jsx)(`input`,{type:`url`,placeholder:`https://example.com/my-resume.pdf`,value:B.resumeUrl,onChange:e=>V(t=>({...t,resumeUrl:e.target.value}))})]}),(0,_.jsxs)(`div`,{style:{display:`flex`,justifyContent:`flex-end`,gap:`12px`,marginTop:`24px`},children:[(0,_.jsx)(`button`,{type:`button`,className:`btn-primary`,onClick:()=>z(null),style:{background:`#f0f0f0`,color:`var(--text-primary)`,border:`1px solid var(--border-medium)`},children:`Cancel`}),(0,_.jsxs)(`button`,{type:`submit`,className:`btn-primary`,children:[`Verify Credentials `,(0,_.jsx)(m,{size:14})]})]})]})]})}),W&&(0,_.jsx)(`div`,{className:`modal-overlay`,children:(0,_.jsxs)(`div`,{className:`modal-content`,style:{maxWidth:`400px`,textAlign:`center`,padding:`32px`},children:[(0,_.jsx)(h,{size:36,style:{color:`var(--brand-red)`,margin:`0 auto 12px`}}),(0,_.jsx)(`h2`,{style:{fontSize:`1.25rem`,fontWeight:800},children:`Verify Email & Mobile`}),(0,_.jsxs)(`p`,{style:{fontSize:`0.85rem`,color:`var(--text-secondary)`,marginTop:`8px`,lineHeight:`1.5`},children:[`We have simulated sending a verification OTP to `,(0,_.jsx)(`strong`,{children:B.email}),` and `,(0,_.jsx)(`strong`,{children:B.phone}),`.`]}),(0,_.jsxs)(`form`,{onSubmit:async e=>{if(e.preventDefault(),Z(``),K!==J){Z(`Invalid OTP code. Please enter the correct code shown below.`);return}U(!0);try{await i.post(`/api/careers`,{jobId:R.id,name:B.name,email:B.email,phone:B.phone,resumeUrl:B.resumeUrl||`https://zingbite.com/resumes/demo.pdf`}),u(`Verification successful! Application submitted successfully.`,`success`),G(!1),z(null),V(e=>({...e,resumeUrl:``})),await Q(),await $()}catch{u(`Failed to submit application. Please try again.`,`error`)}finally{U(!1)}},style:{marginTop:`20px`},children:[(0,_.jsx)(`div`,{className:`form-group`,style:{marginWidth:`100px`,display:`inline-block`},children:(0,_.jsx)(`input`,{type:`text`,required:!0,maxLength:`4`,placeholder:`Enter 4-digit code`,value:K,onChange:e=>q(e.target.value),style:{textAlign:`center`,fontSize:`1.4rem`,letterSpacing:`8px`,fontWeight:800,width:`180px`,padding:`8px`}})}),X&&(0,_.jsx)(`div`,{style:{color:`var(--danger)`,fontSize:`0.8rem`,marginTop:`4px`,fontWeight:600},children:X}),(0,_.jsxs)(`div`,{style:{background:`var(--bg-surface)`,padding:`8px`,borderRadius:`4px`,fontSize:`0.8rem`,color:`var(--text-muted)`,marginTop:`12px`},children:[`DEMO SIMULATOR OTP CODE: `,(0,_.jsx)(`strong`,{children:J})]}),(0,_.jsxs)(`div`,{style:{display:`flex`,justifyContent:`center`,gap:`12px`,marginTop:`24px`},children:[(0,_.jsx)(`button`,{type:`button`,className:`btn-primary`,onClick:()=>G(!1),style:{background:`#f0f0f0`,color:`var(--text-primary)`,border:`1px solid var(--border-medium)`,padding:`10px 18px`},children:`Back`}),(0,_.jsx)(`button`,{type:`submit`,disabled:H,className:`btn-primary`,style:{padding:`10px 18px`},children:H?(0,_.jsx)(d,{size:16,style:{animation:`spin 1s linear infinite`}}):`Verify & Submit`})]})]})]})}),A&&(0,_.jsx)(n,{type:`application`,targetId:A,userId:r?.userID||r?.userId,userName:r?.userName||r?.username,receiverId:1,initialOpen:!0,onClose:()=>j(null)},A)]})};export{b as default};