import React from 'react';
import { 
  GraduationCap, 
  ShieldCheck, 
  Star, 
  Clock, 
  Users, 
  CreditCard, 
  Award,
  Sparkles
} from 'lucide-react';

/**
 * SocialProof (MetricsBar): Clean, horizontal 4-item trust and metrics bar.
 * Highlights user volume, verified tutor count, 5-star rating stats, and instant response times.
 */
export default function MetricsBar() {
  const metrics = [
    {
      id: 'sessions',
      value: '12,500+',
      label: 'Tamamlanan Canlı Ders',
      subText: '%99.4 Seans Başarı & Memnuniyet',
      icon: GraduationCap,
      badge: 'Canlı Ders',
      color: 'bg-emerald-50 text-emerald-700 border-emerald-200'
    },
    {
      id: 'tutors',
      value: '850+',
      label: 'Onaylı & Akredite Eğitmen',
      subText: 'Boğaziçi, ODTÜ, İTÜ, Bilkent Kadrosu',
      icon: ShieldCheck,
      badge: 'Doğrulanmış',
      color: 'bg-teal-50 text-teal-700 border-teal-200'
    },
    {
      id: 'rating',
      value: '4.92 / 5',
      label: 'Veli & Öğrenci Memnuniyeti',
      subText: '4,200+ Doğrulanmış Gerçek Yorum',
      icon: Star,
      badge: '5 Yıldız',
      color: 'bg-amber-50 text-amber-700 border-amber-200'
    },
    {
      id: 'speed',
      value: '15 Dakika',
      label: 'Ortalama İlk Teklif Süresi',
      subText: 'Hızlı ve Hedefe Yönelik Teklif Akışı',
      icon: Clock,
      badge: 'Hızlı Yanıt',
      color: 'bg-blue-50 text-blue-700 border-blue-200'
    }
  ];

  return (
    <section className="py-4 sm:py-6 select-none">
      <div className="rounded-3xl bg-white border border-[#E7E2D9] shadow-xl p-6 sm:p-8 relative overflow-hidden">
        {/* Subtle decorative accent */}
        <div className="absolute top-0 right-0 w-48 h-48 bg-gradient-to-bl from-emerald-500/5 to-transparent rounded-full pointer-events-none" />

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 divide-y sm:divide-y-0 sm:divide-x divide-[#E7E2D9]">
          {metrics.map((m, idx) => {
            const Icon = m.icon;
            return (
              <div 
                key={m.id} 
                className={`flex items-start gap-4 transition-transform hover:translate-y-[-2px] ${
                  idx !== 0 ? 'sm:pl-6 pt-5 sm:pt-0' : ''
                }`}
              >
                {/* Metric Icon Box */}
                <div className={`w-12 h-12 rounded-2xl border flex items-center justify-center shrink-0 shadow-sm ${m.color}`}>
                  <Icon className="w-6 h-6" />
                </div>

                {/* Metric Details */}
                <div className="min-w-0 flex-1">
                  <div className="flex items-center gap-2">
                    <span className="text-2xl sm:text-3xl font-black text-[#1C1917] tracking-tight font-sans">
                      {m.value}
                    </span>
                  </div>
                  
                  <h4 className="text-xs font-bold text-[#292524] mt-0.5 leading-snug">
                    {m.label}
                  </h4>
                  
                  <p className="text-[11px] text-[#78716C] font-medium mt-0.5 truncate">
                    {m.subText}
                  </p>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
