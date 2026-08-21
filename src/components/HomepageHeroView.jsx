import React, { useState } from 'react';
import { 
  Sparkles, 
  MapPin, 
  SlidersHorizontal, 
  BookOpen, 
  Users, 
  UserCheck, 
  CheckCircle2,
  Flame,
  Search,
  Tag
} from 'lucide-react';
import TeacherCard from './TeacherCard';
import StoreSection from './StoreSection';
import RequestMarketplace from './RequestMarketplace';
import DailyQuizWidget from './DailyQuizWidget';
import LiveStudyLounge from './LiveStudyLounge';
import BannerAds from './BannerAds';
import CouponDealsWidget from './public/CouponDealsWidget';
import { SUBJECTS } from '../data/mockData';

/**
 * HomepageHeroView: Interactive Marketplace Showcase component.
 * Houses tabbed views for: Verified Teachers Grid, Live Requests Feed, Store, Study Lounge, and Live Coupons.
 */
export default function HomepageHeroView({
  teachers = [],
  filteredTeachers = [],
  products = [],
  serviceRequests = [],
  selectedCity = 'İstanbul',
  selectedDistrict = 'Kadıköy',
  selectedSubject = 'all',
  setSelectedSubject,
  sortOrder = 'featured',
  setSortOrder,
  onlineOnlyFilter = false,
  setOnlineOnlyFilter,
  onOpenRequestWizard,
  onOpenCreateProfile,
  onOpenFilterModal,
  onSelectTeacher,
  onBookLesson,
  onOpenReview,
  onAddToCart,
  onAddBidToRequest,
  onRoleChange,
  coupons = []
}) {
  const [activeTab, setActiveTab] = useState('store'); // 'store', 'coupons', 'teachers', 'requests', 'lounge'

  const activeCouponCount = coupons.filter(c => c.isActive !== false).length;

  return (
    <div className="space-y-8 select-none">
      
      {/* 1. SECTION TITLE & TAB NAVIGATION SWITCHER */}
      <div className="space-y-4">
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-3">
          <div>
            <span className="text-xs font-extrabold uppercase tracking-widest text-emerald-700 flex items-center gap-1.5 mb-1">
              <Sparkles className="w-4 h-4" /> Yayınevi Pazaryeri & Fırsat Kuponları
            </span>
            <h2 className="text-2xl sm:text-3xl font-black text-[#1C1917] tracking-tight">
              Yayınevi Kitap & Denemeleri ve Fırsat Kuponları
            </h2>
          </div>
          <p className="text-xs text-[#78716C] max-w-md">
            Akredite yayınevlerinin güncel soru bankalarını, deneme sınavı paketlerini ve anlaşmalı mağazalarda geçerli anında indirim kuponlarını inceleyin.
          </p>
        </div>

        {/* Tab Switcher */}
        <div className="p-1.5 rounded-2xl bg-white border border-[#E7E2D9] shadow-sm flex items-center space-x-2 overflow-x-auto custom-scrollbar">
          <button
            onClick={() => setActiveTab('store')}
            className={`px-5 py-2.5 rounded-xl text-xs font-extrabold whitespace-nowrap transition-all flex items-center gap-2 ${
              activeTab === 'store'
                ? 'bg-emerald-600 text-white shadow-md shadow-emerald-600/20'
                : 'text-[#57534E] hover:text-[#1C1917] hover:bg-[#F5F2EC]'
            }`}
          >
            <BookOpen className="w-4 h-4" />
            <span>📚 Yayınevi Kitap & Deneme Mağazası ({products.length})</span>
          </button>

          <button
            onClick={() => setActiveTab('coupons')}
            className={`px-5 py-2.5 rounded-xl text-xs font-extrabold whitespace-nowrap transition-all flex items-center gap-2 ${
              activeTab === 'coupons'
                ? 'bg-emerald-600 text-white shadow-md shadow-emerald-600/20'
                : 'text-[#57534E] hover:text-[#1C1917] hover:bg-[#F5F2EC]'
            }`}
          >
            <Tag className="w-4 h-4 text-amber-400" />
            <span>🏷️ İndirim & Fırsat Kuponları ({activeCouponCount})</span>
          </button>
        </div>
      </div>

      {/* 2. TAB CONTENTS */}

      {/* TAB 1: TEACHERS MARKETPLACE */}
      {activeTab === 'teachers' && (
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start animate-fadeIn">
          
          {/* Main Teachers List (8 Cols) */}
          <div className="lg:col-span-8 space-y-6">
            
            {/* Filter Controls Card */}
            <div className="p-5 rounded-3xl bg-white border border-[#E7E2D9] shadow-sm space-y-4">
              <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
                <div>
                  <h3 className="text-sm font-black text-[#1C1917] flex items-center gap-1.5">
                    <MapPin className="w-4 h-4 text-emerald-600" />
                    <span>{selectedCity} Uzman Eğitmen Listesi</span>
                  </h3>
                  <p className="text-[11px] text-[#78716C] font-medium">Kriterlerinize uyan akredite öğretmenler listeleniyor.</p>
                </div>

                <div className="flex flex-wrap items-center gap-2 text-xs">
                  <button
                    onClick={onOpenFilterModal}
                    className="px-3.5 py-2 rounded-xl font-bold bg-[#F5F2EC] hover:bg-[#EFECE6] text-[#292524] border border-[#DDD7CD] flex items-center gap-1.5 transition-colors"
                  >
                    <SlidersHorizontal className="w-3.5 h-3.5 text-emerald-700" />
                    <span>Filtrele</span>
                  </button>

                  <select
                    value={sortOrder}
                    onChange={(e) => setSortOrder(e.target.value)}
                    className="rounded-xl px-3 py-2 text-xs font-bold text-[#1C1917] bg-[#F5F2EC] border border-[#DDD7CD] focus:outline-none cursor-pointer"
                  >
                    <option value="featured">Sıralama: Öne Çıkanlar & Ligler</option>
                    <option value="elite_first">👑 Sıralama: Önce Elit (%1) & Altın Lig</option>
                    <option value="rating">Sıralama: En Yüksek Puanlılar</option>
                    <option value="price_asc">Sıralama: Ücret (Düşükten Yükseğe)</option>
                    <option value="price_desc">Sıralama: Ücret (Yüksekten Düşüğe)</option>
                  </select>
                </div>
              </div>

              {/* Subject Filter Chips */}
              <div className="flex items-center space-x-2 overflow-x-auto custom-scrollbar pb-1 text-xs">
                <button
                  onClick={() => setSelectedSubject('all')}
                  className={`px-3 py-1.5 rounded-xl font-bold whitespace-nowrap transition-all ${
                    selectedSubject === 'all'
                      ? 'bg-emerald-600 text-white shadow-sm'
                      : 'bg-[#FAF8F5] text-[#57534E] hover:text-[#1C1917] border border-[#E7E2D9]'
                  }`}
                >
                  Tüm Branşlar
                </button>
                {SUBJECTS.map((s) => {
                  const subjectName = typeof s === 'string' ? s : s.name || s.id;
                  const isSelected = selectedSubject === subjectName;
                  return (
                    <button
                      key={s.id || subjectName}
                      onClick={() => setSelectedSubject(subjectName)}
                      className={`px-3 py-1.5 rounded-xl font-bold whitespace-nowrap transition-all ${
                        isSelected
                          ? 'bg-emerald-600 text-white shadow-sm'
                          : 'bg-[#FAF8F5] text-[#57534E] hover:text-[#1C1917] border border-[#E7E2D9]'
                      }`}
                    >
                      {subjectName}
                    </button>
                  );
                })}
              </div>

              {/* League Quick Filters (Gamification Tiers) */}
              <div className="flex items-center space-x-2 pt-2 border-t border-[#F5F2EC] overflow-x-auto custom-scrollbar pb-0.5 text-xs font-bold">
                <span className="text-[11px] text-[#78716C] font-semibold whitespace-nowrap">Lig Filtresi:</span>
                {[
                  { id: 'all', label: 'Tüm Seviyeler' },
                  { id: 'elite', label: '👑 Sadece Elit Lig (%1)' },
                  { id: 'gold', label: '🥇 Altın Lig' },
                  { id: 'silver', label: '🥈 Gümüş Lig' }
                ].map(l => (
                  <button
                    key={l.id}
                    onClick={() => {
                      if (l.id === 'all') setSortOrder('featured');
                      else setSortOrder('elite_first');
                    }}
                    className="px-2.5 py-1 rounded-lg bg-[#FAF8F5] hover:bg-[#EFECE6] border border-[#DDD7CD] text-[#44403C] hover:text-[#1C1917] whitespace-nowrap transition-colors text-[11px]"
                  >
                    {l.label}
                  </button>
                ))}
              </div>
            </div>

            {/* Teachers Cards Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
              {filteredTeachers.map((t) => (
                <TeacherCard
                  key={t.id}
                  teacher={t}
                  onSelectTeacher={onSelectTeacher}
                  onQuickBookSlot={onBookLesson}
                  onOpenReview={onOpenReview}
                />
              ))}
            </div>

          </div>

          {/* Right Sidebar (4 Cols: Coupons & Ads) */}
          <div className="lg:col-span-4 space-y-6">
            <CouponDealsWidget coupons={coupons} isSidebar={true} />
            <BannerAds onSelectAdCategory={(cat) => {
              if (cat === 'tasks') onRoleChange('teacher');
            }} />
          </div>

        </div>
      )}

      {/* TAB 2: REQUEST MARKETPLACE */}
      {activeTab === 'requests' && (
        <div className="animate-fadeIn">
          <RequestMarketplace
            requests={serviceRequests}
            onAddBid={onAddBidToRequest}
            onOpenWizard={onOpenRequestWizard}
          />
        </div>
      )}

      {/* TAB 3: DEDICATED COUPON DEALS MARKETPLACE */}
      {activeTab === 'coupons' && (
        <div className="animate-fadeIn">
          <CouponDealsWidget coupons={coupons} isSidebar={false} />
        </div>
      )}

      {/* TAB 4: STORE SECTION */}
      {activeTab === 'store' && (
        <div className="animate-fadeIn">
          <StoreSection products={products} onAddToCart={onAddToCart} />
        </div>
      )}

      {/* TAB 5: LOUNGE & QUIZ */}
      {activeTab === 'lounge' && (
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start animate-fadeIn">
          <div className="lg:col-span-7">
            <LiveStudyLounge />
          </div>
          <div className="lg:col-span-5 space-y-6">
            <DailyQuizWidget />
          </div>
        </div>
      )}

    </div>
  );
}
