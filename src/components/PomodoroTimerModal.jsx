import React, { useState, useEffect } from 'react';
import { X, Play, Pause, RotateCcw, Flame, Headphones, Volume2, Sparkles, Award } from 'lucide-react';
import confetti from 'canvas-confetti';

export default function PomodoroTimerModal({ isOpen, onClose }) {
  const [mode, setMode] = useState('focus'); // 'focus' (25m), 'shortBreak' (5m), 'longBreak' (15m)
  const [timeLeft, setTimeLeft] = useState(1500); // 25 mins
  const [isRunning, setIsRunning] = useState(false);
  const [completedPomodoros, setCompletedPomodoros] = useState(3);
  const [soundTrack, setSoundTrack] = useState('Lo-Fi Yağmur Beats');

  useEffect(() => {
    let timer = null;
    if (isRunning && timeLeft > 0) {
      timer = setInterval(() => {
        setTimeLeft(prev => prev - 1);
      }, 1000);
    } else if (timeLeft === 0 && isRunning) {
      setIsRunning(false);
      confetti({ particleCount: 100, spread: 70 });
      if (mode === 'focus') {
        setCompletedPomodoros(prev => prev + 1);
        try {
          const currentPoints = parseInt(localStorage.getItem('odb_student_points') || '350', 10);
          localStorage.setItem('odb_student_points', (currentPoints + 25).toString());
        } catch (e) {}
      }
    }
    return () => clearInterval(timer);
  }, [isRunning, timeLeft, mode]);

  
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

  const handleSwitchMode = (newMode, seconds) => {
    setMode(newMode);
    setTimeLeft(seconds);
    setIsRunning(false);
  };

  const formatTime = (secs) => {
    const m = Math.floor(secs / 60);
    const s = secs % 60;
    return `${m.toString().padStart(2, '0')}:${s.toString().padStart(2, '0')}`;
  };

  return (
    <div onClick={onClose} className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/85 backdrop-blur-md animate-fadeIn">
      <div onClick={(e) => e.stopPropagation()} className="glass-panel w-full max-w-md rounded-3xl p-6 sm:p-8 border border-indigo-500/30 shadow-2xl relative text-center space-y-6">
        
        {/* Header */}
        <div className="flex items-center justify-between pb-3 border-b border-slate-800">
          <div className="flex items-center space-x-2">
            <div className="w-8 h-8 rounded-xl bg-indigo-600/30 text-indigo-400 flex items-center justify-center">
              <Flame className="w-5 h-5 text-amber-400" />
            </div>
            <h2 className="text-base font-bold text-white">Pomodoro Odaklanma Sayaç & Müzik</h2>
          </div>
          <button onClick={onClose} className="p-1.5 rounded-xl bg-slate-900 text-slate-400 hover:text-white">
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Mode Switcher */}
        <div className="flex items-center justify-center space-x-2 bg-slate-900/80 p-1.5 rounded-2xl border border-slate-800 text-xs font-semibold">
          <button
            onClick={() => handleSwitchMode('focus', 1500)}
            className={`px-3.5 py-1.5 rounded-xl transition-all ${
              mode === 'focus' ? 'bg-indigo-600 text-white shadow-md' : 'text-slate-400 hover:text-white'
            }`}
          >
            Odak (25 Dk)
          </button>
          <button
            onClick={() => handleSwitchMode('shortBreak', 300)}
            className={`px-3.5 py-1.5 rounded-xl transition-all ${
              mode === 'shortBreak' ? 'bg-emerald-600 text-white shadow-md' : 'text-slate-400 hover:text-white'
            }`}
          >
            Kısa Mola (5 Dk)
          </button>
          <button
            onClick={() => handleSwitchMode('longBreak', 900)}
            className={`px-3.5 py-1.5 rounded-xl transition-all ${
              mode === 'longBreak' ? 'bg-amber-600 text-white shadow-md' : 'text-slate-400 hover:text-white'
            }`}
          >
            Uzun Mola (15 Dk)
          </button>
        </div>

        {/* Big Timer Countdown Display */}
        <div className="py-4">
          <div className="text-6xl font-extrabold font-mono tracking-wider text-white glow-text mb-2">
            {formatTime(timeLeft)}
          </div>
          <div className="text-xs text-indigo-400 font-bold flex items-center justify-center gap-1">
            <Sparkles className="w-3.5 h-3.5 text-amber-400" />
            <span>Bugün Tamamlanan: {completedPomodoros} Seans ({completedPomodoros * 25} Dk)</span>
          </div>
        </div>

        {/* Focus Ambience Music Selector */}
        <div className="p-3.5 rounded-2xl bg-slate-900/60 border border-slate-800 space-y-2 text-xs">
          <div className="flex items-center justify-between text-slate-300 font-semibold">
            <span className="flex items-center gap-1.5">
              <Headphones className="w-4 h-4 text-indigo-400" />
              <span>Konsantrasyon Arka Plan Sesi:</span>
            </span>
            <span className="text-emerald-400 font-bold flex items-center gap-1">
              <Volume2 className="w-3 h-3" />
              <span>Çalıyor</span>
            </span>
          </div>
          <select
            value={soundTrack}
            onChange={(e) => setSoundTrack(e.target.value)}
            className="w-full glass-input rounded-xl px-3 py-2 text-xs text-white"
          >
            <option value="Lo-Fi Yağmur Beats" className="bg-slate-900">🌧️ Lo-Fi Yağmur Sesi & Piyano</option>
            <option value="Kütüphane Çalışma Ambiyansı" className="bg-slate-900">📚 Üniversite Kütüphane Ambiyansı</option>
            <option value="Alfa Dalgalı Odak Odası" className="bg-slate-900">🧠 432Hz Alfa Odak Dalgaları</option>
          </select>
        </div>

        {/* Action Controls */}
        <div className="flex items-center justify-center space-x-3 pt-2">
          <button
            onClick={() => setIsRunning(!isRunning)}
            className={`px-8 py-3.5 rounded-2xl font-extrabold text-sm transition-all shadow-xl flex items-center gap-2 ${
              isRunning
                ? 'bg-amber-500 hover:bg-amber-400 text-slate-950 shadow-amber-500/30'
                : 'bg-indigo-600 hover:bg-indigo-500 text-white shadow-indigo-600/30 scale-105'
            }`}
          >
            {isRunning ? <Pause className="w-5 h-5" /> : <Play className="w-5 h-5 fill-white" />}
            <span>{isRunning ? 'Duraklat' : 'Seansı Başlat'}</span>
          </button>

          <button
            onClick={() => {
              setIsRunning(false);
              setTimeLeft(mode === 'focus' ? 1500 : mode === 'shortBreak' ? 300 : 900);
            }}
            className="p-3.5 rounded-2xl bg-slate-900 border border-slate-800 text-slate-400 hover:text-white"
            title="Sıfırla"
          >
            <RotateCcw className="w-5 h-5" />
          </button>
        </div>

      </div>
    </div>
  );
}
