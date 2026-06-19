import{c as e,g as t,l as n,n as r,p as i,t as a,u as o}from"./createLucideIcon-DINBtofy.js";import{t as s}from"./axios-DSK6k93e.js";import{t as c}from"./building-2-CQqJmMwZ.js";import{t as l}from"./chevron-down-CtzL1yNU.js";import{t as u}from"./phone-qPDRz1LS.js";import{t as d}from"./send-Drf-d725.js";import{D as f,b as p,d as m,f as h,p as g,r as _,w as v,x as y}from"./index-KKOKVewU.js";var b=a(`external-link`,[[`path`,{d:`M15 3h6v6`,key:`1q9fwt`}],[`path`,{d:`M10 14 21 3`,key:`gplh6r`}],[`path`,{d:`M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6`,key:`a6xqqp`}]]),x=t(i(),1),S=r(),C=x.memo(()=>{let{sectionId:t}=o(),r=e(),i=n(),{showAlert:a}=_(),C=t||r.pathname.replace(/^\/?(?:info\/)?/,``)||`about-us`,{user:w,updateUser:ee}=(0,x.useContext)(f),[T,E]=(0,x.useState)(!1),[D,O]=(0,x.useState)(!1),[k,A]=(0,x.useState)({name:``,email:``,subject:``,message:``}),[j,M]=(0,x.useState)(!1),[N,P]=(0,x.useState)({restName:``,owner:``,email:w?.email||``,phone:``,city:``,cuisine:``,address:``,licenseNo:``,aadhaarNo:``,gstNo:``}),[F,I]=(0,x.useState)(!1),[L,R]=(0,x.useState)({name:``,city:``,vehicle:`bike`,phone:``}),[z,B]=(0,x.useState)(!1),[V,H]=(0,x.useState)(typeof window<`u`&&!!window.L),U=(0,x.useRef)(null),W=(0,x.useRef)(null),G=(0,x.useRef)(null),[K,q]=(0,x.useState)(!1);(0,x.useEffect)(()=>{if(window.L){H(!0);return}let e=document.querySelector(`link[href*="leaflet.css"]`);e||(e=document.createElement(`link`),e.rel=`stylesheet`,e.href=`https://unpkg.com/leaflet@1.9.4/dist/leaflet.css`,document.head.appendChild(e));let t=document.querySelector(`script[src*="leaflet.js"]`);t||(t=document.createElement(`script`),t.src=`https://unpkg.com/leaflet@1.9.4/dist/leaflet.js`,t.async=!0,t.onload=()=>{let e=setInterval(()=>{window.L&&(H(!0),clearInterval(e))},50)},document.body.appendChild(t))},[]);let J=async(e,t)=>{q(!0);try{let n=await(await fetch(`https://nominatim.openstreetmap.org/reverse?format=json&lat=${e}&lon=${t}&zoom=18`)).json();if(n){let e=n.display_name||``,t=n.address?.city||n.address?.town||n.address?.village||n.address?.suburb||``;C===`partner-with-us`?P(n=>({...n,address:e,city:t})):C===`ride-with-us`&&R(n=>({...n,city:t||e}))}}catch(e){console.error(`Reverse geocoding error:`,e)}finally{q(!1)}},Y=()=>{if(!navigator.geolocation){a(`Geolocation is not supported by your browser.`,`error`);return}navigator.geolocation.getCurrentPosition(e=>{let{latitude:t,longitude:n}=e.coords;W.current&&(W.current.setView([t,n],16),G.current&&G.current.setLatLng([t,n])),J(t,n)},e=>{a(`Error retrieving location: `+e.message,`error`)})},X=(0,x.useCallback)(()=>{if(W.current){try{W.current.remove()}catch{}W.current=null,G.current=null}},[]);(0,x.useEffect)(()=>{let e=C===`partner-with-us`||C===`ride-with-us`;if(!V||!U.current||!e||!w||W.current)return;let t=window.L;if(!t)return;let n=12.9716,r=77.5946,i=t.map(U.current).setView([n,r],14);W.current=i,t.tileLayer(`https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png`,{maxZoom:19,attribution:`&copy; OpenStreetMap contributors`}).addTo(i);let a=t.divIcon({html:`<div style="font-size: 24px; text-align: center; line-height: 24px;">📍</div>`,className:`custom-info-marker`,iconSize:[24,24],iconAnchor:[12,12]}),o=t.marker([n,r],{icon:a,draggable:!0}).addTo(i);return G.current=o,o.on(`dragend`,()=>{let e=o.getLatLng();J(e.lat,e.lng)}),i.on(`click`,e=>{o.setLatLng(e.latlng),J(e.latlng.lat,e.latlng.lng)}),J(n,r),X},[V,C,w,X]),(0,x.useEffect)(()=>{w?.email&&(P(e=>e.email?e:{...e,email:w.email}),A(e=>e.email?e:{...e,email:w.email}),R(e=>e.name?e:{...e,name:w.name||``}))},[w?.email]);let[Z,te]=(0,x.useState)(null),[ne,re]=(0,x.useState)(!1),[Q,$]=(0,x.useState)(null);(0,x.useEffect)(()=>{if(C===`partner-with-us`){let e=document.getElementById(`partner-with-us-form`);if(e){setTimeout(()=>e.scrollIntoView({behavior:`smooth`,block:`start`}),100);return}}if(C===`ride-with-us`){let e=document.getElementById(`ride-with-us-form`);if(e){setTimeout(()=>e.scrollIntoView({behavior:`smooth`,block:`start`}),100);return}}window.scrollTo({top:0,behavior:`smooth`})},[C]);let ie=async e=>{e.preventDefault();try{await s.post(`/api/contact`,{name:k.name,email:k.email,subject:k.subject,message:k.message}),M(!0),setTimeout(()=>{A({name:``,email:``,subject:``,message:``}),M(!1)},4e3)}catch(e){a(e.response?.data?.error||`Failed to send message.`,`error`)}},ae=async e=>{if(e.preventDefault(),!w){a(`You must be logged in to apply as a partner`,`error`);return}if(!N.address||!N.licenseNo||!N.aadhaarNo||!N.gstNo){a(`Please fill out all required onboarding fields, including map location coordinates.`,`warning`);return}E(!0);try{(await s.post(`/api/restaurant-admin`,{action:`submitRestaurantRequest`,name:N.restName,owner:N.owner,email:N.email,phone:N.phone,city:N.city,cuisine:N.cuisine||`Multi-Cuisine`,address:N.address,deliveryTime:`30 mins`,imagePath:`https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?q=80&w=2070&auto=format&fit=crop`,licenseNo:N.licenseNo,aadhaarNo:N.aadhaarNo,gstNo:N.gstNo})).data.success&&(I(!0),a(`Partner request submitted! Pending admin approval.`,`success`))}catch(e){a(e.response?.data?.error||`Failed to submit partner application.`,`error`)}finally{E(!1)}},oe=async e=>{if(e.preventDefault(),!w){a(`You must be logged in to apply as a rider`,`error`);return}O(!0);try{let e=(await s.get(`/api/careers?action=jobs`)).data||[],t=e.find(e=>e.title&&e.title.toLowerCase().includes(`rider`));if(!t&&e.length>0&&(t=e[0]),!t)throw Error(`Delivery Rider position not found in careers listing.`);(await s.post(`/api/careers`,{action:`apply`,jobId:t.id,name:L.name,email:w.email,phone:L.phone,resumeUrl:`https://zingbite.com/resumes/rider_application.pdf`,city:L.city,vehicle:L.vehicle})).data.success&&(B(!0),a(`Rider application submitted! Pending admin approval.`,`success`))}catch(e){a(e.message||e.response?.data?.error||`Failed to submit rider application.`,`error`)}finally{O(!1)}},se=e=>{$(Q===e?null:e)};return(0,S.jsxs)(S.Fragment,{children:[(0,S.jsx)(`style`,{children:`
        .info-page-layout {
          max-width: 1200px;
          margin: 24px auto 48px;
          padding: 0 20px;
          background: rgba(255,255,255,0.96);
          border: 1px solid rgba(247,55,79,0.1);
          border-radius: var(--radius-md);
          padding: 32px;
          box-shadow: 0 12px 34px rgba(28,28,28,0.06);
          min-height: 500px;
        }

        /* Styles for inner content elements */
        .info-content-pane h2 {
          font-size: 2rem;
          margin-bottom: 12px;
          color: var(--text-primary);
        }
        .section-desc {
          color: var(--text-secondary);
          margin-bottom: 24px;
          font-size: 1.05rem;
          line-height: 1.6;
        }
        
        /* Hero inside sections */
        .section-hero {
          padding: 24px;
          border-radius: var(--radius-md);
          margin-bottom: 24px;
          border: 1px solid rgba(247,55,79,0.1);
        }
        .hero-badge {
          display: inline-block;
          font-size: 0.75rem;
          background: var(--brand-red);
          color: #fff;
          padding: 4px 10px;
          border-radius: 4px;
          font-weight: 700;
          margin-bottom: 12px;
        }
        .section-hero h2 {
          font-size: 1.6rem;
          margin-bottom: 8px;
        }
        
        .content-grid-2 {
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: 20px;
          margin-bottom: 32px;
        }
        .grid-card {
          border: 1px solid rgba(247,55,79,0.1);
          padding: 20px;
          border-radius: var(--radius-md);
          background: rgba(255,255,255,0.9);
        }
        .grid-card h3 {
          font-size: 1.25rem;
          margin-bottom: 8px;
          color: var(--brand-red);
        }
        .grid-card p {
          color: var(--text-secondary);
          font-size: 0.95rem;
          line-height: 1.6;
        }
        
        /* Stats */
        .stats-row {
          display: grid;
          grid-template-columns: repeat(4, 1fr);
          gap: 16px;
        }
        .stat-box {
          background: rgba(247,55,79,0.04);
          padding: 16px;
          text-align: center;
          border-radius: var(--radius-sm);
          border: 1px solid rgba(247,55,79,0.08);
        }
        .stat-box h4 {
          font-size: 1.8rem;
          color: var(--brand-red);
          margin-bottom: 4px;
        }
        .stat-box p {
          font-size: 0.85rem;
          color: var(--text-secondary);
          font-weight: 500;
        }

        /* Careers list */
        .jobs-list {
          display: flex;
          flex-direction: column;
          gap: 16px;
        }
        .job-card {
          display: flex;
          justify-content: space-between;
          align-items: center;
          padding: 20px;
          border: 1px solid rgba(247,55,79,0.1);
          border-radius: var(--radius-md);
          background: rgba(255,255,255,0.94);
          transition: border-color 0.2s;
        }
        .job-card:hover {
          border-color: var(--brand-red);
        }
        .job-main h4 {
          font-size: 1.15rem;
          margin-bottom: 6px;
        }
        .job-meta {
          display: flex;
          align-items: center;
          gap: 8px;
          color: var(--text-secondary);
          font-size: 0.85rem;
        }
        .job-meta .dot {
          width: 3px;
          height: 3px;
          background: var(--text-muted);
          border-radius: 50%;
        }
        .job-apply-btn {
          padding: 10px 16px;
          background: var(--brand-red);
          color: #fff;
          border: none;
          font-weight: 700;
          font-size: 0.9rem;
          border-radius: var(--radius-sm);
          cursor: pointer;
          transition: background 0.2s;
        }
        .job-apply-btn:hover {
          background: var(--brand-red-hover);
        }

        /* Team styles */
        .team-grid {
          display: grid;
          grid-template-columns: repeat(auto-fill, minmax(220px, 1fr));
          gap: 24px;
        }
        .team-card {
          text-align: center;
          padding: 24px 16px;
          border: 1px solid rgba(247,55,79,0.1);
          border-radius: var(--radius-md);
          background: rgba(255,255,255,0.94);
        }
        .team-avatar {
          width: 60px;
          height: 60px;
          border-radius: 50%;
          background: rgba(247,55,79,0.08);
          color: var(--brand-red);
          font-weight: 700;
          font-size: 1.25rem;
          display: flex;
          align-items: center;
          justify-content: center;
          margin: 0 auto 12px;
        }
        .team-card h4 {
          font-size: 1.1rem;
          margin-bottom: 2px;
        }
        .team-role {
          font-size: 0.85rem;
          color: var(--brand-red);
          font-weight: 600;
          display: block;
          margin-bottom: 12px;
        }
        .team-card p {
          font-size: 0.85rem;
          color: var(--text-secondary);
          line-height: 1.5;
        }

        /* Blog styles */
        .blog-grid {
          display: flex;
          flex-direction: column;
          gap: 24px;
        }
        .blog-card {
          padding-bottom: 20px;
          border-bottom: 1px solid var(--border-light);
        }
        .blog-meta {
          font-size: 0.8rem;
          color: var(--text-muted);
          font-weight: 600;
          text-transform: uppercase;
        }
        .blog-card h4 {
          font-size: 1.3rem;
          margin: 6px 0 8px;
        }
        .blog-card p {
          color: var(--text-secondary);
          font-size: 0.95rem;
          line-height: 1.6;
          margin-bottom: 12px;
        }
        .blog-link {
          display: inline-flex;
          align-items: center;
          gap: 4px;
          font-weight: 600;
          font-size: 0.9rem;
        }

        /* FAQ Accordion */
        .faq-list {
          display: flex;
          flex-direction: column;
          gap: 12px;
        }
        .faq-item {
          border: 1px solid rgba(247,55,79,0.1);
          border-radius: var(--radius-sm);
          overflow: hidden;
          background: rgba(255,255,255,0.94);
        }
        .faq-question {
          width: 100%;
          padding: 18px 20px;
          text-align: left;
          background: transparent;
          border: none;
          display: flex;
          justify-content: space-between;
          align-items: center;
          font-size: 1rem;
          font-weight: 600;
          color: var(--text-primary);
          cursor: pointer;
          transition: background 0.2s;
        }
        .faq-question:hover {
          background: rgba(247,55,79,0.04);
        }
        .faq-chevron {
          transition: transform 0.25s ease;
          color: var(--text-muted);
        }
        .faq-item.open .faq-chevron {
          transform: rotate(180deg);
          color: var(--brand-red);
        }
        .faq-answer {
          max-height: 0;
          overflow: hidden;
          transition: max-height 0.25s cubic-bezier(0.25, 0.1, 0.25, 1);
          background: rgba(247,55,79,0.035);
        }
        .faq-item.open .faq-answer {
          max-height: 200px;
          border-top: 1px solid var(--border-light);
        }
        .faq-answer p {
          padding: 16px 20px;
          font-size: 0.95rem;
          color: var(--text-secondary);
          line-height: 1.6;
        }

        /* Contact & Partner Form */
        .contact-split {
          display: grid;
          grid-template-columns: 1fr 1.2fr;
          gap: 40px;
        }
        .contact-info h3 {
          font-size: 1.25rem;
          margin-bottom: 20px;
        }
        .contact-row {
          display: flex;
          gap: 16px;
          margin-bottom: 20px;
          align-items: flex-start;
        }
        .contact-row p {
          color: var(--text-secondary);
          font-size: 0.95rem;
          margin-top: 2px;
          line-height: 1.5;
        }
        .benefits-list {
          list-style: none;
        }
        .benefits-list li {
          margin-bottom: 16px;
          padding-left: 24px;
          position: relative;
          line-height: 1.6;
          font-size: 0.95rem;
          color: var(--text-secondary);
        }
        .benefits-list li::before {
          content: '✓';
          position: absolute;
          left: 0;
          color: var(--brand-red);
          font-weight: bold;
        }
        .info-form {
          display: flex;
          flex-direction: column;
          gap: 16px;
        }
        .form-group {
          display: flex;
          flex-direction: column;
          gap: 6px;
        }
        .form-group label {
          font-size: 0.85rem;
          font-weight: 600;
          color: var(--text-secondary);
        }
        .form-group input, 
        .form-group textarea {
          width: 100%;
          padding: 12px;
          border: 1px solid rgba(247,55,79,0.12);
          border-radius: var(--radius-sm);
          font-family: inherit;
          font-size: 0.95rem;
          outline: none;
          transition: border-color 0.2s;
        }
        .form-group input:focus, 
        .form-group textarea:focus {
          border-color: var(--brand-red);
        }
        .form-submit-btn {
          display: inline-flex;
          align-items: center;
          justify-content: center;
          gap: 8px;
          width: 100%;
          padding: 14px;
          background: var(--brand-red);
          color: #fff;
          border: none;
          font-weight: 700;
          border-radius: var(--radius-sm);
          cursor: pointer;
          transition: background 0.2s;
        }
        .form-submit-btn:hover {
          background: var(--brand-red-hover);
        }
        .form-success {
          text-align: center;
          padding: 40px 20px;
          display: flex;
          flex-direction: column;
          align-items: center;
          gap: 12px;
          border: 1px solid rgba(96, 178, 70, 0.18);
          border-radius: var(--radius-md);
          background: rgba(96, 178, 70, 0.03);
        }
        .form-success h3 {
          font-size: 1.3rem;
          color: var(--success);
        }
        .form-success p {
          color: var(--text-secondary);
          font-size: 0.95rem;
        }

        /* Legal Policy Styling */
        .legal-text h3 {
          font-size: 1.25rem;
          margin: 24px 0 10px;
          color: var(--text-primary);
        }
        .legal-text p {
          color: var(--text-secondary);
          line-height: 1.7;
          font-size: 0.95rem;
          margin-bottom: 16px;
        }
        .last-updated {
          display: block;
          font-size: 0.85rem;
          color: var(--text-muted);
          margin-bottom: 20px;
          font-style: italic;
        }
        
        .toast-notification {
          position: fixed;
          bottom: 24px;
          right: 24px;
          background: #1a1a1a;
          color: #fff;
          padding: 12px 24px;
          border-radius: var(--radius-sm);
          box-shadow: 0 10px 30px rgba(0,0,0,0.25);
          display: flex;
          align-items: center;
          gap: 10px;
          font-size: 0.95rem;
          z-index: 1000;
          animation: slideUp 0.3s cubic-bezier(0.25, 0.1, 0.25, 1) both;
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
        .job-card, .grid-card, .team-card, .stat-box {
          transition: all 0.3s var(--ease-premium);
        }
        .job-card:hover, .grid-card:hover, .team-card:hover {
          transform: translateY(-3px);
          box-shadow: 0 12px 28px rgba(28,28,28,0.08);
          border-color: rgba(247,55,79,0.2);
        }
        .info-content-pane {
          position: relative;
          overflow: hidden;
        }
        .info-content-pane::before {
          content: '';
          position: absolute;
          top: 0;
          left: 0;
          right: 0;
          height: 4px;
          background: linear-gradient(90deg, var(--brand-red), #ff6b8b, var(--brand-red));
          opacity: 0.6;
        }
        .job-apply-btn, .form-submit-btn {
          position: relative;
          overflow: hidden;
        }
        .job-apply-btn:hover, .form-submit-btn:hover {
          transform: translateY(-1px);
          box-shadow: 0 6px 16px rgba(247,55,79,0.25);
        }
        .section-hero {
          position: relative;
          overflow: hidden;
          background: linear-gradient(135deg, rgba(247,55,79,0.03), rgba(247,55,79,0.08));
        }
        .faq-item {
          transition: all 0.3s var(--ease-premium);
        }
        .faq-item:hover {
          border-color: rgba(247,55,79,0.2);
          box-shadow: 0 4px 12px rgba(28,28,28,0.04);
        }
        @media (max-width: 768px) {
          .contact-split {
            grid-template-columns: 1fr;
            gap: 32px;
          }
          .stats-row {
            grid-template-columns: 1fr 1fr;
          }
          .content-grid-2 {
            grid-template-columns: 1fr;
          }
          .info-content-pane h2 {
            font-size: 1.6rem;
          }
          .job-card {
            flex-direction: column;
            align-items: flex-start;
            gap: 16px;
          }
          .job-apply-btn {
            width: 100%;
          }
        }
      `}),(0,S.jsx)(`main`,{className:`info-page-layout fade-in page-enter`,children:(()=>{switch(C){case`about-us`:return(0,S.jsxs)(`div`,{className:`info-content-pane`,children:[(0,S.jsxs)(`div`,{className:`section-hero`,style:{background:`linear-gradient(135deg, rgba(247,55,79,0.08) 0%, rgba(255,255,255,1) 100%)`},children:[(0,S.jsx)(`span`,{className:`hero-badge`,children:`OUR STORY`}),(0,S.jsx)(`h2`,{children:`Delivering Happiness, One Bite at a Time`}),(0,S.jsx)(`p`,{children:`Founded in 2026, ZingBite is local community-centric food delivery reimagined. We bridge the gap between hungry food lovers and local culinary spots with speed, quality, and care.`})]}),(0,S.jsxs)(`div`,{className:`content-grid-2`,children:[(0,S.jsxs)(`div`,{className:`grid-card`,children:[(0,S.jsx)(`h3`,{children:`Our Mission`}),(0,S.jsx)(`p`,{children:`To empower local restaurants to reach more food lovers while providing a seamless, reliable, and premium food delivery experience for our users.`})]}),(0,S.jsxs)(`div`,{className:`grid-card`,children:[(0,S.jsx)(`h3`,{children:`Our Vision`}),(0,S.jsx)(`p`,{children:`To become the most loved and respected food technology network, recognized for our commitment to quality, community values, and technological innovation.`})]})]}),(0,S.jsxs)(`div`,{className:`stats-row`,children:[(0,S.jsxs)(`div`,{className:`stat-box`,children:[(0,S.jsx)(`h4`,{children:`500+`}),(0,S.jsx)(`p`,{children:`Partner Restaurants`})]}),(0,S.jsxs)(`div`,{className:`stat-box`,children:[(0,S.jsx)(`h4`,{children:`150K+`}),(0,S.jsx)(`p`,{children:`Completed Deliveries`})]}),(0,S.jsxs)(`div`,{className:`stat-box`,children:[(0,S.jsx)(`h4`,{children:`25 Mins`}),(0,S.jsx)(`p`,{children:`Average Delivery Time`})]}),(0,S.jsxs)(`div`,{className:`stat-box`,children:[(0,S.jsx)(`h4`,{children:`4.8 ★`}),(0,S.jsx)(`p`,{children:`App Rating`})]})]})]});case`careers`:return(0,S.jsxs)(`div`,{className:`info-content-pane`,children:[(0,S.jsx)(`h2`,{children:`Careers at ZingBite`}),(0,S.jsx)(`p`,{className:`section-desc`,children:`We are always looking for passionate, driven, and creative individuals to join our team and build the future of food tech.`}),(0,S.jsx)(`div`,{className:`jobs-list`,children:[{id:1,title:`Senior Frontend Engineer (React)`,dept:`Engineering`,loc:`Remote / Bangalore`,salary:`₹18L - ₹24L`},{id:2,title:`Product Designer (UX/UI)`,dept:`Design`,loc:`Hybrid (Delhi/NCR)`,salary:`₹12L - ₹16L`},{id:3,title:`Logistics Operations Lead`,dept:`Operations`,loc:`On-site (Mumbai)`,salary:`₹8L - ₹11L`},{id:4,title:`Customer Support Executive`,dept:`Customer Care`,loc:`Remote`,salary:`₹4L - ₹6L`}].map(e=>(0,S.jsxs)(`div`,{className:`job-card`,children:[(0,S.jsxs)(`div`,{className:`job-main`,children:[(0,S.jsx)(`h4`,{children:e.title}),(0,S.jsxs)(`div`,{className:`job-meta`,children:[(0,S.jsx)(`span`,{children:e.dept}),(0,S.jsx)(`span`,{className:`dot`}),(0,S.jsx)(`span`,{children:e.loc}),(0,S.jsx)(`span`,{className:`dot`}),(0,S.jsx)(`span`,{children:e.salary})]})]}),(0,S.jsx)(`button`,{onClick:()=>i(`/careers`),className:`job-apply-btn`,children:`Apply Now`})]},e.id))}),Z&&(0,S.jsxs)(`div`,{className:`toast-notification`,children:[(0,S.jsx)(p,{size:16}),` Applied for `,(0,S.jsx)(`strong`,{children:Z}),` position!`]})]});case`team`:return(0,S.jsxs)(`div`,{className:`info-content-pane`,children:[(0,S.jsx)(`h2`,{children:`Meet Our Leadership`}),(0,S.jsx)(`p`,{className:`section-desc`,children:`The dedicated dreamers and makers steering ZingBite towards new culinary heights.`}),(0,S.jsx)(`div`,{className:`team-grid`,children:[{name:`Sreenivas Dasari`,role:`Co-Founder & CEO`,desc:`Tech visionary and food enthusiast with 10+ years of tech-firm scaling experience.`},{name:`Priya Sharma`,role:`Chief Technology Officer`,desc:`Former staff engineer at major delivery platforms, leading our high-performance React-Java stack.`},{name:`Vikram Malhotra`,role:`Head of Culinary Partnerships`,desc:`Culinary arts graduate dedicated to bringing the best local gems onto the ZingBite grid.`},{name:`Amit Patel`,role:`VP of Logistics & Operations`,desc:`Operations mastermind ensuring our delivery fleet is optimized, secure, and fast.`}].map((e,t)=>(0,S.jsxs)(`div`,{className:`team-card`,children:[(0,S.jsx)(`div`,{className:`team-avatar`,children:e.name.split(` `).map(e=>e[0]).join(``)}),(0,S.jsx)(`h4`,{children:e.name}),(0,S.jsx)(`span`,{className:`team-role`,children:e.role}),(0,S.jsx)(`p`,{children:e.desc})]},t))})]});case`blog`:return(0,S.jsxs)(`div`,{className:`info-content-pane`,children:[(0,S.jsx)(`h2`,{children:`ZingBite Blog`}),(0,S.jsx)(`p`,{className:`section-desc`,children:`Stories, recipes, product insights, and news from our food ecosystem.`}),(0,S.jsx)(`div`,{className:`blog-grid`,children:[{title:`Top 10 Food Trends Redefining Delivery in 2026`,read:`5 min read`,date:`June 01, 2026`,desc:`Explore the culinary landscape of 2026, from eco-packaging to regional gourmet selections.`},{title:`Behind the Technology: Scaling Real-time API Tracking`,read:`8 min read`,date:`May 28, 2026`,desc:`An engineering deep-dive on how we handle sub-second rider location updates using WebSocket connections.`},{title:`Savoring Sustainability: Reducing Single-Use Plastic`,read:`4 min read`,date:`May 15, 2026`,desc:`How ZingBite partnered with 100+ vendors to pioneer compostable packaging options in local regions.`}].map((e,t)=>(0,S.jsxs)(`article`,{className:`blog-card`,children:[(0,S.jsxs)(`span`,{className:`blog-meta`,children:[e.date,` • `,e.read]}),(0,S.jsx)(`h4`,{children:e.title}),(0,S.jsx)(`p`,{children:e.desc}),(0,S.jsxs)(`button`,{onClick:()=>i(`/blog`),className:`blog-link`,children:[`Read Article `,(0,S.jsx)(b,{size:14})]})]},t))})]});case`help-faq`:return(0,S.jsxs)(`div`,{className:`info-content-pane`,children:[(0,S.jsx)(`h2`,{children:`Help & Support`}),(0,S.jsx)(`p`,{className:`section-desc`,children:`Frequently Asked Questions. If you can't find your answer here, please contact customer support.`}),(0,S.jsx)(`div`,{className:`faq-list`,children:[{q:`How do I place an order on ZingBite?`,a:`To order, search for a restaurant on the Home page, browse their menu, select your food, add them to your cart, click Proceed to Pay, enter your address, and complete payment using your credit/debit card, UPI, or cash.`},{q:`What payment methods do you support?`,a:`We support major Credit and Debit cards (Visa/Mastercard/RuPay), UPI (GPay, PhonePe, Paytm), Netbanking, and Cash on Delivery (COD) for selected restaurants.`},{q:`How can I track my delivery in real-time?`,a:`Once your order is confirmed, you will receive real-time status updates on the dashboard from 'Order Accepted' to 'Out for Delivery' with rider tracking.`},{q:`What is your cancellation policy?`,a:`You can cancel your order within 60 seconds of placing it. After the restaurant accepts your order, cancellations are subject to a fee to compensate for prepared food and rider resources.`},{q:`How do I update my profile details?`,a:`Log into your account, click on your profile/user icon in the Header, and update your delivery address or contact number.`}].map((e,t)=>(0,S.jsxs)(`div`,{className:`faq-item ${Q===t?`open`:``}`,children:[(0,S.jsxs)(`button`,{onClick:()=>se(t),className:`faq-question`,children:[(0,S.jsx)(`span`,{children:e.q}),(0,S.jsx)(l,{size:18,className:`faq-chevron`})]}),(0,S.jsx)(`div`,{className:`faq-answer`,children:(0,S.jsx)(`p`,{children:e.a})})]},t))})]});case`contact-us`:return(0,S.jsxs)(`div`,{className:`info-content-pane`,children:[(0,S.jsx)(`h2`,{children:`Contact Us`}),(0,S.jsx)(`p`,{className:`section-desc`,children:`Have a question, feedback, or need help? Reach out to us, and we will get back to you as soon as possible.`}),(0,S.jsxs)(`div`,{className:`contact-split`,children:[(0,S.jsxs)(`div`,{className:`contact-info`,children:[(0,S.jsx)(`h3`,{children:`Contact Information`}),(0,S.jsxs)(`div`,{className:`contact-row`,children:[(0,S.jsx)(m,{size:18,color:`var(--brand-red)`}),(0,S.jsxs)(`div`,{children:[(0,S.jsx)(`strong`,{children:`Headquarters`}),(0,S.jsx)(`p`,{children:`12th Floor, Tech Park Towers, Indiranagar, Bangalore, Karnataka - 560038`})]})]}),(0,S.jsxs)(`div`,{className:`contact-row`,children:[(0,S.jsx)(h,{size:18,color:`var(--brand-red)`}),(0,S.jsxs)(`div`,{children:[(0,S.jsx)(`strong`,{children:`Support Email`}),(0,S.jsx)(`p`,{children:`support@zingbite.com`})]})]}),(0,S.jsxs)(`div`,{className:`contact-row`,children:[(0,S.jsx)(u,{size:18,color:`var(--brand-red)`}),(0,S.jsxs)(`div`,{children:[(0,S.jsx)(`strong`,{children:`Helpline`}),(0,S.jsx)(`p`,{children:`+91 80 4455 6677 (9 AM - 11 PM)`})]})]})]}),(0,S.jsx)(`div`,{className:`contact-form-container`,children:j?(0,S.jsxs)(`div`,{className:`form-success`,children:[(0,S.jsx)(p,{size:32,color:`var(--success)`}),(0,S.jsx)(`h3`,{children:`Message Sent!`}),(0,S.jsx)(`p`,{children:`Thank you for reaching out. A support agent will contact you shortly.`})]}):(0,S.jsxs)(`form`,{onSubmit:ie,className:`info-form`,children:[(0,S.jsxs)(`div`,{className:`form-group`,children:[(0,S.jsx)(`label`,{children:`Your Name`}),(0,S.jsx)(`input`,{type:`text`,required:!0,value:k.name,onChange:e=>A({...k,name:e.target.value})})]}),(0,S.jsxs)(`div`,{className:`form-group`,children:[(0,S.jsx)(`label`,{children:`Email Address`}),(0,S.jsx)(`input`,{type:`email`,required:!0,value:k.email,onChange:e=>A({...k,email:e.target.value})})]}),(0,S.jsxs)(`div`,{className:`form-group`,children:[(0,S.jsx)(`label`,{children:`Subject`}),(0,S.jsx)(`input`,{type:`text`,required:!0,value:k.subject,onChange:e=>A({...k,subject:e.target.value})})]}),(0,S.jsxs)(`div`,{className:`form-group`,children:[(0,S.jsx)(`label`,{children:`Message`}),(0,S.jsx)(`textarea`,{rows:4,required:!0,value:k.message,onChange:e=>A({...k,message:e.target.value})})]}),(0,S.jsxs)(`button`,{type:`submit`,className:`form-submit-btn`,children:[(0,S.jsx)(d,{size:16}),` SEND MESSAGE`]})]})})]})]});case`partner-with-us`:return(0,S.jsxs)(`div`,{className:`info-content-pane`,children:[(0,S.jsx)(`h2`,{children:`Partner With Us`}),(0,S.jsx)(`p`,{className:`section-desc`,children:`Join ZingBite as a restaurant partner to reach thousands of local customers, streamline operations, and scale your brand.`}),(0,S.jsxs)(`div`,{className:`contact-split`,children:[(0,S.jsxs)(`div`,{className:`contact-info`,children:[(0,S.jsx)(`h3`,{children:`Why Partner with Us?`}),(0,S.jsxs)(`ul`,{className:`benefits-list`,children:[(0,S.jsxs)(`li`,{children:[(0,S.jsx)(`strong`,{children:`Increase Sales:`}),` Tap into our wide network of active diners looking for delicious meals.`]}),(0,S.jsxs)(`li`,{children:[(0,S.jsx)(`strong`,{children:`Dedicated Logistics:`}),` Focus on preparing culinary delicacies while we handle the delivery.`]}),(0,S.jsxs)(`li`,{children:[(0,S.jsx)(`strong`,{children:`Growth Insights:`}),` Gain access to custom dashboards to analyze sales, metrics, and trends.`]})]})]}),(0,S.jsx)(`div`,{className:`contact-form-container`,id:`partner-with-us-form`,children:w?F?(0,S.jsxs)(`div`,{className:`form-success`,style:{textAlign:`center`,padding:`32px 20px`,background:`var(--bg-surface)`,border:`1px solid var(--border-medium)`,borderRadius:`var(--radius-md)`},children:[(0,S.jsx)(p,{size:48,style:{color:`var(--success)`,margin:`0 auto 16px`}}),(0,S.jsx)(`h3`,{style:{fontSize:`1.4rem`,fontWeight:800,marginBottom:`8px`},children:`Application Submitted!`}),(0,S.jsx)(`p`,{style:{color:`var(--text-secondary)`,marginBottom:`24px`,lineHeight:1.5},children:`Our merchant team will review your application and reach out within 2 business days.`}),(0,S.jsx)(`button`,{type:`button`,onClick:()=>i(`/`),className:`form-submit-btn`,style:{display:`inline-block`,textDecoration:`none`,textAlign:`center`,width:`auto`,padding:`12px 28px`,fontWeight:700,border:`none`,cursor:`pointer`,color:`#fff`},children:`Back to Home`})]}):(0,S.jsxs)(`form`,{onSubmit:ae,className:`info-form`,children:[(0,S.jsxs)(`div`,{className:`form-group`,children:[(0,S.jsx)(`label`,{children:`Restaurant Name`}),(0,S.jsx)(`input`,{type:`text`,required:!0,value:N.restName,onChange:e=>P({...N,restName:e.target.value})})]}),(0,S.jsxs)(`div`,{className:`form-group`,children:[(0,S.jsx)(`label`,{children:`Owner Name`}),(0,S.jsx)(`input`,{type:`text`,required:!0,value:N.owner,onChange:e=>P({...N,owner:e.target.value})})]}),(0,S.jsxs)(`div`,{className:`form-group`,children:[(0,S.jsx)(`label`,{children:`Cuisine Type`}),(0,S.jsx)(`input`,{type:`text`,required:!0,placeholder:`e.g., Chinese, Italian, Indian`,value:N.cuisine,onChange:e=>P({...N,cuisine:e.target.value})})]}),(0,S.jsxs)(`div`,{className:`form-group`,children:[(0,S.jsx)(`label`,{children:`Email Address`}),(0,S.jsx)(`input`,{type:`email`,required:!0,value:N.email,onChange:e=>P({...N,email:e.target.value})})]}),(0,S.jsxs)(`div`,{className:`form-group`,children:[(0,S.jsx)(`label`,{children:`Mobile Number`}),(0,S.jsx)(`input`,{type:`tel`,required:!0,value:N.phone,onChange:e=>P({...N,phone:e.target.value})})]}),(0,S.jsxs)(`div`,{className:`form-row-3`,style:{display:`grid`,gridTemplateColumns:`repeat(3, 1fr)`,gap:`10px`},children:[(0,S.jsxs)(`div`,{className:`form-group`,children:[(0,S.jsx)(`label`,{children:`License No`}),(0,S.jsx)(`input`,{type:`text`,required:!0,placeholder:`FSSAI License`,value:N.licenseNo,onChange:e=>P({...N,licenseNo:e.target.value})})]}),(0,S.jsxs)(`div`,{className:`form-group`,children:[(0,S.jsx)(`label`,{children:`Aadhaar No`}),(0,S.jsx)(`input`,{type:`text`,required:!0,placeholder:`Owner Aadhaar`,value:N.aadhaarNo,onChange:e=>P({...N,aadhaarNo:e.target.value})})]}),(0,S.jsxs)(`div`,{className:`form-group`,children:[(0,S.jsx)(`label`,{children:`GST Number`}),(0,S.jsx)(`input`,{type:`text`,required:!0,placeholder:`GSTIN`,value:N.gstNo,onChange:e=>P({...N,gstNo:e.target.value})})]})]}),(0,S.jsxs)(`div`,{className:`form-group`,children:[(0,S.jsx)(`label`,{children:`Restaurant Address`}),(0,S.jsx)(`input`,{type:`text`,required:!0,placeholder:`Select location or enter manually`,value:N.address,onChange:e=>P({...N,address:e.target.value})})]}),(0,S.jsxs)(`div`,{style:{marginTop:`8px`,display:`flex`,flexDirection:`column`,gap:`8px`,marginBottom:`16px`},children:[(0,S.jsxs)(`button`,{type:`button`,onClick:Y,style:{alignSelf:`flex-start`,padding:`8px 14px`,fontSize:`0.8rem`,fontWeight:700,background:`var(--brand-red)`,color:`white`,border:`none`,borderRadius:`4px`,cursor:`pointer`,display:`flex`,alignItems:`center`,gap:`4px`},children:[(0,S.jsx)(m,{size:12}),` `,K?`Detecting Location...`:`Auto-Detect Restaurant Location`]}),(0,S.jsx)(`div`,{ref:U,style:{height:`180px`,borderRadius:`var(--radius-sm)`,border:`1px solid var(--border-medium)`,zIndex:1}})]}),(0,S.jsx)(`button`,{type:`submit`,className:`form-submit-btn`,disabled:T,children:T?(0,S.jsxs)(S.Fragment,{children:[(0,S.jsx)(g,{size:16,style:{animation:`spin 1s linear infinite`,display:`inline-block`,verticalAlign:`middle`,marginRight:`6px`}}),` Registering...`]}):(0,S.jsxs)(S.Fragment,{children:[(0,S.jsx)(c,{size:16}),` REGISTER RESTAURANT`]})})]}):(0,S.jsxs)(`div`,{className:`login-prompt-card`,style:{padding:`32px 20px`,border:`2px dashed var(--border-medium)`,borderRadius:`var(--radius-md)`,textAlign:`center`,background:`var(--bg-surface)`},children:[(0,S.jsx)(y,{size:36,style:{color:`var(--brand-red)`,margin:`0 auto 12px`}}),(0,S.jsx)(`h4`,{style:{fontSize:`1.15rem`,fontWeight:700,marginBottom:`8px`,color:`var(--text-primary)`},children:`Login Required`}),(0,S.jsx)(`p`,{style:{fontSize:`0.9rem`,color:`var(--text-secondary)`,marginBottom:`20px`,lineHeight:`1.5`},children:`Please log in with your ZingBite account to register a restaurant.`}),(0,S.jsx)(`button`,{type:`button`,onClick:()=>i(`/login?redirect=/partner-with-us`),className:`form-submit-btn`,style:{display:`inline-block`,textDecoration:`none`,textAlign:`center`,width:`auto`,padding:`10px 24px`,fontWeight:600,border:`none`,cursor:`pointer`,color:`#fff`},children:`Log In to Apply`})]})})]})]});case`ride-with-us`:return(0,S.jsxs)(`div`,{className:`info-content-pane`,children:[(0,S.jsx)(`h2`,{children:`Ride With Us`}),(0,S.jsx)(`p`,{className:`section-desc`,children:`Join our fleet as a delivery partner. Get flexible work hours, attractive weekly payouts, and insurance coverage.`}),(0,S.jsxs)(`div`,{className:`contact-split`,children:[(0,S.jsxs)(`div`,{className:`contact-info`,children:[(0,S.jsx)(`h3`,{children:`Delivery Partner Perks`}),(0,S.jsxs)(`ul`,{className:`benefits-list`,children:[(0,S.jsxs)(`li`,{children:[(0,S.jsx)(`strong`,{children:`Weekly Earnings:`}),` Direct deposit of your delivery earnings plus tips into your bank account.`]}),(0,S.jsxs)(`li`,{children:[(0,S.jsx)(`strong`,{children:`Flexible Schedule:`}),` Choose your own shifts (Part-time, Full-time, Weekends only).`]}),(0,S.jsxs)(`li`,{children:[(0,S.jsx)(`strong`,{children:`Insurance Cover:`}),` Group medical and accident cover for active delivery partners.`]})]})]}),(0,S.jsx)(`div`,{className:`contact-form-container`,id:`ride-with-us-form`,children:w?z?(0,S.jsxs)(`div`,{className:`form-success`,style:{textAlign:`center`,padding:`32px 20px`,background:`var(--bg-surface)`,border:`1px solid var(--border-medium)`,borderRadius:`var(--radius-md)`},children:[(0,S.jsx)(p,{size:48,style:{color:`var(--success)`,margin:`0 auto 16px`}}),(0,S.jsx)(`h3`,{style:{fontSize:`1.4rem`,fontWeight:800,marginBottom:`8px`},children:`Rider Registration Initiated!`}),(0,S.jsx)(`p`,{style:{color:`var(--text-secondary)`,marginBottom:`24px`,lineHeight:1.5},children:`We've sent onboarding details to your phone number. You can track your application status in the Career Portal.`}),(0,S.jsx)(`button`,{type:`button`,onClick:()=>i(`/careers`),className:`form-submit-btn`,style:{display:`inline-block`,textDecoration:`none`,textAlign:`center`,width:`auto`,padding:`12px 28px`,fontWeight:700,border:`none`,cursor:`pointer`,color:`#fff`},children:`View Application Status`})]}):(0,S.jsxs)(`form`,{onSubmit:oe,className:`info-form`,children:[(0,S.jsxs)(`div`,{className:`form-group`,children:[(0,S.jsx)(`label`,{children:`Full Name`}),(0,S.jsx)(`input`,{type:`text`,required:!0,value:L.name,onChange:e=>R({...L,name:e.target.value})})]}),(0,S.jsxs)(`div`,{className:`form-group`,children:[(0,S.jsx)(`label`,{children:`Mobile Number`}),(0,S.jsx)(`input`,{type:`tel`,required:!0,value:L.phone,onChange:e=>R({...L,phone:e.target.value})})]}),(0,S.jsxs)(`div`,{className:`form-group`,children:[(0,S.jsx)(`label`,{children:`City / Hub Area`}),(0,S.jsx)(`input`,{type:`text`,required:!0,placeholder:`Select location or enter manually`,value:L.city,onChange:e=>R({...L,city:e.target.value})})]}),(0,S.jsxs)(`div`,{style:{marginTop:`8px`,display:`flex`,flexDirection:`column`,gap:`8px`,marginBottom:`16px`},children:[(0,S.jsxs)(`button`,{type:`button`,onClick:Y,style:{alignSelf:`flex-start`,padding:`8px 14px`,fontSize:`0.8rem`,fontWeight:700,background:`var(--brand-red)`,color:`white`,border:`none`,borderRadius:`4px`,cursor:`pointer`,display:`flex`,alignItems:`center`,gap:`4px`},children:[(0,S.jsx)(m,{size:12}),` `,K?`Detecting Location...`:`Auto-Detect City Area`]}),(0,S.jsx)(`div`,{ref:U,style:{height:`150px`,borderRadius:`var(--radius-sm)`,border:`1px solid var(--border-medium)`,zIndex:1}})]}),(0,S.jsxs)(`div`,{className:`form-group`,children:[(0,S.jsx)(`label`,{children:`Vehicle Type`}),(0,S.jsxs)(`select`,{value:L.vehicle,onChange:e=>R({...L,vehicle:e.target.value}),className:`premium-select`,style:{width:`100%`},children:[(0,S.jsx)(`option`,{value:`bike`,children:`Bicycle / Electric Cycle`}),(0,S.jsx)(`option`,{value:`motorcycle`,children:`Motorcycle / Scooter`}),(0,S.jsx)(`option`,{value:`walk`,children:`On Foot (Selected zones)`})]})]}),(0,S.jsx)(`button`,{type:`submit`,className:`form-submit-btn`,disabled:D,children:D?(0,S.jsxs)(S.Fragment,{children:[(0,S.jsx)(g,{size:16,style:{animation:`spin 1s linear infinite`,display:`inline-block`,verticalAlign:`middle`,marginRight:`6px`}}),` Applying...`]}):(0,S.jsxs)(S.Fragment,{children:[(0,S.jsx)(v,{size:16}),` APPLY AS RIDER`]})})]}):(0,S.jsxs)(`div`,{className:`login-prompt-card`,style:{padding:`32px 20px`,border:`2px dashed var(--border-medium)`,borderRadius:`var(--radius-md)`,textAlign:`center`,background:`var(--bg-surface)`},children:[(0,S.jsx)(y,{size:36,style:{color:`var(--brand-red)`,margin:`0 auto 12px`}}),(0,S.jsx)(`h4`,{style:{fontSize:`1.15rem`,fontWeight:700,marginBottom:`8px`,color:`var(--text-primary)`},children:`Login Required`}),(0,S.jsx)(`p`,{style:{fontSize:`0.9rem`,color:`var(--text-secondary)`,marginBottom:`20px`,lineHeight:`1.5`},children:`Please log in with your ZingBite account to register as a delivery rider.`}),(0,S.jsx)(`button`,{type:`button`,onClick:()=>i(`/login?redirect=/ride-with-us`),className:`form-submit-btn`,style:{display:`inline-block`,textDecoration:`none`,textAlign:`center`,width:`auto`,padding:`10px 24px`,fontWeight:600,border:`none`,cursor:`pointer`,color:`#fff`},children:`Log In to Apply`})]})})]})]});case`terms`:return(0,S.jsxs)(`div`,{className:`info-content-pane legal-text`,children:[(0,S.jsx)(`h2`,{children:`Terms & Conditions`}),(0,S.jsx)(`span`,{className:`last-updated`,children:`Last Updated: June 02, 2026`}),(0,S.jsx)(`h3`,{children:`1. Introduction`}),(0,S.jsx)(`p`,{children:`Welcome to ZingBite. These Terms and Conditions govern your use of our website, mobile application, and food delivery services. By accessing or using our services, you agree to comply with and be bound by these terms.`}),(0,S.jsx)(`h3`,{children:`2. User Accounts`}),(0,S.jsx)(`p`,{children:`To place an order, you must register and create a secure user account. You are solely responsible for maintaining the confidentiality of your credentials and password. Any actions performed under your account remain your responsibility.`}),(0,S.jsx)(`h3`,{children:`3. Placing Orders & Contract`}),(0,S.jsx)(`p`,{children:`All food orders placed through our platform are subject to availability and acceptance by the respective restaurant. The contract for the supply of food is formed directly between you and the restaurant when your order is accepted.`}),(0,S.jsx)(`h3`,{children:`4. Pricing & Payments`}),(0,S.jsx)(`p`,{children:`All prices displayed include menu costs set by restaurants. Delivery fees, taxes, and service charges are calculated at checkout. Payments are processed through secure gateways like Razorpay.`}),(0,S.jsx)(`h3`,{children:`5. Limitation of Liability`}),(0,S.jsx)(`p`,{children:`ZingBite acts as a delivery facilitator and is not responsible for the quality, safety, portion size, or ingredients of food prepared by partner restaurants.`})]});case`privacy`:return(0,S.jsxs)(`div`,{className:`info-content-pane legal-text`,children:[(0,S.jsx)(`h2`,{children:`Privacy Policy`}),(0,S.jsx)(`span`,{className:`last-updated`,children:`Last Updated: June 02, 2026`}),(0,S.jsx)(`h3`,{children:`1. Information We Collect`}),(0,S.jsx)(`p`,{children:`We collect personal information that you provide directly, including name, email address, phone number, and delivery address. We also collect automated usage data and GPS location coordinates when the app is active to facilitate real-time tracking.`}),(0,S.jsx)(`h3`,{children:`2. How We Use Your Data`}),(0,S.jsx)(`p`,{children:`Your details are used to process orders, communicate status, route delivery partners, and improve customer support experiences. We do not sell or trade your data to third-party marketing companies.`}),(0,S.jsx)(`h3`,{children:`3. Sharing of Information`}),(0,S.jsx)(`p`,{children:`We share necessary information (name, address, telephone) with partner restaurants and delivery riders to fulfill your orders. We may disclose data when legally required by public authorities.`}),(0,S.jsx)(`h3`,{children:`4. Data Security`}),(0,S.jsx)(`p`,{children:`We use standard encryption techniques (SSL/TLS) and secure databases to protect your personal details from unauthorized access, modification, or leakage.`})]});case`cookies`:return(0,S.jsxs)(`div`,{className:`info-content-pane legal-text`,children:[(0,S.jsx)(`h2`,{children:`Cookie Policy`}),(0,S.jsx)(`span`,{className:`last-updated`,children:`Last Updated: June 02, 2026`}),(0,S.jsx)(`h3`,{children:`1. What Are Cookies?`}),(0,S.jsx)(`p`,{children:`Cookies are small text files stored on your browser when you visit our website. They help us remember login states, keep track of items in your shopping cart, and monitor anonymous site analytics.`}),(0,S.jsx)(`h3`,{children:`2. Types of Cookies We Use`}),(0,S.jsx)(`div`,{style:{overflowX:`auto`,margin:`20px 0`},children:(0,S.jsxs)(`table`,{style:{width:`100%`,borderCollapse:`collapse`,fontSize:`0.9rem`},children:[(0,S.jsx)(`thead`,{children:(0,S.jsxs)(`tr`,{style:{background:`var(--bg-surface)`,borderBottom:`2px solid var(--border-medium)`},children:[(0,S.jsx)(`th`,{style:{padding:`12px`,textAlign:`left`},children:`Category`}),(0,S.jsx)(`th`,{style:{padding:`12px`,textAlign:`left`},children:`Purpose`})]})}),(0,S.jsxs)(`tbody`,{children:[(0,S.jsxs)(`tr`,{style:{borderBottom:`1px solid var(--border-light)`},children:[(0,S.jsx)(`td`,{style:{padding:`12px`,fontWeight:600},children:`Essential`}),(0,S.jsx)(`td`,{style:{padding:`12px`},children:`Maintaining your logged-in session, authentication, and cart selections.`})]}),(0,S.jsxs)(`tr`,{style:{borderBottom:`1px solid var(--border-light)`},children:[(0,S.jsx)(`td`,{style:{padding:`12px`,fontWeight:600},children:`Analytics`}),(0,S.jsx)(`td`,{style:{padding:`12px`},children:`Tracking page views, click behaviors, and application speed metrics.`})]}),(0,S.jsxs)(`tr`,{style:{borderBottom:`1px solid var(--border-light)`},children:[(0,S.jsx)(`td`,{style:{padding:`12px`,fontWeight:600},children:`Marketing`}),(0,S.jsx)(`td`,{style:{padding:`12px`},children:`Remembering preferences to display tailored restaurant suggestions.`})]})]})]})}),(0,S.jsx)(`h3`,{children:`3. Managing Cookies`}),(0,S.jsx)(`p`,{children:`You can adjust your browser settings to refuse or delete cookies. However, please note that disabling essential cookies will prevent the cart and account checkout system from working correctly.`})]});case`refunds`:return(0,S.jsxs)(`div`,{className:`info-content-pane legal-text`,children:[(0,S.jsx)(`h2`,{children:`Refund & Cancellation Policy`}),(0,S.jsx)(`span`,{className:`last-updated`,children:`Last Updated: June 02, 2026`}),(0,S.jsx)(`h3`,{children:`1. Order Cancellations`}),(0,S.jsx)(`p`,{children:`Users can cancel their order free of charge within 60 seconds of submitting it. Once the restaurant begins cooking (Order Accepted status), cancellation requests are not eligible for a refund.`}),(0,S.jsx)(`h3`,{children:`2. Refund Eligibility`}),(0,S.jsx)(`p`,{children:`Refunds are initiated in full under the following circumstances:`}),(0,S.jsxs)(`ul`,{style:{margin:`12px 20px`,lineHeight:`1.7`},children:[(0,S.jsx)(`li`,{children:`The ordered restaurant item is out of stock (not available).`}),(0,S.jsx)(`li`,{children:`The restaurant cancels the order due to operational issues.`}),(0,S.jsx)(`li`,{children:`Delivery is delayed by more than 60 minutes beyond estimated delivery due to fleet error.`})]}),(0,S.jsx)(`h3`,{children:`3. Refund Timelines`}),(0,S.jsx)(`p`,{children:`Approved refunds are processed back to the original source of payment (Razorpay card/UPI) within 5 to 7 business days, depending on bank processing policies.`})]});default:return(0,S.jsxs)(`div`,{className:`info-content-pane`,children:[(0,S.jsx)(`h2`,{children:`Section Not Found`}),(0,S.jsx)(`p`,{children:`The section you are looking for does not exist.`})]})}})()})]})});export{C as default};