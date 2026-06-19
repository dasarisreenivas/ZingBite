import{g as e,n as t,p as n}from"./createLucideIcon-DINBtofy.js";import{t as r}from"./axios-DSK6k93e.js";import{t as i}from"./send-Drf-d725.js";import{D as a,i as o,o as s,p as c,u as l}from"./index-KKOKVewU.js";var u=e(n(),1),d=t(),f=({type:e,targetId:t,onClose:n})=>{let{user:f}=(0,u.useContext)(a),[p,m]=(0,u.useState)([]),[h,g]=(0,u.useState)(``),[_,v]=(0,u.useState)(!0),[y,b]=(0,u.useState)(``),[x,S]=(0,u.useState)(`connecting`),[C,w]=(0,u.useState)(!1),T=(0,u.useRef)(null),E=(0,u.useRef)(null),D=(0,u.useRef)(null),O=(0,u.useRef)(0),k=e=>{if(!e)return``;let t=new Date(e);return isNaN(t.getTime())?e:t.toLocaleTimeString([],{hour:`2-digit`,minute:`2-digit`})},A=async()=>{try{let n=e===`order`?`orderId=${t}`:`applicationId=${t}`;m((await r.get(`/api/chat?${n}&size=100`)).data||[]),b(``)}catch(e){console.error(`Failed to load chat history:`,e),b(`Failed to load previous messages.`)}finally{v(!1)}},j=()=>{if(f)try{let n=`${window.location.protocol===`https:`?`wss:`:`ws:`}//${window.location.port===`5173`?`localhost:8080`:window.location.host}/zingbite/api/ws/chat/${e}/${t}/${f.userID}`;S(`connecting`);let r=new WebSocket(n);T.current=r,r.onopen=()=>{console.log(`[ChatWindow] WebSocket connected.`),S(`open`),w(!1),O.current=0,D.current&&=(clearInterval(D.current),null)},r.onmessage=e=>{try{let t=JSON.parse(e.data);m(e=>e.some(e=>e.id===t.id)?e:[...e,t])}catch(e){console.error(`[ChatWindow] WebSocket parse error:`,e)}},r.onclose=e=>{console.log(`[ChatWindow] WebSocket closed:`,e.code,e.reason),S(`closed`),O.current<3?(O.current+=1,console.log(`[ChatWindow] Reconnect attempt ${O.current}/3 in 3s...`),setTimeout(j,3e3)):(console.log(`[ChatWindow] Max reconnect attempts reached. Falling back to polling.`),M())},r.onerror=e=>{console.error(`[ChatWindow] WebSocket error:`,e),S(`error`)}}catch(e){console.error(`[ChatWindow] WebSocket setup failed:`,e),M()}},M=()=>{w(!0),!D.current&&(D.current=setInterval(()=>{document.visibilityState===`visible`&&A()},5e3))};return(0,u.useEffect)(()=>(A(),j(),()=>{T.current&&=(T.current.close(),null),D.current&&=(clearInterval(D.current),null)}),[e,t]),(0,u.useEffect)(()=>{E.current?.scrollIntoView({behavior:`smooth`})},[p]),(0,d.jsxs)(d.Fragment,{children:[(0,d.jsx)(`style`,{children:`
        .chat-window-premium {
          animation: slideInUpChat 0.3s ease-out;
        }
        @keyframes slideInUpChat {
          from { transform: translateY(12px); opacity: 0; }
          to { transform: translateY(0); opacity: 1; }
        }
        .chat-window-premium .premium-input:focus {
          border-color: #F7374F !important;
          box-shadow: 0 0 0 3px rgba(247,55,79,0.1) !important;
        }
      `}),(0,d.jsxs)(`div`,{className:`chat-window-premium flex flex-col h-[500px] w-[384px] max-w-full bg-white dark:bg-black border border-gray-200 dark:border-neutral-800 rounded-xl shadow-lg overflow-hidden font-sans`,children:[(0,d.jsxs)(`div`,{className:`flex items-center justify-between p-3 bg-brand-red text-white`,children:[(0,d.jsxs)(`div`,{className:`flex items-center gap-2`,children:[(0,d.jsx)(l,{size:20}),(0,d.jsxs)(`div`,{children:[(0,d.jsx)(`h3`,{className:`text-sm font-bold m-0 leading-tight`,children:`ZingBite Chat`}),(0,d.jsxs)(`span`,{className:`text-[10px] text-white/80 flex items-center gap-1`,children:[(0,d.jsx)(`span`,{className:`width-[6px] height-[6px] rounded-full inline-block`,style:{width:`6px`,height:`6px`,backgroundColor:(()=>{switch(x){case`open`:return`#60b246`;case`connecting`:return`#f5a623`;case`closed`:return C?`#f5a623`:`#9e9e9e`;case`error`:return`#e23744`;default:return`#9e9e9e`}})()}}),x===`open`?`Live Connected`:C?`Polling Mode (5s)`:x===`connecting`?`Connecting...`:x===`error`?`Connection Error`:`Disconnected`]})]})]}),(0,d.jsx)(`button`,{onClick:n,className:`bg-transparent border-none color-white cursor-pointer p-1 rounded-full flex items-center hover:bg-white/10 transition-colors`,children:(0,d.jsx)(o,{size:18})})]}),(0,d.jsxs)(`div`,{className:`flex-1 p-4 overflow-y-auto flex flex-col gap-2.5 bg-gray-50 dark:bg-neutral-950`,children:[_?(0,d.jsx)(`div`,{className:`flex items-center justify-center h-full`,children:(0,d.jsx)(c,{size:24,className:`animate-spin text-brand-red`})}):y&&p.length===0?(0,d.jsxs)(`div`,{className:`flex flex-col items-center justify-center h-full text-gray-400 dark:text-neutral-500 gap-1 text-center px-4`,children:[(0,d.jsx)(s,{size:32,className:`text-amber-500`}),(0,d.jsx)(`p`,{className:`text-xs font-semibold`,children:y})]}):p.length===0?(0,d.jsxs)(`div`,{className:`flex flex-col items-center justify-center h-full text-gray-400 dark:text-neutral-500 gap-1 text-center`,children:[(0,d.jsx)(l,{size:32,className:`opacity-60`}),(0,d.jsx)(`p`,{className:`text-xs`,children:`No messages yet. Say hello!`})]}):p.map((e,t)=>{let n=e.senderId===f?.userID;return(0,d.jsxs)(`div`,{className:`flex flex-col ${n?`items-end`:`items-start`}`,children:[(0,d.jsx)(`span`,{className:`text-[10px] text-gray-400 dark:text-neutral-500 mb-0.5`,children:e.senderName}),(0,d.jsxs)(`div`,{className:`p-2 px-3 rounded-2xl text-[13px] max-w-[80%] leading-normal break-word shadow-sm ${n?`bg-brand-red text-white rounded-br-sm`:`bg-white dark:bg-neutral-900 text-gray-900 dark:text-neutral-100 border border-gray-100 dark:border-neutral-800 rounded-bl-sm`}`,children:[(0,d.jsx)(`p`,{className:`m-0`,children:e.messageText}),(0,d.jsx)(`span`,{className:`block text-[9px] mt-1 text-right ${n?`text-white/70`:`text-gray-400 dark:text-neutral-500`}`,children:k(e.timestamp)})]})]},e.id||t)}),(0,d.jsx)(`div`,{ref:E})]}),(0,d.jsxs)(`form`,{onSubmit:async n=>{if(n.preventDefault(),!h.trim()||!f)return;let i={messageText:h,receiverId:0,orderId:e===`order`?t:null,applicationId:e===`application`?t:null};if(x===`open`&&T.current)T.current.send(JSON.stringify(i)),g(``);else try{let e=await r.post(`/api/chat`,i);m(t=>[...t,e.data]),g(``)}catch(e){console.error(`[ChatWindow] Failed to send message via REST:`,e),b(`Failed to send message. Please try again.`)}},className:`p-2.5 border-t border-gray-100 dark:border-neutral-800 flex gap-2 items-center bg-white dark:bg-neutral-900`,children:[(0,d.jsx)(`input`,{type:`text`,value:h,onChange:e=>g(e.target.value),placeholder:`Type your message...`,className:`flex-1 p-2 px-3 text-[13px] border border-gray-200 dark:border-neutral-700 bg-gray-50 dark:bg-neutral-950 text-gray-900 dark:text-neutral-100 rounded-lg outline-none transition-all focus:border-brand-red focus:ring-2 focus:ring-brand-red/10`}),(0,d.jsx)(`button`,{type:`submit`,disabled:!h.trim(),className:`p-2 rounded-lg flex items-center transition-colors ${h.trim()?`bg-brand-red text-white cursor-pointer hover:bg-brand-red-hover`:`bg-gray-100 dark:bg-neutral-800 text-gray-400 dark:text-neutral-600 cursor-default`}`,children:(0,d.jsx)(i,{size:16})})]})]})]})},p=({type:e,targetId:t,initialOpen:n=!1,onClose:r})=>{let[i,a]=(0,u.useState)(n);return(0,d.jsxs)(d.Fragment,{children:[(0,d.jsx)(`style`,{children:`
        .chat-widget-fab {
          position: fixed;
          bottom: 24px;
          right: 90px;
          width: 52px;
          height: 52px;
          border-radius: 50%;
          background: var(--brand-red);
          color: white;
          border: none;
          box-shadow: 0 4px 14px rgba(247, 55, 79, 0.4);
          cursor: pointer;
          display: flex;
          align-items: center;
          justify-content: center;
          z-index: 999;
          transition: all 0.3s cubic-bezier(0.175, 0.885, 0.32, 1.275);
        }
        .chat-widget-fab:hover {
          transform: scale(1.08);
          box-shadow: 0 6px 18px rgba(247, 55, 79, 0.5);
        }
        .chat-panel-container {
          position: fixed;
          bottom: 90px;
          right: 90px;
          z-index: 998;
          display: flex;
          flex-direction: column;
          overflow: hidden;
          animation: slideInUpChat 0.25s ease-out;
        }
        @keyframes slideInUpChat {
          from { transform: translateY(12px); opacity: 0; }
          to { transform: translateY(0); opacity: 1; }
        }
        @media (max-width: 450px) {
          .chat-panel-container {
            right: 16px !important;
            bottom: 140px !important;
            width: calc(100% - 32px) !important;
          }
          .chat-widget-fab {
            right: 16px !important;
            bottom: 16px !important;
          }
        }
      `}),(0,d.jsx)(`button`,{className:`chat-widget-fab`,onClick:()=>{let e=!i;a(e),!e&&r&&r()},title:`Open Support Chat`,children:i?(0,d.jsx)(o,{size:20}):(0,d.jsx)(l,{size:20})}),i&&(0,d.jsx)(`div`,{className:`chat-panel-container`,children:(0,d.jsx)(f,{type:e,targetId:t,onClose:()=>{a(!1),r&&r()}})})]})};export{p as t};