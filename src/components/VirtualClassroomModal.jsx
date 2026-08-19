import React, { useState, useRef, useEffect } from 'react';
import { 
  X, Mic, MicOff, Video, VideoOff, Monitor, MessageSquare, 
  Edit3, Trash2, CheckCircle2, Download, Send, Play, Sparkles, Square, Circle, Eraser, Save
} from 'lucide-react';
import confetti from 'canvas-confetti';

export default function VirtualClassroomModal({ isOpen, onClose, tutorName, subject, onLessonEnd }) {
  const [micOn, setMicOn] = useState(true);
  const [cameraOn, setCameraOn] = useState(true);
  const [activeTool, setActiveTool] = useState('pencil'); // 'pencil', 'eraser'
  const [chatMessages, setChatMessages] = useState([
    { sender: 'Eğitmen', text: 'Merhaba Mert! Bugünkü YKS Türev dersimizde teğet denklemi soru tiplerini inceleyeceğiz.', time: '14:00' },
    { sender: 'Öğrenci', text: 'Harika hocam, not defterim hazır!', time: '14:01' }
  ]);
  const [inputMsg, setInputMsg] = useState('');
  const [isDrawing, setIsDrawing] = useState(false);
  const [drawColor, setDrawColor] = useState('#818cf8');
  const [lessonEnded, setLessonEnded] = useState(false);

  const canvasRef = useRef(null);

  useEffect(() => {
    if (isOpen && canvasRef.current) {
      const canvas = canvasRef.current;
      const ctx = canvas.getContext('2d');
      ctx.strokeStyle = activeTool === 'eraser' ? '#090d16' : drawColor;
      ctx.lineWidth = activeTool === 'eraser' ? 20 : 3;
      ctx.lineCap = 'round';
    }
  }, [isOpen, drawColor, activeTool]);

  
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

  const startDrawing = (e) => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const rect = canvas.getBoundingClientRect();
    const scaleX = canvas.width / rect.width;
    const scaleY = canvas.height / rect.height;
    const ctx = canvas.getContext('2d');
    ctx.strokeStyle = activeTool === 'eraser' ? '#090d16' : drawColor;
    ctx.lineWidth = activeTool === 'eraser' ? 20 : 3;
    ctx.beginPath();
    ctx.moveTo((e.clientX - rect.left) * scaleX, (e.clientY - rect.top) * scaleY);
    setIsDrawing(true);
  };

  const draw = (e) => {
    if (!isDrawing || !canvasRef.current) return;
    const canvas = canvasRef.current;
    const rect = canvas.getBoundingClientRect();
    const scaleX = canvas.width / rect.width;
    const scaleY = canvas.height / rect.height;
    const ctx = canvas.getContext('2d');
    ctx.lineTo((e.clientX - rect.left) * scaleX, (e.clientY - rect.top) * scaleY);
    ctx.stroke();
  };

  const stopDrawing = () => {
    setIsDrawing(false);
  };

  const clearCanvas = () => {
    if (!canvasRef.current) return;
    const canvas = canvasRef.current;
    const ctx = canvas.getContext('2d');
    ctx.clearRect(0, 0, canvas.width, canvas.height);
  };

  const downloadWhiteboard = () => {
    if (!canvasRef.current) return;
    const link = document.createElement('a');
    link.download = `Ders_Tahtasi_${Date.now()}.png`;
    link.href = canvasRef.current.toDataURL();
    link.click();
    confetti({ particleCount: 50, spread: 50 });
  };

  const handleSendMessage = (e) => {
    e.preventDefault();
    if (!inputMsg.trim()) return;

    setChatMessages(prev => [
      ...prev,
      { sender: 'Öğrenci (Sen)', text: inputMsg, time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }) }
    ]);
    setInputMsg('');
  };

  const handleEndLesson = () => {
    confetti({ particleCount: 100, spread: 80 });
    setLessonEnded(true);

    setTimeout(() => {
      onLessonEnd({
        id: 'rec_' + Date.now(),
        tutorName: tutorName || 'Prof. Dr. Ahmet Yılmaz',
        subject: subject || 'Matematik & Geometri',
        topic: 'Türev Teğet Denklemleri Canlı Seansı',
        date: 'Bugün',
        duration: '45 dk',
        videoUrl: 'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/BigBuckBunny.mp4',
        thumbnail: 'https://images.unsplash.com/photo-1635070041078-e363dbe005cb?auto=format&fit=crop&q=80&w=400',
        notesPdf: 'Turev_Ders_Notlari.pdf'
      });
      setLessonEnded(false);
      onClose();
    }, 2500);
  };

  return (
    <div onClick={onClose} className="fixed inset-0 z-50 flex items-center justify-center p-2 sm:p-4 bg-slate-950/90 backdrop-blur-md animate-fadeIn">
      <div onClick={(e) => e.stopPropagation()} className="glass-panel w-full max-w-6xl rounded-3xl p-4 sm:p-6 border border-emerald-500/30 shadow-2xl relative flex flex-col max-h-[95vh] overflow-hidden">
        
        {/* Top Bar */}
        <div className="flex items-center justify-between pb-3 border-b border-slate-800 shrink-0">
          <div className="flex items-center space-x-3">
            <div className="w-3 h-3 rounded-full bg-rose-500 animate-pulse" />
            <div>
              <h2 className="text-base font-bold text-white flex items-center gap-2">
                <span>CANLI DERS ALANI</span>
                <span className="text-xs font-normal text-slate-400">({subject || 'Matematik & Geometri'})</span>
              </h2>
              <p className="text-xs text-indigo-400">Eğitmen: {tutorName || 'Prof. Dr. Ahmet Yılmaz'}</p>
            </div>
          </div>

          <div className="flex items-center space-x-2">
            <button
              onClick={handleEndLesson}
              className="px-4 py-2 rounded-xl bg-rose-600 hover:bg-rose-500 text-white font-bold text-xs shadow-lg shadow-rose-600/30 transition-transform hover:scale-105 flex items-center gap-1.5"
            >
              <Video className="w-4 h-4" />
              <span>Dersi Bitir & Videoyu Öğrenciye Gönder</span>
            </button>

            <button onClick={onClose} className="p-2 rounded-xl bg-slate-900 border border-slate-800 text-slate-400 hover:text-white">
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Lesson Ended Toast Overlay */}
        {lessonEnded && (
          <div className="absolute inset-0 z-30 bg-slate-950/95 backdrop-blur-md flex flex-col items-center justify-center p-6 text-center animate-fadeIn">
            <div className="w-20 h-20 rounded-full bg-emerald-500/20 border-2 border-emerald-500 text-emerald-400 flex items-center justify-center mb-4 animate-bounce">
              <CheckCircle2 className="w-10 h-10" />
            </div>
            <h3 className="text-2xl font-bold text-white mb-2">Ders Başarıyla Tamamlandı!</h3>
            <p className="text-sm text-slate-300 max-w-lg">
              Handwritten Not kuralı uygulandı: <span className="text-emerald-400 font-semibold">Ders sonu video kaydı otomatik işlendi</span> ve Öğrenci Özel Sayfasındaki Ders Kayıtları Arşivinize gönderildi!
            </p>
          </div>
        )}

        {/* Main Grid: Video Stream + Whiteboard + Chat */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-4 my-4 flex-1 overflow-hidden">
          
          {/* Left Column: Video Feeds & Digital Whiteboard (2 cols) */}
          <div className="lg:col-span-2 flex flex-col space-y-4 overflow-hidden">
            
            {/* Video Streams Bar */}
            <div className="grid grid-cols-2 gap-3 shrink-0">
              
              {/* Teacher Video */}
              <div className="relative rounded-2xl overflow-hidden aspect-[16/9] bg-slate-900 border border-indigo-500/30 shadow-md">
                <img
                  src="https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&q=80&w=600"
                  alt="Teacher Feed"
                  className="w-full h-full object-cover"
                />
                <div className="absolute bottom-2 left-2 px-2.5 py-1 rounded-lg bg-slate-950/80 text-white text-[11px] font-bold flex items-center gap-1">
                  <span>👨‍🏫 Eğitmen ({tutorName || 'Ahmet Hoca'})</span>
                  <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
                </div>
              </div>

              {/* Student Video */}
              <div className="relative rounded-2xl overflow-hidden aspect-[16/9] bg-slate-900 border border-slate-800 shadow-md">
                {cameraOn ? (
                  <img
                    src="https://images.unsplash.com/photo-1539571696357-5a69c17a67c6?auto=format&fit=crop&q=80&w=600"
                    alt="Student Feed"
                    className="w-full h-full object-cover"
                  />
                ) : (
                  <div className="w-full h-full flex flex-col items-center justify-center text-slate-500">
                    <VideoOff className="w-8 h-8 mb-1" />
                    <span className="text-xs">Kamera Kapalı</span>
                  </div>
                )}
                <div className="absolute bottom-2 left-2 px-2.5 py-1 rounded-lg bg-slate-950/80 text-white text-[11px] font-bold">
                  <span>👨‍🎓 Mert Yılmaz (Sen)</span>
                </div>
              </div>

            </div>

            {/* Interactive Digital Whiteboard Canvas */}
            <div className="flex-1 bg-slate-900/90 rounded-2xl border border-slate-800 relative flex flex-col overflow-hidden min-h-[220px]">
              
              {/* Whiteboard Controls Header */}
              <div className="p-2.5 border-b border-slate-800 flex items-center justify-between bg-slate-950/50">
                <div className="flex items-center space-x-2">
                  <button
                    onClick={() => setActiveTool('pencil')}
                    className={`p-1.5 rounded-lg text-xs font-semibold flex items-center gap-1 ${
                      activeTool === 'pencil' ? 'bg-indigo-600 text-white' : 'bg-slate-900 text-slate-400'
                    }`}
                  >
                    <Edit3 className="w-3.5 h-3.5" />
                    <span>Kalem</span>
                  </button>

                  <button
                    onClick={() => setActiveTool('eraser')}
                    className={`p-1.5 rounded-lg text-xs font-semibold flex items-center gap-1 ${
                      activeTool === 'eraser' ? 'bg-indigo-600 text-white' : 'bg-slate-900 text-slate-400'
                    }`}
                  >
                    <Eraser className="w-3.5 h-3.5" />
                    <span>Silgi</span>
                  </button>

                  <button
                    onClick={downloadWhiteboard}
                    className="p-1.5 rounded-lg bg-emerald-600/20 text-emerald-300 border border-emerald-500/30 hover:bg-emerald-600/30 text-xs font-semibold flex items-center gap-1"
                  >
                    <Save className="w-3.5 h-3.5" />
                    <span>Tahtayı Kaydet (PNG)</span>
                  </button>
                </div>

                <div className="flex items-center space-x-2">
                  {['#818cf8', '#34d399', '#fbbf24', '#f43f5e', '#ffffff'].map((color) => (
                    <button
                      key={color}
                      onClick={() => { setDrawColor(color); setActiveTool('pencil'); }}
                      className={`w-5 h-5 rounded-full border-2 transition-transform ${
                        drawColor === color && activeTool === 'pencil' ? 'scale-125 border-white' : 'border-transparent'
                      }`}
                      style={{ backgroundColor: color }}
                    />
                  ))}
                  <button
                    onClick={clearCanvas}
                    className="p-1.5 rounded-lg bg-rose-500/20 text-rose-400 hover:bg-rose-500/30 text-xs font-semibold flex items-center gap-1"
                  >
                    <Trash2 className="w-3.5 h-3.5" />
                    <span>Temizle</span>
                  </button>
                </div>
              </div>

              {/* Canvas Area */}
              <canvas
                ref={canvasRef}
                width={700}
                height={350}
                onMouseDown={startDrawing}
                onMouseMove={draw}
                onMouseUp={stopDrawing}
                onMouseLeave={stopDrawing}
                className="w-full h-full cursor-crosshair bg-slate-950"
              />
            </div>

          </div>

          {/* Right Column: Live Chat & Audio Controls */}
          <div onClick={(e) => e.stopPropagation()} className="glass-panel p-4 rounded-2xl border border-slate-800 flex flex-col justify-between overflow-hidden">
            
            {/* Chat Header */}
            <div className="pb-3 border-b border-slate-800 flex items-center justify-between">
              <h3 className="text-xs font-bold text-white flex items-center gap-1.5">
                <MessageSquare className="w-4 h-4 text-indigo-400" />
                <span>Ders İçi Canlı Mesajlaşma</span>
              </h3>
              <span className="text-[10px] text-emerald-400 font-semibold">● Aktif Seans</span>
            </div>

            {/* Chat Log */}
            <div className="flex-1 py-3 overflow-y-auto custom-scrollbar space-y-3">
              {chatMessages.map((msg, i) => (
                <div key={i} className={`p-2.5 rounded-xl text-xs space-y-1 ${
                  msg.sender.includes('Öğrenci')
                    ? 'bg-indigo-600/30 border border-indigo-500/30 ml-4'
                    : 'bg-slate-900 border border-slate-800 mr-4'
                }`}>
                  <div className="flex items-center justify-between font-bold text-indigo-300 text-[11px]">
                    <span>{msg.sender}</span>
                    <span className="text-slate-500 font-normal">{msg.time}</span>
                  </div>
                  <p className="text-slate-200">{msg.text}</p>
                </div>
              ))}
            </div>

            {/* Chat Input */}
            <form onSubmit={handleSendMessage} className="pt-2 border-t border-slate-800 flex items-center gap-2">
              <input
                type="text"
                value={inputMsg}
                onChange={(e) => setInputMsg(e.target.value)}
                placeholder="Eğitmene soru sor..."
                className="flex-1 glass-input rounded-xl px-3 py-2 text-xs text-white"
              />
              <button
                type="submit"
                className="p-2 rounded-xl bg-indigo-600 hover:bg-indigo-500 text-white"
              >
                <Send className="w-4 h-4" />
              </button>
            </form>

            {/* Bottom Mic/Camera Toggle Bar */}
            <div className="pt-3 border-t border-slate-800 mt-2 flex items-center justify-center space-x-3">
              <button
                onClick={() => setMicOn(!micOn)}
                className={`p-2.5 rounded-xl border transition-colors ${
                  micOn ? 'bg-slate-800 border-slate-700 text-slate-200' : 'bg-rose-600/30 border-rose-500 text-rose-400'
                }`}
              >
                {micOn ? <Mic className="w-4 h-4" /> : <MicOff className="w-4 h-4" />}
              </button>

              <button
                onClick={() => setCameraOn(!cameraOn)}
                className={`p-2.5 rounded-xl border transition-colors ${
                  cameraOn ? 'bg-slate-800 border-slate-700 text-slate-200' : 'bg-rose-600/30 border-rose-500 text-rose-400'
                }`}
              >
                {cameraOn ? <Video className="w-4 h-4" /> : <VideoOff className="w-4 h-4" />}
              </button>
            </div>

          </div>

        </div>

      </div>
    </div>
  );
}
