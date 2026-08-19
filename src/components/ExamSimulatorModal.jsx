import React, { useState, useEffect } from 'react';
import { X, CheckCircle2, Clock, HelpCircle, Award, AlertCircle, RefreshCw } from 'lucide-react';
import { EXAM_QUESTIONS } from '../data/mockData';
import confetti from 'canvas-confetti';

export default function ExamSimulatorModal({ isOpen, onClose }) {
  const [currentIdx, setCurrentIdx] = useState(0);
  const [selectedAnswers, setSelectedAnswers] = useState({});
  const [timeLeft, setTimeLeft] = useState(600); // 10 minutes in seconds
  const [isFinished, setIsFinished] = useState(false);

  useEffect(() => {
    if (!isOpen || isFinished) return;
    const timer = setInterval(() => {
      setTimeLeft(prev => {
        if (prev <= 1) {
          clearInterval(timer);
          setIsFinished(true);
          return 0;
        }
        return prev - 1;
      });
    }, 1000);
    return () => clearInterval(timer);
  }, [isOpen, isFinished]);

  
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

  const currentQ = EXAM_QUESTIONS[currentIdx];

  const handleSelectOption = (optIdx) => {
    if (isFinished) return;
    setSelectedAnswers(prev => ({
      ...prev,
      [currentIdx]: optIdx
    }));
  };

  const handleFinishExam = () => {
    confetti({ particleCount: 120, spread: 80 });
    setIsFinished(true);
  };

  const handleReset = () => {
    setSelectedAnswers({});
    setCurrentIdx(0);
    setTimeLeft(600);
    setIsFinished(false);
  };

  // Calculate Scores
  let correctCount = 0;
  let wrongCount = 0;
  EXAM_QUESTIONS.forEach((q, idx) => {
    const userAns = selectedAnswers[idx];
    if (userAns !== undefined) {
      if (userAns === q.correctOption) {
        correctCount++;
      } else {
        wrongCount++;
      }
    }
  });

  const netScore = (correctCount - (wrongCount / 4)).toFixed(2);

  const formatTime = (secs) => {
    const m = Math.floor(secs / 60);
    const s = secs % 60;
    return `${m.toString().padStart(2, '0')}:${s.toString().padStart(2, '0')}`;
  };

  return (
    <div onClick={onClose} className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/85 backdrop-blur-md animate-fadeIn">
      <div onClick={(e) => e.stopPropagation()} className="glass-panel w-full max-w-3xl rounded-3xl p-6 sm:p-8 border border-indigo-500/30 shadow-2xl relative flex flex-col max-h-[90vh] overflow-y-auto custom-scrollbar">
        
        {/* Header */}
        <div className="flex items-center justify-between pb-4 border-b border-slate-800">
          <div className="flex items-center space-x-3">
            <div className="w-10 h-10 rounded-xl bg-indigo-600/30 text-indigo-400 flex items-center justify-center border border-indigo-500/40">
              <Award className="w-6 h-6" />
            </div>
            <div>
              <h2 className="text-lg font-bold text-white">Canlı Online Deneme Sınavı Simülatörü</h2>
              <p className="text-xs text-slate-400">YKS-TYT & LGS Formatı Mini Test</p>
            </div>
          </div>

          <div className="flex items-center space-x-3">
            {!isFinished && (
              <div className="flex items-center space-x-1.5 px-3.5 py-1.5 rounded-xl bg-slate-900 border border-slate-800 text-xs font-mono font-bold text-amber-400">
                <Clock className="w-4 h-4 animate-pulse" />
                <span>{formatTime(timeLeft)}</span>
              </div>
            )}

            <button onClick={onClose} className="p-2 rounded-xl bg-slate-900 border border-slate-800 text-slate-400 hover:text-white">
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Results View */}
        {isFinished ? (
          <div className="py-8 space-y-6 text-center animate-fadeIn">
            <div className="w-16 h-16 rounded-full bg-emerald-500/20 border-2 border-emerald-500 text-emerald-400 flex items-center justify-center mx-auto mb-2 animate-bounce">
              <CheckCircle2 className="w-8 h-8" />
            </div>
            
            <h3 className="text-2xl font-extrabold text-white">Sınavınız Tamamlandı!</h3>
            <p className="text-xs text-slate-300">ÖSYM değerlendirme kuralı: 4 Yanlış 1 Doğruyu götürmektedir.</p>

            <div className="grid grid-cols-3 gap-4 max-w-md mx-auto">
              <div className="bg-slate-900/80 p-4 rounded-2xl border border-slate-800">
                <span className="text-xs text-slate-400 block">Doğru</span>
                <span className="text-xl font-extrabold text-emerald-400">{correctCount}</span>
              </div>
              <div className="bg-slate-900/80 p-4 rounded-2xl border border-slate-800">
                <span className="text-xs text-slate-400 block">Yanlış</span>
                <span className="text-xl font-extrabold text-rose-400">{wrongCount}</span>
              </div>
              <div className="bg-slate-900/80 p-4 rounded-2xl border border-indigo-500/40">
                <span className="text-xs text-indigo-400 block">Toplam Net</span>
                <span className="text-xl font-extrabold text-white">{netScore}</span>
              </div>
            </div>

            {/* Answer Explanations */}
            <div className="text-left space-y-4 pt-4 border-t border-slate-800">
              <h4 className="text-sm font-bold text-white">Soru Çözüm & Cevap Anahtarı Detayları:</h4>
              {EXAM_QUESTIONS.map((q, idx) => {
                const userAns = selectedAnswers[idx];
                const isCorrect = userAns === q.correctOption;
                return (
                  <div key={q.id} className="p-4 rounded-2xl bg-slate-900/60 border border-slate-800 space-y-2">
                    <div className="flex items-center justify-between">
                      <span className="text-xs font-bold text-indigo-300">Soru {idx + 1} ({q.subject})</span>
                      <span className={`text-xs font-bold ${isCorrect ? 'text-emerald-400' : 'text-rose-400'}`}>
                        {isCorrect ? '✓ Doğru Cevap' : userAns === undefined ? '⚪ Boş Bırakıldı' : '✕ Yanlış Cevap'}
                      </span>
                    </div>
                    <p className="text-xs text-white font-medium">{q.questionText}</p>
                    <p className="text-xs text-slate-400 bg-slate-950 p-2.5 rounded-xl border border-slate-800/80">
                      💡 <span className="font-semibold text-slate-300">Eğitmen Çözüm Açıklaması:</span> {q.explanation}
                    </p>
                  </div>
                );
              })}
            </div>

            <button
              onClick={handleReset}
              className="px-6 py-3 rounded-xl bg-indigo-600 hover:bg-indigo-500 text-white font-bold text-xs shadow-lg flex items-center justify-center gap-2 mx-auto"
            >
              <RefreshCw className="w-4 h-4" />
              <span>Sınavı Tekrar Başlat</span>
            </button>
          </div>
        ) : (
          /* Question View */
          <div className="py-6 space-y-6 flex-1 flex flex-col justify-between">
            
            {/* Question Progress Dots */}
            <div className="flex items-center justify-between text-xs font-bold">
              <span className="text-indigo-400">Soru {currentIdx + 1} / {EXAM_QUESTIONS.length}</span>
              <div className="flex items-center space-x-2">
                {EXAM_QUESTIONS.map((_, i) => (
                  <button
                    key={i}
                    onClick={() => setCurrentIdx(i)}
                    className={`w-7 h-7 rounded-lg text-xs font-bold flex items-center justify-center transition-all ${
                      currentIdx === i
                        ? 'bg-indigo-600 text-white shadow-md'
                        : selectedAnswers[i] !== undefined
                        ? 'bg-emerald-600/30 text-emerald-300 border border-emerald-500/40'
                        : 'bg-slate-900 text-slate-400 border border-slate-800'
                    }`}
                  >
                    {i + 1}
                  </button>
                ))}
              </div>
            </div>

            {/* Question Box */}
            <div className="p-6 rounded-2xl bg-slate-900/80 border border-slate-800 space-y-4">
              <span className="px-2.5 py-0.5 rounded-full bg-indigo-500/20 text-indigo-300 text-[10px] font-bold border border-indigo-500/30">
                {currentQ.subject}
              </span>
              <h3 className="text-base font-bold text-white leading-relaxed">{currentQ.questionText}</h3>
            </div>

            {/* Multiple Choice Options */}
            <div className="space-y-3">
              {currentQ.options.map((opt, optIdx) => {
                const isSelected = selectedAnswers[currentIdx] === optIdx;
                return (
                  <button
                    key={optIdx}
                    onClick={() => handleSelectOption(optIdx)}
                    className={`w-full p-4 rounded-xl border text-left text-xs font-semibold transition-all flex items-center justify-between ${
                      isSelected
                        ? 'bg-indigo-600/30 border-indigo-500 text-white shadow-lg shadow-indigo-600/20'
                        : 'bg-slate-900/60 border-slate-800 text-slate-300 hover:border-slate-700 hover:bg-slate-800'
                    }`}
                  >
                    <span>{opt}</span>
                    {isSelected && <CheckCircle2 className="w-4 h-4 text-indigo-400 shrink-0" />}
                  </button>
                );
              })}
            </div>

            {/* Bottom Actions */}
            <div className="pt-4 border-t border-slate-800 flex items-center justify-between">
              <button
                disabled={currentIdx === 0}
                onClick={() => setCurrentIdx(prev => prev - 1)}
                className="px-4 py-2 rounded-xl bg-slate-900 border border-slate-800 text-xs text-slate-300 disabled:opacity-40"
              >
                Önceki Soru
              </button>

              {currentIdx < EXAM_QUESTIONS.length - 1 ? (
                <button
                  onClick={() => setCurrentIdx(prev => prev + 1)}
                  className="px-5 py-2.5 rounded-xl bg-indigo-600 hover:bg-indigo-500 text-white font-bold text-xs shadow-md"
                >
                  Sonraki Soru
                </button>
              ) : (
                <button
                  onClick={handleFinishExam}
                  className="px-6 py-2.5 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white font-extrabold text-xs shadow-md"
                >
                  Sınavı Bitir ve Netini Gör
                </button>
              )}
            </div>

          </div>
        )}

      </div>
    </div>
  );
}
