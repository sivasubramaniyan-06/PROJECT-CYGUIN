import React from 'react';
import {
  BrainCircuit,
  History,
  TrendingDown,
  Sparkles,
  Database,
  ShieldCheck,
  CheckCircle2,
  RefreshCw
} from 'lucide-react';
import { RouteId } from '../types';
import { ORG_METADATA } from '../data/organizationData';
import { MetricCard } from '../components/common/MetricCard';

interface MemoryTwinViewProps {
  onNavigate: (route: RouteId) => void;
}

export const MemoryTwinView: React.FC<MemoryTwinViewProps> = ({ onNavigate }) => {
  const memoryPatterns = [
    {
      id: 'MEM-2026-01',
      title: 'Recurring Kerberoasting Probing against Service Accounts',
      frequency: '3 incidents in 60 days',
      confidence: '99.1% High Accuracy',
      vector: 'External Phishing -> Workstation Credential Extraction -> SPN Scan',
      remediation: 'Synthesized memory rule enforces automatic Kerberos ticket revocation after 2 anomalous requests.'
    },
    {
      id: 'MEM-2026-02',
      title: 'AWS Cloud Admin Policy Drift via Non-Terraform Role Creation',
      frequency: '2 occurrences in 90 days',
      confidence: '96.8% Behavioral Fit',
      vector: 'Stolen Dev API Key -> IAM Policy Injection -> Worker Node Escalation',
      remediation: 'Memory Twin monitors CloudTrail drift and auto-flags inline policy deviations.'
    },
    {
      id: 'MEM-2026-03',
      title: 'Weekend Egress Traffic Spikes on VPN Gateway (172.16.0.1)',
      frequency: 'Historical Anomaly Cluster',
      confidence: '94.2% Baseline Match',
      vector: 'Unapproved backup script executing scheduled data transfer without SOC clearance.',
      remediation: 'Baseline threshold adjusted with automated whitelisting for verified scheduled jobs.'
    }
  ];

  return (
    <div className="view-content">
      {/* Header Row */}
      <div className="view-header-row">
        <div className="view-heading-group">
          <h1 className="view-title">
            <BrainCircuit size={22} color="var(--color-secondary)" />
            <span>Memory Twin: Longitudinal Security Intelligence</span>
            <span className="brand-badge">Persistent Knowledge Graph</span>
          </h1>
          <p className="view-description">
            Learns enterprise threat patterns, behavioral baselines, and historical adversary TTPs targeting{' '}
            <strong>{ORG_METADATA.name}</strong>.
          </p>
        </div>
        <div className="view-actions-group">
          <button className="btn-secondary">
            <RefreshCw size={14} />
            <span>Sync Knowledge Graph</span>
          </button>
          <button className="btn-primary" onClick={() => onNavigate('ai-copilot')}>
            <Sparkles size={14} />
            <span>Query Memory Twin</span>
          </button>
        </div>
      </div>

      {/* Memory Twin Metric KPI Cards */}
      <div className="metrics-grid">
        <MetricCard
          title="Indexed Threat Memories"
          value="1,420"
          delta="+84 this month"
          deltaType="positive"
          caption="ABC Technologies Historical Attacks"
          icon={<History size={16} />}
          iconBg="rgba(0, 229, 255, 0.15)"
          iconColor="var(--color-secondary)"
        />
        <MetricCard
          title="Behavioral False Positives"
          value="1.2%"
          delta="-4.6% vs Q1"
          deltaType="positive"
          caption="Continuous Baseline Refinement"
          icon={<TrendingDown size={16} />}
          iconBg="rgba(16, 185, 129, 0.15)"
          iconColor="var(--color-status-healthy)"
        />
        <MetricCard
          title="Learned Auto-Remediations"
          value="42"
          delta="100% Zero-Breakage"
          deltaType="positive"
          caption="Rules Synthesized by Memory Twin"
          icon={<ShieldCheck size={16} />}
          iconBg="rgba(0, 102, 255, 0.15)"
          iconColor="var(--color-primary)"
        />
        <MetricCard
          title="Entity Baseline Nodes"
          value="135 / 135"
          delta="Fully Calibrated"
          deltaType="neutral"
          caption="250 Users • 15 Servers • AWS Cloud"
          icon={<Database size={16} />}
          iconBg="rgba(56, 189, 248, 0.15)"
          iconColor="var(--color-tertiary)"
        />
      </div>

      {/* Historical Pattern Analysis List */}
      <div className="glass-card">
        <div className="card-header-bar">
          <div className="card-header-title">
            <BrainCircuit size={16} color="var(--color-secondary)" />
            <span>Learned Adversary Patterns & Organizational Memory</span>
          </div>
          <span style={{ fontSize: '12px', color: 'var(--color-text-muted)', fontFamily: 'var(--font-mono)' }}>
            Knowledge Engine: CYGUIN-Memory-v2.4
          </span>
        </div>

        <div className="card-body-padded" style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
          {memoryPatterns.map((pat) => (
            <div
              key={pat.id}
              style={{
                padding: '16px 20px',
                backgroundColor: 'rgba(255, 255, 255, 0.02)',
                border: '1px solid var(--color-border-subtle)',
                borderRadius: 'var(--radius-lg)',
                display: 'flex',
                flexDirection: 'column',
                gap: '10px'
              }}
            >
              <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                  <span style={{ fontFamily: 'var(--font-mono)', fontSize: '11px', color: 'var(--color-secondary)' }}>
                    {pat.id}
                  </span>
                  <h3 style={{ fontSize: '14px', fontWeight: 700, color: '#ffffff' }}>
                    {pat.title}
                  </h3>
                </div>
                <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                  <span style={{ fontSize: '11px', color: 'var(--color-text-muted)' }}>
                    {pat.frequency}
                  </span>
                  <span
                    style={{
                      fontSize: '10px',
                      fontWeight: 600,
                      padding: '2px 6px',
                      borderRadius: '4px',
                      backgroundColor: 'rgba(0, 229, 255, 0.12)',
                      color: 'var(--color-secondary)',
                      border: '1px solid rgba(0, 229, 255, 0.25)'
                    }}
                  >
                    {pat.confidence}
                  </span>
                </div>
              </div>

              <div style={{ fontSize: '12px', color: 'var(--color-text-secondary)' }}>
                <strong>Observed Vector:</strong> {pat.vector}
              </div>

              <div
                style={{
                  padding: '10px 14px',
                  backgroundColor: 'rgba(16, 185, 129, 0.06)',
                  border: '1px solid rgba(16, 185, 129, 0.2)',
                  borderRadius: 'var(--radius-md)',
                  display: 'flex',
                  alignItems: 'center',
                  gap: '8px',
                  fontSize: '12px',
                  color: '#a7f3d0'
                }}
              >
                <CheckCircle2 size={15} color="var(--color-status-healthy)" />
                <span>
                  <strong>Automated Defense Action:</strong> {pat.remediation}
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
