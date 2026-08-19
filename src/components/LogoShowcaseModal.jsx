import React, { useState, useEffect } from 'react';
import { X, Check, Image as ImageIcon, Sparkles, Download } from 'lucide-react';
import confetti from 'canvas-confetti';

export default function LogoShowcaseModal({ isOpen, onClose }) {
  const logos = [
    { id: 1, name: '1. Neon Indigo Glassmorphism', url: '/logos/db_logo_1_1786535019537.jpg', tag: 'Neon Gece' },
    { id: 2, name: '2. Emerald Cyan 3D Metalik', url: '/logos/db_logo_2_1786535032484.jpg', tag: 'Zümrüt Yeşil' },
    { id: 3, name: '3. Gold & Navy Royal Crest', url: '/logos/db_logo_3_1786535047935.jpg', tag: 'Altın Armalı' },
    { id: 4, name: '4. Minimalist Line-Art Tech', url: '/logos/db_logo_4_1786535060962.jpg', tag: 'Mat Charcoal' },
    { id: 5, name: '5. Neon Violet Cyberpunk Glow', url: '/logos/db_logo_5_1786535074829.jpg', tag: 'Fuşya Neon' },
    { id: 6, name: '6. Clean White Modern Vector', url: '/logos/db_logo_6_1786535090051.jpg', tag: 'Aydınlık Beyaz' },
    { id: 7, name: '7. Stock Exchange Neon Line', url: '/logos/db_logo_7_1786535107499.jpg', tag: 'Borsa Çizgili' },
    { id: 8, name: '8. Hexagonal Shield Emblem', url: '/logos/db_logo_8_1786535126780.jpg', tag: 'Hexagon Arma' },
    { id: 9, name: '9. Scandinavian Pastel Flat', url: '/logos/db_logo_9_1786535144889.jpg', tag: 'İskandinav Düz' },
    { id: 10, name: '10. Iridescent Holographic Sphere', url: '/logos/db_logo_10_1786535164619.jpg', tag: 'Holografik AI' }
  ];

  const [selectedLogo, setSelectedLogo] = useState(logos[0]);

  
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

  const handleSelect = (logo) => {
    setSelectedLogo(logo);
    confetti({ particleCount: 50, spread: 50 });
  };

  return (
    <div onClick={onClose} className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/85 backdrop-blur-md animate-fadeIn">
      <div onClick={(e) => e.stopPropagation()} className="glass-panel w-full max-w-4xl rounded-3xl p-6 sm:p-8 border border-indigo-500/30 shadow-2xl relative space-y-6 max-h-[90vh] overflow-y-auto custom-scrollbar">
        
        {/* Header */}
        <div className="flex items-center justify-between pb-3 border-b border-slate-800">
          <div className="flex items-center space-x-2">
            <Sparkles className="w-6 h-6 text-amber-400" />
            <div>
              <h2 className="text-base font-bold text-white">10 Farklı "DB" Özel Ders Borsası Logo Galerisi</h2>
              <p className="text-xs text-slate-400">Tasarımı yapılan 10 farklı logo `public/logos` klasörüne başarıyla kaydedilmiştir.</p>
            </div>
          </div>
          <button onClick={onClose} className="p-1.5 rounded-xl bg-slate-900 text-slate-400 hover:text-white">
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Selected Logo Big Display */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 items-center">
          <div className="md:col-span-1 rounded-2xl overflow-hidden aspect-square border-2 border-indigo-500/50 shadow-2xl bg-slate-900">
            <img src={selectedLogo.url} alt={selectedLogo.name} className="w-full h-full object-cover" />
          </div>

          <div className="md:col-span-2 space-y-3">
            <span className="px-3 py-1 rounded-full bg-indigo-500/20 text-indigo-300 text-xs font-bold border border-indigo-500/30">
              {selectedLogo.tag}
            </span>
            <h3 className="text-xl font-extrabold text-white">{selectedLogo.name}</h3>
            <p className="text-xs text-slate-300">
              Altında "Özel Ders Borsası" tipografisi bulunan "DB" monogram özel vektör logo çalışması.
            </p>
            
            <a
              href={selectedLogo.url}
              download={`${selectedLogo.name}.jpg`}
              className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white text-xs font-bold shadow-md"
            >
              <Download className="w-4 h-4" />
              <span>Yüksek Çözünürlüklü Logoyu İndir</span>
            </a>
          </div>
        </div>

        {/* 10 Logos Thumbnail Grid */}
        <div className="grid grid-cols-2 sm:grid-cols-5 gap-3 pt-4 border-t border-slate-800">
          {logos.map((logo) => (
            <button
              key={logo.id}
              onClick={() => handleSelect(logo)}
              className={`rounded-xl overflow-hidden border-2 p-1 text-left transition-all ${
                selectedLogo.id === logo.id
                  ? 'border-indigo-500 bg-indigo-600/20 scale-105 shadow-md'
                  : 'border-slate-800 bg-slate-900/60 hover:border-slate-700'
              }`}
            >
              <img src={logo.url} alt={logo.name} className="w-full aspect-square object-cover rounded-lg mb-1" />
              <span className="text-[10px] font-bold text-slate-300 truncate block px-1">{logo.name}</span>
            </button>
          ))}
        </div>

      </div>
    </div>
  );
}
