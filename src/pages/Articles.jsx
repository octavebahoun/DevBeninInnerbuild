import React, { useEffect, useMemo, useState } from 'react';
import { Heart, MessageSquare, ArrowRight } from 'lucide-react';
import { ScrollReveal } from '../components/ScrollReveal';
import { articleStore } from '../lib/articleStore';
import { authStore } from '../lib/storage';

export default function Articles() {
  const session = authStore.getSession();
  const [activeCategory, setActiveCategory] = useState('Tous');
  const [articles, setArticles] = useState([]);
  const [likedArticles, setLikedArticles] = useState({});
  const [formState, setFormState] = useState({ status: 'idle', message: '' });
  const [formData, setFormData] = useState({
    title: '',
    preview: '',
    category: 'React',
    tags: '',
    readTime: '5 min'
  });

  useEffect(() => {
    setArticles(articleStore.getArticles());
    setLikedArticles(articleStore.getLikesMap());
  }, []);

  const handleLike = (articleId) => {
    const result = articleStore.toggleLike(articleId);
    setArticles(result.articles);
    setLikedArticles(result.likesMap);
  };

  const handleCreate = (event) => {
    event.preventDefault();
    setFormState({ status: 'idle', message: '' });

    const tags = formData.tags
      .split(',')
      .map((tag) => tag.trim())
      .filter(Boolean);

    const result = articleStore.addArticle({
      title: formData.title,
      preview: formData.preview,
      category: formData.category,
      tags,
      readTime: formData.readTime,
      author: session?.name || 'Anonyme',
    });

    if (!result.ok) {
      setFormState({ status: 'error', message: result.error });
      return;
    }

    setArticles(result.articles);
    setFormState({ status: 'success', message: 'Article publie avec succes.' });
    setFormData({ title: '', preview: '', category: formData.category, tags: '', readTime: '5 min' });
  };

  const categories = useMemo(() => {
    const unique = new Set(articles.map((article) => article.category));
    return ['Tous', ...Array.from(unique)];
  }, [articles]);

  const filteredArticles = activeCategory === 'Tous'
    ? articles
    : articles.filter((art) => art.category === activeCategory);

  return (
    <section className="relative py-20 px-4 sm:px-6 lg:px-8 pattern-dots" style={{ backgroundColor: 'var(--bg)' }}>
      <div className="mx-auto max-w-5xl">
        <div className="mb-10">
          <ScrollReveal variant="fadeLeft" duration={0.5}>
            <div className="section-label"><span>01</span><span>Ressources &amp; Articles</span></div>
          </ScrollReveal>
          <ScrollReveal variant="fadeUp" delay={0.1}>
            <h1 className="mt-3 font-display text-3xl sm:text-4xl" style={{ color: 'var(--text-main)' }}>
              Le Blog <span style={{ color: 'var(--accent-orange)' }}>Tech</span>
            </h1>
          </ScrollReveal>
          <p className="mt-3 text-sm max-w-xl" style={{ color: 'var(--text-sub)' }}>
            Retrouvez les tutoriels, retours d'experience et actus de l'ecosysteme.
          </p>
        </div>

        <div className="grid grid-cols-1 gap-6 lg:grid-cols-3">
          <div className="lg:col-span-2 rounded-lg p-6" style={{ background: 'var(--card-bg)', border: '1px solid var(--border-col)' }}>
            <div className="text-xs font-semibold" style={{ color: 'var(--text-main)' }}>Publier un article</div>
            <p className="mt-2 text-[11px]" style={{ color: 'var(--text-sub)' }}>
              Partagez vos retours d'experience, tutoriels ou insights.
            </p>
            <form className="mt-4 space-y-3" onSubmit={handleCreate}>
              <div>
                <label className="text-[10px] uppercase tracking-widest" style={{ color: 'var(--text-sub)' }}>Titre</label>
                <input
                  value={formData.title}
                  onChange={(event) => setFormData((prev) => ({ ...prev, title: event.target.value }))}
                  className="mt-1 w-full rounded px-3 py-2 text-xs"
                  style={{ background: 'var(--surface)', border: '1px solid var(--border-col)', color: 'var(--text-main)' }}
                />
              </div>
              <div>
                <label className="text-[10px] uppercase tracking-widest" style={{ color: 'var(--text-sub)' }}>Categorie</label>
                <input
                  value={formData.category}
                  onChange={(event) => setFormData((prev) => ({ ...prev, category: event.target.value }))}
                  className="mt-1 w-full rounded px-3 py-2 text-xs"
                  style={{ background: 'var(--surface)', border: '1px solid var(--border-col)', color: 'var(--text-main)' }}
                />
              </div>
              <div>
                <label className="text-[10px] uppercase tracking-widest" style={{ color: 'var(--text-sub)' }}>Tags (separes par des virgules)</label>
                <input
                  value={formData.tags}
                  onChange={(event) => setFormData((prev) => ({ ...prev, tags: event.target.value }))}
                  className="mt-1 w-full rounded px-3 py-2 text-xs"
                  placeholder="React, Tuto, UX"
                  style={{ background: 'var(--surface)', border: '1px solid var(--border-col)', color: 'var(--text-main)' }}
                />
              </div>
              <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
                <div>
                  <label className="text-[10px] uppercase tracking-widest" style={{ color: 'var(--text-sub)' }}>Temps de lecture</label>
                  <input
                    value={formData.readTime}
                    onChange={(event) => setFormData((prev) => ({ ...prev, readTime: event.target.value }))}
                    className="mt-1 w-full rounded px-3 py-2 text-xs"
                    style={{ background: 'var(--surface)', border: '1px solid var(--border-col)', color: 'var(--text-main)' }}
                  />
                </div>
                <div>
                  <label className="text-[10px] uppercase tracking-widest" style={{ color: 'var(--text-sub)' }}>Auteur</label>
                  <input
                    value={session?.name || 'Anonyme'}
                    readOnly
                    className="mt-1 w-full rounded px-3 py-2 text-xs"
                    style={{ background: 'var(--surface)', border: '1px solid var(--border-col)', color: 'var(--text-sub)' }}
                  />
                </div>
              </div>
              <div>
                <label className="text-[10px] uppercase tracking-widest" style={{ color: 'var(--text-sub)' }}>Description</label>
                <textarea
                  rows={4}
                  value={formData.preview}
                  onChange={(event) => setFormData((prev) => ({ ...prev, preview: event.target.value }))}
                  className="mt-1 w-full rounded px-3 py-2 text-xs"
                  style={{ background: 'var(--surface)', border: '1px solid var(--border-col)', color: 'var(--text-main)' }}
                />
              </div>

              {formState.message && (
                <div
                  className="rounded px-3 py-2 text-[10px]"
                  style={
                    formState.status === 'success'
                      ? { background: 'var(--glow-green)', color: 'var(--accent-green)' }
                      : { background: 'var(--glow-orange)', color: 'var(--accent-orange)' }
                  }
                >
                  {formState.message}
                </div>
              )}

              <button type="submit" className="w-full btn-orange rounded py-2 text-[10px] font-bold uppercase tracking-wider">
                Publier
              </button>
            </form>
          </div>

          <div className="rounded-lg p-6" style={{ background: 'var(--card-bg)', border: '1px solid var(--border-col)' }}>
            <div className="text-xs font-semibold" style={{ color: 'var(--text-main)' }}>Conseils rapides</div>
            <ul className="mt-3 space-y-2 text-[11px]" style={{ color: 'var(--text-sub)' }}>
              <li>Un titre clair et une promesse concrete.</li>
              <li>Ajoutez 2 a 4 tags pour etre visible.</li>
              <li>Gardez un resume court et direct.</li>
            </ul>
          </div>
        </div>

        <div className="mt-10 flex flex-wrap gap-2">
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

        <div className="mt-8 grid grid-cols-1 gap-6 md:grid-cols-2">
          {filteredArticles.map((art) => (
            <article
              key={art.id}
              className="rounded-lg overflow-hidden transition-all duration-300"
              style={{ backgroundColor: 'var(--card-bg)', border: '1px solid var(--border-col)' }}
              onMouseEnter={(e) => (e.currentTarget.style.borderColor = 'var(--accent-orange)')}
              onMouseLeave={(e) => (e.currentTarget.style.borderColor = 'var(--border-col)')}
            >
              <div
                className="flex items-center justify-center h-28"
                style={{ background: 'linear-gradient(135deg, var(--surface) 0%, var(--glow-orange) 100%)' }}
              >
                <span
                  className="font-display text-[10px] font-bold uppercase tracking-widest"
                  style={{ color: 'var(--accent-orange)' }}
                >
                  {art.category}
                </span>
              </div>

              <div className="p-6">
                <div className="flex gap-1.5 mb-4">
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

                <h2 className="font-display text-base sm:text-lg" style={{ color: 'var(--text-main)' }}>
                  {art.title}
                </h2>
                <p className="mt-3 text-xs leading-relaxed" style={{ color: 'var(--text-sub)' }}>
                  {art.preview}
                </p>

                <div className="mt-4 text-[10px]" style={{ color: 'var(--text-muted)' }}>
                  Par <span style={{ color: 'var(--text-main)' }} className="font-semibold">{art.author}</span> · {art.date} · {art.readTime}
                </div>

                <div className="mt-5 flex items-center justify-between">
                  <div className="flex items-center gap-4">
                    <button
                      onClick={() => handleLike(art.id)}
                      className="flex items-center gap-1.5 text-[10px] font-semibold"
                      style={{ color: likedArticles[art.id] ? 'var(--accent-orange)' : 'var(--text-sub)' }}
                    >
                      <Heart
                        className="h-4 w-4"
                        style={likedArticles[art.id] ? { fill: 'var(--accent-orange)', color: 'var(--accent-orange)' } : {}}
                      />
                      <span>{art.likes}</span>
                    </button>
                    <div className="flex items-center gap-1.5 text-[10px]" style={{ color: 'var(--text-sub)' }}>
                      <MessageSquare className="h-4 w-4" />
                      <span>{art.comments}</span>
                    </div>
                  </div>

                  <button className="flex items-center gap-1.5 text-[10px] font-semibold" style={{ color: 'var(--accent-orange)' }}>
                    Lire <ArrowRight className="h-3.5 w-3.5" />
                  </button>
                </div>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
