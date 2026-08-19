import React, { useState } from 'react';
import { MessageSquare, Users, Sparkles, Send, BookOpen, Flame, CheckCircle2 } from 'lucide-react';

export default function LiveStudyLounge() {
  const [messages, setMessages] = useState([
    { id: 1, author: 'Selin (Ankara)', role: 'YKS Sayısal', text: 'Geometri katı cisimler silindir açınım sorularında pratik formülü olan var mı?', time: '14:20' },
    { id: 2, author: 'Can (İstanbul)', role: '11. Sınıf', text: 'Türevde teğet denklemi ve max-min problemlerini Ahmet Hoca\'nın notlarından çalışıyorum, harika anlatmış!', time: '14:22' },
    { id: 3, author: 'Ece (İzmir)', role: 'LGS 8. Sınıf', text: 'Bugün 200 soru barajını aştım, herkese verimli çalışmalar!', time: '14:25' }
  ]);
  const [inputMsg, setInputMsg] = useState('');

  const quickPrompts = [
    '🙋‍♂️ Türev teğet eğimi sorularında püf nokta nedir?',
    '📐 Katı Cisimlerde alan/hacim hesabı pratik formülü?',
    '📝 2026 LGS Paragraf sorularında zaman kazanma yöntemi?',
    '⚡ Fizik Elektrik Sağ El Kuralını karıştırmamak için ipucu?'
  ];

  const handleSend = (text) => {
    const messageText = typeof text === 'string' ? text : inputMsg;
    if (!messageText.trim()) return;

    setMessages(prev => [
      ...prev,
      {
        id: Date.now(),
        author: 'Mert Yılmaz (İstanbul)',
        role: '11. Sınıf',
        text: messageText,
        time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
      }
    ]);
    setInputMsg('');
  };

  return (
    <div className="glass-panel p-6 rounded-3xl border border-indigo-500/30 space-y-4 my-8">
      
      {/* Lounge Header */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 pb-4 border-b border-slate-800">
        <div className="flex items-center space-x-3">
          <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-indigo-600 to-violet-600 text-white flex items-center justify-center shadow-lg shadow-indigo-600/30">
            <Users className="w-5 h-5" />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <h2 className="text-base font-bold text-white">Türkiye Geneli Canlı Etüd & Soru Salonu</h2>
              <span className="w-2.5 h-2.5 rounded-full bg-emerald-400 animate-pulse" />
            </div>
            <p className="text-xs text-slate-300">Öğrencilerin anlık soru paylaştığı ve birlikte odaklandığı canlı alan.</p>
          </div>
        </div>

        <div className="flex items-center gap-3 bg-slate-900/80 px-4 py-2 rounded-2xl border border-slate-800 text-xs">
          <span className="flex items-center gap-1.5 text-emerald-400 font-bold">
            <Flame className="w-4 h-4 text-amber-400" />
            <span>1,420 Canlı Öğrenci Masada</span>
          </span>
        </div>
      </div>

      {/* Chat Messages */}
      <div className="space-y-3 max-h-64 overflow-y-auto custom-scrollbar pr-1">
        {messages.map((m) => (
          <div key={m.id} className="p-3.5 rounded-2xl bg-slate-900/60 border border-slate-800 flex items-start justify-between gap-3 text-xs">
            <div className="space-y-1">
              <div className="flex items-center space-x-2">
                <span className="font-bold text-indigo-300">{m.author}</span>
                <span className="px-2 py-0.5 rounded bg-slate-800 text-slate-400 text-[10px]">{m.role}</span>
              </div>
              <p className="text-slate-200 leading-relaxed">{m.text}</p>
            </div>
            <span className="text-[10px] text-slate-500 font-mono shrink-0">{m.time}</span>
          </div>
        ))}
      </div>

      {/* Quick Question Prompt Chips */}
      <div className="flex items-center gap-1.5 overflow-x-auto custom-scrollbar pt-1">
        {quickPrompts.map((p, i) => (
          <button
            key={i}
            type="button"
            onClick={() => handleSend(p)}
            className="px-2.5 py-1 rounded-lg bg-indigo-500/10 hover:bg-indigo-500/20 text-indigo-300 text-[10px] font-medium border border-indigo-500/20 whitespace-nowrap transition-colors"
          >
            {p}
          </button>
        ))}
      </div>

      {/* Send Message Form */}
      <form onSubmit={(e) => { e.preventDefault(); handleSend(); }} className="flex items-center gap-2 pt-1">
        <input
          type="text"
          value={inputMsg}
          onChange={(e) => setInputMsg(e.target.value)}
          placeholder="Canlı etüd salonuna soru veya mesaj yaz..."
          className="flex-1 glass-input rounded-xl px-4 py-2.5 text-xs text-white"
        />
        <button
          type="submit"
          className="px-5 py-2.5 rounded-xl bg-indigo-600 hover:bg-indigo-500 text-white font-bold text-xs flex items-center gap-1.5 shadow-md"
        >
          <Send className="w-4 h-4" />
          <span>Paylaş</span>
        </button>
      </form>

    </div>
  );
}
