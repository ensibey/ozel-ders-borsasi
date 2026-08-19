import React from 'react';
import { 
  Sparkles, 
  ArrowRight, 
  ShieldCheck, 
  PlusCircle, 
  UserPlus, 
  Zap, 
  CheckCircle2 
} from 'lucide-react';

/**
 * FinalCTA: High-impact closing banner engineered for conversion.
 * Features dual CTA buttons, trust badges, and an elevated dark emerald gradient.
 */
export default function FinalCta({ onOpenRequestWizard, onOpenCreateProfile }) {
  return (
    <section className="py-12 sm:py-16 select-none">
      <div className="rounded-3xl bg-gradient-to-tr from-[#064e3b] via-[#042f2e] to-[#1C1917] p-8 sm:p-14 text-center text-white relative overflow-hidden shadow-2xl space-y-6 border border-emerald-800/40">
        
        {/* Background Ambient Glow Accent */}
        <div className="absolute top-0 right-0 w-96 h-96 bg-emerald-500/20 rounded-full blur-3xl pointer-events-none" />
        <div className="absolute bottom-0 left-0 w-72 h-72 bg-teal-500/10 rounded-full blur-2xl pointer-events-none" />

        <div className="relative z-10 max-w-3xl mx-auto space-y-4">
          
          {/* Badge */}
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-white/10 border border-white/20 text-emerald-300 text-xs font-extrabold uppercase tracking-wider backdrop-blur-md shadow-inner">
            <Sparkles className="w-3.5 h-3.5" />
            <span>Başarıya Giden En Doğrudan Yol</span>
          </div>

          {/* Heading */}
          <h2 className="text-3xl sm:text-5xl font-black tracking-tight leading-[1.15]">
            Hedeflediğin Netlere ve Başarıya Ulaşmaya Hazır Mısın?
          </h2>

          {/* Subtext */}
          <p className="text-xs sm:text-base text-emerald-100/80 leading-relaxed max-w-xl mx-auto font-medium">
            Hemen 1 dakikada ücretsiz özel ders talebini oluştur, kriterlerine tam uyan akredite eğitmenlerden ilk tekliflerini dakikalar içinde al.
          </p>

          {/* Dual CTA Action Buttons */}
          <div className="pt-4 flex flex-col sm:flex-row items-center justify-center gap-3.5">
            <button
              onClick={onOpenRequestWizard}
              className="w-full sm:w-auto px-8 py-4 rounded-2xl bg-emerald-500 hover:bg-emerald-400 text-slate-950 font-black text-sm shadow-2xl shadow-emerald-500/30 transition-all flex items-center justify-center gap-2 group hover:scale-[1.02]"
            >
              <PlusCircle className="w-4 h-4" />
              <span>Ücretsiz Ders Talebi Oluştur</span>
              <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
            </button>

            <button
              onClick={onOpenCreateProfile}
              className="w-full sm:w-auto px-7 py-4 rounded-2xl bg-white/10 hover:bg-white/20 border border-white/20 text-white font-extrabold text-sm transition-all flex items-center justify-center gap-2 backdrop-blur-md"
            >
              <UserPlus className="w-4 h-4 text-emerald-300" />
              <span>Eğitmen Olarak Katıl</span>
            </button>
          </div>

          {/* Trust Footnote */}
          <div className="pt-4 flex flex-wrap items-center justify-center gap-4 text-[11px] text-emerald-200/70 font-semibold">
            <span className="flex items-center gap-1">
              <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400" /> %0 Öğrenci Komisyonu
            </span>
            <span>•</span>
            <span className="flex items-center gap-1">
              <Zap className="w-3.5 h-3.5 text-emerald-400" /> 15 Dakikada İlk Teklif
            </span>
            <span>•</span>
            <span className="flex items-center gap-1">
              <ShieldCheck className="w-3.5 h-3.5 text-emerald-400" /> %100 Memnuniyet Garantisi
            </span>
          </div>

        </div>
      </div>
    </section>
  );
}
