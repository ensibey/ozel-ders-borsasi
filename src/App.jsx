import React, { useState, useEffect } from 'react';
import Navbar from './components/Navbar';
import LocationModal from './components/LocationModal';
import BannerAds from './components/BannerAds';
import TeacherCard from './components/TeacherCard';
import TeacherDetailModal from './components/TeacherDetailModal';
import StoreSection from './components/StoreSection';
import CartDrawer from './components/CartDrawer';
import NotificationDrawer from './components/NotificationDrawer';
import StudentDashboard from './components/StudentDashboard';
import ParentDashboard from './components/ParentDashboard';
import TeacherDashboard from './components/TeacherDashboard';
import VendorDashboard from './components/VendorDashboard';
import AdminDashboard from './components/AdminDashboard';
import AdminPortal from './admin/AdminPortal';
import VirtualClassroomModal from './components/VirtualClassroomModal';
import ExamSimulatorModal from './components/ExamSimulatorModal';
import AiTutorWidget from './components/AiTutorWidget';
import AffiliateModal from './components/AffiliateModal';
import PomodoroTimerModal from './components/PomodoroTimerModal';
import CertificateModal from './components/CertificateModal';
import ThemeCustomizerModal from './components/ThemeCustomizerModal';
import ReviewModal from './components/ReviewModal';
import LiveStudyLounge from './components/LiveStudyLounge';
import DailyQuizWidget from './components/DailyQuizWidget';
import TeacherFilterModal from './components/TeacherFilterModal';
import ServiceRequestWizardModal from './components/ServiceRequestWizardModal';
import TeacherProfileWizardModal from './components/TeacherProfileWizardModal';
import TeacherLeaderboardModal from './components/TeacherLeaderboardModal';
import HomepageHeroView from './components/HomepageHeroView';
import PublicLandingPage from './components/public/PublicLandingPage';
import RequestMarketplace from './components/RequestMarketplace';
import IncomingProposalsModal from './components/IncomingProposalsModal';
import AuthModal from './components/AuthModal';
import ToastNotification from './components/ToastNotification';
import Footer from './components/Footer';

import { 
  INITIAL_TEACHERS, 
  INITIAL_PRODUCTS, 
  INITIAL_ANNOUNCEMENTS, 
  INITIAL_STUDENT_GOALS, 
  INITIAL_STUDENT_SCHEDULE, 
  INITIAL_LESSON_ARCHIVE, 
  INITIAL_PARENT_FEEDBACK,
  INITIAL_COUPONS,
  SUBJECTS
} from './data/mockData';

import { 
  fetchTeachersFromApi, 
  fetchRequestsFromApi, 
  fetchProductsFromApi,
  fetchAnnouncementsFromApi,
  createRequestApi, 
  postBidApi,
  postProductApi,
  postAnnouncementApi,
  postReviewApi,
  updateTeacherApi,
  createBookingApi
} from './services/api';

import { Sparkles, SlidersHorizontal, Send } from 'lucide-react';
import { getTeacherLeague } from './utils/leagueSystem';

export default function App() {
  // Role & Location State
  const [currentRole, setCurrentRole] = useState('general'); // 'general', 'requests', 'student', 'parent', 'teacher', 'vendor', 'admin'
  const [selectedCity, setSelectedCity] = useState('İstanbul');
  const [selectedDistrict, setSelectedDistrict] = useState('Kadıköy');
  const [isLocationModalOpen, setIsLocationModalOpen] = useState(false);
  const [currentTheme, setCurrentTheme] = useState('dark');
  const [pendingAuthRole, setPendingAuthRole] = useState(null);
  const [toast, setToast] = useState(null);

  const showToast = (message, type = 'info') => {
    setToast({ message, type });
  };

  // App Data State (persisted safely with LocalStorage Error Handlers)
  const [teachers, setTeachers] = useState(() => {
    try {
      const saved = localStorage.getItem('odb_teachers');
      return saved ? JSON.parse(saved) : INITIAL_TEACHERS;
    } catch (e) {
      return INITIAL_TEACHERS;
    }
  });

  const [products, setProducts] = useState(() => {
    try {
      const saved = localStorage.getItem('odb_products');
      return saved ? JSON.parse(saved) : INITIAL_PRODUCTS;
    } catch (e) {
      return INITIAL_PRODUCTS;
    }
  });

  const [announcements, setAnnouncements] = useState(() => {
    try {
      const saved = localStorage.getItem('odb_announcements');
      return saved ? JSON.parse(saved) : INITIAL_ANNOUNCEMENTS;
    } catch (e) {
      return INITIAL_ANNOUNCEMENTS;
    }
  });

  const [goals, setGoals] = useState(() => {
    try {
      const saved = localStorage.getItem('odb_goals');
      return saved ? JSON.parse(saved) : INITIAL_STUDENT_GOALS;
    } catch (e) {
      return INITIAL_STUDENT_GOALS;
    }
  });

  const [schedule, setSchedule] = useState(() => {
    try {
      const saved = localStorage.getItem('odb_schedule');
      return saved ? JSON.parse(saved) : INITIAL_STUDENT_SCHEDULE;
    } catch (e) {
      return INITIAL_STUDENT_SCHEDULE;
    }
  });

  const [recordings, setRecordings] = useState(() => {
    try {
      const saved = localStorage.getItem('odb_recordings');
      return saved ? JSON.parse(saved) : INITIAL_LESSON_ARCHIVE;
    } catch (e) {
      return INITIAL_LESSON_ARCHIVE;
    }
  });

  const [serviceRequests, setServiceRequests] = useState(() => {
    try {
      const saved = localStorage.getItem('odb_service_requests');
      return saved ? JSON.parse(saved) : [
        {
          id: 'req_1',
          subject: 'Matematik & Geometri',
          level: 'YKS (TYT-AYT)',
          mode: 'Online Live',
          city: 'İstanbul',
          district: 'Kadıköy',
          budgetRange: '500 - 800 ₺ / saat',
          frequency: 'Haftada 2 Seans',
          description: 'Haftada 2 saat birebir türev ve integral soru çözümü için tecrübeli akademisyen arıyoruz.',
          studentName: 'Mert Yılmaz',
          createdAt: '15 dk önce',
          bids: [
            {
              id: 'bid_1',
              tutorName: 'Prof. Dr. Ahmet Yılmaz',
              tutorTitle: 'Boğaziçi Üniv. Öğretim Üyesi',
              rating: 4.9,
              price: 650,
              message: 'Merhaba Mert, YKS Matematik konularında 14 yıllık tecrübemle canlı özel ders verebilirim.',
              createdAt: '10 dk önce',
              avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&q=80&w=400'
            }
          ]
        }
      ];
    } catch (e) {
      return [];
    }
  });

  const [feedbacks, setFeedbacks] = useState(INITIAL_PARENT_FEEDBACK);
  const [platformCommission, setPlatformCommission] = useState(10);
  const [purchasedProducts, setPurchasedProducts] = useState(() => {
    try {
      const saved = localStorage.getItem('odb_purchased_products');
      return saved ? JSON.parse(saved) : [];
    } catch (e) {
      return [];
    }
  });

  const [coupons, setCoupons] = useState(() => {
    try {
      const saved = localStorage.getItem('odb_coupons');
      if (saved) {
        const parsed = JSON.parse(saved);
        if (Array.isArray(parsed) && parsed.length > 0) {
          const existingCodes = parsed.map(c => (c.code || '').toUpperCase());
          const missing = INITIAL_COUPONS.filter(ic => !existingCodes.includes((ic.code || '').toUpperCase()));
          return [...parsed, ...missing];
        }
      }
      return INITIAL_COUPONS;
    } catch (e) {
      return INITIAL_COUPONS;
    }
  });

  useEffect(() => {
    try {
      localStorage.setItem('odb_coupons', JSON.stringify(coupons));
    } catch (e) {}
  }, [coupons]);

  const handleAddCoupon = (newCoupon) => {
    setCoupons(prev => [newCoupon, ...prev]);
  };

  const handleUpdateCoupon = (idOrUpdated, maybePatch) => {
    setCoupons(prev => {
      let updated;
      if (typeof idOrUpdated === 'string') {
        const existing = prev.find(c => c.id === idOrUpdated);
        updated = { ...existing, ...maybePatch, id: idOrUpdated };
      } else {
        updated = idOrUpdated;
      }
      return prev.map(c => c.id === updated.id ? { ...c, ...updated } : c);
    });
  };

  const handleDeleteCoupon = (couponId) => {
    setCoupons(prev => prev.filter(c => c.id !== couponId));
  };

  // UI Drawers & Modals
  const [cart, setCart] = useState([]);
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [isNotificationsOpen, setIsNotificationsOpen] = useState(false);
  const [isClassroomOpen, setIsClassroomOpen] = useState(false);
  const [isExamSimulatorOpen, setIsExamSimulatorOpen] = useState(false);
  const [isAffiliateModalOpen, setIsAffiliateModalOpen] = useState(false);
  const [isPomodoroOpen, setIsPomodoroOpen] = useState(false);
  const [isCertificateOpen, setIsCertificateOpen] = useState(false);
  const [isThemeCustomizerOpen, setIsThemeCustomizerOpen] = useState(false);
  const [isFilterModalOpen, setIsFilterModalOpen] = useState(false);
  const [isRequestWizardOpen, setIsRequestWizardOpen] = useState(false);
  const [isCreateProfileOpen, setIsCreateProfileOpen] = useState(false);
  const [isLeaderboardOpen, setIsLeaderboardOpen] = useState(false);
  const [selectedRequestProposals, setSelectedRequestProposals] = useState(null);
  const [selectedTeacherModal, setSelectedTeacherModal] = useState(null);
  const [reviewTeacherModal, setReviewTeacherModal] = useState(null);

  // Advanced Filters
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedSubject, setSelectedSubject] = useState('all');
  const [sortOrder, setSortOrder] = useState('featured');
  const [onlineOnlyFilter, setOnlineOnlyFilter] = useState(false);
  const [advancedFilters, setAdvancedFilters] = useState({
    maxRate: 1500,
    minRating: 0,
    verifiedOnly: false,
    minExperience: 0
  });

  // Synchronize visual theme class on document element
  useEffect(() => {
    if (currentTheme === 'light') {
      document.documentElement.classList.add('theme-light');
    } else {
      document.documentElement.classList.remove('theme-light');
    }
  }, [currentTheme]);

  // Sync initial data from Express Backend API when available
  useEffect(() => {
    fetchTeachersFromApi().then(res => {
      if (res.success && res.data && res.data.length > 0) {
        setTeachers(res.data);
      }
    });
    fetchRequestsFromApi().then(res => {
      if (res.success && res.data && res.data.length > 0) {
        setServiceRequests(res.data);
      }
    });
    fetchProductsFromApi().then(res => {
      if (res.success && res.data && res.data.length > 0) {
        setProducts(res.data);
      }
    });
    fetchAnnouncementsFromApi().then(res => {
      if (res.success && res.data && res.data.length > 0) {
        setAnnouncements(res.data);
      }
    });
  }, []);

  // Listen to secret #admin URL route
  useEffect(() => {
    const checkAdminRoute = () => {
      const h = window.location.hash.toLowerCase();
      if (h === '#admin' || h === '#/admin') {
        setPendingAuthRole('admin');
      }
    };
    checkAdminRoute();
    window.addEventListener('hashchange', checkAdminRoute);
    return () => window.removeEventListener('hashchange', checkAdminRoute);
  }, []);

  useEffect(() => {
    localStorage.setItem('odb_purchased_products', JSON.stringify(purchasedProducts));
  }, [purchasedProducts]);

  // Save to local storage on changes
  useEffect(() => {
    localStorage.setItem('odb_teachers', JSON.stringify(teachers));
  }, [teachers]);

  useEffect(() => {
    localStorage.setItem('odb_products', JSON.stringify(products));
  }, [products]);

  useEffect(() => {
    localStorage.setItem('odb_service_requests', JSON.stringify(serviceRequests));
  }, [serviceRequests]);

  // Armut Request Handlers
  const handleCreateRequest = (newReq) => {
    setServiceRequests(prev => [newReq, ...prev]);
    createRequestApi(newReq);
    setCurrentRole('requests');
    showToast('Özel ders talebiniz yayınlandı! Eğitmenlerden teklifler bekleniyor.', 'success');
  };

  const handleAddBidToRequest = (reqId, newBid) => {
    setServiceRequests(prev => prev.map(r => {
      if (r.id === reqId) {
        return {
          ...r,
          bids: [newBid, ...(r.bids || [])]
        };
      }
      return r;
    }));
    postBidApi(reqId, newBid);
    showToast('Fiyat teklifiniz öğrenciye iletildi!', 'success');
  };

  const handleAcceptBid = (reqId, acceptedBid) => {
    setSchedule(prev => [
      {
        day: 'Yeni',
        time: 'Yaklaşan Seans',
        subject: `${acceptedBid.tutorName} (${acceptedBid.price} ₺)`,
        status: 'Onaylandı',
        mode: 'Online Live'
      },
      ...prev
    ]);
    showToast(`${acceptedBid.tutorName} teklifi onaylandı! Ders takviminize eklendi.`, 'success');
  };

  // Location Change
  const handleSaveLocation = (city, district) => {
    setSelectedCity(city);
    setSelectedDistrict(district);
    showToast(`Konum güncellendi: ${city} / ${district}`, 'info');
  };

  // Cart Functions
  const handleAddToCart = (product) => {
    setCart(prev => {
      const existing = prev.find(item => item.id === product.id);
      if (existing) {
        return prev.map(item => item.id === product.id ? { ...item, quantity: (item.quantity || 1) + 1 } : item);
      }
      return [...prev, { ...product, quantity: 1 }];
    });
    showToast(`"${product.name}" alışveriş sepetinize eklendi!`, 'success');
  };

  const handleUpdateCartQuantity = (productId, newQty) => {
    if (newQty <= 0) {
      handleRemoveFromCart(productId);
      return;
    }
    setCart(prev => prev.map(item => item.id === productId ? { ...item, quantity: newQty } : item));
  };

  const handleRemoveFromCart = (productId) => {
    setCart(prev => prev.filter(item => item.id !== productId));
    showToast('Ürün sepetten çıkarıldı.', 'info');
  };

  const handleClearCart = () => {
    setCart([]);
  };

  // Book Lesson Function
  const handleBookLesson = (teacherObj, slotTime) => {
    const newScheduleItem = {
      day: slotTime,
      time: 'Canlı Birebir Seans',
      subject: `${teacherObj.subject} (${teacherObj.name})`,
      status: 'Onaylandı',
      mode: 'Online Live'
    };
    setSchedule(prev => [newScheduleItem, ...prev]);
    createBookingApi({ teacherId: teacherObj.id, teacherName: teacherObj.name, slotTime });
    showToast(`${teacherObj.name} ile ${slotTime} randevunuz oluşturuldu!`, 'success');
  };

  const handleCreateTeacherProfile = (newTeacher) => {
    setTeachers(prev => [newTeacher, ...prev]);
    updateTeacherApi(newTeacher);
    showToast(`Tebrikler ${newTeacher.name}! Öğretmen profiliniz Pazar Yerinde yayınlandı.`, 'success');
  };

  const handleLessonFinished = (newRecord) => {
    setRecordings(prev => [newRecord, ...prev]);
    showToast('Canlı ders kaydı başarıyla ders arşivinize kaydedildi.', 'success');
  };

  const handleSubmitReview = (teacherId, reviewData) => {
    setTeachers(prev => prev.map(t => {
      if (t.id === teacherId) {
        const newCount = t.reviewCount + 1;
        const newRating = parseFloat(((t.rating * t.reviewCount + reviewData.rating) / newCount).toFixed(2));
        return {
          ...t,
          rating: newRating,
          reviewCount: newCount
        };
      }
      return t;
    }));
    postReviewApi(teacherId, reviewData);
    showToast('Değerlendirmeniz ve yorumunuz kaydedildi, teşekkür ederiz!', 'success');
  };

  const handleUpdateTeacher = (idOrUpdated, maybePatch) => {
    setTeachers(prev => {
      let updated;
      if (typeof idOrUpdated === 'string') {
        const existing = prev.find(t => t.id === idOrUpdated);
        updated = { ...existing, ...maybePatch, id: idOrUpdated };
      } else {
        updated = idOrUpdated;
      }
      updateTeacherApi(updated);
      return prev.map(t => t.id === updated.id ? { ...t, ...updated } : t);
    });
    showToast('Eğitmen profili güncellendi.', 'success');
  };

  const handleUpdateProduct = (idOrUpdated, maybePatch) => {
    setProducts(prev => {
      let updated;
      if (typeof idOrUpdated === 'string') {
        const existing = prev.find(p => p.id === idOrUpdated);
        updated = { ...existing, ...maybePatch, id: idOrUpdated };
      } else {
        updated = idOrUpdated;
      }
      return prev.map(p => p.id === updated.id ? { ...p, ...updated } : p);
    });
    showToast('Ürün bilgisi güncellendi.', 'success');
  };

  const handleAddProduct = (newProd) => {
    setProducts(prev => [newProd, ...prev]);
    postProductApi(newProd);
    showToast('Yeni materyal satışa eklendi.', 'success');
  };

  const handleDeleteProduct = (productId) => {
    setProducts(prev => prev.filter(p => p.id !== productId));
    showToast('Ürün mağazadan kaldırıldı.', 'info');
  };

  const handleAddAnnouncement = (newAnn) => {
    setAnnouncements(prev => [newAnn, ...prev]);
    postAnnouncementApi(newAnn);
    showToast('Duyuru yayınlandı.', 'info');
  };

  const filteredTeachers = teachers.filter(t => {
    const matchesCity = t.city.toLowerCase() === selectedCity.toLowerCase() || t.onlineOnly;
    const matchesSearch = searchQuery === '' || 
      t.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      t.subject.toLowerCase().includes(searchQuery.toLowerCase()) ||
      t.bio.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesSubject = selectedSubject === 'all' || t.subject.includes(selectedSubject);
    const matchesOnline = !onlineOnlyFilter || t.onlineOnly;

    const matchesPrice = t.hourlyRate <= advancedFilters.maxRate;
    const matchesRating = t.rating >= advancedFilters.minRating;
    const matchesVerified = !advancedFilters.verifiedOnly || t.verified;
    const matchesExp = t.experienceYears >= advancedFilters.minExperience;

    return matchesCity && matchesSearch && matchesSubject && matchesOnline && matchesPrice && matchesRating && matchesVerified && matchesExp;
  }).sort((a, b) => {
    if (sortOrder === 'elite_first') {
      const weight = { elite: 4, gold: 3, silver: 2, bronze: 1 };
      const leagueA = weight[getTeacherLeague(a).id] || 1;
      const leagueB = weight[getTeacherLeague(b).id] || 1;
      if (leagueB !== leagueA) return leagueB - leagueA;
      return b.rating - a.rating;
    }
    if (sortOrder === 'featured') {
      const weight = { elite: 4, gold: 3, silver: 2, bronze: 1 };
      const leagueA = weight[getTeacherLeague(a).id] || 1;
      const leagueB = weight[getTeacherLeague(b).id] || 1;
      if (b.featuredBoost !== a.featuredBoost) return (b.featuredBoost ? 1 : 0) - (a.featuredBoost ? 1 : 0);
      if (leagueB !== leagueA) return leagueB - leagueA;
      return b.rating - a.rating;
    }
    if (sortOrder === 'rating') return b.rating - a.rating;
    if (sortOrder === 'price_asc') return a.hourlyRate - b.hourlyRate;
    if (sortOrder === 'price_desc') return b.hourlyRate - a.hourlyRate;
    return 0;
  });

  // If in public general role, render the PublicLandingPage component
  if (currentRole === 'general') {
    return (
      <div className="min-h-screen bg-[#F4F0EA] text-[#1C1917] selection:bg-emerald-600 selection:text-white">
        
        {/* Secret Admin Banner if hash #admin */}
        {window.location.hash.includes('admin') && (
          <div className="bg-amber-600 text-slate-950 px-4 py-2 text-xs font-bold flex items-center justify-between z-50">
            <span>🔒 Yönetici Modu Aktif (Gizli Rota: #admin)</span>
            <button onClick={() => { window.location.hash = ''; setCurrentRole('general'); }} className="underline">
              ← Genel Pazara Dön
            </button>
          </div>
        )}

        <PublicLandingPage
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
          searchQuery={searchQuery}
          setSearchQuery={setSearchQuery}
          onOpenLocationModal={() => setIsLocationModalOpen(true)}
          onOpenRequestWizard={() => setIsRequestWizardOpen(true)}
          onOpenCreateProfile={() => setIsCreateProfileOpen(true)}
          onOpenLeaderboard={() => setIsLeaderboardOpen(true)}
          onOpenAuthModal={(role) => setPendingAuthRole(role || 'student')}
          onOpenFilterModal={() => setIsFilterModalOpen(true)}
          onSelectTeacher={(teacher) => setSelectedTeacherModal(teacher)}
          onBookLesson={(teacher, slot) => handleBookLesson(teacher, slot)}
          onOpenReview={(teacher) => setReviewTeacherModal(teacher)}
          onAddToCart={handleAddToCart}
          onAddBidToRequest={handleAddBidToRequest}
          onRoleChange={setCurrentRole}
          onRequestAuthRole={(role) => setPendingAuthRole(role)}
          onOpenClassroom={() => setIsClassroomOpen(true)}
          onOpenExamSimulator={() => setIsExamSimulatorOpen(true)}
          onOpenPomodoro={() => setIsPomodoroOpen(true)}
          onOpenCertificate={() => setIsCertificateOpen(true)}
          onOpenThemeCustomizer={() => setIsThemeCustomizerOpen(true)}
          onOpenAffiliateModal={() => setIsAffiliateModalOpen(true)}
          onOpenCart={() => setIsCartOpen(true)}
          cartCount={cart.reduce((acc, i) => acc + (i.quantity || 1), 0)}
          coupons={coupons}
        />

        {/* MODALS RENDER AREA FOR PUBLIC LANDING PAGE */}
        <TeacherLeaderboardModal
          isOpen={isLeaderboardOpen}
          onClose={() => setIsLeaderboardOpen(false)}
          teachers={teachers}
          onSelectTeacher={(t) => setSelectedTeacherModal(t)}
        />
        <LocationModal
          isOpen={isLocationModalOpen}
          onClose={() => setIsLocationModalOpen(false)}
          selectedCity={selectedCity}
          selectedDistrict={selectedDistrict}
          onSaveLocation={handleSaveLocation}
        />

        <ServiceRequestWizardModal
          isOpen={isRequestWizardOpen}
          onClose={() => setIsRequestWizardOpen(false)}
          selectedCity={selectedCity}
          selectedDistrict={selectedDistrict}
          onRequestCreated={handleCreateRequest}
        />

        <TeacherProfileWizardModal
          isOpen={isCreateProfileOpen}
          onClose={() => setIsCreateProfileOpen(false)}
          onCreateTeacherProfile={handleCreateTeacherProfile}
          selectedCity={selectedCity}
          selectedDistrict={selectedDistrict}
        />

        <TeacherDetailModal
          isOpen={!!selectedTeacherModal}
          onClose={() => setSelectedTeacherModal(null)}
          teacher={selectedTeacherModal}
          onBookLesson={handleBookLesson}
        />

        <TeacherFilterModal
          isOpen={isFilterModalOpen}
          onClose={() => setIsFilterModalOpen(false)}
          maxRate={advancedFilters.maxRate}
          onApplyFilters={(filters) => setAdvancedFilters(filters)}
          onResetFilters={() => setAdvancedFilters({ maxRate: 1500, minRating: 0, verifiedOnly: false, minExperience: 0 })}
        />

        <ReviewModal
          isOpen={!!reviewTeacherModal}
          onClose={() => setReviewTeacherModal(null)}
          teacher={reviewTeacherModal}
          onSubmitReview={handleSubmitReview}
        />

        <CartDrawer
          isOpen={isCartOpen}
          onClose={() => setIsCartOpen(false)}
          cartItems={cart}
          onRemoveFromCart={handleRemoveFromCart}
          onClearCart={handleClearCart}
          onUpdateQuantity={handleUpdateCartQuantity}
          onPurchaseSuccess={(items) => {
            setPurchasedProducts(prev => [...items, ...prev]);
            showToast(`${items.length} materyal Dijital Kütüphanenize eklendi!`, 'success');
          }}
        />

        <VirtualClassroomModal
          isOpen={isClassroomOpen}
          onClose={() => setIsClassroomOpen(false)}
          tutorName={selectedTeacherModal?.name}
          subject={selectedTeacherModal?.subject}
          onLessonEnd={handleLessonFinished}
        />

        <ExamSimulatorModal
          isOpen={isExamSimulatorOpen}
          onClose={() => setIsExamSimulatorOpen(false)}
        />

        <PomodoroTimerModal
          isOpen={isPomodoroOpen}
          onClose={() => setIsPomodoroOpen(false)}
        />

        <AuthModal
          isOpen={!!pendingAuthRole}
          onClose={() => setPendingAuthRole(null)}
          targetRole={pendingAuthRole}
          onAuthSuccess={(role) => {
            setCurrentRole(role);
            setPendingAuthRole(null);
            showToast(`Giriş başarılı: ${role.toUpperCase()} portalına yönlendirildiniz.`, 'success');
          }}
        />

        <ToastNotification toast={toast} onClose={() => setToast(null)} />

      </div>
    );
  }

  // ISOLATED ADMIN PORTAL (ZERO-LEAKAGE RBAC & INDEPENDENT LAYOUT)
  if (currentRole === 'admin') {
    return (
      <div className="min-h-screen bg-slate-950 text-slate-100 font-sans selection:bg-blue-600 selection:text-white">
        <AdminPortal
          currentRole={currentRole}
          onSwitchRole={setCurrentRole}
          onOpenLogin={(role) => setPendingAuthRole(role)}
          teachers={teachers}
          onUpdateTeacher={handleUpdateTeacher}
          products={products}
          onUpdateProduct={handleUpdateProduct}
          announcements={announcements}
          onAddAnnouncement={handleAddAnnouncement}
          onDeleteAnnouncement={(annId) => {
            setAnnouncements(prev => prev.filter(a => a.id !== annId));
            showToast('Duyuru kaldırıldı.', 'info');
          }}
          serviceRequests={serviceRequests}
          onDeleteRequest={(reqId) => {
            setServiceRequests(prev => prev.filter(r => r.id !== reqId));
            showToast('Talep kaldırıldı.', 'info');
          }}
          platformCommission={platformCommission}
          onUpdateCommission={setPlatformCommission}
          coupons={coupons}
          onAddCoupon={handleAddCoupon}
          onUpdateCoupon={handleUpdateCoupon}
          onDeleteCoupon={handleDeleteCoupon}
          showToast={showToast}
        />
        <ToastNotification toast={toast} onClose={() => setToast(null)} />
      </div>
    );
  }

  // DASHBOARD LAYOUT FOR AUTHENTICATED/ROLE-SPECIFIC VIEWS
  return (
    <div className={`min-h-screen transition-colors duration-500 ${
      currentTheme === 'violet' ? 'bg-[#0f0716] text-purple-100' :
      currentTheme === 'emerald' ? 'bg-[#041210] text-teal-100' :
      currentTheme === 'light' ? 'bg-slate-100 text-slate-900' :
      'bg-[#030712] text-slate-100'
    } flex flex-col selection:bg-emerald-500 selection:text-white`}>
      
      {/* Header Navigation */}
      <Navbar
        currentRole={currentRole}
        onRoleChange={setCurrentRole}
        selectedCity={selectedCity}
        selectedDistrict={selectedDistrict}
        onOpenLocationModal={() => setIsLocationModalOpen(true)}
        cartCount={cart.reduce((acc, i) => acc + (i.quantity || 1), 0)}
        onOpenCart={() => setIsCartOpen(true)}
        notificationCount={announcements.length}
        onOpenNotifications={() => setIsNotificationsOpen(true)}
        searchQuery={searchQuery}
        onSearchChange={setSearchQuery}
        onOpenClassroom={() => setIsClassroomOpen(true)}
        onOpenExamSimulator={() => setIsExamSimulatorOpen(true)}
        onOpenAffiliateModal={() => setIsAffiliateModalOpen(true)}
        onOpenThemeCustomizer={() => setIsThemeCustomizerOpen(true)}
        onOpenRequestWizard={() => setIsRequestWizardOpen(true)}
        onOpenCreateProfile={() => setIsCreateProfileOpen(true)}
        onRequestAuthRole={(role) => setPendingAuthRole(role)}
      />

      {/* Main Body Layout */}
      <main className="flex-1 max-w-7xl w-full mx-auto px-4 sm:px-6 lg:px-8 py-6">
        
        {/* ARMUT SERVICE REQUESTS MARKETPLACE */}
        {currentRole === 'requests' && (
          <RequestMarketplace
            requests={serviceRequests}
            onAddBid={handleAddBidToRequest}
            onOpenWizard={() => setIsRequestWizardOpen(true)}
          />
        )}

        {/* ROLE 2: ÖĞRENCİ ÖZEL SAYFASI */}
        {currentRole === 'student' && (
          <StudentDashboard
            goals={goals}
            onAddGoal={(newG) => {
              setGoals(prev => [newG, ...prev]);
              showToast('Yeni eğitim hedefiniz eklendi!', 'success');
            }}
            onUpdateGoalProgress={(goalId, newProgress) => {
              setGoals(prev => prev.map(g => g.id === goalId ? { ...g, progress: newProgress, status: newProgress >= 100 ? 'Tamamlandı' : 'Devam Ediyor' } : g));
            }}
            onDeleteGoal={(goalId) => {
              setGoals(prev => prev.filter(g => g.id !== goalId));
              showToast('Hedef kaldırıldı.', 'info');
            }}
            schedule={schedule}
            recordings={recordings}
            purchasedProducts={purchasedProducts}
            onOpenClassroom={() => setIsClassroomOpen(true)}
            selectedCity={selectedCity}
            selectedDistrict={selectedDistrict}
            onOpenPomodoro={() => setIsPomodoroOpen(true)}
            onOpenCertificate={() => setIsCertificateOpen(true)}
          />
        )}

        {/* ROLE 3: VELİ GİRİŞİ PORTALI */}
        {currentRole === 'parent' && (
          <ParentDashboard
            feedbacks={feedbacks}
            schedule={schedule}
            selectedCity={selectedCity}
          />
        )}

        {/* ROLE 4: ÖĞRETMEN ÖZEL SAYFASI */}
        {currentRole === 'teacher' && (
          <TeacherDashboard
            teachers={teachers}
            teacher={teachers[0]}
            platformCommission={platformCommission}
            onUpdateTeacher={handleUpdateTeacher}
          />
        )}

        {/* ROLE 5: FİRMA / YAYIN EVİ SATIŞ ALANI */}
        {currentRole === 'vendor' && (
          <VendorDashboard
            products={products}
            onAddProduct={handleAddProduct}
            onDeleteProduct={handleDeleteProduct}
          />
        )}

      </main>

      {/* Floating AI Study Coach Widget */}
      <AiTutorWidget />

      {/* Footer */}
      <Footer
        onOpenLocationModal={() => setIsLocationModalOpen(true)}
        onOpenNotifications={() => setIsNotificationsOpen(true)}
        onOpenCart={() => setIsCartOpen(true)}
        onOpenAffiliateModal={() => setIsAffiliateModalOpen(true)}
        onRequestAuthRole={(roleId) => setPendingAuthRole(roleId)}
      />

      {/* Global Toast Notification */}
      <ToastNotification toast={toast} onClose={() => setToast(null)} />

      {/* Modals & Drawers */}
      <AuthModal
        isOpen={!!pendingAuthRole}
        onClose={() => setPendingAuthRole(null)}
        targetRole={pendingAuthRole}
        onAuthSuccess={(authenticatedRole) => {
          setCurrentRole(authenticatedRole);
          setPendingAuthRole(null);
          showToast(`Giriş başarılı: ${authenticatedRole.toUpperCase()} portalına yönlendirildiniz.`, 'success');
        }}
      />

      <ServiceRequestWizardModal
        isOpen={isRequestWizardOpen}
        onClose={() => setIsRequestWizardOpen(false)}
        selectedCity={selectedCity}
        selectedDistrict={selectedDistrict}
        onRequestCreated={handleCreateRequest}
      />

      <IncomingProposalsModal
        isOpen={!!selectedRequestProposals}
        onClose={() => setSelectedRequestProposals(null)}
        request={selectedRequestProposals}
        onAcceptBid={handleAcceptBid}
      />

      <LocationModal
        isOpen={isLocationModalOpen}
        onClose={() => setIsLocationModalOpen(false)}
        selectedCity={selectedCity}
        selectedDistrict={selectedDistrict}
        onSaveLocation={handleSaveLocation}
      />

      <TeacherDetailModal
        teacher={selectedTeacherModal}
        isOpen={!!selectedTeacherModal}
        onClose={() => setSelectedTeacherModal(null)}
        onBookLesson={handleBookLesson}
      />

      <CartDrawer
        isOpen={isCartOpen}
        onClose={() => setIsCartOpen(false)}
        cartItems={cart}
        onRemoveFromCart={handleRemoveFromCart}
        onClearCart={handleClearCart}
        onUpdateQuantity={handleUpdateCartQuantity}
        onPurchaseSuccess={(items) => {
          setPurchasedProducts(prev => [...items, ...prev]);
          showToast(`${items.length} materyal Öğrenci Dijital Kütüphanenize eklendi!`, 'success');
        }}
      />

      <NotificationDrawer
        isOpen={isNotificationsOpen}
        onClose={() => setIsNotificationsOpen(false)}
        announcements={announcements}
        onAddAnnouncement={handleAddAnnouncement}
      />

      <VirtualClassroomModal
        isOpen={isClassroomOpen}
        onClose={() => setIsClassroomOpen(false)}
        tutorName={selectedTeacherModal?.name}
        subject={selectedTeacherModal?.subject}
        onLessonEnd={handleLessonFinished}
      />

      <ExamSimulatorModal
        isOpen={isExamSimulatorOpen}
        onClose={() => setIsExamSimulatorOpen(false)}
      />

      <AffiliateModal
        isOpen={isAffiliateModalOpen}
        onClose={() => setIsAffiliateModalOpen(false)}
      />

      <PomodoroTimerModal
        isOpen={isPomodoroOpen}
        onClose={() => setIsPomodoroOpen(false)}
      />

      <CertificateModal
        isOpen={isCertificateOpen}
        onClose={() => setIsCertificateOpen(false)}
        studentName="Mert Yılmaz"
        courseTitle="2026 YKS Matematik & Geometri İleri Düzey Seansı"
      />

      <ThemeCustomizerModal
        isOpen={isThemeCustomizerOpen}
        onClose={() => setIsThemeCustomizerOpen(false)}
        currentTheme={currentTheme}
        onSelectTheme={setCurrentTheme}
      />

      <TeacherFilterModal
        isOpen={isFilterModalOpen}
        onClose={() => setIsFilterModalOpen(false)}
        maxRate={advancedFilters.maxRate}
        onApplyFilters={(filters) => setAdvancedFilters(filters)}
        onResetFilters={() => setAdvancedFilters({ maxRate: 1500, minRating: 0, verifiedOnly: false, minExperience: 0 })}
      />

      <ReviewModal
        isOpen={!!reviewTeacherModal}
        onClose={() => setReviewTeacherModal(null)}
        teacher={reviewTeacherModal}
        onSubmitReview={handleSubmitReview}
      />

      <TeacherProfileWizardModal
        isOpen={isCreateProfileOpen}
        onClose={() => setIsCreateProfileOpen(false)}
        onCreateTeacherProfile={handleCreateTeacherProfile}
        selectedCity={selectedCity}
        selectedDistrict={selectedDistrict}
      />

      <TeacherLeaderboardModal
        isOpen={isLeaderboardOpen}
        onClose={() => setIsLeaderboardOpen(false)}
        teachers={teachers}
        onSelectTeacher={(t) => setSelectedTeacherModal(t)}
      />

    </div>
  );
}
