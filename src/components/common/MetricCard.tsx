import React, { ReactNode } from 'react';

interface MetricCardProps {
  title: string;
  value: string | number;
  delta?: string;
  deltaType?: 'positive' | 'negative' | 'neutral';
  caption?: string;
  icon?: ReactNode;
  iconBg?: string;
  iconColor?: string;
  badge?: string;
  onClick?: () => void;
}

export const MetricCard: React.FC<MetricCardProps> = ({
  title,
  value,
  delta,
  deltaType = 'neutral',
  caption,
  icon,
  iconBg = 'rgba(0, 102, 255, 0.15)',
  iconColor = 'var(--color-primary)',
  badge,
  onClick
}) => {
  return (
    <div
      className={`glass-card metric-card ${onClick ? 'glass-card-interactive' : ''}`}
      onClick={onClick}
    >
      <div className="metric-card-top">
        <span className="metric-card-title">{title}</span>
        {icon && (
          <div
            className="metric-icon-box"
            style={{ backgroundColor: iconBg, color: iconColor }}
          >
            {icon}
          </div>
        )}
      </div>

      <div className="metric-card-middle">
        <span className="metric-value">{value}</span>
        {delta && (
          <span className={`metric-delta ${deltaType}`}>
            {delta}
          </span>
        )}
        {badge && (
          <span className="brand-badge" style={{ marginLeft: 'auto' }}>
            {badge}
          </span>
        )}
      </div>

      {caption && (
        <div className="metric-card-bottom">
          <span>{caption}</span>
        </div>
      )}
    </div>
  );
};
