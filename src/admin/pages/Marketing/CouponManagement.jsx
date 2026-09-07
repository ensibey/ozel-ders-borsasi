import React, { useState } from 'react';
import { 
  Tag, 
  Plus, 
  Search, 
  Trash2, 
  Edit3, 
  CheckCircle2, 
  XCircle, 
  Copy, 
  Clock, 
  Scissors, 
  Percent, 
  DollarSign, 
  Flame, 
  X, 
  Save, 
  AlertCircle,
  TrendingUp,
  Sparkles,
  Store,
  ExternalLink
} from 'lucide-react';
import confetti from 'canvas-confetti';

/**
 * CouponManagement: Full Admin CRUD page for creating, managing,
 * activating/deactivating, and tracking discount promo codes & affiliate store redirects.
 */
export default function CouponManagement({ coupons = [], onAddCoupon, onUpdateCoupon, onDeleteCoupon, showToast }) {
  const [searchQuery, setSearchQuery] = useState('');
  const [statusFilter, setStatusFilter] = useState('all'); // 'all', 'active', 'passive'
  const [categoryFilter, setCategoryFilter] = useState('all');
  const [isCreateModalOpen, setIsCreateModalOpen] = useState(false);
  const [editingCoupon, setEditingCoupon] = useState(null);

  // Form State
  const [formData, setFormData] = useState({
    code: '',
    title: '',
    storeName: 'Özel Ders Borsası',
    storeUrl: '#showcase',
    discountType: 'percent', // 'percent' or 'fixed'
    discountValue: 20,
    category: 'lesson',
    categoryLabel: 'Özel Ders',
    minAmount: 400,
    expiresAt: '2026-11-30',
    daysLeft: 30,
    maxUsage: 500,
    description: '',
    isActive: true,
    featured: false,
    badge: '🔥 Fırsat'
  });

  const handleOpenCreate = () => {
    setEditingCoupon(null);
    setFormData({
      code: '',
      title: '',
      storeName: 'Özel Ders Borsası',
      storeUrl: '#showcase',
      discountType: 'percent',
      discountValue: 20,
      category: 'lesson',
      categoryLabel: 'Özel Ders',
      minAmount: 400,
      expiresAt: '2026-11-30',
      daysLeft: 30,
      maxUsage: 500,
      description: '',
      isActive: true,
      featured: false,
      badge: '🔥 Fırsat'
    });
    setIsCreateModalOpen(true);
  };

  const handleOpenEdit = (coup) => {
    setEditingCoupon(coup);
    setFormData({ 
      ...coup,
      storeName: coup.storeName || 'Özel Ders Borsası',
      storeUrl: coup.storeUrl || '#showcase'
    });
    setIsCreateModalOpen(true);
  };

  const handleSaveCoupon = (e) => {
    e.preventDefault();
    if (!formData.code || !formData.title || !formData.discountValue) {
      if (showToast) showToast('Lütfen tüm zorunlu alanları doldurunuz.', 'warning');
      return;
    }

    const cleanCode = formData.code.toUpperCase().replace(/\s+/g, '');

    if (editingCoupon) {
      const updated = {
        ...editingCoupon,
        ...formData,
        code: cleanCode
      };
      if (onUpdateCoupon) onUpdateCoupon(updated);
      if (showToast) showToast(`"${cleanCode}" kuponu başarıyla güncellendi.`, 'success');
    } else {
      const newCoupon = {
        id: `coup_${Date.now()}`,
        ...formData,
        code: cleanCode,
        usageCount: 0,
        daysLeft: Math.max(1, Math.round((new Date(formData.expiresAt) - new Date()) / (1000 * 60 * 60 * 24)))
      };
      if (onAddCoupon) onAddCoupon(newCoupon);
      confetti({ particleCount: 50, spread: 50 });
      if (showToast) showToast(`"${cleanCode}" kuponu yayına alındı!`, 'success');
    }

    setIsCreateModalOpen(false);
  };

  const handleToggleStatus = (coup) => {
    const updated = { ...coup, isActive: !coup.isActive };
    if (onUpdateCoupon) onUpdateCoupon(updated);
    if (showToast) showToast(`Kupon ${updated.isActive ? 'aktif edildi' : 'durduruldu'}.`, 'info');
  };

  const handleDelete = (coupId, coupCode) => {
    if (window.confirm(`"${coupCode}" kodlu kuponu silmek istediğinize emin misiniz?`)) {
      if (onDeleteCoupon) onDeleteCoupon(coupId);
      if (showToast) showToast(`"${coupCode}" kuponu silindi.`, 'info');
    }
  };

  // Filtering
  const filtered = coupons.filter(c => {
    const matchesSearch = c.code.toLowerCase().includes(searchQuery.toLowerCase()) || 
                          c.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
                          (c.storeName && c.storeName.toLowerCase().includes(searchQuery.toLowerCase()));
    const matchesStatus = statusFilter === 'all' || 
                          (statusFilter === 'active' && c.isActive !== false) || 
                          (statusFilter === 'passive' && c.isActive === false);
    const matchesCat = categoryFilter === 'all' || c.category === categoryFilter;
    return matchesSearch && matchesStatus && matchesCat;
  });

  const totalUsages = coupons.reduce((acc, c) => acc + (c.usageCount || 0), 0);
  const activeCount = coupons.filter(c => c.isActive !== false).length;

  return (
    <div className="space-y-6 select-none animate-fadeIn text-slate-100">
      
      {/* 1. Header & Actions */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2 text-xs font-mono text-emerald-400 font-bold uppercase tracking-wider mb-1">
            <Tag className="w-4 h-4" /> Pazarlama, Mağaza & Promosyon Yönetimi
          </div>
          <h1 className="text-2xl sm:text-3xl font-black text-white tracking-tight">
            Kupon & Mağaza İndirim Kodları
          </h1>
          <p className="text-xs text-slate-400">
            Anasayfada ve mağaza yönlendirmelerinde geçerli olan promosyon kodlarını, hedef mağaza linklerini ve indirim oranlarını belirleyin.
          </p>
        </div>

        <button
          onClick={handleOpenCreate}
          className="px-5 py-3 rounded-2xl bg-gradient-to-r from-emerald-600 to-teal-600 hover:from-emerald-500 hover:to-teal-500 text-white font-extrabold text-xs shadow-lg shadow-emerald-600/30 flex items-center justify-center gap-2 transition-transform hover:scale-105"
        >
          <Plus className="w-4 h-4" />
          <span>Yeni Kupon & Mağaza Tanımla</span>
        </button>
      </div>

      {/* 2. KPI Metrics Bar */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <div className="p-5 rounded-3xl bg-slate-900/90 border border-slate-800 space-y-2">
          <span className="text-[11px] font-bold text-slate-400">Toplam Tanımlı Kupon</span>
          <div className="text-2xl font-black text-white">{coupons.length} Adet</div>
          <span className="text-[10px] text-emerald-400 font-semibold">Tüm kampanyalar & mağazalar</span>
        </div>

        <div className="p-5 rounded-3xl bg-slate-900/90 border border-slate-800 space-y-2">
          <span className="text-[11px] font-bold text-slate-400">Aktif Canlı Kuponlar</span>
          <div className="text-2xl font-black text-emerald-400">{activeCount} Yayında</div>
          <span className="text-[10px] text-slate-400">Anasayfada listeleniyor</span>
        </div>

        <div className="p-5 rounded-3xl bg-slate-900/90 border border-slate-800 space-y-2">
          <span className="text-[11px] font-bold text-slate-400">Toplam Kupon Tıklanma / Alma</span>
          <div className="text-2xl font-black text-amber-400">{totalUsages} Kez</div>
          <span className="text-[10px] text-amber-400 font-semibold flex items-center gap-1">
            <TrendingUp className="w-3 h-3" /> Mağaza yönlendirmeleri
          </span>
        </div>

        <div className="p-5 rounded-3xl bg-slate-900/90 border border-slate-800 space-y-2">
          <span className="text-[11px] font-bold text-slate-400">Tahmini İndirim Katkısı</span>
          <div className="text-2xl font-black text-teal-400">₺{(totalUsages * 85).toLocaleString()}</div>
          <span className="text-[10px] text-slate-400">Öğrenci tasarrufu</span>
        </div>
      </div>

      {/* 3. Toolbar: Search & Filters */}
      <div className="p-4 rounded-2xl bg-slate-900/80 border border-slate-800 flex flex-col sm:flex-row items-center justify-between gap-3">
        <div className="relative w-full sm:w-80">
          <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Kupon, mağaza veya başlık ara..."
            className="w-full pl-10 pr-4 py-2 bg-slate-950 border border-slate-800 rounded-xl text-xs text-white placeholder-slate-500 focus:outline-none focus:border-emerald-500"
          />
        </div>

        <div className="flex items-center gap-2 w-full sm:w-auto overflow-x-auto">
          {/* Status Filter */}
          <select
            value={statusFilter}
            onChange={(e) => setStatusFilter(e.target.value)}
            className="px-3 py-2 bg-slate-950 border border-slate-800 rounded-xl text-xs text-slate-300 font-bold focus:outline-none cursor-pointer"
          >
            <option value="all">Durum: Tümü</option>
            <option value="active">Sadece Aktifler</option>
            <option value="passive">Durdurulanlar</option>
          </select>

          {/* Category Filter */}
          <select
            value={categoryFilter}
            onChange={(e) => setCategoryFilter(e.target.value)}
            className="px-3 py-2 bg-slate-950 border border-slate-800 rounded-xl text-xs text-slate-300 font-bold focus:outline-none cursor-pointer"
          >
            <option value="all">Kategori: Tümü</option>
            <option value="lesson">Özel Ders</option>
            <option value="store">Kitap & Deneme</option>
            <option value="tutor">Akredite Kadro</option>
          </select>
        </div>
      </div>

      {/* 4. Coupons Table */}
      <div className="rounded-3xl bg-slate-900/90 border border-slate-800 overflow-hidden shadow-xl">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs">
            <thead className="bg-slate-950/60 text-slate-400 font-bold uppercase tracking-wider border-b border-slate-800">
              <tr>
                <th className="p-4 pl-6">Kupon Kodu</th>
                <th className="p-4">Mağaza / Firma</th>
                <th className="p-4">Kampanya Başlığı</th>
                <th className="p-4">İndirim</th>
                <th className="p-4">Min. Tutar</th>
                <th className="p-4">Kullanım</th>
                <th className="p-4">Son Tarih</th>
                <th className="p-4">Durum</th>
                <th className="p-4 pr-6 text-right">İşlemler</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-800/60 font-medium">
              {filtered.map((coup) => {
                const discountText = coup.discountType === 'percent' ? `%${coup.discountValue}` : `${coup.discountValue} ₺`;
                const progressPct = Math.min(100, Math.round(((coup.usageCount || 0) / (coup.maxUsage || 100)) * 100));

                return (
                  <tr key={coup.id} className="hover:bg-slate-800/40 transition-colors">
                    
                    {/* Code Badge */}
                    <td className="p-4 pl-6">
                      <div className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-slate-950 border border-emerald-500/30 text-emerald-400 font-mono font-black tracking-wider text-xs shadow-inner">
                        <Scissors className="w-3.5 h-3.5 text-emerald-500 rotate-90" />
                        <span>{coup.code}</span>
                      </div>
                    </td>

                    {/* Store / Target Link */}
                    <td className="p-4">
                      <div className="font-bold text-white flex items-center gap-1.5">
                        <Store className="w-3.5 h-3.5 text-emerald-400" />
                        <span>{coup.storeName || 'Özel Ders Borsası'}</span>
                      </div>
                      {coup.storeUrl && !/^(javascript|data|vbscript):/i.test(coup.storeUrl) && (
                        <a 
                          href={coup.storeUrl.startsWith('http://') || coup.storeUrl.startsWith('https://') ? coup.storeUrl : '#'} 
                          target="_blank" 
                          rel="noopener noreferrer"
                          className="text-[10px] text-indigo-400 hover:underline flex items-center gap-1 mt-0.5"
                        >
                          <span>{coup.storeUrl}</span>
                          <ExternalLink className="w-2.5 h-2.5" />
                        </a>
                      )}
                    </td>

                    {/* Title & Category */}
                    <td className="p-4 max-w-xs">
                      <div className="font-extrabold text-white truncate">{coup.title}</div>
                      <div className="text-[10px] text-slate-400 flex items-center gap-1.5 mt-0.5">
                        <span className="text-emerald-400 font-semibold">{coup.categoryLabel || coup.category}</span>
                        {coup.badge && (
                          <span className="px-1.5 py-0.2 rounded bg-amber-500/20 text-amber-300 font-bold">
                            {coup.badge}
                          </span>
                        )}
                      </div>
                    </td>

                    {/* Discount */}
                    <td className="p-4 font-black text-emerald-400 text-sm">
                      {discountText}
                    </td>

                    {/* Min Amount */}
                    <td className="p-4 text-slate-300">
                      ₺{coup.minAmount || 0}
                    </td>

                    {/* Usage */}
                    <td className="p-4 min-w-[120px]">
                      <div className="flex items-center justify-between text-[10px] text-slate-400 mb-1">
                        <span>{coup.usageCount || 0} / {coup.maxUsage || 500}</span>
                        <span className="font-mono">{progressPct}%</span>
                      </div>
                      <div className="w-full h-1.5 rounded-full bg-slate-950 overflow-hidden">
                        <div className="h-full bg-emerald-500 rounded-full" style={{ width: `${progressPct}%` }} />
                      </div>
                    </td>

                    {/* Expiry */}
                    <td className="p-4 text-slate-300">
                      <div className="flex items-center gap-1">
                        <Clock className="w-3.5 h-3.5 text-slate-500" />
                        <span>{coup.expiresAt}</span>
                      </div>
                      <span className="text-[10px] text-slate-500">{coup.daysLeft || 10} gün kaldı</span>
                    </td>

                    {/* Active Switch */}
                    <td className="p-4">
                      <button
                        onClick={() => handleToggleStatus(coup)}
                        className={`px-2.5 py-1 rounded-full text-[10px] font-bold border transition-colors flex items-center gap-1 ${
                          coup.isActive !== false
                            ? 'bg-emerald-500/10 text-emerald-400 border-emerald-500/30 hover:bg-emerald-500/20'
                            : 'bg-rose-500/10 text-rose-400 border-rose-500/30 hover:bg-rose-500/20'
                        }`}
                      >
                        {coup.isActive !== false ? <CheckCircle2 className="w-3 h-3" /> : <XCircle className="w-3 h-3" />}
                        <span>{coup.isActive !== false ? 'Aktif' : 'Durduruldu'}</span>
                      </button>
                    </td>

                    {/* Actions */}
                    <td className="p-4 pr-6 text-right">
                      <div className="flex items-center justify-end gap-1.5">
                        <button
                          onClick={() => handleOpenEdit(coup)}
                          className="p-2 rounded-xl bg-slate-950 hover:bg-slate-800 text-slate-400 hover:text-white border border-slate-800 transition-colors"
                          title="Düzenle"
                        >
                          <Edit3 className="w-3.5 h-3.5" />
                        </button>

                        <button
                          onClick={() => handleDelete(coup.id, coup.code)}
                          className="p-2 rounded-xl bg-slate-950 hover:bg-rose-950 text-rose-400 border border-slate-800 hover:border-rose-800 transition-colors"
                          title="Sil"
                        >
                          <Trash2 className="w-3.5 h-3.5" />
                        </button>
                      </div>
                    </td>

                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>

      {/* 5. CREATE / EDIT COUPON MODAL */}
      {isCreateModalOpen && (
        <div 
          onClick={() => setIsCreateModalOpen(false)}
          className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/85 backdrop-blur-md animate-fadeIn"
        >
          <div 
            onClick={(e) => e.stopPropagation()}
            className="w-full max-w-lg rounded-3xl bg-slate-900 border border-slate-700 shadow-2xl p-6 sm:p-8 space-y-6 max-h-[90vh] overflow-y-auto custom-scrollbar"
          >
            {/* Modal Header */}
            <div className="flex items-center justify-between pb-4 border-b border-slate-800">
              <div className="flex items-center gap-2.5">
                <div className="w-10 h-10 rounded-2xl bg-emerald-500/10 text-emerald-400 border border-emerald-500/30 flex items-center justify-center">
                  <Tag className="w-5 h-5" />
                </div>
                <div>
                  <h3 className="text-base font-black text-white">
                    {editingCoupon ? 'Kupon & Mağazayı Düzenle' : 'Yeni Kupon & Mağaza Tanımla'}
                  </h3>
                  <p className="text-[11px] text-slate-400">Kupon ve hedef mağaza yönlendirme parametrelerini belirleyin.</p>
                </div>
              </div>

              <button 
                onClick={() => setIsCreateModalOpen(false)}
                className="p-2 rounded-xl bg-slate-800 text-slate-400 hover:text-white border border-slate-700"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            {/* Modal Form */}
            <form onSubmit={handleSaveCoupon} className="space-y-4">
              
              {/* Code & Badge */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-bold text-slate-300 mb-1">Kupon Kodu *</label>
                  <input
                    type="text"
                    value={formData.code}
                    onChange={(e) => setFormData({ ...formData, code: e.target.value.toUpperCase() })}
                    placeholder="Örn: YKS2026"
                    className="w-full px-3.5 py-2.5 bg-slate-950 border border-slate-800 rounded-xl text-xs font-mono font-bold text-emerald-400 focus:outline-none focus:border-emerald-500"
                    required
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold text-slate-300 mb-1">Vurgu Rozeti</label>
                  <input
                    type="text"
                    value={formData.badge}
                    onChange={(e) => setFormData({ ...formData, badge: e.target.value })}
                    placeholder="Örn: 🔥 En Popüler"
                    className="w-full px-3.5 py-2.5 bg-slate-950 border border-slate-800 rounded-xl text-xs text-white focus:outline-none focus:border-emerald-500"
                  />
                </div>
              </div>

              {/* Store Name & Store URL (Redirection) */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 p-3.5 rounded-2xl bg-slate-950/60 border border-slate-800">
                <div>
                  <label className="block text-xs font-bold text-emerald-400 mb-1 flex items-center gap-1">
                    <Store className="w-3.5 h-3.5" />
                    <span>Mağaza / Firma Adı *</span>
                  </label>
                  <input
                    type="text"
                    value={formData.storeName}
                    onChange={(e) => setFormData({ ...formData, storeName: e.target.value })}
                    placeholder="Örn: Trendyol / Borsa Akademi"
                    className="w-full px-3 py-2 bg-slate-950 border border-slate-700 rounded-xl text-xs text-white focus:outline-none focus:border-emerald-500 font-bold"
                    required
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold text-emerald-400 mb-1 flex items-center gap-1">
                    <ExternalLink className="w-3.5 h-3.5" />
                    <span>Mağaza Yönlendirme Linki *</span>
                  </label>
                  <input
                    type="text"
                    value={formData.storeUrl}
                    onChange={(e) => setFormData({ ...formData, storeUrl: e.target.value })}
                    placeholder="Örn: https://www.trendyol.com/... veya #showcase"
                    className="w-full px-3 py-2 bg-slate-950 border border-slate-700 rounded-xl text-xs text-white focus:outline-none focus:border-emerald-500 font-mono text-[11px]"
                    required
                  />
                </div>
              </div>

              {/* Title */}
              <div>
                <label className="block text-xs font-bold text-slate-300 mb-1">Kampanya Başlığı *</label>
                <input
                  type="text"
                  value={formData.title}
                  onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                  placeholder="Örn: İlk Özel Ders Seansında 200 ₺ İndirim!"
                  className="w-full px-3.5 py-2.5 bg-slate-950 border border-slate-800 rounded-xl text-xs text-white focus:outline-none focus:border-emerald-500"
                  required
                />
              </div>

              {/* Discount Type & Value */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-bold text-slate-300 mb-1">İndirim Türü</label>
                  <select
                    value={formData.discountType}
                    onChange={(e) => setFormData({ ...formData, discountType: e.target.value })}
                    className="w-full px-3.5 py-2.5 bg-slate-950 border border-slate-800 rounded-xl text-xs text-white focus:outline-none"
                  >
                    <option value="percent">Yüzdelik (%) İndirim</option>
                    <option value="fixed">Sabit TL (₺) İndirim</option>
                  </select>
                </div>

                <div>
                  <label className="block text-xs font-bold text-slate-300 mb-1">İndirim Miktarı *</label>
                  <input
                    type="number"
                    value={formData.discountValue}
                    onChange={(e) => setFormData({ ...formData, discountValue: Number(e.target.value) })}
                    placeholder={formData.discountType === 'percent' ? '25' : '200'}
                    className="w-full px-3.5 py-2.5 bg-slate-950 border border-slate-800 rounded-xl text-xs font-bold text-emerald-400 focus:outline-none"
                    required
                  />
                </div>
              </div>

              {/* Category & Min Amount */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-bold text-slate-300 mb-1">Kategori</label>
                  <select
                    value={formData.category}
                    onChange={(e) => {
                      const cat = e.target.value;
                      const labelMap = { lesson: 'Özel Ders', store: 'Kitap & Deneme', tutor: 'Akredite Kadro' };
                      setFormData({ ...formData, category: cat, categoryLabel: labelMap[cat] || 'Genel' });
                    }}
                    className="w-full px-3.5 py-2.5 bg-slate-950 border border-slate-800 rounded-xl text-xs text-white focus:outline-none"
                  >
                    <option value="lesson">Özel Ders Seansları</option>
                    <option value="store">Yayınevi Kitap & Denemeleri</option>
                    <option value="tutor">Akredite Eğitmenler</option>
                  </select>
                </div>

                <div>
                  <label className="block text-xs font-bold text-slate-300 mb-1">Min. Sepet Tutarı (₺)</label>
                  <input
                    type="number"
                    value={formData.minAmount}
                    onChange={(e) => setFormData({ ...formData, minAmount: Number(e.target.value) })}
                    className="w-full px-3.5 py-2.5 bg-slate-950 border border-slate-800 rounded-xl text-xs text-white focus:outline-none"
                  />
                </div>
              </div>

              {/* Expiry Date & Max Usage */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-bold text-slate-300 mb-1">Son Geçerlilik Tarihi</label>
                  <input
                    type="date"
                    value={formData.expiresAt}
                    onChange={(e) => setFormData({ ...formData, expiresAt: e.target.value })}
                    className="w-full px-3.5 py-2.5 bg-slate-950 border border-slate-800 rounded-xl text-xs text-white focus:outline-none"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold text-slate-300 mb-1">Toplam Kullanım Kotası</label>
                  <input
                    type="number"
                    value={formData.maxUsage}
                    onChange={(e) => setFormData({ ...formData, maxUsage: Number(e.target.value) })}
                    className="w-full px-3.5 py-2.5 bg-slate-950 border border-slate-800 rounded-xl text-xs text-white focus:outline-none"
                  />
                </div>
              </div>

              {/* Description */}
              <div>
                <label className="block text-xs font-bold text-slate-300 mb-1">Kampanya Açıklaması</label>
                <textarea
                  value={formData.description}
                  onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                  rows={2}
                  placeholder="Kuponun geçerlilik şartları ve mağaza avantajları..."
                  className="w-full px-3.5 py-2 bg-slate-950 border border-slate-800 rounded-xl text-xs text-white focus:outline-none"
                />
              </div>

              {/* Submit Buttons */}
              <div className="pt-3 border-t border-slate-800 flex items-center justify-end gap-2.5">
                <button
                  type="button"
                  onClick={() => setIsCreateModalOpen(false)}
                  className="px-4 py-2.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-300 text-xs font-bold"
                >
                  İptal
                </button>

                <button
                  type="submit"
                  className="px-5 py-2.5 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white font-extrabold text-xs shadow-lg shadow-emerald-600/30 flex items-center gap-1.5"
                >
                  <Save className="w-4 h-4" />
                  <span>{editingCoupon ? 'Değişiklikleri Kaydet' : 'Kuponu Yayınla'}</span>
                </button>
              </div>

            </form>

          </div>
        </div>
      )}

    </div>
  );
}
