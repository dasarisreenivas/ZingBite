import React, { useState } from 'react';
import { MessageSquare, X } from 'lucide-react';
import ChatWindow from './ChatWindow';

const ChatWidget = ({ type, targetId, initialOpen = false, onClose }) => {
  const [isOpen, setIsOpen] = useState(initialOpen);

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
        @media (max-width: 450px) {
          .chat-panel-container {
            right: 16px !important;
            bottom: 140px !important;
            width: calc(100% - 32px) !important;
          }
          .chat-widget-fab {
            right: 16px !important;
            bottom: 16px !important;
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
          <ChatWindow 
            type={type}
            targetId={targetId}
            onClose={() => {
              setIsOpen(false);
              if (onClose) onClose();
            }}
          />
        </div>
      )}
    </>
  );
};

export default ChatWidget;
