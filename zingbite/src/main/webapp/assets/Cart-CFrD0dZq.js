import{a as e,g as t,m as n,n as r,t as i,u as a}from"./createLucideIcon-DnU5s7Zs.js";import{t as o}from"./minus-D5EbI-H0.js";import{t as s}from"./percent-CJ63YFPx.js";import{t as c}from"./plus-B3XK3hIx.js";import{t as l}from"./shopping-bag-C8IdowiG.js";import{t as u}from"./trash-2-BMx355-Q.js";import{t as d}from"./truck-BhgCY32Y.js";import{S as f,s as p,w as m}from"./index-CLDdiuGX.js";var h=i(`tag`,[[`path`,{d:`M12.586 2.586A2 2 0 0 0 11.172 2H4a2 2 0 0 0-2 2v7.172a2 2 0 0 0 .586 1.414l8.704 8.704a2.426 2.426 0 0 0 3.42 0l6.58-6.58a2.426 2.426 0 0 0 0-3.42z`,key:`vktsd0`}],[`circle`,{cx:`7.5`,cy:`7.5`,r:`.5`,fill:`currentColor`,key:`kqv944`}]]),g=t(n(),1),_=r(),v=()=>{let{cart:t,updateQuantity:n,removeFromCart:r,clearCart:i,coupon:v,applyCoupon:y,removeCoupon:b}=f(),{user:x}=g.useContext(m),S=a(),[C,w]=(0,g.useState)(``),[T,E]=(0,g.useState)(``),D=()=>{if(E(``),!C)return;let e=y(C);e.success?w(``):E(e.message)},O=e=>{E(``),y(e)},k=t?.items?Array.isArray(t.items)?t.items:Object.values(t.items):[];return!t||k.length===0?(0,_.jsxs)(`div`,{className:`page-enter`,style:{display:`flex`,flexDirection:`column`,alignItems:`center`,justifyContent:`center`,padding:`100px 20px`,textAlign:`center`},children:[(0,_.jsx)(`div`,{style:{width:`100px`,height:`100px`,borderRadius:`50%`,background:`rgba(247,55,79,0.06)`,display:`flex`,alignItems:`center`,justifyContent:`center`,marginBottom:`24px`},children:(0,_.jsx)(p,{size:44,color:`var(--text-muted)`,strokeWidth:1.2})}),(0,_.jsx)(`h3`,{style:{fontSize:`1.6rem`,fontWeight:800,marginBottom:`8px`},children:`Your cart is empty`}),(0,_.jsx)(`p`,{style:{color:`var(--text-secondary)`,marginBottom:`28px`,fontSize:`0.95rem`,maxWidth:`400px`},children:`Looks like you haven't added anything yet. Explore restaurants near you and find something delicious!`}),(0,_.jsxs)(e,{to:`/`,style:{padding:`14px 36px`,background:`linear-gradient(135deg, var(--brand-red), #d42d42)`,color:`#fff`,borderRadius:`12px`,fontWeight:700,textDecoration:`none`,boxShadow:`0 8px 24px rgba(247,55,79,0.25)`,transition:`transform 0.2s, box-shadow 0.2s`,display:`inline-flex`,alignItems:`center`,gap:`8px`},onMouseEnter:e=>{e.target.style.transform=`translateY(-2px)`,e.target.style.boxShadow=`0 12px 32px rgba(247,55,79,0.35)`},onMouseLeave:e=>{e.target.style.transform=``,e.target.style.boxShadow=`0 8px 24px rgba(247,55,79,0.25)`},children:[(0,_.jsx)(l,{size:16}),` BROWSE RESTAURANTS`]})]}):(0,_.jsxs)(_.Fragment,{children:[(0,_.jsx)(`style`,{children:`
        .cart-layout {
          display: grid;
          grid-template-columns: minmax(0, 1fr) 380px;
          width: min(1200px, calc(100% - 40px));
          margin: 24px auto 48px;
          gap: 28px;
          align-items: start;
        }
        .cart-items-box {
          padding: 28px;
          border: 1px solid var(--border-light);
          background: #fff;
          box-shadow: 0 4px 24px rgba(0,0,0,0.04);
          border-radius: 20px;
        }
        .cart-header {
          display: flex;
          justify-content: space-between;
          align-items: center;
          margin-bottom: 20px;
          padding-bottom: 16px;
          border-bottom: 1.5px solid var(--border-light);
        }
        .cart-header h2 {
          font-weight: 800;
          font-size: 1.4rem;
          margin: 0;
          display: flex;
          align-items: center;
          gap: 10px;
        }
        .item-count-badge {
          font-size: 0.8rem;
          color: var(--brand-red);
          background: rgba(247,55,79,0.06);
          padding: 4px 12px;
          border-radius: 20px;
          border: 1px solid rgba(247,55,79,0.12);
          font-weight: 700;
        }
        .clear-cart-btn {
          padding: 8px 16px;
          background: transparent;
          border: 1.5px solid rgba(226,55,68,0.2);
          color: var(--danger);
          border-radius: 10px;
          font-size: 0.8rem;
          font-weight: 700;
          cursor: pointer;
          transition: all 0.25s var(--ease-premium);
          display: flex;
          align-items: center;
          gap: 6px;
        }
        .clear-cart-btn:hover {
          background: rgba(226,55,68,0.04);
          border-color: var(--danger);
        }
        .cart-items-list {
          display: flex;
          flex-direction: column;
        }
        .cart-item-row {
          display: flex;
          align-items: center;
          justify-content: space-between;
          padding: 20px 0;
          border-bottom: 1px dashed var(--border-light);
          gap: 16px;
        }
        .cart-item-row:last-child { border-bottom: none; }
        .item-details { flex: 1; min-width: 0; }
        .item-title {
          font-size: 1.1rem;
          font-weight: 700;
          margin: 0 0 4px;
          color: var(--text-primary);
        }
        .item-price {
          font-weight: 700;
          font-size: 1.05rem;
          color: var(--brand-red);
          margin: 0 0 10px;
        }
        .qty-control-box {
          display: inline-flex;
          align-items: center;
          border: 1.5px solid rgba(96,178,70,0.25);
          border-radius: 10px;
          height: 34px;
          overflow: hidden;
          background: #fff;
          box-shadow: 0 2px 8px rgba(96,178,70,0.06);
        }
        .qty-adjust-btn {
          width: 34px;
          height: 100%;
          background: transparent;
          border: none;
          color: var(--success);
          font-size: 1rem;
          cursor: pointer;
          display: flex;
          align-items: center;
          justify-content: center;
          transition: background 0.2s;
        }
        .qty-adjust-btn:hover { background: rgba(96,178,70,0.06); }
        .qty-val-display {
          padding: 0 10px;
          color: var(--text-primary);
          font-size: 0.9rem;
          font-weight: 700;
          min-width: 20px;
          text-align: center;
        }
        .item-image-col {
          display: flex;
          flex-direction: column;
          align-items: flex-end;
          gap: 8px;
          flex-shrink: 0;
        }
        .item-thumb {
          width: 80px;
          height: 80px;
          border-radius: 14px;
          overflow: hidden;
          border: 1px solid var(--border-light);
          box-shadow: 0 4px 12px rgba(0,0,0,0.04);
        }
        .item-remove-btn {
          display: inline-flex;
          align-items: center;
          gap: 4px;
          color: var(--text-muted);
          font-size: 0.75rem;
          font-weight: 700;
          background: transparent;
          border: none;
          cursor: pointer;
          transition: color 0.2s;
        }
        .item-remove-btn:hover { color: var(--danger); }
        .summary-card {
          position: sticky;
          top: 96px;
          padding: 24px;
          border: 1px solid var(--border-light);
          background: #fff;
          box-shadow: 0 4px 24px rgba(0,0,0,0.04);
          border-radius: 20px;
        }
        .summary-card::before {
          content: '';
          position: absolute;
          top: -1px;
          left: 20px;
          right: 20px;
          height: 3px;
          background: linear-gradient(90deg, var(--brand-red), #ff6b81, var(--brand-red));
          border-radius: 20px 20px 0 0;
        }
        .coupon-box {
          margin-bottom: 20px;
          padding-bottom: 16px;
          border-bottom: 1px solid var(--border-light);
        }
        .coupon-title {
          font-size: 0.9rem;
          margin: 0 0 10px;
          font-weight: 700;
          display: flex;
          align-items: center;
          gap: 6px;
        }
        .coupon-title svg { color: var(--brand-red); }
        .coupon-input-group {
          display: flex;
          gap: 8px;
          margin-top: 6px;
        }
        .coupon-field {
          flex: 1;
          padding: 10px 14px;
          border: 1.5px solid var(--border-medium);
          border-radius: 10px;
          font-size: 0.85rem;
          outline: none;
          text-transform: uppercase;
          letter-spacing: 1px;
          transition: border-color 0.25s var(--ease-premium);
        }
        .coupon-field:focus { border-color: var(--brand-red); }
        .coupon-apply-btn {
          padding: 10px 18px;
          background: linear-gradient(135deg, var(--brand-red), #d42d42);
          color: #fff;
          border: none;
          border-radius: 10px;
          font-weight: 700;
          cursor: pointer;
          font-size: 0.8rem;
          transition: all 0.25s var(--ease-premium);
        }
        .coupon-apply-btn:hover {
          transform: translateY(-1px);
          box-shadow: 0 4px 14px rgba(247,55,79,0.3);
        }
        .applied-coupon-row {
          display: flex;
          justify-content: space-between;
          align-items: center;
          padding: 10px 14px;
          background: rgba(96,178,70,0.06);
          border: 1.5px dashed var(--success);
          border-radius: 10px;
          margin-top: 6px;
        }
        .quick-codes-section { margin-top: 12px; }
        .chips-container {
          display: flex;
          gap: 6px;
          margin-top: 6px;
          flex-wrap: wrap;
        }
        .coupon-chip-btn {
          padding: 5px 12px;
          background: rgba(247,55,79,0.04);
          border: 1px solid rgba(247,55,79,0.12);
          border-radius: 20px;
          font-size: 0.7rem;
          color: var(--text-secondary);
          cursor: pointer;
          transition: all 0.25s var(--ease-premium);
          font-weight: 600;
        }
        .coupon-chip-btn:hover {
          border-color: var(--brand-red);
          color: var(--brand-red);
          background: rgba(247,55,79,0.06);
        }
        .bill-label { font-size: 0.9rem; font-weight: 700; margin-bottom: 12px; }
        .bill-row {
          display: flex;
          justify-content: space-between;
          padding: 6px 0;
          color: var(--text-secondary);
          font-size: 0.9rem;
        }
        .bill-total-row {
          font-size: 1.2rem;
          font-weight: 800;
          color: var(--text-primary);
          padding-top: 12px;
          padding-bottom: 16px;
          border-top: 1.5px dashed var(--border-light);
          margin-top: 8px;
        }
        .checkout-action-btn {
          width: 100%;
          padding: 16px;
          background: linear-gradient(135deg, var(--success), #4a9a32);
          color: #fff;
          border: none;
          border-radius: 14px;
          font-size: 1.05rem;
          font-weight: 700;
          cursor: pointer;
          transition: all 0.25s var(--ease-premium);
          box-shadow: 0 4px 16px rgba(96, 178, 70, 0.25);
        }
        .checkout-action-btn:hover {
          transform: translateY(-2px);
          box-shadow: 0 8px 28px rgba(96, 178, 70, 0.35);
        }
        @media (max-width: 850px) {
          .cart-layout {
            grid-template-columns: 1fr;
            margin: 16px auto 32px;
            gap: 20px;
          }
          .summary-card { position: static; }
        }
        @media (max-width: 480px) {
          .cart-item-row {
            flex-direction: column-reverse;
            align-items: stretch;
            gap: 12px;
          }
          .item-image-col {
            flex-direction: row;
            justify-content: space-between;
            align-items: center;
          }
          .cart-items-box { padding: 20px; }
        }
      `}),(0,_.jsxs)(`div`,{className:`cart-layout page-enter`,children:[(0,_.jsxs)(`div`,{className:`cart-items-box`,children:[(0,_.jsxs)(`div`,{className:`cart-header`,children:[(0,_.jsxs)(`h2`,{children:[(0,_.jsx)(l,{size:20,color:`var(--brand-red)`}),`Your Cart`,(0,_.jsxs)(`span`,{className:`item-count-badge`,children:[t.itemCount,` ITEM`,t.itemCount>1?`S`:``]})]}),(0,_.jsxs)(`button`,{onClick:i,className:`clear-cart-btn`,children:[(0,_.jsx)(u,{size:14}),` Clear`]})]}),(0,_.jsx)(`div`,{className:`cart-items-list`,children:k.map(e=>(0,_.jsxs)(`div`,{className:`cart-item-row`,children:[(0,_.jsxs)(`div`,{className:`item-details`,children:[(0,_.jsx)(`h3`,{className:`item-title`,children:e.itemName}),(0,_.jsxs)(`p`,{className:`item-price`,children:[`₹`,(e.price*e.quantity).toFixed(2)]}),(0,_.jsxs)(`div`,{className:`qty-control-box`,children:[(0,_.jsx)(`button`,{className:`qty-adjust-btn`,onClick:()=>n(e.itemId,e.quantity-1),children:(0,_.jsx)(o,{size:14})}),(0,_.jsx)(`span`,{className:`qty-val-display`,children:e.quantity}),(0,_.jsx)(`button`,{className:`qty-adjust-btn`,onClick:()=>n(e.itemId,e.quantity+1),children:(0,_.jsx)(c,{size:14})})]})]}),(0,_.jsxs)(`div`,{className:`item-image-col`,children:[(0,_.jsx)(`div`,{className:`item-thumb`,children:(0,_.jsx)(`img`,{src:`https://images.unsplash.com/photo-1546069901-ba9599a7e63c?q=80&w=1760&auto=format&fit=crop`,alt:e.itemName,loading:`lazy`,style:{width:`100%`,height:`100%`,objectFit:`cover`}})}),(0,_.jsxs)(`button`,{onClick:()=>r(e.itemId),className:`item-remove-btn`,children:[(0,_.jsx)(u,{size:12}),` Remove`]})]})]},e.itemId))})]}),(0,_.jsxs)(`div`,{className:`summary-card`,children:[(0,_.jsxs)(`div`,{className:`coupon-box`,children:[(0,_.jsxs)(`h3`,{className:`coupon-title`,children:[(0,_.jsx)(h,{size:15}),` Apply Promo Code`]}),v?(0,_.jsxs)(`div`,{className:`applied-coupon-row`,children:[(0,_.jsxs)(`span`,{style:{fontSize:`0.85rem`,fontWeight:700,color:`var(--success)`,display:`flex`,alignItems:`center`,gap:`6px`},children:[(0,_.jsx)(s,{size:13}),` `,v.code,` (`,v.description,`)`]}),(0,_.jsx)(`button`,{onClick:b,className:`item-remove-btn`,style:{fontSize:`0.75rem`},children:`Remove`})]}):(0,_.jsxs)(`div`,{className:`coupon-input-group`,children:[(0,_.jsx)(`input`,{type:`text`,placeholder:`e.g. ZING50`,value:C,onChange:e=>w(e.target.value),className:`coupon-field`}),(0,_.jsx)(`button`,{onClick:D,className:`coupon-apply-btn`,children:`Apply`})]}),T&&(0,_.jsx)(`p`,{style:{color:`var(--danger)`,fontSize:`0.78rem`,margin:`6px 0 0`,fontWeight:600},children:T}),!v&&(0,_.jsxs)(`div`,{className:`quick-codes-section`,children:[(0,_.jsx)(`span`,{style:{fontSize:`0.72rem`,color:`var(--text-muted)`,fontWeight:700},children:`Quick Codes:`}),(0,_.jsxs)(`div`,{className:`chips-container`,children:[(0,_.jsx)(`button`,{onClick:()=>O(`ZING50`),className:`coupon-chip-btn`,children:`ZING50 (50% Off)`}),(0,_.jsx)(`button`,{onClick:()=>O(`FREEDEL`),className:`coupon-chip-btn`,children:`FREEDEL (Free Delivery)`})]})]})]}),(0,_.jsx)(`div`,{className:`bill-label`,children:`Bill Details`}),(0,_.jsxs)(`div`,{className:`bill-row`,children:[(0,_.jsx)(`span`,{children:`Item Total`}),(0,_.jsxs)(`span`,{children:[`₹`,t.subtotal.toFixed(2)]})]}),(0,_.jsxs)(`div`,{className:`bill-row`,children:[(0,_.jsxs)(`span`,{children:[(0,_.jsx)(d,{size:12,style:{marginRight:`4px`,verticalAlign:`middle`}}),` Delivery Fee`]}),(0,_.jsxs)(`span`,{children:[`₹`,t.shipping.toFixed(2)]})]}),(0,_.jsxs)(`div`,{className:`bill-row`,children:[(0,_.jsx)(`span`,{children:`Taxes and Charges`}),(0,_.jsxs)(`span`,{children:[`₹`,t.tax.toFixed(2)]})]}),t.discount>0&&(0,_.jsxs)(`div`,{className:`bill-row`,style:{color:`var(--success)`,fontWeight:700},children:[(0,_.jsxs)(`span`,{children:[(0,_.jsx)(s,{size:12,style:{marginRight:`2px`,verticalAlign:`middle`}}),` Promo Discount`]}),(0,_.jsxs)(`span`,{children:[`-₹`,t.discount.toFixed(2)]})]}),(0,_.jsxs)(`div`,{className:`bill-row bill-total-row`,children:[(0,_.jsx)(`span`,{children:`TO PAY`}),(0,_.jsxs)(`span`,{children:[`₹`,t.total.toFixed(2)]})]}),(0,_.jsx)(`button`,{onClick:()=>S(x?`/checkout`:`/login?redirect=/checkout`),className:`checkout-action-btn`,children:x?`PROCEED TO PAY (\u20B9${t.total.toFixed(2)})`:`LOGIN TO PROCEED`})]})]})]})};export{v as default};