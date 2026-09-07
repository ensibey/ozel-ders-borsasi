import React from 'react';
import { 
  Search, 
  MapPin, 
  Sparkles, 
  Zap, 
  CheckCircle2, 
  GraduationCap, 
  ShieldCheck, 
  ArrowRight, 
  Video, 
  PlayCircle,
  Star,
  ChevronRight
} from 'lucide-react';
import { SUBJECTS } from '../../data/mockData';

/**
 * Hero: High-Converting Hero Section featuring an announcement badge,
 * impactful H1, dual CTAs, and a modern interactive product mockup card.
 */
export default function Hero({
  selectedCity = 'İstanbul',
  selectedDistrict = 'Kadıköy',
  selectedSubject = 'all',
  setSelectedSubject,
  onlineOnlyFilter = false,
  setOnlineOnlyFilter,
  onOpenRequestWizard,
  onOpenCreateProfile,
  tutorCount = 850
}) {
  const handleScrollToDemo = (e) => {
    e.preventDefault();
    const target = document.getElementById('how-it-works');
    if (target) {
      target.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const handleSearchSubmit = (e) => {
    e.preventDefault();
    const showcaseSection = document.getElementById('showcase');
    if (showcaseSection) {
      showcaseSection.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <section className="relative pt-6 sm:pt-10 pb-16 overflow-hidden select-none">
      {/* 1. Subtle Background Ambient Glows */}
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 w-[600px] h-[300px] bg-gradient-to-tr from-emerald-500/10 via-teal-500/5 to-amber-500/10 rounded-full blur-3xl pointer-events-none -z-10" />

      <div className="max-w-5xl mx-auto text-center space-y-7">
        
        {/* 2. Eye-Catching Announcement Badge */}
        <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-white border border-[#DDD7CD] shadow-sm text-xs font-bold text-[#44403C] hover:border-emerald-500/40 transition-all cursor-pointer group">
          <span className="flex h-2 w-2 relative shrink-0">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
            <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500"></span>
          </span>
          <span className="text-emerald-800 font-extrabold whitespace-nowrap">📚 2026 Yayınevi & İndirim Sezonu:</span>
          <span className="text-[#57534E] group-hover:text-[#1C1917] transition-colors whitespace-nowrap">
            Aktif Mağaza Kuponları & Deneme Setleri Yayında
          </span>
          <ChevronRight className="w-3.5 h-3.5 text-[#78716C] group-hover:translate-x-0.5 transition-transform shrink-0" />
        </div>

        {/* 3. Impactful H1 Headline */}
        <h1 className="text-3xl sm:text-5xl lg:text-6xl font-black text-[#1C1917] tracking-tight leading-[1.15]">
          Popüler Yayınevleri, Deneme Setleri & <br className="hidden sm:inline" />
          <span className="bg-gradient-to-r from-emerald-700 via-teal-700 to-emerald-900 bg-clip-text text-transparent">
            Özel İndirim Kuponları
          </span>
        </h1>

        {/* 4. Crystal-Clear 2-Line Value Proposition Subtext */}
        <p className="text-xs sm:text-base lg:text-lg text-[#57534E] max-w-2xl mx-auto font-medium leading-relaxed">
          En seçkin yayınevlerinin dijital soru bankalarını, deneme sınavlarını doğrudan sepetinize ekleyin ve anlaşmalı mağazalarda anında geçerli <strong className="text-[#1C1917]">indirim kodlarını</strong> tek tıkla kopyalayın!
        </p>

        {/* 5. Dual Primary & Secondary Action CTA Buttons */}
        <div className="pt-2 flex flex-col sm:flex-row items-center justify-center gap-3.5">
          <button
            onClick={() => {
              const el = document.getElementById('coupons');
              if (el) el.scrollIntoView({ behavior: 'smooth' });
            }}
            className="w-full sm:w-auto px-7 py-3.5 rounded-2xl bg-emerald-600 hover:bg-emerald-700 text-white font-extrabold text-xs sm:text-sm shadow-xl shadow-emerald-700/25 transition-all flex items-center justify-center gap-2 group hover:scale-[1.02] whitespace-nowrap"
          >
            <Zap className="w-4 h-4 text-emerald-200 fill-emerald-200 shrink-0" />
            <span>🏷️ Fırsat Kuponlarını Gör (%50 İndirim)</span>
            <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1 shrink-0" />
          </button>

          <button
            onClick={() => {
              const el = document.getElementById('showcase');
              if (el) el.scrollIntoView({ behavior: 'smooth' });
            }}
            className="w-full sm:w-auto px-6 py-3.5 rounded-2xl bg-white hover:bg-[#F5F2EC] border border-[#DDD7CD] text-[#292524] font-bold text-xs sm:text-sm transition-all flex items-center justify-center gap-2 shadow-sm whitespace-nowrap hover:border-emerald-600/40"
          >
            <span>📚 Kitap & Deneme Mağazası ↗</span>
          </button>
        </div>

        {/* 6. Modern Interactive Product Preview Card / Dashboard Mockup */}
        <div className="relative mt-12 pt-2">
          {/* Main Mockup Canvas Container */}
          <div className="relative rounded-3xl bg-white border border-[#DDD7CD] shadow-2xl p-4 sm:p-6 overflow-hidden max-w-4xl mx-auto text-left space-y-4 ring-1 ring-black/5">
            
            {/* Top Mockup Header Bar */}
            <div className="flex flex-wrap items-center justify-between gap-3 pb-3 border-b border-[#E7E2D9]">
              <div className="flex items-center gap-2">
                <div className="w-3 h-3 rounded-full bg-rose-400"></div>
                <div className="w-3 h-3 rounded-full bg-amber-400"></div>
                <div className="w-3 h-3 rounded-full bg-emerald-400"></div>
                <span className="ml-2 text-xs font-bold text-[#78716C] font-mono">
                  ozeldersborsasi.com/canli-pazar
                </span>
              </div>

              <div className="flex items-center gap-2 text-xs font-bold text-emerald-700 bg-emerald-50 px-3 py-1 rounded-full border border-emerald-200/80">
                <ShieldCheck className="w-3.5 h-3.5" />
                <span>%100 Havuz Korumalı Güvenli Ödeme</span>
              </div>
            </div>

            {/* Mockup Interactive Search & Matcher Bar */}
            <form onSubmit={handleSearchSubmit} className="grid grid-cols-1 sm:grid-cols-12 gap-2.5 pt-1">
              {/* Subject */}
              <div className="sm:col-span-4 flex items-center bg-[#FAF8F5] border border-[#E7E2D9] rounded-2xl px-3.5 py-2.5">
                <GraduationCap className="w-4 h-4 text-emerald-600 mr-2 shrink-0" />
                <div className="w-full min-w-0">
                  <span className="block text-[9px] font-bold uppercase tracking-wider text-[#78716C]">Ders / Branş</span>
                  <select
                    value={selectedSubject}
                    onChange={(e) => setSelectedSubject && setSelectedSubject(e.target.value)}
                    className="w-full bg-transparent text-xs font-extrabold text-[#1C1917] focus:outline-none cursor-pointer truncate"
                  >
                    <option value="all">Tüm Branşlar ({SUBJECTS?.length || 10}+)</option>
                    {(SUBJECTS || []).map((s, i) => {
                      const subjectName = typeof s === 'string' ? s : s.name || s.id;
                      const subjectVal = typeof s === 'string' ? s : s.name || s.id;
                      return (
                        <option key={i} value={subjectVal}>
                          {subjectName}
                        </option>
                      );
                    })}
                  </select>
                </div>
              </div>

              {/* City / District */}
              <div className="sm:col-span-3 flex items-center bg-[#FAF8F5] border border-[#E7E2D9] rounded-2xl px-3.5 py-2.5">
                <MapPin className="w-4 h-4 text-emerald-600 mr-2 shrink-0" />
                <div className="min-w-0">
                  <span className="block text-[9px] font-bold uppercase tracking-wider text-[#78716C]">Bölge</span>
                  <span className="block text-xs font-extrabold text-[#1C1917] truncate">{selectedCity}, {selectedDistrict}</span>
                </div>
              </div>

              {/* Mode format */}
              <div className="sm:col-span-2 flex items-center bg-[#FAF8F5] border border-[#E7E2D9] rounded-2xl px-3 py-2.5">
                <Video className="w-4 h-4 text-teal-600 mr-2 shrink-0" />
                <div>
                  <span className="block text-[9px] font-bold uppercase tracking-wider text-[#78716C]">Format</span>
                  <button
                    type="button"
                    onClick={() => setOnlineOnlyFilter && setOnlineOnlyFilter(!onlineOnlyFilter)}
                    className="text-xs font-bold text-emerald-700 hover:underline"
                  >
                    {onlineOnlyFilter ? 'Online' : 'Tümü'}
                  </button>
                </div>
              </div>

              {/* Match Action */}
              <div className="sm:col-span-3">
                <button
                  type="submit"
                  className="w-full h-full min-h-[46px] rounded-2xl bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-xs shadow-md shadow-emerald-700/20 transition-all flex items-center justify-center gap-1.5 whitespace-nowrap"
                >
                  <Search className="w-3.5 h-3.5" />
                  <span>Eğitmenleri Listele</span>
                </button>
              </div>
            </form>

            {/* Mockup Preview Bottom Grid (Simulated Live Matching Feed) */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-2">
              <div className="p-3.5 rounded-2xl bg-[#FAF8F5] border border-[#E7E2D9] flex items-center justify-between gap-3">
                <div className="flex items-center gap-3">
                  <img
                    src="https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=100&auto=format&fit=crop&q=80"
                    alt="Eğitmen"
                    className="w-10 h-10 rounded-xl object-cover ring-2 ring-emerald-500/30"
                  />
                  <div>
                    <div className="flex items-center gap-1">
                      <span className="text-xs font-bold text-[#1C1917]">Dr. Selin Demir</span>
                      <span className="text-[10px] text-emerald-700 font-extrabold">✓ Boğaziçi</span>
                    </div>
                    <span className="text-[11px] text-[#78716C]">Matematik • ₺750/sa • ⭐ 4.98</span>
                  </div>
                </div>
                <button 
                  onClick={onOpenRequestWizard}
                  className="px-2.5 py-1.5 bg-white hover:bg-emerald-50 border border-[#DDD7CD] text-emerald-700 text-[11px] font-bold rounded-xl transition-colors shrink-0"
                >
                  Teklif İste
                </button>
              </div>

              <div className="p-3.5 rounded-2xl bg-[#FAF8F5] border border-[#E7E2D9] flex items-center justify-between gap-3">
                <div className="flex items-center gap-3">
                  <img
                    src="https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=100&auto=format&fit=crop&q=80"
                    alt="Eğitmen"
                    className="w-10 h-10 rounded-xl object-cover ring-2 ring-blue-500/30"
                  />
                  <div>
                    <div className="flex items-center gap-1">
                      <span className="text-xs font-bold text-[#1C1917]">Prof. Levent Öz</span>
                      <span className="text-[10px] text-blue-700 font-extrabold">✓ İTÜ Fizik</span>
                    </div>
                    <span className="text-[11px] text-[#78716C]">YKS Fizik • ₺900/sa • ⭐ 5.0</span>
                  </div>
                </div>
                <button 
                  onClick={onOpenRequestWizard}
                  className="px-2.5 py-1.5 bg-white hover:bg-blue-50 border border-[#DDD7CD] text-blue-700 text-[11px] font-bold rounded-xl transition-colors shrink-0"
                >
                  Teklif İste
                </button>
              </div>
            </div>

            {/* Quick Request Action Bar inside Card */}
            <div className="p-3 rounded-2xl bg-gradient-to-r from-emerald-50 via-teal-50 to-amber-50 border border-emerald-200 flex flex-col sm:flex-row items-center justify-between gap-2 text-xs">
              <div className="flex items-center gap-2">
                <span className="w-2 h-2 rounded-full bg-emerald-500 animate-ping"></span>
                <span className="font-extrabold text-[#1C1917]">Özel Ders Talebi Oluştur:</span>
                <span className="text-[#57534E]">15 dakikada en uygun 5 eğitmenden ücretsiz teklif al.</span>
              </div>
              <button
                onClick={onOpenRequestWizard}
                className="px-3 py-1.5 bg-emerald-700 hover:bg-emerald-800 text-white font-bold text-xs rounded-xl transition-all shrink-0 flex items-center gap-1 shadow-sm"
              >
                <span>Talebi Başlat</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </button>
            </div>

          </div>

        </div>

      </div>
    </section>
  );
}
