import React, { useState, useEffect, useContext, useRef } from 'react';
import axios from 'axios';
import { Mail, X, Loader, Calendar, CheckCircle, AlertCircle, HelpCircle, Inbox } from 'lucide-react';
import { AuthContext } from '../context/AuthContext';

const MailboxModal = ({ onClose }) => {
  const { user } = useContext(AuthContext);
  const [emails, setEmails] = useState([]);
  const [selectedEmail, setSelectedEmail] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [showAllSystem, setShowAllSystem] = useState(false);

  const pollTimerRef = useRef(null);

  const fetchEmails = async () => {
    if (!user) return;
    try {
      const allParam = showAllSystem ? '?all=true' : '';
      const res = await axios.get(`/api/emails${allParam}`);
      setEmails(res.data || []);
      setError('');
    } catch (err) {
      console.error('Failed to fetch simulated emails:', err);
      setError('Failed to load mailbox.');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    setLoading(true);
    fetchEmails();

    // Setup background polling (every 7.5s) when window/tab is active
    pollTimerRef.current = setInterval(() => {
      if (document.visibilityState === 'visible') {
        fetchEmails();
      }
    }, 7500);

    const handleVisibility = () => {
      if (document.visibilityState === 'visible') {
        fetchEmails();
      }
    };
    document.addEventListener('visibilitychange', handleVisibility);

    return () => {
      if (pollTimerRef.current) clearInterval(pollTimerRef.current);
      document.removeEventListener('visibilitychange', handleVisibility);
    };
  }, [showAllSystem]);

  // Format date nicely
  const formatDate = (dateStr) => {
    if (!dateStr) return 'N/A';
    const date = new Date(dateStr);
    if (isNaN(date.getTime())) return dateStr;
    return date.toLocaleDateString([], { month: 'short', day: 'numeric' }) + ' ' +
           date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
  };

  // Get status badge styling
  const getStatusStyle = (status) => {
    switch (status) {
      case 'SENT':
        return { backgroundColor: 'rgba(96,178,70,0.12)', color: '#60b246', icon: <CheckCircle size={12} /> };
      case 'FAILED':
        return { backgroundColor: 'rgba(226,55,68,0.12)', color: '#e23744', icon: <AlertCircle size={12} /> };
      case 'DISABLED':
        return { backgroundColor: 'rgba(158,158,158,0.12)', color: '#9e9e9e', icon: <HelpCircle size={12} /> };
      default:
        return { backgroundColor: 'rgba(245,166,35,0.12)', color: '#f5a623', icon: <HelpCircle size={12} /> };
    }
  };

  // Strip HTML tags for preview
  const stripHtml = (html) => {
    if (!html) return '';
    return html.replace(/<[^>]*>/g, '').substring(0, 80) + '...';
  };

  return (
    <div style={{
      position: 'fixed', inset: 0, zIndex: 50, display: 'flex', alignItems: 'center', justifyContent: 'center',
      backgroundColor: 'rgba(0,0,0,0.5)', backdropFilter: 'blur(4px)', fontFamily: "'Inter', sans-serif"
    }}>
      <div style={{
        backgroundColor: '#fff', borderRadius: '16px', boxShadow: '0 24px 64px rgba(28,28,28,0.2)',
        width: '100%', maxWidth: '900px', height: '600px', display: 'flex', flexDirection: 'column', overflow: 'hidden'
      }}>
        {/* Header */}
        <div style={{
          display: 'flex', alignItems: 'center', justifyContent: 'space-between',
          padding: '16px 24px', borderBottom: '1px solid #f0f0f0', backgroundColor: '#F7374F', color: '#fff'
        }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
            <Mail size={22} />
            <h2 style={{ fontSize: '17px', fontWeight: 700, margin: 0 }}>ZingBite Notification Mailbox</h2>
          </div>
          <button onClick={onClose} style={{
            background: 'transparent', border: 'none', color: '#fff', cursor: 'pointer', padding: '4px',
            borderRadius: '50%', display: 'flex', alignItems: 'center', transition: 'background-color 0.2s'
          }}
            onMouseEnter={(e) => e.target.style.backgroundColor = 'rgba(0,0,0,0.15)'}
            onMouseLeave={(e) => e.target.style.backgroundColor = 'transparent'}>
            <X size={20} />
          </button>
        </div>

        {/* Super Admin Toggle */}
        {user?.role === 'super_admin' && (
          <div style={{
            padding: '8px 24px', borderBottom: '1px solid #f0f0f0', backgroundColor: '#f8f9fa',
            display: 'flex', alignItems: 'center', gap: '8px'
          }}>
            <input
              type="checkbox"
              id="show-all-system"
              checked={showAllSystem}
              onChange={(e) => setShowAllSystem(e.target.checked)}
              style={{ accentColor: '#F7374F', cursor: 'pointer' }}
            />
            <label htmlFor="show-all-system" style={{ fontSize: '11px', color: '#696969', fontWeight: 600, cursor: 'pointer' }}>
              Show all system notification logs (Super Admin)
            </label>
          </div>
        )}

        {/* Content: Sidebar + Detail */}
        <div style={{ flex: 1, display: 'flex', overflow: 'hidden' }}>
          {/* Email List Sidebar */}
          <div style={{ width: '40%', borderRight: '1px solid #f0f0f0', overflowY: 'auto', backgroundColor: '#fff' }}>
            {loading ? (
              <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', height: '100%' }}>
                <Loader size={24} style={{ animation: 'spin 1s linear infinite' }} color="#F7374F" />
              </div>
            ) : error ? (
              <div style={{ padding: '16px', textAlign: 'center', fontSize: '13px', color: '#e23744' }}>{error}</div>
            ) : emails.length === 0 ? (
              <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', height: '100%', color: '#9e9e9e', gap: '4px' }}>
                <Inbox size={40} style={{ opacity: 0.5 }} />
                <p style={{ fontSize: '13px' }}>Mailbox is empty</p>
              </div>
            ) : (
              emails.map((email) => {
                const isSelected = selectedEmail?.id === email.id;
                const statusStyle = getStatusStyle(email.status);
                return (
                  <button
                    key={email.id}
                    onClick={() => setSelectedEmail(email)}
                    style={{
                      width: '100%', textAlign: 'left', padding: '14px 16px',
                      borderBottom: '1px solid #f8f9fa', cursor: 'pointer', display: 'flex', flexDirection: 'column',
                      gap: '3px', border: 'none', outline: 'none', fontFamily: "'Inter', sans-serif",
                      backgroundColor: isSelected ? 'rgba(247,55,79,0.06)' : '#fff',
                      borderLeft: isSelected ? '3px solid #F7374F' : '3px solid transparent',
                      transition: 'background-color 0.15s, border-left 0.15s'
                    }}
                    onMouseEnter={(e) => { if (!isSelected) e.currentTarget.style.backgroundColor = '#f8f9fa'; }}
                    onMouseLeave={(e) => { if (!isSelected) e.currentTarget.style.backgroundColor = '#fff'; }}
                  >
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', width: '100%' }}>
                      <span style={{ fontWeight: 600, fontSize: '11px', color: '#9e9e9e', overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap', maxWidth: '65%' }}>
                        To: {email.recipientEmail || `User #${email.userId}`}
                      </span>
                      <span style={{ fontSize: '10px', color: '#9e9e9e', display: 'flex', alignItems: 'center', gap: '3px', flexShrink: 0 }}>
                        <Calendar size={10} />
                        {formatDate(email.sentDate)}
                      </span>
                    </div>
                    <span style={{ fontWeight: 700, fontSize: '13px', color: '#1c1c1c', overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap', width: '100%' }}>
                      {email.subject}
                    </span>
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', width: '100%' }}>
                      <span style={{ fontSize: '11px', color: '#9e9e9e', overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap', maxWidth: '70%' }}>
                        {stripHtml(email.body)}
                      </span>
                      <span style={{
                        fontSize: '9px', fontWeight: 700, padding: '2px 6px', borderRadius: '9999px',
                        backgroundColor: statusStyle.backgroundColor, color: statusStyle.color,
                        display: 'flex', alignItems: 'center', gap: '3px', flexShrink: 0
                      }}>
                        {statusStyle.icon} {email.status}
                      </span>
                    </div>
                  </button>
                );
              })
            )}
          </div>

          {/* Email Detail Pane */}
          <div style={{ width: '60%', overflowY: 'auto', backgroundColor: '#f8f9fa', padding: '24px', display: 'flex', flexDirection: 'column' }}>
            {selectedEmail ? (
              <div style={{
                backgroundColor: '#fff', borderRadius: '12px', border: '1px solid #f0f0f0',
                boxShadow: '0 2px 8px rgba(28,28,28,0.05)', padding: '24px', flex: 1, display: 'flex', flexDirection: 'column'
              }}>
                {/* Email Header */}
                <div style={{ borderBottom: '1px solid #f0f0f0', paddingBottom: '16px', marginBottom: '16px' }}>
                  <h3 style={{ fontWeight: 700, fontSize: '16px', color: '#1c1c1c', margin: '0 0 10px 0', fontFamily: "'Outfit', sans-serif" }}>
                    {selectedEmail.subject}
                  </h3>
                  <div style={{ display: 'flex', flexDirection: 'column', gap: '3px', fontSize: '11px', color: '#696969' }}>
                    <div><span style={{ fontWeight: 700 }}>From:</span> ZingBite Operations &lt;support@zingbite.com&gt;</div>
                    <div><span style={{ fontWeight: 700 }}>To:</span> {selectedEmail.recipientEmail || `User #${selectedEmail.userId}`}</div>
                    <div><span style={{ fontWeight: 700 }}>Date:</span> {formatDate(selectedEmail.sentDate)}</div>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '4px' }}>
                      <span style={{ fontWeight: 700 }}>Status:</span>
                      {(() => {
                        const st = getStatusStyle(selectedEmail.status);
                        return (
                          <span style={{
                            padding: '2px 8px', borderRadius: '9999px', fontSize: '10px', fontWeight: 700,
                            backgroundColor: st.backgroundColor, color: st.color, display: 'inline-flex', alignItems: 'center', gap: '3px'
                          }}>
                            {st.icon} {selectedEmail.status}
                          </span>
                        );
                      })()}
                    </div>
                  </div>
                </div>

                {/* Email Body (rendered HTML) */}
                <div
                  style={{
                    flex: 1, fontSize: '13px', color: '#1c1c1c', overflowY: 'auto',
                    border: '1px solid #f0f0f0', borderRadius: '8px', padding: '16px', backgroundColor: '#fff', lineHeight: 1.6
                  }}
                  dangerouslySetInnerHTML={{ __html: selectedEmail.body }}
                />
              </div>
            ) : (
              <div style={{
                display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center',
                height: '100%', color: '#9e9e9e', gap: '6px', textAlign: 'center'
              }}>
                <Mail size={48} style={{ opacity: 0.5 }} />
                <p style={{ fontSize: '14px', fontWeight: 600 }}>No Email Selected</p>
                <p style={{ fontSize: '12px', maxWidth: '260px', lineHeight: 1.4 }}>
                  Select a simulated notification email from the left pane to preview its rendered markup styling.
                </p>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default MailboxModal;