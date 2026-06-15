import{A as e,D as t,E as n,c as r,j as i,m as a,n as o,w as s}from"./index-DQCTz_V-.js";var c=s(`message-square`,[[`path`,{d:`M22 17a2 2 0 0 1-2 2H6.828a2 2 0 0 0-1.414.586l-2.202 2.202A.71.71 0 0 1 2 21.286V5a2 2 0 0 1 2-2h16a2 2 0 0 1 2 2z`,key:`18887p`}]]),l=i(e(),1),u=n(),d=({type:e,targetId:n,userId:i,userName:s,receiverId:d,placeholder:f=`Type a message...`,initialOpen:p=!1,onClose:m})=>{let[h,g]=(0,l.useState)(p),[_,v]=(0,l.useState)([]),[y,b]=(0,l.useState)(``),[x,S]=(0,l.useState)(!1),[C,w]=(0,l.useState)(!1),T=(0,l.useRef)(null),E=(0,l.useRef)(null),D=()=>{E.current?.scrollIntoView({behavior:`smooth`})};(0,l.useEffect)(()=>{h&&D()},[_,h]);let O=async()=>{S(!0);try{let r=`/api/chat?`;e===`order`?r+=`orderId=${n}`:r+=`applicationId=${n}`,v((await t.get(r)).data||[])}catch(e){console.error(`Failed to load chat history:`,e)}finally{S(!1)}},k=()=>{T.current&&T.current.close();let t=String(n).replace(/^ZB-/,``).trim(),r=`${window.location.protocol===`https:`?`wss://`:`ws://`}${window.location.host}/zingbite/api/ws/chat/${e}/${t}/${i}`;console.log(`[WebSocket] Connecting to:`,r);let a=new WebSocket(r);T.current=a,a.onopen=()=>{console.log(`[WebSocket] Connected successfully.`),w(!0)},a.onmessage=e=>{try{let t=JSON.parse(e.data);t&&!t.error&&v(e=>e.some(e=>e.id===t.id||e.timestamp===t.timestamp&&e.messageText===t.messageText)?e:[...e,t])}catch(e){console.error(`WebSocket message parse error:`,e)}},a.onclose=e=>{console.log(`[WebSocket] Connection closed:`,e.reason),w(!1)},a.onerror=e=>{console.error(`[WebSocket] Connection error:`,e),w(!1)}};return(0,l.useEffect)(()=>(h?(O(),k()):T.current&&=(T.current.close(),null),()=>{T.current&&T.current.close()}),[h,n]),(0,u.jsxs)(u.Fragment,{children:[(0,u.jsx)(`style`,{children:`
        .chat-widget-fab {
          position: fixed;
          bottom: 24px;
          right: 90px;
          width: 52px;
          height: 52px;
          border-radius: 50%;
          background: #8b5cf6;
          color: white;
          border: none;
          box-shadow: 0 4px 14px rgba(139, 92, 246, 0.4);
          cursor: pointer;
          display: flex;
          align-items: center;
          justify-content: center;
          z-index: 999;
          transition: all 0.3s cubic-bezier(0.175, 0.885, 0.32, 1.275);
        }
        .chat-widget-fab:hover {
          transform: scale(1.08);
          box-shadow: 0 6px 18px rgba(139, 92, 246, 0.5);
        }
        .chat-panel-container {
          position: fixed;
          bottom: 90px;
          right: 90px;
          width: 350px;
          height: 480px;
          background: white;
          border: 1px solid var(--border-medium);
          border-radius: var(--radius-md);
          box-shadow: 0 10px 30px rgba(0,0,0,0.12);
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
          background: #1a1625;
          color: white;
          padding: 14px 18px;
          display: flex;
          justify-content: space-between;
          align-items: center;
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
          background: #f8f9fc;
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
          background: #8b5cf6;
          color: white;
          border-bottom-right-radius: 2px;
        }
        .chat-bubble.received {
          align-self: flex-start;
          background: white;
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
          background: white;
        }
        .chat-input {
          flex: 1;
          padding: 10px 14px;
          border: 1px solid var(--border-medium);
          border-radius: 20px;
          font-size: 0.88rem;
          outline: none;
        }
        .chat-input:focus {
          border-color: #8b5cf6;
        }
        .chat-send-btn {
          width: 38px;
          height: 38px;
          border-radius: 50%;
          background: #8b5cf6;
          color: white;
          border: none;
          display: flex;
          align-items: center;
          justify-content: center;
          cursor: pointer;
          transition: background 0.2s;
        }
        .chat-send-btn:hover {
          background: #7c3aed;
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
      `}),(0,u.jsx)(`button`,{className:`chat-widget-fab`,onClick:()=>{let e=!h;g(e),!e&&m&&m()},title:`Open Support Chat`,children:h?(0,u.jsx)(o,{size:20}):(0,u.jsx)(c,{size:20})}),h&&(0,u.jsxs)(`div`,{className:`chat-panel-container`,children:[(0,u.jsxs)(`div`,{className:`chat-header`,children:[(0,u.jsxs)(`h4`,{children:[(0,u.jsx)(`span`,{className:`conn-indicator ${C?`online`:`offline`}`}),e===`order`?`Order Chat (ID: ZB-${n})`:`Application Recruiter Chat`]}),(0,u.jsx)(`button`,{onClick:()=>{g(!1),m&&m()},style:{background:`none`,border:`none`,color:`white`,cursor:`pointer`,display:`flex`,alignItems:`center`},children:(0,u.jsx)(o,{size:16})})]}),(0,u.jsxs)(`div`,{className:`chat-messages`,children:[x?(0,u.jsx)(`div`,{style:{display:`flex`,justifyContent:`center`,alignItems:`center`,flex:1},children:(0,u.jsx)(a,{size:20,style:{animation:`spin 1s linear infinite`,color:`#8b5cf6`}})}):_.length===0?(0,u.jsxs)(`div`,{style:{textAlign:`center`,color:`var(--text-muted)`,fontSize:`0.8rem`,padding:`24px 0`,marginTop:`auto`,marginBottom:`auto`},children:[(0,u.jsx)(c,{size:32,style:{margin:`0 auto 8px`,opacity:.3}}),(0,u.jsx)(`p`,{children:`No messages yet. Send a message to start conversation!`})]}):_.map((e,t)=>{let n=e.senderId===i;return(0,u.jsxs)(`div`,{className:`chat-bubble ${n?`sent`:`received`}`,children:[(0,u.jsx)(`div`,{children:e.messageText}),(0,u.jsxs)(`div`,{className:`chat-meta ${n?`sent`:`received`}`,children:[(0,u.jsx)(`strong`,{children:n?`You`:e.senderName}),(0,u.jsx)(`span`,{children:new Date(e.timestamp).toLocaleTimeString([],{hour:`2-digit`,minute:`2-digit`})})]})]},e.id||t)}),(0,u.jsx)(`div`,{ref:E})]}),(0,u.jsxs)(`form`,{onSubmit:r=>{if(r.preventDefault(),y.trim())if(T.current&&T.current.readyState===WebSocket.OPEN){let e={messageText:y,receiverId:d||0};T.current.send(JSON.stringify(e)),b(``)}else{let r=parseInt(String(n).replace(/^ZB-/,``).trim(),10);t.post(`/api/chat`,{messageText:y,receiverId:d||0,orderId:e===`order`?r:null,applicationId:e===`application`?r:null}).then(e=>{v(t=>[...t,e.data]),b(``)}).catch(e=>{console.error(`Failed to post chat message:`,e)})}},className:`chat-footer`,children:[(0,u.jsx)(`input`,{type:`text`,className:`chat-input`,placeholder:f,value:y,onChange:e=>b(e.target.value)}),(0,u.jsx)(`button`,{type:`submit`,className:`chat-send-btn`,children:(0,u.jsx)(r,{size:16})})]})]})]})};export{c as n,d as t};