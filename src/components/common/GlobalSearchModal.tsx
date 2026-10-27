import React, { useState, useEffect } from 'react';
import {
  Search,
  X,
  Server,
  ShieldAlert,
  Network,
  FileSpreadsheet,
  ArrowRight,
  Sparkles
} from 'lucide-react';
import { RouteId } from '../../types';
import { ASSETS_DATA, INCIDENTS_DATA } from '../../data/organizationData';

interface GlobalSearchModalProps {
  isOpen: boolean;
  onClose: () => void;
  onNavigate: (route: RouteId) => void;
}

export const GlobalSearchModal: React.FC<GlobalSearchModalProps> = ({
  isOpen,
  onClose,
  onNavigate
}) => {
  const [query, setQuery] = useState('');

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key === 'k') {
        e.preventDefault();
      }
      if (e.key === 'Escape' && isOpen) {
        onClose();
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  const filteredAssets = ASSETS_DATA.filter(
    (a) =>
      a.name.toLowerCase().includes(query.toLowerCase()) ||
      a.ipAddress.toLowerCase().includes(query.toLowerCase())
  ).slice(0, 3);

  const filteredIncidents = INCIDENTS_DATA.filter(
    (i) =>
      i.title.toLowerCase().includes(query.toLowerCase()) ||
      i.id.toLowerCase().includes(query.toLowerCase()) ||
      i.mitreTechnique.toLowerCase().includes(query.toLowerCase())
  ).slice(0, 3);

  return (
    <div
      style={{
        position: 'fixed',
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        backgroundColor: 'rgba(2, 3, 5, 0.85)',
        backdropFilter: 'blur(10px)',
        zIndex: 100,
        display: 'flex',
        alignItems: 'flex-start',
        justifyContent: 'center',
        paddingTop: '12vh'
      }}
      onClick={onClose}
    >
      <div
        style={{
          width: '640px',
          maxWidth: '92vw',
          backgroundColor: '#090c10',
          border: '1px solid var(--color-border-cyan)',
          borderRadius: 'var(--radius-xl)',
          boxShadow: '0 20px 60px rgba(0, 0, 0, 0.9), 0 0 35px rgba(0, 229, 255, 0.15)',
          overflow: 'hidden',
          display: 'flex',
          flexDirection: 'column'
        }}
        onClick={(e) => e.stopPropagation()}
      >
        {/* Search Input Bar */}
        <div
          style={{
            padding: '16px 20px',
            borderBottom: '1px solid var(--color-border-subtle)',
            display: 'flex',
            alignItems: 'center',
            gap: '12px'
          }}
        >
          <Search size={18} color="var(--color-secondary)" />
          <input
            type="text"
            autoFocus
            placeholder="Search across ABC Technologies assets, incidents, CVEs, twin nodes..."
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            style={{
              flex: 1,
              fontSize: '14px',
              color: '#ffffff',
              background: 'transparent',
              border: 'none',
              outline: 'none'
            }}
          />
          <button onClick={onClose} style={{ color: 'var(--color-text-muted)' }}>
            <X size={16} />
          </button>
        </div>

        {/* Results Body */}
        <div style={{ maxHeight: '420px', overflowY: 'auto', padding: '14px 18px', display: 'flex', flexDirection: 'column', gap: '14px' }}>
          {/* Quick Nav Suggestions */}
          {!query && (
            <div style={{ display: 'flex', flexDirection: 'column', gap: '6px' }}>
              <span style={{ fontSize: '10px', fontWeight: 800, color: 'var(--color-text-muted)', textTransform: 'uppercase', letterSpacing: '0.08em', padding: '4px 8px' }}>
                DIRECT MODULE JUMP
              </span>
              <div
                style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '10px 12px', borderRadius: 'var(--radius-md)', cursor: 'pointer' }}
                className="incident-row"
                onClick={() => { onNavigate('digital-twin'); onClose(); }}
              >
                <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                  <Network size={15} color="var(--color-secondary)" />
                  <span style={{ fontSize: '13px', color: '#ffffff', fontWeight: 600 }}>Security Digital Twin Topology</span>
                </div>
                <ArrowRight size={13} color="var(--color-text-muted)" />
              </div>
              <div
                style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '10px 12px', borderRadius: 'var(--radius-md)', cursor: 'pointer' }}
                className="incident-row"
                onClick={() => { onNavigate('simulation-lab'); onClose(); }}
              >
                <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                  <Sparkles size={15} color="var(--color-tertiary)" />
                  <span style={{ fontSize: '13px', color: '#ffffff', fontWeight: 600 }}>Decision Sandbox (What-If Simulation)</span>
                </div>
                <ArrowRight size={13} color="var(--color-text-muted)" />
              </div>
            </div>
          )}

          {/* Incidents Matches */}
          {filteredIncidents.length > 0 && (
            <div style={{ display: 'flex', flexDirection: 'column', gap: '6px' }}>
              <span style={{ fontSize: '10px', fontWeight: 800, color: 'var(--color-text-muted)', textTransform: 'uppercase', letterSpacing: '0.08em', padding: '4px 8px' }}>
                MATCHED THREAT INCIDENTS
              </span>
              {filteredIncidents.map((inc) => (
                <div
                  key={inc.id}
                  style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '10px 12px', borderRadius: 'var(--radius-md)', cursor: 'pointer' }}
                  className="incident-row"
                  onClick={() => { onNavigate('incident-center'); onClose(); }}
                >
                  <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                    <ShieldAlert size={15} color={inc.severity === 'critical' ? 'var(--color-status-critical)' : 'var(--color-status-warning)'} />
                    <div style={{ display: 'flex', flexDirection: 'column' }}>
                      <span style={{ fontSize: '12px', color: '#ffffff', fontWeight: 600 }}>{inc.title}</span>
                      <span style={{ fontSize: '10px', color: 'var(--color-text-muted)', fontFamily: 'var(--font-mono)' }}>
                        {inc.id} • {inc.targetEntity}
                      </span>
                    </div>
                  </div>
                  <ArrowRight size={13} color="var(--color-text-muted)" />
                </div>
              ))}
            </div>
          )}

          {/* Asset Matches */}
          {filteredAssets.length > 0 && (
            <div style={{ display: 'flex', flexDirection: 'column', gap: '6px' }}>
              <span style={{ fontSize: '10px', fontWeight: 800, color: 'var(--color-text-muted)', textTransform: 'uppercase', letterSpacing: '0.08em', padding: '4px 8px' }}>
                MATCHED ASSETS
              </span>
              {filteredAssets.map((asset) => (
                <div
                  key={asset.id}
                  style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '10px 12px', borderRadius: 'var(--radius-md)', cursor: 'pointer' }}
                  className="incident-row"
                  onClick={() => { onNavigate('assets'); onClose(); }}
                >
                  <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                    <Server size={15} color="var(--color-primary)" />
                    <div style={{ display: 'flex', flexDirection: 'column' }}>
                      <span style={{ fontSize: '12px', color: '#ffffff', fontWeight: 600 }}>{asset.name}</span>
                      <span style={{ fontSize: '10px', color: 'var(--color-secondary)', fontFamily: 'var(--font-mono)' }}>
                        {asset.ipAddress} • {asset.location}
                      </span>
                    </div>
                  </div>
                  <ArrowRight size={13} color="var(--color-text-muted)" />
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Footer */}
        <div style={{ padding: '10px 18px', backgroundColor: 'rgba(5, 6, 8, 0.95)', borderTop: '1px solid var(--color-border-subtle)', display: 'flex', alignItems: 'center', justifyContent: 'space-between', fontSize: '11px', color: 'var(--color-text-muted)' }}>
          <span>Navigation: <kbd className="kbd-shortcut">↑</kbd> <kbd className="kbd-shortcut">↓</kbd> to select, <kbd className="kbd-shortcut">Enter</kbd> to jump</span>
          <span>Press <kbd className="kbd-shortcut">ESC</kbd> to close</span>
        </div>
      </div>
    </div>
  );
};
