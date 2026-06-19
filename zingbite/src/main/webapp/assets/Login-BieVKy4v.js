import{a as e,f as t,g as n,m as r,n as i,u as a}from"./createLucideIcon-DnU5s7Zs.js";import{t as o}from"./lock-BudfzplA.js";import{a as s,d as c,m as l,n as u,u as d,w as f}from"./index-DcSzLqUg.js";var p=n(r(),1),m=i(),h=()=>{let[n,r]=(0,p.useState)(``),[i,h]=(0,p.useState)(``),[g,_]=(0,p.useState)(``),[v,y]=(0,p.useState)(!1),[b,x]=(0,p.useState)(null),{user:S,loading:C,login:w}=(0,p.useContext)(f),{showAlert:T}=u(),E=a(),[D]=t(),O=D.get(`redirect`)||`/`;(0,p.useEffect)(()=>{C||S&&E(k(S,O),{replace:!0})},[S,C,O,E]);function k(e,t){return e.role===`delivery_partner`?t.startsWith(`/info/`)?t:`/delivery`:e.role===`restaurant_admin`?t.startsWith(`/info/`)?t:`/restaurant-admin`:e.role===`super_admin`?t.startsWith(`/info/`)?t:`/admin`:t}return(0,m.jsxs)(m.Fragment,{children:[(0,m.jsx)(`style`,{children:`
        .login-page {
          display: flex;
          min-height: calc(100vh - 72px);
        }
        .login-hero {
          flex: 1.2;
          position: relative;
          overflow: hidden;
          display: none;
        }
        @media (min-width: 900px) {
          .login-hero { display: block; }
        }
        .login-hero img {
          width: 100%;
          height: 100%;
          object-fit: cover;
          transition: transform 8s ease;
        }
        .login-hero:hover img {
          transform: scale(1.05);
        }
        .login-hero-overlay {
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
        .login-hero-overlay::before {
          content: '';
          position: absolute;
          inset: 0;
          background: radial-gradient(ellipse at 50% 80%, rgba(247,55,79,0.15) 0%, transparent 60%);
        }
        .login-hero-overlay h2 {
          font-family: 'Outfit', sans-serif;
          font-size: 3.2rem;
          font-weight: 800;
          color: #fff;
          margin-bottom: 12px;
          line-height: 1.1;
          position: relative;
        }
        .login-hero-overlay p {
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
        .login-form-section {
          flex: 1;
          display: flex;
          align-items: center;
          justify-content: center;
          padding: 40px 20px;
          background: linear-gradient(180deg, rgba(247,55,79,0.035) 0%, #fff 42%);
          position: relative;
        }
        .login-form-section::before {
          content: '';
          position: absolute;
          top: 0;
          left: 0;
          right: 0;
          height: 4px;
          background: linear-gradient(90deg, transparent, var(--brand-red), transparent);
        }
        .login-form-container {
          width: 100%;
          max-width: 400px;
          background: rgba(255,255,255,0.96);
          border: 1px solid rgba(247,55,79,0.1);
          border-radius: 20px;
          padding: 36px;
          box-shadow: 0 18px 50px rgba(28,28,28,0.08);
          animation: fadeInScale 0.5s ease-out both;
          position: relative;
          backdrop-filter: blur(12px);
        }
        .login-form-container::before {
          content: '';
          position: absolute;
          top: -1px;
          left: -1px;
          right: -1px;
          height: 4px;
          background: linear-gradient(90deg, var(--brand-red), #ff6b81, var(--brand-red));
          border-radius: 20px 20px 0 0;
        }
        @media (max-width: 768px) {
          .login-form-section {
            padding: 24px 16px;
          }
          .login-page {
            min-height: auto;
            flex-direction: column;
          }
        }
        @keyframes fadeInScale {
          from { opacity: 0; transform: scale(0.96) translateY(12px); }
          to { opacity: 1; transform: scale(1) translateY(0); }
        }
        .login-form-container .brand-icon {
          display: flex;
          align-items: center;
          gap: 8px;
          margin-bottom: 8px;
        }
        .login-form-container .brand-icon .flame-icon {
          color: var(--brand-red);
        }
        .login-form-container h2 {
          font-size: 1.8rem;
          margin: 0 0 4px;
          color: var(--text-primary);
        }
        .login-form-container .subtitle {
          color: var(--text-secondary);
          margin-bottom: 32px;
          font-size: 0.95rem;
        }
        .login-form-container .subtitle a {
          color: var(--brand-red);
          font-weight: 600;
          text-decoration: none;
          transition: color 0.2s;
        }
        .login-form-container .subtitle a:hover {
          color: var(--brand-red-hover);
        }
        .form-field {
          position: relative;
          margin-bottom: 20px;
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
          font-size: 0.75rem;
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
        .form-field input {
          width: 100%;
          padding: 16px 16px 16px 44px;
          border: 1.5px solid var(--border-medium);
          border-radius: 12px;
          font-size: 0.95rem;
          font-family: inherit;
          outline: none;
          transition: all 0.25s var(--ease-premium);
          background: #fff;
        }
        .form-field.focused input {
          border-color: var(--brand-red);
          box-shadow: 0 0 0 4px rgba(247, 55, 79, 0.08);
        }
        .login-error {
          background: rgba(226, 55, 68, 0.06);
          border: 1px solid rgba(226, 55, 68, 0.2);
          color: var(--danger);
          padding: 12px 16px;
          border-radius: 10px;
          margin-bottom: 20px;
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
        .login-submit {
          width: 100%;
          padding: 16px;
          background: linear-gradient(135deg, var(--brand-red), #d42d42);
          color: #fff;
          border: none;
          border-radius: 12px;
          font-size: 1rem;
          font-weight: 700;
          font-family: inherit;
          cursor: pointer;
          margin-top: 8px;
          transition: all 0.3s var(--ease-premium);
          position: relative;
          overflow: hidden;
        }
        .login-submit:hover:not(:disabled) {
          transform: translateY(-2px);
          box-shadow: 0 8px 28px rgba(247, 55, 79, 0.35);
        }
        .login-submit:active {
          transform: translateY(0);
        }
        .login-submit:disabled {
          opacity: 0.7;
          cursor: not-allowed;
        }
        .login-submit::after {
          content: '';
          position: absolute;
          inset: 0;
          background: linear-gradient(90deg, transparent, rgba(255,255,255,0.15), transparent);
          transform: translateX(-100%);
        }
        .login-submit:hover::after {
          transform: translateX(100%);
          transition: transform 0.6s ease;
        }
        .spin-icon {
          animation: spin 1s linear infinite;
          display: inline-block;
          vertical-align: middle;
          margin-right: 6px;
        }
        @keyframes spin {
          from { transform: rotate(0deg); }
          to { transform: rotate(360deg); }
        }
        .login-divider {
          display: flex;
          align-items: center;
          gap: 12px;
          margin: 24px 0 16px;
          color: var(--text-muted);
          font-size: 0.85rem;
        }
        .login-divider::before,
        .login-divider::after {
          content: '';
          flex: 1;
          height: 1px;
          background: var(--border-light);
        }
        .social-login-grid {
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: 10px;
        }
        .social-btn {
          display: flex;
          align-items: center;
          justify-content: center;
          gap: 8px;
          padding: 10px;
          border: 1.5px solid var(--border-medium);
          border-radius: 10px;
          background: #fff;
          cursor: pointer;
          font-weight: 600;
          font-size: 0.85rem;
          color: var(--text-secondary);
          transition: all 0.25s var(--ease-premium);
        }
        .social-btn:hover {
          border-color: var(--brand-red);
          color: var(--brand-red);
          background: rgba(247,55,79,0.03);
        }
      `}),(0,m.jsxs)(`div`,{className:`login-page page-enter`,children:[(0,m.jsxs)(`div`,{className:`login-hero`,children:[(0,m.jsx)(`img`,{src:`https://images.unsplash.com/photo-1504674900247-0877df9cc836?q=80&w=2070&auto=format&fit=crop`,alt:`Food`,loading:`lazy`}),(0,m.jsxs)(`div`,{className:`login-hero-overlay`,children:[(0,m.jsxs)(`h2`,{children:[`Welcome`,(0,m.jsx)(`br`,{}),`Back!`]}),(0,m.jsx)(`p`,{children:`Order your favorite food from the best restaurants in town`}),(0,m.jsxs)(`div`,{className:`hero-flame`,children:[(0,m.jsx)(l,{size:16,color:`#F7374F`}),` 50% OFF your first order`]})]})]}),(0,m.jsx)(`div`,{className:`login-form-section`,children:(0,m.jsxs)(`div`,{className:`login-form-container`,children:[(0,m.jsxs)(`div`,{className:`brand-icon`,children:[(0,m.jsx)(l,{size:22,className:`flame-icon`,fill:`#F7374F`}),(0,m.jsx)(`span`,{style:{fontWeight:800,fontSize:`1.1rem`,color:`var(--text-primary)`},children:`ZingBite`})]}),(0,m.jsx)(`h2`,{children:`Login`}),(0,m.jsxs)(`p`,{className:`subtitle`,children:[`or `,(0,m.jsx)(e,{to:`/register`,children:`create an account`})]}),g&&(0,m.jsxs)(`div`,{className:`login-error`,children:[(0,m.jsx)(s,{size:16}),` `,g]}),(0,m.jsxs)(`form`,{onSubmit:async e=>{e.preventDefault(),_(``),y(!0);let t=await w(n,i);y(!1),t.success?E(k(t.user,O)):_(t.error||`Login failed`)},children:[(0,m.jsxs)(`div`,{className:`form-field ${b===`email`?`focused`:``} ${n?`filled`:``}`,children:[(0,m.jsx)(d,{size:16,className:`field-icon`}),(0,m.jsx)(`label`,{children:`Email address`}),(0,m.jsx)(`input`,{type:`email`,value:n,onChange:e=>r(e.target.value),onFocus:()=>x(`email`),onBlur:()=>x(null),required:!0})]}),(0,m.jsxs)(`div`,{className:`form-field ${b===`password`?`focused`:``} ${i?`filled`:``}`,children:[(0,m.jsx)(o,{size:16,className:`field-icon`}),(0,m.jsx)(`label`,{children:`Password`}),(0,m.jsx)(`input`,{type:`password`,value:i,onChange:e=>h(e.target.value),onFocus:()=>x(`password`),onBlur:()=>x(null),required:!0})]}),(0,m.jsx)(`button`,{type:`submit`,className:`login-submit`,disabled:v,children:v?(0,m.jsxs)(m.Fragment,{children:[(0,m.jsx)(c,{size:16,className:`spin-icon`}),` Logging in...`]}):`LOGIN`})]}),(0,m.jsx)(`div`,{className:`login-divider`,children:`or continue with`}),(0,m.jsxs)(`div`,{className:`social-login-grid`,children:[(0,m.jsxs)(`button`,{type:`button`,className:`social-btn`,onClick:()=>T(`Google sign-in coming soon!`,`info`),children:[(0,m.jsxs)(`svg`,{width:`16`,height:`16`,viewBox:`0 0 24 24`,children:[(0,m.jsx)(`path`,{fill:`#4285F4`,d:`M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92a5.06 5.06 0 0 1-2.2 3.32v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.1z`}),(0,m.jsx)(`path`,{fill:`#34A853`,d:`M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z`}),(0,m.jsx)(`path`,{fill:`#FBBC05`,d:`M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z`}),(0,m.jsx)(`path`,{fill:`#EA4335`,d:`M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z`})]}),`Google`]}),(0,m.jsxs)(`button`,{type:`button`,className:`social-btn`,onClick:()=>T(`GitHub sign-in coming soon!`,`info`),children:[(0,m.jsx)(`svg`,{width:`16`,height:`16`,viewBox:`0 0 24 24`,children:(0,m.jsx)(`path`,{fill:`#333`,d:`M12 0C5.37 0 0 5.37 0 12c0 5.3 3.44 9.8 8.2 11.39.6.11.82-.26.82-.58 0-.29-.01-1.24-.02-2.24-3.34.73-4.04-1.42-4.04-1.42-.55-1.39-1.34-1.76-1.34-1.76-1.09-.75.08-.73.08-.73 1.2.09 1.84 1.24 1.84 1.24 1.07 1.83 2.81 1.3 3.5 1 .1-.78.42-1.3.76-1.6-2.67-.3-5.47-1.33-5.47-5.93 0-1.31.47-2.38 1.24-3.22-.12-.3-.54-1.52.12-3.17 0 0 1.01-.32 3.3 1.23.96-.27 1.98-.4 3-.4s2.04.13 3 .4c2.29-1.55 3.3-1.23 3.3-1.23.66 1.65.24 2.87.12 3.17.77.84 1.24 1.91 1.24 3.22 0 4.61-2.8 5.63-5.48 5.93.43.37.82 1.1.82 2.22 0 1.6-.01 2.89-.01 3.28 0 .32.22.7.83.58C20.56 21.8 24 17.3 24 12 24 5.37 18.63 0 12 0z`})}),`GitHub`]})]})]})})]})]})};export{h as default};