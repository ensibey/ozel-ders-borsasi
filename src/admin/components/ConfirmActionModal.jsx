import React, { useEffect } from 'react';
import { 
  AlertTriangle, 
  Trash2, 
  X, 
  Loader2, 
  ShieldAlert,
  Ban
} from 'lucide-react';

/**
 * ConfirmActionModal: Confirmation dialog for destructive / dangerous administrative actions.
 * Features red danger styling, backdrop dismiss, ESC key support, and loading states.
 */
export default function ConfirmActionModal({
  isOpen,
  onClose,
  onConfirm,
  title = 'İşlemi Onaylayın',
  description = 'Bu işlem geri alınamaz. Devam etmek istediğinize emin misiniz?',
  targetName = '',
  confirmText = 'Evet, Kalıcı Olarak Sil',
  cancelText = 'İptal Et',
  variant = 'danger', // 'danger', 'warning'
  isLoading = false
}) {
  // ESC key handler
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === 'Escape' && isOpen && !isLoading) {
        onClose();
      }
    };
    if (isOpen) {
      window.addEventListener('keydown', handleKeyDown);
    }
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, isLoading, onClose]);

  if (!isOpen) return null;

  const isDanger = variant === 'danger';

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 select-none">
      {/* 1. Backdrop Overlay */}
      <div 
        onClick={() => !isLoading && onClose()} 
        className="fixed inset-0 bg-slate-950/80 backdrop-blur-md transition-opacity animate-in fade-in"
      />

      {/* 2. Modal Window */}
      <div 
        role="alertdialog"
        aria-modal="true"
        className="relative w-full max-w-md bg-slate-900 border border-slate-800 rounded-3xl p-6 shadow-2xl z-10 animate-in fade-in zoom-in-95 duration-200 text-left"
      >
        {/* Header Icon & Close */}
        <div className="flex items-start justify-between">
          <div className={`w-12 h-12 rounded-2xl flex items-center justify-center ${
            isDanger ? 'bg-rose-500/10 text-rose-400 border border-rose-500/20' : 'bg-amber-500/10 text-amber-400 border border-amber-500/20'
          }`}>
            {isDanger ? <ShieldAlert className="w-6 h-6 animate-pulse" /> : <AlertTriangle className="w-6 h-6" />}
          </div>

          <button
            onClick={onClose}
            disabled={isLoading}
            className="p-2 text-slate-400 hover:text-white hover:bg-slate-800 rounded-xl transition-colors disabled:opacity-50"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Content */}
        <div className="mt-4 space-y-2">
          <h2 className="text-base font-extrabold text-white tracking-tight">
            {title}
          </h2>
          <p className="text-xs text-slate-400 leading-relaxed">
            {description}
          </p>

          {targetName && (
            <div className="p-3 bg-slate-950/80 border border-slate-800 rounded-xl text-xs font-mono text-slate-300 break-all">
              <span className="text-slate-500 block text-[10px] uppercase font-bold tracking-wider">Hedef Kayıt:</span>
              <span className="font-bold text-white">{targetName}</span>
            </div>
          )}
        </div>

        {/* Actions */}
        <div className="flex items-center justify-end gap-3 mt-6 pt-4 border-t border-slate-800">
          <button
            type="button"
            disabled={isLoading}
            onClick={onClose}
            className="px-4 py-2.5 bg-slate-800 hover:bg-slate-700 text-slate-300 hover:text-white text-xs font-bold rounded-xl transition-colors disabled:opacity-50"
          >
            {cancelText}
          </button>

          <button
            type="button"
            disabled={isLoading}
            onClick={onConfirm}
            className={`px-5 py-2.5 text-white text-xs font-bold rounded-xl shadow-lg transition-all flex items-center gap-2 disabled:opacity-50 ${
              isDanger 
                ? 'bg-rose-600 hover:bg-rose-500 shadow-rose-600/20' 
                : 'bg-amber-600 hover:bg-amber-500 shadow-amber-600/20'
            }`}
          >
            {isLoading ? (
              <>
                <Loader2 className="w-4 h-4 animate-spin" />
                <span>İşleniyor...</span>
              </>
            ) : (
              <>
                {isDanger ? <Trash2 className="w-4 h-4" /> : <Ban className="w-4 h-4" />}
                <span>{confirmText}</span>
              </>
            )}
          </button>
        </div>
      </div>
    </div>
  );
}
