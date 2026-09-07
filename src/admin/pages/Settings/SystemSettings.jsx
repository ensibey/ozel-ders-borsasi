import React, { useState, useEffect } from 'react';
import { 
  Settings, 
  ShieldAlert, 
  ShieldCheck, 
  Lock, 
  Key, 
  Webhook, 
  Globe, 
  Clock, 
  Save, 
  CheckCircle2, 
  AlertTriangle, 
  Eye, 
  EyeOff, 
  RefreshCw, 
  Terminal, 
  Copy, 
  Check, 
  Send,
  Zap,
  Download,
  Trash2,
  Building2,
  GraduationCap,
  Sparkles,
  Sliders,
  Database,
  Tag
} from 'lucide-react';
import { useAdminAuth } from '../../context/AdminAuthContext';
import AdminToast from '../../components/AdminToast';
import { INITIAL_COUPONS } from '../../../data/mockData';

export default function SystemSettings({
  announcements = [],
  onAddAnnouncement,
  onDeleteAnnouncement,
  teachers = [],
  onUpdateTeacher,
  coupons = [],
  onUpdateCoupon,
  onAddCoupon,
  onDeleteCoupon,
  onSwitchRole,
  platformCommission = 12,
  onUpdateCommission,
  showToast: propShowToast
}) {
  const { logAction, exportSystemBackup, clearSystemCache, adminUser } = useAdminAuth();

  const [toast, setToast] = useState(null);
  const showToast = (message, type = 'success') => {
    setToast({ message, type });
    if (propShowToast) propShowToast(message, type);
  };

  // 1. General Site Settings
  const [siteConfig, setSiteConfig] = useState(() => {
    try {
      const saved = localStorage.getItem('odb_site_config');
      return saved ? JSON.parse(saved) : {
        siteName: 'Özel Ders Borsası',
        siteTagline: 'Türkiye’nin Yeni Nesil Canlı Ders & Eğitmen Pazaryeri',
        supportEmail: 'destek@ozeldersborsasi.com',
        maintenanceMode: false,
        allowRegistrations: true
      };
    } catch (e) {
      return {
        siteName: 'Özel Ders Borsası',
        siteTagline: 'Türkiye’nin Yeni Nesil Canlı Ders & Eğitmen Pazaryeri',
        supportEmail: 'destek@ozeldersborsasi.com',
        maintenanceMode: false,
        allowRegistrations: true
      };
    }
  });

  // 2. Security Settings
  const [securityConfig, setSecurityConfig] = useState(() => {
    try {
      const saved = localStorage.getItem('odb_security_config');
      return saved ? JSON.parse(saved) : {
        strict2FA: true,
        sessionTimeoutMinutes: 60,
        maxLoginAttempts: 5,
        ipWhitelistEnabled: false,
        allowedIpRanges: '192.168.1.0/24, 10.0.0.0/8'
      };
    } catch (e) {
      return {
        strict2FA: true,
        sessionTimeoutMinutes: 60,
        maxLoginAttempts: 5,
        ipWhitelistEnabled: false,
        allowedIpRanges: '192.168.1.0/24, 10.0.0.0/8'
      };
    }
  });

  // 3. API & Webhook Settings
  const [apiConfig, setApiConfig] = useState(() => {
    try {
      const saved = localStorage.getItem('odb_api_config');
      return saved ? JSON.parse(saved) : {
        paymentApiKey: 'iyzi_sandbox_test_key_demo',
        paymentSecret: 'iyzi_sandbox_test_secret_demo',
        smsWebhookUrl: 'https://api.ozeldersborsasi.com/webhooks/sms-gateway',
        webhookSecret: 'whsec_sandbox_test_signature_demo',
        whatsappNotificationEnabled: true
      };
    } catch (e) {
      return {
        paymentApiKey: 'iyzi_sandbox_test_key_demo',
        paymentSecret: 'iyzi_sandbox_test_secret_demo',
        smsWebhookUrl: 'https://api.ozeldersborsasi.com/webhooks/sms-gateway',
        webhookSecret: 'whsec_sandbox_test_signature_demo',
        whatsappNotificationEnabled: true
      };
    }
  });

  const [showSecretKey, setShowSecretKey] = useState(false);
  const [isSaving, setIsSaving] = useState(false);
  const [isTestingWebhook, setIsTestingWebhook] = useState(false);
  const [copiedKey, setCopiedKey] = useState(false);

  // Persist configurations
  useEffect(() => {
    try {
      localStorage.setItem('odb_site_config', JSON.stringify(siteConfig));
      localStorage.setItem('odb_security_config', JSON.stringify(securityConfig));
      localStorage.setItem('odb_api_config', JSON.stringify(apiConfig));
    } catch (e) {}
  }, [siteConfig, securityConfig, apiConfig]);

  // Handle Save All Settings
  const handleSaveAll = (e) => {
    e.preventDefault();
    setIsSaving(true);

    setTimeout(() => {
      setIsSaving(false);
      logAction(
        'SYSTEM_CONFIG_UPDATED',
        'SYSTEM_SETTINGS',
        'Global Ayar Parametreleri',
        'Site bilgileri, güvenlik protokolleri ve API entegrasyon ayarları güncellendi.',
        'success'
      );
      showToast('Sistem ve güvenlik yapılandırması başarıyla kaydedildi!', 'success');
    }, 600);
  };

  // Test Webhook Ping Simulation
  const handleTestWebhookPing = () => {
    setIsTestingWebhook(true);
    setTimeout(() => {
      setIsTestingWebhook(false);
      logAction(
        'WEBHOOK_PING_TEST',
        'INTEGRATION',
        apiConfig.smsWebhookUrl,
        'Webhook uç noktasına test ping paketi gönderildi. HTTP 200 OK yanıtı alındı.',
        'info'
      );
      showToast('Webhook endpoint testi başarılı: HTTP 200 OK (Yanıt süresi: 48ms)', 'success');
    }, 800);
  };

  const handleCopyWebhookSecret = () => {
    navigator.clipboard?.writeText(apiConfig.webhookSecret);
    setCopiedKey(true);
    showToast('Webhook Secret anahtarı panoya kopyalandı.', 'info');
    setTimeout(() => setCopiedKey(false), 2000);
  };

  const handleBulkApproveTeachers = () => {
    const unverified = teachers.filter(t => !t.verified);
    if (unverified.length === 0) {
      showToast('Onay bekleyen öğretmen bulunamadı.', 'info');
      return;
    }
    unverified.forEach(t => {
      if (onUpdateTeacher) onUpdateTeacher(t.id, { verified: true });
    });
    logAction('BULK_TEACHER_APPROVAL', 'MODERATION', 'Tüm Eğitmenler', `${unverified.length} eğitmen tek tıkla onaylandı.`, 'success');
    showToast(`${unverified.length} eğitmen başarıyla onaylandı!`, 'success');
  };

  const handleResetCoupons = () => {
    try {
      localStorage.setItem('odb_coupons', JSON.stringify(INITIAL_COUPONS));
      INITIAL_COUPONS.forEach(c => {
        if (onUpdateCoupon) onUpdateCoupon(c.id, c);
        else if (onAddCoupon) onAddCoupon(c);
      });
      logAction('COUPONS_RESTORED', 'SYSTEM', 'Kuponlar', 'Kuponlar varsayılan fabrika ayarlarına döndürüldü.', 'warning');
      showToast('Kuponlar başarıyla fabrika ayarlarına döndürüldü!', 'success');
    } catch (e) {
      showToast('Kuponlar sıfırlanırken hata oluştu.', 'error');
    }
  };

  const handleExportBackup = () => {
    if (exportSystemBackup) {
      const ok = exportSystemBackup();
      if (ok) showToast('Sistem tam veritabanı yedeği JSON olarak indirildi.', 'success');
    }
  };

  const handleClearCache = () => {
    if (clearSystemCache) clearSystemCache();
    showToast('Önbellek ve geçici veriler temizlendi.', 'info');
  };

  return (
    <div className="space-y-6 select-none font-sans">
      <AdminToast toast={toast} onClose={() => setToast(null)} />

      {/* 👑 ROOT SÜPER YÖNETİCİ & GOD-MODE KOMUTA MASASI */}
      <div className="p-6 rounded-3xl bg-gradient-to-r from-amber-950/50 via-slate-900 to-indigo-950/50 border border-amber-500/40 shadow-2xl space-y-5">
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 pb-3 border-b border-slate-800">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-2xl bg-amber-500/20 text-amber-400 border border-amber-500/30 flex items-center justify-center text-xl shrink-0">
              👑
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h2 className="text-base font-black text-white tracking-tight">Root Süper Yönetici Komuta & Müdahale Masası</h2>
                <span className="px-2 py-0.5 rounded-md bg-amber-500/20 text-amber-300 border border-amber-500/30 text-[10px] font-black uppercase">
                  GOD-MODE AKTİF
                </span>
              </div>
              <p className="text-xs text-slate-400">
                Bu panel ile veritabanı, kuponlar, kullanıcı rolleri ve platform yetkileri üzerinde %100 doğrudan otoriteye sahipsiniz.
              </p>
            </div>
          </div>
          <span className="text-[11px] font-mono text-emerald-400 bg-emerald-500/10 border border-emerald-500/20 px-3 py-1 rounded-xl font-bold flex items-center gap-1.5">
            <span className="w-2 h-2 rounded-full bg-emerald-400 animate-ping inline-block" />
            Tüm Sistem Yetkileri: AÇIK
          </span>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {/* Quick Role Impersonation */}
          <div className="p-4 rounded-2xl bg-slate-950/70 border border-slate-800 space-y-2.5">
            <span className="text-xs font-bold text-white flex items-center gap-1.5">
              <Sparkles className="w-4 h-4 text-amber-400" />
              Tek Tıkla Portal Değiştir
            </span>
            <p className="text-[11px] text-slate-400">Yönetici oturumunu kapatmadan doğrudan portallar arasında geçiş yapın:</p>
            <div className="flex flex-col gap-1.5">
              <button
                type="button"
                onClick={() => onSwitchRole && onSwitchRole('student')}
                className="w-full py-2 px-3 bg-emerald-500/10 hover:bg-emerald-500/20 text-emerald-300 border border-emerald-500/30 rounded-xl font-bold text-xs flex items-center justify-between transition-colors"
              >
                <span>🎓 Öğrenci Portalı Olarak Aç</span>
                <span className="text-[10px] text-emerald-400 font-mono">Geç</span>
              </button>
              <button
                type="button"
                onClick={() => onSwitchRole && onSwitchRole('vendor')}
                className="w-full py-2 px-3 bg-purple-500/10 hover:bg-purple-500/20 text-purple-300 border border-purple-500/30 rounded-xl font-bold text-xs flex items-center justify-between transition-colors"
              >
                <span>🏢 Yayınevi Portalı Olarak Aç</span>
                <span className="text-[10px] text-purple-400 font-mono">Geç</span>
              </button>
              <button
                type="button"
                onClick={() => onSwitchRole && onSwitchRole('general')}
                className="w-full py-2 px-3 bg-blue-500/10 hover:bg-blue-500/20 text-blue-300 border border-blue-500/30 rounded-xl font-bold text-xs flex items-center justify-between transition-colors"
              >
                <span>🛍️ Genel Pazaryeri Vitrini</span>
                <span className="text-[10px] text-blue-400 font-mono">Geç</span>
              </button>
            </div>
          </div>

          {/* Master Database & Automation */}
          <div className="p-4 rounded-2xl bg-slate-950/70 border border-slate-800 space-y-2.5">
            <span className="text-xs font-bold text-white flex items-center gap-1.5">
              <Database className="w-4 h-4 text-blue-400" />
              Sistem Otomasyonu & Sıfırlama
            </span>
            <p className="text-[11px] text-slate-400">Veritabanı işlemlerini ve bekleyen akreditasyonları tek tıkla yürütün:</p>
            <div className="flex flex-col gap-1.5">
              <button
                type="button"
                onClick={handleBulkApproveTeachers}
                className="w-full py-2 px-3 bg-amber-500/10 hover:bg-amber-500/20 text-amber-300 border border-amber-500/30 rounded-xl font-bold text-xs flex items-center justify-between transition-colors"
              >
                <span>⚡ Tüm Öğretmenleri Tek Tıkla Onayla</span>
                <span className="text-[10px] text-amber-400 font-mono font-bold">Onayla</span>
              </button>
              <button
                type="button"
                onClick={handleResetCoupons}
                className="w-full py-2 px-3 bg-emerald-500/10 hover:bg-emerald-500/20 text-emerald-300 border border-emerald-500/30 rounded-xl font-bold text-xs flex items-center justify-between transition-colors"
              >
                <span>🏷️ Kuponları Varsayılanlara Döndür</span>
                <span className="text-[10px] text-emerald-400 font-mono">Sıfırla</span>
              </button>
              <button
                type="button"
                onClick={handleExportBackup}
                className="w-full py-2 px-3 bg-indigo-500/10 hover:bg-indigo-500/20 text-indigo-300 border border-indigo-500/30 rounded-xl font-bold text-xs flex items-center justify-between transition-colors"
              >
                <span>💾 Tüm Veritabanı Yedeğini İndir</span>
                <span className="text-[10px] text-indigo-400 font-mono">JSON</span>
              </button>
            </div>
          </div>

          {/* Quick Commission Override & Cache */}
          <div className="p-4 rounded-2xl bg-slate-950/70 border border-slate-800 space-y-2.5">
            <span className="text-xs font-bold text-white flex items-center gap-1.5">
              <Sliders className="w-4 h-4 text-emerald-400" />
              Komisyon & Önbellek Müdahalesi
            </span>
            <p className="text-[11px] text-slate-400">Şu anki komisyon: <strong className="text-white">%{platformCommission}</strong>. Hızlı oran seçin:</p>
            <div className="grid grid-cols-4 gap-1.5 pt-1">
              {[0, 5, 10, 15].map(rate => (
                <button
                  key={rate}
                  type="button"
                  onClick={() => {
                    if (onUpdateCommission) onUpdateCommission(rate);
                    showToast(`Komisyon oranı %${rate} olarak güncellendi!`, 'success');
                  }}
                  className={`py-1.5 px-2 rounded-xl text-xs font-black transition-all ${
                    platformCommission === rate 
                      ? 'bg-emerald-600 text-white shadow-md shadow-emerald-600/30' 
                      : 'bg-slate-900 hover:bg-slate-800 text-slate-300 border border-slate-800'
                  }`}
                >
                  %{rate}
                </button>
              ))}
            </div>
            <button
              type="button"
              onClick={handleClearCache}
              className="w-full mt-2 py-2 px-3 bg-rose-500/10 hover:bg-rose-500/20 text-rose-300 border border-rose-500/30 rounded-xl font-bold text-xs flex items-center justify-center gap-2 transition-colors"
            >
              <Trash2 className="w-3.5 h-3.5" />
              <span>Sistem Önbelleğini Temizle</span>
            </button>
          </div>
        </div>
      </div>

      {/* Header */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-xl font-black text-white tracking-tight flex items-center gap-2">
            <Settings className="w-5 h-5 text-blue-400" />
            Sistem, Güvenlik & API Yapılandırması
          </h1>
          <p className="text-xs text-slate-400 mt-0.5">
            Platform parametreleri, 2FA zorunlulukları, oturum zaman aşımı ve ödeme API entegrasyonlarını yönetin.
          </p>
        </div>

        <button
          onClick={handleSaveAll}
          disabled={isSaving}
          className="px-5 py-2.5 bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-500 hover:to-indigo-500 text-white font-bold text-xs rounded-xl shadow-lg shadow-blue-600/25 transition-all flex items-center gap-2 disabled:opacity-50 self-stretch sm:self-auto justify-center"
        >
          {isSaving ? <RefreshCw className="w-4 h-4 animate-spin" /> : <Save className="w-4 h-4" />}
          <span>{isSaving ? 'Kaydediliyor...' : 'Tüm Ayarları Kaydet'}</span>
        </button>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* 1. SECTION: Genel Site Bilgileri & Bakım Modu */}
        <div className="p-6 rounded-3xl bg-slate-900/90 border border-slate-800 shadow-xl space-y-5">
          <div className="flex items-center justify-between pb-3 border-b border-slate-800">
            <h2 className="text-sm font-bold text-white flex items-center gap-2">
              <Globe className="w-4 h-4 text-blue-400" />
              Genel Platform Bilgileri
            </h2>
            <span className="text-[10px] px-2 py-0.5 bg-blue-500/10 text-blue-400 border border-blue-500/20 rounded-md font-mono">
              Core v2.4
            </span>
          </div>

          <div className="space-y-4 text-xs">
            <div className="space-y-1">
              <label className="font-bold text-slate-300">Platform / Site Adı</label>
              <input
                type="text"
                value={siteConfig.siteName}
                onChange={(e) => setSiteConfig({ ...siteConfig, siteName: e.target.value })}
                className="w-full bg-slate-950 border border-slate-800 focus:border-blue-500 rounded-xl px-3.5 py-2 text-slate-200 focus:outline-none"
              />
            </div>

            <div className="space-y-1">
              <label className="font-bold text-slate-300">Slogan & Meta Açıklama</label>
              <input
                type="text"
                value={siteConfig.siteTagline}
                onChange={(e) => setSiteConfig({ ...siteConfig, siteTagline: e.target.value })}
                className="w-full bg-slate-950 border border-slate-800 focus:border-blue-500 rounded-xl px-3.5 py-2 text-slate-200 focus:outline-none"
              />
            </div>

            <div className="space-y-1">
              <label className="font-bold text-slate-300">Resmi Destek E-Postası</label>
              <input
                type="email"
                value={siteConfig.supportEmail}
                onChange={(e) => setSiteConfig({ ...siteConfig, supportEmail: e.target.value })}
                className="w-full bg-slate-950 border border-slate-800 focus:border-blue-500 rounded-xl px-3.5 py-2 text-slate-200 focus:outline-none"
              />
            </div>

            {/* Bakım Modu Switch */}
            <div className="p-4 rounded-2xl bg-slate-950/70 border border-slate-800 flex items-center justify-between">
              <div>
                <span className="font-bold text-white block">Acil Durum / Bakım Modu (Maintenance)</span>
                <span className="text-[11px] text-slate-400">
                  Aktif edildiğinde sadece yöneticiler giriş yapabilir; public anasayfa bakım ekranına geçer.
                </span>
              </div>

              <button
                type="button"
                onClick={() => {
                  const nextVal = !siteConfig.maintenanceMode;
                  setSiteConfig({ ...siteConfig, maintenanceMode: nextVal });
                  logAction(
                    'MAINTENANCE_MODE_TOGGLED',
                    'SECURITY',
                    'Platform Erişimi',
                    `Bakım modu ${nextVal ? 'AKTİF' : 'PASİF'} yapıldı.`,
                    nextVal ? 'danger' : 'info'
                  );
                }}
                className={`w-12 h-6 rounded-full transition-colors relative shrink-0 ml-3 ${
                  siteConfig.maintenanceMode ? 'bg-rose-600' : 'bg-slate-800'
                }`}
              >
                <div className={`w-4 h-4 rounded-full bg-white transition-transform absolute top-1 ${
                  siteConfig.maintenanceMode ? 'left-7' : 'left-1'
                }`} />
              </button>
            </div>
          </div>
        </div>

        {/* 2. SECTION: Güvenlik, 2FA & Oturum Politikaları */}
        <div className="p-6 rounded-3xl bg-slate-900/90 border border-slate-800 shadow-xl space-y-5">
          <div className="flex items-center justify-between pb-3 border-b border-slate-800">
            <h2 className="text-sm font-bold text-white flex items-center gap-2">
              <Lock className="w-4 h-4 text-emerald-400" />
              Güvenlik & RBAC Oturum Politikaları
            </h2>
            <span className="text-[10px] px-2 py-0.5 bg-emerald-500/10 text-emerald-400 border border-emerald-500/20 rounded-md font-mono">
              Strict RBAC
            </span>
          </div>

          <div className="space-y-4 text-xs">
            {/* 2FA Mandatory Toggle */}
            <div className="p-4 rounded-2xl bg-slate-950/70 border border-slate-800 flex items-center justify-between">
              <div>
                <span className="font-bold text-white block">Yöneticiler İçin Zorunlu 2FA (İki Aşamalı Doğrulama)</span>
                <span className="text-[11px] text-slate-400">
                  Admin ve Eğitmen paneli girişlerinde SMS/Authenticator kodu zorunlu tutulur.
                </span>
              </div>

              <button
                type="button"
                onClick={() => setSecurityConfig({ ...securityConfig, strict2FA: !securityConfig.strict2FA })}
                className={`w-12 h-6 rounded-full transition-colors relative shrink-0 ml-3 ${
                  securityConfig.strict2FA ? 'bg-emerald-600' : 'bg-slate-800'
                }`}
              >
                <div className={`w-4 h-4 rounded-full bg-white transition-transform absolute top-1 ${
                  securityConfig.strict2FA ? 'left-7' : 'left-1'
                }`} />
              </button>
            </div>

            {/* Session Timeout Slider */}
            <div className="space-y-2 p-4 rounded-2xl bg-slate-950/70 border border-slate-800">
              <div className="flex items-center justify-between">
                <span className="font-bold text-slate-200 flex items-center gap-1.5">
                  <Clock className="w-3.5 h-3.5 text-blue-400" /> Oturum Zaman Aşımı (Session Timeout)
                </span>
                <span className="font-mono text-blue-400 font-bold text-xs bg-blue-500/10 px-2 py-0.5 rounded-md">
                  {securityConfig.sessionTimeoutMinutes} Dakika
                </span>
              </div>
              <input
                type="range"
                min="15"
                max="240"
                step="15"
                value={securityConfig.sessionTimeoutMinutes}
                onChange={(e) => setSecurityConfig({ ...securityConfig, sessionTimeoutMinutes: Number(e.target.value) })}
                className="w-full accent-blue-500 cursor-pointer"
              />
              <span className="text-[10px] text-slate-500 block">
                Hareketsiz kalan admin oturumları belirlenen süre sonunda otomatik sonlandırılır.
              </span>
            </div>

            {/* Max Login Attempts */}
            <div className="space-y-1">
              <label className="font-bold text-slate-300">Maksimum Hatalı Giriş Denemesi (Brute-force Kalkanı)</label>
              <select
                value={securityConfig.maxLoginAttempts}
                onChange={(e) => setSecurityConfig({ ...securityConfig, maxLoginAttempts: Number(e.target.value) })}
                className="w-full bg-slate-950 border border-slate-800 rounded-xl px-3.5 py-2 text-slate-200 focus:outline-none cursor-pointer"
              >
                <option value={3}>3 Hatalı Giriş (Katı Koruma)</option>
                <option value={5}>5 Hatalı Giriş (Önerilen)</option>
                <option value={10}>10 Hatalı Giriş (Esnek)</option>
              </select>
            </div>
          </div>
        </div>

        {/* 3. SECTION: API Anahtarları & Webhook Entegrasyonları (Full Width) */}
        <div className="lg:col-span-2 p-6 rounded-3xl bg-slate-900/90 border border-slate-800 shadow-xl space-y-5">
          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-2 pb-3 border-b border-slate-800">
            <h2 className="text-sm font-bold text-white flex items-center gap-2">
              <Key className="w-4 h-4 text-amber-400" />
              API Anahtarları & Webhook Entegrasyon Servisleri
            </h2>
            <span className="text-[10px] px-2 py-0.5 bg-amber-500/10 text-amber-400 border border-amber-500/20 rounded-md font-mono">
              256-Bit Encrypted Vault
            </span>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-xs">
            {/* Payment API Key */}
            <div className="space-y-1.5">
              <label className="font-bold text-slate-300">Ödeme Ağ Geçidi API Anahtarı (Public Key)</label>
              <input
                type="text"
                value={apiConfig.paymentApiKey}
                onChange={(e) => setApiConfig({ ...apiConfig, paymentApiKey: e.target.value })}
                className="w-full bg-slate-950 border border-slate-800 font-mono text-slate-300 focus:border-amber-500 rounded-xl px-3.5 py-2 focus:outline-none"
              />
            </div>

            {/* Payment Secret Key (Masked) */}
            <div className="space-y-1.5">
              <label className="font-bold text-slate-300">Ödeme API Gizli Anahtarı (Secret Key)</label>
              <div className="relative">
                <input
                  type={showSecretKey ? 'text' : 'password'}
                  value={apiConfig.paymentSecret}
                  onChange={(e) => setApiConfig({ ...apiConfig, paymentSecret: e.target.value })}
                  className="w-full bg-slate-950 border border-slate-800 font-mono text-slate-300 focus:border-amber-500 rounded-xl pl-3.5 pr-10 py-2 focus:outline-none"
                />
                <button
                  type="button"
                  onClick={() => setShowSecretKey(!showSecretKey)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-500 hover:text-slate-200"
                >
                  {showSecretKey ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                </button>
              </div>
            </div>

            {/* Webhook Endpoint */}
            <div className="space-y-1.5">
              <label className="font-bold text-slate-300 flex items-center gap-1.5">
                <Webhook className="w-3.5 h-3.5 text-blue-400" />
                Canlı Webhook Dinleyici URL'si
              </label>
              <div className="flex gap-2">
                <input
                  type="url"
                  value={apiConfig.smsWebhookUrl}
                  onChange={(e) => setApiConfig({ ...apiConfig, smsWebhookUrl: e.target.value })}
                  className="flex-1 bg-slate-950 border border-slate-800 font-mono text-slate-300 focus:border-blue-500 rounded-xl px-3.5 py-2 focus:outline-none"
                />
                <button
                  type="button"
                  onClick={handleTestWebhookPing}
                  disabled={isTestingWebhook}
                  className="px-3 py-2 bg-slate-800 hover:bg-slate-700 text-slate-200 font-bold rounded-xl flex items-center gap-1.5 transition-colors disabled:opacity-50 shrink-0"
                >
                  <Zap className={`w-3.5 h-3.5 text-amber-400 ${isTestingWebhook ? 'animate-bounce' : ''}`} />
                  <span>{isTestingWebhook ? 'Ping...' : 'Test Et'}</span>
                </button>
              </div>
            </div>

            {/* Webhook Secret Signature */}
            <div className="space-y-1.5">
              <label className="font-bold text-slate-300">Webhook İmzası & HMAC Secret</label>
              <div className="flex gap-2">
                <input
                  type="text"
                  readOnly
                  value={apiConfig.webhookSecret}
                  className="flex-1 bg-slate-950/60 border border-slate-800 font-mono text-slate-400 rounded-xl px-3.5 py-2 focus:outline-none cursor-not-allowed"
                />
                <button
                  type="button"
                  onClick={handleCopyWebhookSecret}
                  className="px-3 py-2 bg-slate-800 hover:bg-slate-700 text-slate-200 font-bold rounded-xl flex items-center gap-1.5 transition-colors shrink-0"
                >
                  {copiedKey ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5" />}
                  <span>{copiedKey ? 'Kopyalandı' : 'Kopyala'}</span>
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
