import React, { useState } from 'react';
import { 
  Tag, 
  Copy, 
  Check, 
  Flame, 
  X, 
  ChevronRight, 
  Sparkles
} from 'lucide-react';
import confetti from 'canvas-confetti';

export default function FloatingCouponAd({ coupons = [] }) {
  const [isOpen, setIsOpen] = useState(true);
  const [copiedCode, setCopiedCode] = useState(null);

  const activeCoupons = coupons.filter(c => c.isActive !== false);
  const displayCoupons = activeCoupons.length > 0 ? activeCoupons.slice(0, 3) : [
    {
      code: 'KITAP30',
      title: 'Tüm YKS & LGS Kitaplarında %30 İndirim',
      discount: '%30 İndirim',
      store: 'Borsa Yayınları'
    },
    {
      code: 'BORSA200',
      title: '500 ₺ Üzeri İlk Siparişte 200 ₺ İndirim',
      discount: '200 ₺ İndirim',
      store: 'Özel Ders Borsası'
    },
    {
      code: 'YKS2026',
      title: 'Deneme Setlerinde Ekstra %25 İndirim',
      discount: '%25 İndirim',
      store: 'Borsa Akademi'
    }
  ];

  const handleCopyCode = (code, e) => {
    if (e) e.stopPropagation();
    navigator.clipboard.writeText(code);
    setCopiedCode(code);
    confetti({
      particleCount: 50,
      spread: 60,
      origin: { y: 0.7 }
    });
    setTimeout(() => {
      setCopiedCode(null);
    }, 2500);
  };

  const handleScrollToCoupons = () => {
    const el = document.getElementById('coupons') || document.getElementById('showcase');
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  if (!isOpen) {
    return (
      <div className="fixed right-2 sm:right-4 top-28 sm:top-36 z-40 animate-fadeIn select-none">
        <button
          type="button"
          onClick={() => setIsOpen(true)}
          className="group flex items-center gap-2 px-3 sm:px-3.5 py-2 sm:py-2.5 rounded-full bg-gradient-to-r from-amber-500 via-orange-500 to-rose-500 text-white font-extrabold text-xs shadow-2xl shadow-orange-500/40 hover:scale-105 active:scale-95 transition-all border border-white/30"
          title="Kupon Reklamını Aç"
        >
          <span className="flex h-2 w-2 relative">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-white opacity-75"></span>
            <span className="relative inline-flex rounded-full h-2 w-2 bg-white"></span>
          </span>
          <Flame className="w-4 h-4 fill-white animate-bounce" />
          <span className="whitespace-nowrap font-black tracking-tight">🏷️ Fırsat Kuponları (%50)</span>
        </button>
      </div>
    );
  }

  return (
    <aside 
      aria-label="Öne Çıkan Kampanya Kuponları"
      className="fixed right-2.5 sm:right-6 top-20 sm:top-24 z-40 w-[300px] sm:w-[325px] max-w-[calc(100vw-1.5rem)] animate-in slide-in-from-right-8 duration-500 select-none font-sans"
    >
      <div className="rounded-3xl bg-white/95 backdrop-blur-xl border-2 border-amber-500/40 shadow-2xl shadow-amber-950/20 overflow-hidden ring-1 ring-black/5">
        
        {/* Top Ad Announcement Header */}
        <div className="bg-gradient-to-r from-amber-500 via-orange-500 to-rose-500 p-3 sm:p-3.5 text-white flex items-center justify-between shadow-sm">
          <div className="flex items-center gap-2">
            <div className="w-7 h-7 rounded-xl bg-white/20 backdrop-blur-md flex items-center justify-center shrink-0">
              <Flame className="w-4 h-4 text-white fill-white animate-pulse" />
            </div>
            <div>
              <div className="flex items-center gap-1.5">
                <span className="text-[9px] font-black uppercase tracking-wider bg-white/25 px-1.5 py-0.2 rounded-md">
                  FIRSAT REKLAMI
                </span>
                <span className="text-[10px] text-amber-100 font-bold hidden sm:inline">Canlı Kampanya</span>
              </div>
              <h4 className="text-xs font-black tracking-tight leading-tight mt-0.5">
                Günün İndirim Kuponları!
              </h4>
            </div>
          </div>

          <div className="flex items-center gap-1">
            <button
              type="button"
              onClick={() => setIsOpen(false)}
              className="p-1.5 rounded-lg bg-black/15 hover:bg-black/30 text-white transition-colors"
              title="Kapat / Küçült"
              aria-label="Kapat"
            >
              <X className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>

        {/* Ad Body Content */}
        <div className="p-3 sm:p-4 space-y-2.5 bg-gradient-to-b from-[#FAF8F5] to-white">
          
          <p className="text-[11px] text-[#57534E] font-semibold leading-snug">
            Sitede geçerli sıcak fırsatlar! Sepette veya mağazada anında indirim kazanın:
          </p>

          {/* List of Flash Coupons */}
          <div className="space-y-2">
            {displayCoupons.map((c, idx) => {
              const code = c.code || 'BORSA';
              const title = c.title || 'Fırsat İndirimi';
              const discountText = c.discount || (c.discountType === 'percent' ? ('%' + c.discountValue + ' İndirim') : (c.discountValue + ' ₺ İndirim'));
              const isCopied = copiedCode === code;

              return (
                <div 
                  key={idx}
                  className="p-2.5 rounded-2xl bg-white border border-[#E7E2D9] hover:border-amber-500/50 shadow-sm hover:shadow-md transition-all flex items-center justify-between gap-2.5 group"
                >
                  <div className="min-w-0 flex-1">
                    <div className="flex items-center gap-1.5 mb-0.5">
                      <span className="text-[10px] font-black text-rose-600 bg-rose-50 px-1.5 py-0.2 rounded border border-rose-200/60 shrink-0 font-mono">
                        {discountText}
                      </span>
                      <span className="text-[9px] text-[#78716C] font-bold truncate">
                        {c.storeName || c.store || 'Özel Ders Borsası'}
                      </span>
                    </div>
                    <div className="text-[11px] font-black text-[#1C1917] truncate leading-tight">
                      {title}
                    </div>
                  </div>

                  {/* Copy Button */}
                  <button
                    type="button"
                    onClick={(e) => handleCopyCode(code, e)}
                    className={`px-2.5 py-1.5 rounded-xl text-[11px] font-black flex items-center gap-1 transition-all shrink-0 ${
                      isCopied 
                        ? 'bg-emerald-600 text-white shadow-sm' 
                        : 'bg-amber-50 hover:bg-amber-100 text-amber-900 border border-amber-300 shadow-sm active:scale-95'
                    }`}
                  >
                    {isCopied ? (
                      <>
                        <Check className="w-3 h-3" />
                        <span>Alındı!</span>
                      </>
                    ) : (
                      <>
                        <Copy className="w-3 h-3 text-amber-700" />
                        <span className="font-mono">{code}</span>
                      </>
                    )}
                  </button>
                </div>
              );
            })}
          </div>

          {/* Bottom Action: Go to All Coupons */}
          <div className="pt-1">
            <button
              type="button"
              onClick={handleScrollToCoupons}
              className="w-full py-2 px-3 rounded-xl bg-gradient-to-r from-emerald-600 to-teal-700 hover:from-emerald-700 hover:to-teal-800 text-white text-xs font-black shadow-md shadow-emerald-700/20 transition-all flex items-center justify-center gap-1.5 group"
            >
              <Tag className="w-3.5 h-3.5 text-emerald-200" />
              <span>Tüm Kuponları Gör & Kullan</span>
              <ChevronRight className="w-3.5 h-3.5 text-emerald-200 transition-transform group-hover:translate-x-0.5" />
            </button>
          </div>

        </div>

        {/* Sub-footer Micro Guarantee */}
        <div className="px-3 py-1.5 bg-[#FAF8F5] border-t border-[#E7E2D9] flex items-center justify-between text-[9.5px] font-bold text-[#78716C]">
          <span className="flex items-center gap-1">
            <Sparkles className="w-2.5 h-2.5 text-emerald-600" /> Doğrulanmış Aktif Kodlar
          </span>
          <button 
            type="button"
            onClick={() => setIsOpen(false)}
            className="text-[#78716C] hover:text-[#1C1917] underline"
          >
            Gizle
          </button>
        </div>

      </div>
    </aside>
  );
}
