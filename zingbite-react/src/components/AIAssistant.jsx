import { useState, useEffect, useRef, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  Sparkles,
  Mic,
  MicOff,
  Send,
  X,
  Bot,
  User as UserIcon,
  ShieldCheck,
  ShoppingBag,
  Route,
  UtensilsCrossed
} from 'lucide-react';
import { CartContext } from '../context/CartContext';
import useAgent from '../hooks/useAgent';
import AgentMessageCard from './agent/AgentMessageCard';
import AgentQuickActions from './agent/AgentQuickActions';
import AgentThinking from './agent/AgentThinking';

const ZINGBOT_PROMPTS = [
  { label: 'Find biryani', icon: UtensilsCrossed },
  { label: 'Track my order', icon: Route },
  { label: 'View cart', icon: ShoppingBag }
];

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
    <div className="zingbot-root">
      <style>{`
        .zingbot-root {
          position: fixed;
          right: 24px;
          bottom: 24px;
          z-index: 9999;
          font-family: inherit;
        }

        .zingbot-fab {
          position: relative;
          width: 64px;
          height: 64px;
          display: grid;
          place-items: center;
          overflow: hidden;
          border: 1px solid rgba(255, 255, 255, 0.7);
          border-radius: 20px;
          background: linear-gradient(135deg, var(--brand-red), #9f1239);
          color: #fff;
          cursor: pointer;
          box-shadow: 0 22px 46px rgba(247, 55, 79, 0.34), 0 8px 20px rgba(28, 28, 28, 0.18);
          transition: transform 0.24s var(--ease-premium), box-shadow 0.24s var(--ease-premium);
        }

        .zingbot-fab::after {
          content: '';
          position: absolute;
          inset: 8px;
          border: 1px solid rgba(255, 255, 255, 0.28);
          border-radius: 14px;
          pointer-events: none;
        }

        .zingbot-fab:hover,
        .zingbot-fab:focus-visible {
          transform: translateY(-3px) scale(1.03);
          box-shadow: 0 28px 58px rgba(247, 55, 79, 0.42), 0 10px 24px rgba(28, 28, 28, 0.2);
          outline: none;
        }

        .zingbot-panel {
          width: min(420px, calc(100vw - 32px));
          height: min(680px, calc(100vh - 44px));
          display: flex;
          flex-direction: column;
          overflow: hidden;
          border: 1px solid rgba(247, 55, 79, 0.16);
          border-radius: 24px;
          background: linear-gradient(180deg, rgba(255, 255, 255, 0.98), rgba(248, 249, 250, 0.98));
          box-shadow: 0 34px 90px rgba(28, 28, 28, 0.22);
          animation: zingbotPanelIn 0.28s var(--ease-premium) both;
        }

        .zingbot-header {
          position: relative;
          display: flex;
          align-items: center;
          justify-content: space-between;
          gap: 12px;
          padding: 18px;
          color: #fff;
          background: linear-gradient(135deg, var(--brand-red), #9f1239);
        }

        .zingbot-header-main {
          display: flex;
          align-items: center;
          gap: 12px;
          min-width: 0;
        }

        .zingbot-avatar {
          width: 46px;
          height: 46px;
          display: grid;
          place-items: center;
          flex: 0 0 auto;
          border-radius: 16px;
          background: rgba(255, 255, 255, 0.16);
          border: 1px solid rgba(255, 255, 255, 0.24);
          box-shadow: inset 0 1px 0 rgba(255, 255, 255, 0.2);
        }

        .zingbot-title {
          display: block;
          color: #fff;
          font-size: 1rem;
          font-weight: 900;
          letter-spacing: 0;
          line-height: 1.1;
        }

        .zingbot-subtitle {
          display: inline-flex;
          align-items: center;
          gap: 6px;
          margin-top: 5px;
          color: rgba(255, 255, 255, 0.82);
          font-size: 0.72rem;
          font-weight: 800;
        }

        .zingbot-close {
          width: 38px;
          height: 38px;
          display: grid;
          place-items: center;
          flex: 0 0 auto;
          border: 1px solid rgba(255, 255, 255, 0.18);
          border-radius: 50%;
          background: rgba(255, 255, 255, 0.1);
          color: #fff;
          cursor: pointer;
          transition: transform 0.2s var(--ease-premium), background 0.2s var(--ease-premium);
        }

        .zingbot-close:hover,
        .zingbot-close:focus-visible {
          transform: translateY(-1px);
          background: rgba(255, 255, 255, 0.18);
          outline: none;
        }

        .zingbot-status-strip {
          display: grid;
          grid-template-columns: repeat(2, minmax(0, 1fr));
          gap: 8px;
          padding: 12px 14px;
          border-bottom: 1px solid rgba(247, 55, 79, 0.08);
          background: rgba(255, 255, 255, 0.86);
        }

        .zingbot-status-strip span {
          min-width: 0;
          min-height: 34px;
          display: inline-flex;
          align-items: center;
          justify-content: center;
          gap: 7px;
          border: 1px solid rgba(247, 55, 79, 0.12);
          border-radius: 8px;
          background: rgba(247, 55, 79, 0.055);
          color: var(--brand-red);
          font-size: 0.72rem;
          font-weight: 900;
          text-align: center;
        }

        .zingbot-prompts {
          display: flex;
          gap: 8px;
          overflow-x: auto;
          padding: 12px 14px 4px;
          scrollbar-width: none;
        }

        .zingbot-prompts::-webkit-scrollbar {
          display: none;
        }

        .zingbot-prompt {
          min-height: 34px;
          display: inline-flex;
          align-items: center;
          gap: 7px;
          flex: 0 0 auto;
          border: 1px solid rgba(28, 28, 28, 0.08);
          border-radius: 999px;
          background: #fff;
          color: var(--text-secondary);
          padding: 0 12px;
          font-size: 0.76rem;
          font-weight: 900;
          box-shadow: 0 8px 18px rgba(28, 28, 28, 0.06);
          cursor: pointer;
          transition: transform 0.2s var(--ease-premium), color 0.2s, border-color 0.2s;
        }

        .zingbot-prompt:hover,
        .zingbot-prompt:focus-visible {
          transform: translateY(-1px);
          color: var(--brand-red);
          border-color: rgba(247, 55, 79, 0.22);
          outline: none;
        }

        .zingbot-messages {
          flex: 1;
          overflow-y: auto;
          padding: 14px;
          background:
            linear-gradient(180deg, rgba(255, 255, 255, 0.55), rgba(248, 249, 250, 0.96)),
            var(--bg-surface);
        }

        .zingbot-message-row {
          margin-bottom: 12px;
        }

        .zingbot-bubble-line {
          display: flex;
          gap: 10px;
          max-width: 88%;
        }

        .zingbot-bubble-line.user {
          margin-left: auto;
          flex-direction: row-reverse;
        }

        .zingbot-message-avatar {
          width: 30px;
          height: 30px;
          display: grid;
          place-items: center;
          flex: 0 0 auto;
          border-radius: 10px;
          font-weight: 900;
        }

        .zingbot-message-avatar.bot {
          background: linear-gradient(135deg, var(--brand-red), #9f1239);
          color: #fff;
          box-shadow: 0 10px 22px rgba(247, 55, 79, 0.2);
        }

        .zingbot-message-avatar.user {
          background: rgba(247, 55, 79, 0.1);
          color: var(--brand-red);
          border: 1px solid rgba(247, 55, 79, 0.16);
        }

        .zingbot-message-bubble {
          min-width: 0;
          padding: 10px 12px;
          border-radius: 16px;
          color: var(--text-primary);
          font-size: 0.88rem;
          line-height: 1.48;
          overflow-wrap: anywhere;
          box-shadow: 0 10px 24px rgba(28, 28, 28, 0.07);
        }

        .zingbot-message-bubble.bot {
          border-top-left-radius: 6px;
          border: 1px solid rgba(28, 28, 28, 0.08);
          background: rgba(255, 255, 255, 0.96);
        }

        .zingbot-message-bubble.user {
          border-top-right-radius: 6px;
          background: linear-gradient(135deg, var(--brand-red), #b91c1c);
          color: #fff;
        }

        .zingbot-error {
          display: flex;
          align-items: center;
          justify-content: space-between;
          gap: 10px;
          padding: 9px 14px;
          border-top: 1px solid rgba(245, 166, 35, 0.18);
          background: rgba(255, 247, 237, 0.96);
          color: #9a5a00;
          font-size: 0.78rem;
          font-weight: 800;
        }

        .zingbot-error button {
          border: 0;
          background: transparent;
          color: inherit;
          cursor: pointer;
          font-weight: 900;
        }

        .zingbot-input-bar {
          display: flex;
          align-items: center;
          gap: 9px;
          padding: 12px;
          border-top: 1px solid rgba(28, 28, 28, 0.08);
          background: rgba(255, 255, 255, 0.96);
        }

        .zingbot-voice,
        .zingbot-send {
          width: 42px;
          height: 42px;
          display: grid;
          place-items: center;
          flex: 0 0 auto;
          border-radius: 50%;
          cursor: pointer;
          transition: transform 0.2s var(--ease-premium), background 0.2s, color 0.2s;
        }

        .zingbot-voice {
          border: 1px solid rgba(28, 28, 28, 0.1);
          background: var(--bg-surface);
          color: var(--text-secondary);
        }

        .zingbot-voice.listening {
          border-color: rgba(247, 55, 79, 0.28);
          background: rgba(247, 55, 79, 0.08);
          color: var(--brand-red);
          animation: zingbotPulse 1.2s ease-in-out infinite;
        }

        .zingbot-input {
          min-width: 0;
          flex: 1;
          min-height: 42px;
          border: 1px solid rgba(28, 28, 28, 0.1);
          border-radius: 999px;
          background: var(--bg-surface);
          color: var(--text-primary);
          padding: 0 14px;
          font-size: 0.88rem;
          font-weight: 700;
          outline: none;
          transition: border-color 0.2s, box-shadow 0.2s, background 0.2s;
        }

        .zingbot-input:focus {
          border-color: rgba(247, 55, 79, 0.42);
          background: #fff;
          box-shadow: 0 0 0 4px rgba(247, 55, 79, 0.1);
        }

        .zingbot-send {
          border: 0;
          background: linear-gradient(135deg, var(--brand-red), #9f1239);
          color: #fff;
          box-shadow: 0 12px 24px rgba(247, 55, 79, 0.24);
        }

        .zingbot-send:disabled {
          background: rgba(28, 28, 28, 0.1);
          color: var(--text-muted);
          box-shadow: none;
          cursor: default;
        }

        .zingbot-voice:hover,
        .zingbot-voice:focus-visible,
        .zingbot-send:hover:not(:disabled),
        .zingbot-send:focus-visible:not(:disabled) {
          transform: translateY(-1px);
          outline: none;
        }

        [data-theme="dark"] .zingbot-panel {
          background: linear-gradient(180deg, rgba(18, 18, 22, 0.98), rgba(10, 10, 12, 0.98));
          border-color: rgba(255, 77, 106, 0.18);
          box-shadow: 0 34px 90px rgba(0, 0, 0, 0.58);
        }

        [data-theme="dark"] .zingbot-status-strip,
        [data-theme="dark"] .zingbot-input-bar {
          background: rgba(16, 16, 20, 0.96);
          border-color: rgba(255, 255, 255, 0.08);
        }

        [data-theme="dark"] .zingbot-prompt,
        [data-theme="dark"] .zingbot-message-bubble.bot,
        [data-theme="dark"] .zingbot-input,
        [data-theme="dark"] .zingbot-voice {
          background: rgba(22, 22, 26, 0.96);
          border-color: rgba(255, 255, 255, 0.09);
          color: var(--text-primary);
        }

        [data-theme="dark"] .zingbot-messages {
          background: rgba(10, 10, 12, 0.96);
        }

        @keyframes zingbotPanelIn {
          from { transform: translateY(18px) scale(0.98); opacity: 0; }
          to { transform: translateY(0) scale(1); opacity: 1; }
        }

        @keyframes zingbotPulse {
          0%, 100% { box-shadow: 0 0 0 0 rgba(247, 55, 79, 0.18); }
          50% { box-shadow: 0 0 0 8px rgba(247, 55, 79, 0); }
        }

        @media (max-width: 520px) {
          .zingbot-root {
            right: 14px;
            bottom: 14px;
            left: 14px;
          }

          .zingbot-fab {
            margin-left: auto;
          }

          .zingbot-panel {
            width: 100%;
            height: min(660px, calc(100vh - 28px));
            border-radius: 18px;
          }

          .zingbot-status-strip {
            grid-template-columns: 1fr;
          }
        }

        @media (prefers-reduced-motion: reduce) {
          .zingbot-fab,
          .zingbot-panel,
          .zingbot-voice,
          .zingbot-send,
          .zingbot-prompt {
            animation: none !important;
            transition: none !important;
          }
        }
      `}</style>

      {!isOpen && (
        <button
          onClick={() => setIsOpen(true)}
          className="zingbot-fab"
          title="ZingBite AI Assistant"
          type="button"
        >
          <Sparkles className="h-6 w-6" />
        </button>
      )}

      {isOpen && (
        <section className="zingbot-panel" role="dialog" aria-label="ZingBite AI Assistant">
          <header className="zingbot-header">
            <div className="zingbot-header-main">
              <div className="zingbot-avatar">
                <Bot className="h-6 w-6" />
              </div>
              <div className="min-w-0">
                <span className="zingbot-title">ZingBot custom AI</span>
                <small className="zingbot-subtitle">
                  <ShieldCheck className="h-3.5 w-3.5" /> Premium concierge
                </small>
              </div>
            </div>
            <button
              type="button"
              onClick={() => {
                setIsOpen(false);
                if (isListening) recognitionRef.current?.stop();
              }}
              className="zingbot-close"
              aria-label="Close ZingBot"
            >
              <X className="h-5 w-5" />
            </button>
          </header>

          <div className="zingbot-status-strip">
            <span><ShieldCheck size={14} /> Live session</span>
            <span><ShoppingBag size={14} /> Order aware</span>
          </div>

          <div className="zingbot-prompts" aria-label="ZingBot quick prompts">
            {ZINGBOT_PROMPTS.map(({ label, icon: Icon }) => (
              <button
                key={label}
                type="button"
                className="zingbot-prompt"
                onClick={() => handleQuickAction(label)}
              >
                <Icon size={14} /> {label}
              </button>
            ))}
          </div>

          <div className="zingbot-messages">
            {messages.map((msg, i) => (
              <div key={i} className="zingbot-message-row">
                <div className={`zingbot-bubble-line ${msg.sender === 'user' ? 'user' : 'bot'}`}>
                  <div className={`zingbot-message-avatar ${msg.sender === 'user' ? 'user' : 'bot'}`}>
                    {msg.sender === 'user' ? <UserIcon className="h-4 w-4" /> : <Bot className="h-4 w-4" />}
                  </div>
                  <div className={`zingbot-message-bubble ${msg.sender === 'user' ? 'user' : 'bot'}`}>
                    {msg.text}
                  </div>
                </div>

                {msg.sender === 'bot' && msg.card && (
                  <div className="pl-10 pr-2">
                    <AgentMessageCard card={msg.card} />
                  </div>
                )}

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

          {errorMsg && (
            <div className="zingbot-error">
              <span>{errorMsg}</span>
              <button type="button" onClick={() => setErrorMsg('')} aria-label="Dismiss ZingBot alert">x</button>
            </div>
          )}

          <form
            className="zingbot-input-bar"
            onSubmit={(event) => {
              event.preventDefault();
              handleSend();
            }}
          >
            <button
              type="button"
              onClick={startListening}
              className={`zingbot-voice ${isListening ? 'listening' : ''}`}
              title={isListening ? 'Stop Listening' : 'Use Voice Command'}
              aria-label={isListening ? 'Stop listening' : 'Use voice command'}
            >
              {isListening ? <MicOff className="h-5 w-5" /> : <Mic className="h-5 w-5" />}
            </button>

            <input
              type="text"
              value={inputVal}
              onChange={(e) => setInputVal(e.target.value)}
              placeholder="Chat with ZingBot..."
              className="zingbot-input"
            />

            <button
              type="submit"
              disabled={!inputVal.trim()}
              className="zingbot-send"
              aria-label="Send ZingBot message"
            >
              <Send className="h-[18px] w-[18px]" />
            </button>
          </form>
        </section>
      )}
    </div>
  );
}
