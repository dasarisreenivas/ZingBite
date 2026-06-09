import React, { useState, useEffect, useContext, useRef } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import axios from 'axios';
import { AuthContext } from '../context/AuthContext';
import { useModal } from '../context/ModalContext';
import { 
  Info, Briefcase, Users, BookOpen, HelpCircle, Mail, 
  Building2, Bike, FileText, Shield, Cookie, RefreshCw,
  Send, CheckCircle, ChevronDown, Search, MapPin, Phone, ExternalLink, AlertCircle, Loader
} from 'lucide-react';

const InfoPage = () => {
  const { sectionId } = useParams();
  const navigate = useNavigate();
  const { showAlert } = useModal();
  const activeSection = sectionId || 'about-us';

  const { user, updateUser } = useContext(AuthContext);
  const [partnerSubmitting, setPartnerSubmitting] = useState(false);
  const [riderSubmitting, setRiderSubmitting] = useState(false);

  // State for forms & interactions
  const [contactForm, setContactForm] = useState({ name: '', email: '', subject: '', message: '' });
  const [contactSubmitted, setContactSubmitted] = useState(false);
  const [partnerForm, setPartnerForm] = useState({ restName: '', owner: '', email: '', phone: '', city: '', cuisine: '', address: '', licenseNo: '', aadhaarNo: '', gstNo: '' });
  const [partnerSubmitted, setPartnerSubmitted] = useState(false);
  const [riderForm, setRiderForm] = useState({ name: '', city: '', vehicle: 'bike', phone: '' });
  const [riderSubmitted, setRiderSubmitted] = useState(false);

  // Leaflet Map states & refs
  const [leafletLoaded, setLeafletLoaded] = useState(typeof window !== 'undefined' && !!window.L);
  const mapRef = useRef(null);
  const mapInstanceRef = useRef(null);
  const markerRef = useRef(null);
  const [geocoding, setGeocoding] = useState(false);

  useEffect(() => {
    if (window.L) {
      setLeafletLoaded(true);
      return;
    }

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
          if (window.L) {
            setLeafletLoaded(true);
            clearInterval(interval);
          }
        }, 50);
      };
      document.body.appendChild(script);
    }
  }, []);

  const reverseGeocode = async (lat, lng) => {
    setGeocoding(true);
    try {
      const response = await fetch(`https://nominatim.openstreetmap.org/reverse?format=json&lat=${lat}&lon=${lng}&zoom=18`);
      const data = await response.json();
      if (data) {
        const addr = data.display_name || '';
        const city = data.address?.city || data.address?.town || data.address?.village || data.address?.suburb || '';
        
        if (activeSection === 'partner-with-us') {
          setPartnerForm(prev => ({ ...prev, address: addr, city: city }));
        } else if (activeSection === 'ride-with-us') {
          setRiderForm(prev => ({ ...prev, city: city || addr }));
        }
      }
    } catch (err) {
      console.error("Reverse geocoding error:", err);
    } finally {
      setGeocoding(false);
    }
  };

  const detectLocation = () => {
    if (!navigator.geolocation) {
      showAlert("Geolocation is not supported by your browser.", "error");
      return;
    }
    navigator.geolocation.getCurrentPosition(
      (pos) => {
        const { latitude, longitude } = pos.coords;
        if (mapInstanceRef.current) {
          mapInstanceRef.current.setView([latitude, longitude], 16);
          if (markerRef.current) {
            markerRef.current.setLatLng([latitude, longitude]);
          }
        }
        reverseGeocode(latitude, longitude);
      },
      (err) => {
        showAlert("Error retrieving location: " + err.message, "error");
      }
    );
  };

  useEffect(() => {
    const showMap = activeSection === 'partner-with-us' || activeSection === 'ride-with-us';
    if (!leafletLoaded || !mapRef.current || !showMap || !user) {
      if (mapInstanceRef.current) {
        mapInstanceRef.current.remove();
        mapInstanceRef.current = null;
        markerRef.current = null;
      }
      return;
    }

    if (mapInstanceRef.current) return;

    const L = window.L;
    if (!L) return;

    const defaultLat = 12.9716;
    const defaultLng = 77.5946;

    const map = L.map(mapRef.current).setView([defaultLat, defaultLng], 14);
    mapInstanceRef.current = map;

    L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
      maxZoom: 19,
      attribution: '&copy; OpenStreetMap contributors'
    }).addTo(map);

    const customIcon = L.divIcon({
      html: `<div style="font-size: 24px; text-align: center; line-height: 24px;">📍</div>`,
      className: 'custom-info-marker',
      iconSize: [24, 24],
      iconAnchor: [12, 12]
    });

    const marker = L.marker([defaultLat, defaultLng], { icon: customIcon, draggable: true }).addTo(map);
    markerRef.current = marker;

    marker.on('dragend', () => {
      const latLng = marker.getLatLng();
      reverseGeocode(latLng.lat, latLng.lng);
    });

    map.on('click', (e) => {
      marker.setLatLng(e.latlng);
      reverseGeocode(e.latlng.lat, e.latlng.lng);
    });

    reverseGeocode(defaultLat, defaultLng);

    return () => {
      if (mapInstanceRef.current) {
        mapInstanceRef.current.remove();
        mapInstanceRef.current = null;
        markerRef.current = null;
      }
    };
  }, [leafletLoaded, activeSection, user]);
  
  // Job apply state
  const [appliedJob, setAppliedJob] = useState(null);
  
  // Accordion FAQs state
  const [openFaq, setOpenFaq] = useState(null);

  // Sync scroll to top on section change
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [activeSection]);

  const sections = [
    { id: 'about-us', name: 'About Us', icon: Info, group: 'Company' },
    { id: 'careers', name: 'Careers', icon: Briefcase, group: 'Company' },
    { id: 'team', name: 'Team', icon: Users, group: 'Company' },
    { id: 'blog', name: 'Blog', icon: BookOpen, group: 'Company' },
    
    { id: 'help-faq', name: 'Help & FAQ', icon: HelpCircle, group: 'Support' },
    { id: 'contact-us', name: 'Contact Us', icon: Mail, group: 'Support' },
    { id: 'partner-with-us', name: 'Partner With Us', icon: Building2, group: 'Support' },
    { id: 'ride-with-us', name: 'Ride With Us', icon: Bike, group: 'Support' },
    
    { id: 'terms', name: 'Terms & Conditions', icon: FileText, group: 'Legal' },
    { id: 'privacy', name: 'Privacy Policy', icon: Shield, group: 'Legal' },
    { id: 'cookies', name: 'Cookie Policy', icon: Cookie, group: 'Legal' },
    { id: 'refunds', name: 'Refund Policy', icon: RefreshCw, group: 'Legal' },
  ];

  const handleContactSubmit = (e) => {
    e.preventDefault();
    setContactSubmitted(true);
    setTimeout(() => {
      setContactForm({ name: '', email: '', subject: '', message: '' });
      setContactSubmitted(false);
    }, 4000);
  };

  const handlePartnerSubmit = async (e) => {
    e.preventDefault();
    if (!user) {
      showAlert("You must be logged in to apply as a partner", "error");
      return;
    }
    if (!partnerForm.address || !partnerForm.licenseNo || !partnerForm.aadhaarNo || !partnerForm.gstNo) {
      showAlert("Please fill out all required onboarding fields, including map location coordinates.", "warning");
      return;
    }
    setPartnerSubmitting(true);
    try {
      const res = await axios.post('/api/restaurant-admin', {
        action: 'submitRestaurantRequest',
        name: partnerForm.restName,
        cuisine: partnerForm.cuisine || 'Multi-Cuisine',
        address: partnerForm.address,
        deliveryTime: '30 mins',
        imagePath: 'https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?q=80&w=2070&auto=format&fit=crop',
        licenseNo: partnerForm.licenseNo,
        aadhaarNo: partnerForm.aadhaarNo,
        gstNo: partnerForm.gstNo
      });
      if (res.data.success) {
        setPartnerSubmitted(true);
        showAlert("Partner onboarding application submitted successfully! Pending administrator verification and role elevation.", "success");
      }
    } catch (err) {
      showAlert(err.response?.data?.error || "Failed to submit partner application.", "error");
    } finally {
      setPartnerSubmitting(false);
    }
  };

  const handleRiderSubmit = async (e) => {
    e.preventDefault();
    if (!user) {
      showAlert("You must be logged in to apply as a rider", "error");
      return;
    }
    setRiderSubmitting(true);
    try {
      // 1. Fetch available career jobs
      const jobsRes = await axios.get('/api/careers?action=jobs');
      const jobsList = jobsRes.data || [];
      
      // 2. Find job named "Delivery Rider"
      let riderJob = jobsList.find(j => j.title && j.title.toLowerCase().includes('rider'));
      if (!riderJob && jobsList.length > 0) {
        riderJob = jobsList[0];
      }
      
      if (!riderJob) {
        throw new Error("Delivery Rider position not found in careers listing.");
      }
      
      // 3. Submit application
      const res = await axios.post('/api/careers', {
        jobId: riderJob.id,
        name: riderForm.name,
        email: user.email,
        phone: riderForm.phone,
        resumeUrl: 'https://zingbite.com/resumes/rider_application.pdf',
        city: riderForm.city,
        vehicle: riderForm.vehicle
      });
      
      if (res.data.success) {
        setRiderSubmitted(true);
        showAlert("Rider job application submitted! Pending admin review.", "success");
      }
    } catch (err) {
      showAlert(err.message || err.response?.data?.error || "Failed to submit rider application.", "error");
    } finally {
      setRiderSubmitting(false);
    }
  };

  const toggleFaq = (index) => {
    setOpenFaq(openFaq === index ? null : index);
  };

  const renderContent = () => {
    switch (activeSection) {
      case 'about-us':
        return (
          <div className="info-content-pane">
            <div className="section-hero" style={{ background: 'linear-gradient(135deg, rgba(247,55,79,0.08) 0%, rgba(255,255,255,1) 100%)' }}>
              <span className="hero-badge">OUR STORY</span>
              <h2>Delivering Happiness, One Bite at a Time</h2>
              <p>Founded in 2026, ZingBite is local community-centric food delivery reimagined. We bridge the gap between hungry food lovers and local culinary spots with speed, quality, and care.</p>
            </div>
            
            <div className="content-grid-2">
              <div className="grid-card">
                <h3>Our Mission</h3>
                <p>To empower local restaurants to reach more food lovers while providing a seamless, reliable, and premium food delivery experience for our users.</p>
              </div>
              <div className="grid-card">
                <h3>Our Vision</h3>
                <p>To become the most loved and respected food technology network, recognized for our commitment to quality, community values, and technological innovation.</p>
              </div>
            </div>

            <div className="stats-row">
              <div className="stat-box">
                <h4>500+</h4>
                <p>Partner Restaurants</p>
              </div>
              <div className="stat-box">
                <h4>150K+</h4>
                <p>Completed Deliveries</p>
              </div>
              <div className="stat-box">
                <h4>25 Mins</h4>
                <p>Average Delivery Time</p>
              </div>
              <div className="stat-box">
                <h4>4.8 ★</h4>
                <p>App Rating</p>
              </div>
            </div>
          </div>
        );

      case 'careers':
        return (
          <div className="info-content-pane">
            <h2>Careers at ZingBite</h2>
            <p className="section-desc">We are always looking for passionate, driven, and creative individuals to join our team and build the future of food tech.</p>

            <div className="jobs-list">
              {[
                { id: 1, title: 'Senior Frontend Engineer (React)', dept: 'Engineering', loc: 'Remote / Bangalore', salary: '₹18L - ₹24L' },
                { id: 2, title: 'Product Designer (UX/UI)', dept: 'Design', loc: 'Hybrid (Delhi/NCR)', salary: '₹12L - ₹16L' },
                { id: 3, title: 'Logistics Operations Lead', dept: 'Operations', loc: 'On-site (Mumbai)', salary: '₹8L - ₹11L' },
                { id: 4, title: 'Customer Support Executive', dept: 'Customer Care', loc: 'Remote', salary: '₹4L - ₹6L' }
              ].map(job => (
                <div key={job.id} className="job-card">
                  <div className="job-main">
                    <h4>{job.title}</h4>
                    <div className="job-meta">
                      <span>{job.dept}</span>
                      <span className="dot" />
                      <span>{job.loc}</span>
                      <span className="dot" />
                      <span>{job.salary}</span>
                    </div>
                  </div>
                  <button 
                    onClick={() => {
                      setAppliedJob(job.title);
                      setTimeout(() => setAppliedJob(null), 3000);
                    }} 
                    className="job-apply-btn"
                  >
                    {appliedJob === job.title ? 'Applied Successfully!' : 'Apply Now'}
                  </button>
                </div>
              ))}
            </div>

            {appliedJob && (
              <div className="toast-notification">
                <CheckCircle size={16} /> Applied for <strong>{appliedJob}</strong> position!
              </div>
            )}
          </div>
        );

      case 'team':
        return (
          <div className="info-content-pane">
            <h2>Meet Our Leadership</h2>
            <p className="section-desc">The dedicated dreamers and makers steering ZingBite towards new culinary heights.</p>

            <div className="team-grid">
              {[
                { name: 'Sreenivas Dasari', role: 'Co-Founder & CEO', desc: 'Tech visionary and food enthusiast with 10+ years of tech-firm scaling experience.' },
                { name: 'Priya Sharma', role: 'Chief Technology Officer', desc: 'Former staff engineer at major delivery platforms, leading our high-performance React-Java stack.' },
                { name: 'Vikram Malhotra', role: 'Head of Culinary Partnerships', desc: 'Culinary arts graduate dedicated to bringing the best local gems onto the ZingBite grid.' },
                { name: 'Amit Patel', role: 'VP of Logistics & Operations', desc: 'Operations mastermind ensuring our delivery fleet is optimized, secure, and fast.' }
              ].map((member, i) => (
                <div key={i} className="team-card">
                  <div className="team-avatar">{member.name.split(' ').map(n => n[0]).join('')}</div>
                  <h4>{member.name}</h4>
                  <span className="team-role">{member.role}</span>
                  <p>{member.desc}</p>
                </div>
              ))}
            </div>
          </div>
        );

      case 'blog':
        return (
          <div className="info-content-pane">
            <h2>ZingBite Blog</h2>
            <p className="section-desc">Stories, recipes, product insights, and news from our food ecosystem.</p>

            <div className="blog-grid">
              {[
                { title: 'Top 10 Food Trends Redefining Delivery in 2026', read: '5 min read', date: 'June 01, 2026', desc: 'Explore the culinary landscape of 2026, from eco-packaging to regional gourmet selections.' },
                { title: 'Behind the Technology: Scaling Real-time API Tracking', read: '8 min read', date: 'May 28, 2026', desc: 'An engineering deep-dive on how we handle sub-second rider location updates using WebSocket connections.' },
                { title: 'Savoring Sustainability: Reducing Single-Use Plastic', read: '4 min read', date: 'May 15, 2026', desc: 'How ZingBite partnered with 100+ vendors to pioneer compostable packaging options in local regions.' }
              ].map((post, i) => (
                <article key={i} className="blog-card">
                  <span className="blog-meta">{post.date} &bull; {post.read}</span>
                  <h4>{post.title}</h4>
                  <p>{post.desc}</p>
                  <a href="#read" onClick={(e) => { e.preventDefault(); showAlert("Blog reading functionality coming soon!", "info"); }} className="blog-link">Read Article <ExternalLink size={14} /></a>
                </article>
              ))}
            </div>
          </div>
        );

      case 'help-faq':
        return (
          <div className="info-content-pane">
            <h2>Help &amp; Support</h2>
            <p className="section-desc">Frequently Asked Questions. If you can't find your answer here, please contact customer support.</p>

            <div className="faq-list">
              {[
                { q: "How do I place an order on ZingBite?", a: "To order, search for a restaurant on the Home page, browse their menu, select your food, add them to your cart, click Proceed to Pay, enter your address, and complete payment using your credit/debit card, UPI, or cash." },
                { q: "What payment methods do you support?", a: "We support major Credit and Debit cards (Visa/Mastercard/RuPay), UPI (GPay, PhonePe, Paytm), Netbanking, and Cash on Delivery (COD) for selected restaurants." },
                { q: "How can I track my delivery in real-time?", a: "Once your order is confirmed, you will receive real-time status updates on the dashboard from 'Order Accepted' to 'Out for Delivery' with rider tracking." },
                { q: "What is your cancellation policy?", a: "You can cancel your order within 60 seconds of placing it. After the restaurant accepts your order, cancellations are subject to a fee to compensate for prepared food and rider resources." },
                { q: "How do I update my profile details?", a: "Log into your account, click on your profile/user icon in the Header, and update your delivery address or contact number." }
              ].map((faq, i) => (
                <div key={i} className={`faq-item ${openFaq === i ? 'open' : ''}`}>
                  <button onClick={() => toggleFaq(i)} className="faq-question">
                    <span>{faq.q}</span>
                    <ChevronDown size={18} className="faq-chevron" />
                  </button>
                  <div className="faq-answer">
                    <p>{faq.a}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        );

      case 'contact-us':
        return (
          <div className="info-content-pane">
            <h2>Contact Us</h2>
            <p className="section-desc">Have a question, feedback, or need help? Reach out to us, and we will get back to you as soon as possible.</p>

            <div className="contact-split">
              <div className="contact-info">
                <h3>Contact Information</h3>
                <div className="contact-row">
                  <MapPin size={18} color="var(--brand-red)" />
                  <div>
                    <strong>Headquarters</strong>
                    <p>12th Floor, Tech Park Towers, Indiranagar, Bangalore, Karnataka - 560038</p>
                  </div>
                </div>
                <div className="contact-row">
                  <Mail size={18} color="var(--brand-red)" />
                  <div>
                    <strong>Support Email</strong>
                    <p>support@zingbite.com</p>
                  </div>
                </div>
                <div className="contact-row">
                  <Phone size={18} color="var(--brand-red)" />
                  <div>
                    <strong>Helpline</strong>
                    <p>+91 80 4455 6677 (9 AM - 11 PM)</p>
                  </div>
                </div>
              </div>

              <div className="contact-form-container">
                {contactSubmitted ? (
                  <div className="form-success">
                    <CheckCircle size={32} color="var(--success)" />
                    <h3>Message Sent!</h3>
                    <p>Thank you for reaching out. A support agent will contact you shortly.</p>
                  </div>
                ) : (
                  <form onSubmit={handleContactSubmit} className="info-form">
                    <div className="form-group">
                      <label>Your Name</label>
                      <input 
                        type="text" 
                        required 
                        value={contactForm.name}
                        onChange={e => setContactForm({...contactForm, name: e.target.value})}
                      />
                    </div>
                    <div className="form-group">
                      <label>Email Address</label>
                      <input 
                        type="email" 
                        required 
                        value={contactForm.email}
                        onChange={e => setContactForm({...contactForm, email: e.target.value})}
                      />
                    </div>
                    <div className="form-group">
                      <label>Subject</label>
                      <input 
                        type="text" 
                        required 
                        value={contactForm.subject}
                        onChange={e => setContactForm({...contactForm, subject: e.target.value})}
                      />
                    </div>
                    <div className="form-group">
                      <label>Message</label>
                      <textarea 
                        rows={4} 
                        required
                        value={contactForm.message}
                        onChange={e => setContactForm({...contactForm, message: e.target.value})}
                      ></textarea>
                    </div>
                    <button type="submit" className="form-submit-btn"><Send size={16} /> SEND MESSAGE</button>
                  </form>
                )}
              </div>
            </div>
          </div>
        );

      case 'partner-with-us':
        return (
          <div className="info-content-pane">
            <h2>Partner With Us</h2>
            <p className="section-desc">Join ZingBite as a restaurant partner to reach thousands of local customers, streamline operations, and scale your brand.</p>

            <div className="contact-split">
              <div className="contact-info">
                <h3>Why Partner with Us?</h3>
                <ul className="benefits-list">
                  <li><strong>Increase Sales:</strong> Tap into our wide network of active diners looking for delicious meals.</li>
                  <li><strong>Dedicated Logistics:</strong> Focus on preparing culinary delicacies while we handle the delivery.</li>
                  <li><strong>Growth Insights:</strong> Gain access to custom dashboards to analyze sales, metrics, and trends.</li>
                </ul>
              </div>

              <div className="contact-form-container">
                {!user ? (
                  <div className="login-prompt-card" style={{ padding: '32px 20px', border: '2px dashed var(--border-medium)', borderRadius: 'var(--radius-md)', textAlign: 'center', background: 'var(--bg-surface)' }}>
                    <AlertCircle size={36} style={{ color: 'var(--brand-red)', margin: '0 auto 12px' }} />
                    <h4 style={{ fontSize: '1.15rem', fontWeight: 700, marginBottom: '8px', color: 'var(--text-primary)' }}>Login Required</h4>
                    <p style={{ fontSize: '0.9rem', color: 'var(--text-secondary)', marginBottom: '20px', lineHeight: '1.5' }}>
                      Please log in with your ZingBite account to register a restaurant.
                    </p>
                    <Link to="/login?redirect=/info/partner-with-us" className="form-submit-btn" style={{ display: 'inline-block', textDecoration: 'none', textAlign: 'center', width: 'auto', padding: '10px 24px', fontWeight: 600 }}>
                      Log In to Apply
                    </Link>
                  </div>
                ) : partnerSubmitted ? (
                  <div className="form-success" style={{ textAlign: 'center', padding: '32px 20px', background: 'var(--bg-surface)', border: '1px solid var(--border-medium)', borderRadius: 'var(--radius-md)' }}>
                    <CheckCircle size={48} style={{ color: 'var(--success)', margin: '0 auto 16px' }} />
                    <h3 style={{ fontSize: '1.4rem', fontWeight: 800, marginBottom: '8px' }}>Application Submitted!</h3>
                    <p style={{ color: 'var(--text-secondary)', marginBottom: '24px', lineHeight: 1.5 }}>Our merchant team will review your application and reach out within 2 business days.</p>
                    <Link to="/restaurant-admin" className="form-submit-btn" style={{ display: 'inline-block', textDecoration: 'none', textAlign: 'center', width: 'auto', padding: '12px 28px', fontWeight: 700 }}>
                      Go to Onboarding Dashboard
                    </Link>
                  </div>
                ) : (
                  <form onSubmit={handlePartnerSubmit} className="info-form">
                    <div className="form-group">
                      <label>Restaurant Name</label>
                      <input 
                        type="text" 
                        required 
                        value={partnerForm.restName}
                        onChange={e => setPartnerForm({...partnerForm, restName: e.target.value})}
                      />
                    </div>
                    <div className="form-group">
                      <label>Owner Name</label>
                      <input 
                        type="text" 
                        required 
                        value={partnerForm.owner}
                        onChange={e => setPartnerForm({...partnerForm, owner: e.target.value})}
                      />
                    </div>
                    <div className="form-group">
                      <label>Cuisine Type</label>
                      <input 
                        type="text" 
                        required 
                        placeholder="e.g., Chinese, Italian, Indian"
                        value={partnerForm.cuisine}
                        onChange={e => setPartnerForm({...partnerForm, cuisine: e.target.value})}
                      />
                    </div>
                    <div className="form-group">
                      <label>Email Address</label>
                      <input 
                        type="email" 
                        required 
                        value={partnerForm.email}
                        onChange={e => setPartnerForm({...partnerForm, email: e.target.value})}
                      />
                    </div>
                    <div className="form-group">
                      <label>Mobile Number</label>
                      <input 
                        type="tel" 
                        required 
                        value={partnerForm.phone}
                        onChange={e => setPartnerForm({...partnerForm, phone: e.target.value})}
                      />
                    </div>
                    <div className="form-row-3" style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '10px' }}>
                      <div className="form-group">
                        <label>License No</label>
                        <input 
                          type="text" 
                          required 
                          placeholder="FSSAI License"
                          value={partnerForm.licenseNo}
                          onChange={e => setPartnerForm({...partnerForm, licenseNo: e.target.value})}
                        />
                      </div>
                      <div className="form-group">
                        <label>Aadhaar No</label>
                        <input 
                          type="text" 
                          required 
                          placeholder="Owner Aadhaar"
                          value={partnerForm.aadhaarNo}
                          onChange={e => setPartnerForm({...partnerForm, aadhaarNo: e.target.value})}
                        />
                      </div>
                      <div className="form-group">
                        <label>GST Number</label>
                        <input 
                          type="text" 
                          required 
                          placeholder="GSTIN"
                          value={partnerForm.gstNo}
                          onChange={e => setPartnerForm({...partnerForm, gstNo: e.target.value})}
                        />
                      </div>
                    </div>
                    <div className="form-group">
                      <label>Restaurant Address</label>
                      <input 
                        type="text" 
                        required 
                        placeholder="Select location or enter manually"
                        value={partnerForm.address}
                        onChange={e => setPartnerForm({...partnerForm, address: e.target.value})}
                      />
                    </div>
                    <div style={{ marginTop: '8px', display: 'flex', flexDirection: 'column', gap: '8px', marginBottom: '16px' }}>
                      <button 
                        type="button"
                        onClick={detectLocation}
                        style={{
                          alignSelf: 'flex-start',
                          padding: '8px 14px',
                          fontSize: '0.8rem',
                          fontWeight: 700,
                          background: 'var(--brand-red)',
                          color: 'white',
                          border: 'none',
                          borderRadius: '4px',
                          cursor: 'pointer',
                          display: 'flex',
                          alignItems: 'center',
                          gap: '4px'
                        }}
                      >
                        <MapPin size={12} /> {geocoding ? 'Detecting Location...' : 'Auto-Detect Restaurant Location'}
                      </button>
                      <div 
                        ref={mapRef} 
                        style={{ 
                          height: '180px', 
                          borderRadius: 'var(--radius-sm)', 
                          border: '1px solid var(--border-medium)',
                          zIndex: 1
                        }} 
                      />
                    </div>
                    <button type="submit" className="form-submit-btn" disabled={partnerSubmitting}>
                      {partnerSubmitting ? (
                        <><Loader size={16} style={{ animation: 'spin 1s linear infinite', display: 'inline-block', verticalAlign: 'middle', marginRight: '6px' }} /> Registering...</>
                      ) : (
                        <><Building2 size={16} /> REGISTER RESTAURANT</>
                      )}
                    </button>
                  </form>
                )}
              </div>
            </div>
          </div>
        );

      case 'ride-with-us':
        return (
          <div className="info-content-pane">
            <h2>Ride With Us</h2>
            <p className="section-desc">Join our fleet as a delivery partner. Get flexible work hours, attractive weekly payouts, and insurance coverage.</p>

            <div className="contact-split">
              <div className="contact-info">
                <h3>Delivery Partner Perks</h3>
                <ul className="benefits-list">
                  <li><strong>Weekly Earnings:</strong> Direct deposit of your delivery earnings plus tips into your bank account.</li>
                  <li><strong>Flexible Schedule:</strong> Choose your own shifts (Part-time, Full-time, Weekends only).</li>
                  <li><strong>Insurance Cover:</strong> Group medical and accident cover for active delivery partners.</li>
                </ul>
              </div>

              <div className="contact-form-container">
                {!user ? (
                  <div className="login-prompt-card" style={{ padding: '32px 20px', border: '2px dashed var(--border-medium)', borderRadius: 'var(--radius-md)', textAlign: 'center', background: 'var(--bg-surface)' }}>
                    <AlertCircle size={36} style={{ color: 'var(--brand-red)', margin: '0 auto 12px' }} />
                    <h4 style={{ fontSize: '1.15rem', fontWeight: 700, marginBottom: '8px', color: 'var(--text-primary)' }}>Login Required</h4>
                    <p style={{ fontSize: '0.9rem', color: 'var(--text-secondary)', marginBottom: '20px', lineHeight: '1.5' }}>
                      Please log in with your ZingBite account to register as a delivery rider.
                    </p>
                    <Link to="/login?redirect=/info/ride-with-us" className="form-submit-btn" style={{ display: 'inline-block', textDecoration: 'none', textAlign: 'center', width: 'auto', padding: '10px 24px', fontWeight: 600 }}>
                      Log In to Apply
                    </Link>
                  </div>
                ) : riderSubmitted ? (
                  <div className="form-success" style={{ textAlign: 'center', padding: '32px 20px', background: 'var(--bg-surface)', border: '1px solid var(--border-medium)', borderRadius: 'var(--radius-md)' }}>
                    <CheckCircle size={48} style={{ color: 'var(--success)', margin: '0 auto 16px' }} />
                    <h3 style={{ fontSize: '1.4rem', fontWeight: 800, marginBottom: '8px' }}>Rider Registration Initiated!</h3>
                    <p style={{ color: 'var(--text-secondary)', marginBottom: '24px', lineHeight: 1.5 }}>We've sent onboarding details to your phone number. You can track your application status in the Career Portal.</p>
                    <Link to="/careers" className="form-submit-btn" style={{ display: 'inline-block', textDecoration: 'none', textAlign: 'center', width: 'auto', padding: '12px 28px', fontWeight: 700 }}>
                      View Application Status
                    </Link>
                  </div>
                ) : (
                  <form onSubmit={handleRiderSubmit} className="info-form">
                    <div className="form-group">
                      <label>Full Name</label>
                      <input 
                        type="text" 
                        required 
                        value={riderForm.name}
                        onChange={e => setRiderForm({...riderForm, name: e.target.value})}
                      />
                    </div>
                    <div className="form-group">
                      <label>Mobile Number</label>
                      <input 
                        type="tel" 
                        required 
                        value={riderForm.phone}
                        onChange={e => setRiderForm({...riderForm, phone: e.target.value})}
                      />
                    </div>
                    <div className="form-group">
                      <label>City / Hub Area</label>
                      <input 
                        type="text" 
                        required 
                        placeholder="Select location or enter manually"
                        value={riderForm.city}
                        onChange={e => setRiderForm({...riderForm, city: e.target.value})}
                      />
                    </div>
                    <div style={{ marginTop: '8px', display: 'flex', flexDirection: 'column', gap: '8px', marginBottom: '16px' }}>
                      <button 
                        type="button"
                        onClick={detectLocation}
                        style={{
                          alignSelf: 'flex-start',
                          padding: '8px 14px',
                          fontSize: '0.8rem',
                          fontWeight: 700,
                          background: 'var(--brand-red)',
                          color: 'white',
                          border: 'none',
                          borderRadius: '4px',
                          cursor: 'pointer',
                          display: 'flex',
                          alignItems: 'center',
                          gap: '4px'
                        }}
                      >
                        <MapPin size={12} /> {geocoding ? 'Detecting Location...' : 'Auto-Detect City Area'}
                      </button>
                      <div 
                        ref={mapRef} 
                        style={{ 
                          height: '150px', 
                          borderRadius: 'var(--radius-sm)', 
                          border: '1px solid var(--border-medium)',
                          zIndex: 1
                        }} 
                      />
                    </div>
                    <div className="form-group">
                      <label>Vehicle Type</label>
                      <select 
                        value={riderForm.vehicle}
                        onChange={e => setRiderForm({...riderForm, vehicle: e.target.value})}
                        style={{ width: '100%', padding: '12px', border: '1px solid var(--border-medium)', borderRadius: 'var(--radius-sm)' }}
                      >
                        <option value="bike">Bicycle / Electric Cycle</option>
                        <option value="motorcycle">Motorcycle / Scooter</option>
                        <option value="walk">On Foot (Selected zones)</option>
                      </select>
                    </div>
                    <button type="submit" className="form-submit-btn" disabled={riderSubmitting}>
                      {riderSubmitting ? (
                        <><Loader size={16} style={{ animation: 'spin 1s linear infinite', display: 'inline-block', verticalAlign: 'middle', marginRight: '6px' }} /> Applying...</>
                      ) : (
                        <><Bike size={16} /> APPLY AS RIDER</>
                      )}
                    </button>
                  </form>
                )}
              </div>
            </div>
          </div>
        );

      case 'terms':
        return (
          <div className="info-content-pane legal-text">
            <h2>Terms &amp; Conditions</h2>
            <span className="last-updated">Last Updated: June 02, 2026</span>

            <h3>1. Introduction</h3>
            <p>Welcome to ZingBite. These Terms and Conditions govern your use of our website, mobile application, and food delivery services. By accessing or using our services, you agree to comply with and be bound by these terms.</p>

            <h3>2. User Accounts</h3>
            <p>To place an order, you must register and create a secure user account. You are solely responsible for maintaining the confidentiality of your credentials and password. Any actions performed under your account remain your responsibility.</p>

            <h3>3. Placing Orders &amp; Contract</h3>
            <p>All food orders placed through our platform are subject to availability and acceptance by the respective restaurant. The contract for the supply of food is formed directly between you and the restaurant when your order is accepted.</p>

            <h3>4. Pricing &amp; Payments</h3>
            <p>All prices displayed include menu costs set by restaurants. Delivery fees, taxes, and service charges are calculated at checkout. Payments are processed through secure gateways like Razorpay.</p>

            <h3>5. Limitation of Liability</h3>
            <p>ZingBite acts as a delivery facilitator and is not responsible for the quality, safety, portion size, or ingredients of food prepared by partner restaurants.</p>
          </div>
        );

      case 'privacy':
        return (
          <div className="info-content-pane legal-text">
            <h2>Privacy Policy</h2>
            <span className="last-updated">Last Updated: June 02, 2026</span>

            <h3>1. Information We Collect</h3>
            <p>We collect personal information that you provide directly, including name, email address, phone number, and delivery address. We also collect automated usage data and GPS location coordinates when the app is active to facilitate real-time tracking.</p>

            <h3>2. How We Use Your Data</h3>
            <p>Your details are used to process orders, communicate status, route delivery partners, and improve customer support experiences. We do not sell or trade your data to third-party marketing companies.</p>

            <h3>3. Sharing of Information</h3>
            <p>We share necessary information (name, address, telephone) with partner restaurants and delivery riders to fulfill your orders. We may disclose data when legally required by public authorities.</p>

            <h3>4. Data Security</h3>
            <p>We use standard encryption techniques (SSL/TLS) and secure databases to protect your personal details from unauthorized access, modification, or leakage.</p>
          </div>
        );

      case 'cookies':
        return (
          <div className="info-content-pane legal-text">
            <h2>Cookie Policy</h2>
            <span className="last-updated">Last Updated: June 02, 2026</span>

            <h3>1. What Are Cookies?</h3>
            <p>Cookies are small text files stored on your browser when you visit our website. They help us remember login states, keep track of items in your shopping cart, and monitor anonymous site analytics.</p>

            <h3>2. Types of Cookies We Use</h3>
            <div style={{ overflowX: 'auto', margin: '20px 0' }}>
              <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: '0.9rem' }}>
                <thead>
                  <tr style={{ background: 'var(--bg-surface)', borderBottom: '2px solid var(--border-medium)' }}>
                    <th style={{ padding: '12px', textAlign: 'left' }}>Category</th>
                    <th style={{ padding: '12px', textAlign: 'left' }}>Purpose</th>
                  </tr>
                </thead>
                <tbody>
                  <tr style={{ borderBottom: '1px solid var(--border-light)' }}>
                    <td style={{ padding: '12px', fontWeight: 600 }}>Essential</td>
                    <td style={{ padding: '12px' }}>Maintaining your logged-in session, authentication, and cart selections.</td>
                  </tr>
                  <tr style={{ borderBottom: '1px solid var(--border-light)' }}>
                    <td style={{ padding: '12px', fontWeight: 600 }}>Analytics</td>
                    <td style={{ padding: '12px' }}>Tracking page views, click behaviors, and application speed metrics.</td>
                  </tr>
                  <tr style={{ borderBottom: '1px solid var(--border-light)' }}>
                    <td style={{ padding: '12px', fontWeight: 600 }}>Marketing</td>
                    <td style={{ padding: '12px' }}>Remembering preferences to display tailored restaurant suggestions.</td>
                  </tr>
                </tbody>
              </table>
            </div>

            <h3>3. Managing Cookies</h3>
            <p>You can adjust your browser settings to refuse or delete cookies. However, please note that disabling essential cookies will prevent the cart and account checkout system from working correctly.</p>
          </div>
        );

      case 'refunds':
        return (
          <div className="info-content-pane legal-text">
            <h2>Refund &amp; Cancellation Policy</h2>
            <span className="last-updated">Last Updated: June 02, 2026</span>

            <h3>1. Order Cancellations</h3>
            <p>Users can cancel their order free of charge within 60 seconds of submitting it. Once the restaurant begins cooking (Order Accepted status), cancellation requests are not eligible for a refund.</p>

            <h3>2. Refund Eligibility</h3>
            <p>Refunds are initiated in full under the following circumstances:</p>
            <ul style={{ margin: '12px 20px', lineHeight: '1.7' }}>
              <li>The ordered restaurant item is out of stock (not available).</li>
              <li>The restaurant cancels the order due to operational issues.</li>
              <li>Delivery is delayed by more than 60 minutes beyond estimated delivery due to fleet error.</li>
            </ul>

            <h3>3. Refund Timelines</h3>
            <p>Approved refunds are processed back to the original source of payment (Razorpay card/UPI) within 5 to 7 business days, depending on bank processing policies.</p>
          </div>
        );

      default:
        return (
          <div className="info-content-pane">
            <h2>Section Not Found</h2>
            <p>The section you are looking for does not exist. Please use the sidebar to choose a valid section.</p>
          </div>
        );
    }
  };

  return (
    <>
      <style>{`
        .info-page-layout {
          display: flex;
          max-width: 1200px;
          margin: 24px auto 48px;
          padding: 0 20px;
          gap: 32px;
          align-items: start;
        }
        .info-sidebar {
          width: 260px;
          background: rgba(255,255,255,0.96);
          border: 1px solid rgba(247,55,79,0.1);
          border-radius: var(--radius-md);
          padding: 16px;
          position: sticky;
          top: 90px;
          box-shadow: 0 12px 34px rgba(28,28,28,0.06);
        }
        .info-group-title {
          font-size: 0.78rem;
          text-transform: uppercase;
          letter-spacing: 1px;
          color: var(--text-muted);
          margin: 16px 0 8px 8px;
          font-weight: 700;
        }
        .info-group-title:first-child {
          margin-top: 0;
        }
        .info-sidebar-btn {
          display: flex;
          align-items: center;
          gap: 12px;
          width: 100%;
          padding: 10px 12px;
          background: transparent;
          border: none;
          color: var(--text-secondary);
          font-size: 0.95rem;
          font-weight: 500;
          text-align: left;
          cursor: pointer;
          border-radius: var(--radius-sm);
          transition: all 0.2s ease;
        }
        .info-sidebar-btn:hover {
          color: var(--brand-red);
          background: rgba(247,55,79,0.04);
        }
        .info-sidebar-btn.active {
          color: #fff;
          background: var(--brand-red);
          font-weight: 600;
        }
        
        /* Mobile Dropdown */
        .info-mobile-selector {
          display: none;
          width: 100%;
          margin-bottom: 16px;
        }
        .info-mobile-select {
          width: 100%;
          padding: 14px;
          font-family: inherit;
          font-size: 1rem;
          border: 1px solid rgba(247,55,79,0.12);
          border-radius: var(--radius-sm);
          background: #fff;
          color: var(--text-primary);
          outline: none;
          font-weight: 600;
        }

        .info-main-content {
          flex: 1;
          background: rgba(255,255,255,0.96);
          border: 1px solid rgba(247,55,79,0.1);
          border-radius: var(--radius-md);
          padding: 32px;
          box-shadow: 0 12px 34px rgba(28,28,28,0.06);
          min-height: 500px;
        }

        /* Styles for inner content elements */
        .info-content-pane h2 {
          font-size: 2rem;
          margin-bottom: 12px;
          color: var(--text-primary);
        }
        .section-desc {
          color: var(--text-secondary);
          margin-bottom: 24px;
          font-size: 1.05rem;
          line-height: 1.6;
        }
        
        /* Hero inside sections */
        .section-hero {
          padding: 24px;
          border-radius: var(--radius-md);
          margin-bottom: 24px;
          border: 1px solid rgba(247,55,79,0.1);
        }
        .hero-badge {
          display: inline-block;
          font-size: 0.75rem;
          background: var(--brand-red);
          color: #fff;
          padding: 4px 10px;
          border-radius: 4px;
          font-weight: 700;
          margin-bottom: 12px;
        }
        .section-hero h2 {
          font-size: 1.6rem;
          margin-bottom: 8px;
        }
        
        .content-grid-2 {
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: 20px;
          margin-bottom: 32px;
        }
        .grid-card {
          border: 1px solid rgba(247,55,79,0.1);
          padding: 20px;
          border-radius: var(--radius-md);
          background: rgba(255,255,255,0.9);
        }
        .grid-card h3 {
          font-size: 1.25rem;
          margin-bottom: 8px;
          color: var(--brand-red);
        }
        .grid-card p {
          color: var(--text-secondary);
          font-size: 0.95rem;
          line-height: 1.6;
        }
        
        /* Stats */
        .stats-row {
          display: grid;
          grid-template-columns: repeat(4, 1fr);
          gap: 16px;
        }
        .stat-box {
          background: rgba(247,55,79,0.04);
          padding: 16px;
          text-align: center;
          border-radius: var(--radius-sm);
          border: 1px solid rgba(247,55,79,0.08);
        }
        .stat-box h4 {
          font-size: 1.8rem;
          color: var(--brand-red);
          margin-bottom: 4px;
        }
        .stat-box p {
          font-size: 0.85rem;
          color: var(--text-secondary);
          font-weight: 500;
        }

        /* Careers list */
        .jobs-list {
          display: flex;
          flex-direction: column;
          gap: 16px;
        }
        .job-card {
          display: flex;
          justify-content: space-between;
          align-items: center;
          padding: 20px;
          border: 1px solid rgba(247,55,79,0.1);
          border-radius: var(--radius-md);
          background: rgba(255,255,255,0.94);
          transition: border-color 0.2s;
        }
        .job-card:hover {
          border-color: var(--brand-red);
        }
        .job-main h4 {
          font-size: 1.15rem;
          margin-bottom: 6px;
        }
        .job-meta {
          display: flex;
          align-items: center;
          gap: 8px;
          color: var(--text-secondary);
          font-size: 0.85rem;
        }
        .job-meta .dot {
          width: 3px;
          height: 3px;
          background: var(--text-muted);
          border-radius: 50%;
        }
        .job-apply-btn {
          padding: 10px 16px;
          background: var(--brand-red);
          color: #fff;
          border: none;
          font-weight: 700;
          font-size: 0.9rem;
          border-radius: var(--radius-sm);
          cursor: pointer;
          transition: background 0.2s;
        }
        .job-apply-btn:hover {
          background: var(--brand-red-hover);
        }

        /* Team styles */
        .team-grid {
          display: grid;
          grid-template-columns: repeat(auto-fill, minmax(220px, 1fr));
          gap: 24px;
        }
        .team-card {
          text-align: center;
          padding: 24px 16px;
          border: 1px solid rgba(247,55,79,0.1);
          border-radius: var(--radius-md);
          background: rgba(255,255,255,0.94);
        }
        .team-avatar {
          width: 60px;
          height: 60px;
          border-radius: 50%;
          background: rgba(247,55,79,0.08);
          color: var(--brand-red);
          font-weight: 700;
          font-size: 1.25rem;
          display: flex;
          align-items: center;
          justify-content: center;
          margin: 0 auto 12px;
        }
        .team-card h4 {
          font-size: 1.1rem;
          margin-bottom: 2px;
        }
        .team-role {
          font-size: 0.85rem;
          color: var(--brand-red);
          font-weight: 600;
          display: block;
          margin-bottom: 12px;
        }
        .team-card p {
          font-size: 0.85rem;
          color: var(--text-secondary);
          line-height: 1.5;
        }

        /* Blog styles */
        .blog-grid {
          display: flex;
          flex-direction: column;
          gap: 24px;
        }
        .blog-card {
          padding-bottom: 20px;
          border-bottom: 1px solid var(--border-light);
        }
        .blog-meta {
          font-size: 0.8rem;
          color: var(--text-muted);
          font-weight: 600;
          text-transform: uppercase;
        }
        .blog-card h4 {
          font-size: 1.3rem;
          margin: 6px 0 8px;
        }
        .blog-card p {
          color: var(--text-secondary);
          font-size: 0.95rem;
          line-height: 1.6;
          margin-bottom: 12px;
        }
        .blog-link {
          display: inline-flex;
          align-items: center;
          gap: 4px;
          font-weight: 600;
          font-size: 0.9rem;
        }

        /* FAQ Accordion */
        .faq-list {
          display: flex;
          flex-direction: column;
          gap: 12px;
        }
        .faq-item {
          border: 1px solid rgba(247,55,79,0.1);
          border-radius: var(--radius-sm);
          overflow: hidden;
          background: rgba(255,255,255,0.94);
        }
        .faq-question {
          width: 100%;
          padding: 18px 20px;
          text-align: left;
          background: transparent;
          border: none;
          display: flex;
          justify-content: space-between;
          align-items: center;
          font-size: 1rem;
          font-weight: 600;
          color: var(--text-primary);
          cursor: pointer;
          transition: background 0.2s;
        }
        .faq-question:hover {
          background: rgba(247,55,79,0.04);
        }
        .faq-chevron {
          transition: transform 0.25s ease;
          color: var(--text-muted);
        }
        .faq-item.open .faq-chevron {
          transform: rotate(180deg);
          color: var(--brand-red);
        }
        .faq-answer {
          max-height: 0;
          overflow: hidden;
          transition: max-height 0.25s cubic-bezier(0.25, 0.1, 0.25, 1);
          background: rgba(247,55,79,0.035);
        }
        .faq-item.open .faq-answer {
          max-height: 200px;
          border-top: 1px solid var(--border-light);
        }
        .faq-answer p {
          padding: 16px 20px;
          font-size: 0.95rem;
          color: var(--text-secondary);
          line-height: 1.6;
        }

        /* Contact & Partner Form */
        .contact-split {
          display: grid;
          grid-template-columns: 1fr 1.2fr;
          gap: 40px;
        }
        .contact-info h3 {
          font-size: 1.25rem;
          margin-bottom: 20px;
        }
        .contact-row {
          display: flex;
          gap: 16px;
          margin-bottom: 20px;
          align-items: flex-start;
        }
        .contact-row p {
          color: var(--text-secondary);
          font-size: 0.95rem;
          margin-top: 2px;
          line-height: 1.5;
        }
        .benefits-list {
          list-style: none;
        }
        .benefits-list li {
          margin-bottom: 16px;
          padding-left: 24px;
          position: relative;
          line-height: 1.6;
          font-size: 0.95rem;
          color: var(--text-secondary);
        }
        .benefits-list li::before {
          content: '✓';
          position: absolute;
          left: 0;
          color: var(--brand-red);
          font-weight: bold;
        }
        .info-form {
          display: flex;
          flex-direction: column;
          gap: 16px;
        }
        .form-group {
          display: flex;
          flex-direction: column;
          gap: 6px;
        }
        .form-group label {
          font-size: 0.85rem;
          font-weight: 600;
          color: var(--text-secondary);
        }
        .form-group input, 
        .form-group textarea {
          width: 100%;
          padding: 12px;
          border: 1px solid rgba(247,55,79,0.12);
          border-radius: var(--radius-sm);
          font-family: inherit;
          font-size: 0.95rem;
          outline: none;
          transition: border-color 0.2s;
        }
        .form-group input:focus, 
        .form-group textarea:focus {
          border-color: var(--brand-red);
        }
        .form-submit-btn {
          display: inline-flex;
          align-items: center;
          justify-content: center;
          gap: 8px;
          width: 100%;
          padding: 14px;
          background: var(--brand-red);
          color: #fff;
          border: none;
          font-weight: 700;
          border-radius: var(--radius-sm);
          cursor: pointer;
          transition: background 0.2s;
        }
        .form-submit-btn:hover {
          background: var(--brand-red-hover);
        }
        .form-success {
          text-align: center;
          padding: 40px 20px;
          display: flex;
          flex-direction: column;
          align-items: center;
          gap: 12px;
          border: 1px solid rgba(96, 178, 70, 0.18);
          border-radius: var(--radius-md);
          background: rgba(96, 178, 70, 0.03);
        }
        .form-success h3 {
          font-size: 1.3rem;
          color: var(--success);
        }
        .form-success p {
          color: var(--text-secondary);
          font-size: 0.95rem;
        }

        /* Legal Policy Styling */
        .legal-text h3 {
          font-size: 1.25rem;
          margin: 24px 0 10px;
          color: var(--text-primary);
        }
        .legal-text p {
          color: var(--text-secondary);
          line-height: 1.7;
          font-size: 0.95rem;
          margin-bottom: 16px;
        }
        .last-updated {
          display: block;
          font-size: 0.85rem;
          color: var(--text-muted);
          margin-bottom: 20px;
          font-style: italic;
        }
        
        .toast-notification {
          position: fixed;
          bottom: 24px;
          right: 24px;
          background: #1a1a1a;
          color: #fff;
          padding: 12px 24px;
          border-radius: var(--radius-sm);
          box-shadow: 0 10px 30px rgba(0,0,0,0.25);
          display: flex;
          align-items: center;
          gap: 10px;
          font-size: 0.95rem;
          z-index: 1000;
          animation: slideUp 0.3s cubic-bezier(0.25, 0.1, 0.25, 1) both;
        }

        @media (max-width: 900px) {
          .info-page-layout {
            flex-direction: column;
            gap: 20px;
          }
          .info-sidebar {
            display: none;
          }
          .info-mobile-selector {
            display: block;
          }
          .info-main-content {
            padding: 24px;
          }
        }
        
        @media (max-width: 768px) {
          .contact-split {
            grid-template-columns: 1fr;
            gap: 32px;
          }
          .stats-row {
            grid-template-columns: 1fr 1fr;
          }
          .content-grid-2 {
            grid-template-columns: 1fr;
          }
          .info-content-pane h2 {
            font-size: 1.6rem;
          }
          .job-card {
            flex-direction: column;
            align-items: flex-start;
            gap: 16px;
          }
          .job-apply-btn {
            width: 100%;
          }
        }
      `}</style>

      <div className="info-page-layout fade-in">
        {/* Desktop Sidebar Navigation */}
        <aside className="info-sidebar">
          {['Company', 'Support', 'Legal'].map((group) => (
            <div key={group}>
              <h3 className="info-group-title">{group}</h3>
              {sections.filter(s => s.group === group).map((sec) => {
                const IconComponent = sec.icon;
                return (
                  <button
                    key={sec.id}
                    className={`info-sidebar-btn ${activeSection === sec.id ? 'active' : ''}`}
                    onClick={() => navigate(`/info/${sec.id}`)}
                  >
                    <IconComponent size={16} />
                    {sec.name}
                  </button>
                );
              })}
            </div>
          ))}
        </aside>

        {/* Mobile Dropdown Selector */}
        <div className="info-mobile-selector">
          <select 
            className="info-mobile-select"
            value={activeSection}
            onChange={(e) => navigate(`/info/${e.target.value}`)}
          >
            <optgroup label="Company">
              {sections.filter(s => s.group === 'Company').map(sec => (
                <option key={sec.id} value={sec.id}>{sec.name}</option>
              ))}
            </optgroup>
            <optgroup label="Support">
              {sections.filter(s => s.group === 'Support').map(sec => (
                <option key={sec.id} value={sec.id}>{sec.name}</option>
              ))}
            </optgroup>
            <optgroup label="Legal">
              {sections.filter(s => s.group === 'Legal').map(sec => (
                <option key={sec.id} value={sec.id}>{sec.name}</option>
              ))}
            </optgroup>
          </select>
        </div>

        {/* Main Content Area */}
        <main className="info-main-content">
          {renderContent()}
        </main>
      </div>
    </>
  );
};

export default InfoPage;
