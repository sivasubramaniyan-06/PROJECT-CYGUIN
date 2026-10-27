import React from 'react';
import { X, ShieldAlert, CheckCircle2, Zap, ArrowRight, Bell } from 'lucide-react';
import { RouteId } from '../../types';
import { INCIDENTS_DATA } from '../../data/organizationData';
import { StatusBadge } from './StatusBadge';

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

  return (
    <div className="drawer-backdrop" onClick={onClose}>
      <div className="drawer-panel" onClick={(e) => e.stopPropagation()} style={{ width: '460px' }}>
        {/* Header */}
        <div className="drawer-header">
          <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
            <Bell size={18} color="var(--color-secondary)" />
            <h3 style={{ fontSize: '15px', fontWeight: 800, color: '#ffffff' }}>
              Real-Time SOC Threat Alerts
            </h3>
          </div>
          <button onClick={onClose} style={{ padding: '6px', color: 'var(--color-text-muted)', display: 'flex' }}>
            <X size={18} />
          </button>
        </div>

        {/* Alerts Feed Body */}
        <div className="drawer-body">
          <div style={{ display: 'flex', flexDirection: 'column', gap: '14px' }}>
            {INCIDENTS_DATA.map((inc) => (
              <div
                key={inc.id}
                style={{
                  padding: '16px',
                  backgroundColor: 'rgba(255, 255, 255, 0.02)',
                  border: '1px solid var(--color-border-subtle)',
                  borderRadius: 'var(--radius-lg)',
                  display: 'flex',
                  flexDirection: 'column',
                  gap: '10px',
                  boxShadow: '0 4px 16px rgba(0, 0, 0, 0.5)'
                }}
              >
                <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                  <span style={{ fontFamily: 'var(--font-mono)', fontSize: '11px', color: 'var(--color-secondary)' }}>
                    {inc.id}
                  </span>
                  <StatusBadge status={inc.severity} />
                </div>

                <div style={{ fontSize: '13px', fontWeight: 700, color: '#ffffff' }}>
                  {inc.title}
                </div>

                <p style={{ fontSize: '11px', color: 'var(--color-text-secondary)', lineHeight: 1.45 }}>
                  {inc.description}
                </p>

                <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', paddingTop: '8px', borderTop: '1px solid var(--color-border-subtle)' }}>
                  <span style={{ fontSize: '10px', color: 'var(--color-text-muted)', fontFamily: 'var(--font-mono)' }}>
                    {inc.timestamp}
                  </span>
                  <button
                    className="btn-ghost"
                    style={{ color: 'var(--color-secondary)', padding: '3px 8px', fontSize: '11px' }}
                    onClick={() => {
                      onClose();
                      onNavigate('incident-center');
                    }}
                  >
                    <span>Triage Incident</span>
                    <ArrowRight size={12} />
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Footer */}
        <div className="drawer-footer">
          <button
            className="btn-secondary"
            style={{ width: '100%', justifyContent: 'center' }}
            onClick={() => {
              onClose();
              onNavigate('incident-center');
            }}
          >
            <span>View All Incident Queues</span>
          </button>
        </div>
      </div>
    </div>
  );
};
