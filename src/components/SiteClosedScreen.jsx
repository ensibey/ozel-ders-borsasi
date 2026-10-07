import React from 'react';
import { ShieldAlert, Lock, Mail, AlertTriangle, Power } from 'lucide-react';

/**
 * SiteClosedScreen:
 * Siteye ulaşmaya çalışan tüm ziyaretçilerin karşılaştığı resmi kapatılma ekranı.
 */
export default function SiteClosedScreen({ onOpenAdminLogin }) {
  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 flex flex-col justify-between selection:bg-rose-500 selection:text-white font-sans relative overflow-hidden select-none">
      
      {/* Background Ambient Glows */}
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-rose-600/10 rounded-full blur-[140px] pointer-events-none" />
      <div className="absolute bottom-10 right-10 w-96 h-96 bg-red-900/10 rounded-full blur-[120px] pointer-events-none" />

      {/* Top Simple Bar */}
      <header className="p-6 sm:p-8 flex items-center justify-between relative z-10 max-w-6xl w-full mx-auto">
        <div className="flex items-center gap-3">
          <img 
            src="./logo.png" 
            alt="Logo" 
            className="w-10 h-10 rounded-2xl object-cover grayscale opacity-80 ring-1 ring-slate-800"
            onError={(e) => { e.currentTarget.style.display = 'none'; }}
          />
          <div className="leading-tight">
            <span className="font-extrabold text-sm sm:text-base text-slate-200 tracking-tight">Özel Ders Borsası</span>
            <span className="block text-[10px] text-slate-500 font-mono">ozeldersborsasi.com</span>
          </div>
        </div>

        <div className="flex items-center gap-2 px-3 py-1 rounded-full bg-rose-500/10 border border-rose-500/30 text-rose-400 text-xs font-bold">
          <span className="w-2 h-2 rounded-full bg-rose-500 animate-pulse inline-block" />
          <span>KAPALI</span>
        </div>
      </header>

      {/* Center Main Notice */}
      <main className="flex-1 flex flex-col items-center justify-center p-6 text-center max-w-2xl mx-auto w-full relative z-10 my-8">
        
        {/* Pulsing Alert Icon */}
        <div className="relative mb-6">
          <div className="w-24 h-24 rounded-3xl bg-rose-500/10 border-2 border-rose-500/30 text-rose-400 flex items-center justify-center shadow-2xl shadow-rose-500/20">
            <ShieldAlert className="w-12 h-12" />
          </div>
          <div className="absolute -bottom-2 -right-2 p-1.5 rounded-xl bg-slate-900 border border-slate-800 text-slate-400">
            <Power className="w-4 h-4 text-rose-400" />
          </div>
        </div>

        {/* Status Pill */}
        <div className="mb-4 inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-rose-950/60 border border-rose-800/60 text-rose-300 text-xs font-black uppercase tracking-wider">
          <AlertTriangle className="w-3.5 h-3.5" />
          <span>Hizmet Sonlandırma Bildirimi</span>
        </div>

        {/* Big Bold Headline */}
        <h1 className="text-3xl sm:text-5xl font-black text-white tracking-tight mb-4">
          SİTE KAPATILMIŞTIR
        </h1>

        {/* Description */}
        <p className="text-sm sm:text-base text-slate-300 max-w-lg mx-auto leading-relaxed mb-8">
          Özel Ders Borsası platformunun faaliyetleri sonlandırılmış olup web sitemiz erişime ve tüm işlemlere kapatılmıştır.
        </p>

        {/* Information Detail Box */}
        <div className="w-full bg-slate-900/80 border border-slate-800 rounded-3xl p-5 sm:p-6 text-left space-y-3.5 shadow-xl text-xs sm:text-sm">
          <div className="flex items-start gap-3">
            <div className="w-2 h-2 rounded-full bg-rose-500 mt-2 shrink-0" />
            <p className="text-slate-300 leading-relaxed">
              Platform üzerinden yeni üyelik, ders rezervasyonu, eğitmen başvurusu veya materyal satışı gerçekleştirilememektedir.
            </p>
          </div>

          <div className="flex items-start gap-3">
            <div className="w-2 h-2 rounded-full bg-slate-600 mt-2 shrink-0" />
            <p className="text-slate-400 leading-relaxed">
              Geçmiş işlemler veya kurumsal talepleriniz için resmi destek adresimiz üzerinden iletişime geçebilirsiniz.
            </p>
          </div>

          <div className="pt-3 border-t border-slate-800/80 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 text-xs">
            <span className="text-slate-400 flex items-center gap-1.5">
              <Mail className="w-4 h-4 text-rose-400 shrink-0" />
              <span>İletişim: <strong className="text-slate-200 font-mono">destek@ozeldersborsasi.com</strong></span>
            </span>
            <span className="text-slate-500 font-mono text-[11px]">
              Tüm hakları saklıdır © 2026
            </span>
          </div>
        </div>

      </main>

      {/* Footer & Discreet Admin Login */}
      <footer className="p-6 text-center text-xs text-slate-600 relative z-10 max-w-6xl w-full mx-auto flex flex-col sm:flex-row items-center justify-between gap-3">
        <span>Özel Ders Borsası Platformu • Resmi Kapatılma Tebligatı</span>
        
        {/* Discreet Admin Login Trigger */}
        <button
          type="button"
          onClick={onOpenAdminLogin}
          className="text-slate-500 hover:text-slate-300 transition-colors flex items-center gap-1.5 py-1 px-2.5 rounded-lg hover:bg-slate-900 text-[11px] font-semibold"
          title="Yönetici Portalı Girişi"
        >
          <Lock className="w-3 h-3" />
          <span>Yönetici Girişi</span>
        </button>
      </footer>

    </div>
  );
}
