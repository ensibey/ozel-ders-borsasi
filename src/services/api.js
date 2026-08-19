const API_BASE = 'http://localhost:5000/api';
const DEFAULT_TIMEOUT_MS = 8000;

async function fetchWithTimeout(resource, options = {}) {
  const { timeout = DEFAULT_TIMEOUT_MS } = options;
  const controller = new AbortController();
  const id = setTimeout(() => controller.abort(), timeout);

  try {
    const response = await fetch(resource, {
      ...options,
      signal: controller.signal
    });
    clearTimeout(id);
    return response;
  } catch (error) {
    clearTimeout(id);
    if (error.name === 'AbortError') {
      throw new Error('İstek zaman aşımına uğradı (Timeout). Lütfen bağlantınızı kontrol edin.');
    }
    throw error;
  }
}

export async function fetchTeachersFromApi(params = {}) {
  try {
    const query = new URLSearchParams(params).toString();
    const res = await fetchWithTimeout(`${API_BASE}/teachers?${query}`);
    if (!res.ok) throw new Error(`API Sunucu Hatası (${res.status})`);
    const json = await res.json();
    return { success: true, data: json.data, error: null };
  } catch (err) {
    console.warn('Backend API offline, yerel veritabanına geçildi:', err.message);
    return { success: false, data: null, error: err.message };
  }
}

export async function updateTeacherApi(teacherData) {
  try {
    const res = await fetchWithTimeout(`${API_BASE}/teachers`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(teacherData)
    });
    if (!res.ok) throw new Error('Öğretmen güncellenemedi.');
    const json = await res.json();
    return { success: true, data: json.data, error: null };
  } catch (err) {
    console.warn('Backend API öğretmen fallback:', err.message);
    return { success: true, fallback: true, error: null };
  }
}

export async function fetchRequestsFromApi() {
  try {
    const res = await fetchWithTimeout(`${API_BASE}/requests`);
    if (!res.ok) throw new Error(`API Sunucu Hatası (${res.status})`);
    const json = await res.json();
    return { success: true, data: json.data, error: null };
  } catch (err) {
    console.warn('Backend API offline, ders talepleri yerel bellekten okundu:', err.message);
    return { success: false, data: null, error: err.message };
  }
}

export async function createRequestApi(requestData) {
  try {
    const res = await fetchWithTimeout(`${API_BASE}/requests`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(requestData)
    });
    if (!res.ok) throw new Error('Talep oluşturulamadı.');
    const json = await res.json();
    return { success: true, data: json.data, error: null };
  } catch (err) {
    console.warn('Backend API talep fallback:', err.message);
    return { success: true, fallback: true, error: null };
  }
}

export async function postBidApi(requestId, bidData) {
  try {
    const res = await fetchWithTimeout(`${API_BASE}/requests/${requestId}/bids`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(bidData)
    });
    if (!res.ok) throw new Error('Teklif iletilemedi.');
    const json = await res.json();
    return { success: true, data: json.data, error: null };
  } catch (err) {
    console.warn('Backend API teklif fallback:', err.message);
    return { success: true, fallback: true, error: null };
  }
}

export async function fetchProductsFromApi() {
  try {
    const res = await fetchWithTimeout(`${API_BASE}/products`);
    if (!res.ok) throw new Error(`API Sunucu Hatası (${res.status})`);
    const json = await res.json();
    return { success: true, data: json.data, error: null };
  } catch (err) {
    console.warn('Backend API offline, ürünler yerel bellekten okundu:', err.message);
    return { success: false, data: null, error: err.message };
  }
}

export async function postProductApi(productData) {
  try {
    const res = await fetchWithTimeout(`${API_BASE}/products`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(productData)
    });
    if (!res.ok) throw new Error('Ürün eklenemedi.');
    const json = await res.json();
    return { success: true, data: json.data, error: null };
  } catch (err) {
    console.warn('Backend API ürün fallback:', err.message);
    return { success: true, fallback: true, error: null };
  }
}

export async function fetchAnnouncementsFromApi() {
  try {
    const res = await fetchWithTimeout(`${API_BASE}/announcements`);
    if (!res.ok) throw new Error(`API Sunucu Hatası (${res.status})`);
    const json = await res.json();
    return { success: true, data: json.data, error: null };
  } catch (err) {
    console.warn('Backend API offline, duyurular yerel bellekten okundu:', err.message);
    return { success: false, data: null, error: err.message };
  }
}

export async function postAnnouncementApi(annData) {
  try {
    const res = await fetchWithTimeout(`${API_BASE}/announcements`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(annData)
    });
    if (!res.ok) throw new Error('Duyuru yayınlanamadı.');
    const json = await res.json();
    return { success: true, data: json.data, error: null };
  } catch (err) {
    console.warn('Backend API duyuru fallback:', err.message);
    return { success: true, fallback: true, error: null };
  }
}

export async function createBookingApi(bookingData) {
  try {
    const res = await fetchWithTimeout(`${API_BASE}/bookings`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(bookingData)
    });
    if (!res.ok) throw new Error('Randevu oluşturulamadı.');
    const json = await res.json();
    return { success: true, data: json.data, error: null };
  } catch (err) {
    console.warn('Backend API randevu fallback:', err.message);
    return { success: true, fallback: true, error: null };
  }
}

export async function createOrderApi(orderData) {
  try {
    const res = await fetchWithTimeout(`${API_BASE}/orders`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(orderData)
    });
    if (!res.ok) throw new Error('Sipariş işlenemedi.');
    const json = await res.json();
    return { success: true, data: json.data, error: null };
  } catch (err) {
    console.warn('Backend API sipariş fallback:', err.message);
    return { success: true, fallback: true, error: null };
  }
}

export async function postReviewApi(teacherId, reviewData) {
  try {
    const res = await fetchWithTimeout(`${API_BASE}/reviews`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ teacherId, ...reviewData })
    });
    if (!res.ok) throw new Error('Yorum iletilemedi.');
    const json = await res.json();
    return { success: true, data: json.data, error: null };
  } catch (err) {
    console.warn('Backend API yorum fallback:', err.message);
    return { success: true, fallback: true, error: null };
  }
}
