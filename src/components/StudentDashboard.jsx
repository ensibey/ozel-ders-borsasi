import React, { useState } from 'react';
import { 
  User, Target, Calendar, Video, Plus, CheckCircle2, 
  Play, BookOpen, Clock, Award, ChevronRight, Flame, FileText, Settings, AlertCircle, Trash2 
} from 'lucide-react';
import StudentNetTracker from './StudentNetTracker';

export default function StudentDashboard({ 
  goals = [], 
  onAddGoal,
  onUpdateGoalProgress,
  onDeleteGoal,
  schedule = [], 
  recordings = [], 
  purchasedProducts = [],
  onOpenClassroom, 
  selectedCity, 
  selectedDistrict,
  onOpenPomodoro,
  onOpenCertificate
}) {
  const [activeTab, setActiveTab] = useState('goals'); // 'goals', 'schedule', 'archive', 'library'
  const [studentCategory, setStudentCategory] = useState('YKS (TYT/AYT Sayısal)');
  const [studentName, setStudentName] = useState('Mert Yılmaz');
  const [showCategorySettings, setShowCategorySettings] = useState(false);

  const [showGoalModal, setShowGoalModal] = useState(false);
  const [newGoalTitle, setNewGoalTitle] = useState('');
  const [newGoalCategory, setNewGoalCategory] = useState('Net / Puan Hedefi');
  const [newGoalTargetDate, setNewGoalTargetDate] = useState('15 Ekim 2026');
  const [playingVideo, setPlayingVideo] = useState(null);

  const conceptOptions = [
    '🎓 YKS (TYT / AYT Sayısal)',
    '⚖️ YKS (Eşit Ağırlık / Sözel)',
    '🏫 LGS (Lise Geçiş Hazırlık)',
    '💼 KPSS (Kamu Personeli)',
    '🔬 ALES & DGS (Lisansüstü)',
    '🌐 YDS / TOEFL / Yabancı Dil',
    '🎒 Okul Takviye (İlkokul/Ortaokul/Lise)',
    '🎨 Sanat, Müzik & Kodlama (Yazılım)'
  ];

  const handleCreateGoal = (e) => {
    e.preventDefault();
    if (!newGoalTitle) return;

    onAddGoal({
      id: 'g_' + Date.now(),
      title: newGoalTitle,
      category: newGoalCategory,
      progress: 10,
      targetDate: newGoalTargetDate,
      status: 'Yeni Başladı'
    });

    setNewGoalTitle('');
    setShowGoalModal(false);
  };

  return (
    <div className="space-y-8 animate-fadeIn">
      
      {/* Student Profile Overview Card */}
      <div className="glass-panel p-6 sm:p-8 rounded-3xl border border-indigo-500/30 bg-gradient-to-r from-slate-900 via-indigo-950/40 to-slate-900 flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
        <div className="flex items-center space-x-4">
          <div className="w-20 h-20 rounded-2xl bg-gradient-to-tr from-indigo-600 to-violet-600 flex items-center justify-center text-white font-extrabold text-2xl shadow-xl shadow-indigo-600/30 border-2 border-white/20">
            {studentName.split(' ').map(n => n[0]).join('')}
          </div>
          <div>
            <div className="flex items-center gap-2">
              <h1 className="text-2xl font-extrabold text-white">{studentName}</h1>
              <button
                onClick={() => setShowCategorySettings(!showCategorySettings)}
                className="px-3 py-1 rounded-full bg-indigo-500/20 text-indigo-300 text-xs font-bold border border-indigo-500/30 hover:bg-indigo-500/30 flex items-center gap-1"
              >
                <span>{studentCategory}</span>
                <Settings className="w-3.5 h-3.5 ml-0.5 text-indigo-400" />
              </button>
            </div>

            <p className="text-xs text-slate-300 mt-1">
              📍 Konum: <span className="text-indigo-400 font-semibold">{selectedCity} {selectedDistrict ? `/ ${selectedDistrict}` : ''}</span>
            </p>

            <div className="flex items-center gap-4 text-xs text-slate-400 mt-2">
              <span className="flex items-center gap-1 text-emerald-400 font-semibold">
                <CheckCircle2 className="w-3.5 h-3.5" />
                <span>{recordings.length} Tamamlanan Ders</span>
              </span>
              <span className="flex items-center gap-1 text-amber-400 font-semibold">
                <Award className="w-3.5 h-3.5" />
                <span>350 Borsa Puanı</span>
              </span>
            </div>
          </div>
        </div>

        <div className="flex flex-col sm:flex-row items-center gap-3 w-full md:w-auto">
          <button
            onClick={onOpenPomodoro}
            className="w-full sm:w-auto px-4 py-3 rounded-2xl bg-slate-900 border border-amber-500/40 hover:bg-slate-800 text-amber-300 font-bold text-xs shadow-md flex items-center justify-center gap-2"
          >
            <Flame className="w-4 h-4 text-amber-400" />
            <span>Pomodoro Sayacı</span>
          </button>

          <button
            onClick={onOpenCertificate}
            className="w-full sm:w-auto px-4 py-3 rounded-2xl bg-slate-900 border border-indigo-500/40 hover:bg-slate-800 text-indigo-300 font-bold text-xs shadow-md flex items-center justify-center gap-2"
          >
            <FileText className="w-4 h-4 text-indigo-400" />
            <span>Sertifikamı Gör</span>
          </button>

          <button
            onClick={onOpenClassroom}
            className="w-full sm:w-auto px-6 py-3.5 rounded-2xl bg-gradient-to-r from-emerald-600 to-teal-600 hover:from-emerald-500 hover:to-teal-500 text-white font-bold text-sm shadow-xl shadow-emerald-600/25 flex items-center justify-center gap-2 transition-transform hover:scale-105"
          >
            <Video className="w-5 h-5 animate-pulse" />
            <span>Canlı Sanal Sınıfa Gir</span>
          </button>
        </div>
      </div>

      {/* Category / Concept Settings Popup */}
      {showCategorySettings && (
        <div className="glass-panel p-5 rounded-2xl border border-indigo-500/30 bg-slate-900/90 space-y-3 animate-fadeIn">
          <h3 className="text-xs font-bold text-white uppercase tracking-wider">Kendi Öğrenci Konseptinizi Seçin:</h3>
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 text-xs">
            {conceptOptions.map((opt, i) => (
              <button
                key={i}
                onClick={() => { setStudentCategory(opt); setShowCategorySettings(false); }}
                className={`p-2.5 rounded-xl border text-left font-bold transition-all ${
                  studentCategory === opt
                    ? 'bg-indigo-600 border-indigo-500 text-white shadow-md'
                    : 'bg-slate-950/60 border-slate-800 text-slate-300 hover:border-indigo-500/40'
                }`}
              >
                {opt}
              </button>
            ))}
          </div>
        </div>
      )}

      {/* Tabs Bar */}
      <div className="flex items-center space-x-2 border-b border-slate-800 pb-3 text-xs font-bold overflow-x-auto custom-scrollbar">
        <button
          onClick={() => setActiveTab('goals')}
          className={`px-4 py-2.5 rounded-xl flex items-center gap-2 transition-all ${
            activeTab === 'goals'
              ? 'bg-indigo-600 text-white shadow-lg shadow-indigo-600/20'
              : 'text-slate-400 hover:text-white hover:bg-slate-900'
          }`}
        >
          <Target className="w-4 h-4" />
          <span>Öğrenci Hedefleri & Puan Takibi ({goals.length})</span>
        </button>

        <button
          onClick={() => setActiveTab('schedule')}
          className={`px-4 py-2.5 rounded-xl flex items-center gap-2 transition-all ${
            activeTab === 'schedule'
              ? 'bg-indigo-600 text-white shadow-lg shadow-indigo-600/20'
              : 'text-slate-400 hover:text-white hover:bg-slate-900'
          }`}
        >
          <Calendar className="w-4 h-4" />
          <span>Ders Çalışma Planları ({schedule.length})</span>
        </button>

        <button
          onClick={() => setActiveTab('archive')}
          className={`px-4 py-2.5 rounded-xl flex items-center gap-2 transition-all ${
            activeTab === 'archive'
              ? 'bg-indigo-600 text-white shadow-lg shadow-indigo-600/20'
              : 'text-slate-400 hover:text-white hover:bg-slate-900'
          }`}
        >
          <Video className="w-4 h-4" />
          <span>Ders Sonu Video Arşivi ({recordings.length})</span>
        </button>

        <button
          onClick={() => setActiveTab('library')}
          className={`px-4 py-2.5 rounded-xl flex items-center gap-2 transition-all ${
            activeTab === 'library'
              ? 'bg-indigo-600 text-white shadow-lg shadow-indigo-600/20'
              : 'text-slate-400 hover:text-white hover:bg-slate-900'
          }`}
        >
          <BookOpen className="w-4 h-4 text-emerald-400" />
          <span>Dijital Kütüphanem ({purchasedProducts.length})</span>
        </button>
      </div>

      {/* TAB 1: Öğrenci Hedefleri & Net Takibi */}
      {activeTab === 'goals' && (
        <div className="space-y-6">
          <StudentNetTracker studentCategory={studentCategory} />

          <div className="flex items-center justify-between">
            <div>
              <h2 className="text-lg font-bold text-white flex items-center gap-2">
                <Target className="w-5 h-5 text-indigo-400" />
                <span>Akademik ve Bireysel Hedeflerim</span>
              </h2>
              <p className="text-xs text-slate-400">Hedeflerinizi belirleyip ilerlemenizi anlık olarak takip edin.</p>
            </div>
            <button
              onClick={() => setShowGoalModal(true)}
              className="px-4 py-2 rounded-xl bg-indigo-600 hover:bg-indigo-500 text-white text-xs font-bold transition-all shadow-md flex items-center gap-1.5"
            >
              <Plus className="w-4 h-4" />
              <span>Yeni Hedef Ekle</span>
            </button>
          </div>

          {goals.length === 0 ? (
            <div className="glass-panel p-10 rounded-3xl text-center border border-slate-800 space-y-3">
              <Target className="w-12 h-12 text-slate-600 mx-auto" />
              <h3 className="text-base font-bold text-white">Henüz Eklenmiş Hedef Bulunmuyor</h3>
              <p className="text-xs text-slate-400">İlk ders veya çalışma hedefinizi 1 dakikada ekleyin.</p>
              <button
                onClick={() => setShowGoalModal(true)}
                className="px-4 py-2 rounded-xl bg-indigo-600 text-white text-xs font-bold"
              >
                + İlk Hedefini Tanımla
              </button>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {goals.map((g) => (
                <div key={g.id} className="glass-card p-5 rounded-2xl border border-slate-800 space-y-3">
                  <div className="flex items-center justify-between">
                    <span className="px-2.5 py-0.5 rounded-full bg-indigo-500/20 text-indigo-300 text-[10px] font-bold border border-indigo-500/30">
                      {g.category}
                    </span>
                    <div className="flex items-center space-x-2">
                      <span className="text-[11px] text-slate-400 flex items-center gap-1">
                        <Clock className="w-3 h-3 text-indigo-400" />
                        <span>Son Tarih: {g.targetDate}</span>
                      </span>
                      {onDeleteGoal && (
                        <button
                          onClick={() => onDeleteGoal(g.id)}
                          className="text-slate-500 hover:text-rose-400 p-0.5 transition-colors"
                          title="Hedefi Sil"
                        >
                          <Trash2 className="w-3.5 h-3.5" />
                        </button>
                      )}
                    </div>
                  </div>

                  <h3 className="text-sm font-bold text-white">{g.title}</h3>

                  <div>
                    <div className="flex justify-between text-xs mb-1.5">
                      <span className="text-slate-400">İlerleme Oranı</span>
                      <span className="font-bold text-indigo-400">{g.progress}%</span>
                    </div>
                    <div className="w-full bg-slate-900 rounded-full h-2.5 overflow-hidden p-0.5 border border-slate-800 mb-2">
                      <div
                        className="bg-gradient-to-r from-indigo-500 to-violet-500 h-full rounded-full transition-all duration-500"
                        style={{ width: `${Math.min(100, g.progress)}%` }}
                      />
                    </div>

                    {onUpdateGoalProgress && (
                      <div className="flex items-center justify-end space-x-2 pt-1">
                        <button
                          onClick={() => onUpdateGoalProgress(g.id, Math.min(100, g.progress + 15))}
                          className="px-2.5 py-1 rounded-lg bg-indigo-600/20 hover:bg-indigo-600/30 text-indigo-300 text-[11px] font-semibold border border-indigo-500/30"
                        >
                          +15% İlerle
                        </button>
                        <button
                          onClick={() => onUpdateGoalProgress(g.id, 100)}
                          className="px-2.5 py-1 rounded-lg bg-emerald-600/20 hover:bg-emerald-600/30 text-emerald-300 text-[11px] font-bold border border-emerald-500/30"
                        >
                          ✓ Tamamla
                        </button>
                      </div>
                    )}
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      )}

      {/* TAB 2: Öğrenci Haftalık Ders Çalışma Planı */}
      {activeTab === 'schedule' && (
        <div className="space-y-4">
          <div className="flex items-center justify-between bg-slate-900/60 p-4 rounded-2xl border border-slate-800">
            <div>
              <h2 className="text-base font-bold text-white">Haftalık Canlı & Bireysel Etüd Programım</h2>
              <p className="text-xs text-slate-400">Canlı ders saatlerinizi ve bireysel soru seanslarınızı planlayın.</p>
            </div>
          </div>

          {schedule.length === 0 ? (
            <div className="glass-panel p-10 rounded-3xl text-center border border-slate-800 space-y-3">
              <Calendar className="w-12 h-12 text-slate-600 mx-auto" />
              <h3 className="text-base font-bold text-white">Planlanmış Canlı Dersiniz Bulunmuyor</h3>
              <p className="text-xs text-slate-400">Pazar yerindeki uzman öğretmenlerden ders randevusu alın veya talep oluşturun.</p>
            </div>
          ) : (
            <div className="space-y-3">
              {schedule.map((item, idx) => (
                <div key={idx} className="p-4 rounded-2xl bg-slate-900/60 border border-slate-800 flex items-center justify-between gap-4">
                  <div className="flex items-center space-x-4">
                    <div className="w-12 h-12 rounded-xl bg-indigo-600/20 text-indigo-400 font-bold text-xs flex flex-col items-center justify-center border border-indigo-500/30">
                      <span>{item.day}</span>
                    </div>
                    <div>
                      <h4 className="text-sm font-bold text-white">{item.subject}</h4>
                      <div className="text-xs text-slate-400 mt-0.5">{item.time} • {item.mode}</div>
                    </div>
                  </div>
                  <span className="px-3 py-1 rounded-lg text-xs font-semibold bg-emerald-500/20 text-emerald-400 border border-emerald-500/30">
                    {item.status}
                  </span>
                </div>
              ))}
            </div>
          )}
        </div>
      )}

      {/* TAB 3: Ders Sonu Video Kayıtları Arşivi */}
      {activeTab === 'archive' && (
        <div className="space-y-6">
          <div className="bg-slate-900/60 p-4 rounded-2xl border border-slate-800">
            <h2 className="text-base font-bold text-white flex items-center gap-2">
              <Video className="w-5 h-5 text-emerald-400" />
              <span>Ders Sonu Kayıtlı Video Arşivi</span>
            </h2>
            <p className="text-xs text-slate-400">
              Tamamlanan tüm canlı derslerinizin kayıt videolarını tekrar tekrar izleyebilirsiniz.
            </p>
          </div>

          {recordings.length === 0 ? (
            <div className="glass-panel p-10 rounded-3xl text-center border border-slate-800 space-y-3">
              <Video className="w-12 h-12 text-slate-600 mx-auto" />
              <h3 className="text-base font-bold text-white">Henüz Kayıtlı Video Arşivi Yok</h3>
              <p className="text-xs text-slate-400">Tamamladığınız canlı derslerin video kayıtları otomatik buraya düşecektir.</p>
            </div>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
              {recordings.map((rec) => (
                <div key={rec.id} className="glass-card rounded-2xl p-4 border border-slate-800 space-y-3">
                  <div className="relative rounded-xl overflow-hidden aspect-video bg-slate-950 group cursor-pointer" onClick={() => setPlayingVideo(rec)}>
                    <img src={rec.thumbnail} alt={rec.topic} className="w-full h-full object-cover group-hover:scale-105 transition-transform" />
                    <div className="absolute inset-0 bg-slate-950/40 flex items-center justify-center group-hover:bg-slate-950/20 transition-all">
                      <div className="w-12 h-12 rounded-full bg-emerald-500 text-slate-950 flex items-center justify-center shadow-lg shadow-emerald-500/40 group-hover:scale-110 transition-transform">
                        <Play className="w-6 h-6 fill-slate-950 ml-0.5" />
                      </div>
                    </div>
                    <span className="absolute bottom-2 right-2 px-2 py-0.5 rounded bg-slate-950/80 text-white text-[10px] font-mono">
                      {rec.duration}
                    </span>
                  </div>

                  <div>
                    <span className="text-[10px] text-indigo-400 font-bold uppercase">{rec.subject}</span>
                    <h3 className="text-sm font-bold text-white line-clamp-1">{rec.topic}</h3>
                    <div className="text-xs text-slate-400 mt-1">Eğitmen: {rec.tutorName} • {rec.date}</div>
                  </div>

                  <div className="pt-2 border-t border-slate-800 flex items-center justify-between">
                    <span className="text-xs text-emerald-400 font-medium flex items-center gap-1">
                      <BookOpen className="w-3.5 h-3.5" />
                      <span>Ders Notu PDF Mevcut</span>
                    </span>
                    <button
                      onClick={() => setPlayingVideo(rec)}
                      className="text-xs text-indigo-400 hover:text-indigo-300 font-bold flex items-center gap-1"
                    >
                      <span>Videoyu İzle</span>
                      <ChevronRight className="w-3.5 h-3.5" />
                    </button>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      )}

      {/* TAB 4: Dijital Kütüphanem (Satın Alınan Materyaller) */}
      {activeTab === 'library' && (
        <div className="space-y-6 animate-fadeIn">
          <div className="bg-slate-900/60 p-4 rounded-2xl border border-slate-800 flex items-center justify-between">
            <div>
              <h2 className="text-base font-bold text-white flex items-center gap-2">
                <BookOpen className="w-5 h-5 text-emerald-400" />
                <span>Dijital Kütüphanem & Satın Alınan Kitaplar</span>
              </h2>
              <p className="text-xs text-slate-400">
                Satış alanından satın aldığınız tüm soru bankaları, deneme sınavı PDF'leri ve koçluk yayınları buraya tanımlanır.
              </p>
            </div>
          </div>

          {purchasedProducts.length === 0 ? (
            <div className="glass-panel p-10 rounded-3xl text-center border border-slate-800 space-y-3">
              <BookOpen className="w-12 h-12 text-slate-600 mx-auto" />
              <h3 className="text-base font-bold text-white">Henüz Satın Alınan Materyal Yok</h3>
              <p className="text-xs text-slate-400">Satış alanındaki yetkili yayın evi kitaplarını sepete ekleyip hemen dijital kütüphanenize aktarabilirsiniz.</p>
            </div>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
              {purchasedProducts.map((prod, idx) => (
                <div key={idx} className="glass-card rounded-2xl p-4 border border-slate-800 space-y-3">
                  <div className="relative rounded-xl overflow-hidden aspect-[4/3] bg-slate-950">
                    <img src={prod.image} alt={prod.name} className="w-full h-full object-cover" />
                    <span className="absolute top-2 left-2 px-2 py-0.5 rounded bg-emerald-600 text-white text-[10px] font-bold">
                      Dijital Erişim Aktif
                    </span>
                  </div>

                  <div>
                    <span className="text-[10px] text-indigo-400 font-bold uppercase">{prod.vendor}</span>
                    <h3 className="text-sm font-bold text-white line-clamp-1">{prod.name}</h3>
                    <div className="text-xs text-slate-400 mt-1">{prod.category}</div>
                  </div>

                  <div className="pt-2 border-t border-slate-800 flex items-center justify-between">
                    <span className="text-xs text-emerald-400 font-semibold">Ödendi ({prod.price} ₺)</span>
                    <button
                      onClick={() => alert(`"${prod.name}" dijital fasikülü indiriliyor...`)}
                      className="px-3 py-1.5 rounded-xl bg-indigo-600 hover:bg-indigo-500 text-white text-xs font-bold transition-all shadow-md"
                    >
                      PDF İndir
                    </button>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      )}

      {/* Add Goal Modal */}
      {showGoalModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/80 backdrop-blur-md">
          <div className="glass-panel w-full max-w-md rounded-2xl p-6 border border-slate-800 space-y-4">
            <h3 className="text-lg font-bold text-white">Yeni Bireysel Hedef Ekle</h3>

            <div>
              <label className="block text-xs font-semibold text-slate-300 mb-1">Hedef Tanımı</label>
              <input
                type="text"
                value={newGoalTitle}
                onChange={(e) => setNewGoalTitle(e.target.value)}
                placeholder="Örn: 20 Günde 1000 Problem Çözümü"
                className="w-full glass-input rounded-xl px-3 py-2 text-xs text-white"
              />
            </div>

            <div>
              <label className="block text-xs font-semibold text-slate-300 mb-1">Kategori</label>
              <select
                value={newGoalCategory}
                onChange={(e) => setNewGoalCategory(e.target.value)}
                className="w-full glass-input rounded-xl px-3 py-2 text-xs text-white"
              >
                <option value="Net / Puan Hedefi" className="bg-slate-900">Net / Puan Hedefi</option>
                <option value="Konu Tamamlama" className="bg-slate-900">Konu Tamamlama</option>
                <option value="Soru Çözüm Hedefi" className="bg-slate-900">Soru Çözüm Hedefi</option>
                <option value="Dil & Beceri Gelişimi" className="bg-slate-900">Dil & Beceri Gelişimi</option>
              </select>
            </div>

            <div className="flex items-center justify-end space-x-2 pt-2">
              <button
                type="button"
                onClick={() => setShowGoalModal(false)}
                className="px-4 py-2 rounded-xl text-xs text-slate-400 hover:text-white"
              >
                İptal
              </button>
              <button
                type="button"
                onClick={handleCreateGoal}
                className="px-5 py-2 rounded-xl bg-indigo-600 hover:bg-indigo-500 text-white font-bold text-xs"
              >
                Hedefi Kaydet
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Video Modal Player */}
      {playingVideo && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/90 backdrop-blur-md">
          <div className="glass-panel w-full max-w-3xl rounded-3xl p-6 border border-slate-800 relative space-y-4">
            <div className="flex items-center justify-between">
              <div>
                <h3 className="text-base font-bold text-white">{playingVideo.topic}</h3>
                <p className="text-xs text-slate-400">{playingVideo.tutorName} • {playingVideo.subject}</p>
              </div>
              <button onClick={() => setPlayingVideo(null)} className="p-2 rounded-xl bg-slate-900 text-slate-400 hover:text-white">
                ✕
              </button>
            </div>
            <div className="rounded-2xl overflow-hidden aspect-video bg-black flex items-center justify-center text-slate-400">
              <video src={playingVideo.videoUrl} controls autoPlay className="w-full h-full" onError={(e) => {
                e.target.style.display = 'none';
              }} />
              <div className="text-center p-6 space-y-2">
                <AlertCircle className="w-10 h-10 text-amber-400 mx-auto animate-bounce" />
                <p className="text-sm font-bold text-white">Canlı Ders Video Tekrarı Başarıyla Yüklendi</p>
                <p className="text-xs text-slate-400">Demo video yayını Öğrenci Paneli ders arşivinizle senkronize edilmiştir.</p>
              </div>
            </div>
          </div>
        </div>
      )}

    </div>
  );
}
