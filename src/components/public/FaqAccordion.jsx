import React, { useState } from 'react';
import { ChevronDown, HelpCircle, Sparkles, Plus, Minus } from 'lucide-react';

/**
 * FAQ (FaqAccordion): Interactive collapsible accordion for frequently asked questions.
 * Smooth expand/collapse animations, accessible button toggles, and clear answers.
 */
export default function FaqAccordion() {
  const [openIndex, setOpenIndex] = useState(0); // First item open by default

  const faqData = [
    {
      id: 'faq_1',
      question: 'Özel ders talebi oluşturmak veya eğitmenlerle görüşmek ücretli mi?',
      answer: 'Hayır, kesinlikle tamamen ücretsizdir! Öğrenci ve velilerden talep oluşturma, gelen eğitmen tekliflerini inceleme veya ön mesajlaşma aşamasında hiçbir komisyon ya da ek hizmet bedeli alınmaz.'
    },
    {
      id: 'faq_2',
      question: 'Eğitmenlerin üniversite diplomaları ve yetkinlikleri nasıl doğrulanıyor?',
      answer: 'Platformumuza başvuran her öğretmen; e-Devlet mezuniyet belgesi, adli sicil kaydı ve kimlik doğrulaması aşamalarından geçer. Belgeleri onaylanan eğitmenler resmi "Mavi Tik (Doğrulanmış)" rozetine sahip olur.'
    },
    {
      id: 'faq_3',
      question: 'Havuz Güvenli Ödeme (Escrow) sistemi nasıl çalışır?',
      answer: 'Ders rezervasyonu yaptığınızda ödemeniz doğrudan eğitmene değil, Özel Ders Borsası emanet havuz hesabına aktarılır. Seans tamamlanıp siz memnun kaldığınızı onaylayana kadar ücret güvende tutulur.'
    },
    {
      id: 'faq_4',
      question: 'Ders seansından memnun kalmazsam veya iptal etmek istersem ne olur?',
      answer: 'Ders başlamadan 24 saat öncesine kadar koşulsuz tek tıkla iptal hakkınız vardır. Ayrıca ilk dersten teknik veya metodolojik nedenlerle memnun kalmamanız durumunda %100 seans telafisi veya tam para iadesi sağlanır.'
    },
    {
      id: 'faq_5',
      question: 'Online canlı derslerde hangi teknolojik araçlar kullanılıyor?',
      answer: 'Platformumuzun yerleşik interaktif Sanal Sınıfı; çift yönlü beyaz tahta, ekran paylaşımı, PDF soru çözümü ve ders kayıt özelliklerine sahiptir. Ekstra program indirmeden doğrudan tarayıcıdan bağlanabilirsiniz.'
    }
  ];

  const handleToggle = (index) => {
    setOpenIndex(openIndex === index ? -1 : index);
  };

  return (
    <section id="faq" className="py-12 sm:py-16 select-none">
      <div className="max-w-3xl mx-auto space-y-6">
        {/* Section Header */}
        <div className="text-center space-y-3">
          <span className="px-3.5 py-1 rounded-full bg-blue-50 border border-blue-200 text-blue-800 text-xs font-bold uppercase tracking-wider inline-flex items-center gap-1.5 shadow-sm">
            <HelpCircle className="w-4 h-4" /> Merak Edilenler
          </span>

          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-black text-[#1C1917] tracking-tight">
            Sıkça Sorulan Sorular
          </h2>

          <p className="text-xs sm:text-sm text-[#57534E] leading-relaxed max-w-lg mx-auto font-medium">
            Özel ders süreci, güvenli ödeme havuzu ve eğitmen akreditasyonu hakkında aklınıza takılan tüm sorular.
          </p>
        </div>

        {/* Accordion List */}
        <div className="space-y-3 mt-8">
          {faqData.map((faq, idx) => {
            const isOpen = openIndex === idx;

            return (
              <div
                key={faq.id}
                className={`rounded-2xl border transition-all duration-200 overflow-hidden ${
                  isOpen 
                    ? 'bg-white border-emerald-500/50 shadow-md ring-1 ring-emerald-500/20' 
                    : 'bg-white/80 hover:bg-white border-[#E7E2D9] shadow-sm'
                }`}
              >
                {/* Accordion Trigger */}
                <button
                  type="button"
                  onClick={() => handleToggle(idx)}
                  aria-expanded={isOpen}
                  className="w-full p-5 sm:p-6 text-left flex items-center justify-between gap-4 font-bold text-sm sm:text-base text-[#1C1917] hover:text-emerald-700 transition-colors"
                >
                  <span className="leading-snug">{faq.question}</span>
                  
                  <div className={`w-8 h-8 rounded-xl border flex items-center justify-center shrink-0 transition-all ${
                    isOpen 
                      ? 'bg-emerald-600 text-white border-emerald-600' 
                      : 'bg-[#FAF8F5] text-[#78716C] border-[#DDD7CD]'
                  }`}>
                    <ChevronDown className={`w-4 h-4 transition-transform duration-300 ${isOpen ? 'rotate-180' : ''}`} />
                  </div>
                </button>

                {/* Accordion Content */}
                {isOpen && (
                  <div className="px-5 sm:px-6 pb-5 sm:pb-6 text-xs sm:text-sm text-[#57534E] leading-relaxed border-t border-[#F5F2EC] pt-4 font-medium animate-in fade-in duration-200">
                    {faq.answer}
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
