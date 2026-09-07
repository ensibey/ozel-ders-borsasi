import React, { useState } from 'react';
import { 
  X, 
  MapPin, 
  Sparkles, 
  GraduationCap, 
  UserCheck, 
  ShieldCheck, 
  BookOpen, 
  Award, 
  Video, 
  Clock, 
  FileText, 
  Users, 
  Building2, 
  Lock, 
  Palette, 
  Share2, 
  HelpCircle, 
  LogIn, 
  ChevronRight, 
  PlusCircle, 
  Flame, 
  CheckCircle2,
  SlidersHorizontal,
  FolderLock
} from 'lucide-react';

/**
 * MegaHamburgerMenu: Comprehensive, high-end slide-over navigation drawer.
 * Provides instant 1-click access to all marketplace sections, student tools,
 * teacher features, parent tracking, vendor storefront, admin portal, and modals.
 */
export default function MegaHamburgerMenu({
  isOpen,
  onClose,
  selectedCity = 'İstanbul',
  selectedDistrict = 'Kadıköy',
  onOpenLocationModal,
  onOpenRequestWizard,
  onOpenCreateProfile,
  onOpenLeaderboard,
  onOpenAuthModal,
  currentRole = 'general',
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
  const [activeCategory, setActiveCategory] = useState('all'); // 'all', 'public', 'student', 'teacher', 'tools'

  if (!isOpen) return null;

  const handleNavigate = (action) => {
    onClose();
    if (typeof action === 'function') {
      action();
    }
  };

  const sections = [
    {
      id: 'market',
      title: '🌟 Pazaryeri & Keşfet',
      category: 'public',
      items: [
        {
          label: 'Öne Çıkan Eğitmenler',
          sub: 'Akredite öğretmen profilleri ve randevu takvimi',
          icon: UserCheck,
          color: 'bg-emerald-500/10 text-emerald-700 border-emerald-500/20',
          action: () => {
            if (currentRole !== 'general') onRoleChange('general');
            setTimeout(() => {
              const el = document.getElementById('showcase');
              if (el) el.scrollIntoView({ behavior: 'smooth' });
            }, 100);
          }
        },
        {
          label: 'Canlı Ders İhaleleri & Talepler',
          sub: 'Öğrencilerin açtığı açık ders talepleri',
          icon: Sparkles,
          color: 'bg-amber-500/10 text-amber-700 border-amber-500/20',
          action: () => onRoleChange('requests')
        },
        {
          label: 'Yayınevleri Kitap & Deneme Pazarı',
          sub: 'Soru bankaları ve YKS/LGS deneme sınavı setleri',
          icon: BookOpen,
          color: 'bg-blue-500/10 text-blue-700 border-blue-500/20',
          badge: cartCount > 0 ? `${cartCount} Ürün Sepette` : null,
          action: () => {
            if (onOpenCart && cartCount > 0) {
              onOpenCart();
            } else {
              if (currentRole !== 'general') onRoleChange('general');
              setTimeout(() => {
                const el = document.getElementById('showcase');
                if (el) el.scrollIntoView({ behavior: 'smooth' });
              }, 100);
            }
          }
        },
        {
          label: 'Fırsat Kuponları & İndirim Kodları',
          sub: 'KuponBurada onaylı anlık özel ders ve kitap indirimleri',
          icon: Tag,
          color: 'bg-emerald-500/10 text-emerald-700 border-emerald-500/20',
          badge: 'İndirim',
          action: () => {
            if (currentRole !== 'general') onRoleChange('general');
            setTimeout(() => {
              const el = document.getElementById('showcase');
              if (el) el.scrollIntoView({ behavior: 'smooth' });
            }, 100);
          }
        },
        {
          label: 'Canlı Soru Çözüm & Etüd Salonu',
          sub: 'Anlık soru tartışma ve çalışma odaları',
          icon: Flame,
          color: 'bg-rose-500/10 text-rose-700 border-rose-500/20',
          action: () => {
            if (currentRole !== 'general') onRoleChange('general');
            setTimeout(() => {
              const el = document.getElementById('showcase');
              if (el) el.scrollIntoView({ behavior: 'smooth' });
            }, 100);
          }
        }
      ]
    },
    {
      id: 'student_tools',
      title: '🎓 Öğrenci Araçları & Simülatörler',
      category: 'student',
      items: [
        {
          label: 'Öğrenci Özel Paneli & Hedefler',
          sub: 'Ders programı, net hedefleri ve seans arşivleri',
          icon: GraduationCap,
          color: 'bg-emerald-500/10 text-emerald-700 border-emerald-500/20',
          action: () => onRoleChange('student')
        },
        {
          label: 'YKS / LGS Deneme Sınav Simülatörü',
          sub: 'Süre tutmalı canlı soru çözümü ve net analizi',
          icon: FileText,
          color: 'bg-indigo-500/10 text-indigo-700 border-indigo-500/20',
          action: () => onOpenExamSimulator && onOpenExamSimulator()
        },
        {
          label: 'İnteraktif Sanal Sınıf & Beyaz Tahta',
          sub: 'Canlı seans araçları, ekran paylaşımı ve çizim tahtası',
          icon: Video,
          color: 'bg-teal-500/10 text-teal-700 border-teal-500/20',
          action: () => onOpenClassroom && onOpenClassroom()
        },
        {
          label: 'Pomodoro Odaklanma Sayacı',
          sub: '25 dk ders + 5 dk mola çalışma zamanlayıcısı',
          icon: Clock,
          color: 'bg-amber-500/10 text-amber-700 border-amber-500/20',
          action: () => onOpenPomodoro && onOpenPomodoro()
        },
        {
          label: 'Başarı ve Katılım Sertifikası',
          sub: 'Tamamlanan ders ve etütler için onaylı dijital sertifika',
          icon: Award,
          color: 'bg-purple-500/10 text-purple-700 border-purple-500/20',
          action: () => onOpenCertificate && onOpenCertificate()
        }
      ]
    },
    {
      id: 'roles_portals',
      title: '👥 Özel Portallar (Veli / Öğretmen / Yayıncı)',
      category: 'teacher',
      items: [
        {
          label: '🏆 Türkiye Liderlik Tablosu',
          sub: 'Elit & Altın ligdeki en başarılı ilk 10 eğitmen sıralaması',
          icon: Award,
          color: 'bg-amber-500/10 text-amber-700 border-amber-500/20',
          action: () => onOpenLeaderboard && onOpenLeaderboard()
        },
        {
          label: 'Öğretmen & Eğitmen Portalı',
          sub: 'Takvim planlama, teklif gönderme ve hakediş takibi',
          icon: UserCheck,
          color: 'bg-teal-500/10 text-teal-700 border-teal-500/20',
          action: () => onOpenAuthModal ? onOpenAuthModal('teacher') : onRoleChange('teacher')
        },
        {
          label: 'Veli Takip Portalı',
          sub: 'Öğrenci devam durumu ve öğretmen değerlendirme raporları',
          icon: ShieldCheck,
          color: 'bg-amber-500/10 text-amber-700 border-amber-500/20',
          action: () => onRoleChange('parent')
        },
        {
          label: 'Firma & Yayınevi Portalı',
          sub: 'Kitap ve deneme sınavı mağaza stok yönetimi',
          icon: Building2,
          color: 'bg-purple-500/10 text-purple-700 border-purple-500/20',
          action: () => onOpenAuthModal ? onOpenAuthModal('vendor') : onRoleChange('vendor')
        },
        {
          label: '🛡️ Yönetici (Admin) Portalı',
          sub: 'Sistem güvenliği, kullanıcı CRUD, onay masası ve loglar',
          icon: Lock,
          color: 'bg-blue-500/10 text-blue-700 border-blue-500/20',
          action: () => {
            window.location.hash = '#admin';
            if (onOpenAuthModal) onOpenAuthModal('admin');
          }
        }
      ]
    },
    {
      id: 'platform_tools',
      title: '⚙️ Platform & Kişiselleştirme',
      category: 'tools',
      items: [
        {
          label: 'Arkadaşını Davet Et (Affiliate & Puan)',
          sub: 'Referans kodunla davet et, 500 Borsa Puanı kazan',
          icon: Share2,
          color: 'bg-rose-500/10 text-rose-700 border-rose-500/20',
          action: () => onOpenAffiliateModal && onOpenAffiliateModal()
        },
        {
          label: 'Arayüz Tema Özelleştirici',
          sub: 'Koyu / Açık / Zümrüt / Mor renk paleti seçimi',
          icon: Palette,
          color: 'bg-indigo-500/10 text-indigo-700 border-indigo-500/20',
          action: () => onOpenThemeCustomizer && onOpenThemeCustomizer()
        },
        {
          label: 'Sıkça Sorulan Sorular & Destek',
          sub: 'Havuz hesabı güvencesi ve seans telafisi detayları',
          icon: HelpCircle,
          color: 'bg-slate-500/10 text-slate-700 border-slate-500/20',
          action: () => {
            if (currentRole !== 'general') onRoleChange('general');
            setTimeout(() => {
              const el = document.getElementById('faq');
              if (el) el.scrollIntoView({ behavior: 'smooth' });
            }, 100);
          }
        }
      ]
    }
  ];

  const filteredSections = activeCategory === 'all' 
    ? sections 
    : sections.filter(s => s.category === activeCategory);

  return (
    <div 
      onClick={onClose}
      className="fixed inset-0 z-50 flex justify-end bg-slate-950/80 backdrop-blur-md animate-fadeIn select-none"
    >
      <div 
        onClick={(e) => e.stopPropagation()}
        className="w-full max-w-lg bg-[#FAF8F5] text-[#1C1917] h-full shadow-2xl flex flex-col justify-between border-l border-[#E7E2D9] animate-in slide-in-from-right duration-300 overflow-hidden"
      >
        {/* 1. TOP HEADER BAR */}
        <div className="p-5 sm:p-6 border-b border-[#E7E2D9] bg-white space-y-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <img 
                src="./logo.png" 
                alt="Özel Ders Borsası Logo" 
                className="w-10 h-10 rounded-2xl object-cover shadow-md border border-amber-500/30 shrink-0" 
              />
              <div>
                <span className="text-base font-black tracking-tight text-[#1C1917] block leading-none">
                  Özel Ders <span className="text-emerald-600">Borsası</span>
                </span>
                <span className="text-[9px] font-bold uppercase tracking-widest text-[#78716C] block mt-0.5">
                  Tüm Sayfalar & Modüller
                </span>
              </div>
            </div>

            <button 
              onClick={onClose}
              className="p-2.5 rounded-2xl bg-[#F5F2EC] hover:bg-[#EFECE6] text-[#57534E] hover:text-[#1C1917] transition-colors border border-[#DDD7CD]"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Quick Location & Role Pills */}
          <div className="flex items-center justify-between gap-2 pt-1">
            <button
              onClick={() => handleNavigate(onOpenLocationModal)}
              className="px-3.5 py-1.5 rounded-full bg-[#FAF8F5] hover:bg-[#EFECE6] border border-[#DDD7CD] text-xs font-bold text-[#44403C] flex items-center gap-1.5 transition-colors"
            >
              <MapPin className="w-3.5 h-3.5 text-emerald-600" />
              <span>{selectedCity}, {selectedDistrict}</span>
              <span className="text-[9px] text-emerald-700 bg-emerald-100 px-1.5 py-0.2 rounded-full font-extrabold ml-1">Değiştir</span>
            </button>

            <span className="text-[10px] font-bold px-2.5 py-1 bg-emerald-50 text-emerald-800 border border-emerald-200 rounded-full font-mono uppercase">
              Aktif: {currentRole}
            </span>
          </div>

          {/* Category Filter Pills */}
          <div className="flex items-center gap-1.5 overflow-x-auto custom-scrollbar pb-1 text-xs font-bold">
            {[
              { id: 'all', label: 'Tümü' },
              { id: 'public', label: 'Pazaryeri' },
              { id: 'student', label: 'Öğrenci' },
              { id: 'teacher', label: 'Portallar' },
              { id: 'tools', label: 'Araçlar' }
            ].map(tab => (
              <button
                key={tab.id}
                onClick={() => setActiveCategory(tab.id)}
                className={`px-3 py-1 rounded-xl whitespace-nowrap transition-all ${
                  activeCategory === tab.id
                    ? 'bg-[#1C1917] text-white shadow-sm'
                    : 'bg-[#F5F2EC] text-[#57534E] hover:text-[#1C1917] border border-[#DDD7CD]'
                }`}
              >
                {tab.label}
              </button>
            ))}
          </div>
        </div>

        {/* 2. SCROLLABLE MENU ITEMS VIEWPORT */}
        <div className="flex-1 overflow-y-auto p-5 sm:p-6 space-y-6 custom-scrollbar">
          {filteredSections.map((sec) => (
            <div key={sec.id} className="space-y-2.5">
              <h3 className="text-xs font-extrabold uppercase tracking-wider text-[#78716C] px-1">
                {sec.title}
              </h3>

              <div className="space-y-2">
                {sec.items.map((item, idx) => {
                  const Icon = item.icon;
                  return (
                    <button
                      key={idx}
                      onClick={() => handleNavigate(item.action)}
                      className="w-full p-3.5 rounded-2xl bg-white hover:bg-[#F5F2EC] border border-[#E7E2D9] hover:border-emerald-500/40 transition-all flex items-center justify-between gap-3 text-left shadow-sm group hover:shadow-md"
                    >
                      <div className="flex items-center gap-3.5 min-w-0">
                        <div className={`w-10 h-10 rounded-2xl border flex items-center justify-center shrink-0 transition-transform group-hover:scale-105 ${item.color}`}>
                          <Icon className="w-5 h-5" />
                        </div>
                        <div className="min-w-0">
                          <div className="flex items-center gap-2">
                            <h4 className="text-xs font-extrabold text-[#1C1917] group-hover:text-emerald-700 transition-colors truncate">
                              {item.label}
                            </h4>
                            {item.badge && (
                              <span className="text-[9px] font-bold px-2 py-0.5 bg-emerald-100 text-emerald-800 rounded-full shrink-0">
                                {item.badge}
                              </span>
                            )}
                          </div>
                          <p className="text-[11px] text-[#78716C] font-medium truncate mt-0.5">
                            {item.sub}
                          </p>
                        </div>
                      </div>

                      <ChevronRight className="w-4 h-4 text-[#A8A29E] group-hover:text-emerald-700 group-hover:translate-x-0.5 transition-all shrink-0" />
                    </button>
                  );
                })}
              </div>
            </div>
          ))}
        </div>

        {/* 3. BOTTOM STICKY ACTION PANEL */}
        <div className="p-5 sm:p-6 border-t border-[#E7E2D9] bg-white space-y-3">
          <button
            onClick={() => handleNavigate(onOpenRequestWizard)}
            className="w-full py-3.5 rounded-2xl bg-emerald-600 hover:bg-emerald-700 text-white font-black text-xs sm:text-sm shadow-xl shadow-emerald-600/25 transition-all flex items-center justify-center gap-2"
          >
            <PlusCircle className="w-4 h-4" />
            <span>Ücretsiz Ders Talebi Oluştur</span>
          </button>

          <div className="grid grid-cols-2 gap-2">
            <button
              onClick={() => handleNavigate(onOpenCreateProfile)}
              className="py-2.5 rounded-xl bg-[#F5F2EC] hover:bg-[#EFECE6] border border-[#DDD7CD] text-[#292524] font-bold text-xs flex items-center justify-center gap-1.5 transition-colors"
            >
              <UserCheck className="w-3.5 h-3.5 text-emerald-600" />
              <span>Eğitmen Başvurusu</span>
            </button>

            <button
              onClick={() => handleNavigate(() => onOpenAuthModal && onOpenAuthModal('student'))}
              className="py-2.5 rounded-xl bg-[#1C1917] hover:bg-black text-white font-bold text-xs flex items-center justify-center gap-1.5 transition-colors"
            >
              <LogIn className="w-3.5 h-3.5 text-emerald-400" />
              <span>Giriş / Rol Seç</span>
            </button>
          </div>

          <div className="pt-2 text-center text-[10px] text-[#78716C] font-medium flex items-center justify-center gap-1.5">
            <ShieldCheck className="w-3.5 h-3.5 text-emerald-600" />
            <span>256-Bit SSL • %100 Havuz Hesabı Güvencesi</span>
          </div>
        </div>

      </div>
    </div>
  );
}
