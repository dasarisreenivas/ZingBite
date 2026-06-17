import{g as e,m as t,n,r,t as i,u as a}from"./createLucideIcon-DnU5s7Zs.js";import{t as o}from"./lock-BudfzplA.js";import{t as s}from"./percent-CJ63YFPx.js";import{t as c}from"./truck-BhgCY32Y.js";import{C as l,S as u,c as d,l as f,n as p,w as m}from"./index-C2WSPP5T.js";var h=i(`banknote`,[[`rect`,{width:`20`,height:`12`,x:`2`,y:`6`,rx:`2`,key:`9lu3g6`}],[`circle`,{cx:`12`,cy:`12`,r:`2`,key:`1c9p78`}],[`path`,{d:`M6 12h.01M18 12h.01`,key:`113zkx`}]]),g=i(`credit-card`,[[`rect`,{width:`20`,height:`14`,x:`2`,y:`5`,rx:`2`,key:`ynyp8z`}],[`line`,{x1:`2`,x2:`22`,y1:`10`,y2:`10`,key:`1b3vmo`}]]),_=i(`smartphone`,[[`rect`,{width:`14`,height:`20`,x:`5`,y:`2`,rx:`2`,ry:`2`,key:`1yt0o3`}],[`path`,{d:`M12 18h.01`,key:`mhygvu`}]]),v=e(t(),1),y=n(),b=()=>{let{cart:e,clearCart:t}=u(),{user:n,updateUser:i}=v.useContext(m),b=a(),{showAlert:x}=p(),[S,C]=(0,v.useState)(`profile`),[w,T]=(0,v.useState)(``),[E,D]=(0,v.useState)(!1),[O,k]=(0,v.useState)(null),[A,j]=(0,v.useState)(null),[M,N]=(0,v.useState)(``),[P,F]=(0,v.useState)(!1),[I,L]=(0,v.useState)(`card`),[R,z]=(0,v.useState)(typeof window<`u`&&!!window.L),B=(0,v.useRef)(null),V=(0,v.useRef)(null),H=(0,v.useRef)(null),[U,W]=(0,v.useState)(!1);(0,v.useEffect)(()=>{if(window.L){z(!0);return}let e=document.querySelector(`link[href*="leaflet.css"]`);e||(e=document.createElement(`link`),e.rel=`stylesheet`,e.href=`https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.9.4/leaflet.css`,document.head.appendChild(e));let t=document.querySelector(`script[src*="leaflet.js"]`);t||(t=document.createElement(`script`),t.src=`https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.9.4/leaflet.js`,t.async=!0,t.onload=()=>{let e=setInterval(()=>{window.L&&(z(!0),clearInterval(e))},50)},document.body.appendChild(t))},[]);let G=async(e,t)=>{W(!0);try{let n=await(await fetch(`https://nominatim.openstreetmap.org/reverse?format=json&lat=${e}&lon=${t}&zoom=18`)).json();n&&n.display_name?(T(n.display_name),k(e),j(t),N(n?.address?.city||n?.address?.town||n?.address?.village||n?.address?.suburb||``)):(T(`Latitude: ${e.toFixed(5)}, Longitude: ${t.toFixed(5)}`),k(e),j(t),N(``))}catch(n){console.error(`Reverse geocoding error:`,n),T(`Latitude: ${e.toFixed(5)}, Longitude: ${t.toFixed(5)}`)}finally{W(!1)}};(0,v.useEffect)(()=>{if(!R||!B.current||S!==`manual`){V.current&&(V.current.remove(),V.current=null,H.current=null);return}if(V.current)return;let e=window.L;if(!e)return;let t=12.9716,n=77.5946,r=e.map(B.current).setView([t,n],14);V.current=r,e.tileLayer(`https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png`,{maxZoom:19,attribution:`&copy; OpenStreetMap contributors`}).addTo(r);let i=e.divIcon({html:`<div style="font-size: 24px; text-align: center; line-height: 24px;">📍</div>`,className:`custom-checkout-marker`,iconSize:[24,24],iconAnchor:[12,12]}),a=e.marker([t,n],{icon:i,draggable:!0}).addTo(r);return H.current=a,a.on(`dragend`,()=>{let e=a.getLatLng();G(e.lat,e.lng)}),r.on(`click`,e=>{a.setLatLng(e.latlng),G(e.latlng.lat,e.latlng.lng)}),G(t,n),()=>{V.current&&(V.current.remove(),V.current=null,H.current=null)}},[R,S]);let K=()=>{if(!navigator.geolocation){x(`Geolocation is not supported by your browser.`,`error`);return}navigator.geolocation.getCurrentPosition(e=>{let{latitude:t,longitude:n}=e.coords;V.current&&(V.current.setView([t,n],16),H.current&&H.current.setLatLng([t,n])),G(t,n)},e=>{x(`Error retrieving location: `+e.message,`error`)})};if(!e||e.itemCount===0)return b(`/cart`),null;let q=async()=>new Promise(e=>{if(window.Razorpay){e(!0);return}let t=document.createElement(`script`);t.src=`https://checkout.razorpay.com/v1/checkout.js`,t.onload=()=>e(!0),t.onerror=()=>e(!1),document.body.appendChild(t)});return(0,y.jsxs)(y.Fragment,{children:[(0,y.jsx)(`style`,{children:`
        .checkout-layout {
          display: grid;
          grid-template-columns: minmax(0, 1fr) 380px;
          width: min(1200px, calc(100% - 40px));
          margin: 24px auto 48px;
          gap: 28px;
          align-items: start;
        }
        .chk-card {
          background: #fff;
          border: 1px solid var(--border-light);
          border-radius: 20px;
          padding: 28px;
          box-shadow: 0 4px 24px rgba(0,0,0,0.04);
        }
        .chk-title {
          font-size: 1.25rem;
          font-weight: 800;
          margin: 0 0 20px;
          padding-bottom: 14px;
          border-bottom: 1.5px solid var(--border-light);
          display: flex;
          align-items: center;
          gap: 10px;
        }
        .chk-title svg { color: var(--brand-red); }
        .option-group { display: flex; flex-direction: column; gap: 10px; margin-bottom: 16px; }
        .option-label {
          display: flex;
          align-items: center;
          gap: 10px;
          padding: 14px;
          border: 1.5px solid var(--border-medium);
          border-radius: 14px;
          cursor: pointer;
          font-weight: 600;
          font-size: 0.95rem;
          transition: all 0.25s var(--ease-premium);
        }
        .option-label:hover { border-color: var(--brand-red); background: rgba(247,55,79,0.02); }
        .option-label input[type="radio"] { accent-color: var(--brand-red); width: 16px; height: 16px; }
        .address-field {
          width: 100%;
          padding: 12px 14px;
          border: 1.5px solid var(--border-medium);
          border-radius: 12px;
          font-size: 0.95rem;
          font-family: inherit;
          outline: none;
          transition: border-color 0.25s var(--ease-premium);
        }
        .address-field:focus { border-color: var(--brand-red); box-shadow: 0 0 0 4px rgba(247,55,79,0.06); }
        .address-field:disabled { background: var(--bg-surface); color: var(--text-muted); cursor: not-allowed; }
        .locate-btn {
          align-self: flex-start;
          padding: 9px 16px;
          font-size: 0.82rem;
          font-weight: 700;
          background: var(--brand-red);
          color: white;
          border: none;
          border-radius: 10px;
          cursor: pointer;
          display: flex;
          align-items: center;
          gap: 6px;
          transition: all 0.25s var(--ease-premium);
          box-shadow: 0 2px 8px rgba(247,55,79,0.2);
        }
        .locate-btn:hover { transform: translateY(-1px); box-shadow: 0 6px 20px rgba(247,55,79,0.3); }
        .chk-summary {
          background: var(--bg-surface);
          padding: 20px;
          border-radius: 14px;
          margin-bottom: 20px;
          border: 1px solid var(--border-light);
        }
        .chk-row { display: flex; justify-content: space-between; margin-bottom: 8px; color: var(--text-secondary); font-size: 0.9rem; }
        .chk-divider { border: none; border-top: 1.5px dashed var(--border-light); margin: 12px 0; }
        .chk-total { font-size: 1.2rem; font-weight: 800; color: var(--text-primary); }
        .pay-btn {
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
          box-shadow: 0 4px 16px rgba(96,178,70,0.25);
        }
        .pay-btn:hover:not(:disabled) { transform: translateY(-2px); box-shadow: 0 8px 28px rgba(96,178,70,0.35); }
        .pay-btn:disabled { opacity: 0.7; cursor: not-allowed; }
        @media (max-width: 850px) {
          .checkout-layout { grid-template-columns: 1fr; margin: 16px auto 32px; gap: 20px; }
        }
        .spin { animation: spin 1s linear infinite; }
        @keyframes spin { from { transform: rotate(0deg); } to { transform: rotate(360deg); } }
      `}),(0,y.jsxs)(`div`,{className:`checkout-layout page-enter`,children:[(0,y.jsxs)(`div`,{className:`chk-card`,children:[(0,y.jsxs)(`h2`,{className:`chk-title`,children:[(0,y.jsx)(f,{size:20}),` Delivery Address`]}),(0,y.jsxs)(`div`,{className:`option-group`,children:[(0,y.jsxs)(`label`,{className:`option-label`,children:[(0,y.jsx)(`input`,{type:`radio`,checked:S===`profile`,onChange:()=>C(`profile`)}),` Use saved address`]}),(0,y.jsxs)(`label`,{className:`option-label`,children:[(0,y.jsx)(`input`,{type:`radio`,checked:S===`manual`,onChange:()=>C(`manual`)}),` Enter new address`]})]}),(0,y.jsxs)(`div`,{style:{display:`flex`,flexDirection:`column`,gap:`10px`},children:[(0,y.jsx)(`input`,{type:`text`,className:`address-field`,placeholder:`Enter your delivery address`,value:S===`profile`?n?n.address:``:w,onChange:e=>{S===`manual`&&T(e.target.value)},disabled:S===`profile`}),S===`manual`&&(0,y.jsxs)(y.Fragment,{children:[(0,y.jsxs)(`button`,{type:`button`,onClick:K,className:`locate-btn`,children:[(0,y.jsx)(f,{size:13}),` `,U?`Detecting...`:`Auto-Detect Location`]}),(0,y.jsx)(`div`,{ref:B,style:{height:`220px`,borderRadius:`12px`,border:`1px solid var(--border-medium)`,zIndex:1}}),(0,y.jsx)(`p`,{style:{fontSize:`0.75rem`,color:`var(--text-muted)`,margin:0},children:`Drag the marker or click on the map to set your delivery location.`})]})]})]}),(0,y.jsxs)(`div`,{className:`chk-card`,children:[(0,y.jsxs)(`h2`,{className:`chk-title`,children:[(0,y.jsx)(g,{size:20}),` Payment`]}),(0,y.jsxs)(`div`,{className:`option-group`,children:[(0,y.jsxs)(`label`,{className:`option-label`,children:[(0,y.jsx)(`input`,{type:`radio`,name:`pay`,value:`card`,checked:I===`card`,onChange:e=>L(e.target.value)}),` `,(0,y.jsx)(g,{size:16}),` Credit / Debit Card`]}),(0,y.jsxs)(`label`,{className:`option-label`,children:[(0,y.jsx)(`input`,{type:`radio`,name:`pay`,value:`upi`,checked:I===`upi`,onChange:e=>L(e.target.value)}),` `,(0,y.jsx)(_,{size:16}),` UPI`]}),(0,y.jsxs)(`label`,{className:`option-label`,children:[(0,y.jsx)(`input`,{type:`radio`,name:`pay`,value:`cod`,checked:I===`cod`,onChange:e=>L(e.target.value)}),` `,(0,y.jsx)(h,{size:16}),` Cash on Delivery`]})]}),(0,y.jsxs)(`div`,{className:`chk-summary`,children:[(0,y.jsxs)(`div`,{className:`chk-row`,children:[(0,y.jsx)(`span`,{children:`Item Total`}),(0,y.jsxs)(`span`,{children:[`₹`,e.subtotal.toFixed(2)]})]}),(0,y.jsxs)(`div`,{className:`chk-row`,children:[(0,y.jsxs)(`span`,{children:[(0,y.jsx)(c,{size:12,style:{marginRight:4,verticalAlign:`middle`}}),` Delivery Fee`]}),(0,y.jsxs)(`span`,{children:[`₹`,e.shipping.toFixed(2)]})]}),(0,y.jsxs)(`div`,{className:`chk-row`,children:[(0,y.jsx)(`span`,{children:`Taxes`}),(0,y.jsxs)(`span`,{children:[`₹`,e.tax.toFixed(2)]})]}),e.discount>0&&(0,y.jsxs)(`div`,{className:`chk-row`,style:{color:`var(--success)`,fontWeight:700},children:[(0,y.jsxs)(`span`,{children:[(0,y.jsx)(s,{size:12,style:{marginRight:2,verticalAlign:`middle`}}),` Discount`]}),(0,y.jsxs)(`span`,{children:[`-₹`,e.discount.toFixed(2)]})]}),(0,y.jsx)(`hr`,{className:`chk-divider`}),(0,y.jsxs)(`div`,{className:`chk-row chk-total`,children:[(0,y.jsx)(`strong`,{children:`TO PAY`}),(0,y.jsxs)(`strong`,{children:[`₹`,e.total.toFixed(2)]})]})]}),(0,y.jsx)(`button`,{onClick:async()=>{if(!(P||E)){if(I===`cod`){F(!0);try{let a=(e.items?Array.isArray(e.items)?e.items:Object.values(e.items):[]).map(e=>({id:e.itemId,qty:e.quantity,price:e.price})),o=S===`profile`?n?.address||``:w;if(S===`manual`&&o){let e=await r.post(`/api/profile`,{action:`update`,username:n.userName||n.username||`User`,mobile:String(n.phoneNumber||n.mobile||``),address:o,latitude:o===w?O:null,longitude:o===w?A:null,city:o===w?M:``});e.data.success&&typeof i==`function`&&i(e.data.user)}let s=await r.post(`/api/profile`,{action:`createOrder`,total:e.total,paymentMethod:`COD`,items:a});if(!s.data.success){x(s.data.error||`Failed to place order.`,`error`),F(!1);return}l(`ORDER_PLACED`,{orderId:s.data.orderId,amount:e.total,method:`COD`}),t(),b(`/track-order?orderId=${s.data.orderId}`)}catch(e){console.error(`Failed to place COD order:`,e),x(`An error occurred placing your order. Please try again.`,`error`)}finally{F(!1)}return}if(!await q()){x(`Failed to load Razorpay payment gateway.`,`error`);return}F(!0);try{let a=(e.items?Array.isArray(e.items)?e.items:Object.values(e.items):[]).map(e=>({id:e.itemId,qty:e.quantity,price:e.price})),o=S===`profile`?n?.address||``:w;if(S===`manual`&&o){let e=await r.post(`/api/profile`,{action:`update`,username:n.userName||n.username||`User`,mobile:String(n.phoneNumber||n.mobile||``),address:o,latitude:o===w?O:null,longitude:o===w?A:null,city:o===w?M:``});e.data.success&&typeof i==`function`&&i(e.data.user)}let s=await r.post(`/api/profile`,{action:`createOrder`,total:e.total,paymentMethod:`Razorpay`,items:a});if(!s.data.success){x(s.data.error||`Failed to reserve order.`,`error`),F(!1);return}let c=s.data.orderId,u=s.data.razorpayOrderId,d={key:`rzp_test_RU5HIdwTwlQNOw`,amount:Math.round(e.total*100),currency:`INR`,name:`ZingBite`,description:`Order Payment`,order_id:u,handler:async function(n){D(!0);try{let i=await r.post(`/api/payment/verify`,{orderId:c,transactionId:n.razorpay_payment_id,paymentMethod:`Razorpay`,razorpayPaymentId:n.razorpay_payment_id,razorpayOrderId:n.razorpay_order_id,razorpaySignature:n.razorpay_signature});i.data.success?(l(`ORDER_PLACED`,{orderId:c,amount:e.total}),t(),b(`/track-order?orderId=${c}`)):x(i.data.error||`Payment verification failed.`,`error`)}catch(n){console.error(`Payment verification timeout/drop:`,n),l(`ORDER_PLACED`,{orderId:c,amount:e.total}),t(),b(`/track-order?orderId=${c}`)}finally{D(!1)}},modal:{ondismiss:async function(){console.log(`Payment gateway dismissed. Cancelling reserved order.`);try{await r.post(`/api/payment/verify`,{orderId:c,transactionId:`pay_abandoned_`+c,paymentMethod:`Razorpay`})}catch(e){console.error(`Failed to notify server of cancellation:`,e)}}},theme:{color:`#F7374F`}};new window.Razorpay(d).open()}catch(e){console.error(`Failed to initialize checkout transaction:`,e),x(`An error occurred during checkout setup. Please try again.`,`error`)}finally{F(!1)}}},className:`pay-btn`,disabled:P||E,children:P?`Redirecting to Payment...`:`SECURE PAY (\u20B9${e.total.toFixed(2)})`}),(0,y.jsxs)(`div`,{style:{display:`flex`,alignItems:`center`,justifyContent:`center`,gap:`6px`,marginTop:`12px`,fontSize:`0.75rem`,color:`var(--text-muted)`},children:[(0,y.jsx)(o,{size:12}),` Secured by Razorpay`]})]})]}),E&&(0,y.jsx)(`div`,{style:{position:`fixed`,inset:0,background:`rgba(10, 10, 15, 0.85)`,backdropFilter:`blur(8px)`,display:`flex`,flexDirection:`column`,justifyContent:`center`,alignItems:`center`,zIndex:9999,color:`#fff`},children:(0,y.jsxs)(`div`,{style:{background:`rgba(20, 20, 30, 0.95)`,border:`1px solid rgba(255, 255, 255, 0.08)`,padding:`40px 30px`,borderRadius:`20px`,textAlign:`center`,maxWidth:`400px`,width:`100%`,boxShadow:`0 8px 32px rgba(0,0,0,0.37)`},children:[(0,y.jsx)(`div`,{className:`spin`,style:{width:`48px`,height:`48px`,border:`4px solid rgba(247, 55, 79, 0.1)`,borderTopColor:`#f7374f`,borderRadius:`50%`,margin:`0 auto 24px`}}),(0,y.jsx)(`h3`,{style:{fontSize:`1.4rem`,fontWeight:800,marginBottom:`12px`,fontFamily:`Outfit, sans-serif`},children:`Securing Your Payment`}),(0,y.jsxs)(`p`,{style:{color:`#94a3b8`,fontSize:`0.9rem`,lineHeight:`1.6`,margin:0,display:`flex`,alignItems:`center`,justifyContent:`center`,gap:`6px`},children:[(0,y.jsx)(d,{size:16}),` Verifying transaction with payment gateway…`]})]})})]})};export{b as default};