import React, { useState } from 'react';
import { 
  X, 
  ChevronLeft, 
  ChevronRight, 
  BookOpen, 
  Sparkles, 
  ShieldCheck, 
  ShoppingBag, 
  PlayCircle, 
  Video, 
  CheckCircle2, 
  Maximize2, 
  Minimize2, 
  ZoomIn, 
  ZoomOut, 
  Layers, 
  FileText, 
  HelpCircle,
  Award
} from 'lucide-react';

export default function BookPreviewModal({ isOpen, onClose, product, onAddToCart }) {
  const [currentPageIndex, setCurrentPageIndex] = useState(0);
  const [isVideoPlaying, setIsVideoPlaying] = useState(false);
  const [zoomLevel, setZoomLevel] = useState(100);

  if (!isOpen || !product) return null;

  const preview = product.samplePreview;
  if (!preview || !preview.pages || preview.pages.length === 0) return null;

  const totalPages = preview.pages.length;
  const currentPage = preview.pages[currentPageIndex];

  const handleNextPage = () => {
    if (currentPageIndex < totalPages - 1) {
      setCurrentPageIndex(prev => prev + 1);
      setIsVideoPlaying(false);
    }
  };

  const handlePrevPage = () => {
    if (currentPageIndex > 0) {
      setCurrentPageIndex(prev => prev - 1);
      setIsVideoPlaying(false);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-2 sm:p-5 bg-slate-950/85 backdrop-blur-md animate-fadeIn select-none font-sans">
      <div className="max-w-4xl w-full h-[94vh] sm:h-[90vh] sm:max-h-[720px] rounded-2xl sm:rounded-3xl bg-[#FAF8F5] border border-[#DDD7CD] shadow-2xl flex flex-col overflow-hidden relative">
        
        {/* 1. TOP HEADER BAR */}
        <div className="p-3 sm:p-4 sm:px-6 bg-white border-b border-[#E7E2D9] flex items-center justify-between gap-3 shrink-0">
          <div className="flex items-center space-x-3 min-w-0">
            <div className="w-10 h-10 rounded-2xl bg-emerald-500/10 text-emerald-700 border border-emerald-500/20 flex items-center justify-center shrink-0">
              <BookOpen className="w-5 h-5" />
            </div>
            <div className="min-w-0">
              <div className="flex items-center gap-2">
                <span className="px-2 py-0.5 rounded-full bg-emerald-100 text-emerald-800 text-[10px] font-extrabold border border-emerald-200">
                  👁️ Kitabın İçine Bak
                </span>
                <span className="text-[11px] font-bold text-[#78716C] truncate hidden sm:inline">
                  {product.vendor}
                </span>
              </div>
              <h3 className="text-sm sm:text-base font-black text-[#1C1917] truncate mt-0.5">
                {product.name}
              </h3>
            </div>
          </div>

          {/* Quick Zoom & Close controls */}
          <div className="flex items-center gap-2 shrink-0">
            <div className="hidden sm:flex items-center gap-1 bg-[#F5F2EC] p-1 rounded-xl border border-[#E7E2D9]">
              <button
                onClick={() => setZoomLevel(prev => Math.max(80, prev - 10))}
                className="p-1.5 rounded-lg hover:bg-white text-[#57534E] hover:text-[#1C1917] transition-all"
                title="Küçült"
              >
                <ZoomOut className="w-4 h-4" />
              </button>
              <span className="text-[11px] font-bold text-[#57534E] px-1 font-mono">{zoomLevel}%</span>
              <button
                onClick={() => setZoomLevel(prev => Math.min(130, prev + 10))}
                className="p-1.5 rounded-lg hover:bg-white text-[#57534E] hover:text-[#1C1917] transition-all"
                title="Büyüt"
              >
                <ZoomIn className="w-4 h-4" />
              </button>
            </div>

            <button
              onClick={onClose}
              className="p-2 sm:p-2.5 rounded-xl bg-[#F5F2EC] hover:bg-rose-50 text-[#57534E] hover:text-rose-600 transition-colors"
              title="Kapat"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* 2. SUB-INFO BAR */}
        <div className="px-6 py-2 bg-[#F5F2EC] border-b border-[#E7E2D9] flex flex-wrap items-center justify-between gap-2 text-xs font-bold text-[#57534E] shrink-0">
          <div className="flex items-center gap-3">
            <span className="text-emerald-700 flex items-center gap-1">
              <Sparkles className="w-3.5 h-3.5 text-emerald-600" /> {preview.topic}
            </span>
            <span className="hidden md:inline text-[#A8A29E]">•</span>
            <span className="hidden md:inline text-purple-700">
              Zorluk: {preview.difficulty}
            </span>
          </div>

          <div className="flex items-center gap-2">
            <span className="text-[11px] text-[#78716C] bg-white px-2.5 py-1 rounded-full border border-[#DDD7CD] font-mono">
              Sayfa {currentPageIndex + 1} / {totalPages}
            </span>
          </div>
        </div>

        {/* 3. INTERACTIVE PDF PAGE CANVAS */}
        <div className="flex-1 overflow-y-auto p-3 sm:p-8 flex items-start sm:items-center justify-center relative bg-[#EBE7DF]/60 custom-scrollbar">
          
          {/* Watermark Pattern */}
          <div className="absolute inset-0 flex items-center justify-center pointer-events-none opacity-5">
            <span className="text-5xl sm:text-7xl font-black text-black transform -rotate-12 select-none">
              ÖZEL DERS BORSASI • ÖRNEK BASKI
            </span>
          </div>

          {/* Book Page Card View */}
          <div 
            style={{ transform: `scale(${zoomLevel / 100})`, transformOrigin: 'top center' }}
            className="w-full max-w-2xl bg-white rounded-2xl shadow-xl border border-[#DDD7CD] p-4 sm:p-10 space-y-4 sm:space-y-6 relative transition-transform duration-200"
          >
            {/* Top Page Header */}
            <div className="flex items-center justify-between pb-4 border-b border-[#F0EBE1]">
              <div>
                <span className="text-[10px] font-extrabold uppercase tracking-widest text-emerald-700">
                  {product.vendor} • Yayınevi Orijinal Baskı
                </span>
                <h4 className="text-base sm:text-lg font-black text-[#1C1917] mt-0.5">
                  {currentPage.title}
                </h4>
                <p className="text-xs text-[#78716C] font-semibold mt-0.5">
                  {currentPage.subtitle}
                </p>
              </div>

              <div className="text-right">
                <span className="text-xs font-mono font-bold text-[#78716C] bg-[#F5F2EC] px-3 py-1 rounded-full">
                  S. {currentPage.pageNumber}
                </span>
              </div>
            </div>

            {/* Page Body: Dynamic based on page type */}
            {currentPage.type === 'cover_index' && (
              <div className="space-y-4 py-2">
                <p className="text-xs text-[#57534E] leading-relaxed font-medium">
                  Bu fasikül / kitap seti, MEB 2026 müfredatındaki tüm kazanımları kapsayacak şekilde 5 ana modülde hazırlanmıştır:
                </p>
                <div className="space-y-2">
                  {currentPage.content.map((item, idx) => (
                    <div key={idx} className="p-3 rounded-xl bg-[#FAF8F5] border border-[#E7E2D9] text-xs font-bold text-[#292524] flex items-center gap-2">
                      <div className="w-2 h-2 rounded-full bg-emerald-500" />
                      <span>{item}</span>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {currentPage.type === 'question_sample' && (
              <div className="space-y-5">
                {/* Question Box */}
                <div className="p-4 sm:p-5 rounded-2xl bg-[#FAF8F5] border border-[#E7E2D9] space-y-4">
                  <div className="flex items-center justify-between text-xs font-bold text-emerald-800">
                    <span>Soru #{currentPage.pageNumber}</span>
                    <span className="px-2 py-0.5 rounded-full bg-amber-100 text-amber-900 text-[10px]">ÖSYM Tipi</span>
                  </div>

                  <p className="text-xs sm:text-sm font-semibold text-[#1C1917] leading-relaxed">
                    {currentPage.questionText}
                  </p>

                  {/* Options */}
                  <div className="grid grid-cols-2 sm:grid-cols-5 gap-2 pt-2">
                    {currentPage.options.map((opt, idx) => (
                      <div 
                        key={idx} 
                        className={`p-2.5 rounded-xl border text-xs font-bold text-center transition-all ${
                          opt.startsWith(currentPage.correctAnswer)
                            ? 'bg-emerald-50 text-emerald-800 border-emerald-300 shadow-sm'
                            : 'bg-white text-[#44403C] border-[#DDD7CD]'
                        }`}
                      >
                        {opt}
                      </div>
                    ))}
                  </div>
                </div>

                {/* Explanation & Video Solution Box */}
                <div className="p-4 rounded-2xl bg-emerald-50/70 border border-emerald-200/80 space-y-3">
                  <div className="flex items-center justify-between">
                    <span className="text-xs font-black text-emerald-900 flex items-center gap-1.5">
                      <CheckCircle2 className="w-4 h-4 text-emerald-600" />
                      Doğru Cevap: {currentPage.correctAnswer} — Çözüm İpucu
                    </span>

                    {currentPage.hasVideoSolution && (
                      <button
                        onClick={() => setIsVideoPlaying(!isVideoPlaying)}
                        className="px-3 py-1.5 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white text-xs font-extrabold transition-all shadow flex items-center gap-1.5"
                      >
                        <PlayCircle className="w-4 h-4" />
                        <span>{isVideoPlaying ? 'Videoyu Gizle' : 'Video Çözümü İzle'}</span>
                      </button>
                    )}
                  </div>

                  <p className="text-xs text-emerald-950 font-medium leading-relaxed">
                    {currentPage.explanation}
                  </p>

                  {/* Simulated Video Player */}
                  {isVideoPlaying && (
                    <div className="mt-3 p-4 rounded-xl bg-slate-950 text-white space-y-2 animate-fadeIn border border-slate-800">
                      <div className="flex items-center justify-between text-xs text-slate-300">
                        <span className="flex items-center gap-1.5 font-bold text-emerald-400">
                          <Video className="w-4 h-4" /> Eğitmen Video Çözümü: {preview.videoTeacher}
                        </span>
                        <span className="font-mono text-[10px] text-slate-400">01:45 / 03:20</span>
                      </div>
                      <div className="h-32 rounded-lg bg-slate-900 border border-slate-800 flex items-center justify-center relative overflow-hidden">
                        <div className="text-center space-y-2">
                          <div className="w-12 h-12 rounded-full bg-emerald-600/30 text-emerald-400 flex items-center justify-center mx-auto animate-pulse">
                            <PlayCircle className="w-6 h-6" />
                          </div>
                          <span className="text-xs font-bold text-slate-300 block">
                            Adım Adım Soru Çözüm Anlatımı Oynatılıyor...
                          </span>
                        </div>
                      </div>
                    </div>
                  )}
                </div>
              </div>
            )}

            {currentPage.type === 'concept_card' && (
              <div className="space-y-4 py-3">
                <div className="p-4 rounded-2xl bg-amber-50 border border-amber-200/80 space-y-3">
                  <h5 className="text-xs font-extrabold text-amber-900 flex items-center gap-1.5">
                    <Sparkles className="w-4 h-4 text-amber-600" /> Sınav Taktikleri & Püf Noktaları
                  </h5>
                  <div className="space-y-2">
                    {currentPage.content.map((c, i) => (
                      <p key={i} className="text-xs text-amber-950 font-semibold leading-relaxed">
                        {c}
                      </p>
                    ))}
                  </div>
                </div>
              </div>
            )}

            {currentPage.type === 'summary_page' && (
              <div className="space-y-4 py-3">
                <div className="p-5 rounded-2xl bg-[#FAF8F5] border border-[#E7E2D9] space-y-3">
                  <h5 className="text-xs font-black text-[#1C1917] uppercase tracking-wider">
                    Öne Çıkan Set Avantajları
                  </h5>
                  <div className="space-y-2.5">
                    {currentPage.content.map((c, i) => (
                      <div key={i} className="text-xs font-bold text-emerald-800 flex items-center gap-2">
                        <span>{c}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            )}

            {/* Bottom Page Footer Accreditations */}
            <div className="pt-4 border-t border-[#F0EBE1] flex items-center justify-between text-[11px] text-[#78716C] font-semibold">
              <span className="flex items-center gap-1">
                <ShieldCheck className="w-3.5 h-3.5 text-emerald-600" /> %100 Orijinal Yayınevi Telifi
              </span>
              <span>Sayfa {currentPage.pageNumber} / {totalPages}</span>
            </div>
          </div>
        </div>

        {/* 4. BOTTOM ACTION & PAGE NAVIGATOR BAR */}
        <div className="p-3 sm:p-4 sm:px-6 bg-white border-t border-[#E7E2D9] flex flex-col sm:flex-row items-center justify-between gap-3 sm:gap-4 shrink-0">
          {/* Page Switcher Buttons */}
          <div className="flex items-center justify-between sm:justify-start w-full sm:w-auto gap-2 order-2 sm:order-1">
            <button
              onClick={handlePrevPage}
              disabled={currentPageIndex === 0}
              className="px-3 py-2 rounded-xl bg-[#F5F2EC] hover:bg-[#EFECE6] disabled:opacity-40 text-[#292524] text-xs font-bold transition-all flex items-center gap-1 border border-[#DDD7CD]"
            >
              <ChevronLeft className="w-4 h-4" />
              <span>Önceki</span>
            </button>

            {/* Page Dots */}
            <div className="flex items-center gap-1.5 px-1">
              {preview.pages.map((_, idx) => (
                <button
                  key={idx}
                  onClick={() => {
                    setCurrentPageIndex(idx);
                    setIsVideoPlaying(false);
                  }}
                  className={`w-2.5 h-2.5 rounded-full transition-all ${
                    currentPageIndex === idx
                      ? 'w-5 bg-emerald-600'
                      : 'bg-[#DDD7CD] hover:bg-[#A8A29E]'
                  }`}
                  title={`Sayfa ${idx + 1}`}
                />
              ))}
            </div>

            <button
              onClick={handleNextPage}
              disabled={currentPageIndex === totalPages - 1}
              className="px-3 py-2 rounded-xl bg-[#F5F2EC] hover:bg-[#EFECE6] disabled:opacity-40 text-[#292524] text-xs font-bold transition-all flex items-center gap-1 border border-[#DDD7CD]"
            >
              <span>Sonraki</span>
              <ChevronRight className="w-4 h-4" />
            </button>
          </div>

          {/* Add to Cart CTA */}
          <div className="flex items-center gap-2 sm:gap-3 w-full sm:w-auto justify-between sm:justify-end order-1 sm:order-2">
            <div className="text-left sm:text-right">
              <span className="text-[10px] sm:text-xs text-[#78716C] block">Fiyat</span>
              <span className="text-sm sm:text-base font-black text-[#1C1917] font-mono">₺{product.price}</span>
            </div>

            <button
              onClick={() => {
                if (onAddToCart) onAddToCart(product);
                onClose();
              }}
              className="flex-1 sm:flex-initial px-4 sm:px-6 py-2.5 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white text-xs font-extrabold shadow-lg shadow-emerald-700/25 transition-all flex items-center justify-center gap-2 group hover:scale-[1.02]"
            >
              <ShoppingBag className="w-4 h-4 shrink-0" />
              <span>Sepete Ekle & Satın Al</span>
            </button>
          </div>
        </div>

      </div>
    </div>
  );
}
