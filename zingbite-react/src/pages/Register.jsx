import { useState, useRef, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';
import { AlertTriangle, Loader, ChevronDown, MapPin, Flame, Mail, Lock, User, Phone } from 'lucide-react';

const Register = () => {
  const [formData, setFormData] = useState({
    username: '', email: '', mobile: '', password: '', confirmPassword: '', address: '', role: 'customer',
    latitude: null, longitude: null, city: ''
  });
  const [countryCode, setCountryCode] = useState('91');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const [geocoding, setGeocoding] = useState(false);
  const [leafletLoaded, setLeafletLoaded] = useState(typeof window !== 'undefined' && !!window.L);
  const mapRef = useRef(null);
  const mapInstanceRef = useRef(null);
  const markerRef = useRef(null);
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

  useEffect(() => {
    if (window.L) { setLeafletLoaded(true); return; }
    let link = document.querySelector('link[href*="leaflet.css"]');
    if (!link) {
      link = document.createElement('link');
      link.rel = 'stylesheet';
      link.href = 'https://unpkg.com/leaflet@1.9.4/dist/leaflet.css';
      document.head.appendChild(link);
    }
    let script = document.querySelector('script[src*="leaflet.js"]');
    if (!script) {
      script = document.createElement('script');
      script.src = 'https://unpkg.com/leaflet@1.9.4/dist/leaflet.js';
      script.async = true;
      script.onload = () => {
        const interval = setInterval(() => {
          if (window.L) { setLeafletLoaded(true); clearInterval(interval); }
        }, 50);
      };
      document.body.appendChild(script);
    }
  }, []);

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

  useEffect(() => {
    if (!leafletLoaded || !mapRef.current || !formData.latitude) return;
    const L = window.L;
    if (!L) return;
    if (mapInstanceRef.current) return;
    const lat = formData.latitude || 12.9716;
    const lng = formData.longitude || 77.5946;
    const map = L.map(mapRef.current).setView([lat, lng], 14);
    mapInstanceRef.current = map;
    L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
      maxZoom: 19, attribution: '&copy; OpenStreetMap contributors'
    }).addTo(map);
    setTimeout(() => {
      if (mapInstanceRef.current) {
        mapInstanceRef.current.invalidateSize();
      }
    }, 200);
    const customIcon = L.divIcon({
      html: '<div style="font-size:24px;text-align:center;line-height:24px;">📍</div>',
      className: 'custom-register-marker', iconSize: [24, 24], iconAnchor: [12, 12]
    });
    const marker = L.marker([lat, lng], { icon: customIcon, draggable: true }).addTo(map);
    markerRef.current = marker;
    const reverseGeocodeRegister = async (lat, lng) => {
      try {
        const resp = await fetch(`https://nominatim.openstreetmap.org/reverse?format=json&lat=${lat}&lon=${lng}&zoom=18`);
        const data = await resp.json();
        if (data) {
          const addr = data.display_name || '';
          const cityName = data.address?.city || data.address?.town || data.address?.village || data.address?.suburb || '';
          setFormData(prev => ({ ...prev, address: addr, latitude: lat, longitude: lng, city: cityName }));
        }
      } catch (e) { console.error("Reverse geocode error:", e); }
    };
    marker.on('dragend', () => {
      const ll = marker.getLatLng();
      reverseGeocodeRegister(ll.lat, ll.lng);
    });
    map.on('click', (e) => {
      marker.setLatLng(e.latlng);
      reverseGeocodeRegister(e.latlng.lat, e.latlng.lng);
    });
    return () => {
      if (mapInstanceRef.current) {
        mapInstanceRef.current.remove();
        mapInstanceRef.current = null;
        markerRef.current = null;
      }
    };
  }, [leafletLoaded, formData.latitude, formData.longitude]);

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
          background: linear-gradient(135deg, rgba(247,55,79,0.35) 0%, rgba(0,0,0,0.7) 100%);
          display: flex;
          flex-direction: column;
          justify-content: center;
          align-items: center;
          text-align: center;
          padding: 40px;
        }
        .register-hero-overlay::before {
          content: '';
          position: absolute;
          inset: 0;
          background: radial-gradient(ellipse at 50% 80%, rgba(247,55,79,0.15) 0%, transparent 60%);
        }
        .register-hero-overlay h2 {
          font-family: 'Outfit', sans-serif;
          font-size: 3.2rem;
          font-weight: 800;
          color: #fff;
          margin-bottom: 12px;
          line-height: 1.1;
          position: relative;
        }
        .register-hero-overlay p {
          color: rgba(255,255,255,0.85);
          font-size: 1.1rem;
          max-width: 400px;
          position: relative;
        }
        .hero-flame {
          display: inline-flex;
          align-items: center;
          gap: 6px;
          margin-top: 24px;
          padding: 8px 20px;
          border-radius: 30px;
          background: rgba(255,255,255,0.1);
          backdrop-filter: blur(8px);
          border: 1px solid rgba(255,255,255,0.15);
          color: #fff;
          font-size: 0.85rem;
          font-weight: 600;
          position: relative;
        }
        .register-form-section {
          flex: 1;
          display: flex;
          align-items: flex-start;
          justify-content: center;
          padding: 32px 20px;
          background: linear-gradient(180deg, rgba(247,55,79,0.035) 0%, #fff 42%);
          position: relative;
          overflow-y: auto;
        }
        .register-form-section::before {
          content: '';
          position: absolute;
          top: 0;
          left: 0;
          right: 0;
          height: 4px;
          background: linear-gradient(90deg, transparent, var(--brand-red), transparent);
        }
        .register-form-container {
          width: 100%;
          max-width: 420px;
          background: rgba(255,255,255,0.96);
          border: 1px solid rgba(247,55,79,0.1);
          border-radius: 20px;
          padding: 32px;
          box-shadow: 0 18px 50px rgba(28,28,28,0.08);
          animation: fadeInScale 0.5s ease-out both;
          position: relative;
          backdrop-filter: blur(12px);
        }
        .register-form-container::before {
          content: '';
          position: absolute;
          top: -1px;
          left: -1px;
          right: -1px;
          height: 4px;
          background: linear-gradient(90deg, var(--brand-red), #ff6b81, var(--brand-red));
          border-radius: 20px 20px 0 0;
        }
        @keyframes fadeInScale {
          from { opacity: 0; transform: scale(0.96) translateY(12px); }
          to { opacity: 1; transform: scale(1) translateY(0); }
        }
        .register-form-container .brand-icon {
          display: flex;
          align-items: center;
          gap: 8px;
          margin-bottom: 8px;
        }
        .register-form-container h2 {
          font-size: 1.8rem;
          margin: 0 0 4px;
          color: var(--text-primary);
        }
        .register-form-container .subtitle {
          color: var(--text-secondary);
          margin-bottom: 24px;
          font-size: 0.95rem;
        }
        .register-form-container .subtitle a {
          color: var(--brand-red);
          font-weight: 600;
          text-decoration: none;
        }
        .form-field {
          position: relative;
          margin-bottom: 16px;
        }
        .form-field label {
          position: absolute;
          left: 44px;
          top: 50%;
          transform: translateY(-50%);
          color: var(--text-muted);
          font-size: 0.95rem;
          pointer-events: none;
          transition: all 0.25s var(--ease-premium);
          background: #fff;
          padding: 0 4px;
        }
        .form-field.focused label,
        .form-field.filled label {
          top: 0;
          left: 16px;
          font-size: 0.72rem;
          color: var(--brand-red);
          font-weight: 600;
        }
        .form-field .field-icon {
          position: absolute;
          left: 14px;
          top: 50%;
          transform: translateY(-50%);
          color: var(--text-muted);
          transition: color 0.25s var(--ease-premium);
          pointer-events: none;
          z-index: 1;
        }
        .form-field.focused .field-icon {
          color: var(--brand-red);
        }
        .form-field input,
        .form-field textarea {
          width: 100%;
          padding: 14px 14px 14px 44px;
          border: 1.5px solid var(--border-medium);
          border-radius: 12px;
          font-size: 0.95rem;
          font-family: inherit;
          outline: none;
          transition: all 0.25s var(--ease-premium);
          background: #fff;
          resize: vertical;
        }
        .form-field.focused input,
        .form-field.focused textarea {
          border-color: var(--brand-red);
          box-shadow: 0 0 0 4px rgba(247, 55, 79, 0.08);
        }
        .form-field textarea {
          min-height: 70px;
        }
        .form-field.textarea-field label {
          top: 14px;
          transform: none;
          left: 44px;
        }
        .form-field.textarea-field.focused label,
        .form-field.textarea-field.filled label {
          top: -8px;
          left: 16px;
        }
        .form-field.textarea-field .field-icon {
          top: 14px;
          transform: none;
        }
        .phone-input-group {
          display: flex;
          gap: 10px;
          margin-bottom: 16px;
        }
        .phone-prefix-select-wrapper {
          position: relative;
          width: 110px;
          flex-shrink: 0;
        }
        .phone-prefix-select {
          width: 100%;
          height: 100%;
          padding: 14px 28px 14px 14px;
          border: 1.5px solid var(--border-medium);
          border-radius: 12px;
          font-size: 0.9rem;
          font-family: inherit;
          outline: none;
          background: #fff;
          cursor: pointer;
          transition: all 0.25s var(--ease-premium);
          appearance: none;
          font-weight: 500;
        }
        .phone-prefix-select:hover {
          border-color: var(--brand-red);
        }
        .phone-input-group.focused .phone-prefix-select {
          border-color: var(--brand-red);
          box-shadow: 0 0 0 4px rgba(247, 55, 79, 0.08);
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
          margin-bottom: 16px;
          margin-top: 8px;
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
          font-size: 0.85rem;
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
          border-radius: 10px;
          margin-bottom: 16px;
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
          padding: 14px;
          background: linear-gradient(135deg, var(--brand-red), #d42d42);
          color: #fff;
          border: none;
          border-radius: 12px;
          font-size: 1rem;
          font-weight: 700;
          font-family: inherit;
          cursor: pointer;
          transition: all 0.3s var(--ease-premium);
          position: relative;
          overflow: hidden;
        }
        .register-submit:hover:not(:disabled) {
          transform: translateY(-2px);
          box-shadow: 0 8px 28px rgba(247, 55, 79, 0.35);
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
        .locate-btn {
          display: flex;
          align-items: center;
          gap: 6px;
          background: rgba(247,55,79,0.04);
          border: 1.5px solid var(--border-medium);
          color: var(--text-secondary);
          padding: 8px 14px;
          border-radius: 10px;
          font-size: 0.8rem;
          font-weight: 600;
          cursor: pointer;
          margin-bottom: 16px;
          margin-top: -6px;
          transition: all 0.25s var(--ease-premium);
        }
        .locate-btn:hover {
          border-color: var(--brand-red);
          color: var(--brand-red);
          background: rgba(247,55,79,0.06);
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

      <div className="register-page page-enter">
        <div className="register-hero">
          <img src="https://images.unsplash.com/photo-1555939594-58d7cb561ad1?q=80&w=1974&auto=format&fit=crop" alt="Food" loading="lazy" />
          <div className="register-hero-overlay">
            <h2>Join<br/>ZingBite!</h2>
            <p>Create an account and start ordering from hundreds of restaurants</p>
            <div className="hero-flame">
              <Flame size={16} color="#F7374F" /> Free delivery on your first 5 orders
            </div>
          </div>
        </div>

        <div className="register-form-section">
          <div className="register-form-container">
            <div className="brand-icon">
              <Flame size={22} color="#F7374F" fill="#F7374F" />
              <span style={{ fontWeight: 800, fontSize: '1.1rem', color: 'var(--text-primary)' }}>ZingBite</span>
            </div>
            <h2>Sign Up</h2>
            <p className="subtitle">
              or <Link to="/login">login to your account</Link>
            </p>

            {error && <div className="register-error"><AlertTriangle size={16} /> {error}</div>}

            <form onSubmit={handleSubmit}>
              <div className={`form-field ${focusedField === 'username' ? 'focused' : ''} ${formData.username ? 'filled' : ''}`}>
                <User size={16} className="field-icon" />
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
                <Mail size={16} className="field-icon" />
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
                  <Phone size={16} className="field-icon" />
                  <label>Mobile Number</label>
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
                <Lock size={16} className="field-icon" />
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
                <Lock size={16} className="field-icon" />
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
                <MapPin size={16} className="field-icon" />
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

              <button type="button" onClick={detectLocation} disabled={geocoding} className="locate-btn">
                <MapPin size={12} style={{ color: 'var(--brand-red)' }} />
                {geocoding ? 'Detecting Location...' : 'Auto-Detect Address'}
              </button>
              
              {leafletLoaded && <div ref={mapRef} style={{ height: '180px', borderRadius: 'var(--radius-sm)', border: '1px solid var(--border-medium)', zIndex: 1, marginTop: '8px' }} />}
              
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
