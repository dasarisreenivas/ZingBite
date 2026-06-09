import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';
import { AlertTriangle, Loader, ChevronDown, MapPin } from 'lucide-react';

const Register = () => {
  const [formData, setFormData] = useState({
    username: '', email: '', mobile: '', password: '', confirmPassword: '', address: '', role: 'customer',
    latitude: null, longitude: null, city: ''
  });
  const [countryCode, setCountryCode] = useState('91');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const [geocoding, setGeocoding] = useState(false);
  const [focusedField, setFocusedField] = useState(null);
  const [agreedToTerms, setAgreedToTerms] = useState(false);
  const navigate = useNavigate();

  const detectLocation = () => {
    if (!navigator.geolocation) {
      setError("Geolocation is not supported by your browser or is blocked in insecure contexts.");
      return;
    }
    setGeocoding(true);
    setError('');
    navigator.geolocation.getCurrentPosition(
      async (pos) => {
        const { latitude, longitude } = pos.coords;
        try {
          const response = await fetch(`https://nominatim.openstreetmap.org/reverse?format=json&lat=${latitude}&lon=${longitude}&zoom=18`);
          const data = await response.json();
          if (data) {
            const addr = data.display_name || '';
            const cityName = data.address?.city || data.address?.town || data.address?.village || data.address?.suburb || '';
            setFormData(prev => ({ 
              ...prev, 
              address: addr,
              latitude: latitude,
              longitude: longitude,
              city: cityName
            }));
          }
        } catch (err) {
          console.error("Reverse geocoding error:", err);
          setError("Failed to geocode address from coordinates.");
        } finally {
          setGeocoding(false);
        }
      },
      (err) => {
        setError("Error retrieving location: " + err.message);
        setGeocoding(false);
      }
    );
  };

  const countryPhoneLengths = {
    '91': { label: '+91 (IN)', length: 10 },
    '1': { label: '+1 (US)', length: 10 },
    '44': { label: '+44 (UK)', length: 10 },
    '971': { label: '+971 (UAE)', length: 9 }
  };

  const handleChange = (e) => setFormData({...formData, [e.target.name]: e.target.value});

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');

    if (formData.password !== formData.confirmPassword) {
      setError('Passwords do not match');
      return;
    }
    
    if (!agreedToTerms) {
      setError('You must agree to the Terms & Conditions');
      return;
    }

    const requiredLength = countryPhoneLengths[countryCode].length;
    const cleanMobile = formData.mobile.replace(/\D/g, '');
    
    if (cleanMobile.length !== requiredLength) {
      setError(`Mobile number for this country must be exactly ${requiredLength} digits`);
      return;
    }

    setLoading(true);
    try {
      const submissionData = {
        ...formData,
        mobile: `${countryCode}${cleanMobile}`
      };
      
      const res = await axios.post('/api/register', submissionData);
      if(res.data.success) {
        navigate('/login');
      }
    } catch (err) {
      setError(err.response?.data?.error || 'Registration failed');
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <style>{`
        .register-page {
          display: flex;
          min-height: calc(100vh - 72px);
        }
        .register-hero {
          flex: 1.2;
          position: relative;
          overflow: hidden;
          display: none;
        }
        @media (min-width: 900px) {
          .register-hero { display: block; }
        }
        .register-hero img {
          width: 100%;
          height: 100%;
          object-fit: cover;
          transition: transform 8s ease;
        }
        .register-hero:hover img {
          transform: scale(1.05);
        }
        .register-hero-overlay {
          position: absolute;
          inset: 0;
          background: linear-gradient(135deg, rgba(247,55,79,0.24) 0%, rgba(0,0,0,0.62) 100%);
          display: flex;
          flex-direction: column;
          justify-content: center;
          align-items: center;
          text-align: center;
          padding: 40px;
        }
        .register-hero-overlay h2 {
          font-family: 'Outfit', sans-serif;
          font-size: 3rem;
          font-weight: 800;
          color: #fff;
          margin-bottom: 16px;
          line-height: 1.1;
        }
        .register-hero-overlay p {
          color: rgba(255,255,255,0.85);
          font-size: 1.1rem;
          max-width: 400px;
        }
        .register-form-section {
          flex: 1;
          display: flex;
          align-items: center;
          justify-content: center;
          padding: 40px 20px;
          background: linear-gradient(180deg, rgba(247,55,79,0.035) 0%, #fff 42%);
        }
        .register-form-container {
          width: 100%;
          max-width: 400px;
          background: rgba(255,255,255,0.96);
          border: 1px solid rgba(247,55,79,0.1);
          border-radius: var(--radius-lg);
          padding: 28px;
          box-shadow: 0 18px 50px rgba(28,28,28,0.08);
          animation: fadeInScale 0.5s ease-out both;
        }
        @keyframes fadeInScale {
          from { opacity: 0; transform: scale(0.96) translateY(12px); }
          to { opacity: 1; transform: scale(1) translateY(0); }
        }
        .register-form-container h2 {
          font-size: 2rem;
          margin-bottom: 6px;
          color: var(--text-primary);
        }
        .register-form-container .subtitle {
          color: var(--text-secondary);
          margin-bottom: 32px;
          font-size: 0.95rem;
        }
        .register-form-container .subtitle a {
          color: var(--brand-red);
          font-weight: 600;
          text-decoration: none;
        }
        .form-field {
          position: relative;
          margin-bottom: 18px;
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
        .form-field input,
        .form-field textarea {
          width: 100%;
          padding: 16px;
          border: 2px solid var(--border-medium);
          border-radius: var(--radius-sm);
          font-size: 1rem;
          font-family: inherit;
          outline: none;
          transition: all 0.3s ease;
          background: #fff;
          resize: vertical;
        }
        .form-field.focused input,
        .form-field.focused textarea {
          border-color: var(--brand-red);
          box-shadow: 0 0 0 3px rgba(247, 55, 79, 0.08);
        }
        .form-field textarea {
          min-height: 80px;
        }
        .form-field.textarea-field label {
          top: 16px;
          transform: none;
        }
        .form-field.textarea-field.focused label,
        .form-field.textarea-field.filled label {
          top: -8px;
          transform: none;
        }
        .phone-input-group {
          display: flex;
          gap: 10px;
          margin-bottom: 18px;
        }
        .phone-prefix-select-wrapper {
          position: relative;
          width: 110px;
          flex-shrink: 0;
        }
        .phone-prefix-select {
          width: 100%;
          height: 100%;
          padding: 16px 28px 16px 16px;
          border: 2px solid var(--border-medium);
          border-radius: var(--radius-sm);
          font-size: 0.95rem;
          font-family: inherit;
          outline: none;
          background: #fff;
          cursor: pointer;
          transition: all 0.3s ease;
          appearance: none;
          font-weight: 500;
        }
        .phone-input-group.focused .phone-prefix-select {
          border-color: var(--brand-red);
          box-shadow: 0 0 0 3px rgba(247, 55, 79, 0.08);
        }
        .select-chevron {
          position: absolute;
          right: 12px;
          top: 50%;
          transform: translateY(-50%);
          pointer-events: none;
          color: var(--text-muted);
          transition: color 0.3s ease;
        }
        .phone-input-group.focused .select-chevron {
          color: var(--brand-red);
        }
        .terms-checkbox-field {
          display: flex;
          align-items: flex-start;
          gap: 10px;
          margin-bottom: 20px;
          margin-top: 12px;
          user-select: none;
        }
        .terms-checkbox-field input[type="checkbox"] {
          width: 18px;
          height: 18px;
          accent-color: var(--brand-red);
          cursor: pointer;
          margin-top: 2px;
          flex-shrink: 0;
        }
        .terms-checkbox-field label {
          font-size: 0.9rem;
          color: var(--text-secondary);
          cursor: pointer;
          line-height: 1.4;
        }
        .terms-checkbox-field label a {
          color: var(--brand-red);
          font-weight: 600;
          text-decoration: underline;
        }
        .terms-checkbox-field label a:hover {
          color: var(--brand-red-hover);
        }
        .register-error {
          background: rgba(226, 55, 68, 0.06);
          border: 1px solid rgba(226, 55, 68, 0.2);
          color: var(--danger);
          padding: 12px 16px;
          border-radius: var(--radius-sm);
          margin-bottom: 18px;
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
        .register-submit {
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
        .register-submit:hover:not(:disabled) {
          background: var(--brand-red-hover);
          transform: translateY(-1px);
          box-shadow: 0 6px 20px rgba(247, 55, 79, 0.3);
        }
        .register-submit:disabled {
          opacity: 0.7;
          cursor: not-allowed;
        }
        .register-submit::after {
          content: '';
          position: absolute;
          inset: 0;
          background: linear-gradient(90deg, transparent, rgba(255,255,255,0.15), transparent);
          transform: translateX(-100%);
        }
        .register-submit:hover::after {
          transform: translateX(100%);
          transition: transform 0.6s ease;
        }
        @media (max-width: 768px) {
          .register-form-section {
            padding: 24px 16px;
          }
          .register-page {
            min-height: auto;
            flex-direction: column;
          }
        }
      `}</style>

      <div className="register-page">
        <div className="register-hero">
          <img src="https://images.unsplash.com/photo-1555939594-58d7cb561ad1?q=80&w=1974&auto=format&fit=crop" alt="Food" />
          <div className="register-hero-overlay">
            <h2>Join<br/>ZingBite!</h2>
            <p>Create an account and start ordering from hundreds of restaurants</p>
          </div>
        </div>

        <div className="register-form-section">
          <div className="register-form-container">
            <h2>Sign Up</h2>
            <p className="subtitle">
              or <Link to="/login">login to your account</Link>
            </p>

            {error && <div className="register-error"><AlertTriangle size={16} /> {error}</div>}

            <form onSubmit={handleSubmit}>
              <div className={`form-field ${focusedField === 'username' ? 'focused' : ''} ${formData.username ? 'filled' : ''}`}>
                <label>Full Name</label>
                <input
                  type="text"
                  name="username"
                  value={formData.username}
                  onChange={handleChange}
                  onFocus={() => setFocusedField('username')}
                  onBlur={() => setFocusedField(null)}
                  required
                />
              </div>

              <div className={`form-field ${focusedField === 'email' ? 'focused' : ''} ${formData.email ? 'filled' : ''}`}>
                <label>Email address</label>
                <input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  onFocus={() => setFocusedField('email')}
                  onBlur={() => setFocusedField(null)}
                  required
                />
              </div>

              {/* Custom Mobile Input with Country Code Selector */}
              <div className={`phone-input-group ${focusedField === 'mobile' ? 'focused' : ''}`}>
                <div className="phone-prefix-select-wrapper">
                  <select 
                    value={countryCode} 
                    onChange={e => setCountryCode(e.target.value)}
                    onFocus={() => setFocusedField('mobile')}
                    onBlur={() => setFocusedField(null)}
                    className="phone-prefix-select"
                  >
                    <option value="91">+91 (IN)</option>
                    <option value="1">+1 (US)</option>
                    <option value="44">+44 (UK)</option>
                    <option value="971">+971 (UAE)</option>
                  </select>
                  <ChevronDown size={14} className="select-chevron" />
                </div>
                
                <div className={`form-field ${focusedField === 'mobile' ? 'focused' : ''} ${formData.mobile ? 'filled' : ''}`} style={{ flex: 1, marginBottom: 0 }}>
                  <label>Mobile Number ({countryPhoneLengths[countryCode].length} digits)</label>
                  <input
                    type="tel"
                    name="mobile"
                    value={formData.mobile}
                    onChange={handleChange}
                    onFocus={() => setFocusedField('mobile')}
                    onBlur={() => setFocusedField(null)}
                    required
                  />
                </div>
              </div>

              <div className={`form-field ${focusedField === 'password' ? 'focused' : ''} ${formData.password ? 'filled' : ''}`}>
                <label>Password</label>
                <input
                  type="password"
                  name="password"
                  value={formData.password}
                  onChange={handleChange}
                  onFocus={() => setFocusedField('password')}
                  onBlur={() => setFocusedField(null)}
                  required
                />
              </div>

              <div className={`form-field ${focusedField === 'confirmPassword' ? 'focused' : ''} ${formData.confirmPassword ? 'filled' : ''}`}>
                <label>Confirm Password</label>
                <input
                  type="password"
                  name="confirmPassword"
                  value={formData.confirmPassword}
                  onChange={handleChange}
                  onFocus={() => setFocusedField('confirmPassword')}
                  onBlur={() => setFocusedField(null)}
                  required
                />
              </div>

              <div className={`form-field textarea-field ${focusedField === 'address' ? 'focused' : ''} ${formData.address ? 'filled' : ''}`}>
                <label>Delivery Address</label>
                <textarea
                  name="address"
                  value={formData.address}
                  onChange={handleChange}
                  onFocus={() => setFocusedField('address')}
                  onBlur={() => setFocusedField(null)}
                  required
                />
              </div>

              <button 
                type="button" 
                onClick={detectLocation}
                disabled={geocoding}
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: '6px',
                  background: 'none',
                  border: '1px solid var(--border-medium)',
                  color: 'var(--text-secondary)',
                  padding: '8px 12px',
                  borderRadius: '4px',
                  fontSize: '0.82rem',
                  fontWeight: 600,
                  cursor: 'pointer',
                  marginBottom: '18px',
                  marginTop: '-10px',
                  alignSelf: 'flex-start',
                  transition: 'all 0.2s'
                }}
              >
                <MapPin size={12} style={{ color: 'var(--brand-red)' }} />
                {geocoding ? 'Detecting Location...' : 'Auto-Detect Address'}
              </button>
              
              <div className="terms-checkbox-field">
                <input
                  type="checkbox"
                  id="terms-checkbox"
                  checked={agreedToTerms}
                  onChange={(e) => setAgreedToTerms(e.target.checked)}
                  required
                />
                <label htmlFor="terms-checkbox">
                  I agree to the <Link to="/info/terms" target="_blank" rel="noopener noreferrer">Terms &amp; Conditions</Link>
                </label>
              </div>

              <button type="submit" className="register-submit" disabled={loading}>
                {loading ? <><Loader size={16} style={{animation:'spin 1s linear infinite', display:'inline-block', verticalAlign:'middle', marginRight:'6px'}} /> Creating...</> : 'CREATE ACCOUNT'}
              </button>
            </form>
          </div>
        </div>
      </div>
    </>
  );
};

export default Register;
