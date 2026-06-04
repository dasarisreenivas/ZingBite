import React, { useState, useContext } from 'react';
import { Link, useNavigate, useSearchParams } from 'react-router-dom';
import { AuthContext } from '../context/AuthContext';
import { AlertTriangle, Loader } from 'lucide-react';

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const [focusedField, setFocusedField] = useState(null);
  
  const { login } = useContext(AuthContext);
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const redirect = searchParams.get('redirect') || '/';

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setLoading(true);
    const result = await login(email, password);
    setLoading(false);
    if (result.success) {
      const loggedUser = result.user;
      let targetRedirect = redirect;
      
      const restrictedRoutes = {
        '/delivery': 'delivery_partner',
        '/restaurant-admin': 'restaurant_admin',
        '/admin': 'super_admin'
      };
      
      // Prevent cross-portal redirect mismatch
      if (restrictedRoutes[targetRedirect] && loggedUser.role !== restrictedRoutes[targetRedirect]) {
        targetRedirect = '/';
      }
      
      if (targetRedirect === '/') {
        if (loggedUser.role === 'delivery_partner') {
          targetRedirect = '/delivery';
        } else if (loggedUser.role === 'restaurant_admin') {
          targetRedirect = '/restaurant-admin';
        } else if (loggedUser.role === 'super_admin') {
          targetRedirect = '/admin';
        }
      }
      navigate(targetRedirect);
    } else {
      setError(result.error || 'Login failed');
    }
  };

  return (
    <>
      <style>{`
        .login-page {
          display: flex;
          min-height: calc(100vh - 72px);
        }
        .login-hero {
          flex: 1.2;
          position: relative;
          overflow: hidden;
          display: none;
        }
        @media (min-width: 900px) {
          .login-hero { display: block; }
        }
        .login-hero img {
          width: 100%;
          height: 100%;
          object-fit: cover;
          transition: transform 8s ease;
        }
        .login-hero:hover img {
          transform: scale(1.05);
        }
        .login-hero-overlay {
          position: absolute;
          inset: 0;
          background: linear-gradient(135deg, rgba(247,55,79,0.7) 0%, rgba(0,0,0,0.5) 100%);
          display: flex;
          flex-direction: column;
          justify-content: center;
          align-items: center;
          text-align: center;
          padding: 40px;
        }
        .login-hero-overlay h2 {
          font-family: 'Outfit', sans-serif;
          font-size: 3rem;
          font-weight: 800;
          color: #fff;
          margin-bottom: 16px;
          line-height: 1.1;
        }
        .login-hero-overlay p {
          color: rgba(255,255,255,0.85);
          font-size: 1.1rem;
          max-width: 400px;
        }
        .login-form-section {
          flex: 1;
          display: flex;
          align-items: center;
          justify-content: center;
          padding: 40px 20px;
          background: #fff;
        }
        .login-form-container {
          width: 100%;
          max-width: 400px;
          animation: fadeInScale 0.5s ease-out both;
        }
        @media (max-width: 768px) {
          .login-form-section {
            padding: 24px 16px;
          }
          .login-page {
            min-height: auto;
            flex-direction: column;
          }
        }
        @keyframes fadeInScale {
          from { opacity: 0; transform: scale(0.96) translateY(12px); }
          to { opacity: 1; transform: scale(1) translateY(0); }
        }
        .login-form-container h2 {
          font-size: 2rem;
          margin-bottom: 6px;
          color: var(--text-primary);
        }
        .login-form-container .subtitle {
          color: var(--text-secondary);
          margin-bottom: 36px;
          font-size: 0.95rem;
        }
        .login-form-container .subtitle a {
          color: var(--brand-red);
          font-weight: 600;
          text-decoration: none;
          transition: color 0.2s;
        }
        .login-form-container .subtitle a:hover {
          color: var(--brand-red-hover);
        }
        .form-field {
          position: relative;
          margin-bottom: 20px;
        }
        .form-field label {
          position: absolute;
          left: 16px;
          top: 50%;
          transform: translateY(-50%);
          color: var(--text-muted);
          font-size: 1rem;
          pointer-events: none;
          transition: all 0.25s ease;
          background: #fff;
          padding: 0 4px;
        }
        .form-field.focused label,
        .form-field.filled label {
          top: 0;
          font-size: 0.78rem;
          color: var(--brand-red);
          font-weight: 500;
        }
        .form-field input {
          width: 100%;
          padding: 16px;
          border: 2px solid var(--border-medium);
          border-radius: var(--radius-sm);
          font-size: 1rem;
          font-family: inherit;
          outline: none;
          transition: all 0.3s ease;
          background: #fff;
        }
        .form-field.focused input {
          border-color: var(--brand-red);
          box-shadow: 0 0 0 3px rgba(247, 55, 79, 0.08);
        }
        .login-error {
          background: rgba(226, 55, 68, 0.06);
          border: 1px solid rgba(226, 55, 68, 0.2);
          color: var(--danger);
          padding: 12px 16px;
          border-radius: var(--radius-sm);
          margin-bottom: 20px;
          font-size: 0.9rem;
          animation: shake 0.4s ease-in-out;
          display: flex;
          align-items: center;
          gap: 8px;
        }
        @keyframes shake {
          0%, 100% { transform: translateX(0); }
          20%, 60% { transform: translateX(-6px); }
          40%, 80% { transform: translateX(6px); }
        }
        .login-submit {
          width: 100%;
          padding: 16px;
          background: var(--brand-red);
          color: #fff;
          border: none;
          border-radius: var(--radius-sm);
          font-size: 1rem;
          font-weight: 700;
          font-family: inherit;
          cursor: pointer;
          margin-top: 8px;
          transition: all 0.3s ease;
          position: relative;
          overflow: hidden;
        }
        .login-submit:hover:not(:disabled) {
          background: var(--brand-red-hover);
          transform: translateY(-1px);
          box-shadow: 0 6px 20px rgba(247, 55, 79, 0.3);
        }
        .login-submit:active {
          transform: translateY(0);
        }
        .login-submit:disabled {
          opacity: 0.7;
          cursor: not-allowed;
        }
        .login-submit::after {
          content: '';
          position: absolute;
          inset: 0;
          background: linear-gradient(90deg, transparent, rgba(255,255,255,0.15), transparent);
          transform: translateX(-100%);
        }
        .login-submit:hover::after {
          transform: translateX(100%);
          transition: transform 0.6s ease;
        }
        .spin-icon {
          animation: spin 1s linear infinite;
          display: inline-block;
          vertical-align: middle;
          margin-right: 6px;
        }
        @keyframes spin {
          from { transform: rotate(0deg); }
          to { transform: rotate(360deg); }
        }
      `}</style>

      <div className="login-page">
        <div className="login-hero">
          <img src="https://images.unsplash.com/photo-1504674900247-0877df9cc836?q=80&w=2070&auto=format&fit=crop" alt="Food" />
          <div className="login-hero-overlay">
            <h2>Welcome<br/>Back!</h2>
            <p>Order your favorite food from the best restaurants in town</p>
          </div>
        </div>

        <div className="login-form-section">
          <div className="login-form-container">
            <h2>Login</h2>
            <p className="subtitle">
              or <Link to="/register">create an account</Link>
            </p>

            {error && <div className="login-error"><AlertTriangle size={16} /> {error}</div>}

            <form onSubmit={handleSubmit}>
              <div className={`form-field ${focusedField === 'email' ? 'focused' : ''} ${email ? 'filled' : ''}`}>
                <label>Email address</label>
                <input
                  type="email"
                  value={email}
                  onChange={e => setEmail(e.target.value)}
                  onFocus={() => setFocusedField('email')}
                  onBlur={() => setFocusedField(null)}
                  required
                />
              </div>
              <div className={`form-field ${focusedField === 'password' ? 'focused' : ''} ${password ? 'filled' : ''}`}>
                <label>Password</label>
                <input
                  type="password"
                  value={password}
                  onChange={e => setPassword(e.target.value)}
                  onFocus={() => setFocusedField('password')}
                  onBlur={() => setFocusedField(null)}
                  required
                />
              </div>
              <button type="submit" className="login-submit" disabled={loading}>
                {loading ? <><Loader size={16} className="spin-icon" /> Logging in...</> : 'LOGIN'}
              </button>
            </form>
          </div>
        </div>
      </div>
    </>
  );
};

export default Login;
