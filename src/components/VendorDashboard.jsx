import React, { useState } from 'react';
import { Store, Plus, Package, DollarSign, TrendingUp, CheckCircle2, BookOpen } from 'lucide-react';

export default function VendorDashboard({ products, onAddProduct }) {
  const [name, setName] = useState('');
  const [category, setCategory] = useState('Kitap & Deneme');
  const [vendor, setVendor] = useState('Borsa Akademi Yayınları');
  const [price, setPrice] = useState('');
  const [description, setDescription] = useState('');
  const [image, setImage] = useState('https://images.unsplash.com/photo-1544716278-ca5e3f4abd8c?auto=format&fit=crop&q=80&w=500');

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!name || !price) return;

    onAddProduct({
      id: 'p_' + Date.now(),
      name,
      category,
      vendor,
      price: parseFloat(price),
      originalPrice: parseFloat(price) * 1.25,
      rating: 5.0,
      salesCount: 1,
      image,
      description,
      inStock: true,
      tag: 'Yeni Ürün'
    });

    setName('');
    setPrice('');
    setDescription('');
  };

  return (
    <div className="space-y-8 animate-fadeIn">
      
      {/* Publisher Header */}
      <div className="glass-panel p-6 sm:p-8 rounded-3xl border border-indigo-500/30 bg-gradient-to-r from-slate-900 via-indigo-950/40 to-slate-900 flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
        <div className="flex items-center space-x-4">
          <div className="w-16 h-16 rounded-2xl bg-indigo-600/30 text-indigo-400 flex items-center justify-center border border-indigo-500/40 shadow-lg">
            <Store className="w-8 h-8" />
          </div>
          <div>
            <span className="px-2.5 py-0.5 rounded-full bg-indigo-500/20 text-indigo-300 text-[11px] font-bold border border-indigo-500/30">
              Firma & Yayın Evi Paneli
            </span>
            <h1 className="text-2xl font-extrabold text-white mt-1">Özel Anlaşmalı Mağaza Yönetimi</h1>
            <p className="text-xs text-slate-300">
              Anlaşmalı yayın evleri, kırtasiyeler ve eğitim materyali sağlayıcıları için dijital satış ve stok takip paneli.
            </p>
          </div>
        </div>

        <div className="flex items-center gap-4 bg-slate-900/80 p-4 rounded-2xl border border-slate-800 text-xs">
          <div className="text-center px-3 border-r border-slate-800">
            <div className="text-slate-400">Aktif Ürün Sayısı</div>
            <div className="text-lg font-extrabold text-indigo-400">{products.length}</div>
          </div>
          <div className="text-center px-3">
            <div className="text-slate-400">Toplam Satış Hacmi</div>
            <div className="text-lg font-extrabold text-emerald-400">4,170 Adet</div>
          </div>
        </div>
      </div>

      {/* Add New Product Form & Catalog */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        
        {/* Form */}
        <div className="glass-panel p-6 rounded-3xl border border-slate-800 space-y-4 md:col-span-1">
          <h2 className="text-base font-bold text-white flex items-center gap-2">
            <Plus className="w-5 h-5 text-indigo-400" />
            <span>Yeni Ürün / Materyal Yükle</span>
          </h2>

          <form onSubmit={handleSubmit} className="space-y-3">
            <div>
              <label className="block text-xs font-semibold text-slate-300 mb-1">Ürün Adı</label>
              <input
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="Örn: 2026 LGS Tüm Dersler Denemesi"
                className="w-full glass-input rounded-xl px-3 py-2 text-xs text-white"
                required
              />
            </div>

            <div>
              <label className="block text-xs font-semibold text-slate-300 mb-1">Yayın Evi / Firma Adı</label>
              <input
                type="text"
                value={vendor}
                onChange={(e) => setVendor(e.target.value)}
                className="w-full glass-input rounded-xl px-3 py-2 text-xs text-white"
                required
              />
            </div>

            <div>
              <label className="block text-xs font-semibold text-slate-300 mb-1">Kategori</label>
              <select
                value={category}
                onChange={(e) => setCategory(e.target.value)}
                className="w-full glass-input rounded-xl px-3 py-2 text-xs text-white"
              >
                <option value="Kitap & Deneme" className="bg-slate-900">Kitap & Deneme</option>
                <option value="Deneme Sınavı" className="bg-slate-900">Deneme Sınavı</option>
                <option value="Dergi & Planlayıcı" className="bg-slate-900">Dergi & Planlayıcı</option>
              </select>
            </div>

            <div>
              <label className="block text-xs font-semibold text-slate-300 mb-1">Satış Fiyatı (₺)</label>
              <input
                type="number"
                value={price}
                onChange={(e) => setPrice(e.target.value)}
                placeholder="200"
                className="w-full glass-input rounded-xl px-3 py-2 text-xs text-white"
                required
              />
            </div>

            <div>
              <label className="block text-xs font-semibold text-slate-300 mb-1">Açıklama</label>
              <textarea
                rows={3}
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                placeholder="Ürün detayları..."
                className="w-full glass-input rounded-xl px-3 py-2 text-xs text-white"
              />
            </div>

            <button
              type="submit"
              className="w-full py-3 rounded-xl bg-indigo-600 hover:bg-indigo-500 text-white font-bold text-xs shadow-md"
            >
              Mağazada Satışa Çıkar
            </button>
          </form>
        </div>

        {/* Existing Vendor Catalog List */}
        <div className="glass-panel p-6 rounded-3xl border border-slate-800 space-y-4 md:col-span-2">
          <h2 className="text-base font-bold text-white flex items-center gap-2">
            <Package className="w-5 h-5 text-indigo-400" />
            <span>Mağazadaki Satışta Olan Ürünleriniz</span>
          </h2>

          <div className="space-y-3">
            {products.map((p) => (
              <div key={p.id} className="p-3.5 rounded-2xl bg-slate-900/60 border border-slate-800 flex items-center justify-between gap-4">
                <div className="flex items-center space-x-3">
                  <img src={p.image} alt={p.name} className="w-12 h-12 rounded-xl object-cover" />
                  <div>
                    <h4 className="text-xs font-bold text-white">{p.name}</h4>
                    <div className="text-[11px] text-slate-400">{p.vendor} • {p.category}</div>
                  </div>
                </div>
                <div className="text-right">
                  <span className="text-sm font-extrabold text-white">{p.price} ₺</span>
                  <span className="text-[10px] text-emerald-400 block font-semibold">● Satışta</span>
                </div>
              </div>
            ))}
          </div>
        </div>

      </div>

    </div>
  );
}
