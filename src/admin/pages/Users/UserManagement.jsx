import React, { useState, useEffect, useMemo } from 'react';
import { 
  Users, 
  Search, 
  Filter, 
  UserPlus, 
  MoreVertical, 
  Shield, 
  CheckCircle2, 
  Ban, 
  Trash2, 
  Edit, 
  KeyRound, 
  ChevronLeft, 
  ChevronRight, 
  X, 
  Check, 
  Mail, 
  Phone, 
  Sparkles,
  AlertTriangle,
  RotateCcw,
  ShieldCheck,
  UserCheck,
  GraduationCap,
  Store
} from 'lucide-react';
import { useAdminAuth } from '../../context/AdminAuthContext';
import UserFormModal from '../../components/UserFormModal';
import ConfirmActionModal from '../../components/ConfirmActionModal';
import AdminToast from '../../components/AdminToast';

const INITIAL_USERS = [
  {
    id: 'usr_001',
    name: 'Mert Yılmaz',
    email: 'mert.yilmaz@gmail.com',
    phone: '+90 532 111 2233',
    role: 'student',
    status: 'active',
    joinedAt: '12 Ocak 2026',
    avatar: 'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=120&auto=format&fit=crop&q=80',
    details: '12. Sınıf Sayısal YKS öğrencisi'
  },
  {
    id: 'usr_002',
    name: 'Dr. Selin Demir',
    email: 'selin.demir@boun.edu.tr',
    phone: '+90 533 222 3344',
    role: 'teacher',
    status: 'active',
    joinedAt: '20 Aralık 2025',
    avatar: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=120&auto=format&fit=crop&q=80',
    details: 'Boğaziçi Üni. Matematik Doktora'
  },
  {
    id: 'usr_003',
    name: 'Ayşe Kaya',
    email: 'ayse.kaya@gmail.com',
    phone: '+90 535 333 4455',
    role: 'parent',
    status: 'active',
    joinedAt: '04 Şubat 2026',
    avatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=120&auto=format&fit=crop&q=80',
    details: '2 Öğrenci Velisi'
  },
  {
    id: 'usr_004',
    name: 'Eğitim Vadisi Yayınları',
    email: 'kurumsal@egitimvadisi.com',
    phone: '+90 212 444 5566',
    role: 'vendor',
    status: 'active',
    joinedAt: '15 Kasım 2025',
    avatar: 'https://images.unsplash.com/photo-1560179707-f14e90ef3623?w=120&auto=format&fit=crop&q=80',
    details: 'Resmi Yayınevi & İçerik Üreticisi'
  },
  {
    id: 'usr_005',
    name: 'Kemal Aksoy',
    email: 'kemal.aksoy@yahoo.com',
    phone: '+90 542 555 6677',
    role: 'student',
    status: 'suspended',
    joinedAt: '01 Mart 2026',
    avatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=120&auto=format&fit=crop&q=80',
    details: 'Şüpheli aktivite nedeniyle askıya alındı'
  },
  {
    id: 'usr_006',
    name: 'Prof. Dr. Levent Öz',
    email: 'levent.oz@itu.edu.tr',
    phone: '+90 532 999 8877',
    role: 'teacher',
    status: 'active',
    joinedAt: '10 Ocak 2026',
    avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=120&auto=format&fit=crop&q=80',
    details: 'İTÜ Fizik Mühendisliği'
  }
];

export default function UserManagement({ teachers = [] }) {
  const { logAction } = useAdminAuth();

  // Toast state
  const [toast, setToast] = useState(null);
  const showToast = (message, type = 'success') => {
    setToast({ message, type });
  };

  // Local users list
  const [users, setUsers] = useState(() => {
    try {
      const saved = localStorage.getItem('odb_admin_users_list');
      return saved ? JSON.parse(saved) : INITIAL_USERS;
    } catch (e) {
      return INITIAL_USERS;
    }
  });

  useEffect(() => {
    try {
      localStorage.setItem('odb_admin_users_list', JSON.stringify(users));
    } catch (e) {}
  }, [users]);

  // Filters & Search State
  const [searchQuery, setSearchQuery] = useState('');
  const [debouncedQuery, setDebouncedQuery] = useState('');
  const [roleFilter, setRoleFilter] = useState('ALL');
  const [statusFilter, setStatusFilter] = useState('ALL');
  const [isLoading, setIsLoading] = useState(false);

  // Pagination State
  const [currentPage, setCurrentPage] = useState(1);
  const [pageSize, setPageSize] = useState(5);

  // Selection & Action Dropdown
  const [selectedUserIds, setSelectedUserIds] = useState([]);
  const [activeActionMenuId, setActiveActionMenuId] = useState(null);

  // User Form Modal State
  const [isFormModalOpen, setIsFormModalOpen] = useState(false);
  const [editingUser, setEditingUser] = useState(null);
  const [isFormSubmitting, setIsFormSubmitting] = useState(false);

  // Confirmation Modal State
  const [confirmModal, setConfirmModal] = useState({
    isOpen: false,
    title: '',
    description: '',
    targetName: '',
    confirmText: '',
    variant: 'danger',
    onConfirm: null,
    isLoading: false
  });

  // Debounced Search Handler
  useEffect(() => {
    setIsLoading(true);
    const handler = setTimeout(() => {
      setDebouncedQuery(searchQuery);
      setIsLoading(false);
      setCurrentPage(1);
    }, 300);
    return () => clearTimeout(handler);
  }, [searchQuery]);

  // Filtered and Paginated dataset
  const filteredUsers = useMemo(() => {
    return users.filter(user => {
      const matchesRole = roleFilter === 'ALL' || user.role === roleFilter;
      const matchesStatus = statusFilter === 'ALL' || user.status === statusFilter;
      const matchesSearch = debouncedQuery === '' || 
        user.name.toLowerCase().includes(debouncedQuery.toLowerCase()) ||
        user.email.toLowerCase().includes(debouncedQuery.toLowerCase()) ||
        (user.phone && user.phone.includes(debouncedQuery));
      return matchesRole && matchesStatus && matchesSearch;
    });
  }, [users, roleFilter, statusFilter, debouncedQuery]);

  const totalPages = Math.ceil(filteredUsers.length / pageSize) || 1;
  const paginatedUsers = useMemo(() => {
    const start = (currentPage - 1) * pageSize;
    return filteredUsers.slice(start, start + pageSize);
  }, [filteredUsers, currentPage, pageSize]);

  // Checkbox handlers
  const handleSelectAll = (e) => {
    if (e.target.checked) {
      setSelectedUserIds(paginatedUsers.map(u => u.id));
    } else {
      setSelectedUserIds([]);
    }
  };

  const handleSelectUser = (id) => {
    setSelectedUserIds(prev => 
      prev.includes(id) ? prev.filter(item => item !== id) : [...prev, id]
    );
  };

  // 1. Submit User Form (Add / Edit)
  const handleSaveUser = (formData) => {
    setIsFormSubmitting(true);

    setTimeout(() => {
      if (editingUser) {
        // Edit existing
        setUsers(prev => prev.map(u => u.id === editingUser.id ? { ...u, ...formData } : u));
        logAction(
          'USER_UPDATED',
          'USER_MANAGEMENT',
          `${formData.name} (${editingUser.id})`,
          `Kullanıcı profil bilgileri ve ${formData.role.toUpperCase()} yetkisi güncellendi.`,
          'info'
        );
        showToast(`"${formData.name}" kullanıcısı başarıyla güncellendi.`, 'success');
      } else {
        // Create new
        const newUser = {
          id: `usr_${Date.now().toString().slice(-4)}`,
          name: formData.name,
          email: formData.email,
          phone: formData.phone || '+90 555 000 0000',
          role: formData.role,
          status: formData.status,
          joinedAt: 'Bugün',
          avatar: `https://api.dicebear.com/7.x/avataaars/svg?seed=${encodeURIComponent(formData.name)}`,
          details: formData.details || 'Yönetici tarafından tanımlandı'
        };
        setUsers(prev => [newUser, ...prev]);
        logAction(
          'USER_CREATED',
          'USER_MANAGEMENT',
          `${newUser.name} (${newUser.email})`,
          `Yeni ${newUser.role.toUpperCase()} kullanıcısı oluşturuldu.`,
          'success'
        );
        showToast(`Yeni ${newUser.role.toUpperCase()} kullanıcısı başarıyla oluşturuldu!`, 'success');
      }

      setIsFormSubmitting(false);
      setIsFormModalOpen(false);
      setEditingUser(null);
    }, 450);
  };

  // 2. Toggle Status (Suspend / Activate)
  const handleToggleStatus = (user) => {
    const nextStatus = user.status === 'active' ? 'suspended' : 'active';
    setUsers(prev => prev.map(u => u.id === user.id ? { ...u, status: nextStatus } : u));

    logAction(
      nextStatus === 'suspended' ? 'USER_SUSPENDED' : 'USER_ACTIVATED',
      'USER_MANAGEMENT',
      `${user.name} (${user.email})`,
      `Hesap durumu "${nextStatus.toUpperCase()}" yapıldı.`,
      nextStatus === 'suspended' ? 'warning' : 'success'
    );

    showToast(
      nextStatus === 'suspended' 
        ? `"${user.name}" hesabı askıya alındı.` 
        : `"${user.name}" hesabı aktifleştirildi.`,
      nextStatus === 'suspended' ? 'warning' : 'success'
    );
    setActiveActionMenuId(null);
  };

  // 3. Reset Password
  const handleResetPassword = (user) => {
    logAction(
      'PASSWORD_RESET_TRIGGERED',
      'SECURITY',
      `${user.name} (${user.email})`,
      `Kullanıcıya tek kullanımlık güvenli şifre sıfırlama linki iletildi.`,
      'info'
    );
    showToast(`Şifre sıfırlama bağlantısı ${user.email} adresine gönderildi.`, 'info');
    setActiveActionMenuId(null);
  };

  // 4. Delete Single User with Confirm Modal
  const promptDeleteUser = (user) => {
    setActiveActionMenuId(null);
    setConfirmModal({
      isOpen: true,
      title: 'Kullanıcıyı Kalıcı Olarak Sil',
      description: 'Bu kullanıcının hesabı, kayıtları ve veritabanı izinleri tamamen silinecektir. Bu işlem geri alınamaz.',
      targetName: `${user.name} (${user.email})`,
      confirmText: 'Evet, Kalıcı Olarak Sil',
      variant: 'danger',
      onConfirm: () => {
        setUsers(prev => prev.filter(u => u.id !== user.id));
        setSelectedUserIds(prev => prev.filter(id => id !== user.id));
        logAction(
          'USER_DELETED',
          'USER_MANAGEMENT',
          `${user.name} (${user.email})`,
          `Kullanıcı veritabanından kalıcı olarak silindi.`,
          'danger'
        );
        showToast(`"${user.name}" kullanıcısı kalıcı olarak silindi.`, 'error');
        setConfirmModal(prev => ({ ...prev, isOpen: false }));
      }
    });
  };

  // 5. Bulk Delete with Confirm Modal
  const promptBulkDelete = () => {
    setConfirmModal({
      isOpen: true,
      title: 'Toplu Kullanıcı Silme',
      description: `Seçilen ${selectedUserIds.length} kullanıcı hesabı kalıcı olarak silinecektir.`,
      targetName: `${selectedUserIds.length} Adet Kullanıcı Kaydı`,
      confirmText: 'Tümünü Kalıcı Olarak Sil',
      variant: 'danger',
      onConfirm: () => {
        setUsers(prev => prev.filter(u => !selectedUserIds.includes(u.id)));
        logAction('BULK_DELETE', 'USER_MANAGEMENT', `${selectedUserIds.length} Kullanıcı`, `Seçilen kullanıcılar topluca silindi.`, 'danger');
        showToast(`${selectedUserIds.length} kullanıcı kalıcı olarak silindi.`, 'error');
        setSelectedUserIds([]);
        setConfirmModal(prev => ({ ...prev, isOpen: false }));
      }
    });
  };

  const handleBulkSuspend = () => {
    setUsers(prev => prev.map(u => selectedUserIds.includes(u.id) ? { ...u, status: 'suspended' } : u));
    logAction('BULK_SUSPEND', 'USER_MANAGEMENT', `${selectedUserIds.length} Kullanıcı`, `Seçilen kullanıcılar topluca askıya alındı.`, 'warning');
    showToast(`${selectedUserIds.length} kullanıcı başarıyla askıya alındı.`, 'warning');
    setSelectedUserIds([]);
  };

  const getRoleBadge = (role) => {
    switch(role) {
      case 'admin':
        return (
          <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-xl text-[11px] font-bold bg-rose-500/10 text-rose-400 border border-rose-500/20">
            <Shield className="w-3 h-3" /> Yönetici
          </span>
        );
      case 'teacher':
        return (
          <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-xl text-[11px] font-bold bg-purple-500/10 text-purple-400 border border-purple-500/20">
            <GraduationCap className="w-3 h-3" /> Eğitmen
          </span>
        );
      case 'parent':
        return (
          <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-xl text-[11px] font-bold bg-emerald-500/10 text-emerald-400 border border-emerald-500/20">
            <UserCheck className="w-3 h-3" /> Veli
          </span>
        );
      case 'vendor':
        return (
          <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-xl text-[11px] font-bold bg-amber-500/10 text-amber-400 border border-amber-500/20">
            <Store className="w-3 h-3" /> Yayıncı
          </span>
        );
      default:
        return (
          <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-xl text-[11px] font-bold bg-blue-500/10 text-blue-400 border border-blue-500/20">
            <Users className="w-3 h-3" /> Öğrenci
          </span>
        );
    }
  };

  return (
    <div className="space-y-6">
      {/* Toast Notification Mount */}
      <AdminToast toast={toast} onClose={() => setToast(null)} />

      {/* Header */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-xl font-black text-white tracking-tight flex items-center gap-2">
            <Users className="w-5 h-5 text-blue-400" />
            Kullanıcı & Kimlik Yönetim Masası
          </h1>
          <p className="text-xs text-slate-400 mt-0.5">
            Sistem genelindeki tüm hesapların rol, durum ve güvenlik yetkilendirmesini denetleyin.
          </p>
        </div>

        <div className="flex items-center gap-2 self-stretch sm:self-auto">
          <button
            onClick={() => {
              const headers = "ID,İsim,E-posta,Telefon,Rol,Durum,Kayıt Tarihi\n";
              const rows = filteredUsers.map(u => `"${u.id}","${u.name}","${u.email}","${u.phone || ''}","${u.role}","${u.status}","${u.joinedAt}"`).join("\n");
              const blob = new Blob(["\uFEFF" + headers + rows], { type: 'text/csv;charset=utf-8;' });
              const url = URL.createObjectURL(blob);
              const link = document.createElement("a");
              link.setAttribute("href", url);
              link.setAttribute("download", `kullanici_listesi_${Date.now()}.csv`);
              document.body.appendChild(link);
              link.click();
              document.body.removeChild(link);
            }}
            className="px-3.5 py-2.5 bg-slate-800 hover:bg-slate-700 text-slate-300 hover:text-white font-bold text-xs rounded-xl border border-slate-700 transition-all flex items-center gap-1.5 justify-center"
          >
            <span>📥 CSV Dışa Aktar</span>
          </button>

          <button
            onClick={() => {
              setEditingUser(null);
              setIsFormModalOpen(true);
            }}
            className="px-4 py-2.5 bg-blue-600 hover:bg-blue-500 text-white font-bold text-xs rounded-xl shadow-lg shadow-blue-600/20 transition-all flex items-center gap-2 justify-center"
          >
            <UserPlus className="w-4 h-4" />
            <span>Yeni Kullanıcı Ekle</span>
          </button>
        </div>
      </div>

      {/* Toolbar: Search, Filters & Bulk Actions */}
      <div className="p-4 sm:p-5 rounded-3xl bg-slate-900/90 border border-slate-800 shadow-xl space-y-4">
        <div className="flex flex-col lg:flex-row items-stretch lg:items-center justify-between gap-3">
          {/* Debounced Search Input */}
          <div className="relative flex-1 min-w-[240px]">
            <Search className="w-4 h-4 text-slate-500 absolute left-3.5 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="İsim, e-posta veya telefon ile ara..."
              className="w-full bg-slate-950/80 border border-slate-800 focus:border-blue-500 rounded-xl pl-9 pr-8 py-2 text-xs text-slate-200 placeholder-slate-500 focus:outline-none transition-all shadow-inner"
            />
            {searchQuery && (
              <button 
                onClick={() => setSearchQuery('')}
                className="absolute right-2.5 top-1/2 -translate-y-1/2 text-slate-400 hover:text-white"
              >
                <X className="w-3.5 h-3.5" />
              </button>
            )}
          </div>

          {/* Filter Dropdowns */}
          <div className="flex flex-wrap items-center gap-2">
            {/* Role Filter */}
            <div className="flex items-center gap-1.5 bg-slate-950/80 border border-slate-800 rounded-xl px-2.5 py-1.5 text-xs text-slate-300">
              <Filter className="w-3.5 h-3.5 text-slate-500" />
              <span className="text-slate-500 font-semibold text-[11px]">Rol:</span>
              <select
                value={roleFilter}
                onChange={(e) => {
                  setRoleFilter(e.target.value);
                  setCurrentPage(1);
                }}
                className="bg-transparent text-slate-200 font-bold focus:outline-none cursor-pointer text-xs"
              >
                <option value="ALL" className="bg-slate-900">Tüm Roller</option>
                <option value="admin" className="bg-slate-900">Yönetici (Admin)</option>
                <option value="teacher" className="bg-slate-900">Eğitmen</option>
                <option value="student" className="bg-slate-900">Öğrenci</option>
                <option value="parent" className="bg-slate-900">Veli</option>
                <option value="vendor" className="bg-slate-900">Yayıncı / Vendor</option>
              </select>
            </div>

            {/* Status Filter */}
            <div className="flex items-center gap-1.5 bg-slate-950/80 border border-slate-800 rounded-xl px-2.5 py-1.5 text-xs text-slate-300">
              <span className="text-slate-500 font-semibold text-[11px]">Durum:</span>
              <select
                value={statusFilter}
                onChange={(e) => {
                  setStatusFilter(e.target.value);
                  setCurrentPage(1);
                }}
                className="bg-transparent text-slate-200 font-bold focus:outline-none cursor-pointer text-xs"
              >
                <option value="ALL" className="bg-slate-900">Tüm Durumlar</option>
                <option value="active" className="bg-slate-900">Aktif Hesaplar</option>
                <option value="suspended" className="bg-slate-900">Askıya Alınmış</option>
              </select>
            </div>

            {/* Reset Button */}
            {(roleFilter !== 'ALL' || statusFilter !== 'ALL' || searchQuery !== '') && (
              <button
                onClick={() => {
                  setRoleFilter('ALL');
                  setStatusFilter('ALL');
                  setSearchQuery('');
                }}
                className="p-2 bg-slate-800 hover:bg-slate-700 text-slate-300 rounded-xl text-xs flex items-center gap-1 transition-colors"
                title="Filtreleri Sıfırla"
              >
                <RotateCcw className="w-3.5 h-3.5" />
              </button>
            )}
          </div>
        </div>

        {/* Selected Items Bulk Action Bar */}
        {selectedUserIds.length > 0 && (
          <div className="p-3 bg-blue-950/40 border border-blue-800/60 rounded-2xl flex flex-wrap items-center justify-between gap-3 text-xs animate-in fade-in slide-in-from-top-1">
            <span className="font-bold text-blue-300">
              {selectedUserIds.length} kullanıcı seçildi
            </span>

            <div className="flex items-center gap-2">
              <button
                onClick={handleBulkSuspend}
                className="px-3 py-1.5 bg-amber-500/10 hover:bg-amber-500/20 text-amber-300 border border-amber-500/30 rounded-xl font-bold transition-all flex items-center gap-1.5"
              >
                <Ban className="w-3.5 h-3.5" /> Toplu Askıya Al
              </button>
              <button
                onClick={promptBulkDelete}
                className="px-3 py-1.5 bg-rose-500/10 hover:bg-rose-500/20 text-rose-400 border border-rose-500/30 rounded-xl font-bold transition-all flex items-center gap-1.5"
              >
                <Trash2 className="w-3.5 h-3.5" /> Toplu Sil
              </button>
            </div>
          </div>
        )}

        {/* Data Table */}
        <div className="overflow-x-auto rounded-2xl border border-slate-800/80">
          <table className="w-full text-left border-collapse select-none">
            <thead>
              <tr className="bg-slate-950/70 border-b border-slate-800 text-[11px] font-bold text-slate-400 uppercase tracking-wider">
                <th className="py-3.5 px-4 w-10">
                  <input
                    type="checkbox"
                    onChange={handleSelectAll}
                    checked={paginatedUsers.length > 0 && selectedUserIds.length === paginatedUsers.length}
                    className="rounded bg-slate-900 border-slate-700 text-blue-600 focus:ring-0 cursor-pointer"
                  />
                </th>
                <th className="py-3.5 px-4">Kullanıcı Bilgisi</th>
                <th className="py-3.5 px-4">Rol & Yetki</th>
                <th className="py-3.5 px-4">Hesap Durumu</th>
                <th className="py-3.5 px-4">Kayıt Tarihi</th>
                <th className="py-3.5 px-4 text-right">İşlemler</th>
              </tr>
            </thead>

            <tbody className="divide-y divide-slate-800/40 text-xs">
              {/* Skeleton State */}
              {isLoading ? (
                Array.from({ length: 4 }).map((_, idx) => (
                  <tr key={idx} className="animate-pulse">
                    <td className="py-4 px-4"><div className="w-4 h-4 bg-slate-800 rounded"></div></td>
                    <td className="py-4 px-4"><div className="w-32 h-4 bg-slate-800 rounded"></div></td>
                    <td className="py-4 px-4"><div className="w-16 h-4 bg-slate-800 rounded"></div></td>
                    <td className="py-4 px-4"><div className="w-12 h-4 bg-slate-800 rounded"></div></td>
                    <td className="py-4 px-4"><div className="w-20 h-4 bg-slate-800 rounded"></div></td>
                    <td className="py-4 px-4"><div className="w-8 h-4 bg-slate-800 rounded ml-auto"></div></td>
                  </tr>
                ))
              ) : filteredUsers.length === 0 ? (
                /* Empty State */
                <tr>
                  <td colSpan={6} className="py-12 text-center text-slate-400">
                    <div className="max-w-xs mx-auto space-y-2">
                      <div className="w-12 h-12 bg-slate-800/60 rounded-2xl flex items-center justify-center mx-auto text-slate-500">
                        <Users className="w-6 h-6" />
                      </div>
                      <p className="font-bold text-white text-sm">Kullanıcı Bulunamadı</p>
                      <p className="text-xs text-slate-400">Arama veya filtre kriterlerinize uyan kayıt mevcut değil.</p>
                      <button
                        onClick={() => {
                          setRoleFilter('ALL');
                          setStatusFilter('ALL');
                          setSearchQuery('');
                        }}
                        className="mt-2 px-3 py-1.5 bg-slate-800 hover:bg-slate-700 text-slate-200 text-xs font-bold rounded-xl"
                      >
                        Filtreleri Temizle
                      </button>
                    </div>
                  </td>
                </tr>
              ) : (
                /* Paginated Rows */
                paginatedUsers.map((user) => {
                  const isSelected = selectedUserIds.includes(user.id);
                  const isMenuOpen = activeActionMenuId === user.id;

                  return (
                    <tr 
                      key={user.id} 
                      className={`hover:bg-slate-800/30 transition-colors ${isSelected ? 'bg-blue-950/20' : ''}`}
                    >
                      {/* Checkbox */}
                      <td className="py-3 px-4">
                        <input
                          type="checkbox"
                          checked={isSelected}
                          onChange={() => handleSelectUser(user.id)}
                          className="rounded bg-slate-900 border-slate-700 text-blue-600 focus:ring-0 cursor-pointer"
                        />
                      </td>

                      {/* User Info */}
                      <td className="py-3 px-4">
                        <div className="flex items-center gap-3">
                          <img 
                            src={user.avatar} 
                            alt={user.name} 
                            className="w-10 h-10 rounded-2xl object-cover ring-2 ring-slate-800 shrink-0" 
                          />
                          <div className="min-w-0">
                            <div className="font-bold text-white truncate flex items-center gap-1.5">
                              {user.name}
                            </div>
                            <div className="text-slate-400 font-mono text-[11px] flex items-center gap-2">
                              <span>{user.email}</span>
                              {user.phone && <span className="text-slate-400">• {user.phone}</span>}
                            </div>
                          </div>
                        </div>
                      </td>

                      {/* Role */}
                      <td className="py-3 px-4">
                        {getRoleBadge(user.role)}
                      </td>

                      {/* Status */}
                      <td className="py-3 px-4">
                        {user.status === 'active' ? (
                          <span className="inline-flex items-center gap-1.5 text-emerald-400 font-bold text-xs">
                            <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse"></span>
                            Aktif
                          </span>
                        ) : (
                          <span className="inline-flex items-center gap-1.5 text-rose-400 font-bold text-xs">
                            <span className="w-1.5 h-1.5 rounded-full bg-rose-400"></span>
                            Askıda
                          </span>
                        )}
                      </td>

                      {/* Reg Date */}
                      <td className="py-3 px-4 text-slate-400 text-xs font-mono">
                        {user.joinedAt}
                      </td>

                      {/* Actions */}
                      <td className="py-3 px-4 text-right relative">
                        <div className="inline-block text-left">
                          <button
                            onClick={() => setActiveActionMenuId(isMenuOpen ? null : user.id)}
                            className="p-1.5 text-slate-400 hover:text-white hover:bg-slate-800 rounded-xl transition-colors"
                          >
                            <MoreVertical className="w-4 h-4" />
                          </button>

                          {/* Dropdown Menu */}
                          {isMenuOpen && (
                            <div 
                              className="absolute right-4 top-10 w-48 bg-slate-900 border border-slate-800 rounded-2xl shadow-2xl p-1.5 z-40 space-y-1 animate-in fade-in zoom-in-95"
                              onMouseLeave={() => setActiveActionMenuId(null)}
                            >
                              <button
                                onClick={() => {
                                  setEditingUser(user);
                                  setIsFormModalOpen(true);
                                  setActiveActionMenuId(null);
                                }}
                                className="w-full p-2 hover:bg-slate-800 text-slate-300 hover:text-white rounded-xl text-xs font-semibold flex items-center gap-2 transition-colors"
                              >
                                <Edit className="w-3.5 h-3.5 text-blue-400" />
                                <span>Profili Düzenle</span>
                              </button>

                              <button
                                onClick={() => handleResetPassword(user)}
                                className="w-full p-2 hover:bg-slate-800 text-slate-300 hover:text-white rounded-xl text-xs font-semibold flex items-center gap-2 transition-colors"
                              >
                                <KeyRound className="w-3.5 h-3.5 text-amber-400" />
                                <span>Şifre Sıfırlama Gönder</span>
                              </button>

                              <button
                                onClick={() => handleToggleStatus(user)}
                                className="w-full p-2 hover:bg-slate-800 text-slate-300 hover:text-white rounded-xl text-xs font-semibold flex items-center gap-2 transition-colors"
                              >
                                {user.status === 'active' ? (
                                  <>
                                    <Ban className="w-3.5 h-3.5 text-amber-400" />
                                    <span>Hesabı Askıya Al</span>
                                  </>
                                ) : (
                                  <>
                                    <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400" />
                                    <span>Hesabı Aktifleştir</span>
                                  </>
                                )}
                              </button>

                              <div className="border-t border-slate-800 my-1"></div>

                              <button
                                onClick={() => promptDeleteUser(user)}
                                className="w-full p-2 hover:bg-rose-500/10 text-rose-400 rounded-xl text-xs font-bold flex items-center gap-2 transition-colors"
                              >
                                <Trash2 className="w-3.5 h-3.5" />
                                <span>Kullanıcıyı Sil</span>
                              </button>
                            </div>
                          )}
                        </div>
                      </td>
                    </tr>
                  );
                })
              )}
            </tbody>
          </table>
        </div>

        {/* Pagination Controls */}
        <div className="pt-2 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-slate-400">
          <div className="flex items-center gap-2">
            <span>Sayfa başına göster:</span>
            <select
              value={pageSize}
              onChange={(e) => {
                setPageSize(Number(e.target.value));
                setCurrentPage(1);
              }}
              className="bg-slate-950 border border-slate-800 rounded-xl px-2.5 py-1 text-slate-200 font-bold focus:outline-none"
            >
              <option value={5}>5</option>
              <option value={10}>10</option>
              <option value={25}>25</option>
              <option value={50}>50</option>
            </select>
            <span>• Toplam {filteredUsers.length} kayıttan {Math.min((currentPage - 1) * pageSize + 1, filteredUsers.length)}-{Math.min(currentPage * pageSize, filteredUsers.length)} arası gösteriliyor</span>
          </div>

          <div className="flex items-center gap-1.5">
            <button
              onClick={() => setCurrentPage(p => Math.max(p - 1, 1))}
              disabled={currentPage === 1}
              className="p-1.5 rounded-xl bg-slate-950 border border-slate-800 text-slate-300 hover:text-white disabled:opacity-40 disabled:cursor-not-allowed transition-all"
            >
              <ChevronLeft className="w-4 h-4" />
            </button>

            {Array.from({ length: totalPages }).map((_, i) => (
              <button
                key={i + 1}
                onClick={() => setCurrentPage(i + 1)}
                className={`w-8 h-8 rounded-xl font-bold transition-all ${
                  currentPage === i + 1
                    ? 'bg-blue-600 text-white shadow-md shadow-blue-600/20'
                    : 'bg-slate-950 border border-slate-800 text-slate-400 hover:text-white'
                }`}
              >
                {i + 1}
              </button>
            ))}

            <button
              onClick={() => setCurrentPage(p => Math.min(p + 1, totalPages))}
              disabled={currentPage === totalPages}
              className="p-1.5 rounded-xl bg-slate-950 border border-slate-800 text-slate-300 hover:text-white disabled:opacity-40 disabled:cursor-not-allowed transition-all"
            >
              <ChevronRight className="w-4 h-4" />
            </button>
          </div>
        </div>
      </div>

      {/* User Form Modal (Create / Edit) */}
      <UserFormModal
        isOpen={isFormModalOpen}
        onClose={() => {
          setIsFormModalOpen(false);
          setEditingUser(null);
        }}
        onSubmit={handleSaveUser}
        user={editingUser}
        isSubmitting={isFormSubmitting}
      />

      {/* Confirmation Modal (Destructive Operations) */}
      <ConfirmActionModal
        isOpen={confirmModal.isOpen}
        onClose={() => setConfirmModal(prev => ({ ...prev, isOpen: false }))}
        onConfirm={confirmModal.onConfirm}
        title={confirmModal.title}
        description={confirmModal.description}
        targetName={confirmModal.targetName}
        confirmText={confirmModal.confirmText}
        variant={confirmModal.variant}
        isLoading={confirmModal.isLoading}
      />
    </div>
  );
}
