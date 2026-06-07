"import React, { useState, useEffect, useContext, useRef } from 'react';
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
      
<truncated 15238 bytes>