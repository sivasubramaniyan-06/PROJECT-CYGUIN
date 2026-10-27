import React, { useState } from 'react';
import {
  Server,
  Search,
  Cloud,
  Laptop,
  Database,
  Radio,
  SlidersHorizontal,
  Lock,
  ArrowUpRight,
  ShieldAlert,
  ShieldCheck,
  Shield
} from 'lucide-react';
import { RouteId, Asset } from '../types';
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
    { id: 'all', label: 'All Assets (135)', count: ASSETS_DATA.length },
    { id: 'server', label: 'Production Servers (15)', count: 3 },
    { id: 'endpoint', label: 'Endpoints (120)', count: 2 },
    { id: 'database', label: 'Databases', count: 1 },
    { id: 'cloud', label: 'AWS Cloud', count: 1 }
  ];

  const filteredAssets = ASSETS_DATA.filter((asset) => {
    if (activeTab === 'server' && asset.type !== 'Server') return false;
    if (activeTab === 'endpoint' && asset.type !== 'Endpoint') return false;
    if (activeTab === 'database' && asset.type !== 'Database') return false;
    if (activeTab === 'cloud' && asset.type !== 'Cloud Resource') return false;

    if (searchQuery.trim()) {
      const q = searchQuery.toLowerCase();
      return (
        asset.id.toLowerCase().includes(q) ||
        asset.name.toLowerCase().includes(q) ||
        asset.ipAddress.toLowerCase().includes(q) ||
        asset.osOrPlatform.toLowerCase().includes(q) ||
        asset.location.toLowerCase().includes(q)
      );
    }
    return true;
  });

  const getAssetIcon = (type: Asset['type']) => {
    switch (type) {
      case 'Server':
        return <Server size={15} color="var(--color-primary)" />;
      case 'Endpoint':
        return <Laptop size={15} color="var(--color-secondary)" />;
      case 'Database':
        return <Database size={15} color="var(--color-status-critical)" />;
      case 'Cloud Resource':
        return <Cloud size={15} color="var(--color-tertiary)" />;
      case 'Network Gateway':
        return <Radio size={15} color="var(--color-status-risk-medium)" />;
      default:
        return <Server size={15} />;
    }
  };

  return (
    <div className="view-content">
      {/* Header Row */}
      <div className="view-header-row">
        <div className="view-heading-group">
          <h1 className="view-title">
            <Server size={24} color="var(--color-primary)" />
            <span>Enterprise Asset Inventory Matrix</span>
            <span className="brand-badge">135 Monitored Entities</span>
          </h1>
          <p className="view-description">
            Complete hardware, virtual machines, cloud instances, and database assets mapped for{' '}
            <strong>{ORG_METADATA.name}</strong>.
          </p>
        </div>
        <div className="view-actions-group">
          <button className="btn-secondary" onClick={() => onNavigate('digital-twin')}>
            <Radio size={14} color="var(--color-secondary)" />
            <span>View in Digital Twin</span>
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
              width: '320px'
            }}
          >
            <Search size={14} color="var(--color-text-muted)" />
            <input
              type="text"
              placeholder="Search hostname, IP, OS, location..."
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

      {/* Assets Table */}
      <div className="glass-card">
        <div className="incident-table-wrapper">
          <table className="incident-table">
            <thead>
              <tr>
                <th>Asset Name & ID</th>
                <th>Type & OS</th>
                <th>IP & Subnet</th>
                <th>Health Status</th>
                <th>Twin Risk Score</th>
                <th>Location / VPC</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {filteredAssets.map((asset) => (
                <tr key={asset.id} className="incident-row">
                  <td>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                      <div
                        style={{
                          width: '30px',
                          height: '30px',
                          borderRadius: 'var(--radius-sm)',
                          backgroundColor: 'rgba(255, 255, 255, 0.03)',
                          border: '1px solid var(--color-border-subtle)',
                          display: 'flex',
                          alignItems: 'center',
                          justifyContent: 'center'
                        }}
                      >
                        {getAssetIcon(asset.type)}
                      </div>
                      <div style={{ display: 'flex', flexDirection: 'column' }}>
                        <span style={{ color: '#ffffff', fontWeight: 700 }}>{asset.name}</span>
                        <span style={{ fontSize: '10px', color: 'var(--color-text-muted)', fontFamily: 'var(--font-mono)' }}>
                          {asset.id}
                        </span>
                      </div>
                    </div>
                  </td>
                  <td>
                    <div style={{ display: 'flex', flexDirection: 'column' }}>
                      <span style={{ color: 'var(--color-text-primary)' }}>
                        {asset.type}
                      </span>
                      <span style={{ fontSize: '11px', color: 'var(--color-text-muted)' }}>{asset.osOrPlatform}</span>
                    </div>
                  </td>
                  <td>
                    <span style={{ fontFamily: 'var(--font-mono)', fontSize: '12px', color: 'var(--color-secondary)' }}>
                      {asset.ipAddress}
                    </span>
                  </td>
                  <td>
                    <StatusBadge status={asset.status} />
                  </td>
                  <td>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                      <div
                        style={{
                          width: '40px',
                          height: '4px',
                          borderRadius: '9999px',
                          backgroundColor: 'rgba(255, 255, 255, 0.08)',
                          overflow: 'hidden'
                        }}
                      >
                        <div
                          style={{
                            width: `${asset.riskScore}%`,
                            height: '100%',
                            backgroundColor:
                              asset.riskScore > 70
                                ? 'var(--color-status-critical)'
                                : asset.riskScore > 40
                                ? 'var(--color-status-warning)'
                                : 'var(--color-status-healthy)',
                            boxShadow: '0 0 6px currentColor'
                          }}
                        />
                      </div>
                      <span
                        style={{
                          fontFamily: 'var(--font-mono)',
                          fontSize: '11px',
                          fontWeight: 700,
                          color:
                            asset.riskScore > 70
                              ? 'var(--color-status-critical)'
                              : asset.riskScore > 40
                              ? 'var(--color-status-warning)'
                              : 'var(--color-status-healthy)'
                        }}
                      >
                        {asset.riskScore}/100
                      </span>
                    </div>
                  </td>
                  <td>
                    <span style={{ fontSize: '11px', color: 'var(--color-text-muted)' }}>
                      {asset.location}
                    </span>
                  </td>
                  <td>
                    <button
                      className="btn-ghost"
                      style={{ color: 'var(--color-secondary)', fontSize: '11px' }}
                      onClick={() => onNavigate('digital-twin')}
                    >
                      <ArrowUpRight size={13} />
                      <span>Twin Map</span>
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
