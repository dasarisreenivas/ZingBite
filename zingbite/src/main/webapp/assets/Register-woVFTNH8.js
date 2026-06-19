import{g as e,i as t,l as n,n as r,p as i}from"./createLucideIcon-DINBtofy.js";import{t as a}from"./axios-DSK6k93e.js";import{t as o}from"./chevron-down-CtzL1yNU.js";import{t as s}from"./lock-B6A3C_RV.js";import{t as c}from"./phone-qPDRz1LS.js";import{_ as l,a as u,d,f,o as p,p as m}from"./index-KKOKVewU.js";var h=e(i(),1),g=r(),_=()=>{let[e,r]=(0,h.useState)({username:``,email:``,mobile:``,password:``,confirmPassword:``,address:``,role:`customer`,latitude:null,longitude:null,city:``}),[i,_]=(0,h.useState)(`91`),[v,y]=(0,h.useState)(``),[b,x]=(0,h.useState)(!1),[S,C]=(0,h.useState)(!1),[w,T]=(0,h.useState)(typeof window<`u`&&!!window.L),E=(0,h.useRef)(null),D=(0,h.useRef)(null),O=(0,h.useRef)(null),[k,A]=(0,h.useState)(null),[j,M]=(0,h.useState)(!1),N=n(),P=()=>{if(!navigator.geolocation){y(`Geolocation is not supported by your browser or is blocked in insecure contexts.`);return}C(!0),y(``),navigator.geolocation.getCurrentPosition(async e=>{let{latitude:t,longitude:n}=e.coords;try{let e=await(await fetch(`https://nominatim.openstreetmap.org/reverse?format=json&lat=${t}&lon=${n}&zoom=18`)).json();if(e){let i=e.display_name||``,a=e.address?.city||e.address?.town||e.address?.village||e.address?.suburb||``;r(e=>({...e,address:i,latitude:t,longitude:n,city:a}))}}catch(e){console.error(`Reverse geocoding error:`,e),y(`Failed to geocode address from coordinates.`)}finally{C(!1)}},e=>{y(`Error retrieving location: `+e.message),C(!1)})};(0,h.useEffect)(()=>{if(window.L){T(!0);return}let e=document.querySelector(`link[href*="leaflet.css"]`);e||(e=document.createElement(`link`),e.rel=`stylesheet`,e.href=`https://unpkg.com/leaflet@1.9.4/dist/leaflet.css`,document.head.appendChild(e));let t=document.querySelector(`script[src*="leaflet.js"]`);t||(t=document.createElement(`script`),t.src=`https://unpkg.com/leaflet@1.9.4/dist/leaflet.js`,t.async=!0,t.onload=()=>{let e=setInterval(()=>{window.L&&(T(!0),clearInterval(e))},50)},document.body.appendChild(t))},[]);let F={91:{label:`+91 (IN)`,length:10},1:{label:`+1 (US)`,length:10},44:{label:`+44 (UK)`,length:10},971:{label:`+971 (UAE)`,length:9}},I=t=>r({...e,[t.target.name]:t.target.value});return(0,h.useEffect)(()=>{if(!w||!E.current||!e.latitude)return;let t=window.L;if(!t||D.current)return;let n=e.latitude||12.9716,i=e.longitude||77.5946,a=t.map(E.current).setView([n,i],14);D.current=a,t.tileLayer(`https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png`,{maxZoom:19,attribution:`&copy; OpenStreetMap contributors`}).addTo(a);let o=t.divIcon({html:`<div style="font-size:24px;text-align:center;line-height:24px;">📍</div>`,className:`custom-register-marker`,iconSize:[24,24],iconAnchor:[12,12]}),s=t.marker([n,i],{icon:o,draggable:!0}).addTo(a);O.current=s;let c=async(e,t)=>{try{let n=await(await fetch(`https://nominatim.openstreetmap.org/reverse?format=json&lat=${e}&lon=${t}&zoom=18`)).json();if(n){let i=n.display_name||``,a=n.address?.city||n.address?.town||n.address?.village||n.address?.suburb||``;r(n=>({...n,address:i,latitude:e,longitude:t,city:a}))}}catch(e){console.error(`Reverse geocode error:`,e)}};return s.on(`dragend`,()=>{let e=s.getLatLng();c(e.lat,e.lng)}),a.on(`click`,e=>{s.setLatLng(e.latlng),c(e.latlng.lat,e.latlng.lng)}),()=>{D.current&&(D.current.remove(),D.current=null,O.current=null)}},[w]),(0,g.jsxs)(g.Fragment,{children:[(0,g.jsx)(`style`,{children:`
        .register-page {
          display: flex;
          min-height: calc(100vh - 72px);
        }
        .register-hero {
          flex: 1.2;
          position: relative;
          overflow: hidden;
          display: none;
        }
        @media (min-width: 900px) {
          .register-hero { display: block; }
        }
        .register-hero img {
          width: 100%;
          height: 100%;
          object-fit: cover;
          transition: transform 8s ease;
        }
        .register-hero:hover img {
          transform: scale(1.05);
        }
        .register-hero-overlay {
          position: absolute;
          inset: 0;
          background: linear-gradient(135deg, rgba(247,55,79,0.35) 0%, rgba(0,0,0,0.7) 100%);
          display: flex;
          flex-direction: column;
          justify-content: center;
          align-items: center;
          text-align: center;
          padding: 40px;
        }
        .register-hero-overlay::before {
          content: '';
          position: absolute;
          inset: 0;
          background: radial-gradient(ellipse at 50% 80%, rgba(247,55,79,0.15) 0%, transparent 60%);
        }
        .register-hero-overlay h2 {
          font-family: 'Outfit', sans-serif;
          font-size: 3.2rem;
          font-weight: 800;
          color: #fff;
          margin-bottom: 12px;
          line-height: 1.1;
          position: relative;
        }
        .register-hero-overlay p {
          color: rgba(255,255,255,0.85);
          font-size: 1.1rem;
          max-width: 400px;
          position: relative;
        }
        .hero-flame {
          display: inline-flex;
          align-items: center;
          gap: 6px;
          margin-top: 24px;
          padding: 8px 20px;
          border-radius: 30px;
          background: rgba(255,255,255,0.1);
          backdrop-filter: blur(8px);
          border: 1px solid rgba(255,255,255,0.15);
          color: #fff;
          font-size: 0.85rem;
          font-weight: 600;
          position: relative;
        }
        .register-form-section {
          flex: 1;
          display: flex;
          align-items: flex-start;
          justify-content: center;
          padding: 32px 20px;
          background: linear-gradient(180deg, rgba(247,55,79,0.035) 0%, #fff 42%);
          position: relative;
          overflow-y: auto;
        }
        .register-form-section::before {
          content: '';
          position: absolute;
          top: 0;
          left: 0;
          right: 0;
          height: 4px;
          background: linear-gradient(90deg, transparent, var(--brand-red), transparent);
        }
        .register-form-container {
          width: 100%;
          max-width: 420px;
          background: rgba(255,255,255,0.96);
          border: 1px solid rgba(247,55,79,0.1);
          border-radius: 20px;
          padding: 32px;
          box-shadow: 0 18px 50px rgba(28,28,28,0.08);
          animation: fadeInScale 0.5s ease-out both;
          position: relative;
          backdrop-filter: blur(12px);
        }
        .register-form-container::before {
          content: '';
          position: absolute;
          top: -1px;
          left: -1px;
          right: -1px;
          height: 4px;
          background: linear-gradient(90deg, var(--brand-red), #ff6b81, var(--brand-red));
          border-radius: 20px 20px 0 0;
        }
        @keyframes fadeInScale {
          from { opacity: 0; transform: scale(0.96) translateY(12px); }
          to { opacity: 1; transform: scale(1) translateY(0); }
        }
        .register-form-container .brand-icon {
          display: flex;
          align-items: center;
          gap: 8px;
          margin-bottom: 8px;
        }
        .register-form-container h2 {
          font-size: 1.8rem;
          margin: 0 0 4px;
          color: var(--text-primary);
        }
        .register-form-container .subtitle {
          color: var(--text-secondary);
          margin-bottom: 24px;
          font-size: 0.95rem;
        }
        .register-form-container .subtitle a {
          color: var(--brand-red);
          font-weight: 600;
          text-decoration: none;
        }
        .form-field {
          position: relative;
          margin-bottom: 16px;
        }
        .form-field label {
          position: absolute;
          left: 44px;
          top: 50%;
          transform: translateY(-50%);
          color: var(--text-muted);
          font-size: 0.95rem;
          pointer-events: none;
          transition: all 0.25s var(--ease-premium);
          background: #fff;
          padding: 0 4px;
        }
        .form-field.focused label,
        .form-field.filled label {
          top: 0;
          left: 16px;
          font-size: 0.72rem;
          color: var(--brand-red);
          font-weight: 600;
        }
        .form-field .field-icon {
          position: absolute;
          left: 14px;
          top: 50%;
          transform: translateY(-50%);
          color: var(--text-muted);
          transition: color 0.25s var(--ease-premium);
          pointer-events: none;
          z-index: 1;
        }
        .form-field.focused .field-icon {
          color: var(--brand-red);
        }
        .form-field input,
        .form-field textarea {
          width: 100%;
          padding: 14px 14px 14px 44px;
          border: 1.5px solid var(--border-medium);
          border-radius: 12px;
          font-size: 0.95rem;
          font-family: inherit;
          outline: none;
          transition: all 0.25s var(--ease-premium);
          background: #fff;
          resize: vertical;
        }
        .form-field.focused input,
        .form-field.focused textarea {
          border-color: var(--brand-red);
          box-shadow: 0 0 0 4px rgba(247, 55, 79, 0.08);
        }
        .form-field textarea {
          min-height: 70px;
        }
        .form-field.textarea-field label {
          top: 14px;
          transform: none;
          left: 44px;
        }
        .form-field.textarea-field.focused label,
        .form-field.textarea-field.filled label {
          top: -8px;
          left: 16px;
        }
        .form-field.textarea-field .field-icon {
          top: 14px;
          transform: none;
        }
        .phone-input-group {
          display: flex;
          gap: 10px;
          margin-bottom: 16px;
        }
        .phone-prefix-select-wrapper {
          position: relative;
          width: 110px;
          flex-shrink: 0;
        }
        .phone-prefix-select {
          width: 100%;
          height: 100%;
          padding: 14px 28px 14px 14px;
          border: 1.5px solid var(--border-medium);
          border-radius: 12px;
          font-size: 0.9rem;
          font-family: inherit;
          outline: none;
          background: #fff;
          cursor: pointer;
          transition: all 0.25s var(--ease-premium);
          appearance: none;
          font-weight: 500;
        }
        .phone-prefix-select:hover {
          border-color: var(--brand-red);
        }
        .phone-input-group.focused .phone-prefix-select {
          border-color: var(--brand-red);
          box-shadow: 0 0 0 4px rgba(247, 55, 79, 0.08);
        }
        .select-chevron {
          position: absolute;
          right: 12px;
          top: 50%;
          transform: translateY(-50%);
          pointer-events: none;
          color: var(--text-muted);
          transition: color 0.3s ease;
        }
        .phone-input-group.focused .select-chevron {
          color: var(--brand-red);
        }
        .terms-checkbox-field {
          display: flex;
          align-items: flex-start;
          gap: 10px;
          margin-bottom: 16px;
          margin-top: 8px;
          user-select: none;
        }
        .terms-checkbox-field input[type="checkbox"] {
          width: 18px;
          height: 18px;
          accent-color: var(--brand-red);
          cursor: pointer;
          margin-top: 2px;
          flex-shrink: 0;
        }
        .terms-checkbox-field label {
          font-size: 0.85rem;
          color: var(--text-secondary);
          cursor: pointer;
          line-height: 1.4;
        }
        .terms-checkbox-field label a {
          color: var(--brand-red);
          font-weight: 600;
          text-decoration: underline;
        }
        .terms-checkbox-field label a:hover {
          color: var(--brand-red-hover);
        }
        .register-error {
          background: rgba(226, 55, 68, 0.06);
          border: 1px solid rgba(226, 55, 68, 0.2);
          color: var(--danger);
          padding: 12px 16px;
          border-radius: 10px;
          margin-bottom: 16px;
          font-size: 0.9rem;
          animation: shake 0.4s ease-in-out;
          display: flex;
          align-items: center;
          gap: 8px;
        }
        @keyframes shake {
          0%, 100% { transform: translateX(0); }
          20%, 60% { transform: translateX(-6px); }
          40%, 80% { transform: translateX(6px); }
        }
        .register-submit {
          width: 100%;
          padding: 14px;
          background: linear-gradient(135deg, var(--brand-red), #d42d42);
          color: #fff;
          border: none;
          border-radius: 12px;
          font-size: 1rem;
          font-weight: 700;
          font-family: inherit;
          cursor: pointer;
          transition: all 0.3s var(--ease-premium);
          position: relative;
          overflow: hidden;
        }
        .register-submit:hover:not(:disabled) {
          transform: translateY(-2px);
          box-shadow: 0 8px 28px rgba(247, 55, 79, 0.35);
        }
        .register-submit:disabled {
          opacity: 0.7;
          cursor: not-allowed;
        }
        .register-submit::after {
          content: '';
          position: absolute;
          inset: 0;
          background: linear-gradient(90deg, transparent, rgba(255,255,255,0.15), transparent);
          transform: translateX(-100%);
        }
        .register-submit:hover::after {
          transform: translateX(100%);
          transition: transform 0.6s ease;
        }
        .locate-btn {
          display: flex;
          align-items: center;
          gap: 6px;
          background: rgba(247,55,79,0.04);
          border: 1.5px solid var(--border-medium);
          color: var(--text-secondary);
          padding: 8px 14px;
          border-radius: 10px;
          font-size: 0.8rem;
          font-weight: 600;
          cursor: pointer;
          margin-bottom: 16px;
          margin-top: -6px;
          transition: all 0.25s var(--ease-premium);
        }
        .locate-btn:hover {
          border-color: var(--brand-red);
          color: var(--brand-red);
          background: rgba(247,55,79,0.06);
        }
        @media (max-width: 768px) {
          .register-form-section {
            padding: 24px 16px;
          }
          .register-page {
            min-height: auto;
            flex-direction: column;
          }
        }
      `}),(0,g.jsxs)(`div`,{className:`register-page page-enter`,children:[(0,g.jsxs)(`div`,{className:`register-hero`,children:[(0,g.jsx)(`img`,{src:`https://images.unsplash.com/photo-1555939594-58d7cb561ad1?q=80&w=1974&auto=format&fit=crop`,alt:`Food`,loading:`lazy`}),(0,g.jsxs)(`div`,{className:`register-hero-overlay`,children:[(0,g.jsxs)(`h2`,{children:[`Join`,(0,g.jsx)(`br`,{}),`ZingBite!`]}),(0,g.jsx)(`p`,{children:`Create an account and start ordering from hundreds of restaurants`}),(0,g.jsxs)(`div`,{className:`hero-flame`,children:[(0,g.jsx)(l,{size:16,color:`#F7374F`}),` Free delivery on your first 5 orders`]})]})]}),(0,g.jsx)(`div`,{className:`register-form-section`,children:(0,g.jsxs)(`div`,{className:`register-form-container`,children:[(0,g.jsxs)(`div`,{className:`brand-icon`,children:[(0,g.jsx)(l,{size:22,color:`#F7374F`,fill:`#F7374F`}),(0,g.jsx)(`span`,{style:{fontWeight:800,fontSize:`1.1rem`,color:`var(--text-primary)`},children:`ZingBite`})]}),(0,g.jsx)(`h2`,{children:`Sign Up`}),(0,g.jsxs)(`p`,{className:`subtitle`,children:[`or `,(0,g.jsx)(t,{to:`/login`,children:`login to your account`})]}),v&&(0,g.jsxs)(`div`,{className:`register-error`,children:[(0,g.jsx)(p,{size:16}),` `,v]}),(0,g.jsxs)(`form`,{onSubmit:async t=>{if(t.preventDefault(),y(``),e.password!==e.confirmPassword){y(`Passwords do not match`);return}if(!j){y(`You must agree to the Terms & Conditions`);return}let n=F[i].length,r=e.mobile.replace(/\D/g,``);if(r.length!==n){y(`Mobile number for this country must be exactly ${n} digits`);return}x(!0);try{let t={...e,mobile:`${i}${r}`};(await a.post(`/api/register`,t)).data.success&&N(`/login`)}catch(e){y(e.response?.data?.error||`Registration failed`)}finally{x(!1)}},children:[(0,g.jsxs)(`div`,{className:`form-field ${k===`username`?`focused`:``} ${e.username?`filled`:``}`,children:[(0,g.jsx)(u,{size:16,className:`field-icon`}),(0,g.jsx)(`label`,{children:`Full Name`}),(0,g.jsx)(`input`,{type:`text`,name:`username`,value:e.username,onChange:I,onFocus:()=>A(`username`),onBlur:()=>A(null),required:!0})]}),(0,g.jsxs)(`div`,{className:`form-field ${k===`email`?`focused`:``} ${e.email?`filled`:``}`,children:[(0,g.jsx)(f,{size:16,className:`field-icon`}),(0,g.jsx)(`label`,{children:`Email address`}),(0,g.jsx)(`input`,{type:`email`,name:`email`,value:e.email,onChange:I,onFocus:()=>A(`email`),onBlur:()=>A(null),required:!0})]}),(0,g.jsxs)(`div`,{className:`phone-input-group ${k===`mobile`?`focused`:``}`,children:[(0,g.jsxs)(`div`,{className:`phone-prefix-select-wrapper`,children:[(0,g.jsxs)(`select`,{value:i,onChange:e=>_(e.target.value),onFocus:()=>A(`mobile`),onBlur:()=>A(null),className:`phone-prefix-select`,children:[(0,g.jsx)(`option`,{value:`91`,children:`+91 (IN)`}),(0,g.jsx)(`option`,{value:`1`,children:`+1 (US)`}),(0,g.jsx)(`option`,{value:`44`,children:`+44 (UK)`}),(0,g.jsx)(`option`,{value:`971`,children:`+971 (UAE)`})]}),(0,g.jsx)(o,{size:14,className:`select-chevron`})]}),(0,g.jsxs)(`div`,{className:`form-field ${k===`mobile`?`focused`:``} ${e.mobile?`filled`:``}`,style:{flex:1,marginBottom:0},children:[(0,g.jsx)(c,{size:16,className:`field-icon`}),(0,g.jsx)(`label`,{children:`Mobile Number`}),(0,g.jsx)(`input`,{type:`tel`,name:`mobile`,value:e.mobile,onChange:I,onFocus:()=>A(`mobile`),onBlur:()=>A(null),required:!0})]})]}),(0,g.jsxs)(`div`,{className:`form-field ${k===`password`?`focused`:``} ${e.password?`filled`:``}`,children:[(0,g.jsx)(s,{size:16,className:`field-icon`}),(0,g.jsx)(`label`,{children:`Password`}),(0,g.jsx)(`input`,{type:`password`,name:`password`,value:e.password,onChange:I,onFocus:()=>A(`password`),onBlur:()=>A(null),required:!0})]}),(0,g.jsxs)(`div`,{className:`form-field ${k===`confirmPassword`?`focused`:``} ${e.confirmPassword?`filled`:``}`,children:[(0,g.jsx)(s,{size:16,className:`field-icon`}),(0,g.jsx)(`label`,{children:`Confirm Password`}),(0,g.jsx)(`input`,{type:`password`,name:`confirmPassword`,value:e.confirmPassword,onChange:I,onFocus:()=>A(`confirmPassword`),onBlur:()=>A(null),required:!0})]}),(0,g.jsxs)(`div`,{className:`form-field textarea-field ${k===`address`?`focused`:``} ${e.address?`filled`:``}`,children:[(0,g.jsx)(d,{size:16,className:`field-icon`}),(0,g.jsx)(`label`,{children:`Delivery Address`}),(0,g.jsx)(`textarea`,{name:`address`,value:e.address,onChange:I,onFocus:()=>A(`address`),onBlur:()=>A(null),required:!0})]}),(0,g.jsxs)(`button`,{type:`button`,onClick:P,disabled:S,className:`locate-btn`,children:[(0,g.jsx)(d,{size:12,style:{color:`var(--brand-red)`}}),S?`Detecting Location...`:`Auto-Detect Address`]}),w&&(0,g.jsx)(`div`,{ref:E,style:{height:`180px`,borderRadius:`var(--radius-sm)`,border:`1px solid var(--border-medium)`,zIndex:1,marginTop:`8px`}}),(0,g.jsxs)(`div`,{className:`terms-checkbox-field`,children:[(0,g.jsx)(`input`,{type:`checkbox`,id:`terms-checkbox`,checked:j,onChange:e=>M(e.target.checked),required:!0}),(0,g.jsxs)(`label`,{htmlFor:`terms-checkbox`,children:[`I agree to the `,(0,g.jsx)(t,{to:`/info/terms`,target:`_blank`,rel:`noopener noreferrer`,children:`Terms & Conditions`})]})]}),(0,g.jsx)(`button`,{type:`submit`,className:`register-submit`,disabled:b,children:b?(0,g.jsxs)(g.Fragment,{children:[(0,g.jsx)(m,{size:16,style:{animation:`spin 1s linear infinite`,display:`inline-block`,verticalAlign:`middle`,marginRight:`6px`}}),` Creating...`]}):`CREATE ACCOUNT`})]})]})})]})]})};export{_ as default};