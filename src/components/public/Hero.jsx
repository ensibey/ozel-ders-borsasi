import React, { useState } from 'react';
import { 
  Search, 
  Sparkles, 
  Zap, 
  ShieldCheck, 
  ArrowRight, 
  ChevronRight,
  BookOpen, 
  Tag, 
  Store, 
  Flame, 
  Layers,
  Copy,
  Check,
  Percent,
  Clock,
  ExternalLink
} from 'lucide-react';
import confetti from 'canvas-confetti';

/**
 * Hero: High-Converting 2-Column Landing Section.
 * Left Side: Powerful Headline, Value Proposition, Publisher Search & Direct Action CTAs.
 * Right Side: Permanent, Non-Dismissable "Günün Fırsat Kuponları & Kampanyalar" Side Ad Block.
 */
export default function Hero({
  onRoleChange,
  onRequestAuthRole,
  coupons = []
}) {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [copiedCode, setCopiedCode] = useState(null);

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

  const handleCopyCode = (code, e) => {
    if (e) e.stopPropagation();
    navigator.clipboard.writeText(code);
    setCopiedCode(code);
    confetti({
      particleCount: 50,
      spread: 60,
      origin: { y: 0.6 }
    });
    setTimeout(() => {
      setCopiedCode(null);
    }, 2500);
  };

  // Top featured coupons for the permanent right-side banner
  const activeCoupons = coupons.filter(c => c.isActive !== false);
  const sideCoupons = activeCoupons.length > 0 ? activeCoupons.slice(0, 3) : [
    {
      code: 'KITAP30',
      title: 'Tüm Soru Bankası & Denemelerde %30 İndirim',
      discount: '%30 İNDİRİM',
      store: 'Borsa Yayınları',
      badge: '🔥 Günün Fırsatı'
    },
    {
      code: 'BORSA200',
      title: '500 ₺ Üzeri Siparişlerde Anında 200 ₺ İndirim',
      discount: '200 ₺ İNDİRİM',
      store: 'Özel Ders Borsası',
      badge: '⚡ Süper Kod'
    },
    {
      code: 'YKS2026',
      title: 'YKS & LGS Hazırlık Yayınlarında %25 İndirim',
      discount: '%25 İNDİRİM',
      store: 'Borsa Akademi',
      badge: '📚 Popüler'
    }
  ];

  return (
    <section className="relative pt-4 sm:pt-8 pb-12 sm:pb-16 overflow-hidden select-none font-sans">
      {/* 1. Subtle Background Ambient Glows */}
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 w-[700px] h-[350px] bg-gradient-to-tr from-emerald-500/10 via-amber-500/10 to-teal-500/10 rounded-full blur-3xl pointer-events-none -z-10" />

      {/* 2. SPLIT 2-COLUMN HERO LAYOUT: LEFT = MAIN, RIGHT = PERMANENT SIDE COUPON AD */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        
        {/* LEFT COLUMN (7 COLS): Headline, Value Prop, Search & Book Highlight */}
        <div className="lg:col-span-7 space-y-6 text-left">
          
          {/* Announcement Badge */}
          <div 
            onClick={handleScrollToCoupons}
            className="inline-flex items-center gap-1.5 sm:gap-2 px-3 sm:px-4 py-1.5 rounded-full bg-white border border-[#DDD7CD] shadow-sm text-xs font-bold text-[#44403C] hover:border-emerald-500/40 transition-all cursor-pointer group max-w-full"
          >
            <span className="flex h-2 w-2 relative shrink-0">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500"></span>
            </span>
            <span className="text-emerald-800 font-extrabold whitespace-nowrap">📚 2026 Yayınevi Sezonu:</span>
            <span className="text-[#57534E] group-hover:text-[#1C1917] transition-colors truncate">
              Aktif Mağaza Kuponları & Kitaplar Yayında
            </span>
            <ChevronRight className="w-3.5 h-3.5 text-[#78716C] group-hover:translate-x-0.5 transition-transform shrink-0" />
          </div>

          {/* H1 Headline */}
          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-black text-[#1C1917] tracking-tight leading-[1.15]">
            Türkiye’nin Yeni Nesil <br className="hidden sm:inline" />
            <span className="bg-gradient-to-r from-emerald-700 via-teal-700 to-emerald-900 bg-clip-text text-transparent">
              Yayınevi Kitap & Deneme Pazarı
            </span>
          </h1>

          {/* Subtext */}
          <p className="text-xs sm:text-sm lg:text-base text-[#57534E] font-medium leading-relaxed max-w-xl">
            Önde gelen yayınevlerinin soru bankalarını ve deneme sınavı fasiküllerini doğrudan satın alın; sağdaki <strong className="text-[#1C1917]">indirim kuponlarını</strong> sepetinizde anında kullanın!
          </p>

          {/* Search Bar Container */}
          <form onSubmit={handleSearchSubmit} className="p-2.5 rounded-2xl bg-white border border-[#DDD7CD] shadow-md grid grid-cols-1 sm:grid-cols-12 gap-2">
            {/* Search Input */}
            <div className="sm:col-span-7 flex items-center bg-[#FAF8F5] border border-[#E7E2D9] rounded-xl px-3 py-2">
              <Search className="w-4 h-4 text-emerald-600 mr-2 shrink-0" />
              <input
                type="text"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                placeholder="Kitap, Deneme veya Yayınevi Ara..."
                className="w-full bg-transparent text-xs font-bold text-[#1C1917] placeholder-[#A8A29E] focus:outline-none truncate"
              />
            </div>

            {/* Category Dropdown */}
            <div className="sm:col-span-3 flex items-center bg-[#FAF8F5] border border-[#E7E2D9] rounded-xl px-2.5 py-2">
              <select
                value={selectedCategory}
                onChange={(e) => setSelectedCategory(e.target.value)}
                className="w-full bg-transparent text-xs font-bold text-[#1C1917] focus:outline-none cursor-pointer truncate"
              >
                <option value="all">Tüm Yayınlar</option>
                <option value="yks">YKS & AYT-TYT</option>
                <option value="lgs">LGS 8. Sınıf</option>
                <option value="deneme">Deneme Sınavı</option>
                <option value="soru">Soru Bankası</option>
              </select>
            </div>

            {/* Submit Button */}
            <div className="sm:col-span-2">
              <button
                type="submit"
                className="w-full h-full min-h-[40px] rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white font-extrabold text-xs shadow-md shadow-emerald-700/20 transition-all flex items-center justify-center gap-1 whitespace-nowrap"
              >
                <span>Ara ↗</span>
              </button>
            </div>
          </form>

          {/* Quick Dual Action Buttons */}
          <div className="flex flex-wrap items-center gap-3 pt-1">
            <button
              onClick={handleScrollToStore}
              className="px-5 py-2.5 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white font-extrabold text-xs shadow-md shadow-emerald-700/20 transition-all flex items-center gap-1.5"
            >
              <BookOpen className="w-4 h-4 text-emerald-200" />
              <span>📚 Kitap & Denemeleri Keşfet</span>
            </button>

            <button
              onClick={() => {
                if (onRequestAuthRole) onRequestAuthRole('vendor');
                else if (onRoleChange) onRoleChange('vendor');
              }}
              className="px-4 py-2.5 rounded-xl bg-white hover:bg-[#F5F2EC] border border-[#DDD7CD] text-[#292524] font-bold text-xs shadow-sm transition-all flex items-center gap-1.5"
            >
              <Store className="w-4 h-4 text-emerald-700" />
              <span>🏬 Yayınevi Portalı Girişi</span>
            </button>

            <div className="flex items-center gap-1 text-[11px] font-bold text-emerald-800 bg-emerald-50 px-2.5 py-1 rounded-lg border border-emerald-200/70">
              <ShieldCheck className="w-3.5 h-3.5 text-emerald-600" />
              <span>%100 Orijinal Yayıncı Telifi</span>
            </div>
          </div>

          {/* Top Featured Book Sample Ribbon */}
          <div 
            onClick={handleScrollToStore}
            className="p-3.5 rounded-2xl bg-white border border-[#E7E2D9] hover:border-emerald-500/40 flex items-center justify-between gap-3 cursor-pointer transition-all shadow-sm group"
          >
            <div className="flex items-center gap-3 min-w-0">
              <img
                src="https://images.unsplash.com/photo-1544716278-ca5e3f4abd8c?auto=format&fit=crop&q=80&w=150"
                alt="2026 YKS Matematik Kitabı"
                className="w-11 h-11 rounded-xl object-cover ring-1 ring-black/10 shrink-0 group-hover:scale-105 transition-transform"
              />
              <div className="min-w-0">
                <div className="flex items-center gap-1.5">
                  <span className="text-xs font-black text-[#1C1917] truncate">2026 YKS Matematik Son 10 Yıl Çıkmış Sorular</span>
                  <span className="text-[9px] px-1.5 py-0.2 rounded-full bg-emerald-100 text-emerald-800 font-extrabold shrink-0">Bestseller</span>
                </div>
                <span className="text-[11px] text-[#78716C] block truncate mt-0.5">
                  Borsa Akademi • ₺240 • ⭐ 4.9 (Örnek Sorular Yayında)
                </span>
              </div>
            </div>
            <span className="px-3 py-1.5 bg-[#FAF8F5] group-hover:bg-emerald-600 group-hover:text-white text-emerald-800 text-xs font-bold rounded-xl border border-[#DDD7CD] transition-all shrink-0">
              İncele ↗
            </span>
          </div>

        </div>

        {/* RIGHT COLUMN (5 COLS): PERMANENT "GÜNÜN FIRSAT KUPONLARI" SIDE REKLAM BANNER */}
        <div className="lg:col-span-5">
          <div className="rounded-3xl bg-white border-2 border-amber-500/40 shadow-2xl overflow-hidden ring-1 ring-black/5 relative">
            
            {/* Top Advertisement Header Banner */}
            <div className="bg-gradient-to-r from-amber-500 via-orange-500 to-rose-600 p-4 text-white">
              <div className="flex items-center justify-between mb-1">
                <div className="flex items-center gap-2">
                  <div className="w-8 h-8 rounded-xl bg-white/20 backdrop-blur-md flex items-center justify-center shrink-0">
                    <Flame className="w-5 h-5 text-white fill-white animate-pulse" />
                  </div>
                  <div>
                    <span className="text-[9px] font-black uppercase tracking-widest bg-white/25 px-2 py-0.5 rounded-full inline-block">
                      FIRSAT REKLAMLARI
                    </span>
                    <h3 className="text-sm sm:text-base font-black tracking-tight leading-tight mt-0.5">
                      Günün Canlı Kuponları!
                    </h3>
                  </div>
                </div>

                <span className="text-[10px] font-black px-2 py-1 rounded-xl bg-black/20 border border-white/20 uppercase tracking-wider shrink-0">
                  %50 İNDİRİM
                </span>
              </div>

              <p className="text-[11px] text-amber-100 font-medium leading-tight mt-2">
                Sepetinizde veya mağazada anında indirim kazanmak için kodları kopyalayın:
              </p>
            </div>

            {/* Coupons List (Permanently visible right side) */}
            <div className="p-4 space-y-3 bg-gradient-to-b from-[#FAF8F5] to-white">
              
              {sideCoupons.map((c, idx) => {
                const code = c.code || 'BORSA';
                const title = c.title || 'Fırsat İndirimi';
                const discountText = c.discount || (c.discountType === 'percent' ? ('%' + c.discountValue + ' İNDİRİM') : (c.discountValue + ' ₺ İNDİRİM'));
                const isCopied = copiedCode === code;

                return (
                  <div 
                    key={idx}
                    className="p-3 rounded-2xl bg-white border-2 border-dashed border-[#DDD7CD] hover:border-amber-500 transition-all flex items-center justify-between gap-2.5 shadow-sm group"
                  >
                    <div className="min-w-0 flex-1">
                      <div className="flex items-center gap-1.5 mb-0.5">
                        <span className="text-[10px] font-black text-rose-600 bg-rose-50 px-1.5 py-0.2 rounded border border-rose-200/60 shrink-0 font-mono">
                          {discountText}
                        </span>
                        <span className="text-[10px] text-[#78716C] font-bold truncate">
                          {c.storeName || c.store || 'Özel Ders Borsası'}
                        </span>
                      </div>
                      <div className="text-xs font-black text-[#1C1917] truncate leading-tight">
                        {title}
                      </div>
                    </div>

                    {/* Copy Code CTA */}
                    <button
                      type="button"
                      onClick={(e) => handleCopyCode(code, e)}
                      className={`px-3 py-2 rounded-xl text-xs font-black flex items-center gap-1.5 transition-all shrink-0 ${
                        isCopied 
                          ? 'bg-emerald-600 text-white shadow-sm' 
                          : 'bg-amber-50 hover:bg-amber-100 text-amber-900 border border-amber-300 shadow-sm active:scale-95'
                      }`}
                      title="Kodu Panoya Kopyala"
                    >
                      {isCopied ? (
                        <>
                          <Check className="w-3.5 h-3.5" />
                          <span>Alındı!</span>
                        </>
                      ) : (
                        <>
                          <Copy className="w-3.5 h-3.5 text-amber-700" />
                          <span className="font-mono tracking-wider">{code}</span>
                        </>
                      )}
                    </button>
                  </div>
                );
              })}

              {/* Bottom Jump Button */}
              <button
                type="button"
                onClick={handleScrollToCoupons}
                className="w-full py-2.5 px-4 rounded-xl bg-gradient-to-r from-emerald-600 to-teal-700 hover:from-emerald-700 hover:to-teal-800 text-white text-xs font-black shadow-md shadow-emerald-700/20 transition-all flex items-center justify-center gap-2 group"
              >
                <Tag className="w-4 h-4 text-emerald-200" />
                <span>Tüm Kuponları & Mağazaları Gör</span>
                <ArrowRight className="w-4 h-4 text-emerald-200 transition-transform group-hover:translate-x-1" />
              </button>

              {/* Trust Subtext */}
              <div className="text-center pt-1">
                <span className="text-[10px] font-bold text-[#78716C] inline-flex items-center gap-1">
                  <Sparkles className="w-3 h-3 text-amber-600" />
                  Kuponlar sepette veya yönlendirilen mağazada test edilmiştir.
                </span>
              </div>

            </div>

          </div>
        </div>

      </div>
    </section>
  );
}
