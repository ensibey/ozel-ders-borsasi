import React from 'react';
import { 
  GraduationCap, MapPin, Search, ShoppingBag, Bell, Video, 
  Award, ShieldCheck, UserCheck, Sparkles, BookOpen, Crown, Palette, Send, Lock
} from 'lucide-react';

export default function Navbar({
  currentRole,
  onRoleChange,
  selectedCity,
  selectedDistrict,
  onOpenLocationModal,
  cartCount,
  onOpenCart,
  notificationCount,
  onOpenNotifications,
  searchQuery,
  onSearchChange,
  onOpenClassroom,
  onOpenExamSimulator,
  onOpenAffiliateModal,
  onOpenThemeCustomizer,
  onOpenRequestWizard,
  onOpenCreateProfile,
  onRequestAuthRole
}) {
  const roles = [
    { id: 'general', label: 'Genel Pazar Alanı', icon: BookOpen, protected: false },
    { id: 'requests', label: 'Canlı Talep & İhale Havuzu', icon: Sparkles, protected: false },
    { id: 'student', label: 'Öğrenci Özel', icon: GraduationCap, protected: false },
    { id: 'parent', label: 'Veli Portalı', icon: ShieldCheck, protected: false },
    { id: 'teacher', label: 'Öğretmen Özel', icon: UserCheck, protected: true },
    { id: 'vendor', label: 'Firma & Yayın Evi', icon: Award, protected: true }
  ];

  const handleRoleClick = (roleObj) => {
    if (roleObj.protected && currentRole !== roleObj.id) {
      onRequestAuthRole(roleObj.id);
    } else {
      onRoleChange(roleObj.id);
    }
  };

  return (
    <header className="sticky top-0 z-40 w-full glass-panel border-b border-slate-800/80 shadow-lg backdrop-blur-xl">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Top Navbar Row */}
        <div className="flex items-center justify-between h-16 sm:h-20 gap-4">
          
          {/* Logo & Mandatory City Selector */}
          <div className="flex items-center space-x-3 sm:space-x-4">
            <div 
              onClick={() => onRoleChange('general')}
              className="flex items-center space-x-2.5 cursor-pointer group"
            >
              <img 
                src="/logo.png" 
                alt="Özel Ders Borsası Logo" 
                className="w-10 h-10 rounded-2xl object-cover shadow-lg shadow-amber-900/30 group-hover:scale-105 transition-transform border border-amber-400/40 shrink-0" 
              />
              <div className="hidden sm:block">
                <span className="text-lg font-extrabold text-white tracking-tight glow-text block leading-none">
                  ÖZEL DERS BORSASI
                </span>
                <span className="text-[10px] text-emerald-400 font-semibold tracking-wider uppercase">
                  TÜRKİYE'NİN ÖZEL DERS PAZARI
                </span>
              </div>
            </div>

            {/* Mandatory City & District Button */}
            <button
              onClick={onOpenLocationModal}
              className="flex items-center space-x-1.5 px-3 py-1.5 rounded-xl bg-indigo-950/60 border border-indigo-500/30 text-indigo-300 hover:bg-indigo-900/40 hover:text-white transition-all text-xs font-semibold"
              title="Şehir ve ilçe konumu seçin"
            >
              <MapPin className="w-3.5 h-3.5 text-indigo-400 shrink-0 animate-bounce" />
              <span className="truncate max-w-[120px] font-bold">
                {selectedCity} {selectedDistrict ? `/ ${selectedDistrict}` : ''}
              </span>
            </button>
          </div>

          {/* Center Search Input */}
          <div className="flex-1 max-w-xs sm:max-w-md hidden md:block">
            <div className="relative">
              <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => onSearchChange(e.target.value)}
                placeholder="Öğretmen adı, branş veya özel ders talebi ara..."
                className="w-full glass-input rounded-2xl pl-10 pr-4 py-2 text-xs text-white placeholder-slate-400 focus:outline-none"
              />
            </div>
          </div>

          {/* Right Action Icons & Badges */}
          <div className="flex items-center space-x-2 sm:space-x-3">

            {/* Prominent Teacher Profile Creation Trigger */}
            <button
              onClick={onOpenCreateProfile}
              className="hidden lg:flex items-center space-x-1.5 px-3.5 py-2 rounded-xl bg-indigo-600/30 hover:bg-indigo-600/50 text-indigo-200 border border-indigo-500/40 font-bold text-xs transition-all"
              title="Eğitmen profili oluşturun"
            >
              <UserCheck className="w-3.5 h-3.5 text-indigo-400" />
              <span>Eğitmen Profili Oluştur</span>
            </button>

            {/* Prominent Request Wizard Trigger */}
            <button
              onClick={onOpenRequestWizard}
              className="flex items-center space-x-1.5 px-3.5 py-2 rounded-xl bg-gradient-to-r from-emerald-600 to-teal-600 text-white font-extrabold text-xs shadow-lg shadow-emerald-600/30 hover:scale-105 transition-transform"
            >
              <Send className="w-3.5 h-3.5" />
              <span>Ders Talebi Oluştur</span>
            </button>

            {/* Theme Customizer Trigger */}
            <button
              onClick={onOpenThemeCustomizer}
              className="p-2 rounded-xl bg-slate-900 border border-slate-800 text-purple-400 hover:text-purple-300 transition-colors"
              title="Görsel Temayı Değiştir"
            >
              <Palette className="w-4 h-4" />
            </button>

            {/* Live Virtual Classroom Button */}
            <button
              onClick={onOpenClassroom}
              className="hidden lg:flex items-center space-x-1.5 px-3 py-2 rounded-xl bg-slate-900 border border-indigo-500/30 text-indigo-300 font-bold text-xs hover:bg-slate-800"
            >
              <Video className="w-3.5 h-3.5" />
              <span>Canlı Sınıf</span>
            </button>

            {/* Cart Button */}
            <button
              onClick={onOpenCart}
              className="relative p-2 rounded-xl bg-slate-900 border border-slate-800 text-slate-300 hover:text-white transition-colors"
              title="Satış Alanı Sepeti"
            >
              <ShoppingBag className="w-4 h-4" />
              {cartCount > 0 && (
                <span className="absolute -top-1.5 -right-1.5 w-5 h-5 rounded-full bg-indigo-600 text-white text-[10px] font-extrabold flex items-center justify-center shadow-md animate-pulse">
                  {cartCount}
                </span>
              )}
            </button>

            {/* Notifications Button */}
            <button
              onClick={onOpenNotifications}
              className="relative p-2 rounded-xl bg-slate-900 border border-slate-800 text-slate-300 hover:text-white transition-colors"
              title="Platform Duyuruları"
            >
              <Bell className="w-4 h-4" />
              {notificationCount > 0 && (
                <span className="absolute top-1 right-1 w-2 h-2 rounded-full bg-rose-500 animate-ping" />
              )}
            </button>

          </div>
        </div>

        {/* Bottom Navigation Tabs for Role Switcher */}
        <div className="flex items-center space-x-1 overflow-x-auto custom-scrollbar py-2 border-t border-slate-800/60">
          {roles.map((r) => {
            const Icon = r.icon;
            const isActive = currentRole === r.id;
            return (
              <button
                key={r.id}
                onClick={() => handleRoleClick(r)}
                className={`px-3.5 py-1.5 rounded-xl text-xs font-bold whitespace-nowrap flex items-center space-x-1.5 transition-all ${
                  isActive
                    ? 'bg-emerald-600 text-white shadow-md shadow-emerald-600/30 scale-105'
                    : 'text-slate-400 hover:text-slate-200 hover:bg-slate-900/60'
                }`}
              >
                <Icon className={`w-3.5 h-3.5 ${isActive ? 'text-white' : 'text-emerald-400'}`} />
                <span>{r.label}</span>
                {r.protected && <Lock className="w-3 h-3 text-amber-400 ml-1" />}
              </button>
            );
          })}
        </div>

      </div>
    </header>
  );
}
