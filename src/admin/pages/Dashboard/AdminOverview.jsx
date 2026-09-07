import React, { useState } from 'react';
import { 
  Users, 
  Activity, 
  TrendingUp, 
  TrendingDown, 
  AlertCircle, 
  CreditCard, 
  ArrowUpRight, 
  ShieldCheck, 
  GraduationCap, 
  Sparkles, 
  Clock, 
  Layers, 
  Plus, 
  ExternalLink,
  ChevronRight,
  Sliders,
  CheckCircle2,
  FileSpreadsheet,
  RefreshCcw,
  BadgeAlert,
  Download,
  Trash2,
  Zap,
  Building2,
  Tag
} from 'lucide-react';
import { useAdminAuth } from '../../context/AdminAuthContext';

export default function AdminOverview({ 
  teachers = [], 
  products = [], 
  serviceRequests = [], 
  platformCommission = 12, 
  onUpdateCommission,
  onUpdateTeacher,
  coupons = [],
  onSwitchRole,
  onNavigateTab,
  showToast
}) {
  const { auditLogs, logAction, exportSystemBackup, clearSystemCache } = useAdminAuth();
  const [chartTimeframe, setChartTimeframe] = useState('7d'); // '7d', '30d', '90d'
  const [hoveredDataIndex, setHoveredDataIndex] = useState(null);

  // Dynamic calculated metrics
  const totalVerifiedTeachers = teachers.filter(t => t.verified).length;
  const totalPendingTeachers = teachers.filter(t => !t.verified).length;
  const totalSimulatedUsers = 12480 + teachers.length;
  const totalActiveLiveSessions = 342;
  const monthlyVolume = 482650;
  const pendingRequestsCount = serviceRequests.length + totalPendingTeachers;

  // 1. KPI Cards Data
  const kpiCards = [
    {
      id: 'users',
      title: 'Toplam Kullanıcı',
      value: totalSimulatedUsers.toLocaleString('tr-TR'),
      change: '+14.2%',
      isPositive: true,
      periodText: 'geçen aya göre',
      subText: '9,420 Öğrenci • 2,150 Veli • 910 Eğitmen',
      icon: Users,
      color: 'from-blue-500/20 to-indigo-500/20 text-blue-400 border-blue-500/30',
      actionTab: 'users'
    },
    {
      id: 'sessions',
      title: 'Aktif Canlı Oturumlar',
      value: totalActiveLiveSessions.toString(),
      change: '+8.4%',
      isPositive: true,
      periodText: 'anlık yoğunluk',
      subText: '118 Canlı Sınıf • 224 Etüt Odası',
      icon: Activity,
      color: 'from-emerald-500/20 to-teal-500/20 text-emerald-400 border-emerald-500/30',
      actionTab: 'security'
    },
    {
      id: 'volume',
      title: 'Aylık İşlem Hacmi (GMV)',
      value: `₺${monthlyVolume.toLocaleString('tr-TR')}`,
      change: '+21.8%',
      isPositive: true,
      periodText: 'geçen aya göre',
      subText: `Platform Geliri: ₺${Math.round(monthlyVolume * (platformCommission / 100)).toLocaleString('tr-TR')}`,
      icon: CreditCard,
      color: 'from-purple-500/20 to-pink-500/20 text-purple-400 border-purple-500/30',
      actionTab: 'finance'
    },
    {
      id: 'issues',
      title: 'Bekleyen Talep & Onaylar',
      value: pendingRequestsCount.toString(),
      change: '-3.1%',
      isPositive: true, // Lower pending issues is positive
      periodText: 'çözülme hızı',
      subText: `${totalPendingTeachers} Öğretmen Onayı • ${serviceRequests.length} Ders Talebi`,
      icon: AlertCircle,
      color: pendingRequestsCount > 0 ? 'from-amber-500/20 to-orange-500/20 text-amber-400 border-amber-500/30' : 'from-slate-800 to-slate-900 text-slate-400 border-slate-700',
      actionTab: 'teachers'
    }
  ];

  // 2. Chart Mock Data for 7D / 30D / 90D
  const revenueChartData = chartTimeframe === '7d' 
    ? [
        { label: 'Pzt', val: 42000, visits: 1200 },
        { label: 'Sal', val: 58000, visits: 1650 },
        { label: 'Çar', val: 51000, visits: 1480 },
        { label: 'Per', val: 67000, visits: 1920 },
        { label: 'Cum', val: 78000, visits: 2300 },
        { label: 'Cmt', val: 95000, visits: 3100 },
        { label: 'Paz', val: 91650, visits: 2950 }
      ]
    : [
        { label: 'Hafta 1', val: 98000, visits: 3400 },
        { label: 'Hafta 2', val: 124000, visits: 4100 },
        { label: 'Hafta 3', val: 112000, visits: 3800 },
        { label: 'Hafta 4', val: 148650, visits: 5200 }
      ];

  const maxVal = Math.max(...revenueChartData.map(d => d.val));

  // User Distribution Donut Segments
  const distributionData = [
    { label: 'Öğrenciler', count: 9420, percent: 75.5, color: '#3b82f6' },
    { label: 'Veliler', count: 2150, percent: 17.2, color: '#10b981' },
    { label: 'Eğitmenler', count: teachers.length || 850, percent: 6.8, color: '#8b5cf6' },
    { label: 'Yayıncılar', count: 60, percent: 0.5, color: '#f59e0b' }
  ];

  const handleQuickAction = (actionName, tabTarget) => {
    logAction('QUICK_ACTION_TRIGGERED', 'DASHBOARD', actionName, `Yönetici hızlı aksiyon tetikledi: ${actionName}`, 'info');
    if (onNavigateTab && tabTarget) onNavigateTab(tabTarget);
  };

  const handleBulkApprove = () => {
    const unverified = teachers.filter(t => !t.verified);
    if (unverified.length === 0) {
      if (showToast) showToast('Onay bekleyen eğitmen bulunamadı.', 'info');
      return;
    }
    unverified.forEach(t => {
      if (onUpdateTeacher) onUpdateTeacher(t.id, { verified: true });
    });
    logAction('BULK_TEACHER_APPROVAL', 'MODERATION', 'Tüm Eğitmenler', `${unverified.length} bekleyen eğitmen başvurusu tek tıkla onaylandı.`, 'success');
    if (showToast) showToast(`${unverified.length} eğitmen tek tıkla başarıyla onaylandı!`, 'success');
  };

  const handleClearCache = () => {
    if (clearSystemCache) clearSystemCache();
    if (showToast) showToast('Sistem log önbelleği ve geçici veriler temizlendi.', 'info');
  };

  const handleExportBackup = () => {
    if (exportSystemBackup) {
      const ok = exportSystemBackup();
      if (ok && showToast) showToast('Sistem veritabanı JSON yedeği başarıyla indirildi.', 'success');
    }
  };

  return (
    <div className="space-y-6">
      {/* 👑 ROOT SÜPER YÖNETİCİ KOMUTA & YETKİ KONSOLU */}
      <div className="p-5 rounded-3xl bg-gradient-to-r from-amber-950/50 via-slate-900 to-purple-950/50 border border-amber-500/40 shadow-2xl space-y-4">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-3 pb-3 border-b border-slate-800">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-2xl bg-amber-500/20 text-amber-400 border border-amber-500/30 flex items-center justify-center text-xl shrink-0 shadow-lg shadow-amber-500/10">
              👑
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h2 className="text-base font-black text-white tracking-tight">Root Süper Yönetici Komuta Masası</h2>
                <span className="px-2 py-0.5 rounded-full bg-amber-500/20 text-amber-300 border border-amber-500/40 text-[10px] font-black uppercase tracking-wider animate-pulse">
                  TAM YETKİLİ (GOD-MODE)
                </span>
              </div>
              <p className="text-xs text-slate-400">
                Sistem genelinde tüm kuponlara, satıcılara, kullanıcılara ve maliyet/komisyon oranlarına sınırsız müdahale yetkiniz bulunmaktadır.
              </p>
            </div>
          </div>

          <div className="flex items-center gap-2 self-start md:self-auto">
            <span className="text-[11px] font-mono text-emerald-400 bg-emerald-500/10 border border-emerald-500/20 px-2.5 py-1 rounded-xl flex items-center gap-1.5 font-bold">
              <span className="w-2 h-2 rounded-full bg-emerald-400 animate-ping inline-block" />
              RBAC Bypass: 100% Aktif
            </span>
          </div>
        </div>

        {/* Master Quick Power Actions */}
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-2.5 text-xs font-bold">
          <button
            onClick={handleBulkApprove}
            className="p-2.5 rounded-2xl bg-amber-500/10 hover:bg-amber-500/20 text-amber-300 border border-amber-500/30 flex flex-col items-center justify-center gap-1.5 text-center transition-all hover:scale-[1.02] active:scale-95"
            title="Bekleyen tüm öğretmenleri anında onayla"
          >
            <Zap className="w-4 h-4 text-amber-400" />
            <span className="text-[11px]">Tümünü Onayla ({totalPendingTeachers})</span>
          </button>

          <button
            onClick={() => onNavigateTab && onNavigateTab('coupons')}
            className="p-2.5 rounded-2xl bg-emerald-500/10 hover:bg-emerald-500/20 text-emerald-300 border border-emerald-500/30 flex flex-col items-center justify-center gap-1.5 text-center transition-all hover:scale-[1.02] active:scale-95"
            title="Kupon ve promosyonları yönet"
          >
            <Tag className="w-4 h-4 text-emerald-400" />
            <span className="text-[11px]">Kupon Masası ({coupons.length})</span>
          </button>

          <button
            onClick={() => onSwitchRole && onSwitchRole('student')}
            className="p-2.5 rounded-2xl bg-blue-500/10 hover:bg-blue-500/20 text-blue-300 border border-blue-500/30 flex flex-col items-center justify-center gap-1.5 text-center transition-all hover:scale-[1.02] active:scale-95"
            title="Öğrenci arayüzüne doğrudan geçiş"
          >
            <GraduationCap className="w-4 h-4 text-blue-400" />
            <span className="text-[11px]">Öğrenci Portalı</span>
          </button>

          <button
            onClick={() => onSwitchRole && onSwitchRole('vendor')}
            className="p-2.5 rounded-2xl bg-purple-500/10 hover:bg-purple-500/20 text-purple-300 border border-purple-500/30 flex flex-col items-center justify-center gap-1.5 text-center transition-all hover:scale-[1.02] active:scale-95"
            title="Yayınevi yönetim paneline doğrudan geçiş"
          >
            <Building2 className="w-4 h-4 text-purple-400" />
            <span className="text-[11px]">Yayınevi Portalı</span>
          </button>

          <button
            onClick={handleExportBackup}
            className="p-2.5 rounded-2xl bg-slate-800 hover:bg-slate-750 text-slate-200 border border-slate-700 flex flex-col items-center justify-center gap-1.5 text-center transition-all hover:scale-[1.02] active:scale-95"
            title="Tüm sistem yedeğini JSON olarak indir"
          >
            <Download className="w-4 h-4 text-indigo-400" />
            <span className="text-[11px]">Veritabanı Yedeği</span>
          </button>

          <button
            onClick={handleClearCache}
            className="p-2.5 rounded-2xl bg-slate-800 hover:bg-rose-500/20 text-slate-300 hover:text-rose-300 border border-slate-700 hover:border-rose-500/30 flex flex-col items-center justify-center gap-1.5 text-center transition-all hover:scale-[1.02] active:scale-95"
            title="Geçici logları ve önbelleği sıfırla"
          >
            <Trash2 className="w-4 h-4 text-slate-400 group-hover:text-rose-400" />
            <span className="text-[11px]">Önbelleği Temizle</span>
          </button>
        </div>
      </div>

      {/* 1. Header Banner */}
      <div className="p-6 rounded-3xl bg-gradient-to-r from-blue-950/70 via-slate-900 to-indigo-950/70 border border-blue-900/40 relative overflow-hidden flex flex-col md:flex-row items-start md:items-center justify-between gap-4 shadow-2xl">
        <div className="space-y-1 relative z-10">
          <div className="flex items-center gap-2">
            <span className="px-2.5 py-0.5 rounded-full bg-blue-500/20 text-blue-400 text-[10px] font-black uppercase tracking-wider border border-blue-500/30 flex items-center gap-1">
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-ping inline-block" />
              Sistem Durumu: Çevrimiçi & Stabil
            </span>
            <span className="text-xs text-slate-400 font-mono">v2.4.0-PRO</span>
          </div>
          <h1 className="text-2xl font-black text-white tracking-tight">
            Yönetim & Analitik Kontrol Merkezi
          </h1>
          <p className="text-xs text-slate-400 max-w-xl">
            Tüm platform akışı, öğrenci/öğretmen eşleşmeleri, hakediş komisyonları ve sistem logları gerçek zamanlı izleniyor.
          </p>
        </div>

        <div className="flex items-center gap-2.5 relative z-10">
          <button
            onClick={() => handleQuickAction('Öğretmen Onayları', 'teachers')}
            className="px-4 py-2.5 bg-blue-600 hover:bg-blue-500 text-white text-xs font-bold rounded-xl shadow-lg shadow-blue-600/25 transition-all flex items-center gap-2"
          >
            <GraduationCap className="w-4 h-4" />
            <span>Onay Kuyruğu ({totalPendingTeachers})</span>
          </button>
          <button
            onClick={() => handleQuickAction('Finans Raporu', 'finance')}
            className="px-3.5 py-2.5 bg-slate-800/80 hover:bg-slate-800 text-slate-200 hover:text-white border border-slate-700 rounded-xl text-xs font-bold transition-all flex items-center gap-2"
          >
            <CreditCard className="w-4 h-4 text-emerald-400" />
            <span>Finansal Özet</span>
          </button>
        </div>
      </div>

      {/* 2. 4 KPI Metrics Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {kpiCards.map((kpi) => {
          const Icon = kpi.icon;
          return (
            <div
              key={kpi.id}
              onClick={() => onNavigateTab && onNavigateTab(kpi.actionTab)}
              className="p-5 rounded-3xl bg-slate-900/90 border border-slate-800 hover:border-slate-700 transition-all cursor-pointer group relative overflow-hidden flex flex-col justify-between shadow-xl"
            >
              <div>
                <div className="flex items-center justify-between mb-3">
                  <div className={`p-2.5 rounded-2xl bg-gradient-to-br border ${kpi.color}`}>
                    <Icon className="w-5 h-5" />
                  </div>

                  {/* Percentage Change Badge */}
                  <span className={`text-[11px] font-bold px-2.5 py-1 rounded-xl flex items-center gap-1 ${
                    kpi.isPositive 
                      ? 'bg-emerald-500/10 text-emerald-400 border border-emerald-500/20' 
                      : 'bg-rose-500/10 text-rose-400 border border-rose-500/20'
                  }`}>
                    {kpi.isPositive ? <TrendingUp className="w-3.5 h-3.5" /> : <TrendingDown className="w-3.5 h-3.5" />}
                    {kpi.change}
                  </span>
                </div>

                <h3 className="text-xs font-semibold text-slate-400 uppercase tracking-wider">{kpi.title}</h3>
                <p className="text-2xl font-black text-white mt-1 group-hover:text-blue-400 transition-colors">
                  {kpi.value}
                </p>
              </div>

              <div className="mt-4 pt-3 border-t border-slate-800/80 flex items-center justify-between text-xs text-slate-400">
                <span className="truncate pr-1">{kpi.subText}</span>
                <ArrowUpRight className="w-3.5 h-3.5 opacity-0 group-hover:opacity-100 transition-opacity text-blue-400 shrink-0" />
              </div>
            </div>
          );
        })}
      </div>

      {/* 3. Analytics & Trend Visualizations (Area Chart + Donut Chart) */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Left: Revenue / Traffic Trend Chart (2 Columns) */}
        <div className="lg:col-span-2 p-6 rounded-3xl bg-slate-900/90 border border-slate-800 shadow-xl space-y-4 flex flex-col justify-between">
          <div>
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-4 border-b border-slate-800">
              <div>
                <h3 className="text-base font-bold text-white flex items-center gap-2">
                  <TrendingUp className="w-4 h-4 text-blue-400" />
                  Gelir & Trafik Hacmi Trendi
                </h3>
                <p className="text-xs text-slate-400 mt-0.5">Platform üzerinden gerçekleşen toplam ciro ve ziyaret grafiği</p>
              </div>

              {/* Timeframe Selector */}
              <div className="flex items-center gap-1 bg-slate-950 p-1 rounded-xl border border-slate-800 self-start sm:self-auto">
                {['7d', '30d'].map((tf) => (
                  <button
                    key={tf}
                    onClick={() => setChartTimeframe(tf)}
                    className={`px-3 py-1 rounded-lg text-xs font-bold transition-all ${
                      chartTimeframe === tf 
                        ? 'bg-blue-600 text-white shadow-md shadow-blue-600/20' 
                        : 'text-slate-400 hover:text-slate-200'
                    }`}
                  >
                    {tf === '7d' ? 'Son 7 Gün' : 'Son 30 Gün'}
                  </button>
                ))}
              </div>
            </div>

            {/* Custom Interactive SVG Area Chart */}
            <div className="mt-6 relative h-56 flex items-end gap-3 sm:gap-6 pt-6 pb-2 px-2">
              {revenueChartData.map((d, index) => {
                const heightPercent = Math.round((d.val / maxVal) * 100);
                const isHovered = hoveredDataIndex === index;

                return (
                  <div
                    key={index}
                    onMouseEnter={() => setHoveredDataIndex(index)}
                    onMouseLeave={() => setHoveredDataIndex(null)}
                    className="flex-1 flex flex-col items-center h-full justify-end group cursor-pointer relative"
                  >
                    {/* Floating Tooltip */}
                    {isHovered && (
                      <div className="absolute -top-12 bg-slate-950 border border-blue-500/50 rounded-xl px-3 py-1.5 shadow-2xl text-[11px] font-sans z-30 whitespace-nowrap text-center animate-in fade-in zoom-in-95">
                        <span className="font-extrabold text-white block">₺{d.val.toLocaleString('tr-TR')}</span>
                        <span className="text-[10px] text-blue-400 font-mono">{d.visits} Tekil Ziyaret</span>
                      </div>
                    )}

                    {/* Chart Bar / Column with Gradient */}
                    <div className="w-full max-w-[48px] bg-slate-950/60 rounded-2xl overflow-hidden p-1 flex flex-col justify-end h-full">
                      <div
                        style={{ height: `${heightPercent}%` }}
                        className={`w-full rounded-xl transition-all duration-500 ${
                          isHovered 
                            ? 'bg-gradient-to-t from-blue-600 via-indigo-500 to-cyan-400 shadow-lg shadow-blue-500/30' 
                            : 'bg-gradient-to-t from-blue-700/60 to-indigo-600/70 hover:from-blue-600 hover:to-indigo-500'
                        }`}
                      />
                    </div>

                    {/* X-Axis Label */}
                    <span className={`text-[11px] font-bold mt-2 transition-colors ${
                      isHovered ? 'text-blue-400' : 'text-slate-400'
                    }`}>
                      {d.label}
                    </span>
                  </div>
                );
              })}
            </div>
          </div>

          <div className="pt-3 border-t border-slate-800/80 flex items-center justify-between text-xs text-slate-400">
            <span className="flex items-center gap-1.5">
              <span className="w-2.5 h-2.5 rounded-full bg-blue-500 inline-block" /> Toplam Hacim
            </span>
            <span className="font-mono text-emerald-400 font-bold">
              Haftalık Ortalama: ₺{(revenueChartData.reduce((a, b) => a + b.val, 0) / revenueChartData.length).toFixed(0)}
            </span>
          </div>
        </div>

        {/* Right: User Role Distribution Donut Card (1 Column) */}
        <div className="p-6 rounded-3xl bg-slate-900/90 border border-slate-800 shadow-xl space-y-4 flex flex-col justify-between">
          <div>
            <div className="pb-3 border-b border-slate-800">
              <h3 className="text-base font-bold text-white flex items-center gap-2">
                <Users className="w-4 h-4 text-purple-400" />
                Kullanıcı Rol Dağılımı
              </h3>
              <p className="text-xs text-slate-400 mt-0.5">Sistemdeki üye kitle kompozisyonu</p>
            </div>

            {/* Simulated Donut Ring Visual */}
            <div className="my-6 flex items-center justify-center relative">
              <div className="w-36 h-36 rounded-full border-8 border-blue-600 border-t-purple-600 border-r-emerald-500 border-b-amber-500 flex items-center justify-center shadow-inner relative">
                <div className="text-center">
                  <span className="text-lg font-black text-white block leading-tight">12.4K</span>
                  <span className="text-[10px] text-slate-400 uppercase tracking-wider font-semibold">Toplam Üye</span>
                </div>
              </div>
            </div>

            {/* Distribution Legend List */}
            <div className="space-y-2.5">
              {distributionData.map((seg, idx) => (
                <div key={idx} className="flex items-center justify-between text-xs">
                  <div className="flex items-center gap-2">
                    <span 
                      className="w-2.5 h-2.5 rounded-full shrink-0" 
                      style={{ backgroundColor: seg.color }} 
                    />
                    <span className="text-slate-300 font-medium">{seg.label}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <span className="text-slate-400 font-mono text-[11px]">{seg.count.toLocaleString('tr-TR')}</span>
                    <span className="font-bold text-white w-10 text-right">%{seg.percent}</span>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="pt-3 border-t border-slate-800/80">
            <button
              onClick={() => onNavigateTab('users')}
              className="w-full py-2 bg-slate-950 hover:bg-slate-800 border border-slate-800 text-slate-300 hover:text-white rounded-xl text-xs font-bold transition-colors flex items-center justify-center gap-1.5"
            >
              Kullanıcı Tablosuna Git <ArrowUpRight className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>
      </div>

      {/* 4. Bottom Grid: Son Aktiviteler (Audit Stream) & Hızlı Aksiyonlar */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Left: Son 5 Sistem Logu / Aktivite (2 Columns) */}
        <div className="lg:col-span-2 p-6 rounded-3xl bg-slate-900/90 border border-slate-800 shadow-xl space-y-4">
          <div className="flex items-center justify-between pb-3 border-b border-slate-800">
            <div className="flex items-center gap-2">
              <Activity className="w-5 h-5 text-emerald-400" />
              <div>
                <h3 className="font-bold text-white text-base">Son Sistem Aktiviteleri & Loglar</h3>
                <p className="text-xs text-slate-400">Yöneticiler ve sistem tarafından gerçekleştirilen son 5 olay</p>
              </div>
            </div>
            <button
              onClick={() => onNavigateTab('security')}
              className="text-xs font-bold text-emerald-400 hover:text-emerald-300 flex items-center gap-1"
            >
              Tüm Loglar <ArrowUpRight className="w-3.5 h-3.5" />
            </button>
          </div>

          <div className="space-y-2.5">
            {auditLogs.slice(0, 5).map((log) => (
              <div
                key={log.id}
                className="p-3.5 rounded-2xl bg-slate-950/60 border border-slate-800/80 flex items-start justify-between gap-3 text-xs hover:border-slate-700 transition-colors"
              >
                <div className="flex items-start gap-3 min-w-0">
                  <div className={`p-2 rounded-xl mt-0.5 shrink-0 ${
                    log.severity === 'success' ? 'bg-emerald-500/10 text-emerald-400 border border-emerald-500/20' :
                    log.severity === 'warning' ? 'bg-amber-500/10 text-amber-400 border border-amber-500/20' :
                    'bg-blue-500/10 text-blue-400 border border-blue-500/20'
                  }`}>
                    <ShieldCheck className="w-4 h-4" />
                  </div>
                  <div className="min-w-0">
                    <div className="flex items-center gap-2 flex-wrap">
                      <span className="font-bold text-white">{log.action}</span>
                      <span className="px-2 py-0.5 rounded-md bg-slate-800 text-slate-300 font-mono text-[10px]">
                        {log.category}
                      </span>
                    </div>
                    <p className="text-slate-400 mt-1 text-[11px] line-clamp-1">{log.details}</p>
                    <span className="text-[10px] text-slate-500 font-medium">Hedef: {log.target}</span>
                  </div>
                </div>

                <div className="text-right shrink-0">
                  <span className="text-[10px] text-slate-400 font-mono block">{log.timestamp}</span>
                  <span className="text-[10px] text-slate-500 font-bold block">{log.adminName?.split(' ')[0]}</span>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Right: Hızlı Aksiyonlar Paneli (1 Column) */}
        <div className="p-6 rounded-3xl bg-slate-900/90 border border-slate-800 shadow-xl space-y-4">
          <div className="pb-3 border-b border-slate-800">
            <h3 className="font-bold text-white text-base flex items-center gap-2">
              <Sparkles className="w-4 h-4 text-amber-400" />
              Hızlı Yönetici Aksiyonları
            </h3>
            <p className="text-xs text-slate-400">Tek tıkla sık kullanılan yönetim görevleri</p>
          </div>

          <div className="space-y-2.5">
            <button
              onClick={() => handleQuickAction('Öğretmen Doğrula', 'teachers')}
              className="w-full p-3 bg-slate-950/80 hover:bg-slate-800 border border-slate-800 rounded-2xl flex items-center justify-between text-left transition-all group"
            >
              <div className="flex items-center gap-3">
                <div className="p-2 bg-amber-500/10 text-amber-400 rounded-xl border border-amber-500/20">
                  <GraduationCap className="w-4 h-4" />
                </div>
                <div>
                  <span className="text-xs font-bold text-white block group-hover:text-amber-400 transition-colors">Öğretmen Onay Kuyruğu</span>
                  <span className="text-[10px] text-slate-400">{totalPendingTeachers} Bekleyen Başvuru</span>
                </div>
              </div>
              <ChevronRight className="w-4 h-4 text-slate-500 group-hover:text-white transition-colors" />
            </button>

            <button
              onClick={() => handleQuickAction('Komisyon Ayarları', 'finance')}
              className="w-full p-3 bg-slate-950/80 hover:bg-slate-800 border border-slate-800 rounded-2xl flex items-center justify-between text-left transition-all group"
            >
              <div className="flex items-center gap-3">
                <div className="p-2 bg-emerald-500/10 text-emerald-400 rounded-xl border border-emerald-500/20">
                  <CreditCard className="w-4 h-4" />
                </div>
                <div>
                  <span className="text-xs font-bold text-white block group-hover:text-emerald-400 transition-colors">Komisyon Oranı Ayarla</span>
                  <span className="text-[10px] text-slate-400">Şu an: %{platformCommission}</span>
                </div>
              </div>
              <ChevronRight className="w-4 h-4 text-slate-500 group-hover:text-white transition-colors" />
            </button>

            <button
              onClick={() => handleQuickAction('Yeni Duyuru', 'settings')}
              className="w-full p-3 bg-slate-950/80 hover:bg-slate-800 border border-slate-800 rounded-2xl flex items-center justify-between text-left transition-all group"
            >
              <div className="flex items-center gap-3">
                <div className="p-2 bg-blue-500/10 text-blue-400 rounded-xl border border-blue-500/20">
                  <Plus className="w-4 h-4" />
                </div>
                <div>
                  <span className="text-xs font-bold text-white block group-hover:text-blue-400 transition-colors">Sistem Duyurusu Yayınla</span>
                  <span className="text-[10px] text-slate-400">Tüm Kullanıcılara Gönder</span>
                </div>
              </div>
              <ChevronRight className="w-4 h-4 text-slate-500 group-hover:text-white transition-colors" />
            </button>

            <button
              onClick={() => handleQuickAction('Kullanıcı Yönetimi', 'users')}
              className="w-full p-3 bg-slate-950/80 hover:bg-slate-800 border border-slate-800 rounded-2xl flex items-center justify-between text-left transition-all group"
            >
              <div className="flex items-center gap-3">
                <div className="p-2 bg-purple-500/10 text-purple-400 rounded-xl border border-purple-500/20">
                  <Users className="w-4 h-4" />
                </div>
                <div>
                  <span className="text-xs font-bold text-white block group-hover:text-purple-400 transition-colors">Hesap & Yetki Denetimi</span>
                  <span className="text-[10px] text-slate-400">Dondur / Rol Değiştir</span>
                </div>
              </div>
              <ChevronRight className="w-4 h-4 text-slate-500 group-hover:text-white transition-colors" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
