import React, { useState } from 'react';
import { ShoppingCart, Star, Tag, Check, Filter, BookOpen, FileText, Bookmark, Eye, ShoppingBag, Search, Sparkles } from 'lucide-react';
import MasterclassModal from './MasterclassModal';
import BookPreviewModal from './BookPreviewModal';

export default function StoreSection({ products, onAddToCart }) {
  const [selectedCategory, setSelectedCategory] = useState('Tümü');
  const [addedItemIds, setAddedItemIds] = useState([]);
  const [previewProduct, setPreviewProduct] = useState(null);
  const [previewBookModalProduct, setPreviewBookModalProduct] = useState(null);
  const [searchQuery, setSearchQuery] = useState('');

  const categories = ['Tümü', 'Kitap & Deneme', 'Deneme Sınavı', 'Dergi & Planlayıcı'];

  const filteredProducts = products.filter(p => {
    const matchesCategory = selectedCategory === 'Tümü' || p.category === selectedCategory;
    const matchesSearch = searchQuery === '' || 
      p.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      p.vendor.toLowerCase().includes(searchQuery.toLowerCase()) ||
      p.description.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  const handleAdd = (product) => {
    onAddToCart(product);
    setAddedItemIds(prev => [...prev, product.id]);
    setTimeout(() => {
      setAddedItemIds(prev => prev.filter(id => id !== product.id));
    }, 1500);
  };

  return (
    <div className="space-y-6 my-8 select-none font-sans">
      
      {/* Store Header Banner */}
      <div className="glass-panel p-6 sm:p-8 rounded-3xl border border-indigo-500/20 bg-gradient-to-r from-slate-900 via-indigo-950/40 to-slate-900 flex flex-col md:flex-row items-start md:items-center justify-between gap-4 shadow-xl">
        <div>
          <div className="inline-flex items-center space-x-2 px-3 py-1 rounded-full bg-indigo-500/20 text-indigo-300 text-xs font-semibold mb-2 border border-indigo-500/30">
            <ShoppingBag className="w-3.5 h-3.5" />
            <span>Güvenilir Yayınevi Pazarı</span>
          </div>
          <h2 className="text-2xl sm:text-3xl font-black text-white tracking-tight">Soru Bankaları & Deneme Sınavları</h2>
          <p className="text-xs sm:text-sm text-slate-300 mt-1">
            Seçkin yayınevlerinin orijinal baskı kitapları, video çözümlü fasikülleri ve anında indirilebilir deneme setleri.
          </p>
        </div>

        {/* Search & Category Filters */}
        <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3 w-full md:w-auto">
          <div className="relative flex-1 min-w-[200px]">
            <Search className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Kitap veya yayınevi ara..."
              className="w-full bg-slate-950/80 border border-slate-800 focus:border-indigo-500 rounded-xl pl-9 pr-3 py-2 text-xs text-white placeholder-slate-500 focus:outline-none transition-all shadow-inner"
            />
          </div>

          <div className="flex flex-wrap items-center gap-1.5">
            {categories.map((cat) => (
              <button
                key={cat}
                onClick={() => setSelectedCategory(cat)}
                className={`px-3 py-2 rounded-xl text-xs font-bold transition-all ${
                  selectedCategory === cat
                    ? 'bg-indigo-600 text-white shadow-md shadow-indigo-500/30'
                    : 'bg-slate-900/80 border border-slate-800 text-slate-400 hover:text-white hover:bg-slate-800'
                }`}
              >
                {cat}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Products Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {filteredProducts.map((product) => {
          const isAdded = addedItemIds.includes(product.id);
          const hasPreview = product.samplePreview && product.samplePreview.hasPreview;

          return (
            <div key={product.id} className="glass-card rounded-3xl p-4 sm:p-5 flex flex-col justify-between group border border-slate-800 hover:border-indigo-500/40 bg-slate-900/80 shadow-xl transition-all">
              <div>
                {/* Product Image & Badges */}
                <div 
                  className="relative rounded-2xl overflow-hidden mb-3 aspect-[4/3] bg-slate-950 cursor-pointer border border-slate-800"
                  onClick={() => {
                    if (hasPreview) {
                      setPreviewBookModalProduct(product);
                    } else {
                      setPreviewProduct(product);
                    }
                  }}
                >
                  <img
                    src={product.image}
                    alt={product.name}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                  {product.tag && (
                    <span className="absolute top-2.5 left-2.5 px-2.5 py-1 rounded-xl bg-indigo-600/90 backdrop-blur-md text-white font-black text-[10px] uppercase shadow-md">
                      {product.tag}
                    </span>
                  )}
                  
                  {hasPreview && (
                    <span className="absolute top-2.5 right-2.5 px-2 py-0.5 rounded-lg bg-emerald-500 text-slate-950 font-black text-[9px] uppercase shadow-md flex items-center gap-1">
                      <Sparkles className="w-2.5 h-2.5" /> PDF Önizlemeli
                    </span>
                  )}

                  <div className="absolute inset-0 bg-slate-950/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                    <span className="px-3 py-1.5 rounded-xl bg-slate-900/90 text-white text-xs font-extrabold flex items-center gap-1.5 shadow-lg border border-slate-700">
                      <Eye className="w-3.5 h-3.5 text-indigo-400" />
                      <span>{hasPreview ? 'Kitabın İçine Bak' : 'İncele'}</span>
                    </span>
                  </div>
                </div>

                <div className="text-[11px] text-indigo-400 font-bold mb-1 flex items-center justify-between">
                  <span className="truncate max-w-[140px]">{product.vendor}</span>
                  <span className="flex items-center text-amber-400 font-extrabold">
                    <Star className="w-3 h-3 fill-amber-400 mr-0.5" />
                    {product.rating}
                  </span>
                </div>

                <h3 
                  className="text-xs sm:text-sm font-black text-white line-clamp-2 mb-2 leading-snug group-hover:text-indigo-300 transition-colors cursor-pointer"
                  onClick={() => {
                    if (hasPreview) {
                      setPreviewBookModalProduct(product);
                    } else {
                      setPreviewProduct(product);
                    }
                  }}
                >
                  {product.name}
                </h3>

                <p className="text-[11px] text-slate-400 line-clamp-2 mb-3 leading-relaxed font-medium">
                  {product.description}
                </p>

                {/* FEATURE 1: LOOK INSIDE BUTTON (Only if publisher added preview) */}
                {hasPreview ? (
                  <button
                    onClick={() => setPreviewBookModalProduct(product)}
                    className="w-full mb-3 py-2 px-3 rounded-xl bg-emerald-500/15 hover:bg-emerald-500/25 text-emerald-300 border border-emerald-500/40 text-[11px] font-black transition-all flex items-center justify-center gap-1.5 shadow-sm group/btn hover:scale-[1.01]"
                  >
                    <BookOpen className="w-3.5 h-3.5 text-emerald-400 group-hover/btn:scale-110 transition-transform" />
                    <span>📖 Kitabın İçine Bak (Örnek Sorular)</span>
                  </button>
                ) : (
                  <div className="mb-3 py-1.5 px-3 rounded-xl bg-slate-950/40 border border-slate-800 text-[10px] text-slate-500 font-semibold text-center">
                    🔒 Önizleme yakında yüklenecek
                  </div>
                )}
              </div>

              {/* Price & Add to Cart */}
              <div className="pt-3 border-t border-slate-800 flex items-center justify-between gap-2">
                <div>
                  <span className="text-[10px] text-slate-500 line-through block font-mono">
                    ₺{product.originalPrice}
                  </span>
                  <span className="text-sm sm:text-base font-black text-white font-mono">
                    ₺{product.price}
                  </span>
                </div>

                <button
                  onClick={() => handleAdd(product)}
                  className={`px-3 sm:px-4 py-2 rounded-xl text-xs font-extrabold transition-all flex items-center gap-1.5 shadow-md ${
                    isAdded
                      ? 'bg-emerald-600 text-white shadow-emerald-600/30'
                      : 'bg-indigo-600 hover:bg-indigo-500 text-white shadow-indigo-600/30 hover:scale-105'
                  }`}
                >
                  {isAdded ? (
                    <>
                      <Check className="w-4 h-4" />
                      <span>Eklendi</span>
                    </>
                  ) : (
                    <>
                      <ShoppingCart className="w-4 h-4" />
                      <span>Sepete Ekle</span>
                    </>
                  )}
                </button>
              </div>
            </div>
          );
        })}
      </div>

      {/* Standard Product Detail Modal */}
      <MasterclassModal
        isOpen={!!previewProduct}
        onClose={() => setPreviewProduct(null)}
        product={previewProduct}
        onAddToCart={onAddToCart}
      />

      {/* Interactive Look Inside Flipbook / PDF Modal */}
      <BookPreviewModal
        isOpen={!!previewBookModalProduct}
        onClose={() => setPreviewBookModalProduct(null)}
        product={previewBookModalProduct}
        onAddToCart={onAddToCart}
      />

    </div>
  );
}
