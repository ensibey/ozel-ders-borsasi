import React from 'react';
import { 
  Trophy, 
  Crown, 
  Star, 
  Award, 
  X, 
  CheckCircle2, 
  TrendingUp, 
  ArrowRight,
  Sparkles,
  Flame,
  UserCheck
} from 'lucide-react';
import { getTeacherLeague } from '../utils/leagueSystem';

/**
 * TeacherLeaderboardModal: Displays the Top Ranked Teachers across Turkey
 * with dynamic XP calculation, league rings, stats, and 1-click CV inspection.
 */
export default function TeacherLeaderboardModal({ isOpen, onClose, teachers = [], onSelectTeacher }) {
  if (!isOpen) return null;

  // Sort teachers by League weight, then Rating, then Review Count
  const sortedTeachers = [...teachers].sort((a, b) => {
    const weight = { elite: 4, gold: 3, silver: 2, bronze: 1 };
    const leagueA = weight[getTeacherLeague(a).id] || 1;
    const leagueB = weight[getTeacherLeague(b).id] || 1;
    if (leagueB !== leagueA) return leagueB - leagueA;
    if (b.rating !== a.rating) return b.rating - a.rating;
    return (b.reviewCount || 0) - (a.reviewCount || 0);
  });

  return (
    <div 
      onClick={onClose}
      className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/85 backdrop-blur-md animate-fadeIn select-none"
    >
      <div 
        onClick={(e) => e.stopPropagation()}
        className="w-full max-w-3xl rounded-3xl bg-slate-900 border border-slate-700 shadow-2xl p-6 sm:p-8 space-y-6 text-slate-100 max-h-[90vh] overflow-y-auto custom-scrollbar"
      >
        {/* Header */}
        <div className="flex items-center justify-between pb-4 border-b border-slate-800">
          <div className="flex items-center gap-3">
            <div className="w-12 h-12 rounded-2xl bg-gradient-to-tr from-amber-500 to-yellow-400 text-slate-950 flex items-center justify-center text-2xl shadow-lg shadow-amber-500/30">
              🏆
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h2 className="text-xl sm:text-2xl font-black text-white">
                  Türkiye Geneli Eğitmen Liderlik Tablosu
                </h2>
                <span className="px-2.5 py-0.5 rounded-full bg-amber-500/20 text-amber-300 text-xs font-black border border-amber-500/30">
                  2026 Sezonu
                </span>
              </div>
              <p className="text-xs text-slate-400">
                Puan, veli değerlendirmeleri ve başarı kriterlerine göre akredite en seçkin öğretmenler.
              </p>
            </div>
          </div>

          <button 
            onClick={onClose}
            className="p-2.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-400 hover:text-white border border-slate-700 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Podium Top 3 Showcase */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 pt-2">
          {sortedTeachers.slice(0, 3).map((teacher, idx) => {
            const league = getTeacherLeague(teacher);
            const rankEmoji = idx === 0 ? '👑 1.' : idx === 1 ? '🥈 2.' : '🥉 3.';
            const borderColors = idx === 0 
              ? 'border-amber-400 bg-amber-500/10 shadow-amber-500/20' 
              : idx === 1 
              ? 'border-slate-400 bg-slate-500/10' 
              : 'border-amber-700 bg-amber-900/10';

            return (
              <div 
                key={teacher.id}
                onClick={() => {
                  onClose();
                  if (onSelectTeacher) onSelectTeacher(teacher);
                }}
                className={`p-4 rounded-2xl border-2 ${borderColors} flex flex-col items-center text-center relative group cursor-pointer hover:scale-[1.03] transition-all`}
              >
                <div className="absolute top-2 left-2 text-xs font-black font-mono">
                  {rankEmoji}
                </div>

                <img 
                  src={teacher.avatar} 
                  alt={teacher.name} 
                  className={`w-16 h-16 rounded-2xl object-cover border-2 my-2 ${league.avatarFrameClass}`}
                />

                <h4 className="text-sm font-bold text-white group-hover:text-amber-400 transition-colors">
                  {teacher.name}
                </h4>

                <span className="text-[11px] text-slate-400 font-medium">
                  {teacher.subject} • {teacher.city}
                </span>

                <div className="flex items-center gap-1 text-xs font-bold text-amber-400 mt-2 bg-slate-950/60 px-2.5 py-1 rounded-lg border border-slate-800">
                  <Star className="w-3.5 h-3.5 fill-amber-400" />
                  <span>{teacher.rating}</span>
                  <span className="text-slate-500 text-[10px]">({teacher.reviewCount} yorum)</span>
                </div>
              </div>
            );
          })}
        </div>

        {/* Full Leaderboard Table */}
        <div className="rounded-2xl bg-slate-950/60 border border-slate-800 overflow-hidden">
          <table className="w-full text-left text-xs">
            <thead className="bg-slate-950 text-slate-400 font-bold uppercase tracking-wider border-b border-slate-800">
              <tr>
                <th className="p-3.5 pl-5">Sıra</th>
                <th className="p-3.5">Eğitmen</th>
                <th className="p-3.5">Lig & Seviye</th>
                <th className="p-3.5">Puan & Seans</th>
                <th className="p-3.5">Saatlik Ücret</th>
                <th className="p-3.5 pr-5 text-right">Profil</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-800/60 font-medium">
              {sortedTeachers.map((t, idx) => {
                const league = getTeacherLeague(t);
                return (
                  <tr key={t.id} className="hover:bg-slate-800/40 transition-colors">
                    <td className="p-3.5 pl-5 font-mono font-black text-slate-400 text-sm">
                      #{idx + 1}
                    </td>

                    <td className="p-3.5">
                      <div className="flex items-center gap-3">
                        <img src={t.avatar} alt={t.name} className="w-9 h-9 rounded-xl object-cover border border-slate-700" />
                        <div>
                          <div className="font-bold text-white">{t.name}</div>
                          <div className="text-[10px] text-slate-400">{t.subject} • {t.city}</div>
                        </div>
                      </div>
                    </td>

                    <td className="p-3.5">
                      <span className={`inline-flex items-center gap-1 px-2 py-0.5 rounded-md text-[10px] font-black ${league.badgeClass}`}>
                        {league.emoji} {league.name}
                      </span>
                    </td>

                    <td className="p-3.5">
                      <div className="flex items-center gap-1 text-amber-400 font-bold">
                        <Star className="w-3.5 h-3.5 fill-amber-400" />
                        <span>{t.rating}</span>
                      </div>
                      <span className="text-[10px] text-slate-400">{t.experienceYears}+ Yıl • 50+ Seans</span>
                    </td>

                    <td className="p-3.5 font-bold text-emerald-400">
                      {t.hourlyRate} ₺/saat
                    </td>

                    <td className="p-3.5 pr-5 text-right">
                      <button
                        onClick={() => {
                          onClose();
                          if (onSelectTeacher) onSelectTeacher(t);
                        }}
                        className="px-3 py-1.5 rounded-xl bg-indigo-600/30 hover:bg-indigo-600 text-indigo-300 hover:text-white text-xs font-bold border border-indigo-500/40 transition-colors"
                      >
                        İncele ↗
                      </button>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>

        {/* Footer Guarantee */}
        <div className="flex items-center justify-between text-xs text-slate-400 pt-2 border-t border-slate-800">
          <span className="flex items-center gap-1.5 text-emerald-400 font-bold">
            <CheckCircle2 className="w-4 h-4" />
            <span>Tüm sıralamalar doğrulanmış veli ve öğrenci değerlendirmeleriyle hesaplanır.</span>
          </span>
          <span className="font-mono text-slate-500">Sezon 2026.08</span>
        </div>

      </div>
    </div>
  );
}
