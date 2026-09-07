import React, { useState, useEffect } from 'react';
import { 
  X, Lock, Mail, ShieldCheck, ArrowRight, AlertCircle, 
  Sparkles, Building2, GraduationCap, CheckCircle2, User
} from 'lucide-react';
import confetti from 'canvas-confetti';

/**
 * AuthModal: Streamlined authentication modal strictly containing:
 * 1. Öğrenci (Student) Login
 * 2. Yayınevi (Publisher) Login — with seamless Admin entry & auto-detection.
 */
export default function AuthModal({ isOpen, onClose, targetRole = 'vendor', onAuthSuccess }) {
  // Only 2 roles: 'student' and 'vendor' (admin enters through vendor)
  const [selectedRole, setSelectedRole] = useState(() => {
    if (targetRole === 'admin' || targetRole === 'vendor') return 'vendor';
    return 'student';
  });

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [errorMsg, setErrorMsg] = useState('');

  useEffect(() => {
    if (targetRole === 'admin' || targetRole === 'vendor') {
      setSelectedRole('vendor');
      if (targetRole === 'admin') {
        setEmail('admin@ozeldersborsasi.com');
        setPassword('admin123');
      }
    } else {
      setSelectedRole('student');
    }
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

  // Check if inputs match Admin credentials
  const isAdminCredentials = 
    email.toLowerCase().includes('admin') || 
    password.trim() === 'admin123' ||
    password.trim() === 'admin';

  const handleLogin = (e) => {
    if (e) e.preventDefault();
    setErrorMsg('');

    if (selectedRole === 'student') {
      // Student login
      confetti({ particleCount: 60, spread: 50 });
      if (onAuthSuccess) onAuthSuccess('student');
      onClose();
      return;
    }

    // Selected role is 'vendor' (Publisher / Admin)
    if (!password) {
      setErrorMsg('Lütfen şifrenizi giriniz.');
      return;
    }

    // If admin credentials are used
    if (isAdminCredentials) {
      if (password !== 'admin123' && password !== 'admin') {
        setErrorMsg('Hatalı Admin şifresi! (Demo Şifresi: admin123)');
        return;
      }
      confetti({ particleCount: 70, spread: 60 });
      if (onAuthSuccess) onAuthSuccess('admin');
      onClose();
      return;
    }

    // Publisher (Vendor) login
    if (password !== 'yayin123' && password.length < 4) {
      setErrorMsg('Şifre en az 4 karakter olmalıdır. (Demo Şifresi: yayin123)');
      return;
    }

    confetti({ particleCount: 60, spread: 50 });
    if (onAuthSuccess) onAuthSuccess('vendor');
    onClose();
  };

  const handleFillDemo = (type) => {
    setErrorMsg('');
    if (type === 'admin') {
      setEmail('admin@ozeldersborsasi.com');
      setPassword('admin123');
    } else if (type === 'vendor') {
      setEmail('iletisim@borsayayinlari.com');
      setPassword('yayin123');
    } else if (type === 'student') {
      setEmail('ogrenci@ozeldersborsasi.com');
      setPassword('123456');
    }
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
            <Sparkles className="w-3.5 h-3.5" /> Giriş & Yetkilendirme
          </span>
          <h2 className="text-xl sm:text-2xl font-black tracking-tight">
            {selectedRole === 'student' ? '👨‍🎓 Öğrenci Portalı Girişi' : '🏢 Yayınevi & Kurumsal Giriş'}
          </h2>
          <p className="text-xs text-slate-400 max-w-xs mx-auto">
            {selectedRole === 'student' 
              ? 'Siparişlerinize, dijital kitap kütüphanenize ve kuponlarınıza erişin.'
              : 'Yayınevi mağaza yönetimi veya Yönetici (Admin) paneline güvenle bağlanın.'}
          </p>
        </div>

        {/* ONLY 2 ROLES: ÖĞRENCİ VE YAYINEVİ */}
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
            <span>Öğrenci</span>
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
            <span>Yayınevi</span>
          </button>
        </div>

        {/* Error Notification */}
        {errorMsg && (
          <div className="p-3 rounded-xl bg-rose-500/20 border border-rose-500/30 text-rose-300 text-xs font-bold flex items-center gap-2 animate-bounce">
            <AlertCircle className="w-4 h-4 shrink-0" />
            <span>{errorMsg}</span>
          </div>
        )}

        {/* Login Form */}
        <form onSubmit={handleLogin} className="space-y-4">
          
          {/* Email Input */}
          <div className="space-y-1.5">
            <label className="block text-xs font-bold text-slate-300">
              {selectedRole === 'student' ? 'Öğrenci E-posta Adresi' : 'Kurumsal / Admin E-posta'}
            </label>
            <div className="relative">
              <Mail className="w-4 h-4 text-slate-500 absolute left-3.5 top-1/2 -translate-y-1/2" />
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder={selectedRole === 'student' ? 'ornek@ogrenci.com' : 'yayinevi@firma.com veya admin@...'}
                className="w-full bg-slate-950 border border-slate-700 rounded-xl pl-10 pr-4 py-3 text-xs text-white placeholder-slate-500 focus:outline-none focus:border-emerald-500 transition-colors"
                required
              />
            </div>
          </div>

          {/* Password Input */}
          <div className="space-y-1.5">
            <div className="flex items-center justify-between">
              <label className="block text-xs font-bold text-slate-300">Giriş Şifresi</label>
              
              {/* Quick Demo Helper Chips */}
              <div className="flex items-center gap-1.5">
                {selectedRole === 'student' ? (
                  <button
                    type="button"
                    onClick={() => handleFillDemo('student')}
                    className="text-[10px] font-bold text-emerald-400 hover:text-emerald-300 bg-emerald-500/10 px-2 py-0.5 rounded border border-emerald-500/20"
                  >
                    ⚡ Demo Öğrenci
                  </button>
                ) : (
                  <>
                    <button
                      type="button"
                      onClick={() => handleFillDemo('vendor')}
                      className="text-[10px] font-bold text-purple-400 hover:text-purple-300 bg-purple-500/10 px-2 py-0.5 rounded border border-purple-500/20"
                      title="Yayınevi Demo Girişi"
                    >
                      🏢 Yayınevi (yayin123)
                    </button>
                    <button
                      type="button"
                      onClick={() => handleFillDemo('admin')}
                      className="text-[10px] font-bold text-blue-400 hover:text-blue-300 bg-blue-500/10 px-2 py-0.5 rounded border border-blue-500/20"
                      title="Admin Demo Girişi"
                    >
                      👑 Admin (admin123)
                    </button>
                  </>
                )}
              </div>
            </div>

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

          {/* Publisher / Admin Info Note */}
          {selectedRole === 'vendor' && (
            <div className="p-3 rounded-xl bg-slate-950/70 border border-slate-800 text-[11px] text-slate-400 flex items-center justify-between">
              <span className="flex items-center gap-1.5">
                <ShieldCheck className="w-4 h-4 text-indigo-400 shrink-0" />
                <span>Admin girişi için yönetici e-postası ve şifresi kullanınız.</span>
              </span>
              {isAdminCredentials && (
                <span className="px-2 py-0.5 rounded bg-blue-500/20 text-blue-300 text-[10px] font-extrabold border border-blue-500/40">
                  Admin Algılandı 👑
                </span>
              )}
            </div>
          )}

          {/* Action Submit Button */}
          <button
            type="submit"
            className={`w-full py-3.5 rounded-2xl text-white font-black text-xs sm:text-sm shadow-xl flex items-center justify-center gap-2 transition-all hover:scale-[1.01] active:scale-95 ${
              selectedRole === 'student'
                ? 'bg-emerald-600 hover:bg-emerald-500 shadow-emerald-600/30'
                : isAdminCredentials
                  ? 'bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-500 hover:to-indigo-500 shadow-blue-600/30'
                  : 'bg-gradient-to-r from-purple-600 to-indigo-600 hover:from-purple-500 hover:to-indigo-500 shadow-purple-600/30'
            }`}
          >
            <span>
              {selectedRole === 'student'
                ? 'Öğrenci Portalı Girişi Yap'
                : isAdminCredentials
                  ? '👑 Yönetici (Admin) Portalına Giriş Yap'
                  : '🏢 Yayınevi Portalına Giriş Yap'}
            </span>
            <ArrowRight className="w-4 h-4" />
          </button>

        </form>

      </div>
    </div>
  );
}
