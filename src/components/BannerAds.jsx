import React, { useState, useEffect } from 'react';
import { Sparkles, BookOpen, Video, ChevronRight, Award, Zap, ArrowRight } from 'lucide-react';

export default function BannerAds({ onSelectAdCategory }) {
  const [activeSlide, setActiveSlide] = useState(0);

  const banners = [
    {
      id: 1,
      title: '2026 YKS & LGS Derece Paketleri %35 İndirimli!',
      subtitle: 'Özel anlaşmalı yayınevlerinin soru bankaları, deneme setleri ve koçluk yayınları mağazada sizi bekliyor.',
      badge: 'Günün Fırsatı',
      theme: 'from-slate-900 to-emerald-950 text-white border-emerald-500/40',
      badgeColor: 'bg-emerald-500/20 text-emerald-300 border-emerald-400/30',
      btnBg: 'bg-emerald-500 hover:bg-emerald-400 text-slate-950',
      btnText: 'Kitap & Deneme İncele',
      icon: BookOpen,
      category: 'store'
    },
    {
      id: 2,
      title: 'Canlı Birebir Derslerde İlk Seans Koçluğu Hediye!',
      subtitle: 'Hedeflediğin puan için Boğaziçi ve ODTÜ mezunu öğretmenlerle anında deneme seansı planla.',
      badge: 'Online Canlı Ders',
      theme: 'from-slate-950 to-teal-950 text-white border-teal-500/40',
      badgeColor: 'bg-teal-500/20 text-teal-300 border-teal-400/30',
      btnBg: 'bg-teal-400 hover:bg-teal-300 text-slate-950',
      btnText: 'Eğitmenleri Keşfet',
      icon: Video,
      category: 'tutors'
    }
  ];

  useEffect(() => {
    const timer = setInterval(() => {
      setActiveSlide((prev) => (prev + 1) % banners.length);
    }, 6000);
    return () => clearInterval(timer);
  }, [banners.length]);

  const current = banners[activeSlide];
  const IconComp = current.icon;

  return (
    <div className="w-full relative overflow-hidden rounded-3xl shadow-lg border select-none transition-all duration-500">
      <div className={`p-6 sm:p-7 bg-gradient-to-br ${current.theme} relative overflow-hidden flex flex-col justify-between min-h-[260px]`}>
        
        {/* Top bar: Badge and Pagination indicators */}
        <div className="flex items-center justify-between gap-3 mb-4">
          <span className={`px-3 py-1 rounded-full text-[10px] font-extrabold uppercase tracking-wider border backdrop-blur-md ${current.badgeColor}`}>
            {current.badge}
          </span>
          
          <div className="flex items-center gap-1.5">
            {banners.map((_, i) => (
              <button
                key={i}
                onClick={() => setActiveSlide(i)}
                className={`h-2 rounded-full transition-all duration-300 ${
                  activeSlide === i ? 'bg-emerald-400 w-6' : 'bg-white/30 w-2 hover:bg-white/60'
                }`}
                aria-label={`Slide ${i + 1}`}
              />
            ))}
          </div>
        </div>

        {/* Content body */}
        <div className="space-y-2.5 my-auto">
          <div className="flex items-center gap-2 text-amber-400 text-xs font-bold">
            <Zap className="w-4 h-4 fill-amber-400" />
            <span>Özel Promosyon</span>
          </div>

          <h4 className="text-base sm:text-lg font-black tracking-tight text-white leading-snug">
            {current.title}
          </h4>

          <p className="text-xs text-slate-300 leading-relaxed font-medium">
            {current.subtitle}
          </p>
        </div>

        {/* Action Button */}
        <div className="pt-4 border-t border-white/10 mt-3 flex items-center justify-between">
          <button
            onClick={() => onSelectAdCategory && onSelectAdCategory(current.category)}
            className={`px-4 py-2.5 rounded-xl font-black text-xs shadow-lg transition-transform hover:scale-105 flex items-center gap-2 ${current.btnBg}`}
          >
            <IconComp className="w-4 h-4" />
            <span>{current.btnText}</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </button>

          <span className="text-[10px] text-slate-400 font-mono">
            0{activeSlide + 1} / 0{banners.length}
          </span>
        </div>

      </div>
    </div>
  );
}
