import React, { useState, useEffect } from 'react';
import { Heart, MessageSquare, ArrowRight } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

export default function Blog() {
  const [activeCategory, setActiveCategory] = useState('Tous');

  const initialArticles = [
    {
      id: 'azure-react-2025',
      title: "Déployer une app React sur Azure en 2025",
      preview: "Un guide étape par étape pour héberger vos applications React de manière sécurisée et évolutive sur Azure App Services.",
      author: "Oktav Dev",
      date: "18 mai 2026",
      readTime: "5 min",
      tags: ["Tuto", "React"],
      comments: 8,
      likes: 42,
      category: "React"
    },
    {
      id: 'django-postgres-docker',
      title: "Optimiser Django et PostgreSQL avec Docker",
      preview: "Apprenez à orchestrer votre base de données et votre backend Django pour un environnement de développement local ultra-rapide.",
      author: "Amina Bello",
      date: "15 mai 2026",
      readTime: "8 min",
      tags: ["Python", "Docker"],
      comments: 5,
      likes: 31,
      category: "Python"
    },
    {
      id: 'gsap-interactive-scroll',
      title: "Dompter GSAP ScrollTrigger pour des sites vivants",
      preview: "Créez des animations fluides au défilement en évitant les surcharges CPU. Astuces de performance indispensables.",
      author: "Ronald Hounnou",
      date: "10 mai 2026",
      readTime: "6 min",
      tags: ["Tuto", "GSAP"],
      comments: 12,
      likes: 56,
      category: "GSAP"
    }
  ];

  const [articles, setArticles] = useState(initialArticles);
  const [likedArticles, setLikedArticles] = useState({});

  useEffect(() => {
    const savedLikes = localStorage.getItem('devbenin-blog-likes');
    if (savedLikes) {
      try { setLikedArticles(JSON.parse(savedLikes)); } catch (e) { console.error(e); }
    }
    const savedCounts = localStorage.getItem('devbenin-blog-counts');
    if (savedCounts) {
      try { setArticles(JSON.parse(savedCounts)); } catch (e) { console.error(e); }
    }
  }, []);

  const handleLike = (articleId) => {
    const isAlreadyLiked = likedArticles[articleId];
    const newLiked = { ...likedArticles, [articleId]: !isAlreadyLiked };
    setLikedArticles(newLiked);
    localStorage.setItem('devbenin-blog-likes', JSON.stringify(newLiked));

    const updatedArticles = articles.map(art => {
      if (art.id === articleId) {
        return { ...art, likes: isAlreadyLiked ? art.likes - 1 : art.likes + 1 };
      }
      return art;
    });
    setArticles(updatedArticles);
    localStorage.setItem('devbenin-blog-counts', JSON.stringify(updatedArticles));
  };

  const categories = ['Tous', 'React', 'Python', 'GSAP'];
  const filteredArticles = activeCategory === 'Tous'
    ? articles
    : articles.filter(art => art.category === activeCategory);

  /* Couleurs accent par catégorie */
  const categoryAccent = {
    React: 'var(--accent-orange)',
    Python: 'var(--accent-green)',
    GSAP: 'var(--accent-orange)',
    Tuto: 'var(--accent-green)',
    Docker: 'var(--accent-orange)'
  };

  return (
    <section
      id="blog"
      className="relative py-20 px-4 sm:px-6 lg:px-8 pattern-dots"
      style={{ backgroundColor: 'var(--bg)', borderBottom: '1px solid var(--border-col)' }}
    >
      <div className="mx-auto max-w-5xl">
        {/* Section Header */}
        <div className="mb-12">
          <div className="section-label">
            <span>05</span>
            <span>Ressources &amp; Articles</span>
          </div>
          <h2 className="mt-3 font-display text-2xl sm:text-4xl" style={{ color: 'var(--text-main)' }}>
            Le Blog <span style={{ color: 'var(--accent-orange)' }}>Tech</span>
          </h2>
        </div>

        {/* Categories selector */}
        <div className="flex flex-wrap gap-2 mb-10">
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setActiveCategory(cat)}
              className="rounded-full px-4 py-1.5 text-xs font-semibold tracking-wider transition-all duration-200"
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

        {/* Articles Grid */}
        <motion.div layout className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
          <AnimatePresence mode="popLayout">
            {filteredArticles.map((art) => (
              <motion.article
                layout
                key={art.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                transition={{ duration: 0.3 }}
                className="overflow-hidden rounded-lg flex flex-col justify-between transition-all duration-300"
                style={{
                  backgroundColor: 'var(--card-bg)',
                  border: '1px solid var(--border-col)'
                }}
                onMouseEnter={e => e.currentTarget.style.borderColor = 'var(--accent-orange)'}
                onMouseLeave={e => e.currentTarget.style.borderColor = 'var(--border-col)'}
              >
                {/* Thumb Area */}
                <div
                  className="h-28 flex items-center justify-center"
                  style={{
                    background: 'linear-gradient(135deg, var(--surface) 0%, var(--glow-orange) 100%)',
                    borderBottom: '1px solid var(--border-col)'
                  }}
                >
                  <div
                    className="font-display text-[10px] font-bold uppercase tracking-widest opacity-40"
                    style={{ color: 'var(--accent-orange)' }}
                  >
                    {art.category} Article
                  </div>
                </div>

                {/* Article Body */}
                <div className="p-5 flex flex-col justify-between flex-1">
                  <div>
                    {/* Tags */}
                    <div className="flex gap-1.5 mb-3">
                      {art.tags.map((tag) => (
                        <span
                          key={tag}
                          className="rounded-full px-2.5 py-0.5 text-[9px] font-semibold"
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
                      className="font-display text-sm font-semibold tracking-wider line-clamp-2 leading-snug"
                      style={{ color: 'var(--text-main)' }}
                    >
                      {art.title}
                    </h3>

                    <p
                      className="mt-2 text-xs leading-relaxed font-light line-clamp-3"
                      style={{ color: 'var(--text-sub)' }}
                    >
                      {art.preview}
                    </p>
                  </div>

                  <div className="mt-6">
                    <div className="text-[9px] font-medium" style={{ color: 'var(--text-sub)' }}>
                      Par {art.author} · {art.date} · {art.readTime}
                    </div>

                    <div className="mt-4 h-[1px]" style={{ background: 'var(--border-col)' }} />

                    <div className="mt-3 flex items-center justify-between">
                      <div className="flex items-center gap-4">
                        {/* Like Button */}
                        <button
                          onClick={() => handleLike(art.id)}
                          className="flex items-center gap-1.5 text-[10px] font-semibold transition-colors duration-200"
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
                        className="flex items-center gap-1 text-[10px] font-bold uppercase tracking-wider hover:translate-x-1 transition-transform duration-200"
                        style={{ color: 'var(--accent-green)' }}
                      >
                        <span>Lire</span>
                        <ArrowRight className="h-3 w-3" />
                      </button>
                    </div>
                  </div>
                </div>
              </motion.article>
            ))}
          </AnimatePresence>
        </motion.div>
      </div>
    </section>
  );
}
