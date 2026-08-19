import React from 'react';
import { ShieldAlert, Lock, ArrowLeft, LogIn, KeyRound } from 'lucide-react';

export default function Unauthorized403({ currentRole, onSwitchRole, onOpenLogin }) {
  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 flex flex-col items-center justify-center p-6 relative overflow-hidden font-sans selection:bg-rose-500 selection:text-white">
      {/* Background glow effects */}
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-rose-600/10 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-10 left-10 w-72 h-72 bg-blue-600/5 rounded-full blur-2xl pointer-events-none" />

      <div className="max-w-md w-full bg-slate-900/90 border border-slate-800 rounded-3xl p-8 shadow-2xl backdrop-blur-xl relative z-10 text-center">
        {/* Shield Icon */}
        <div className="w-20 h-20 bg-rose-500/10 border border-rose-500/30 rounded-2xl flex items-center justify-center mx-auto mb-6 text-rose-500 shadow-inner">
          <ShieldAlert className="w-10 h-10 animate-pulse" />
        </div>

        {/* Badge */}
        <span className="inline-flex items-center gap-1.5 px-3 py-1 bg-rose-500/10 border border-rose-500/20 text-rose-400 text-xs font-bold rounded-full uppercase tracking-wider mb-3">
          <Lock className="w-3.5 h-3.5" /> 403 Forbidden • Yetkisiz Erişim
        </span>

        <h1 className="text-2xl font-black text-white tracking-tight mb-2">
          Güvenlik Duvarı Engeli
        </h1>
        <p className="text-sm text-slate-400 leading-relaxed mb-6">
          Bu alan yalnızca üst düzey yetkili <strong className="text-slate-200">Sistem Yöneticileri (Role: Admin)</strong> için rezerve edilmiştir. Mevcut oturum rolünüz: <span className="px-2 py-0.5 bg-slate-800 rounded text-amber-400 font-mono text-xs">{currentRole || 'Misafir'}</span>.
        </p>

        {/* Security Notice Box */}
        <div className="p-3.5 bg-slate-950/70 border border-slate-800/80 rounded-2xl text-left text-xs text-slate-400 space-y-1.5 mb-6 font-mono">
          <div className="flex justify-between">
            <span className="text-slate-500">Protokol:</span>
            <span className="text-rose-400 font-semibold">RBAC Strict Check</span>
          </div>
          <div className="flex justify-between">
            <span className="text-slate-500">Güvenlik İzi:</span>
            <span className="text-slate-300">LOG-REQ-{Math.floor(100000 + Math.random() * 900000)}</span>
          </div>
          <div className="flex justify-between">
            <span className="text-slate-500">IP Denetimi:</span>
            <span className="text-emerald-400">Kayıt Altına Alındı</span>
          </div>
        </div>

        {/* Actions */}
        <div className="flex flex-col gap-3">
          <button
            onClick={() => {
              if (onOpenLogin) onOpenLogin('admin');
            }}
            className="w-full py-3 px-4 bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-500 hover:to-indigo-500 text-white font-bold text-sm rounded-xl shadow-lg shadow-blue-600/20 transition-all flex items-center justify-center gap-2"
          >
            <KeyRound className="w-4 h-4" />
            Yönetici Olarak Kimlik Doğrula
          </button>

          <button
            onClick={() => {
              window.location.hash = '';
              if (onSwitchRole) onSwitchRole('general');
            }}
            className="w-full py-2.5 px-4 bg-slate-800 hover:bg-slate-700 border border-slate-700 text-slate-300 font-semibold text-sm rounded-xl transition-all flex items-center justify-center gap-2"
          >
            <ArrowLeft className="w-4 h-4" />
            Ana Pazara Geri Dön
          </button>
        </div>
      </div>

      <div className="mt-8 text-center text-xs text-slate-600">
        Özel Ders Borsası • Bağımsız Yönetim & Güvenlik Mimarisi v2.4
      </div>
    </div>
  );
}
