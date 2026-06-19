import React from 'react';
import { Link } from 'react-router-dom';
import { Home, UtensilsCrossed, ArrowRight } from 'lucide-react';

export default function NotFound() {
  return (
    <>
      <style>{`
        .notfound-wrapper {
          display: flex;
          flex-direction: column;
          align-items: center;
          justify-content: center;
          min-height: calc(100vh - 180px);
          text-align: center;
          padding: 40px 20px;
          position: relative;
          overflow: hidden;
        }

        .notfound-card {
          max-width: 500px;
          padding: 48px 32px;
          background: rgba(255, 255, 255, 0.95);
          backdrop-filter: blur(20px);
          border: 1px solid rgba(247, 55, 79, 0.1);
          border-radius: 24px;
          box-shadow: 0 16px 40px rgba(0, 0, 0, 0.04);
          position: relative;
          z-index: 2;
          animation: notfoundFadeIn 0.5s var(--ease-premium) both;
        }

        @keyframes notfoundFadeIn {
          from { opacity: 0; transform: translateY(30px); }
          to { opacity: 1; transform: translateY(0); }
        }

        .notfound-code {
          font-family: 'Outfit', sans-serif;
          font-size: 6.5rem;
          font-weight: 900;
          line-height: 1;
          background: linear-gradient(135deg, var(--brand-red), #ff7a8a);
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
          background-clip: text;
          margin: 0 0 16px;
          letter-spacing: -2px;
          animation: codeFloat 3s ease-in-out infinite;
        }

        @keyframes codeFloat {
          0%, 100% { transform: translateY(0); }
          50% { transform: translateY(-10px); }
        }

        .notfound-title {
          font-family: 'Outfit', sans-serif;
          font-size: 1.6rem;
          font-weight: 800;
          color: var(--text-primary);
          margin: 0 0 12px;
        }

        .notfound-desc {
          font-size: 0.92rem;
          color: var(--text-secondary);
          line-height: 1.6;
          margin: 0 0 32px;
        }

        .notfound-actions {
          display: flex;
          gap: 16px;
          justify-content: center;
          flex-wrap: wrap;
        }

        .notfound-btn {
          display: inline-flex;
          align-items: center;
          gap: 8px;
          padding: 12px 24px;
          border-radius: 12px;
          font-weight: 700;
          font-size: 0.9rem;
          text-decoration: none;
          transition: all 0.3s;
        }

        .notfound-btn.primary {
          background: linear-gradient(135deg, var(--brand-red), #ff6b7a);
          color: #fff;
          box-shadow: 0 4px 12px rgba(247, 55, 79, 0.2);
        }

        .notfound-btn.primary:hover {
          background: linear-gradient(135deg, var(--brand-red-hover), #e55a6a);
          transform: translateY(-2px);
          box-shadow: 0 8px 20px rgba(247, 55, 79, 0.3);
        }

        .notfound-btn.secondary {
          background: var(--bg-surface);
          border: 1px solid var(--border-medium);
          color: var(--text-secondary);
        }

        .notfound-btn.secondary:hover {
          background: rgba(247, 55, 79, 0.03);
          border-color: var(--brand-red);
          color: var(--brand-red);
          transform: translateY(-2px);
        }

        /* Floating Food items */
        .floating-food {
          position: absolute;
          font-size: 2.2rem;
          opacity: 0.08;
          animation: floatFood 8s ease-in-out infinite;
          user-select: none;
        }

        @keyframes floatFood {
          0%, 100% { transform: translateY(0) rotate(0deg); }
          50% { transform: translateY(-20px) rotate(15deg); }
        }
      `}</style>

      <div className="notfound-wrapper">
        {/* Floating background food icons */}
        <span className="floating-food" style={{ top: '15%', left: '10%', animationDelay: '0s' }}>🍕</span>
        <span className="floating-food" style={{ top: '25%', right: '12%', animationDelay: '2s' }}>🍔</span>
        <span className="floating-food" style={{ bottom: '20%', left: '15%', animationDelay: '4s' }}>🍩</span>
        <span className="floating-food" style={{ bottom: '15%', right: '18%', animationDelay: '1s' }}>🍟</span>
        <span className="floating-food" style={{ top: '50%', left: '42%', animationDelay: '3s', fontSize: '3rem' }}>🌮</span>

        <div className="notfound-card">
          <h1 className="notfound-code">404</h1>
          <h2 className="notfound-title">Did someone eat this page?</h2>
          <p className="notfound-desc">
            We looked everywhere but couldn't find the page you're searching for. It might have been deleted, renamed, or never existed in the first place!
          </p>

          <div className="notfound-actions">
            <Link to="/" className="notfound-btn primary">
              <Home size={16} /> BACK HOME
            </Link>
            <Link to="/menu" className="notfound-btn secondary">
              <UtensilsCrossed size={16} /> EXPLORE MENU <ArrowRight size={14} />
            </Link>
          </div>
        </div>
      </div>
    </>
  );
}
