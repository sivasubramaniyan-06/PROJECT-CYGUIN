import React from 'react';
import {
  ShieldAlert,
  ShieldCheck,
  Server,
  Zap,
  Activity,
  ArrowUpRight,
  TrendingUp,
  Sparkles,
  Play,
  Layers,
  Network,
  Cloud,
  Lock,
  ChevronRight,
  Radio
} from 'lucide-react';
import { RouteId } from '../types';
import {
  ORG_METADATA,
  INCIDENTS_DATA,
  AI_RECOMMENDATIONS_DATA,
  THREAT_VELOCITY_DATA,
  AUDIT_TIMELINE_DATA
} from '../data/organizationData';
import { MetricCard } from '../components/common/MetricCard';
import { StatusBadge } from '../components/common/StatusBadge';

interface DashboardViewProps {
  onNavigate: (route: RouteId) => void;
  onSelectIncident?: (incidentId: string) => void;
}

export const DashboardView: React.FC<DashboardViewProps> = ({ onNavigate, onSelectIncident }) => {
  return (
    <div className="view-content">
      {/* Header Row */}
      <div className="view-header-row">
        <div className="view-heading-group">
          <h1 className="view-title">
            <Activity size={24} color="var(--color-primary)" />
            <span>SOC Command Operations Center</span>
            <span className="brand-badge">Mission Critical</span>
          </h1>
          <p className="view-description">
            Continuous threat posture, AI decision intelligence, and attack blast-radius simulation for{' '}
            <strong>{ORG_METADATA.name}</strong>.
          </p>
        </div>
        <div className="view-actions-group">
          <button className="btn-secondary" onClick={() => onNavigate('simulation-lab')}>
            <Play size={14} color="var(--color-secondary)" />
            <span>Run Impact Simulation</span>
          </button>
          <button className="btn-primary" onClick={() => onNavigate('incident-center')}>
            <ShieldAlert size={14} />
            <span>Active Incident Triage (2)</span>
          </button>
        </div>
      </div>

      {/* 1. Executive Security Score Banner */}
      <div className="executive-score-banner">
        <div className="score-left-content">
          <div className="score-circle-gauge">
            <div className="score-inner-cutout">
              <span className="score-number">{ORG_METADATA.overallSecurityScore}</span>
              <span className="score-total">/100</span>
            </div>
          </div>
          <div className="score-info">
            <div className="score-title">
              <span>Enterprise Posture: Tactical Defenses Active</span>
              <span className="score-badge">{ORG_METADATA.scoreDelta} this week</span>
            </div>
            <p className="score-desc">
              ABC Technologies security posture is <strong>14.2% above peer average</strong>. 2 critical lateral attack paths
              are actively contained by Digital Twin pre-simulated micro-segmentation.
            </p>
          </div>
        </div>
        <div className="score-actions">
          <button className="btn-secondary" onClick={() => onNavigate('digital-twin')}>
            <Network size={14} color="var(--color-secondary)" />
            <span>Launch Digital Twin Topology</span>
          </button>
        </div>
      </div>

      {/* 2. Key Metrics Grid (4 Large Executive Cards) */}
      <div className="metrics-grid">
        <MetricCard
          title="Active Critical Threats"
          value="2"
          delta="+1 vs 24h"
          deltaType="negative"
          caption="Target: RDS-FIN-DB (AWS eu-west-1)"
          icon={<ShieldAlert size={18} />}
          iconBg="rgba(255, 77, 87, 0.15)"
          iconColor="var(--color-status-critical)"
          badge="High Priority"
          onClick={() => onNavigate('incident-center')}
        />
        <MetricCard
          title="Monitored Entities"
          value="135 / 135"
          delta="100% Sentinel Stream"
          deltaType="positive"
          caption="120 Endpoints • 15 Prod Servers"
          icon={<Server size={18} />}
          iconBg="rgba(21, 232, 138, 0.15)"
          iconColor="var(--color-status-healthy)"
          onClick={() => onNavigate('assets')}
        />
        <MetricCard
          title="Threats Mitigated (24h)"
          value="123"
          delta="+18.4%"
          deltaType="positive"
          caption="AI Twin Auto-Containment"
          icon={<ShieldCheck size={18} />}
          iconBg="rgba(45, 124, 255, 0.15)"
          iconColor="var(--color-primary)"
        />
        <MetricCard
          title="Pre-Simulated Decisions"
          value="18"
          delta="99.4% Confidence"
          deltaType="neutral"
          caption="Zero Unplanned Downtime"
          icon={<Zap size={18} />}
          iconBg="rgba(0, 229, 255, 0.15)"
          iconColor="var(--color-secondary)"
          onClick={() => onNavigate('simulation-lab')}
        />
      </div>

      {/* 3. Threat Trends & Velocity vs Organization Risk */}
      <div className="dashboard-grid-2col">
        {/* Threat Trends Chart Card */}
        <div className="glass-card">
          <div className="card-header-bar">
            <div className="card-header-title">
              <TrendingUp size={16} color="var(--color-primary)" />
              <span>Threat Velocity & Auto-Mitigation Stream (24h)</span>
            </div>
            <div className="chart-legend-row">
              <div className="legend-item">
                <span className="legend-color-dot" style={{ backgroundColor: 'var(--color-status-critical)' }} />
                <span>Critical</span>
              </div>
              <div className="legend-item">
                <span className="legend-color-dot" style={{ backgroundColor: 'var(--color-status-warning)' }} />
                <span>Medium</span>
              </div>
              <div className="legend-item">
                <span className="legend-color-dot" style={{ backgroundColor: 'var(--color-primary)' }} />
                <span>Mitigated</span>
              </div>
            </div>
          </div>

          <div className="card-body-padded threat-trend-container">
            <div className="trend-bars-chart">
              {THREAT_VELOCITY_DATA.map((point, idx) => (
                <div key={idx} className="trend-bar-group">
                  <div className="bar-stack-column">
                    <div
                      className="bar-segment"
                      style={{
                        height: `${point.mitigated * 3.2}px`,
                        backgroundColor: 'var(--color-primary)',
                        boxShadow: '0 0 8px rgba(45, 124, 255, 0.4)'
                      }}
                      title={`${point.mitigated} Auto-Mitigated`}
                    />
                    <div
                      className="bar-segment"
                      style={{
                        height: `${point.medium * 5.5}px`,
                        backgroundColor: 'var(--color-status-warning)',
                        boxShadow: '0 0 8px rgba(255, 200, 61, 0.4)'
                      }}
                      title={`${point.medium} Medium Risk`}
                    />
                    <div
                      className="bar-segment"
                      style={{
                        height: `${point.critical * 14}px`,
                        backgroundColor: 'var(--color-status-critical)',
                        boxShadow: '0 0 10px rgba(255, 77, 87, 0.5)'
                      }}
                      title={`${point.critical} Critical Incidents`}
                    />
                  </div>
                  <span className="trend-bar-label">{point.time}</span>
                </div>
              ))}
            </div>
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', fontSize: '11px', color: 'var(--color-text-muted)' }}>
              <span>Telemetry Ingestion: <strong style={{ color: '#ffffff' }}>1,480,290 events/sec</strong></span>
              <span>Memory Twin Anomaly Delta: <strong style={{ color: 'var(--color-status-healthy)' }}>-4.2%</strong></span>
            </div>
          </div>
        </div>

        {/* Organization Risk Breakdown Card */}
        <div className="glass-card">
          <div className="card-header-bar">
            <div className="card-header-title">
              <Layers size={16} color="var(--color-secondary)" />
              <span>Organization Risk Surface</span>
            </div>
            <button className="btn-ghost" onClick={() => onNavigate('digital-twin')}>
              <span>Topology</span>
              <ChevronRight size={12} />
            </button>
          </div>

          <div className="card-body-padded">
            <div className="risk-matrix-list">
              <div className="risk-matrix-item">
                <div className="risk-item-header">
                  <span className="risk-item-name">
                    <Cloud size={14} color="var(--color-tertiary)" />
                    AWS Cloud VPCs (us-east-1, eu-west-1)
                  </span>
                  <span className="risk-item-score" style={{ color: 'var(--color-status-critical)' }}>
                    78% High Exposure
                  </span>
                </div>
                <div className="risk-progress-track">
                  <div
                    className="risk-progress-fill"
                    style={{ width: '78%', backgroundColor: 'var(--color-status-critical)' }}
                  />
                </div>
              </div>

              <div className="risk-matrix-item">
                <div className="risk-item-header">
                  <span className="risk-item-name">
                    <Server size={14} color="var(--color-primary)" />
                    Production Servers (15 nodes)
                  </span>
                  <span className="risk-item-score" style={{ color: 'var(--color-status-warning)' }}>
                    42% Moderate
                  </span>
                </div>
                <div className="risk-progress-track">
                  <div
                    className="risk-progress-fill"
                    style={{ width: '42%', backgroundColor: 'var(--color-status-warning)' }}
                  />
                </div>
              </div>

              <div className="risk-matrix-item">
                <div className="risk-item-header">
                  <span className="risk-item-name">
                    <Lock size={14} color="var(--color-secondary)" />
                    Employee Endpoints (120 nodes)
                  </span>
                  <span className="risk-item-score" style={{ color: 'var(--color-status-healthy)' }}>
                    18% Secured
                  </span>
                </div>
                <div className="risk-progress-track">
                  <div
                    className="risk-progress-fill"
                    style={{ width: '18%', backgroundColor: 'var(--color-status-healthy)' }}
                  />
                </div>
              </div>

              <div className="risk-matrix-item">
                <div className="risk-item-header">
                  <span className="risk-item-name">
                    <Activity size={14} color="var(--color-status-healthy)" />
                    Finance DB & HR SaaS Connectors
                  </span>
                  <span className="risk-item-score" style={{ color: 'var(--color-status-critical)' }}>
                    89% Targeted
                  </span>
                </div>
                <div className="risk-progress-track">
                  <div
                    className="risk-progress-fill"
                    style={{ width: '89%', backgroundColor: 'var(--color-status-critical)' }}
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* 4. Active Critical Incidents & AI Recommendations */}
      <div className="dashboard-grid-equal">
        {/* Critical Alerts Priority Queue */}
        <div className="glass-card">
          <div className="card-header-bar">
            <div className="card-header-title">
              <ShieldAlert size={16} color="var(--color-status-critical)" />
              <span>Active Critical Incidents Awaiting Triage</span>
            </div>
            <button className="btn-ghost" onClick={() => onNavigate('incident-center')}>
              <span>View All</span>
              <ChevronRight size={12} />
            </button>
          </div>

          <div className="incident-table-wrapper">
            <table className="incident-table">
              <thead>
                <tr>
                  <th>Incident & Target</th>
                  <th>Severity</th>
                  <th>Kill Chain</th>
                  <th>SLA</th>
                  <th>Action</th>
                </tr>
              </thead>
              <tbody>
                {INCIDENTS_DATA.slice(0, 3).map((inc) => (
                  <tr
                    key={inc.id}
                    className="incident-row"
                    onClick={() => {
                      if (onSelectIncident) onSelectIncident(inc.id);
                      onNavigate('incident-center');
                    }}
                  >
                    <td>
                      <div className="incident-title-cell">
                        <span>{inc.title}</span>
                        <span className="incident-subtext">{inc.targetEntity} • {inc.mitreTechnique}</span>
                      </div>
                    </td>
                    <td>
                      <StatusBadge status={inc.severity} />
                    </td>
                    <td>
                      <span style={{ fontSize: '11px', fontFamily: 'var(--font-mono)' }}>
                        {inc.killChainStage}
                      </span>
                    </td>
                    <td>
                      <span style={{ fontSize: '11px', color: 'var(--color-status-critical)', fontWeight: 700 }}>
                        {inc.slaMinutesRemaining}m left
                      </span>
                    </td>
                    <td>
                      <button
                        className="btn-ghost"
                        style={{ color: 'var(--color-secondary)', fontSize: '11px' }}
                      >
                        <ArrowUpRight size={13} />
                        <span>Triage</span>
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* AI Recommendations Stream */}
        <div className="glass-card">
          <div className="card-header-bar">
            <div className="card-header-title">
              <Sparkles size={16} color="var(--color-secondary)" />
              <span>AI Decision Recommendations (Pre-Simulated)</span>
            </div>
            <button className="btn-ghost" onClick={() => onNavigate('ai-copilot')}>
              <span>Ask Copilot</span>
              <ChevronRight size={12} />
            </button>
          </div>

          <div className="card-body-padded ai-recommendation-list">
            {AI_RECOMMENDATIONS_DATA.map((rec) => (
              <div key={rec.id} className="ai-rec-card">
                <div className="ai-rec-header">
                  <div className="ai-rec-tag">
                    <Sparkles size={12} />
                    <span>{rec.category}</span>
                  </div>
                  <span className="ai-rec-confidence">{rec.confidence}% Confidence</span>
                </div>
                <div style={{ fontWeight: 700, fontSize: '13px', color: '#ffffff' }}>
                  {rec.title}
                </div>
                <p className="ai-rec-content">{rec.description}</p>
                <div className="ai-rec-footer">
                  <span className="ai-rec-target">Impact: {rec.riskReductionDelta}</span>
                  <button
                    className="ai-rec-action-btn"
                    onClick={() => onNavigate('simulation-lab')}
                  >
                    <Play size={10} />
                    <span>Simulate in Sandbox</span>
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* 5. Security Digital Twin Mini-Viewport & Audit Timeline */}
      <div className="dashboard-grid-equal">
        {/* Security Digital Twin Preview Card */}
        <div className="glass-card">
          <div className="card-header-bar">
            <div className="card-header-title">
              <Network size={16} color="var(--color-secondary)" />
              <span>Security Digital Twin: Topology Preview</span>
            </div>
            <button className="btn-ghost" onClick={() => onNavigate('digital-twin')}>
              <span>Full Graph</span>
              <ChevronRight size={12} />
            </button>
          </div>

          <div className="card-body-padded">
            <div
              style={{
                height: '210px',
                borderRadius: 'var(--radius-lg)',
                backgroundColor: '#030406',
                border: '1px solid var(--color-border-subtle)',
                position: 'relative',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-around',
                padding: '20px',
                boxShadow: 'inset 0 0 24px rgba(0, 0, 0, 0.8)'
              }}
            >
              <div className="twin-node-box compromised" onClick={() => onNavigate('digital-twin')}>
                <ShieldAlert size={16} color="var(--color-status-critical)" />
                <div style={{ display: 'flex', flexDirection: 'column' }}>
                  <span style={{ fontSize: '11px', fontWeight: 700 }}>ABC-WS-088</span>
                  <span style={{ fontSize: '9px', color: 'var(--color-status-critical)' }}>Compromised</span>
                </div>
              </div>

              <div style={{ width: '40px', height: '2px', backgroundColor: 'var(--color-status-critical)', position: 'relative', boxShadow: '0 0 8px var(--color-status-critical)' }}>
                <div className="brand-icon-pulse animate-led-critical" style={{ top: '-4px', left: '16px' }} />
              </div>

              <div className="twin-node-box at-risk" onClick={() => onNavigate('digital-twin')}>
                <Server size={16} color="var(--color-status-risk-medium)" />
                <div style={{ display: 'flex', flexDirection: 'column' }}>
                  <span style={{ fontSize: '11px', fontWeight: 700 }}>SRV-AD-01</span>
                  <span style={{ fontSize: '9px', color: 'var(--color-status-warning)' }}>Kerberos Relay</span>
                </div>
              </div>

              <div style={{ width: '40px', height: '2px', backgroundColor: 'var(--color-status-risk-medium)', boxShadow: '0 0 6px var(--color-status-risk-medium)' }} />

              <div className="twin-node-box compromised" onClick={() => onNavigate('digital-twin')}>
                <Lock size={16} color="var(--color-status-critical)" />
                <div style={{ display: 'flex', flexDirection: 'column' }}>
                  <span style={{ fontSize: '11px', fontWeight: 700 }}>RDS-FIN-DB</span>
                  <span style={{ fontSize: '9px', color: 'var(--color-status-critical)' }}>Target Asset</span>
                </div>
              </div>
            </div>
            <div style={{ marginTop: '14px', display: 'flex', justifyContent: 'space-between', fontSize: '11px', color: 'var(--color-text-muted)' }}>
              <span>Blast Radius Calculation: <strong style={{ color: '#ffffff' }}>4 assets in path</strong></span>
              <span style={{ color: 'var(--color-secondary)', fontWeight: 600 }}>Live Attack Vector Mapped</span>
            </div>
          </div>
        </div>

        {/* Real-Time SOC Incident Timeline */}
        <div className="glass-card">
          <div className="card-header-bar">
            <div className="card-header-title">
              <Activity size={16} color="var(--color-primary)" />
              <span>Real-Time SOC Incident Timeline</span>
            </div>
          </div>

          <div className="card-body-padded">
            <div className="activity-timeline">
              {AUDIT_TIMELINE_DATA.map((item) => (
                <div key={item.id} className="timeline-item">
                  <div className={`timeline-dot ${item.type}`} />
                  <div className="timeline-meta">
                    <span className="timeline-time">{item.time}</span>
                    <span>•</span>
                    <strong style={{ color: '#ffffff' }}>{item.title}</strong>
                  </div>
                  <span className="timeline-text">{item.detail}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
