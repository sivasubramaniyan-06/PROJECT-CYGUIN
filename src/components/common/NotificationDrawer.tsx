import React from 'react';
import { X, ShieldAlert, CheckCircle2, Clock, AlertTriangle, ArrowRight } from 'lucide-react';
import { RouteId } from '../../types';

interface NotificationDrawerProps {
  isOpen: boolean;
  onClose: () => void;
  onNavigate: (route: RouteId) => void;
}

export const NotificationDrawer: React.FC<NotificationDrawerProps> = ({
  isOpen,
  onClose,
  onNavigate
}) => {
  if (!isOpen) return null;

  const notifications = [
    {
      id: 'N-01',
      type: 'critical',
      title: 'High Severity Threat Detected',
      desc: 'SPN Kerberoasting targeting RDS-FIN-DB from ABC-WS-088.',
      time: '14m ago',
      route: 'incident-center' as RouteId,
      action: 'Triage Incident'
    },
    {
      id: 'N-02',
      type: 'warning',
      title: 'AWS Cloud Policy Drift',
      desc: 'Inline AdministratorAccess policy added to Prod-EC2-Worker.',
      time: '42m ago',
      route: 'incident-center' as RouteId,
      action: 'Inspect IAM Role'
    },
    {
      id: 'N-03',
      type: 'cyan',
      title: 'Digital Twin Simulation Ready',
      desc: 'Isolation impact analysis calculated for Finance Subnet.',
      time: '1h ago',
      route: 'simulation-lab' as RouteId,
      action: 'View Sandbox'
    },
    {
      id: 'N-04',
      type: 'healthy',
      title: 'Scheduled Compliance Audit Passed',
      desc: 'SOC 2 Type II continuous controls score: 98.2% passing.',
      time: '3h ago',
      route: 'reports' as RouteId,
      action: 'View Report'
    }
  ];

  return (
    <div className="drawer-backdrop" onClick={onClose}>
      <div className="drawer-panel" onClick={(e) => e.stopPropagation()}>
        <div className="drawer-header">
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
            <span style={{ fontSize: '15px', fontWeight: 700, color: '#ffffff' }}>
              Security Operations Feed
            </span>
            <span
              style={{
                fontSize: '10px',
                fontWeight: 700,
                padding: '2px 6px',
                borderRadius: 'var(--radius-full)',
                backgroundColor: 'rgba(239, 68, 68, 0.18)',
                color: 'var(--color-status-critical)',
                border: '1px solid rgba(239, 68, 68, 0.3)'
              }}
            >
              2 Critical
            </span>
          </div>
          <button
            onClick={onClose}
            style={{
              padding: '6px',
              color: 'var(--color-text-muted)',
              display: 'flex',
              alignItems: 'center'
            }}
          >
            <X size={18} />
          </button>
        </div>

        <div className="drawer-body">
          <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
            {notifications.map((n) => (
              <div
                key={n.id}
                style={{
                  padding: '14px 16px',
                  backgroundColor: 'rgba(255, 255, 255, 0.02)',
                  border: '1px solid var(--color-border-subtle)',
                  borderRadius: 'var(--radius-md)',
                  display: 'flex',
                  flexDirection: 'column',
                  gap: '8px',
                  transition: 'all var(--transition-fast)'
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.backgroundColor = 'rgba(255, 255, 255, 0.04)';
                  e.currentTarget.style.borderColor = 'var(--color-border-cyan)';
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.backgroundColor = 'rgba(255, 255, 255, 0.02)';
                  e.currentTarget.style.borderColor = 'var(--color-border-subtle)';
                }}
              >
                <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
                    {n.type === 'critical' && <ShieldAlert size={15} color="var(--color-status-critical)" />}
                    {n.type === 'warning' && <AlertTriangle size={15} color="var(--color-status-warning)" />}
                    {n.type === 'cyan' && <Clock size={15} color="var(--color-secondary)" />}
                    {n.type === 'healthy' && <CheckCircle2 size={15} color="var(--color-status-healthy)" />}
                    <span style={{ fontSize: '13px', fontWeight: 600, color: 'var(--color-text-primary)' }}>
                      {n.title}
                    </span>
                  </div>
                  <span style={{ fontSize: '11px', color: 'var(--color-text-muted)', fontFamily: 'var(--font-mono)' }}>
                    {n.time}
                  </span>
                </div>

                <p style={{ fontSize: '12px', color: 'var(--color-text-secondary)', lineHeight: 1.4 }}>
                  {n.desc}
                </p>

                <div style={{ display: 'flex', justifyContent: 'flex-end', paddingTop: '4px' }}>
                  <button
                    onClick={() => {
                      onNavigate(n.route);
                      onClose();
                    }}
                    className="btn-ghost"
                    style={{ color: 'var(--color-secondary)', fontSize: '11px', fontWeight: 600 }}
                  >
                    <span>{n.action}</span>
                    <ArrowRight size={12} />
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="drawer-footer">
          <button
            onClick={() => {
              onNavigate('incident-center');
              onClose();
            }}
            className="btn-secondary"
            style={{ fontSize: '12px' }}
          >
            View Incident Queue
          </button>
        </div>
      </div>
    </div>
  );
};
