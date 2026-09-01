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
  Maximize2
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
      y: '32%',
      icon: <Cloud size={16} color="var(--color-status-critical)" />
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
      icon: <Lock size={16} color="var(--color-status-critical)" />
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
      x: '48%',
      y: '48%',
      icon: <Server size={16} color="var(--color-status-warning)" />
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
      x: '18%',
      y: '58%',
      icon: <ShieldAlert size={16} color="var(--color-status-critical)" />
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
      x: '30%',
      y: '22%',
      icon: <Network size={16} color="var(--color-status-risk-medium)" />
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
      x: '55%',
      y: '78%',
      icon: <ShieldCheck size={16} color="var(--color-status-healthy)" />
    }
  ];

  return (
    <div className="view-content">
      {/* Header Row */}
      <div className="view-header-row">
        <div className="view-heading-group">
          <h1 className="view-title">
            <Network size={22} color="var(--color-secondary)" />
            <span>Security Digital Twin: Topology Engine</span>
            <span className="brand-badge">Graph Node Sync</span>
          </h1>
          <p className="view-description">
            Real-time digital replica of <strong>{ORG_METADATA.name}</strong> IT infrastructure, live attack vectors, and
            blast-radius calculations.
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
      <div style={{ display: 'grid', gridTemplateColumns: '1fr 360px', gap: '20px' }}>
        {/* Topology Visualizer Canvas */}
        <div className="twin-canvas-container">
          <div className="twin-grid-overlay" />

          {/* SVG Connection Lines Overlay */}
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
            {/* Attack Path: WS-088 -> SRV-AD-01 */}
            <line
              x1="22%"
              y1="58%"
              x2="48%"
              y2="48%"
              stroke="var(--color-status-critical)"
              strokeWidth="2"
              strokeDasharray="6 4"
            />
            {/* Attack Path: SRV-AD-01 -> RDS-FIN-DB */}
            <line
              x1="48%"
              y1="48%"
              x2="82%"
              y2="48%"
              stroke="var(--color-status-critical)"
              strokeWidth="2.5"
            />
            {/* VPN -> AD */}
            <line
              x1="30%"
              y1="22%"
              x2="48%"
              y2="48%"
              stroke="rgba(255, 255, 255, 0.15)"
              strokeWidth="1.5"
            />
            {/* Cloud VPC -> RDS */}
            <line
              x1="68%"
              y1="32%"
              x2="82%"
              y2="48%"
              stroke="rgba(56, 189, 248, 0.3)"
              strokeWidth="1.5"
            />
            {/* AD -> HR */}
            <line
              x1="48%"
              y1="48%"
              x2="55%"
              y2="78%"
              stroke="rgba(16, 185, 129, 0.3)"
              strokeWidth="1.5"
            />
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
                  transform: isSelected ? 'scale(1.08)' : 'scale(1)',
                  borderColor: isSelected ? 'var(--color-secondary)' : undefined
                }}
                onClick={() => setSelectedNode(node)}
              >
                {node.icon}
                <div style={{ display: 'flex', flexDirection: 'column' }}>
                  <span style={{ fontSize: '11px', fontWeight: 700, color: '#ffffff' }}>
                    {node.name}
                  </span>
                  <span style={{ fontSize: '9px', color: 'var(--color-text-muted)', fontFamily: 'var(--font-mono)' }}>
                    {node.ip}
                  </span>
                </div>
              </div>
            );
          })}

          {/* Controls Bar at bottom-left */}
          <div
            style={{
              position: 'absolute',
              bottom: '16px',
              left: '16px',
              display: 'flex',
              gap: '6px',
              backgroundColor: 'rgba(14, 21, 36, 0.9)',
              padding: '4px',
              borderRadius: 'var(--radius-md)',
              border: '1px solid var(--color-border-subtle)'
            }}
          >
            <button className="btn-ghost" style={{ padding: '4px' }}>
              <ZoomIn size={14} />
            </button>
            <button className="btn-ghost" style={{ padding: '4px' }}>
              <ZoomOut size={14} />
            </button>
            <button className="btn-ghost" style={{ padding: '4px' }}>
              <Maximize2 size={14} />
            </button>
          </div>

          {/* Live Attack Vector Legend at top-right */}
          <div
            style={{
              position: 'absolute',
              top: '16px',
              right: '16px',
              backgroundColor: 'rgba(14, 21, 36, 0.9)',
              padding: '10px 14px',
              borderRadius: 'var(--radius-md)',
              border: '1px solid var(--color-border-subtle)',
              display: 'flex',
              flexDirection: 'column',
              gap: '6px',
              fontSize: '11px'
            }}
          >
            <div style={{ fontWeight: 600, color: '#ffffff', display: 'flex', alignItems: 'center', gap: '6px' }}>
              <span className="telemetry-indicator-dot" style={{ backgroundColor: 'var(--color-status-critical)' }} />
              <span>Active Attack Vector Mapped</span>
            </div>
            <span style={{ color: 'var(--color-text-muted)', fontSize: '10px' }}>
              ABC-WS-088 &rarr; SRV-AD-01 &rarr; RDS-FIN-DB
            </span>
          </div>
        </div>

        {/* Selected Node Inspection Drawer */}
        <div className="glass-card" style={{ padding: '20px', display: 'flex', flexDirection: 'column', gap: '16px' }}>
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
            <span style={{ fontSize: '13px', fontWeight: 700, color: 'var(--color-text-primary)' }}>
              NODE INSPECTION
            </span>
            {selectedNode && <StatusBadge status={selectedNode.status} />}
          </div>

          {selectedNode ? (
            <div style={{ display: 'flex', flexDirection: 'column', gap: '14px' }}>
              <div>
                <h3 style={{ fontSize: '15px', fontWeight: 700, color: '#ffffff' }}>
                  {selectedNode.name}
                </h3>
                <span style={{ fontSize: '11px', color: 'var(--color-text-muted)', fontFamily: 'var(--font-mono)' }}>
                  {selectedNode.ip} • {selectedNode.type}
                </span>
              </div>

              <div
                style={{
                  padding: '10px 12px',
                  backgroundColor: 'rgba(255, 255, 255, 0.03)',
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
                    fontSize: '14px',
                    fontWeight: 700,
                    color: selectedNode.riskScore > 70 ? 'var(--color-status-critical)' : 'var(--color-status-healthy)'
                  }}
                >
                  {selectedNode.riskScore}/100
                </span>
              </div>

              <div>
                <span style={{ fontSize: '11px', fontWeight: 600, color: 'var(--color-text-muted)' }}>
                  CALCULATED BLAST RADIUS
                </span>
                <p style={{ fontSize: '12px', color: 'var(--color-text-primary)', marginTop: '4px', lineHeight: 1.4 }}>
                  {selectedNode.blastRadius}
                </p>
              </div>

              <div>
                <span style={{ fontSize: '11px', fontWeight: 600, color: 'var(--color-text-muted)' }}>
                  TELEMETRY NOTES
                </span>
                <p style={{ fontSize: '12px', color: 'var(--color-text-secondary)', marginTop: '4px', lineHeight: 1.4 }}>
                  {selectedNode.details}
                </p>
              </div>

              <div style={{ marginTop: 'auto', display: 'flex', flexDirection: 'column', gap: '8px' }}>
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
