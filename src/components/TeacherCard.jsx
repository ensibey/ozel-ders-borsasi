import React, { useState } from 'react';
import { 
  Star, 
  MapPin, 
  Calendar, 
  CheckCircle2, 
  Video, 
  Sparkles, 
  ChevronRight, 
  MessageSquare, 
  User, 
  Share2,
  Crown,
  Award,
  ShieldCheck,
  Flame
} from 'lucide-react';
import { getTeacherLeague } from '../utils/leagueSystem';

export default function TeacherCard({ teacher, onSelectTeacher, onQuickBookSlot, onOpenReview }) {
  const [imgError, setImgError] = useState(false);
  const slots = teacher.availableSlots || [];
  const league = getTeacherLeague(teacher);

  const isElite = league.id === 'elite';
  const isGold = league.id === 'gold';

  return (
    <div className={`neumorphic-card rounded-[28px] p-5 sm:p-6 flex flex-col justify-between relative overflow-hidden transition-all duration-300 ${
      isElite ? 'border-2 border-amber-400 shadow-[0_4px_25px_rgba(245,158,11,0.2)] bg-gradient-to-b from-amber-500/[0.04] to-transparent' :
      isGold ? 'border-2 border-amber-300/80 shadow-md bg-gradient-to-b from-amber-500/[0.02] to-transparent' :
      teacher.featuredBoost ? 'border-amber-400 glow-box-amber' : ''
    }`}>
      
      {/* Top Ribbon (Elite, Gold or Featured) */}
      {isElite ? (
        <div className="absolute top-0 right-0 bg-gradient-to-l from-amber-500 via-yellow-400 to-amber-500 text-slate-950 font-black text-[10px] uppercase px-3.5 py-1 rounded-bl-2xl shadow-md flex items-center gap-1.5 z-10 border-b border-l border-amber-300">
          <Crown className="w-3.5 h-3.5 fill-slate-950" />
          <span>👑 Elit Eğitmen (%1)</span>
        </div>
      ) : isGold ? (
        <div className="absolute top-0 right-0 bg-gradient-to-l from-amber-600 to-yellow-500 text-white font-extrabold text-[10px] uppercase px-3.5 py-1 rounded-bl-2xl shadow-md flex items-center gap-1.5 z-10">
          <Award className="w-3.5 h-3.5 fill-white" />
          <span>🥇 Altın Lig</span>
        </div>
      ) : teacher.featuredBoost ? (
        <div className="absolute top-0 right-0 bg-gradient-to-l from-amber-500 to-orange-500 text-white font-extrabold text-[10px] uppercase px-3.5 py-1 rounded-bl-2xl shadow-md flex items-center gap-1.5 z-10">
          <Sparkles className="w-3.5 h-3.5 fill-white" />
          <span>Öne Çıkan</span>
        </div>
      ) : null}

      <div>
        {/* Header Avatar & Basic Info */}
        <div className="flex items-start space-x-4 mb-4">
          <div className="relative shrink-0">
            {!imgError && teacher.avatar ? (
              <img
                src={teacher.avatar}
                alt={teacher.name}
                onError={() => setImgError(true)}
                className={`w-16 h-16 rounded-2xl object-cover transition-transform group-hover:scale-105 ${league.avatarFrameClass}`}
              />
            ) : (
              <div className={`w-16 h-16 rounded-2xl bg-emerald-100 text-emerald-700 flex items-center justify-center font-bold text-xl shadow-md ${league.avatarFrameClass}`}>
                <User className="w-8 h-8" />
              </div>
            )}

            {/* League Mini Badge */}
            <div className={`absolute -bottom-2 -left-1 px-1.5 py-0.2 rounded-md text-[10px] font-black shadow-sm ${league.badgeClass}`}>
              {league.emoji} {league.shortName}
            </div>

            {teacher.verified && (
              <CheckCircle2 className="w-5 h-5 text-emerald-600 fill-white absolute -bottom-1 -right-1 shadow-sm" />
            )}
          </div>
          
          <div className="flex-1 min-w-0">
            <div className="flex items-center justify-between gap-2">
              <h3 className="text-base font-extrabold text-slate-900 truncate hover:text-emerald-700 cursor-pointer transition-colors" onClick={() => onSelectTeacher(teacher)}>
                {teacher.name}
              </h3>
              <span className="inline-flex items-center gap-1.5 text-[10px] font-bold text-emerald-800 bg-emerald-100/80 px-2 py-0.5 rounded-full border border-emerald-300/80 shrink-0">
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-600 animate-pulse" />
                <span>Canlı Müsait</span>
              </span>
            </div>
            
            <p className="text-xs text-slate-500 truncate mb-2 font-medium">{teacher.title}</p>
            
            <div className="flex flex-wrap items-center gap-2 text-xs">
              <div className="flex items-center text-amber-700 font-bold bg-amber-50 px-2.5 py-0.5 rounded-lg border border-amber-200">
                <Star className="w-3.5 h-3.5 fill-amber-500 text-amber-500 mr-1" />
                <span>{teacher.rating || '5.0'}</span>
                <span className="text-slate-400 font-normal text-[10px] ml-1">({teacher.reviewCount || 0})</span>
              </div>

              <div className="flex items-center text-slate-600 font-medium">
                <MapPin className="w-3.5 h-3.5 text-emerald-600 mr-1" />
                <span>{teacher.city}, {teacher.district}</span>
              </div>
            </div>
          </div>
        </div>

        {/* Bio snippet */}
        <p className="text-xs text-slate-600 line-clamp-2 mb-4 leading-relaxed bg-slate-50 p-3 rounded-2xl border border-slate-200/80 font-medium">
          "{teacher.about || teacher.bio}"
        </p>

        {/* Subject & Teaching Mode */}
        <div className="flex flex-wrap items-center gap-2 mb-4">
          <span className="px-3 py-1 rounded-xl text-xs font-extrabold bg-emerald-100 text-emerald-800 border border-emerald-200">
            {teacher.subject}
          </span>
          <span className="px-2.5 py-1 rounded-xl text-xs font-semibold bg-slate-100 text-slate-700 border border-slate-200 flex items-center gap-1">
            <Video className="w-3 h-3 text-emerald-600" />
            <span>{teacher.onlineOnly ? 'Online Canlı Ders' : 'Online & Yüz Yüze'}</span>
          </span>
          <span className="px-2.5 py-1 rounded-xl text-xs font-semibold bg-slate-100 text-slate-600 border border-slate-200">
            {teacher.experienceYears || 5} Yıl Deneyim
          </span>
        </div>

        {/* Available Slot Preview */}
        {slots.length > 0 && (
          <div className="mb-4 bg-slate-50 p-3 rounded-2xl border border-slate-200 space-y-2">
            <div className="text-[11px] text-slate-600 font-semibold flex items-center justify-between">
              <span className="flex items-center gap-1">
                <Calendar className="w-3.5 h-3.5 text-emerald-600" />
                <span>En Yakın Seansı Seçin:</span>
              </span>
              <span className="text-[10px] text-emerald-700 font-bold">● Canlı Takvim</span>
            </div>
            <div className="flex items-center gap-1.5 overflow-x-auto custom-scrollbar pb-1">
              {slots.slice(0, 3).map((slot, i) => (
                <button
                  key={i}
                  onClick={() => onQuickBookSlot(teacher, slot)}
                  className="px-2.5 py-1 rounded-xl text-xs bg-emerald-100 hover:bg-emerald-200 text-emerald-900 border border-emerald-300 whitespace-nowrap transition-colors font-semibold"
                >
                  {slot}
                </button>
              ))}
              {slots.length > 3 && (
                <button 
                  onClick={() => onSelectTeacher(teacher)}
                  className="text-[11px] text-slate-500 hover:text-slate-900 px-2 whitespace-nowrap font-semibold"
                >
                  +{slots.length - 3} daha
                </button>
              )}
            </div>
          </div>
        )}
      </div>

      {/* Footer Price & Actions */}
      <div className="pt-3 border-t border-slate-200/80 flex items-center justify-between mt-2">
        <div>
          <span className="text-[10px] text-slate-400 block uppercase font-bold tracking-wider">Saatlik Ücret</span>
          <span className="text-xl font-extrabold text-slate-900">
            {teacher.hourlyRate} <span className="text-xs font-semibold text-emerald-700">₺ / saat</span>
          </span>
        </div>

        <div className="flex items-center space-x-1.5">
          <button
            onClick={() => {
              navigator.clipboard.writeText(`${window.location.origin}/#tutor-${teacher.id}`);
              alert(`" ${teacher.name} " profil bağlantısı kopyalandı!`);
            }}
            className="p-2 rounded-xl bg-slate-100 border border-slate-200 text-slate-600 hover:text-slate-900 hover:bg-slate-200 text-xs font-semibold transition-colors"
            title="Profil Bağlantısını Paylaş"
          >
            <Share2 className="w-4 h-4" />
          </button>
          <button
            onClick={() => onOpenReview(teacher)}
            className="p-2 rounded-xl bg-amber-50 border border-amber-200 text-amber-800 hover:bg-amber-100 text-xs font-semibold transition-colors"
            title="Yorum Yap"
          >
            <MessageSquare className="w-4 h-4" />
          </button>
          <button
            onClick={() => onSelectTeacher(teacher)}
            className="px-3 py-2 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-800 text-xs font-bold transition-all border border-slate-200"
          >
            CV
          </button>
          <button
            onClick={() => onSelectTeacher(teacher)}
            className="px-4 py-2 rounded-xl neumorphic-pill-btn text-white text-xs font-extrabold transition-all flex items-center gap-1 hover:scale-105"
          >
            <span>Ders Al</span>
            <ChevronRight className="w-3.5 h-3.5" />
          </button>
        </div>
      </div>

    </div>
  );
}
