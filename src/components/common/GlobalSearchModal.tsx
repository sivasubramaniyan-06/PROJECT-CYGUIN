import React, { useState, useEffect } from 'react';
import {
  Search,
  ShieldAlert,
  Server,
  Network,
  Cpu,
  FileText,
  Sliders,
  Sparkles,
  X,
  ArrowRight
} from 'lucide-react';
import { RouteId } from '../../types';

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
        if (isOpen) onClose();
      }
      if (e.key === 'Escape' && isOpen) {
        onClose();
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  const quickItems = [
    {
      id: 'dash',
      title: 'SOC Command Center Overview',
      subtitle: 'Executive Security Posture (84/100) & Critical Alerts',
      icon: <Cpu size={16} color="var(--color-primary)" />,
      route: 'dashboard' as RouteId,
      badge: 'Route'
    },
    {
      id: 'inc-1',
      title: 'INC-2026-8902: Kerberoasting toward Finance DB',
      subtitle: 'Active Critical Incident on AWS RDS eu-west-1',
      icon: <ShieldAlert size={16} color="var(--color-status-critical)" />,
      route: 'incident-center' as RouteId,
      badge: 'Critical Incident'
    },
    {
      id: 'twin',
      title: 'Security Digital Twin: Topology Map',
      subtitle: 'ABC Technologies IT Infrastructure Graph (135 nodes)',
      icon: <Network size={16} color="var(--color-secondary)" />,
      route: 'digital-twin' as RouteId,
      badge: 'Twin Engine'
    },
    {
      id: 'ast-fin',
      title: 'Asset: RDS-FIN-DB (10.200.20.5)',
      subtitle: 'PostgreSQL 16 Enterprise Cluster - Finance Operations',
      icon: <Server size={16} color="var(--color-status-risk-medium)" />,
      route: 'assets' as RouteId,
      badge: 'Asset'
    },
    {
      id: 'copilot',
      title: 'AI Copilot: Investigate Attack Vectors',
      subtitle: 'Natural language SOC decision assistance',
      icon: <Sparkles size={16} color="var(--color-secondary)" />,
      route: 'ai-copilot' as RouteId,
      badge: 'AI Intelligence'
    },
    {
      id: 'sim',
      title: 'Simulation Lab: Pre-Deployment Sandbox',
      subtitle: 'Test firewall rule isolation & business downtime',
      icon: <Sliders size={16} color="var(--color-tertiary)" />,
      route: 'simulation-lab' as RouteId,
      badge: 'Simulation'
    },
    {
      id: 'rep',
      title: 'Compliance Reports: SOC 2 & ISO 27001',
      subtitle: 'Audit-ready security matrices for ABC Technologies',
      icon: <FileText size={16} color="var(--color-status-healthy)" />,
      route: 'reports' as RouteId,
      badge: 'Reports'
    }
  ];

  const filtered = query.trim()
    ? quickItems.filter(
        (item) =>
          item.title.toLowerCase().includes(query.toLowerCase()) ||
          item.subtitle.toLowerCase().includes(query.toLowerCase())
      )
    : quickItems;

  return (
    <div
      style={{
        position: 'fixed',
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        backgroundColor: 'rgba(4, 6, 10, 0.75)',
        backdropFilter: 'blur(8px)',
        zIndex: 100,
        display: 'flex',
        alignItems: 'flex-start',
        justifyContent: 'center',
        paddingTop: '12vh',
        animation: 'slide-down-fade 0.2s ease-out'
      }}
      onClick={onClose}
    >
      <div
        style={{
          width: '640px',
          maxWidth: '92vw',
          backgroundColor: 'var(--color-surface-panel)',
          border: '1px solid var(--color-border-medium)',
          borderRadius: 'var(--radius-xl)',
          boxShadow: '0 25px 50px -12px rgba(0, 0, 0, 0.8), 0 0 0 1px rgba(255, 255, 255, 0.1)',
          overflow: 'hidden'
        }}
        onClick={(e) => e.stopPropagation()}
      >
        {/* Search Input Box */}
        <div
          style={{
            padding: '14px 18px',
            borderBottom: '1px solid var(--color-border-subtle)',
            display: 'flex',
            alignItems: 'center',
            gap: '12px'
          }}
        >
          <Search size={18} color="var(--color-secondary)" />
          <input
            type="text"
            placeholder="Search assets, incidents, CVEs, twin nodes, simulations..."
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            autoFocus
            style={{
              flex: 1,
              fontSize: '14px',
              color: '#ffffff'
            }}
          />
          <button
            onClick={onClose}
            style={{
              color: 'var(--color-text-muted)',
              display: 'flex',
              alignItems: 'center',
              padding: '4px'
            }}
          >
            <X size={16} />
          </button>
        </div>

        {/* Results List */}
        <div
          style={{
            maxHeight: '380px',
            overflowY: 'auto',
            padding: '8px'
          }}
        >
          <div
            style={{
              padding: '6px 12px',
              fontSize: '10px',
              fontWeight: 700,
              color: 'var(--color-text-dim)',
              letterSpacing: '0.08em',
              textTransform: 'uppercase'
            }}
          >
            {query ? 'Search Results' : 'Suggested Omnibar Quick Jumps'}
          </div>

          {filtered.length === 0 ? (
            <div
              style={{
                padding: '32px 16px',
                textAlign: 'center',
                color: 'var(--color-text-muted)',
                fontSize: '13px'
              }}
            >
              No matching cybersecurity records found for &ldquo;{query}&rdquo;.
            </div>
          ) : (
            filtered.map((item) => (
              <div
                key={item.id}
                onClick={() => {
                  onNavigate(item.route);
                  onClose();
                }}
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'space-between',
                  padding: '10px 14px',
                  borderRadius: 'var(--radius-md)',
                  cursor: 'pointer',
                  transition: 'all var(--transition-fast)',
                  gap: '12px'
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.backgroundColor = 'var(--color-surface-hover)';
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.backgroundColor = 'transparent';
                }}
              >
                <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                  <div
                    style={{
                      width: '30px',
                      height: '30px',
                      borderRadius: 'var(--radius-sm)',
                      backgroundColor: 'rgba(255, 255, 255, 0.04)',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center'
                    }}
                  >
                    {item.icon}
                  </div>
                  <div style={{ display: 'flex', flexDirection: 'column', gap: '2px' }}>
                    <span style={{ fontSize: '13px', fontWeight: 600, color: 'var(--color-text-primary)' }}>
                      {item.title}
                    </span>
                    <span style={{ fontSize: '11px', color: 'var(--color-text-muted)' }}>
                      {item.subtitle}
                    </span>
                  </div>
                </div>
                <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                  <span
                    style={{
                      fontSize: '10px',
                      padding: '2px 6px',
                      borderRadius: '4px',
                      backgroundColor: 'rgba(255, 255, 255, 0.06)',
                      color: 'var(--color-text-secondary)'
                    }}
                  >
                    {item.badge}
                  </span>
                  <ArrowRight size={14} color="var(--color-text-dim)" />
                </div>
              </div>
            ))
          )}
        </div>

        {/* Footer info */}
        <div
          style={{
            padding: '10px 18px',
            borderTop: '1px solid var(--color-border-subtle)',
            backgroundColor: 'rgba(10, 16, 27, 0.6)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            fontSize: '11px',
            color: 'var(--color-text-muted)'
          }}
        >
          <span>Organization: <strong>ABC Technologies Pvt Ltd</strong></span>
          <div style={{ display: 'flex', gap: '8px' }}>
            <span><kbd className="kbd-shortcut">ESC</kbd> to exit</span>
            <span><kbd className="kbd-shortcut">↵</kbd> to select</span>
          </div>
        </div>
      </div>
    </div>
  );
};
