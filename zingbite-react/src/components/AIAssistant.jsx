import { useState, useEffect, useRef, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import { Sparkles, Mic, MicOff, Send, X, Bot, User as UserIcon } from 'lucide-react';
import { CartContext } from '../context/CartContext';
import useAgent from '../hooks/useAgent';
import AgentMessageCard from './agent/AgentMessageCard';
import AgentQuickActions from './agent/AgentQuickActions';
import AgentThinking from './agent/AgentThinking';

export default function AIAssistant() {
  const [isOpen, setIsOpen] = useState(false);
  const [isListening, setIsListening] = useState(false);
  const [inputVal, setInputVal] = useState('');
  const [errorMsg, setErrorMsg] = useState('');
  const chatEndRef = useRef(null);

  const { addToCart } = useContext(CartContext);
  const navigate = useNavigate();

  const { messages, sendMessage, loading, thinkingState } = useAgent();

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
        sendMessage(speechToText).then(botMsg => {
          if (botMsg) executeAction(botMsg);
        });
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
  }, [sendMessage]);

  useEffect(() => {
    if (chatEndRef.current) {
      chatEndRef.current.scrollIntoView({ behavior: 'smooth' });
    }
  }, [messages, isOpen]);

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
    setInputVal('');
    sendMessage(txt).then(botMsg => {
      if (botMsg) executeAction(botMsg);
    });
  };

  const executeAction = async (data) => {
    const { action, payload } = data;
    switch (action) {
      case 'ADD_TO_CART':
        if (payload && payload.menuId) {
          const success = await addToCart(payload.menuId, payload.quantity || 1);
          if (!success) {
            setErrorMsg('Could not add to cart. You might have items from another restaurant in your cart.');
          }
        }
        break;
      case 'SEARCH':
        if (payload && payload.items) {
          // Dispatch custom search event for list filtering
          window.dispatchEvent(new CustomEvent('ai-search', { detail: { query: payload.items[0]?.menuName || '' } }));
        } else if (typeof payload === 'string') {
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

  const handleQuickAction = (actionText) => {
    // If it's a structural command
    if (actionText.startsWith("Add ")) {
      const food = actionText.substring(4);
      sendMessage(`Add ${food} to my cart`).then(botMsg => {
        if (botMsg) executeAction(botMsg);
      });
    } else if (actionText.toLowerCase() === "go to checkout") {
      navigate('/checkout');
      setIsOpen(false);
    } else if (actionText.toLowerCase() === "view cart") {
      navigate('/cart');
      setIsOpen(false);
    } else {
      sendMessage(actionText).then(botMsg => {
        if (botMsg) executeAction(botMsg);
      });
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
        <div className="flex h-[520px] w-[340px] flex-col rounded-2xl border border-gray-100 bg-white shadow-2xl shadow-gray-500/25 transition-all duration-300 sm:w-[380px]">
          {/* Header */}
          <div className="flex items-center justify-between rounded-t-2xl bg-red-500 px-4 py-3.5 text-white">
            <div className="flex items-center gap-2">
              <Bot className="h-5 w-5" />
              <span className="font-semibold tracking-wide">ZingBot custom AI</span>
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
              <div key={i} className="space-y-1">
                <div
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

                {/* Render Card Details if available */}
                {msg.sender === 'bot' && msg.card && (
                  <div className="pl-9 pr-2">
                    <AgentMessageCard card={msg.card} />
                  </div>
                )}

                {/* Render Quick Actions if available */}
                {msg.sender === 'bot' && msg.quickActions && (
                  <AgentQuickActions
                    quickActions={msg.quickActions}
                    onActionClick={handleQuickAction}
                  />
                )}
              </div>
            ))}

            {loading && (
              <AgentThinking thinkingState={thinkingState} />
            )}

            <div ref={chatEndRef} />
          </div>

          {/* Warning / Error info banner */}
          {errorMsg && (
            <div className="bg-amber-50 px-4 py-1.5 text-xs text-amber-700 border-t border-amber-100 flex justify-between items-center">
              <span>{errorMsg}</span>
              <button onClick={() => setErrorMsg('')} className="text-amber-800 font-bold ml-2">x</button>
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
              placeholder="Chat with ZingBot..."
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
