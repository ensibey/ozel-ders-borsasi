import React, { useState } from 'react';
import { AdminAuthProvider } from './context/AdminAuthContext';
import AdminRouteGuard from './guards/AdminRouteGuard';
import AdminLayout from './layouts/AdminLayout';

import AdminOverview from './pages/Dashboard/AdminOverview';
import UserManagement from './pages/Users/UserManagement';
import TeacherVerification from './pages/Users/TeacherVerification';
import ModerationPanel from './pages/Moderation/ModerationPanel';
import FinancialAnalytics from './pages/Finance/FinancialAnalytics';
import CouponManagement from './pages/Marketing/CouponManagement';
import AuditLogs from './pages/Security/AuditLogs';
import SystemSettings from './pages/Settings/SystemSettings';

export default function AdminPortal({
  currentRole,
  onSwitchRole,
  onOpenLogin,
  teachers = [],
  onUpdateTeacher,
  products = [],
  onUpdateProduct,
  announcements = [],
  onAddAnnouncement,
  onDeleteAnnouncement,
  serviceRequests = [],
  onDeleteRequest,
  platformCommission = 12,
  onUpdateCommission,
  coupons = [],
  onAddCoupon,
  onUpdateCoupon,
  onDeleteCoupon,
  showToast
}) {
  const [activeTab, setActiveTab] = useState('overview');
  const [isRefreshing, setIsRefreshing] = useState(false);

  const pendingTeachersCount = teachers.filter(t => !t.verified).length;
  const pendingModerationCount = serviceRequests.length;

  const handleRefresh = () => {
    setIsRefreshing(true);
    setTimeout(() => {
      setIsRefreshing(false);
      if (showToast) showToast('Tüm sistem metrikleri ve kayıtlar güncellendi.', 'success');
    }, 600);
  };

  const getTabTitle = () => {
    switch (activeTab) {
      case 'overview': return 'Genel Bakış & KPI Dashboard';
      case 'users': return 'Kullanıcı & Hesap Yönetimi';
      case 'teachers': return 'Öğretmen Akreditasyon Masası';
      case 'moderation': return 'İçerik & İlan Denetimi';
      case 'coupons': return 'Kupon & Promosyon Yönetimi';
      case 'finance': return 'Finans, Komisyon & Hakedişler';
      case 'security': return 'Güvenlik & Audit Denetim İzi';
      case 'settings': return 'Sistem Parametreleri';
      default: return 'Yönetim Portalı';
    }
  };

  return (
    <AdminAuthProvider 
      onLogout={() => {
        if (onSwitchRole) onSwitchRole('general');
        window.location.hash = '';
      }}
      onSwitchRole={onSwitchRole}
    >
      <AdminRouteGuard
        currentRole={currentRole}
        onSwitchRole={onSwitchRole}
        onOpenLogin={onOpenLogin}
      >
        <AdminLayout
          activeTab={activeTab}
          onTabChange={setActiveTab}
          tabTitle={getTabTitle()}
          pendingCounts={{
            teachers: pendingTeachersCount,
            moderation: pendingModerationCount
          }}
          onExitAdmin={() => {
            if (onSwitchRole) onSwitchRole('general');
            window.location.hash = '';
          }}
          onRefreshData={handleRefresh}
        >
          {activeTab === 'overview' && (
            <AdminOverview
              teachers={teachers}
              products={products}
              serviceRequests={serviceRequests}
              platformCommission={platformCommission}
              onUpdateCommission={onUpdateCommission}
              onUpdateTeacher={onUpdateTeacher}
              coupons={coupons}
              onSwitchRole={onSwitchRole}
              onNavigateTab={setActiveTab}
              showToast={showToast}
            />
          )}

          {activeTab === 'users' && (
            <UserManagement
              teachers={teachers}
            />
          )}

          {activeTab === 'teachers' && (
            <TeacherVerification
              teachers={teachers}
              onUpdateTeacher={onUpdateTeacher}
            />
          )}

          {activeTab === 'moderation' && (
            <ModerationPanel
              serviceRequests={serviceRequests}
              onDeleteRequest={onDeleteRequest}
              products={products}
              onUpdateProduct={onUpdateProduct}
            />
          )}

          {activeTab === 'coupons' && (
            <CouponManagement
              coupons={coupons}
              onAddCoupon={onAddCoupon}
              onUpdateCoupon={onUpdateCoupon}
              onDeleteCoupon={onDeleteCoupon}
              showToast={showToast}
            />
          )}

          {activeTab === 'finance' && (
            <FinancialAnalytics
              platformCommission={platformCommission}
              onUpdateCommission={onUpdateCommission}
            />
          )}

          {activeTab === 'security' && (
            <AuditLogs />
          )}

          {activeTab === 'settings' && (
            <SystemSettings
              announcements={announcements}
              onAddAnnouncement={onAddAnnouncement}
              onDeleteAnnouncement={onDeleteAnnouncement}
              teachers={teachers}
              onUpdateTeacher={onUpdateTeacher}
              coupons={coupons}
              onUpdateCoupon={onUpdateCoupon}
              onAddCoupon={onAddCoupon}
              onDeleteCoupon={onDeleteCoupon}
              onSwitchRole={onSwitchRole}
              platformCommission={platformCommission}
              onUpdateCommission={onUpdateCommission}
              showToast={showToast}
            />
          )}
        </AdminLayout>
      </AdminRouteGuard>
    </AdminAuthProvider>
  );
}
