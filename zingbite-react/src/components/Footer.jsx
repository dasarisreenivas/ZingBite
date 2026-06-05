import React from 'react';
import { Link } from 'react-router-dom';
import { Globe, MessageCircle, Camera, Briefcase, Heart } from 'lucide-react';

const Footer = () => {
  return (
    <>
      <style>{`
        .site-footer {
          background: linear-gradient(180deg, #1a1a1a 0%, #0d0d0d 100%);
          color: #fff;
          padding: 60px 20px 30px;
          margin-top: auto;
        }
        .footer-inner {
          max-width: 1400px;
          width: 92%;
          margin: 0 auto;
          display: grid;
          grid-template-columns: 2fr 1fr 1fr 1fr;
          gap: 40px;
        }
        .footer-brand-section h2 {
          font-family: 'Outfit', sans-serif;
          font-size: 1.8rem;
          font-weight: 800;
          margin-bottom: 12px;
        }
        .footer-brand-section h2 span {
          color: var(--brand-red);
        }
        .footer-brand-section p {
          color: #888;
          font-size: 0.95rem;
          line-height: 1.7;
          max-width: 300px;
        }
        .footer-col h3 {
          font-size: 0.85rem;
          text-transform: uppercase;
          letter-spacing: 1.5px;
          color: #888;
          margin-bottom: 20px;
          font-weight: 600;
        }
        .footer-col a {
          display: block;
          color: #ccc;
          text-decoration: none;
          padding: 6px 0;
          font-size: 0.95rem;
          transition: all 0.25s ease;
        }
        .footer-col a:hover {
          color: #fff;
          padding-left: 4px;
        }
        .footer-bottom {
          max-width: 1400px;
          width: 92%;
          margin: 40px auto 0;
          padding-top: 24px;
          border-top: 1px solid rgba(255,255,255,0.08);
          display: flex;
          justify-content: space-between;
          align-items: center;
          flex-wrap: wrap;
          gap: 12px;
        }
        .footer-bottom p {
          color: #666;
          font-size: 0.85rem;
        }
        .footer-bottom p span {
          color: var(--brand-red);
        }
        .footer-socials {
          display: flex;
          gap: 12px;
        }
        .footer-social-btn {
          width: 36px;
          height: 36px;
          border-radius: 50%;
          background: rgba(255,255,255,0.08);
          display: flex;
          align-items: center;
          justify-content: center;
          font-size: 0.9rem;
          transition: all 0.3s ease;
          cursor: pointer;
          border: none;
          color: #ccc;
        }
        .footer-social-btn:hover {
          background: var(--brand-red);
          color: #fff;
          transform: translateY(-2px);
        }
        @media (max-width: 768px) {
          .footer-inner {
            grid-template-columns: 1fr;
            text-align: center;
          }
          .footer-brand-section p {
            max-width: 100%;
          }
          .footer-bottom {
            flex-direction: column;
            text-align: center;
          }
          .footer-socials {
            justify-content: center;
          }
        }
      `}</style>

      <footer className="site-footer">
        <div className="footer-inner">
          <div className="footer-brand-section">
            <h2>Zing<span>Bite</span></h2>
            <p>Delivering happiness and delicious food to your door. Fresh, fast, and always satisfying.</p>
          </div>
          <div className="footer-col">
            <h3>Company</h3>
            <Link to="/info/about-us">About Us</Link>
            <Link to="/info/careers">Careers</Link>
            <Link to="/info/team">Team</Link>
            <Link to="/info/blog">Blog</Link>
          </div>
          <div className="footer-col">
            <h3>Support</h3>
            <Link to="/info/help-faq">Help &amp; FAQ</Link>
            <Link to="/info/contact-us">Contact Us</Link>
            <Link to="/info/partner-with-us">Partner With Us</Link>
            <Link to="/info/ride-with-us">Ride With Us</Link>
          </div>
          <div className="footer-col">
            <h3>Legal</h3>
            <Link to="/info/terms">Terms &amp; Conditions</Link>
            <Link to="/info/privacy">Privacy Policy</Link>
            <Link to="/info/cookies">Cookie Policy</Link>
            <Link to="/info/refunds">Refund Policy</Link>
          </div>
        </div>
        <div className="footer-bottom">
          <p>&copy; 2026 ZingBite. Made with <Heart size={14} fill="var(--brand-red)" color="var(--brand-red)" style={{display:'inline', verticalAlign:'middle', margin:'0 4px'}} /> for food lovers</p>
          <div className="footer-socials">
            <button className="footer-social-btn"><Globe size={16} /></button>
            <button className="footer-social-btn"><MessageCircle size={16} /></button>
            <button className="footer-social-btn"><Camera size={16} /></button>
            <button className="footer-social-btn"><Briefcase size={16} /></button>
          </div>
        </div>
      </footer>
    </>
  );
};

export default Footer;
