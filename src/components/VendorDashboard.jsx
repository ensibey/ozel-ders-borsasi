import React, { useState, useMemo } from 'react';
import { 
  Store, 
  Plus, 
  Package, 
  DollarSign, 
  TrendingUp, 
  CheckCircle2, 
  BookOpen, 
  FileSpreadsheet, 
  Download, 
  Upload, 
  Tag, 
  Zap, 
  Clock, 
  Calendar, 
  Search, 
  Filter, 
  Trash2, 
  Edit3, 
  Percent, 
  Flame, 
  AlertCircle, 
  Check, 
  X, 
  Layers,
  ArrowUpRight,
  Sparkles
} from 'lucide-react';

export default function VendorDashboard({ products = [], onAddProduct, onDeleteProduct }) {
  // Form State for Single Product
  const [name, setName] = useState('');
  const [category, setCategory] = useState('Kitap & Deneme');
  const [vendor, setVendor] = useState('Borsa Akademi Yayınları');
  const [price, setPrice] = useState('');
  const [description, setDescription] = useState('');
  const [image, setImage] = useState('https://images.unsplash.com/photo-1544716278-ca5e3f4abd8c?auto=format&fit=crop&q=80&w=500');
  const [hasLookInside, setHasLookInside] = useState(true);
  const [previewTopic, setPreviewTopic] = useState('Örnek Bölüm 1: Çıkmış Soru Analizi');

  // Timeframe for Analytics Chart
  const [timeframe, setTimeframe] = useState('weekly'); // 'weekly' or 'monthly'

  // CSV Import Modal State
  const [isCsvModalOpen, setIsCsvModalOpen] = useState(false);
  const [csvText, setCsvText] = useState('');
  const [parsedCsvItems, setParsedCsvItems] = useState([]);
  const [csvImportSuccess, setCsvImportSuccess] = useState(false);

  // Campaign Creator State
  const [isCampaignModalOpen, setIsCampaignModalOpen] = useState(false);
  const [campaignName, setCampaignName] = useState('');
  const [campaignType, setCampaignType] = useState('percent_discount'); // 'percent_discount', 'buy2get1', 'free_shipping'
  const [discountRate, setDiscountRate] = useState(25);
  const [campaignDuration, setCampaignDuration] = useState('48'); // hours
  const [activeCampaigns, setActiveCampaigns] = useState([
    {
      id: 'cmp_1',
      title: 'Hafta Sonu YKS Özel Flaş İndirimi',
      type: 'percent_discount',
      discount: '%25 İndirim',
      hoursLeft: 36,
      status: 'active',
      appliedItems: 'Tüm Soru Bankaları'
    },
    {
      id: 'cmp_2',
      title: 'LGS Denemeleri 2 Al 1 Öde',
      type: 'buy2get1',
      discount: '2 Al 1 Öde',
      hoursLeft: 18,
      status: 'active',
      appliedItems: 'Branş Denemeleri'
    }
  ]);

  // Product Catalog Search & Filter
  const [productSearch, setProductSearch] = useState('');
  const [selectedCatFilter, setSelectedCatFilter] = useState('all');

  // Chart Data Mock
  const weeklyData = [
    { label: 'Pzt', revenue: 14200, orders: 42 },
    { label: 'Sal', revenue: 18500, orders: 58 },
    { label: 'Çar', revenue: 16800, orders: 51 },
    { label: 'Per', revenue: 22400, orders: 74 },
    { label: 'Cum', revenue: 28900, orders: 92 },
    { label: 'Cmt', revenue: 34500, orders: 115 },
    { label: 'Paz', revenue: 31200, orders: 104 }
  ];

  const monthlyData = [
    { label: '1. Hafta', revenue: 78000, orders: 260 },
    { label: '2. Hafta', revenue: 92400, orders: 310 },
    { label: '3. Hafta', revenue: 114500, orders: 395 },
    { label: '4. Hafta', revenue: 138000, orders: 480 }
  ];

  const activeChartData = timeframe === 'weekly' ? weeklyData : monthlyData;
  const maxRevenue = Math.max(...activeChartData.map(d => d.revenue));
  const totalPeriodRevenue = activeChartData.reduce((acc, curr) => acc + curr.revenue, 0);
  const totalPeriodOrders = activeChartData.reduce((acc, curr) => acc + curr.orders, 0);

  // Handle Single Product Submission
  const handleSubmit = (e) => {
    e.preventDefault();
    if (!name || !price) return;

    const samplePreview = hasLookInside ? {
      hasPreview: true,
      totalPages: 3,
      topic: previewTopic || 'Örnek Bölüm 1: Soru Çözümleri',
      difficulty: 'ÖSYM Düzeyi (%100 Yeni Nesil)',
      videoTeacher: vendor || 'Yayınevi Eğitmeni',
      pages: [
        {
          pageNumber: 1,
          type: 'cover_index',
          title: 'İçindekiler & Soru Dağılımı',
          subtitle: 'ÖSYM Çıkmış Soru Kazanım Tablosu',
          content: [
            '1. Bölüm: Temel Kavramlar & Hızlı Taktikler',
            '2. Bölüm: Yeni Nesil Beceri Temelli Sorular',
            '3. Bölüm: Deneme Sınavı & Video Çözümler'
          ]
        },
        {
          pageNumber: 2,
          type: 'question_sample',
          title: 'Örnek Soru 1: Yeni Nesil Modelleme Problemi',
          subtitle: 'ÖSYM Benzeri Çözümlü Soru',
          questionText: `${name} kaynağından seçilen bu örnek soru, sınav formatındaki analiz ve modelleme tekniklerini içerir.`,
          options: ['A) 12', 'B) 18', 'C) 24', 'D) 30', 'E) 36'],
          correctAnswer: 'C',
          explanation: 'Kazanım formülü ve grafik yorumu uygulandığında doğru cevaba doğrudan ulaşılır.',
          hasVideoSolution: true
        },
        {
          pageNumber: 3,
          type: 'summary_page',
          title: 'Yayınevi Orijinal Baskı & Çözüm Desteği',
          subtitle: 'Set Ayrıcalıkları',
          content: [
            '✓ Akıllı Tahta Uyumlu',
            '✓ Video Çözüm Desteği',
            '✓ Hızlı Kargo'
          ]
        }
      ]
    } : undefined;

    if (onAddProduct) {
      onAddProduct({
        id: 'p_' + Date.now(),
        name,
        category,
        vendor: vendor || 'Borsa Akademi Yayınları',
        price: parseFloat(price),
        originalPrice: parseFloat(price) * 1.25,
        rating: 5.0,
        salesCount: 1,
        image: image || 'https://images.unsplash.com/photo-1544716278-ca5e3f4abd8c?auto=format&fit=crop&q=80&w=500',
        description: description || 'Orijinal Yayınevi Baskısı Ürün.',
        inStock: true,
        tag: 'Yeni Ürün',
        samplePreview
      });
    }

    setName('');
    setPrice('');
    setDescription('');
  };

  // CSV Parsing Logic
  const handleParseCsv = (rawText) => {
    setCsvText(rawText);
    if (!rawText.trim()) {
      setParsedCsvItems([]);
      return;
    }

    const lines = rawText.trim().split('\n');
    const items = [];

    lines.forEach((line, idx) => {
      // Ignore header if it contains 'Ürün Adı' or 'Name'
      if (idx === 0 && (line.toLowerCase().includes('isim') || line.toLowerCase().includes('ad') || line.toLowerCase().includes('name'))) {
        return;
      }
      const parts = line.split(',').map(s => s.trim().replace(/^"|"$/g, ''));
      if (parts.length >= 3) {
        items.push({
          id: 'csv_p_' + Date.now() + '_' + idx,
          name: parts[0],
          category: parts[1] || 'Kitap & Deneme',
          price: parseFloat(parts[2]) || 150,
          vendor: parts[3] || vendor,
          description: parts[4] || 'Toplu içe aktarılan yayınevi yayını.'
        });
      }
    });

    setParsedCsvItems(items);
  };

  // Import Parsed CSV to Store
  const handleConfirmCsvImport = () => {
    if (parsedCsvItems.length === 0) return;
    
    parsedCsvItems.forEach(item => {
      if (onAddProduct) {
        onAddProduct({
          id: item.id,
          name: item.name,
          category: item.category,
          vendor: item.vendor,
          price: item.price,
          originalPrice: item.price * 1.25,
          rating: 5.0,
          salesCount: 0,
          image: 'https://images.unsplash.com/photo-1544716278-ca5e3f4abd8c?auto=format&fit=crop&q=80&w=500',
          description: item.description,
          inStock: true,
          tag: 'Yayınevi Seçimi'
        });
      }
    });

    setCsvImportSuccess(true);
    setTimeout(() => {
      setCsvImportSuccess(false);
      setIsCsvModalOpen(false);
      setCsvText('');
      setParsedCsvItems([]);
    }, 1500);
  };

  // Sample CSV Template Downloader
  const handleDownloadSampleCsv = () => {
    const csvContent = "Ürün Adı,Kategori,Satış Fiyatı,Yayınevi,Açıklama\n" +
      "2026 TYT Matematik Soru Bankası,Kitap & Deneme,220,Borsa Akademi,Yeni Nesil ÖSYM Uyumlu Çözümlü\n" +
      "2026 AYT Fizik 10'lu Branş Denemesi,Deneme Sınavı,160,Borsa Akademi,Video Çözümlü Fasikül Seti\n" +
      "2026 LGS Tüm Dersler VIP Soru Bankası,Kitap & Deneme,290,Borsa Akademi,Beceri Temelli Sorular";

    const blob = new Blob(["\uFEFF" + csvContent], { type: 'text/csv;charset=utf-8;' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.setAttribute("href", url);
    link.setAttribute("download", `ornek_yayin_yukleme_sablonu.csv`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  // Create Campaign
  const handleCreateCampaign = (e) => {
    e.preventDefault();
    if (!campaignName) return;

    const newCamp = {
      id: 'cmp_' + Date.now(),
      title: campaignName,
      type: campaignType,
      discount: campaignType === 'percent_discount' ? `%${discountRate} İndirim` : (campaignType === 'buy2get1' ? '2 Al 1 Öde' : 'Ücretsiz Kargo'),
      hoursLeft: parseInt(campaignDuration),
      status: 'active',
      appliedItems: 'Tüm Mağaza Ürünleri'
    };

    setActiveCampaigns([newCamp, ...activeCampaigns]);
    setIsCampaignModalOpen(false);
    setCampaignName('');
  };

  // Filtered Catalog
  const filteredCatalog = useMemo(() => {
    return products.filter(p => {
      const matchesCat = selectedCatFilter === 'all' || p.category === selectedCatFilter;
      const matchesSearch = productSearch === '' || 
        p.name.toLowerCase().includes(productSearch.toLowerCase()) ||
        p.vendor.toLowerCase().includes(productSearch.toLowerCase());
      return matchesCat && matchesSearch;
    });
  }, [products, selectedCatFilter, productSearch]);

  return (
    <div className="space-y-8 animate-fadeIn select-none font-sans text-slate-100">
      
      {/* 1. PUBLISHER HERO HEADER */}
      <div className="glass-panel p-6 sm:p-8 rounded-3xl border border-indigo-500/30 bg-gradient-to-r from-slate-900 via-indigo-950/50 to-slate-900 flex flex-col md:flex-row items-start md:items-center justify-between gap-6 shadow-2xl relative overflow-hidden">
        <div className="absolute top-0 right-0 w-80 h-80 bg-indigo-500/10 rounded-full blur-3xl pointer-events-none" />

        <div className="flex items-center space-x-4 relative z-10">
          <div className="w-16 h-16 rounded-2xl bg-indigo-600/30 text-indigo-400 flex items-center justify-center border border-indigo-500/40 shadow-lg shrink-0">
            <Store className="w-8 h-8" />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <span className="px-2.5 py-0.5 rounded-full bg-indigo-500/20 text-indigo-300 text-[11px] font-extrabold border border-indigo-500/30">
                🏢 Yayınevi & Yayıncı Portalı
              </span>
              <span className="px-2 py-0.5 rounded-full bg-emerald-500/20 text-emerald-300 text-[10px] font-bold border border-emerald-500/30 flex items-center gap-1">
                <CheckCircle2 className="w-3 h-3" /> Doğrulanmış Satıcı
              </span>
            </div>
            <h1 className="text-2xl sm:text-3xl font-black text-white mt-1 tracking-tight">
              Yayınevi Satış & Katalog Masası
            </h1>
            <p className="text-xs text-slate-300 max-w-xl mt-0.5 leading-relaxed">
              Soru bankalarınızı, deneme sınavlarınızı listeleyin, canlı ciro trendlerinizi takip edin ve toplu Excel yüklemesiyle anında satışa başlayın.
            </p>
          </div>
        </div>

        {/* Quick Action Buttons */}
        <div className="flex flex-wrap items-center gap-2.5 self-stretch md:self-auto relative z-10">
          <button
            onClick={() => setIsCsvModalOpen(true)}
            className="px-4 py-2.5 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white text-xs font-extrabold transition-all shadow-lg shadow-emerald-600/20 flex items-center gap-2"
          >
            <FileSpreadsheet className="w-4 h-4" />
            <span>📥 Excel / CSV ile Toplu Yükle</span>
          </button>

          <button
            onClick={() => setIsCampaignModalOpen(true)}
            className="px-4 py-2.5 rounded-xl bg-amber-500 hover:bg-amber-400 text-slate-950 text-xs font-black transition-all shadow-lg shadow-amber-500/20 flex items-center gap-1.5"
          >
            <Flame className="w-4 h-4" />
            <span>⚡ Yeni Kampanya Başlat</span>
          </button>
        </div>
      </div>

      {/* 2. LIVE REVENUE & SALES TREND ANALYTICS (SVG CHART) */}
      <div className="glass-panel p-6 sm:p-7 rounded-3xl border border-slate-800 bg-slate-900/90 shadow-xl space-y-6">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div>
            <div className="flex items-center gap-2 text-xs font-extrabold uppercase tracking-widest text-indigo-400 mb-1">
              <TrendingUp className="w-4 h-4" /> Canlı Finans & Satış Grafiği
            </div>
            <h3 className="text-xl font-black text-white tracking-tight">
              Ciro Trendi & Sipariş Hacmi
            </h3>
          </div>

          <div className="flex items-center gap-2 bg-slate-950/80 p-1 rounded-xl border border-slate-800 self-start sm:self-auto">
            <button
              onClick={() => setTimeframe('weekly')}
              className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-all ${
                timeframe === 'weekly'
                  ? 'bg-indigo-600 text-white shadow'
                  : 'text-slate-400 hover:text-white'
              }`}
            >
              Haftalık Görünüm
            </button>
            <button
              onClick={() => setTimeframe('monthly')}
              className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-all ${
                timeframe === 'monthly'
                  ? 'bg-indigo-600 text-white shadow'
                  : 'text-slate-400 hover:text-white'
              }`}
            >
              Aylık Görünüm
            </button>
          </div>
        </div>

        {/* 4 Analytic Indicator Stat Cards */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
          <div className="p-4 rounded-2xl bg-slate-950/60 border border-slate-800 space-y-1">
            <span className="text-[11px] font-bold text-slate-400">Dönem Toplam Satış Hacmi</span>
            <div className="text-xl sm:text-2xl font-black text-white font-mono">
              ₺{totalPeriodRevenue.toLocaleString('tr-TR')}
            </div>
            <span className="text-[10px] font-extrabold text-emerald-400 flex items-center gap-1">
              <ArrowUpRight className="w-3 h-3" /> +%28.4 Geçen Döneme Göre
            </span>
          </div>

          <div className="p-4 rounded-2xl bg-slate-950/60 border border-slate-800 space-y-1">
            <span className="text-[11px] font-bold text-slate-400">Tamamlanan Sipariş Adedi</span>
            <div className="text-xl sm:text-2xl font-black text-indigo-300 font-mono">
              {totalPeriodOrders} Paket
            </div>
            <span className="text-[10px] font-extrabold text-emerald-400 flex items-center gap-1">
              <ArrowUpRight className="w-3 h-3" /> +42 Yeni Müşteri
            </span>
          </div>

          <div className="p-4 rounded-2xl bg-slate-950/60 border border-slate-800 space-y-1">
            <span className="text-[11px] font-bold text-slate-400">Ortalama Sepet Tutarı</span>
            <div className="text-xl sm:text-2xl font-black text-amber-300 font-mono">
              ₺{(totalPeriodRevenue / (totalPeriodOrders || 1)).toFixed(0)}
            </div>
            <span className="text-[10px] font-bold text-slate-400">
              Kombin & Set Tercihi Yüksek
            </span>
          </div>

          <div className="p-4 rounded-2xl bg-slate-950/60 border border-slate-800 space-y-1">
            <span className="text-[11px] font-bold text-slate-400">İade & İptal Oranı</span>
            <div className="text-xl sm:text-2xl font-black text-emerald-400 font-mono">
              %0.2
            </div>
            <span className="text-[10px] font-bold text-emerald-400">
              Kusursuz Paketleme & Hızlı Kargo
            </span>
          </div>
        </div>

        {/* SVG Curve Line Graph */}
        <div className="p-4 rounded-2xl bg-slate-950/80 border border-slate-800/80 space-y-2">
          <div className="h-44 w-full relative">
            <svg className="w-full h-full overflow-visible" viewBox="0 0 700 160" preserveAspectRatio="none">
              <defs>
                <linearGradient id="vendorGrad" x1="0%" y1="0%" x2="0%" y2="100%">
                  <stop offset="0%" stopColor="#6366f1" stopOpacity="0.45" />
                  <stop offset="100%" stopColor="#6366f1" stopOpacity="0.0" />
                </linearGradient>
              </defs>

              {/* Grid Horizontal Lines */}
              <line x1="0" y1="40" x2="700" y2="40" stroke="#334155" strokeDasharray="3 3" strokeOpacity="0.4" />
              <line x1="0" y1="90" x2="700" y2="90" stroke="#334155" strokeDasharray="3 3" strokeOpacity="0.4" />
              <line x1="0" y1="140" x2="700" y2="140" stroke="#334155" strokeOpacity="0.7" />

              {/* Closed Polygon Fill for Area Under Curve */}
              {(() => {
                const points = activeChartData.map((d, i) => {
                  const x = (i / (activeChartData.length - 1)) * 660 + 20;
                  const y = 140 - (d.revenue / maxRevenue) * 110;
                  return `${x},${y}`;
                });
                const firstX = 20;
                const lastX = 680;
                const polygonPoints = `${firstX},140 ${points.join(' ')} ${lastX},140`;
                return <polygon points={polygonPoints} fill="url(#vendorGrad)" />;
              })()}

              {/* Main SVG Polyline */}
              {(() => {
                const points = activeChartData.map((d, i) => {
                  const x = (i / (activeChartData.length - 1)) * 660 + 20;
                  const y = 140 - (d.revenue / maxRevenue) * 110;
                  return `${x},${y}`;
                }).join(' ');
                return (
                  <polyline
                    fill="none"
                    stroke="#818cf8"
                    strokeWidth="3.5"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    points={points}
                  />
                );
              })()}

              {/* Data Points with Hover Circles */}
              {activeChartData.map((d, i) => {
                const x = (i / (activeChartData.length - 1)) * 660 + 20;
                const y = 140 - (d.revenue / maxRevenue) * 110;
                return (
                  <g key={i} className="group cursor-pointer">
                    <circle cx={x} cy={y} r="5.5" fill="#4f46e5" stroke="#ffffff" strokeWidth="2.5" />
                    {/* Tooltip on SVG point */}
                    <text
                      x={x}
                      y={y - 12}
                      textAnchor="middle"
                      fill="#e2e8f0"
                      fontSize="11"
                      fontWeight="bold"
                      className="opacity-90"
                    >
                      ₺{d.revenue.toLocaleString('tr-TR')}
                    </text>
                  </g>
                );
              })}
            </svg>
          </div>

          {/* X-Axis Labels */}
          <div className="flex justify-between px-3 text-[11px] font-bold text-slate-400">
            {activeChartData.map((d, i) => (
              <span key={i}>{d.label} ({d.orders} Sipariş)</span>
            ))}
          </div>
        </div>
      </div>

      {/* 3. ACTIVE SPECIAL CAMPAIGNS (FLASH DEALS) */}
      <div className="glass-panel p-6 rounded-3xl border border-slate-800 bg-slate-900/80 shadow-xl space-y-4">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
          <div>
            <span className="text-xs font-extrabold uppercase tracking-widest text-amber-400 flex items-center gap-1.5 mb-0.5">
              <Zap className="w-4 h-4" /> Yayınevine Özel Kampanyalar
            </span>
            <h3 className="text-lg font-black text-white">Aktif İndirim & Flaş Fırsatlarınız</h3>
          </div>
          <button
            onClick={() => setIsCampaignModalOpen(true)}
            className="px-3.5 py-2 rounded-xl bg-amber-500/20 hover:bg-amber-500/30 text-amber-300 border border-amber-500/30 text-xs font-bold transition-all flex items-center gap-1.5 self-start sm:self-auto"
          >
            <Plus className="w-3.5 h-3.5" />
            <span>Kampanya Tanımla</span>
          </button>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          {activeCampaigns.map((camp) => (
            <div key={camp.id} className="p-4 rounded-2xl bg-slate-950/70 border border-amber-500/30 relative overflow-hidden flex items-center justify-between gap-4">
              <div className="space-y-1">
                <div className="flex items-center gap-2">
                  <span className="px-2 py-0.5 rounded-full bg-amber-500/20 text-amber-300 text-[10px] font-black border border-amber-500/40">
                    {camp.discount}
                  </span>
                  <span className="text-[10px] text-emerald-400 font-bold flex items-center gap-1">
                    <Clock className="w-3 h-3" /> {camp.hoursLeft} Saat Kaldı
                  </span>
                </div>
                <h4 className="text-xs font-black text-white">{camp.title}</h4>
                <div className="text-[11px] text-slate-400">Kapsam: {camp.appliedItems}</div>
              </div>

              <div className="text-right">
                <span className="px-2.5 py-1 rounded-xl bg-emerald-500/10 text-emerald-400 border border-emerald-500/30 text-[11px] font-bold inline-block">
                  ● Yayında
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* 4. PRODUCT CATALOG MANAGEMENT & SINGLE PRODUCT CREATOR */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        
        {/* Left Form: Add Single Product */}
        <div className="glass-panel p-6 rounded-3xl border border-slate-800 bg-slate-900/90 space-y-4 lg:col-span-1 shadow-xl">
          <div>
            <h2 className="text-base font-black text-white flex items-center gap-2">
              <Plus className="w-5 h-5 text-indigo-400" />
              <span>Tekli Ürün / Deneme Ekle</span>
            </h2>
            <p className="text-xs text-slate-400 mt-0.5">
              Kataloğa tek tek yeni soru bankası veya deneme ekleyin.
            </p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-3.5">
            <div>
              <label className="block text-xs font-bold text-slate-300 mb-1">Kitap / Ürün Adı</label>
              <input
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="Örn: 2026 AYT Matematik Soru Bankası"
                className="w-full bg-slate-950 border border-slate-800 rounded-xl px-3.5 py-2.5 text-xs text-white placeholder-slate-500 focus:outline-none focus:border-indigo-500"
                required
              />
            </div>

            <div>
              <label className="block text-xs font-bold text-slate-300 mb-1">Yayınevi / Marka Adı</label>
              <input
                type="text"
                value={vendor}
                onChange={(e) => setVendor(e.target.value)}
                className="w-full bg-slate-950 border border-slate-800 rounded-xl px-3.5 py-2.5 text-xs text-white placeholder-slate-500 focus:outline-none focus:border-indigo-500"
                required
              />
            </div>

            <div className="grid grid-cols-2 gap-3">
              <div>
                <label className="block text-xs font-bold text-slate-300 mb-1">Kategori</label>
                <select
                  value={category}
                  onChange={(e) => setCategory(e.target.value)}
                  className="w-full bg-slate-950 border border-slate-800 rounded-xl px-3 py-2.5 text-xs text-white focus:outline-none focus:border-indigo-500"
                >
                  <option value="Kitap & Deneme" className="bg-slate-900">Kitap & Deneme</option>
                  <option value="Deneme Sınavı" className="bg-slate-900">Deneme Sınavı</option>
                  <option value="Soru Bankası" className="bg-slate-900">Soru Bankası</option>
                  <option value="Dijital PDF" className="bg-slate-900">Dijital PDF</option>
                </select>
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-300 mb-1">Satış Fiyatı (₺)</label>
                <input
                  type="number"
                  value={price}
                  onChange={(e) => setPrice(e.target.value)}
                  placeholder="220"
                  className="w-full bg-slate-950 border border-slate-800 rounded-xl px-3.5 py-2.5 text-xs text-white placeholder-slate-500 focus:outline-none focus:border-indigo-500"
                  required
                />
              </div>
            </div>

            <div>
              <label className="block text-xs font-bold text-slate-300 mb-1">Ürün Açıklaması</label>
              <textarea
                rows={2}
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                placeholder="ÖSYM yeni nesil soru tarzı, video çözümlü fasikül..."
                className="w-full bg-slate-950 border border-slate-800 rounded-xl px-3.5 py-2 text-xs text-white placeholder-slate-500 focus:outline-none focus:border-indigo-500"
              />
            </div>

            {/* Look Inside Preview Checkbox */}
            <div className="p-3 rounded-2xl bg-indigo-950/40 border border-indigo-500/30 space-y-2">
              <label className="flex items-center gap-2 cursor-pointer">
                <input
                  type="checkbox"
                  checked={hasLookInside}
                  onChange={(e) => setHasLookInside(e.target.checked)}
                  className="rounded bg-slate-900 border-slate-700 text-indigo-600 focus:ring-0"
                />
                <span className="text-xs font-black text-indigo-300 flex items-center gap-1">
                  <BookOpen className="w-3.5 h-3.5" /> 📖 "Kitabın İçine Bak" Önizlemesi Ekle
                </span>
              </label>

              {hasLookInside && (
                <div>
                  <label className="block text-[11px] font-bold text-slate-400 mb-0.5">Örnek Bölüm & Konu Başlığı:</label>
                  <input
                    type="text"
                    value={previewTopic}
                    onChange={(e) => setPreviewTopic(e.target.value)}
                    placeholder="Örn: Bölüm 1: Fonksiyonlar ve Soru Çözümleri"
                    className="w-full bg-slate-950 border border-slate-800 rounded-xl px-3 py-1.5 text-xs text-emerald-300 focus:outline-none focus:border-emerald-500"
                  />
                </div>
              )}
            </div>

            <button
              type="submit"
              className="w-full py-3 rounded-xl bg-indigo-600 hover:bg-indigo-500 text-white font-extrabold text-xs shadow-lg shadow-indigo-600/30 transition-all flex items-center justify-center gap-2"
            >
              <Plus className="w-4 h-4" />
              <span>Mağazada Satışa Çıkar</span>
            </button>
          </form>
        </div>

        {/* Right Panel: Catalog List, Search & Controls */}
        <div className="glass-panel p-6 rounded-3xl border border-slate-800 bg-slate-900/90 space-y-4 lg:col-span-2 shadow-xl">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
            <div>
              <h2 className="text-base font-black text-white flex items-center gap-2">
                <Package className="w-5 h-5 text-indigo-400" />
                <span>Satıştaki Ürün Kataloğunuz ({filteredCatalog.length})</span>
              </h2>
              <p className="text-xs text-slate-400 mt-0.5">
                Stokta olan soru bankaları ve denemeleriniz pazaryerinde canlı yayınlanır.
              </p>
            </div>

            <button
              onClick={handleDownloadSampleCsv}
              className="px-3 py-1.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-300 text-xs font-bold transition-all flex items-center gap-1.5 self-start sm:self-auto border border-slate-700"
            >
              <Download className="w-3.5 h-3.5 text-indigo-400" />
              <span>Excel Şablonu İndir</span>
            </button>
          </div>

          {/* Search & Category Filter Toolbar */}
          <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-2.5 pt-2">
            <div className="relative flex-1">
              <Search className="w-4 h-4 text-slate-500 absolute left-3.5 top-1/2 -translate-y-1/2" />
              <input
                type="text"
                value={productSearch}
                onChange={(e) => setProductSearch(e.target.value)}
                placeholder="Ürün adı veya yayınevi ara..."
                className="w-full bg-slate-950 border border-slate-800 rounded-xl pl-9 pr-4 py-2 text-xs text-white placeholder-slate-500 focus:outline-none focus:border-indigo-500"
              />
            </div>

            <select
              value={selectedCatFilter}
              onChange={(e) => setSelectedCatFilter(e.target.value)}
              className="bg-slate-950 border border-slate-800 rounded-xl px-3 py-2 text-xs text-slate-300 focus:outline-none focus:border-indigo-500"
            >
              <option value="all">Tüm Kategoriler</option>
              <option value="Kitap & Deneme">Kitap & Deneme</option>
              <option value="Deneme Sınavı">Deneme Sınavı</option>
              <option value="Soru Bankası">Soru Bankası</option>
              <option value="Dijital PDF">Dijital PDF</option>
            </select>
          </div>

          {/* Catalog Items Feed */}
          <div className="space-y-3 max-h-[460px] overflow-y-auto custom-scrollbar pr-1">
            {filteredCatalog.length === 0 ? (
              <div className="p-8 text-center rounded-2xl bg-slate-950/40 border border-slate-800 text-slate-400 text-xs">
                Aramanıza uygun ürün bulunamadı.
              </div>
            ) : (
              filteredCatalog.map((p) => (
                <div key={p.id} className="p-3.5 rounded-2xl bg-slate-950/70 border border-slate-800 hover:border-indigo-500/40 transition-all flex items-center justify-between gap-4 group">
                  <div className="flex items-center space-x-3 min-w-0">
                    <img src={p.image} alt={p.name} className="w-12 h-12 rounded-xl object-cover border border-slate-800 shrink-0" />
                    <div className="min-w-0">
                      <h4 className="text-xs font-black text-white truncate group-hover:text-indigo-300 transition-colors">
                        {p.name}
                      </h4>
                      <div className="text-[11px] text-slate-400 mt-0.5 truncate">
                        {p.vendor} • <span className="text-indigo-400 font-bold">{p.category}</span>
                      </div>
                    </div>
                  </div>

                  <div className="flex items-center gap-4 shrink-0">
                    <div className="text-right">
                      <span className="text-sm font-black text-emerald-400 block font-mono">₺{p.price}</span>
                      <span className="text-[10px] text-emerald-400/80 font-bold">● Satışta</span>
                    </div>

                    {onDeleteProduct && (
                      <button
                        onClick={() => onDeleteProduct(p.id)}
                        className="p-2 rounded-xl bg-rose-500/10 hover:bg-rose-500/20 text-rose-400 border border-rose-500/20 transition-all"
                        title="Ürünü Mağazadan Kaldır"
                      >
                        <Trash2 className="w-3.5 h-3.5" />
                      </button>
                    )}
                  </div>
                </div>
              ))
            )}
          </div>
        </div>

      </div>

      {/* 5. TOPLU EXCEL / CSV IMPORT MODAL */}
      {isCsvModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/80 backdrop-blur-md animate-fadeIn">
          <div className="max-w-2xl w-full rounded-3xl bg-slate-900 border border-slate-800 p-6 sm:p-7 space-y-5 shadow-2xl relative">
            <div className="flex items-center justify-between pb-3 border-b border-slate-800">
              <div className="flex items-center gap-2">
                <FileSpreadsheet className="w-5 h-5 text-emerald-400" />
                <h3 className="text-base font-black text-white">Excel / CSV ile Toplu Ürün İçe Aktar</h3>
              </div>
              <button onClick={() => setIsCsvModalOpen(false)} className="text-slate-400 hover:text-white">
                <X className="w-5 h-5" />
              </button>
            </div>

            {csvImportSuccess ? (
              <div className="py-12 text-center space-y-3">
                <div className="w-14 h-14 rounded-full bg-emerald-500/20 text-emerald-400 flex items-center justify-center mx-auto border border-emerald-500/40">
                  <Check className="w-7 h-7" />
                </div>
                <h4 className="text-base font-black text-white">Ürünler Başarıyla İçe Aktarıldı!</h4>
                <p className="text-xs text-slate-400">Tüm kitaplar ve denemeler kataloğunuza eklendi.</p>
              </div>
            ) : (
              <div className="space-y-4">
                <p className="text-xs text-slate-300 leading-relaxed">
                  Excel veya CSV dosyanızdaki verileri kopyalayıp aşağıdaki kutuya yapıştırın veya şablonu inceleyin.
                </p>

                <div className="space-y-1.5">
                  <label className="text-xs font-bold text-slate-300">CSV Metni (Virgülle Ayrılmış):</label>
                  <textarea
                    rows={6}
                    value={csvText}
                    onChange={(e) => handleParseCsv(e.target.value)}
                    placeholder={"Ürün Adı,Kategori,Fiyat,Yayınevi,Açıklama\n2026 TYT Deneme Seti,Deneme Sınavı,180,Borsa Akademi,10 Adet Deneme\n2026 AYT Matematik,Kitap & Deneme,220,Borsa Akademi,ÖSYM Uyumlu"}
                    className="w-full bg-slate-950 border border-slate-800 rounded-xl p-3 text-xs text-emerald-300 font-mono focus:outline-none focus:border-emerald-500"
                  />
                </div>

                {/* Parsed Preview Count */}
                {parsedCsvItems.length > 0 && (
                  <div className="p-3 rounded-xl bg-emerald-500/10 border border-emerald-500/30 text-xs text-emerald-300 font-bold flex items-center gap-2">
                    <CheckCircle2 className="w-4 h-4" />
                    <span>{parsedCsvItems.length} Adet geçerli ürün algılandı ve aktarıma hazır.</span>
                  </div>
                )}

                <div className="flex items-center justify-end gap-3 pt-2">
                  <button
                    onClick={() => setIsCsvModalOpen(false)}
                    className="px-4 py-2.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-300 text-xs font-bold"
                  >
                    Vazgeç
                  </button>

                  <button
                    onClick={handleConfirmCsvImport}
                    disabled={parsedCsvItems.length === 0}
                    className="px-5 py-2.5 rounded-xl bg-emerald-600 hover:bg-emerald-500 disabled:opacity-50 text-white text-xs font-extrabold shadow-lg shadow-emerald-600/20 flex items-center gap-1.5"
                  >
                    <Upload className="w-4 h-4" />
                    <span>{parsedCsvItems.length} Ürünü Kataloğa Aktar</span>
                  </button>
                </div>
              </div>
            )}
          </div>
        </div>
      )}

      {/* 6. YENİ KAMPANYA BAŞLATMA MODALI */}
      {isCampaignModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/80 backdrop-blur-md animate-fadeIn">
          <div className="max-w-md w-full rounded-3xl bg-slate-900 border border-slate-800 p-6 space-y-5 shadow-2xl relative">
            <div className="flex items-center justify-between pb-3 border-b border-slate-800">
              <div className="flex items-center gap-2">
                <Flame className="w-5 h-5 text-amber-400" />
                <h3 className="text-base font-black text-white">Yayınevi Flaş Kampanyası Başlat</h3>
              </div>
              <button onClick={() => setIsCampaignModalOpen(false)} className="text-slate-400 hover:text-white">
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleCreateCampaign} className="space-y-4">
              <div>
                <label className="block text-xs font-bold text-slate-300 mb-1">Kampanya Başlığı</label>
                <input
                  type="text"
                  value={campaignName}
                  onChange={(e) => setCampaignName(e.target.value)}
                  placeholder="Örn: 48 Saatlik YKS Deneme Fırsatı"
                  className="w-full bg-slate-950 border border-slate-800 rounded-xl px-3.5 py-2.5 text-xs text-white focus:outline-none focus:border-amber-500"
                  required
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-300 mb-1">Kampanya Türü</label>
                <select
                  value={campaignType}
                  onChange={(e) => setCampaignType(e.target.value)}
                  className="w-full bg-slate-950 border border-slate-800 rounded-xl px-3.5 py-2.5 text-xs text-white focus:outline-none focus:border-amber-500"
                >
                  <option value="percent_discount">Yüzdelik İndirim (% İndirim)</option>
                  <option value="buy2get1">2 Al 1 Öde (Bundle Fırsatı)</option>
                  <option value="free_shipping">Koşulsuz Ücretsiz Kargo</option>
                </select>
              </div>

              {campaignType === 'percent_discount' && (
                <div>
                  <label className="block text-xs font-bold text-slate-300 mb-1">İndirim Oranı (%)</label>
                  <input
                    type="number"
                    value={discountRate}
                    onChange={(e) => setDiscountRate(e.target.value)}
                    min="5"
                    max="70"
                    className="w-full bg-slate-950 border border-slate-800 rounded-xl px-3.5 py-2.5 text-xs text-white focus:outline-none focus:border-amber-500"
                  />
                </div>
              )}

              <div>
                <label className="block text-xs font-bold text-slate-300 mb-1">Süre (Saat)</label>
                <select
                  value={campaignDuration}
                  onChange={(e) => setCampaignDuration(e.target.value)}
                  className="w-full bg-slate-950 border border-slate-800 rounded-xl px-3.5 py-2.5 text-xs text-white focus:outline-none focus:border-amber-500"
                >
                  <option value="24">24 Saat (1 Gün Flaş İndirim)</option>
                  <option value="48">48 Saat (Hafta Sonu Özel)</option>
                  <option value="72">72 Saat (3 Günlük)</option>
                  <option value="168">7 Gün (1 Hafta)</option>
                </select>
              </div>

              <div className="flex items-center justify-end gap-3 pt-2">
                <button
                  type="button"
                  onClick={() => setIsCampaignModalOpen(false)}
                  className="px-4 py-2.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-300 text-xs font-bold"
                >
                  İptal
                </button>

                <button
                  type="submit"
                  className="px-5 py-2.5 rounded-xl bg-amber-500 hover:bg-amber-400 text-slate-950 text-xs font-black shadow-lg shadow-amber-500/20"
                >
                  Kampanyayı Başlat & Yayınla
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

    </div>
  );
}
