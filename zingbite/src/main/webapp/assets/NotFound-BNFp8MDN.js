import{i as e,n as t,p as n}from"./createLucideIcon-DINBtofy.js";import{t as r}from"./arrow-right-Do1_mgcz.js";import{t as i}from"./utensils-crossed-CBuD29Ov.js";import{h as a}from"./index-DvtySt6v.js";n();var o=t();function s(){return(0,o.jsxs)(o.Fragment,{children:[(0,o.jsx)(`style`,{children:`
        .notfound-wrapper {
          display: flex;
          flex-direction: column;
          align-items: center;
          justify-content: center;
          min-height: calc(100vh - 180px);
          text-align: center;
          padding: 40px 20px;
          position: relative;
          overflow: hidden;
        }

        .notfound-card {
          max-width: 500px;
          padding: 48px 32px;
          background: rgba(255, 255, 255, 0.95);
          backdrop-filter: blur(20px);
          border: 1px solid rgba(247, 55, 79, 0.1);
          border-radius: 24px;
          box-shadow: 0 16px 40px rgba(0, 0, 0, 0.04);
          position: relative;
          z-index: 2;
          animation: notfoundFadeIn 0.5s var(--ease-premium) both;
        }

        @keyframes notfoundFadeIn {
          from { opacity: 0; transform: translateY(30px); }
          to { opacity: 1; transform: translateY(0); }
        }

        .notfound-code {
          font-family: 'Outfit', sans-serif;
          font-size: 6.5rem;
          font-weight: 900;
          line-height: 1;
          background: linear-gradient(135deg, var(--brand-red), #ff7a8a);
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
          background-clip: text;
          margin: 0 0 16px;
          letter-spacing: -2px;
          animation: codeFloat 3s ease-in-out infinite;
        }

        @keyframes codeFloat {
          0%, 100% { transform: translateY(0); }
          50% { transform: translateY(-10px); }
        }

        .notfound-title {
          font-family: 'Outfit', sans-serif;
          font-size: 1.6rem;
          font-weight: 800;
          color: var(--text-primary);
          margin: 0 0 12px;
        }

        .notfound-desc {
          font-size: 0.92rem;
          color: var(--text-secondary);
          line-height: 1.6;
          margin: 0 0 32px;
        }

        .notfound-actions {
          display: flex;
          gap: 16px;
          justify-content: center;
          flex-wrap: wrap;
        }

        .notfound-btn {
          display: inline-flex;
          align-items: center;
          gap: 8px;
          padding: 12px 24px;
          border-radius: 12px;
          font-weight: 700;
          font-size: 0.9rem;
          text-decoration: none;
          transition: all 0.3s;
        }

        .notfound-btn.primary {
          background: linear-gradient(135deg, var(--brand-red), #ff6b7a);
          color: #fff;
          box-shadow: 0 4px 12px rgba(247, 55, 79, 0.2);
        }

        .notfound-btn.primary:hover {
          background: linear-gradient(135deg, var(--brand-red-hover), #e55a6a);
          transform: translateY(-2px);
          box-shadow: 0 8px 20px rgba(247, 55, 79, 0.3);
        }

        .notfound-btn.secondary {
          background: var(--bg-surface);
          border: 1px solid var(--border-medium);
          color: var(--text-secondary);
        }

        .notfound-btn.secondary:hover {
          background: rgba(247, 55, 79, 0.03);
          border-color: var(--brand-red);
          color: var(--brand-red);
          transform: translateY(-2px);
        }

        /* Floating Food items */
        .floating-food {
          position: absolute;
          font-size: 2.2rem;
          opacity: 0.08;
          animation: floatFood 8s ease-in-out infinite;
          user-select: none;
        }

        @keyframes floatFood {
          0%, 100% { transform: translateY(0) rotate(0deg); }
          50% { transform: translateY(-20px) rotate(15deg); }
        }
      `}),(0,o.jsxs)(`div`,{className:`notfound-wrapper`,children:[(0,o.jsx)(`span`,{className:`floating-food`,style:{top:`15%`,left:`10%`,animationDelay:`0s`},children:`🍕`}),(0,o.jsx)(`span`,{className:`floating-food`,style:{top:`25%`,right:`12%`,animationDelay:`2s`},children:`🍔`}),(0,o.jsx)(`span`,{className:`floating-food`,style:{bottom:`20%`,left:`15%`,animationDelay:`4s`},children:`🍩`}),(0,o.jsx)(`span`,{className:`floating-food`,style:{bottom:`15%`,right:`18%`,animationDelay:`1s`},children:`🍟`}),(0,o.jsx)(`span`,{className:`floating-food`,style:{top:`50%`,left:`42%`,animationDelay:`3s`,fontSize:`3rem`},children:`🌮`}),(0,o.jsxs)(`div`,{className:`notfound-card`,children:[(0,o.jsx)(`h1`,{className:`notfound-code`,children:`404`}),(0,o.jsx)(`h2`,{className:`notfound-title`,children:`Did someone eat this page?`}),(0,o.jsx)(`p`,{className:`notfound-desc`,children:`We looked everywhere but couldn't find the page you're searching for. It might have been deleted, renamed, or never existed in the first place!`}),(0,o.jsxs)(`div`,{className:`notfound-actions`,children:[(0,o.jsxs)(e,{to:`/`,className:`notfound-btn primary`,children:[(0,o.jsx)(a,{size:16}),` BACK HOME`]}),(0,o.jsxs)(e,{to:`/menu`,className:`notfound-btn secondary`,children:[(0,o.jsx)(i,{size:16}),` EXPLORE MENU `,(0,o.jsx)(r,{size:14})]})]})]})]})]})}export{s as default};