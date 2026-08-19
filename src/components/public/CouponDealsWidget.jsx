import React, { useState } from 'react';
import { 
  Tag, 
  Copy, 
  Check, 
  Sparkles, 
  Clock, 
  Scissors, 
  ShieldCheck, 
  ArrowRight,
  Gift,
  ExternalLink,
  Flame,
  Store,
  X,
  ShoppingBag,
  CheckCircle2
} from 'lucide-react';
import confetti from 'canvas-confetti';

/**
 * CouponDealsWidget: KuponBurada.com style interactive coupon card marketplace.
 * Displays live discount codes with 1-click "Kuponu Al & Mağazaya Git" modal,
 * store redirection, countdowns, and category filters.
 */
export default function CouponDealsWidget({ coupons = [], isSidebar = false }) {
  const [selectedCouponModal, setSelectedCouponModal] = useState(null);
  const [copiedCode, setCopiedCode] = useState(null);
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [searchQuery, setSearchQuery] = useState('');

  const handleOpenCoupon = (coupon) => {
    navigator.clipboard.writeText(coupon.code);
    setCopiedCode(coupon.code);
    setSelectedCouponModal(coupon);
    
    // Confetti pop
    confetti({
      particleCount: 60,
      spread: 60,
      origin: { y: 0.6 }
    });
  };

  const handleGoToStore = (coupon) => {
    const url = coupon.storeUrl || '#showcase';
    if (url.startsWith('http')) {
      window.open(url, '_blank', 'noopener,noreferrer');
    } else {
      const el = document.querySelector(url);
      if (el) el.scrollIntoView({ behavior: 'smooth' });
    }
    setSelectedCouponModal(null);
  };

  const activeCoupons = coupons.filter(c => c.isActive !== false);

  const filteredCoupons = activeCoupons.filter(c => {
    const matchesCategory = selectedCategory === 'all' || c.category === selectedCategory || c.categoryLabel === selectedCategory;
    const matchesSearch = searchQuery === '' || 
                          c.title.toLowerCase().includes(searchQuery.toLowerCase()) || 
                          c.code.toLowerCase().includes(searchQuery.toLowerCase()) ||
                          (c.storeName && c.storeName.toLowerCase().includes(searchQuery.toLowerCase()));
    return matchesCategory && matchesSearch;
  });

  const categories = [
    { id: 'all', label: 'Tüm Kuponlar' },
    { id: 'lesson', label: 'Özel Ders' },
    { id: 'store', label: 'Kitap & Deneme' },
    { id: 'tutor', label: 'Akredite Kadro' }
  ];

  return (
    <div className={`rounded-3xl bg-white border border-[#E7E2D9] shadow-sm select-none overflow-hidden ${isSidebar ? 'p-5' : 'p-6 sm:p-8'}`}>
      
      {/* Header Bar */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-5 border-b border-[#F5F2EC]">
        <div>
          <div className="flex items-center gap-2 text-xs font-extrabold uppercase tracking-widest text-emerald-700 mb-1">
            <Tag className="w-4 h-4 text-emerald-600" />
            <span>KuponBurada • İndirim Kodları & Mağazalar</span>
          </div>
          <h3 className="text-lg sm:text-xl font-black text-[#1C1917] tracking-tight flex items-center gap-2">
            <span>Fırsat Kuponları & Kampanyalar</span>
            <span className="text-xs font-bold px-2 py-0.5 rounded-full bg-emerald-100 text-emerald-800 border border-emerald-200">
              {activeCoupons.length} Aktif Kupon
            </span>
          </h3>
        </div>

        {/* Category Pills */}
        <div className="flex items-center gap-1.5 overflow-x-auto custom-scrollbar pb-1 text-xs font-bold">
          {categories.map(cat => (
            <button
              key={cat.id}
              onClick={() => setSelectedCategory(cat.id)}
              className={`px-3 py-1.5 rounded-xl whitespace-nowrap transition-all ${
                selectedCategory === cat.id
                  ? 'bg-emerald-600 text-white shadow-sm'
                  : 'bg-[#FAF8F5] text-[#57534E] hover:text-[#1C1917] border border-[#E7E2D9]'
              }`}
            >
              {cat.label}
            </button>
          ))}
        </div>
      </div>

      {/* Instant Search Bar */}
      <div className="pt-4 flex items-center gap-2">
        <div className="relative flex-1">
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Mağaza adı, kupon kodu veya ders ara (örn: Trendyol, YKS25, Matematik)..."
            className="w-full pl-3.5 pr-4 py-2 bg-[#FAF8F5] border border-[#DDD7CD] rounded-xl text-xs text-[#1C1917] placeholder-[#78716C] focus:outline-none focus:border-emerald-600 font-medium"
          />
        </div>
        {searchQuery && (
          <button
            onClick={() => setSearchQuery('')}
            className="px-3 py-2 bg-[#F5F2EC] hover:bg-[#EFECE6] text-xs font-bold text-[#57534E] rounded-xl border border-[#DDD7CD]"
          >
            Temizle
          </button>
        )}
      </div>

      {/* Coupons List / Grid */}
      <div className={`mt-5 gap-4 ${isSidebar ? 'grid grid-cols-1' : 'grid grid-cols-1 md:grid-cols-2'}`}>
        {filteredCoupons.length > 0 ? (
          filteredCoupons.map((coupon) => {
            const isCopied = copiedCode === coupon.code;
            const discountLabel = coupon.discountType === 'percent' 
              ? `%${coupon.discountValue}` 
              : `${coupon.discountValue} ₺`;

            return (
              <div
                key={coupon.id}
                onClick={() => handleOpenCoupon(coupon)}
                className="rounded-2xl border-2 border-dashed border-[#DDD7CD] hover:border-emerald-500 bg-[#FAF8F5] hover:bg-white p-4 sm:p-5 transition-all duration-200 flex flex-col justify-between relative group shadow-sm hover:shadow-md cursor-pointer"
              >
                {/* Featured / Badge */}
                {coupon.badge && (
                  <div className="absolute -top-2.5 right-4 px-2.5 py-0.5 rounded-full bg-gradient-to-r from-amber-500 to-orange-500 text-white text-[10px] font-black uppercase tracking-wider shadow-sm flex items-center gap-1">
                    <Flame className="w-3 h-3 fill-white" />
                    <span>{coupon.badge}</span>
                  </div>
                )}

                <div>
                  {/* Top Card Details */}
                  <div className="flex items-start gap-3.5 mb-3">
                    {/* Discount Badge */}
                    <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-emerald-600 to-teal-700 text-white flex flex-col items-center justify-center p-1.5 text-center shrink-0 shadow-md shadow-emerald-700/20 group-hover:scale-105 transition-transform">
                      <span className="text-base sm:text-lg font-black tracking-tight leading-none">
                        {discountLabel}
                      </span>
                      <span className="text-[9px] font-bold uppercase tracking-wider mt-0.5">
                        İNDİRİM
                      </span>
                    </div>

                    {/* Title & Store Info */}
                    <div className="min-w-0 flex-1">
                      <div className="flex items-center gap-1.5 text-[11px] text-[#78716C] font-semibold mb-0.5">
                        <span className="text-emerald-700 font-bold bg-emerald-50 px-2 py-0.2 rounded border border-emerald-200/60 flex items-center gap-1">
                          <Store className="w-3 h-3" />
                          <span>{coupon.storeName || 'Özel Ders Borsası'}</span>
                        </span>
                        <span>•</span>
                        <span className="flex items-center gap-0.5">
                          <Clock className="w-3 h-3 text-[#78716C]" />
                          <span>{coupon.daysLeft || 14} gün</span>
                        </span>
                      </div>

                      <h4 className="text-xs sm:text-sm font-black text-[#1C1917] group-hover:text-emerald-700 transition-colors leading-snug">
                        {coupon.title}
                      </h4>

                      <p className="text-[11px] text-[#57534E] font-medium line-clamp-2 mt-1 leading-relaxed">
                        {coupon.description}
                      </p>
                    </div>
                  </div>
                </div>

                {/* Bottom Coupon Action Box (KuponBurada Kuponu Al & Git style) */}
                <div className="mt-4 pt-3 border-t border-[#E7E2D9] flex items-center justify-between gap-2">
                  <div className="flex items-center gap-1.5 bg-white border border-[#DDD7CD] px-3 py-1.5 rounded-xl font-mono text-xs font-black text-[#1C1917] shadow-inner tracking-wider">
                    <Scissors className="w-3.5 h-3.5 text-emerald-600 rotate-90" />
                    <span>{coupon.code}</span>
                  </div>

                  <button
                    type="button"
                    onClick={(e) => {
                      e.stopPropagation();
                      handleOpenCoupon(coupon);
                    }}
                    className="px-4 py-2 rounded-xl text-xs font-black bg-emerald-600 hover:bg-emerald-700 text-white shadow-emerald-600/25 shadow-md flex items-center gap-1.5 group-hover:scale-105 transition-all"
                  >
                    <span>KUPONU AL & GİT</span>
                    <ExternalLink className="w-3.5 h-3.5 text-emerald-200" />
                  </button>
                </div>

              </div>
            );
          })
        ) : (
          <div className="p-8 text-center text-[#78716C] col-span-2">
            <Gift className="w-8 h-8 text-slate-300 mx-auto mb-2" />
            <p className="text-xs font-bold">Bu kategoride henüz aktif kupon bulunmuyor.</p>
          </div>
        )}
      </div>

      {/* Footer Guarantee */}
      <div className="mt-5 pt-4 border-t border-[#F5F2EC] flex items-center justify-between text-[11px] text-[#78716C] font-semibold">
        <span className="flex items-center gap-1">
          <ShieldCheck className="w-3.5 h-3.5 text-emerald-600" />
          <span>Tüm kuponlar Admin onaylıdır ve mağazalarda anında uygulanır.</span>
        </span>
        <span className="text-emerald-700 font-bold hidden sm:inline">
          Kupona Tıkla → Kodu Al & Mağazaya Yönlen ↗
        </span>
      </div>

      {/* 🚀 KUPON ALINDI & MAĞAZAYA GİT MODAL (KuponBurada Style Pop-Up) */}
      {selectedCouponModal && (
        <div 
          onClick={() => setSelectedCouponModal(null)}
          className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/85 backdrop-blur-md animate-fadeIn select-none"
        >
          <div 
            onClick={(e) => e.stopPropagation()}
            className="w-full max-w-md rounded-3xl bg-white border border-[#E7E2D9] shadow-2xl p-6 sm:p-8 space-y-6 text-[#1C1917] relative animate-in zoom-in-95 duration-200"
          >
            {/* Close */}
            <button 
              onClick={() => setSelectedCouponModal(null)}
              className="absolute top-5 right-5 p-2 rounded-xl bg-[#F5F2EC] hover:bg-[#EFECE6] text-[#57534E] hover:text-[#1C1917] border border-[#DDD7CD] transition-colors"
            >
              <X className="w-5 h-5" />
            </button>

            {/* Header / Store Badge */}
            <div className="text-center space-y-2">
              <div className="w-16 h-16 rounded-2xl bg-gradient-to-tr from-emerald-600 to-teal-700 text-white flex items-center justify-center text-2xl mx-auto shadow-lg shadow-emerald-600/30">
                <Gift className="w-8 h-8" />
              </div>
              
              <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-emerald-50 text-emerald-800 text-xs font-extrabold border border-emerald-200">
                <Store className="w-3.5 h-3.5" />
                <span>{selectedCouponModal.storeName || 'Özel Ders Borsası'}</span>
              </div>

              <h3 className="text-lg sm:text-xl font-black text-[#1C1917] leading-snug">
                {selectedCouponModal.title}
              </h3>
            </div>

            {/* Big Coupon Code Box with Confetti Check */}
            <div className="p-4 rounded-2xl bg-[#FAF8F5] border-2 border-dashed border-emerald-500/60 text-center space-y-2">
              <div className="text-[11px] font-bold text-emerald-700 uppercase tracking-wider flex items-center justify-center gap-1">
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

            {/* Instructions */}
            <p className="text-xs text-[#57534E] text-center leading-relaxed font-medium">
              Kupon kodu otomatik olarak kopyalandı. Aşağıdaki butona basarak mağazaya gidebilir ve ödeme adımında kuponunuzu yapıştırarak indirimi kullanabilirsiniz.
            </p>

            {/* Main Go to Store CTA */}
            <button
              type="button"
              onClick={() => handleGoToStore(selectedCouponModal)}
              className="w-full py-4 rounded-2xl bg-emerald-600 hover:bg-emerald-700 text-white font-black text-sm shadow-xl shadow-emerald-600/25 flex items-center justify-center gap-2 transition-transform hover:scale-[1.02]"
            >
              <span>{selectedCouponModal.storeName || 'Mağaza'} Sayfasına Git</span>
              <ExternalLink className="w-4 h-4" />
            </button>

          </div>
        </div>
      )}

    </div>
  );
}
