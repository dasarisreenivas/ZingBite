import React, { useState, useContext } from 'react';
import { useSDUI } from '../hooks/useSDUI';
import SDUIRenderer from '../components/sdui/SDUIRenderer';
import { AuthContext } from '../context/AuthContext';
import { 
  Monitor, Tablet, Smartphone, Settings, ShieldAlert,
  Home, Store, Truck, Shield, Briefcase
} from 'lucide-react';

const SDUIDashboard = () => {
  const { user, logout } = useContext(AuthContext);
  const [selectedPortal, setSelectedPortal] = useState('restaurant_dashboard');

  // Load the corresponding Server-Driven UI configuration
  const { sduiConfig, loading, error, viewport, refreshLayout } = useSDUI(selectedPortal);

  // Compile layout rendering context containing dynamic state parameters
  const clientContext = {
    user: user || { username: 'Mock Partner', roles: ['restaurant_admin', 'delivery_partner', 'super_admin'] },
    logout,
    data: {
      analytics: {
        todayRevenue: 48250,
        revenueGrowth: 8.5
      }
    }
  };

  const portalList = [
    { id: 'homepage', name: 'Customer Home', icon: Home },
    { id: 'restaurant_dashboard', name: 'Restaurant Admin', icon: Store },
    { id: 'delivery_dashboard', name: 'Delivery Partner', icon: Truck },
    { id: 'super_admin_dashboard', name: 'Super Admin', icon: Shield },
    { id: 'career_portal', name: 'Careers Portal', icon: Briefcase }
  ];

  return (
    <div style={{ background: '#f8fafc', minHeight: '100vh', paddingBottom: '60px' }}>
      {/* Dynamic SDUI Controls Header */}
      <div style={{
        background: '#fff',
        borderBottom: '1px solid #e2e8f0',
        padding: '16px 24px',
        position: 'sticky',
        top: 0,
        zIndex: 100,
        boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.05)'
      }}>
        <div style={{
          maxWidth: '1400px',
          margin: '0 auto',
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          flexWrap: 'wrap',
          gap: '16px'
        }}>
          <div>
            <h2 style={{ fontFamily: "'Outfit', sans-serif", fontSize: '1.25rem', fontWeight: 800, color: '#0f172a', margin: 0, display: 'flex', alignItems: 'center', gap: '8px' }}>
              <Settings size={20} color="#f7374f" /> Server-Driven UI (SDUI) Control Panel
            </h2>
            <span style={{ fontSize: '0.8rem', color: '#64748b' }}>Select any portal layout below to evaluate dynamic rendering configurations.</span>
          </div>

          {/* Viewport indicators */}
          <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
            <span style={{ fontSize: '0.82rem', fontWeight: 700, color: '#64748b', textTransform: 'uppercase' }}>Active Viewport:</span>
            <div style={{
              display: 'flex',
              background: '#f1f5f9',
              padding: '4px',
              borderRadius: '10px',
              alignItems: 'center',
              gap: '4px'
            }}>
              <div style={{
                display: 'flex',
                alignItems: 'center',
                gap: '6px',
                padding: '6px 12px',
                borderRadius: '8px',
                fontSize: '0.82rem',
                fontWeight: 700,
                background: viewport === 'desktop' ? '#fff' : 'transparent',
                color: viewport === 'desktop' ? '#f7374f' : '#64748b',
                boxShadow: viewport === 'desktop' ? '0 1px 3px rgba(0,0,0,0.1)' : 'none'
              }}>
                <Monitor size={14} /> Desktop
              </div>
              <div style={{
                display: 'flex',
                alignItems: 'center',
                gap: '6px',
                padding: '6px 12px',
                borderRadius: '8px',
                fontSize: '0.82rem',
                fontWeight: 700,
                background: viewport === 'tablet' ? '#fff' : 'transparent',
                color: viewport === 'tablet' ? '#f7374f' : '#64748b',
                boxShadow: viewport === 'tablet' ? '0 1px 3px rgba(0,0,0,0.1)' : 'none'
              }}>
                <Tablet size={14} /> Tablet
              </div>
              <div style={{
                display: 'flex',
                alignItems: 'center',
                gap: '6px',
                padding: '6px 12px',
                borderRadius: '8px',
                fontSize: '0.82rem',
                fontWeight: 700,
                background: viewport === 'mobile' ? '#fff' : 'transparent',
                color: viewport === 'mobile' ? '#f7374f' : '#64748b',
                boxShadow: viewport === 'mobile' ? '0 1px 3px rgba(0,0,0,0.1)' : 'none'
              }}>
                <Smartphone size={14} /> Mobile
              </div>
            </div>
          </div>
        </div>

        {/* Portal selector tabs */}
        <div style={{
          maxWidth: '1400px',
          margin: '16px auto 0',
          display: 'flex',
          gap: '10px',
          overflowX: 'auto',
          paddingBottom: '4px',
          scrollbarWidth: 'none'
        }}>
          {portalList.map(portal => {
            const Icon = portal.icon;
            const isSelected = selectedPortal === portal.id;
            return (
              <button
                key={portal.id}
                onClick={() => setSelectedPortal(portal.id)}
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: '8px',
                  padding: '10px 16px',
                  borderRadius: '12px',
                  border: isSelected ? '1px solid #f7374f' : '1px solid #e2e8f0',
                  background: isSelected ? '#fff0f1' : '#fff',
                  color: isSelected ? '#f7374f' : '#475569',
                  fontFamily: 'inherit',
                  fontSize: '0.88rem',
                  fontWeight: 700,
                  cursor: 'pointer',
                  transition: 'all 0.2s ease',
                  flexShrink: 0
                }}
                className="hover-scale"
              >
                <Icon size={16} /> {portal.name}
              </button>
            );
          })}
        </div>
      </div>

      {/* Render Dynamic SDUI Page Layout */}
      <div style={{ marginTop: '24px' }}>
        {loading ? (
          <div style={{
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'center',
            alignItems: 'center',
            minHeight: '400px',
            color: '#64748b',
            fontFamily: "'Outfit', sans-serif",
            fontWeight: 600
          }}>
            Retrieving Server Schema...
          </div>
        ) : error ? (
          <div style={{
            maxWidth: '600px',
            margin: '80px auto',
            padding: '32px',
            background: '#fff',
            borderRadius: '20px',
            border: '1px solid #fee2e2',
            textAlign: 'center',
            boxShadow: '0 10px 15px -3px rgba(0, 0, 0, 0.05)'
          }}>
            <ShieldAlert size={48} color="#ef4444" style={{ margin: '0 auto 16px' }} />
            <h3 style={{ fontFamily: "'Outfit', sans-serif", fontSize: '1.2rem', fontWeight: 800, color: '#1e293b', marginBottom: '8px' }}>
              Layout Not Found
            </h3>
            <p style={{ fontSize: '0.9rem', color: '#64748b', lineHeight: 1.5 }}>{error}</p>
          </div>
        ) : (
          <SDUIRenderer
            sduiConfig={sduiConfig}
            viewport={viewport}
            context={clientContext}
            refreshPage={refreshLayout}
          />
        )}
      </div>
    </div>
  );
};

export default SDUIDashboard;
