import React from 'react';
import { 
  Home, 
  Tag, 
  BookOpen, 
  ShoppingBag, 
  Menu 
} from 'lucide-react';

/**
 * MobileBottomBar: App-like sticky bottom dock for mobile devices (<sm screens).
 * Gives users immediate 1-tap thumb access to Store, Coupons, Cart, and Mega Menu.
 */
export default function MobileBottomBar({
  onOpenCart,
  cartCount = 0,
  onOpenMenu
}) {
  const scrollTo = (selector) => {
    if (selector === 'top') {
      window.scrollTo({ top: 0, behavior: 'smooth' });
      return;
    }
    const el = document.querySelector(selector);
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <nav 
      aria-label="Mobil Hızlı Navigasyon"
      className="sm:hidden fixed bottom-0 inset-x-0 z-40 bg-[#FAF8F5]/95 backdrop-blur-xl border-t border-[#E7E2D9] shadow-2xl px-2 py-1.5 flex items-center justify-around select-none"
    >
      
      {/* 1. Home / Vitrin */}
      <button
        type="button"
        onClick={() => scrollTo('top')}
        className="flex flex-col items-center justify-center py-1 px-2.5 rounded-xl text-[#57534E] hover:text-emerald-700 active:scale-95 transition-all min-w-[56px]"
      >
        <Home className="w-5 h-5 mb-0.5" />
        <span className="text-[10px] font-bold">Ana Sayfa</span>
      </button>

      {/* 2. Coupons */}
      <button
        type="button"
        onClick={() => scrollTo('#coupons')}
        className="flex flex-col items-center justify-center py-1 px-2.5 rounded-xl text-[#57534E] hover:text-emerald-700 active:scale-95 transition-all min-w-[56px]"
      >
        <Tag className="w-5 h-5 mb-0.5 text-amber-600" />
        <span className="text-[10px] font-bold">Kuponlar</span>
      </button>

      {/* 3. Kitap Mağazası */}
      <button
        type="button"
        onClick={() => scrollTo('#showcase')}
        className="flex flex-col items-center justify-center py-1 px-2.5 rounded-xl text-[#57534E] hover:text-emerald-700 active:scale-95 transition-all min-w-[56px]"
      >
        <BookOpen className="w-5 h-5 mb-0.5 text-teal-600" />
        <span className="text-[10px] font-bold">Kitaplar</span>
      </button>

      {/* 4. Cart with live badge */}
      <button
        type="button"
        onClick={onOpenCart}
        className="flex flex-col items-center justify-center py-1 px-2.5 rounded-xl text-[#57534E] hover:text-emerald-700 active:scale-95 transition-all min-w-[56px] relative"
      >
        <div className="relative">
          <ShoppingBag className="w-5 h-5 mb-0.5 text-emerald-600" />
          {cartCount > 0 && (
            <span className="absolute -top-1.5 -right-2 min-w-[16px] h-4 px-1 rounded-full bg-emerald-600 text-white text-[9px] font-black flex items-center justify-center shadow-sm">
              {cartCount}
            </span>
          )}
        </div>
        <span className="text-[10px] font-bold">Sepet</span>
      </button>

      {/* 5. Mega Menu Drawer */}
      <button
        type="button"
        onClick={onOpenMenu}
        className="flex flex-col items-center justify-center py-1 px-2.5 rounded-xl text-[#1C1917] hover:text-emerald-700 active:scale-95 transition-all min-w-[56px]"
      >
        <Menu className="w-5 h-5 mb-0.5 text-emerald-700" />
        <span className="text-[10px] font-black">Menü</span>
      </button>

    </nav>
  );
}
