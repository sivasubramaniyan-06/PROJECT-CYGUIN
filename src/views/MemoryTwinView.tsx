import React from 'react';
import {
  BrainCircuit,
  History,
  TrendingDown,
  Sparkles,
  Database,
  ShieldCheck,
  CheckCircle2,
  RefreshCw,
  Share2,
  Network,
  Cpu,
  Layers
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
            <BrainCircuit size={24} color="var(--color-secondary)" />
            <span>Memory Twin: Neural Knowledge Graph & Threat Learning</span>
            <span className="brand-badge">Persistent Memory v2.4</span>
          </h1>
          <p className="view-description">
            Longitudinal AI memory engine learning adversary TTPs, enterprise behavioral baselines, and past incident
            patterns for <strong>{ORG_METADATA.name}</strong>.
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
          icon={<History size={18} />}
          iconBg="rgba(0, 229, 255, 0.15)"
          iconColor="var(--color-secondary)"
        />
        <MetricCard
          title="Behavioral False Positives"
          value="1.2%"
          delta="-4.6% vs Q1"
          deltaType="positive"
          caption="Continuous Baseline Refinement"
          icon={<TrendingDown size={18} />}
          iconBg="rgba(21, 232, 138, 0.15)"
          iconColor="var(--color-status-healthy)"
        />
        <MetricCard
          title="Learned Auto-Remediations"
          value="42"
          delta="100% Zero-Breakage"
          deltaType="positive"
          caption="Rules Synthesized by Memory Twin"
          icon={<ShieldCheck size={18} />}
          iconBg="rgba(45, 124, 255, 0.15)"
          iconColor="var(--color-primary)"
        />
        <MetricCard
          title="Entity Baseline Nodes"
          value="135 / 135"
          delta="Fully Calibrated"
          deltaType="neutral"
          caption="250 Users • 15 Servers • AWS Cloud"
          icon={<Database size={18} />}
          iconBg="rgba(56, 189, 248, 0.15)"
          iconColor="var(--color-tertiary)"
        />
      </div>

      {/* Neural Network Cluster Visualization Banner */}
      <div className="glass-card" style={{ padding: '24px' }}>
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '16px' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
            <Share2 size={16} color="var(--color-secondary)" />
            <h3 style={{ fontSize: '14px', fontWeight: 700, color: '#ffffff' }}>
              Neural Memory Knowledge Clusters
            </h3>
          </div>
          <span style={{ fontSize: '11px', color: 'var(--color-text-muted)', fontFamily: 'var(--font-mono)' }}>
            Model: CYGUIN-Neural-Memory-Engine-v2.4
          </span>
        </div>

        <div
          style={{
            height: '140px',
            backgroundColor: '#030406',
            borderRadius: 'var(--radius-lg)',
            border: '1px solid var(--color-border-subtle)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-around',
            padding: '16px',
            position: 'relative',
            overflow: 'hidden'
          }}
        >
          <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '6px', zIndex: 2 }}>
            <div style={{ width: '40px', height: '40px', borderRadius: '9999px', backgroundColor: 'rgba(255, 77, 87, 0.15)', border: '1px solid var(--color-status-critical)', display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'var(--color-status-critical)', boxShadow: '0 0 16px rgba(255, 77, 87, 0.3)' }}>
              <Cpu size={18} />
            </div>
            <span style={{ fontSize: '11px', fontWeight: 700, color: '#ffffff' }}>Kerberos Probes</span>
            <span style={{ fontSize: '9px', color: 'var(--color-text-muted)' }}>420 Vectors</span>
          </div>

          <div style={{ width: '60px', height: '1px', backgroundColor: 'rgba(0, 229, 255, 0.3)' }} />

          <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '6px', zIndex: 2 }}>
            <div style={{ width: '48px', height: '48px', borderRadius: '9999px', backgroundColor: 'rgba(0, 229, 255, 0.15)', border: '1.5px solid var(--color-secondary)', display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'var(--color-secondary)', boxShadow: '0 0 20px rgba(0, 229, 255, 0.4)' }}>
              <BrainCircuit size={22} className="animate-pulse-subtle" />
            </div>
            <span style={{ fontSize: '11px', fontWeight: 800, color: 'var(--color-secondary)' }}>Core Knowledge Core</span>
            <span style={{ fontSize: '9px', color: 'var(--color-text-muted)' }}>1,420 Memories</span>
          </div>

          <div style={{ width: '60px', height: '1px', backgroundColor: 'rgba(0, 229, 255, 0.3)' }} />

          <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '6px', zIndex: 2 }}>
            <div style={{ width: '40px', height: '40px', borderRadius: '9999px', backgroundColor: 'rgba(21, 232, 138, 0.15)', border: '1px solid var(--color-status-healthy)', display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'var(--color-status-healthy)', boxShadow: '0 0 16px rgba(21, 232, 138, 0.3)' }}>
              <ShieldCheck size={18} />
            </div>
            <span style={{ fontSize: '11px', fontWeight: 700, color: '#ffffff' }}>Auto-Defense Rules</span>
            <span style={{ fontSize: '9px', color: 'var(--color-text-muted)' }}>42 Active Policies</span>
          </div>
        </div>
      </div>

      {/* Historical Pattern Analysis List */}
      <div className="glass-card">
        <div className="card-header-bar">
          <div className="card-header-title">
            <BrainCircuit size={16} color="var(--color-secondary)" />
            <span>Learned Adversary Patterns & Threat Memories</span>
          </div>
        </div>

        <div className="card-body-padded" style={{ display: 'flex', flexDirection: 'column', gap: '18px' }}>
          {memoryPatterns.map((pat) => (
            <div
              key={pat.id}
              style={{
                padding: '18px 22px',
                backgroundColor: 'rgba(255, 255, 255, 0.015)',
                border: '1px solid var(--color-border-subtle)',
                borderRadius: 'var(--radius-lg)',
                display: 'flex',
                flexDirection: 'column',
                gap: '12px',
                boxShadow: '0 4px 16px rgba(0, 0, 0, 0.4)'
              }}
            >
              <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                  <span style={{ fontFamily: 'var(--font-mono)', fontSize: '11px', color: 'var(--color-secondary)' }}>
                    {pat.id}
                  </span>
                  <h3 style={{ fontSize: '15px', fontWeight: 700, color: '#ffffff' }}>
                    {pat.title}
                  </h3>
                </div>
                <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                  <span style={{ fontSize: '11px', color: 'var(--color-text-muted)' }}>
                    {pat.frequency}
                  </span>
                  <span
                    style={{
                      fontSize: '10px',
                      fontWeight: 700,
                      padding: '2px 8px',
                      borderRadius: '4px',
                      backgroundColor: 'rgba(0, 229, 255, 0.12)',
                      color: 'var(--color-secondary)',
                      border: '1px solid rgba(0, 229, 255, 0.25)',
                      boxShadow: '0 0 8px rgba(0, 229, 255, 0.15)'
                    }}
                  >
                    {pat.confidence}
                  </span>
                </div>
              </div>

              <div style={{ fontSize: '12px', color: 'var(--color-text-secondary)' }}>
                <strong style={{ color: '#ffffff' }}>Observed Vector:</strong> {pat.vector}
              </div>

              <div
                style={{
                  padding: '12px 16px',
                  backgroundColor: 'rgba(21, 232, 138, 0.06)',
                  border: '1px solid rgba(21, 232, 138, 0.2)',
                  borderRadius: 'var(--radius-md)',
                  display: 'flex',
                  alignItems: 'center',
                  gap: '10px',
                  fontSize: '12px',
                  color: '#a7f3d0'
                }}
              >
                <CheckCircle2 size={16} color="var(--color-status-healthy)" />
                <span>
                  <strong>Automated Memory Action:</strong> {pat.remediation}
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
