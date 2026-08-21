import React, { useState } from 'react';
import { 
  Send, 
  MessageSquare, 
  GraduationCap, 
  FileCheck, 
  UserCheck, 
  CreditCard, 
  ArrowRight, 
  CheckCircle2,
  Sparkles,
  ChevronRight
} from 'lucide-react';

/**
 * HowItWorks: 3-step numbered visual workflow with connecting lines,
 * interactive role tabs (Student vs Teacher), and actionable conversion buttons.
 */
export default function HowItWorks({ onOpenRequestWizard, onOpenCreateProfile }) {
  const [activeTab, setActiveTab] = useState('student'); // 'student' (Buyer) or 'teacher' (Publisher)

  const studentSteps = [
    {
      stepNumber: '01',
      title: 'Kitap & Deneme Seç veya Kupon Bul',
      description: 'YKS, LGS, KPSS veya branş deneme paketlerini incele, mağazalarda geçerli anında indirim kuponlarını yakala.',
      icon: Send,
      highlight: 'Kolay Seçim',
      color: 'from-emerald-500/20 to-teal-500/20 text-emerald-700 border-emerald-500/30'
    },
    {
      stepNumber: '02',
      title: 'Kupon Kodunu Al & Sepete Ekle',
      description: 'KuponBurada yönlendirmesiyle mağazaya git veya doğrudan siteden sepete ekleyerek indirim kodunu anında uygula.',
      icon: MessageSquare,
      highlight: 'Anında İndirim',
      color: 'from-blue-500/20 to-cyan-500/20 text-blue-700 border-blue-500/30'
    },
    {
      stepNumber: '03',
      title: 'Güvenli Ödeme & Hızlı Teslimat',
      description: '3D Secure ile güvenle satın al. Dijital ürünler anında hesabında, fiziksel kitaplar aynı gün kargoda!',
      icon: GraduationCap,
      highlight: 'Hızlı Kargo',
      color: 'from-purple-500/20 to-pink-500/20 text-purple-700 border-purple-500/30'
    }
  ];

  const teacherSteps = [
    {
      stepNumber: '01',
      title: 'Yayınevi Başvurusu Yap',
      description: 'Yayınevi veya dağıtıcı şirket bilgilerinizi girerek saniyeler içinde kurumsal yayıncı paneline kaydolun.',
      icon: FileCheck,
      highlight: 'Hızlı Başvuru',
      color: 'from-emerald-500/20 to-teal-500/20 text-emerald-700 border-emerald-500/30'
    },
    {
      stepNumber: '02',
      title: 'Kitap & Deneme Sınavlarını Listele',
      description: 'Yeni soru bankalarını, deneme sınav setlerini ve dijital PDF içeriklerini stok ve fiyatlarıyla pazaryerine ekleyin.',
      icon: UserCheck,
      highlight: 'Geniş Kitle',
      color: 'from-blue-500/20 to-cyan-500/20 text-blue-700 border-blue-500/30'
    },
    {
      stepNumber: '03',
      title: 'Satış Yap, Kazancını Güvenle Al',
      description: 'Gelen siparişleri panelinizden yönetin, teslimat sonrası hakedişlerinizi ertesi iş günü banka hesabınıza alın.',
      icon: CreditCard,
      highlight: 'Garantili Tahsilat',
      color: 'from-purple-500/20 to-pink-500/20 text-purple-700 border-purple-500/30'
    }
  ];

  const steps = activeTab === 'student' ? studentSteps : teacherSteps;

  return (
    <section id="how-it-works" className="py-12 sm:py-16 select-none">
      <div className="rounded-3xl bg-[#FAF8F5] border border-[#E7E2D9] p-6 sm:p-10 lg:p-12 shadow-xl relative overflow-hidden">
        
        {/* Header & Role Switcher */}
        <div className="text-center space-y-3 max-w-2xl mx-auto mb-10">
          <span className="px-3.5 py-1 rounded-full bg-emerald-100 border border-emerald-200 text-emerald-800 text-xs font-bold uppercase tracking-wider inline-flex items-center gap-1.5 shadow-sm">
            <Sparkles className="w-4 h-4" /> Kolay ve Şeffaf Süreç
          </span>

          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-black text-[#1C1917] tracking-tight">
            3 Kolay Adımda Başla
          </h2>

          <p className="text-xs sm:text-sm text-[#57534E] leading-relaxed font-medium">
            Özel Ders Borsası Pazaryeri, kitap arayan öğrenciler ve ürünlerini listeleyen yayınevleri için en hızlı deneyimi sunar.
          </p>

          {/* Interactive Role Switcher Pills */}
          <div className="inline-flex p-1.5 rounded-2xl bg-white border border-[#DDD7CD] shadow-sm mt-4">
            <button
              onClick={() => setActiveTab('student')}
              className={`px-5 py-2.5 rounded-xl text-xs font-extrabold transition-all ${
                activeTab === 'student'
                  ? 'bg-emerald-600 text-white shadow-md shadow-emerald-600/20'
                  : 'text-[#57534E] hover:text-[#1C1917]'
              }`}
            >
              📚 Öğrenci & Veli İçin (Alışveriş & Kupon)
            </button>

            <button
              onClick={() => setActiveTab('teacher')}
              className={`px-5 py-2.5 rounded-xl text-xs font-extrabold transition-all ${
                activeTab === 'teacher'
                  ? 'bg-emerald-600 text-white shadow-md shadow-emerald-600/20'
                  : 'text-[#57534E] hover:text-[#1C1917]'
              }`}
            >
              🏬 Yayınevleri İçin (Satış Masası)
            </button>
          </div>
        </div>

        {/* 3-Step Visual Grid with Connection Line */}
        <div className="relative grid grid-cols-1 md:grid-cols-3 gap-6 lg:gap-8">
          
          {/* Subtle Desktop Connector Line */}
          <div className="hidden md:block absolute top-1/2 left-1/6 right-1/6 h-0.5 bg-gradient-to-r from-emerald-400/40 via-teal-400/40 to-purple-400/40 -translate-y-12 z-0" />

          {steps.map((st, idx) => {
            const Icon = st.icon;
            return (
              <div
                key={idx}
                className="p-6 sm:p-7 rounded-3xl bg-white border border-[#E7E2D9] hover:border-emerald-500/50 shadow-md hover:shadow-xl transition-all duration-300 relative z-10 flex flex-col justify-between group"
              >
                <div>
                  {/* Top Bar: Number Pill & Highlight Badge */}
                  <div className="flex items-center justify-between mb-5">
                    <span className="text-3xl font-black text-emerald-600/20 font-mono group-hover:text-emerald-600 transition-colors">
                      {st.stepNumber}
                    </span>

                    <span className="text-[11px] font-bold px-3 py-1 bg-[#F5F2EC] text-[#57534E] rounded-full border border-[#E7E2D9]">
                      {st.highlight}
                    </span>
                  </div>

                  {/* Step Icon */}
                  <div className={`w-14 h-14 rounded-2xl bg-gradient-to-br border flex items-center justify-center mb-5 transition-transform group-hover:scale-105 shadow-sm ${st.color}`}>
                    <Icon className="w-7 h-7" />
                  </div>

                  {/* Title */}
                  <h3 className="text-base sm:text-lg font-black text-[#1C1917] tracking-tight mb-2 group-hover:text-emerald-700 transition-colors">
                    {st.title}
                  </h3>

                  {/* Description */}
                  <p className="text-xs sm:text-sm text-[#57534E] leading-relaxed font-medium">
                    {st.description}
                  </p>
                </div>

                {/* Card Step Footer */}
                <div className="mt-6 pt-4 border-t border-[#F5F2EC] flex items-center justify-between text-xs font-bold text-emerald-700">
                  <div className="flex items-center gap-1.5">
                    <CheckCircle2 className="w-4 h-4 text-emerald-600" />
                    <span>Adım {idx + 1} / 3</span>
                  </div>

                  <span className="text-[#78716C] group-hover:text-emerald-700 transition-colors">
                    {idx === 2 ? 'Tamamlandı 🎯' : 'İlerle →'}
                  </span>
                </div>
              </div>
            );
          })}
        </div>

        {/* Dynamic Action Trigger at the bottom */}
        <div className="mt-10 pt-6 border-t border-[#E7E2D9] text-center">
          {activeTab === 'student' ? (
            <div className="inline-flex flex-col sm:flex-row items-center gap-3">
              <button
                onClick={() => {
                  const el = document.getElementById('showcase');
                  if (el) el.scrollIntoView({ behavior: 'smooth' });
                }}
                className="px-7 py-3.5 rounded-2xl bg-emerald-600 hover:bg-emerald-700 text-white font-extrabold text-xs sm:text-sm shadow-xl shadow-emerald-700/25 transition-all flex items-center gap-2"
              >
                <span>📚 Kitap & Denemeleri İncele</span>
                <ArrowRight className="w-4 h-4" />
              </button>

              <span className="text-xs text-[#78716C] font-semibold">
                Tüm ürünlerde yayınevi orijinallik garantisi.
              </span>
            </div>
          ) : (
            <div className="inline-flex flex-col sm:flex-row items-center gap-3">
              <button
                onClick={() => {
                  if (onOpenCreateProfile) onOpenCreateProfile();
                }}
                className="px-7 py-3.5 rounded-2xl bg-[#1C1917] hover:bg-black text-white font-extrabold text-xs sm:text-sm shadow-xl transition-all flex items-center gap-2"
              >
                <span>🏬 Yayınevi Olarak Başvur & Satışa Başla</span>
                <ArrowRight className="w-4 h-4" />
              </button>

              <span className="text-xs text-[#78716C] font-semibold">
                Yayınevi mağazası açmak ve listeleme yapmak ücretsizdir.
              </span>
            </div>
          )}
        </div>

      </div>
    </section>
  );
}
