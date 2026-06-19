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
      <div className="chat-window-premium flex flex-col h-[500px] w-[384px] max-w-full bg-white dark:bg-black border border-gray-200 dark:border-neutral-800 rounded-xl shadow-lg overflow-hidden font-sans">
      {/* Header */}
      <div className="flex items-center justify-between p-3 bg-brand-red text-white">
        <div className="flex items-center gap-2">
          <MessageSquare size={20} />
          <div>
            <h3 className="text-sm font-bold m-0 leading-tight">ZingBite Chat</h3>
            <span className="text-[10px] text-white/80 flex items-center gap-1">
              <span 
                className="width-[6px] height-[6px] rounded-full inline-block" 
                style={{ width: '6px', height: '6px', backgroundColor: getStatusColor() }} 
              />
              {getStatusText()}
            </span>
          </div>
        </div>
        <button onClick={onClose} className="bg-transparent border-none color-white cursor-pointer p-1 rounded-full flex items-center hover:bg-white/10 transition-colors">
          <X size={18} />
        </button>
      </div>

      {/* Messages Area */}
      <div className="flex-1 p-4 overflow-y-auto flex flex-col gap-2.5 bg-gray-50 dark:bg-neutral-950">
        {loading ? (
          <div className="flex items-center justify-center h-full">
            <Loader size={24} className="animate-spin text-brand-red" />
          </div>
        ) : error && messages.length === 0 ? (
          <div className="flex flex-col items-center justify-center h-full text-gray-400 dark:text-neutral-500 gap-1 text-center px-4">
            <AlertTriangle size={32} className="text-amber-500" />
            <p className="text-xs font-semibold">{error}</p>
          </div>
        ) : messages.length === 0 ? (
          <div className="flex flex-col items-center justify-center h-full text-gray-400 dark:text-neutral-500 gap-1 text-center">
            <MessageSquare size={32} className="opacity-60" />
            <p className="text-xs">No messages yet. Say hello!</p>
          </div>
        ) : (
          messages.map((msg, idx) => {
            const isMe = msg.senderId === user?.userID;
            return (
              <div key={msg.id || idx} className={`flex flex-col ${isMe ? 'items-end' : 'items-start'}`}>
                <span className="text-[10px] text-gray-400 dark:text-neutral-500 mb-0.5">{msg.senderName}</span>
                <div className={`p-2 px-3 rounded-2xl text-[13px] max-w-[80%] leading-normal break-word shadow-sm ${
                  isMe 
                    ? 'bg-brand-red text-white rounded-br-sm' 
                    : 'bg-white dark:bg-neutral-900 text-gray-900 dark:text-neutral-100 border border-gray-100 dark:border-neutral-800 rounded-bl-sm'
                }`}>
                  <p className="m-0">{msg.messageText}</p>
                  <span className={`block text-[9px] mt-1 text-right ${isMe ? 'text-white/70' : 'text-gray-400 dark:text-neutral-500'}`}>
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
      <form onSubmit={handleSendMessage} className="p-2.5 border-t border-gray-100 dark:border-neutral-800 flex gap-2 items-center bg-white dark:bg-neutral-900">
        <input
          type="text"
          value={newMessage}
          onChange={(e) => setNewMessage(e.target.value)}
          placeholder="Type your message..."
          className="flex-1 p-2 px-3 text-[13px] border border-gray-200 dark:border-neutral-700 bg-gray-50 dark:bg-neutral-950 text-gray-900 dark:text-neutral-100 rounded-lg outline-none transition-all focus:border-brand-red focus:ring-2 focus:ring-brand-red/10"
        />
        <button
          type="submit"
          disabled={!newMessage.trim()}
          className={`p-2 rounded-lg flex items-center transition-colors ${
            newMessage.trim() 
              ? 'bg-brand-red text-white cursor-pointer hover:bg-brand-red-hover' 
              : 'bg-gray-100 dark:bg-neutral-800 text-gray-400 dark:text-neutral-600 cursor-default'
          }`}
        >
          <Send size={16} />
        </button>
      </form>
    </div></>
  );
};

export default ChatWindow;