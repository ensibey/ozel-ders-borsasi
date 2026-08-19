import React, { useState, useEffect } from 'react';
import { 
  X, CheckCircle2, ChevronRight, ChevronLeft, MapPin, DollarSign, 
  BookOpen, Calendar, Send, Sparkles, HelpCircle 
} from 'lucide-react';
import confetti from 'canvas-confetti';

export default function ServiceRequestWizardModal({ 
  isOpen, 
  onClose, 
  selectedCity, 
  selectedDistrict, 
  onRequestCreated 
}) {
  const [step, setStep] = useState(1);
  const [formData, setFormData] = useState({
    subject: 'Matematik & Geometri',
    level: 'YKS / Lise Prep',
    mode: 'Online Live', // 'Online Live' or 'Face to Face'
    city: selectedCity || 'İstanbul',
    district: selectedDistrict || 'Kadıköy',
    budgetRange: '500 - 800 ₺ / saat',
    frequency: 'Haftada 2 Seans',
    description: 'Haftada 2 saat birebir soru çözümü ve konu anlatımı arıyoruz.',
    studentName: 'Mert Yılmaz',
    phone: '0532 *** ** 11'
  });

  
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

  const handleNext = () => {
    if (step < 4) setStep(step + 1);
  };

  const handlePrev = () => {
    if (step > 1) setStep(step - 1);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    confetti({ particleCount: 100, spread: 70 });
    
    onRequestCreated({
      id: 'req_' + Date.now(),
      ...formData,
      status: 'Teklifler Bekleniyor',
      proposalsCount: 0,
      createdAt: 'Az önce',
      bids: []
    });

    setStep(1);
    onClose();
  };

  return (
    <div onClick={onClose} className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/85 backdrop-blur-md animate-fadeIn">
      <div onClick={(e) => e.stopPropagation()} className="glass-panel w-full max-w-xl rounded-3xl p-6 sm:p-8 border border-emerald-500/30 shadow-2xl relative space-y-6">
        
        {/* Header */}
        <div className="flex items-center justify-between pb-3 border-b border-slate-800">
          <div className="flex items-center space-x-2">
            <div className="w-8 h-8 rounded-xl bg-emerald-500/20 text-emerald-400 flex items-center justify-center font-bold">
              <Sparkles className="w-4 h-4" />
            </div>
            <div>
              <h2 className="text-base font-bold text-white">Özel Ders Talebi Oluştur (Teklif Al)</h2>
              <p className="text-xs text-slate-400">İhtiyacını anlat, bölgendeki eğitmenler teklif versin.</p>
            </div>
          </div>
          <button onClick={onClose} className="p-1.5 rounded-xl bg-slate-900 text-slate-400 hover:text-white">
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Step Progress Bar */}
        <div className="space-y-1">
          <div className="flex justify-between text-xs font-bold text-slate-400">
            <span>Adım {step} / 4</span>
            <span className="text-emerald-400 font-semibold">
              {step === 1 && 'Ders & Seviye'}
              {step === 2 && 'Ders Modu & Konum'}
              {step === 3 && 'Bütçe & Sıklık'}
              {step === 4 && 'Detaylar & Yayınla'}
            </span>
          </div>
          <div className="w-full bg-slate-900 rounded-full h-2 overflow-hidden p-0.5 border border-slate-800">
            <div
              className="bg-gradient-to-r from-emerald-500 to-teal-500 h-full rounded-full transition-all duration-300"
              style={{ width: `${(step / 4) * 100}%` }}
            />
          </div>
        </div>

        {/* STEP 1: Ders & Seviye */}
        {step === 1 && (
          <div className="space-y-4 animate-fadeIn">
            <div>
              <label className="block text-xs font-semibold text-slate-300 mb-1.5">Hangi Dersten Özel Ders İstiyorsunuz?</label>
              <select
                value={formData.subject}
                onChange={(e) => setFormData({ ...formData, subject: e.target.value })}
                className="w-full glass-input rounded-xl px-3.5 py-2.5 text-xs text-white"
              >
                <option value="Matematik & Geometri" className="bg-slate-900">Matematik & Geometri</option>
                <option value="Fizik & Kimya" className="bg-slate-900">Fizik & Kimya</option>
                <option value="İngilizce / Yabancı Dil" className="bg-slate-900">İngilizce / Yabancı Dil</option>
                <option value="Biyoloji & Fen Bilimleri" className="bg-slate-900">Biyoloji & Fen Bilimleri</option>
                <option value="Yazılım & Kodlama" className="bg-slate-900">Yazılım & Kodlama</option>
                <option value="Piyano / Enstrüman" className="bg-slate-900">Piyano / Enstrüman</option>
              </select>
            </div>

            <div>
              <label className="block text-xs font-semibold text-slate-300 mb-1.5">Öğrenci Seviyesi</label>
              <div className="grid grid-cols-2 gap-2 text-xs">
                {['İlkokul / Ortaokul', 'Lise Okul Takviye', 'YKS (TYT-AYT)', 'LGS Hazırlık', 'KPSS / ALES', 'Üniversite / Yetişkin'].map((lvl) => (
                  <button
                    type="button"
                    key={lvl}
                    onClick={() => setFormData({ ...formData, level: lvl })}
                    className={`p-3 rounded-xl border text-left font-bold transition-all ${
                      formData.level === lvl
                        ? 'bg-emerald-600/30 border-emerald-500 text-emerald-300'
                        : 'bg-slate-900/60 border-slate-800 text-slate-400 hover:text-white'
                    }`}
                  >
                    {lvl}
                  </button>
                ))}
              </div>
            </div>
          </div>
        )}

        {/* STEP 2: Ders Modu & Konum */}
        {step === 2 && (
          <div className="space-y-4 animate-fadeIn">
            <div>
              <label className="block text-xs font-semibold text-slate-300 mb-1.5">Ders Nerede / Nasıl Yapılsın?</label>
              <div className="grid grid-cols-2 gap-3">
                <button
                  type="button"
                  onClick={() => setFormData({ ...formData, mode: 'Online Live' })}
                  className={`p-4 rounded-2xl border text-center font-bold transition-all space-y-1 ${
                    formData.mode === 'Online Live'
                      ? 'bg-emerald-600/30 border-emerald-500 text-emerald-300'
                      : 'bg-slate-900/60 border-slate-800 text-slate-400'
                  }`}
                >
                  <div className="text-base">💻 Canlı Online Ders</div>
                  <div className="text-[11px] font-normal text-slate-400">Sanal sınıfta görüntülü & beyaz tahtalı</div>
                </button>

                <button
                  type="button"
                  onClick={() => setFormData({ ...formData, mode: 'Face to Face' })}
                  className={`p-4 rounded-2xl border text-center font-bold transition-all space-y-1 ${
                    formData.mode === 'Face to Face'
                      ? 'bg-emerald-600/30 border-emerald-500 text-emerald-300'
                      : 'bg-slate-900/60 border-slate-800 text-slate-400'
                  }`}
                >
                  <div className="text-base">🏠 Yüz Yüze (Evde/Kütüphane)</div>
                  <div className="text-[11px] font-normal text-slate-400">Eğitmen adresinize gelsin</div>
                </button>
              </div>
            </div>

            <div className="grid grid-cols-2 gap-3">
              <div>
                <label className="block text-xs font-semibold text-slate-300 mb-1">Şehir</label>
                <input
                  type="text"
                  value={formData.city}
                  onChange={(e) => setFormData({ ...formData, city: e.target.value })}
                  className="w-full glass-input rounded-xl px-3.5 py-2.5 text-xs text-white"
                />
              </div>
              <div>
                <label className="block text-xs font-semibold text-slate-300 mb-1">İlçe</label>
                <input
                  type="text"
                  value={formData.district}
                  onChange={(e) => setFormData({ ...formData, district: e.target.value })}
                  className="w-full glass-input rounded-xl px-3.5 py-2.5 text-xs text-white"
                />
              </div>
            </div>
          </div>
        )}

        {/* STEP 3: Bütçe & Sıklık */}
        {step === 3 && (
          <div className="space-y-4 animate-fadeIn">
            <div>
              <label className="block text-xs font-semibold text-slate-300 mb-1.5">Saatlik Bütçe Aralığınız</label>
              <div className="grid grid-cols-3 gap-2 text-xs">
                {['300 - 500 ₺ / saat', '500 - 800 ₺ / saat', '800 - 1200 ₺ / saat'].map((b) => (
                  <button
                    type="button"
                    key={b}
                    onClick={() => setFormData({ ...formData, budgetRange: b })}
                    className={`p-3 rounded-xl border text-center font-bold transition-all ${
                      formData.budgetRange === b
                        ? 'bg-emerald-600/30 border-emerald-500 text-emerald-300'
                        : 'bg-slate-900/60 border-slate-800 text-slate-400'
                    }`}
                  >
                    {b}
                  </button>
                ))}
              </div>
            </div>

            <div>
              <label className="block text-xs font-semibold text-slate-300 mb-1.5">Ders Sıklığı</label>
              <select
                value={formData.frequency}
                onChange={(e) => setFormData({ ...formData, frequency: e.target.value })}
                className="w-full glass-input rounded-xl px-3.5 py-2.5 text-xs text-white"
              >
                <option value="Haftada 1 Seans" className="bg-slate-900">Haftada 1 Seans (2 Saat)</option>
                <option value="Haftada 2 Seans" className="bg-slate-900">Haftada 2 Seans (4 Saat)</option>
                <option value="Haftada 3+ Seans" className="bg-slate-900">Haftada 3+ Seans (Yoğun Kamp)</option>
                <option value="Tek Seferlik Soru Çözümü" className="bg-slate-900">Tek Seferlik Sınav Öncesi Takviye</option>
              </select>
            </div>
          </div>
        )}

        {/* STEP 4: Detaylar & Yayınla */}
        {step === 4 && (
          <div className="space-y-4 animate-fadeIn">
            <div>
              <label className="block text-xs font-semibold text-slate-300 mb-1.5">Eğitmenlere Notunuz & Özel İstekleriniz</label>
              <textarea
                rows={3}
                value={formData.description}
                onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                placeholder="Örn: Özellikle yeni nesil matematik sorularına hakim, tecrübeli kadın eğitmen arıyoruz."
                className="w-full glass-input rounded-xl p-3 text-xs text-white"
              />
            </div>

            <div className="p-3.5 rounded-2xl bg-slate-900/80 border border-slate-800 text-xs text-slate-300 space-y-1">
              <div className="font-bold text-emerald-400">📋 Talep Özeti:</div>
              <div>{formData.subject} • {formData.level}</div>
              <div>{formData.city}, {formData.district} ({formData.mode})</div>
              <div>Bütçe: <span className="font-bold text-white">{formData.budgetRange}</span></div>
            </div>
          </div>
        )}

        {/* Bottom Actions Bar */}
        <div className="flex items-center justify-between pt-3 border-t border-slate-800">
          {step > 1 ? (
            <button
              onClick={handlePrev}
              className="px-4 py-2.5 rounded-xl bg-slate-900 text-slate-300 hover:text-white text-xs font-bold flex items-center gap-1"
            >
              <ChevronLeft className="w-4 h-4" />
              <span>Geri</span>
            </button>
          ) : <div />}

          {step < 4 ? (
            <button
              onClick={handleNext}
              className="px-6 py-2.5 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white font-bold text-xs shadow-md flex items-center gap-1"
            >
              <span>Devam Et</span>
              <ChevronRight className="w-4 h-4" />
            </button>
          ) : (
            <button
              onClick={handleSubmit}
              className="px-6 py-2.5 rounded-xl bg-gradient-to-r from-emerald-600 to-teal-600 hover:from-emerald-500 hover:to-teal-500 text-white font-extrabold text-xs shadow-xl shadow-emerald-600/30 flex items-center gap-1.5"
            >
              <Send className="w-4 h-4" />
              <span>Talebi Yayınla & Teklif Al</span>
            </button>
          )}
        </div>

      </div>
    </div>
  );
}
