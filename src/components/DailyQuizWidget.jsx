import React, { useState } from 'react';
import { Sparkles, CheckCircle2, Award, Zap, HelpCircle } from 'lucide-react';
import confetti from 'canvas-confetti';

export default function DailyQuizWidget() {
  const [answered, setAnswered] = useState(false);
  const [selectedOpt, setSelectedOpt] = useState(null);

  const question = {
    title: 'Günün Sorusu: YKS Matematik',
    text: 'log₂(x - 3) = 4 eşitliğini sağlayan x değeri kaçtır?',
    options: ['A) 7', 'B) 11', 'C) 15', 'D) 19', 'E) 23'],
    correct: 3, // D) 19 (x-3 = 2^4 = 16 -> x = 19)
    explanation: 'log₂(x - 3) = 4 → x - 3 = 2⁴ = 16 → x = 19 bulunur.'
  };

  const handleSelect = (idx) => {
    if (answered) return;
    setSelectedOpt(idx);
    setAnswered(true);
    if (idx === question.correct) {
      confetti({ particleCount: 80, spread: 60 });
    }
  };

  return (
    <div className="p-6 rounded-3xl bg-white border border-[#E7E2D9] shadow-sm space-y-4 select-none">
      
      <div className="flex items-center justify-between">
        <div className="flex items-center space-x-2.5">
          <div className="w-9 h-9 rounded-xl bg-amber-100 text-amber-800 flex items-center justify-center border border-amber-200">
            <Zap className="w-5 h-5" />
          </div>
          <div>
            <h3 className="text-xs sm:text-sm font-black text-[#1C1917]">{question.title}</h3>
            <p className="text-[11px] text-amber-700 font-bold">Doğru çözene +50 Borsa Puanı hediye!</p>
          </div>
        </div>

        <span className="px-2.5 py-1 rounded-full bg-[#FAF8F5] text-[#57534E] text-[10px] font-bold border border-[#E7E2D9]">
          Günün Sorusu
        </span>
      </div>

      <div className="p-4 rounded-2xl bg-[#FAF8F5] border border-[#E7E2D9] text-xs font-bold text-[#1C1917]">
        {question.text}
      </div>

      <div className="grid grid-cols-2 sm:grid-cols-5 gap-2 text-xs font-bold">
        {question.options.map((opt, i) => {
          const isSelected = selectedOpt === i;
          const isCorrect = i === question.correct;
          return (
            <button
              key={i}
              onClick={() => handleSelect(i)}
              className={`p-2.5 rounded-xl border text-center transition-all ${
                answered
                  ? isCorrect
                    ? 'bg-emerald-600 border-emerald-500 text-white shadow-md'
                    : isSelected
                    ? 'bg-rose-600 border-rose-500 text-white'
                    : 'bg-[#F5F2EC] border-[#DDD7CD] text-[#78716C]'
                  : 'bg-white border-[#DDD7CD] text-[#292524] hover:border-amber-500 hover:bg-amber-50'
              }`}
            >
              {opt}
            </button>
          );
        })}
      </div>

      {answered && (
        <div className="space-y-2 animate-fadeIn pt-1">
          {selectedOpt === question.correct ? (
            <div className="p-3 rounded-xl bg-emerald-50 border border-emerald-200 text-emerald-800 text-xs font-bold flex items-center justify-between">
              <span className="flex items-center gap-1.5">
                <CheckCircle2 className="w-4 h-4 text-emerald-600" />
                <span>Tebrikler! Doğru cevap verdiniz. +50 Puan hesabınıza yüklendi!</span>
              </span>
              <span className="text-[10px] font-mono bg-emerald-200/60 px-2 py-0.5 rounded">✓ DOĞRU</span>
            </div>
          ) : (
            <div className="p-3 rounded-xl bg-rose-50 border border-rose-200 text-rose-700 text-xs font-bold">
              ✕ Yanlış cevap seçtiniz. Doğru cevap: D) 19
            </div>
          )}
          <div className="p-3 rounded-xl bg-[#FAF8F5] border border-[#E7E2D9] text-xs text-[#57534E]">
            💡 <span className="font-bold text-amber-800">Çözüm Açıklaması:</span> {question.explanation}
          </div>
        </div>
      )}

    </div>
  );
}
