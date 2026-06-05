import React, { createContext, useState, useContext } from 'react';
import { CheckCircle2, AlertTriangle, Info, X } from 'lucide-react';

export const ModalContext = createContext();

export const ModalProvider = ({ children }) => {
  const [modal, setModal] = useState({
    show: false,
    title: '',
    message: '',
    type: 'info', // 'success' | 'error' | 'warning' | 'info'
    onClose: null
  });

  const showAlert = (message, type = 'info', title = '', onCloseCallback = null) => {
    // Set default titles based on type if none provided
    let defaultTitle = title;
    if (!defaultTitle) {
      if (type === 'success') defaultTitle = 'Success';
      else if (type === 'error') defaultTitle = 'Error';
      else if (type === 'warning') defaultTitle = 'Warning';
      else defaultTitle = 'Information';
    }

    setModal({
      show: true,
      title: defaultTitle,
      message,
      type,
      onClose: onCloseCallback
    });
  };

  const closeModal = () => {
    if (modal.onClose) {
      try {
        modal.onClose();
      } catch (err) {
        console.error("Error in modal onClose callback:", err);
      }
    }
    setModal(prev => ({ ...prev, show: false }));
  };

  const renderIcon = () => {
    switch (modal.type) {
      case 'success':
        return <CheckCircle2 className="premium-modal-icon success" size={38} />;
      case 'error':
        return <AlertTriangle className="premium-modal-icon error" size={38} />;
      case 'warning':
        return <AlertTriangle className="premium-modal-icon warning" size={38} />;
      default:
        return <Info className="premium-modal-icon info" size={38} />;
    }
  };

  return (
    <ModalContext.Provider value={{ showAlert }}>
      {children}
      
      {/* Premium Global Modal Overlay */}
      {modal.show && (
        <>
          <style>{`
            .premium-modal-overlay {
              position: fixed;
              top: 0;
              left: 0;
              right: 0;
              bottom: 0;
              background: rgba(15, 12, 30, 0.45);
              backdrop-filter: blur(8px);
              -webkit-backdrop-filter: blur(8px);
              display: flex;
              align-items: center;
              justify-content: center;
              z-index: 99999;
              animation: premiumModalFadeIn 0.25s ease-out;
            }
            .premium-modal-card {
              background: rgba(255, 255, 255, 0.95);
              backdrop-filter: blur(10px);
              border-radius: 20px;
              border: 1px solid rgba(247, 55, 79, 0.15);
              box-shadow: 0 24px 48px rgba(247, 55, 79, 0.1), 0 0 0 1px rgba(247, 55, 79, 0.02);
              width: 90%;
              max-width: 440px;
              padding: 30px;
              position: relative;
              animation: premiumModalSlideUp 0.35s cubic-bezier(0.34, 1.56, 0.64, 1);
            }
            
            /* Card Theme Adjustments */
            .premium-modal-card.success-theme {
              border-color: rgba(96, 178, 70, 0.25);
              box-shadow: 0 24px 48px rgba(96, 178, 70, 0.1), 0 0 0 1px rgba(96, 178, 70, 0.02);
            }
            .premium-modal-card.error-theme {
              border-color: rgba(226, 55, 68, 0.25);
              box-shadow: 0 24px 48px rgba(226, 55, 68, 0.1), 0 0 0 1px rgba(226, 55, 68, 0.02);
            }
            .premium-modal-card.warning-theme {
              border-color: rgba(255, 159, 64, 0.25);
              box-shadow: 0 24px 48px rgba(255, 159, 64, 0.1), 0 0 0 1px rgba(255, 159, 64, 0.02);
            }
            .premium-modal-card.info-theme {
              border-color: rgba(54, 162, 235, 0.25);
              box-shadow: 0 24px 48px rgba(54, 162, 235, 0.1), 0 0 0 1px rgba(54, 162, 235, 0.02);
            }

            .premium-modal-close-btn {
              position: absolute;
              top: 18px;
              right: 18px;
              background: none;
              border: none;
              color: var(--text-muted);
              cursor: pointer;
              transition: all 0.2s ease;
              display: flex;
              align-items: center;
              justify-content: center;
              width: 28px;
              height: 28px;
              border-radius: 50%;
            }
            .premium-modal-close-btn:hover {
              background: var(--bg-surface-hover);
              color: var(--text-primary);
            }

            .premium-modal-header {
              display: flex;
              flex-direction: column;
              align-items: center;
              text-align: center;
              gap: 16px;
              margin-bottom: 20px;
            }

            .premium-modal-icon {
              padding: 12px;
              border-radius: 16px;
              display: inline-flex;
              align-items: center;
              justify-content: center;
            }
            .premium-modal-icon.success {
              background: rgba(96, 178, 70, 0.1);
              color: var(--success);
            }
            .premium-modal-icon.error {
              background: rgba(247, 55, 79, 0.1);
              color: var(--brand-red);
            }
            .premium-modal-icon.warning {
              background: rgba(255, 159, 64, 0.1);
              color: #ff9f40;
            }
            .premium-modal-icon.info {
              background: rgba(54, 162, 235, 0.1);
              color: #36a2eb;
            }

            .premium-modal-title {
              font-family: 'Outfit', sans-serif;
              font-size: 1.35rem;
              font-weight: 800;
              color: var(--text-primary);
              margin: 0;
            }

            .premium-modal-body {
              font-size: 0.92rem;
              color: var(--text-secondary);
              line-height: 1.6;
              text-align: center;
              margin-bottom: 26px;
              white-space: pre-line;
            }

            .premium-modal-actions {
              display: flex;
              justify-content: center;
            }

            .premium-modal-btn {
              color: white;
              border: none;
              padding: 12px 36px;
              border-radius: 30px;
              font-weight: 700;
              font-size: 0.95rem;
              cursor: pointer;
              transition: all 0.25s cubic-bezier(0.25, 0.8, 0.25, 1);
              box-shadow: 0 4px 14px rgba(247, 55, 79, 0.3);
              min-width: 150px;
              text-align: center;
            }
            .premium-modal-btn:hover {
              transform: translateY(-2px);
              box-shadow: 0 6px 20px rgba(247, 55, 79, 0.4);
            }
            .premium-modal-btn:active {
              transform: translateY(0);
            }

            /* Button Themes */
            .premium-modal-btn.success-theme {
              background: linear-gradient(135deg, #60b246 0%, #4bc0c0 100%);
              box-shadow: 0 4px 14px rgba(96, 178, 70, 0.3);
            }
            .premium-modal-btn.success-theme:hover {
              box-shadow: 0 6px 20px rgba(96, 178, 70, 0.4);
            }
            .premium-modal-btn.error-theme {
              background: linear-gradient(135deg, #F7374F 0%, #ff5263 100%);
              box-shadow: 0 4px 14px rgba(247, 55, 79, 0.3);
            }
            .premium-modal-btn.error-theme:hover {
              box-shadow: 0 6px 20px rgba(247, 55, 79, 0.4);
            }
            .premium-modal-btn.warning-theme {
              background: linear-gradient(135deg, #ff9f40 0%, #ffcd56 100%);
              box-shadow: 0 4px 14px rgba(255, 159, 64, 0.3);
            }
            .premium-modal-btn.warning-theme:hover {
              box-shadow: 0 6px 20px rgba(255, 159, 64, 0.4);
            }
            .premium-modal-btn.info-theme {
              background: linear-gradient(135deg, #F7374F 0%, #e02f43 100%);
              box-shadow: 0 4px 14px rgba(247, 55, 79, 0.3);
            }
            .premium-modal-btn.info-theme:hover {
              box-shadow: 0 6px 20px rgba(247, 55, 79, 0.4);
            }

            @keyframes premiumModalFadeIn {
              from { opacity: 0; }
              to { opacity: 1; }
            }
            @keyframes premiumModalSlideUp {
              from { transform: translateY(28px) scale(0.95); opacity: 0; }
              to { transform: translateY(0) scale(1); opacity: 1; }
            }
          `}</style>
          <div className="premium-modal-overlay" onClick={closeModal}>
            <div 
              className={`premium-modal-card ${modal.type}-theme`} 
              onClick={e => e.stopPropagation()}
            >
              <button className="premium-modal-close-btn" onClick={closeModal}>
                <X size={18} />
              </button>
              <div className="premium-modal-header">
                {renderIcon()}
                <h3 className="premium-modal-title">{modal.title}</h3>
              </div>
              <div className="premium-modal-body">{modal.message}</div>
              <div className="premium-modal-actions">
                <button 
                  className={`premium-modal-btn ${modal.type}-theme`} 
                  onClick={closeModal}
                >
                  OK
                </button>
              </div>
            </div>
          </div>
        </>
      )}
    </ModalContext.Provider>
  );
};

export const useModal = () => {
  const context = useContext(ModalContext);
  if (!context) {
    throw new Error('useModal must be used within a ModalProvider');
  }
  return context;
};
