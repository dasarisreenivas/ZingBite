import { useState, useCallback, useContext } from 'react';
import axios from 'axios';
import { AuthContext } from '../context/AuthContext';
import { CartContext } from '../context/CartContext';

export default function useAgent() {
  const { user } = useContext(AuthContext);
  const { cart } = useContext(CartContext);
  const [messages, setMessages] = useState([
    {
      sender: 'bot',
      text: "Hello! I am ZingBot, your custom AI Assistant. I can recommend dishes, track order status, search menu items, check your cart, and more. Try saying: 'Show me Indian food under 300' or 'Add paneer biryani'!"
    }
  ]);
  const [loading, setLoading] = useState(false);
  const [thinkingState, setThinkingState] = useState(null);

  const sendMessage = useCallback(async (messageText) => {
    if (!messageText.trim()) return;

    // Add user message
    setMessages((prev) => [...prev, { sender: 'user', text: messageText }]);
    setLoading(true);
    setThinkingState("Thinking...");
    const thinkingTimers = [];

    // Collect context parameters
    const context = {
      userId: user?.userID || null,
      role: user?.role || 'customer',
      activePage: window.location.pathname,
      cartItems: cart?.items || []
    };

    try {
      // Simulate progressive thinking state transitions
      thinkingTimers.push(window.setTimeout(() => setThinkingState("Analyzing menu database..."), 400));
      thinkingTimers.push(window.setTimeout(() => setThinkingState("Scoring recommendations..."), 800));

      const res = await axios.post('/api/ai/agent/chat', {
        message: messageText,
        sessionId: 'session_' + (user?.userID || 'guest'),
        context: context
      });

      if (res.data && res.data.status === 'success') {
        const botMsg = {
          sender: 'bot',
          text: res.data.message,
          action: res.data.action,
          payload: res.data.payload,
          card: res.data.card,
          quickActions: res.data.quickActions || []
        };
        setMessages((prev) => [...prev, botMsg]);
        return botMsg;
      } else {
        const errorMsg = {
          sender: 'bot',
          text: res.data?.message || "Sorry, I encountered an issue processing your request.",
          quickActions: ["Try again", "Show popular items"]
        };
        setMessages((prev) => [...prev, errorMsg]);
        return errorMsg;
      }
    } catch (e) {
      console.error(e);
      const errorMsg = {
        sender: 'bot',
        text: e.response?.data?.message || "Sorry, I had trouble connecting to the custom AI service. Please try again shortly.",
        quickActions: ["Try again", "Search menu"]
      };
      setMessages((prev) => [...prev, errorMsg]);
      return errorMsg;
    } finally {
      thinkingTimers.forEach((timerId) => window.clearTimeout(timerId));
      setThinkingState(null);
      setLoading(false);
    }
  }, [user, cart]);

  return {
    messages,
    sendMessage,
    loading,
    thinkingState,
    setMessages
  };
}
