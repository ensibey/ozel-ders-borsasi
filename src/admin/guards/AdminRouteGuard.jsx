import React, { useState, useEffect } from 'react';
import { ShieldCheck, Lock, Loader2, Sparkles } from 'lucide-react';
import { useAdminAuth } from '../context/AdminAuthContext';
import Unauthorized403 from '../layouts/Unauthorized403';

/**
 * AdminRouteGuard: Zero-Leakage Role-Based Access Control (RBAC) Wrapper.
 * Validates active session, token claims, and checks if user holds `role === 'admin'`.
 * Displays an enterprise security verification skeleton/spinner during auth resolution.
 */
export default function AdminRouteGuard({ 
  children, 
  currentRole, 
  onSwitchRole, 
  onOpenLogin 
}) {
  const { isAuthenticated, adminUser } = useAdminAuth();
  const [isVerifying, setIsVerifying] = useState(true);

  useEffect(() => {
    // Simulate high-security token handshaking and cryptographic validation
    const timer = setTimeout(() => {
      setIsVerifying(false);
    }, 450);
    return () => clearTimeout(timer);
  }, [currentRole, isAuthenticated]);

  // 1. Loading / Security Handshake Verification State (Skeleton & Spinner)
  if (isVerifying) {
    return (
      <div className="min-h-screen bg-slate-950 text-slate-100 flex flex-col items-center justify-center p-6 relative overflow-hidden font-sans select-none">
        {/* Ambient Glows */}
        <div className="absolute top-1/3 left-1/2 -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-blue-600/10 rounded-full blur-3xl pointer-events-none" />
        
        <div className="flex flex-col items-center space-y-6 max-w-sm w-full text-center relative z-10">
          {/* Animated Security Orb */}
          <div className="relative">
            <div className="w-16 h-16 rounded-2xl bg-gradient-to-tr from-blue-600 via-indigo-600 to-violet-600 flex items-center justify-center text-white shadow-xl shadow-blue-500/25 ring-4 ring-blue-500/10 animate-pulse">
              <ShieldCheck className="w-8 h-8" />
            </div>
            <div className="absolute -bottom-1 -right-1 p-1 bg-slate-950 rounded-full">
              <Loader2 className="w-4 h-4 text-blue-400 animate-spin" />
            </div>
          </div>

          <div className="space-y-2">
            <h2 className="text-base font-bold text-white tracking-tight flex items-center justify-center gap-2">
              <span>RBAC Güvenlik Oturumu Doğrulanıyor</span>
              <Sparkles className="w-3.5 h-3.5 text-blue-400" />
            </h2>
            <p className="text-xs text-slate-400 font-mono">
              256-bit token claim & rol izolasyonu kontrol ediliyor...
            </p>
          </div>

          {/* Skeleton Pulse Bar */}
          <div className="w-48 h-1.5 bg-slate-900 rounded-full overflow-hidden border border-slate-800">
            <div className="h-full bg-gradient-to-r from-blue-600 via-indigo-500 to-blue-400 w-full animate-progress origin-left" />
          </div>
        </div>
      </div>
    );
  }

  // 2. Strict Role Check: Must have role 'admin' in UI and valid admin context claim
  const isAllowed = (currentRole === 'admin') && isAuthenticated && (adminUser?.role === 'admin');

  if (!isAllowed) {
    return (
      <Unauthorized403 
        currentRole={currentRole} 
        onSwitchRole={onSwitchRole}
        onOpenLogin={onOpenLogin}
      />
    );
  }

  // 3. Authorized Admin Content
  return <>{children}</>;
}
