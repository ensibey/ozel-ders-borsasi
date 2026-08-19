import React, { useState } from 'react';
import { ShoppingCart, Star, Tag, Check, Filter, BookOpen, FileText, Bookmark, Eye, ShoppingBag, Search } from 'lucide-react';
import MasterclassModal from './MasterclassModal';

export default function StoreSection({ products, onAddToCart }) {
  const [selectedCategory, setSelectedCategory] = useState('Tümü');
  const [addedItemIds, setAddedItemIds] = useState([]);
  const [previewProduct, setPreviewProduct] = useState(null);
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
    <div className="space-y-6 my-8">
      
      {/* Store Header Banner */}
      <div className="glass-panel p-6 sm:p-8 rounded-3xl border border-indigo-500/20 bg-gradient-to-r from-slate-900 via-indigo-950/40 to-slate-900 flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
        <div>
          <div className="inline-flex items-center space-x-2 px-3 py-1 rounded-full bg-indigo-500/20 text-indigo-300 text-xs font-semibold mb-2 border border-indigo-500/30">
            <ShoppingBag className="w-3.5 h-3.5" />
            <span>Özel Anlaşmalı Satış Alanı</span>
          </div>
          <h2 className="text-2xl sm:text-3xl font-extrabold text-white">Kitap, Dergi & Deneme Sınavı Pazarı</h2>
          <p className="text-xs sm:text-sm text-slate-300 mt-1">
            Yetkili yayın evleri ve bağımsız öğretmenlerin onaylı soru bankaları ve dijital materyalleri.
          </p>
        </div>

        {/* Search & Category Filters */}
        <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3 w-full md:w-auto">
          <div className="relative flex-1">
            <Search className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Kitap veya yayın evi ara..."
              className="w-full glass-input rounded-xl pl-9 pr-3 py-2 text-xs text-white"
            />
          </div>

          <div className="flex flex-wrap items-center gap-1.5">
            {categories.map((cat) => (
              <button
                key={cat}
                onClick={() => setSelectedCategory(cat)}
                className={`px-3 py-2 rounded-xl text-xs font-semibold transition-all ${
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
          return (
            <div key={product.id} className="glass-card rounded-2xl p-4 flex flex-col justify-between group">
              <div>
                {/* Product Image & Badge */}
                <div 
                  className="relative rounded-xl overflow-hidden mb-3 aspect-[4/3] bg-slate-900 cursor-pointer"
                  onClick={() => setPreviewProduct(product)}
                >
                  <img
                    src={product.image}
                    alt={product.name}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                  {product.tag && (
                    <span className="absolute top-2 left-2 px-2.5 py-1 rounded-lg bg-indigo-600/90 backdrop-blur-md text-white font-extrabold text-[10px] uppercase shadow-md">
                      {product.tag}
                    </span>
                  )}
                  <div className="absolute inset-0 bg-slate-950/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                    <span className="px-3 py-1.5 rounded-xl bg-slate-900/90 text-white text-xs font-bold flex items-center gap-1">
                      <Eye className="w-3.5 h-3.5 text-indigo-400" />
                      <span>İncele</span>
                    </span>
                  </div>
                </div>

                <div className="text-[11px] text-indigo-400 font-semibold mb-1 flex items-center justify-between">
                  <span>{product.vendor}</span>
                  <span className="flex items-center text-amber-400 font-bold">
                    <Star className="w-3 h-3 fill-amber-400 mr-0.5" />
                    {product.rating}
                  </span>
                </div>

                <h3 
                  className="text-sm font-bold text-white line-clamp-2 mb-2 leading-snug group-hover:text-indigo-300 transition-colors cursor-pointer"
                  onClick={() => setPreviewProduct(product)}
                >
                  {product.name}
                </h3>

                <p className="text-[11px] text-slate-400 line-clamp-2 mb-3">
                  {product.description}
                </p>
              </div>

              {/* Price & Add to Cart */}
              <div className="pt-3 border-t border-slate-800 flex items-center justify-between">
                <div>
                  <span className="text-[10px] text-slate-500 line-through block">
                    {product.originalPrice} ₺
                  </span>
                  <span className="text-base font-extrabold text-white">
                    {product.price} <span className="text-xs font-semibold text-indigo-400">₺</span>
                  </span>
                </div>

                <button
                  onClick={() => handleAdd(product)}
                  className={`px-3.5 py-2 rounded-xl text-xs font-bold transition-all flex items-center gap-1.5 shadow-md ${
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

      {/* Masterclass Preview Modal */}
      <MasterclassModal
        isOpen={!!previewProduct}
        onClose={() => setPreviewProduct(null)}
        product={previewProduct}
        onAddToCart={onAddToCart}
      />

    </div>
  );
}

function StoreIcon(props) {
  return (
    <svg {...props} fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 100 4 2 2 0 000-4z" />
    </svg>
  );
}
