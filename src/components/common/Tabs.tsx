import React from 'react';

export interface TabItem {
  id: string;
  label: string;
  count?: number;
  icon?: React.ReactNode;
}

interface TabsProps {
  tabs: TabItem[];
  activeTab: string;
  onChange: (tabId: string) => void;
}

export const Tabs: React.FC<TabsProps> = ({ tabs, activeTab, onChange }) => {
  return (
    <div
      style={{
        display: 'inline-flex',
        alignItems: 'center',
        padding: '3px',
        backgroundColor: 'rgba(14, 21, 36, 0.8)',
        border: '1px solid var(--color-border-subtle)',
        borderRadius: 'var(--radius-md)',
        gap: '4px'
      }}
    >
      {tabs.map((tab) => {
        const isActive = tab.id === activeTab;
        return (
          <button
            key={tab.id}
            onClick={() => onChange(tab.id)}
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: '6px',
              padding: '6px 12px',
              borderRadius: 'var(--radius-sm)',
              fontSize: '12px',
              fontWeight: isActive ? 600 : 500,
              color: isActive ? '#ffffff' : 'var(--color-text-secondary)',
              backgroundColor: isActive ? 'rgba(0, 102, 255, 0.2)' : 'transparent',
              border: isActive ? '1px solid rgba(0, 102, 255, 0.35)' : '1px solid transparent',
              transition: 'all var(--transition-fast)'
            }}
          >
            {tab.icon}
            <span>{tab.label}</span>
            {tab.count !== undefined && (
              <span
                style={{
                  fontSize: '10px',
                  padding: '1px 5px',
                  borderRadius: 'var(--radius-full)',
                  backgroundColor: isActive ? 'var(--color-primary)' : 'rgba(255, 255, 255, 0.08)',
                  color: '#ffffff'
                }}
              >
                {tab.count}
              </span>
            )}
          </button>
        );
      })}
    </div>
  );
};
