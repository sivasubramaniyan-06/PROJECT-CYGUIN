import React, { useState } from 'react';
import {
  ShieldAlert,
  Search,
  SlidersHorizontal,
  Play,
  X,
  Zap,
  Radio,
  Tag,
  FileCode,
  Crosshair
} from 'lucide-react';
import { RouteId, Incident } from '../types';
import { INCIDENTS_DATA, ORG_METADATA } from '../data/organizationData';
import { StatusBadge } from '../components/common/StatusBadge';
import { Tabs } from '../components/common/Tabs';

interface IncidentCenterViewProps {
  onNavigate: (route: RouteId) => void;
  selectedIncidentId?: string | null;
}

export const IncidentCenterView: React.FC<IncidentCenterViewProps> = ({
  onNavigate,
  selectedIncidentId
}) => {
  const [activeTab, setActiveTab] = useState('all');
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedIncident, setSelectedIncident] = useState<Incident | null>(
    INCIDENTS_DATA.find((i) => i.id === selectedIncidentId) || INCIDENTS_DATA[0]
  );
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);

  const filterTabs = [
    { id: 'all', label: 'All Incidents', count: INCIDENTS_DATA.length },
    { id: 'critical', label: 'Critical Severity', count: 2 },
    { id: 'medium-risk', label: 'Medium Risk', count: 1 },
    { id: 'contained', label: 'Contained', count: 1 }
  ];

  const filteredIncidents = INCIDENTS_DATA.filter((inc) => {
    if (activeTab === 'critical' && inc.severity !== 'critical') return false;
    if (activeTab === 'medium-risk' && inc.severity !== 'medium-risk') return false;
    if (activeTab === 'contained' && inc.status !== 'contained') return false;

    if (searchQuery.trim()) {
      const q = searchQuery.toLowerCase();
      return (
        inc.id.toLowerCase().includes(q) ||
        inc.title.toLowerCase().includes(q) ||
        inc.targetEntity.toLowerCase().includes(q) ||
        inc.mitreTechnique.toLowerCase().includes(q)
      );
    }
    return true;
  });

  const handleRowClick = (inc: Incident) => {
    setSelectedIncident(inc);
    setIsDrawerOpen(true);
  };

  return (
    <div className="view-content">
      {/* Header Row */}
      <div className="view-header-row">
        <div className="view-heading-group">
          <h1 className="view-title">
            <ShieldAlert size={24} color="var(--color-status-critical)" />
            <span>Incident Center & Attack Triage Queue</span>
            <span className="brand-badge">Automated Blast-Radius Analysis</span>
          </h1>
          <p className="view-description">
            Prioritized cyber threat queue, MITRE ATT&CK correlation, and pre-simulated response actions for{' '}
            <strong>{ORG_METADATA.name}</strong>.
          </p>
        </div>
        <div className="view-actions-group">
          <button className="btn-secondary" onClick={() => onNavigate('simulation-lab')}>
            <Play size={14} color="var(--color-secondary)" />
            <span>Open Decision Sandbox</span>
          </button>
        </div>
      </div>

      {/* Filter and Search Bar */}
      <div
        style={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          flexWrap: 'wrap',
          gap: '14px'
        }}
      >
        <Tabs tabs={filterTabs} activeTab={activeTab} onChange={setActiveTab} />

        <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
          <div
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: '8px',
              padding: '7px 14px',
              backgroundColor: 'rgba(255, 255, 255, 0.03)',
              border: '1px solid var(--color-border-subtle)',
              borderRadius: 'var(--radius-md)',
              width: '300px'
            }}
          >
            <Search size={14} color="var(--color-text-muted)" />
            <input
              type="text"
              placeholder="Filter by ID, target, MITRE..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              style={{ flex: 1, fontSize: '12px', color: '#ffffff' }}
            />
          </div>
          <button className="btn-secondary" style={{ padding: '7px 12px' }}>
            <SlidersHorizontal size={14} />
          </button>
        </div>
      </div>

      {/* Main Incident Table */}
      <div className="glass-card">
        <div className="incident-table-wrapper">
          <table className="incident-table">
            <thead>
              <tr>
                <th>Incident & Description</th>
                <th>Target Resource</th>
                <th>Severity</th>
                <th>Status</th>
                <th>MITRE ATT&CK Technique</th>
                <th>SLA Clock</th>
                <th>Triage Action</th>
              </tr>
            </thead>
            <tbody>
              {filteredIncidents.map((inc) => (
                <tr
                  key={inc.id}
                  className="incident-row"
                  onClick={() => handleRowClick(inc)}
                >
                  <td>
                    <div className="incident-title-cell">
                      <span>{inc.title}</span>
                      <span className="incident-subtext">
                        {inc.id} • {inc.timestamp} • Threat Score {inc.score}/100
                      </span>
                    </div>
                  </td>
                  <td>
                    <span style={{ fontFamily: 'var(--font-mono)', fontSize: '12px', color: '#ffffff', fontWeight: 600 }}>
                      {inc.targetEntity}
                    </span>
                  </td>
                  <td>
                    <StatusBadge status={inc.severity} />
                  </td>
                  <td>
                    <StatusBadge status={inc.status} showDot={false} />
                  </td>
                  <td>
                    <span
                      style={{
                        fontFamily: 'var(--font-mono)',
                        fontSize: '11px',
                        backgroundColor: 'rgba(0, 229, 255, 0.06)',
                        border: '1px solid rgba(0, 229, 255, 0.2)',
                        padding: '2px 8px',
                        borderRadius: '4px',
                        color: 'var(--color-secondary)'
                      }}
                    >
                      {inc.mitreTechnique}
                    </span>
                  </td>
                  <td>
                    <span style={{ fontSize: '11px', color: 'var(--color-status-critical)', fontWeight: 700 }}>
                      {inc.slaMinutesRemaining}m remaining
                    </span>
                  </td>
                  <td>
                    <button
                      className="btn-primary"
                      style={{ padding: '5px 12px', fontSize: '11px' }}
                      onClick={(e) => {
                        e.stopPropagation();
                        handleRowClick(inc);
                      }}
                    >
                      <span>Inspect</span>
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Interactive Slide-Out Incident Drawer */}
      {isDrawerOpen && selectedIncident && (
        <div className="drawer-backdrop" onClick={() => setIsDrawerOpen(false)}>
          <div className="drawer-panel" onClick={(e) => e.stopPropagation()}>
            <div className="drawer-header">
              <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                <span style={{ fontFamily: 'var(--font-mono)', fontSize: '13px', color: 'var(--color-secondary)', fontWeight: 700 }}>
                  {selectedIncident.id}
                </span>
                <StatusBadge status={selectedIncident.severity} />
              </div>
              <button
                onClick={() => setIsDrawerOpen(false)}
                style={{ padding: '6px', color: 'var(--color-text-muted)', display: 'flex' }}
              >
                <X size={18} />
              </button>
            </div>

            <div className="drawer-body">
              <h2 style={{ fontSize: '17px', fontWeight: 800, color: '#ffffff', letterSpacing: '-0.01em' }}>
                {selectedIncident.title}
              </h2>

              {/* Kill Chain Progression */}
              <div className="glass-card" style={{ padding: '16px 18px' }}>
                <div style={{ fontSize: '11px', fontWeight: 800, color: 'var(--color-text-muted)', marginBottom: '10px', textTransform: 'uppercase', letterSpacing: '0.06em' }}>
                  CYBER KILL CHAIN PROGRESSION
                </div>
                <div className="killchain-timeline">
                  {['Initial Access', 'Execution', 'Persistence', 'Lateral Movement', 'Exfiltration'].map((stage, sIdx) => {
                    const isCurrent = stage === selectedIncident.killChainStage;
                    const isPast = sIdx < 3;
                    return (
                      <div
                        key={stage}
                        className={`killchain-step ${isCurrent ? 'active' : isPast ? 'completed' : ''}`}
                      >
                        <div className="killchain-step-dot">{sIdx + 1}</div>
                        <span>{stage}</span>
                      </div>
                    );
                  })}
                </div>
              </div>

              {/* Threat Narrative & Root Cause */}
              <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
                <div style={{ fontSize: '11px', fontWeight: 800, color: 'var(--color-text-muted)', textTransform: 'uppercase', letterSpacing: '0.06em' }}>
                  THREAT DESCRIPTION & ROOT CAUSE
                </div>
                <div style={{ padding: '14px', backgroundColor: 'rgba(255, 255, 255, 0.02)', border: '1px solid var(--color-border-subtle)', borderRadius: 'var(--radius-md)', fontSize: '12px', lineHeight: 1.55 }}>
                  {selectedIncident.description}
                </div>
                <div style={{ padding: '14px', backgroundColor: 'rgba(255, 77, 87, 0.08)', border: '1px solid rgba(255, 77, 87, 0.25)', borderRadius: 'var(--radius-md)', fontSize: '12px', color: '#ffb3b3', lineHeight: 1.55 }}>
                  <strong>Root Cause:</strong> {selectedIncident.rootCause}
                </div>
              </div>

              {/* Impacted Assets */}
              <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
                <div style={{ fontSize: '11px', fontWeight: 800, color: 'var(--color-text-muted)', textTransform: 'uppercase', letterSpacing: '0.06em' }}>
                  IMPACTED ASSETS ({selectedIncident.affectedAssets.length})
                </div>
                <div style={{ display: 'flex', flexWrap: 'wrap', gap: '8px' }}>
                  {selectedIncident.affectedAssets.map((asset, aIdx) => (
                    <span
                      key={aIdx}
                      style={{
                        padding: '5px 10px',
                        backgroundColor: 'rgba(255, 255, 255, 0.04)',
                        border: '1px solid var(--color-border-subtle)',
                        borderRadius: 'var(--radius-sm)',
                        fontFamily: 'var(--font-mono)',
                        fontSize: '11px',
                        color: 'var(--color-text-primary)'
                      }}
                    >
                      {asset}
                    </span>
                  ))}
                </div>
              </div>

              {/* Recommended Action */}
              <div
                style={{
                  padding: '16px',
                  backgroundColor: 'rgba(45, 124, 255, 0.12)',
                  border: '1px solid rgba(45, 124, 255, 0.3)',
                  borderRadius: 'var(--radius-md)',
                  display: 'flex',
                  flexDirection: 'column',
                  gap: '8px',
                  boxShadow: '0 4px 16px rgba(0, 0, 0, 0.4)'
                }}
              >
                <div style={{ display: 'flex', alignItems: 'center', gap: '8px', color: 'var(--color-secondary)', fontSize: '12px', fontWeight: 700 }}>
                  <Zap size={15} />
                  <span>AI DECISION INTELLIGENCE RECOMMENDATION</span>
                </div>
                <p style={{ fontSize: '12px', color: '#ffffff', lineHeight: 1.5 }}>
                  {selectedIncident.recommendedAction}
                </p>
              </div>
            </div>

            <div className="drawer-footer">
              <button
                className="btn-secondary"
                onClick={() => {
                  setIsDrawerOpen(false);
                  onNavigate('digital-twin');
                }}
              >
                <Radio size={13} color="var(--color-secondary)" />
                <span>View in Digital Twin</span>
              </button>
              <button
                className="btn-primary"
                onClick={() => {
                  setIsDrawerOpen(false);
                  onNavigate('simulation-lab');
                }}
              >
                <Play size={13} />
                <span>Simulate Containment</span>
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
