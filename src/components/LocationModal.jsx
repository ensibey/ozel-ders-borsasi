import React, { useState, useEffect } from 'react';
import { MapPin, Check, AlertCircle, Building2, ChevronRight, X } from 'lucide-react';
import { CITIES_AND_DISTRICTS } from '../data/mockData';

export default function LocationModal({ isOpen, onClose, selectedCity, selectedDistrict, onSaveLocation }) {
  const [city, setCity] = useState(selectedCity || 'İstanbul');
  const [district, setDistrict] = useState(selectedDistrict || '');
  const [error, setError] = useState('');

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

  const handleSave = () => {
    if (!city) {
      setError('Lütfen bir İl seçiniz (Zorunlu)');
      return;
    }
    setError('');
    onSaveLocation(city, district);
    onClose();
  };

  const availableDistricts = CITIES_AND_DISTRICTS[city] || [];

  return (
    <div 
      onClick={onClose}
      className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 bg-slate-950/80 backdrop-blur-md animate-fadeIn"
    >
      <div 
        onClick={(e) => e.stopPropagation()}
        className="glass-panel w-full max-w-lg max-h-[92vh] overflow-y-auto rounded-2xl p-5 sm:p-8 border border-indigo-500/20 shadow-2xl relative custom-scrollbar"
      >
        <button 
          onClick={onClose} 
          className="absolute top-5 right-5 p-1.5 rounded-xl bg-slate-900 border border-slate-800 text-slate-400 hover:text-white"
        >
          <X className="w-5 h-5" />
        </button>

        <div className="flex items-center space-x-3 mb-6">
          <div className="w-12 h-12 rounded-xl bg-gradient-to-tr from-indigo-600 to-violet-600 flex items-center justify-center shadow-lg shadow-indigo-500/30">
            <MapPin className="w-6 h-6 text-white animate-bounce" />
          </div>
          <div>
            <h2 className="text-xl font-bold text-white">Konumunuzu Seçin</h2>
            <p className="text-xs text-slate-400">
              Giriş alanında <span className="text-indigo-400 font-semibold">İl seçimi zorunlu</span>, ilçe ise isteğe bağlıdır.
            </p>
          </div>
        </div>

        {error && (
          <div className="mb-4 p-3 rounded-lg bg-rose-500/10 border border-rose-500/30 text-rose-400 text-sm flex items-center gap-2">
            <AlertCircle className="w-4 h-4 shrink-0" />
            <span>{error}</span>
          </div>
        )}

        <div className="space-y-5">
          {/* İl Seçimi (Zorunlu) */}
          <div>
            <label className="block text-xs font-semibold text-slate-300 uppercase tracking-wider mb-2 flex items-center gap-1.5">
              <span>Şehir / İl</span>
              <span className="text-rose-400 font-bold text-sm">*</span>
            </label>
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-2 max-h-48 overflow-y-auto p-1 custom-scrollbar">
              {Object.keys(CITIES_AND_DISTRICTS).map((cityName) => (
                <button
                  key={cityName}
                  type="button"
                  onClick={() => {
                    setCity(cityName);
                    setDistrict('');
                    setError('');
                  }}
                  className={`p-2.5 text-sm rounded-xl border text-left flex items-center justify-between transition-all ${
                    city === cityName
                      ? 'bg-indigo-600/30 border-indigo-500 text-white font-semibold shadow-md shadow-indigo-500/10'
                      : 'bg-slate-900/60 border-slate-800 text-slate-300 hover:border-slate-700 hover:bg-slate-800/50'
                  }`}
                >
                  <span className="truncate">{cityName}</span>
                  {city === cityName && <Check className="w-4 h-4 text-indigo-400 shrink-0" />}
                </button>
              ))}
            </div>
          </div>

          {/* İlçe Seçimi (İsteğe Bağlı) */}
          <div>
            <label className="block text-xs font-semibold text-slate-300 uppercase tracking-wider mb-2 flex items-center justify-between">
              <span>İlçe Seçimi</span>
              <span className="text-slate-400 text-[11px] font-normal">(İsteğe Bağlı)</span>
            </label>
            <select
              value={district}
              onChange={(e) => setDistrict(e.target.value)}
              className="w-full glass-input rounded-xl px-4 py-3 text-sm text-white focus:outline-none"
            >
              <option value="" className="bg-slate-900 text-slate-400">Tüm İlçeler (Fark Etmez)</option>
              {availableDistricts.map((d) => (
                <option key={d} value={d} className="bg-slate-900 text-white">
                  {d}
                </option>
              ))}
            </select>
          </div>
        </div>

        <div className="mt-8 flex items-center justify-end space-x-3 pt-4 border-t border-slate-800">
          <button
            type="button"
            onClick={handleSave}
            className="w-full py-3 px-6 rounded-xl bg-gradient-to-r from-indigo-600 via-indigo-500 to-violet-600 text-white font-semibold text-sm shadow-lg shadow-indigo-500/25 hover:shadow-indigo-500/40 hover:scale-[1.02] transition-all flex items-center justify-center gap-2"
          >
            <span>Konumu Onayla ve Keşfet</span>
            <ChevronRight className="w-4 h-4" />
          </button>
        </div>
      </div>
    </div>
  );
}
