import React, { useState, useEffect } from 'react';
import { X, Trash2, ShoppingBag, CreditCard, ShieldCheck, CheckCircle2, ArrowRight, Tag, Plus, Minus, AlertCircle } from 'lucide-react';
import confetti from 'canvas-confetti';
import { createOrderApi } from '../services/api';

export default function CartDrawer({ isOpen, onClose, cartItems, onRemoveFromCart, onClearCart, onUpdateQuantity, onPurchaseSuccess }) {
  const [isCheckingOut, setIsCheckingOut] = useState(false);
  const [paymentSuccess, setPaymentSuccess] = useState(false);
  const [couponCode, setCouponCode] = useState('');
  const [discountAmount, setDiscountAmount] = useState(0);
  const [appliedCoupon, setAppliedCoupon] = useState('');
  const [validationError, setValidationError] = useState('');
  const [formData, setFormData] = useState({
    name: 'Ahmet Yılmaz',
    cardNumber: '4543 8812 9012 3456',
    expiry: '12/28',
    cvc: '341'
  });

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

  const rawTotal = cartItems.reduce((acc, item) => acc + (item.price * (item.quantity || 1)), 0);
  const totalPrice = Math.max(0, rawTotal - discountAmount);

  // Credit Card Masker
  const handleCardNumberChange = (e) => {
    let val = e.target.value.replace(/\D/g, '').substring(0, 16);
    let formatted = val.match(/.{1,4}/g)?.join(' ') || val;
    setFormData({ ...formData, cardNumber: formatted });
  };

  // Expiry Date Masker (MM/YY)
  const handleExpiryChange = (e) => {
    let val = e.target.value.replace(/\D/g, '').substring(0, 4);
    if (val.length >= 3) {
      val = val.substring(0, 2) + '/' + val.substring(2);
    }
    setFormData({ ...formData, expiry: val });
  };

  const handleApplyCoupon = (e) => {
    if (e) e.preventDefault();
    const code = couponCode.trim().toUpperCase();
    
    // Check dynamic coupons from localStorage
    let allCoupons = [];
    try {
      const saved = localStorage.getItem('odb_coupons');
      if (saved) allCoupons = JSON.parse(saved);
    } catch (err) {}

    const matched = allCoupons.find(c => c.code.toUpperCase() === code && c.isActive !== false);

    if (matched) {
      const disc = matched.discountType === 'percent'
        ? Math.round(rawTotal * (matched.discountValue / 100))
        : Math.min(rawTotal, matched.discountValue);
      setDiscountAmount(disc);
      setAppliedCoupon(`${matched.code} (${matched.discountType === 'percent' ? `%${matched.discountValue}` : `${matched.discountValue} ₺`} İndirim)`);
      confetti({ particleCount: 60, spread: 60 });
    } else if (code === 'BORSA2026' || code === 'KITAP30') {
      const disc = Math.round(rawTotal * 0.3);
      setDiscountAmount(disc);
      setAppliedCoupon(`${code} (%30 İndirim)`);
      confetti({ particleCount: 60, spread: 60 });
    } else if (code === 'BORSA200') {
      setDiscountAmount(Math.min(rawTotal, 200));
      setAppliedCoupon('BORSA200 (200 ₺ İndirim)');
      confetti({ particleCount: 60, spread: 60 });
    } else {
      alert('Geçersiz indirim kuponu! Örnek kodlar: KITAP30, BORSA200, YKS25');
    }
  };

  const handlePay = (e) => {
    e.preventDefault();
    setValidationError('');

    const cleanCard = formData.cardNumber.replace(/\s/g, '');
    if (cleanCard.length < 16) {
      setValidationError('Kart numarası 16 haneli olmalıdır.');
      return;
    }

    if (formData.cvc.length < 3) {
      setValidationError('CVC kodu 3 haneli olmalıdır.');
      return;
    }

    confetti({
      particleCount: 100,
      spread: 70,
      origin: { y: 0.6 }
    });

    createOrderApi({ items: cartItems, totalPrice, customer: formData.name });

    if (onPurchaseSuccess) {
      onPurchaseSuccess(cartItems);
    }
    setPaymentSuccess(true);
  };

  const handleFinish = () => {
    onClearCart();
    setPaymentSuccess(false);
    setIsCheckingOut(false);
    setDiscountAmount(0);
    setAppliedCoupon('');
    setValidationError('');
    onClose();
  };

  return (
    <div 
      onClick={onClose}
      className="fixed inset-0 z-50 overflow-hidden bg-slate-950/80 backdrop-blur-md animate-fadeIn"
    >
      <div className="absolute inset-y-0 right-0 max-w-full flex pl-0 sm:pl-10">
        <div 
          onClick={(e) => e.stopPropagation()}
          className="w-screen max-w-md glass-panel border-l border-slate-800 p-4 sm:p-6 flex flex-col justify-between shadow-2xl relative"
        >
          
          {/* Header */}
          <div className="flex items-center justify-between pb-4 border-b border-slate-800">
            <div className="flex items-center space-x-2">
              <div className="w-9 h-9 rounded-xl bg-indigo-600/30 text-indigo-400 flex items-center justify-center">
                <ShoppingBag className="w-5 h-5" />
              </div>
              <div>
                <h2 className="text-lg font-bold text-white">Alışveriş Sepetiniz</h2>
                <p className="text-xs text-slate-400">{cartItems.length} çeşit ürün eklendi</p>
              </div>
            </div>
            <button
              onClick={onClose}
              className="p-2 rounded-xl bg-slate-900 border border-slate-800 text-slate-400 hover:text-white"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Success Screen */}
          {paymentSuccess ? (
            <div className="flex-1 flex flex-col items-center justify-center text-center p-6 space-y-4">
              <div className="w-16 h-16 rounded-full bg-emerald-500/20 border-2 border-emerald-500 text-emerald-400 flex items-center justify-center animate-bounce">
                <CheckCircle2 className="w-8 h-8" />
              </div>
              <h3 className="text-xl font-bold text-white">Ödeme Başarıyla Tamamlandı!</h3>
              <p className="text-xs text-slate-300">
                Sipariş numaranız: <span className="text-indigo-400 font-mono font-bold">#BORS-2026-8891</span>. Dijital materyalleriniz Öğrenci Sayfanıza aktarıldı, kargolu ürünler için takip numarası SMS olarak gönderilmiştir.
              </p>

              <button
                onClick={handleFinish}
                className="w-full py-3 rounded-xl bg-indigo-600 hover:bg-indigo-500 text-white font-bold text-sm shadow-lg shadow-indigo-600/30"
              >
                Alışverişe Devam Et
              </button>
            </div>
          ) : isCheckingOut ? (
            /* Payment Checkout Form */
            <form onSubmit={handlePay} className="flex-1 py-6 space-y-4 overflow-y-auto custom-scrollbar">
              <div className="flex items-center justify-between mb-2">
                <h3 className="text-sm font-bold text-white flex items-center gap-1.5">
                  <CreditCard className="w-4 h-4 text-indigo-400" />
                  <span>Güvenli Kredi Kartı Ödemesi</span>
                </h3>
                <button
                  type="button"
                  onClick={() => setIsCheckingOut(false)}
                  className="text-xs text-indigo-400 hover:underline"
                >
                  Sepete Dön
                </button>
              </div>

              {validationError && (
                <div className="p-3 rounded-xl bg-rose-500/20 border border-rose-500/30 text-rose-300 text-xs font-bold flex items-center gap-2">
                  <AlertCircle className="w-4 h-4 shrink-0" />
                  <span>{validationError}</span>
                </div>
              )}

              <div>
                <label className="block text-xs font-semibold text-slate-300 mb-1">Kart Üzerindeki İsim</label>
                <input
                  type="text"
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  className="w-full glass-input rounded-xl px-3.5 py-2.5 text-xs text-white"
                  required
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-300 mb-1">Kart Numarası</label>
                <input
                  type="text"
                  value={formData.cardNumber}
                  onChange={handleCardNumberChange}
                  placeholder="xxxx xxxx xxxx xxxx"
                  className="w-full glass-input rounded-xl px-3.5 py-2.5 text-xs text-white font-mono"
                  required
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-semibold text-slate-300 mb-1">Son Kullanma (AA/YY)</label>
                  <input
                    type="text"
                    value={formData.expiry}
                    onChange={handleExpiryChange}
                    placeholder="AA/YY"
                    className="w-full glass-input rounded-xl px-3.5 py-2.5 text-xs text-white font-mono"
                    required
                  />
                </div>
                <div>
                  <label className="block text-xs font-semibold text-slate-300 mb-1">CVC / CVV</label>
                  <input
                    type="text"
                    maxLength={4}
                    value={formData.cvc}
                    onChange={(e) => setFormData({ ...formData, cvc: e.target.value.replace(/\D/g, '') })}
                    placeholder="123"
                    className="w-full glass-input rounded-xl px-3.5 py-2.5 text-xs text-white font-mono"
                    required
                  />
                </div>
              </div>

              <div className="p-3.5 rounded-xl bg-slate-900/80 border border-slate-800 text-xs text-slate-400 space-y-1">
                <div className="flex justify-between text-slate-300">
                  <span>Ara Toplam:</span>
                  <span>{rawTotal} ₺</span>
                </div>
                {discountAmount > 0 && (
                  <div className="flex justify-between text-emerald-400 font-semibold">
                    <span>Kupon İndirimi ({appliedCoupon}):</span>
                    <span>-{discountAmount} ₺</span>
                  </div>
                )}
                <div className="flex justify-between text-emerald-400">
                  <span>Kargo / Dijital Teslimat:</span>
                  <span>Ücretsiz</span>
                </div>
                <div className="flex justify-between text-sm font-bold text-white pt-2 border-t border-slate-800">
                  <span>Toplam Ödenecek Tutar:</span>
                  <span className="text-indigo-400">{totalPrice} ₺</span>
                </div>
              </div>

              <button
                type="submit"
                className="w-full py-3.5 rounded-xl bg-gradient-to-r from-emerald-600 to-teal-600 hover:from-emerald-500 hover:to-teal-500 text-white font-extrabold text-sm shadow-xl shadow-emerald-600/30 flex items-center justify-center gap-2"
              >
                <ShieldCheck className="w-5 h-5" />
                <span>{totalPrice} ₺ Ödemeyi Onayla</span>
              </button>
            </form>
          ) : (
            /* Cart Items List */
            <div className="flex-1 py-6 overflow-y-auto custom-scrollbar space-y-3">
              {cartItems.length === 0 ? (
                <div className="text-center py-12 text-slate-400">
                  <ShoppingBag className="w-12 h-12 mx-auto mb-3 text-slate-600" />
                  <p className="text-sm font-medium">Sepetinizde henüz ürün bulunmuyor.</p>
                  <p className="text-xs text-slate-500 mt-1">Satış Alanından kitap veya deneme ekleyebilirsiniz.</p>
                </div>
              ) : (
                <>
                  {cartItems.map((item) => (
                    <div key={item.id} className="p-3 rounded-xl bg-slate-900/60 border border-slate-800 flex items-center space-x-3">
                      <img src={item.image} alt={item.name} className="w-14 h-14 rounded-lg object-cover" />
                      <div className="flex-1 min-w-0">
                        <h4 className="text-xs font-bold text-white truncate">{item.name}</h4>
                        <div className="text-[11px] text-indigo-400 mt-0.5">{item.vendor}</div>
                        <div className="text-xs font-extrabold text-white mt-1">{item.price * (item.quantity || 1)} ₺</div>
                      </div>

                      {/* Quantity Controls */}
                      <div className="flex items-center space-x-1.5 bg-slate-950 px-2 py-1 rounded-lg border border-slate-800">
                        <button
                          onClick={() => onUpdateQuantity && onUpdateQuantity(item.id, (item.quantity || 1) - 1)}
                          className="text-slate-400 hover:text-white text-xs p-0.5"
                        >
                          <Minus className="w-3 h-3" />
                        </button>
                        <span className="text-xs font-bold text-white px-1">{item.quantity || 1}</span>
                        <button
                          onClick={() => onUpdateQuantity && onUpdateQuantity(item.id, (item.quantity || 1) + 1)}
                          className="text-slate-400 hover:text-white text-xs p-0.5"
                        >
                          <Plus className="w-3 h-3" />
                        </button>
                      </div>

                      <button
                        onClick={() => onRemoveFromCart(item.id)}
                        className="p-1.5 text-slate-500 hover:text-rose-400 transition-colors"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>
                  ))}

                  {/* Coupon Code Entry */}
                  <form onSubmit={handleApplyCoupon} className="pt-2 flex items-center gap-2">
                    <div className="relative flex-1">
                      <Tag className="w-3.5 h-3.5 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
                      <input
                        type="text"
                        value={couponCode}
                        onChange={(e) => setCouponCode(e.target.value)}
                        placeholder="İndirim Kodu (BORSA2026)"
                        className="w-full glass-input rounded-xl pl-8 pr-3 py-2 text-xs text-white"
                      />
                    </div>
                    <button
                      type="submit"
                      className="px-3.5 py-2 rounded-xl bg-slate-800 hover:bg-slate-700 text-indigo-300 text-xs font-bold border border-slate-700"
                    >
                      Uygula
                    </button>
                  </form>

                  {appliedCoupon && (
                    <div className="text-[11px] text-emerald-400 font-bold bg-emerald-500/10 p-2 rounded-lg border border-emerald-500/20">
                      ✓ Kupon Uygulandı: {appliedCoupon}
                    </div>
                  )}
                </>
              )}
            </div>
          )}

          {/* Footer Checkout Summary */}
          {!isCheckingOut && !paymentSuccess && cartItems.length > 0 && (
            <div className="pt-4 border-t border-slate-800 space-y-3">
              <div className="flex items-center justify-between text-sm">
                <span className="text-slate-400 font-medium">Toplam Tutar:</span>
                <span className="text-xl font-extrabold text-white">{totalPrice} <span className="text-xs text-indigo-400">₺</span></span>
              </div>
              <button
                onClick={() => setIsCheckingOut(true)}
                className="w-full py-3.5 rounded-xl bg-gradient-to-r from-indigo-600 to-violet-600 hover:from-indigo-500 hover:to-violet-500 text-white font-extrabold text-sm shadow-xl shadow-indigo-600/30 flex items-center justify-center gap-2"
              >
                <span>Ödeme Adımına Geç</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            </div>
          )}

        </div>
      </div>
    </div>
  );
}
