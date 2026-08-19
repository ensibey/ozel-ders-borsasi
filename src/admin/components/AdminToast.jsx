import React, { useEffect } from 'react';
import { CheckCircle2, AlertCircle, AlertTriangle, Info, X } from 'lucide-react';

/**
 * AdminToast: Enterprise Toast Notification component for admin feedback.
 * Supports 'success', 'error', 'warning', 'info' types with auto-dismiss.
 */
export default function AdminToast({ toast, onClose }) {
  useEffect(() => {
    if (!toast) return;
    const timer = setTimeout(() => {
      onClose();
    }, 4000);
    return () => clearTimeout(timer);
  }, [toast, onClose]);

  if (!toast) return null;

  const { message, type = 'info' } = toast;

  const icons = {
    success: <CheckCircle2 className="w-5 h-5 text-emerald-400 shrink-0" />,
    error: <AlertCircle className="w-5 h-5 text-rose-400 shrink-0" />,
    warning: <AlertTriangle className="w-5 h-5 text-amber-400 shrink-0" />,
    info: <Info className="w-5 h-5 text-blue-400 shrink-0" />
  };

  const borders = {
    success: 'border-emerald-500/40 bg-slate-900/95 text-emerald-100 shadow-emerald-500/10',
    error: 'border-rose-500/40 bg-slate-900/95 text-rose-100 shadow-rose-500/10',
    warning: 'border-amber-500/40 bg-slate-900/95 text-amber-100 shadow-amber-500/10',
    info: 'border-blue-500/40 bg-slate-900/95 text-blue-100 shadow-blue-500/10'
  };

  return (
    <div className="fixed bottom-6 right-6 z-50 max-w-sm w-full animate-in fade-in slide-in-from-bottom-4 duration-300">
      <div className={`p-4 rounded-2xl border shadow-2xl backdrop-blur-xl flex items-start gap-3 ${borders[type] || borders.info}`}>
        <div className="mt-0.5">{icons[type] || icons.info}</div>
        
        <div className="flex-1 min-w-0">
          <p className="text-xs font-bold text-white tracking-tight">
            {type === 'success' ? 'İşlem Başarılı' : type === 'error' ? 'Hata Oluştu' : type === 'warning' ? 'Güvenlik Uyarısı' : 'Sistem Bildirimi'}
          </p>
          <p className="text-xs text-slate-300 mt-0.5 leading-snug">{message}</p>
        </div>

        <button
          onClick={onClose}
          className="p-1 text-slate-400 hover:text-white rounded-lg transition-colors shrink-0"
        >
          <X className="w-4 h-4" />
        </button>
      </div>
    </div>
  );
}
