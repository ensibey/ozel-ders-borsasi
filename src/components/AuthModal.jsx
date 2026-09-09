import React, { useState, useEffect } from 'react';
import { 
  X, Lock, Mail, ArrowRight, AlertCircle, 
  Sparkles, Building2, GraduationCap
} from 'lucide-react';
import confetti from 'canvas-confetti';

/**
 * AuthModal: Temiz ve guvenli giris modali.
 * 1. Ogrenci Girisi
 * 2. Yayinevi & Yonetici Girisi (Admin yonlendirimi otomatik gerceklesir)
 */
export default function AuthModal({ isOpen, onClose, targetRole = 'vendor', onAuthSuccess }) {
  const [selectedRole, setSelectedRole] = useState(() => {
    if (targetRole === 'admin' || targetRole === 'vendor') return 'vendor';
    return 'student';
  });

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [errorMsg, setErrorMsg] = useState('');

  useEffect(() => {
    if (!isOpen) return;
    if (targetRole === 'admin' || targetRole === 'vendor') {
      setSelectedRole('vendor');
    } else {
      setSelectedRole('student');
    }
    setEmail('');
    setPassword('');
    setErrorMsg('');
  }, [targetRole, isOpen]);

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

  const handleLogin = (e) => {
    if (e) e.preventDefault();
    setErrorMsg('');

    const trimmedEmail = email.trim().toLowerCase();
    const trimmedPassword = password.trim();

    if (!trimmedEmail || !trimmedPassword) {
      setErrorMsg('Lutfen e-posta adresinizi ve sifrenizi giriniz.');
      return;
    }

    if (selectedRole === 'student') {
      // Ogrenci Girisi
      confetti({ particleCount: 50, spread: 50 });
      if (onAuthSuccess) onAuthSuccess('student');
      onClose();
      return;
    }

    // Admin Girisi — Tek ve Kesin E-posta / Sifre
    if (trimmedEmail === 'admin@ozeldersborsasi.com') {
      if (trimmedPassword === 'admin123') {
        confetti({ particleCount: 60, spread: 60 });
        if (onAuthSuccess) onAuthSuccess('admin');
        onClose();
        return;
      } else {
        setErrorMsg('E-posta adresi veya sifre hatali.');
        return;
      }
    }

    // Yayinevi standard giris
    if (trimmedPassword === 'yayin123' || trimmedPassword.length >= 4) {
      confetti({ particleCount: 50, spread: 50 });
      if (onAuthSuccess) onAuthSuccess('vendor');
      onClose();
      return;
    }

    setErrorMsg('E-posta adresi veya sifre hatali.');
  };

  return (
    <div 
      onClick={onClose}
      className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 bg-slate-950/85 backdrop-blur-md animate-fadeIn select-none font-sans"
    >
      <div 
        onClick={(e) => e.stopPropagation()}
        className="w-full max-w-md max-h-[92vh] overflow-y-auto rounded-3xl p-6 sm:p-8 bg-slate-900 border border-slate-700 shadow-2xl relative space-y-6 text-white custom-scrollbar"
      >
        {/* Close Button */}
        <button 
          type="button"
          onClick={onClose} 
          className="absolute top-5 right-5 p-2 rounded-xl bg-slate-800 border border-slate-700 text-slate-400 hover:text-white transition-colors"
          title="Kapat"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Modal Header */}
        <div className="space-y-1.5 text-center pt-1">
          <span className="px-3 py-1 rounded-full bg-emerald-500/10 border border-emerald-500/30 text-emerald-400 text-xs font-bold uppercase tracking-wider inline-flex items-center gap-1.5">
            <Sparkles className="w-3.5 h-3.5" /> Guvenli Giris
          </span>
          <h2 className="text-xl sm:text-2xl font-black tracking-tight">
            {selectedRole === 'student' ? 'Ogrenci Portali' : 'Yayinevi Portali'}
          </h2>
          <p className="text-xs text-slate-400 max-w-xs mx-auto">
            {selectedRole === 'student' 
              ? 'Hesabiniza giris yaparak ozel ders ve kupon firsatlarindan yararlanin.'
              : 'Yayinevi ve kurumsal yonetim panelinize guvenle baglanin.'}
          </p>
        </div>

        {/* 2 Sekme: Ogrenci ve Yayinevi */}
        <div className="grid grid-cols-2 gap-2 p-1.5 rounded-2xl bg-slate-950 border border-slate-800 text-xs font-bold text-center">
          <button
            type="button"
            onClick={() => {
              setSelectedRole('student');
              setErrorMsg('');
              setEmail('');
              setPassword('');
            }}
            className={`py-3 rounded-xl transition-all flex items-center justify-center gap-2 ${
              selectedRole === 'student'
                ? 'bg-emerald-600 text-white shadow-lg shadow-emerald-600/30 font-black'
                : 'text-slate-400 hover:text-white hover:bg-slate-900'
            }`}
          >
            <GraduationCap className="w-4 h-4" />
            <span>Ogrenci</span>
          </button>

          <button
            type="button"
            onClick={() => {
              setSelectedRole('vendor');
              setErrorMsg('');
              setEmail('');
              setPassword('');
            }}
            className={`py-3 rounded-xl transition-all flex items-center justify-center gap-2 ${
              selectedRole === 'vendor'
                ? 'bg-gradient-to-r from-purple-600 to-indigo-600 text-white shadow-lg shadow-purple-600/30 font-black'
                : 'text-slate-400 hover:text-white hover:bg-slate-900'
            }`}
          >
            <Building2 className="w-4 h-4" />
            <span>Yayinevi</span>
          </button>
        </div>

        {/* Error Notification */}
        {errorMsg && (
          <div className="p-3 rounded-xl bg-rose-500/20 border border-rose-500/30 text-rose-300 text-xs font-bold flex items-center gap-2">
            <AlertCircle className="w-4 h-4 shrink-0" />
            <span>{errorMsg}</span>
          </div>
        )}

        {/* Form */}
        <form onSubmit={handleLogin} className="space-y-4">
          
          {/* Email Input */}
          <div className="space-y-1.5">
            <label className="block text-xs font-bold text-slate-300">
              E-posta Adresi
            </label>
            <div className="relative">
              <Mail className="w-4 h-4 text-slate-500 absolute left-3.5 top-1/2 -translate-y-1/2" />
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="ornek@eposta.com"
                className="w-full bg-slate-950 border border-slate-700 rounded-xl pl-10 pr-4 py-3 text-xs text-white placeholder-slate-500 focus:outline-none focus:border-emerald-500 transition-colors"
                required
              />
            </div>
          </div>

          {/* Password Input */}
          <div className="space-y-1.5">
            <label className="block text-xs font-bold text-slate-300">
              Sifre
            </label>
            <div className="relative">
              <Lock className="w-4 h-4 text-slate-500 absolute left-3.5 top-1/2 -translate-y-1/2" />
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="••••••••"
                className="w-full bg-slate-950 border border-slate-700 rounded-xl pl-10 pr-4 py-3 text-xs text-white placeholder-slate-500 focus:outline-none focus:border-emerald-500 transition-colors"
                required
              />
            </div>
          </div>

          {/* Submit Button */}
          <button
            type="submit"
            className={`w-full py-3.5 rounded-2xl text-white font-black text-xs sm:text-sm shadow-xl flex items-center justify-center gap-2 transition-all hover:scale-[1.01] active:scale-95 ${
              selectedRole === 'student'
                ? 'bg-emerald-600 hover:bg-emerald-500 shadow-emerald-600/30'
                : 'bg-gradient-to-r from-purple-600 to-indigo-600 hover:from-purple-500 hover:to-indigo-500 shadow-purple-600/30'
            }`}
          >
            <span>Giris Yap</span>
            <ArrowRight className="w-4 h-4" />
          </button>

        </form>

      </div>
    </div>
  );
}
