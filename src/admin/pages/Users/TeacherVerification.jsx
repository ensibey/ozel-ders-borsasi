import React, { useState } from 'react';
import { 
  UserCheck, 
  GraduationCap, 
  CheckCircle2, 
  XCircle, 
  FileText, 
  Award, 
  ExternalLink, 
  ShieldAlert, 
  Search,
  Filter,
  BadgeCheck
} from 'lucide-react';
import { useAdminAuth } from '../../context/AdminAuthContext';

export default function TeacherVerification({ teachers = [], onUpdateTeacher }) {
  const { logAction } = useAdminAuth();
  const [filterState, setFilterState] = useState('pending'); // 'pending', 'verified', 'all'
  const [searchQuery, setSearchQuery] = useState('');
  const [inspectModalTeacher, setInspectModalTeacher] = useState(null);

  const filteredTeachers = teachers.filter(t => {
    const matchesFilter = filterState === 'all' ? true : filterState === 'verified' ? t.verified : !t.verified;
    const query = searchQuery.trim().toLowerCase();
    if (!query) return matchesFilter;

    const nameMatch = (t.name || '').toLowerCase().includes(query);
    const subjectMatch = (t.subject || '').toLowerCase().includes(query);
    const eduMatch = (t.education || t.university || '').toLowerCase().includes(query);
    const titleMatch = (t.title || '').toLowerCase().includes(query);
    return matchesFilter && (nameMatch || subjectMatch || eduMatch || titleMatch);
  });

  const handleApproveTeacher = (teacher) => {
    const updated = { ...teacher, verified: true };
    if (onUpdateTeacher) onUpdateTeacher(updated);
    
    logAction(
      'TEACHER_VERIFIED',
      'ACCREDITATION',
      `${teacher.name} (${teacher.subject})`,
      `Öğretmen profili ve diplomaları onaylandı. Mavi tik rozeti tanımlandı.`,
      'success'
    );
    if (inspectModalTeacher?.id === teacher.id) {
      setInspectModalTeacher(null);
    }
  };

  const handleRevokeVerification = (teacher) => {
    const updated = { ...teacher, verified: false };
    if (onUpdateTeacher) onUpdateTeacher(updated);

    logAction(
      'TEACHER_UNVERIFIED',
      'ACCREDITATION',
      `${teacher.name} (${teacher.subject})`,
      `Öğretmenin onay rozeti kaldırıldı ve inceleme moduna alındı.`,
      'warning'
    );
    if (inspectModalTeacher?.id === teacher.id) {
      setInspectModalTeacher(null);
    }
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <div>
          <h2 className="text-xl font-black text-white tracking-tight flex items-center gap-2">
            <UserCheck className="w-5 h-5 text-amber-400" />
            Öğretmen Akreditasyon & Doğrulama Masası
          </h2>
          <p className="text-xs text-slate-400 mt-0.5">
            Eğitmenlerin diploma, sicil kaydı, tecrübe ve yetkinlik belgelerini denetleyin ve onaylayın.
          </p>
        </div>

        {/* Filter State Tabs & Bulk Action */}
        <div className="flex flex-wrap items-center gap-2">
          {filteredTeachers.some(t => !t.verified) && (
            <button
              onClick={() => {
                if (window.confirm('Bekleyen tüm eğitmenleri topluca onaylamak istediğinize emin misiniz?')) {
                  filteredTeachers.filter(t => !t.verified).forEach(t => handleApproveTeacher(t));
                }
              }}
              className="px-3 py-1.5 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white text-xs font-bold shadow-md flex items-center gap-1.5"
            >
              <CheckCircle2 className="w-3.5 h-3.5" />
              <span>Tümünü Toplu Onayla</span>
            </button>
          )}

          <div className="flex items-center gap-1.5 bg-slate-900/90 p-1.5 rounded-2xl border border-slate-800">
            <button
              onClick={() => setFilterState('pending')}
              className={`px-3 py-1.5 rounded-xl text-xs font-bold transition-all ${
                filterState === 'pending'
                  ? 'bg-amber-500 text-slate-950 shadow-md font-black'
                  : 'text-slate-400 hover:text-white'
              }`}
            >
              Onay Bekleyenler ({teachers.filter(t => !t.verified).length})
            </button>

            <button
              onClick={() => setFilterState('verified')}
              className={`px-3 py-1.5 rounded-xl text-xs font-bold transition-all ${
                filterState === 'verified'
                  ? 'bg-emerald-500 text-slate-950 shadow-md font-black'
                  : 'text-slate-400 hover:text-white'
              }`}
            >
              Onaylılar ({teachers.filter(t => t.verified).length})
            </button>

            <button
              onClick={() => setFilterState('all')}
              className={`px-3 py-1.5 rounded-xl text-xs font-bold transition-all ${
                filterState === 'all'
                  ? 'bg-blue-600 text-white shadow-md font-black'
                  : 'text-slate-400 hover:text-white'
              }`}
            >
              Tümü ({teachers.length})
            </button>
          </div>
        </div>
      </div>

      {/* Grid of Teacher Verification Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {filteredTeachers.map((t) => (
          <div
            key={t.id}
            className={`p-5 rounded-3xl border flex flex-col justify-between transition-all relative overflow-hidden ${
              t.verified
                ? 'bg-slate-900/70 border-slate-800/80'
                : 'bg-slate-900 border-amber-500/30 shadow-lg shadow-amber-500/5 ring-1 ring-amber-500/20'
            }`}
          >
            <div>
              {/* Top Row: Avatar & Status */}
              <div className="flex items-start justify-between gap-3 mb-3">
                <div className="flex items-center gap-3">
                  <img
                    src={t.avatar || t.image || 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150'}
                    alt={t.name}
                    className="w-12 h-12 rounded-2xl object-cover ring-2 ring-slate-700 shrink-0"
                  />
                  <div>
                    <h3 className="font-bold text-white text-sm flex items-center gap-1.5">
                      {t.name}
                      {t.verified && <BadgeCheck className="w-4 h-4 text-blue-400 fill-blue-400/20" />}
                    </h3>
                    <p className="text-xs text-blue-400 font-semibold">{t.subject}</p>
                    <p className="text-[11px] text-slate-400">{t.title}</p>
                  </div>
                </div>

                <span className={`text-[10px] font-bold px-2 py-0.5 rounded-full uppercase tracking-wider ${
                  t.verified 
                    ? 'bg-emerald-500/10 text-emerald-400 border border-emerald-500/20' 
                    : 'bg-amber-500/10 text-amber-400 border border-amber-500/20 animate-pulse'
                }`}>
                  {t.verified ? 'Onaylı' : 'Bekliyor'}
                </span>
              </div>

              {/* Badges / University info */}
              <div className="p-3 bg-slate-950/60 rounded-2xl border border-slate-800/80 space-y-1.5 text-xs text-slate-300 mb-4">
                <div className="flex items-center justify-between">
                  <span className="text-slate-500">Eğitim:</span>
                  <span className="font-semibold text-slate-200 truncate max-w-[160px]" title={t.education || t.university}>
                    {t.education || t.university || 'Boğaziçi Üniv.'}
                  </span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-slate-500">Deneyim:</span>
                  <span className="font-semibold text-slate-200">
                    {t.experienceYears ? `${t.experienceYears} Yıl` : (t.experience || '5+ Yıl')}
                  </span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-slate-500">Saatlik Ücret:</span>
                  <span className="font-bold text-emerald-400">₺{t.hourlyRate || 500} / saat</span>
                </div>
              </div>
            </div>

            {/* Action Buttons */}
            <div className="flex items-center gap-2 pt-2 border-t border-slate-800">
              {t.verified ? (
                <button
                  onClick={() => handleRevokeVerification(t)}
                  className="w-full py-2 bg-slate-800 hover:bg-rose-500/20 hover:text-rose-400 text-slate-400 text-xs font-bold rounded-xl transition-all border border-slate-700 flex items-center justify-center gap-1.5"
                >
                  <XCircle className="w-3.5 h-3.5" /> Onayı Geri Al
                </button>
              ) : (
                <button
                  onClick={() => handleApproveTeacher(t)}
                  className="w-full py-2 bg-emerald-600 hover:bg-emerald-500 text-white text-xs font-bold rounded-xl transition-all shadow-md shadow-emerald-600/20 flex items-center justify-center gap-1.5"
                >
                  <CheckCircle2 className="w-3.5 h-3.5" /> Belgeleri Onayla
                </button>
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
