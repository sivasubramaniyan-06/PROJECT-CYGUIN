import React, { useState, useEffect } from 'react';
import { RouteId } from './types';
import { Sidebar } from './components/common/Sidebar';
import { Header } from './components/common/Header';
import { GlobalSearchModal } from './components/common/GlobalSearchModal';
import { NotificationDrawer } from './components/common/NotificationDrawer';

// Views
import { DashboardView } from './views/DashboardView';
import { IncidentCenterView } from './views/IncidentCenterView';
import { DigitalTwinView } from './views/DigitalTwinView';
import { MemoryTwinView } from './views/MemoryTwinView';
import { AICopilotView } from './views/AICopilotView';
import { SimulationLabView } from './views/SimulationLabView';
import { AssetsView } from './views/AssetsView';
import { ReportsView } from './views/ReportsView';
import { SettingsView } from './views/SettingsView';

export const App: React.FC = () => {
  // Sync initial route with window.location.hash if present
  const getInitialRoute = (): RouteId => {
    const hash = window.location.hash.replace('#', '') as RouteId;
    const validRoutes: RouteId[] = [
      'dashboard',
      'incident-center',
      'digital-twin',
      'memory-twin',
      'ai-copilot',
      'simulation-lab',
      'assets',
      'reports',
      'settings'
    ];
    return validRoutes.includes(hash) ? hash : 'dashboard';
  };

  const [currentRoute, setCurrentRoute] = useState<RouteId>(getInitialRoute());
  const [isSidebarCollapsed, setIsSidebarCollapsed] = useState(false);
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [isNotificationsOpen, setIsNotificationsOpen] = useState(false);
  const [selectedIncidentId, setSelectedIncidentId] = useState<string | null>(null);

  // Keep hash in sync with state
  const handleNavigate = (route: RouteId) => {
    setCurrentRoute(route);
    window.location.hash = route;
    // Scroll viewport to top on route change
    const container = document.querySelector('.view-container');
    if (container) container.scrollTo({ top: 0, behavior: 'smooth' });
  };

  useEffect(() => {
    const handleHashChange = () => {
      const hash = window.location.hash.replace('#', '') as RouteId;
      if (hash && hash !== currentRoute) {
        setCurrentRoute(hash);
      }
    };
    window.addEventListener('hashchange', handleHashChange);
    return () => window.removeEventListener('hashchange', handleHashChange);
  }, [currentRoute]);

  // Global ⌘K shortcut listener
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key === 'k') {
        e.preventDefault();
        setIsSearchOpen((prev) => !prev);
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, []);

  const renderActiveView = () => {
    switch (currentRoute) {
      case 'dashboard':
        return (
          <DashboardView
            onNavigate={handleNavigate}
            onSelectIncident={(id) => setSelectedIncidentId(id)}
          />
        );
      case 'incident-center':
        return (
          <IncidentCenterView
            onNavigate={handleNavigate}
            selectedIncidentId={selectedIncidentId}
          />
        );
      case 'digital-twin':
        return <DigitalTwinView onNavigate={handleNavigate} />;
      case 'memory-twin':
        return <MemoryTwinView onNavigate={handleNavigate} />;
      case 'ai-copilot':
        return <AICopilotView onNavigate={handleNavigate} />;
      case 'simulation-lab':
        return <SimulationLabView onNavigate={handleNavigate} />;
      case 'assets':
        return <AssetsView onNavigate={handleNavigate} />;
      case 'reports':
        return <ReportsView onNavigate={handleNavigate} />;
      case 'settings':
        return <SettingsView onNavigate={handleNavigate} />;
      default:
        return <DashboardView onNavigate={handleNavigate} />;
    }
  };

  return (
    <div className="app-layout">
      {/* Persistent Left Sidebar */}
      <Sidebar
        currentRoute={currentRoute}
        onNavigate={handleNavigate}
        isCollapsed={isSidebarCollapsed}
        onToggleCollapse={() => setIsSidebarCollapsed((prev) => !prev)}
      />

      {/* Main Viewport */}
      <div className="main-wrapper">
        {/* Top Navigation Bar */}
        <Header
          currentRoute={currentRoute}
          onNavigate={handleNavigate}
          onOpenSearch={() => setIsSearchOpen(true)}
          onOpenNotifications={() => setIsNotificationsOpen(true)}
        />

        {/* Viewport Content */}
        <main className="view-container">
          {renderActiveView()}
        </main>
      </div>

      {/* Global ⌘K Omnibar Search Modal */}
      <GlobalSearchModal
        isOpen={isSearchOpen}
        onClose={() => setIsSearchOpen(false)}
        onNavigate={handleNavigate}
      />

      {/* Slide-Out Notifications Drawer */}
      <NotificationDrawer
        isOpen={isNotificationsOpen}
        onClose={() => setIsNotificationsOpen(false)}
        onNavigate={handleNavigate}
      />
    </div>
  );
};

export default App;
