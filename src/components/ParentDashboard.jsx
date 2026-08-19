import React, { useState } from 'react';
import { ShieldCheck, Star, Calendar, CreditCard, MessageSquare, Award, AlertCircle, CheckCircle2, PhoneCall, Send } from 'lucide-react';
import confetti from 'canvas-confetti';

export default function ParentDashboard({ feedbacks, schedule, selectedCity }) {
  const [selectedStudent, setSelectedStudent] = useState('Mert Yılmaz (11. Sınıf - YKS Sayısal)');
  const [parentPhone, setParentPhone] = useState('0532 998 44 11');
  const [smsSent, setSmsSent] = useState(false);

  const handleSendSmsTest = (e) => {
    e.preventDefault();
    confetti({ particleCount: 70, spread: 50 });
    setSmsSent(true);
    setTimeout(() => setSmsSent(false), 3000);
  };

  return (
    <div className="space-y-8 animate-fadeIn">
      
      {/* Parent Welcome Header */}
      <div className="glass-panel p-6 sm:p-8 rounded-3xl border border-indigo-500/30 bg-gradient-to-r from-slate-900 via-indigo-950/40 to-slate-900 flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
        <div className="flex items-center space-x-4">
          <div className="w-16 h-16 rounded-2xl bg-indigo-600/30 text-indigo-400 flex items-center justify-center border border-indigo-500/40 shadow-lg">
            <ShieldCheck className="w-9 h-9" />
          </div>
          <div>
            <span className="px-2.5 py-0.5 rounded-full bg-emerald-500/20 text-emerald-300 text-[11px] font-bold border border-emerald-500/30">
              Veli Takip Portalı
            </span>
            <div className="flex items-center gap-2 mt-1">
              <span className="text-xs text-slate-300">Takip Edilen Öğrenciniz:</span>
              <select
                value={selectedStudent}
                onChange={(e) => setSelectedStudent(e.target.value)}
                className="bg-slate-900 text-indigo-300 font-extrabold text-xs rounded-lg px-2.5 py-1 border border-indigo-500/40 focus:outline-none"
              >
                <option value="Mert Yılmaz (11. Sınıf - YKS Sayısal)">Mert Yılmaz (11. Sınıf - YKS Sayısal)</option>
                <option value="Zeynep Yılmaz (8. Sınıf - LGS)">Zeynep Yılmaz (8. Sınıf - LGS)</option>
              </select>
            </div>
          </div>
        </div>

        <div className="flex items-center gap-3 bg-slate-900/80 p-4 rounded-2xl border border-slate-800 text-xs">
          <div className="text-center px-3 border-r border-slate-800">
            <div className="text-slate-400">Genel Katılım</div>
            <div className="text-lg font-extrabold text-emerald-400">%98</div>
          </div>
          <div className="text-center px-3">
            <div className="text-slate-400">Ortalama Eğitmen Notu</div>
            <div className="text-lg font-extrabold text-amber-400">5.0 / 5</div>
          </div>
        </div>
      </div>

      {/* SMS & WhatsApp Notification Simulator */}
      <div className="glass-panel p-6 rounded-3xl border border-emerald-500/30 space-y-4">
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
          <div>
            <h2 className="text-base font-bold text-white flex items-center gap-2">
              <PhoneCall className="w-5 h-5 text-emerald-400" />
              <span>Veli SMS / WhatsApp Bilgilendirme Servisi</span>
            </h2>
            <p className="text-xs text-slate-300">Öğrenci derse girdiğinde veya eğitmen not girdiğinde telefonunuza anlık mesaj iletilir.</p>
          </div>

          {smsSent && (
            <span className="px-3 py-1.5 rounded-xl bg-emerald-600 text-white text-xs font-bold animate-bounce flex items-center gap-1">
              <CheckCircle2 className="w-4 h-4" />
              <span>SMS Gönderildi!</span>
            </span>
          )}
        </div>

        <form onSubmit={handleSendSmsTest} className="flex flex-wrap items-center gap-2 max-w-xl">
          <input
            type="text"
            value={parentPhone}
            onChange={(e) => setParentPhone(e.target.value)}
            placeholder="Veli Telefon Numarası"
            className="flex-1 glass-input rounded-xl px-3.5 py-2 text-xs text-white min-w-[180px]"
          />
          <button
            type="submit"
            className="px-4 py-2 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white text-xs font-bold flex items-center gap-1.5 shadow-md"
          >
            <Send className="w-4 h-4" />
            <span>Test SMS Gönder</span>
          </button>
          <a
            href={`https://api.whatsapp.com/send?text=${encodeURIComponent('Sayın Veli, Mert Yılmaz bugün Özel Ders Borsası üzerinden 2 saatlik canlı matematik etüdüne katılmıştır. Katılım Oranı: %98')}`}
            target="_blank"
            rel="noopener noreferrer"
            className="px-4 py-2 rounded-xl bg-teal-600 hover:bg-teal-500 text-white text-xs font-bold flex items-center gap-1.5 shadow-md"
          >
            <span>📱 WhatsApp Raporu Test Et</span>
          </a>
        </form>
      </div>

      {/* Tutor Feedback & Progress Reports */}
      <div className="space-y-4">
        <h2 className="text-lg font-bold text-white flex items-center gap-2">
          <MessageSquare className="w-5 h-5 text-indigo-400" />
          <span>Eğitmenlerin Veli Bilgilendirme Raporları</span>
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {feedbacks.map((item) => (
            <div key={item.id} className="glass-card p-5 rounded-2xl border border-slate-800 space-y-3">
              <div className="flex items-center justify-between">
                <div>
                  <h3 className="text-sm font-bold text-white">{item.tutorName}</h3>
                  <div className="text-[11px] text-indigo-400">{item.studentName}</div>
                </div>
                <div className="flex items-center text-amber-400 text-xs font-bold bg-amber-400/10 px-2.5 py-1 rounded-lg border border-amber-400/20">
                  <Star className="w-3.5 h-3.5 fill-amber-400 mr-1" />
                  <span>{item.rating}.0</span>
                </div>
              </div>

              <p className="text-xs text-slate-300 leading-relaxed bg-slate-900/50 p-3 rounded-xl border border-slate-800">
                "{item.comment}"
              </p>

              <div className="flex items-center justify-between text-[11px] text-slate-400 pt-2 border-t border-slate-800">
                <span>Rapor Tarihi: {item.date}</span>
                <span className="text-emerald-400 font-semibold">● {item.status}</span>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Upcoming Lessons Attendance Tracker */}
      <div className="glass-panel p-6 rounded-3xl border border-slate-800 space-y-4">
        <h2 className="text-base font-bold text-white flex items-center gap-2">
          <Calendar className="w-5 h-5 text-indigo-400" />
          <span>Öğrencinin Gelecek Canlı Ders Saatleri</span>
        </h2>

        <div className="space-y-2">
          {schedule.slice(0, 3).map((item, idx) => (
            <div key={idx} className="p-3.5 rounded-xl bg-slate-900/60 border border-slate-800 flex items-center justify-between text-xs">
              <div className="flex items-center space-x-3">
                <CheckCircle2 className="w-4 h-4 text-emerald-400" />
                <div>
                  <span className="font-bold text-white">{item.subject}</span>
                  <span className="text-slate-400 block text-[11px]">{item.day} • {item.time}</span>
                </div>
              </div>
              <span className="px-2.5 py-1 rounded-md bg-indigo-500/20 text-indigo-300 font-medium">
                {item.mode}
              </span>
            </div>
          ))}
        </div>
      </div>

    </div>
  );
}
