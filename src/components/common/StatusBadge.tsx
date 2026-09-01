import React from 'react';
import { SeverityLevel } from '../../types';

interface StatusBadgeProps {
  status: SeverityLevel | 'active' | 'investigating' | 'contained' | 'resolved';
  label?: string;
  showDot?: boolean;
}

export const StatusBadge: React.FC<StatusBadgeProps> = ({ status, label, showDot = true }) => {
  let badgeClass = 'healthy';
  let defaultLabel = 'Healthy';

  switch (status) {
    case 'critical':
      badgeClass = 'critical';
      defaultLabel = 'Critical';
      break;
    case 'medium-risk':
      badgeClass = 'medium-risk';
      defaultLabel = 'Medium Risk';
      break;
    case 'warning':
      badgeClass = 'warning';
      defaultLabel = 'Warning';
      break;
    case 'healthy':
      badgeClass = 'healthy';
      defaultLabel = 'Healthy';
      break;
    case 'active':
      badgeClass = 'critical';
      defaultLabel = 'Active';
      break;
    case 'investigating':
      badgeClass = 'medium-risk';
      defaultLabel = 'Investigating';
      break;
    case 'contained':
      badgeClass = 'warning';
      defaultLabel = 'Contained';
      break;
    case 'resolved':
      badgeClass = 'healthy';
      defaultLabel = 'Resolved';
      break;
    default:
      badgeClass = 'healthy';
      defaultLabel = String(status);
  }

  return (
    <span className={`status-pill ${badgeClass}`}>
      {showDot && <span className="status-pill-dot animate-pulse-subtle" />}
      {label || defaultLabel}
    </span>
  );
};
