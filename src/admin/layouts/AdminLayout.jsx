import React, { useState } from 'react';
import AdminSidebar, { ADMIN_NAV_ITEMS } from './AdminSidebar';
import AdminTopbar from './AdminTopbar';

/**
 * AdminLayout: The Core Isolated Architectural Template for the Admin Realm.
 * Combines Sidebar, Topbar, Responsive Drawers, and Scrollable Viewport.
 */
export default function AdminLayout({ 
  children, 
  activeTab = 'overview', 
  onTabChange, 
  tabTitle,
  pendingCounts = { teachers: 0, moderation: 0 },
  onExitAdmin,
  onRefreshData,
  isRefreshing = false,
  onSearchQuery
}) {
  const [isCollapsed, setIsCollapsed] = useState(false);
  const [isMobileOpen, setIsMobileOpen] = useState(false);

  // Compute active nav item label for breadcrumbs
  const currentNavItem = ADMIN_NAV_ITEMS.find(item => item.id === activeTab);
  const resolvedTabTitle = tabTitle || currentNavItem?.label || 'Dashboard';
  const breadcrumbs = ['Yönetim', resolvedTabTitle];

  const handleToggleSidebar = () => {
    // On mobile, toggles drawer; on desktop, collapses/expands sidebar
    if (window.innerWidth < 768) {
      setIsMobileOpen(prev => !prev);
    } else {
      setIsCollapsed(prev => !prev);
    }
  };

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 flex font-sans antialiased selection:bg-blue-600 selection:text-white">
      {/* 1. Fully Isolated Desktop Sidebar & Mobile Drawer */}
      <AdminSidebar
        activeTab={activeTab}
        onTabChange={onTabChange}
        isCollapsed={isCollapsed}
        onToggleCollapse={() => setIsCollapsed(prev => !prev)}
        isMobileOpen={isMobileOpen}
        onCloseMobile={() => setIsMobileOpen(false)}
        pendingCounts={pendingCounts}
        onExitAdmin={onExitAdmin}
      />

      {/* 2. Main Administration Canvas */}
      <div className="flex-1 flex flex-col min-w-0 h-screen overflow-hidden">
        {/* Topbar */}
        <AdminTopbar
          currentTabName={resolvedTabTitle}
          breadcrumbs={breadcrumbs}
          onToggleSidebar={handleToggleSidebar}
          onRefreshData={onRefreshData}
          isRefreshing={isRefreshing}
          onSearchQuery={onSearchQuery}
        />

        {/* Scrollable Dynamic Content Viewport */}
        <main className="flex-1 overflow-y-auto p-4 sm:p-6 md:p-8 bg-slate-950/60 custom-scrollbar">
          <div className="max-w-7xl mx-auto space-y-6">
            {children}
          </div>
        </main>
      </div>
    </div>
  );
}
