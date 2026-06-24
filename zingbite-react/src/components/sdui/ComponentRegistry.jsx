import React from 'react';
import DynamicForm from './elements/DynamicForm';
import DynamicTable from './elements/DynamicTable';
import { 
  Users, Store, ShoppingBag, IndianRupee, Briefcase, 
  MapPin, Clock, Star, Flame, Smartphone, AlertTriangle 
} from 'lucide-react';

// Icon Map dictionary to dynamically reference Lucide Icons by name
const IconMap = {
  Users, Store, ShoppingBag, IndianRupee, Briefcase,
  MapPin, Clock, Star, Flame, Smartphone, AlertTriangle
};

// Generic Metric Card component
const MetricCard = ({ props }) => {
  const IconComponent = IconMap[props.icon] || ShoppingBag;
  return (
    <div style={{
      padding: '24px',
      borderRadius: '20px',
      background: '#fff',
      border: '1px solid rgba(247, 55, 79, 0.08)',
      boxShadow: '0 8px 30px rgba(0, 0, 0, 0.02)',
      display: 'flex',
      alignItems: 'center',
      gap: '16px',
      transition: 'transform 0.3s ease',
      height: '100%'
    }} className="hover-scale">
      <div style={{
        width: '48px',
        height: '48px',
        borderRadius: '14px',
        background: 'rgba(247, 55, 79, 0.08)',
        color: '#f7374f',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        flexShrink: 0
      }}>
        <IconComponent size={24} />
      </div>
      <div>
        <span style={{ fontSize: '0.85rem', color: '#777', fontWeight: 500, display: 'block' }}>{props.title}</span>
        <strong style={{ fontSize: '1.6rem', color: '#1a1a1a', fontFamily: "'Outfit', sans-serif", display: 'block', margin: '4px 0 2px' }}>
          {props.value}
        </strong>
        {props.trend && (
          <span style={{ fontSize: '0.78rem', color: props.trend.startsWith('+') ? '#10b981' : '#ef4444', fontWeight: 600 }}>
            {props.trend}
          </span>
        )}
      </div>
    </div>
  );
};

// Generic Layout Grid Container
const LayoutGrid = ({ props, children }) => {
  const cols = props.columns || 3;
  return (
    <div style={{
      display: 'grid',
      gridTemplateColumns: `repeat(auto-fit, minmax(250px, 1fr))`,
      gap: '20px',
      width: '100%',
      marginBottom: '24px'
    }}>
      {children}
    </div>
  );
};

// Generic Section Banner (Hero or alerts)
const InfoBanner = ({ props }) => {
  const IconComponent = IconMap[props.icon] || AlertTriangle;
  return (
    <div style={{
      padding: '20px 24px',
      background: 'linear-gradient(135deg, rgba(247,55,79,0.04) 0%, rgba(255,184,0,0.04) 100%)',
      border: '1px solid rgba(247,55,79,0.1)',
      borderRadius: '16px',
      display: 'flex',
      alignItems: 'center',
      gap: '16px',
      marginBottom: '24px'
    }}>
      <div style={{ color: '#f7374f', flexShrink: 0 }}>
        <IconComponent size={24} />
      </div>
      <div>
        <strong style={{ display: 'block', fontSize: '0.95rem', color: '#1a1a1a', fontFamily: "'Outfit', sans-serif" }}>
          {props.title}
        </strong>
        <span style={{ fontSize: '0.85rem', color: '#666' }}>{props.subtitle}</span>
      </div>
    </div>
  );
};

// Dynamic Component Registry mapping schema types to React views
const ComponentRegistry = {
  layout_grid: LayoutGrid,
  widget_metric: MetricCard,
  widget_banner: InfoBanner,
  widget_form: DynamicForm,
  widget_table: DynamicTable
};

export default ComponentRegistry;
export { IconMap };
