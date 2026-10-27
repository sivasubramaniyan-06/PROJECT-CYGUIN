import React from 'react';
import {
  LayoutDashboard,
  ShieldAlert,
  Network,
  BrainCircuit,
  Bot,
  FlaskConical,
  Server,
  FileSpreadsheet,
  Settings,
  ChevronLeft,
  ChevronRight,
  Shield,
  Building2,
  Radio
} from 'lucide-react';
import { RouteId } from '../../types';
import { ORG_METADATA } from '../../data/organizationData';

interface SidebarProps {
  currentRoute: RouteId;
  onNavigate: (route: RouteId) => void;
  isCollapsed: boolean;
  onToggleCollapse: () => void;
}

export const Sidebar: React.FC<SidebarProps> = ({
  currentRoute,
  onNavigate,
  isCollapsed,
  onToggleCollapse
}) => {
  const navGroups = [
    {
      title: 'Command & Operations',
      items: [
        {
          id: 'dashboard' as RouteId,
          label: 'Dashboard',
          icon: <LayoutDashboard className="nav-icon" />,
          badge: null
        },
        {
          id: 'incident-center' as RouteId,
          label: 'Incident Center',
          icon: <ShieldAlert className="nav-icon" />,
          badge: '2 Active'
        }
      ]
    },
    {
      title: 'Digital & Memory Twins',
      items: [
        {
          id: 'digital-twin' as RouteId,
          label: 'Security Digital Twin',
          icon: <Network className="nav-icon" />,
          badge: 'Live Map'
        },
        {
          id: 'memory-twin' as RouteId,
          label: 'Memory Twin',
          icon: <BrainCircuit className="nav-icon" />,
          badge: 'v2.4'
        }
      ]
    },
    {
      title: 'AI Decision Lab',
      items: [
        {
          id: 'ai-copilot' as RouteId,
          label: 'AI Copilot',
          icon: <Bot className="nav-icon" />,
          badge: 'Copilot'
        },
        {
          id: 'simulation-lab' as RouteId,
          label: 'Simulation Lab',
          icon: <FlaskConical className="nav-icon" />,
          badge: 'Sandbox'
        }
      ]
    },
    {
      title: 'Management & Governance',
      items: [
        {
          id: 'assets' as RouteId,
          label: 'Assets',
          icon: <Server className="nav-icon" />,
          badge: '135'
        },
        {
          id: 'reports' as RouteId,
          label: 'Reports',
          icon: <FileSpreadsheet className="nav-icon" />,
          badge: null
        },
        {
          id: 'settings' as RouteId,
          label: 'Settings',
          icon: <Settings className="nav-icon" />,
          badge: null
        }
      ]
    }
  ];

  return (
    <aside className={`sidebar ${isCollapsed ? 'collapsed' : ''}`}>
      {/* Brand Header */}
      <div className="sidebar-header">
        <a href="#dashboard" onClick={(e) => { e.preventDefault(); onNavigate('dashboard'); }} className="brand-wrapper">
          <div className="brand-icon-box">
            <Shield size={19} strokeWidth={2.4} />
            <div className="brand-icon-pulse" />
          </div>
          {!isCollapsed && (
            <div className="brand-text-group">
              <div className="brand-title">
                CYGUIN
                <span className="brand-badge">SOC OS</span>
              </div>
              <span className="brand-subtitle">Decision Intelligence</span>
            </div>
          )}
        </a>
      </div>

      {/* Target Enterprise Profile Card */}
      {!isCollapsed && (
        <div className="sidebar-org-pill">
          <div className="sidebar-org-content">
            <div className="sidebar-org-avatar">
              <Building2 size={13} />
            </div>
            <div className="sidebar-org-info">
              <span className="sidebar-org-name">{ORG_METADATA.name}</span>
              <span className="sidebar-org-meta">
                {ORG_METADATA.endpointsCount} Endpoints • {ORG_METADATA.serversCount} Servers
              </span>
            </div>
          </div>
        </div>
      )}

      {/* Navigation Links */}
      <nav className="sidebar-nav">
        {navGroups.map((group, gIdx) => (
          <div key={gIdx} className="sidebar-nav-group">
            {!isCollapsed && (
              <span className="sidebar-group-title">{group.title}</span>
            )}
            {group.items.map((item) => {
              const isActive = currentRoute === item.id;
              return (
                <div
                  key={item.id}
                  className={`nav-item ${isActive ? 'active' : ''}`}
                  onClick={() => onNavigate(item.id)}
                  title={isCollapsed ? item.label : undefined}
                >
                  {item.icon}
                  {!isCollapsed && <span className="nav-label">{item.label}</span>}
                  {!isCollapsed && item.badge && (
                    <span
                      className={`nav-badge ${
                        item.badge.includes('Copilot') || item.badge.includes('Live') || item.badge.includes('Sandbox')
                          ? 'cyan'
                          : ''
                      }`}
                    >
                      {item.badge}
                    </span>
                  )}
                </div>
              );
            })}
          </div>
        ))}
      </nav>

      {/* Footer / Analyst Card */}
      <div className="sidebar-footer">
        {!isCollapsed && (
          <div className="sidebar-analyst-card">
            <div className="analyst-avatar">
              AM
              <div className="analyst-status-dot" />
            </div>
            <div className="analyst-info">
              <span className="analyst-name">Alex Morgan</span>
              <span className="analyst-role">Lead SOC Commander</span>
            </div>
          </div>
        )}

        <button
          className="sidebar-collapse-btn"
          onClick={onToggleCollapse}
          title={isCollapsed ? 'Expand Sidebar' : 'Collapse Sidebar'}
        >
          {isCollapsed ? <ChevronRight size={14} /> : <ChevronLeft size={14} />}
          {!isCollapsed && <span>Collapse Navigation</span>}
        </button>
      </div>
    </aside>
  );
};
