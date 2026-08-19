import React, { useState } from 'react';
import { 
  Activity, 
  ShieldAlert, 
  Search, 
  Filter, 
  Download, 
  CheckCircle2, 
  AlertTriangle, 
  Info,
  Clock,
  Terminal,
  Lock
} from 'lucide-react';
import { useAdminAuth } from '../../context/AdminAuthContext';

export default function AuditLogs() {
  const { auditLogs } = useAdminAuth();
  const [filterCategory, setFilterCategory] = useState('ALL');
  const [searchQuery, setSearchQuery] = useState('');

  const filteredLogs = auditLogs.filter(log => {
    const matchesCat = filterCategory === 'ALL' || log.category === filterCategory;
    const matchesSearch = log.action.toLowerCase().includes(searchQuery.toLowerCase()) ||
                          log.details.toLowerCase().includes(searchQuery.toLowerCase()) ||
                          log.target.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCat && matchesSearch;
  });

  const getSeverityBadge = (sev) => {
    switch(sev) {
      case 'success':
        return <span className="px-2 py-0.5 rounded-md bg-emerald-500/10 text-emerald-400 border border-emerald-500/20 text-[10px] font-bold">BAŞARILI</span>;
      case 'warning':
        return <span className="px-2 py-0.5 rounded-md bg-amber-500/10 text-amber-400 border border-amber-500/20 text-[10px] font-bold">UYARI</span>;
      case 'danger':
        return <span className="px-2 py-0.5 rounded-md bg-rose-500/10 text-rose-400 border border-rose-500/20 text-[10px] font-bold">KRİTİK</span>;
      default:
        return <span className="px-2 py-0.5 rounded-md bg-blue-500/10 text-blue-400 border border-blue-500/20 text-[10px] font-bold">BİLGİ</span>;
    }
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <div>
          <h2 className="text-xl font-black text-white tracking-tight flex items-center gap-2">
            <Activity className="w-5 h-5 text-emerald-400" />
            Güvenlik Denetim İzi & Audit Trail
          </h2>
          <p className="text-xs text-slate-400 mt-0.5">
            Sistem yöneticileri tarafından gerçekleştirilen tüm onay, iptal, oturum ve kural değişiklikleri değişmez log zincirinde tutulur.
          </p>
        </div>

        <div className="flex items-center gap-2">
          <button
            onClick={() => {
              const dataStr = "data:text/json;charset=utf-8," + encodeURIComponent(JSON.stringify(auditLogs, null, 2));
              const downloadAnchor = document.createElement('a');
              downloadAnchor.setAttribute("href", dataStr);
              downloadAnchor.setAttribute("download", `admin_audit_logs_${Date.now()}.json`);
              document.body.appendChild(downloadAnchor);
              downloadAnchor.click();
              downloadAnchor.remove();
            }}
            className="px-3.5 py-2 bg-slate-900 hover:bg-slate-800 border border-slate-700 text-slate-300 hover:text-white rounded-xl text-xs font-bold transition-all flex items-center gap-2"
          >
            <Download className="w-3.5 h-3.5" />
            JSON Dışa Aktar
          </button>
        </div>
      </div>

      {/* Filter and Search Bar */}
      <div className="p-5 rounded-3xl bg-slate-900/90 border border-slate-800 shadow-xl space-y-4">
        <div className="flex flex-col md:flex-row items-stretch md:items-center justify-between gap-3">
          <div className="relative flex-1">
            <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Log eylemi, hedef veya detay içinde filtrele..."
              className="w-full bg-slate-950/80 border border-slate-800 focus:border-blue-500 rounded-xl pl-9 pr-4 py-2 text-xs text-slate-200 placeholder-slate-400 focus:outline-none"
            />
          </div>

          <div className="flex items-center gap-1.5 overflow-x-auto pb-1 md:pb-0">
            {['ALL', 'SECURITY', 'ACCREDITATION', 'USER_MANAGEMENT', 'MODERATION', 'FINANCE'].map(cat => (
              <button
                key={cat}
                onClick={() => setFilterCategory(cat)}
                className={`px-3 py-1.5 rounded-xl text-xs font-bold whitespace-nowrap transition-all ${
                  filterCategory === cat
                    ? 'bg-blue-600 text-white'
                    : 'bg-slate-950 text-slate-400 hover:text-slate-200 border border-slate-800'
                }`}
              >
                {cat}
              </button>
            ))}
          </div>
        </div>

        {/* Audit Log Table */}
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="border-b border-slate-800 text-[11px] font-bold text-slate-400 uppercase tracking-wider">
                <th className="pb-3 px-3">Zaman Damgası</th>
                <th className="pb-3 px-3">Yetkili</th>
                <th className="pb-3 px-3">Kategori</th>
                <th className="pb-3 px-3">Eylem Tipi</th>
                <th className="pb-3 px-3">Hedef</th>
                <th className="pb-3 px-3">Detay</th>
                <th className="pb-3 px-3 text-right">Seviye</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-800/40 text-xs font-sans">
              {filteredLogs.length === 0 ? (
                <tr>
                  <td colSpan={7} className="py-8 text-center text-slate-400">
                    Filtreye uygun güvenlik kaydı bulunamadı.
                  </td>
                </tr>
              ) : (
                filteredLogs.map((log) => (
                  <tr key={log.id} className="hover:bg-slate-800/30 transition-colors">
                    <td className="py-3 px-3 font-mono text-[11px] text-slate-400 whitespace-nowrap">
                      {log.timestamp}
                    </td>
                    <td className="py-3 px-3 font-bold text-slate-200 whitespace-nowrap">
                      {log.adminName}
                    </td>
                    <td className="py-3 px-3">
                      <span className="px-2 py-0.5 rounded bg-slate-800 text-slate-300 font-mono text-[10px]">
                        {log.category}
                      </span>
                    </td>
                    <td className="py-3 px-3 font-bold text-white font-mono text-[11px]">
                      {log.action}
                    </td>
                    <td className="py-3 px-3 text-slate-300 max-w-[150px] truncate">
                      {log.target}
                    </td>
                    <td className="py-3 px-3 text-slate-400 max-w-xs">
                      {log.details}
                    </td>
                    <td className="py-3 px-3 text-right whitespace-nowrap">
                      {getSeverityBadge(log.severity)}
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
