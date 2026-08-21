import React, { useState, useEffect } from 'react';
import { 
  GraduationCap, 
  MapPin, 
  LogIn, 
  Menu, 
  X, 
  Sparkles, 
  UserCheck, 
  ChevronRight, 
  ArrowRight,
  PlusCircle,
  LayoutDashboard,
  ShieldCheck,
  User,
  SlidersHorizontal,
  Compass,
  ShoppingBag,
  Building2
} from 'lucide-react';
import MegaHamburgerMenu from './MegaHamburgerMenu';

/**
 * PublicNavbar: Clean, spacious, sticky, auth-state aware navigation bar.
 * Features a dedicated Mega Hamburger Menu button (both on desktop & mobile)
 * to open a comprehensive slide-over drawer containing all platform pages and tools.
 */
export default function PublicNavbar({
  selectedCity = 'İstanbul',
  selectedDistrict = 'Kadıköy',
  onOpenLocationModal,
  onOpenRequestWizard,
  onOpenCreateProfile,
  onOpenLeaderboard,
  onOpenAuthModal,
  currentRole = 'general', // 'general', 'student', 'teacher', 'parent', 'admin'
  onRoleChange,
  onOpenClassroom,
  onOpenExamSimulator,
  onOpenPomodoro,
  onOpenCertificate,
  onOpenThemeCustomizer,
  onOpenAffiliateModal,
  onOpenCart,
  cartCount = 0
}) {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMegaMenuOpen, setIsMegaMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks = [
    { label: 'Kitap & Deneme Mağazası', href: '#showcase' },
    { label: 'Fırsat Kuponları', href: '#coupons' },
    { label: 'Özellikler', href: '#features' },
    { label: 'Nasıl Çalışır?', href: '#how-it-works' }
  ];

  const handleScrollTo = (e, href) => {
    e.preventDefault();
    const target = document.querySelector(href);
    if (target) {
      target.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const isLoggedIn = currentRole !== 'general' && currentRole !== 'landing';

  return (
    <header 
      className={`sticky top-0 z-40 transition-all duration-300 select-none ${
        isScrolled 
          ? 'bg-[#FAF8F5]/95 backdrop-blur-md shadow-sm border-b border-[#E7E2D9] py-2.5' 
          : 'bg-[#FAF8F5] border-b border-[#EFECE6] py-3.5'
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between gap-3 sm:gap-6">
          
          {/* 1. Brand Logo & Location Pill */}
          <div className="flex items-center gap-3 sm:gap-4 shrink-0">
            <a 
              href="/" 
              className="flex items-center gap-2.5 group shrink-0"
            >
              <img 
                src="/logo.png" 
                alt="Özel Ders Borsası Logo" 
                className="w-9 h-9 sm:w-10 sm:h-10 rounded-2xl object-cover shadow-md shadow-amber-950/15 border border-amber-500/30 group-hover:scale-105 transition-transform shrink-0" 
              />
              <div className="hidden min-[380px]:block">
                <span className="text-base sm:text-lg font-black tracking-tight text-[#1C1917] block leading-none whitespace-nowrap">
                  Özel Ders <span className="text-emerald-600">Borsası</span>
                </span>
                <span className="text-[8.5px] font-bold uppercase tracking-widest text-[#78716C] block mt-0.5 whitespace-nowrap">
                  Yayınevi & Kupon Pazarı
                </span>
              </div>
            </a>
          </div>

          {/* 2. Desktop Navigation Links (Cleanly centered) */}
          <nav className="hidden xl:flex items-center gap-7 text-xs font-bold text-[#57534E] whitespace-nowrap">
            {navLinks.map((link, idx) => (
              <a
                key={idx}
                href={link.href}
                onClick={(e) => handleScrollTo(e, link.href)}
                className="hover:text-emerald-700 transition-colors"
              >
                {link.label}
              </a>
            ))}
          </nav>

          {/* 3. Session-Aware Action CTA Buttons & Hamburger Trigger */}
          <div className="flex items-center gap-2 sm:gap-2.5 shrink-0">
            
            {/* Cart Button */}
            <button
              onClick={onOpenCart}
              className="px-3.5 py-2.5 rounded-xl bg-white hover:bg-[#F5F2EC] border border-[#DDD7CD] text-[#292524] font-bold text-xs transition-colors flex items-center gap-1.5 shadow-sm whitespace-nowrap relative"
            >
              <ShoppingBag className="w-4 h-4 text-emerald-600 shrink-0" />
              <span>Sepet</span>
              {cartCount > 0 && (
                <span className="w-5 h-5 rounded-full bg-emerald-600 text-white text-[10px] font-black flex items-center justify-center">
                  {cartCount}
                </span>
              )}
            </button>

            {/* Vendor Portal Direct Entry */}
            <button
              onClick={() => onOpenAuthModal && onOpenAuthModal('vendor')}
              className="hidden sm:flex px-4 py-2.5 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white font-extrabold text-xs shadow-md shadow-emerald-600/20 transition-all items-center gap-1.5 whitespace-nowrap group"
            >
              <Building2 className="w-4 h-4 shrink-0" />
              <span>🏬 Yayınevi Portalı</span>
            </button>

            {/* If NOT logged in */}
            {!isLoggedIn ? (
              <button
                onClick={() => onOpenAuthModal && onOpenAuthModal('admin')}
                className="px-3 py-2.5 rounded-xl text-[#44403C] hover:text-[#1C1917] hover:bg-[#EFECE6] border border-[#DDD7CD] font-bold text-xs transition-colors flex items-center gap-1.5 whitespace-nowrap"
              >
                <LogIn className="w-4 h-4 text-[#78716C] shrink-0" />
                <span>Giriş Yap</span>
              </button>
            ) : (
              <button
                onClick={() => {
                  if (onRoleChange) onRoleChange(currentRole);
                }}
                className="px-4 py-2.5 rounded-xl bg-slate-900 hover:bg-black text-white font-bold text-xs transition-all shadow-md flex items-center gap-2 whitespace-nowrap"
              >
                <LayoutDashboard className="w-4 h-4 text-emerald-400 shrink-0" />
                <span>{currentRole.toUpperCase()} Paneli</span>
                <ChevronRight className="w-3.5 h-3.5 text-slate-400 shrink-0" />
              </button>
            )}

            {/* 4. MEGA HAMBURGER MENU BUTTON (Desktop & Mobile) */}
            <button
              onClick={() => setIsMegaMenuOpen(true)}
              className="p-2.5 sm:px-3.5 sm:py-2.5 rounded-xl bg-white hover:bg-[#F5F2EC] border border-[#DDD7CD] text-[#1C1917] font-extrabold text-xs transition-all flex items-center gap-2 shadow-sm hover:border-emerald-500/40 group"
              title="Tüm Sayfalar & Modüller Menüsü"
              aria-label="Ana Menü"
            >
              <Menu className="w-4 h-4 text-emerald-600 group-hover:scale-110 transition-transform shrink-0" />
              <span className="hidden md:inline font-bold">Menü</span>
            </button>

          </div>

        </div>
      </div>

      {/* 5. SLIDE-OVER MEGA HAMBURGER MENU */}
      <MegaHamburgerMenu
        isOpen={isMegaMenuOpen}
        onClose={() => setIsMegaMenuOpen(false)}
        selectedCity={selectedCity}
        selectedDistrict={selectedDistrict}
        onOpenLocationModal={onOpenLocationModal}
        onOpenRequestWizard={onOpenRequestWizard}
        onOpenCreateProfile={onOpenCreateProfile}
        onOpenLeaderboard={onOpenLeaderboard}
        onOpenAuthModal={onOpenAuthModal}
        currentRole={currentRole}
        onRoleChange={onRoleChange}
        onOpenClassroom={onOpenClassroom}
        onOpenExamSimulator={onOpenExamSimulator}
        onOpenPomodoro={onOpenPomodoro}
        onOpenCertificate={onOpenCertificate}
        onOpenThemeCustomizer={onOpenThemeCustomizer}
        onOpenAffiliateModal={onOpenAffiliateModal}
        onOpenCart={onOpenCart}
        cartCount={cartCount}
      />

    </header>
  );
}
