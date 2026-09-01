import React, { useState } from 'react';
import {
  Settings as SettingsIcon,
  CheckCircle2,
  Save
} from 'lucide-react';
import { RouteId } from '../types';
import { ORG_METADATA } from '../data/organizationData';
import { Tabs } from '../components/common/Tabs';

interface SettingsViewProps {
  onNavigate?: (route: RouteId) => void;
}

export const SettingsView: React.FC<SettingsViewProps> = () => {
  const [activeTab, setActiveTab] = useState('general');
  const [isSaved, setIsSaved] = useState(false);

  const tabs = [
    { id: 'general', label: 'SOC Configuration' },
    { id: 'ingestion', label: 'Telemetry & Ingestion Feeds' },
    { id: 'twins', label: 'Digital & Memory Twin Engine' },
    { id: 'access', label: 'Role-Based Access (RBAC)' }
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
            <SettingsIcon size={22} color="var(--color-text-secondary)" />
            <span>Platform & SOC Settings</span>
            <span className="brand-badge">Enterprise Scope</span>
          </h1>
          <p className="view-description">
            Telemetry pipelines, Digital Twin sync interval, detection sensitivity, and analyst permissions for{' '}
            <strong>{ORG_METADATA.name}</strong>.
          </p>
        </div>
        <div className="view-actions-group">
          <button className="btn-primary" onClick={handleSave}>
            {isSaved ? (
              <>
                <CheckCircle2 size={14} />
                <span>Configuration Saved</span>
              </>
            ) : (
              <>
                <Save size={14} />
                <span>Save Changes</span>
              </>
            )}
          </button>
        </div>
      </div>

      <Tabs tabs={tabs} activeTab={activeTab} onChange={setActiveTab} />

      {activeTab === 'general' && (
        <div style={{ display: 'grid', gridTemplateColumns: '2fr 1fr', gap: '20px' }}>
          <div className="glass-card" style={{ padding: '24px', display: 'flex', flexDirection: 'column', gap: '20px' }}>
            <h3 style={{ fontSize: '15px', fontWeight: 700, color: '#ffffff' }}>
              Target Enterprise Environment
            </h3>

            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '16px' }}>
              <div>
                <label style={{ fontSize: '12px', color: 'var(--color-text-muted)', display: 'block', marginBottom: '6px' }}>
                  Enterprise Name
                </label>
                <input
                  type="text"
                  defaultValue={ORG_METADATA.name}
                  style={{
                    width: '100%',
                    padding: '8px 12px',
                    backgroundColor: 'rgba(255, 255, 255, 0.04)',
                    border: '1px solid var(--color-border-subtle)',
                    borderRadius: 'var(--radius-md)',
                    color: '#ffffff',
                    fontSize: '13px'
                  }}
                />
              </div>

              <div>
                <label style={{ fontSize: '12px', color: 'var(--color-text-muted)', display: 'block', marginBottom: '6px' }}>
                  Total Employee Seat Allocation
                </label>
                <input
                  type="text"
                  defaultValue="250 Employees"
                  style={{
                    width: '100%',
                    padding: '8px 12px',
                    backgroundColor: 'rgba(255, 255, 255, 0.04)',
                    border: '1px solid var(--color-border-subtle)',
                    borderRadius: 'var(--radius-md)',
                    color: '#ffffff',
                    fontSize: '13px'
                  }}
                />
              </div>

              <div>
                <label style={{ fontSize: '12px', color: 'var(--color-text-muted)', display: 'block', marginBottom: '6px' }}>
                  Corporate Subnet (VLAN)
                </label>
                <input
                  type="text"
                  defaultValue="10.200.0.0/16"
                  style={{
                    width: '100%',
                    padding: '8px 12px',
                    backgroundColor: 'rgba(255, 255, 255, 0.04)',
                    border: '1px solid var(--color-border-subtle)',
                    borderRadius: 'var(--radius-md)',
                    color: '#ffffff',
                    fontSize: '13px',
                    fontFamily: 'var(--font-mono)'
                  }}
                />
              </div>

              <div>
                <label style={{ fontSize: '12px', color: 'var(--color-text-muted)', display: 'block', marginBottom: '6px' }}>
                  DMZ Perimeter Network
                </label>
                <input
                  type="text"
                  defaultValue="172.16.0.0/24"
                  style={{
                    width: '100%',
                    padding: '8px 12px',
                    backgroundColor: 'rgba(255, 255, 255, 0.04)',
                    border: '1px solid var(--color-border-subtle)',
                    borderRadius: 'var(--radius-md)',
                    color: '#ffffff',
                    fontSize: '13px',
                    fontFamily: 'var(--font-mono)'
                  }}
                />
              </div>
            </div>

            <div style={{ borderTop: '1px solid var(--color-border-subtle)', paddingTop: '16px' }}>
              <h4 style={{ fontSize: '13px', fontWeight: 600, color: '#ffffff', marginBottom: '8px' }}>
                Sentinel Autonomous Mitigation Policy
              </h4>
              <p style={{ fontSize: '12px', color: 'var(--color-text-secondary)', marginBottom: '12px' }}>
                Enable zero-downtime micro-containment when AI Decision confidence exceeds 95%.
              </p>
              <label style={{ display: 'flex', alignItems: 'center', gap: '8px', cursor: 'pointer', fontSize: '13px' }}>
                <input type="checkbox" defaultChecked style={{ accentColor: 'var(--color-primary)' }} />
                <span>Auto-quarantine compromised endpoints upon verified Kerberoast or Ransomware vector</span>
              </label>
            </div>
          </div>

          <div className="glass-card" style={{ padding: '20px', display: 'flex', flexDirection: 'column', gap: '14px' }}>
            <h4 style={{ fontSize: '13px', fontWeight: 700, color: '#ffffff' }}>
              Sentinel Agent Health
            </h4>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '10px', fontSize: '12px' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                <span style={{ color: 'var(--color-text-muted)' }}>Daemon Version:</span>
                <span style={{ fontFamily: 'var(--font-mono)', color: 'var(--color-secondary)' }}>v2.4.1 Enterprise</span>
              </div>
              <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                <span style={{ color: 'var(--color-text-muted)' }}>Active Ingestion:</span>
                <span style={{ color: 'var(--color-status-healthy)', fontWeight: 600 }}>12ms Latency</span>
              </div>
              <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                <span style={{ color: 'var(--color-text-muted)' }}>Event Throughput:</span>
                <span style={{ fontFamily: 'var(--font-mono)' }}>1.48M events/sec</span>
              </div>
            </div>
          </div>
        </div>
      )}

      {activeTab === 'ingestion' && (
        <div className="glass-card" style={{ padding: '24px', display: 'flex', flexDirection: 'column', gap: '16px' }}>
          <h3 style={{ fontSize: '15px', fontWeight: 700, color: '#ffffff' }}>
            Connected Security Telemetry Sources
          </h3>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
            {[
              { name: 'AWS CloudTrail & VPC Flow Logs (us-east-1, eu-west-1)', status: 'Connected (99.99%)', type: 'Cloud Telemetry' },
              { name: 'Palo Alto GlobalProtect VPN Syslog Stream', status: 'Connected (Live)', type: 'Network Edge' },
              { name: 'Windows Active Directory Domain Controller Event Stream', status: 'Connected (Live)', type: 'Identity & Auth' },
              { name: '120 macOS & Windows Endpoint Sentinel EDR Daemons', status: '120/120 Online', type: 'Endpoint Telemetry' }
            ].map((feed, fIdx) => (
              <div
                key={fIdx}
                style={{
                  padding: '12px 16px',
                  backgroundColor: 'rgba(255, 255, 255, 0.02)',
                  border: '1px solid var(--color-border-subtle)',
                  borderRadius: 'var(--radius-md)',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'space-between'
                }}
              >
                <div>
                  <span style={{ fontSize: '13px', fontWeight: 600, color: '#ffffff' }}>{feed.name}</span>
                  <span style={{ display: 'block', fontSize: '11px', color: 'var(--color-text-muted)' }}>{feed.type}</span>
                </div>
                <span
                  style={{
                    fontSize: '11px',
                    fontWeight: 600,
                    color: 'var(--color-status-healthy)',
                    backgroundColor: 'var(--color-status-healthy-dim)',
                    padding: '3px 8px',
                    borderRadius: 'var(--radius-full)',
                    border: '1px solid var(--color-status-healthy-border)'
                  }}
                >
                  {feed.status}
                </span>
              </div>
            ))}
          </div>
        </div>
      )}

      {activeTab === 'twins' && (
        <div className="glass-card" style={{ padding: '24px', display: 'flex', flexDirection: 'column', gap: '16px' }}>
          <h3 style={{ fontSize: '15px', fontWeight: 700, color: '#ffffff' }}>
            Digital Twin & Memory Twin Engine Parameters
          </h3>
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '16px' }}>
            <div style={{ padding: '14px', backgroundColor: 'rgba(255, 255, 255, 0.03)', borderRadius: 'var(--radius-md)' }}>
              <span style={{ fontSize: '13px', fontWeight: 600, color: '#ffffff', display: 'block', marginBottom: '4px' }}>
                Topology Recalculation Frequency
              </span>
              <span style={{ fontSize: '11px', color: 'var(--color-text-muted)' }}>Every 30 seconds (Continuous Graph Sync)</span>
            </div>
            <div style={{ padding: '14px', backgroundColor: 'rgba(255, 255, 255, 0.03)', borderRadius: 'var(--radius-md)' }}>
              <span style={{ fontSize: '13px', fontWeight: 600, color: '#ffffff', display: 'block', marginBottom: '4px' }}>
                Blast Radius Graph Max Depth
              </span>
              <span style={{ fontSize: '11px', color: 'var(--color-text-muted)' }}>6 lateral hops across subnets</span>
            </div>
          </div>
        </div>
      )}

      {activeTab === 'access' && (
        <div className="glass-card" style={{ padding: '24px', display: 'flex', flexDirection: 'column', gap: '16px' }}>
          <h3 style={{ fontSize: '15px', fontWeight: 700, color: '#ffffff' }}>
            Active SOC Operators & Roles
          </h3>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
            {[
              { name: 'Alex Morgan', role: 'Lead SOC Commander', email: 'alex.morgan@abctech.com', access: 'Full Admin' },
              { name: 'David Vance', role: 'Threat Intelligence Analyst', email: 'david.vance@abctech.com', access: 'Read / Simulate' },
              { name: 'Elena Rostova', role: 'Incident Responder', email: 'elena.rostova@abctech.com', access: 'Triage & Quarantine' }
            ].map((usr, uIdx) => (
              <div
                key={uIdx}
                style={{
                  padding: '12px 16px',
                  backgroundColor: 'rgba(255, 255, 255, 0.02)',
                  border: '1px solid var(--color-border-subtle)',
                  borderRadius: 'var(--radius-md)',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'space-between'
                }}
              >
                <div>
                  <span style={{ fontSize: '13px', fontWeight: 600, color: '#ffffff' }}>{usr.name}</span>
                  <span style={{ display: 'block', fontSize: '11px', color: 'var(--color-text-muted)' }}>
                    {usr.role} • {usr.email}
                  </span>
                </div>
                <span
                  style={{
                    fontSize: '11px',
                    fontFamily: 'var(--font-mono)',
                    color: 'var(--color-secondary)',
                    backgroundColor: 'rgba(0, 229, 255, 0.1)',
                    padding: '2px 8px',
                    borderRadius: '4px'
                  }}
                >
                  {usr.access}
                </span>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};
