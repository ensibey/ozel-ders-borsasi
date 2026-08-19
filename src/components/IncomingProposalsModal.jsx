import React, { useState, useEffect } from 'react';
import { X, Star, CheckCircle2, MessageSquare, DollarSign, UserCheck, ShieldCheck } from 'lucide-react';
import confetti from 'canvas-confetti';

export default function IncomingProposalsModal({ isOpen, onClose, request, onAcceptBid }) {
  const [acceptedBidId, setAcceptedBidId] = useState(null);

  if (!isOpen || !request) return null;

  const bids = request.bids || [
    {
      id: 'bid_default_1',
      tutorName: 'Prof. Dr. Ahmet Yılmaz',
      tutorTitle: 'Boğaziçi Üniv. Öğretim Üyesi',
      rating: 4.9,
      price: 650,
      message: 'Merhaba Mert, YKS Matematik konularında 14 yıllık tecrübemle haftada 2 saat canlı ders verebilirim.',
      createdAt: '10 dk önce',
      avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&q=80&w=400'
    },
    {
      id: 'bid_default_2',
      tutorName: 'Mehmet Can Yıldız',
      tutorTitle: 'İTÜ Fizik Mühendisi',
      rating: 4.8,
      price: 550,
      message: 'Tüm sorularını beraber çözeceğiz. İlk ders tanışma amaçlı 30 dk ücretsiz deneme içerir.',
      createdAt: '25 dk önce',
      avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&q=80&w=400'
    }
  ];

  const handleAccept = (bid) => {
    confetti({ particleCount: 100, spread: 70 });
    setAcceptedBidId(bid.id);
    onAcceptBid(request.id, bid);

    setTimeout(() => {
      setAcceptedBidId(null);
      onClose();
    }, 2000);
  };

  return (
    <div onClick={onClose} className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/85 backdrop-blur-md animate-fadeIn">
      <div onClick={(e) => e.stopPropagation()} className="glass-panel w-full max-w-2xl rounded-3xl p-6 sm:p-8 border border-emerald-500/30 shadow-2xl relative space-y-6 max-h-[90vh] overflow-y-auto custom-scrollbar">
        
        {/* Header */}
        <div className="flex items-center justify-between pb-3 border-b border-slate-800">
          <div>
            <span className="px-2.5 py-0.5 rounded-full bg-emerald-500/20 text-emerald-300 text-[10px] font-bold border border-emerald-500/30">
              Gelen Teklifler ({bids.length})
            </span>
            <h2 className="text-base font-bold text-white mt-1">Talebiniz: {request.subject} ({request.level})</h2>
          </div>
          <button onClick={onClose} className="p-1.5 rounded-xl bg-slate-900 text-slate-400 hover:text-white">
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Proposals List */}
        <div className="space-y-4">
          {bids.map((bid) => {
            const isAccepted = acceptedBidId === bid.id;
            return (
              <div key={bid.id} className="glass-card p-5 rounded-2xl border border-slate-800 space-y-3">
                <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3">
                  
                  <div className="flex items-center space-x-3">
                    <img src={bid.avatar} alt={bid.tutorName} className="w-12 h-12 rounded-xl object-cover border border-indigo-500/30" />
                    <div>
                      <h4 className="text-sm font-bold text-white flex items-center gap-1.5">
                        <span>{bid.tutorName}</span>
                        <ShieldCheck className="w-4 h-4 text-indigo-400" />
                      </h4>
                      <div className="text-[11px] text-slate-400">{bid.tutorTitle}</div>
                      <div className="flex items-center text-amber-400 text-xs font-bold mt-0.5">
                        <Star className="w-3 h-3 fill-amber-400 mr-1" />
                        <span>{bid.rating}</span>
                      </div>
                    </div>
                  </div>

                  <div className="bg-slate-900/80 px-4 py-2 rounded-xl border border-slate-800 text-right w-full sm:w-auto">
                    <span className="text-[10px] text-slate-400 block uppercase font-semibold">Saatlik Teklif</span>
                    <span className="text-lg font-extrabold text-emerald-400">{bid.price} ₺ / saat</span>
                  </div>

                </div>

                <p className="text-xs text-slate-300 bg-slate-900/50 p-3 rounded-xl border border-slate-800/60 leading-relaxed">
                  "{bid.message}"
                </p>

                <div className="pt-2 border-t border-slate-800 flex items-center justify-between">
                  <span className="text-[11px] text-slate-400">Teklif Tarihi: {bid.createdAt}</span>

                  <button
                    onClick={() => handleAccept(bid)}
                    className={`px-5 py-2.5 rounded-xl text-xs font-extrabold transition-all shadow-md ${
                      isAccepted
                        ? 'bg-emerald-600 text-white animate-bounce'
                        : 'bg-emerald-600 hover:bg-emerald-500 text-white shadow-emerald-600/30'
                    }`}
                  >
                    {isAccepted ? '✓ Anlaşıldı & Seans Başlatıldı!' : 'Teklifi Kabul Et & Anlaş'}
                  </button>
                </div>
              </div>
            );
          })}
        </div>

      </div>
    </div>
  );
}
