"import React, { useState, useEffect, useRef, useContext } from 'react';
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
     
<truncated 12402 bytes>