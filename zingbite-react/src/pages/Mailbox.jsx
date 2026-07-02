import { useState, useEffect, useContext, useRef } from 'react';
import axios from 'axios';
import {
  Mail,
  Loader,
  Calendar,
  CheckCircle,
  AlertCircle,
  HelpCircle,
  Inbox,
  Search,
  RefreshCw,
  ShieldCheck,
  Sparkles
} from 'lucide-react';
import { AuthContext } from '../context/AuthContext';
import '../styles/mailbox.css';

const Mailbox = () => {
  const { user } = useContext(AuthContext);
  const [emails, setEmails] = useState([]);
  const [selectedEmail, setSelectedEmail] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [showAllSystem, setShowAllSystem] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');

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

  const formatDate = (dateStr) => {
    if (!dateStr) return 'N/A';
    const date = new Date(dateStr);
    if (isNaN(date.getTime())) return dateStr;
    return date.toLocaleDateString([], { month: 'short', day: 'numeric' }) + ' ' +
           date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
  };

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

  const stripHtml = (html) => {
    if (!html) return '';
    const text = html.replace(/<[^>]*>/g, '').replace(/\s+/g, ' ').trim();
    return text.length > 92 ? `${text.substring(0, 92)}...` : text;
  };

  const filteredEmails = emails.filter((email) => {
    const query = searchTerm.trim().toLowerCase();
    if (!query) return true;
    return [
      email.subject,
      email.recipientEmail,
      email.status,
      stripHtml(email.body)
    ].some((value) => String(value || '').toLowerCase().includes(query));
  });

  const sentCount = emails.filter(email => email.status === 'SENT').length;
  const failedCount = emails.filter(email => email.status === 'FAILED').length;
  const selectedStatusStyle = selectedEmail ? getStatusStyle(selectedEmail.status) : null;

  return (
    <section className="mailbox-page">
      <div className="mailbox-shell">
        <header className="mailbox-header">
          <div className="mailbox-icon">
            <Mail size={24} />
          </div>
          <div className="mailbox-title-block">
            <div className="mailbox-badges">
              <span className="mailbox-badge primary">
                <Sparkles size={12} /> Premium inbox
              </span>
              <span className="mailbox-badge">
                <ShieldCheck size={12} /> Secure preview
              </span>
            </div>
            <h1>Mail Inbox</h1>
            <p>{emails.length} messages synced for {user?.email || user?.username || 'your account'}</p>
          </div>
        </header>

        {user?.role === 'super_admin' && (
          <div className="mailbox-admin-row">
            <input
              type="checkbox"
              id="show-all-system"
              checked={showAllSystem}
              onChange={(e) => setShowAllSystem(e.target.checked)}
            />
            <label htmlFor="show-all-system">Show all system mailbox logs (Super Admin)</label>
          </div>
        )}

        <div className="mailbox-grid">
          <aside className="mailbox-list-panel" aria-label="Mailbox messages">
            <div className="mailbox-list-tools">
              <div className="mailbox-stats-grid">
                <div className="mailbox-stat">
                  <span>Total</span>
                  <strong>{emails.length}</strong>
                </div>
                <div className="mailbox-stat success">
                  <span>Sent</span>
                  <strong>{sentCount}</strong>
                </div>
                <div className="mailbox-stat danger">
                  <span>Failed</span>
                  <strong>{failedCount}</strong>
                </div>
              </div>

              <div className="mailbox-search-grid">
                <label className="mailbox-search">
                  <Search size={16} />
                  <input
                    type="search"
                    value={searchTerm}
                    onChange={(event) => setSearchTerm(event.target.value)}
                    placeholder="Search mailbox"
                  />
                </label>
                <button
                  type="button"
                  onClick={fetchEmails}
                  className="mailbox-refresh"
                  aria-label="Refresh mailbox"
                >
                  <RefreshCw size={16} className={loading ? 'spin' : ''} />
                </button>
              </div>
            </div>

            <div className="mailbox-message-list">
              {loading ? (
                <div className="mailbox-list-state">
                  <Loader size={24} className="spin" />
                </div>
              ) : error ? (
                <div className="mailbox-list-state error">{error}</div>
              ) : filteredEmails.length === 0 ? (
                <div className="mailbox-list-state muted">
                  <Inbox size={40} />
                  <p>{emails.length === 0 ? 'Mailbox is empty' : 'No matching emails'}</p>
                </div>
              ) : (
                filteredEmails.map((email) => {
                  const isSelected = selectedEmail?.id === email.id;
                  const statusStyle = getStatusStyle(email.status);
                  return (
                    <button
                      key={email.id}
                      type="button"
                      onClick={() => setSelectedEmail(email)}
                      className={`mailbox-message ${isSelected ? 'selected' : ''}`}
                    >
                      <div className="mailbox-message-meta">
                        <span>To: {email.recipientEmail || `User #${email.userId}`}</span>
                        <time>
                          <Calendar size={10} />
                          {formatDate(email.sentDate)}
                        </time>
                      </div>
                      <strong>{email.subject}</strong>
                      <div className="mailbox-message-footer">
                        <span>{stripHtml(email.body)}</span>
                        <em style={{ backgroundColor: statusStyle.backgroundColor, color: statusStyle.color }}>
                          {statusStyle.icon} {email.status}
                        </em>
                      </div>
                    </button>
                  );
                })
              )}
            </div>
          </aside>

          <section className="mailbox-preview-panel" aria-label="Email preview">
            {selectedEmail ? (
              <article className="mailbox-email-card">
                <div className="mailbox-email-header">
                  <div className="mailbox-email-badges">
                    {selectedStatusStyle && (
                      <span style={{
                        backgroundColor: selectedStatusStyle.backgroundColor,
                        color: selectedStatusStyle.color
                      }}>
                        {selectedStatusStyle.icon} {selectedEmail.status}
                      </span>
                    )}
                    <time>{formatDate(selectedEmail.sentDate)}</time>
                  </div>
                  <h2>{selectedEmail.subject}</h2>
                  <dl>
                    <div>
                      <dt>From:</dt>
                      <dd>ZingBite Operations &lt;support@zingbite.com&gt;</dd>
                    </div>
                    <div>
                      <dt>To:</dt>
                      <dd>{selectedEmail.recipientEmail || `User #${selectedEmail.userId}`}</dd>
                    </div>
                    <div>
                      <dt>Date:</dt>
                      <dd>{formatDate(selectedEmail.sentDate)}</dd>
                    </div>
                  </dl>
                </div>

                <div className="mailbox-frame-wrap">
                  <iframe
                    title={`Email preview: ${selectedEmail.subject}`}
                    sandbox=""
                    srcDoc={selectedEmail.body || ''}
                  />
                </div>
              </article>
            ) : (
              <div className="mailbox-empty-preview">
                <div>
                  <Mail size={38} />
                </div>
                <h2>No Email Selected</h2>
                <p>Choose a message to preview it here.</p>
              </div>
            )}
          </section>
        </div>
      </div>
    </section>
  );
};

export default Mailbox;
