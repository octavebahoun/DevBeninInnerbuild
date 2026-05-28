import React, { useState, useEffect, useMemo } from 'react';
import { Heart, MessageSquare, ArrowRight } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { ScrollReveal } from './ScrollReveal';
import { articleStore } from '../lib/articleStore';

export default function Blog() {
  const [activeCategory, setActiveCategory] = useState('Tous');
  const [articles, setArticles] = useState([]);
  const [likedArticles, setLikedArticles] = useState({});

  useEffect(() => {
    setArticles(articleStore.getArticles());
    setLikedArticles(articleStore.getLikesMap());
  }, []);

  const handleLike = (articleId) => {
    const result = articleStore.toggleLike(articleId);
    setArticles(result.articles);
    setLikedArticles(result.likesMap);
  };

  const categories = useMemo(() => {
    const unique = new Set(articles.map((article) => article.category));
    return ['Tous', ...Array.from(unique)];
  }, [articles]);
  const filteredArticles = activeCategory === 'Tous'
    ? articles
    : articles.filter(art => art.category === activeCategory);

  return (
    <section
      id="blog"
      className="relative py-20 px-4 sm:px-6 lg:px-8 pattern-dots"
      style={{ backgroundColor: 'var(--bg)', borderBottom: '1px solid var(--border-col)' }}
    >
      <div className="mx-auto max-w-5xl">
        {/* Section Header */}
        <div className="mb-12">
          <ScrollReveal variant="fadeLeft" duration={0.5}>
            <div className="section-label"><span>02</span><span>Ressources &amp; Articles</span></div>
          </ScrollReveal>
          <ScrollReveal variant="fadeUp" delay={0.1}>
            <h2 data-gsap-title className="mt-3 text-h2" style={{ color: 'var(--text-main)' }}>
              Le Coin <span style={{ color: 'var(--accent-orange)' }}>Blog</span>
            </h2>
          </ScrollReveal>
          <ScrollReveal variant="fadeUp" delay={0.2}>
            <p className="mt-4 text-body max-w-2xl font-light" style={{ color: 'var(--text-sub)' }}>
              Un espace dédié à l'innovation, l'apprentissage et le partage de connaissances qui font la différence dans l'écosystème tech béninois.
            </p>
          </ScrollReveal>
        </div>

        {/* Categories selector */}
        <div className="flex flex-wrap gap-2 mb-10">
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setActiveCategory(cat)}
              className="rounded-full px-4 py-1.5 text-small font-semibold tracking-wider transition-all duration-200"
              style={
                activeCategory === cat
                  ? {
                      background: 'var(--accent-orange)',
                      color: '#fff',
                      border: '1px solid var(--accent-orange)',
                      boxShadow: '0 2px 12px var(--glow-orange)'
                    }
                  : {
                      background: 'var(--card-bg)',
                      border: '1px solid var(--border-col)',
                      color: 'var(--text-muted)'
                    }
              }
            >
              {cat}
            </button>
          ))}
        </div>

        {/* Articles Bento Grid */}
        <motion.div 
          layout 
          className="grid grid-cols-1 md:grid-cols-3 gap-6 auto-rows-auto"
        >
          <AnimatePresence mode="popLayout">
            {filteredArticles.map((art, index) => {
              // Bento layout selection
              const isBento = filteredArticles.length >= 3;
              const isWide0 = isBento && index === 0;
              const isWide2 = isBento && index === 2;
              const isTall  = isBento && index === 1;

              let gridClasses = "col-span-1";
              if (isWide0) gridClasses = "md:col-span-2 md:row-span-1";
              if (isWide2) gridClasses = "md:col-span-2 md:row-span-1";
              if (isTall)  gridClasses = "md:col-span-1 md:row-span-2";

              return (
                <motion.article
                  layout
                  key={art.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -20 }}
                  transition={{ duration: 0.3 }}
                  className={`overflow-hidden rounded-3xl flex flex-col justify-between transition-all duration-300 transform-style-3d group relative ${gridClasses}`}
                  style={{
                    backgroundColor: 'var(--card-bg)',
                    border: '1px solid var(--border-col)',
                    minHeight: isTall ? '500px' : 'auto',
                    boxShadow: '0 4px 20px -5px rgba(0,0,0,0.1)'
                  }}
                  onMouseEnter={e => {
                    e.currentTarget.style.borderColor = 'var(--accent-orange)';
                    e.currentTarget.style.transform = 'translateY(-4px)';
                    e.currentTarget.style.boxShadow = '0 15px 30px -10px rgba(249, 115, 22, 0.15)';
                  }}
                  onMouseLeave={e => {
                    e.currentTarget.style.borderColor = 'var(--border-col)';
                    e.currentTarget.style.transform = 'translateY(0)';
                    e.currentTarget.style.boxShadow = '0 4px 20px -5px rgba(0,0,0,0.1)';
                  }}
                >
                  {/* Internal layout depending on Bento Card shape */}
                  <div className={`flex flex-col h-full w-full ${isWide0 ? 'md:flex-row' : ''} ${isWide2 ? 'md:flex-row-reverse' : ''}`}>
                    
                    {/* Thumb Area: Abstract Tech Visual Cover */}
                    <div
                      className={`flex items-center justify-center relative overflow-hidden flex-shrink-0 transition-colors duration-300 ${
                        (isWide0 || isWide2) ? 'w-full md:w-2/5 h-40 md:h-auto bg-[var(--surface)]' : 'w-full h-36 bg-[var(--surface)]'
                      }`}
                      style={{
                        borderBottom: (isWide0 || isWide2) ? 'none' : '1px solid var(--border-col)',
                        borderRight: isWide0 ? '1px solid var(--border-col)' : 'none',
                        borderLeft: isWide2 ? '1px solid var(--border-col)' : 'none',
                      }}
                    >
                      {/* Grid background overlay */}
                      <div className="absolute inset-0 pattern-dots opacity-40" />
                      {/* Accent glow on thumb */}
                      <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,var(--glow-orange),transparent_70%)] opacity-35" />
                      
                      {/* Floating abstract code/brackets */}
                      <div className="absolute -left-2 -bottom-2 text-4xl opacity-5 font-mono select-none pointer-events-none group-hover:scale-110 transition-transform duration-300">
                        &lt;/&gt;
                      </div>
                      
                      <div
                        className="relative z-10 font-display text-stag bg-black/30 border border-white/5 rounded-full px-4 py-1.5 backdrop-blur-md uppercase tracking-widest text-[9px] group-hover:scale-105 transition-transform duration-300"
                        style={{ color: 'var(--accent-orange)' }}
                      >
                        {art.category}
                      </div>
                    </div>

                    {/* Article Body */}
                    <div className="p-6 flex flex-col justify-between flex-1">
                      <div>
                        {/* Tags */}
                        <div className="flex gap-1.5 mb-4">
                          {art.tags.map((tag) => (
                            <span
                              key={tag}
                              className="rounded px-2 py-0.5 text-[8px] font-bold uppercase tracking-wider"
                              style={{
                                background: 'var(--glow-orange)',
                                border: '1px solid var(--border-orange)',
                                color: 'var(--accent-orange)'
                              }}
                            >
                              {tag}
                            </span>
                          ))}
                        </div>

                        <h3
                          className="font-display text-h3 font-semibold tracking-wide leading-snug group-hover:text-[var(--accent-orange)] transition-colors duration-300"
                          style={{ color: 'var(--text-main)' }}
                        >
                          {art.title}
                        </h3>

                        <p
                          className="mt-3 text-small leading-relaxed font-light"
                          style={{ color: 'var(--text-sub)' }}
                        >
                          {art.preview}
                        </p>
                      </div>

                      <div className="mt-6 pt-4" style={{ borderTop: '1px solid var(--border-col)' }}>
                        <div className="text-[9px] font-mono" style={{ color: 'var(--text-sub)' }}>
                          Par <span style={{ color: 'var(--accent-green)' }} className="font-bold">{art.author}</span> · {art.date}
                        </div>

                        <div className="mt-4 flex items-center justify-between">
                          <div className="flex items-center gap-4">
                            {/* Like Button */}
                            <button
                              onClick={() => handleLike(art.id)}
                              className="flex items-center gap-1.5 text-[10px] font-bold transition-transform active:scale-90"
                              style={{ color: likedArticles[art.id] ? 'var(--accent-orange)' : 'var(--text-sub)' }}
                            >
                              <Heart
                                className="h-4 w-4"
                                style={likedArticles[art.id] ? { fill: 'var(--accent-orange)', color: 'var(--accent-orange)' } : {}}
                              />
                              <span>{art.likes}</span>
                            </button>

                            {/* Comments */}
                            <div
                              className="flex items-center gap-1.5 text-[10px] font-semibold"
                              style={{ color: 'var(--text-sub)' }}
                            >
                              <MessageSquare className="h-4 w-4" />
                              <span>{art.comments}</span>
                            </div>
                          </div>

                          <button
                            className="flex items-center gap-1.5 text-[9px] font-bold uppercase tracking-widest hover:translate-x-1.5 transition-transform duration-200"
                            style={{ color: 'var(--accent-green)' }}
                          >
                            <span>Lire ({art.readTime})</span>
                            <ArrowRight className="h-3 w-3" />
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>
                </motion.article>
              );
            })}
          </AnimatePresence>
        </motion.div>

        {/* Button to see all articles */}
        <ScrollReveal variant="fadeUp" delay={0.3} className="mt-12 flex justify-center">
          <button
            onClick={() => window.location.href = '/articles'}
            className="btn-orange rounded px-8 py-3 text-cta font-bold"
          >
            Voir tous les articles →
          </button>
        </ScrollReveal>

      </div>
    </section>
  );
}
