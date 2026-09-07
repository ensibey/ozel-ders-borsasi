import React, { useState, useEffect } from 'react';
import { 
  X, Lock, ShieldCheck, Crown, UserCheck, Award, 
  GraduationCap, ArrowRight, AlertCircle, Sparkles, Building2, Users
} from 'lucide-react';
import confetti from 'canvas-confetti';

export default function AuthModal({ isOpen, onClose, targetRole = 'student', onAuthSuccess }) {
  const [selectedRole, setSelectedRole] = useState(targetRole || 'student');
  const [password, setPassword] = useState('');
  const [errorMsg, setErrorMsg] = useState('');

  useEffect(() => {
    if (targetRole) setSelectedRole(targetRole);
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

  const roleMeta = {
    student: { 
      title: '👨‍🎓 Öğrenci Portalı Girişi', 
      desc: 'Hedeflerinize, yaklaşan ders takviminize ve sınav simülatörüne erişin.', 
      code: '',
      color: 'bg-emerald-600 hover:bg-emerald-500 shadow-emerald-600/30'
    },
    teacher: { 
      title: '👨‍🏫 Öğretmen & Eğitmen Portalı', 
      desc: 'Ders takvimi yönetimi, canlı ihale teklifleri ve hakediş paneli.', 
      code: 'ogretmen123',
      color: 'bg-teal-600 hover:bg-teal-500 shadow-teal-600/30'
    },
    parent: { 
      title: '👨‍👩‍👧 Veli Takip Portalı', 
      desc: 'Öğrenci devam durumu, net gelişim grafiği ve eğitmen değerlendirme raporları.', 
      code: '',
      color: 'bg-amber-600 hover:bg-amber-500 shadow-amber-600/30'
    },
    vendor: { 
      title: '🏢 Firma & Yayınevi Portalı', 
      desc: 'Kitap, deneme sınavı ve koçluk materyali satış yönetimi.', 
      code: 'yayin123',
      color: 'bg-purple-600 hover:bg-purple-500 shadow-purple-600/30'
    },
    admin: { 
      title: '🛡️ Yönetici (Admin) Portalı', 
      desc: 'Sistem güvenliği, kullanıcı CRUD, eğitmen doğrulama ve finans.', 
      code: 'admin123',
      color: 'bg-blue-600 hover:bg-blue-500 shadow-blue-600/30'
    }
  };

  const current = roleMeta[selectedRole] || roleMeta.student;

  const handleLogin = (e) => {
    if (e) e.preventDefault();
    setErrorMsg('');

    if (current.code && password !== current.code) {
      setErrorMsg(`Hatalı şifre! (Demo Şifresi: ${current.code})`);
      return;
    }

    confetti({ particleCount: 60, spread: 50 });
    if (onAuthSuccess) {
      onAuthSuccess(selectedRole);
    }
    setPassword('');
    onClose();
  };

  return (
    <div 
      onClick={onClose}
      className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 bg-slate-950/85 backdrop-blur-md animate-fadeIn select-none"
    >
      <div 
        onClick={(e) => e.stopPropagation()}
        className="w-full max-w-lg max-h-[92vh] overflow-y-auto rounded-3xl p-5 sm:p-8 bg-slate-900 border border-slate-700 shadow-2xl relative space-y-5 sm:space-y-6 text-white custom-scrollbar"
      >
        {/* Close Button */}
        <button 
          onClick={onClose} 
          className="absolute top-5 right-5 p-2 rounded-xl bg-slate-800 border border-slate-700 text-slate-400 hover:text-white transition-colors"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Modal Header */}
        <div className="space-y-1.5 text-center">
          <span className="px-3 py-1 rounded-full bg-emerald-500/10 border border-emerald-500/30 text-emerald-400 text-xs font-bold uppercase tracking-wider inline-flex items-center gap-1.5">
            <Sparkles className="w-3.5 h-3.5" /> Giriş & Yetkilendirme
          </span>
          <h2 className="text-xl sm:text-2xl font-black tracking-tight">{current.title}</h2>
          <p className="text-xs text-slate-400 max-w-sm mx-auto">{current.desc}</p>
        </div>

        {/* Role Selector Tabs */}
        <div className="grid grid-cols-3 sm:grid-cols-5 gap-1.5 p-1.5 rounded-2xl bg-slate-950 border border-slate-800 text-[11px] font-bold text-center">
          {[
            { id: 'student', label: 'Öğrenci' },
            { id: 'teacher', label: 'Öğretmen' },
            { id: 'parent', label: 'Veli' },
            { id: 'vendor', label: 'Yayınevi' },
            { id: 'admin', label: 'Admin' }
          ].map((r) => (
            <button
              key={r.id}
              type="button"
              onClick={() => {
                setSelectedRole(r.id);
                setPassword('');
                setErrorMsg('');
              }}
              className={`py-2 rounded-xl transition-all ${
                selectedRole === r.id
                  ? 'bg-emerald-600 text-white shadow-md'
                  : 'text-slate-400 hover:text-white hover:bg-slate-900'
              }`}
            >
              {r.label}
            </button>
          ))}
        </div>

        {errorMsg && (
          <div className="p-3 rounded-xl bg-rose-500/20 border border-rose-500/30 text-rose-300 text-xs font-bold flex items-center gap-2 animate-bounce">
            <AlertCircle className="w-4 h-4 shrink-0" />
            <span>{errorMsg}</span>
          </div>
        )}

        {/* Form Area */}
        <form onSubmit={handleLogin} className="space-y-4">
          {current.code ? (
            <div className="space-y-2">
              <div className="flex items-center justify-between">
                <label className="block text-xs font-bold text-slate-300">Giriş Şifresi / Demo PIN</label>
                <button
                  type="button"
                  onClick={() => setPassword(current.code)}
                  className="text-[11px] font-bold text-emerald-400 hover:text-emerald-300 bg-emerald-500/10 px-2 py-0.5 rounded border border-emerald-500/20"
                >
                  ⚡ Demo Şifresi ({current.code})
                </button>
              </div>
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder={`Demo Şifresi: ${current.code}`}
                className="w-full bg-slate-950 border border-slate-700 rounded-xl px-4 py-3 text-xs text-white placeholder-slate-500 focus:outline-none focus:border-emerald-500"
                required
              />
            </div>
          ) : (
            <div className="p-3.5 rounded-2xl bg-emerald-500/10 border border-emerald-500/20 text-emerald-300 text-xs font-semibold flex items-center gap-2">
              <ShieldCheck className="w-5 h-5 text-emerald-400 shrink-0" />
              <span>Demo Modu: Doğrulama gerekmiyor. Tek tıkla doğrudan giriş yapabilirsiniz.</span>
            </div>
          )}

          <button
            type="submit"
            className={`w-full py-3.5 rounded-2xl text-white font-black text-xs sm:text-sm shadow-xl flex items-center justify-center gap-2 transition-transform hover:scale-[1.02] ${current.color}`}
          >
            <span>{selectedRole.toUpperCase()} Portalına Giriş Yap</span>
            <ArrowRight className="w-4 h-4" />
          </button>
        </form>

      </div>
    </div>
  );
}
