import React from 'react';
import { Star, Quote, CheckCircle2, Award, Heart, MessageSquare } from 'lucide-react';

/**
 * Testimonials: Realistic verified user reviews and feedback cards.
 * Displays student/parent avatars, roles, ratings, subjects, and success stories.
 */
export default function Testimonials() {
  const reviews = [
    {
      id: 'rev_1',
      name: 'Hatice Yılmaz',
      role: 'YKS 12. Sınıf Öğrenci Velisi (İstanbul)',
      avatar: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=120&auto=format&fit=crop&q=80',
      comment: 'Oğlum için Boğaziçi mezunu bir matematik öğretmeni arıyorduk. Talebi açtıktan 20 dakika sonra 3 harika hocadan teklif aldık. AYT netleri 18’den 36’ya çıktı, kesinlikle tavsiye ediyorum!',
      subject: 'AYT Matematik & Geometri',
      rating: 5,
      verifiedLessonCount: '16 Seans Tamamlandı',
      date: '1 hafta önce'
    },
    {
      id: 'rev_2',
      name: 'Emre Karaca',
      role: 'Tıp Fakültesi 1. Sınıf Öğrencisi (Ankara)',
      avatar: 'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=120&auto=format&fit=crop&q=80',
      comment: 'Fizik ve Kimya derslerinde çok zorlanıyordum. Havuz ödeme sistemi sayesinde içim çok rahattı. Hem sanal sınıftaki beyaz tahta hem de hocanın soru çözüm tekniği muazzamdı.',
      subject: 'YKS Fizik & Organik Kimya',
      rating: 5,
      verifiedLessonCount: '24 Seans Tamamlandı',
      date: '2 hafta önce'
    },
    {
      id: 'rev_3',
      name: 'Berrin Akın',
      role: 'LGS Öğrenci Velisi (İzmir)',
      avatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=120&auto=format&fit=crop&q=80',
      comment: 'Kızım LGS sürecinde motivasyonunu kaybetmişti. Buradan bulduğumuz koçluk destekli eğitmen sayesinde hem çalışma disiplini kazandı hem de hedeflediği fen lisesine yerleşti.',
      subject: 'LGS Yeni Nesil Matematik',
      rating: 5,
      verifiedLessonCount: '12 Seans Tamamlandı',
      date: '3 hafta önce'
    }
  ];

  return (
    <section className="py-12 sm:py-16 select-none">
      {/* Header */}
      <div className="text-center space-y-3 max-w-2xl mx-auto mb-12">
        <span className="px-3.5 py-1 rounded-full bg-amber-100 border border-amber-200 text-amber-900 text-xs font-bold uppercase tracking-wider inline-flex items-center gap-1.5 shadow-sm">
          <Star className="w-3.5 h-3.5 fill-amber-600 text-amber-600" /> Gerçek Kullanıcı Deneyimleri
        </span>

        <h2 className="text-3xl sm:text-4xl lg:text-5xl font-black text-[#1C1917] tracking-tight">
          Binlerce Veli ve Öğrencinin Güveniyle
        </h2>

        <p className="text-xs sm:text-sm text-[#57534E] leading-relaxed max-w-xl mx-auto font-medium">
          Platformumuzda tamamlanan 12,500+ canlı özel ders seansının ardından bırakılan doğrulanmış değerlendirmeler.
        </p>
      </div>

      {/* 3-Card Testimonials Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {reviews.map((rev) => (
          <div
            key={rev.id}
            className="p-7 rounded-3xl bg-white border border-[#E7E2D9] shadow-md hover:shadow-2xl transition-all duration-300 flex flex-col justify-between relative group"
          >
            <div>
              {/* Rating & Verified Badge */}
              <div className="flex items-center justify-between mb-4">
                <div className="flex items-center gap-1 text-amber-500">
                  {Array.from({ length: rev.rating }).map((_, i) => (
                    <Star key={i} className="w-4 h-4 fill-amber-400 text-amber-400" />
                  ))}
                  <span className="text-xs font-extrabold text-[#1C1917] ml-1.5">5.0</span>
                </div>

                <span className="text-[10px] font-bold text-emerald-700 bg-emerald-50 px-2.5 py-0.5 rounded-full border border-emerald-100 flex items-center gap-1">
                  <CheckCircle2 className="w-3 h-3 text-emerald-600" /> Doğrulanmış Seans
                </span>
              </div>

              {/* Quote Icon & Text */}
              <div className="relative mb-6">
                <Quote className="w-8 h-8 text-emerald-600/10 absolute -top-2 -left-2 -z-0" />
                <p className="text-xs sm:text-sm text-[#44403C] leading-relaxed italic relative z-10 font-medium">
                  "{rev.comment}"
                </p>
              </div>
            </div>

            {/* User Profile Footer */}
            <div className="pt-4 border-t border-[#F5F2EC] flex items-center justify-between gap-3">
              <div className="flex items-center gap-3 min-w-0">
                <img
                  src={rev.avatar}
                  alt={rev.name}
                  className="w-11 h-11 rounded-2xl object-cover ring-2 ring-emerald-500/20 shrink-0"
                />
                <div className="min-w-0">
                  <h4 className="text-xs sm:text-sm font-black text-[#1C1917] truncate">{rev.name}</h4>
                  <p className="text-[11px] text-[#78716C] truncate">{rev.role}</p>
                  <span className="text-[10px] font-bold text-emerald-700 block truncate">{rev.subject}</span>
                </div>
              </div>

              <span className="text-[10px] text-[#A8A29E] font-mono shrink-0">
                {rev.date}
              </span>
            </div>
          </div>
        ))}
      </div>

      {/* Trust Quote Footer Bar */}
      <div className="mt-8 p-4 rounded-2xl bg-white border border-[#E7E2D9] max-w-2xl mx-auto text-center flex items-center justify-center gap-2 text-xs text-[#57534E] font-semibold shadow-sm">
        <Award className="w-4 h-4 text-emerald-600" />
        <span>Platformumuzda yalnızca dersi tamamlayıp ödeme yapan doğrulanmış veli ve öğrenciler yorum bırakabilir.</span>
      </div>
    </section>
  );
}
