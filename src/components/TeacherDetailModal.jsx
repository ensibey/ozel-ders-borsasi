import React, { useState, useEffect } from 'react';
import { 
  X, Star, MapPin, Calendar, Award, BookOpen, Video, 
  CheckCircle2, Share2, Sparkles, MessageSquare, Clock, Send, Crown 
} from 'lucide-react';
import confetti from 'canvas-confetti';
import { getTeacherLeague, getNextLeagueProgress } from '../utils/leagueSystem';

export default function TeacherDetailModal({ teacher, isOpen, onClose, onBookLesson }) {
  const [selectedSlot, setSelectedSlot] = useState('');
  const [bookingSuccess, setBookingSuccess] = useState(false);
  const [activeTab, setActiveTab] = useState('cv'); // 'cv', 'notes', 'schedule'
  const [newNote, setNewNote] = useState('');

  if (!isOpen || !teacher) return null;

  const handleBook = (slot) => {
    const slotToBook = slot || selectedSlot;
    if (!slotToBook) return;
    
    confetti({
      particleCount: 80,
      spread: 60,
      origin: { y: 0.6 }
    });

    setBookingSuccess(true);
    setTimeout(() => {
      onBookLesson(teacher, slotToBook);
      setBookingSuccess(false);
      onClose();
    }, 1800);
  };

  return (
    <div onClick={onClose} className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/80 backdrop-blur-md animate-fadeIn">
      <div onClick={(e) => e.stopPropagation()} className="glass-panel w-full max-w-3xl rounded-3xl p-6 sm:p-8 border border-indigo-500/30 shadow-2xl relative max-h-[90vh] overflow-y-auto custom-scrollbar">
        
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-5 right-5 p-2 rounded-xl bg-slate-900/80 border border-slate-800 text-slate-400 hover:text-white hover:bg-slate-800 transition-all z-10"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Success Alert Overlay */}
        {bookingSuccess && (
          <div className="absolute inset-0 z-20 bg-slate-950/90 backdrop-blur-md rounded-3xl flex flex-col items-center justify-center p-6 text-center animate-fadeIn">
            <div className="w-16 h-16 rounded-full bg-emerald-500/20 border-2 border-emerald-500 text-emerald-400 flex items-center justify-center mb-4 shadow-lg shadow-emerald-500/30 animate-bounce">
              <CheckCircle2 className="w-8 h-8" />
            </div>
            <h3 className="text-2xl font-extrabold text-white mb-2">Ders Randevusu Alındı!</h3>
            <p className="text-sm text-slate-300 max-w-md">
              <span className="text-indigo-400 font-semibold">{teacher.name}</span> ile <span className="text-emerald-400 font-semibold">{selectedSlot}</span> tarihindeki canlı dersiniz onaylandı. Takviminizde ve Öğrenci Paneli'nde görüntüleyebilirsiniz.
            </p>
          </div>
        )}

        {/* Teacher Header Banner */}
        <div className="flex flex-col sm:flex-row items-start sm:items-center space-y-4 sm:space-y-0 sm:space-x-6 pb-6 border-b border-slate-800">
          <img
            src={teacher.avatar}
            alt={teacher.name}
            className="w-24 h-24 rounded-2xl object-cover border-2 border-indigo-500/40 shadow-xl"
          />
          
          <div className="flex-1">
            <div className="flex items-center space-x-2">
              <h2 className="text-2xl font-bold text-white">{teacher.name}</h2>
              {teacher.verified && (
                <CheckCircle2 className="w-5 h-5 text-indigo-400 fill-slate-950" />
              )}
            </div>
            <p className="text-sm text-slate-300 font-medium">{teacher.title}</p>

            <div className="flex flex-wrap items-center gap-3 mt-2 text-xs">
              <span className="flex items-center text-amber-400 font-bold bg-amber-400/10 px-2.5 py-1 rounded-lg border border-amber-400/20">
                <Star className="w-4 h-4 fill-amber-400 mr-1" />
                <span>{teacher.rating} Puan</span>
                <span className="text-slate-400 font-normal ml-1">({teacher.reviewCount} Değerlendirme)</span>
              </span>

              <span className="flex items-center text-slate-300">
                <MapPin className="w-4 h-4 text-indigo-400 mr-1" />
                <span>{teacher.city}, {teacher.district}</span>
              </span>

              <span className="flex items-center text-indigo-300 bg-indigo-500/20 px-2.5 py-1 rounded-lg border border-indigo-500/30">
                <Award className="w-4 h-4 mr-1" />
                <span>{teacher.experienceYears} Yıl Deneyim</span>
              </span>
            </div>
          </div>

          <div className="bg-slate-900/80 p-4 rounded-2xl border border-slate-800 text-center w-full sm:w-auto shrink-0">
            <div className="text-xs text-slate-400 font-medium">Birebir Ders Ücreti</div>
            <div className="text-2xl font-extrabold text-white my-0.5">
              {teacher.hourlyRate} <span className="text-xs text-indigo-400">₺ / saat</span>
            </div>
            <div className="text-[11px] text-emerald-400 font-semibold flex items-center justify-center gap-1">
              <Video className="w-3 h-3" />
              <span>Ders Sonu Kayıt Video Hediye</span>
            </div>
          </div>
        </div>

        {/* Modal Navigation Tabs */}
        <div className="flex items-center space-x-2 my-6 border-b border-slate-800 pb-3 text-xs font-bold">
          <button
            onClick={() => setActiveTab('cv')}
            className={`px-4 py-2 rounded-xl flex items-center gap-2 transition-all ${
              activeTab === 'cv'
                ? 'bg-indigo-600 text-white shadow-md shadow-indigo-500/20'
                : 'text-slate-400 hover:text-white hover:bg-slate-900'
            }`}
          >
            <BookOpen className="w-4 h-4" />
            <span>CV & Biyografi</span>
          </button>

          <button
            onClick={() => setActiveTab('notes')}
            className={`px-4 py-2 rounded-xl flex items-center gap-2 transition-all ${
              activeTab === 'notes'
                ? 'bg-indigo-600 text-white shadow-md shadow-indigo-500/20'
                : 'text-slate-400 hover:text-white hover:bg-slate-900'
            }`}
          >
            <MessageSquare className="w-4 h-4" />
            <span>Paylaşımlar & Küçük Notlar ({(teacher.notes || []).length})</span>
          </button>

          <button
            onClick={() => setActiveTab('schedule')}
            className={`px-4 py-2 rounded-xl flex items-center gap-2 transition-all ${
              activeTab === 'schedule'
                ? 'bg-indigo-600 text-white shadow-md shadow-indigo-500/20'
                : 'text-slate-400 hover:text-white hover:bg-slate-900'
            }`}
          >
            <Calendar className="w-4 h-4" />
            <span>Boş Saatler Programı ({(teacher.availableSlots || []).length})</span>
          </button>
        </div>

            {/* TAB 1: CV & Qualifications */}
        {activeTab === 'cv' && (
          <div className="space-y-6 animate-fadeIn">
            
            {/* TEACHER LEAGUE & RANK PERKS CARD */}
            {(() => {
              const league = getTeacherLeague(teacher);
              const progress = getNextLeagueProgress(teacher);
              return (
                <div className="p-5 rounded-3xl bg-gradient-to-r from-slate-900 via-slate-900/90 to-slate-900 border border-amber-500/30 shadow-xl space-y-4">
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                    <div className="flex items-center gap-3">
                      <div className={`w-12 h-12 rounded-2xl flex items-center justify-center text-xl shadow-lg ${league.badgeClass}`}>
                        {league.emoji}
                      </div>
                      <div>
                        <div className="flex items-center gap-2">
                          <h4 className="text-base font-black text-white">{league.name}</h4>
                          <span className="text-[10px] font-extrabold uppercase px-2 py-0.5 rounded-full bg-amber-500/20 text-amber-300 border border-amber-500/30">
                            {league.rankTitle}
                          </span>
                        </div>
                        <p className="text-xs text-slate-400 mt-0.5">Platform Doğrulamalı Akredite Eğitmen Ligi</p>
                      </div>
                    </div>

                    <div className="text-left sm:text-right">
                      <span className="text-[11px] font-bold text-slate-400 block">Lig Durumu</span>
                      <span className="text-xs font-black text-emerald-400">● %100 Seans Güvencesi</span>
                    </div>
                  </div>

                  {/* League Perks Grid */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 pt-2 border-t border-slate-800 text-xs">
                    {league.perks.map((perk, idx) => (
                      <div key={idx} className="flex items-center gap-2 text-slate-300">
                        <CheckCircle2 className="w-3.5 h-3.5 text-amber-400 shrink-0" />
                        <span>{perk}</span>
                      </div>
                    ))}
                  </div>

                  {/* Progress to next tier */}
                  {!progress.isMaxLevel && (
                    <div className="pt-3 border-t border-slate-800 space-y-1.5">
                      <div className="flex items-center justify-between text-xs">
                        <span className="text-slate-400 font-semibold">
                          Sonraki Seviye: <strong className="text-white">{progress.nextLeague?.name}</strong>
                        </span>
                        <span className="font-mono text-emerald-400 font-bold">%{progress.progressPercent} Tamamlandı</span>
                      </div>
                      <div className="w-full h-2 rounded-full bg-slate-950 overflow-hidden border border-slate-800">
                        <div 
                          className="h-full bg-gradient-to-r from-amber-500 to-emerald-500 rounded-full transition-all duration-500"
                          style={{ width: `${progress.progressPercent}%` }}
                        />
                      </div>
                    </div>
                  )}
                </div>
              );
            })()}

            <div>
              <h3 className="text-sm font-bold text-slate-200 uppercase tracking-wider mb-2">Hakkında & Ders Metodu</h3>
              <p className="text-sm text-slate-300 leading-relaxed bg-slate-900/50 p-4 rounded-2xl border border-slate-800">
                {teacher.bio}
              </p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="bg-slate-900/50 p-4 rounded-2xl border border-slate-800">
                <div className="text-xs font-bold text-indigo-400 uppercase mb-1">Eğitim Geçmişi</div>
                <div className="text-sm text-white font-semibold">{teacher.education}</div>
              </div>

              <div className="bg-slate-900/50 p-4 rounded-2xl border border-slate-800">
                <div className="text-xs font-bold text-indigo-400 uppercase mb-1">Uzmanlık Branşı</div>
                <div className="text-sm text-white font-semibold">{teacher.subject}</div>
              </div>
            </div>

            {/* Referral / Gamification Card */}
            <div className="p-4 rounded-2xl bg-gradient-to-r from-indigo-950/60 to-violet-950/60 border border-indigo-500/30 flex items-center justify-between">
              <div className="flex items-center space-x-3">
                <div className="p-2.5 rounded-xl bg-indigo-600/30 text-indigo-300">
                  <Sparkles className="w-5 h-5 text-amber-400" />
                </div>
                <div>
                  <div className="text-xs font-bold text-white">Eğitmen Referans Kodu</div>
                  <div className="text-xs text-indigo-300 font-mono font-bold mt-0.5">{teacher.referralCode}</div>
                </div>
              </div>
              <span className="text-[11px] text-slate-300 bg-slate-900/80 px-3 py-1.5 rounded-lg border border-slate-800">
                {teacher.invitedCount} Davet Yapıldı
              </span>
            </div>
          </div>
        )}

        {/* TAB 2: Teacher Micro-notes Feed */}
        {activeTab === 'notes' && (
          <div className="space-y-4 animate-fadeIn">
            <p className="text-xs text-slate-400">
              Eğitmenimizin öğrenciler için hazırladığı pratik ipuçları, formül özetleri ve küçük notlar.
            </p>

            <div className="space-y-3">
              {teacher.notes.map((note) => (
                <div key={note.id} className="p-4 rounded-2xl bg-slate-900/60 border border-slate-800 space-y-2">
                  <div className="flex items-center justify-between">
                    <h4 className="text-sm font-bold text-indigo-300 flex items-center gap-1.5">
                      <BookOpen className="w-4 h-4 text-indigo-400" />
                      <span>{note.title}</span>
                    </h4>
                    <span className="text-[11px] text-slate-400">{note.date}</span>
                  </div>
                  <p className="text-xs text-slate-300 leading-relaxed">{note.content}</p>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* TAB 3: Interactive Availability Calendar (Boş Saatler Programı) */}
        {activeTab === 'schedule' && (
          <div className="space-y-5 animate-fadeIn">
            <div className="flex items-center justify-between bg-slate-900/60 p-4 rounded-2xl border border-slate-800">
              <div>
                <h3 className="text-sm font-bold text-white flex items-center gap-2">
                  <Clock className="w-4 h-4 text-emerald-400" />
                  <span>Öğretmenin Boş Saatleri Programı</span>
                </h3>
                <p className="text-xs text-slate-400">Uygun olan seansı seçip hemen canlı derse kaydolabilirsiniz.</p>
              </div>
            </div>

            <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
              {teacher.availableSlots.map((slot, idx) => (
                <button
                  key={idx}
                  onClick={() => setSelectedSlot(slot)}
                  className={`p-3.5 rounded-xl border text-center transition-all flex flex-col items-center justify-center space-y-1 ${
                    selectedSlot === slot
                      ? 'bg-indigo-600 border-indigo-500 text-white font-bold shadow-lg shadow-indigo-600/30 scale-105'
                      : 'bg-slate-900/80 border-slate-800 text-slate-200 hover:border-indigo-500/50 hover:bg-slate-800'
                  }`}
                >
                  <Calendar className="w-4 h-4 text-indigo-400 mb-0.5" />
                  <span className="text-xs font-semibold">{slot}</span>
                  <span className="text-[10px] text-emerald-400 font-normal">Musait Slot</span>
                </button>
              ))}
            </div>

            <div className="pt-4 border-t border-slate-800 flex items-center justify-between">
              <div>
                <span className="text-xs text-slate-400 block">Seçilen Seans:</span>
                <span className="text-sm font-bold text-indigo-300">
                  {selectedSlot || 'Lütfen yukarıdan saat seçiniz'}
                </span>
              </div>

              <button
                disabled={!selectedSlot}
                onClick={() => handleBook(selectedSlot)}
                className={`px-6 py-3 rounded-xl font-bold text-sm transition-all shadow-lg flex items-center gap-2 ${
                  selectedSlot
                    ? 'bg-gradient-to-r from-indigo-600 to-violet-600 text-white shadow-indigo-600/30 hover:scale-105'
                    : 'bg-slate-800 text-slate-500 cursor-not-allowed'
                }`}
              >
                <span>Dersi Onayla & Rezerve Et</span>
                <Send className="w-4 h-4" />
              </button>
            </div>
          </div>
        )}

      </div>
    </div>
  );
}
