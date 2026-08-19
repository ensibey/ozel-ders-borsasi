import React, { useState, useEffect } from 'react';
import { 
  X, 
  User, 
  Mail, 
  Phone, 
  Shield, 
  Lock, 
  Loader2, 
  AlertCircle, 
  CheckCircle2, 
  UserPlus, 
  Sparkles,
  KeyRound
} from 'lucide-react';

/**
 * UserFormModal: Modal for creating or editing user accounts with validation,
 * inline error handling, loading states, and keyboard accessibility (ESC).
 */
export default function UserFormModal({
  isOpen,
  onClose,
  onSubmit,
  user = null, // null for create mode, user object for edit mode
  isSubmitting = false
}) {
  const isEditMode = !!user;

  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    role: 'student',
    status: 'active',
    password: '',
    details: ''
  });

  const [errors, setErrors] = useState({});

  // Populate data when modal opens or user prop changes
  useEffect(() => {
    if (user) {
      setFormData({
        name: user.name || '',
        email: user.email || '',
        phone: user.phone || '',
        role: user.role || 'student',
        status: user.status || 'active',
        password: '',
        details: user.details || ''
      });
    } else {
      setFormData({
        name: '',
        email: '',
        phone: '',
        role: 'student',
        status: 'active',
        password: '',
        details: ''
      });
    }
    setErrors({});
  }, [user, isOpen]);

  // Keyboard accessibility: Close on ESC key press
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === 'Escape' && isOpen && !isSubmitting) {
        onClose();
      }
    };
    if (isOpen) {
      window.addEventListener('keydown', handleKeyDown);
    }
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, isSubmitting, onClose]);

  if (!isOpen) return null;

  const validateForm = () => {
    const newErrors = {};

    if (!formData.name.trim()) {
      newErrors.name = 'Ad ve soyad alanı zorunludur.';
    } else if (formData.name.trim().length < 3) {
      newErrors.name = 'Ad soyad en az 3 karakter olmalıdır.';
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!formData.email.trim()) {
      newErrors.email = 'E-posta adresi zorunludur.';
    } else if (!emailRegex.test(formData.email.trim())) {
      newErrors.email = 'Lütfen geçerli bir e-posta adresi giriniz.';
    }

    if (!isEditMode && (!formData.password || formData.password.length < 6)) {
      newErrors.password = 'Yeni kullanıcılar için en az 6 karakterli bir şifre gereklidir.';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!validateForm()) return;

    if (onSubmit) {
      onSubmit({
        ...formData,
        id: user?.id
      });
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 select-none">
      {/* 1. Backdrop Overlay */}
      <div 
        onClick={() => !isSubmitting && onClose()} 
        className="fixed inset-0 bg-slate-950/80 backdrop-blur-md transition-opacity animate-in fade-in"
      />

      {/* 2. Modal Window */}
      <div 
        role="dialog"
        aria-modal="true"
        className="relative w-full max-w-lg bg-slate-900 border border-slate-800 rounded-3xl p-6 sm:p-7 shadow-2xl z-10 animate-in fade-in zoom-in-95 duration-200"
      >
        {/* Modal Header */}
        <div className="flex items-center justify-between pb-4 border-b border-slate-800">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-2xl bg-blue-600/10 border border-blue-500/20 flex items-center justify-center text-blue-400">
              {isEditMode ? <User className="w-5 h-5" /> : <UserPlus className="w-5 h-5" />}
            </div>
            <div>
              <h2 className="text-base font-extrabold text-white tracking-tight">
                {isEditMode ? 'Kullanıcı Profilini Düzenle' : 'Yeni Kullanıcı Hesabı Ekle'}
              </h2>
              <p className="text-xs text-slate-400">
                {isEditMode ? `ID: ${user?.id} • Yetki ve bilgileri güncelleyin` : 'Platforma yeni bir hesap tanımlayın'}
              </p>
            </div>
          </div>

          <button
            onClick={onClose}
            disabled={isSubmitting}
            className="p-2 text-slate-400 hover:text-white hover:bg-slate-800 rounded-xl transition-colors disabled:opacity-50"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Modal Form */}
        <form onSubmit={handleSubmit} className="mt-5 space-y-4 text-xs font-sans">
          {/* Ad Soyad */}
          <div className="space-y-1.5">
            <label className="font-bold text-slate-300 flex items-center justify-between">
              <span>Ad Soyad / Kurum Ünvanı *</span>
              {errors.name && (
                <span className="text-rose-400 text-[11px] font-semibold flex items-center gap-1">
                  <AlertCircle className="w-3 h-3" /> {errors.name}
                </span>
              )}
            </label>
            <div className="relative">
              <User className="w-4 h-4 text-slate-500 absolute left-3.5 top-1/2 -translate-y-1/2" />
              <input
                type="text"
                autoFocus
                value={formData.name}
                onChange={(e) => {
                  setFormData({ ...formData, name: e.target.value });
                  if (errors.name) setErrors({ ...errors, name: null });
                }}
                placeholder="Örn: Mehmet Can"
                className={`w-full bg-slate-950 border ${
                  errors.name ? 'border-rose-500 focus:border-rose-500' : 'border-slate-800 focus:border-blue-500'
                } rounded-xl pl-9 pr-4 py-2.5 text-slate-200 placeholder-slate-500 focus:outline-none transition-all shadow-inner`}
              />
            </div>
          </div>

          {/* Email & Phone Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
            {/* Email */}
            <div className="space-y-1.5">
              <label className="font-bold text-slate-300 flex items-center justify-between">
                <span>E-Posta Adresi *</span>
                {errors.email && (
                  <span className="text-rose-400 text-[11px] font-semibold flex items-center gap-1">
                    <AlertCircle className="w-3 h-3" /> Hata
                  </span>
                )}
              </label>
              <div className="relative">
                <Mail className="w-4 h-4 text-slate-500 absolute left-3.5 top-1/2 -translate-y-1/2" />
                <input
                  type="email"
                  value={formData.email}
                  onChange={(e) => {
                    setFormData({ ...formData, email: e.target.value });
                    if (errors.email) setErrors({ ...errors, email: null });
                  }}
                  placeholder="mehmet@example.com"
                  className={`w-full bg-slate-950 border ${
                    errors.email ? 'border-rose-500 focus:border-rose-500' : 'border-slate-800 focus:border-blue-500'
                  } rounded-xl pl-9 pr-4 py-2.5 text-slate-200 placeholder-slate-500 focus:outline-none transition-all shadow-inner`}
                />
              </div>
              {errors.email && <p className="text-[10px] text-rose-400 font-semibold">{errors.email}</p>}
            </div>

            {/* Phone */}
            <div className="space-y-1.5">
              <label className="font-bold text-slate-300">Telefon Numarası</label>
              <div className="relative">
                <Phone className="w-4 h-4 text-slate-500 absolute left-3.5 top-1/2 -translate-y-1/2" />
                <input
                  type="text"
                  value={formData.phone}
                  onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                  placeholder="+90 5XX XXX XX XX"
                  className="w-full bg-slate-950 border border-slate-800 focus:border-blue-500 rounded-xl pl-9 pr-4 py-2.5 text-slate-200 placeholder-slate-500 focus:outline-none transition-all shadow-inner"
                />
              </div>
            </div>
          </div>

          {/* Role & Status Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
            {/* Role */}
            <div className="space-y-1.5">
              <label className="font-bold text-slate-300 flex items-center gap-1.5">
                <Shield className="w-3.5 h-3.5 text-blue-400" /> Rol & Erişim Yetkisi
              </label>
              <select
                value={formData.role}
                onChange={(e) => setFormData({ ...formData, role: e.target.value })}
                className="w-full bg-slate-950 border border-slate-800 focus:border-blue-500 rounded-xl px-3.5 py-2.5 text-slate-200 focus:outline-none cursor-pointer"
              >
                <option value="student">Öğrenci (Student)</option>
                <option value="teacher">Eğitmen / Öğretmen</option>
                <option value="parent">Veli (Parent)</option>
                <option value="vendor">Yayıncı / Yazar (Vendor)</option>
                <option value="admin">Sistem Yöneticisi (Super Admin)</option>
              </select>
            </div>

            {/* Status */}
            <div className="space-y-1.5">
              <label className="font-bold text-slate-300">Hesap Durumu</label>
              <select
                value={formData.status}
                onChange={(e) => setFormData({ ...formData, status: e.target.value })}
                className="w-full bg-slate-950 border border-slate-800 focus:border-blue-500 rounded-xl px-3.5 py-2.5 text-slate-200 focus:outline-none cursor-pointer"
              >
                <option value="active">Aktif (Kullanıma Açık)</option>
                <option value="suspended">Askıya Alınmış (Erişim Engelli)</option>
              </select>
            </div>
          </div>

          {/* Password (Required for create, optional for edit) */}
          <div className="space-y-1.5">
            <label className="font-bold text-slate-300 flex items-center justify-between">
              <span className="flex items-center gap-1.5">
                <KeyRound className="w-3.5 h-3.5 text-amber-400" />
                {isEditMode ? 'Yeni Şifre Belirle (Opsiyonel)' : 'Başlangıç Şifresi *'}
              </span>
              {errors.password && (
                <span className="text-rose-400 text-[11px] font-semibold flex items-center gap-1">
                  <AlertCircle className="w-3 h-3" /> {errors.password}
                </span>
              )}
            </label>
            <div className="relative">
              <Lock className="w-4 h-4 text-slate-500 absolute left-3.5 top-1/2 -translate-y-1/2" />
              <input
                type="password"
                value={formData.password}
                onChange={(e) => {
                  setFormData({ ...formData, password: e.target.value });
                  if (errors.password) setErrors({ ...errors, password: null });
                }}
                placeholder={isEditMode ? 'Değiştirmek istemiyorsanız boş bırakın' : 'En az 6 haneli güvenli parola'}
                className={`w-full bg-slate-950 border ${
                  errors.password ? 'border-rose-500 focus:border-rose-500' : 'border-slate-800 focus:border-blue-500'
                } rounded-xl pl-9 pr-4 py-2.5 text-slate-200 placeholder-slate-500 focus:outline-none transition-all shadow-inner`}
              />
            </div>
          </div>

          {/* Admin Note / Description */}
          <div className="space-y-1.5">
            <label className="font-bold text-slate-300">Yönetici Notu & Açıklama</label>
            <textarea
              rows={2}
              value={formData.details}
              onChange={(e) => setFormData({ ...formData, details: e.target.value })}
              placeholder="Kullanıcı ile ilgili dahili yönetici notu..."
              className="w-full bg-slate-950 border border-slate-800 focus:border-blue-500 rounded-xl p-3 text-slate-200 placeholder-slate-500 focus:outline-none resize-none transition-all shadow-inner"
            />
          </div>

          {/* Action Buttons */}
          <div className="flex items-center justify-end gap-3 pt-4 border-t border-slate-800">
            <button
              type="button"
              disabled={isSubmitting}
              onClick={onClose}
              className="px-4 py-2.5 bg-slate-800 hover:bg-slate-700 text-slate-300 hover:text-white font-bold rounded-xl transition-colors disabled:opacity-50"
            >
              Vazgeç
            </button>

            <button
              type="submit"
              disabled={isSubmitting}
              className="px-5 py-2.5 bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-500 hover:to-indigo-500 text-white font-bold rounded-xl shadow-lg shadow-blue-600/25 transition-all flex items-center gap-2 disabled:opacity-50"
            >
              {isSubmitting ? (
                <>
                  <Loader2 className="w-4 h-4 animate-spin" />
                  <span>Kaydediliyor...</span>
                </>
              ) : (
                <>
                  <CheckCircle2 className="w-4 h-4" />
                  <span>{isEditMode ? 'Değişiklikleri Güncelle' : 'Kullanıcıyı Oluştur'}</span>
                </>
              )}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
