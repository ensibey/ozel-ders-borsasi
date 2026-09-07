import React, { createContext, useContext, useState, useEffect } from 'react';

const AdminAuthContext = createContext(null);

export const ADMIN_PERMISSIONS = {
  ROOT_ACCESS: 'root_access',
  MANAGE_ALL: 'manage_all',
  MANAGE_USERS: 'manage_users',
  DELETE_USERS: 'delete_users',
  BAN_USERS: 'ban_users',
  VERIFY_TEACHERS: 'verify_teachers',
  MANAGE_VENDORS: 'manage_vendors',
  MODERATE_CONTENT: 'moderate_content',
  VIEW_FINANCES: 'view_finances',
  MANAGE_COMMISSIONS: 'manage_commissions',
  MANAGE_COUPONS: 'manage_coupons',
  SYSTEM_SETTINGS: 'system_settings',
  AUDIT_LOGS: 'audit_logs',
  DATABASE_OVERRIDE: 'database_override',
  SUPER_ADMIN_BYPASS: 'super_admin_bypass',
  FULL_CONTROL: 'full_control',
};

export const AdminAuthProvider = ({ children, currentUser, onLogout, onSwitchRole }) => {
  const [adminUser, setAdminUser] = useState(() => {
    try {
      const saved = localStorage.getItem('odb_admin_session');
      if (saved) return JSON.parse(saved);
    } catch (e) {}
    
    return {
      id: 'adm_root',
      name: 'Mert Başyönetici',
      email: 'admin@ozeldersborsasi.com',
      role: 'admin',
      badge: 'Root Süper Yönetici (Tam Yetkili)',
      avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150&auto=format&fit=crop&q=80',
      lastLogin: new Date().toLocaleString('tr-TR'),
      permissions: Object.values(ADMIN_PERMISSIONS),
      sessionExpiresAt: Date.now() + 24 * 3600 * 1000, // 24 hours
      godMode: true
    };
  });

  const [auditLogs, setAuditLogs] = useState(() => {
    try {
      const saved = localStorage.getItem('odb_admin_audit_logs');
      return saved ? JSON.parse(saved) : [
        {
          id: 'log_001',
          adminId: 'adm_root',
          adminName: 'Mert Başyönetici',
          action: 'ROOT_SUPERADMIN_SESSION',
          category: 'SECURITY',
          target: 'Admin Portalı',
          details: 'Root Süper Yönetici tam yetkili oturumu aktif (Tüm yetkiler: %100 Açık).',
          timestamp: new Date().toLocaleString('tr-TR'),
          severity: 'success'
        }
      ];
    } catch (e) {
      return [];
    }
  });

  useEffect(() => {
    try {
      localStorage.setItem('odb_admin_audit_logs', JSON.stringify(auditLogs));
    } catch (e) {}
  }, [auditLogs]);

  const logAction = (action, category, target, details, severity = 'info') => {
    const newLog = {
      id: `log_${Date.now()}_${Math.random().toString(36).substr(2, 4)}`,
      adminId: adminUser?.id || 'adm_root',
      adminName: adminUser?.name || 'Root Süper Yönetici',
      action,
      category,
      target,
      details,
      timestamp: new Date().toLocaleString('tr-TR'),
      severity
    };
    setAuditLogs(prev => [newLog, ...prev.slice(0, 199)]);
  };

  // ADMIN HAS UNRESTRICTED, 100% TOTAL POWER OVER EVERYTHING
  const hasPermission = () => true;

  const handleAdminLogout = () => {
    logAction('AUTH_LOGOUT', 'SECURITY', 'Admin Portalı', 'Yönetici oturumu sonlandırıldı.', 'warning');
    localStorage.removeItem('odb_admin_session');
    if (onLogout) {
      onLogout();
    } else if (onSwitchRole) {
      onSwitchRole('general');
    }
  };

  // Root Super Admin Power Actions
  const exportSystemBackup = () => {
    try {
      const backup = {
        exportedAt: new Date().toISOString(),
        siteConfig: localStorage.getItem('odb_site_config'),
        coupons: localStorage.getItem('odb_coupons'),
        auditLogs: auditLogs,
        adminUser: adminUser
      };
      const blob = new Blob([JSON.stringify(backup, null, 2)], { type: 'application/json' });
      const url = URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = url;
      a.download = `odb_system_backup_${Date.now()}.json`;
      a.click();
      URL.revokeObjectURL(url);
      logAction('DATABASE_BACKUP_EXPORT', 'SYSTEM', 'Global Veri', 'Tüm sistem veritabanı JSON yedeği olarak indirildi.', 'success');
      return true;
    } catch (e) {
      return false;
    }
  };

  const clearSystemCache = () => {
    try {
      localStorage.removeItem('odb_admin_audit_logs');
      logAction('CACHE_PURGED', 'SYSTEM', 'Önbellek', 'Tüm geçici sistem logları ve önbellek temizlendi.', 'warning');
      return true;
    } catch (e) {
      return false;
    }
  };

  return (
    <AdminAuthContext.Provider value={{
      adminUser,
      auditLogs,
      logAction,
      hasPermission,
      exportSystemBackup,
      clearSystemCache,
      logout: handleAdminLogout,
      onSwitchRole,
      isAuthenticated: !!adminUser && adminUser.role === 'admin',
      isRootSuperAdmin: true
    }}>
      {children}
    </AdminAuthContext.Provider>
  );
};

export const useAdminAuth = () => {
  const context = useContext(AdminAuthContext);
  if (!context) {
    throw new Error('useAdminAuth must be used within an AdminAuthProvider');
  }
  return context;
};
