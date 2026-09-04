import Reveal from './Reveal';

interface MetricItem {
  value: string;
  label: string;
  detail: string;
}

const METRICS: MetricItem[] = [
  {
    value: '13+',
    label: 'Tahun Pengalaman',
    detail: 'Rekayasa sistem produksi sejak 2013',
  },
  {
    value: '40+',
    label: 'Platform Enterprise',
    detail: 'Aplikasi mobile, SaaS & API publik',
  },
  {
    value: '5M+',
    label: 'Throughput Bulanan',
    detail: 'Pipeline data ekstraksi & scraping',
  },
  {
    value: '<80ms',
    label: 'Latensi Respon API',
    detail: 'Arsitektur terdistribusi & caching',
  },
];

export default function ExecutiveHero() {
  return (
    <section className="pb-10 pt-2 border-b border-rule mb-10">
      <Reveal>
        <div className="space-y-4">
          <div className="inline-flex items-center gap-2 rounded-full border border-brass-400/40 bg-brass-50 px-3 py-1">
            <span className="h-1.5 w-1.5 rounded-full bg-brass-500 animate-pulse" />
            <span className="font-mono text-[0.6875rem] font-semibold tracking-widest text-brass-700 uppercase">
              Principal Engineering Dossier · 2013 — Sekarang
            </span>
          </div>

          <h1 className="font-display text-2xl sm:text-3xl lg:text-4xl text-ink-950 font-normal tracking-tight leading-[1.15]">
            Engineering Mission-Critical Mobile, Distributed Backend & Autonomous AI Systems.
          </h1>

          <p className="max-w-prose text-body sm:text-lead text-ink-600 leading-relaxed font-sans">
            Membantu perusahaan dan institusi enterprise membangun keunggulan teknologi jangka panjang: dari aplikasi mobile lintas platform (Flutter) dengan jutaan interaksi, sistem transaksi inventaris berkecepatan tinggi, hingga pipeline otomasi alur kerja AI otonom tingkat produksi.
          </p>
        </div>
      </Reveal>

      {/* KPI Ribbon: Financial-Grade Metric Plaques */}
      <div className="mt-8 grid grid-cols-2 lg:grid-cols-4 gap-3">
        {METRICS.map((metric, i) => (
          <Reveal key={metric.label} delay={i * 45}>
            <div className="panel p-4 sm:p-5 relative overflow-hidden group hover:border-brass-400/60 transition-all duration-200">
              <div className="absolute top-0 left-0 right-0 h-0.5 bg-gradient-to-r from-brass-400/40 via-brass-500/80 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
              <p className="tabular font-display text-2xl sm:text-3xl font-semibold text-ink-900 tracking-tight">
                {metric.value}
              </p>
              <p className="mt-1 font-sans text-meta font-semibold text-ink-800">
                {metric.label}
              </p>
              <p className="mt-0.5 text-[0.75rem] text-ink-500 leading-snug">
                {metric.detail}
              </p>
            </div>
          </Reveal>
        ))}
      </div>
    </section>
  );
}
