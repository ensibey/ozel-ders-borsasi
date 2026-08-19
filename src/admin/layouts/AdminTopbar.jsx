import React, { useState, useEffect, useRef } from 'react';
import { 
  Menu, 
  Search, 
  Bell, 
  RefreshCw, 
  LogOut, 
  ShieldCheck, 
  ChevronRight, 
  User, 
  Clock, 
  Sparkles,
  CheckCircle2,
  Lock,
  ChevronDown
} from 'lucide-react';
import { useAdminAuth } from '../context/AdminAuthContext';

export default function AdminTopbar({
  currentTabName = 'Dashboard',
  breadcrumbs = ['Yönetim', 'Dashboard'],
  onToggleSidebar,
  onRefreshData,
  isRefreshing = false,
  onSearchQuery
}) {
  const { adminUser, logout, auditLogs } = useAdminAuth();
  const [timeStr, setTimeStr] = useState('');
  const [isNotifOpen, setIsNotifOpen] = useState(false);
  const [isProfileOpen, setIsProfileOpen] = useState(false);
  
  const notifRef = useRef(null);
  const profileRef = useRef(null);

  // Live Digital Clock
  useEffect(() => {
    const updateTime = () => {
      const now = new Date();
      setTimeStr(now.toLocaleTimeString('tr-TR', { hour: '2-digit', minute: '2-digit', second: '2-digit' }));
    };
    updateTime();
    const interval = setInterval(updateTime, 1000);
    return () => clearInterval(interval);
  }, []);

  // Click outside listener for dropdowns
  useEffect(() => {
    const handleClickOutside = (e) => {
      if (notifRef.current && !notifRef.current.contains(e.target)) {
        setIsNotifOpen(false);
      }
      if (profileRef.current && !profileRef.current.contains(e.target)) {
        setIsProfileOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const recentNotifications = auditLogs.slice(0, 5);

  return (
    <header className="h-16 bg-slate-900/90 backdrop-blur-xl border-b border-slate-800 px-4 sm:px-6 flex items-center justify-between sticky top-0 z-20 select-none">
      {/* 1. Left: Hamburger Toggle & Breadcrumbs */}
      <div className="flex items-center gap-3 min-w-0">
        {/* Toggle Button */}
        <button
          onClick={onToggleSidebar}
          aria-label="Menüyü Aç/Kapat"
          className="p-2 text-slate-400 hover:text-white hover:bg-slate-800 rounded-xl transition-colors border border-slate-800 hover:border-slate-700"
        >
          <Menu className="w-5 h-5" />
        </button>

        {/* Breadcrumb Navigation */}
        <div className="flex items-center gap-1.5 text-xs font-semibold text-slate-400 overflow-hidden text-ellipsis whitespace-nowrap">
          <span className="text-slate-500 hidden sm:inline">Portalı</span>
          <ChevronRight className="w-3.5 h-3.5 text-slate-600 hidden sm:inline" />
          <span className="text-slate-300 font-medium">{breadcrumbs[0] || 'Yönetim'}</span>
          <ChevronRight className="w-3.5 h-3.5 text-slate-600" />
          <span className="text-blue-400 font-bold tracking-wide">{currentTabName}</span>
        </div>
      </div>

      {/* 2. Center: Global Search */}
      <div className="relative max-w-sm w-full mx-4 hidden lg:block">
        <Search className="w-4 h-4 text-slate-500 absolute left-3.5 top-1/2 -translate-y-1/2" />
        <input
          type="text"
          placeholder="Modüllerde ve loglarda hızlı ara..."
          onChange={(e) => onSearchQuery && onSearchQuery(e.target.value)}
          className="w-full bg-slate-950/80 border border-slate-800 focus:border-blue-500 rounded-xl pl-9 pr-4 py-1.5 text-xs text-slate-200 placeholder-slate-500 focus:outline-none transition-all shadow-inner"
        />
      </div>

      {/* 3. Right: Live Clock, Notifications, Profile & Logout */}
      <div className="flex items-center gap-2 sm:gap-3">
        {/* Live Clock & TLS Badge */}
        <div className="hidden xl:flex items-center gap-2 px-3 py-1.5 bg-slate-950/70 border border-slate-800 rounded-xl text-xs font-mono text-slate-300">
          <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse"></span>
          <span>{timeStr}</span>
          <span className="text-slate-600">•</span>
          <span className="text-emerald-400 text-[10px] font-bold">256-BIT TLS</span>
        </div>

        {/* Data Refresh Button */}
        <button
          onClick={onRefreshData}
          disabled={isRefreshing}
          title="Verileri Yenile"
          className="p-2 text-slate-400 hover:text-white hover:bg-slate-800 rounded-xl transition-all border border-slate-800 hover:border-slate-700 disabled:opacity-50"
        >
          <RefreshCw className={`w-4 h-4 ${isRefreshing ? 'animate-spin text-blue-400' : ''}`} />
        </button>

        {/* Live Notification Dropdown */}
        <div className="relative" ref={notifRef}>
          <button
            onClick={() => setIsNotifOpen(!isNotifOpen)}
            className="p-2 text-slate-400 hover:text-white hover:bg-slate-800 rounded-xl transition-colors relative border border-slate-800 hover:border-slate-700"
          >
            <Bell className="w-4 h-4" />
            {recentNotifications.length > 0 && (
              <span className="absolute top-1.5 right-1.5 w-2 h-2 bg-blue-500 rounded-full ring-2 ring-slate-900 animate-pulse" />
            )}
          </button>

          {isNotifOpen && (
            <div className="absolute right-0 mt-2 w-80 sm:w-96 bg-slate-900 border border-slate-800 rounded-2xl shadow-2xl p-4 z-50 animate-in fade-in slide-in-from-top-2 duration-200">
              <div className="flex items-center justify-between pb-3 border-b border-slate-800">
                <span className="text-xs font-bold text-white flex items-center gap-1.5">
                  <Bell className="w-3.5 h-3.5 text-blue-400" /> Canlı Sistem Logları & Bildirimler
                </span>
                <span className="text-[10px] bg-blue-500/10 text-blue-400 border border-blue-500/20 px-2 py-0.5 rounded-full font-bold">
                  {recentNotifications.length} Yeni
                </span>
              </div>

              <div className="divide-y divide-slate-800/60 max-h-64 overflow-y-auto my-2">
                {recentNotifications.map((notif) => (
                  <div key={notif.id} className="py-2.5 px-1 flex items-start gap-2.5 text-xs">
                    <div className="p-1 rounded-lg bg-slate-800 text-slate-300 mt-0.5 shrink-0">
                      <Sparkles className="w-3 h-3 text-blue-400" />
                    </div>
                    <div className="min-w-0 flex-1">
                      <p className="font-bold text-white text-xs truncate">{notif.action}</p>
                      <p className="text-[11px] text-slate-400 line-clamp-1">{notif.details}</p>
                      <span className="text-[10px] text-slate-500 font-mono mt-0.5 block">{notif.timestamp}</span>
                    </div>
                  </div>
                ))}
              </div>

              <div className="pt-2 border-t border-slate-800 text-center">
                <span className="text-[11px] text-slate-500 font-mono">Tüm olaylar Audit Trail'de arşivlenir.</span>
              </div>
            </div>
          )}
        </div>

        {/* Admin Profile Dropdown & Quick Logout */}
        <div className="relative" ref={profileRef}>
          <button
            onClick={() => setIsProfileOpen(!isProfileOpen)}
            className="flex items-center gap-2 p-1.5 sm:px-2.5 sm:py-1.5 bg-slate-950/80 hover:bg-slate-800 border border-slate-800 rounded-xl transition-all"
          >
            <img 
              src={adminUser?.avatar} 
              alt="Admin" 
              className="w-7 h-7 rounded-lg object-cover ring-1 ring-blue-500/30 shrink-0" 
            />
            <div className="text-left hidden md:block">
              <span className="text-xs font-bold text-white block leading-none">{adminUser?.name?.split(' ')[0]}</span>
              <span className="text-[10px] text-emerald-400 font-mono leading-none">Online</span>
            </div>
            <ChevronDown className="w-3 h-3 text-slate-400 hidden sm:block" />
          </button>

          {isProfileOpen && (
            <div className="absolute right-0 mt-2 w-56 bg-slate-900 border border-slate-800 rounded-2xl shadow-2xl p-2 z-50 space-y-1 animate-in fade-in slide-in-from-top-2 duration-200">
              <div className="p-2.5 bg-slate-950/60 rounded-xl border border-slate-800/80 mb-1">
                <p className="text-xs font-bold text-white truncate">{adminUser?.name}</p>
                <p className="text-[11px] text-slate-400 truncate">{adminUser?.email}</p>
                <span className="inline-block mt-1 px-2 py-0.5 bg-blue-500/10 text-blue-400 border border-blue-500/20 rounded-md text-[10px] font-bold">
                  {adminUser?.badge || 'Super Admin'}
                </span>
              </div>

              <button
                onClick={logout}
                className="w-full p-2 text-rose-400 hover:bg-rose-500/10 rounded-xl text-xs font-bold flex items-center gap-2 transition-colors"
              >
                <LogOut className="w-4 h-4" />
                <span>Güvenli Çıkış Yap</span>
              </button>
            </div>
          )}
        </div>

        {/* Direct Logout Action Button */}
        <button
          onClick={logout}
          title="Güvenli Çıkış Yap (Logout)"
          className="hidden sm:flex items-center gap-1.5 px-3 py-1.5 bg-rose-500/10 hover:bg-rose-500/20 text-rose-400 border border-rose-500/20 rounded-xl text-xs font-bold transition-colors"
        >
          <LogOut className="w-3.5 h-3.5" />
          <span>Çıkış</span>
        </button>
      </div>
    </header>
  );
}
