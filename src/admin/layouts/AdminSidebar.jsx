import React from 'react';
import { 
  LayoutDashboard, 
  Users, 
  UserCheck, 
  FileText, 
  BarChart3, 
  Activity, 
  Settings, 
  LogOut, 
  Shield, 
  ChevronRight, 
  ExternalLink,
  ChevronLeft,
  X,
  Sparkles,
  Tag
} from 'lucide-react';
import { useAdminAuth } from '../context/AdminAuthContext';

export const ADMIN_NAV_ITEMS = [
  {
    id: 'overview',
    label: 'Dashboard',
    description: 'Genel KPI ve Metrikler',
    icon: LayoutDashboard,
    badge: null
  },
  {
    id: 'users',
    label: 'Kullanıcılar',
    description: 'Öğrenci, Veli ve Eğitmenler',
    icon: Users,
    badge: null
  },
  {
    id: 'teachers',
    label: 'Eğitmen Onayları',
    description: 'Akreditasyon Kuyruğu',
    icon: UserCheck,
    badgeKey: 'teachers',
    badgeColor: 'bg-amber-500 text-slate-950 font-bold'
  },
  {
    id: 'moderation',
    label: 'İçerik Yönetimi',
    description: 'Talepler ve Market',
    icon: FileText,
    badgeKey: 'moderation',
    badgeColor: 'bg-indigo-500 text-white font-bold'
  },
  {
    id: 'coupons',
    label: 'Kupon & Promosyon',
    description: 'İndirim Kampanyaları',
    icon: Tag,
    badge: 'Yeni',
    badgeColor: 'bg-emerald-500 text-slate-950 font-bold'
  },
  {
    id: 'finance',
    label: 'Analitik & Finans',
    description: 'Komisyon ve Hakedişler',
    icon: BarChart3,
    badge: null
  },
  {
    id: 'security',
    label: 'Sistem Logları',
    description: 'Canlı Audit Trail',
    icon: Activity,
    badge: 'Canlı',
    badgeColor: 'bg-emerald-500/20 text-emerald-400 border border-emerald-500/30 font-mono'
  },
  {
    id: 'settings',
    label: 'Ayarlar',
    description: 'Sistem Parametreleri',
    icon: Settings,
    badge: null
  }
];

export default function AdminSidebar({
  activeTab,
  onTabChange,
  isCollapsed = false,
  onToggleCollapse,
  isMobileOpen = false,
  onCloseMobile,
  pendingCounts = { teachers: 0, moderation: 0 },
  onExitAdmin
}) {
  const { adminUser, logout } = useAdminAuth();

  const handleNavClick = (tabId) => {
    onTabChange(tabId);
    if (onCloseMobile) onCloseMobile();
  };

  const sidebarContent = (
    <div className="flex flex-col justify-between h-full select-none">
      {/* 1. Header / Brand */}
      <div>
        <div className={`p-4 sm:p-5 border-b border-slate-800/80 flex items-center ${isCollapsed ? 'justify-center' : 'justify-between'}`}>
          <div className="flex items-center gap-3 min-w-0">
            <img 
              src="/logo.png" 
              alt="Özel Ders Borsası Logo" 
              className="w-10 h-10 rounded-2xl object-cover shadow-lg shadow-blue-500/20 shrink-0 ring-2 ring-amber-500/30" 
            />
            {!isCollapsed && (
              <div className="min-w-0">
                <div className="flex items-center gap-1.5">
                  <span className="font-extrabold text-base tracking-tight text-white">YÖNETİM</span>
                  <span className="text-[10px] font-black uppercase px-1.5 py-0.5 bg-blue-500/20 text-blue-400 border border-blue-500/30 rounded-md">
                    RBAC
                  </span>
                </div>
                <p className="text-xs text-slate-400 font-medium truncate">Özel Ders Borsası</p>
              </div>
            )}
          </div>

          {/* Mobile close button */}
          <button
            onClick={onCloseMobile}
            className="md:hidden p-2 text-slate-400 hover:text-white rounded-xl bg-slate-800/80"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* 2. Navigation Menu */}
        <nav className="p-3 space-y-1.5">
          {!isCollapsed && (
            <div className="px-3 pb-2 pt-2 text-[10px] font-bold uppercase tracking-wider text-slate-400">
              Ana Modüller
            </div>
          )}

          {ADMIN_NAV_ITEMS.map((item) => {
            const Icon = item.icon;
            const isActive = activeTab === item.id;
            
            // Resolve dynamic badge if present
            const dynamicBadgeCount = item.badgeKey ? pendingCounts[item.badgeKey] : null;
            const showBadge = dynamicBadgeCount && dynamicBadgeCount > 0 ? dynamicBadgeCount : item.badge;

            return (
              <button
                key={item.id}
                onClick={() => handleNavClick(item.id)}
                title={isCollapsed ? item.label : undefined}
                className={`w-full flex items-center ${isCollapsed ? 'justify-center px-0' : 'justify-between px-3.5'} py-2.5 rounded-2xl text-xs font-bold transition-all group relative ${
                  isActive
                    ? 'bg-blue-600 text-white shadow-lg shadow-blue-600/25 ring-1 ring-blue-400'
                    : 'text-slate-400 hover:text-slate-100 hover:bg-slate-800/70'
                }`}
              >
                <div className="flex items-center gap-3 min-w-0">
                  <Icon className={`w-4 h-4 shrink-0 transition-transform group-hover:scale-110 ${isActive ? 'text-white' : 'text-slate-400 group-hover:text-slate-200'}`} />
                  {!isCollapsed && <span className="truncate">{item.label}</span>}
                </div>

                {!isCollapsed && (
                  <div className="flex items-center gap-1.5 shrink-0">
                    {showBadge && (
                      <span className={`text-[10px] px-2 py-0.5 rounded-full ${item.badgeColor || 'bg-slate-800 text-slate-300'}`}>
                        {showBadge}
                      </span>
                    )}
                    {isActive && <ChevronRight className="w-3.5 h-3.5 text-blue-200" />}
                  </div>
                )}

                {/* Collapsed Active Indicator Pill */}
                {isCollapsed && isActive && (
                  <span className="absolute left-0 top-1/2 -translate-y-1/2 w-1 h-5 bg-white rounded-r-full" />
                )}
              </button>
            );
          })}
        </nav>
      </div>

      {/* 3. Footer / Admin Profile & Actions */}
      <div className="p-3 border-t border-slate-800 space-y-2">
        {/* Desktop Collapse Toggle */}
        <div className="hidden md:flex justify-end px-1">
          <button
            onClick={onToggleCollapse}
            className="p-1.5 text-slate-400 hover:text-slate-200 hover:bg-slate-800 rounded-xl transition-colors text-xs flex items-center gap-1 font-semibold"
            title={isCollapsed ? "Menüyü Genişlet" : "Menüyü Daralt"}
          >
            <ChevronLeft className={`w-4 h-4 transition-transform duration-300 ${isCollapsed ? 'rotate-180' : ''}`} />
            {!isCollapsed && <span className="text-[11px]">Daralt</span>}
          </button>
        </div>

        {/* User Card */}
        {!isCollapsed ? (
          <div className="p-3 bg-slate-950/70 border border-slate-800 rounded-2xl flex items-center justify-between">
            <div className="flex items-center gap-2.5 min-w-0">
              <img 
                src={adminUser?.avatar} 
                alt="Admin Avatar" 
                className="w-9 h-9 rounded-xl object-cover ring-2 ring-blue-500/40 shrink-0" 
              />
              <div className="min-w-0">
                <p className="text-xs font-bold text-white truncate">{adminUser?.name || 'Sistem Yöneticisi'}</p>
                <span className="text-[10px] text-emerald-400 font-mono font-medium flex items-center gap-1">
                  <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-ping inline-block"></span>
                  {adminUser?.badge || 'Super Admin'}
                </span>
              </div>
            </div>
            
            <button
              onClick={logout}
              title="Güvenli Çıkış Yap"
              className="p-1.5 text-slate-400 hover:text-rose-400 hover:bg-rose-500/10 rounded-xl transition-colors shrink-0"
            >
              <LogOut className="w-4 h-4" />
            </button>
          </div>
        ) : (
          <div className="flex flex-col items-center gap-2">
            <img 
              src={adminUser?.avatar} 
              alt="Admin" 
              className="w-8 h-8 rounded-xl object-cover ring-2 ring-blue-500/40" 
            />
            <button
              onClick={logout}
              title="Güvenli Çıkış Yap"
              className="p-2 text-slate-400 hover:text-rose-400 hover:bg-rose-500/10 rounded-xl transition-colors"
            >
              <LogOut className="w-4 h-4" />
            </button>
          </div>
        )}

        {/* Switch to Public Marketplace */}
        {!isCollapsed && (
          <button
            onClick={onExitAdmin}
            className="w-full py-2 px-3 bg-slate-800/80 hover:bg-slate-800 border border-slate-700/80 text-slate-300 hover:text-white rounded-xl text-xs font-bold flex items-center justify-center gap-2 transition-colors shadow-sm"
          >
            <ExternalLink className="w-3.5 h-3.5 text-slate-400" />
            <span>Ana Pazara Geç</span>
          </button>
        )}
      </div>
    </div>
  );

  return (
    <>
      {/* Desktop Sidebar */}
      <aside 
        className={`hidden md:flex flex-col h-screen sticky top-0 bg-slate-900 border-r border-slate-800 transition-all duration-300 z-30 shrink-0 ${
          isCollapsed ? 'w-20' : 'w-72'
        }`}
      >
        {sidebarContent}
      </aside>

      {/* Mobile Drawer Backdrop & Sidebar */}
      {isMobileOpen && (
        <div className="fixed inset-0 z-50 md:hidden flex">
          {/* Backdrop Blur Overlay */}
          <div 
            onClick={onCloseMobile} 
            className="fixed inset-0 bg-slate-950/80 backdrop-blur-sm transition-opacity" 
          />

          {/* Drawer Canvas */}
          <div className="relative w-72 max-w-[80vw] h-full bg-slate-900 border-r border-slate-800 z-50 shadow-2xl flex flex-col">
            {sidebarContent}
          </div>
        </div>
      )}
    </>
  );
}
