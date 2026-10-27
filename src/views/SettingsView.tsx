import React, { useState } from 'react';
import {
  Settings,
  Shield,
  Save,
  CheckCircle2,
  Database,
  Users,
  Radio,
  Sliders,
  Network,
  Lock
} from 'lucide-react';
import { RouteId } from '../types';
import { ORG_METADATA } from '../data/organizationData';
import { Tabs } from '../components/common/Tabs';

interface SettingsViewProps {
  onNavigate: (route: RouteId) => void;
}

export const SettingsView: React.FC<SettingsViewProps> = ({ onNavigate }) => {
  const [activeTab, setActiveTab] = useState('telemetry');
  const [isSaved, setIsSaved] = useState(false);

  const tabs = [
    { id: 'telemetry', label: 'Telemetry & Ingestion Feeds' },
    { id: 'digital-twin', label: 'Digital Twin Model Parameters' },
    { id: 'rbac', label: 'SOC Operator Roles & RBAC' }
  ];

  const handleSave = () => {
    setIsSaved(true);
    setTimeout(() => setIsSaved(false), 2500);
  };

  return (
    <div className="view-content">
      {/* Header Row */}
      <div className="view-header-row">
        <div className="view-heading-group">
          <h1 className="view-title">
            <Settings size={24} color="var(--color-primary)" />
            <span>SOC Platform & Telemetry Configuration</span>
            <span className="brand-badge">Engine Settings</span>
          </h1>
          <p className="view-description">
            Manage Sentinel ingestion pipelines, Digital Twin synchronization intervals, and analyst privileges for{' '}
            <strong>{ORG_METADATA.name}</strong>.
          </p>
        </div>
        <div className="view-actions-group">
          <button className="btn-primary" onClick={handleSave}>
            {isSaved ? <CheckCircle2 size={14} color="#ffffff" /> : <Save size={14} />}
            <span>{isSaved ? 'Settings Saved!' : 'Save Changes'}</span>
          </button>
        </div>
      </div>

      <Tabs tabs={tabs} activeTab={activeTab} onChange={setActiveTab} />

      {activeTab === 'telemetry' && (
        <div className="glass-card" style={{ padding: '24px', display: 'flex', flexDirection: 'column', gap: '20px' }}>
          <h3 style={{ fontSize: '15px', fontWeight: 800, color: '#ffffff' }}>
            Connected Telemetry & Detection Feeds
          </h3>

          <div style={{ display: 'flex', flexDirection: 'column', gap: '14px' }}>
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '14px', backgroundColor: 'rgba(255, 255, 255, 0.02)', borderRadius: 'var(--radius-md)' }}>
              <div>
                <strong style={{ color: '#ffffff' }}>AWS CloudTrail & GuardDuty Ingestion</strong>
                <p style={{ fontSize: '11px', color: 'var(--color-text-muted)' }}>us-east-1, eu-west-1 VPC Flow Logs & IAM Audit</p>
              </div>
              <span style={{ fontSize: '11px', color: 'var(--color-status-healthy)', fontWeight: 700 }}>Active (1,480 eps)</span>
            </div>

            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '14px', backgroundColor: 'rgba(255, 255, 255, 0.02)', borderRadius: 'var(--radius-md)' }}>
              <div>
                <strong style={{ color: '#ffffff' }}>GlobalProtect VPN Syslog Feed</strong>
                <p style={{ fontSize: '11px', color: 'var(--color-text-muted)' }}>ABC-VPN-GW01 (172.16.0.1) Real-time session telemetry</p>
              </div>
              <span style={{ fontSize: '11px', color: 'var(--color-status-healthy)', fontWeight: 700 }}>Active (12ms latency)</span>
            </div>

            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '14px', backgroundColor: 'rgba(255, 255, 255, 0.02)', borderRadius: 'var(--radius-md)' }}>
              <div>
                <strong style={{ color: '#ffffff' }}>Workstation EDR Sensor Fleet</strong>
                <p style={{ fontSize: '11px', color: 'var(--color-text-muted)' }}>120 Windows 11 / macOS Sequoia endpoints reporting</p>
              </div>
              <span style={{ fontSize: '11px', color: 'var(--color-status-healthy)', fontWeight: 700 }}>100% Coverage (120/120)</span>
            </div>
          </div>
        </div>
      )}

      {activeTab === 'digital-twin' && (
        <div className="glass-card" style={{ padding: '24px', display: 'flex', flexDirection: 'column', gap: '20px' }}>
          <h3 style={{ fontSize: '15px', fontWeight: 800, color: '#ffffff' }}>
            Security Digital Twin & Simulation Tuning
          </h3>

          <div style={{ display: 'flex', flexDirection: 'column', gap: '14px' }}>
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '14px', backgroundColor: 'rgba(255, 255, 255, 0.02)', borderRadius: 'var(--radius-md)' }}>
              <div>
                <strong style={{ color: '#ffffff' }}>Topology Sync Frequency</strong>
                <p style={{ fontSize: '11px', color: 'var(--color-text-muted)' }}>Real-time packet graph continuous update interval</p>
              </div>
              <span style={{ fontSize: '12px', color: 'var(--color-secondary)', fontFamily: 'var(--font-mono)' }}>Continuous (1.5s)</span>
            </div>

            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '14px', backgroundColor: 'rgba(255, 255, 255, 0.02)', borderRadius: 'var(--radius-md)' }}>
              <div>
                <strong style={{ color: '#ffffff' }}>AI Pre-Simulation Sensitivity Threshold</strong>
                <p style={{ fontSize: '11px', color: 'var(--color-text-muted)' }}>Minimum confidence score required for auto-suggested containment</p>
              </div>
              <span style={{ fontSize: '12px', color: 'var(--color-secondary)', fontFamily: 'var(--font-mono)' }}>95.0% Confidence</span>
            </div>
          </div>
        </div>
      )}

      {activeTab === 'rbac' && (
        <div className="glass-card" style={{ padding: '24px', display: 'flex', flexDirection: 'column', gap: '20px' }}>
          <h3 style={{ fontSize: '15px', fontWeight: 800, color: '#ffffff' }}>
            SOC Analyst Roles & Access Control
          </h3>

          <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '14px', backgroundColor: 'rgba(255, 255, 255, 0.02)', borderRadius: 'var(--radius-md)' }}>
              <div>
                <strong style={{ color: '#ffffff' }}>Alex Morgan (You)</strong>
                <p style={{ fontSize: '11px', color: 'var(--color-text-muted)' }}>alex.morgan@abc-technologies.com • Full Simulation & Containment</p>
              </div>
              <span style={{ fontSize: '11px', color: 'var(--color-secondary)', fontWeight: 700 }}>Lead SOC Commander</span>
            </div>

            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '14px', backgroundColor: 'rgba(255, 255, 255, 0.02)', borderRadius: 'var(--radius-md)' }}>
              <div>
                <strong style={{ color: '#ffffff' }}>David Chen</strong>
                <p style={{ fontSize: '11px', color: 'var(--color-text-muted)' }}>david.chen@abc-technologies.com • Triage & Read-only Twin</p>
              </div>
              <span style={{ fontSize: '11px', color: 'var(--color-text-muted)', fontWeight: 600 }}>Tier-1 Security Analyst</span>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
