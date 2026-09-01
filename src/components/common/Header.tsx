import React from 'react';
import {
  Search,
  Bell,
  Sparkles,
  Building2,
  ChevronDown,
  Radio
} from 'lucide-react';
import { RouteId } from '../../types';
import { ORG_METADATA } from '../../data/organizationData';

interface HeaderProps {
  currentRoute: RouteId;
  onNavigate: (route: RouteId) => void;
  onOpenSearch: () => void;
  onOpenNotifications: () => void;
}

export const Header: React.FC<HeaderProps> = ({
  currentRoute,
  onNavigate,
  onOpenSearch,
  onOpenNotifications
}) => {
  const getRouteLabel = (route: RouteId) => {
    switch (route) {
      case 'dashboard':
        return 'Executive Command Center';
      case 'incident-center':
        return 'Incident Center';
      case 'digital-twin':
        return 'Security Digital Twin';
      case 'memory-twin':
        return 'Memory Twin';
      case 'ai-copilot':
        return 'AI Copilot Decision Assistant';
      case 'simulation-lab':
        return 'Simulation Lab';
      case 'assets':
        return 'Asset Inventory';
      case 'reports':
        return 'Compliance & Risk Reports';
      case 'settings':
        return 'Platform Settings';
      default:
        return 'Command Center';
    }
  };

  return (
    <header className="top-header">
      {/* Left: Breadcrumbs + DEFCON Status */}
      <div className="header-left">
        <div className="breadcrumb-trail">
          <span className="breadcrumb-root">CYGUIN SOC</span>
          <span className="breadcrumb-separator">/</span>
          <span className="breadcrumb-current">{getRouteLabel(currentRoute)}</span>
        </div>

        <div className="header-defcon-badge">
          <span className="header-defcon-dot animate-pulse-subtle" />
          <span>{ORG_METADATA.defconLevel}</span>
        </div>
      </div>

      {/* Center: Global Search Omnibar */}
      <div className="header-center">
        <button className="omnibar-trigger" onClick={onOpenSearch}>
          <div className="omnibar-trigger-left">
            <Search size={14} color="var(--color-secondary)" />
            <span>Search assets, CVEs, incidents, twin nodes...</span>
          </div>
          <kbd className="kbd-shortcut">⌘K</kbd>
        </button>
      </div>

      {/* Right: Telemetry, Org Selector, Notifications, AI Copilot, Profile */}
      <div className="header-right">
        {/* Sentinel Live Status */}
        <div className="telemetry-status-pill" title="Sentinel Detection Engine Active">
          <span className="telemetry-indicator-dot" />
          <Radio size={12} />
          <span>Sentinel 12ms</span>
        </div>

        {/* Organization Selector */}
        <button
          className="org-selector-btn"
          title="Active Target Enterprise"
          onClick={() => onNavigate('dashboard')}
        >
          <Building2 size={13} color="var(--color-secondary)" />
          <span>{ORG_METADATA.name}</span>
          <ChevronDown size={12} color="var(--color-text-muted)" />
        </button>

        {/* Notification Bell */}
        <button
          className="header-icon-btn"
          onClick={onOpenNotifications}
          title="Security Notifications"
        >
          <Bell size={16} />
          <span className="notification-badge-dot" />
        </button>

        {/* AI Copilot Quick Button */}
        <button
          className="copilot-quick-btn"
          onClick={() => onNavigate('ai-copilot')}
          title="Launch AI Decision Copilot"
        >
          <Sparkles size={14} color="var(--color-secondary)" />
          <span>Copilot</span>
        </button>

        {/* Profile Avatar */}
        <div
          style={{
            width: '32px',
            height: '32px',
            borderRadius: 'var(--radius-full)',
            background: 'linear-gradient(135deg, #1e293b 0%, #0f172a 100%)',
            border: '1px solid var(--color-border-medium)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            fontSize: '11px',
            fontWeight: 700,
            color: '#ffffff',
            cursor: 'pointer'
          }}
          onClick={() => onNavigate('settings')}
          title="Alex Morgan (Lead SOC Analyst)"
        >
          AM
        </div>
      </div>
    </header>
  );
};
