import React, { useState, useEffect, useContext } from 'react';
import axios from 'axios';
import { AuthContext } from '../context/AuthContext';
import { useNavigate } from 'react-router-dom';
import { useModal } from '../context/ModalContext';
import { 
  Briefcase, MapPin, Send, FileText, CheckCircle, 
  Clock, IndianRupee, Loader, Calendar, Mail, Phone, User, AlertCircle, Inbox, Lock, KeyRound, MessageSquare, ChevronRight 
} from 'lucide-react';
import ChatWidget from '../components/ChatWidget';

const CAREER_LIST_PAGE_SIZE = 5;

// Simple client-side cache for Stale-While-Revalidate
let careersJobsCache = {
  jobs: null,
  timestamp: 0
};

const CareerPortal = () => {
  const { user } = useContext(AuthContext);
  const navigate = useNavigate();
  const { showAlert } = useModal();

  const [activeTab, setActiveTab] = useState('jobs');
  const [jobs, setJobs] = useState([]);
  const [applications, setApplications] = useState([]);
  const [notifications, setNotifications] = useState([]);
  const [loading, setLoading] = useState(true);
  const [appsLoading, setAppsLoading] = useState(false);
  const [notesLoading, setNotesLoading] = useState(false);
  const [activeChatAppId, setActiveChatAppId] = useState(null);
  const [visibleJobCount, setVisibleJobCount] = useState(CAREER_LIST_PAGE_SIZE);
  const [visibleApplicationCount, setVisibleApplicationCount] = useState(CAREER_LIST_PAGE_SIZE);
  const [visibleNotificationCount, setVisibleNotificationCount] = useState(CAREER_LIST_PAGE_SIZE);
  
  // Application form modal
  const [applyingJob, setApplyingJob] = useState(null);
  const [applyForm, setApplyForm] = useState({ name: '', email: '', phone: '', resumeUrl: '' });
  const [submitting, setSubmitting] = useState(false);

  // OTP Verification Simulation state
  const [showOtpModal, setShowOtpModal] = useState(false);
  const [otpValue, setOtpValue] = useState('');
  const [generatedOtp, setGeneratedOtp] = useState('1234');
  const [otpError, setOtpError] = useState('');

  const fetchJobs = async (isBackground = false) => {
    const hasCache = careersJobsCache.jobs !== null;
    const isStale = hasCache && (Date.now() - careersJobsCache.timestamp > 30000); // 30 seconds TTL

    if (hasCache) {
      setJobs(careersJobsCache.jobs);
      if (!isBackground) setLoading(false);
      if (!isStale) {
        // Cache is fresh, skip revalidation
        return;
      }
    } else {
      if (!isBackground) setLoading(true);
    }

    try {
      const res = await axios.get('/api/careers?action=jobs');
      setJobs(res.data);
      careersJobsCache = {
        jobs: res.data,
        timestamp: Date.now()
      };
    } catch (err) {
      console.error('Failed to load jobs:', err);
    } finally {
      if (!isBackground) setLoading(false);
    }
  };

  const fetchApplications = async (isBackground = false) => {
    if (!user) return;
    if (!isBackground) setAppsLoading(true);
    try {
      const res = await axios.get('/api/careers?action=applications');
      setApplications(res.data);
    } catch (err) {
      console.error('Failed to load applications:', err);
    } finally {
      if (!isBackground) setAppsLoading(false);
    }
  };

  const fetchNotifications = async (isBackground = false) => {
    if (!user) return;
    if (!isBackground) setNotesLoading(true);
    try {
      const res = await axios.get('/api/careers?action=notifications');
      setNotifications(res.data);
    } catch (err) {
      console.error('Failed to load notifications:', err);
    } finally {
      if (!isBackground) setNotesLoading(false);
    }
  };

  useEffect(() => {
    fetchJobs(false);
    
    if (user) {
      fetchApplications(false);
      fetchNotifications(false);
    }
  }, [user]);

  useEffect(() => {
    if (user) {
      setApplyForm({
        name: user.userName || user.username || '',
        email: user.email || '',
        phone: String(user.phoneNumber || user.mobile || ''),
        resumeUrl: ''
      });
    }
  }, [user]);

  useEffect(() => {
    setVisibleJobCount(CAREER_LIST_PAGE_SIZE);
    setVisibleApplicationCount(CAREER_LIST_PAGE_SIZE);
    setVisibleNotificationCount(CAREER_LIST_PAGE_SIZE);
  }, [activeTab]);

  const visibleJobs = jobs.slice(0, visibleJobCount);
  const visibleApplications = applications.slice(0, visibleApplicationCount);
  const visibleNotifications = notifications.slice(0, visibleNotificationCount);
  const hasMoreJobs = visibleJobCount < jobs.length;
  const hasMoreApplications = visibleApplicationCount < applications.length;
  const hasMoreNotifications = visibleNotificationCount < notifications.length;

  const handleApplyClick = (e) => {
    e.preventDefault();
    if (!user) {
      navigate('/login?redirect=/careers');
      return;
    }
    if (!applyForm.name || !applyForm.email || !applyForm.phone) {
      showAlert('Please fill out all required fields.', 'warning');
      return;
    }
    
    // Simulate generating a random OTP code and trigger verification modal
    const code = String(Math.floor(1000 + Math.random() * 9000));
    setGeneratedOtp(code);
    setOtpValue('');
    setOtpError('');
    setShowOtpModal(true);
  };

  const handleVerifyAndSubmit = async (e) => {
    e.preventDefault();
    setOtpError('');
    if (otpValue !== generatedOtp) {
      setOtpError('Invalid OTP code. Please enter the correct code shown below.');
      return;
    }

    setSubmitting(true);
    try {
      await axios.post('/api/careers', {
        jobId: applyingJob.id,
        name: applyForm.name,
        email: applyForm.email,
        phone: applyForm.phone,
        resumeUrl: applyForm.resumeUrl || 'https://zingbite.com/resumes/demo.pdf'
      });
      showAlert('Verification successful! Application submitted successfully.', 'success');
      setShowOtpModal(false);
      setApplyingJob(null);
      setApplyForm(prev => ({ ...prev, resumeUrl: '' }));
      await fetchApplications();
      await fetchNotifications(); // Update email logs
    } catch (err) {
      showAlert('Failed to submit application. Please try again.', 'error');
    } finally {
      setSubmitting(false);
    }
  };

  if (loading) {
    return (
      <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '400px' }}>
        <Loader size={36} style={{ animation: 'spin 1s linear infinite', color: 'var(--brand-red)' }} />
      </div>
    );
  }

  return (
    <>
      <style>{`
        .careers-container {
          max-width: 1200px;
          margin: 32px auto;
          padding: 0 20px;
        }
        .hero-banner {
          background: linear-gradient(135deg, var(--brand-red) 0%, #ff6b7d 100%);
          color: white;
          border-radius: var(--radius-lg);
          padding: 48px 32px;
          text-align: center;
          margin-bottom: 32px;
          box-shadow: var(--shadow-md);
        }
        .tab-bar {
          display: flex;
          border-bottom: 2px solid var(--border-light);
          margin-bottom: 24px;
          gap: 24px;
          overflow-x: auto;
          scrollbar-width: none;
          -ms-overflow-style: none;
        }
        .tab-bar::-webkit-scrollbar {
          display: none;
        }
        .tab-btn {
          background: none;
          border: none;
          padding: 12px 4px;
          font-weight: 700;
          font-size: 1rem;
          color: var(--text-secondary);
          cursor: pointer;
          position: relative;
          transition: color 0.2s;
          white-space: nowrap;
        }
        .tab-btn.active {
          color: var(--brand-red);
        }
        .tab-btn.active::after {
          content: '';
          position: absolute;
          bottom: -2px;
          left: 0;
          right: 0;
          height: 2px;
          background: var(--brand-red);
        }
        .job-grid {
          display: grid;
          grid-template-columns: 1fr;
          gap: 20px;
        }
        .job-card {
          background: #fff;
          border: 1px solid var(--border-medium);
          border-radius: var(--radius-md);
          padding: 24px;
          box-shadow: var(--shadow-sm);
          display: flex;
          justify-content: space-between;
          align-items: center;
          flex-wrap: wrap;
          gap: 20px;
          transition: transform 0.2s, box-shadow 0.2s;
        }
        .job-card:hover {
          transform: translateY(-2px);
          box-shadow: var(--shadow-md);
        }
        .job-info {
          flex: 2;
          min-width: 280px;
        }
        .job-actions {
          flex: 1;
          min-width: 150px;
          display: flex;
          justify-content: flex-end;
        }
        .btn-primary {
          background: var(--brand-red);
          color: white;
          padding: 12px 24px;
          border: none;
          border-radius: var(--radius-sm);
          font-weight: 700;
          cursor: pointer;
          display: flex;
          align-items: center;
          gap: 8px;
          transition: background 0.2s;
        }
        .btn-primary:hover {
          background: var(--brand-red-hover);
        }
        .badge {
          padding: 4px 8px;
          border-radius: 4px;
          font-size: 0.72rem;
          font-weight: 700;
          text-transform: uppercase;
        }
        .badge.dept { background: rgba(247,55,79,0.08); color: var(--brand-red); }
        .badge.applied { background: rgba(54,162,235,0.08); color: #36a2eb; }
        .badge.interview { background: rgba(255,159,64,0.08); color: #ff9f40; }
        .badge.offered { background: rgba(75,192,192,0.08); color: #4bc0c0; }
        .badge.rejected { background: rgba(226,55,68,0.08); color: var(--danger); }
        
        .modal-overlay {
          position: fixed;
          top: 0;
          left: 0;
          right: 0;
          bottom: 0;
          background: rgba(0,0,0,0.5);
          display: flex;
          align-items: center;
          justify-content: center;
          z-index: 1000;
          backdrop-filter: blur(4px);
        }
        .modal-content {
          background: white;
          padding: 32px;
          border-radius: var(--radius-lg);
          max-width: 500px;
          width: 100%;
          box-shadow: var(--shadow-lg);
        }
        .form-group {
          margin-bottom: 16px;
        }
        .form-group label {
          display: block;
          margin-bottom: 6px;
          font-weight: 600;
          font-size: 0.9rem;
        }
        .form-group input {
          width: 100%;
          padding: 10px 12px;
          border: 1px solid var(--border-medium);
          border-radius: var(--radius-sm);
          font-size: 0.95rem;
          outline: none;
        }
        .form-group input:focus {
          border-color: var(--brand-red);
        }
        .inbox-list {
          display: flex;
          flex-direction: column;
          gap: 16px;
        }
        .email-card {
          background: white;
          border: 1px solid var(--border-medium);
          border-radius: var(--radius-md);
          padding: 20px;
          box-shadow: var(--shadow-sm);
        }
        @media (max-width: 600px) {
          .hero-banner {
            padding: 32px 16px;
          }
          .hero-banner h1 {
            font-size: 1.8rem !important;
          }
          .hero-banner p {
            font-size: 0.95rem !important;
          }
          .job-card {
            flex-direction: column;
            align-items: stretch;
            gap: 16px;
            padding: 16px;
          }
          .job-actions {
            justify-content: stretch;
            min-width: 100%;
          }
          .job-actions button {
            width: 100%;
            justify-content: center;
          }
          .modal-content {
            padding: 20px;
            margin: 12px;
          }
        }
      `}</style>

      <div className="careers-container fade-in">
        {/* Banner */}
        <div className="hero-banner">
          <h1 style={{ fontSize: '2.4rem', fontWeight: 800 }}>Grow Your Career with ZingBite</h1>
          <p style={{ fontSize: '1.1rem', marginTop: '8px', opacity: 0.9 }}>
            Join our mission to deliver delight. Explore dynamic roles in technology, operations, and culinary arts.
          </p>
        </div>

        {/* Tab Bar */}
        <div className="tab-bar">
          <button 
            className={`tab-btn ${activeTab === 'jobs' ? 'active' : ''}`} 
            onClick={() => setActiveTab('jobs')}
          >
            Open Positions ({jobs.length})
          </button>
          <button 
            className={`tab-btn ${activeTab === 'applications' ? 'active' : ''}`} 
            onClick={() => {
              setActiveTab('applications');
              fetchApplications();
            }}
          >
            My Applications {user && applications.length > 0 && `(${applications.length})`}
          </button>
          <button 
            className={`tab-btn ${activeTab === 'inbox' ? 'active' : ''}`} 
            onClick={() => {
              setActiveTab('inbox');
              fetchNotifications();
            }}
          >
            Inbox Notifications {user && notifications.length > 0 && `(${notifications.length})`}
          </button>
        </div>

        {/* Positions View */}
        {activeTab === 'jobs' && (
          <div className="job-grid stagger-children">
            {visibleJobs.map((job) => (
              <div key={job.id} className="job-card">
                <div className="job-info">
                  <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '8px' }}>
                    <span className="badge dept">{job.department}</span>
                    <span style={{ fontSize: '0.8rem', color: 'var(--text-muted)', display: 'flex', alignItems: 'center', gap: '4px' }}>
                      <Calendar size={12} /> Posted {job.posted_date}
                    </span>
                  </div>
                  <h3 style={{ fontSize: '1.3rem', fontWeight: 800, marginBottom: '8px' }}>{job.title}</h3>
                  <p style={{ display: 'flex', alignItems: 'center', gap: '4px', fontSize: '0.9rem', color: 'var(--text-secondary)', marginBottom: '12px' }}>
                    <MapPin size={14} /> {job.location}
                  </p>
                  <p style={{ fontSize: '0.9rem', color: 'var(--text-secondary)', lineHeight: '1.5' }}>
                    {job.description}
                  </p>
                </div>
                <div className="job-actions">
                  <button className="btn-primary" onClick={() => {
                    if (!user) {
                      navigate('/login?redirect=/careers');
                    } else {
                      setApplyingJob(job);
                    }
                  }}>
                    Apply Now <Send size={14} />
                  </button>
                </div>
              </div>
            ))}
            {hasMoreJobs && (
              <div className="load-more-wrap" style={{ margin: '4px auto 0' }}>
                <button
                  type="button"
                  className="load-more-btn"
                  onClick={() => setVisibleJobCount(count => count + CAREER_LIST_PAGE_SIZE)}
                >
                  Load more positions ({jobs.length - visibleJobCount} left) <ChevronRight className="load-more-icon" size={16} />
                </button>
              </div>
            )}
          </div>
        )}

        {/* Applications View */}
        {activeTab === 'applications' && (
          <div>
            {!user ? (
              <div style={{ textAlign: 'center', padding: '48px', border: '1px dashed var(--border-medium)', borderRadius: '12px' }}>
                <AlertCircle size={36} style={{ color: 'var(--brand-red)', margin: '0 auto 12px' }} />
                <h3>Sign in to track your applications</h3>
                <p style={{ color: 'var(--text-secondary)', marginTop: '8px', marginBottom: '16px' }}>
                  Log in with your ZingBite account to view and check statuses.
                </p>
                <button className="btn-primary" style={{ margin: '0 auto' }} onClick={() => navigate('/login?redirect=/careers')}>
                  Login to Account
                </button>
              </div>
            ) : appsLoading ? (
              <div style={{ display: 'flex', justifyContent: 'center', padding: '48px' }}>
                <Loader size={24} style={{ animation: 'spin 1s linear infinite', color: 'var(--brand-red)' }} />
              </div>
            ) : applications.length === 0 ? (
              <div style={{ textAlign: 'center', padding: '48px', border: '1px dashed var(--border-medium)', borderRadius: '12px' }}>
                <p style={{ color: 'var(--text-secondary)' }}>You haven't applied to any roles yet. View open positions to apply!</p>
              </div>
            ) : (
              <div className="job-grid">
                {visibleApplications.map((app) => (
                  <div key={app.id} className="job-card">
                    <div className="job-info">
                      <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '8px' }}>
                        <span className="badge dept">{app.department}</span>
                        <span style={{ fontSize: '0.8rem', color: 'var(--text-muted)' }}>Applied on {app.appliedDate}</span>
                      </div>
                      <h3 style={{ fontSize: '1.2rem', fontWeight: 800, marginBottom: '6px' }}>{app.jobTitle}</h3>
                      <p style={{ display: 'flex', alignItems: 'center', gap: '4px', fontSize: '0.85rem', color: 'var(--text-secondary)' }}>
                        <MapPin size={12} /> {app.location || 'HQ'}
                      </p>
                      <a 
                        href={app.resumeUrl} 
                        target="_blank" 
                        rel="noreferrer" 
                        style={{ display: 'inline-flex', alignItems: 'center', gap: '4px', fontSize: '0.8rem', marginTop: '12px', fontWeight: 600 }}
                      >
                        <FileText size={12} /> View Submitted Resume
                      </a>
                    </div>
                    <div>
                      <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'flex-end', gap: '6px' }}>
                        <span style={{ fontSize: '0.78rem', color: 'var(--text-muted)', fontWeight: 600 }}>Application Status</span>
                        <span className={`badge ${
                          app.status.toLowerCase().includes('applied') ? 'applied' : 
                          app.status.toLowerCase().includes('interview') ? 'interview' : 
                          app.status.toLowerCase().includes('offer') ? 'offered' : 'rejected'
                        }`} style={{ padding: '6px 12px', fontSize: '0.8rem' }}>
                          {app.status}
                        </span>
                        <button 
                          onClick={() => setActiveChatAppId(app.id)}
                          style={{
                            background: 'transparent',
                            color: 'var(--brand-red)',
                            border: '1px solid var(--brand-red)',
                            padding: '6px 12px',
                            borderRadius: '4px',
                            fontSize: '0.75rem',
                            fontWeight: 700,
                            cursor: 'pointer',
                            display: 'flex',
                            alignItems: 'center',
                            gap: '4px',
                            marginTop: '8px'
                          }}
                        >
                          <MessageSquare size={12} /> Chat with Recruiter
                        </button>
                      </div>
                    </div>
                  </div>
                ))}
                {hasMoreApplications && (
                  <div className="load-more-wrap" style={{ margin: '4px auto 0' }}>
                    <button
                      type="button"
                      className="load-more-btn"
                      onClick={() => setVisibleApplicationCount(count => count + CAREER_LIST_PAGE_SIZE)}
                    >
                      Load more applications ({applications.length - visibleApplicationCount} left) <ChevronRight className="load-more-icon" size={16} />
                    </button>
                  </div>
                )}
              </div>
            )}
          </div>
        )}

        {/* Inbox Notifications View */}
        {activeTab === 'inbox' && (
          <div>
            {!user ? (
              <div style={{ textAlign: 'center', padding: '48px', border: '1px dashed var(--border-medium)', borderRadius: '12px' }}>
                <Inbox size={36} style={{ color: 'var(--text-secondary)', margin: '0 auto 12px' }} />
                <h3>Sign in to view your inbox</h3>
                <p style={{ color: 'var(--text-secondary)', marginTop: '8px' }}>Log in to view email notifications generated for your account.</p>
              </div>
            ) : notesLoading ? (
              <div style={{ display: 'flex', justifyContent: 'center', padding: '48px' }}>
                <Loader size={24} style={{ animation: 'spin 1s linear infinite', color: 'var(--brand-red)' }} />
              </div>
            ) : notifications.length === 0 ? (
              <div style={{ textAlign: 'center', padding: '48px', border: '1px dashed var(--border-medium)', borderRadius: '12px', background: '#fff' }}>
                <p style={{ color: 'var(--text-secondary)' }}>Your inbox is empty. We will email you here when your application status changes!</p>
              </div>
            ) : (
              <div className="inbox-list">
                {visibleNotifications.map((note) => (
                  <div key={note.id} className="email-card">
                    <div style={{ display: 'flex', justifyContent: 'space-between', borderBottom: '1px solid var(--border-light)', paddingBottom: '12px', marginBottom: '12px' }}>
                      <div>
                        <span style={{ fontSize: '0.8rem', color: 'var(--text-muted)', fontWeight: 600 }}>FROM: ZingBite Operations &lt;careers@zingbite.com&gt;</span>
                        <h4 style={{ fontSize: '1rem', fontWeight: 800, marginTop: '4px', color: 'var(--text-primary)' }}>{note.subject}</h4>
                      </div>
                      <span style={{ fontSize: '0.78rem', color: 'var(--text-muted)' }}>{note.sentDate}</span>
                    </div>
                    <p style={{ fontSize: '0.9rem', color: 'var(--text-secondary)', whiteSpace: 'pre-line', lineHeight: '1.6' }}>
                      {note.body}
                    </p>
                  </div>
                ))}
                {hasMoreNotifications && (
                  <div className="load-more-wrap" style={{ margin: '4px auto 0' }}>
                    <button
                      type="button"
                      className="load-more-btn"
                      onClick={() => setVisibleNotificationCount(count => count + CAREER_LIST_PAGE_SIZE)}
                    >
                      Load more inbox notes ({notifications.length - visibleNotificationCount} left) <ChevronRight className="load-more-icon" size={16} />
                    </button>
                  </div>
                )}
              </div>
            )}
          </div>
        )}
      </div>

      {/* Apply Modal */}
      {applyingJob && !showOtpModal && (
        <div className="modal-overlay" onClick={() => setApplyingJob(null)}>
          <div className="modal-content" onClick={(e) => e.stopPropagation()}>
            <h2 style={{ fontSize: '1.4rem', fontWeight: 800, marginBottom: '8px' }}>Apply for Position</h2>
            <p style={{ color: 'var(--brand-red)', fontWeight: 700, fontSize: '0.95rem', marginBottom: '20px' }}>
              {applyingJob.title} — {applyingJob.department}
            </p>
            
            <form onSubmit={handleApplyClick}>
              <div className="form-group">
                <label>Full Name *</label>
                <input 
                  type="text" 
                  required
                  placeholder="Enter full name" 
                  value={applyForm.name}
                  onChange={(e) => setApplyForm(prev => ({ ...prev, name: e.target.value }))}
                />
              </div>
              <div className="form-group">
                <label>Email Address *</label>
                <input 
                  type="email" 
                  required
                  placeholder="name@domain.com" 
                  value={applyForm.email}
                  onChange={(e) => setApplyForm(prev => ({ ...prev, email: e.target.value }))}
                />
              </div>
              <div className="form-group">
                <label>Phone Number *</label>
                <input 
                  type="tel" 
                  required
                  placeholder="e.g. 9876543210" 
                  value={applyForm.phone}
                  onChange={(e) => setApplyForm(prev => ({ ...prev, phone: e.target.value }))}
                />
              </div>
              <div className="form-group">
                <label>Resume PDF Link (Optional)</label>
                <input 
                  type="url" 
                  placeholder="https://example.com/my-resume.pdf" 
                  value={applyForm.resumeUrl}
                  onChange={(e) => setApplyForm(prev => ({ ...prev, resumeUrl: e.target.value }))}
                />
              </div>
              <div style={{ display: 'flex', justifyContent: 'flex-end', gap: '12px', marginTop: '24px' }}>
                <button 
                  type="button" 
                  className="btn-primary" 
                  onClick={() => setApplyingJob(null)}
                  style={{ background: '#f0f0f0', color: 'var(--text-primary)', border: '1px solid var(--border-medium)' }}
                >
                  Cancel
                </button>
                <button 
                  type="submit" 
                  className="btn-primary"
                >
                  Verify Credentials <KeyRound size={14} />
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* OTP Verification Modal */}
      {showOtpModal && (
        <div className="modal-overlay">
          <div className="modal-content" style={{ maxWidth: '400px', textAlign: 'center', padding: '32px' }}>
            <Lock size={36} style={{ color: 'var(--brand-red)', margin: '0 auto 12px' }} />
            <h2 style={{ fontSize: '1.25rem', fontWeight: 800 }}>Verify Email & Mobile</h2>
            <p style={{ fontSize: '0.85rem', color: 'var(--text-secondary)', marginTop: '8px', lineHeight: '1.5' }}>
              We have simulated sending a verification OTP to <strong>{applyForm.email}</strong> and <strong>{applyForm.phone}</strong>.
            </p>

            <form onSubmit={handleVerifyAndSubmit} style={{ marginTop: '20px' }}>
              <div className="form-group" style={{ marginWidth: '100px', display: 'inline-block' }}>
                <input 
                  type="text" 
                  required
                  maxLength="4"
                  placeholder="Enter 4-digit code" 
                  value={otpValue}
                  onChange={(e) => setOtpValue(e.target.value)}
                  style={{ textAlign: 'center', fontSize: '1.4rem', letterSpacing: '8px', fontWeight: 800, width: '180px', padding: '8px' }}
                />
              </div>
              
              {otpError && (
                <div style={{ color: 'var(--danger)', fontSize: '0.8rem', marginTop: '4px', fontWeight: 600 }}>
                  {otpError}
                </div>
              )}

              <div style={{ background: 'var(--bg-surface)', padding: '8px', borderRadius: '4px', fontSize: '0.8rem', color: 'var(--text-muted)', marginTop: '12px' }}>
                DEMO SIMULATOR OTP CODE: <strong>{generatedOtp}</strong>
              </div>

              <div style={{ display: 'flex', justifyContent: 'center', gap: '12px', marginTop: '24px' }}>
                <button 
                  type="button" 
                  className="btn-primary" 
                  onClick={() => setShowOtpModal(false)}
                  style={{ background: '#f0f0f0', color: 'var(--text-primary)', border: '1px solid var(--border-medium)', padding: '10px 18px' }}
                >
                  Back
                </button>
                <button 
                  type="submit" 
                  disabled={submitting}
                  className="btn-primary"
                  style={{ padding: '10px 18px' }}
                >
                  {submitting ? <Loader size={16} style={{ animation: 'spin 1s linear infinite' }} /> : 'Verify & Submit'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {activeChatAppId && (
        <ChatWidget
          key={activeChatAppId}
          type="application"
          targetId={activeChatAppId}
          userId={user?.userID || user?.userId}
          userName={user?.userName || user?.username}
          receiverId={1}
          initialOpen={true}
          onClose={() => setActiveChatAppId(null)}
        />
      )}
    </>
  );
};

export default CareerPortal;
