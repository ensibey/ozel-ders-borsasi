// Mock Database for Özel Ders Borsası - Extended Version

export const CITIES_AND_DISTRICTS = {
  "İstanbul": ["Kadıköy", "Beşiktaş", "Üsküdar", "Şişli", "Bakırköy", "Ataşehir", "Maltepe", "Beylikdüzü", "Sarıyer", "Fatih"],
  "Ankara": ["Çankaya", "Yenimahalle", "Keçiören", "Etimesgut", "Mamak", "Gölbaşı", "Sincan"],
  "İzmir": ["Karşıyaka", "Konak", "Bornova", "Buca", "Çeşme", "Alsancak", "Urla"],
  "Bursa": ["Nilüfer", "Osmangazi", "Yıldırım", "Mudanya"],
  "Antalya": ["Muratpaşa", "Konyaaltı", "Kepez", "Alanya"],
  "Adana": ["Seyhan", "Çukurova", "Yüreğir"],
  "Kocaeli": ["İzmit", "Gebze", "Başiskele"],
  "Eskişehir": ["Odunpazarı", "Tepebaşı"],
  "Trabzon": ["Ortahisar", "Akçaabat"],
  "Gaziantep": ["Şahinbey", "Şehitkamil"]
};

export const SUBJECTS = [
  { id: 'math', name: 'Matematik & Geometri', icon: 'Calculator' },
  { id: 'physics', name: 'Fizik', icon: 'Zap' },
  { id: 'chemistry', name: 'Kimya', icon: 'FlaskConical' },
  { id: 'biology', name: 'Biyoloji', icon: 'Dna' },
  { id: 'turkish', name: 'Türkçe & Edebiyat', icon: 'BookOpen' },
  { id: 'english', name: 'İngilizce / Yabancı Dil', icon: 'Globe' },
  { id: 'history', name: 'Tarih & Coğrafya', icon: 'Compass' },
  { id: 'coaching', name: 'Eğitim Koçluğu & Danışmanlık', icon: 'Target' },
  { id: 'coding', name: 'Yazılım & Robotik Kodlama', icon: 'Code' }
];

export const EXAM_QUESTIONS = [
  {
    id: 'q1',
    subject: 'Matematik',
    questionText: 'f(x) = x³ - 3x² + 5 fonksiyonunun x = 2 noktasındaki teğetinin eğimi kaçtır?',
    options: ['A) 0', 'B) 1', 'C) 2', 'D) 3', 'E) 4'],
    correctOption: 0, // A) 0 (f'(x)=3x^2-6x -> f'(2)=12-12=0)
    explanation: "f'(x) = 3x² - 6x. x=2 koyulduğunda f'(2) = 3(4) - 6(2) = 12 - 12 = 0 bulunur."
  },
  {
    id: 'q2',
    subject: 'Fizik',
    questionText: 'Sürtünmesiz yatay düzlemde durmakta olan 4 kg kütleli cisme 20 N büyüklüğünde yatay kuvvet 3 saniye uygulanıyor. Cismin son hızı kaç m/s olur?',
    options: ['A) 5', 'B) 10', 'C) 15', 'D) 20', 'E) 25'],
    correctOption: 2, // C) 15 (a = F/m = 20/4 = 5 m/s2. v = a*t = 5*3 = 15 m/s)
    explanation: 'F = m*a denklemi uyarınca a = 20/4 = 5 m/s². v = a*t = 5*3 = 15 m/s.'
  },
  {
    id: 'q3',
    subject: 'Türkçe',
    questionText: 'Aşağıdaki cümlelerin hangisinde ögelerin dizilişi "Özne - Zarf Tümleci - Yüklem" şeklindedir?',
    options: [
      'A) Ahmet dün akşam bize geldi.',
      'B) Çocuk sessizce odaya girdi.',
      'C) Yağmur aniden bastırdı.',
      'D) Öğretmenimiz tüm soruları çözdü.',
      'E) Kuşlar gökyüzünde özgürce uçuyordu.'
    ],
    correctOption: 2, // C) Yağmur (Özne) aniden (Zarf T.) bastırdı (Yüklem).
    explanation: 'C seçeneğinde: Yağmur (Özne), aniden (Zarf Tümleci), bastırdı (Yüklem).'
  }
];

export const INITIAL_TEACHERS = [
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
      { id: 'n5', title: 'YDT Sık Çıkan Phrasal Verbs Listesi 2026', date: 'Yesterday', content: 'Akademik metinlerde en sık karşılaşılan 50 edatlı fiil ve Türkçe karşılıkları indirilebilir formatta!' }
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

export const INITIAL_PRODUCTS = [
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
    tag: 'Çok Satan',
    samplePreview: {
      hasPreview: true,
      totalPages: 5,
      topic: 'Bölüm 1: Fonksiyonlar ve Grafik Analizi',
      difficulty: 'ÖSYM Düzeyi (%100 Yeni Nesil)',
      videoTeacher: 'Dr. Selin Demir',
      pages: [
        {
          pageNumber: 1,
          type: 'cover_index',
          title: 'İçindekiler & 2026 Soru Dağılım Matrisi',
          subtitle: 'Konulara Göre Çıkmış Soru İstatistiği',
          content: [
            '1. Fonksiyon Kavramı ve Tanım Kümesi (Sayfa 6-18)',
            '2. Birebir ve Örten Fonksiyon İspatları (Sayfa 19-32)',
            '3. Fonksiyonlarda Bileşke ve Ters Fonksiyon (Sayfa 33-48)',
            '4. Parçalı Fonksiyonlar & Mutlak Değer Grafikleri (Sayfa 49-65)',
            '5. ÖSYM Çıkmış Sınav Soruları Analizi (Sayfa 66-80)'
          ]
        },
        {
          pageNumber: 2,
          type: 'question_sample',
          title: 'Örnek Soru 1: Yeni Nesil Modelleme Problemi',
          subtitle: 'AYT Sayısal Seviye 4/5 (Derece Sorusu)',
          questionText: 'Gerçel sayılar kümesinde tanımlı f ve g fonksiyonları için (f o g)(x) = 3g(x) + 4 ve g(2) = 5 olarak veriliyor. Buna göre f(5) değeri kaçtır?',
          options: ['A) 15', 'B) 19', 'C) 22', 'D) 25', 'E) 31'],
          correctAnswer: 'B',
          explanation: 'Bileşke fonksiyon kuralı gereğince f(g(x)) = 3g(x) + 4 formunda g(x) yerine 5 yazıldığında f(5) = 3(5) + 4 = 19 elde edilir.',
          hasVideoSolution: true
        },
        {
          pageNumber: 3,
          type: 'question_sample',
          title: 'Örnek Soru 2: Grafik Okuma & Kök Bağıntısı',
          subtitle: 'ÖSYM 2025 Benzeri Soru Kurgusu',
          questionText: '[-4, 6] aralığında tanımlı f(x) fonksiyonunun grafiğinde f(x) = 2 eşitliğini sağlayan köklerin toplamı incelenmektedir.',
          options: ['A) 2', 'B) 3', 'C) 4', 'D) 5', 'E) 6'],
          correctAnswer: 'C',
          explanation: 'Grafikten f(a)=2 olan noktalar bulunur. Toplam 4 farklı reel kök mevcuttur.',
          hasVideoSolution: true
        },
        {
          pageNumber: 4,
          type: 'concept_card',
          title: '🎯 Kritik ÖSYM Püf Noktası: Grafik Simetrileri',
          subtitle: 'Sınavda Zaman Kazandıran Pratik Notlar',
          content: [
            '• f(-x) = f(x) ise fonksiyon ÇİFT fonksiyondur ve grafiği y-eksenine göre simetriktir.',
            '• f(-x) = -f(x) ise fonksiyon TEK fonksiyondur ve grafiği orijine göre simetriktir.',
            '• ÖSYM son 5 yılda tek/çift fonksiyon özelliklerini integral ve türev ile birleştirerek sormaktadır.'
          ]
        },
        {
          pageNumber: 5,
          type: 'summary_page',
          title: 'Tamamı Renkli Baskı & Akıllı Karekod Sistemi',
          subtitle: 'Bu Kitapta Neler Var?',
          content: [
            '✓ 1.250 Özgün Soru & Tamamı Ayrıntılı Video Çözümlü',
            '✓ Akıllı Tahta & Tablet Uygulama Desteği',
            '✓ MEB 2026 Müfredatı ve ÖSYM Kazanımları ile %100 Uyumlu',
            '✓ Anında Kütüphaneye Ekleme & Hızlı Kargo'
          ]
        }
      ]
    }
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
    tag: 'Fırsat Ürünü',
    samplePreview: {
      hasPreview: true,
      totalPages: 3,
      topic: 'Deneme 1: Sayısal Oturum (Matematik & Fen)',
      difficulty: 'LGS Yeni Nesil Beceri Temelli',
      videoTeacher: 'Ahmet Kaya',
      pages: [
        {
          pageNumber: 1,
          type: 'cover_index',
          title: 'LGS 1. Deneme Sayısal Kitapçığı',
          subtitle: 'Örnek Soru Yapısı ve Süre Bilgisi',
          content: [
            '• Matematik: 20 Yeni Nesil Soru (Grafik ve Tablo Yorumlama)',
            '• Fen Bilimleri: 20 Deney ve Hipotez Sorusu',
            '• Sınav Süresi: 80 Dakika (Optik Formlu)'
          ]
        },
        {
          pageNumber: 2,
          type: 'question_sample',
          title: 'Örnek Matematik Sorusu: Çarpanlar ve Katlar',
          subtitle: 'LGS Mantık Muhakeme Sorusu',
          questionText: 'Bir kenar uzunluğu 120 cm ve 180 cm olan dikdörtgen şeklindeki bir bahçenin etrafına eşit aralıklarla fidan dikilecektir. En az kaç fidan gerekir?',
          options: ['A) 8', 'B) 10', 'C) 12', 'D) 15'],
          correctAnswer: 'B',
          explanation: 'EBOB(120, 180) = 60 cm. Çevre = 2 * (120 + 180) = 600 cm. Fidan sayısı = 600 / 60 = 10 adet.',
          hasVideoSolution: true
        },
        {
          pageNumber: 3,
          type: 'summary_page',
          title: 'Optik Okuma & Türkiye Geneli Karne',
          subtitle: 'Deneme Seti Özellikleri',
          content: [
            '✓ Mobil Uygulama ile Anında Optik Form Okuma',
            '✓ Eksik Kazanım Analiz Raporu',
            '✓ Tüm Soruların Adım Adım Video Çözümleri'
          ]
        }
      ]
    }
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
    // samplePreview is omitted intentionally to show non-preview products
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
    tag: 'Kargo Bedava',
    samplePreview: {
      hasPreview: true,
      totalPages: 3,
      topic: 'Fizik: Hareket ve Kuvvet',
      difficulty: 'TYT Fen ÖSYM Formatı',
      videoTeacher: 'Zeynep Kaya',
      pages: [
        {
          pageNumber: 1,
          type: 'concept_card',
          title: 'Kuvvet ve Newton Hareket Yasaları',
          subtitle: 'Fizik Temel Kavram Kartı',
          content: [
            '1. Eylemsizlik Prensibi (Net Kuvvet = 0 ise cisim durumunu korur)',
            '2. Temel Yasa (F_net = m * a)',
            '3. Etki-Tepki Prensibi (Kuvvetler daima zıt yönlü ve eşit büyüklüktedir)'
          ]
        },
        {
          pageNumber: 2,
          type: 'question_sample',
          title: 'Örnek Soru: Sürtünmeli Düzlemde İvme',
          subtitle: 'TYT Seviye 3/5',
          questionText: 'Kütlesi 4 kg olan bir cisme yatay 20 N kuvvet uygulandığında sürtünme katsayısı k=0.2 ise cismin ivmesi kaç m/s² olur? (g=10 m/s²)',
          options: ['A) 2', 'B) 3', 'C) 4', 'D) 5'],
          correctAnswer: 'B',
          explanation: 'F_s = k * N = 0.2 * 40 = 8 N. F_net = 20 - 8 = 12 N. a = F_net / m = 12 / 4 = 3 m/s².',
          hasVideoSolution: true
        },
        {
          pageNumber: 3,
          type: 'summary_page',
          title: '3 Cilt Tam Set Ayrıcalığı',
          subtitle: 'Fizik + Kimya + Biyoloji',
          content: [
            '✓ 3.000+ Soru & Tamamı Video Çözümlü',
            '✓ ÖSYM Son 15 Yıl Analizi',
            '✓ Ücretsiz Hızlı Kargo'
          ]
        }
      ]
    }
  }
];

export const INITIAL_ANNOUNCEMENTS = [
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

export const INITIAL_STUDENT_GOALS = [
  { id: 'g1', title: 'YKS Matematik TYT Netini 25+ Üstüne Çıkarmak', category: 'Net Hedefi', progress: 75, targetDate: '30 Eylül 2026', status: 'Devam Ediyor' },
  { id: 'g2', title: 'Geometri Üçgenler ve Çokgenler Konularını Bitirmek', category: 'Konu Hedefi', progress: 90, targetDate: '20 Ağustos 2026', status: 'Neredeyse Bitti' },
  { id: 'g3', title: 'Haftada En Az 15 Saat Efektif Ders Çalışmak', category: 'Zaman Hedefi', progress: 60, targetDate: 'Sürekli', status: 'Devam Ediyor' },
  { id: 'g4', title: 'Fizik Elektrik Konusundan 300 Soru Çözmek', category: 'Soru Hedefi', progress: 40, targetDate: '25 Ağustos 2026', status: 'Devam Ediyor' }
];

export const INITIAL_STUDENT_SCHEDULE = [
  { day: 'Pazartesi', time: '16:00 - 17:30', subject: 'Matematik Özel Ders (Ahmet Yılmaz)', status: 'Onaylandı', mode: 'Online Live' },
  { day: 'Salı', time: '18:00 - 20:00', subject: 'Fizik Soru Çözüm Seansı', status: 'Planlandı', mode: 'Bireysel' },
  { day: 'Çarşamba', time: '17:00 - 18:30', subject: 'İngilizce Speaking (Selin Arslan)', status: 'Onaylandı', mode: 'Online Live' },
  { day: 'Perşembe', time: '19:00 - 20:30', subject: 'Geometri Etüd Çalışması', status: 'Planlandı', mode: 'Bireysel' },
  { day: 'Cuma', time: '15:00 - 16:30', subject: 'Fizik Özel Ders (Ayşe Zeynep Kaya)', status: 'Onaylandı', mode: 'Online Live' }
];

export const INITIAL_LESSON_ARCHIVE = [
  {
    id: 'rec1',
    tutorName: 'Prof. Dr. Ahmet Yılmaz',
    subject: 'Matematik & Geometri',
    topic: 'Türev ve İntegral Çıkmış Sorular Analizi',
    date: '10 Ağustos 2026',
    duration: '60 dk',
    videoUrl: 'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/BigBuckBunny.mp4',
    thumbnail: 'https://images.unsplash.com/photo-1635070041078-e363dbe005cb?auto=format&fit=crop&q=80&w=400',
    notesPdf: 'Turev_Notlari_AhmetHoca.pdf'
  },
  {
    id: 'rec2',
    tutorName: 'Ayşe Zeynep Kaya',
    subject: 'Fizik',
    topic: 'Atışlar ve İtme-Momentum Simülasyonu',
    date: '08 Ağustos 2026',
    duration: '50 dk',
    videoUrl: 'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ElephantsDream.mp4',
    thumbnail: 'https://images.unsplash.com/photo-1509228468518-180dd4864904?auto=format&fit=crop&q=80&w=400',
    notesPdf: 'Fizik_Atislar_ZeynepHoca.pdf'
  }
];

export const INITIAL_PARENT_FEEDBACK = [
  {
    id: 'f1',
    studentName: 'Mert (11. Sınıf)',
    tutorName: 'Prof. Dr. Ahmet Yılmaz',
    date: '09 Ağustos 2026',
    rating: 5,
    comment: 'Mert Matematik TYT netlerini 18\'den 24\'e çıkardı. Derslere katılımı son derece düzenli, ev ödevlerini zamanında teslim ediyor.',
    status: 'Devam Ediyor'
  },
  {
    id: 'f2',
    studentName: 'Mert (11. Sınıf)',
    tutorName: 'Ayşe Zeynep Kaya',
    date: '05 Ağustos 2026',
    rating: 5,
    comment: 'Fizikteki önyargısını kırdık. Bir sonraki derste elektrik ve manyetizma konularına giriş yapıyoruz.',
    status: 'Devam Ediyor'
  }
];

export const INITIAL_COUPONS = [
  {
    id: 'coup_1',
    code: 'KITAP30',
    title: 'Tüm Soru Bankası & Denemelerde %30 İndirim',
    storeName: 'Kitapyurdu & Borsa Yayınları',
    storeUrl: 'https://www.kitapyurdu.com',
    discountType: 'percent',
    discountValue: 30,
    category: 'store',
    categoryLabel: 'Kitap & Deneme',
    minAmount: 200,
    expiresAt: '2026-10-30',
    daysLeft: 7,
    usageCount: 489,
    maxUsage: 750,
    description: 'Yayınevlerinin orijinal baskı soru bankası ve branş deneme sınavlarında geçerli sepette anında %30 net indirim sağlar.',
    isActive: true,
    featured: true,
    badge: '🔥 Günün Fırsatı'
  },
  {
    id: 'coup_2',
    code: 'BORSA200',
    title: '500 ₺ Üzeri Siparişlerde Anında 200 ₺ İndirim!',
    storeName: 'Özel Ders Borsası Mağazası',
    storeUrl: '#showcase',
    discountType: 'fixed',
    discountValue: 200,
    category: 'store',
    categoryLabel: 'Pazaryeri & Kitap',
    minAmount: 500,
    expiresAt: '2026-11-15',
    daysLeft: 12,
    usageCount: 342,
    maxUsage: 1000,
    description: '500 TL üzeri tüm kitap, deneme ve eğitim materyali sepetlerinizde ödeme ekranında anında 200 TL nakit indirim uygulanır.',
    isActive: true,
    featured: true,
    badge: '⚡ Süper Fırsat'
  },
  {
    id: 'coup_3',
    code: 'YKS2026',
    title: 'YKS & LGS Hazırlık Yayınlarında %25 İndirim',
    storeName: 'D&R & Borsa Akademi',
    storeUrl: 'https://www.dr.com.tr',
    discountType: 'percent',
    discountValue: 25,
    category: 'store',
    categoryLabel: 'Kitap & Deneme',
    minAmount: 300,
    expiresAt: '2026-11-20',
    daysLeft: 25,
    usageCount: 280,
    maxUsage: 600,
    description: '2026 YKS ve LGS müfredatına tam uyumlu video çözümlü fasikül ve denemelerde geçerli resmi yayıncı indirim kuponu.',
    isActive: true,
    featured: true,
    badge: '📚 Çok Satan'
  },
  {
    id: 'coup_4',
    code: 'YKS25',
    title: 'Tüm YKS & LGS Branşlarında %25 İndirim',
    storeName: 'Borsa Akademi & Sınav Merkezi',
    storeUrl: '#showcase',
    discountType: 'percent',
    discountValue: 25,
    category: 'lesson',
    categoryLabel: 'Sınav Hazırlık',
    minAmount: 400,
    expiresAt: '2026-11-15',
    daysLeft: 28,
    usageCount: 218,
    maxUsage: 500,
    description: 'Matematik, Fizik, Kimya ve Biyoloji YKS hazırlık seanslarında %25 net seans indirimi.',
    isActive: true,
    featured: false,
    badge: '⚡ Fırsat'
  },
  {
    id: 'coup_5',
    code: 'BOGAZICI15',
    title: 'Özel Ders Seanslarında %15 Mezun İndirimi',
    storeName: 'Özel Ders Borsası Eğitmenleri',
    storeUrl: '#showcase',
    discountType: 'percent',
    discountValue: 15,
    category: 'tutor',
    categoryLabel: 'Uzman Kadro',
    minAmount: 600,
    expiresAt: '2026-12-31',
    daysLeft: 45,
    usageCount: 164,
    maxUsage: 300,
    description: 'Boğaziçi, ODTÜ ve İTÜ mezunu kıdemli eğitmenlerle yapacağınız ilk seansta geçerlidir.',
    isActive: true,
    featured: false,
    badge: '🎓 Mezun Kulübü'
  }
];

