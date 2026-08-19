import React, { useState, useEffect } from 'react';
import { X, SlidersHorizontal, Star, CheckCircle2, RotateCcw, Filter } from 'lucide-react';

export default function TeacherFilterModal({ 
  isOpen, 
  onClose, 
  minRate, 
  maxRate, 
  onApplyFilters,
  onResetFilters
}) {
  const [rateLimit, setRateLimit] = useState(maxRate || 1000);
  const [minRating, setMinRating] = useState(0);
  const [verifiedOnly, setVerifiedOnly] = useState(false);
  const [minExperience, setMinExperience] = useState(0);

  
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

  const handleApply = () => {
    onApplyFilters({
      maxRate: rateLimit,
      minRating,
      verifiedOnly,
      minExperience
    });
    onClose();
  };

  const handleReset = () => {
    setRateLimit(1000);
    setMinRating(0);
    setVerifiedOnly(false);
    setMinExperience(0);
    onResetFilters();
    onClose();
  };

  return (
    <div onClick={onClose} className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/85 backdrop-blur-md animate-fadeIn">
      <div onClick={(e) => e.stopPropagation()} className="glass-panel w-full max-w-md rounded-3xl p-6 border border-indigo-500/30 shadow-2xl relative space-y-6">
        
        <div className="flex items-center justify-between pb-3 border-b border-slate-800">
          <div className="flex items-center space-x-2">
            <SlidersHorizontal className="w-5 h-5 text-indigo-400" />
            <h2 className="text-base font-bold text-white">Gelişmiş Eğitmen Filtreleri</h2>
          </div>
          <button onClick={onClose} className="p-1.5 rounded-xl bg-slate-900 text-slate-400 hover:text-white">
            <X className="w-5 h-5" />
          </button>
        </div>

        <div className="space-y-5 text-xs">
          
          {/* Hourly Price Filter Slider */}
          <div>
            <div className="flex justify-between font-semibold mb-1">
              <span className="text-slate-300">Maksimum Saatlik Ücret:</span>
              <span className="text-indigo-400 font-bold">{rateLimit} ₺ / saat</span>
            </div>
            <input
              type="range"
              min="300"
              max="1500"
              step="50"
              value={rateLimit}
              onChange={(e) => setRateLimit(parseInt(e.target.value))}
              className="w-full accent-indigo-500"
            />
          </div>

          {/* Min Rating Picker */}
          <div>
            <span className="block font-semibold text-slate-300 mb-2">Minimum Eğitmen Puanı:</span>
            <div className="grid grid-cols-4 gap-2">
              {[0, 4.0, 4.5, 4.8].map((score) => (
                <button
                  key={score}
                  onClick={() => setMinRating(score)}
                  className={`p-2 rounded-xl border text-center font-bold transition-all ${
                    minRating === score
                      ? 'bg-indigo-600 border-indigo-500 text-white shadow-md'
                      : 'bg-slate-900/60 border-slate-800 text-slate-400 hover:text-white'
                  }`}
                >
                  {score === 0 ? 'Tümü' : `${score}+ ⭐`}
                </button>
              ))}
            </div>
          </div>

          {/* Experience Filter */}
          <div>
            <span className="block font-semibold text-slate-300 mb-2">Minimum Tecrübe Yılı:</span>
            <div className="grid grid-cols-3 gap-2">
              {[0, 5, 10].map((exp) => (
                <button
                  key={exp}
                  onClick={() => setMinExperience(exp)}
                  className={`p-2 rounded-xl border text-center font-bold transition-all ${
                    minExperience === exp
                      ? 'bg-indigo-600 border-indigo-500 text-white shadow-md'
                      : 'bg-slate-900/60 border-slate-800 text-slate-400 hover:text-white'
                  }`}
                >
                  {exp === 0 ? 'Fark Etmez' : `${exp}+ Yıl`}
                </button>
              ))}
            </div>
          </div>

          {/* Verified Only Toggle */}
          <div className="flex items-center justify-between p-3.5 rounded-2xl bg-slate-900/60 border border-slate-800">
            <span className="font-semibold text-slate-200 flex items-center gap-1.5">
              <CheckCircle2 className="w-4 h-4 text-indigo-400" />
              <span>Sadece Doğrulanmış Mavi Tikli Eğitmenler</span>
            </span>
            <input
              type="checkbox"
              checked={verifiedOnly}
              onChange={(e) => setVerifiedOnly(e.target.checked)}
              className="w-4 h-4 accent-indigo-500 rounded cursor-pointer"
            />
          </div>

        </div>

        {/* Modal Footer Actions */}
        <div className="flex items-center justify-between pt-3 border-t border-slate-800">
          <button
            onClick={handleReset}
            className="px-4 py-2.5 rounded-xl bg-slate-900 text-slate-400 hover:text-white text-xs font-bold flex items-center gap-1"
          >
            <RotateCcw className="w-4 h-4" />
            <span>Temizle</span>
          </button>

          <button
            onClick={handleApply}
            className="px-6 py-2.5 rounded-xl bg-indigo-600 hover:bg-indigo-500 text-white font-bold text-xs shadow-md"
          >
            Filtreleri Uygula
          </button>
        </div>

      </div>
    </div>
  );
}
