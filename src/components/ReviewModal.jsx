import React, { useState, useEffect } from 'react';
import { X, Star, CheckCircle2, Send, MessageSquare } from 'lucide-react';
import confetti from 'canvas-confetti';

export default function ReviewModal({ isOpen, onClose, teacher, onSubmitReview }) {
  const [rating, setRating] = useState(5);
  const [comment, setComment] = useState('');
  const [hoverRating, setHoverRating] = useState(0);
  const [submitted, setSubmitted] = useState(false);

  if (!isOpen || !teacher) return null;

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!comment.trim()) return;

    confetti({ particleCount: 80, spread: 60 });
    setSubmitted(true);

    setTimeout(() => {
      onSubmitReview(teacher.id, {
        rating,
        comment,
        studentName: 'Mert Yılmaz',
        date: 'Bugün'
      });
      setSubmitted(false);
      setComment('');
      onClose();
    }, 1800);
  };

  return (
    <div onClick={onClose} className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/85 backdrop-blur-md animate-fadeIn">
      <div onClick={(e) => e.stopPropagation()} className="glass-panel w-full max-w-md rounded-3xl p-6 border border-amber-500/30 shadow-2xl relative space-y-4">
        
        <button onClick={onClose} className="absolute top-5 right-5 p-2 rounded-xl bg-slate-900 border border-slate-800 text-slate-400 hover:text-white">
          <X className="w-5 h-5" />
        </button>

        {submitted ? (
          <div className="py-8 text-center space-y-3 animate-fadeIn">
            <div className="w-14 h-14 rounded-full bg-emerald-500/20 border-2 border-emerald-500 text-emerald-400 flex items-center justify-center mx-auto mb-2 animate-bounce">
              <CheckCircle2 className="w-7 h-7" />
            </div>
            <h3 className="text-lg font-bold text-white">Değerlendirmeniz Yayınlandı!</h3>
            <p className="text-xs text-slate-300">
              Geri bildiriminiz için teşekkürler! Eğitmen profili ve veli takip paneline aktarıldı.
            </p>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="flex items-center space-x-3">
              <img src={teacher.avatar} alt={teacher.name} className="w-12 h-12 rounded-xl object-cover border border-amber-500/40" />
              <div>
                <h3 className="text-sm font-bold text-white">{teacher.name}</h3>
                <p className="text-xs text-slate-400">{teacher.subject} • {teacher.city}</p>
              </div>
            </div>

            {/* Star Picker */}
            <div className="bg-slate-900/80 p-4 rounded-2xl border border-slate-800 text-center space-y-2">
              <span className="text-xs text-slate-300 font-semibold block">Eğitmene Puanınız:</span>
              <div className="flex items-center justify-center space-x-2">
                {[1, 2, 3, 4, 5].map((star) => (
                  <button
                    key={star}
                    type="button"
                    onClick={() => setRating(star)}
                    onMouseEnter={() => setHoverRating(star)}
                    onMouseLeave={() => setHoverRating(0)}
                    className="p-1 transition-transform hover:scale-125"
                  >
                    <Star
                      className={`w-7 h-7 ${
                        (hoverRating || rating) >= star
                          ? 'fill-amber-400 text-amber-400'
                          : 'text-slate-600'
                      }`}
                    />
                  </button>
                ))}
              </div>
            </div>

            <div>
              <label className="block text-xs font-semibold text-slate-300 mb-1">Yorumunuz & Ders Değerlendirmesi</label>
              <textarea
                rows={3}
                value={comment}
                onChange={(e) => setComment(e.target.value)}
                placeholder="Ders anlatım metodu, konu hakimiyeti ve iletişimi hakkında detay yazabilirsiniz..."
                className="w-full glass-input rounded-xl px-3 py-2 text-xs text-white"
                required
              />
            </div>

            <button
              type="submit"
              className="w-full py-3 rounded-xl bg-gradient-to-r from-amber-500 to-orange-500 hover:from-amber-400 hover:to-orange-400 text-slate-950 font-extrabold text-xs shadow-lg shadow-amber-500/20 flex items-center justify-center gap-2"
            >
              <Send className="w-4 h-4" />
              <span>Değerlendirmeyi Yayınla (+50 Borsa Puanı)</span>
            </button>
          </form>
        )}

      </div>
    </div>
  );
}
