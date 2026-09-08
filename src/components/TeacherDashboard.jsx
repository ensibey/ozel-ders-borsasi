import React, { useState } from 'react';
import { 
  Sparkles, Calendar, Plus, Share2, Award, BookOpen, 
  CheckCircle2, Clock, Zap, TrendingUp, Copy, Check, DollarSign, Users, Crown 
} from 'lucide-react';
import confetti from 'canvas-confetti';
import { getTeacherLeague, getNextLeagueProgress } from '../utils/leagueSystem';

export default function TeacherDashboard({ teacher, teachers = [], platformCommission = 10, onUpdateTeacher }) {
  const [selectedTeacherId, setSelectedTeacherId] = useState(teacher?.id || 't1');
  const [copied, setCopied] = useState(false);
  const [newNoteTitle, setNewNoteTitle] = useState('');
  const [newNoteContent, setNewNoteContent] = useState('');
  const [newSlot, setNewSlot] = useState('');
  
  // Earnings Calculator State
  const [weeklyHours, setWeeklyHours] = useState(12);

  const activeTeacher = (teachers && teachers.find(t => t.id === selectedTeacherId)) || teacher || teachers[0];

  if (!activeTeacher) return null;

  const handleCopyCode = () => {
    try {
      navigator.clipboard?.writeText(activeTeacher.referralCode || 'BORSA2026');
    } catch (e) {}
    setCopied(true);
    confetti({ particleCount: 50, spread: 50 });
    setTimeout(() => setCopied(false), 2000);
  };

  const handleAddNote = (e) => {
    e.preventDefault();
    if (!newNoteTitle || !newNoteContent) return;

    const updatedNotes = [
      { id: 'n_' + Date.now(), title: newNoteTitle, date: 'Bugün', content: newNoteContent },
      ...(activeTeacher.notes || [])
    ];

    onUpdateTeacher({
      ...activeTeacher,
      notes: updatedNotes,
      points: (activeTeacher.points || 0) + 30
    });

    setNewNoteTitle('');
    setNewNoteContent('');
  };

  const handleAddSlot = (e) => {
    e.preventDefault();
    if (!newSlot) return;

    const updatedSlots = [...(activeTeacher.availableSlots || []), newSlot];
    onUpdateTeacher({
      ...activeTeacher,
      availableSlots: updatedSlots,
      points: (activeTeacher.points || 0) + 50
    });

    setNewSlot('');
  };

  const handleRemoveSlot = (slotToRemove) => {
    const updatedSlots = (activeTeacher.availableSlots || []).filter(s => s !== slotToRemove);
    onUpdateTeacher({
      ...activeTeacher,
      availableSlots: updatedSlots
    });
  };

  const handleToggleBoost = () => {
    if ((activeTeacher.points || 0) < 300 && !activeTeacher.featuredBoost) return;

    onUpdateTeacher({
      ...activeTeacher,
      featuredBoost: !activeTeacher.featuredBoost,
      points: activeTeacher.featuredBoost ? activeTeacher.points : activeTeacher.points - 300
    });

    if (!activeTeacher.featuredBoost) {
      confetti({ particleCount: 120, spread: 80 });
    }
  };

  // Monthly Revenue Math (Net after platform commission)
  const rawLessonRevenue = weeklyHours * activeTeacher.hourlyRate * 4;
  const platformFee = Math.round(rawLessonRevenue * (platformCommission / 100));
  const netLessonRevenue = rawLessonRevenue - platformFee;
  const commissionBonus = (activeTeacher.invitedCount || 0) * 250;
  const totalMonthlyIncome = netLessonRevenue + commissionBonus;

  return (
    <div className="space-y-8 animate-fadeIn">
      
      {/* Teacher Profile Switcher & Boost Header */}
      <div className="glass-panel p-6 sm:p-8 rounded-3xl border border-amber-500/30 bg-gradient-to-r from-slate-900 via-amber-950/20 to-slate-900 flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
        <div className="flex items-center space-x-4">
          <img src={activeTeacher.avatar} alt={activeTeacher.name} className="w-20 h-20 rounded-2xl object-cover border-2 border-amber-500/40 shadow-xl" />
          <div>
            <div className="flex items-center gap-2">
              {teachers.length > 1 ? (
                <select
                  value={selectedTeacherId}
                  onChange={(e) => setSelectedTeacherId(e.target.value)}
                  className="bg-slate-900 text-white font-extrabold text-lg rounded-xl px-3 py-1 border border-amber-500/40 focus:outline-none"
                >
                  {teachers.map(t => (
                    <option key={t.id} value={t.id}>{t.name} ({t.subject})</option>
                  ))}
                </select>
              ) : (
                <h1 className="text-2xl font-extrabold text-white">{activeTeacher.name}</h1>
              )}

              <span className="px-2.5 py-0.5 rounded-full bg-amber-500/20 text-amber-300 text-xs font-bold border border-amber-500/30">
                Öğretmen Portalı
              </span>
            </div>
            <p className="text-xs text-slate-300 mt-1">{activeTeacher.title} • {activeTeacher.city}</p>
            
            <div className="flex items-center gap-3 mt-2 text-xs font-bold">
              <span className="flex items-center text-amber-400 bg-amber-400/10 px-3 py-1 rounded-lg border border-amber-400/20">
                <Award className="w-4 h-4 mr-1" />
                <span>{activeTeacher.points || 0} Puan Bakiyesi</span>
              </span>
              <span className="flex items-center text-indigo-400 bg-indigo-500/20 px-3 py-1 rounded-lg border border-indigo-500/30">
                <Users className="w-4 h-4 mr-1" />
                <span>{activeTeacher.invitedCount || 0} Davet Yapıldı</span>
              </span>
            </div>
          </div>
        </div>

        {/* Boost Activation Toggle */}
        <div className="bg-slate-900/80 p-4 rounded-2xl border border-slate-800 text-center w-full md:w-auto">
          <div className="text-xs text-slate-300 font-semibold mb-1 flex items-center justify-center gap-1">
            <Sparkles className="w-4 h-4 text-amber-400" />
            <span>Ana Sayfada Öne Çıkarılma Durumu</span>
          </div>
          <button
            onClick={handleToggleBoost}
            className={`w-full px-5 py-2.5 rounded-xl text-xs font-extrabold transition-all shadow-md mt-2 flex items-center justify-center gap-2 ${
              activeTeacher.featuredBoost
                ? 'bg-amber-500 text-slate-950 shadow-amber-500/30 hover:bg-amber-400'
                : 'bg-indigo-600 text-white hover:bg-indigo-500 shadow-indigo-600/30'
            }`}
          >
            <Zap className="w-4 h-4" />
            <span>{activeTeacher.featuredBoost ? 'Öne Çıkarma AKTİF (Kapat)' : '300 Puan ile Öne Çıkar'}</span>
          </button>
        </div>
      </div>

      {/* 🏆 TEACHER LEAGUE & GAMIFICATION LEVEL PROGRESSION */}
      {(() => {
        const league = getTeacherLeague(activeTeacher);
        const progress = getNextLeagueProgress(activeTeacher);
        return (
          <div className="glass-panel p-6 sm:p-8 rounded-3xl border border-amber-500/40 bg-gradient-to-r from-slate-900 via-amber-950/20 to-slate-900 shadow-xl space-y-6">
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
              <div className="flex items-center gap-4">
                <div className={`w-16 h-16 rounded-2xl flex items-center justify-center text-3xl shadow-xl ${league.badgeClass}`}>
                  {league.emoji}
                </div>
                <div>
                  <div className="flex items-center gap-2">
                    <h2 className="text-xl sm:text-2xl font-black text-white">{league.name}</h2>
                    <span className="px-2.5 py-0.5 rounded-full bg-amber-500/20 text-amber-300 text-xs font-black border border-amber-500/30">
                      {league.rankTitle}
                    </span>
                  </div>
                  <p className="text-xs text-slate-300 mt-1">
                    Öğretmen Başarı Ligi • Komisyon Oranınız: <strong className="text-emerald-400 font-mono font-bold">%{league.commissionRate}</strong> (Standart: %14)
                  </p>
                </div>
              </div>

              {/* League Tier Badge Pills */}
              <div className="flex items-center gap-1.5 p-1 rounded-2xl bg-slate-950 border border-slate-800 text-xs font-bold self-start md:self-auto">
                {[
                  { id: 'bronze', label: '🥉 Bronz' },
                  { id: 'silver', label: '🥈 Gümüş' },
                  { id: 'gold', label: '🥇 Altın' },
                  { id: 'elite', label: '👑 Elit' }
                ].map(t => (
                  <div
                    key={t.id}
                    className={`px-3 py-1.5 rounded-xl transition-all ${
                      league.id === t.id
                        ? 'bg-amber-500 text-slate-950 font-black shadow-md'
                        : 'text-slate-500 font-semibold'
                    }`}
                  >
                    {t.label}
                  </div>
                ))}
              </div>
            </div>

            {/* Level Up Progress Bar */}
            <div className="space-y-2 p-5 rounded-2xl bg-slate-950/60 border border-slate-800">
              <div className="flex items-center justify-between text-xs">
                <span className="text-slate-300 font-bold flex items-center gap-1.5">
                  <TrendingUp className="w-4 h-4 text-emerald-400" />
                  <span>
                    {progress.isMaxLevel 
                      ? 'Tebrikler! Platformdaki en üst lige ulaştınız.' 
                      : `Sonraki Hedef: ${progress.nextLeague?.name}`}
                  </span>
                </span>
                <span className="font-mono text-emerald-400 font-black text-sm">
                  %{progress.progressPercent} XP
                </span>
              </div>
              <div className="w-full h-3 rounded-full bg-slate-900 overflow-hidden border border-slate-800 p-0.5">
                <div 
                  className="h-full bg-gradient-to-r from-amber-500 via-yellow-400 to-emerald-500 rounded-full transition-all duration-700 shadow-md shadow-amber-500/30"
                  style={{ width: `${progress.progressPercent}%` }}
                />
              </div>
            </div>

            {/* Level Up Quests Checklist */}
            {!progress.isMaxLevel && progress.tasks.length > 0 && (
              <div className="space-y-2">
                <h4 className="text-xs font-black uppercase tracking-wider text-amber-400">
                  🎯 Bir Üst Lige Geçiş Görevleri ({progress.nextLeague?.name})
                </h4>
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                  {progress.tasks.map((task, idx) => (
                    <div key={idx} className="p-3 rounded-xl bg-slate-950/80 border border-slate-800 text-xs text-slate-300 flex items-start gap-2">
                      <div className="w-4 h-4 rounded-full bg-amber-500/20 text-amber-400 flex items-center justify-center shrink-0 mt-0.5 text-[10px] font-bold">
                        {idx + 1}
                      </div>
                      <span className="leading-snug">{task}</span>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Active League Perks Grid */}
            <div className="pt-2 border-t border-slate-800 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3 text-xs">
              {league.perks.map((perk, idx) => (
                <div key={idx} className="flex items-center gap-2 text-slate-300 bg-slate-950/40 p-2.5 rounded-xl border border-slate-800/80">
                  <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
                  <span className="text-[11px] font-medium">{perk}</span>
                </div>
              ))}
            </div>

          </div>
        );
      })()}

      {/* Interactive Earnings & Commission Calculator */}
      <div className="glass-panel p-6 rounded-3xl border border-emerald-500/30 bg-gradient-to-r from-slate-900 via-emerald-950/20 to-slate-900 space-y-4">
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
          <div>
            <div className="inline-flex items-center gap-1.5 px-3 py-0.5 rounded-full bg-emerald-500/20 text-emerald-300 text-xs font-bold mb-1 border border-emerald-500/30">
              <DollarSign className="w-3.5 h-3.5" />
              <span>Dinamik Net Hakediş Hesaplayıcı</span>
            </div>
            <h2 className="text-lg font-bold text-white">Tahmini Aylık Öğretmen Net Kazancı</h2>
            <p className="text-xs text-slate-300">
              Brüt Gelir: <span className="text-white font-bold">{rawLessonRevenue} ₺</span> • Platform Komisyonu (%{platformCommission}): <span className="text-rose-400 font-bold">-{platformFee} ₺</span>
            </p>
          </div>

          <div className="text-right bg-slate-900/80 p-4 rounded-2xl border border-slate-800">
            <span className="text-xs text-slate-400 block">Tahmini Aylık Net Gelir:</span>
            <span className="text-2xl font-extrabold text-emerald-400">{totalMonthlyIncome.toLocaleString()} ₺</span>
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 pt-2">
          <div className="p-3.5 rounded-xl bg-slate-900/60 border border-slate-800 space-y-1">
            <label className="text-[11px] text-slate-400 block font-semibold">Haftalık Canlı Ders Saatiniz:</label>
            <input
              type="range"
              min="2"
              max="40"
              value={weeklyHours}
              onChange={(e) => setWeeklyHours(parseInt(e.target.value))}
              className="w-full accent-emerald-500"
            />
            <span className="text-xs font-bold text-white">{weeklyHours} Saat / Hafta</span>
          </div>

          <div className="p-3.5 rounded-xl bg-slate-900/60 border border-slate-800">
            <span className="text-[11px] text-slate-400 block font-semibold">Saatlik Ders Ücretiniz:</span>
            <span className="text-sm font-extrabold text-white">{activeTeacher.hourlyRate} ₺ / saat</span>
          </div>

          <div className="p-3.5 rounded-xl bg-slate-900/60 border border-slate-800">
            <span className="text-[11px] text-indigo-400 block font-semibold">Referans Prim Hakedişi:</span>
            <span className="text-sm font-extrabold text-indigo-300">+{commissionBonus} ₺ ({activeTeacher.invitedCount || 0} Davet)</span>
          </div>
        </div>
      </div>

      {/* Handwritten Spec Tasks Section */}
      <div className="glass-panel p-6 rounded-3xl border border-indigo-500/30 space-y-4">
        <div className="flex items-center justify-between">
          <div>
            <h2 className="text-lg font-bold text-white flex items-center gap-2">
              <Sparkles className="w-5 h-5 text-amber-400" />
              <span>Öğretmen Görevleri & Puan Kazanma</span>
            </h2>
            <p className="text-xs text-slate-300">
              Görevleri tamamlayarak puan biriktirin ve profilinizi ana sayfada öne çıkararak daha fazla öğrenciye ulaşın.
            </p>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          
          {/* Task 1: Invite 3 friends with code */}
          <div className="p-4 rounded-2xl bg-slate-900/60 border border-slate-800 space-y-3">
            <div className="flex items-center justify-between">
              <span className="text-xs font-bold text-indigo-300 flex items-center gap-1.5">
                <Share2 className="w-4 h-4 text-indigo-400" />
                <span>Görev 1: 3 Arkadaşına Kod Gönder</span>
              </span>
              <span className="text-xs font-extrabold text-amber-400 bg-amber-400/10 px-2 py-0.5 rounded">
                +500 Puan
              </span>
            </div>
            <p className="text-xs text-slate-400">
              Senin verdiğin kod ile sisteme yeni giriş yapılırsa puan yüklenecektir.
            </p>
            <div className="flex items-center space-x-2">
              <div className="flex-1 bg-slate-950 px-3 py-2 rounded-xl text-xs font-mono font-bold text-indigo-400 border border-slate-800">
                {activeTeacher.referralCode}
              </div>
              <button
                onClick={handleCopyCode}
                className="px-4 py-2 rounded-xl bg-indigo-600 hover:bg-indigo-500 text-white text-xs font-bold flex items-center gap-1.5"
              >
                {copied ? <Check className="w-4 h-4" /> : <Copy className="w-4 h-4" />}
                <span>{copied ? 'Kopyalandı!' : 'Kodu Kopyala'}</span>
              </button>
            </div>
          </div>

          {/* Task 2: Fill schedule calendar */}
          <div className="p-4 rounded-2xl bg-slate-900/60 border border-slate-800 space-y-3">
            <div className="flex items-center justify-between">
              <span className="text-xs font-bold text-indigo-300 flex items-center gap-1.5">
                <Calendar className="w-4 h-4 text-emerald-400" />
                <span>Görev 2: Boş Saatler Programını Doldur</span>
              </span>
              <span className="text-xs font-extrabold text-emerald-400 bg-emerald-400/10 px-2 py-0.5 rounded">
                +50 Puan / Slot
              </span>
            </div>
            <p className="text-xs text-slate-400">
              Müsait saatlerinizi takvime ekleyerek öğrencilerin doğrudan seans kiralamasını sağlayın.
            </p>

            {/* Quick Template Buttons */}
            <div className="flex flex-wrap gap-2 pt-1">
              <span className="text-[11px] text-slate-400 self-center font-bold">⚡ Hızlı Şablonlar:</span>
              <button
                type="button"
                onClick={() => {
                  const batch = ['Pzt 17:00', 'Salı 18:00', 'Çrş 17:00', 'Per 18:00'];
                  const unique = Array.from(new Set([...(activeTeacher.availableSlots || []), ...batch]));
                  onUpdateTeacher({ ...activeTeacher, availableSlots: unique, points: (activeTeacher.points || 0) + 100 });
                  confetti({ particleCount: 50, spread: 50 });
                }}
                className="px-2.5 py-1 rounded-lg bg-indigo-600/30 hover:bg-indigo-600/50 text-indigo-300 text-[11px] font-bold border border-indigo-500/30"
              >
                + Hafta İçi Akşam (17:00-18:00)
              </button>
              <button
                type="button"
                onClick={() => {
                  const batch = ['Cmt 11:00', 'Cmt 14:00', 'Paz 11:00', 'Paz 15:00'];
                  const unique = Array.from(new Set([...(activeTeacher.availableSlots || []), ...batch]));
                  onUpdateTeacher({ ...activeTeacher, availableSlots: unique, points: (activeTeacher.points || 0) + 100 });
                  confetti({ particleCount: 50, spread: 50 });
                }}
                className="px-2.5 py-1 rounded-lg bg-emerald-600/30 hover:bg-emerald-600/50 text-emerald-300 text-[11px] font-bold border border-emerald-500/30"
              >
                + Hafta Sonu (11:00-15:00)
              </button>
            </div>

            <form onSubmit={handleAddSlot} className="flex items-center space-x-2 pt-1">
              <input
                type="text"
                value={newSlot}
                onChange={(e) => setNewSlot(e.target.value)}
                placeholder="Örn: Salı 15:00"
                className="flex-1 glass-input rounded-xl px-3 py-1.5 text-xs text-white"
              />
              <button
                type="submit"
                className="px-4 py-2 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white text-xs font-bold"
              >
                Saat Ekle
              </button>
            </form>
          </div>

        </div>
      </div>

      {/* Teacher Micro-Notes Publisher Form */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        
        {/* Publish Note Form */}
        <div className="glass-panel p-6 rounded-3xl border border-slate-800 space-y-4">
          <h2 className="text-base font-bold text-white flex items-center gap-2">
            <BookOpen className="w-5 h-5 text-indigo-400" />
            <span>Yeni İpucu / Küçük Not Yayınla</span>
          </h2>
          <p className="text-xs text-slate-400">
            Öğrencilerin profilinizde görebileceği çıkmış soru analizleri ve pratik formüller ekleyin.
          </p>

          <form onSubmit={handleAddNote} className="space-y-3">
            <div>
              <label className="block text-xs font-semibold text-slate-300 mb-1">Not Başlığı</label>
              <input
                type="text"
                value={newNoteTitle}
                onChange={(e) => setNewNoteTitle(e.target.value)}
                placeholder="Örn: YKS Fizik Vektörler Kestirme Yolu"
                className="w-full glass-input rounded-xl px-3 py-2 text-xs text-white"
                required
              />
            </div>

            <div>
              <label className="block text-xs font-semibold text-slate-300 mb-1">Not İçeriği</label>
              <textarea
                rows={3}
                value={newNoteContent}
                onChange={(e) => setNewNoteContent(e.target.value)}
                placeholder="Küçük notunuzu buraya yazın..."
                className="w-full glass-input rounded-xl px-3 py-2 text-xs text-white"
                required
              />
            </div>

            <button
              type="submit"
              className="w-full py-2.5 rounded-xl bg-indigo-600 hover:bg-indigo-500 text-white font-bold text-xs shadow-md"
            >
              Profilimde Not Yayınla (+30 Puan)
            </button>
          </form>
        </div>

        {/* Existing Slots & Notes List */}
        <div className="glass-panel p-6 rounded-3xl border border-slate-800 space-y-4">
          <h2 className="text-base font-bold text-white">Mevcut Boş Saatler Takvimim</h2>
          <div className="flex flex-wrap gap-2">
            {(activeTeacher.availableSlots || []).map((slot, idx) => (
              <span key={idx} className="px-3 py-1.5 rounded-xl bg-indigo-600/20 text-indigo-300 text-xs font-semibold border border-indigo-500/30 flex items-center gap-1.5">
                <span>{slot}</span>
                <button
                  onClick={() => handleRemoveSlot(slot)}
                  className="hover:text-rose-400 text-indigo-400 p-0.5 rounded transition-colors"
                  title="Saati Takvimden Çıkar"
                >
                  ✕
                </button>
              </span>
            ))}
          </div>
        </div>

      </div>

    </div>
  );
}

function UsersIcon(props) {
  return (
    <svg {...props} fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M13 7a4 4 0 11-8 0 4 4 0 018 0z" />
    </svg>
  );
}
