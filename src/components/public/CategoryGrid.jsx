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
      id: 'Matematik & Geometri',
      title: 'Matematik & Geometri',
      desc: 'TYT, AYT, LGS & Üniversite Düzeyi',
      tutorCount: '340+ Eğitmen',
      priceRange: '₺450 - ₺1200 / sa',
      icon: Calculator,
      color: 'bg-emerald-500/10 text-emerald-700 border-emerald-500/20'
    },
    {
      id: 'Yabancı Dil & İngilizce',
      title: 'İngilizce & Yabancı Dil',
      desc: 'IELTS, TOEFL, Konuşma & Almanca',
      tutorCount: '210+ Eğitmen',
      priceRange: '₺400 - ₺950 / sa',
      icon: Languages,
      color: 'bg-blue-500/10 text-blue-700 border-blue-500/20'
    },
    {
      id: 'Fizik, Kimya & Biyoloji',
      title: 'Fen Bilimleri (Fizik & Kimya)',
      desc: 'YKS Sayısal & Okula Destek',
      tutorCount: '180+ Eğitmen',
      priceRange: '₺500 - ₺1100 / sa',
      icon: Atom,
      color: 'bg-purple-500/10 text-purple-700 border-purple-500/20'
    },
    {
      id: 'Yazılım & Kodlama',
      title: 'Yazılım & Yapay Zeka',
      desc: 'Python, JavaScript, Robotik & Algoritma',
      tutorCount: '95+ Eğitmen',
      priceRange: '₺600 - ₺1500 / sa',
      icon: Code2,
      color: 'bg-amber-500/10 text-amber-700 border-amber-500/20'
    },
    {
      id: 'LGS & İlköğretim',
      title: 'LGS & İlköğretim Destek',
      desc: 'Yeni Nesil Soru Çözümü & Koçluk',
      tutorCount: '160+ Eğitmen',
      priceRange: '₺350 - ₺800 / sa',
      icon: BookOpen,
      color: 'bg-rose-500/10 text-rose-700 border-rose-500/20'
    },
    {
      id: 'Müzik & Sanat',
      title: 'Müzik & Piyano / Gitar',
      desc: 'Birebir Enstrüman & Şan Eğitimi',
      tutorCount: '70+ Eğitmen',
      priceRange: '₺400 - ₺900 / sa',
      icon: Music,
      color: 'bg-teal-500/10 text-teal-700 border-teal-500/20'
    }
  ];

  const handleCategoryClick = (catId) => {
    if (onSelectCategory) onSelectCategory(catId);
    const target = document.getElementById('showcase');
    if (target) {
      target.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <section className="py-8 select-none">
      <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 mb-6">
        <div>
          <div className="flex items-center gap-2 text-xs font-extrabold uppercase tracking-widest text-emerald-700 mb-1">
            <Sparkles className="w-4 h-4" /> Popüler Kategoriler
          </div>
          <h2 className="text-2xl sm:text-3xl font-black text-[#1C1917] tracking-tight">
            Hangi Alanda Gelişmek İstiyorsun?
          </h2>
        </div>

        <p className="text-xs text-[#78716C] max-w-sm">
          İlgi duyduğun branşı seç, uzman eğitmenlerin profillerini, referanslarını ve canlı ders müsaitliklerini incele.
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
                    {cat.tutorCount}
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
                  Eğitmenleri Gör <ArrowRight className="w-3.5 h-3.5" />
                </span>
              </div>
            </div>
          );
        })}
      </div>
    </section>
  );
}
