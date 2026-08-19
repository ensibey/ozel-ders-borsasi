import React, { useState } from 'react';
import { 
  BadgeDollarSign, 
  TrendingUp, 
  CreditCard, 
  ArrowDownToLine, 
  CheckCircle2, 
  Clock, 
  Sliders, 
  Save
} from 'lucide-react';
import { useAdminAuth } from '../../context/AdminAuthContext';

export default function FinancialAnalytics({ 
  platformCommission = 12, 
  onUpdateCommission 
}) {
  const { logAction } = useAdminAuth();
  const [commissionRate, setCommissionRate] = useState(platformCommission);
  const [isSaved, setIsSaved] = useState(false);

  const transactions = [
    {
      id: 'tx_8091',
      user: 'Mert Yılmaz',
      teacher: 'Dr. Selin Demir',
      service: '2 Saat YKS Matematik',
      grossAmount: 1800,
      fee: 216,
      netTeacher: 1584,
      date: 'Bugün 14:20',
      status: 'completed'
    },
    {
      id: 'tx_8090',
      user: 'Ayşe Kaya',
      teacher: 'Ahmet Yılmaz',
      service: '1 Saat Geometri Seansı',
      grossAmount: 750,
      fee: 90,
      netTeacher: 660,
      date: 'Bugün 11:05',
      status: 'completed'
    },
    {
      id: 'tx_8089',
      user: 'Can Vural',
      teacher: 'Eğitim Vadisi',
      service: 'Dijital TYT Deneme Paketi',
      grossAmount: 350,
      fee: 42,
      netTeacher: 308,
      date: 'Dün 19:44',
      status: 'completed'
    },
    {
      id: 'tx_8088',
      user: 'Zeynep Ak',
      teacher: 'Prof. Levent Öz',
      service: 'Fizik Özel Ders Paketi (4 Seans)',
      grossAmount: 3600,
      fee: 432,
      netTeacher: 3168,
      date: 'Dün 15:10',
      status: 'completed'
    }
  ];

  const totalGross = transactions.reduce((acc, t) => acc + t.grossAmount, 0);
  const totalCommissions = transactions.reduce((acc, t) => acc + t.fee, 0);

  const handleSaveCommission = () => {
    if (onUpdateCommission) onUpdateCommission(commissionRate);
    logAction(
      'COMMISSION_UPDATED',
      'FINANCE',
      'Platform Komisyon Parametresi',
      `Komisyon oranı %${commissionRate} olarak güncellendi.`,
      'success'
    );
    setIsSaved(true);
    setTimeout(() => setIsSaved(false), 2500);
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <div>
          <h2 className="text-xl font-black text-white tracking-tight flex items-center gap-2">
            <BadgeDollarSign className="w-5 h-5 text-emerald-400" />
            Finans, Komisyon & Gelir Modülü
          </h2>
          <p className="text-xs text-slate-400 mt-0.5">
            Platform komisyon oranlarını yönetin ve anlık para akışını inceleyin.
          </p>
        </div>
      </div>

      {/* KPI Cards & Commission Config */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div className="p-5 rounded-3xl bg-slate-900/90 border border-slate-800 shadow-xl flex flex-col justify-between">
          <span className="text-xs font-semibold text-slate-400 uppercase tracking-wider">İşlem Hacmi (GMV)</span>
          <p className="text-2xl font-black text-white mt-2">₺{totalGross.toLocaleString('tr-TR')}</p>
          <span className="text-[11px] text-emerald-400 font-bold mt-2">Son 24 saat gerçekleşen</span>
        </div>

        <div className="p-5 rounded-3xl bg-slate-900/90 border border-slate-800 shadow-xl flex flex-col justify-between">
          <span className="text-xs font-semibold text-slate-400 uppercase tracking-wider">Platform Net Komisyonu</span>
          <p className="text-2xl font-black text-emerald-400 mt-2">₺{totalCommissions.toLocaleString('tr-TR')}</p>
          <span className="text-[11px] text-slate-400 mt-2">Mevcut oran: %{platformCommission}</span>
        </div>

        {/* Live Commission Slider Card */}
        <div className="p-5 rounded-3xl bg-gradient-to-br from-indigo-950/60 to-slate-900 border border-indigo-500/30 shadow-xl flex flex-col justify-between">
          <div>
            <div className="flex items-center justify-between">
              <span className="text-xs font-bold text-indigo-300 uppercase tracking-wider flex items-center gap-1.5">
                <Sliders className="w-3.5 h-3.5" /> Komisyon Oranı
              </span>
              <span className="text-lg font-black text-white">%{commissionRate}</span>
            </div>
            <input
              type="range"
              min="5"
              max="25"
              step="1"
              value={commissionRate}
              onChange={(e) => setCommissionRate(Number(e.target.value))}
              className="w-full mt-3 accent-indigo-500 cursor-pointer"
            />
          </div>

          <button
            onClick={handleSaveCommission}
            className="mt-3 w-full py-2 bg-indigo-600 hover:bg-indigo-500 text-white rounded-xl text-xs font-bold transition-all shadow-md shadow-indigo-600/20 flex items-center justify-center gap-1.5"
          >
            {isSaved ? <CheckCircle2 className="w-4 h-4 text-emerald-300" /> : <Save className="w-4 h-4" />}
            {isSaved ? 'Kaydedildi!' : 'Oranı Uygula ve Kaydet'}
          </button>
        </div>
      </div>

      {/* Transaction Ledger Table */}
      <div className="p-5 rounded-3xl bg-slate-900/90 border border-slate-800 shadow-xl space-y-4">
        <h3 className="font-bold text-white text-sm flex items-center gap-2">
          <CreditCard className="w-4 h-4 text-blue-400" />
          Gerçek Zamanlı Ödeme ve Hakediş Kayıtları
        </h3>

        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="border-b border-slate-800 text-[11px] font-bold text-slate-400 uppercase tracking-wider">
                <th className="pb-3 px-3">İşlem ID</th>
                <th className="pb-3 px-3">Öğrenci / Alıcı</th>
                <th className="pb-3 px-3">Eğitmen / Kurum</th>
                <th className="pb-3 px-3">Hizmet / Ders</th>
                <th className="pb-3 px-3">Brüt Tutar</th>
                <th className="pb-3 px-3">Platform Kesintisi</th>
                <th className="pb-3 px-3">Eğitmene Kalan</th>
                <th className="pb-3 px-3">Zaman</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-800/40 text-xs">
              {transactions.map((tx) => (
                <tr key={tx.id} className="hover:bg-slate-800/30 transition-colors">
                  <td className="py-3 px-3 font-mono text-slate-400">{tx.id}</td>
                  <td className="py-3 px-3 font-bold text-white">{tx.user}</td>
                  <td className="py-3 px-3 text-slate-300">{tx.teacher}</td>
                  <td className="py-3 px-3 text-slate-400">{tx.service}</td>
                  <td className="py-3 px-3 font-bold text-white">₺{tx.grossAmount}</td>
                  <td className="py-3 px-3 font-bold text-emerald-400">+₺{tx.fee}</td>
                  <td className="py-3 px-3 text-slate-300">₺{tx.netTeacher}</td>
                  <td className="py-3 px-3 text-slate-500 font-mono text-[11px]">{tx.date}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
