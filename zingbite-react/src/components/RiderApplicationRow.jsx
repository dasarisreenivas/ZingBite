import React from 'react';
import { FileText, MessageSquare, Check, X } from 'lucide-react';

const RiderApplicationRow = React.memo(({ app, actionLoading, onChat, onUpdateStatus, onUpdateRiderStatus }) => {
  return (
    <tr>
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
        <div style={{ display: 'flex', flexDirection: 'column', gap: '6px', alignItems: 'flex-start' }}>
          <span className={`badge ${
            (app.riderStatus || 'Pending').toLowerCase() === 'active' ? 'approved' :
            (app.riderStatus || 'Pending').toLowerCase() === 'pending' ? 'pending' : 'rejected'
          }`}>
            {app.riderStatus || 'Pending'}
          </span>
          <div style={{ display: 'flex', gap: '6px' }}>
            <button
              disabled={actionLoading === `rider-${app.userId}` || (app.riderStatus || 'Pending') === 'Active'}
              onClick={() => onUpdateRiderStatus(app.userId, 'Active')}
              style={{
                background: '#4bc0c0', color: 'white', border: 'none',
                padding: '4px 10px', borderRadius: '4px', fontSize: '0.75rem',
                fontWeight: 700, cursor: 'pointer', display: 'flex',
                alignItems: 'center', gap: '3px',
                opacity: (app.riderStatus || 'Pending') === 'Active' ? 0.6 : 1
              }}
            >
              <Check size={10} /> Approve
            </button>
            <button
              disabled={actionLoading === `rider-${app.userId}` || (app.riderStatus || 'Pending') === 'Suspended'}
              onClick={() => onUpdateRiderStatus(app.userId, 'Suspended')}
              style={{
                background: 'var(--danger)', color: 'white', border: 'none',
                padding: '4px 10px', borderRadius: '4px', fontSize: '0.75rem',
                fontWeight: 700, cursor: 'pointer', display: 'flex',
                alignItems: 'center', gap: '3px',
                opacity: (app.riderStatus || 'Pending') === 'Suspended' ? 0.6 : 1
              }}
            >
              <X size={10} /> Reject
            </button>
          </div>
        </div>
      </td>
      <td>
        <div style={{ display: 'flex', gap: '8px' }}>
          <button
            disabled={actionLoading === `app-${app.id}` || app.status === 'Offered'}
            onClick={() => onUpdateStatus(app.id, 'Offered')}
            style={{
              background: '#4bc0c0', color: 'white', border: 'none',
              padding: '6px 12px', borderRadius: '4px', fontSize: '0.8rem',
              fontWeight: 700, cursor: 'pointer', display: 'flex',
              alignItems: 'center', gap: '4px',
              opacity: app.status === 'Offered' ? 0.6 : 1
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
