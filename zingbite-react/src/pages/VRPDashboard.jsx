import React, { useState, useEffect, useRef, useContext } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { AuthContext } from '../context/AuthContext';
import { 
  Compass, CloudRain, Sun, Sliders, BarChart3, Activity, RotateCcw, 
  MapPin, AlertTriangle, Thermometer, IndianRupee, Loader, ChevronRight, 
  Map, HelpCircle, AlertCircle
} from 'lucide-react';

const VRPDashboard = () => {
  const { user } = useContext(AuthContext);
  const navigate = useNavigate();

  if (!user || user.role !== 'super_admin') {
    return (
      <div style={{ 
        display: 'flex', 
        flexDirection: 'column', 
        justifyContent: 'center', 
        alignItems: 'center', 
        flex: 1, 
        minHeight: 'calc(100vh - 72px)', 
        background: '#0d0d15', 
        color: '#fff',
        padding: '20px',
        textAlign: 'center'
      }}>
        <div style={{
          background: 'rgba(255, 255, 255, 0.03)',
          border: '1px solid rgba(255, 255, 255, 0.08)',
          padding: '40px',
          borderRadius: '16px',
          backdropFilter: 'blur(16px)',
          maxWidth: '480px',
          width: '100%',
          boxShadow: '0 8px 32px rgba(0, 0, 0, 0.24)'
        }}>
          <AlertTriangle size={64} style={{ color: '#ef4444', marginBottom: '20px', marginLeft: 'auto', marginRight: 'auto' }} />
          <h2 style={{ fontSize: '1.5rem', fontWeight: 800, marginBottom: '12px' }}>Access Restricted</h2>
          <p style={{ color: '#94a3b8', fontSize: '0.9rem', marginBottom: '24px', lineHeight: '1.5' }}>
            The Vehicle Routing Problem (VRP) Control Room is strictly reserved for system engineers and administrators.
          </p>
          <button 
            onClick={() => navigate('/')} 
            className="btn-toggle active"
            style={{ padding: '10px 24px', fontSize: '0.9rem', width: '100%', cursor: 'pointer' }}
          >
            Return to Dashboard
          </button>
        </div>
      </div>
    );
  }

  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [updating, setUpdating] = useState(false);
  const [leafletLoaded, setLeafletLoaded] = useState(typeof window !== 'undefined' && !!window.L);

  const mapRef = useRef(null);
  const mapInstanceRef = useRef(null);
  const markersRef = useRef([]);
  const polylinesRef = useRef([]);
  const circlesRef = useRef([]);

  // Fetch VRP state from backend
  const fetchVRPState = async () => {
    try {
      const res = await axios.get('/api/delivery/vrp');
      setData(res.data);
    } catch (err) {
      console.error("Failed to fetch VRP state:", err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchVRPState();
  }, []);

  // Load Leaflet dynamically if not loaded
  useEffect(() => {
    if (window.L) {
      setLeafletLoaded(true);
      return;
    }

    let link = document.querySelector('link[href*="leaflet.css"]');
    if (!link) {
      link = document.createElement('link');
      link.rel = 'stylesheet';
      link.href = 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.9.4/leaflet.css';
      document.head.appendChild(link);
    }

    let script = document.querySelector('script[src*="leaflet.js"]');
    if (!script) {
      script = document.createElement('script');
      script.src = 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.9.4/leaflet.js';
      script.async = true;
      script.onload = () => {
        const interval = setInterval(() => {
          if (window.L) {
            setLeafletLoaded(true);
            clearInterval(interval);
          }
        }, 50);
      };
      document.body.appendChild(script);
    } else {
      const interval = setInterval(() => {
        if (window.L) {
          setLeafletLoaded(true);
          clearInterval(interval);
        }
      }, 50);
      return () => clearInterval(interval);
    }
  }, []);

  // Update Leaflet Map when data changes
  useEffect(() => {
    if (!leafletLoaded || !mapRef.current || !data) return;

    const L = window.L;
    if (!L) return;

    // Initialize map if not present
    if (!mapInstanceRef.current) {
      const map = L.map(mapRef.current, {
        zoomControl: true,
        scrollWheelZoom: true
      }).setView([12.970, 77.600], 13);
      
      L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
        maxZoom: 19,
        attribution: '&copy; OpenStreetMap contributors'
      }).addTo(map);

      mapInstanceRef.current = map;
    }

    const map = mapInstanceRef.current;

    // Clear old layers
    markersRef.current.forEach(m => m.remove());
    polylinesRef.current.forEach(p => p.remove());
    circlesRef.current.forEach(c => c.remove());
    markersRef.current = [];
    polylinesRef.current = [];
    circlesRef.current = [];

    // Draw Surge Incentive Zones
    if (data.surgeZones) {
      data.surgeZones.forEach(zone => {
        const circleColor = zone.incentive > 25 ? '#ef4444' : (zone.incentive > 0 ? '#ff9f40' : '#4bc0c0');
        const circle = L.circle([zone.lat, zone.lon], {
          radius: zone.radius * 100000, // Scale radius representation
          color: circleColor,
          fillColor: circleColor,
          fillOpacity: 0.15,
          weight: 1.5,
          dashArray: '4, 4'
        }).addTo(map).bindPopup(`<b>${zone.name}</b><br/>Surge Premium: +&#8377;${zone.incentive}`);
        circlesRef.current.push(circle);
      });
    }

    // Draw all routing Nodes
    if (data.nodes) {
      data.nodes.forEach(node => {
        let iconHtml = '📍';
        let labelColor = '#3b82f6';
        if (node.id === 0) { iconHtml = '🛵'; labelColor = '#06b6d4'; } // Rider
        else if (node.id === 1) { iconHtml = '🍳'; labelColor = '#ffc000'; } // Restaurant
        else if (node.id === 2) { iconHtml = '🏠'; labelColor = '#a855f7'; } // Customer A
        else if (node.id === 3) { iconHtml = '🏢'; labelColor = '#ec4899'; } // Customer B

        const nodeIcon = L.divIcon({
          html: `<div style="font-size: 20px; line-height: 20px; text-align: center;">${iconHtml}</div>`,
          className: 'custom-vrp-marker',
          iconSize: [24, 24],
          iconAnchor: [12, 12]
        });

        const marker = L.marker([node.latitude, node.longitude], { icon: nodeIcon })
          .addTo(map)
          .bindPopup(`<b>Node ${node.id}: ${node.label}</b><br/>Coords: ${node.latitude.toFixed(5)}, ${node.longitude.toFixed(5)}`);
        markersRef.current.push(marker);
      });
    }

    // Draw Paths
    // 1. First Mile: Cyan
    if (data.pathFM && data.pathFM.length > 0) {
      const latlngs = data.pathFM.map(n => [n.latitude, n.longitude]);
      const poly = L.polyline(latlngs, { color: '#06b6d4', weight: 4, opacity: 0.8 }).addTo(map);
      polylinesRef.current.push(poly);
    }

    // 2. Last Mile 1: Purple
    if (data.pathLM1 && data.pathLM1.length > 0) {
      const latlngs = data.pathLM1.map(n => [n.latitude, n.longitude]);
      const poly = L.polyline(latlngs, { color: '#a855f7', weight: 4, opacity: 0.8, dashArray: '6, 6' }).addTo(map);
      polylinesRef.current.push(poly);
    }

    // 3. Last Mile 2: Pink
    if (data.pathLM2 && data.pathLM2.length > 0) {
      const latlngs = data.pathLM2.map(n => [n.latitude, n.longitude]);
      const poly = L.polyline(latlngs, { color: '#ec4899', weight: 4, opacity: 0.8, dashArray: '3, 6' }).addTo(map);
      polylinesRef.current.push(poly);
    }

    // Fit bounds to cover all key points
    const bounds = L.latLngBounds([
      [RIDER_LAT, RIDER_LON],
      [REST_LAT, REST_LON],
      [CUST_A_LAT, CUST_A_LON],
      [CUST_B_LAT, CUST_B_LON]
    ]);
    map.fitBounds(bounds, { padding: [40, 40] });

    setTimeout(() => {
      if (mapInstanceRef.current) {
        mapInstanceRef.current.invalidateSize();
      }
    }, 200);

  }, [leafletLoaded, data]);

  // Handle configuration POST requests
  const handleVRPAction = async (payload) => {
    setUpdating(true);
    try {
      await axios.post('/api/delivery/vrp', payload);
      await fetchVRPState();
    } catch (err) {
      console.error("Action failed:", err);
    } finally {
      setUpdating(false);
    }
  };

  if (loading) {
    return (
      <div style={{ display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center', flex: 1, minHeight: '500px', background: '#0a0a0f', color: '#fff' }}>
        <Loader size={48} className="spin" style={{ color: '#06b6d4', marginBottom: '16px' }} />
        <span style={{ fontSize: '1rem', fontWeight: 600, letterSpacing: '1px' }}>INITIALIZING DYNAMIC VRP SYSTEM...</span>
      </div>
    );
  }

  // Anchor Coordinates mapping (shared with backend)
  const RIDER_LAT = 12.9580;
  const RIDER_LON = 77.5890;
  const REST_LAT = 12.9716;
  const REST_LON = 77.5946;
  const CUST_A_LAT = 12.9821;
  const CUST_A_LON = 77.6085;
  const CUST_B_LAT = 12.9645;
  const CUST_B_LON = 77.6142;

  return (
    <>
      <style>{`
        .vrp-container {
          background: #0d0d15;
          min-height: calc(100vh - 72px);
          color: #f1f5f9;
          font-family: 'Inter', sans-serif;
          padding: 24px;
        }
        .vrp-header {
          display: flex;
          justify-content: space-between;
          align-items: center;
          margin-bottom: 20px;
          border-bottom: 1px solid rgba(255,255,255,0.06);
          padding-bottom: 16px;
        }
        .vrp-grid {
          display: grid;
          grid-template-columns: 1fr 400px;
          gap: 24px;
          align-items: start;
        }
        @media (max-width: 1100px) {
          .vrp-grid {
            grid-template-columns: 1fr;
          }
        }
        .panel-card {
          background: rgba(20, 20, 30, 0.6);
          backdrop-filter: blur(12px);
          border: 1px solid rgba(255,255,255,0.06);
          border-radius: 12px;
          padding: 20px;
          margin-bottom: 20px;
        }
        .panel-title {
          font-size: 1.05rem;
          font-weight: 700;
          color: #38bdf8;
          display: flex;
          align-items: center;
          gap: 8px;
          margin-top: 0;
          margin-bottom: 16px;
          text-transform: uppercase;
          letter-spacing: 0.5px;
        }
        .log-terminal {
          background: #050508;
          border: 1px solid rgba(255,255,255,0.08);
          border-radius: 8px;
          padding: 12px;
          font-family: 'Courier New', Courier, monospace;
          font-size: 0.76rem;
          color: #34d399;
          height: 180px;
          overflow-y: auto;
          white-space: pre-wrap;
          line-height: 1.4;
          box-shadow: inset 0 2px 8px rgba(0,0,0,0.8);
        }
        .btn-toggle {
          background: rgba(255,255,255,0.04);
          border: 1px solid rgba(255,255,255,0.08);
          color: #94a3b8;
          padding: 8px 16px;
          border-radius: 20px;
          cursor: pointer;
          font-weight: 600;
          font-size: 0.85rem;
          transition: all 0.25s ease;
        }
        .btn-toggle.active {
          background: rgba(56, 189, 248, 0.15);
          border-color: #38bdf8;
          color: #38bdf8;
          box-shadow: 0 0 10px rgba(56, 189, 248, 0.2);
        }
        .btn-toggle:hover:not(.active) {
          background: rgba(255,255,255,0.08);
          color: #f1f5f9;
        }
        .eta-meter {
          height: 8px;
          background: rgba(255,255,255,0.06);
          border-radius: 4px;
          overflow: hidden;
          margin-top: 6px;
        }
        .eta-segment {
          height: 100%;
          float: left;
          transition: width 0.3s ease;
        }
        .eta-tag {
          font-size: 0.72rem;
          font-weight: 700;
          padding: 2px 6px;
          border-radius: 4px;
          text-transform: uppercase;
        }
        .road-row {
          display: flex;
          justify-content: space-between;
          align-items: center;
          padding: 8px 0;
          border-bottom: 1px solid rgba(255,255,255,0.03);
          font-size: 0.84rem;
        }
        .select-traffic {
          background: #14141e;
          border: 1px solid rgba(255,255,255,0.1);
          color: #f1f5f9;
          font-size: 0.78rem;
          padding: 4px 8px;
          border-radius: 4px;
          outline: none;
          cursor: pointer;
        }
        .badge-surge {
          background: rgba(239, 68, 68, 0.1);
          border: 1px solid rgba(239, 68, 68, 0.2);
          color: #ef4444;
          padding: 4px 8px;
          border-radius: 12px;
          font-size: 0.72rem;
          font-weight: 700;
        }
        .spin {
          animation: spin 1s linear infinite;
        }
        @keyframes spin {
          from { transform: rotate(0deg); }
          to { transform: rotate(360deg); }
        }
        .legend-indicator {
          width: 10px;
          height: 10px;
          border-radius: 50%;
          display: inline-block;
        }
      `}</style>

      <div className="vrp-container">
        <div className="vrp-header">
          <div>
            <h1 style={{ fontSize: '1.6rem', fontWeight: 800, margin: 0, display: 'flex', alignItems: 'center', gap: '8px' }}>
              <Compass className="spin" style={{ color: '#38bdf8' }} size={28} /> VRP Dispatch Control Room
            </h1>
            <p style={{ color: '#94a3b8', fontSize: '0.85rem', margin: '4px 0 0 0' }}>
              Dynamic Vehicle Routing Problem (VRP) optimization engine simulation under live constraints.
            </p>
          </div>
          <button 
            disabled={updating}
            onClick={() => handleVRPAction({ action: 'reset' })} 
            className="btn-toggle"
            style={{ display: 'flex', alignItems: 'center', gap: '6px' }}
          >
            <RotateCcw size={14} /> RESET DISPATCH
          </button>
        </div>

        <div className="vrp-grid">
          {/* Map & logs */}
          <div className="main-viewport">
            {/* Interactive Leaflet Map Wrapper */}
            <div 
              style={{ 
                height: '460px', 
                border: '1px solid rgba(255,255,255,0.08)', 
                borderRadius: '12px', 
                overflow: 'hidden', 
                position: 'relative',
                marginBottom: '24px'
              }}
            >
              <div 
                ref={mapRef} 
                style={{ 
                  width: '100%', 
                  height: '100%',
                  zIndex: 1, 
                  visibility: leafletLoaded ? 'visible' : 'hidden' 
                }} 
              />
              {!leafletLoaded && (
                <div style={{ position: 'absolute', inset: 0, display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center', background: '#14141e', gap: '8px', zIndex: 5 }}>
                  <Loader size={24} className="spin" style={{ color: '#38bdf8' }} />
                  <span style={{ fontSize: '0.8rem', fontWeight: 600 }}>Loading map layers...</span>
                </div>
              )}
              {updating && (
                <div style={{ position: 'absolute', top: '16px', right: '16px', zIndex: 10, background: 'rgba(10, 10, 15, 0.85)', backdropFilter: 'blur(4px)', padding: '6px 12px', borderRadius: '20px', fontSize: '0.72rem', fontWeight: 700, border: '1px solid #38bdf8', color: '#38bdf8', display: 'flex', alignItems: 'center', gap: '6px' }}>
                  <Activity size={12} className="spin" /> RE-ROUTING LIVE EXECUTION...
                </div>
              )}
            </div>

            {/* Pathfinding Logs terminal console */}
            <div className="panel-card" style={{ marginBottom: 0 }}>
              <div className="panel-title">
                <Activity size={16} /> VRP Step-by-Step Path Relaxation Console
              </div>
              <div className="log-terminal">
                {data.logs && data.logs.map((log, idx) => (
                  <div key={idx} style={{ color: log.startsWith("===") ? '#38bdf8' : (log.startsWith("  - Skip") ? '#f87171' : '#34d399') }}>
                    {log}
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Configuration panel sidebars */}
          <div className="sidebar-panels">
            {/* Global Dispatch Constraints */}
            <div className="panel-card">
              <div className="panel-title">
                <Sliders size={16} /> Global Simulation Parameters
              </div>
              
              {/* Algorithm choice */}
              <div style={{ marginBottom: '16px' }}>
                <span style={{ fontSize: '0.78rem', color: '#94a3b8', display: 'block', marginBottom: '6px', fontWeight: 600 }}>Pathfinding Optimizer Engine</span>
                <div style={{ display: 'flex', gap: '8px' }}>
                  <button 
                    onClick={() => handleVRPAction({ action: 'toggleAStar', useAStar: true })} 
                    className={`btn-toggle ${data.useAStar ? 'active' : ''}`}
                    style={{ flex: 1 }}
                  >
                    A* (Admissible Heuristic)
                  </button>
                  <button 
                    onClick={() => handleVRPAction({ action: 'toggleAStar', useAStar: false })} 
                    className={`btn-toggle ${!data.useAStar ? 'active' : ''}`}
                    style={{ flex: 1 }}
                  >
                    Dijkstra's (Standard)
                  </button>
                </div>
              </div>

              {/* Weather Surges */}
              <div style={{ marginBottom: '16px' }}>
                <span style={{ fontSize: '0.78rem', color: '#94a3b8', display: 'block', marginBottom: '6px', fontWeight: 600 }}>Weather Condition Surge triggers</span>
                <div style={{ display: 'flex', gap: '6px' }}>
                  {['Sunny', 'Rainy', 'Stormy'].map(w => (
                    <button 
                      key={w}
                      onClick={() => handleVRPAction({ action: 'updateWeather', weather: w })} 
                      className={`btn-toggle ${data.weather === w ? 'active' : ''}`}
                      style={{ flex: 1, padding: '6px 8px', fontSize: '0.8rem' }}
                    >
                      {w === 'Sunny' && <Sun size={12} style={{ display: 'inline', marginRight: '4px' }} />}
                      {w !== 'Sunny' && <CloudRain size={12} style={{ display: 'inline', marginRight: '4px' }} />}
                      {w}
                    </button>
                  ))}
                </div>
              </div>

              {/* Multi-Order Perishable sequencing */}
              <div style={{ marginBottom: '8px' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                  <div>
                    <span style={{ fontSize: '0.82rem', fontWeight: 700, display: 'block' }}>Perishable Dispatch sequence (LIFO)</span>
                    <span style={{ fontSize: '0.7rem', color: '#94a3b8' }}>Deliver hot dishes last-in, first-out to save fresh heat.</span>
                  </div>
                  <input 
                    type="checkbox" 
                    checked={data.perishableLifo}
                    onChange={(e) => handleVRPAction({ action: 'togglePerishable', perishableLifo: e.target.checked })}
                    style={{ scale: '1.2', cursor: 'pointer', accentColor: '#38bdf8' }}
                  />
                </div>
                
                <div style={{ background: 'rgba(255,255,255,0.03)', border: '1px solid rgba(255,255,255,0.05)', borderRadius: '6px', padding: '8px 10px', marginTop: '12px', fontSize: '0.76rem', display: 'flex', alignItems: 'center', gap: '6px' }}>
                  <span style={{ color: '#94a3b8' }}>Calculated Batch sequence:</span>
                  <strong style={{ color: '#34d399' }}>
                    ZingBite Kitchen <ChevronRight size={10} style={{ display: 'inline' }} /> {data.sequence && data.sequence.join(' -> ')}
                  </strong>
                </div>
              </div>
            </div>

            {/* Predictive ETA breakdown */}
            <div className="panel-card">
              <div className="panel-title">
                <BarChart3 size={16} /> ML-Powered Predictive ETA Breakdowns
              </div>

              {data.predictiveETAs && Object.entries(data.predictiveETAs).map(([cust, eta]) => {
                const total = eta.total;
                const base = eta.baseTravel;
                const traffic = eta.trafficDelay;
                const weatherD = eta.weatherDelay;
                const prep = eta.prepWait;
                const nav = eta.navOffset;

                // Percent widths for stacked bar meter
                const pctBase = (base / total) * 100;
                const pctTraffic = (traffic / total) * 100;
                const pctWeather = (weatherD / total) * 100;
                const pctPrep = (prep / total) * 100;
                const pctNav = (nav / total) * 100;

                return (
                  <div key={cust} style={{ marginBottom: '18px', borderBottom: '1px solid rgba(255,255,255,0.04)', paddingBottom: '14px' }}>
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '4px' }}>
                      <span style={{ fontSize: '0.85rem', fontWeight: 700 }}>{cust} {cust === 'Customer B' ? '(High-Rise)' : '(Home)'}</span>
                      <strong style={{ fontSize: '1rem', color: '#34d399' }}>{total} Mins</strong>
                    </div>

                    {/* Stacked bar graph representing the components */}
                    <div className="eta-meter">
                      <div className="eta-segment" style={{ width: `${pctBase}%`, background: '#38bdf8' }} title={`Base travel time: ${base} mins`} />
                      <div className="eta-segment" style={{ width: `${pctTraffic}%`, background: '#f59e0b' }} title={`Traffic delay: ${traffic} mins`} />
                      <div className="eta-segment" style={{ width: `${pctWeather}%`, background: '#ef4444' }} title={`Weather overhead: ${weatherD} mins`} />
                      <div className="eta-segment" style={{ width: `${pctPrep}%`, background: '#a855f7' }} title={`Kitchen preparation delay: ${prep} mins`} />
                      <div className="eta-segment" style={{ width: `${pctNav}%`, background: '#ec4899' }} title={`Apartment navigation offset: ${nav} mins`} />
                    </div>

                    <div style={{ display: 'flex', flexWrap: 'wrap', gap: '8px 12px', marginTop: '8px', fontSize: '0.68rem', color: '#94a3b8' }}>
                      <span><span className="legend-indicator" style={{ background: '#38bdf8' }} /> Travel: {base}m</span>
                      <span><span className="legend-indicator" style={{ background: '#f59e0b' }} /> Traffic: +{traffic}m</span>
                      {weatherD > 0 && <span><span className="legend-indicator" style={{ background: '#ef4444' }} /> Weather: +{weatherD}m</span>}
                      {prep > 0 && <span><span className="legend-indicator" style={{ background: '#a855f7' }} /> Prep Wait: +{prep}m</span>}
                      <span><span className="legend-indicator" style={{ background: '#ec4899' }} /> Nav Offset: +{nav}m</span>
                    </div>
                  </div>
                );
              })}
            </div>

            {/* Traffic & Road Closure Controller */}
            <div className="panel-card" style={{ marginBottom: 0 }}>
              <div className="panel-title" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <span style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                  <MapPin size={16} /> Live Road Network Controller
                </span>
                {data.weather !== 'Sunny' && (
                  <span className="badge-surge">Surge Active</span>
                )}
              </div>
              <p style={{ fontSize: '0.72rem', color: '#94a3b8', marginTop: '-10px', marginBottom: '14px' }}>
                Simulate traffic bottlenecks or construction blockages. The VRP engine dynamically re-routes paths around closures.
              </p>

              <div style={{ maxHeight: '200px', overflowY: 'auto', paddingRight: '4px' }}>
                {[
                  "Rider Pathway", "High Street", "Commercial Lane", "Avenue Row", "Kitchen Alley",
                  "Kitchen Exit Road", "Market Blvd", "Suburban Cross", "Apartment Blvd", "Customer A Lane",
                  "Customer A Way", "Link Highway", "Residential Crescent", "Customer B Lane",
                  "Expressway Bypass", "Sector Link", "Transit Flyover", "Metro Avenue", "Crossroad Street", "Direct Delivery Bypass"
                ].map(road => {
                  // Find current edge settings
                  const edgeMatch = data.edges && data.edges.find(e => e.roadName === road);
                  const activeTraffic = edgeMatch ? edgeMatch.trafficLevel : "Light";
                  const activeBlocked = edgeMatch ? edgeMatch.isBlocked : false;

                  return (
                    <div key={road} className="road-row">
                      <span style={{ fontWeight: 500, fontSize: '0.78rem' }}>{road}</span>
                      <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                        <select 
                          value={activeTraffic} 
                          onChange={(e) => handleVRPAction({ action: 'updateTraffic', roadName: road, trafficLevel: e.target.value, isBlocked: activeBlocked })}
                          className="select-traffic"
                          style={{
                            color: activeTraffic === 'Heavy' ? '#ef4444' : (activeTraffic === 'Moderate' ? '#f59e0b' : '#34d399')
                          }}
                        >
                          <option value="Light">Light</option>
                          <option value="Moderate">Mod</option>
                          <option value="Heavy">Heavy</option>
                        </select>
                        <button 
                          onClick={() => handleVRPAction({ action: 'updateTraffic', roadName: road, trafficLevel: activeTraffic, isBlocked: !activeBlocked })}
                          className="btn-toggle"
                          style={{ 
                            padding: '3px 8px', 
                            fontSize: '0.7rem', 
                            borderRadius: '4px',
                            background: activeBlocked ? 'rgba(239,68,68,0.2)' : 'rgba(255,255,255,0.03)',
                            borderColor: activeBlocked ? '#ef4444' : 'rgba(255,255,255,0.1)',
                            color: activeBlocked ? '#ef4444' : '#94a3b8'
                          }}
                        >
                          {activeBlocked ? 'BLOCKED' : 'BLOCK'}
                        </button>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default VRPDashboard;
