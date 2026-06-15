import React, { useState, useEffect, useRef, useContext } from 'react';
import axios from 'axios';
import { Send, X, Loader, AlertTriangle, MessageSquare } from 'lucide-react';
import { AuthContext } from '../context/AuthContext';

const ChatWindow = ({ type, targetId, onClose }) => {
  const { user } = useContext(AuthContext);
  const [messages, setMessages] = useState([]);
  const [newMessage, setNewMessage] = useState('');
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [wsStatus, setWsStatus] = useState('connecting'); // connecting, open, closed, error
  const [isPollFallback, setIsPollFallback] = useState(false);

  const socketRef = useRef(null);
  const messageEndRef = useRef(null);
  const pollTimerRef = useRef(null);
  const reconnectAttemptsRef = useRef(0);

  // Format timestamp to localized time
  const formatTime = (timeStr) => {
    if (!timeStr) return '';
    const date = new Date(timeStr);
    if (isNaN(date.getTime())) return timeStr;
    return date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
  };

  // Fetch initial history
  const fetchHistory = async () => {
    try {
      const idParam = type === 'order' ? `orderId=${targetId}` : `applicationId=${targetId}`;
      const res = await axios.get(`/api/chat?${idParam}&size=100`);
      setMessages(res.data || []);
      setError('');
    } catch (err) {
      console.error('Failed to load chat history:', err);
      setError('Failed to load previous messages.');
    } finally {
      setLoading(false);
    }
  };

  // Setup WebSocket connection
  const connectWebSocket = () => {
    if (!user) return;

    try {
      const wsProtocol = window.location.protocol === 'https:' ? 'wss:' : 'ws:';
      const host = window.location.port === '5173' ? 'localhost:8080' : window.location.host;
      const wsUrl = `${wsProtocol}//${host}/zingbite/api/ws/chat/${type}/${targetId}/${user.userID}`;

      setWsStatus('connecting');
      const socket = new WebSocket(wsUrl);
      socketRef.current = socket;

      socket.onopen = () => {
        console.log('[ChatWindow] WebSocket connected.');
        setWsStatus('open');
        setIsPollFallback(false);
        reconnectAttemptsRef.current = 0;
        // Stop polling if it was running
        if (pollTimerRef.current) {
          clearInterval(pollTimerRef.current);
          pollTimerRef.current = null;
        }
      };

      socket.onmessage = (event) => {
        try {
          const chatMsg = JSON.parse(event.data);
          setMessages((prev) => {
            // Deduplicate by id
            if (prev.some(m => m.id === chatMsg.id)) return prev;
            return [...prev, chatMsg];
          });
        } catch (err) {
          console.error('[ChatWindow] WebSocket parse error:', err);
        }
      };

      socket.onclose = (event) => {
        console.log('[ChatWindow] WebSocket closed:', event.code, event.reason);
        setWsStatus('closed');
        // Attempt reconnect up to 3 times
        if (reconnectAttemptsRef.current < 3) {
          reconnectAttemptsRef.current += 1;
          console.log(`[ChatWindow] Reconnect attempt ${reconnectAttemptsRef.current}/3 in 3s...`);
          setTimeout(connectWebSocket, 3000);
        } else {
          console.log('[ChatWindow] Max reconnect attempts reached. Falling back to polling.');
          startPollingFallback();
        }
      };

      socket.onerror = (err) => {
        console.error('[ChatWindow] WebSocket error:', err);
        setWsStatus('error');
      };
    } catch (err) {
      console.error('[ChatWindow] WebSocket setup failed:', err);
      startPollingFallback();
    }
  };

  // Polling fallback when WebSocket is unavailable
  const startPollingFallback = () => {
    setIsPollFallback(true);
    if (pollTimerRef.current) return; // Already polling
    pollTimerRef.current = setInterval(() => {
      if (document.visibilityState === 'visible') {
        fetchHistory();
      }
    }, 5000);
  };

  // Send message via WebSocket or REST fallback
  const handleSendMessage = async (e) => {
    e.preventDefault();
    if (!newMessage.trim() || !user) return;

    const msgPayload = {
      messageText: newMessage,
      receiverId: 0,
      orderId: type === 'order' ? targetId : null,
      applicationId: type === 'application' ? targetId : null
    };

    if (wsStatus === 'open' && socketRef.current) {
      // Send via WebSocket
      socketRef.current.send(JSON.stringify(msgPayload));
      setNewMessage('');
    } else {
      // REST fallback
      try {
        const res = await axios.post('/api/chat', msgPayload);
        setMessages((prev) => [...prev, res.data]);
        setNewMessage('');
      } catch (err) {
        console.error('[ChatWindow] Failed to send message via REST:', err);
        setError('Failed to send message. Please try again.');
      }
    }
  };

  // Initialize on mount
  useEffect(() => {
    fetchHistory();
    connectWebSocket();

    return () => {
      if (socketRef.current) {
        socketRef.current.close();
        socketRef.current = null;
      }
      if (pollTimerRef.current) {
        clearInterval(pollTimerRef.current);
        pollTimerRef.current = null;
      }
    };
  }, [type, targetId]);

  // Auto-scroll to bottom on new messages
  useEffect(() => {
    messageEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  // Connection status indicator
  const getStatusColor = () => {
    switch (wsStatus) {
      case 'open': return '#60b246';
      case 'connecting': return '#f5a623';
      case 'closed': return isPollFallback ? '#f5a623' : '#9e9e9e';
      case 'error': return '#e23744';
      default: return '#9e9e9e';
    }
  };

  const getStatusText = () => {
    if (wsStatus === 'open') return 'Live Connected';
    if (isPollFallback) return 'Polling Mode (5s)';
    if (wsStatus === 'connecting') return 'Connecting...';
    if (wsStatus === 'error') return 'Connection Error';
    return 'Disconnected';
  };

  return (
    <>
      <style>{`
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
      `}</style>
      <div className="chat-window-premium" style={{
      display: 'flex', flexDirection: 'column', height: '500px', width: '384px',
      backgroundColor: '#ffffff', border: '1px solid #e0e0e0', borderRadius: '12px',
      boxShadow: '0 12px 32px rgba(28,28,28,0.12)', overflow: 'hidden', fontFamily: "'Inter', sans-serif"
    }}>
      {/* Header */}
      <div style={{
        display: 'flex', alignItems: 'center', justifyContent: 'space-between',
        padding: '12px 16px', backgroundColor: '#F7374F', color: '#fff'
      }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
          <MessageSquare size={20} />
          <div>
            <h3 style={{ fontSize: '14px', fontWeight: 700, margin: 0, lineHeight: 1.2 }}>ZingBite Chat</h3>
            <span style={{ fontSize: '10px', opacity: 0.85, display: 'flex', alignItems: 'center', gap: '4px' }}>
              <span style={{
                width: '6px', height: '6px', borderRadius: '50%',
                backgroundColor: getStatusColor(), display: 'inline-block'
              }} />
              {getStatusText()}
            </span>
          </div>
        </div>
        <button onClick={onClose} style={{
          background: 'transparent', border: 'none', color: '#fff', cursor: 'pointer',
          padding: '4px', borderRadius: '50%', display: 'flex', alignItems: 'center'
        }}>
          <X size={18} />
        </button>
      </div>

      {/* Messages Area */}
      <div style={{
        flex: 1, padding: '16px', overflowY: 'auto', display: 'flex', flexDirection: 'column',
        gap: '10px', backgroundColor: '#f8f9fa'
      }}>
        {loading ? (
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', height: '100%' }}>
            <Loader size={24} style={{ animation: 'spin 1s linear infinite' }} color="#F7374F" />
          </div>
        ) : error && messages.length === 0 ? (
          <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', height: '100%', color: '#9e9e9e', gap: '4px', textAlign: 'center', padding: '0 16px' }}>
            <AlertTriangle size={32} color="#f5a623" />
            <p style={{ fontSize: '12px', fontWeight: 600 }}>{error}</p>
          </div>
        ) : messages.length === 0 ? (
          <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', height: '100%', color: '#9e9e9e', gap: '4px', textAlign: 'center' }}>
            <MessageSquare size={32} style={{ opacity: 0.6 }} />
            <p style={{ fontSize: '12px' }}>No messages yet. Say hello!</p>
          </div>
        ) : (
          messages.map((msg, idx) => {
            const isMe = msg.senderId === user?.userID;
            return (
              <div key={msg.id || idx} style={{ display: 'flex', flexDirection: 'column', alignItems: isMe ? 'flex-end' : 'flex-start' }}>
                <span style={{ fontSize: '10px', color: '#9e9e9e', marginBottom: '2px' }}>{msg.senderName}</span>
                <div style={{
                  padding: '8px 12px', borderRadius: isMe ? '12px 12px 2px 12px' : '12px 12px 12px 2px',
                  fontSize: '13px', maxWidth: '80%', lineHeight: 1.4, wordBreak: 'break-word',
                  backgroundColor: isMe ? '#F7374F' : '#fff',
                  color: isMe ? '#fff' : '#1c1c1c',
                  border: isMe ? 'none' : '1px solid #f0f0f0',
                  boxShadow: '0 1px 3px rgba(0,0,0,0.06)'
                }}>
                  <p style={{ margin: 0 }}>{msg.messageText}</p>
                  <span style={{
                    display: 'block', fontSize: '9px', marginTop: '4px', textAlign: 'right',
                    color: isMe ? 'rgba(255,255,255,0.7)' : '#9e9e9e'
                  }}>
                    {formatTime(msg.timestamp)}
                  </span>
                </div>
              </div>
            );
          })
        )}
        <div ref={messageEndRef} />
      </div>

      {/* Input Area */}
      <form onSubmit={handleSendMessage} style={{
        padding: '10px 12px', borderTop: '1px solid #f0f0f0', display: 'flex', gap: '8px',
        alignItems: 'center', backgroundColor: '#fff'
      }}>
          <input
            type="text"
            value={newMessage}
            onChange={(e) => setNewMessage(e.target.value)}
            placeholder="Type your message..."
            className="premium-input"
            style={{
              flex: 1, padding: '8px 12px', fontSize: '13px', border: '1px solid #e0e0e0',
              borderRadius: '8px', outline: 'none', fontFamily: "'Inter', sans-serif",
              transition: 'border-color 0.2s'
            }}
            onFocus={(e) => e.target.style.borderColor = '#F7374F'}
            onBlur={(e) => e.target.style.borderColor = '#e0e0e0'}
          />
        <button
          type="submit"
          disabled={!newMessage.trim()}
          style={{
            padding: '8px', backgroundColor: newMessage.trim() ? '#F7374F' : '#e0e0e0',
            color: newMessage.trim() ? '#fff' : '#9e9e9e', border: 'none', borderRadius: '8px',
            cursor: newMessage.trim() ? 'pointer' : 'default', display: 'flex', alignItems: 'center',
            transition: 'background-color 0.2s'
          }}
        >
          <Send size={16} />
        </button>
      </form>
    </div></>
  );
};

export default ChatWindow;