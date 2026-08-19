import React, { useState } from 'react';
import { 
  ShieldCheck, 
  Layers, 
  Trash2, 
  CheckCircle2, 
  AlertCircle, 
  MessageSquare, 
  ShoppingBag,
  ExternalLink,
  Tag
} from 'lucide-react';
import { useAdminAuth } from '../../context/AdminAuthContext';

export default function ModerationPanel({ 
  serviceRequests = [], 
  onDeleteRequest,
  products = [],
  onUpdateProduct
}) {
  const { logAction } = useAdminAuth();
  const [activeSubTab, setActiveSubTab] = useState('requests'); // 'requests', 'products'

  const handleDeleteReq = (reqId, subject) => {
    if (window.confirm(`"${subject}" talebini platformdan kaldırmak istediğinize emin misiniz?`)) {
      if (onDeleteRequest) onDeleteRequest(reqId);
      logAction('CONTENT_DELETED', 'MODERATION', `Talep ID: ${reqId}`, `"${subject}" ilanı moderatör tarafından kaldırıldı.`, 'warning');
    }
  };

  const handleToggleProductStatus = (product) => {
    const nextStatus = product.status === 'inactive' ? 'active' : 'inactive';
    const updated = { ...product, status: nextStatus };
    if (onUpdateProduct) onUpdateProduct(updated);

    logAction('PRODUCT_MODERATED', 'MARKETPLACE', product.title, `Ürün yayın durumu "${nextStatus.toUpperCase()}" olarak güncellendi.`, 'info');
  };

  return (
    <div className="space-y-6">
      {/* Header & Sub-tabs */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <div>
          <h2 className="text-xl font-black text-white tracking-tight flex items-center gap-2">
            <ShieldCheck className="w-5 h-5 text-indigo-400" />
            İlan & İçerik Moderasyon Masası
          </h2>
          <p className="text-xs text-slate-400 mt-0.5">
            Canlı özel ders talepleri ve dijital kütüphane materyallerinin içerik denetimi.
          </p>
        </div>

        <div className="flex items-center gap-1.5 bg-slate-900/90 p-1.5 rounded-2xl border border-slate-800">
          <button
            onClick={() => setActiveSubTab('requests')}
            className={`px-3 py-1 rounded-xl text-xs font-bold transition-all ${
              activeSubTab === 'requests'
                ? 'bg-indigo-600 text-white shadow-md shadow-indigo-600/20'
                : 'text-slate-400 hover:text-slate-200'
            }`}
          >
            Ders Talepleri ({serviceRequests.length})
          </button>
          <button
            onClick={() => setActiveSubTab('products')}
            className={`px-3 py-1 rounded-xl text-xs font-bold transition-all ${
              activeSubTab === 'products'
                ? 'bg-indigo-600 text-white shadow-md shadow-indigo-600/20'
                : 'text-slate-400 hover:text-slate-200'
            }`}
          >
            Market & Materyaller ({products.length})
          </button>
        </div>
      </div>

      {/* Requests Section */}
      {activeSubTab === 'requests' && (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {serviceRequests.map((req) => (
            <div
              key={req.id}
              className="p-5 rounded-3xl bg-slate-900/90 border border-slate-800 flex flex-col justify-between shadow-xl space-y-4"
            >
              <div>
                <div className="flex items-start justify-between gap-2 mb-2">
                  <span className="px-2.5 py-0.5 rounded-full text-[10px] font-bold bg-blue-500/10 text-blue-400 border border-blue-500/20">
                    {req.level || 'Lise / YKS'}
                  </span>
                  <span className="text-[11px] font-mono text-slate-400">{req.createdAt || 'Yeni'}</span>
                </div>

                <h3 className="font-bold text-white text-base">{req.subject}</h3>
                <p className="text-xs text-slate-400 mt-1 line-clamp-2">{req.description}</p>

                <div className="mt-4 p-3 rounded-2xl bg-slate-950/60 border border-slate-800/80 flex items-center justify-between text-xs">
                  <div>
                    <span className="text-slate-500 block text-[10px]">Talep Sahibi</span>
                    <span className="font-bold text-slate-200">{req.studentName || 'Öğrenci'}</span>
                  </div>
                  <div>
                    <span className="text-slate-500 block text-[10px]">Bütçe Aralığı</span>
                    <span className="font-bold text-emerald-400">{req.budgetRange || '500-800 ₺'}</span>
                  </div>
                  <div>
                    <span className="text-slate-500 block text-[10px]">Gelen Teklif</span>
                    <span className="font-bold text-indigo-400">{req.bids?.length || 0} Eğitmen</span>
                  </div>
                </div>
              </div>

              <div className="flex items-center justify-between pt-2 border-t border-slate-800">
                <span className="text-xs text-slate-500 flex items-center gap-1">
                  <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400" /> Otomatik Filtreden Geçti
                </span>

                <button
                  onClick={() => handleDeleteReq(req.id, req.subject)}
                  className="px-3 py-1.5 bg-rose-500/10 hover:bg-rose-500/20 text-rose-400 border border-rose-500/20 rounded-xl text-xs font-bold transition-colors flex items-center gap-1.5"
                >
                  <Trash2 className="w-3.5 h-3.5" /> İlanı Kaldır
                </button>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Products / Store Materials Section */}
      {activeSubTab === 'products' && (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {products.map((prod) => (
            <div
              key={prod.id}
              className="p-5 rounded-3xl bg-slate-900/90 border border-slate-800 flex flex-col justify-between shadow-xl space-y-4"
            >
              <div>
                <div className="flex items-center gap-3 mb-3">
                  <img src={prod.coverImage || 'https://images.unsplash.com/photo-1497633762265-9d179a990aa6?w=120&auto=format&fit=crop&q=80'} alt={prod.title} className="w-12 h-12 rounded-xl object-cover ring-1 ring-slate-700" />
                  <div>
                    <h3 className="font-bold text-white text-sm line-clamp-1">{prod.title}</h3>
                    <p className="text-xs text-indigo-400 font-semibold">{prod.category || 'YKS Deneme'}</p>
                  </div>
                </div>

                <div className="p-3 bg-slate-950/60 rounded-2xl border border-slate-800/80 space-y-1 text-xs">
                  <div className="flex justify-between">
                    <span className="text-slate-500">Fiyat:</span>
                    <span className="font-bold text-emerald-400">₺{prod.price}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-slate-500">Yazar / Kurum:</span>
                    <span className="font-semibold text-slate-300">{prod.author || 'Eğitim Vadisi'}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-slate-500">Toplam Satış:</span>
                    <span className="font-semibold text-blue-400">{prod.salesCount || 0} Adet</span>
                  </div>
                </div>
              </div>

              <div className="pt-2 border-t border-slate-800 flex items-center justify-between">
                <span className={`text-[11px] font-bold ${prod.status === 'inactive' ? 'text-amber-400' : 'text-emerald-400'}`}>
                  {prod.status === 'inactive' ? '• Yayında Değil' : '• Satışta'}
                </span>

                <button
                  onClick={() => handleToggleProductStatus(prod)}
                  className={`px-3 py-1.5 rounded-xl text-xs font-bold transition-all ${
                    prod.status === 'inactive'
                      ? 'bg-emerald-600 text-white'
                      : 'bg-slate-800 text-slate-300 hover:text-white'
                  }`}
                >
                  {prod.status === 'inactive' ? 'Yayına Al' : 'Askıya Al'}
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
