import React, { useState, useEffect } from 'react';
import { TrendingUp, Award, Calendar, CheckCircle2, Plus, Trash2 } from 'lucide-react';
import confetti from 'canvas-confetti';

export default function StudentNetTracker({ studentCategory }) {
  const [netLogs, setNetLogs] = useState(() => {
    try {
      const saved = localStorage.getItem('odb_net_logs');
      return saved ? JSON.parse(saved) : [
        { id: 1, month: 'Mart 2026', mainScore: 68.5, subScore: 42.0, examName: 'Genel Değerlendirme Denemesi 1' },
        { id: 2, month: 'Nisan 2026', mainScore: 74.0, subScore: 51.5, examName: 'Borsa Akademi Konsept Denemesi 2' },
        { id: 3, month: 'Mayıs 2026', mainScore: 81.5, subScore: 65.0, examName: 'Türkiye Geneli Seviye Ölçümü' },
        { id: 4, month: 'Haziran 2026', mainScore: 88.0, subScore: 72.5, examName: 'Türkiye Geneli Simülasyon Sınavı' }
      ];
    } catch (e) {
      return [];
    }
  });

  const [newMonth, setNewMonth] = useState('Temmuz 2026');
  const [newMainScore, setNewMainScore] = useState('92.5');
  const [newSubScore, setNewSubScore] = useState('78.0');
  const [newExamName, setNewExamName] = useState('Canlı Deneme Sınavı');
  const [showAddForm, setShowAddForm] = useState(false);

  useEffect(() => {
    localStorage.setItem('odb_net_logs', JSON.stringify(netLogs));
  }, [netLogs]);

  const handleAddNet = (e) => {
    e.preventDefault();
    if (!newMainScore) return;

    setNetLogs(prev => [
      ...prev,
      {
        month: newMonth,
        mainScore: parseFloat(newMainScore),
        subScore: parseFloat(newSubScore),
        examName: newExamName
      }
    ]);

    confetti({ particleCount: 80, spread: 60 });
    setShowAddForm(false);
  };

  const latestNet = netLogs.length > 0 ? netLogs[netLogs.length - 1] : null;
  const firstNet = netLogs.length > 0 ? netLogs[0] : null;
  const scoreIncrease = (latestNet && firstNet) ? (latestNet.mainScore - firstNet.mainScore).toFixed(1) : '0.0';

  return (
    <div className="glass-panel p-6 rounded-3xl border border-indigo-500/30 space-y-6 my-6">
      
      {/* Header */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 pb-4 border-b border-slate-800">
        <div>
          <div className="inline-flex items-center space-x-1.5 px-3 py-0.5 rounded-full bg-emerald-500/20 text-emerald-300 text-xs font-bold mb-1 border border-emerald-500/30">
            <TrendingUp className="w-3.5 h-3.5" />
            <span>+ {scoreIncrease} Puan / Net Artışı</span>
          </div>
          <h2 className="text-lg font-bold text-white">
            {studentCategory || 'Öğrenci'} Gelişim & Deneme Takip Paneli
          </h2>
          <p className="text-xs text-slate-400">Kendi seviyenize ve alanınıza uygun sınav sonuçlarını ekleyip ilerlemenizi izleyin.</p>
        </div>

        <button
          onClick={() => setShowAddForm(!showAddForm)}
          className="px-4 py-2 rounded-xl bg-indigo-600 hover:bg-indigo-500 text-white font-bold text-xs shadow-md flex items-center gap-1.5"
        >
          <Plus className="w-4 h-4" />
          <span>Deneme / Sınav Sonucu Ekle</span>
        </button>
      </div>

      {/* 📈 INTERACTIVE SVG NET PROGRESSION GRAPH */}
      {netLogs.length > 1 && (
        <div className="p-5 rounded-2xl bg-slate-950/80 border border-slate-800 space-y-3">
          <div className="flex items-center justify-between text-xs">
            <span className="text-slate-300 font-bold flex items-center gap-2">
              <TrendingUp className="w-4 h-4 text-emerald-400" />
              <span>Net Artış Trend Grafiği (Son {netLogs.length} Deneme)</span>
            </span>
            <div className="flex items-center gap-4 text-[11px] font-bold">
              <span className="flex items-center gap-1.5 text-indigo-400">
                <span className="w-2.5 h-2.5 rounded-full bg-indigo-500" /> 1. Oturum (TYT)
              </span>
              <span className="flex items-center gap-1.5 text-emerald-400">
                <span className="w-2.5 h-2.5 rounded-full bg-emerald-500" /> 2. Oturum (AYT)
              </span>
              <span className="flex items-center gap-1.5 text-amber-400">
                <span className="w-4 border-t-2 border-dashed border-amber-400" /> Hedef (100 Net)
              </span>
            </div>
          </div>

          {/* SVG Canvas */}
          <div className="w-full h-44 sm:h-52 pt-2 relative">
            <svg viewBox="0 0 600 180" className="w-full h-full overflow-visible">
              {/* Background Grid Lines */}
              <line x1="40" y1="20" x2="580" y2="20" stroke="#334155" strokeDasharray="3 3" strokeWidth="0.5" />
              <text x="10" y="24" fill="#64748b" fontSize="10" fontFamily="sans-serif">120 Net</text>

              <line x1="40" y1="60" x2="580" y2="60" stroke="#334155" strokeDasharray="3 3" strokeWidth="0.5" />
              <text x="10" y="64" fill="#64748b" fontSize="10" fontFamily="sans-serif">90 Net</text>

              <line x1="40" y1="100" x2="580" y2="100" stroke="#334155" strokeDasharray="3 3" strokeWidth="0.5" />
              <text x="10" y="104" fill="#64748b" fontSize="10" fontFamily="sans-serif">60 Net</text>

              <line x1="40" y1="140" x2="580" y2="140" stroke="#334155" strokeDasharray="3 3" strokeWidth="0.5" />
              <text x="10" y="144" fill="#64748b" fontSize="10" fontFamily="sans-serif">30 Net</text>

              {/* Target Line at 100 Net (Y: 46) */}
              <line x1="40" y1="46" x2="580" y2="46" stroke="#f59e0b" strokeDasharray="5 5" strokeWidth="1.5" />

              {/* Calculate Points */}
              {(() => {
                const count = netLogs.length;
                const getX = (i) => 60 + (i * (500 / Math.max(1, count - 1)));
                const getY = (score, max = 120) => 150 - ((score / max) * 130);

                const pointsMain = netLogs.map((log, i) => `${getX(i)},${getY(log.mainScore)}`).join(' ');
                const pointsSub = netLogs.map((log, i) => `${getX(i)},${getY(log.subScore, 80)}`).join(' ');

                return (
                  <>
                    {/* Main Score Line & Area */}
                    <polyline
                      fill="none"
                      stroke="#6366f1"
                      strokeWidth="3"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      points={pointsMain}
                    />

                    {/* Sub Score Line */}
                    <polyline
                      fill="none"
                      stroke="#10b981"
                      strokeWidth="3"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      points={pointsSub}
                    />

                    {/* Data Points Dots with Score Badges */}
                    {netLogs.map((log, i) => {
                      const x = getX(i);
                      const yMain = getY(log.mainScore);
                      const ySub = getY(log.subScore, 80);
                      return (
                        <g key={i}>
                          {/* Main Dot */}
                          <circle cx={x} cy={yMain} r="5" fill="#6366f1" stroke="#ffffff" strokeWidth="2" />
                          <text x={x} y={yMain - 8} fill="#a5b4fc" fontSize="10" fontWeight="bold" textAnchor="middle">
                            {log.mainScore}
                          </text>

                          {/* Sub Dot */}
                          <circle cx={x} cy={ySub} r="5" fill="#10b981" stroke="#ffffff" strokeWidth="2" />
                          <text x={x} y={ySub + 16} fill="#6ee7b7" fontSize="10" fontWeight="bold" textAnchor="middle">
                            {log.subScore}
                          </text>

                          {/* X Axis Label */}
                          <text x={x} y="170" fill="#94a3b8" fontSize="10" textAnchor="middle">
                            {log.month.split(' ')[0]}
                          </text>
                        </g>
                      );
                    })}
                  </>
                );
              })()}
            </svg>
          </div>
        </div>
      )}

      {/* Net Progression Bars Visual */}
      <div className="space-y-4">
        {netLogs.map((item, idx) => {
          const mainPct = Math.min(100, Math.max(0, (item.mainScore / 120) * 100));
          const subPct = Math.min(100, Math.max(0, (item.subScore / 80) * 100));
          return (
            <div key={idx} className="p-4 rounded-2xl bg-slate-900/60 border border-slate-800 space-y-2.5">
              <div className="flex items-center justify-between text-xs font-bold">
                <span className="text-white flex items-center gap-2">
                  <span className="w-2 h-2 rounded-full bg-indigo-400" />
                  <span>{item.month} ({item.examName})</span>
                </span>
                <div className="flex items-center gap-3">
                  <span className="text-slate-300 font-mono text-[11px]">
                    1. Oturum: <span className="text-indigo-400 font-bold">{item.mainScore}</span> / 120 • 2. Oturum: <span className="text-emerald-400 font-bold">{item.subScore}</span> / 80
                  </span>
                  <button
                    onClick={() => setNetLogs(prev => prev.filter((_, i) => i !== idx))}
                    className="text-slate-500 hover:text-rose-400 transition-colors p-1"
                    title="Sonucu Sil"
                  >
                    <Trash2 className="w-3.5 h-3.5" />
                  </button>
                </div>
              </div>

              {/* Progress Bars */}
              <div className="space-y-1.5 pt-1">
                <div className="space-y-0.5">
                  <div className="flex justify-between text-[10px] text-slate-400 font-semibold">
                    <span>1. Oturum (TYT/Genel)</span>
                    <span className="text-indigo-400 font-bold">{item.mainScore} Net</span>
                  </div>
                  <div className="w-full bg-slate-950 rounded-full h-2 overflow-hidden p-0.5 border border-slate-800">
                    <div
                      className="bg-gradient-to-r from-indigo-500 to-violet-500 h-full rounded-full transition-all duration-700"
                      style={{ width: `${mainPct}%` }}
                    />
                  </div>
                </div>

                <div className="space-y-0.5">
                  <div className="flex justify-between text-[10px] text-slate-400 font-semibold">
                    <span>2. Oturum (AYT/Alan)</span>
                    <span className="text-emerald-400 font-bold">{item.subScore} Net</span>
                  </div>
                  <div className="w-full bg-slate-950 rounded-full h-2 overflow-hidden p-0.5 border border-slate-800">
                    <div
                      className="bg-gradient-to-r from-emerald-500 to-teal-500 h-full rounded-full transition-all duration-700"
                      style={{ width: `${subPct}%` }}
                    />
                  </div>
                </div>
              </div>
            </div>
          );
        })}
      </div>

      {/* Add Form Modal */}
      {showAddForm && (
        <form onSubmit={handleAddNet} className="p-4 rounded-2xl bg-slate-900/90 border border-slate-800 space-y-3 animate-fadeIn">
          <h4 className="text-xs font-bold text-white">Yeni Deneme / Sınav Sonucu Kaydet</h4>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
            <input
              type="text"
              value={newExamName}
              onChange={(e) => setNewExamName(e.target.value)}
              placeholder="Sınav / Konu Adı"
              className="glass-input rounded-xl px-3 py-2 text-xs text-white"
            />
            <input
              type="number"
              step="0.25"
              value={newMainScore}
              onChange={(e) => setNewMainScore(e.target.value)}
              placeholder="Ana Puan / Net"
              className="glass-input rounded-xl px-3 py-2 text-xs text-white"
            />
            <input
              type="number"
              step="0.25"
              value={newSubScore}
              onChange={(e) => setNewSubScore(e.target.value)}
              placeholder="Alt Puan / Net"
              className="glass-input rounded-xl px-3 py-2 text-xs text-white"
            />
          </div>
          <button
            type="submit"
            className="w-full py-2.5 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white font-bold text-xs"
          >
            Sonucu Grafiklere İşle
          </button>
        </form>
      )}

    </div>
  );
}
