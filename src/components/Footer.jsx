import React, { useState } from 'react';
import { 
  GraduationCap, Mail, Send, ShieldCheck, Lock, Award, 
  MapPin, PhoneCall, CheckCircle2, Sparkles, HelpCircle, Palette 
} from 'lucide-react';
import confetti from 'canvas-confetti';
import FaqModal from './FaqModal';
import LogoShowcaseModal from './LogoShowcaseModal';

export default function Footer({ onOpenLocationModal, onOpenNotifications, onOpenCart, onOpenAffiliateModal, onRequestAuthRole }) {
  const [email, setEmail] = useState('');
  const [subscribed, setSubscribed] = useState(false);
  const [isFaqOpen, setIsFaqOpen] = useState(false);
  const [isLogoShowcaseOpen, setIsLogoShowcaseOpen] = useState(false);

  const handleNewsletter = (e) => {
    e.preventDefault();
    if (!email) return;
    confetti({ particleCount: 60, spread: 50 });
    setSubscribed(true);
    setEmail('');
    setTimeout(() => setSubscribed(false), 3000);
  };

  return (
    <footer className="mt-20 border-t border-slate-800/80 bg-slate-950/95 text-xs text-slate-300 relative overflow-hidden">
      
      {/* Background ambient light */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-3/4 h-32 bg-indigo-600/5 blur-3xl pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 space-y-10 relative z-10">
        
        {/* Top Newsletter & Mobile App Download Banner */}
        <div className="glass-panel p-6 sm:p-8 rounded-3xl border border-indigo-500/20 bg-gradient-to-r from-slate-900 via-indigo-950/30 to-slate-900 flex flex-col lg:flex-row items-center justify-between gap-6">
          <div className="space-y-1 text-center lg:text-left">
            <h3 className="text-lg font-extrabold text-white flex items-center justify-center lg:justify-start gap-2">
              <Sparkles className="w-5 h-5 text-amber-400" />
              <span>Haftalık Ücretsiz Deneme & İndirim Bülteni</span>
            </h3>
            <p className="text-xs text-slate-400">
              En yeni deneme sınavları, bursluluk duyuruları ve öğretmen indirim kodları e-posta adresinize gelsin.
            </p>
          </div>

          <form onSubmit={handleNewsletter} className="flex items-center gap-2 w-full lg:w-auto max-w-md">
            <div className="relative flex-1">
              <Mail className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="E-posta adresiniz..."
                className="w-full glass-input rounded-xl pl-9 pr-3 py-2.5 text-xs text-white"
                required
              />
            </div>
            <button
              type="submit"
              className="px-5 py-2.5 rounded-xl bg-indigo-600 hover:bg-indigo-500 text-white font-bold text-xs shadow-lg shadow-indigo-600/30 shrink-0 flex items-center gap-1.5"
            >
              {subscribed ? <CheckCircle2 className="w-4 h-4 text-emerald-400" /> : <Send className="w-4 h-4" />}
              <span>{subscribed ? 'Kaydolundu!' : 'Abone Ol'}</span>
            </button>
          </form>
        </div>

        {/* 4 Column Footer Grid */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 pt-4">
          
          {/* Col 1: Brand Info */}
          <div className="space-y-3">
            <div className="flex items-center space-x-2">
              <div className="w-9 h-9 rounded-xl bg-gradient-to-tr from-indigo-600 to-violet-600 flex items-center justify-center text-white shadow-md">
                <GraduationCap className="w-5 h-5" />
              </div>
              <span className="text-base font-extrabold text-white">ÖZEL DERS BORSASI</span>
            </div>
            <p className="text-slate-400 leading-relaxed">
              Türkiye'nin il ve ilçe bazlı özel ders, eğitim koçluğu, deneme sınavı ve materyal pazarı.
            </p>
            <div className="flex items-center space-x-2 text-[11px] text-emerald-400 font-semibold pt-1">
              <Lock className="w-3.5 h-3.5" />
              <span>256-Bit SSL Güvenli Ödeme & ÖSYM Uyumlu</span>
            </div>
          </div>

          {/* Col 2: Hizmetler & Portallar */}
          <div className="space-y-3">
            <h4 className="text-sm font-bold text-white uppercase tracking-wider">Hızlı Erişim</h4>
            <ul className="space-y-2 text-slate-400">
              <li className="hover:text-white cursor-pointer" onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}>
                👨‍🎓 Öğrenci Özel Sayfası
              </li>
              <li className="hover:text-white cursor-pointer" onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}>
                👨‍👩‍👧 Kısaca Çocuklar İçin Veli Girişi
              </li>
              <li className="hover:text-white cursor-pointer" onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}>
                👨‍🏫 Öğretmen Özel Sayfası & Görevler
              </li>
              <li className="hover:text-indigo-400 cursor-pointer flex items-center gap-1 font-semibold text-indigo-300" onClick={() => setIsFaqOpen(true)}>
                <HelpCircle className="w-3.5 h-3.5" />
                <span>Sıkça Sorulan Sorular / Yardım</span>
              </li>
              <li className="hover:text-amber-300 cursor-pointer flex items-center gap-1 text-amber-400 font-semibold pt-1" onClick={() => setIsLogoShowcaseOpen(true)}>
                <Palette className="w-3.5 h-3.5 text-amber-400" />
                <span>10 DB Logo Tasarım Galerisi</span>
              </li>
            </ul>
          </div>

          {/* Col 3: Popüler Şehirler */}
          <div className="space-y-3">
            <h4 className="text-sm font-bold text-white uppercase tracking-wider">Popüler Şehirler</h4>
            <ul className="space-y-2 text-slate-400">
              <li className="hover:text-indigo-400 cursor-pointer flex items-center gap-1" onClick={onOpenLocationModal}>
                <MapPin className="w-3.5 h-3.5 text-indigo-400" />
                <span>İstanbul Özel Ders Eğitmenleri</span>
              </li>
              <li className="hover:text-indigo-400 cursor-pointer flex items-center gap-1" onClick={onOpenLocationModal}>
                <MapPin className="w-3.5 h-3.5 text-indigo-400" />
                <span>Ankara Özel Ders Eğitmenleri</span>
              </li>
              <li className="hover:text-indigo-400 cursor-pointer flex items-center gap-1" onClick={onOpenLocationModal}>
                <MapPin className="w-3.5 h-3.5 text-indigo-400" />
                <span>İzmir Özel Ders Eğitmenleri</span>
              </li>
              <li className="hover:text-indigo-400 cursor-pointer flex items-center gap-1" onClick={onOpenLocationModal}>
                <MapPin className="w-3.5 h-3.5 text-indigo-400" />
                <span>Bursa & Antalya Özel Ders</span>
              </li>
            </ul>
          </div>

          {/* Col 4: Kurumsal & Komisyon Ortaklığı */}
          <div className="space-y-3">
            <h4 className="text-sm font-bold text-white uppercase tracking-wider">İş Ortaklığı</h4>
            <p className="text-slate-400">
              Eğitmenler, yayın evleri ve içerik üreticileri için avantajlı iş ortaklığı ve komisyon paketleri.
            </p>
            <button
              onClick={onOpenAffiliateModal}
              className="w-full py-2.5 rounded-xl bg-amber-500/20 text-amber-300 border border-amber-500/30 hover:bg-amber-500/30 font-bold text-xs transition-colors flex items-center justify-center gap-1.5"
            >
              <Award className="w-4 h-4 text-amber-400" />
              <span>Komisyon Ortaklığı Başvurusu</span>
            </button>
          </div>

        </div>

        {/* Bottom Legal Copyright & Secret Admin Portal Link */}
        <div className="pt-8 border-t border-slate-800/80 flex flex-col sm:flex-row items-center justify-between text-slate-500 text-[11px] gap-2">
          <div>ÖZEL DERS BORSASI © 2026. Tüm hakları saklıdır.</div>
          <div className="flex items-center space-x-4">
            <span className="hover:text-slate-300 cursor-pointer" onClick={() => setIsFaqOpen(true)}>Yardım Merkezi</span>
            <span className="hover:text-slate-300 cursor-pointer">Gizlilik Politikası</span>
            <span className="hover:text-slate-300 cursor-pointer">Kullanım Koşulları</span>
            {onRequestAuthRole && (
              <button
                onClick={() => onRequestAuthRole('admin')}
                className="hover:text-rose-400 text-slate-600 transition-colors flex items-center gap-1 font-mono"
                title="Yönetici Paneline Gizli Geçiş"
              >
                <Lock className="w-3 h-3 text-rose-500" />
                <span>Yönetici Portalı</span>
              </button>
            )}
          </div>
        </div>

      </div>

      <FaqModal isOpen={isFaqOpen} onClose={() => setIsFaqOpen(false)} />
      <LogoShowcaseModal isOpen={isLogoShowcaseOpen} onClose={() => setIsLogoShowcaseOpen(false)} />
    </footer>
  );
}
