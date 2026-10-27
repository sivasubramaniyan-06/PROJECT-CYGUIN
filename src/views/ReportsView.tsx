import React from 'react';
import {
  FileSpreadsheet,
  Download,
  ShieldCheck,
  CheckCircle2,
  Calendar,
  Layers,
  Sparkles,
  TrendingUp,
  FileText
} from 'lucide-react';
import { RouteId } from '../types';
import { ORG_METADATA } from '../data/organizationData';
import { MetricCard } from '../components/common/MetricCard';

interface ReportsViewProps {
  onNavigate: (route: RouteId) => void;
}

export const ReportsView: React.FC<ReportsViewProps> = ({ onNavigate }) => {
  const complianceFrameworks = [
    {
      name: 'SOC 2 Type II (Security & Availability)',
      score: 98.2,
      status: 'Compliant',
      passingControls: '118/120 Controls Passing',
      lastAudit: 'Aug 28, 2026',
      color: 'var(--color-status-healthy)'
    },
    {
      name: 'ISO / IEC 27001:2022 ISMS',
      score: 94.6,
      status: 'Compliant',
      passingControls: '91/93 Controls Passing',
      lastAudit: 'Aug 15, 2026',
      color: 'var(--color-status-healthy)'
    },
    {
      name: 'NIST Cybersecurity Framework (CSF v2.0)',
      score: 89.0,
      status: 'Elevated Posture',
      passingControls: 'Tier 3 (Repeatable)',
      lastAudit: 'Aug 01, 2026',
      color: 'var(--color-secondary)'
    },
    {
      name: 'GDPR / Data Privacy Protection',
      score: 96.5,
      status: 'Audited',
      passingControls: 'All Financial DB Encryption Passing',
      lastAudit: 'Jul 20, 2026',
      color: 'var(--color-primary)'
    }
  ];

  return (
    <div className="view-content">
      {/* Header Row */}
      <div className="view-header-row">
        <div className="view-heading-group">
          <h1 className="view-title">
            <FileSpreadsheet size={24} color="var(--color-secondary)" />
            <span>Compliance Posture & Executive Reports</span>
            <span className="brand-badge">Audit Ready</span>
          </h1>
          <p className="view-description">
            Continuous compliance mapping, SOC maturity assessment, and board-level risk reports for{' '}
            <strong>{ORG_METADATA.name}</strong>.
          </p>
        </div>
        <div className="view-actions-group">
          <button
            className="btn-primary"
            onClick={() => alert('Generating Board Executive Security Briefing PDF for ABC Technologies Pvt Ltd...')}
          >
            <Download size={14} />
            <span>Export Executive PDF</span>
          </button>
        </div>
      </div>

      {/* Compliance Gauges */}
      <div className="metrics-grid">
        <MetricCard
          title="SOC 2 Type II Posture"
          value="98.2%"
          delta="+2.4% vs Q1"
          deltaType="positive"
          caption="118/120 Passing Controls"
          icon={<ShieldCheck size={18} />}
          iconBg="rgba(21, 232, 138, 0.15)"
          iconColor="var(--color-status-healthy)"
        />
        <MetricCard
          title="ISO 27001:2022"
          value="94.6%"
          delta="Certified"
          deltaType="positive"
          caption="Zero Non-Conformances"
          icon={<FileText size={18} />}
          iconBg="rgba(0, 229, 255, 0.15)"
          iconColor="var(--color-secondary)"
        />
        <MetricCard
          title="NIST CSF v2.0 Maturity"
          value="Tier 3"
          delta="Repeatable & Adaptive"
          deltaType="neutral"
          caption="Continuous Threat Simulation"
          icon={<Layers size={18} />}
          iconBg="rgba(45, 124, 255, 0.15)"
          iconColor="var(--color-primary)"
        />
        <MetricCard
          title="Executive Risk Score"
          value="84 / 100"
          delta="+4 pts this week"
          deltaType="positive"
          caption="Peer Benchmark: Top 10%"
          icon={<TrendingUp size={18} />}
          iconBg="rgba(56, 189, 248, 0.15)"
          iconColor="var(--color-tertiary)"
        />
      </div>

      {/* Compliance Frameworks Detailed Matrix */}
      <div className="glass-card">
        <div className="card-header-bar">
          <div className="card-header-title">
            <ShieldCheck size={16} color="var(--color-status-healthy)" />
            <span>Continuous Compliance Control Evaluation</span>
          </div>
        </div>

        <div className="card-body-padded" style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
          {complianceFrameworks.map((cf, idx) => (
            <div
              key={idx}
              style={{
                padding: '18px 22px',
                backgroundColor: 'rgba(255, 255, 255, 0.015)',
                border: '1px solid var(--color-border-subtle)',
                borderRadius: 'var(--radius-lg)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-between',
                flexWrap: 'wrap',
                gap: '16px'
              }}
            >
              <div style={{ display: 'flex', alignItems: 'center', gap: '14px' }}>
                <div
                  style={{
                    width: '46px',
                    height: '46px',
                    borderRadius: 'var(--radius-md)',
                    backgroundColor: 'rgba(255, 255, 255, 0.03)',
                    border: '1px solid var(--color-border-subtle)',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    fontSize: '14px',
                    fontWeight: 800,
                    fontFamily: 'var(--font-mono)',
                    color: cf.color
                  }}
                >
                  {cf.score}%
                </div>
                <div style={{ display: 'flex', flexDirection: 'column' }}>
                  <h3 style={{ fontSize: '14px', fontWeight: 700, color: '#ffffff' }}>{cf.name}</h3>
                  <span style={{ fontSize: '11px', color: 'var(--color-text-muted)' }}>
                    {cf.passingControls} • Last Audit: {cf.lastAudit}
                  </span>
                </div>
              </div>

              <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                <span
                  style={{
                    fontSize: '11px',
                    fontWeight: 700,
                    padding: '3px 10px',
                    borderRadius: 'var(--radius-full)',
                    backgroundColor: 'rgba(21, 232, 138, 0.1)',
                    color: 'var(--color-status-healthy)',
                    border: '1px solid rgba(21, 232, 138, 0.25)'
                  }}
                >
                  {cf.status}
                </span>
                <button
                  className="btn-secondary"
                  style={{ padding: '6px 12px', fontSize: '11px' }}
                  onClick={() => alert(`Exporting audit dossier for ${cf.name}...`)}
                >
                  <Download size={12} />
                  <span>Audit Dossier</span>
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
