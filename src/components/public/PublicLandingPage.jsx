import React from 'react';
import PublicNavbar from './PublicNavbar';
import Hero from './Hero';
import MetricsBar from './MetricsBar';
import CategoryGrid from './CategoryGrid';
import Features from './Features';
import HowItWorks from './HowItWorks';
import Testimonials from './Testimonials';
import FaqAccordion from './FaqAccordion';
import CouponDealsWidget from './CouponDealsWidget';
import FinalCta from './FinalCta';
import PublicFooter from './PublicFooter';
import MobileBottomBar from './MobileBottomBar';
import FloatingCouponAd from './FloatingCouponAd';
import HomepageHeroView from '../HomepageHeroView';

/**
 * PublicLandingPage: Master Orchestration Component for the Public Market realm.
 * Unites Navbar, Hero, Metrics, Categories, Showcase, Features, HowItWorks,
 * Testimonials, FAQ, FinalCTA, and Corporate Footer.
 */
export default function PublicLandingPage({
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
  searchQuery = '',
  setSearchQuery,
  currentRole = 'general',
  onRoleChange,
  onOpenLocationModal,
  onOpenRequestWizard,
  onOpenCreateProfile,
  onOpenLeaderboard,
  onOpenAuthModal,
  onOpenFilterModal,
  onSelectTeacher,
  onBookLesson,
  onOpenReview,
  onAddToCart,
  onAddBidToRequest,
  onRequestAuthRole,
  onOpenClassroom,
  onOpenExamSimulator,
  onOpenPomodoro,
  onOpenCertificate,
  onOpenThemeCustomizer,
  onOpenAffiliateModal,
  onOpenCart,
  cartCount = 0,
  coupons = []
}) {
  const [isMegaMenuOpen, setIsMegaMenuOpen] = React.useState(false);

  return (
    <div className="min-h-screen flex flex-col bg-[#FAF8F5] text-[#1C1917] font-sans selection:bg-emerald-600 selection:text-white overflow-x-hidden pb-16 sm:pb-0">
      
      {/* 1. STICKY PUBLIC NAVBAR WITH MEGA HAMBURGER MENU */}
      <PublicNavbar
        selectedCity={selectedCity}
        selectedDistrict={selectedDistrict}
        onOpenLocationModal={onOpenLocationModal}
        onOpenRequestWizard={onOpenRequestWizard}
        onOpenCreateProfile={onOpenCreateProfile}
        onOpenLeaderboard={onOpenLeaderboard}
        onOpenAuthModal={onOpenAuthModal}
        searchQuery={searchQuery}
        onSearchChange={setSearchQuery}
        currentRole={currentRole}
        onRoleChange={onRoleChange}
        onRequestAuthRole={onRequestAuthRole}
        onOpenClassroom={onOpenClassroom}
        onOpenExamSimulator={onOpenExamSimulator}
        onOpenPomodoro={onOpenPomodoro}
        onOpenCertificate={onOpenCertificate}
        onOpenThemeCustomizer={onOpenThemeCustomizer}
        onOpenAffiliateModal={onOpenAffiliateModal}
        onOpenCart={onOpenCart}
        cartCount={cartCount}
        isMenuOpen={isMegaMenuOpen}
        onOpenMenu={setIsMegaMenuOpen}
      />

      {/* 2. FLOATING SIDEBAR COUPON ADVERT (Visible on initial visit like an ad banner) */}
      <FloatingCouponAd coupons={coupons} />

      {/* 3. MAIN LANDING CONTENT SECTIONS */}
      <main className="flex-1 max-w-7xl w-full mx-auto px-4 sm:px-6 lg:px-8 py-6 space-y-12 sm:space-y-16">
        
        {/* HERO SECTION WITH CONVERSION SEARCH & PUBLISHER / BOOK SHOWCASE */}
        <Hero
          onRoleChange={onRoleChange}
          onRequestAuthRole={onRequestAuthRole}
        />

        {/* SOCIAL PROOF 4-ITEM METRICS BAR */}
        <MetricsBar />

        {/* POPULAR CATEGORIES & BRANCHES GRID */}
        <CategoryGrid
          onSelectCategory={(catId) => {
            if (setSelectedSubject) setSelectedSubject(catId);
          }}
        />

        {/* LIVE MARKETPLACE SHOWCASE (DIGITAL STORE & COUPONS) */}
        <div id="showcase" className="scroll-mt-24">
          <div id="coupons" className="scroll-mt-24">
            <HomepageHeroView
              teachers={teachers}
              filteredTeachers={filteredTeachers}
              products={products}
              serviceRequests={serviceRequests}
              selectedCity={selectedCity}
              selectedDistrict={selectedDistrict}
              selectedSubject={selectedSubject}
              setSelectedSubject={setSelectedSubject}
              sortOrder={sortOrder}
              setSortOrder={setSortOrder}
              onlineOnlyFilter={onlineOnlyFilter}
              setOnlineOnlyFilter={setOnlineOnlyFilter}
              onOpenRequestWizard={onOpenRequestWizard}
              onOpenCreateProfile={onOpenCreateProfile}
              onOpenFilterModal={onOpenFilterModal}
              onSelectTeacher={onSelectTeacher}
              onBookLesson={onBookLesson}
              onOpenReview={onOpenReview}
              onAddToCart={onAddToCart}
              onAddBidToRequest={onAddBidToRequest}
              onOpenAuthModal={onOpenAuthModal}
              onRoleChange={onRoleChange}
              coupons={coupons}
            />
          </div>
        </div>

        {/* 6-CARD MODERN BENTO FEATURES SECTION */}
        <Features 
          onOpenRequestWizard={onOpenRequestWizard}
        />

        {/* 3-STEP HOW IT WORKS WORKFLOW */}
        <HowItWorks
          onOpenRequestWizard={onOpenRequestWizard}
          onOpenCreateProfile={onOpenCreateProfile}
        />

        {/* VERIFIED TESTIMONIALS & SUCCESS STORIES */}
        <Testimonials />

        {/* HIGH-IMPACT FINAL CALL TO ACTION BANNER */}
        <FinalCta
          onOpenRequestWizard={onOpenRequestWizard}
          onOpenCreateProfile={onOpenCreateProfile}
        />
      </main>

      {/* 3. CORPORATE 4-COLUMN FOOTER */}
      <PublicFooter
        onOpenLocationModal={onOpenLocationModal}
        onOpenRequestWizard={onOpenRequestWizard}
        onOpenCreateProfile={onOpenCreateProfile}
        onOpenAuthModal={onOpenAuthModal}
      />

      {/* 4. MOBILE-ONLY STICKY 1-TAP BOTTOM BAR */}
      <MobileBottomBar
        onOpenCart={onOpenCart}
        cartCount={cartCount}
        onOpenMenu={() => setIsMegaMenuOpen(true)}
      />
    </div>
  );
}
