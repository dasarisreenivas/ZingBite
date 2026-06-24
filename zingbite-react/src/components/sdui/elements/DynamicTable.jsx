import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useActionDispatcher } from '../ActionDispatcher';

const DynamicTable = ({ props, context, refreshPage }) => {
  const { executeAction } = useActionDispatcher();
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (!props.dataSource) return;

    const fetchData = async () => {
      setLoading(true);
      setError(null);
      try {
        const response = await axios.get(props.dataSource);
        if (props.dataKey && response.data && Array.isArray(response.data[props.dataKey])) {
          setData(response.data[props.dataKey]);
        } else if (Array.isArray(response.data)) {
          setData(response.data);
        } else if (response.data && Array.isArray(response.data.items)) {
          setData(response.data.items);
        } else if (response.data && typeof response.data === 'object') {
          // If the payload returns keys like users or restaurants, extract array values
          const possibleArr = Object.values(response.data).find(val => Array.isArray(val));
          setData(possibleArr || []);
        } else {
          setData([]);
        }
      } catch (err) {
        console.error('DynamicTable failed to fetch data:', err);
        setError('Failed to load table entries.');
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [props.dataSource]);

  const handleRowClick = (row) => {
    if (!props.rowAction) return;
    const rowContext = { ...context, row };
    executeAction(props.rowAction, rowContext, refreshPage);
  };

  const columns = props.columns || [];

  const formatCellValue = (val, col) => {
    if (val === null || val === undefined) return '-';
    
    switch (col.type) {
      case 'currency':
        return `₹${Number(val).toLocaleString('en-IN')}`;
      case 'date':
        return new Date(val).toLocaleDateString('en-IN', {
          year: 'numeric',
          month: 'short',
          day: 'numeric'
        });
      case 'badge': {
        const isTrue = val === true || String(val).toLowerCase() === 'active' || String(val).toLowerCase() === 'approved';
        return (
          <span style={{
            padding: '4px 10px',
            borderRadius: '20px',
            fontSize: '0.78rem',
            fontWeight: 700,
            textTransform: 'uppercase',
            background: isTrue ? 'rgba(16,185,129,0.1)' : 'rgba(239,68,68,0.1)',
            color: isTrue ? '#10b981' : '#ef4444',
            display: 'inline-block'
          }}>
            {String(val)}
          </span>
        );
      }
      default:
        return String(val);
    }
  };

  return (
    <div style={{
      background: '#fff',
      padding: '24px',
      borderRadius: '24px',
      border: '1px solid rgba(247,55,79,0.08)',
      boxShadow: '0 12px 40px rgba(0,0,0,0.03)',
      width: '100%',
      marginBottom: '24px',
      overflowX: 'auto'
    }}>
      {props.title && (
        <h3 style={{
          fontFamily: "'Outfit', sans-serif",
          fontSize: '1.25rem',
          fontWeight: 800,
          color: '#1a1a1a',
          marginBottom: '16px'
        }}>
          {props.title}
        </h3>
      )}

      {loading ? (
        <div style={{ padding: '40px', textAlign: 'center', color: '#777', fontWeight: 500 }}>
          Retrieving entries...
        </div>
      ) : error ? (
        <div style={{ padding: '24px', textAlign: 'center', color: '#ef4444', fontWeight: 600 }}>
          {error}
        </div>
      ) : data.length === 0 ? (
        <div style={{ padding: '40px', textAlign: 'center', color: '#888', fontStyle: 'italic' }}>
          No records found.
        </div>
      ) : (
        <div style={{ minWidth: '600px' }}>
          <table style={{ width: '100%', borderCollapse: 'collapse', textAlign: 'left' }}>
            <thead>
              <tr style={{ borderBottom: '2px solid #f0f0f0' }}>
                {columns.map(col => (
                  <th key={col.key} style={{ padding: '12px 16px', fontSize: '0.85rem', fontWeight: 700, color: '#666', textTransform: 'uppercase' }}>
                    {col.label}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {data.map((row, idx) => (
                <tr
                  key={row.id || idx}
                  onClick={() => handleRowClick(row)}
                  style={{
                    borderBottom: '1px solid #f9f9f9',
                    cursor: props.rowAction ? 'pointer' : 'default',
                    transition: 'background 0.2s ease'
                  }}
                  className="hover-bg-row"
                >
                  {columns.map(col => (
                    <td key={col.key} style={{ padding: '16px', fontSize: '0.92rem', color: '#333' }}>
                      {formatCellValue(row[col.key], col)}
                    </td>
                  ))}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
};

export default DynamicTable;
