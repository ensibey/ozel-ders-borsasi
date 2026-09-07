import React, { useState } from 'react';
import { 
  Search, 
  MapPin, 
  Sparkles, 
  Zap, 
  CheckCircle2, 
  ShieldCheck, 
  ArrowRight, 
  Star, 
  ChevronRight,
  BookOpen,
  Tag,
  Store,
  ShoppingBag,
  Flame,
  Layers
} from 'lucide-react';

/**
 * Hero: High-Converting Hero Section featuring an announcement badge,
 * impactful H1, dual CTAs, and a modern publisher book & coupon search canvas.
 */
export default function Hero({
  onRoleChange,
  onRequestAuthRole
}) {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('all');

  const handleSearchSubmit = (e) => {
    e.preventDefault();
    const showcaseSection = document.getElementById('showcase');
    if (showcaseSection) {
      showcaseSection.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const handleScrollToCoupons = () => {
    const el = document.getElementById('coupons') || document.getElementById('showcase');
    if (el) el.scrollIntoView({ behavior: 'smooth' });
  };

  const handleScrollToStore = () => {
    const el = document.getElementById('showcase');
    if (el) el.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <section className="relative pt-6 sm:pt-10 pb-16 overflow-hidden select-none font-sans">
      {/* 1. Subtle Background Ambient Glows */}
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 w-[600px] h-[300px] bg-gradient-to-tr from-emerald-500/10 via-teal-500/5 to-amber-500/10 rounded-full blur-3xl pointer-events-none -z-10" />

      <div className="max-w-5xl mx-auto text-center space-y-7">
        
        {/* 2. Eye-Catching Announcement Badge */}
        <div 
          onClick={handleScrollToCoupons}
          className="inline-flex items-center gap-1.5 sm:gap-2 px-3 sm:px-4 py-1.5 rounded-full bg-white border border-[#DDD7CD] shadow-sm text-xs font-bold text-[#44403C] hover:border-emerald-500/40 transition-all cursor-pointer group max-w-[92vw]"
        >
          <span className="flex h-2 w-2 relative shrink-0">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
            <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500"></span>
          </span>
          <span className="text-emerald-800 font-extrabold whitespace-nowrap">📚 2026 Sezonu:</span>
          <span className="text-[#57534E] group-hover:text-[#1C1917] transition-colors truncate">
            Aktif Mağaza Kuponları & Deneme Setleri Yayında
          </span>
          <ChevronRight className="w-3.5 h-3.5 text-[#78716C] group-hover:translate-x-0.5 transition-transform shrink-0" />
        </div>

        {/* 3. Impactful H1 Headline */}
        <h1 className="text-2xl sm:text-5xl lg:text-6xl font-black text-[#1C1917] tracking-tight leading-[1.2] sm:leading-[1.15]">
          Popüler Yayınevleri, Deneme Setleri & <br className="hidden sm:inline" />
          <span className="bg-gradient-to-r from-emerald-700 via-teal-700 to-emerald-900 bg-clip-text text-transparent">
            Özel İndirim Kuponları
          </span>
        </h1>

        {/* 4. Crystal-Clear 2-Line Value Proposition Subtext */}
        <p className="text-xs sm:text-base lg:text-lg text-[#57534E] max-w-2xl mx-auto font-medium leading-relaxed px-2">
          En seçkin yayınevlerinin soru bankalarını, deneme sınavı fasiküllerini sepetinize ekleyin ve anlaşmalı mağazalarda geçerli <strong className="text-[#1C1917]">indirim kodlarını</strong> anında kullanın!
        </p>

        {/* 5. Dual Primary & Secondary Action CTA Buttons */}
        <div className="pt-2 flex flex-col sm:flex-row items-center justify-center gap-3 sm:gap-3.5 w-full">
          <button
            onClick={handleScrollToCoupons}
            className="w-full sm:w-auto px-5 sm:px-7 py-3 sm:py-3.5 rounded-2xl bg-emerald-600 hover:bg-emerald-700 text-white font-extrabold text-xs sm:text-sm shadow-xl shadow-emerald-700/25 transition-all flex items-center justify-center gap-2 group hover:scale-[1.02] whitespace-nowrap"
          >
            <Zap className="w-4 h-4 text-emerald-200 fill-emerald-200 shrink-0" />
            <span>🏷️ Fırsat Kuponlarını Gör (%50 İndirim)</span>
            <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1 shrink-0" />
          </button>

          <button
            onClick={handleScrollToStore}
            className="w-full sm:w-auto px-5 sm:px-6 py-3 sm:py-3.5 rounded-2xl bg-white hover:bg-[#F5F2EC] border border-[#DDD7CD] text-[#292524] font-bold text-xs sm:text-sm transition-all flex items-center justify-center gap-2 shadow-sm whitespace-nowrap hover:border-emerald-600/40"
          >
            <BookOpen className="w-4 h-4 text-emerald-600 shrink-0" />
            <span>📚 Yayınevi Kitap Mağazası ↗</span>
          </button>
        </div>

        {/* 6. Modern Interactive Publisher Search & Live Showcase Mockup */}
        <div className="relative mt-8 sm:mt-12 pt-2">
          {/* Main Mockup Canvas Container */}
          <div className="relative rounded-3xl bg-white border border-[#DDD7CD] shadow-2xl p-3.5 sm:p-6 overflow-hidden max-w-4xl mx-auto text-left space-y-4 ring-1 ring-black/5">
            
            {/* Top Mockup Header Bar */}
            <div className="flex flex-col min-[480px]:flex-row items-start min-[480px]:items-center justify-between gap-2.5 pb-3 border-b border-[#E7E2D9]">
              <div className="flex items-center gap-2">
                <div className="w-2.5 h-2.5 rounded-full bg-rose-400"></div>
                <div className="w-2.5 h-2.5 rounded-full bg-amber-400"></div>
                <div className="w-2.5 h-2.5 rounded-full bg-emerald-400"></div>
                <span className="ml-1.5 text-[11px] sm:text-xs font-bold text-[#78716C] font-mono truncate">
                  ozeldersborsasi.com<span className="hidden sm:inline">/kitap-ve-kupon-pazari</span>
                </span>
              </div>

              <div className="flex items-center gap-1.5 text-[10px] sm:text-xs font-bold text-emerald-700 bg-emerald-50 px-2.5 sm:px-3 py-1 rounded-full border border-emerald-200/80">
                <ShieldCheck className="w-3 h-3 sm:w-3.5 sm:h-3.5 shrink-0" />
                <span>%100 Orijinal Baskı & Güvenli Satış</span>
              </div>
            </div>

            {/* Mockup Interactive Book & Publisher Search Bar */}
            <form onSubmit={handleSearchSubmit} className="grid grid-cols-1 sm:grid-cols-12 gap-2.5 pt-1">
              {/* Search Term */}
              <div className="sm:col-span-6 flex items-center bg-[#FAF8F5] border border-[#E7E2D9] rounded-2xl px-3.5 py-2.5">
                <Search className="w-4 h-4 text-emerald-600 mr-2.5 shrink-0" />
                <div className="w-full min-w-0">
                  <span className="block text-[9px] font-bold uppercase tracking-wider text-[#78716C]">Kitap & Yayınevi Ara</span>
                  <input
                    type="text"
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    placeholder="Örn: 2026 AYT Matematik, Borsa Akademi..."
                    className="w-full bg-transparent text-xs font-extrabold text-[#1C1917] placeholder-[#A8A29E] focus:outline-none truncate"
                  />
                </div>
              </div>

              {/* Category */}
              <div className="sm:col-span-3 flex items-center bg-[#FAF8F5] border border-[#E7E2D9] rounded-2xl px-3.5 py-2.5">
                <Layers className="w-4 h-4 text-teal-600 mr-2 shrink-0" />
                <div className="w-full min-w-0">
                  <span className="block text-[9px] font-bold uppercase tracking-wider text-[#78716C]">Kategori</span>
                  <select
                    value={selectedCategory}
                    onChange={(e) => setSelectedCategory(e.target.value)}
                    className="w-full bg-transparent text-xs font-extrabold text-[#1C1917] focus:outline-none cursor-pointer truncate"
                  >
                    <option value="all">Tüm Yayınlar</option>
                    <option value="yks">YKS & AYT-TYT</option>
                    <option value="lgs">LGS 8. Sınıf</option>
                    <option value="deneme">Deneme Sınavı</option>
                    <option value="soru">Soru Bankası</option>
                  </select>
                </div>
              </div>

              {/* Action Button */}
              <div className="sm:col-span-3">
                <button
                  type="submit"
                  className="w-full h-full min-h-[46px] rounded-2xl bg-emerald-600 hover:bg-emerald-700 text-white font-extrabold text-xs shadow-md shadow-emerald-700/20 transition-all flex items-center justify-center gap-1.5 whitespace-nowrap group hover:scale-[1.01]"
                >
                  <BookOpen className="w-3.5 h-3.5" />
                  <span>Yayınları Listele</span>
                </button>
              </div>
            </form>

            {/* Mockup Preview Bottom Grid (Featuring Top Publisher Book + Flash Coupon) */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-2">
              
              {/* Product 1: Best Seller Book */}
              <div 
                onClick={handleScrollToStore}
                className="p-3.5 rounded-2xl bg-[#FAF8F5] border border-[#E7E2D9] hover:border-emerald-500/40 flex items-center justify-between gap-3 cursor-pointer transition-all group/item shadow-sm"
              >
                <div className="flex items-center gap-3 min-w-0">
                  <img
                    src="https://images.unsplash.com/photo-1544716278-ca5e3f4abd8c?auto=format&fit=crop&q=80&w=150"
                    alt="2026 YKS Matematik Kitabı"
                    className="w-12 h-12 rounded-xl object-cover ring-1 ring-black/10 shrink-0 group-hover/item:scale-105 transition-transform"
                  />
                  <div className="min-w-0">
                    <div className="flex items-center gap-1.5">
                      <span className="text-xs font-black text-[#1C1917] truncate">2026 YKS Matematik Fasikülü</span>
                      <span className="text-[9px] px-1.5 py-0.2 rounded-full bg-emerald-100 text-emerald-800 font-extrabold shrink-0">Yeni</span>
                    </div>
                    <span className="text-[11px] text-[#78716C] block truncate mt-0.5">
                      Borsa Akademi • ₺240 • ⭐ 4.9
                    </span>
                  </div>
                </div>
                <button 
                  className="px-2.5 py-1.5 bg-white group-hover/item:bg-emerald-600 group-hover/item:text-white border border-[#DDD7CD] text-emerald-800 text-[11px] font-bold rounded-xl transition-all shrink-0"
                >
                  İncele ↗
                </button>
              </div>

              {/* Deal 2: Active Flash Coupon */}
              <div 
                onClick={handleScrollToCoupons}
                className="p-3.5 rounded-2xl bg-[#FAF8F5] border border-amber-500/30 hover:border-amber-500/60 flex items-center justify-between gap-3 cursor-pointer transition-all group/deal shadow-sm"
              >
                <div className="flex items-center gap-3 min-w-0">
                  <div className="w-12 h-12 rounded-xl bg-amber-500/15 border border-amber-500/30 text-amber-700 flex items-center justify-center shrink-0 group-hover/deal:scale-105 transition-transform">
                    <Flame className="w-6 h-6 text-amber-600" />
                  </div>
                  <div className="min-w-0">
                    <div className="flex items-center gap-1.5">
                      <span className="text-xs font-black text-[#1C1917] truncate">Günün Fırsat Kuponu: YKS2026</span>
                      <span className="text-[9px] px-1.5 py-0.2 rounded-full bg-amber-100 text-amber-900 font-extrabold shrink-0">%25 İndirim</span>
                    </div>
                    <span className="text-[11px] text-[#78716C] block truncate mt-0.5">
                      Tüm Soru Bankalarında Geçerli
                    </span>
                  </div>
                </div>
                <button 
                  className="px-2.5 py-1.5 bg-white group-hover/deal:bg-amber-600 group-hover/deal:text-white border border-[#DDD7CD] text-amber-800 text-[11px] font-bold rounded-xl transition-all shrink-0"
                >
                  Kodu Al 🏷️
                </button>
              </div>

            </div>

            {/* Quick Publisher Direct Access Banner */}
            <div className="p-3 rounded-2xl bg-gradient-to-r from-emerald-50 via-teal-50 to-amber-50 border border-emerald-200 flex flex-col sm:flex-row items-center justify-between gap-2 text-xs">
              <div className="flex items-center gap-2">
                <Store className="w-4 h-4 text-emerald-700 shrink-0" />
                <span className="font-extrabold text-[#1C1917]">Yayınevi veya Dağıtıcı mısınız?</span>
                <span className="text-[#57534E] hidden sm:inline">Kitap, soru bankası ve denemelerinizi saniyeler içinde satışa açın.</span>
              </div>
              <button
                onClick={() => {
                  if (onRequestAuthRole) {
                    onRequestAuthRole('vendor');
                  } else if (onRoleChange) {
                    onRoleChange('vendor');
                  }
                }}
                className="w-full sm:w-auto px-4 py-2 bg-emerald-700 hover:bg-emerald-800 text-white font-extrabold text-xs rounded-xl transition-all shrink-0 flex items-center justify-center gap-1.5 shadow-sm"
              >
                <span>🏬 Yayınevi Portalı</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </button>
            </div>

          </div>

        </div>

      </div>
    </section>
  );
}
