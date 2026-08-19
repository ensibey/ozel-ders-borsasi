import React, { useState, useEffect } from 'react';
import { X, Award, CheckCircle2, DollarSign, Share2, Sparkles, Send } from 'lucide-react';
import confetti from 'canvas-confetti';

export default function AffiliateModal({ isOpen, onClose }) {
  const [name, setName] = useState('');
  const [channel, setChannel] = useState('');
  const [model, setModel] = useState('%15 Yüzdelik Komisyon Anlaşması');
  const [notes, setNotes] = useState('');
  const [submitted, setSubmitted] = useState(false);

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

  const handleSubmit = (e) => {
    e.preventDefault();
    confetti({ particleCount: 90, spread: 60 });
    setSubmitted(true);
    setTimeout(() => {
      setSubmitted(false);
      onClose();
    }, 2200);
  };

  return (
    <div 
      onClick={onClose}
      className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/80 backdrop-blur-md animate-fadeIn"
    >
      <div 
        onClick={(e) => e.stopPropagation()}
        className="glass-panel w-full max-w-lg rounded-3xl p-6 sm:p-8 border border-amber-500/30 shadow-2xl relative"
      >
        
        <button onClick={onClose} className="absolute top-5 right-5 p-2 rounded-xl bg-slate-900 border border-slate-800 text-slate-400 hover:text-white">
          <X className="w-5 h-5" />
        </button>

        {submitted ? (
          <div className="py-8 text-center space-y-4 animate-fadeIn">
            <div className="w-16 h-16 rounded-full bg-emerald-500/20 border-2 border-emerald-500 text-emerald-400 flex items-center justify-center mx-auto mb-2 animate-bounce">
              <CheckCircle2 className="w-8 h-8" />
            </div>
            <h3 className="text-xl font-bold text-white">Başvurunuz Alındı!</h3>
            <p className="text-xs text-slate-300">
              İçerik üreticisi / Öğretmen komisyon ortaklığı ekibimiz başvurunuzu inceleyip size özel indirim kuponu ve yüzdelik komisyon takip paneli bilgilerinizi e-posta adresinize iletecektir.
            </p>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="flex items-center space-x-3 mb-2">
              <div className="w-12 h-12 rounded-2xl bg-amber-500/20 text-amber-400 flex items-center justify-center border border-amber-500/30">
                <Award className="w-6 h-6" />
              </div>
              <div>
                <h2 className="text-lg font-bold text-white">İçerik Çekimi & Tanıtım Anlaşması</h2>
                <p className="text-xs text-amber-300 font-medium">Öğretmenler & İçerik Üreticileri İçin Yüzdelik Komisyon</p>
              </div>
            </div>

            <div className="p-3.5 rounded-2xl bg-slate-900/60 border border-slate-800 text-xs text-slate-300 leading-relaxed">
              "Bu sistemi duyurmak için içerik çekimi yapan kişilerle anlaşılabilir. Öğretmenlere yüzdelik/komisyon hesabı anlaşma teklif edilebilir."
            </div>

            <div>
              <label className="block text-xs font-semibold text-slate-300 mb-1">Ad Soyad / Kanal Adı</label>
              <input
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="Örn: Derece İsteyen Öğrenci (YouTube / Instagram)"
                className="w-full glass-input rounded-xl px-3.5 py-2.5 text-xs text-white"
                required
              />
            </div>

            <div>
              <label className="block text-xs font-semibold text-slate-300 mb-1">Kanal / Sosyal Medya Linki veya Eğitmen Branşı</label>
              <input
                type="text"
                value={channel}
                onChange={(e) => setChannel(e.target.value)}
                placeholder="https://youtube.com/@dersborsasi"
                className="w-full glass-input rounded-xl px-3.5 py-2.5 text-xs text-white"
                required
              />
            </div>

            <div>
              <label className="block text-xs font-semibold text-slate-300 mb-1">Anlaşma & Komisyon Modeli</label>
              <select
                value={model}
                onChange={(e) => setModel(e.target.value)}
                className="w-full glass-input rounded-xl px-3.5 py-2.5 text-xs text-white"
              >
                <option value="%15 Yüzdelik Komisyon Anlaşması" className="bg-slate-900">%15 Her Satılan Dersten / Kitaptan Komisyon Payı</option>
                <option value="Özel İndirim Kodu & Puan Bonusu" className="bg-slate-900">Özel İndirim Kodu & Borsa Puan Bonusu</option>
                <option value="Sponsorlu Video İnceleme Anlaşması" className="bg-slate-900">Sponsorlu Video İnceleme Anlaşması</option>
              </select>
            </div>

            <div>
              <label className="block text-xs font-semibold text-slate-300 mb-1">Ek Notlar / Teklifiniz</label>
              <textarea
                rows={3}
                value={notes}
                onChange={(e) => setNotes(e.target.value)}
                placeholder="Takipçi kitleniz veya içerik planınız hakkında kısa bilgi..."
                className="w-full glass-input rounded-xl px-3.5 py-2.5 text-xs text-white"
              />
            </div>

            <button
              type="submit"
              className="w-full py-3.5 rounded-xl bg-gradient-to-r from-amber-500 to-orange-500 hover:from-amber-400 hover:to-orange-400 text-slate-950 font-extrabold text-xs shadow-lg shadow-amber-500/20 flex items-center justify-center gap-2"
            >
              <Send className="w-4 h-4" />
              <span>Komisyon Ortaklığı Başvurusunu Gönder</span>
            </button>
          </form>
        )}

      </div>
    </div>
  );
}
