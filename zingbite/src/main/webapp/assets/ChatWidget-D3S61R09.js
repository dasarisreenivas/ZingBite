import{g as e,m as t,n,r,t as i}from"./createLucideIcon-DnU5s7Zs.js";import{t as a}from"./send-CBtMFMV_.js";import{d as o,r as s}from"./index-DbXf8GKr.js";var c=i(`message-square`,[[`path`,{d:`M22 17a2 2 0 0 1-2 2H6.828a2 2 0 0 0-1.414.586l-2.202 2.202A.71.71 0 0 1 2 21.286V5a2 2 0 0 1 2-2h16a2 2 0 0 1 2 2z`,key:`18887p`}]]),l=e(t(),1),u=n(),d=({type:e,targetId:t,userId:n,userName:i,receiverId:d,placeholder:f=`Type a message...`,initialOpen:p=!1,onClose:m})=>{let[h,g]=(0,l.useState)(p),[_,v]=(0,l.useState)([]),[y,b]=(0,l.useState)(``),[x,S]=(0,l.useState)(!1),[C,w]=(0,l.useState)(!1),T=(0,l.useRef)(null),E=(0,l.useRef)(null),D=()=>{E.current?.scrollIntoView({behavior:`smooth`})};(0,l.useEffect)(()=>{h&&D()},[_,h]);let O=async()=>{S(!0);try{let n=`/api/chat?`;e===`order`?n+=`orderId=${t}`:n+=`applicationId=${t}`,v((await r.get(n)).data||[])}catch(e){console.error(`Failed to load chat history:`,e)}finally{S(!1)}},k=()=>{T.current&&T.current.close();let r=String(t).replace(/^ZB-/,``).trim(),i=`${window.location.protocol===`https:`?`wss://`:`ws://`}${window.location.host}/zingbite/api/ws/chat/${e}/${r}/${n}`;console.log(`[WebSocket] Connecting to:`,i);let a=new WebSocket(i);T.current=a,a.onopen=()=>{console.log(`[WebSocket] Connected successfully.`),w(!0)},a.onmessage=e=>{try{let t=JSON.parse(e.data);t&&!t.error&&v(e=>e.some(e=>e.id===t.id||e.timestamp===t.timestamp&&e.messageText===t.messageText)?e:[...e,t])}catch(e){console.error(`WebSocket message parse error:`,e)}},a.onclose=e=>{console.log(`[WebSocket] Connection closed:`,e.reason),w(!1)},a.onerror=e=>{console.error(`[WebSocket] Connection error:`,e),w(!1)}};return(0,l.useEffect)(()=>(h?(O(),k()):T.current&&=(T.current.close(),null),()=>{T.current&&T.current.close()}),[h,t]),(0,u.jsxs)(u.Fragment,{children:[(0,u.jsx)(`style`,{children:`
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
          width: 350px;
          height: 480px;
          background: var(--surface-overlay);
          border: 1px solid var(--border-medium);
          border-radius: var(--radius-md);
          box-shadow: var(--shadow-lg);
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
        .chat-header {
          background: linear-gradient(135deg, #16161a, #000000);
          color: white;
          padding: 14px 18px;
          display: flex;
          justify-content: space-between;
          align-items: center;
          border-bottom: 1px solid var(--border-light);
        }
        .chat-header h4 {
          margin: 0;
          font-size: 0.95rem;
          font-weight: 700;
          display: flex;
          align-items: center;
          gap: 6px;
        }
        .conn-indicator {
          width: 8px;
          height: 8px;
          border-radius: 50%;
          display: inline-block;
        }
        .conn-indicator.online { background: #60b246; }
        .conn-indicator.offline { background: #ff4d4f; }
        
        .chat-messages {
          flex: 1;
          padding: 16px;
          overflow-y: auto;
          background: var(--bg-surface);
          display: flex;
          flex-direction: column;
          gap: 12px;
        }
        .chat-bubble {
          max-width: 80%;
          padding: 10px 14px;
          border-radius: var(--radius-md);
          font-size: 0.85rem;
          line-height: 1.4;
          word-break: break-word;
          position: relative;
        }
        .chat-bubble.sent {
          align-self: flex-end;
          background: linear-gradient(135deg, var(--brand-red), #ff6b7a);
          color: white;
          border-bottom-right-radius: 2px;
        }
        .chat-bubble.received {
          align-self: flex-start;
          background: var(--surface-card);
          color: var(--text-primary);
          border: 1px solid var(--border-medium);
          border-bottom-left-radius: 2px;
        }
        .chat-meta {
          font-size: 0.68rem;
          margin-top: 4px;
          display: flex;
          justify-content: space-between;
          gap: 12px;
          opacity: 0.85;
        }
        .chat-meta.received {
          color: var(--text-muted);
        }
        .chat-meta.sent {
          color: rgba(255,255,255,0.85);
        }
        
        .chat-footer {
          padding: 12px;
          border-top: 1px solid var(--border-light);
          display: flex;
          gap: 8px;
          background: var(--surface-overlay);
        }
        .chat-input {
          flex: 1;
          padding: 10px 14px;
          border: 1px solid var(--border-medium);
          border-radius: 20px;
          background: var(--bg-main);
          color: var(--text-primary);
          font-size: 0.88rem;
          outline: none;
        }
        .chat-input:focus {
          border-color: var(--brand-red);
          box-shadow: 0 0 0 3px var(--brand-tint-medium);
        }
        .chat-send-btn {
          width: 38px;
          height: 38px;
          border-radius: 50%;
          background: var(--brand-red);
          color: white;
          border: none;
          display: flex;
          align-items: center;
          justify-content: center;
          cursor: pointer;
          transition: background 0.2s;
        }
        .chat-send-btn:hover {
          background: var(--brand-red-hover);
          transform: scale(1.05);
          box-shadow: 0 2px 8px rgba(247,55,79,0.4);
        }
        @media (max-width: 450px) {
          .chat-panel-container {
            right: 12px;
            bottom: 80px;
            width: calc(100% - 24px);
            height: 420px;
          }
          .chat-widget-fab {
            right: 12px;
            bottom: 12px;
          }
        }
      `}),(0,u.jsx)(`button`,{className:`chat-widget-fab`,onClick:()=>{let e=!h;g(e),!e&&m&&m()},title:`Open Support Chat`,children:h?(0,u.jsx)(s,{size:20}):(0,u.jsx)(c,{size:20})}),h&&(0,u.jsxs)(`div`,{className:`chat-panel-container`,children:[(0,u.jsxs)(`div`,{className:`chat-header`,children:[(0,u.jsxs)(`h4`,{children:[(0,u.jsx)(`span`,{className:`conn-indicator ${C?`online`:`offline`}`}),e===`order`?`Order Chat (ID: ZB-${t})`:`Application Recruiter Chat`]}),(0,u.jsx)(`button`,{onClick:()=>{g(!1),m&&m()},style:{background:`none`,border:`none`,color:`white`,cursor:`pointer`,display:`flex`,alignItems:`center`},children:(0,u.jsx)(s,{size:16})})]}),(0,u.jsxs)(`div`,{className:`chat-messages`,children:[x?(0,u.jsx)(`div`,{style:{display:`flex`,justifyContent:`center`,alignItems:`center`,flex:1},children:(0,u.jsx)(o,{size:20,style:{animation:`spin 1s linear infinite`,color:`#8b5cf6`}})}):_.length===0?(0,u.jsxs)(`div`,{style:{textAlign:`center`,color:`var(--text-muted)`,fontSize:`0.8rem`,padding:`24px 0`,marginTop:`auto`,marginBottom:`auto`},children:[(0,u.jsx)(c,{size:32,style:{margin:`0 auto 8px`,opacity:.3}}),(0,u.jsx)(`p`,{children:`No messages yet. Send a message to start conversation!`})]}):_.map((e,t)=>{let r=e.senderId===n;return(0,u.jsxs)(`div`,{className:`chat-bubble ${r?`sent`:`received`}`,children:[(0,u.jsx)(`div`,{children:e.messageText}),(0,u.jsxs)(`div`,{className:`chat-meta ${r?`sent`:`received`}`,children:[(0,u.jsx)(`strong`,{children:r?`You`:e.senderName}),(0,u.jsx)(`span`,{children:new Date(e.timestamp).toLocaleTimeString([],{hour:`2-digit`,minute:`2-digit`})})]})]},e.id||t)}),(0,u.jsx)(`div`,{ref:E})]}),(0,u.jsxs)(`form`,{onSubmit:n=>{if(n.preventDefault(),y.trim())if(T.current&&T.current.readyState===WebSocket.OPEN){let e={messageText:y,receiverId:d||0};T.current.send(JSON.stringify(e)),b(``)}else{let n=parseInt(String(t).replace(/^ZB-/,``).trim(),10);r.post(`/api/chat`,{messageText:y,receiverId:d||0,orderId:e===`order`?n:null,applicationId:e===`application`?n:null}).then(e=>{v(t=>[...t,e.data]),b(``)}).catch(e=>{console.error(`Failed to post chat message:`,e)})}},className:`chat-footer`,children:[(0,u.jsx)(`input`,{type:`text`,className:`chat-input`,placeholder:f,value:y,onChange:e=>b(e.target.value)}),(0,u.jsx)(`button`,{type:`submit`,className:`chat-send-btn`,children:(0,u.jsx)(a,{size:16})})]})]})]})};export{c as n,d as t};