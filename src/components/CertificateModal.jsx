import React, { useEffect } from 'react';
import { X, Award, Download, Printer, ShieldCheck, Sparkles } from 'lucide-react';
import confetti from 'canvas-confetti';

export default function CertificateModal({ isOpen, onClose, studentName, courseTitle }) {
  
  useEffect(() => {
    if (!isOpen) return;
    const handleKeyDown = (e) => {
      if (e.key === 'Escape') onClose();
    };
    document.body.style.overflow = 'hidden';
    window.addEventListener('keydown', handleKeyDown);
    return () => {
      document.body.style.overflow = 'unset';
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  const handlePrint = () => {
    confetti({ particleCount: 80, spread: 60 });
    window.print();
  };

  return (
    <div onClick={onClose} className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/85 backdrop-blur-md animate-fadeIn">
      <div onClick={(e) => e.stopPropagation()} className="glass-panel w-full max-w-2xl rounded-3xl p-6 sm:p-8 border border-amber-500/40 shadow-2xl relative space-y-6">
        
        {/* Header */}
        <div className="flex items-center justify-between pb-3 border-b border-slate-800">
          <div className="flex items-center space-x-2">
            <Award className="w-6 h-6 text-amber-400" />
            <h2 className="text-base font-bold text-white">Resmi Ders Tamamlama Başarı Sertifikası</h2>
          </div>
          <button onClick={onClose} className="p-1.5 rounded-xl bg-slate-900 text-slate-400 hover:text-white">
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Certificate Frame Display */}
        <div className="p-8 rounded-2xl bg-gradient-to-b from-slate-900 via-slate-950 to-slate-900 border-4 border-double border-amber-500/50 text-center space-y-4 relative overflow-hidden shadow-2xl">
          
          <div className="absolute top-3 left-3 text-[10px] text-slate-500 font-mono">SER-NO: #ODB-2026-9941</div>
          <div className="absolute top-3 right-3 text-[10px] text-emerald-400 font-mono flex items-center gap-1">
            <ShieldCheck className="w-3.5 h-3.5" />
            <span>Doğrulanmış Dijital Belge</span>
          </div>

          <div className="w-14 h-14 rounded-full bg-gradient-to-tr from-amber-500 to-orange-500 text-slate-950 flex items-center justify-center mx-auto shadow-lg shadow-amber-500/30">
            <Award className="w-8 h-8" />
          </div>

          <div className="text-xs uppercase tracking-widest font-extrabold text-amber-400">
            Özel Ders Borsası Eğitim Akademisi
          </div>

          <h3 className="text-2xl font-serif italic text-white font-bold">
            BAŞARI SERTİFİKASI
          </h3>

          <p className="text-xs text-slate-300 max-w-md mx-auto leading-relaxed">
            Bu belge, Sayın <span className="text-indigo-300 font-bold text-sm underline">{studentName || 'Mert Yılmaz'}</span>'ın platformumuz bünyesinde düzenlenen <span className="text-amber-300 font-bold">{courseTitle || '2026 YKS Matematik & Geometri İleri Düzey Seansı'}</span> eğitimini başarıyla tamamladığını belgelendirir.
          </p>

          <div className="pt-6 border-t border-slate-800 flex items-center justify-between text-xs text-slate-400">
            <div>
              <span className="block font-bold text-white">Prof. Dr. Ahmet Yılmaz</span>
              <span className="text-[10px]">Başeğitmen & Danışman</span>
            </div>
            <div>
              <span className="block font-bold text-white">12 Ağustos 2026</span>
              <span className="text-[10px]">Veriliş Tarihi</span>
            </div>
          </div>

        </div>

        {/* Footer Actions */}
        <div className="flex items-center justify-end space-x-3">
          <button
            onClick={handlePrint}
            className="px-5 py-2.5 rounded-xl bg-indigo-600 hover:bg-indigo-500 text-white font-bold text-xs shadow-md flex items-center gap-2"
          >
            <Printer className="w-4 h-4" />
            <span>Sertifikayı İndir & Yazdır</span>
          </button>
        </div>

      </div>
    </div>
  );
}
