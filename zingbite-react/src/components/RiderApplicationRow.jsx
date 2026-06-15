import React from 'react';
import { FileText, MessageSquare, Check, X } from 'lucide-react';

const RiderApplicationRow = React.memo(({ app, actionLoading, onChat, onUpdateStatus }) => {
  return (
    <tr key={app.id}>
      <td style={{ fontWeight: 700 }}>{app.candidateName}</td>
      <td>
        <div style={{ fontSize: '0.85rem' }}>{app.email}</div>
        <div style={{ fontSize: '0.8rem', color: 'var(--text-secondary)' }}>{app.phone}</div>
      </td>
      <td>{app.appliedDate}</td>
      <td>
        <a
          href={app.resumeUrl}
          target="_blank"
          rel="noreferrer"
          style={{ display: 'inline-flex', alignItems: 'center', gap: '4px', fontSize: '0.85rem' }}
        >
          <FileText size={14} /> Resume
        </a>
      </td>
      <td>
        <button
          onClick={() => onChat(app.id)}
          style={{
            background: 'transparent', color: '#8b5cf6', border: '1px solid #8b5cf6',
            padding: '6px 10px', borderRadius: '4px', fontSize: '0.8rem',
            fontWeight: 700, cursor: 'pointer', display: 'flex', alignItems: 'center', gap: '4px'
          }}
        >
          <MessageSquare size={12} /> Chat
        </button>
      </td>
      <td>
        <span className={`badge ${
          app.status.toLowerCase().includes('applied') ? 'applied' :
          app.status.toLowerCase().includes('interview') ? 'interview' :
          app.status.toLowerCase().includes('offer') ? 'offered' : 'rejected'
        }`}>
          {app.status}
        </span>
      </td>
      <td>
        <div style={{ display: 'flex', gap: '8px' }}>
          <button
            disabled={actionLoading === `app-${app.id}` || app.status === 'Offer Extended'}
            onClick={() => onUpdateStatus(app.id, 'Offer Extended')}
            style={{
              background: '#4bc0c0', color: 'white', border: 'none',
              padding: '6px 12px', borderRadius: '4px', fontSize: '0.8rem',
              fontWeight: 700, cursor: 'pointer', display: 'flex',
              alignItems: 'center', gap: '4px',
              opacity: app.status === 'Offer Extended' ? 0.6 : 1
            }}
          >
            <Check size={12} /> Approve Rider
          </button>
          <button
            disabled={actionLoading === `app-${app.id}` || app.status === 'Rejected'}
            onClick={() => onUpdateStatus(app.id, 'Rejected')}
            style={{
              background: 'var(--danger)', color: 'white', border: 'none',
              padding: '6px 12px', borderRadius: '4px', fontSize: '0.8rem',
              fontWeight: 700, cursor: 'pointer', display: 'flex',
              alignItems: 'center', gap: '4px',
              opacity: app.status === 'Rejected' ? 0.6 : 1
            }}
          >
            <X size={12} /> Reject Rider
          </button>
        </div>
      </td>
    </tr>
  );
});

RiderApplicationRow.displayName = 'RiderApplicationRow';
export default RiderApplicationRow;
