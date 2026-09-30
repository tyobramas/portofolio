import { useState } from 'react';
import { BookOpen, Layers } from 'lucide-react';
import Reveal from './Reveal';
import ArticleCard3D from './ArticleCard3D';
import ArticleReaderModal from './ArticleReaderModal';
import type { Article } from '../types';

interface ArticlesListProps {
  articles: Article[];
  onIncrementRead?: (id: string) => void;
}

export default function ArticlesList({ articles = [], onIncrementRead }: ArticlesListProps) {
  const [activeCategory, setActiveCategory] = useState<string>('all');
  const [selectedArticle, setSelectedArticle] = useState<Article | null>(null);

  // Filter only published articles for public visitors
  const publishedArticles = articles.filter((a) => a.published !== false);

  // Extract unique categories
  const categories = ['all', ...Array.from(new Set(publishedArticles.map((a) => a.category).filter(Boolean)))];

  const filteredArticles = publishedArticles.filter((a) => {
    if (activeCategory === 'all') return true;
    return a.category.toLowerCase() === activeCategory.toLowerCase();
  });

  return (
    <section id="articles" className="relative py-14 sm:py-16">
      <div className="shell">
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-8 gap-4">
          <div className="space-y-2">
            <Reveal>
              <span className="inline-flex items-center gap-1.5 font-sans text-xs font-bold uppercase tracking-widest text-gold-400">
                <BookOpen size={13} className="text-gold-accent" />
                TECHNICAL INSIGHTS & ARTICLES
              </span>
            </Reveal>
            <Reveal delay={60}>
              <h2 className="font-sans text-3xl sm:text-4xl lg:text-5xl font-extrabold text-white tracking-tight">
                Engineering Showcase
              </h2>
            </Reveal>
            <Reveal delay={100}>
              <p className="font-sans text-sm text-ink-300 max-w-xl">
                Dokumentasi arsitektur sistem skala produksi, riset AI agentic, dan catatan performa rekayasa perangkat lunak.
              </p>
            </Reveal>
          </div>

          {/* Category Filter Pills (Compact) */}
          <Reveal delay={120}>
            <div className="flex flex-wrap items-center gap-1.5 self-start md:self-end">
              {categories.map((cat) => {
                const isActive = activeCategory === cat;
                return (
                  <button
                    key={cat}
                    onClick={() => setActiveCategory(cat)}
                    className={`px-3 py-1.5 rounded-lg text-xs font-mono font-semibold transition-all duration-200 cursor-pointer ${
                      isActive
                        ? 'bg-gold-500 text-canvas font-bold shadow-[0_0_12px_rgba(229,169,60,0.35)]'
                        : 'bg-[#131622] text-ink-300 hover:text-white border border-[#232736] hover:border-gold-500/30'
                    }`}
                  >
                    {cat === 'all' ? 'All Topics' : cat}
                  </button>
                );
              })}
            </div>
          </Reveal>
        </div>

        {/* 3D Depth Parallax Cards Grid */}
        {filteredArticles.length === 0 ? (
          <div className="rounded-xl border border-[#232736] bg-[#0E1017]/50 p-10 text-center text-ink-400 font-mono text-xs">
            <Layers size={24} className="mx-auto text-gold-500/40 mb-2" />
            <p>Tidak ada artikel untuk topik ini saat ini.</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5 items-stretch">
            {filteredArticles.map((article, idx) => (
              <Reveal key={article.id} delay={idx * 60}>
                <ArticleCard3D
                  article={article}
                  onClick={() => setSelectedArticle(article)}
                />
              </Reveal>
            ))}
          </div>
        )}
      </div>

      {/* Immersive Reader Modal */}
      <ArticleReaderModal
        article={selectedArticle}
        isOpen={!!selectedArticle}
        onClose={() => setSelectedArticle(null)}
        onIncrementRead={onIncrementRead}
      />
    </section>
  );
}
