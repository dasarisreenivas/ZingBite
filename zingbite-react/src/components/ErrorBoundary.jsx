import React from 'react';
import { useNavigate } from 'react-router-dom';

class ErrorBoundaryInner extends React.Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false, error: null, errorInfo: null };
  }

  static getDerivedStateFromError(error) {
    return { hasError: true, error };
  }

  componentDidCatch(error, errorInfo) {
    console.error("ErrorBoundary caught an error:", error, errorInfo);
    this.setState({ errorInfo });
  }

  render() {
    if (this.state.hasError) {
      return (
        <div style={{ padding: '40px', maxWidth: '800px', margin: '60px auto', background: '#fff', border: '2px solid var(--danger)', borderRadius: '12px', boxShadow: '0 10px 25px rgba(0,0,0,0.1)', fontFamily: 'system-ui, -apple-system, sans-serif' }}>
          <h2 style={{ color: 'var(--danger)', margin: '0 0 16px 0', fontSize: '1.6rem', fontWeight: 800 }}>Application Render Crash</h2>
          <p style={{ fontWeight: 'bold', color: 'var(--text-primary)', fontSize: '1.05rem' }}>
            Error Details: <code style={{ color: 'var(--danger)', background: 'rgba(226, 55, 68, 0.05)', padding: '2px 6px', borderRadius: '4px', fontFamily: 'monospace' }}>{this.state.error && this.state.error.toString()}</code>
          </p>
          <pre style={{ background: 'var(--bg-surface)', border: '1px solid var(--border-medium)', padding: '16px', borderRadius: '8px', overflowX: 'auto', fontSize: '0.82rem', color: 'var(--text-secondary)', lineHeight: '1.5', maxHeight: '300px' }}>
            {this.state.errorInfo && this.state.errorInfo.componentStack}
          </pre>
          <div style={{ display: 'flex', gap: '12px', marginTop: '24px' }}>
            <button 
              onClick={() => window.location.reload()} 
              style={{ padding: '10px 20px', background: 'var(--brand-red)', color: '#fff', border: 'none', borderRadius: '6px', cursor: 'pointer', fontWeight: '700', fontSize: '0.9rem' }}
            >
              Reload Page
            </button>
            <button 
              onClick={() => this.props.navigate('/')} 
              style={{ padding: '10px 20px', background: 'none', border: '1px solid var(--border-medium)', color: 'var(--text-secondary)', borderRadius: '6px', cursor: 'pointer', fontWeight: '700', fontSize: '0.9rem' }}
            >
              Go to Home
            </button>
          </div>
        </div>
      );
    }
    return this.props.children;
  }
}

const ErrorBoundary = (props) => {
  const navigate = useNavigate();
  return <ErrorBoundaryInner {...props} navigate={navigate} />;
};

export default ErrorBoundary;
