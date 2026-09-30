import { useState, useMemo, useEffect } from 'react';
import {
  ArrowLeft,
  Search,
  BookOpen,
  X,
  Layers,
  Sparkles,
  Download,
  Filter,
} from 'lucide-react';
import ArticleCard3D from './ArticleCard3D';
import ArticleReaderModal from './ArticleReaderModal';
import Reveal from './Reveal';
import { downloadCvPdf } from '../utils/generateCvPdf';
import type { Article } from '../types';

interface ArticlesPageProps {
  articles: Article[];
  onBackToPortfolio: () => void;
  onIncrementRead?: (id: string) => void;
  currentPath: string;
  onNavigate: (path: string) => void;
}

export default function ArticlesPage({
  articles = [],
  onBackToPortfolio,
  onIncrementRead,
  currentPath,
  onNavigate,
}: ArticlesPageProps) {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [selectedArticle, setSelectedArticle] = useState<Article | null>(null);

  // Filter only published articles for public view
  const publishedArticles = useMemo(
    () => articles.filter((a) => a.published !== false),
    [articles]
  );

  // Extract unique categories
  const categories = useMemo(() => {
    const cats = Array.from(new Set(publishedArticles.map((a) => a.category).filter(Boolean)));
    return ['all', ...cats];
  }, [publishedArticles]);

  // Handle direct slug route (e.g. /articles/:slug or /blogs/:slug)
  useEffect(() => {
    const parts = currentPath.split('/').filter(Boolean);
    if (parts.length >= 2) {
      const slug = parts[1];
      const match = publishedArticles.find((a) => a.slug === slug || a.id === slug);
      if (match) {
        setSelectedArticle(match);
      }
    } else {
      setSelectedArticle(null);
    }
  }, [currentPath, publishedArticles]);

  // Filter articles based on search query and category
  const filteredArticles = useMemo(() => {
    return publishedArticles.filter((art) => {
      const matchesCategory =
        selectedCategory === 'all' ||
        art.category.toLowerCase() === selectedCategory.toLowerCase();

      if (!matchesCategory) return false;

      if (!searchQuery.trim()) return true;

      const q = searchQuery.toLowerCase();
      const matchTitle = art.title.toLowerCase().includes(q);
      const matchExcerpt = art.excerpt.toLowerCase().includes(q);
      const matchCategory = art.category.toLowerCase().includes(q);
      const matchTags = (art.tags || []).some((t) => t.toLowerCase().includes(q));

      return matchTitle || matchExcerpt || matchCategory || matchTags;
    });
  }, [publishedArticles, selectedCategory, searchQuery]);

  const handleOpenArticle = (art: Article) => {
    setSelectedArticle(art);
    onNavigate(`/articles/${art.slug}`);
  };

  const handleCloseArticle = () => {
    setSelectedArticle(null);
    onNavigate('/articles');
  };

  return (
    <div className="min-h-screen bg-[#0B0C10] text-[#E1E4EA] relative flex flex-col">
      {/* Top Header Navigation */}
      <header className="sticky top-0 z-40 border-b border-[#1E2230] bg-[#0B0C10]/95 backdrop-blur-md">
        <div className="shell flex h-20 items-center justify-between">
          {/* Brand Logo & Back Link */}
          <div className="flex items-center gap-4">
            <button
              onClick={onBackToPortfolio}
              className="flex items-center gap-2 px-3 py-1.5 rounded-lg border border-[#232736] hover:border-gold-500/40 bg-[#121520] text-ink-300 hover:text-white font-mono text-xs font-semibold transition-colors cursor-pointer group"
              title="Kembali ke Portofolio Utama"
            >
              <ArrowLeft
                size={14}
                className="transform transition-transform group-hover:-translate-x-1 text-gold-400"
              />
              <span>Portfolio</span>
            </button>

            <span className="hidden sm:inline-block text-graphite-600">/</span>

            <span className="hidden sm:flex items-center gap-1.5 font-mono text-xs text-gold-400 tracking-wider uppercase font-bold">
              <BookOpen size={13} className="text-gold-accent" />
              Articles & Insights
            </span>
          </div>

          {/* Right Header Actions */}
          <div className="flex items-center gap-3">
            <button
              onClick={() => downloadCvPdf()}
              className="hidden md:inline-flex items-center gap-1.5 px-3 py-2 text-xs font-mono font-bold text-gold-300 hover:text-white border border-gold-500/30 hover:border-gold-400 rounded-lg bg-[#141722] transition-colors cursor-pointer"
              title="Download Official Curriculum Vitae (PDF)"
            >
              <Download size={13} className="text-gold-accent" />
              <span>CV</span>
            </button>

            <button
              onClick={onBackToPortfolio}
              className="btn-gold ml-1 inline-flex items-center gap-2 rounded-lg px-4 py-2 text-xs font-bold uppercase tracking-wider text-canvas shadow-gold-glow cursor-pointer"
            >
              Contact
            </button>
          </div>
        </div>
      </header>

      {/* Main Articles Page Content */}
      <main className="flex-1 py-10 sm:py-14">
        <div className="shell space-y-10">
          {/* Hero Banner Header */}
          <div className="relative rounded-2xl border border-[#232736] bg-gradient-to-b from-[#141724] via-[#0F111A] to-[#0A0B10] p-6 sm:p-10 overflow-hidden shadow-lift">
            {/* Background Ambient Glow */}
            <div className="pointer-events-none absolute -top-24 -right-24 w-96 h-96 bg-gold-500/10 rounded-full blur-3xl" />

            <div className="relative z-10 max-w-2xl space-y-3">
              <Reveal>
                <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-gold-500/10 border border-gold-500/25 text-gold-400 font-mono text-[11px] font-bold tracking-wider uppercase">
                  <Sparkles size={12} className="text-gold-400" />
                  KNOWLEDGE BASE & ARCHITECTURE NOTES
                </div>
              </Reveal>

              <Reveal delay={60}>
                <h1 className="font-sans text-3xl sm:text-4xl lg:text-5xl font-extrabold text-white tracking-tight leading-tight">
                  Articles & Insights
                </h1>
              </Reveal>

              <Reveal delay={120}>
                <p className="font-sans text-sm sm:text-base text-ink-300 leading-relaxed">
                  Dokumentasi teknis, riset multi-agent AI, perancangan arsitektur microservices performa tinggi, dan catatan rekayasa software oleh Bramastyo Kusumo.
                </p>
              </Reveal>
            </div>

            {/* Search & Filter Toolbar */}
            <div className="relative z-10 mt-8 pt-6 border-t border-[#1F2332] flex flex-col md:flex-row items-stretch md:items-center justify-between gap-4">
              {/* Search Bar */}
              <div className="relative flex-1 max-w-md">
                <Search size={15} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-ink-400" />
                <input
                  type="text"
                  placeholder="Cari artikel, topik, atau kata kunci..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full pl-10 pr-9 py-2.5 rounded-xl border border-[#282D3E] bg-[#0E1017] text-white text-xs font-sans placeholder-ink-400 focus:outline-none focus:border-gold-500 transition-colors"
                />
                {searchQuery && (
                  <button
                    onClick={() => setSearchQuery('')}
                    className="absolute right-3 top-1/2 -translate-y-1/2 text-ink-400 hover:text-white"
                  >
                    <X size={14} />
                  </button>
                )}
              </div>

              {/* Counter Indicator */}
              <div className="flex items-center gap-2 text-xs font-mono text-ink-400 self-end md:self-center">
                <Filter size={13} className="text-gold-400" />
                <span>
                  Showing <strong className="text-white">{filteredArticles.length}</strong> of{' '}
                  {publishedArticles.length} articles
                </span>
              </div>
            </div>

            {/* Category Filter Pills */}
            <div className="relative z-10 mt-4 flex flex-wrap items-center gap-1.5">
              {categories.map((cat) => {
                const isActive = selectedCategory === cat;
                return (
                  <button
                    key={cat}
                    onClick={() => setSelectedCategory(cat)}
                    className={`px-3 py-1.5 rounded-lg text-xs font-mono font-semibold transition-all duration-150 cursor-pointer ${
                      isActive
                        ? 'bg-gold-500 text-canvas font-bold shadow-[0_0_12px_rgba(229,169,60,0.35)]'
                        : 'bg-[#121520] text-ink-300 hover:text-white border border-[#232736] hover:border-gold-500/30'
                    }`}
                  >
                    {cat === 'all' ? 'All Topics' : cat}
                  </button>
                );
              })}
            </div>
          </div>

          {/* 3D Depth Parallax Article Cards Grid */}
          {filteredArticles.length === 0 ? (
            <div className="rounded-2xl border border-[#232736] bg-[#0E1017]/60 p-12 text-center space-y-3">
              <Layers size={32} className="mx-auto text-gold-500/40" />
              <h3 className="font-sans text-base font-bold text-white">Tidak ada artikel yang cocok</h3>
              <p className="font-sans text-xs text-ink-300 max-w-sm mx-auto">
                Coba sesuaikan kata kunci pencarian atau pilih kategori topik lainnya.
              </p>
              {searchQuery && (
                <button
                  onClick={() => setSearchQuery('')}
                  className="mt-2 inline-flex items-center gap-1 px-3 py-1.5 rounded-lg text-xs font-mono font-semibold text-gold-400 border border-gold-500/30 hover:border-gold-400 transition-colors"
                >
                  Reset Pencarian
                </button>
              )}
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 items-stretch">
              {filteredArticles.map((art, idx) => (
                <Reveal key={art.id} delay={idx * 50}>
                  <ArticleCard3D article={art} onClick={() => handleOpenArticle(art)} />
                </Reveal>
              ))}
            </div>
          )}
        </div>
      </main>

      {/* Footer */}
      <footer className="border-t border-[#1E2230] bg-[#0B0C10] py-8 text-center text-xs font-mono text-ink-400">
        <div className="shell flex flex-col sm:flex-row items-center justify-between gap-4">
          <p>© {new Date().getFullYear()} Bramastyo Kusumo. All rights reserved.</p>
          <button
            onClick={onBackToPortfolio}
            className="text-gold-400 hover:text-gold-300 transition-colors"
          >
            ← Back to Main Portfolio
          </button>
        </div>
      </footer>

      {/* Immersive Reader Modal */}
      <ArticleReaderModal
        article={selectedArticle}
        isOpen={!!selectedArticle}
        onClose={handleCloseArticle}
        onIncrementRead={onIncrementRead}
      />
    </div>
  );
}
