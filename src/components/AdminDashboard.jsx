import React, { useState } from 'react';
import { 
  ShieldAlert, Users, CheckCircle2, XCircle, Award, Store, 
  DollarSign, TrendingUp, Bell, Sparkles, Sliders, Check, Trash2, Eye 
} from 'lucide-react';
import confetti from 'canvas-confetti';

export default function AdminDashboard({ 
  teachers, 
  onUpdateTeacher, 
  products, 
  onUpdateProduct, 
  announcements = [], 
  onAddAnnouncement,
  onDeleteAnnouncement,
  platformCommission = 10,
  onUpdateCommission
}) {
  const [activeTab, setActiveTab] = useState('overview'); // 'overview', 'teachers', 'products', 'broadcast', 'settings'
  const [broadcastTitle, setBroadcastTitle] = useState('');
  const [broadcastContent, setBroadcastContent] = useState('');
  const [broadcastTarget, setBroadcastTarget] = useState('Tüm Kullanıcılar');

  // Stats
  const totalTeachers = teachers.length;
  const totalProducts = products.length;
  const verifiedTeachersCount = teachers.filter(t => t.verified).length;
  const featuredTeachersCount = teachers.filter(t => t.featuredBoost).length;

  const handleVerifyTeacher = (teacher) => {
    onUpdateTeacher({
      ...teacher,
      verified: !teacher.verified
    });
    if (!teacher.verified) confetti({ particleCount: 60, spread: 60 });
  };

  const handleToggleBoostTeacher = (teacher) => {
    onUpdateTeacher({
      ...teacher,
      featuredBoost: !teacher.featuredBoost
    });
    if (!teacher.featuredBoost) confetti({ particleCount: 70, spread: 70 });
  };

  const handleSendAdminBroadcast = (e) => {
    e.preventDefault();
    if (!broadcastTitle || !broadcastContent) return;

    onAddAnnouncement({
      id: 'a_admin_' + Date.now(),
      title: '👑 [YÖNETİCİ DUYURUSU] ' + broadcastTitle,
      category: 'Sistem Duyurusu',
      date: 'Şimdi',
      target: broadcastTarget,
      content: broadcastContent,
      important: true
    });

    confetti({ particleCount: 100, spread: 70 });
    setBroadcastTitle('');
    setBroadcastContent('');
    alert('Yönetici duyurusu sistemdeki tüm kullanıcılara gönderildi!');
  };

  return (
    <div className="space-y-8 animate-fadeIn">
      
      {/* Admin Panel Welcome Banner */}
      <div className="glass-panel p-6 sm:p-8 rounded-3xl border border-rose-500/30 bg-gradient-to-r from-slate-900 via-rose-950/20 to-slate-900 flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
        <div className="flex items-center space-x-4">
          <div className="w-16 h-16 rounded-2xl bg-rose-600/30 text-rose-400 flex items-center justify-center border border-rose-500/40 shadow-lg">
            <ShieldAlert className="w-9 h-9" />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <span className="px-2.5 py-0.5 rounded-full bg-rose-500/20 text-rose-300 text-[11px] font-bold border border-rose-500/30">
                Sistem Yöneticisi
              </span>
              <span className="text-xs text-emerald-400 font-mono font-bold">● Yönetici Oturumu Açık</span>
            </div>
            <h1 className="text-2xl font-extrabold text-white mt-1">Özel Ders Borsası Admin Paneli</h1>
            <p className="text-xs text-slate-300">
              Platform kullanıcılarını, öğretmen onaylarını, mağaza ürünlerini ve komisyon oranlarını yönetin.
            </p>
          </div>
        </div>

        {/* Quick Commission Indicator */}
        <div className="bg-slate-900/80 p-4 rounded-2xl border border-slate-800 text-center w-full md:w-auto shrink-0">
          <div className="text-xs text-slate-400 font-semibold mb-1">Platform Komisyon Oranı</div>
          <div className="text-2xl font-extrabold text-rose-400">%{platformCommission}</div>
          <div className="text-[10px] text-slate-400 mt-0.5">Her Satılan Ders/Materyalden</div>
        </div>
      </div>

      {/* Admin Tabs */}
      <div className="flex items-center space-x-2 border-b border-slate-800 pb-3 text-xs font-bold overflow-x-auto custom-scrollbar">
        <button
          onClick={() => setActiveTab('overview')}
          className={`px-4 py-2.5 rounded-xl flex items-center gap-2 transition-all ${
            activeTab === 'overview'
              ? 'bg-rose-600 text-white shadow-lg shadow-rose-600/20'
              : 'text-slate-400 hover:text-white hover:bg-slate-900'
          }`}
        >
          <TrendingUp className="w-4 h-4" />
          <span>Genel İstatistikler</span>
        </button>

        <button
          onClick={() => setActiveTab('teachers')}
          className={`px-4 py-2.5 rounded-xl flex items-center gap-2 transition-all ${
            activeTab === 'teachers'
              ? 'bg-rose-600 text-white shadow-lg shadow-rose-600/20'
              : 'text-slate-400 hover:text-white hover:bg-slate-900'
          }`}
        >
          <Users className="w-4 h-4" />
          <span>Öğretmen Onay & Yönetim ({totalTeachers})</span>
        </button>

        <button
          onClick={() => setActiveTab('products')}
          className={`px-4 py-2.5 rounded-xl flex items-center gap-2 transition-all ${
            activeTab === 'products'
              ? 'bg-rose-600 text-white shadow-lg shadow-rose-600/20'
              : 'text-slate-400 hover:text-white hover:bg-slate-900'
          }`}
        >
          <Store className="w-4 h-4" />
          <span>Mağaza & Ürün Moderasyonu ({totalProducts})</span>
        </button>

        <button
          onClick={() => setActiveTab('broadcast')}
          className={`px-4 py-2.5 rounded-xl flex items-center gap-2 transition-all ${
            activeTab === 'broadcast'
              ? 'bg-rose-600 text-white shadow-lg shadow-rose-600/20'
              : 'text-slate-400 hover:text-white hover:bg-slate-900'
          }`}
        >
          <Bell className="w-4 h-4" />
          <span>Yönetici Duyuru Merkezi</span>
        </button>

        <button
          onClick={() => setActiveTab('settings')}
          className={`px-4 py-2.5 rounded-xl flex items-center gap-2 transition-all ${
            activeTab === 'settings'
              ? 'bg-rose-600 text-white shadow-lg shadow-rose-600/20'
              : 'text-slate-400 hover:text-white hover:bg-slate-900'
          }`}
        >
          <Sliders className="w-4 h-4" />
          <span>Sistem Ayarları</span>
        </button>
      </div>

      {/* TAB 1: OVERVIEW STATS */}
      {activeTab === 'overview' && (
        <div className="space-y-6">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            
            <div className="glass-card p-5 rounded-2xl border border-slate-800 space-y-2">
              <span className="text-xs text-slate-400 uppercase font-semibold">Toplam Platform Eğitmeni</span>
              <div className="text-3xl font-extrabold text-white">{totalTeachers}</div>
              <div className="text-[11px] text-emerald-400 font-medium">✓ {verifiedTeachersCount} Doğrulanmış Profil</div>
            </div>

            <div className="glass-card p-5 rounded-2xl border border-slate-800 space-y-2">
              <span className="text-xs text-slate-400 uppercase font-semibold">Öne Çıkarılan Eğitmenler</span>
              <div className="text-3xl font-extrabold text-amber-400">{featuredTeachersCount}</div>
              <div className="text-[11px] text-amber-300 font-medium">★ Davet / Puan Tamamlayanlar</div>
            </div>

            <div className="glass-card p-5 rounded-2xl border border-slate-800 space-y-2">
              <span className="text-xs text-slate-400 uppercase font-semibold">Mağazadaki Kitap / Deneme</span>
              <div className="text-3xl font-extrabold text-indigo-400">{totalProducts}</div>
              <div className="text-[11px] text-indigo-300 font-medium">📦 4 Anlaşmalı Yayın Evi</div>
            </div>

            <div className="glass-card p-5 rounded-2xl border border-slate-800 space-y-2">
              <span className="text-xs text-slate-400 uppercase font-semibold">Platform İşlem Hacmi</span>
              <div className="text-3xl font-extrabold text-emerald-400">148,500 ₺</div>
              <div className="text-[11px] text-slate-400">Bu ayki toplam ders & kitap komisyonu</div>
            </div>

          </div>
        </div>
      )}

      {/* TAB 2: TEACHERS MODERATION */}
      {activeTab === 'teachers' && (
        <div className="space-y-4">
          <div className="flex items-center justify-between bg-slate-900/60 p-4 rounded-2xl border border-slate-800">
            <div>
              <h2 className="text-base font-bold text-white">Eğitmen Profil Onayları & Rozet Yönetimi</h2>
              <p className="text-xs text-slate-400">Öğretmenlerin mavi tik doğrulamasını yapın veya öne çıkarma durumunu yönetin.</p>
            </div>
          </div>

          <div className="space-y-3">
            {teachers.map((t) => (
              <div key={t.id} className="p-4 rounded-2xl bg-slate-900/60 border border-slate-800 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
                <div className="flex items-center space-x-3">
                  <img src={t.avatar} alt={t.name} className="w-12 h-12 rounded-xl object-cover" />
                  <div>
                    <div className="flex items-center space-x-2">
                      <h4 className="text-sm font-bold text-white">{t.name}</h4>
                      {t.verified && <CheckCircle2 className="w-4 h-4 text-indigo-400" />}
                      {t.featuredBoost && <Sparkles className="w-4 h-4 text-amber-400" />}
                    </div>
                    <div className="text-xs text-slate-400">{t.title} • {t.city} • {t.hourlyRate} ₺/saat</div>
                  </div>
                </div>

                <div className="flex items-center space-x-2 w-full sm:w-auto">
                  <button
                    onClick={() => handleVerifyTeacher(t)}
                    className={`px-3 py-1.5 rounded-xl text-xs font-bold border transition-colors ${
                      t.verified
                        ? 'bg-indigo-600/20 border-indigo-500 text-indigo-300'
                        : 'bg-slate-800 border-slate-700 text-slate-400 hover:text-white'
                    }`}
                  >
                    {t.verified ? '✓ Mavi Tik (Aktif)' : '+ Mavi Tik Ver'}
                  </button>

                  <button
                    onClick={() => handleToggleBoostTeacher(t)}
                    className={`px-3 py-1.5 rounded-xl text-xs font-bold border transition-colors ${
                      t.featuredBoost
                        ? 'bg-amber-500/20 border-amber-500 text-amber-300'
                        : 'bg-slate-800 border-slate-700 text-slate-400 hover:text-white'
                    }`}
                  >
                    {t.featuredBoost ? '★ Öne Çıkarıldı' : '★ Manuel Öne Çıkar'}
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* TAB 3: PRODUCTS MODERATION */}
      {activeTab === 'products' && (
        <div className="space-y-4">
          <div className="flex items-center justify-between bg-slate-900/60 p-4 rounded-2xl border border-slate-800">
            <div>
              <h2 className="text-base font-bold text-white">Yayın Evi & Mağaza Ürün Moderasyonu</h2>
              <p className="text-xs text-slate-400">Satış alanındaki kitap, dergi ve deneme sınavlarını denetleyin.</p>
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {products.map((p) => (
              <div key={p.id} className="p-4 rounded-2xl bg-slate-900/60 border border-slate-800 flex items-center justify-between">
                <div className="flex items-center space-x-3">
                  <img src={p.image} alt={p.name} className="w-12 h-12 rounded-xl object-cover" />
                  <div>
                    <h4 className="text-xs font-bold text-white line-clamp-1">{p.name}</h4>
                    <div className="text-[11px] text-slate-400">{p.vendor} • {p.price} ₺</div>
                  </div>
                </div>
                <span className="px-2.5 py-1 rounded-lg bg-emerald-500/20 text-emerald-400 text-xs font-semibold border border-emerald-500/30">
                  Onaylı Satışta
                </span>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* TAB 4: ADMIN BROADCAST CENTER */}
      {activeTab === 'broadcast' && (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="glass-panel p-6 rounded-3xl border border-rose-500/30 space-y-4">
            <h2 className="text-base font-bold text-white flex items-center gap-2">
              <Bell className="w-5 h-5 text-rose-400" />
              <span>Tüm Kullanıcılara Yönetici Mesajı Gönder</span>
            </h2>
            <p className="text-xs text-slate-400">
              Yayınlayacağınız duyuru anında platformdaki Öğrenci, Veli, Öğretmen ve Firmaların bildirim merkezine iletilir.
            </p>

            <form onSubmit={handleSendAdminBroadcast} className="space-y-4">
              <div>
                <label className="block text-xs font-semibold text-slate-300 mb-1">Hedef Kitle</label>
                <select
                  value={broadcastTarget}
                  onChange={(e) => setBroadcastTarget(e.target.value)}
                  className="w-full glass-input rounded-xl px-3 py-2 text-xs text-white"
                >
                  <option value="Tüm Kullanıcılar" className="bg-slate-900">Tüm Kullanıcılar (Genel)</option>
                  <option value="Öğretmenler" className="bg-slate-900">Sadece Öğretmenler</option>
                  <option value="Öğrenciler" className="bg-slate-900">Sadece Öğrenciler & Veliler</option>
                  <option value="Firmalar" className="bg-slate-900">Yayın Evleri & Satıcı Firmalar</option>
                </select>
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-300 mb-1">Yönetici Duyuru Başlığı</label>
                <input
                  type="text"
                  value={broadcastTitle}
                  onChange={(e) => setBroadcastTitle(e.target.value)}
                  placeholder="Örn: Sistem Güncellemesi ve Yeni Dönem Kayıtları"
                  className="w-full glass-input rounded-xl px-3 py-2 text-xs text-white"
                  required
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-300 mb-1">Duyuru İçeriği</label>
                <textarea
                  rows={4}
                  value={broadcastContent}
                  onChange={(e) => setBroadcastContent(e.target.value)}
                  placeholder="Duyurunuzu buraya yazın..."
                  className="w-full glass-input rounded-xl px-3 py-2 text-xs text-white"
                  required
                />
              </div>

              <button
                type="submit"
                className="w-full py-3 rounded-xl bg-rose-600 hover:bg-rose-500 text-white font-extrabold text-xs shadow-lg shadow-rose-600/30"
              >
                Yönetici Duyurusunu Anında Yayınla
              </button>
            </form>
          </div>

          <div className="glass-panel p-6 rounded-3xl border border-slate-800 space-y-4">
            <h2 className="text-base font-bold text-white flex items-center justify-between">
              <span>Sistemdeki Aktif Duyurular ({announcements.length})</span>
            </h2>
            <div className="space-y-3 max-h-[420px] overflow-y-auto custom-scrollbar pr-1">
              {announcements.map((a) => (
                <div key={a.id} className="p-3.5 rounded-2xl bg-slate-900/60 border border-slate-800 space-y-2">
                  <div className="flex items-center justify-between">
                    <span className="text-xs font-bold text-rose-300 truncate max-w-[200px]">{a.title}</span>
                    {onDeleteAnnouncement && (
                      <button
                        onClick={() => onDeleteAnnouncement(a.id)}
                        className="p-1 text-slate-500 hover:text-rose-400 transition-colors"
                        title="Duyuruyu Kaldır"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    )}
                  </div>
                  <p className="text-xs text-slate-300 line-clamp-2">{a.content}</p>
                  <div className="text-[10px] text-slate-500">Hedef: {a.target} • {a.date}</div>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* TAB 5: SYSTEM SETTINGS */}
      {activeTab === 'settings' && (
        <div className="glass-panel p-6 rounded-3xl border border-slate-800 space-y-4 max-w-xl">
          <h2 className="text-base font-bold text-white flex items-center gap-2">
            <Sliders className="w-5 h-5 text-indigo-400" />
            <span>Platform Komisyon & Finans Ayarları</span>
          </h2>

          <div className="space-y-4">
            <div>
              <label className="block text-xs font-semibold text-slate-300 mb-1">
                Platform Komisyon Oranı: <span className="text-rose-400 font-bold">%{platformCommission}</span>
              </label>
              <input
                type="range"
                min="5"
                max="25"
                value={platformCommission}
                onChange={(e) => onUpdateCommission && onUpdateCommission(parseInt(e.target.value))}
                className="w-full accent-rose-500"
              />
              <span className="text-[11px] text-slate-400 block mt-1">
                Öğretmen canlı ders ücretleri ve mağaza kitap satışlarından kesilecek platform komisyonu.
              </span>
            </div>

            <div className="pt-3 border-t border-slate-800 flex justify-end">
              <button
                onClick={() => alert('Sistem ayarları güncellendi!')}
                className="px-5 py-2.5 rounded-xl bg-indigo-600 hover:bg-indigo-500 text-white font-bold text-xs shadow-md"
              >
                Ayarları Kaydet
              </button>
            </div>
          </div>
        </div>
      )}

    </div>
  );
}
