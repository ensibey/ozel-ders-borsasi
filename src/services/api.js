// In production (e.g. ozeldersborsasi.com), do not attempt to contact localhost:5000!
// Only query API if a remote VITE_API_URL is configured or running locally during development.
const IS_LOCAL = typeof window !== 'undefined' && (window.location.hostname === 'localhost' || window.location.hostname === '127.0.0.1');
const API_BASE = import.meta.env.VITE_API_URL || (IS_LOCAL ? 'http://localhost:5000/api' : null);
const DEFAULT_TIMEOUT_MS = 8000;

async function fetchWithTimeout(resource, options = {}) {
  if (!API_BASE) {
    throw new Error('API_OFFLINE');
  }

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
      throw new Error('İstek zaman aşımına uğradı (Timeout).');
    }
    throw error;
  }
}

export async function fetchTeachersFromApi(params = {}) {
  if (!API_BASE) return { success: false, data: null, error: null };
  try {
    const query = new URLSearchParams(params).toString();
    const res = await fetchWithTimeout(`${API_BASE}/teachers?${query}`);
    if (!res.ok) throw new Error(`API Sunucu Hatası (${res.status})`);
    const json = await res.json();
    return { success: true, data: json.data, error: null };
  } catch (err) {
    return { success: false, data: null, error: err.message };
  }
}

export async function updateTeacherApi(teacherData) {
  if (!API_BASE) return { success: true, fallback: true, error: null };
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
    return { success: true, fallback: true, error: null };
  }
}

export async function fetchRequestsFromApi() {
  if (!API_BASE) return { success: false, data: null, error: null };
  try {
    const res = await fetchWithTimeout(`${API_BASE}/requests`);
    if (!res.ok) throw new Error(`API Sunucu Hatası (${res.status})`);
    const json = await res.json();
    return { success: true, data: json.data, error: null };
  } catch (err) {
    return { success: false, data: null, error: err.message };
  }
}

export async function createRequestApi(requestData) {
  if (!API_BASE) return { success: true, fallback: true, error: null };
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
    return { success: true, fallback: true, error: null };
  }
}

export async function postBidApi(requestId, bidData) {
  if (!API_BASE) return { success: true, fallback: true, error: null };
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
    return { success: true, fallback: true, error: null };
  }
}

export async function fetchProductsFromApi() {
  if (!API_BASE) return { success: false, data: null, error: null };
  try {
    const res = await fetchWithTimeout(`${API_BASE}/products`);
    if (!res.ok) throw new Error(`API Sunucu Hatası (${res.status})`);
    const json = await res.json();
    return { success: true, data: json.data, error: null };
  } catch (err) {
    return { success: false, data: null, error: err.message };
  }
}

export async function postProductApi(productData) {
  if (!API_BASE) return { success: true, fallback: true, error: null };
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
    return { success: true, fallback: true, error: null };
  }
}

export async function fetchAnnouncementsFromApi() {
  if (!API_BASE) return { success: false, data: null, error: null };
  try {
    const res = await fetchWithTimeout(`${API_BASE}/announcements`);
    if (!res.ok) throw new Error(`API Sunucu Hatası (${res.status})`);
    const json = await res.json();
    return { success: true, data: json.data, error: null };
  } catch (err) {
    return { success: false, data: null, error: err.message };
  }
}

export async function postAnnouncementApi(annData) {
  if (!API_BASE) return { success: true, fallback: true, error: null };
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
    return { success: true, fallback: true, error: null };
  }
}

export async function createBookingApi(bookingData) {
  if (!API_BASE) return { success: true, fallback: true, error: null };
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
    return { success: true, fallback: true, error: null };
  }
}

export async function createOrderApi(orderData) {
  if (!API_BASE) return { success: true, fallback: true, error: null };
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
    return { success: true, fallback: true, error: null };
  }
}

export async function postReviewApi(teacherId, reviewData) {
  if (!API_BASE) return { success: true, fallback: true, error: null };
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
    return { success: true, fallback: true, error: null };
  }
}
