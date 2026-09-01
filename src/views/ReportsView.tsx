import React from 'react';
import {
  FileSpreadsheet,
  Download,
  ShieldCheck,
  Award,
  Calendar,
  Layers
} from 'lucide-react';
import { RouteId } from '../types';
import { ORG_METADATA } from '../data/organizationData';
import { MetricCard } from '../components/common/MetricCard';

interface ReportsViewProps {
  onNavigate?: (route: RouteId) => void;
}

export const ReportsView: React.FC<ReportsViewProps> = () => {
  const reportsList = [
    {
      id: 'REP-2026-Q3-EXEC',
      title: 'Executive Board Cybersecurity Posture & Risk Report',
      period: 'Q3 2026 (Aug - Sep)',
      type: 'Executive Briefing',
      score: '84/100 Strong',
      compliance: 'SOC 2 Type II, ISO 27001',
      generatedDate: '2026-09-01'
    },
    {
      id: 'REP-2026-ATTACK-08',
      title: 'MITRE ATT&CK Enterprise Coverage & Gap Analysis',
      period: 'August 2026',
      type: 'Technical Audit',
      score: '91.4% Detection Coverage',
      compliance: 'NIST CSF v2.0',
      generatedDate: '2026-08-28'
    },
    {
      id: 'REP-2026-CLOUD-AWS',
      title: 'AWS Cloud Infrastructure Security & IAM Posture',
      period: 'Active Telemetry',
      type: 'Cloud Compliance',
      score: 'CIS AWS Benchmark Level 2 (88%)',
      compliance: 'CIS Controls v8',
      generatedDate: '2026-08-25'
    }
  ];

  return (
    <div className="view-content">
      {/* Header Row */}
      <div className="view-header-row">
        <div className="view-heading-group">
          <h1 className="view-title">
            <FileSpreadsheet size={22} color="var(--color-status-healthy)" />
            <span>Compliance & Executive Reports</span>
            <span className="brand-badge">Audit-Ready Matrices</span>
          </h1>
          <p className="view-description">
            Standardized cybersecurity posture reporting, SOC 2 / ISO 27001 continuous compliance, and board briefings
            for <strong>{ORG_METADATA.name}</strong>.
          </p>
        </div>
        <div className="view-actions-group">
          <button className="btn-primary" onClick={() => alert('Exporting Executive Report PDF for ABC Technologies Pvt Ltd...')}>
            <Download size={14} />
            <span>Export Executive PDF</span>
          </button>
        </div>
      </div>

      {/* Reports Metrics */}
      <div className="metrics-grid">
        <MetricCard
          title="SOC 2 Type II Controls"
          value="98.2%"
          delta="Passing"
          deltaType="positive"
          caption="112 of 114 Continuous Controls Validated"
          icon={<ShieldCheck size={16} />}
          iconBg="rgba(16, 185, 129, 0.15)"
          iconColor="var(--color-status-healthy)"
        />
        <MetricCard
          title="ISO 27001:2022 Posture"
          value="Conformant"
          delta="Stage 2 Ready"
          deltaType="positive"
          caption="Audited by CYGUIN Sentinel"
          icon={<Award size={16} />}
          iconBg="rgba(0, 102, 255, 0.15)"
          iconColor="var(--color-primary)"
        />
        <MetricCard
          title="NIST CSF v2.0 Score"
          value="3.8 / 4.0"
          delta="Tier 4 Adaptive"
          deltaType="positive"
          caption="Identity & Detection Lead"
          icon={<Layers size={16} />}
          iconBg="rgba(0, 229, 255, 0.15)"
          iconColor="var(--color-secondary)"
        />
      </div>

      {/* Generated Reports Table */}
      <div className="glass-card">
        <div className="card-header-bar">
          <div className="card-header-title">
            <FileSpreadsheet size={16} color="var(--color-status-healthy)" />
            <span>Generated Audit Briefings & Reports</span>
          </div>
        </div>

        <div className="incident-table-wrapper">
          <table className="incident-table">
            <thead>
              <tr>
                <th>Report Title & ID</th>
                <th>Reporting Period</th>
                <th>Framework & Compliance</th>
                <th>Score / Rating</th>
                <th>Generated</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {reportsList.map((rep) => (
                <tr key={rep.id} className="incident-row">
                  <td>
                    <div className="incident-title-cell">
                      <span>{rep.title}</span>
                      <span className="incident-subtext">{rep.id} • {rep.type}</span>
                    </div>
                  </td>
                  <td>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '6px', fontSize: '12px' }}>
                      <Calendar size={12} color="var(--color-text-muted)" />
                      <span>{rep.period}</span>
                    </div>
                  </td>
                  <td>
                    <span style={{ fontSize: '12px', color: 'var(--color-secondary)', fontWeight: 500 }}>
                      {rep.compliance}
                    </span>
                  </td>
                  <td>
                    <span style={{ fontSize: '12px', fontWeight: 600, color: '#ffffff' }}>
                      {rep.score}
                    </span>
                  </td>
                  <td>
                    <span style={{ fontFamily: 'var(--font-mono)', fontSize: '11px', color: 'var(--color-text-muted)' }}>
                      {rep.generatedDate}
                    </span>
                  </td>
                  <td>
                    <button
                      className="btn-secondary"
                      style={{ padding: '4px 10px', fontSize: '11px' }}
                      onClick={() => alert(`Downloading ${rep.title}...`)}
                    >
                      <Download size={12} />
                      <span>Download</span>
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};
