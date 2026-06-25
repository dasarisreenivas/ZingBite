import { useState, useEffect, useRef, useContext } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import axios from 'axios';
import { Sparkles, Mic, MicOff, Send, X, Bot, User as UserIcon } from 'lucide-react';
import { CartContext } from '../context/CartContext';

export default function AIAssistant() {
  const [isOpen, setIsOpen] = useState(false);
  const [isListening, setIsListening] = useState(false);
  const [messages, setMessages] = useState([
    { sender: 'bot', text: "Hello! I am your ZingBite AI Assistant. Try saying: 'Add biryani', 'Search pizza', 'Open cart', or 'Checkout'." }
  ]);
  const [inputVal, setInputVal] = useState('');
  const [errorMsg, setErrorMsg] = useState('');
  const chatEndRef = useRef(null);

  const { addToCart } = useContext(CartContext);
  const navigate = useNavigate();
  const location = useLocation();

  // Speech Recognition setup
  const recognitionRef = useRef(null);

  useEffect(() => {
    const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
    if (SpeechRecognition) {
      const rec = new SpeechRecognition();
      rec.continuous = false;
      rec.lang = 'en-US';
      rec.interimResults = false;

      rec.onstart = () => {
        setIsListening(true);
        setErrorMsg('');
      };

      rec.onresult = (event) => {
        const speechToText = event.results[0][0].transcript;
        addMessage('user', speechToText);
        processVoiceCommand(speechToText);
      };

      rec.onerror = (e) => {
        console.error('Speech error:', e);
        setErrorMsg('Could not understand. Please try again.');
        setIsListening(false);
      };

      rec.onend = () => {
        setIsListening(false);
      };

      recognitionRef.current = rec;
    }
  }, []);

  useEffect(() => {
    if (chatEndRef.current) {
      chatEndRef.current.scrollIntoView({ behavior: 'smooth' });
    }
  }, [messages, isOpen]);

  const addMessage = (sender, text) => {
    setMessages((prev) => [...prev, { sender, text }]);
  };

  const startListening = () => {
    if (!recognitionRef.current) {
      setErrorMsg('Speech recognition is not supported in this browser. Try typing instead!');
      return;
    }
    if (isListening) {
      recognitionRef.current.stop();
    } else {
      recognitionRef.current.start();
    }
  };

  const handleSend = () => {
    if (!inputVal.trim()) return;
    const txt = inputVal;
    addMessage('user', txt);
    setInputVal('');
    processVoiceCommand(txt);
  };

  // Extracts restaurant ID from URL if on Menu page
  const getActiveRestaurantId = () => {
    const searchParams = new URLSearchParams(location.search);
    const queryRestaurantId = searchParams.get('restaurantId');
    if (queryRestaurantId) return queryRestaurantId;

    const match = location.pathname.match(/\/menu\/(\d+)/);
    return match ? match[1] : null;
  };

  const processVoiceCommand = async (text) => {
    const restId = getActiveRestaurantId();
    addMessage('bot', 'Processing...');

    try {
      const aiPath = restId
        ? `/api/ai/voice-command?restaurantId=${encodeURIComponent(restId)}`
        : '/api/ai/voice-command';
      const res = await axios.post(aiPath, { text });
      const data = res.data;

      // Remove the "Processing..." loader message
      setMessages((prev) => prev.filter((m) => m.text !== 'Processing...'));

      if (data.status === 'success') {
        addMessage('bot', data.message || 'Action executed successfully!');
        executeAction(data);
      } else {
        addMessage('bot', data.message || 'Sorry, I could not complete that request.');
      }
    } catch (e) {
      console.error(e);
      setMessages((prev) => prev.filter((m) => m.text !== 'Processing...'));
      addMessage('bot', 'Sorry, I encountered an error connecting to the AI service.');
    }
  };

  const executeAction = async (data) => {
    const { action, payload } = data;
    switch (action) {
      case 'ADD_TO_CART':
        if (payload && payload.menuId) {
          const success = await addToCart(payload.menuId, payload.quantity || 1);
          if (!success) {
            addMessage('bot', 'Could not add to cart. You might have items from another restaurant in your cart.');
          }
        }
        break;
      case 'SEARCH':
        if (payload) {
          // Dispatch a custom event so Home.jsx or Menu.jsx can capture the search action
          window.dispatchEvent(new CustomEvent('ai-search', { detail: { query: payload } }));
        }
        break;
      case 'NAVIGATE':
        if (payload) {
          navigate(payload);
          setIsOpen(false);
        }
        break;
      default:
        break;
    }
  };

  return (
    <div className="fixed bottom-6 right-6 z-[9999] font-sans">
      {/* Floating Assist Button */}
      {!isOpen && (
        <button
          onClick={() => setIsOpen(true)}
          className="flex h-14 w-14 items-center justify-center rounded-full bg-red-500 text-white shadow-lg shadow-red-500/30 transition-transform duration-300 hover:scale-110 active:scale-95"
          title="ZingBite AI Assistant"
        >
          <Sparkles className="h-6 w-6 animate-pulse" />
        </button>
      )}

      {/* Expanded Chat Drawer */}
      {isOpen && (
        <div className="flex h-[450px] w-[330px] flex-col rounded-2xl border border-gray-100 bg-white shadow-2xl shadow-gray-500/25 transition-all duration-300 sm:w-[360px]">
          {/* Header */}
          <div className="flex items-center justify-between rounded-t-2xl bg-red-500 px-4 py-3.5 text-white">
            <div className="flex items-center gap-2">
              <Bot className="h-5 w-5" />
              <span className="font-semibold tracking-wide">ZingBite AI Assistant</span>
            </div>
            <button
              onClick={() => {
                setIsOpen(false);
                if (isListening) recognitionRef.current.stop();
              }}
              className="rounded-full p-1 hover:bg-white/10"
            >
              <X className="h-5 w-5" />
            </button>
          </div>

          {/* Messages list */}
          <div className="flex-1 overflow-y-auto bg-gray-50/50 p-4 space-y-3">
            {messages.map((msg, i) => (
              <div
                key={i}
                className={`flex gap-2.5 max-w-[85%] ${
                  msg.sender === 'user' ? 'ml-auto flex-row-reverse' : 'mr-auto'
                }`}
              >
                <div
                  className={`flex h-7 w-7 shrink-0 select-none items-center justify-center rounded-full text-xs font-semibold ${
                    msg.sender === 'user' ? 'bg-red-100 text-red-600' : 'bg-red-500 text-white'
                  }`}
                >
                  {msg.sender === 'user' ? <UserIcon className="h-4 w-4" /> : <Bot className="h-4 w-4" />}
                </div>
                <div
                  className={`rounded-2xl px-3.5 py-2 text-sm shadow-sm leading-relaxed ${
                    msg.sender === 'user'
                      ? 'bg-red-500 text-white rounded-tr-none'
                      : 'bg-white text-gray-800 border border-gray-100 rounded-tl-none'
                  }`}
                >
                  {msg.text}
                </div>
              </div>
            ))}
            <div ref={chatEndRef} />
          </div>

          {/* Warning / Error info banner */}
          {errorMsg && (
            <div className="bg-amber-50 px-4 py-1.5 text-xs text-amber-700 border-t border-amber-100">
              {errorMsg}
            </div>
          )}

          {/* Bottom input area */}
          <div className="border-t border-gray-100 bg-white p-3 flex items-center gap-2 rounded-b-2xl">
            <button
              onClick={startListening}
              className={`flex h-10 w-10 shrink-0 items-center justify-center rounded-full border transition-all duration-300 ${
                isListening
                  ? 'border-red-500 bg-red-50 text-red-500 animate-pulse scale-105'
                  : 'border-gray-200 bg-gray-50 text-gray-500 hover:bg-gray-100'
              }`}
              title={isListening ? 'Stop Listening' : 'Use Voice Command'}
            >
              {isListening ? <MicOff className="h-5 w-5" /> : <Mic className="h-5 w-5" />}
            </button>

            <input
              type="text"
              value={inputVal}
              onChange={(e) => setInputVal(e.target.value)}
              onKeyDown={(e) => e.key === 'Enter' && handleSend()}
              placeholder="Ask me to do something..."
              className="flex-1 rounded-full border border-gray-200 bg-gray-50/50 px-4 py-2 text-sm text-gray-800 placeholder-gray-400 outline-none focus:border-red-400 focus:bg-white focus:ring-1 focus:ring-red-400"
            />

            <button
              onClick={handleSend}
              className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-red-500 text-white hover:bg-red-600 transition-colors shadow-sm"
            >
              <Send className="h-4.5 w-4.5" />
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
