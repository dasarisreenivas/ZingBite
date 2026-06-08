import{n as e,t}from"./ChatWidget-EQ7M9cVI.js";import{A as n,D as r,E as i,O as a,T as o,b as s,c,f as l,h as u,j as d,m as f,t as p,w as m,x as h}from"./index-DA02D76-.js";var g=m(`inbox`,[[`polyline`,{points:`22 12 16 12 14 15 10 15 8 12 2 12`,key:`o97t9d`}],[`path`,{d:`M5.45 5.11 2 12v6a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2v-6l-3.45-6.89A2 2 0 0 0 16.76 4H7.24a2 2 0 0 0-1.79 1.11z`,key:`oot6mr`}]]),_=m(`key-round`,[[`path`,{d:`M2.586 17.414A2 2 0 0 0 2 18.828V21a1 1 0 0 0 1 1h3a1 1 0 0 0 1-1v-1a1 1 0 0 1 1-1h1a1 1 0 0 0 1-1v-1a1 1 0 0 1 1-1h.172a2 2 0 0 0 1.414-.586l.814-.814a6.5 6.5 0 1 0-4-4z`,key:`1s6t7t`}],[`circle`,{cx:`16.5`,cy:`7.5`,r:`.5`,fill:`currentColor`,key:`w0ekpg`}]]),v=m(`lock`,[[`rect`,{width:`18`,height:`11`,x:`3`,y:`11`,rx:`2`,ry:`2`,key:`1w4ew1`}],[`path`,{d:`M7 11V7a5 5 0 0 1 10 0v4`,key:`fwvmzm`}]]),y=d(n(),1),b=i(),x=()=>{let{user:n}=(0,y.useContext)(o),i=a(),{showAlert:d}=p(),[m,x]=(0,y.useState)(`jobs`),[S,C]=(0,y.useState)([]),[w,T]=(0,y.useState)([]),[E,D]=(0,y.useState)([]),[O,k]=(0,y.useState)(!0),[A,j]=(0,y.useState)(!1),[M,N]=(0,y.useState)(!1),[P,F]=(0,y.useState)(null),[I,L]=(0,y.useState)(null),[R,z]=(0,y.useState)({name:``,email:``,phone:``,resumeUrl:``}),[B,V]=(0,y.useState)(!1),[H,U]=(0,y.useState)(!1),[W,G]=(0,y.useState)(``),[K,q]=(0,y.useState)(`1234`),[J,Y]=(0,y.useState)(``),X=async(e=!1)=>{try{C((await r.get(`/api/careers?action=jobs`)).data)}catch(e){console.error(`Failed to load jobs:`,e)}finally{e||k(!1)}},Z=async(e=!1)=>{if(n){e||j(!0);try{T((await r.get(`/api/careers?action=applications`)).data)}catch(e){console.error(`Failed to load applications:`,e)}finally{e||j(!1)}}},Q=async(e=!1)=>{if(n){e||N(!0);try{D((await r.get(`/api/careers?action=notifications`)).data)}catch(e){console.error(`Failed to load notifications:`,e)}finally{e||N(!1)}}};return(0,y.useEffect)(()=>{X(!1);let e=setInterval(()=>X(!0),5e3),t=null;return n&&(Z(!1),Q(!1),t=setInterval(()=>{Z(!0),Q(!0)},4e3)),()=>{clearInterval(e),t&&clearInterval(t)}},[n]),(0,y.useEffect)(()=>{n&&z({name:n.userName||n.username||``,email:n.email||``,phone:String(n.phoneNumber||n.mobile||``),resumeUrl:``})},[n]),O?(0,b.jsx)(`div`,{style:{display:`flex`,justifyContent:`center`,alignItems:`center`,height:`400px`},children:(0,b.jsx)(f,{size:36,style:{animation:`spin 1s linear infinite`,color:`var(--brand-red)`}})}):(0,b.jsxs)(b.Fragment,{children:[(0,b.jsx)(`style`,{children:`
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
      `}),(0,b.jsxs)(`div`,{className:`careers-container fade-in`,children:[(0,b.jsxs)(`div`,{className:`hero-banner`,children:[(0,b.jsx)(`h1`,{style:{fontSize:`2.4rem`,fontWeight:800},children:`Grow Your Career with ZingBite`}),(0,b.jsx)(`p`,{style:{fontSize:`1.1rem`,marginTop:`8px`,opacity:.9},children:`Join our mission to deliver delight. Explore dynamic roles in technology, operations, and culinary arts.`})]}),(0,b.jsxs)(`div`,{className:`tab-bar`,children:[(0,b.jsxs)(`button`,{className:`tab-btn ${m===`jobs`?`active`:``}`,onClick:()=>x(`jobs`),children:[`Open Positions (`,S.length,`)`]}),(0,b.jsxs)(`button`,{className:`tab-btn ${m===`applications`?`active`:``}`,onClick:()=>{x(`applications`),Z()},children:[`My Applications `,n&&w.length>0&&`(${w.length})`]}),(0,b.jsxs)(`button`,{className:`tab-btn ${m===`inbox`?`active`:``}`,onClick:()=>{x(`inbox`),Q()},children:[`Inbox Notifications `,n&&E.length>0&&`(${E.length})`]})]}),m===`jobs`&&(0,b.jsx)(`div`,{className:`job-grid stagger-children`,children:S.map(e=>(0,b.jsxs)(`div`,{className:`job-card`,children:[(0,b.jsxs)(`div`,{className:`job-info`,children:[(0,b.jsxs)(`div`,{style:{display:`flex`,alignItems:`center`,gap:`8px`,marginBottom:`8px`},children:[(0,b.jsx)(`span`,{className:`badge dept`,children:e.department}),(0,b.jsxs)(`span`,{style:{fontSize:`0.8rem`,color:`var(--text-muted)`,display:`flex`,alignItems:`center`,gap:`4px`},children:[(0,b.jsx)(h,{size:12}),` Posted `,e.posted_date]})]}),(0,b.jsx)(`h3`,{style:{fontSize:`1.3rem`,fontWeight:800,marginBottom:`8px`},children:e.title}),(0,b.jsxs)(`p`,{style:{display:`flex`,alignItems:`center`,gap:`4px`,fontSize:`0.9rem`,color:`var(--text-secondary)`,marginBottom:`12px`},children:[(0,b.jsx)(l,{size:14}),` `,e.location]}),(0,b.jsx)(`p`,{style:{fontSize:`0.9rem`,color:`var(--text-secondary)`,lineHeight:`1.5`},children:e.description})]}),(0,b.jsx)(`div`,{className:`job-actions`,children:(0,b.jsxs)(`button`,{className:`btn-primary`,onClick:()=>{n?L(e):i(`/login?redirect=/careers`)},children:[`Apply Now `,(0,b.jsx)(c,{size:14})]})})]},e.id))}),m===`applications`&&(0,b.jsx)(`div`,{children:n?A?(0,b.jsx)(`div`,{style:{display:`flex`,justifyContent:`center`,padding:`48px`},children:(0,b.jsx)(f,{size:24,style:{animation:`spin 1s linear infinite`,color:`var(--brand-red)`}})}):w.length===0?(0,b.jsx)(`div`,{style:{textAlign:`center`,padding:`48px`,border:`1px dashed var(--border-medium)`,borderRadius:`12px`},children:(0,b.jsx)(`p`,{style:{color:`var(--text-secondary)`},children:`You haven't applied to any roles yet. View open positions to apply!`})}):(0,b.jsx)(`div`,{className:`job-grid`,children:w.map(t=>(0,b.jsxs)(`div`,{className:`job-card`,children:[(0,b.jsxs)(`div`,{className:`job-info`,children:[(0,b.jsxs)(`div`,{style:{display:`flex`,alignItems:`center`,gap:`8px`,marginBottom:`8px`},children:[(0,b.jsx)(`span`,{className:`badge dept`,children:t.department}),(0,b.jsxs)(`span`,{style:{fontSize:`0.8rem`,color:`var(--text-muted)`},children:[`Applied on `,t.appliedDate]})]}),(0,b.jsx)(`h3`,{style:{fontSize:`1.2rem`,fontWeight:800,marginBottom:`6px`},children:t.jobTitle}),(0,b.jsxs)(`p`,{style:{display:`flex`,alignItems:`center`,gap:`4px`,fontSize:`0.85rem`,color:`var(--text-secondary)`},children:[(0,b.jsx)(l,{size:12}),` `,t.location||`HQ`]}),(0,b.jsxs)(`a`,{href:t.resumeUrl,target:`_blank`,rel:`noreferrer`,style:{display:`inline-flex`,alignItems:`center`,gap:`4px`,fontSize:`0.8rem`,marginTop:`12px`,fontWeight:600},children:[(0,b.jsx)(u,{size:12}),` View Submitted Resume`]})]}),(0,b.jsx)(`div`,{children:(0,b.jsxs)(`div`,{style:{display:`flex`,flexDirection:`column`,alignItems:`flex-end`,gap:`6px`},children:[(0,b.jsx)(`span`,{style:{fontSize:`0.78rem`,color:`var(--text-muted)`,fontWeight:600},children:`Application Status`}),(0,b.jsx)(`span`,{className:`badge ${t.status.toLowerCase().includes(`applied`)?`applied`:t.status.toLowerCase().includes(`interview`)?`interview`:t.status.toLowerCase().includes(`offer`)?`offered`:`rejected`}`,style:{padding:`6px 12px`,fontSize:`0.8rem`},children:t.status}),(0,b.jsxs)(`button`,{onClick:()=>F(t.id),style:{background:`transparent`,color:`var(--brand-red)`,border:`1px solid var(--brand-red)`,padding:`6px 12px`,borderRadius:`4px`,fontSize:`0.75rem`,fontWeight:700,cursor:`pointer`,display:`flex`,alignItems:`center`,gap:`4px`,marginTop:`8px`},children:[(0,b.jsx)(e,{size:12}),` Chat with Recruiter`]})]})})]},t.id))}):(0,b.jsxs)(`div`,{style:{textAlign:`center`,padding:`48px`,border:`1px dashed var(--border-medium)`,borderRadius:`12px`},children:[(0,b.jsx)(s,{size:36,style:{color:`var(--brand-red)`,margin:`0 auto 12px`}}),(0,b.jsx)(`h3`,{children:`Sign in to track your applications`}),(0,b.jsx)(`p`,{style:{color:`var(--text-secondary)`,marginTop:`8px`,marginBottom:`16px`},children:`Log in with your ZingBite account to view and check statuses.`}),(0,b.jsx)(`button`,{className:`btn-primary`,style:{margin:`0 auto`},onClick:()=>i(`/login?redirect=/careers`),children:`Login to Account`})]})}),m===`inbox`&&(0,b.jsx)(`div`,{children:n?M?(0,b.jsx)(`div`,{style:{display:`flex`,justifyContent:`center`,padding:`48px`},children:(0,b.jsx)(f,{size:24,style:{animation:`spin 1s linear infinite`,color:`var(--brand-red)`}})}):E.length===0?(0,b.jsx)(`div`,{style:{textAlign:`center`,padding:`48px`,border:`1px dashed var(--border-medium)`,borderRadius:`12px`,background:`#fff`},children:(0,b.jsx)(`p`,{style:{color:`var(--text-secondary)`},children:`Your inbox is empty. We will email you here when your application status changes!`})}):(0,b.jsx)(`div`,{className:`inbox-list`,children:E.map(e=>(0,b.jsxs)(`div`,{className:`email-card`,children:[(0,b.jsxs)(`div`,{style:{display:`flex`,justifyContent:`space-between`,borderBottom:`1px solid var(--border-light)`,paddingBottom:`12px`,marginBottom:`12px`},children:[(0,b.jsxs)(`div`,{children:[(0,b.jsx)(`span`,{style:{fontSize:`0.8rem`,color:`var(--text-muted)`,fontWeight:600},children:`FROM: ZingBite Operations <careers@zingbite.com>`}),(0,b.jsx)(`h4`,{style:{fontSize:`1rem`,fontWeight:800,marginTop:`4px`,color:`var(--text-primary)`},children:e.subject})]}),(0,b.jsx)(`span`,{style:{fontSize:`0.78rem`,color:`var(--text-muted)`},children:e.sentDate})]}),(0,b.jsx)(`p`,{style:{fontSize:`0.9rem`,color:`var(--text-secondary)`,whiteSpace:`pre-line`,lineHeight:`1.6`},children:e.body})]},e.id))}):(0,b.jsxs)(`div`,{style:{textAlign:`center`,padding:`48px`,border:`1px dashed var(--border-medium)`,borderRadius:`12px`},children:[(0,b.jsx)(g,{size:36,style:{color:`var(--text-secondary)`,margin:`0 auto 12px`}}),(0,b.jsx)(`h3`,{children:`Sign in to view your inbox`}),(0,b.jsx)(`p`,{style:{color:`var(--text-secondary)`,marginTop:`8px`},children:`Log in to view email notifications generated for your account.`})]})})]}),I&&!H&&(0,b.jsx)(`div`,{className:`modal-overlay`,onClick:()=>L(null),children:(0,b.jsxs)(`div`,{className:`modal-content`,onClick:e=>e.stopPropagation(),children:[(0,b.jsx)(`h2`,{style:{fontSize:`1.4rem`,fontWeight:800,marginBottom:`8px`},children:`Apply for Position`}),(0,b.jsxs)(`p`,{style:{color:`var(--brand-red)`,fontWeight:700,fontSize:`0.95rem`,marginBottom:`20px`},children:[I.title,` — `,I.department]}),(0,b.jsxs)(`form`,{onSubmit:e=>{if(e.preventDefault(),!n){i(`/login?redirect=/careers`);return}if(!R.name||!R.email||!R.phone){d(`Please fill out all required fields.`,`warning`);return}q(String(Math.floor(1e3+Math.random()*9e3))),G(``),Y(``),U(!0)},children:[(0,b.jsxs)(`div`,{className:`form-group`,children:[(0,b.jsx)(`label`,{children:`Full Name *`}),(0,b.jsx)(`input`,{type:`text`,required:!0,placeholder:`Enter full name`,value:R.name,onChange:e=>z(t=>({...t,name:e.target.value}))})]}),(0,b.jsxs)(`div`,{className:`form-group`,children:[(0,b.jsx)(`label`,{children:`Email Address *`}),(0,b.jsx)(`input`,{type:`email`,required:!0,placeholder:`name@domain.com`,value:R.email,onChange:e=>z(t=>({...t,email:e.target.value}))})]}),(0,b.jsxs)(`div`,{className:`form-group`,children:[(0,b.jsx)(`label`,{children:`Phone Number *`}),(0,b.jsx)(`input`,{type:`tel`,required:!0,placeholder:`e.g. 9876543210`,value:R.phone,onChange:e=>z(t=>({...t,phone:e.target.value}))})]}),(0,b.jsxs)(`div`,{className:`form-group`,children:[(0,b.jsx)(`label`,{children:`Resume PDF Link (Optional)`}),(0,b.jsx)(`input`,{type:`url`,placeholder:`https://example.com/my-resume.pdf`,value:R.resumeUrl,onChange:e=>z(t=>({...t,resumeUrl:e.target.value}))})]}),(0,b.jsxs)(`div`,{style:{display:`flex`,justifyContent:`flex-end`,gap:`12px`,marginTop:`24px`},children:[(0,b.jsx)(`button`,{type:`button`,className:`btn-primary`,onClick:()=>L(null),style:{background:`#f0f0f0`,color:`var(--text-primary)`,border:`1px solid var(--border-medium)`},children:`Cancel`}),(0,b.jsxs)(`button`,{type:`submit`,className:`btn-primary`,children:[`Verify Credentials `,(0,b.jsx)(_,{size:14})]})]})]})]})}),H&&(0,b.jsx)(`div`,{className:`modal-overlay`,children:(0,b.jsxs)(`div`,{className:`modal-content`,style:{maxWidth:`400px`,textAlign:`center`,padding:`32px`},children:[(0,b.jsx)(v,{size:36,style:{color:`var(--brand-red)`,margin:`0 auto 12px`}}),(0,b.jsx)(`h2`,{style:{fontSize:`1.25rem`,fontWeight:800},children:`Verify Email & Mobile`}),(0,b.jsxs)(`p`,{style:{fontSize:`0.85rem`,color:`var(--text-secondary)`,marginTop:`8px`,lineHeight:`1.5`},children:[`We have simulated sending a verification OTP to `,(0,b.jsx)(`strong`,{children:R.email}),` and `,(0,b.jsx)(`strong`,{children:R.phone}),`.`]}),(0,b.jsxs)(`form`,{onSubmit:async e=>{if(e.preventDefault(),Y(``),W!==K){Y(`Invalid OTP code. Please enter the correct code shown below.`);return}V(!0);try{await r.post(`/api/careers`,{jobId:I.id,name:R.name,email:R.email,phone:R.phone,resumeUrl:R.resumeUrl||`https://zingbite.com/resumes/demo.pdf`}),d(`Verification successful! Application submitted successfully.`,`success`),U(!1),L(null),z(e=>({...e,resumeUrl:``})),await Z(),await Q()}catch{d(`Failed to submit application. Please try again.`,`error`)}finally{V(!1)}},style:{marginTop:`20px`},children:[(0,b.jsx)(`div`,{className:`form-group`,style:{marginWidth:`100px`,display:`inline-block`},children:(0,b.jsx)(`input`,{type:`text`,required:!0,maxLength:`4`,placeholder:`Enter 4-digit code`,value:W,onChange:e=>G(e.target.value),style:{textAlign:`center`,fontSize:`1.4rem`,letterSpacing:`8px`,fontWeight:800,width:`180px`,padding:`8px`}})}),J&&(0,b.jsx)(`div`,{style:{color:`var(--danger)`,fontSize:`0.8rem`,marginTop:`4px`,fontWeight:600},children:J}),(0,b.jsxs)(`div`,{style:{background:`var(--bg-surface)`,padding:`8px`,borderRadius:`4px`,fontSize:`0.8rem`,color:`var(--text-muted)`,marginTop:`12px`},children:[`DEMO SIMULATOR OTP CODE: `,(0,b.jsx)(`strong`,{children:K})]}),(0,b.jsxs)(`div`,{style:{display:`flex`,justifyContent:`center`,gap:`12px`,marginTop:`24px`},children:[(0,b.jsx)(`button`,{type:`button`,className:`btn-primary`,onClick:()=>U(!1),style:{background:`#f0f0f0`,color:`var(--text-primary)`,border:`1px solid var(--border-medium)`,padding:`10px 18px`},children:`Back`}),(0,b.jsx)(`button`,{type:`submit`,disabled:B,className:`btn-primary`,style:{padding:`10px 18px`},children:B?(0,b.jsx)(f,{size:16,style:{animation:`spin 1s linear infinite`}}):`Verify & Submit`})]})]})]})}),P&&(0,b.jsx)(t,{type:`application`,targetId:P,userId:n?.userID||n?.userId,userName:n?.userName||n?.username,receiverId:1,initialOpen:!0,onClose:()=>F(null)},P)]})};export{x as default};