import React, { useState, useEffect, useRef } from 'react';
import axios from 'axios';
import { Send, X, MessageSquare, Loader } from 'lucide-react';

const ChatWidget = ({ type, targetId, userId, userName, receiverId, placeholder = "Type a message...", initialOpen = false, onClose }) => {
  const [isOpen, setIsOpen] = useState(initialOpen);
  const [messages, setMessages] = useState([]);
  const [inputText, setInputText] = useState('');
  const [loadingHistory, setLoadingHistory] = useState(false);
  const [isConnected, setIsConnected] = useState(false);
  
  const wsRef = useRef(null);
  const messagesEndRef = useRef(null);

  // Scroll to bottom helper
  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    if (isOpen) {
      scrollToBottom();
    }
  }, [messages, isOpen]);

  // Fetch chat history
  const fetchHistory = async () => {
    setLoadingHistory(true);
    try {
      let url = '/api/chat?';
      if (type === 'order') {
        url += `orderId=${targetId}`;
      } else {
        url += `applicationId=${targetId}`;
      }
      const res = await axios.get(url);
      setMessages(res.data || []);
    } catch (err) {
      console.error("Failed to load chat history:", err);
    } finally {
      setLoadingHistory(false);
    }
  };

  // Connect WebSocket
  const connectWebSocket = () => {
    if (wsRef.current) {
      wsRef.current.close();
    }

    const cleanTargetId = String(targetId).replace(/^ZB-/, '').trim();
    const wsProtocol = window.location.protocol === 'https:' ? 'wss://' : 'ws://';
    const wsUrl = `${wsProtocol}${window.location.host}/zingbite/api/ws/chat/${type}/${cleanTargetId}/${userId}`;
    
    console.log("[WebSocket] Connecting to:", wsUrl);
    const ws = new WebSocket(wsUrl);
    wsRef.current = ws;

    ws.onopen = () => {
      console.log("[WebSocket] Connected successfully.");
      setIsConnected(true);
    };

    ws.onmessage = (event) => {
      try {
        const msg = JSON.parse(event.data);
        if (msg && !msg.error) {
          setMessages(prev => {
            // Avoid adding duplicates if already loaded
            if (prev.some(p => p.id === msg.id || (p.timestamp === msg.timestamp && p.messageText === msg.messageText))) {
              return prev;
            }
            return [...prev, msg];
          });
        }
      } catch (err) {
        console.error("WebSocket message parse error:", err);
      }
    };

    ws.onclose = (e) => {
      console.log("[WebSocket] Connection closed:", e.reason);
      setIsConnected(false);
    };

    ws.onerror = (err) => {
      console.error("[WebSocket] Connection error:", err);
      setIsConnected(false);
    };
  };

  // Trigger when chat is opened
  useEffect(() => {
    if (isOpen) {
      fetchHistory();
      connectWebSocket();
    } else {
      if (wsRef.current) {
        wsRef.current.close();
        wsRef.current = null;
      }
    }

    return () => {
      if (wsRef.current) {
        wsRef.current.close();
      }
    };
  }, [isOpen, targetId]);

  const handleSendMessage = (e) => {
    e.preventDefault();
    if (!inputText.trim()) return;

    if (wsRef.current && wsRef.current.readyState === WebSocket.OPEN) {
      const payload = {
        messageText: inputText,
        receiverId: receiverId || 0
      };
      wsRef.current.send(JSON.stringify(payload));
      setInputText('');
    } else {
      // Fallback post via REST API
      const cleanTargetId = parseInt(String(targetId).replace(/^ZB-/, '').trim(), 10);
      axios.post('/api/chat', {
        messageText: inputText,
        receiverId: receiverId || 0,
        orderId: type === 'order' ? cleanTargetId : null,
        applicationId: type === 'application' ? cleanTargetId : null
      }).then((res) => {
        setMessages(prev => [...prev, res.data]);
        setInputText('');
      }).catch(err => {
        console.error("Failed to post chat message:", err);
      });
    }
  };

  return (
    <>
      <style>{`
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
      `}</style>

      {/* FAB Trigger Button */}
      <button 
        className="chat-widget-fab"
        onClick={() => {
          const next = !isOpen;
          setIsOpen(next);
          if (!next && onClose) onClose();
        }}
        title="Open Support Chat"
      >
        {isOpen ? <X size={20} /> : <MessageSquare size={20} />}
      </button>

      {/* Chat Window Panel */}
      {isOpen && (
        <div className="chat-panel-container">
          <div className="chat-header">
            <h4>
              <span className={`conn-indicator ${isConnected ? 'online' : 'offline'}`} />
              {type === 'order' ? `Order Chat (ID: ZB-${targetId})` : `Application Recruiter Chat`}
            </h4>
            <button 
              onClick={() => {
                setIsOpen(false);
                if (onClose) onClose();
              }}
              style={{ background: 'none', border: 'none', color: 'white', cursor: 'pointer', display: 'flex', alignItems: 'center' }}
            >
              <X size={16} />
            </button>
          </div>

          <div className="chat-messages">
            {loadingHistory ? (
              <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', flex: 1 }}>
                <Loader size={20} style={{ animation: 'spin 1s linear infinite', color: '#8b5cf6' }} />
              </div>
            ) : messages.length === 0 ? (
              <div style={{ textAlign: 'center', color: 'var(--text-muted)', fontSize: '0.8rem', padding: '24px 0', marginTop: 'auto', marginBottom: 'auto' }}>
                <MessageSquare size={32} style={{ margin: '0 auto 8px', opacity: 0.3 }} />
                <p>No messages yet. Send a message to start conversation!</p>
              </div>
            ) : (
              messages.map((msg, index) => {
                const isSentByMe = msg.senderId === userId;
                return (
                  <div 
                    key={msg.id || index}
                    className={`chat-bubble ${isSentByMe ? 'sent' : 'received'}`}
                  >
                    <div>{msg.messageText}</div>
                    <div className={`chat-meta ${isSentByMe ? 'sent' : 'received'}`}>
                      <strong>{isSentByMe ? 'You' : msg.senderName}</strong>
                      <span>
                        {new Date(msg.timestamp).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                      </span>
                    </div>
                  </div>
                );
              })
            )}
            <div ref={messagesEndRef} />
          </div>

          <form onSubmit={handleSendMessage} className="chat-footer">
            <input 
              type="text"
              className="chat-input"
              placeholder={placeholder}
              value={inputText}
              onChange={e => setInputText(e.target.value)}
            />
            <button type="submit" className="chat-send-btn">
              <Send size={16} />
            </button>
          </form>
        </div>
      )}
    </>
  );
};

export default ChatWidget;
