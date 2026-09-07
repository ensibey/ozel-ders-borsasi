import React from 'react';
import { 
  Lock, 
  Percent, 
  BadgeCheck, 
  Sparkles, 
  Video, 
  RotateCcw, 
  CheckCircle2, 
  ShieldCheck, 
  ArrowRight
} from 'lucide-react';

/**
 * Features: Modern 6-card grid highlighting platform value propositions,
 * security guarantees, AI matcher, zero commission, and virtual classroom.
 */
export default function Features({ onOpenRequestWizard }) {
  const featureList = [
    {
      id: 'publishers',
      title: 'Onaylı Yayınevleri & Orijinal Baskı',
      description: 'Platformumuzda satışa sunulan tüm kitaplar, soru bankaları ve deneme setleri doğrudan resmi yayınevlerinden ve lisanslı dağıtıcılardan temin edilir.',
      icon: BadgeCheck,
      badge: 'Orijinal Ürün',
      color: 'bg-emerald-500/10 text-emerald-700 border-emerald-500/20 group-hover:bg-emerald-600 group-hover:text-white'
    },
    {
      id: 'coupons',
      title: 'KuponBurada İndirim Kodları & Fırsatlar',
      description: 'Yayınevleri ve popüler e-ticaret mağazalarında geçerli indirim kuponlarını tek tıkla kopyalayın, alışverişlerinizde anında %25-%50 tasarruf edin.',
      icon: Sparkles,
      badge: 'Anında İndirim',
      color: 'bg-blue-500/10 text-blue-700 border-blue-500/20 group-hover:bg-blue-600 group-hover:text-white'
    },
    {
      id: 'vendor_portal',
      title: 'Yayınevleri & Firmalar İçin Satış Masası',
      description: 'Yayınevleri kendi panelleri üzerinden ürün stoklarını yönetebilir, yeni deneme ve kitap setleri ekleyebilir ve satış istatistiklerini takip edebilir.',
      icon: Percent,
      badge: 'Yayıncı Portalı',
      color: 'bg-purple-500/10 text-purple-700 border-purple-500/20 group-hover:bg-purple-600 group-hover:text-white'
    },
    {
      id: 'escrow',
      title: 'Güvenli Alışveriş & 3D Secure Koruması',
      description: 'Tüm ödemeler SSL ve 3D Secure korumalı altyapı üzerinden gerçekleşir. Siparişiniz size ulaşana kadar paranız platform güvencesinde tutulur.',
      icon: Lock,
      badge: 'Güvenli Ödeme',
      color: 'bg-amber-500/10 text-amber-700 border-amber-500/20 group-hover:bg-amber-600 group-hover:text-white'
    },
    {
      id: 'instant_digital',
      title: 'Hızlı Kargo & Anında Dijital PDF İndirme',
      description: 'Fiziksel kitaplar anlaşmalı kargo ile aynı gün yola çıkar; dijital deneme ve soru bankası PDF’leri ise satın alma sonrası anında kütüphanenize tanımlanır.',
      icon: Video,
      badge: 'Hızlı Teslimat',
      color: 'bg-teal-500/10 text-teal-700 border-teal-500/20 group-hover:bg-teal-600 group-hover:text-white'
    },
    {
      id: 'guarantee',
      title: '%100 İade ve Değişim Garantisi',
      description: 'Hasarlı veya eksik teslim edilen ürünlerde koşulsuz değişim veya iade hakkınız bulunur. Destek ekibimiz 7/24 yanınızda.',
      icon: RotateCcw,
      badge: 'Müşteri Memnuniyeti',
      color: 'bg-rose-500/10 text-rose-700 border-rose-500/20 group-hover:bg-rose-600 group-hover:text-white'
    }
  ];

  return (
    <section id="features" className="py-12 sm:py-16 select-none">
      {/* Section Header */}
      <div className="text-center space-y-3 max-w-3xl mx-auto mb-12">
        <span className="px-3.5 py-1 rounded-full bg-emerald-100 border border-emerald-200 text-emerald-800 text-xs font-bold tracking-wider uppercase inline-flex items-center gap-1.5 shadow-sm">
          <ShieldCheck className="w-4 h-4" /> Neden Özel Ders Borsası Pazarı?
        </span>
        
        <h2 className="text-3xl sm:text-4xl lg:text-5xl font-black text-[#1C1917] tracking-tight">
          Güvenli, Şeffaf ve İndirimli Yayınevi Pazaryeri
        </h2>
        
        <p className="text-xs sm:text-sm text-[#57534E] leading-relaxed max-w-2xl mx-auto font-medium">
          Doğrudan yayınevlerinden orijinal kitaplar, soru bankaları, sınav deneme setleri ve mağazalarda geçerli en güncel fırsat kuponları tek çatı altında.
        </p>
      </div>

      {/* 6-Card Modern Responsive Grid (1 col mobile, 2 col tablet, 3 col desktop) */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {featureList.map((feat) => {
          const Icon = feat.icon;
          return (
            <div
              key={feat.id}
              className="p-7 rounded-3xl bg-white border border-[#E7E2D9] hover:border-emerald-500/40 hover:shadow-2xl transition-all duration-300 relative overflow-hidden flex flex-col justify-between group"
            >
              <div>
                {/* Top Row: Icon Container & Badge */}
                <div className="flex items-center justify-between mb-5">
                  <div className={`w-12 h-12 rounded-2xl border flex items-center justify-center transition-all duration-300 shadow-sm ${feat.color}`}>
                    <Icon className="w-6 h-6 transition-transform group-hover:scale-110" />
                  </div>
                  
                  <span className="text-[11px] font-bold px-3 py-1 bg-[#F5F2EC] text-[#57534E] rounded-full border border-[#E7E2D9] group-hover:border-emerald-200 group-hover:bg-emerald-50 group-hover:text-emerald-800 transition-colors">
                    {feat.badge}
                  </span>
                </div>

                {/* Title */}
                <h3 className="text-base font-black text-[#1C1917] tracking-tight mb-2.5 group-hover:text-emerald-700 transition-colors">
                  {feat.title}
                </h3>

                {/* 2-Sentence Description */}
                <p className="text-xs sm:text-sm text-[#57534E] leading-relaxed font-medium">
                  {feat.description}
                </p>
              </div>

              {/* Card Footer Guarantee Indicator */}
              <div className="mt-6 pt-4 border-t border-[#F5F2EC] flex items-center justify-between text-xs font-bold text-emerald-700">
                <div className="flex items-center gap-1.5">
                  <CheckCircle2 className="w-4 h-4 text-emerald-600" />
                  <span>Platform Standardı</span>
                </div>
                
                <span className="text-[11px] text-[#78716C] group-hover:text-emerald-700 transition-colors">
                  Detaylar →
                </span>
              </div>
            </div>
          );
        })}
      </div>
    </section>
  );
}
