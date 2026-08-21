import React from 'react';
import { 
  Calculator, 
  BookOpen, 
  Languages, 
  Code2, 
  Atom, 
  Music, 
  BrainCircuit, 
  ArrowRight,
  Sparkles
} from 'lucide-react';

export default function CategoryGrid({ onSelectCategory }) {
  const categories = [
    {
      id: 'YKS Soru Bankaları',
      title: 'YKS (TYT / AYT) Soru Bankaları',
      desc: 'Matematik, Fizik, Türkçe ve Fen Soru Bankası Setleri',
      itemCount: '150+ Kitap Seti',
      priceRange: '₺80 - ₺450',
      icon: BookOpen,
      color: 'bg-emerald-500/10 text-emerald-700 border-emerald-500/20'
    },
    {
      id: 'LGS Denemeleri',
      title: 'LGS Branş & Genel Denemeler',
      desc: 'Yeni Nesil Beceri Temelli Sorular & Video Çözümlü',
      itemCount: '90+ Deneme Paketi',
      priceRange: '₺120 - ₺380',
      icon: Calculator,
      color: 'bg-blue-500/10 text-blue-700 border-blue-500/20'
    },
    {
      id: 'Dijital Soru Bankası',
      title: 'Dijital Soru Bankası & PDF Arşivi',
      desc: 'Akıllı Tahta Uyumlu & Anında İndirilebilir İçerikler',
      itemCount: '75+ Dijital Ürün',
      priceRange: '₺50 - ₺250',
      icon: Code2,
      color: 'bg-purple-500/10 text-purple-700 border-purple-500/20'
    },
    {
      id: 'KPSS & ALES Kitapları',
      title: 'KPSS, ALES & DGS Hazırlık',
      desc: 'Genel Yetenek - Genel Kültür Çıkmış Soru Fasikülleri',
      itemCount: '60+ Kaynak',
      priceRange: '₺95 - ₺400',
      icon: Atom,
      color: 'bg-amber-500/10 text-amber-700 border-amber-500/20'
    },
    {
      id: 'Yayınevi Kuponları',
      title: 'Yayınevi İndirim Kuponları',
      desc: 'Trendyol, Kitapyurdu, D&R & Borsa Yayınları Kuponları',
      itemCount: '4 Aktif Kupon',
      priceRange: '%25 - %50 İndirim',
      icon: Sparkles,
      color: 'bg-rose-500/10 text-rose-700 border-rose-500/20'
    },
    {
      id: 'Yabancı Dil & Kelime',
      title: 'YDS & İngilizce Hazırlık Kitapları',
      desc: 'Reading, Vocabulary & Grammar Özel Denemeleri',
      itemCount: '45+ Materyal',
      priceRange: '₺110 - ₺350',
      icon: Languages,
      color: 'bg-teal-500/10 text-teal-700 border-teal-500/20'
    }
  ];

  const handleCategoryClick = (catId) => {
    if (catId === 'Yayınevi Kuponları') {
      const target = document.getElementById('coupons');
      if (target) target.scrollIntoView({ behavior: 'smooth' });
    } else {
      const target = document.getElementById('showcase');
      if (target) target.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <section className="py-8 select-none">
      <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 mb-6">
        <div>
          <div className="flex items-center gap-2 text-xs font-extrabold uppercase tracking-widest text-emerald-700 mb-1">
            <Sparkles className="w-4 h-4" /> Yayınevi & Yayın Kategorileri
          </div>
          <h2 className="text-2xl sm:text-3xl font-black text-[#1C1917] tracking-tight">
            İhtiyacın Olan Sınav Kaynakları & Kuponlar
          </h2>
        </div>

        <p className="text-xs text-[#78716C] max-w-sm">
          Sınavına ve alanına en uygun yayınevi kaynaklarını sepete ekle, anında indirim kuponlarını kullan.
        </p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {categories.map((cat) => {
          const Icon = cat.icon;
          return (
            <div
              key={cat.id}
              onClick={() => handleCategoryClick(cat.id)}
              className="p-5 rounded-3xl bg-white border border-[#E7E2D9] hover:border-emerald-500/60 transition-all cursor-pointer group hover:shadow-xl relative overflow-hidden flex flex-col justify-between"
            >
              <div>
                <div className="flex items-center justify-between mb-4">
                  <div className={`p-3 rounded-2xl border ${cat.color}`}>
                    <Icon className="w-6 h-6" />
                  </div>
                  <span className="text-[11px] font-bold text-[#78716C] bg-[#F5F2EC] px-2.5 py-1 rounded-full">
                    {cat.itemCount}
                  </span>
                </div>

                <h3 className="text-base font-black text-[#1C1917] group-hover:text-emerald-700 transition-colors">
                  {cat.title}
                </h3>
                <p className="text-xs text-[#57534E] mt-1 font-medium">
                  {cat.desc}
                </p>
              </div>

              <div className="mt-5 pt-3 border-t border-[#F5F2EC] flex items-center justify-between text-xs font-bold">
                <span className="text-emerald-700">{cat.priceRange}</span>
                <span className="text-[#78716C] group-hover:text-emerald-700 flex items-center gap-1 transition-transform group-hover:translate-x-1">
                  Ürünleri İncele <ArrowRight className="w-3.5 h-3.5" />
                </span>
              </div>
            </div>
          );
        })}
      </div>
    </section>
  );
}
