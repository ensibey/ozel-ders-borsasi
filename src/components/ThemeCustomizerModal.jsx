import React, { useState, useEffect } from 'react';
import { X, Palette, Check, Sparkles, Moon, Sun, Shield } from 'lucide-react';
import confetti from 'canvas-confetti';

export default function ThemeCustomizerModal({ isOpen, onClose, currentTheme, onSelectTheme }) {
  
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

  const themes = [
    {
      id: 'dark',
      name: 'Cyberpunk Midnight (Varsayılan Dark)',
      desc: 'Siyah ve neondiyum mor cam efektli gece teması',
      previewBg: 'bg-slate-950 border-indigo-500',
      badgeColor: 'bg-indigo-600'
    },
    {
      id: 'violet',
      name: 'Neon Violet Glass',
      desc: 'Yüksek kontrastlı mor ve fuşya neon aksanları',
      previewBg: 'bg-purple-950 border-fuchsia-500',
      badgeColor: 'bg-fuchsia-600'
    },
    {
      id: 'emerald',
      name: 'Ocean Emerald Teal',
      desc: 'Zümrüt yeşili ve turkuaz odaklanma renkleri',
      previewBg: 'bg-teal-950 border-emerald-500',
      badgeColor: 'bg-emerald-600'
    },
    {
      id: 'light',
      name: 'Clean Light Glass (Aydınlık Tema)',
      desc: 'Ferah gündüz tasarımı, yüksek okunabilirlik',
      previewBg: 'bg-slate-100 border-slate-300 text-slate-900',
      badgeColor: 'bg-indigo-600'
    }
  ];

  const handleSelect = (tId) => {
    onSelectTheme(tId);
    confetti({ particleCount: 50, spread: 50 });
  };

  return (
    <div onClick={onClose} className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/85 backdrop-blur-md animate-fadeIn">
      <div onClick={(e) => e.stopPropagation()} className="glass-panel w-full max-w-lg rounded-3xl p-6 sm:p-8 border border-indigo-500/30 shadow-2xl relative space-y-6">
        
        <div className="flex items-center justify-between pb-3 border-b border-slate-800">
          <div className="flex items-center space-x-2">
            <Palette className="w-6 h-6 text-indigo-400" />
            <h2 className="text-base font-bold text-white">Görsel Tema & Renk Ayarları</h2>
          </div>
          <button onClick={onClose} className="p-1.5 rounded-xl bg-slate-900 text-slate-400 hover:text-white">
            <X className="w-5 h-5" />
          </button>
        </div>

        <p className="text-xs text-slate-300">
          Platformun görsel stilini kişisel tercihinize veya gece/gündüz çalışma ortamınıza göre özelleştirin.
        </p>

        <div className="space-y-3">
          {themes.map((t) => (
            <button
              key={t.id}
              onClick={() => handleSelect(t.id)}
              className={`w-full p-4 rounded-2xl border text-left transition-all flex items-center justify-between ${
                currentTheme === t.id
                  ? 'bg-indigo-600/30 border-indigo-500 text-white shadow-lg shadow-indigo-600/20 scale-[1.02]'
                  : 'bg-slate-900/60 border-slate-800 text-slate-300 hover:border-slate-700'
              }`}
            >
              <div className="flex items-center space-x-3">
                <div className={`w-8 h-8 rounded-xl border ${t.previewBg} flex items-center justify-center`}>
                  <Sparkles className="w-4 h-4 text-white" />
                </div>
                <div>
                  <h4 className="text-xs font-bold text-white">{t.name}</h4>
                  <p className="text-[11px] text-slate-400">{t.desc}</p>
                </div>
              </div>

              {currentTheme === t.id && (
                <div className="w-6 h-6 rounded-full bg-indigo-500 text-white flex items-center justify-center">
                  <Check className="w-4 h-4" />
                </div>
              )}
            </button>
          ))}
        </div>

      </div>
    </div>
  );
}
