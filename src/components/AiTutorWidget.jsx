import React, { useState } from 'react';
import { Bot, X, Send, Sparkles, User, RefreshCw, Zap } from 'lucide-react';

export default function AiTutorWidget() {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState([
    { sender: 'ai', text: 'Merhaba! Ben Borsa AI Akıllı Eğitim ve Koçluk Asistanınızım. Ders çalışma planınız, konu özetleriniz veya sınav taktiklerinizle ilgili ne öğrenmek istersiniz?' }
  ]);
  const [inputMsg, setInputMsg] = useState('');
  const [isThinking, setIsThinking] = useState(false);

  const predefinedPrompts = [
    'TYT Matematik süresini nasıl yetiştiririm?',
    'Fizik dersinde konu eksiğim var, nereden başlamalıyım?',
    'LGS 8. sınıf fen bilgisinde kaç net derece getirir?'
  ];

  const handleSend = (userText) => {
    const textToSend = userText || inputMsg;
    if (!textToSend.trim()) return;

    setMessages(prev => [...prev, { sender: 'user', text: textToSend }]);
    setInputMsg('');
    setIsThinking(true);

    setTimeout(() => {
      let aiReply = 'Derece hedefleyen öğrenciler için en etkili yöntem 75 dakikalık derin odaklanma seanslarıdır. Yanlış yaptığınız her sorunun çözümünü tekrar kendiniz yazarak çözün.';
      
      const lower = textToSend.toLowerCase();
      if (lower.includes('matematik') || lower.includes('süre')) {
        aiReply = 'TYT Matematikte süre yetiştirmek için: 1) İlk aşamada 20 kolay/orta problemi turlayarak çözün. 2) Geometriye 25 dakika ayırın. 3) Sorularla 2 dakikadan fazla inatlaşmayın!';
      } else if (lower.includes('fizik')) {
        aiReply = 'Fizikte başarı formulü: Önce temel kavramlar ve formülün nereden geldiği. Ardından 30 adet çözümlü soru inceleyin. Borsa Birebir Ders Alanından ODTÜ mezunu Ayşe Zeynep Hoca ile 1 saatlik etüd randevusu oluşturabilirsiniz!';
      } else if (lower.includes('lgs') || lower.includes('fen')) {
        aiReply = 'LGS Fen bilgisinde full net çıkarmak için yeni nesil görselleri ve deney düzeneklerini doğru okumak şarttır. Satış alanımızdaki LGS 5\'li Mega Deneme setini çözmenizi öneririm.';
      }

      setMessages(prev => [...prev, { sender: 'ai', text: aiReply }]);
      setIsThinking(false);
    }, 1200);
  };

  return (
    <>
      {/* Floating Action Button */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="fixed bottom-6 right-6 z-40 p-4 rounded-2xl bg-gradient-to-tr from-indigo-600 via-indigo-500 to-violet-600 text-white shadow-2xl shadow-indigo-600/50 hover:scale-110 transition-transform duration-300 flex items-center gap-2 group border border-white/20"
        title="Borsa AI Eğitim Asistanı"
      >
        <Bot className="w-6 h-6 animate-bounce" />
        <span className="hidden sm:inline-block font-extrabold text-xs tracking-wider uppercase">Borsa AI Koç</span>
      </button>

      {/* Chat Window */}
      {isOpen && (
        <div className="fixed bottom-24 right-6 z-40 w-96 max-w-[calc(100vw-2rem)] glass-panel border border-indigo-500/30 rounded-3xl p-4 shadow-2xl flex flex-col h-[500px] animate-fadeIn">
          
          {/* Header */}
          <div className="pb-3 border-b border-slate-800 flex items-center justify-between">
            <div className="flex items-center space-x-2.5">
              <div className="w-8 h-8 rounded-xl bg-indigo-600/30 text-indigo-400 flex items-center justify-center border border-indigo-500/40">
                <Sparkles className="w-4 h-4 text-amber-400" />
              </div>
              <div>
                <h3 className="text-xs font-extrabold text-white">Borsa AI Akıllı Koç</h3>
                <span className="text-[10px] text-emerald-400 font-semibold">● 7/24 Rehberlik</span>
              </div>
            </div>
            <button onClick={() => setIsOpen(false)} className="p-1.5 rounded-lg bg-slate-900 text-slate-400 hover:text-white">
              <X className="w-4 h-4" />
            </button>
          </div>

          {/* Messages Feed */}
          <div className="flex-1 py-3 overflow-y-auto custom-scrollbar space-y-3">
            {messages.map((m, idx) => (
              <div
                key={idx}
                className={`p-3 rounded-2xl text-xs space-y-1 ${
                  m.sender === 'user'
                    ? 'bg-indigo-600 text-white ml-6 font-medium'
                    : 'bg-slate-900/90 border border-slate-800 text-slate-200 mr-4'
                }`}
              >
                <div className="flex items-center gap-1 text-[10px] font-bold text-indigo-300">
                  {m.sender === 'user' ? <User className="w-3 h-3" /> : <Bot className="w-3 h-3 text-amber-400" />}
                  <span>{m.sender === 'user' ? 'Sen' : 'Borsa AI Koç'}</span>
                </div>
                <p className="leading-relaxed">{m.text}</p>
              </div>
            ))}

            {isThinking && (
              <div className="p-3 rounded-2xl bg-slate-900 border border-slate-800 text-xs text-indigo-400 flex items-center gap-2 animate-pulse">
                <RefreshCw className="w-3.5 h-3.5 animate-spin" />
                <span>AI Yanıt Hazırlıyor...</span>
              </div>
            )}
          </div>

          {/* Quick Prompts */}
          <div className="py-2 flex items-center gap-1.5 overflow-x-auto custom-scrollbar border-t border-slate-800/80">
            {predefinedPrompts.map((p, i) => (
              <button
                key={i}
                onClick={() => handleSend(p)}
                className="px-2.5 py-1 rounded-lg bg-indigo-500/10 text-indigo-300 text-[10px] font-medium border border-indigo-500/20 whitespace-nowrap hover:bg-indigo-500/20"
              >
                {p}
              </button>
            ))}
          </div>

          {/* Input Box */}
          <form onSubmit={(e) => { e.preventDefault(); handleSend(); }} className="pt-2 border-t border-slate-800 flex items-center gap-2">
            <input
              type="text"
              value={inputMsg}
              onChange={(e) => setInputMsg(e.target.value)}
              placeholder="Soru sor veya koçluk iste..."
              className="flex-1 glass-input rounded-xl px-3 py-2 text-xs text-white"
            />
            <button
              type="submit"
              className="p-2 rounded-xl bg-indigo-600 hover:bg-indigo-500 text-white"
            >
              <Send className="w-4 h-4" />
            </button>
          </form>

        </div>
      )}
    </>
  );
}
