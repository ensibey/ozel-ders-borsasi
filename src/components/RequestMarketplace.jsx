import React, { useState } from 'react';
import { 
  Sparkles, Search, MapPin, Clock, DollarSign, Send, Filter, 
  MessageSquare, User, CheckCircle2, ChevronRight, AlertCircle, BookOpen
} from 'lucide-react';
import confetti from 'canvas-confetti';

export default function RequestMarketplace({ requests, onAddBid, onOpenWizard }) {
  const [selectedRequest, setSelectedRequest] = useState(null);
  const [bidPrice, setBidPrice] = useState('');
  const [bidMessage, setBidMessage] = useState('');
  const [filterCity, setFilterCity] = useState('all');
  const [filterSubject, setFilterSubject] = useState('all');
  const [searchQuery, setSearchQuery] = useState('');
  const [bidSubmittedSuccess, setBidSubmittedSuccess] = useState(false);

  const handleOpenBidModal = (req) => {
    setSelectedRequest(req);
    setBidPrice('');
    setBidMessage('');
    setBidSubmittedSuccess(false);
  };

  const handleSubmitBid = (e) => {
    e.preventDefault();
    if (!bidPrice || !bidMessage) return;

    const newBid = {
      id: 'bid_' + Date.now(),
      tutorName: 'Prof. Dr. Ahmet Yılmaz',
      tutorTitle: 'Boğaziçi Üniv. Öğretim Üyesi',
      rating: 4.9,
      price: Number(bidPrice),
      message: bidMessage,
      createdAt: 'Az önce',
      avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&q=80&w=400'
    };

    onAddBid(selectedRequest.id, newBid);
    setBidSubmittedSuccess(true);
    confetti({ particleCount: 60, spread: 60 });

    setTimeout(() => {
      setSelectedRequest(null);
      setBidSubmittedSuccess(false);
    }, 1800);
  };

  // Filter Logic
  const filteredRequests = requests.filter(r => {
    const matchesCity = filterCity === 'all' || r.city === filterCity;
    const matchesSubject = filterSubject === 'all' || r.subject.includes(filterSubject);
    const matchesSearch = searchQuery === '' || 
      r.subject.toLowerCase().includes(searchQuery.toLowerCase()) ||
      r.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
      r.studentName.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCity && matchesSubject && matchesSearch;
  });

  return (
    <div className="space-y-6 animate-fadeIn">
      
      {/* Top Banner */}
      <div className="glass-panel p-6 sm:p-8 rounded-3xl border border-emerald-500/30 bg-gradient-to-r from-slate-900 via-emerald-950/40 to-slate-900 flex flex-col md:flex-row items-center justify-between gap-6">
        <div className="space-y-2 text-center md:text-left">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-emerald-500/20 text-emerald-300 text-xs font-bold border border-emerald-500/30">
            <Sparkles className="w-3.5 h-3.5" />
            <span>Canlı Öğrenci İhale & Ders Talep Havuzu</span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-extrabold text-white">Öğrencilerin Özel Ders Talepleri</h1>
          <p className="text-xs sm:text-sm text-slate-300 max-w-xl">
            Eğitmen olarak branşınıza ve bulunduğunuz şehre uygun canlı ders taleplerini inceleyin, öğrenciye özel fiyat teklifi sunun!
          </p>
        </div>

        <button
          onClick={onOpenWizard}
          className="px-5 py-3.5 rounded-2xl bg-gradient-to-r from-emerald-600 to-teal-600 hover:from-emerald-500 hover:to-teal-500 text-white font-extrabold text-xs shadow-xl shadow-emerald-600/30 transition-transform hover:scale-105 flex items-center gap-2 shrink-0"
        >
          <Send className="w-4 h-4" />
          <span>Yeni Ders Talebi Yayınla</span>
        </button>
      </div>

      {/* Filter & Search Bar */}
      <div className="glass-panel p-4 rounded-2xl border border-slate-800 flex flex-col md:flex-row items-center justify-between gap-4 text-xs">
        <div className="relative flex-1 w-full">
          <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Talep açıklamasında veya ders konusunda ara..."
            className="w-full glass-input rounded-xl pl-10 pr-4 py-2 text-xs text-white"
          />
        </div>

        <div className="flex items-center gap-2 w-full md:w-auto">
          <select
            value={filterCity}
            onChange={(e) => setFilterCity(e.target.value)}
            className="glass-input rounded-xl px-3 py-2 text-xs text-white bg-slate-900 flex-1 md:flex-initial"
          >
            <option value="all">Tüm Şehirler</option>
            <option value="İstanbul">İstanbul</option>
            <option value="Ankara">Ankara</option>
            <option value="İzmir">İzmir</option>
            <option value="Bursa">Bursa</option>
          </select>

          <select
            value={filterSubject}
            onChange={(e) => setFilterSubject(e.target.value)}
            className="glass-input rounded-xl px-3 py-2 text-xs text-white bg-slate-900 flex-1 md:flex-initial"
          >
            <option value="all">Tüm Branşlar</option>
            <option value="Matematik">Matematik</option>
            <option value="Fizik">Fizik</option>
            <option value="Kimya">Kimya</option>
            <option value="İngilizce">İngilizce</option>
            <option value="Yazılım">Yazılım / Kodlama</option>
          </select>
        </div>
      </div>

      {/* Requests Grid */}
      {filteredRequests.length === 0 ? (
        <div className="glass-panel p-12 rounded-3xl text-center border border-slate-800 space-y-3">
          <BookOpen className="w-12 h-12 text-slate-600 mx-auto" />
          <h3 className="text-base font-bold text-white">Seçilen Kriterlerde Canlı Talep Bulunamadı</h3>
          <p className="text-xs text-slate-400">Filtreleri sıfırlayarak veya arama terimini değiştirerek diğer ilanları görüntüleyebilirsiniz.</p>
          <button
            onClick={() => { setFilterCity('all'); setFilterSubject('all'); setSearchQuery(''); }}
            className="px-4 py-2 rounded-xl bg-slate-800 text-indigo-300 text-xs font-bold"
          >
            Filtreleri Temizle
          </button>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {filteredRequests.map((req) => (
            <div key={req.id} className="glass-card p-6 rounded-2xl border border-slate-800 flex flex-col justify-between space-y-4 hover:border-emerald-500/40 transition-all">
              
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <span className="px-3 py-1 rounded-lg text-xs font-extrabold bg-emerald-500/20 text-emerald-300 border border-emerald-500/30">
                    {req.subject}
                  </span>
                  <span className="text-[11px] text-slate-400 flex items-center gap-1">
                    <Clock className="w-3 h-3 text-indigo-400" />
                    <span>{req.createdAt}</span>
                  </span>
                </div>

                <div>
                  <h3 className="text-base font-bold text-white flex items-center gap-2">
                    <span>{req.studentName}</span>
                    <span className="text-xs text-slate-400 font-normal">({req.level})</span>
                  </h3>
                  <p className="text-xs text-slate-300 mt-2 leading-relaxed bg-slate-900/50 p-3 rounded-xl border border-slate-800/80">
                    "{req.description}"
                  </p>
                </div>

                <div className="grid grid-cols-2 gap-2 text-xs pt-1">
                  <div className="flex items-center text-slate-300">
                    <MapPin className="w-3.5 h-3.5 text-indigo-400 mr-1.5 shrink-0" />
                    <span className="truncate">{req.city}, {req.district}</span>
                  </div>

                  <div className="flex items-center text-slate-300">
                    <DollarSign className="w-3.5 h-3.5 text-emerald-400 mr-1.5 shrink-0" />
                    <span className="truncate font-semibold text-emerald-400">{req.budgetRange}</span>
                  </div>
                </div>
              </div>

              {/* Bids Count & Action Button */}
              <div className="pt-3 border-t border-slate-800/80 flex items-center justify-between">
                <div className="text-xs text-slate-400">
                  <span className="font-bold text-white">{(req.bids || []).length}</span> eğitmen teklif verdi
                </div>

                <button
                  onClick={() => handleOpenBidModal(req)}
                  className="px-4 py-2 rounded-xl bg-gradient-to-r from-emerald-600 to-teal-600 hover:from-emerald-500 hover:to-teal-500 text-white text-xs font-bold shadow-md shadow-emerald-600/20 flex items-center gap-1.5"
                >
                  <Send className="w-3.5 h-3.5" />
                  <span>Teklif Ver</span>
                </button>
              </div>

            </div>
          ))}
        </div>
      )}

      {/* Tutor Submit Bid Modal */}
      {selectedRequest && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/80 backdrop-blur-md animate-fadeIn">
          <div className="glass-panel w-full max-w-lg rounded-3xl p-6 sm:p-8 border border-emerald-500/30 shadow-2xl relative space-y-6">
            
            {bidSubmittedSuccess ? (
              <div className="text-center py-8 space-y-4">
                <div className="w-16 h-16 rounded-full bg-emerald-500/20 text-emerald-400 border-2 border-emerald-500 flex items-center justify-center mx-auto animate-bounce">
                  <CheckCircle2 className="w-8 h-8" />
                </div>
                <h3 className="text-xl font-bold text-white">Teklifiniz İletildi!</h3>
                <p className="text-xs text-slate-300">Öğrenci teklifinizi incelediğinde bildirim alacaksınız.</p>
              </div>
            ) : (
              <>
                <div className="flex items-center justify-between border-b border-slate-800 pb-4">
                  <div>
                    <h3 className="text-lg font-bold text-white">Eğitmen Teklifi Sunun</h3>
                    <p className="text-xs text-slate-400">{selectedRequest.studentName} • {selectedRequest.subject}</p>
                  </div>
                  <button onClick={() => setSelectedRequest(null)} className="text-slate-400 hover:text-white text-xs">
                    Kapat
                  </button>
                </div>

                <form onSubmit={handleSubmitBid} className="space-y-4">
                  <div>
                    <label className="block text-xs font-semibold text-slate-300 mb-1">Saatlik Ücret Teklifiniz (₺)</label>
                    <input
                      type="number"
                      value={bidPrice}
                      onChange={(e) => setBidPrice(e.target.value)}
                      placeholder="Örn: 650"
                      className="w-full glass-input rounded-xl px-3.5 py-2.5 text-xs text-white"
                      required
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-semibold text-slate-300 mb-1">Öğrenciye Özel Mesajınız & Biyografiniz</label>
                    <textarea
                      rows={4}
                      value={bidMessage}
                      onChange={(e) => setBidMessage(e.target.value)}
                      placeholder="Tecrübenizi, seans işleyişinizi ve öğrenciye sağlayacağınız avantajları yazın..."
                      className="w-full glass-input rounded-xl p-3.5 text-xs text-white"
                      required
                    />
                  </div>

                  <button
                    type="submit"
                    className="w-full py-3 rounded-xl bg-gradient-to-r from-emerald-600 to-teal-600 text-white font-extrabold text-xs shadow-lg shadow-emerald-600/30 flex items-center justify-center gap-2"
                  >
                    <Send className="w-4 h-4" />
                    <span>{bidPrice ? `${bidPrice} ₺ Teklif Gönder` : 'Teklifi İlet'}</span>
                  </button>
                </form>
              </>
            )}

          </div>
        </div>
      )}

    </div>
  );
}
