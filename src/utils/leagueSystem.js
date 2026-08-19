/**
 * Teacher League & Gamification System Definitions
 * Tiers: Elite (👑), Gold (🥇), Silver (🥈), Bronze (🥉)
 */

export const LEAGUE_TIERS = {
  elite: {
    id: 'elite',
    name: 'Elit Eğitmen (Grandmaster)',
    shortName: 'Elit Lig',
    rankTitle: 'Platformun En İyi %1’i',
    emoji: '👑',
    textColor: 'text-amber-700',
    avatarFrameClass: 'border-2 border-amber-400 ring-4 ring-amber-400/40 shadow-[0_0_20px_rgba(245,158,11,0.45)]',
    badgeClass: 'bg-gradient-to-r from-amber-500 via-yellow-400 to-amber-500 text-slate-950 font-black shadow-md shadow-amber-500/30 border border-yellow-300',
    cardGlowClass: 'hover:border-amber-400/60 hover:shadow-[0_8px_30px_rgb(245,158,11,0.15)]',
    perks: [
      '⚡ Arama ve vitrinde en üstte yer alma (1. Öncelikli Boost)',
      '👑 Parıltılı Altın Profil Çerçevesi ve Elit Mührü',
      '📉 Özel indirimli platform komisyonu (%8)',
      '🛡️ VIP 7/24 Eğitmen Destek Masası'
    ],
    minRating: 4.95,
    minReviews: 50,
    minSessions: 100,
    commissionRate: 8
  },
  gold: {
    id: 'gold',
    name: 'Altın Lig (Gold Master)',
    shortName: 'Altın Lig',
    rankTitle: 'Usta Eğitmen',
    emoji: '🥇',
    textColor: 'text-amber-800',
    avatarFrameClass: 'border-2 border-amber-500 ring-2 ring-amber-500/30 shadow-md shadow-amber-500/20',
    badgeClass: 'bg-gradient-to-r from-amber-500 to-orange-500 text-white font-extrabold shadow-sm border border-amber-300/40',
    cardGlowClass: 'hover:border-amber-500/50 hover:shadow-lg',
    perks: [
      '🚀 Aramalarda 2. Öncelikli Sıralama',
      '🥇 Altın Profil Rozeti ve Çerçeve',
      '📉 İndirimli platform komisyonu (%10)',
      '📢 Aylık 1 adet Ücretsiz Öne Çıkarma Duyurusu'
    ],
    minRating: 4.80,
    minReviews: 20,
    minSessions: 40,
    commissionRate: 10
  },
  silver: {
    id: 'silver',
    name: 'Gümüş Lig (Silver Pro)',
    shortName: 'Gümüş Lig',
    rankTitle: 'Yükselen Yıldız',
    emoji: '🥈',
    textColor: 'text-slate-600',
    avatarFrameClass: 'border-2 border-slate-400 ring-2 ring-slate-400/20 shadow-sm',
    badgeClass: 'bg-slate-800 text-slate-100 font-bold border border-slate-600 shadow-sm',
    cardGlowClass: 'hover:border-slate-400 hover:shadow-md',
    perks: [
      '🥈 Gümüş Profil Rozeti',
      '🔍 Kategori bazlı arama listelemesi',
      '💼 Standart komisyon oranı (%12)'
    ],
    minRating: 4.50,
    minReviews: 10,
    minSessions: 15,
    commissionRate: 12
  },
  bronze: {
    id: 'bronze',
    name: 'Bronz Lig (Rising Star)',
    shortName: 'Bronz Lig',
    rankTitle: 'Yeni Akredite',
    emoji: '🥉',
    textColor: 'text-amber-900',
    avatarFrameClass: 'border border-amber-700/60 ring-1 ring-amber-700/20',
    badgeClass: 'bg-amber-900/80 text-amber-100 font-bold border border-amber-700/50',
    cardGlowClass: 'hover:border-amber-600',
    perks: [
      '🥉 Platforma Katılım Rozeti',
      '🎯 Temel öğrenci ve ihale eşleşmesi',
      '📈 Seans tamamladıkça lig atlama hakkı'
    ],
    minRating: 0,
    minReviews: 0,
    minSessions: 0,
    commissionRate: 14
  }
};

/**
 * Calculates a teacher's league dynamically based on their metrics
 */
export function getTeacherLeague(teacher) {
  if (!teacher) return LEAGUE_TIERS.bronze;
  
  // If explicitly assigned in teacher object
  if (teacher.league && LEAGUE_TIERS[teacher.league]) {
    return LEAGUE_TIERS[teacher.league];
  }

  const rating = Number(teacher.rating) || 0;
  const reviews = Number(teacher.reviewCount) || 0;
  const sessions = Number(teacher.completedLessons || teacher.experienceYears * 10) || 0;

  if (rating >= 4.95 && reviews >= 50) return LEAGUE_TIERS.elite;
  if (rating >= 4.80 && reviews >= 20) return LEAGUE_TIERS.gold;
  if (rating >= 4.50 && reviews >= 5) return LEAGUE_TIERS.silver;
  return LEAGUE_TIERS.bronze;
}

/**
 * Calculates progress percentage and remaining targets to reach the next tier
 */
export function getNextLeagueProgress(teacher) {
  const current = getTeacherLeague(teacher);
  const rating = Number(teacher?.rating) || 0;
  const reviews = Number(teacher?.reviewCount) || 0;
  const sessions = Number(teacher?.completedLessons || teacher?.experienceYears * 10) || 0;

  let next = null;
  if (current.id === 'bronze') next = LEAGUE_TIERS.silver;
  else if (current.id === 'silver') next = LEAGUE_TIERS.gold;
  else if (current.id === 'gold') next = LEAGUE_TIERS.elite;

  if (!next) {
    return {
      isMaxLevel: true,
      currentLeague: current,
      nextLeague: null,
      progressPercent: 100,
      tasks: ['En üst lig olan Elit Lig seviyesine ulaştınız! 👑']
    };
  }

  // Calculate requirement diffs
  const ratingTarget = next.minRating;
  const reviewsTarget = next.minReviews;
  const sessionsTarget = next.minSessions;

  const ratingProgress = Math.min(100, (rating / ratingTarget) * 100);
  const reviewsProgress = Math.min(100, (reviews / reviewsTarget) * 100);
  const sessionsProgress = Math.min(100, (sessions / sessionsTarget) * 100);

  const overallProgress = Math.round((ratingProgress * 0.4) + (reviewsProgress * 0.3) + (sessionsProgress * 0.3));

  const tasks = [];
  if (rating < ratingTarget) {
    tasks.push(`⭐ Puanınızı en az ${ratingTarget} seviyesine çıkarın (Şu an: ${rating})`);
  }
  if (reviews < reviewsTarget) {
    tasks.push(`💬 ${reviewsTarget - reviews} adet daha 5 yıldızlı öğrenci değerlendirmesi alın`);
  }
  if (sessions < sessionsTarget) {
    tasks.push(`📚 ${sessionsTarget - sessions} ders daha tamamlayın`);
  }

  return {
    isMaxLevel: false,
    currentLeague: current,
    nextLeague: next,
    progressPercent: Math.min(99, Math.max(5, overallProgress)),
    tasks
  };
}
