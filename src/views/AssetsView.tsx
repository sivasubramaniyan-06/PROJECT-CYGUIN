import React, { useState } from 'react';
import {
  Server,
  Search,
  Network,
  ArrowUpRight
} from 'lucide-react';
import { RouteId } from '../types';
import { ASSETS_DATA, ORG_METADATA } from '../data/organizationData';
import { StatusBadge } from '../components/common/StatusBadge';
import { Tabs } from '../components/common/Tabs';

interface AssetsViewProps {
  onNavigate: (route: RouteId) => void;
}

export const AssetsView: React.FC<AssetsViewProps> = ({ onNavigate }) => {
  const [activeTab, setActiveTab] = useState('all');
  const [searchQuery, setSearchQuery] = useState('');

  const filterTabs = [
    { id: 'all', label: 'All Infrastructure', count: 135 },
    { id: 'Endpoint', label: 'Endpoints (120)', count: 120 },
    { id: 'Server', label: 'Servers (15)', count: 15 },
    { id: 'Database', label: 'Databases (Finance/HR)', count: 2 },
    { id: 'Cloud Resource', label: 'AWS Cloud', count: 6 }
  ];

  const filteredAssets = ASSETS_DATA.filter((ast) => {
    if (activeTab !== 'all' && ast.type !== activeTab) return false;
    if (searchQuery.trim()) {
      const q = searchQuery.toLowerCase();
      return (
        ast.name.toLowerCase().includes(q) ||
        ast.ipAddress.toLowerCase().includes(q) ||
        ast.location.toLowerCase().includes(q) ||
        ast.osOrPlatform.toLowerCase().includes(q)
      );
    }
    return true;
  });

  return (
    <div className="view-content">
      {/* Header Row */}
      <div className="view-header-row">
        <div className="view-heading-group">
          <h1 className="view-title">
            <Server size={22} color="var(--color-primary)" />
            <span>Protected Asset Matrix</span>
            <span className="brand-badge">135 Monitored Entities</span>
          </h1>
          <p className="view-description">
            Complete inventory for <strong>{ORG_METADATA.name}</strong> (120 Endpoints, 15 Servers, AWS Cloud, VPN
            Gateways, PostgreSQL Finance DB).
          </p>
        </div>
        <div className="view-actions-group">
          <button className="btn-secondary" onClick={() => onNavigate('digital-twin')}>
            <Network size={14} color="var(--color-secondary)" />
            <span>Inspect in Digital Twin</span>
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
          gap: '12px'
        }}
      >
        <Tabs tabs={filterTabs} activeTab={activeTab} onChange={setActiveTab} />

        <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
          <div
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: '8px',
              padding: '6px 12px',
              backgroundColor: 'rgba(255, 255, 255, 0.04)',
              border: '1px solid var(--color-border-subtle)',
              borderRadius: 'var(--radius-md)',
              width: '280px'
            }}
          >
            <Search size={14} color="var(--color-text-muted)" />
            <input
              type="text"
              placeholder="Search assets by IP, OS, hostname..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              style={{ flex: 1, fontSize: '12px', color: '#ffffff' }}
            />
          </div>
        </div>
      </div>

      {/* Assets Table */}
      <div className="glass-card">
        <div className="incident-table-wrapper">
          <table className="incident-table">
            <thead>
              <tr>
                <th>Asset Name & ID</th>
                <th>Type & Subnet</th>
                <th>OS / Platform</th>
                <th>Location / Dept</th>
                <th>Risk Score</th>
                <th>Status</th>
                <th>Telemetry Agent</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {filteredAssets.map((ast) => (
                <tr key={ast.id} className="incident-row">
                  <td>
                    <div className="incident-title-cell">
                      <span>{ast.name}</span>
                      <span className="incident-subtext">{ast.id}</span>
                    </div>
                  </td>
                  <td>
                    <div style={{ display: 'flex', flexDirection: 'column' }}>
                      <span style={{ fontSize: '12px', color: '#ffffff', fontWeight: 500 }}>{ast.type}</span>
                      <span style={{ fontSize: '11px', color: 'var(--color-text-muted)', fontFamily: 'var(--font-mono)' }}>
                        {ast.ipAddress}
                      </span>
                    </div>
                  </td>
                  <td>
                    <span style={{ fontSize: '12px' }}>{ast.osOrPlatform}</span>
                  </td>
                  <td>
                    <span style={{ fontSize: '12px', color: 'var(--color-text-secondary)' }}>
                      {ast.location}
                    </span>
                  </td>
                  <td>
                    <span
                      style={{
                        fontFamily: 'var(--font-mono)',
                        fontSize: '12px',
                        fontWeight: 700,
                        color:
                          ast.riskScore > 75
                            ? 'var(--color-status-critical)'
                            : ast.riskScore > 40
                            ? 'var(--color-status-warning)'
                            : 'var(--color-status-healthy)'
                      }}
                    >
                      {ast.riskScore}/100
                    </span>
                  </td>
                  <td>
                    <StatusBadge status={ast.status} />
                  </td>
                  <td>
                    <div style={{ display: 'flex', flexDirection: 'column' }}>
                      <span style={{ fontSize: '11px', color: 'var(--color-secondary)', fontFamily: 'var(--font-mono)' }}>
                        {ast.agentVersion}
                      </span>
                      <span style={{ fontSize: '10px', color: 'var(--color-text-muted)' }}>
                        Seen {ast.lastTelemetry}
                      </span>
                    </div>
                  </td>
                  <td>
                    <button
                      className="btn-ghost"
                      style={{ color: 'var(--color-secondary)', fontSize: '11px' }}
                      onClick={() => onNavigate('digital-twin')}
                    >
                      <ArrowUpRight size={13} />
                      <span>Twin View</span>
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
