import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Globe, MessageCircle, Camera, Briefcase, Heart, ArrowUpRight, Flame } from 'lucide-react';

const Footer = () => {
  const [hoveredLink, setHoveredLink] = useState(null);

  return (
    <>
      <style>{`
        .site-footer {
          background:
            radial-gradient(circle at 20% 0%, rgba(247,55,79,0.15), transparent 40%),
            radial-gradient(circle at 80% 100%, rgba(247,55,79,0.08), transparent 30%),
            linear-gradient(180deg, #161616 0%, #0a0a0a 100%);
          color: #fff;
          padding: 64px 20px 30px;
          margin-top: auto;
          position: relative;
          overflow: hidden;
        }
        .site-footer::before {
          content: '';
          position: absolute;
          top: 0;
          left: 0;
          right: 0;
          height: 1px;
          background: linear-gradient(90deg, transparent, rgba(247,55,79,0.3), transparent);
        }
        .footer-inner {
          max-width: 1400px;
          width: 92%;
          margin: 0 auto;
          display: grid;
          grid-template-columns: 2fr 1fr 1fr 1fr;
          gap: 40px;
          position: relative;
          z-index: 1;
        }
        .footer-brand-section h2 {
          font-family: 'Outfit', sans-serif;
          font-size: 1.8rem;
          font-weight: 800;
          margin-bottom: 12px;
          display: flex;
          align-items: center;
          gap: 8px;
        }
        .footer-brand-section h2 span {
          color: var(--brand-red);
        }
        .footer-brand-icon {
          display: inline-flex;
          animation: footerFlame 2s ease-in-out infinite;
        }
        @keyframes footerFlame {
          0%, 100% { transform: scale(1) rotate(0deg); }
          25% { transform: scale(1.1) rotate(-3deg); }
          75% { transform: scale(1.05) rotate(3deg); }
        }
        .footer-brand-section p {
          color: #777;
          font-size: 0.95rem;
          line-height: 1.7;
          max-width: 300px;
        }
        .footer-col h3 {
          font-size: 0.85rem;
          text-transform: uppercase;
          letter-spacing: 1.5px;
          color: #666;
          margin-bottom: 20px;
          font-weight: 600;
          position: relative;
          display: inline-block;
        }
        .footer-col h3::after {
          content: '';
          position: absolute;
          bottom: -4px;
          left: 0;
          width: 24px;
          height: 2px;
          background: var(--brand-red);
          border-radius: 2px;
          transition: width 0.3s var(--ease-premium);
        }
        .footer-col:hover h3::after {
          width: 40px;
        }
        .footer-col a {
          display: flex;
          align-items: center;
          gap: 6px;
          color: #999;
          text-decoration: none;
          padding: 7px 0;
          font-size: 0.92rem;
          transition: all 0.3s var(--ease-premium);
          position: relative;
          width: fit-content;
        }
        .footer-col a .link-arrow {
          opacity: 0;
          transform: translateX(-6px);
          transition: all 0.3s var(--ease-premium);
          color: var(--brand-red);
        }
        .footer-col a:hover {
          color: #fff;
          padding-left: 4px;
        }
        .footer-col a:hover .link-arrow {
          opacity: 1;
          transform: translateX(0);
        }
        .footer-col a::before {
          content: '';
          position: absolute;
          bottom: 4px;
          left: 0;
          width: 0;
          height: 1px;
          background: var(--brand-red);
          transition: width 0.3s var(--ease-premium);
        }
        .footer-col a:hover::before {
          width: 100%;
        }
        .footer-bottom {
          max-width: 1400px;
          width: 92%;
          margin: 40px auto 0;
          padding-top: 24px;
          border-top: 1px solid rgba(255,255,255,0.06);
          display: flex;
          justify-content: space-between;
          align-items: center;
          flex-wrap: wrap;
          gap: 12px;
          position: relative;
          z-index: 1;
        }
        .footer-bottom p {
          color: #555;
          font-size: 0.85rem;
          display: flex;
          align-items: center;
          gap: 4px;
        }
        .footer-bottom p .brand-dot {
          color: var(--brand-red);
        }
        .footer-socials {
          display: flex;
          gap: 10px;
        }
        .footer-social-btn {
          width: 38px;
          height: 38px;
          border-radius: 50%;
          background: rgba(255,255,255,0.06);
          display: flex;
          align-items: center;
          justify-content: center;
          font-size: 0.9rem;
          transition: all 0.35s var(--ease-premium);
          cursor: pointer;
          border: none;
          color: #888;
          position: relative;
          overflow: hidden;
        }
        .footer-social-btn::before {
          content: '';
          position: absolute;
          inset: 0;
          border-radius: 50%;
          background: linear-gradient(135deg, var(--brand-red), #ff6b7a);
          opacity: 0;
          transition: opacity 0.35s var(--ease-premium);
        }
        .footer-social-btn:hover {
          color: #fff;
          transform: translateY(-3px);
        }
        .footer-social-btn:hover::before {
          opacity: 1;
        }
        .footer-social-btn svg {
          position: relative;
          z-index: 1;
        }
        @media (max-width: 768px) {
          .footer-inner {
            grid-template-columns: 1fr;
            text-align: center;
          }
          .footer-brand-section p {
            max-width: 100%;
          }
          .footer-col h3::after {
            left: 50%;
            transform: translateX(-50%);
          }
          .footer-col a {
            justify-content: center;
            width: 100%;
          }
          .footer-col a .link-arrow {
            display: none;
          }
          .footer-bottom {
            flex-direction: column;
            text-align: center;
          }
          .footer-socials {
            justify-content: center;
          }
          .footer-col a:hover {
            padding-left: 0;
          }
        }
      `}</style>

      <footer className="site-footer">
        <div className="footer-inner">
          <div className="footer-brand-section">
            <h2>
              <span className="footer-brand-icon"><Flame size={22} color="var(--brand-red)" /></span>
              Zing<span>Bite</span>
            </h2>
            <p>Delivering happiness and delicious food to your door. Fresh, fast, and always satisfying.</p>
          </div>
          <div className="footer-col">
            <h3>Company</h3>
            <Link to="/info/about-us" onMouseEnter={() => setHoveredLink('about')} onMouseLeave={() => setHoveredLink(null)}>
              About Us <ArrowUpRight size={12} className="link-arrow" />
            </Link>
            <Link to="/info/careers" onMouseEnter={() => setHoveredLink('careers')} onMouseLeave={() => setHoveredLink(null)}>
              Careers <ArrowUpRight size={12} className="link-arrow" />
            </Link>
            <Link to="/info/team" onMouseEnter={() => setHoveredLink('team')} onMouseLeave={() => setHoveredLink(null)}>
              Team <ArrowUpRight size={12} className="link-arrow" />
            </Link>
            <Link to="/info/blog" onMouseEnter={() => setHoveredLink('blog')} onMouseLeave={() => setHoveredLink(null)}>
              Blog <ArrowUpRight size={12} className="link-arrow" />
            </Link>
          </div>
          <div className="footer-col">
            <h3>Support</h3>
            <Link to="/info/help-faq" onMouseEnter={() => setHoveredLink('faq')} onMouseLeave={() => setHoveredLink(null)}>
              Help &amp; FAQ <ArrowUpRight size={12} className="link-arrow" />
            </Link>
            <Link to="/info/contact-us" onMouseEnter={() => setHoveredLink('contact')} onMouseLeave={() => setHoveredLink(null)}>
              Contact Us <ArrowUpRight size={12} className="link-arrow" />
            </Link>
            <Link to="/info/partner-with-us" onMouseEnter={() => setHoveredLink('partner')} onMouseLeave={() => setHoveredLink(null)}>
              Partner With Us <ArrowUpRight size={12} className="link-arrow" />
            </Link>
            <Link to="/info/ride-with-us" onMouseEnter={() => setHoveredLink('ride')} onMouseLeave={() => setHoveredLink(null)}>
              Ride With Us <ArrowUpRight size={12} className="link-arrow" />
            </Link>
          </div>
          <div className="footer-col">
            <h3>Legal</h3>
            <Link to="/info/terms" onMouseEnter={() => setHoveredLink('terms')} onMouseLeave={() => setHoveredLink(null)}>
              Terms &amp; Conditions <ArrowUpRight size={12} className="link-arrow" />
            </Link>
            <Link to="/info/privacy" onMouseEnter={() => setHoveredLink('privacy')} onMouseLeave={() => setHoveredLink(null)}>
              Privacy Policy <ArrowUpRight size={12} className="link-arrow" />
            </Link>
            <Link to="/info/cookies" onMouseEnter={() => setHoveredLink('cookies')} onMouseLeave={() => setHoveredLink(null)}>
              Cookie Policy <ArrowUpRight size={12} className="link-arrow" />
            </Link>
            <Link to="/info/refunds" onMouseEnter={() => setHoveredLink('refunds')} onMouseLeave={() => setHoveredLink(null)}>
              Refund Policy <ArrowUpRight size={12} className="link-arrow" />
            </Link>
          </div>
        </div>
        <div className="footer-bottom">
          <p>&copy; 2026 ZingBite. Made with <Heart size={13} fill="var(--brand-red)" color="var(--brand-red)" style={{ display:'inline' }} /> for food lovers</p>
          <div className="footer-socials">
            <button className="footer-social-btn" aria-label="Website"><Globe size={15} /></button>
            <button className="footer-social-btn" aria-label="Chat"><MessageCircle size={15} /></button>
            <button className="footer-social-btn" aria-label="Instagram"><Camera size={15} /></button>
            <button className="footer-social-btn" aria-label="LinkedIn"><Briefcase size={15} /></button>
          </div>
        </div>
      </footer>
    </>
  );
};

export default React.memo(Footer);