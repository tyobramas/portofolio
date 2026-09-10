import { useState, useEffect, useMemo } from 'react';
import {
  Users,
  Bot,
  ShieldAlert,
  Globe,
  Activity,
  RefreshCw,
  Lock,
  ArrowLeft,
  Search,
  Server,
  Smartphone,
  Laptop,
  Cpu,
  AlertTriangle,
  CheckCircle2,
  Terminal,
  Compass,
  Radar,
} from 'lucide-react';
import { 
  subscribeVisitorLogs, 
  fetchVisitorLogsOnce, 
  computeStatsSummary,
  trackVisitor 
} from '../services/visitorTracker';
import type { VisitorRecord } from '../types/stats';

interface StatsDashboardProps {
  onBackToPortfolio: () => void;
  onLock: () => void;
}

export default function StatsDashboard({ onBackToPortfolio, onLock }: StatsDashboardProps) {
  const [logs, setLogs] = useState<VisitorRecord[]>([]);
  const [loading, setLoading] = useState(true);
  const [lastRefreshed, setLastRefreshed] = useState<Date>(new Date());
  const [filterType, setFilterType] = useState<'all' | 'human' | 'vpn' | 'bot'>('all');
  const [searchQuery, setSearchQuery] = useState('');
  const [simulatingVisit, setSimulatingVisit] = useState(false);

  // Firestore Realtime Subscription
  useEffect(() => {
    setLoading(true);
    const unsubscribe = subscribeVisitorLogs(
      (newLogs) => {
        setLogs(newLogs);
        setLoading(false);
        setLastRefreshed(new Date());
      },
      (err) => {
        console.warn('[StatsDashboard] Realtime failed, fetching static once:', err);
        fetchVisitorLogsOnce().then((fallbackLogs) => {
          setLogs(fallbackLogs);
          setLoading(false);
        });
      }
    );

    return () => unsubscribe();
  }, []);

  const handleManualRefresh = async () => {
    setLoading(true);
    const freshLogs = await fetchVisitorLogsOnce();
    setLogs(freshLogs);
    setLoading(false);
    setLastRefreshed(new Date());
  };

  // Simulate a test visit if user wants to test logging immediately
  const handleTestVisit = async () => {
    setSimulatingVisit(true);
    // temporarily clear session storage to force recording
    sessionStorage.removeItem('portfolio_tracked_visit_timestamp');
    await trackVisitor('/demo-test');
    setTimeout(async () => {
      await handleManualRefresh();
      setSimulatingVisit(false);
    }, 1200);
  };

  // Aggregated calculations
  const summary = useMemo(() => computeStatsSummary(logs), [logs]);

  // Filtered log entries
  const filteredLogs = useMemo(() => {
    return logs.filter((log) => {
      // Type filter
      if (filterType === 'human' && log.isBot) return false;
      if (filterType === 'bot' && !log.isBot) return false;
      if (filterType === 'vpn' && !(log.isVpn || log.isProxy || log.isTor)) return false;

      // Search query
      if (searchQuery.trim()) {
        const q = searchQuery.toLowerCase();
        const matchCountry = (log.country || '').toLowerCase().includes(q);
        const matchCity = (log.city || '').toLowerCase().includes(q);
        const matchIp = (log.ip || '').toLowerCase().includes(q);
        const matchIsp = (log.isp || '').toLowerCase().includes(q);
        const matchBot = (log.botName || '').toLowerCase().includes(q);
        const matchBrowser = (log.browser || '').toLowerCase().includes(q);
        const matchPath = (log.path || '').toLowerCase().includes(q);
        return matchCountry || matchCity || matchIp || matchIsp || matchBot || matchBrowser || matchPath;
      }

      return true;
    });
  }, [logs, filterType, searchQuery]);

  const humanPercent = summary.totalVisitors > 0 ? Math.round((summary.humanCount / summary.totalVisitors) * 100) : 0;
  const botPercent = summary.totalVisitors > 0 ? Math.round((summary.botCount / summary.totalVisitors) * 100) : 0;
  const vpnPercent = summary.totalVisitors > 0 ? Math.round((summary.vpnCount / summary.totalVisitors) * 100) : 0;

  const formatRelativeTime = (timestamp: number) => {
    const diffSec = Math.floor((Date.now() - timestamp) / 1000);
    if (diffSec < 45) return 'Baru saja';
    if (diffSec < 3600) return `${Math.floor(diffSec / 60)}m lalu`;
    if (diffSec < 86400) return `${Math.floor(diffSec / 3600)}j lalu`;
    return new Date(timestamp).toLocaleDateString('id-ID', {
      day: 'numeric',
      month: 'short',
      hour: '2-digit',
      minute: '2-digit',
    });
  };

  return (
    <div className="min-h-screen bg-[#090A0F] text-[#E1E4EA] pb-16 font-sans relative z-10 selection:bg-gold-500/30">
      {/* Background ambient accents */}
      <div className="fixed top-0 left-1/4 w-96 h-96 bg-gold-500/5 rounded-full blur-[140px] pointer-events-none" />
      <div className="fixed bottom-0 right-1/4 w-96 h-96 bg-blue-500/5 rounded-full blur-[140px] pointer-events-none" />

      {/* Top Sticky Command Bar */}
      <header className="sticky top-0 z-30 bg-[#0C0E14]/90 backdrop-blur-md border-b border-[#1E2230] px-4 sm:px-8 py-3.5">
        <div className="max-w-7xl mx-auto flex flex-wrap items-center justify-between gap-4">
          {/* Brand & Live Stream Indicator */}
          <div className="flex items-center gap-4">
            <button
              onClick={onBackToPortfolio}
              className="inline-flex items-center gap-1.5 text-xs text-ink-300 hover:text-white px-2.5 py-1.5 rounded-lg border border-[#202535] hover:border-gold-500/40 bg-[#121520] transition-colors"
            >
              <ArrowLeft className="w-3.5 h-3.5" />
              <span>Kembali</span>
            </button>

            <div className="h-4 w-px bg-[#202535]" />

            <div>
              <div className="flex items-center gap-2">
                <span className="text-sm font-bold text-white tracking-wide flex items-center gap-1.5">
                  <Radar className="w-4 h-4 text-gold-400" />
                  Visitor Intelligence
                </span>
                <span className="inline-flex items-center gap-1 text-[10px] font-mono px-2 py-0.5 rounded-full bg-emerald-500/10 text-emerald-400 border border-emerald-500/25">
                  <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
                  REALTIME FIRESTORE
                </span>
              </div>
              <p className="text-[11px] text-ink-400 font-mono">
                Sinkronisasi: {lastRefreshed.toLocaleTimeString('id-ID')} · Database: <span className="text-gold-400/90">portfolio-stats-223c9</span>
              </p>
            </div>
          </div>

          {/* Action Buttons */}
          <div className="flex items-center gap-2">
            <button
              onClick={handleTestVisit}
              disabled={simulatingVisit}
              title="Simulasi 1 log kunjungan baru untuk uji coba"
              className="inline-flex items-center gap-1.5 text-xs text-ink-300 hover:text-gold-300 px-3 py-1.5 rounded-lg border border-[#222738] bg-[#11141E] hover:bg-[#151926] transition-all disabled:opacity-50"
            >
              <Activity className={`w-3.5 h-3.5 ${simulatingVisit ? 'animate-spin text-gold-400' : ''}`} />
              <span>{simulatingVisit ? 'Mencatat...' : 'Tes Log Kunjungan'}</span>
            </button>

            <button
              onClick={handleManualRefresh}
              disabled={loading}
              className="inline-flex items-center gap-1.5 text-xs text-ink-300 hover:text-white px-3 py-1.5 rounded-lg border border-[#222738] bg-[#11141E] hover:bg-[#151926] transition-all disabled:opacity-50"
            >
              <RefreshCw className={`w-3.5 h-3.5 ${loading ? 'animate-spin text-gold-400' : ''}`} />
              <span>Refresh</span>
            </button>

            <button
              onClick={onLock}
              className="inline-flex items-center gap-1.5 text-xs text-red-400 hover:text-red-300 px-3 py-1.5 rounded-lg border border-red-500/20 bg-red-500/10 hover:bg-red-500/15 transition-all"
            >
              <Lock className="w-3.5 h-3.5" />
              <span>Kunci Akses</span>
            </button>
          </div>
        </div>
      </header>

      {/* Main Container */}
      <main className="max-w-7xl mx-auto px-4 sm:px-8 pt-8 space-y-8">
        {/* Top KPI Cards (4 Cards) */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {/* Card 1: Total Visitors */}
          <div className="p-5 rounded-2xl bg-gradient-to-b from-[#11141E] to-[#0D0F17] border border-[#202536] shadow-lg relative overflow-hidden group hover:border-[#2C334A] transition-all">
            <div className="flex items-center justify-between mb-3">
              <span className="text-xs font-mono uppercase tracking-wider text-ink-400">Total Kunjungan</span>
              <div className="w-9 h-9 rounded-xl bg-gold-500/10 border border-gold-500/20 flex items-center justify-center text-gold-400">
                <Users className="w-4 h-4" />
              </div>
            </div>
            <div className="text-3xl font-extrabold text-white tracking-tight">
              {summary.totalVisitors.toLocaleString()}
            </div>
            <p className="text-xs text-ink-400 mt-2 flex items-center gap-1.5">
              <span className="inline-block w-1.5 h-1.5 rounded-full bg-gold-400" />
              Tercatat di Firestore log
            </p>
          </div>

          {/* Card 2: Human vs Bot */}
          <div className="p-5 rounded-2xl bg-gradient-to-b from-[#11141E] to-[#0D0F17] border border-[#202536] shadow-lg relative overflow-hidden group hover:border-[#2C334A] transition-all">
            <div className="flex items-center justify-between mb-3">
              <span className="text-xs font-mono uppercase tracking-wider text-ink-400">Pengunjung Human</span>
              <div className="w-9 h-9 rounded-xl bg-emerald-500/10 border border-emerald-500/20 flex items-center justify-center text-emerald-400">
                <CheckCircle2 className="w-4 h-4" />
              </div>
            </div>
            <div className="text-3xl font-extrabold text-white tracking-tight flex items-baseline gap-2">
              <span>{summary.humanCount.toLocaleString()}</span>
              <span className="text-sm font-semibold text-emerald-400 font-mono">({humanPercent}%)</span>
            </div>
            <div className="w-full bg-[#1A1E2B] h-1.5 rounded-full mt-3 overflow-hidden flex">
              <div className="bg-emerald-400 h-full rounded-full transition-all" style={{ width: `${humanPercent}%` }} />
              <div className="bg-purple-500 h-full rounded-full transition-all" style={{ width: `${botPercent}%` }} />
            </div>
            <p className="text-[11px] text-ink-400 mt-2 flex items-center justify-between font-mono">
              <span className="text-emerald-400/90">{summary.humanCount} Manusia</span>
              <span className="text-purple-400/90">{summary.botCount} Bot Crawler</span>
            </p>
          </div>

          {/* Card 3: VPN / Proxy Users */}
          <div className="p-5 rounded-2xl bg-gradient-to-b from-[#11141E] to-[#0D0F17] border border-[#202536] shadow-lg relative overflow-hidden group hover:border-[#2C334A] transition-all">
            <div className="flex items-center justify-between mb-3">
              <span className="text-xs font-mono uppercase tracking-wider text-ink-400">Pengguna VPN / Proxy</span>
              <div className="w-9 h-9 rounded-xl bg-amber-500/10 border border-amber-500/20 flex items-center justify-center text-amber-400">
                <ShieldAlert className="w-4 h-4" />
              </div>
            </div>
            <div className="text-3xl font-extrabold text-white tracking-tight flex items-baseline gap-2">
              <span>{summary.vpnCount.toLocaleString()}</span>
              <span className="text-sm font-semibold text-amber-400 font-mono">({vpnPercent}%)</span>
            </div>
            <p className="text-xs text-ink-400 mt-2 flex items-center gap-1.5">
              {summary.vpnCount > 0 ? (
                <span className="text-amber-400/90 font-medium">
                  {summary.vpnCount} IP teridentifikasi VPN/Tor relay
                </span>
              ) : (
                <span className="text-ink-400">Belum ada deteksi IP VPN</span>
              )}
            </p>
          </div>

          {/* Card 4: Global Reach (Countries) */}
          <div className="p-5 rounded-2xl bg-gradient-to-b from-[#11141E] to-[#0D0F17] border border-[#202536] shadow-lg relative overflow-hidden group hover:border-[#2C334A] transition-all">
            <div className="flex items-center justify-between mb-3">
              <span className="text-xs font-mono uppercase tracking-wider text-ink-400">Sebaran Negara</span>
              <div className="w-9 h-9 rounded-xl bg-sky-500/10 border border-sky-500/20 flex items-center justify-center text-sky-400">
                <Compass className="w-4 h-4" />
              </div>
            </div>
            <div className="text-3xl font-extrabold text-white tracking-tight">
              {summary.uniqueCountries} <span className="text-sm font-normal text-ink-400">Negara</span>
            </div>
            <p className="text-xs text-ink-400 mt-2 truncate">
              Asal terbanyak:{' '}
              <span className="text-white font-medium">
                {summary.topCountries[0]?.country || 'Belum ada data'}
              </span>
            </p>
          </div>
        </div>

        {/* Analytic Breakdown Grids (Country Distribution & Security Classification) */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Left 2 Cols: Geographic & Countries Breakdown */}
          <div className="lg:col-span-2 rounded-2xl bg-[#0D0F17] border border-[#202536] p-6 shadow-xl">
            <div className="flex items-center justify-between mb-5 pb-4 border-b border-[#1A1F2E]">
              <div>
                <h2 className="text-base font-bold text-white flex items-center gap-2">
                  <Globe className="w-4 h-4 text-gold-400" />
                  Distribusi Negara Pengunjung
                </h2>
                <p className="text-xs text-ink-400 mt-0.5">
                  Berdasarkan pemetaan GeoIP Intelligence
                </p>
              </div>
              <span className="text-xs font-mono text-ink-400">
                {summary.topCountries.length} Lokasi Terdata
              </span>
            </div>

            {summary.topCountries.length === 0 ? (
              <div className="py-12 text-center text-xs text-ink-400">
                Belum ada data pengunjung yang tercatat.
              </div>
            ) : (
              <div className="space-y-3.5">
                {summary.topCountries.slice(0, 6).map((item) => (
                  <div key={item.country} className="space-y-1.5">
                    <div className="flex items-center justify-between text-xs">
                      <div className="flex items-center gap-2 font-medium text-white">
                        <span className="font-mono text-[11px] px-1.5 py-0.5 rounded bg-[#161A26] border border-[#232838] text-gold-400">
                          {item.countryCode}
                        </span>
                        <span>{item.country}</span>
                      </div>
                      <div className="flex items-center gap-3 font-mono text-ink-400 text-[11px]">
                        <span>{item.count} kunjungan</span>
                        <span className="text-white font-bold w-10 text-right">{item.percentage}%</span>
                      </div>
                    </div>
                    {/* Progress bar */}
                    <div className="w-full bg-[#161A26] h-2 rounded-full overflow-hidden">
                      <div
                        className="bg-gradient-to-r from-gold-500 to-amber-400 h-full rounded-full transition-all duration-500"
                        style={{ width: `${Math.max(item.percentage, 4)}%` }}
                      />
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>

          {/* Right 1 Col: Security & Bot Radar */}
          <div className="rounded-2xl bg-[#0D0F17] border border-[#202536] p-6 shadow-xl space-y-6">
            <div>
              <div className="flex items-center justify-between mb-4 pb-3 border-b border-[#1A1F2E]">
                <h2 className="text-base font-bold text-white flex items-center gap-2">
                  <Cpu className="w-4 h-4 text-purple-400" />
                  Bot & Scraper Telemetry
                </h2>
              </div>

              {Object.keys(summary.botBreakdown).length === 0 ? (
                <div className="py-4 text-center text-xs text-ink-400">
                  Tidak ada bot crawler yang terdeteksi saat ini.
                </div>
              ) : (
                <div className="space-y-2.5">
                  {Object.entries(summary.botBreakdown).map(([botName, count]) => (
                    <div
                      key={botName}
                      className="flex items-center justify-between p-2.5 rounded-xl bg-[#121520] border border-[#1E2332] text-xs"
                    >
                      <span className="font-mono text-purple-300 truncate max-w-[170px]">
                        {botName}
                      </span>
                      <span className="px-2 py-0.5 rounded-md font-mono text-[11px] font-bold text-purple-300 bg-purple-500/10 border border-purple-500/20">
                        {count} hits
                      </span>
                    </div>
                  ))}
                </div>
              )}
            </div>

            {/* Device breakdown */}
            <div className="pt-2 border-t border-[#1A1F2E]">
              <h3 className="text-xs font-mono uppercase tracking-wider text-ink-400 mb-3">
                Tipe Perangkat
              </h3>
              <div className="grid grid-cols-3 gap-2 text-center">
                <div className="p-2.5 rounded-xl bg-[#121520] border border-[#1E2332]">
                  <Laptop className="w-4 h-4 mx-auto text-ink-300 mb-1" />
                  <div className="text-xs font-bold text-white">{summary.deviceBreakdown.desktop}</div>
                  <div className="text-[10px] text-ink-400 font-mono">Desktop</div>
                </div>
                <div className="p-2.5 rounded-xl bg-[#121520] border border-[#1E2332]">
                  <Smartphone className="w-4 h-4 mx-auto text-ink-300 mb-1" />
                  <div className="text-xs font-bold text-white">{summary.deviceBreakdown.mobile}</div>
                  <div className="text-[10px] text-ink-400 font-mono">Mobile</div>
                </div>
                <div className="p-2.5 rounded-xl bg-[#121520] border border-[#1E2332]">
                  <Server className="w-4 h-4 mx-auto text-ink-300 mb-1" />
                  <div className="text-xs font-bold text-white">{summary.deviceBreakdown.tablet}</div>
                  <div className="text-[10px] text-ink-400 font-mono">Tablet</div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Live Visitor Activity Stream Table */}
        <div className="rounded-2xl bg-[#0D0F17] border border-[#202536] shadow-xl overflow-hidden">
          {/* Table Header & Search Filter Bar */}
          <div className="p-6 border-b border-[#1A1F2E] flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
            <div>
              <h2 className="text-lg font-bold text-white flex items-center gap-2">
                <Terminal className="w-5 h-5 text-gold-400" />
                Live Audit Logs Pengunjung
              </h2>
              <p className="text-xs text-ink-400 mt-0.5">
                Menampilkan rekaman log real-time dari Firestore ({filteredLogs.length} entri)
              </p>
            </div>

            {/* Filter Pills & Search */}
            <div className="flex flex-wrap items-center gap-2 w-full md:w-auto">
              {/* Type Pills */}
              <div className="inline-flex rounded-xl bg-[#121520] p-1 border border-[#1F2435]">
                <button
                  type="button"
                  onClick={() => setFilterType('all')}
                  className={`px-3 py-1 text-xs rounded-lg font-medium transition-all ${
                    filterType === 'all'
                      ? 'bg-gold-500 text-canvas font-bold shadow'
                      : 'text-ink-400 hover:text-white'
                  }`}
                >
                  Semua ({logs.length})
                </button>
                <button
                  type="button"
                  onClick={() => setFilterType('human')}
                  className={`px-3 py-1 text-xs rounded-lg font-medium transition-all ${
                    filterType === 'human'
                      ? 'bg-emerald-500 text-canvas font-bold shadow'
                      : 'text-ink-400 hover:text-white'
                  }`}
                >
                  Human ({summary.humanCount})
                </button>
                <button
                  type="button"
                  onClick={() => setFilterType('vpn')}
                  className={`px-3 py-1 text-xs rounded-lg font-medium transition-all ${
                    filterType === 'vpn'
                      ? 'bg-amber-500 text-canvas font-bold shadow'
                      : 'text-ink-400 hover:text-white'
                  }`}
                >
                  VPN ({summary.vpnCount})
                </button>
                <button
                  type="button"
                  onClick={() => setFilterType('bot')}
                  className={`px-3 py-1 text-xs rounded-lg font-medium transition-all ${
                    filterType === 'bot'
                      ? 'bg-purple-500 text-canvas font-bold shadow'
                      : 'text-ink-400 hover:text-white'
                  }`}
                >
                  Bot ({summary.botCount})
                </button>
              </div>

              {/* Search Box */}
              <div className="relative flex-1 md:w-56">
                <Search className="w-3.5 h-3.5 text-ink-400 absolute left-3 top-1/2 -translate-y-1/2" />
                <input
                  type="text"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  placeholder="Cari IP, negara, bot..."
                  className="w-full pl-9 pr-3 py-1.5 text-xs text-white bg-[#121520] border border-[#1F2435] rounded-xl focus:border-gold-500/70 focus:outline-none placeholder-ink-500"
                />
              </div>
            </div>
          </div>

          {/* Table */}
          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs border-collapse">
              <thead>
                <tr className="border-b border-[#1A1F2E] bg-[#0A0B10] text-[11px] font-mono uppercase text-ink-400">
                  <th className="py-3 px-4 font-semibold">Waktu</th>
                  <th className="py-3 px-4 font-semibold">IP & ISP</th>
                  <th className="py-3 px-4 font-semibold">Lokasi Geografis</th>
                  <th className="py-3 px-4 font-semibold">Klasifikasi Keamanan</th>
                  <th className="py-3 px-4 font-semibold">Perangkat / OS</th>
                  <th className="py-3 px-4 font-semibold">Halaman</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-[#161925]">
                {loading && logs.length === 0 ? (
                  <tr>
                    <td colSpan={6} className="py-12 text-center text-ink-400">
                      <div className="flex items-center justify-center gap-2">
                        <RefreshCw className="w-4 h-4 animate-spin text-gold-400" />
                        <span>Memuat data dari Firebase...</span>
                      </div>
                    </td>
                  </tr>
                ) : filteredLogs.length === 0 ? (
                  <tr>
                    <td colSpan={6} className="py-12 text-center text-ink-400">
                      Tidak ada log pengunjung yang sesuai dengan kriteria filter.
                    </td>
                  </tr>
                ) : (
                  filteredLogs.map((log) => {
                    const isVpnDetected = log.isVpn || log.isProxy || log.isTor;

                    return (
                      <tr
                        key={log.id || `${log.timestamp}-${log.ip}`}
                        className="hover:bg-[#121522]/60 transition-colors"
                      >
                        {/* Waktu */}
                        <td className="py-3.5 px-4 whitespace-nowrap">
                          <div className="font-medium text-white">
                            {formatRelativeTime(log.timestamp)}
                          </div>
                          <div className="text-[10px] text-ink-500 font-mono">
                            {new Date(log.timestamp).toLocaleTimeString('id-ID', { hour: '2-digit', minute: '2-digit', second: '2-digit' })}
                          </div>
                        </td>

                        {/* IP & ISP */}
                        <td className="py-3.5 px-4">
                          <div className="font-mono text-white font-medium">
                            {log.ip}
                          </div>
                          <div className="text-[11px] text-ink-400 truncate max-w-[180px]" title={log.isp}>
                            {log.isp || 'Unknown ISP'}
                          </div>
                        </td>

                        {/* Lokasi */}
                        <td className="py-3.5 px-4">
                          <div className="flex items-center gap-1.5 font-medium text-white">
                            <span className="font-mono text-[10px] px-1 py-0.2 rounded bg-[#161A26] border border-[#232838] text-gold-400">
                              {log.countryCode || 'UN'}
                            </span>
                            <span>{log.country || 'Unknown'}</span>
                          </div>
                          <div className="text-[11px] text-ink-400">
                            {log.city && log.city !== 'Unknown' ? log.city : '-'}
                          </div>
                        </td>

                        {/* Klasifikasi Keamanan & Deteksi */}
                        <td className="py-3.5 px-4 whitespace-nowrap">
                          <div className="flex flex-wrap items-center gap-1.5">
                            {log.isBot ? (
                              <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-md text-[10px] font-mono font-bold bg-purple-500/15 text-purple-300 border border-purple-500/30">
                                <Bot className="w-3 h-3" />
                                {log.botName || 'Bot'}
                              </span>
                            ) : (
                              <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-md text-[10px] font-mono font-bold bg-emerald-500/15 text-emerald-400 border border-emerald-500/30">
                                <CheckCircle2 className="w-3 h-3" />
                                Human
                              </span>
                            )}

                            {isVpnDetected && (
                              <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-md text-[10px] font-mono font-bold bg-amber-500/15 text-amber-400 border border-amber-500/30">
                                <AlertTriangle className="w-3 h-3" />
                                VPN Detected
                              </span>
                            )}

                            {log.isDatacenter && !isVpnDetected && (
                              <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-md text-[10px] font-mono text-blue-400 bg-blue-500/10 border border-blue-500/20">
                                Datacenter
                              </span>
                            )}
                          </div>
                        </td>

                        {/* Perangkat & Browser */}
                        <td className="py-3.5 px-4">
                          <div className="text-white font-medium">
                            {log.browser} · {log.os}
                          </div>
                          <div className="text-[10px] text-ink-500 font-mono">
                            {log.deviceType} ({log.screenResolution})
                          </div>
                        </td>

                        {/* Halaman */}
                        <td className="py-3.5 px-4 font-mono text-[11px] text-gold-400/90">
                          {log.path || '/'}
                        </td>
                      </tr>
                    );
                  })
                )}
              </tbody>
            </table>
          </div>
        </div>
      </main>
    </div>
  );
}
