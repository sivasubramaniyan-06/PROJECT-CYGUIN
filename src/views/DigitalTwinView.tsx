import React, { useState } from 'react';
import {
  Network,
  Server,
  Cloud,
  Lock,
  ShieldAlert,
  ShieldCheck,
  Zap,
  Play,
  RotateCw,
  ZoomIn,
  ZoomOut,
  Maximize2,
  Radio,
  Sparkles,
  Layers,
  Activity
} from 'lucide-react';
import { RouteId } from '../types';
import { ORG_METADATA } from '../data/organizationData';
import { StatusBadge } from '../components/common/StatusBadge';

interface DigitalTwinViewProps {
  onNavigate: (route: RouteId) => void;
}

export const DigitalTwinView: React.FC<DigitalTwinViewProps> = ({ onNavigate }) => {
  const [selectedNode, setSelectedNode] = useState<{
    id: string;
    name: string;
    type: string;
    status: 'critical' | 'warning' | 'healthy' | 'medium-risk';
    ip: string;
    riskScore: number;
    blastRadius: string;
    details: string;
  } | null>({
    id: 'AST-001',
    name: 'RDS-FIN-DB (PostgreSQL 16)',
    type: 'Database Cluster',
    status: 'critical',
    ip: '10.200.20.5',
    riskScore: 94,
    blastRadius: 'Finance Subnet (4 dependent systems, 250 payroll records)',
    details: 'Target of active Kerberoasting relay from internal host ABC-WS-088.'
  });

  const topologyNodes = [
    {
      id: 'NODE-CLOUD',
      name: 'AWS Cloud VPC (eu-west-1)',
      type: 'Cloud Subnet',
      status: 'critical' as const,
      ip: '10.200.20.0/24',
      riskScore: 91,
      blastRadius: 'AWS EKS + RDS Cluster',
      details: 'VPC Peering gateway active with DMZ edge.',
      x: '68%',
      y: '30%',
      icon: <Cloud size={18} color="var(--color-status-critical)" />
    },
    {
      id: 'NODE-DB',
      name: 'RDS-FIN-DB',
      type: 'Database',
      status: 'critical' as const,
      ip: '10.200.20.5',
      riskScore: 94,
      blastRadius: 'High Impact (Crown Jewel)',
      details: 'PostgreSQL instance containing sensitive financial ledger data.',
      x: '82%',
      y: '48%',
      icon: <Lock size={18} color="var(--color-status-critical)" />
    },
    {
      id: 'NODE-AD',
      name: 'SRV-AD-01 (Active Directory)',
      type: 'Core Server',
      status: 'warning' as const,
      ip: '10.200.1.10',
      riskScore: 64,
      blastRadius: 'Domain Controllers (Forest)',
      details: 'Primary Kerberos Key Distribution Center (KDC).',
      x: '46%',
      y: '48%',
      icon: <Server size={18} color="var(--color-status-warning)" />
    },
    {
      id: 'NODE-WS88',
      name: 'ABC-WS-088 (Compromised)',
      type: 'Endpoint',
      status: 'critical' as const,
      ip: '10.200.4.88',
      riskScore: 92,
      blastRadius: 'Internal Finance VLAN',
      details: 'Employee laptop infected via phishing link; active Kerberoast ticket request.',
      x: '16%',
      y: '58%',
      icon: <ShieldAlert size={18} color="var(--color-status-critical)" />
    },
    {
      id: 'NODE-VPN',
      name: 'ABC-VPN-GW01',
      type: 'Edge Gateway',
      status: 'medium-risk' as const,
      ip: '172.16.0.1',
      riskScore: 72,
      blastRadius: '45 Remote Sessions',
      details: 'GlobalProtect IPsec tunnel terminator.',
      x: '28%',
      y: '22%',
      icon: <Network size={18} color="var(--color-status-risk-medium)" />
    },
    {
      id: 'NODE-HR',
      name: 'SRV-HR-APP01',
      type: 'Server',
      status: 'healthy' as const,
      ip: '10.200.10.12',
      riskScore: 18,
      blastRadius: 'Internal HR VLAN',
      details: 'Workday HR Integration Portal running healthy.',
      x: '52%',
      y: '78%',
      icon: <ShieldCheck size={18} color="var(--color-status-healthy)" />
    }
  ];

  return (
    <div className="view-content">
      {/* Header Row */}
      <div className="view-header-row">
        <div className="view-heading-group">
          <h1 className="view-title">
            <Network size={24} color="var(--color-secondary)" />
            <span>Security Digital Twin: Cyber Topology Engine</span>
            <span className="brand-badge">Live Attack Graph</span>
          </h1>
          <p className="view-description">
            Real-time digital replica of <strong>{ORG_METADATA.name}</strong> IT infrastructure, live packet traces, and
            attack blast-radius vectors.
          </p>
        </div>
        <div className="view-actions-group">
          <button className="btn-secondary">
            <RotateCw size={14} />
            <span>Recalculate Blast Radius</span>
          </button>
          <button className="btn-primary" onClick={() => onNavigate('simulation-lab')}>
            <Play size={14} />
            <span>Simulate Node Isolation</span>
          </button>
        </div>
      </div>

      {/* Main Canvas & Inspection Layout */}
      <div style={{ display: 'grid', gridTemplateColumns: '1fr 380px', gap: '22px' }}>
        {/* Topology Visualizer Canvas (Hero) */}
        <div className="twin-canvas-container">
          <div className="twin-grid-overlay" />

          {/* SVG Connection Lines Overlay with Animated Packet Flow */}
          <svg
            style={{
              position: 'absolute',
              top: 0,
              left: 0,
              width: '100%',
              height: '100%',
              pointerEvents: 'none'
            }}
          >
            <defs>
              <linearGradient id="attackGrad" x1="0%" y1="0%" x2="100%" y2="0%">
                <stop offset="0%" stopColor="#ff4d57" stopOpacity="0.9" />
                <stop offset="100%" stopColor="#ff7d3b" stopOpacity="0.9" />
              </linearGradient>
              <filter id="laserGlow" x="-20%" y="-20%" width="140%" height="140%">
                <feGaussianBlur stdDeviation="3" result="blur" />
                <feMerge>
                  <feMergeNode in="blur" />
                  <feMergeNode in="SourceGraphic" />
                </feMerge>
              </filter>
            </defs>

            {/* Inactive Structural Edges */}
            <line x1="28%" y1="22%" x2="46%" y2="48%" stroke="rgba(255, 255, 255, 0.12)" strokeWidth="1.5" />
            <line x1="68%" y1="30%" x2="82%" y2="48%" stroke="rgba(0, 229, 255, 0.25)" strokeWidth="1.5" strokeDasharray="4 4" />
            <line x1="46%" y1="48%" x2="52%" y2="78%" stroke="rgba(21, 232, 138, 0.25)" strokeWidth="1.5" />

            {/* Active Attack Path 1: WS-088 -> SRV-AD-01 */}
            <line
              x1="16%"
              y1="58%"
              x2="46%"
              y2="48%"
              stroke="url(#attackGrad)"
              strokeWidth="2.5"
              filter="url(#laserGlow)"
              className="animate-packet-flow"
            />
            {/* Active Attack Path 2: SRV-AD-01 -> RDS-FIN-DB */}
            <line
              x1="46%"
              y1="48%"
              x2="82%"
              y2="48%"
              stroke="#ff4d57"
              strokeWidth="3"
              filter="url(#laserGlow)"
              className="animate-packet-flow"
            />

            {/* Traveling Packet Circles */}
            <circle r="4" fill="#00e5ff" filter="url(#laserGlow)">
              <animateMotion
                path="M 160 300 L 460 250 L 820 250"
                dur="2.4s"
                repeatCount="indefinite"
              />
            </circle>
          </svg>

          {/* Interactive Topology Nodes */}
          {topologyNodes.map((node) => {
            const isSelected = selectedNode?.id === node.id;
            return (
              <div
                key={node.id}
                className={`twin-node-box ${node.status}`}
                style={{
                  position: 'absolute',
                  left: node.x,
                  top: node.y,
                  transform: isSelected ? 'scale(1.08) translateY(-4px)' : 'scale(1)',
                  borderColor: isSelected ? 'var(--color-secondary)' : undefined,
                  boxShadow: isSelected ? '0 0 25px rgba(0, 229, 255, 0.45)' : undefined
                }}
                onClick={() => setSelectedNode(node)}
              >
                {node.icon}
                <div style={{ display: 'flex', flexDirection: 'column' }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
                    <span style={{ fontSize: '12px', fontWeight: 800, color: '#ffffff' }}>
                      {node.name}
                    </span>
                    <span
                      style={{
                        width: '6px',
                        height: '6px',
                        borderRadius: '9999px',
                        backgroundColor:
                          node.status === 'critical'
                            ? 'var(--color-status-critical)'
                            : node.status === 'warning'
                            ? 'var(--color-status-warning)'
                            : 'var(--color-status-healthy)'
                      }}
                      className={node.status === 'critical' ? 'animate-led-critical' : 'animate-led-healthy'}
                    />
                  </div>
                  <span style={{ fontSize: '10px', color: 'var(--color-text-muted)', fontFamily: 'var(--font-mono)' }}>
                    {node.ip}
                  </span>
                </div>
              </div>
            );
          })}

          {/* Canvas Controls Bar at bottom-left */}
          <div
            style={{
              position: 'absolute',
              bottom: '18px',
              left: '18px',
              display: 'flex',
              gap: '6px',
              backgroundColor: 'rgba(9, 12, 16, 0.95)',
              padding: '6px',
              borderRadius: 'var(--radius-md)',
              border: '1px solid var(--color-border-medium)',
              boxShadow: '0 4px 16px rgba(0, 0, 0, 0.6)'
            }}
          >
            <button className="btn-ghost" style={{ padding: '6px' }} title="Zoom In">
              <ZoomIn size={14} />
            </button>
            <button className="btn-ghost" style={{ padding: '6px' }} title="Zoom Out">
              <ZoomOut size={14} />
            </button>
            <button className="btn-ghost" style={{ padding: '6px' }} title="Reset Perspective">
              <Maximize2 size={14} />
            </button>
          </div>

          {/* Live Attack Vector HUD Badge at top-right */}
          <div
            style={{
              position: 'absolute',
              top: '18px',
              right: '18px',
              backgroundColor: 'rgba(13, 18, 24, 0.92)',
              backdropFilter: 'blur(12px)',
              padding: '12px 16px',
              borderRadius: 'var(--radius-md)',
              border: '1px solid var(--color-border-critical)',
              boxShadow: '0 8px 24px rgba(255, 77, 87, 0.15)',
              display: 'flex',
              flexDirection: 'column',
              gap: '6px',
              fontSize: '11px'
            }}
          >
            <div style={{ fontWeight: 700, color: '#ffffff', display: 'flex', alignItems: 'center', gap: '8px' }}>
              <span className="telemetry-indicator-dot animate-led-critical" style={{ backgroundColor: 'var(--color-status-critical)' }} />
              <span>LIVE ATTACK VECTOR MAPPED</span>
            </div>
            <span style={{ color: 'var(--color-text-secondary)', fontSize: '11px', fontFamily: 'var(--font-mono)' }}>
              ABC-WS-088 &rarr; SRV-AD-01 &rarr; RDS-FIN-DB
            </span>
          </div>
        </div>

        {/* Selected Node Inspection Drawer */}
        <div className="glass-card" style={{ padding: '24px', display: 'flex', flexDirection: 'column', gap: '18px' }}>
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
            <span style={{ fontSize: '12px', fontWeight: 800, color: 'var(--color-text-muted)', letterSpacing: '0.08em', textTransform: 'uppercase' }}>
              NODE TELEMETRY INSPECTOR
            </span>
            {selectedNode && <StatusBadge status={selectedNode.status} />}
          </div>

          {selectedNode ? (
            <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
              <div>
                <h3 style={{ fontSize: '16px', fontWeight: 800, color: '#ffffff', letterSpacing: '-0.01em' }}>
                  {selectedNode.name}
                </h3>
                <span style={{ fontSize: '11px', color: 'var(--color-secondary)', fontFamily: 'var(--font-mono)' }}>
                  {selectedNode.ip} • {selectedNode.type}
                </span>
              </div>

              <div
                style={{
                  padding: '12px 14px',
                  backgroundColor: 'rgba(255, 255, 255, 0.02)',
                  border: '1px solid var(--color-border-subtle)',
                  borderRadius: 'var(--radius-md)',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'space-between'
                }}
              >
                <span style={{ fontSize: '12px', color: 'var(--color-text-secondary)' }}>
                  Twin Risk Index:
                </span>
                <span
                  style={{
                    fontFamily: 'var(--font-mono)',
                    fontSize: '16px',
                    fontWeight: 800,
                    color: selectedNode.riskScore > 70 ? 'var(--color-status-critical)' : 'var(--color-status-healthy)'
                  }}
                >
                  {selectedNode.riskScore}/100
                </span>
              </div>

              <div>
                <span style={{ fontSize: '11px', fontWeight: 700, color: 'var(--color-text-muted)', textTransform: 'uppercase', letterSpacing: '0.04em' }}>
                  CALCULATED BLAST RADIUS
                </span>
                <p style={{ fontSize: '12px', color: '#ffffff', marginTop: '4px', lineHeight: 1.5 }}>
                  {selectedNode.blastRadius}
                </p>
              </div>

              <div>
                <span style={{ fontSize: '11px', fontWeight: 700, color: 'var(--color-text-muted)', textTransform: 'uppercase', letterSpacing: '0.04em' }}>
                  TELEMETRY NOTES
                </span>
                <p style={{ fontSize: '12px', color: 'var(--color-text-secondary)', marginTop: '4px', lineHeight: 1.5 }}>
                  {selectedNode.details}
                </p>
              </div>

              <div style={{ marginTop: 'auto', display: 'flex', flexDirection: 'column', gap: '10px' }}>
                <button
                  className="btn-primary"
                  style={{ width: '100%', justifyContent: 'center' }}
                  onClick={() => onNavigate('simulation-lab')}
                >
                  <Zap size={14} />
                  <span>Simulate Quarantine</span>
                </button>
                <button
                  className="btn-secondary"
                  style={{ width: '100%', justifyContent: 'center' }}
                  onClick={() => onNavigate('ai-copilot')}
                >
                  <span>Ask Copilot to Analyze</span>
                </button>
              </div>
            </div>
          ) : (
            <div style={{ color: 'var(--color-text-muted)', fontSize: '12px', textAlign: 'center', padding: '40px 0' }}>
              Click any node on the graph to inspect its digital twin state.
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
