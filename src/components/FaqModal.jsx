import React, { useState, useEffect } from 'react';
import { X, HelpCircle, ChevronDown, ChevronUp, ShieldCheck, GraduationCap, DollarSign, Video } from 'lucide-react';

export default function FaqModal({ isOpen, onClose }) {
  const [openIdx, setOpenIdx] = useState(0);

  
  useEffect(() => {
    if (!isOpen) return;
    const handleKeyDown = (e) => {
      if (e.key === 'Escape') onClose();
    };
    document.body.style.overflow = 'hidden';
    window.addEventListener('keydown', handleKeyDown);
    return () => {
      document.body.style.overflow = 'unset';
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  const faqs = [
    {
      q: 'Giriş alanında şehir/il seçimi neden zorunlu?',
      a: 'Özel Ders Borsası, hem yüz yüze hem de online özel dersleri lokasyon bazlı eşleştirmektedir. Giriş alanında İl seçimi zorunlu, İlçe seçimi ise isteğe bağlıdır. Seçtiğiniz ile göre yakınınızdaki eğitmenler filtrelenir.'
    },
    {
      q: 'Canlı online dersler nasıl yapılıyor ve kayıt videosu teslim ediliyor mu?',
      a: 'Platformumuzdaki entegre Sanal Canlı Sınıf üzerinden birebir görüntülü ders yapılır. Ders esnasında interaktif beyaz tahta ve ekran paylaşımı kullanılır. Ders bittiğinde kayıt videosu otomatik olarak öğrencinin "Ders Kayıtları Arşivi"ne aktarılır.'
    },
    {
      q: 'Öğretmenler ana sayfada profilini nasıl öne çıkarır ve puan kazanır?',
      a: 'Öğretmenlere görevler verilir: Müsait ders takvimini doldurma ve 3 arkadaşına davet kodu gönderme. Davet koduyla katılan her kullanıcı ve tamamlanan görevler öğretmenize puan kazandırır; puanlar ile profil ana sayfada en üste taşınır.'
    },
    {
      q: 'Satış Alanından alınan kitap ve deneme sınavları ne zaman kargolanır?',
      a: 'Özel anlaşmalı yetkili yayın evlerinden sipariş verilen fiziksel kitap ve deneme setleri aynı gün kargoya verilir ve kargo takip numarası SMS ile iletilir. Dijital denemeler anında hesabınıza tanımlanır.'
    },
    {
      q: 'Veli Girişi Portalı nedir, veliler neleri görebilir?',
      a: 'Özellikle ortaokul ve ilkokul yaş grubundaki öğrencilerin velileri için özel bir takip panelidir. Veliler öğrencinin ders devam oranını, eğitmenlerin ders değerlendirme raporlarını ve gelecek seans saatlerini izleyebilir.'
    }
  ];

  return (
    <div onClick={onClose} className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/85 backdrop-blur-md animate-fadeIn">
      <div onClick={(e) => e.stopPropagation()} className="glass-panel w-full max-w-2xl rounded-3xl p-6 sm:p-8 border border-indigo-500/30 shadow-2xl relative space-y-6 max-h-[90vh] overflow-y-auto custom-scrollbar">
        
        <div className="flex items-center justify-between pb-3 border-b border-slate-800">
          <div className="flex items-center space-x-2">
            <HelpCircle className="w-6 h-6 text-indigo-400" />
            <h2 className="text-base font-bold text-white">Sıkça Sorulan Sorular & Yardım Merkezi</h2>
          </div>
          <button onClick={onClose} className="p-1.5 rounded-xl bg-slate-900 text-slate-400 hover:text-white">
            <X className="w-5 h-5" />
          </button>
        </div>

        <div className="space-y-3">
          {faqs.map((faq, i) => (
            <div key={i} className="rounded-2xl border border-slate-800 bg-slate-900/60 overflow-hidden transition-all">
              <button
                onClick={() => setOpenIdx(openIdx === i ? null : i)}
                className="w-full p-4 text-left font-bold text-xs text-white flex items-center justify-between hover:bg-slate-800/50"
              >
                <span className="flex items-center gap-2">
                  <span className="w-5 h-5 rounded-full bg-indigo-600/30 text-indigo-400 text-[11px] flex items-center justify-center font-mono">
                    {i + 1}
                  </span>
                  <span>{faq.q}</span>
                </span>
                {openIdx === i ? <ChevronUp className="w-4 h-4 text-indigo-400" /> : <ChevronDown className="w-4 h-4 text-slate-500" />}
              </button>

              {openIdx === i && (
                <div className="p-4 pt-0 text-xs text-slate-300 leading-relaxed border-t border-slate-800/60 bg-slate-950/40">
                  {faq.a}
                </div>
              )}
            </div>
          ))}
        </div>

      </div>
    </div>
  );
}
