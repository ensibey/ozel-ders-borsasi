import React from 'react';
import { 
  GraduationCap, 
  ShieldCheck, 
  Lock, 
  Mail, 
  Phone, 
  MapPin, 
  Instagram, 
  Twitter, 
  Linkedin, 
  Youtube,
  ExternalLink
} from 'lucide-react';

/**
 * PublicFooter: Semantic 4-column corporate footer with product links,
 * legal references, social media handles, and 256-bit SSL trust badges.
 */
export default function PublicFooter({
  onOpenLocationModal,
  onOpenRequestWizard,
  onOpenCreateProfile,
  onOpenAuthModal
}) {
  return (
    <footer className="bg-[#1C1917] text-[#A8A29E] pt-14 pb-8 select-none border-t border-slate-800 font-sans">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
        
        {/* Main 4-Column Grid Layout */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 lg:gap-10">
          
          {/* Column 1: Brand & Identity */}
          <div className="space-y-4">
            <div className="flex items-center gap-3">
              <img 
                src="./logo.png" 
                alt="Özel Ders Borsası Logo" 
                className="w-11 h-11 rounded-2xl object-cover shadow-lg border border-amber-500/30 shrink-0" 
              />
              <div>
                <span className="text-lg font-black text-white tracking-tight block leading-tight">
                  Özel Ders <span className="text-emerald-500">Borsası</span>
                </span>
                <span className="text-[10px] text-[#78716C] font-bold uppercase tracking-widest block">
                  Yayınevi & Kupon Pazarı
                </span>
              </div>
            </div>

            <p className="text-xs leading-relaxed text-[#A8A29E]">
              Türkiye’nin en seçkin yayınevlerini, soru bankalarını, deneme sınavlarını ve anında indirim kuponlarını bir araya getiren yeni nesil yayıncılık pazaryeri.
            </p>

            {/* Social Media Links */}
            <div className="flex items-center gap-3 pt-1">
              <a href="#" aria-label="Instagram" className="w-8 h-8 rounded-xl bg-slate-900 border border-slate-800 flex items-center justify-center text-slate-400 hover:text-white hover:border-slate-700 transition-colors">
                <Instagram className="w-4 h-4" />
              </a>
              <a href="#" aria-label="Twitter / X" className="w-8 h-8 rounded-xl bg-slate-900 border border-slate-800 flex items-center justify-center text-slate-400 hover:text-white hover:border-slate-700 transition-colors">
                <Twitter className="w-4 h-4" />
              </a>
              <a href="#" aria-label="LinkedIn" className="w-8 h-8 rounded-xl bg-slate-900 border border-slate-800 flex items-center justify-center text-slate-400 hover:text-white hover:border-slate-700 transition-colors">
                <Linkedin className="w-4 h-4" />
              </a>
              <a href="#" aria-label="YouTube" className="w-8 h-8 rounded-xl bg-slate-900 border border-slate-800 flex items-center justify-center text-slate-400 hover:text-white hover:border-slate-700 transition-colors">
                <Youtube className="w-4 h-4" />
              </a>
            </div>
          </div>

          {/* Column 2: Ürün & Popüler Branşlar */}
          <div className="space-y-3">
            <h4 className="text-xs font-bold uppercase tracking-wider text-white">Yayınlar & Kuponlar</h4>
            <ul className="space-y-2 text-xs">
              <li><a href="#showcase" className="hover:text-emerald-400 transition-colors">YKS (TYT/AYT) Soru Bankaları</a></li>
              <li><a href="#showcase" className="hover:text-emerald-400 transition-colors">LGS Branş Deneme Paketleri</a></li>
              <li><a href="#showcase" className="hover:text-emerald-400 transition-colors">Dijital Soru Bankası PDF Setleri</a></li>
              <li><a href="#showcase" className="hover:text-emerald-400 transition-colors">KPSS & ALES Hazırlık Kitapları</a></li>
              <li><a href="#coupons" className="hover:text-emerald-400 transition-colors">KuponBurada İndirim Kodları</a></li>
              <li><a href="#coupons" className="hover:text-emerald-400 transition-colors">Yayınevi Kampanya Kuponları</a></li>
            </ul>
          </div>

          {/* Column 3: Şirket & Platform */}
          <div className="space-y-3">
            <h4 className="text-xs font-bold uppercase tracking-wider text-white">Platform & Şirket</h4>
            <ul className="space-y-2 text-xs">
              <li>
                <button onClick={onOpenRequestWizard} className="hover:text-emerald-400 transition-colors text-left">
                  Ders Talebi Oluştur
                </button>
              </li>
              <li>
                <button onClick={onOpenCreateProfile} className="hover:text-emerald-400 transition-colors text-left">
                  Eğitmen Başvurusu Yap
                </button>
              </li>
              <li><a href="#how-it-works" className="hover:text-emerald-400 transition-colors">Nasıl Çalışır?</a></li>
              <li><a href="#features" className="hover:text-emerald-400 transition-colors">Havuz Güvenli Ödeme</a></li>
              <li><a href="#faq" className="hover:text-emerald-400 transition-colors">Sıkça Sorulan Sorular</a></li>
              <li>
                <button 
                  onClick={onOpenLocationModal} 
                  className="hover:text-emerald-400 transition-colors text-left flex items-center gap-1 text-slate-400"
                >
                  <MapPin className="w-3.5 h-3.5 text-emerald-500" /> Şehir Seçimi
                </button>
              </li>
            </ul>
          </div>

          {/* Column 4: Yasal & Güvenlik */}
          <div className="space-y-3">
            <h4 className="text-xs font-bold uppercase tracking-wider text-white">Yasal & Güvenlik</h4>
            <ul className="space-y-2 text-xs">
              <li><span className="text-[#78716C] hover:text-slate-300 cursor-pointer transition-colors">KVKK Aydınlatma Metni</span></li>
              <li><span className="text-[#78716C] hover:text-slate-300 cursor-pointer transition-colors">Kullanıcı Sözleşmesi</span></li>
              <li><span className="text-[#78716C] hover:text-slate-300 cursor-pointer transition-colors">Mesafeli Satış Sözleşmesi</span></li>
              <li><span className="text-[#78716C] hover:text-slate-300 cursor-pointer transition-colors">Gizlilik & Çerez Politikası</span></li>
              <li><span className="text-[#78716C] hover:text-slate-300 cursor-pointer transition-colors">İptal ve İade Prosedürü</span></li>
            </ul>
          </div>

        </div>

        {/* Bottom Bar: Copyright & Security Seals */}
        <div className="pt-8 border-t border-slate-800 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-[#78716C]">
          <p>© 2026 Özel Ders Borsası A.Ş. Tüm hakları saklıdır.</p>
          
          <div className="flex flex-wrap items-center gap-4 text-[11px] font-medium">
            <span className="flex items-center gap-1 text-emerald-400">
              <ShieldCheck className="w-3.5 h-3.5" /> 256-Bit SSL Şifreleme
            </span>
            <span>•</span>
            <span className="flex items-center gap-1 text-slate-300">
              <Lock className="w-3.5 h-3.5 text-emerald-400" /> Havuz Hesabı Güvencesi
            </span>
            <span>•</span>
            <span>Türkiye Geneli 81 İl</span>
          </div>
        </div>

      </div>
    </footer>
  );
}
