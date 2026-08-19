import React, { useState, useEffect } from 'react';
import { X, Play, BookOpen, Clock, CheckCircle2, ShoppingCart, Award, Star } from 'lucide-react';
import confetti from 'canvas-confetti';

export default function MasterclassModal({ isOpen, onClose, product, onAddToCart }) {
  const [activeModule, setActiveModule] = useState(0);

  if (!isOpen || !product) return null;

  const modules = [
    { title: 'Modül 1: Temel Kavramlar & Hızlı Kestirme Yollar', duration: '45 Dk', status: 'Önizleme Açık' },
    { title: 'Modül 2: Çıkmış ÖSYM & LGS Soru Kalıpları Analizi', duration: '60 Dk', status: 'Kilitli (Satın Al)' },
    { title: 'Modül 3: Yeni Nesil Beceri Temelli Sorular', duration: '50 Dk', status: 'Kilitli (Satın Al)' },
    { title: 'Modül 4: Sınav Stratejisi & Zamandan 15 Net Kazanma', duration: '40 Dk', status: 'Kilitli (Satın Al)' }
  ];

  const handleBuy = () => {
    onAddToCart(product);
    confetti({ particleCount: 80, spread: 60 });
    onClose();
  };

  return (
    <div onClick={onClose} className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/85 backdrop-blur-md animate-fadeIn">
      <div onClick={(e) => e.stopPropagation()} className="glass-panel w-full max-w-3xl rounded-3xl p-6 sm:p-8 border border-indigo-500/30 shadow-2xl relative space-y-6 max-h-[90vh] overflow-y-auto custom-scrollbar">
        
        <button onClick={onClose} className="absolute top-5 right-5 p-2 rounded-xl bg-slate-900 border border-slate-800 text-slate-400 hover:text-white">
          <X className="w-5 h-5" />
        </button>

        {/* Video Course Header */}
        <div className="flex flex-col sm:flex-row items-start sm:items-center space-y-4 sm:space-y-0 sm:space-x-4 pb-4 border-b border-slate-800">
          <div className="w-20 h-20 rounded-2xl overflow-hidden shrink-0 bg-slate-900 border border-slate-800">
            <img src={product.image} alt={product.name} className="w-full h-full object-cover" />
          </div>
          
          <div className="flex-1">
            <span className="px-2.5 py-0.5 rounded-full bg-indigo-500/20 text-indigo-300 text-[10px] font-bold border border-indigo-500/30">
              {product.category}
            </span>
            <h2 className="text-lg font-bold text-white mt-1">{product.name}</h2>
            <p className="text-xs text-slate-400">{product.vendor} • {product.salesCount} Öğrenci Kaydoldu</p>
          </div>

          <div className="bg-slate-900/80 p-3 rounded-2xl border border-slate-800 text-center w-full sm:w-auto shrink-0">
            <span className="text-xs text-slate-500 line-through block">{product.originalPrice} ₺</span>
            <span className="text-xl font-extrabold text-white">{product.price} <span className="text-xs text-indigo-400">₺</span></span>
          </div>
        </div>

        {/* Sample Video Player */}
        <div className="rounded-2xl overflow-hidden aspect-video bg-black relative group cursor-pointer">
          <img src={product.image} alt="Preview" className="w-full h-full object-cover opacity-60" />
          <div className="absolute inset-0 flex items-center justify-center">
            <div className="w-16 h-16 rounded-full bg-indigo-600 text-white flex items-center justify-center shadow-xl shadow-indigo-600/40 group-hover:scale-110 transition-transform">
              <Play className="w-8 h-8 fill-white ml-1" />
            </div>
          </div>
          <span className="absolute bottom-3 left-3 px-3 py-1 rounded-lg bg-slate-950/80 text-white text-xs font-bold">
            🎥 Ücretsiz Ders Önizleme Videosu (Modül 1)
          </span>
        </div>

        {/* Modules Syllabus */}
        <div className="space-y-3">
          <h3 className="text-xs font-bold text-slate-300 uppercase tracking-wider">Kurs Müfredatı & Konular</h3>
          <div className="space-y-2">
            {modules.map((m, idx) => (
              <div key={idx} className="p-3.5 rounded-xl bg-slate-900/60 border border-slate-800 flex items-center justify-between text-xs">
                <div className="flex items-center space-x-3">
                  <BookOpen className="w-4 h-4 text-indigo-400 shrink-0" />
                  <span className="font-semibold text-white">{m.title}</span>
                </div>
                <div className="flex items-center space-x-3 text-slate-400">
                  <span>{m.duration}</span>
                  <span className="text-[11px] text-indigo-300 font-bold bg-indigo-500/20 px-2 py-0.5 rounded">
                    {m.status}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Footer Actions */}
        <div className="pt-4 border-t border-slate-800 flex items-center justify-between">
          <span className="text-xs text-emerald-400 font-semibold flex items-center gap-1">
            <CheckCircle2 className="w-4 h-4" />
            <span>Ömür Boyu Sınırsız Erişim</span>
          </span>

          <button
            onClick={handleBuy}
            className="px-6 py-3 rounded-xl bg-indigo-600 hover:bg-indigo-500 text-white font-extrabold text-xs shadow-lg shadow-indigo-600/30 flex items-center gap-2"
          >
            <ShoppingCart className="w-4 h-4" />
            <span>Sepete Ekle ({product.price} ₺)</span>
          </button>
        </div>

      </div>
    </div>
  );
}
