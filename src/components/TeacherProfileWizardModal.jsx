import React, { useState } from 'react';
import { X, User, GraduationCap, MapPin, DollarSign, Calendar, CheckCircle2, Upload, Sparkles, ChevronRight, ChevronLeft, ShieldCheck, Video } from 'lucide-react';
import confetti from 'canvas-confetti';

const AVATAR_OPTIONS = [
  'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150&auto=format&fit=crop&q=80',
  'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&auto=format&fit=crop&q=80',
  'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=150&auto=format&fit=crop&q=80',
  'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=150&auto=format&fit=crop&q=80',
  'https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=150&auto=format&fit=crop&q=80',
  'https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?w=150&auto=format&fit=crop&q=80'
];

export default function TeacherProfileWizardModal({ isOpen, onClose, onCreateTeacherProfile, selectedCity, selectedDistrict }) {
  const [step, setStep] = useState(1);

  // Form State
  const [name, setName] = useState('');
  const [title, setTitle] = useState('');
  const [subject, setSubject] = useState('Matematik');
  const [city, setCity] = useState(selectedCity || 'İstanbul');
  const [district, setDistrict] = useState(selectedDistrict || 'Kadıköy');
  const [hourlyRate, setHourlyRate] = useState(500);
  const [experienceYears, setExperienceYears] = useState(5);
  const [bio, setBio] = useState('');
  const [avatar, setAvatar] = useState(AVATAR_OPTIONS[0]);
  const [customAvatarUrl, setCustomAvatarUrl] = useState('');
  const [lessonModes, setLessonModes] = useState(['Online', 'Yüz Yüze']);
  const [slotsInput, setSlotsInput] = useState('Hafta İçi 18:00, Hafta Sonu 14:00');
  const [requestVerification, setRequestVerification] = useState(true);

  if (!isOpen) return null;

  const handleNext = (e) => {
    e.preventDefault();
    if (step < 3) {
      setStep(step + 1);
    } else {
      handleSubmit();
    }
  };

  const handleSubmit = () => {
    if (!name.trim()) return;

    const availableSlots = slotsInput
      .split(',')
      .map(s => s.trim())
      .filter(Boolean);

    const newTeacher = {
      id: Date.now(),
      name,
      title: title || `${subject} Uzmanı & Eğitim Koçu`,
      subject,
      city,
      district,
      hourlyRate: Number(hourlyRate),
      experienceYears: Number(experienceYears),
      rating: 5.0,
      reviewCount: 1,
      totalStudents: 0,
      avatar: customAvatarUrl.trim() || avatar,
      verified: requestVerification,
      featuredBoost: false,
      points: 100,
      referralCode: `TR-${Math.floor(100000 + Math.random() * 900000)}`,
      availableSlots: availableSlots.length ? availableSlots : ['Hafta İçi 17:00', 'Hafta Sonu 13:00'],
      lessonModes,
      about: bio || `${city} bölgesinde ${experienceYears} yıldır öğrencilere kişiye özel ${subject} dersleri ve exam koçluğu vermekteyim.`
    };

    confetti({ particleCount: 90, spread: 70 });
    onCreateTeacherProfile(newTeacher);
    onClose();

    // Reset Form
    setStep(1);
    setName('');
    setTitle('');
    setBio('');
  };

  return (
    <div 
      onClick={onClose}
      className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/85 backdrop-blur-md animate-fadeIn"
    >
      <div 
        onClick={(e) => e.stopPropagation()}
        className="glass-panel w-full max-w-xl rounded-3xl p-6 sm:p-8 border border-indigo-500/30 shadow-2xl relative space-y-6 max-h-[90vh] overflow-y-auto custom-scrollbar"
      >
        <button 
          onClick={onClose} 
          className="absolute top-5 right-5 p-2 rounded-xl bg-slate-900 border border-slate-800 text-slate-400 hover:text-white transition-colors"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Header */}
        <div className="space-y-2">
          <div className="inline-flex items-center space-x-2 px-3 py-1 rounded-full bg-indigo-500/20 text-indigo-300 text-xs font-bold border border-indigo-500/30">
            <Sparkles className="w-3.5 h-3.5 text-amber-400" />
            <span>Öğretmen & Eğitmen Kayıt Sihirbazı</span>
          </div>
          <h2 className="text-xl sm:text-2xl font-extrabold text-white">Eğitmen Profilinizi Oluşturun</h2>
          <p className="text-xs text-slate-400">
            Türkiye genelindeki binlerce öğrenci ve veliye anında ulaşın, canlı özel ders taleplerine teklif verin.
          </p>
        </div>

        {/* Step Indicator */}
        <div className="flex items-center justify-between border-b border-slate-800 pb-4 text-xs font-bold">
          <div className={`flex items-center gap-2 ${step >= 1 ? 'text-emerald-400' : 'text-slate-500'}`}>
            <span className="w-6 h-6 rounded-full bg-slate-900 border border-current flex items-center justify-center text-[11px]">1</span>
            <span>Kişisel Bilgiler</span>
          </div>
          <div className={`flex items-center gap-2 ${step >= 2 ? 'text-emerald-400' : 'text-slate-500'}`}>
            <span className="w-6 h-6 rounded-full bg-slate-900 border border-current flex items-center justify-center text-[11px]">2</span>
            <span>Ders & Ücret</span>
          </div>
          <div className={`flex items-center gap-2 ${step >= 3 ? 'text-emerald-400' : 'text-slate-500'}`}>
            <span className="w-6 h-6 rounded-full bg-slate-900 border border-current flex items-center justify-center text-[11px]">3</span>
            <span>Biyografi & Onay</span>
          </div>
        </div>

        <form onSubmit={handleNext} className="space-y-5">

          {/* STEP 1: Kişisel Bilgiler */}
          {step === 1 && (
            <div className="space-y-4 animate-fadeIn">
              <div>
                <label className="block text-xs font-semibold text-slate-300 mb-1">Ad Soyad *</label>
                <input
                  type="text"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  placeholder="Örn: Dr. Selin Yılmaz"
                  className="w-full glass-input rounded-xl px-3.5 py-2.5 text-xs text-white"
                  required
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-300 mb-1">Unvan / Uzmanlık Başlığı</label>
                <input
                  type="text"
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                  placeholder="Örn: ODTÜ Dereceli Matematik Öğretmeni & YKS Koçu"
                  className="w-full glass-input rounded-xl px-3.5 py-2.5 text-xs text-white"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-semibold text-slate-300 mb-1">Şehir</label>
                  <input
                    type="text"
                    value={city}
                    onChange={(e) => setCity(e.target.value)}
                    className="w-full glass-input rounded-xl px-3.5 py-2.5 text-xs text-white"
                    required
                  />
                </div>
                <div>
                  <label className="block text-xs font-semibold text-slate-300 mb-1">İlçe</label>
                  <input
                    type="text"
                    value={district}
                    onChange={(e) => setDistrict(e.target.value)}
                    className="w-full glass-input rounded-xl px-3.5 py-2.5 text-xs text-white"
                    required
                  />
                </div>
              </div>

              {/* Avatar Selection */}
              <div>
                <label className="block text-xs font-semibold text-slate-300 mb-2">Profil Fotoğrafı Seçin</label>
                <div className="flex items-center space-x-2 overflow-x-auto custom-scrollbar pb-2">
                  {AVATAR_OPTIONS.map((img, idx) => (
                    <img
                      key={idx}
                      src={img}
                      alt="Avatar"
                      onClick={() => { setAvatar(img); setCustomAvatarUrl(''); }}
                      className={`w-12 h-12 rounded-xl object-cover cursor-pointer border-2 transition-all shrink-0 ${
                        avatar === img && !customAvatarUrl ? 'border-emerald-400 scale-110 shadow-lg' : 'border-slate-800 opacity-60'
                      }`}
                    />
                  ))}
                </div>
                <input
                  type="text"
                  value={customAvatarUrl}
                  onChange={(e) => setCustomAvatarUrl(e.target.value)}
                  placeholder="Veya Özel Fotoğraf URL'si yapıştırın..."
                  className="w-full glass-input rounded-xl px-3.5 py-2 text-xs text-white mt-1"
                />
              </div>
            </div>
          )}

          {/* STEP 2: Ders & Ücret */}
          {step === 2 && (
            <div className="space-y-4 animate-fadeIn">
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-semibold text-slate-300 mb-1">Ana Branş</label>
                  <select
                    value={subject}
                    onChange={(e) => setSubject(e.target.value)}
                    className="w-full glass-input rounded-xl px-3 py-2.5 text-xs text-white"
                  >
                    <option value="Matematik" className="bg-slate-900">Matematik</option>
                    <option value="Fizik" className="bg-slate-900">Fizik</option>
                    <option value="Kimya" className="bg-slate-900">Kimya</option>
                    <option value="Biyoloji" className="bg-slate-900">Biyoloji</option>
                    <option value="Geometri" className="bg-slate-900">Geometri</option>
                    <option value="Türkçe & Edebiyat" className="bg-slate-900">Türkçe & Edebiyat</option>
                    <option value="İngilizce & Dil" className="bg-slate-900">İngilizce & Dil</option>
                    <option value="Tarih & Coğrafya" className="bg-slate-900">Tarih & Coğrafya</option>
                    <option value="YKS / LGS Koçluk" className="bg-slate-900">YKS / LGS Koçluk</option>
                  </select>
                </div>
                <div>
                  <label className="block text-xs font-semibold text-slate-300 mb-1">Deneyim (Yıl)</label>
                  <input
                    type="number"
                    min="1"
                    max="35"
                    value={experienceYears}
                    onChange={(e) => setExperienceYears(e.target.value)}
                    className="w-full glass-input rounded-xl px-3.5 py-2.5 text-xs text-white"
                    required
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-300 mb-1">
                  Saatlik Birebir Ders Ücreti: <span className="text-emerald-400 font-extrabold">{hourlyRate} ₺ / saat</span>
                </label>
                <input
                  type="range"
                  min="200"
                  max="2000"
                  step="50"
                  value={hourlyRate}
                  onChange={(e) => setHourlyRate(e.target.value)}
                  className="w-full accent-emerald-500"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-300 mb-1">Uygun Boş Saatleriniz (Virgülle Ayırın)</label>
                <input
                  type="text"
                  value={slotsInput}
                  onChange={(e) => setSlotsInput(e.target.value)}
                  placeholder="Örn: Salı 18:00, Perşembe 19:00, Cumartesi 14:00"
                  className="w-full glass-input rounded-xl px-3.5 py-2.5 text-xs text-white"
                />
              </div>
            </div>
          )}

          {/* STEP 3: Biyografi & Mavi Tik */}
          {step === 3 && (
            <div className="space-y-4 animate-fadeIn">
              <div>
                <label className="block text-xs font-semibold text-slate-300 mb-1">Hakkınızda Tanıtım Yazısı</label>
                <textarea
                  rows={3}
                  value={bio}
                  onChange={(e) => setBio(e.target.value)}
                  placeholder="Eğitim geçmişiniz, derece öğrencileriniz ve ders anlatım tarzınız..."
                  className="w-full glass-input rounded-xl px-3.5 py-2.5 text-xs text-white"
                />
              </div>

              <div className="p-4 rounded-2xl bg-indigo-950/40 border border-indigo-500/30 space-y-2">
                <div className="flex items-center justify-between">
                  <span className="text-xs font-bold text-white flex items-center gap-1.5">
                    <ShieldCheck className="w-4 h-4 text-emerald-400" />
                    <span>Mavi Tik Doğrulanmış Eğitmen Rozeti</span>
                  </span>
                  <input
                    type="checkbox"
                    checked={requestVerification}
                    onChange={(e) => setRequestVerification(e.target.checked)}
                    className="w-4 h-4 accent-emerald-500 rounded cursor-pointer"
                  />
                </div>
                <p className="text-[11px] text-slate-300">
                  Rozet başvurunuz onaylandığında profiliniz aramalarda üst sıralara taşınır ve velilerin güvenilirliği artar.
                </p>
              </div>
            </div>
          )}

          {/* Navigation Buttons */}
          <div className="flex items-center justify-between pt-4 border-t border-slate-800">
            {step > 1 ? (
              <button
                type="button"
                onClick={() => setStep(step - 1)}
                className="px-4 py-2.5 rounded-xl bg-slate-900 border border-slate-800 text-slate-300 hover:text-white text-xs font-bold flex items-center gap-1"
              >
                <ChevronLeft className="w-4 h-4" />
                <span>Geri</span>
              </button>
            ) : <div />}

            <button
              type="submit"
              className="px-6 py-2.5 rounded-xl bg-gradient-to-r from-emerald-600 to-teal-600 hover:from-emerald-500 hover:to-teal-500 text-white font-extrabold text-xs shadow-lg shadow-emerald-600/30 flex items-center gap-1.5"
            >
              <span>{step === 3 ? 'Profilimi Yayınla' : 'Devam Et'}</span>
              <ChevronRight className="w-4 h-4" />
            </button>
          </div>

        </form>
      </div>
    </div>
  );
}
