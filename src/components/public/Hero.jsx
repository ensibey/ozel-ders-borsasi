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
  ExternalLink,
  X,
  Gift,
  CheckCircle2,
  Info
} from 'lucide-react';
import confetti from 'canvas-confetti';

/**
 * Hero: High-Converting 2-Column Landing Section.
 * Left Side: Powerful Headline, Value Proposition, Publisher Search & Direct Action CTAs.
 * Right Side: Permanent, Clickable "Günün Fırsat Kuponları" Side Banner with Admin Detail Pop-up & Store Redirection.
 */
export default function Hero({
  onRoleChange,
  onRequestAuthRole,
  coupons = []
}) {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [selectedCouponModal, setSelectedCouponModal] = useState(null);
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

  // Open coupon modal, copy code, trigger confetti
  const handleOpenCouponModal = (coupon) => {
    navigator.clipboard.writeText(coupon.code);
    setCopiedCode(coupon.code);
    setSelectedCouponModal(coupon);
    confetti({
      particleCount: 60,
      spread: 60,
      origin: { y: 0.6 }
    });
  };

  // Copy code and navigate safely to the admin's specified URL
  const handleGoToAdminUrl = (coupon) => {
    if (coupon?.code) {
      try {
        navigator.clipboard?.writeText(coupon.code);
      } catch (e) {}
    }
    const rawUrl = (coupon?.storeUrl || '#showcase').trim();
    
    // Security sanitization: Block malicious URI schemes (javascript:, data:, vbscript:)
    if (/^(javascript|data|vbscript):/i.test(rawUrl)) {
      setSelectedCouponModal(null);
      return;
    }

    if (rawUrl.startsWith('http://') || rawUrl.startsWith('https://')) {
      window.open(rawUrl, '_blank', 'noopener,noreferrer');
    } else if (rawUrl.startsWith('#')) {
      try {
        const el = document.querySelector(rawUrl);
        if (el) el.scrollIntoView({ behavior: 'smooth' });
      } catch (e) {}
    }
    setSelectedCouponModal(null);
  };

  // Top featured coupons for the permanent right-side banner
  const activeCoupons = coupons.filter(c => c.isActive !== false);
  const sideCoupons = activeCoupons.length > 0 ? activeCoupons.slice(0, 3) : [
    {
      code: 'KITAP30',
      title: 'Tüm Soru Bankası & Denemelerde %30 İndirim',
      discount: '%30 İNDİRİM',
      storeName: 'Kitapyurdu & Borsa Yayınları',
      storeUrl: 'https://www.kitapyurdu.com',
      badge: '🔥 Günün Fırsatı',
      description: 'Yayınevlerinin orijinal baskı soru bankası ve branş deneme sınavlarında geçerli sepette anında %30 net indirim sağlar.',
      daysLeft: 7
    },
    {
      code: 'BORSA200',
      title: '500 ₺ Üzeri Siparişlerde Anında 200 ₺ İndirim',
      discount: '200 ₺ İNDİRİM',
      storeName: 'Özel Ders Borsası Mağazası',
      storeUrl: '#showcase',
      badge: '⚡ Süper Fırsat',
      description: '500 TL üzeri tüm kitap, deneme ve eğitim materyali sepetlerinizde ödeme ekranında anında 200 TL nakit indirim uygulanır.',
      daysLeft: 12
    },
    {
      code: 'YKS2026',
      title: 'YKS & LGS Hazırlık Yayınlarında %25 İndirim',
      discount: '%25 İNDİRİM',
      storeName: 'D&R & Borsa Akademi',
      storeUrl: 'https://www.dr.com.tr',
      badge: '📚 Çok Satan',
      description: '2026 YKS ve LGS müfredatına tam uyumlu video çözümlü fasikül ve denemelerde geçerli resmi yayıncı indirim kuponu.',
      daysLeft: 25
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
            Önde gelen yayınevlerinin soru bankalarını ve deneme sınavı fasiküllerini doğrudan satın alın; sağdaki <strong className="text-[#1C1917]">indirim kuponlarına</strong> tıklayarak kodları anında kopyalayın ve mağazalarda kullanın!
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

        {/* RIGHT COLUMN (5 COLS): PERMANENT & CLICKABLE "GÜNÜN FIRSAT KUPONLARI" SIDE BANNER */}
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
                Kupona tıklayın; detayları inceleyin, kodu kopyalayıp doğrudan mağaza sayfasına gidin:
              </p>
            </div>

            {/* Coupons List: CLICKABLE TO OPEN ADMIN DETAILS & REDIRECT */}
            <div className="p-4 space-y-3 bg-gradient-to-b from-[#FAF8F5] to-white">
              
              {sideCoupons.map((c, idx) => {
                const code = c.code || 'BORSA';
                const title = c.title || 'Fırsat İndirimi';
                const discountText = c.discount || (c.discountType === 'percent' ? ('%' + c.discountValue + ' İNDİRİM') : (c.discountValue + ' ₺ İNDİRİM'));
                const isCopied = copiedCode === code;

                return (
                  <div 
                    key={idx}
                    onClick={() => handleOpenCouponModal(c)}
                    className="p-3 rounded-2xl bg-white border-2 border-dashed border-[#DDD7CD] hover:border-amber-500 transition-all flex items-center justify-between gap-2.5 shadow-sm hover:shadow-md cursor-pointer group"
                    title="Kupon Detayını Aç & Mağazaya Git"
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
                      <div className="text-xs font-black text-[#1C1917] group-hover:text-amber-600 transition-colors truncate leading-tight">
                        {title}
                      </div>
                    </div>

                    {/* Open / Copy Code CTA */}
                    <button
                      type="button"
                      onClick={(e) => {
                        e.stopPropagation();
                        handleOpenCouponModal(c);
                      }}
                      className="px-3 py-2 rounded-xl text-xs font-black bg-amber-50 hover:bg-amber-100 text-amber-900 border border-amber-300 shadow-sm active:scale-95 flex items-center gap-1.5 transition-all shrink-0 group-hover:bg-amber-500 group-hover:text-white group-hover:border-amber-500"
                      title="Kuponu Aç & Kodu Al"
                    >
                      <Copy className="w-3.5 h-3.5" />
                      <span className="font-mono tracking-wider">{code}</span>
                      <ExternalLink className="w-3 h-3 opacity-70" />
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
                  Kupona tıklandığında kod kopyalanır ve mağazaya yönlendirilir.
                </span>
              </div>

            </div>

          </div>
        </div>

      </div>

      {/* 🚀 3. INTERACTIVE COUPON DETAIL & STORE REDIRECT MODAL (ADMIN DEFINED DATA) */}
      {selectedCouponModal && (
        <div 
          onClick={() => setSelectedCouponModal(null)}
          className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 bg-slate-950/85 backdrop-blur-md animate-fadeIn select-none"
        >
          <div 
            onClick={(e) => e.stopPropagation()}
            className="w-full max-w-md max-h-[92vh] overflow-y-auto rounded-3xl bg-white border border-[#E7E2D9] shadow-2xl p-5 sm:p-7 space-y-5 text-[#1C1917] relative animate-in zoom-in-95 duration-200"
          >
            {/* Close Button */}
            <button 
              type="button"
              onClick={() => setSelectedCouponModal(null)}
              className="absolute top-4 right-4 p-2 rounded-xl bg-[#F5F2EC] hover:bg-[#EFECE6] text-[#57534E] hover:text-[#1C1917] border border-[#DDD7CD] transition-colors"
              title="Kapat"
            >
              <X className="w-4 h-4" />
            </button>

            {/* Header / Store Badge */}
            <div className="text-center space-y-2 pt-2">
              <div className="w-14 h-14 rounded-2xl bg-gradient-to-tr from-amber-500 via-orange-500 to-rose-600 text-white flex items-center justify-center text-xl mx-auto shadow-lg shadow-orange-500/25">
                <Gift className="w-7 h-7" />
              </div>
              
              <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-emerald-50 text-emerald-800 text-xs font-extrabold border border-emerald-200">
                <Store className="w-3.5 h-3.5" />
                <span>{selectedCouponModal.storeName || selectedCouponModal.store || 'Özel Ders Borsası'}</span>
              </div>

              {/* Admin Coupon Title */}
              <h3 className="text-base sm:text-lg font-black text-[#1C1917] leading-snug">
                {selectedCouponModal.title}
              </h3>
            </div>

            {/* Big Coupon Code Box with Confetti Feedback */}
            <div className="p-4 rounded-2xl bg-[#FAF8F5] border-2 border-dashed border-amber-500/60 text-center space-y-2">
              <div className="text-[11px] font-extrabold text-emerald-700 uppercase tracking-wider flex items-center justify-center gap-1">
                <CheckCircle2 className="w-4 h-4 text-emerald-600" />
                <span>Kupon Kodu Panoya Kopyalandı!</span>
              </div>

              <div className="font-mono text-2xl sm:text-3xl font-black text-[#1C1917] tracking-wider py-1 select-all">
                {selectedCouponModal.code}
              </div>

              <button
                type="button"
                onClick={() => {
                  navigator.clipboard.writeText(selectedCouponModal.code);
                  confetti({ particleCount: 40, spread: 40 });
                }}
                className="text-xs font-bold text-emerald-700 hover:text-emerald-800 underline inline-flex items-center gap-1"
              >
                <Copy className="w-3 h-3" />
                <span>Tekrar Kopyala</span>
              </button>
            </div>

            {/* Admin-Provided Description / Terms */}
            {selectedCouponModal.description && (
              <div className="p-3.5 rounded-2xl bg-slate-50 border border-[#E7E2D9] space-y-1 text-left">
                <div className="flex items-center gap-1 text-[10px] font-extrabold uppercase tracking-wider text-[#78716C]">
                  <Info className="w-3 h-3 text-emerald-600" />
                  <span>Admin Kampanya Koşulları & Detayı</span>
                </div>
                <p className="text-xs text-[#44403C] leading-relaxed font-medium">
                  {selectedCouponModal.description}
                </p>
              </div>
            )}

            {/* Instruction */}
            <p className="text-[11px] text-[#78716C] text-center leading-relaxed font-medium">
              Kodunuz kopyalandı! Aşağıdaki butona tıklayarak mağazaya gidebilir, sepet adımında kuponunuzu yapıştırarak anında indirimi kullanabilirsiniz.
            </p>

            {/* Primary Action Button: Go to Admin's Specified Store Link */}
            <button
              type="button"
              onClick={() => handleGoToAdminUrl(selectedCouponModal)}
              className="w-full py-3.5 px-4 rounded-2xl bg-gradient-to-r from-emerald-600 to-teal-700 hover:from-emerald-700 hover:to-teal-800 text-white font-black text-sm shadow-xl shadow-emerald-700/25 flex items-center justify-center gap-2 transition-transform hover:scale-[1.01] active:scale-95"
            >
              <span>{selectedCouponModal.storeName || 'Mağaza'} Sayfasına Git</span>
              <ExternalLink className="w-4 h-4 text-emerald-200" />
            </button>

          </div>
        </div>
      )}

    </section>
  );
}
