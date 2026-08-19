import React, { useState, useEffect } from 'react';
import { X, Bell, Megaphone, CheckCircle2, MessageSquare, Send, Award, Users } from 'lucide-react';

export default function NotificationDrawer({ isOpen, onClose, announcements, onAddAnnouncement }) {
  const [activeTab, setActiveTab] = useState('all'); // 'all', 'teacher', 'vendor', 'broadcast'
  const [newTitle, setNewTitle] = useState('');
  const [newContent, setNewContent] = useState('');
  const [targetRole, setTargetRole] = useState('Tüm Kullanıcılar');

  
  useEffect(() => {
    if (!isOpen) return;
    const handleKeyDown = (e) => {
      if (e.key === 'Escape') onClose();
    };
    document.body.style.overflow = 'hidden';
    window.addEventListener('keydown', handleKeyDown);
    return () => {
      document.body.style.overflow = 'unset';
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  const handleBroadcast = (e) => {
    e.preventDefault();
    if (!newTitle || !newContent) return;

    onAddAnnouncement({
      id: 'a_' + Date.now(),
      title: newTitle,
      category: 'Toplu Duyuru',
      date: 'Şimdi',
      target: targetRole,
      content: newContent,
      important: true
    });

    setNewTitle('');
    setNewContent('');
  };

  return (
    <div onClick={onClose} className="fixed inset-0 z-50 overflow-hidden bg-slate-950/80 backdrop-blur-md animate-fadeIn">
      <div className="absolute inset-y-0 right-0 max-w-full flex pl-10">
        <div className="w-screen max-w-md glass-panel border-l border-slate-800 p-6 flex flex-col justify-between shadow-2xl relative">
          
          {/* Header */}
          <div className="flex items-center justify-between pb-4 border-b border-slate-800">
            <div className="flex items-center space-x-2">
              <div className="w-9 h-9 rounded-xl bg-amber-500/20 text-amber-400 flex items-center justify-center">
                <Bell className="w-5 h-5" />
              </div>
              <div>
                <h2 className="text-lg font-bold text-white">Duyuru & Mesajlaşma</h2>
                <p className="text-xs text-slate-400">Genel ve Hedef Kitle Bildirimleri</p>
              </div>
            </div>
            <button
              onClick={onClose}
              className="p-2 rounded-xl bg-slate-900 border border-slate-800 text-slate-400 hover:text-white"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Subtabs */}
          <div className="flex items-center space-x-2 my-4 text-xs font-semibold overflow-x-auto custom-scrollbar pb-1">
            <button
              onClick={() => setActiveTab('all')}
              className={`px-3 py-1.5 rounded-lg whitespace-nowrap transition-colors ${
                activeTab === 'all' ? 'bg-indigo-600 text-white' : 'bg-slate-900 text-slate-400 hover:text-white'
              }`}
            >
              Tüm Bildirimler
            </button>
            <button
              onClick={() => setActiveTab('broadcast')}
              className={`px-3 py-1.5 rounded-lg whitespace-nowrap transition-colors ${
                activeTab === 'broadcast' ? 'bg-indigo-600 text-white' : 'bg-slate-900 text-slate-400 hover:text-white'
              }`}
            >
              📣 Yeni Duyuru Yayınla
            </button>
          </div>

          {/* Body Content */}
          {activeTab === 'broadcast' ? (
            /* Broadcast Announcement Form */
            <form onSubmit={handleBroadcast} className="flex-1 py-2 space-y-4 overflow-y-auto custom-scrollbar">
              <div className="p-3.5 rounded-2xl bg-indigo-950/40 border border-indigo-500/30 text-xs text-indigo-200">
                <div className="font-bold mb-1 flex items-center gap-1 text-indigo-300">
                  <Megaphone className="w-4 h-4 text-amber-400" />
                  <span>Toplu Duyuru Gönderimi</span>
                </div>
                Buradan gönderilen mesajlar platformdaki tüm ilgili kullanıcılara anlık bildirim olarak ulaştırılır.
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-300 mb-1">Hedef Kullanıcı Grubu</label>
                <select
                  value={targetRole}
                  onChange={(e) => setTargetRole(e.target.value)}
                  className="w-full glass-input rounded-xl px-3 py-2 text-xs text-white"
                >
                  <option value="Tüm Kullanıcılar" className="bg-slate-900">Tüm Kullanıcılar (Genel)</option>
                  <option value="Öğretmenler" className="bg-slate-900">Sadece Öğretmenler</option>
                  <option value="Öğrenciler" className="bg-slate-900">Sadece Öğrenciler & Veliler</option>
                  <option value="Firmalar" className="bg-slate-900">Yayın Evleri & Satıcı Firmalar</option>
                </select>
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-300 mb-1">Duyuru Başlığı</label>
                <input
                  type="text"
                  value={newTitle}
                  onChange={(e) => setNewTitle(e.target.value)}
                  placeholder="Örn: Hafta Sonu Ücretsiz Matematik Kampı"
                  className="w-full glass-input rounded-xl px-3 py-2 text-xs text-white"
                  required
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-300 mb-1">Duyuru İçeriği & Detaylar</label>
                <textarea
                  rows={4}
                  value={newContent}
                  onChange={(e) => setNewContent(e.target.value)}
                  placeholder="Duyuru metnini buraya yazınız..."
                  className="w-full glass-input rounded-xl px-3 py-2 text-xs text-white"
                  required
                />
              </div>

              <button
                type="submit"
                className="w-full py-3 rounded-xl bg-gradient-to-r from-amber-500 to-orange-500 hover:from-amber-400 hover:to-orange-400 text-slate-950 font-extrabold text-xs shadow-lg shadow-amber-500/20 flex items-center justify-center gap-2"
              >
                <Send className="w-4 h-4" />
                <span>Bildirimi Tüm İlgili Kullanıcılara Gönder</span>
              </button>
            </form>
          ) : (
            /* Announcements List */
            <div className="flex-1 py-2 overflow-y-auto custom-scrollbar space-y-3">
              {announcements.map((item) => (
                <div
                  key={item.id}
                  className={`p-4 rounded-2xl border transition-all ${
                    item.important
                      ? 'bg-amber-950/30 border-amber-500/40 shadow-lg shadow-amber-500/10'
                      : 'bg-slate-900/60 border-slate-800'
                  }`}
                >
                  <div className="flex items-center justify-between mb-2">
                    <span className="px-2.5 py-0.5 rounded-full bg-slate-800 text-slate-300 text-[10px] font-semibold">
                      {item.category}
                    </span>
                    <span className="text-[10px] text-slate-400">{item.date}</span>
                  </div>

                  <h3 className="text-sm font-bold text-white mb-1.5 leading-snug">{item.title}</h3>
                  <p className="text-xs text-slate-300 leading-relaxed mb-3">{item.content}</p>

                  <div className="flex items-center justify-between text-[11px] text-slate-400 pt-2 border-t border-slate-800/80">
                    <span className="flex items-center gap-1 text-indigo-400">
                      <Users className="w-3 h-3" />
                      <span>Hedef: {item.target}</span>
                    </span>
                    <span className="text-emerald-400 font-medium">● İletildi</span>
                  </div>
                </div>
              ))}
            </div>
          )}

          {/* Footer Affiliate Partner Note */}
          <div className="pt-4 border-t border-slate-800 bg-slate-900/40 -mx-6 -mb-6 p-4 rounded-b-3xl">
            <div className="text-[11px] text-slate-300 flex items-start space-x-2">
              <Award className="w-4 h-4 text-indigo-400 shrink-0 mt-0.5" />
              <div>
                <span className="font-bold text-white block mb-0.5">İçerik Üreticileri & Komisyon Ortaklığı</span>
                Eğitmenler ve dijital içerik üreticileri için avantajlı komisyon ve tanıtım paketleri mevcuttur.
              </div>
            </div>
          </div>

        </div>
      </div>
    </div>
  );
}
