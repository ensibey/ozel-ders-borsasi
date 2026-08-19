import React, { createContext, useContext, useState, useEffect } from 'react';

const AdminAuthContext = createContext(null);

export const ADMIN_PERMISSIONS = {
  MANAGE_USERS: 'manage_users',
  VERIFY_TEACHERS: 'verify_teachers',
  MODERATE_CONTENT: 'moderate_content',
  VIEW_FINANCES: 'view_finances',
  SYSTEM_SETTINGS: 'system_settings',
  AUDIT_LOGS: 'audit_logs',
};

export const AdminAuthProvider = ({ children, currentUser, onLogout, onSwitchRole }) => {
  const [adminUser, setAdminUser] = useState(() => {
    try {
      const saved = localStorage.getItem('odb_admin_session');
      if (saved) return JSON.parse(saved);
    } catch (e) {}
    
    return {
      id: 'adm_001',
      name: 'Mert Başyönetici',
      email: 'admin@ozeldersborsasi.com',
      role: 'admin',
      badge: 'Super Admin',
      avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150&auto=format&fit=crop&q=80',
      lastLogin: new Date().toLocaleString('tr-TR'),
      permissions: Object.values(ADMIN_PERMISSIONS),
      sessionExpiresAt: Date.now() + 8 * 3600 * 1000 // 8 hours
    };
  });

  const [auditLogs, setAuditLogs] = useState(() => {
    try {
      const saved = localStorage.getItem('odb_admin_audit_logs');
      return saved ? JSON.parse(saved) : [
        {
          id: 'log_001',
          adminId: 'adm_001',
          adminName: 'Mert Başyönetici',
          action: 'AUTH_LOGIN',
          category: 'SECURITY',
          target: 'Admin Portalı',
          details: 'Yönetici güvenli oturum başlattı (IP: 192.168.1.105)',
          timestamp: new Date(Date.now() - 1000 * 60 * 45).toLocaleString('tr-TR'),
          severity: 'info'
        },
        {
          id: 'log_002',
          adminId: 'adm_001',
          adminName: 'Mert Başyönetici',
          action: 'TEACHER_APPROVED',
          category: 'MODERATION',
          target: 'Ahmet Yılmaz (Matematik)',
          details: 'Diploma ve adli sicil kaydı onaylandı.',
          timestamp: new Date(Date.now() - 1000 * 60 * 20).toLocaleString('tr-TR'),
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
      adminId: adminUser?.id || 'system',
      adminName: adminUser?.name || 'Sistem Yöneticisi',
      action,
      category,
      target,
      details,
      timestamp: new Date().toLocaleString('tr-TR'),
      severity
    };
    setAuditLogs(prev => [newLog, ...prev.slice(0, 199)]);
  };

  const hasPermission = (permission) => {
    if (!adminUser || adminUser.role !== 'admin') return false;
    return adminUser.permissions?.includes(permission) || adminUser.badge === 'Super Admin';
  };

  const handleAdminLogout = () => {
    logAction('AUTH_LOGOUT', 'SECURITY', 'Admin Portalı', 'Yönetici güvenli oturumu sonlandırdı.', 'warning');
    localStorage.removeItem('odb_admin_session');
    if (onLogout) {
      onLogout();
    } else if (onSwitchRole) {
      onSwitchRole('general');
    }
  };

  return (
    <AdminAuthContext.Provider value={{
      adminUser,
      auditLogs,
      logAction,
      hasPermission,
      logout: handleAdminLogout,
      isAuthenticated: !!adminUser && adminUser.role === 'admin'
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
