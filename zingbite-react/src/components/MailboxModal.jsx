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
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm font-sans">
      <div className="bg-white dark:bg-black rounded-2xl shadow-2xl w-full max-w-[900px] h-[600px] flex flex-col overflow-hidden border border-gray-100 dark:border-neutral-800">
        {/* Header */}
        <div className="flex items-center justify-between p-4 px-6 border-b border-gray-100 dark:border-neutral-800 bg-brand-red text-white">
          <div className="flex items-center gap-2.5">
            <Mail size={22} />
            <h2 className="text-lg font-bold m-0 font-outfit">ZingBite Notification Mailbox</h2>
          </div>
          <button 
            onClick={onClose} 
            className="bg-transparent border-none text-white cursor-pointer p-1 rounded-full flex items-center hover:bg-white/15 transition-colors"
          >
            <X size={20} />
          </button>
        </div>

        {/* Super Admin Toggle */}
        {user?.role === 'super_admin' && (
          <div className="p-2 px-6 border-b border-gray-100 dark:border-neutral-800 bg-gray-50 dark:bg-neutral-900 flex items-center gap-2">
            <input
              type="checkbox"
              id="show-all-system"
              checked={showAllSystem}
              onChange={(e) => setShowAllSystem(e.target.checked)}
              className="accent-brand-red cursor-pointer"
            />
            <label htmlFor="show-all-system" className="text-[11px] text-gray-500 dark:text-neutral-400 font-semibold cursor-pointer select-none">
              Show all system notification logs (Super Admin)
            </label>
          </div>
        )}

        {/* Content: Sidebar + Detail */}
        <div className="flex-1 flex overflow-hidden">
          {/* Email List Sidebar */}
          <div className="w-[40%] border-r border-gray-100 dark:border-neutral-800 overflow-y-auto bg-white dark:bg-neutral-950">
            {loading ? (
              <div className="flex items-center justify-center h-full">
                <Loader size={24} className="animate-spin text-brand-red" />
              </div>
            ) : error ? (
              <div className="p-4 text-center text-[13px] text-red-500 font-medium">{error}</div>
            ) : emails.length === 0 ? (
              <div className="flex flex-col items-center justify-center h-full text-gray-400 dark:text-neutral-500 gap-1">
                <Inbox size={40} className="opacity-50" />
                <p className="text-[13px]">Mailbox is empty</p>
              </div>
            ) : (
              emails.map((email) => {
                const isSelected = selectedEmail?.id === email.id;
                const statusStyle = getStatusStyle(email.status);
                return (
                  <button
                    key={email.id}
                    onClick={() => setSelectedEmail(email)}
                    className={`w-full text-left p-3.5 px-4 border-b border-gray-50 dark:border-neutral-900/50 cursor-pointer flex flex-col gap-1 border-none outline-none font-sans transition-all border-l-[3px] ${
                      isSelected 
                        ? 'bg-brand-red/5 dark:bg-brand-red/10 border-brand-red' 
                        : 'bg-white dark:bg-neutral-950 border-transparent hover:bg-gray-50 dark:hover:bg-neutral-900/40'
                    }`}
                  >
                    <div className="flex justify-between items-start w-full">
                      <span className="font-semibold text-[11px] text-gray-400 dark:text-neutral-500 truncate max-w-[65%]">
                        To: {email.recipientEmail || `User #${email.userId}`}
                      </span>
                      <span className="text-[10px] text-gray-400 dark:text-neutral-500 flex items-center gap-1 shrink-0">
                        <Calendar size={10} />
                        {formatDate(email.sentDate)}
                      </span>
                    </div>
                    <span className="font-bold text-[13px] text-gray-900 dark:text-neutral-100 truncate w-full">
                      {email.subject}
                    </span>
                    <div className="flex justify-between items-center w-full">
                      <span className="text-[11px] text-gray-400 dark:text-neutral-500 truncate max-w-[70%]">
                        {stripHtml(email.body)}
                      </span>
                      <span className="text-[9px] font-bold p-0.5 px-2 rounded-full flex items-center gap-1 shrink-0" style={{
                        backgroundColor: statusStyle.backgroundColor, color: statusStyle.color
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
          <div className="w-[60%] overflow-y-auto bg-gray-50 dark:bg-neutral-950 p-6 flex flex-col">
            {selectedEmail ? (
              <div className="bg-white dark:bg-neutral-900 rounded-xl border border-gray-100 dark:border-neutral-800/80 shadow-sm p-6 flex-1 display: flex flex-col">
                {/* Email Header */}
                <div className="border-b border-gray-100 dark:border-neutral-800/80 pb-4 mb-4">
                  <h3 className="font-bold text-base text-gray-900 dark:text-neutral-100 m-0 mb-2.5 font-outfit">
                    {selectedEmail.subject}
                  </h3>
                  <div className="flex flex-col gap-1 text-[11px] text-gray-500 dark:text-neutral-400">
                    <div><span className="font-bold">From:</span> ZingBite Operations &lt;support@zingbite.com&gt;</div>
                    <div><span className="font-bold">To:</span> {selectedEmail.recipientEmail || `User #${selectedEmail.userId}`}</div>
                    <div><span className="font-bold">Date:</span> {formatDate(selectedEmail.sentDate)}</div>
                    <div className="flex items-center gap-1.5">
                      <span className="font-bold">Status:</span>
                      {(() => {
                        const st = getStatusStyle(selectedEmail.status);
                        return (
                          <span className="p-0.5 px-2 rounded-full text-[10px] font-bold inline-flex items-center gap-1" style={{
                            backgroundColor: st.backgroundColor, color: st.color
                          }}>
                            {st.icon} {selectedEmail.status}
                          </span>
                        );
                      })()}
                    </div>
                  </div>
                </div>

                {/* Sandboxed preview prevents stored email markup from executing in the app origin. */}
                <iframe
                  title={`Email preview: ${selectedEmail.subject}`}
                  sandbox=""
                  srcDoc={selectedEmail.body || ''}
                  className="flex-1 w-full min-h-[360px] border border-gray-100 dark:border-neutral-800/60 rounded-lg bg-white"
                />
              </div>
            ) : (
              <div className="flex flex-col items-center justify-center h-full text-gray-400 dark:text-neutral-500 gap-1.5 text-center">
                <Mail size={48} className="opacity-50" />
                <p className="text-sm font-bold text-gray-800 dark:text-neutral-200">No Email Selected</p>
                <p className="text-xs max-w-[260px] leading-normal">
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
