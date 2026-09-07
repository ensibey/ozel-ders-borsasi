import express from 'express';
import cors from 'cors';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
const PORT = process.env.PORT || 5000;

app.use(cors());
app.use(express.json({ limit: '5mb' }));

// Serve built frontend assets
app.use(express.static(path.join(__dirname, 'dist')));

// Full In-Memory Database (Seed Data)
let teachers = [
  {
    id: 't1',
    name: 'Prof. Dr. Ahmet Yılmaz',
    title: 'Senior Matematik & Geometri Eğitmeni',
    subject: 'Matematik & Geometri',
    city: 'İstanbul',
    district: 'Kadıköy',
    rating: 4.98,
    reviewCount: 142,
    hourlyRate: 750,
    onlineOnly: false,
    verified: true,
    featuredBoost: true,
    points: 1250,
    referralCode: 'AHMET-MATH-2026',
    invitedCount: 4,
    avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&q=80&w=400',
    bio: 'Boğaziçi Üniversitesi Matematik Bölümü mezunu, 15 yıllık YKS/LGS derece öğrencileri yetiştirme deneyimi. Yeni nesil beceri temelli soruların çözüm tekniği uzmandır.',
    experienceYears: 15,
    education: 'Boğaziçi Üniversitesi - Matematik Doktora',
    availableSlots: ['Pzt 14:00', 'Pzt 16:00', 'Çar 15:00', 'Per 18:00', 'Cmt 10:00', 'Cmt 14:00', 'Paz 11:00'],
    notes: [
      { id: 'n1', title: 'YKS-AYT Türev Çıkmış Soru Kalıpları Özet', date: '2 gün önce', content: 'Türevde teğet denklemi ve maksimum-minimum problemlerinde 3 saniyelik pratik türev kestirme kuralını ekteki notumda derledim.' },
      { id: 'n2', title: 'Geometri 3D Görme Tekniği', date: '1 hafta önce', content: 'Katı cisimlerde alan ve hacim hesaplarken açınım yapmayı alışkanlık haline getirin!' }
    ]
  },
  {
    id: 't2',
    name: 'Ayşe Zeynep Kaya',
    title: 'Fizik & Fen Bilimleri Uzmanı',
    subject: 'Fizik',
    city: 'Ankara',
    district: 'Çankaya',
    rating: 4.92,
    reviewCount: 98,
    hourlyRate: 600,
    onlineOnly: true,
    verified: true,
    featuredBoost: true,
    points: 980,
    referralCode: 'ZEYNEP-FIZIK',
    invitedCount: 3,
    avatar: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&q=80&w=400',
    bio: 'ODTÜ Fizik Öğretmenliği derece mezunuyum. Fizik dersini ezberden uzaklaştırıp animasyonlar, simülasyonlar ve günlük yaşam örnekleriyle sevdiriyorum.',
    experienceYears: 8,
    education: 'ODTÜ - Fizik Öğretmenliği Yüksek Lisans',
    availableSlots: ['Sal 16:00', 'Çar 17:00', 'Cuma 15:00', 'Cmt 13:00', 'Paz 15:00'],
    notes: [
      { id: 'n3', title: 'Elektrik & Manyetizma Sağ El Kuralı Hilesi', date: '3 gün önce', content: 'Sağ el kuralında başparmak akım, 4 parmak manyetik alan yönünü gösterir. Unutanlar için görsel şema profilimde!' }
    ]
  },
  {
    id: 't3',
    name: 'Dr. Mehmet Can Tekin',
    title: 'Eğitim Koçu & Biyoloji Eğitmeni',
    subject: 'Eğitim Koçluğu & Danışmanlık',
    city: 'İzmir',
    district: 'Karşıyaka',
    rating: 4.96,
    reviewCount: 115,
    hourlyRate: 700,
    onlineOnly: false,
    verified: true,
    featuredBoost: false,
    points: 620,
    referralCode: 'MEHMET-KOC',
    invitedCount: 1,
    avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&q=80&w=400',
    bio: 'PDR ve Biyoloji çift anadal. Derece hedefleyen öğrenciler için kişiye özel soru takip çizelgesi, haftalık verim analizi ve kaygı yönetimi koçluğu.',
    experienceYears: 10,
    education: 'Ege Üniversitesi - PDR & Biyoloji',
    availableSlots: ['Pzt 18:00', 'Çar 19:00', 'Cuma 18:00', 'Paz 16:00'],
    notes: [
      { id: 'n4', title: 'Pomodoro vs Derin Çalışma (Deep Work)', date: '5 gün önce', content: 'Sınava 3 ay kala 25 dk çalışıp kesmek odağı böler. 75 dk blok çalışma seanslarına geçiş rehberi yayımlandı.' }
    ]
  },
  {
    id: 't4',
    name: 'Selin Arslan',
    title: 'İngilizce & IELTS / YDT Hazırlık',
    subject: 'İngilizce / Yabancı Dil',
    city: 'İstanbul',
    district: 'Beşiktaş',
    rating: 4.89,
    reviewCount: 76,
    hourlyRate: 550,
    onlineOnly: true,
    verified: true,
    featuredBoost: true,
    points: 850,
    referralCode: 'SELIN-ENGLISH',
    invitedCount: 2,
    avatar: 'https://images.unsplash.com/photo-1580489944761-15a19d654956?auto=format&fit=crop&q=80&w=400',
    bio: 'CELTA Sertifikalı İngilizce Öğretmeni. YDT, IELTS, TOEFL ve Akıcı Konuşma dersleri. Özel dijital interaktif materyallerle hızlı ders akışı.',
    experienceYears: 7,
    education: 'Hacettepe Üniversitesi - İngiliz Dil Bilimi',
    availableSlots: ['Sal 14:00', 'Per 15:00', 'Cmt 11:00', 'Cmt 15:00'],
    notes: [
      { id: 'n5', title: 'YDT Sık Çıkan Phrasal Verbs Listesi 2026', date: 'Dün', content: 'Akademik metinlerde en sık karşılaşılan 50 edatlı fiil ve Türkçe karşılıkları indirilebilir formatta!' }
    ]
  },
  {
    id: 't5',
    name: 'Oğuzhan Demir',
    title: 'Yazılım, Python & Robotik Kodlama',
    subject: 'Yazılım & Robotik Kodlama',
    city: 'Bursa',
    district: 'Nilüfer',
    rating: 4.95,
    reviewCount: 63,
    hourlyRate: 650,
    onlineOnly: true,
    verified: true,
    featuredBoost: false,
    points: 430,
    referralCode: 'OGUZ-CODE',
    invitedCount: 0,
    avatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&q=80&w=400',
    bio: 'Bilgisayar Mühendisi. Çocuklar ve gençler için Python, Web Geliştirme (HTML/CSS/JS/React) ve yapay zeka başlangıç dersleri.',
    experienceYears: 6,
    education: 'İTÜ - Bilgisayar Mühendisliği',
    availableSlots: ['Pzt 19:00', 'Çar 18:00', 'Per 20:00', 'Paz 14:00'],
    notes: [
      { id: 'n6', title: 'Sıfırdan Python ile İlk Oyun Geliştirme', date: '4 gün önce', content: 'Pygame kütüphanesi kullanarak 30 satır kodla ilk yılan oyununuzu nasıl yaparsınız?' }
    ]
  }
];

let serviceRequests = [
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
        rating: 4.98,
        price: 650,
        message: 'Merhaba Mert, YKS Matematik konularında 15 yıllık tecrübemle canlı özel ders verebilirim.',
        createdAt: '10 dk önce',
        avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&q=80&w=400'
      }
    ]
  }
];

let products = [
  {
    id: 'p1',
    name: '2026 YKS Matematik Son 10 Yıl Çıkmış Sorular & Çözüm Fasikülü',
    category: 'Kitap & Deneme',
    vendor: 'Borsa Akademi Yayınları',
    price: 240,
    originalPrice: 320,
    rating: 4.9,
    salesCount: 1420,
    image: 'https://images.unsplash.com/photo-1544716278-ca5e3f4abd8c?auto=format&fit=crop&q=80&w=500',
    description: 'Video çözümlü, tamamı ÖSYM formatına uygun, yeni müfredatla %100 uyumlu soru fasikülü.',
    inStock: true,
    tag: 'Çok Satan'
  },
  {
    id: 'p2',
    name: 'LGS 8. Sınıf Tümü Bir Arada 5\'li Mega Deneme Seti',
    category: 'Deneme Sınavı',
    vendor: 'Derece Yayıncılık',
    price: 180,
    originalPrice: 220,
    rating: 4.8,
    salesCount: 950,
    image: 'https://images.unsplash.com/photo-1497633762265-9d179a990aa6?auto=format&fit=crop&q=80&w=500',
    description: 'Sayısal ve Sözel 2 oturum şeklinde hazırlanmış, optik formlu, anında Türkiye geneli sıralama veren deneme seti.',
    inStock: true,
    tag: 'Fırsat Ürünü'
  },
  {
    id: 'p3',
    name: 'VIP Eğitim Koçluğu & Soru Takip Dergisi (Aylık Abonelik)',
    category: 'Dergi & Planlayıcı',
    vendor: 'DersBorsası Koçluk',
    price: 150,
    originalPrice: 200,
    rating: 4.95,
    salesCount: 680,
    image: 'https://images.unsplash.com/photo-1506784983877-45594efa4cbe?auto=format&fit=crop&q=80&w=500',
    description: 'Haftalık programlama sayfaları, konu takip matrisi, motivasyon makaleleri ve qr kodlu soru çözümleri.',
    inStock: true,
    tag: 'Özel Seri'
  },
  {
    id: 'p4',
    name: 'TYT Fizik-Kimya-Biyoloji Soru Bankası Seti (3 Cilt)',
    category: 'Kitap & Deneme',
    vendor: 'Bilim Teknik Yayınları',
    price: 390,
    originalPrice: 490,
    rating: 4.85,
    salesCount: 1120,
    image: 'https://images.unsplash.com/photo-1532012197267-da84d127e765?auto=format&fit=crop&q=80&w=500',
    description: 'Fen bilimlerinde tam net hedefleyenler için akıllı tahta uyumlu, deneysel ve mantık muhakeme soruları.',
    inStock: true,
    tag: 'Kargo Bedava'
  }
];

let announcements = [
  {
    id: 'a1',
    title: '🚀 Türkiye Geneli Online Ücretsiz YKS-TYT Deneme Sınavı!',
    category: 'Genel Duyuru',
    date: '14 Ağustos 2026',
    target: 'Tüm Kullanıcılar',
    content: 'Bu Cumartesi saat 10:00\'da sistemimizde canlı online Türkiye geneli YKS-TYT simulasyon denemesi yapılacaktır. Katılan tüm öğrencilere detaylı konu analiz karnesi verilecektir.',
    important: true
  },
  {
    id: 'a2',
    title: '👨‍🏫 Öğretmen Profilinizi Öne Çıkarma Görevleri Güncellendi!',
    category: 'Öğretmen Özel',
    date: '12 Ağustos 2026',
    target: 'Öğretmenler',
    content: 'Haftalık boş ders saatlerinizi güncelleyerek ve 3 arkadaşınızı davet ederek profilinizi ana sayfada en üst sıraya taşıyabilir, 500 bonus puan kazanabilirsiniz.',
    important: false
  },
  {
    id: 'a3',
    title: '📦 Yayın Evleri ve Kırtasiyeler İçin Borsa Mağaza Alanı Açıldı!',
    category: 'Firma Özel',
    date: '10 Ağustos 2026',
    target: 'Firmalar',
    content: 'Sertifikalı eğitim satanlar, yayın evleri ve kitap satıcıları direkt komisyonsuz lansman fırsatıyla ürün yüklemeye başlayabilir.',
    important: false
  }
];

let bookings = [];
let orders = [];
let reviews = [];

// REST API Endpoints

// Health Check
app.get('/api/health', (req, res) => {
  res.json({ 
    status: 'OK', 
    uptime: process.uptime(), 
    message: 'Özel Ders Borsası Backend API Express sunucusu sorunsuz çalışıyor.' 
  });
});

// GET /api/teachers
app.get('/api/teachers', (req, res) => {
  res.json({ success: true, count: teachers.length, data: teachers });
});

// POST /api/teachers - Add or update teacher
app.post('/api/teachers', (req, res) => {
  const teacherData = req.body;
  if (!teacherData.name || !teacherData.subject) {
    return res.status(400).json({ success: false, message: 'İsim ve branş gereklidir.' });
  }

  const existingIdx = teachers.findIndex(t => t.id === teacherData.id);
  if (existingIdx !== -1) {
    teachers[existingIdx] = { ...teachers[existingIdx], ...teacherData };
    res.json({ success: true, message: 'Öğretmen profili güncellendi.', data: teachers[existingIdx] });
  } else {
    const newTeacher = { id: 't_' + Date.now(), ...teacherData };
    teachers.unshift(newTeacher);
    res.status(201).json({ success: true, message: 'Yeni öğretmen eklendi.', data: newTeacher });
  }
});

// GET /api/requests - List Armut-style requests
app.get('/api/requests', (req, res) => {
  res.json({ success: true, count: serviceRequests.length, data: serviceRequests });
});

// POST /api/requests - Create a request
app.post('/api/requests', (req, res) => {
  const { subject, level, budgetRange, description } = req.body;
  if (!subject || !description) {
    return res.status(400).json({ success: false, message: 'Lütfen ders branşı ve talep detayını eksiksiz girin.' });
  }

  const newReq = {
    id: 'req_' + Date.now(),
    subject,
    level: level || 'Genel Özel Ders',
    budgetRange: budgetRange || 'Belirtilmedi',
    description,
    studentName: req.body.studentName || 'Öğrenci',
    city: req.body.city || 'İstanbul',
    district: req.body.district || 'Kadıköy',
    createdAt: 'Az önce',
    bids: []
  };

  serviceRequests.unshift(newReq);
  res.status(201).json({ success: true, message: 'Talebiniz başarıyla yayınlandı!', data: newReq });
});

// POST /api/requests/:id/bids - Tutor submits bid
app.post('/api/requests/:id/bids', (req, res) => {
  const { id } = req.params;
  const { price, message, tutorName } = req.body;

  if (!price || !message) {
    return res.status(400).json({ success: false, message: 'Fiyat teklifi ve mesaj alanı zorunludur.' });
  }

  const targetReq = serviceRequests.find(r => r.id === id);
  if (!targetReq) {
    return res.status(404).json({ success: false, message: 'Talep bulunamadı.' });
  }

  const newBid = {
    id: 'bid_' + Date.now(),
    tutorName: tutorName || 'Eğitmen',
    price: Number(price),
    message,
    createdAt: 'Az önce'
  };

  if (!targetReq.bids) targetReq.bids = [];
  targetReq.bids.unshift(newBid);

  res.status(201).json({ success: true, message: 'Teklif öğrenciye başarıyla gönderildi!', data: newBid });
});

// GET /api/products
app.get('/api/products', (req, res) => {
  res.json({ success: true, count: products.length, data: products });
});

// POST /api/products - Create product
app.post('/api/products', (req, res) => {
  const productData = req.body;
  if (!productData.name || !productData.price) {
    return res.status(400).json({ success: false, message: 'Ürün adı ve fiyatı zorunludur.' });
  }

  const newProd = {
    id: 'p_' + Date.now(),
    name: productData.name,
    category: productData.category || 'Kitap & Deneme',
    vendor: productData.vendor || 'Borsa Mağaza',
    price: Number(productData.price),
    originalPrice: Number(productData.price) * 1.2,
    rating: 5.0,
    salesCount: 1,
    image: productData.image || 'https://images.unsplash.com/photo-1544716278-ca5e3f4abd8c?auto=format&fit=crop&q=80&w=500',
    description: productData.description || '',
    inStock: true,
    tag: 'Yeni Ürün'
  };

  products.unshift(newProd);
  res.status(201).json({ success: true, message: 'Ürün başarıyla mağazaya eklendi!', data: newProd });
});

// GET /api/announcements
app.get('/api/announcements', (req, res) => {
  res.json({ success: true, count: announcements.length, data: announcements });
});

// POST /api/announcements - Add announcement
app.post('/api/announcements', (req, res) => {
  const { title, content, target, category } = req.body;
  if (!title || !content) {
    return res.status(400).json({ success: false, message: 'Başlık ve içerik doldurulmalıdır.' });
  }

  const newAnn = {
    id: 'a_' + Date.now(),
    title,
    content,
    category: category || 'Sistem Duyurusu',
    date: 'Şimdi',
    target: target || 'Tüm Kullanıcılar',
    important: req.body.important || false
  };

  announcements.unshift(newAnn);
  res.status(201).json({ success: true, message: 'Duyuru yayınlandı!', data: newAnn });
});

// POST /api/bookings - Book a lesson
app.post('/api/bookings', (req, res) => {
  const booking = {
    id: 'b_' + Date.now(),
    ...req.body,
    createdAt: new Date().toISOString()
  };
  bookings.unshift(booking);
  res.status(201).json({ success: true, message: 'Ders randevusu başarıyla alındı!', data: booking });
});

// POST /api/orders - Submit store order
app.post('/api/orders', (req, res) => {
  const order = {
    id: 'ord_' + Date.now(),
    items: req.body.items || [],
    totalPrice: req.body.totalPrice || 0,
    createdAt: new Date().toISOString()
  };
  orders.unshift(order);
  res.status(201).json({ success: true, message: 'Siparişiniz işlendi!', data: order });
});

// POST /api/reviews - Add review for tutor
app.post('/api/reviews', (req, res) => {
  const { teacherId, rating, comment } = req.body;
  if (!teacherId || !rating) {
    return res.status(400).json({ success: false, message: 'Eğitmen ve puan zorunludur.' });
  }

  const rev = {
    id: 'rev_' + Date.now(),
    teacherId,
    rating: Number(rating),
    comment,
    date: 'Bugün'
  };
  reviews.unshift(rev);

  // Update teacher rating in memory
  const targetTeacher = teachers.find(t => t.id === teacherId);
  if (targetTeacher) {
    const newCount = (targetTeacher.reviewCount || 0) + 1;
    targetTeacher.rating = Number((((targetTeacher.rating || 5.0) * (targetTeacher.reviewCount || 0) + Number(rating)) / newCount).toFixed(2));
    targetTeacher.reviewCount = newCount;
  }

  res.status(201).json({ success: true, message: 'Değerlendirmeniz kaydedildi!', data: rev });
});

// GET /api/stats - Admin Dashboard Summary Stats
app.get('/api/stats', (req, res) => {
  res.json({
    success: true,
    data: {
      totalTeachers: teachers.length,
      totalProducts: products.length,
      totalRequests: serviceRequests.length,
      totalOrders: orders.length,
      totalBookings: bookings.length
    }
  });
});

// SPA Client Routing Fallback
app.get('*', (req, res, next) => {
  if (req.path.startsWith('/api')) {
    return res.status(404).json({ success: false, message: 'Aradığınız API rotası bulunamadı.' });
  }
  const indexPath = path.join(__dirname, 'dist', 'index.html');
  res.sendFile(indexPath, (err) => {
    if (err) next();
  });
});

// Global Express Error Handler Middleware
app.use((err, req, res, next) => {
  console.error('Express Sunucu Hatası:', err);
  res.status(500).json({ 
    success: false, 
    message: 'Sunucu içi hata oluştu.', 
    error: process.env.NODE_ENV === 'development' ? err.message : undefined 
  });
});

app.listen(PORT, () => {
  console.log(`🚀 Özel Ders Borsası Backend API Express sunucusu http://localhost:${PORT} adresinde aktif!`);
});
