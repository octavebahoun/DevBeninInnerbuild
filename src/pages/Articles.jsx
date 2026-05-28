import React, { useEffect, useMemo, useState } from 'react';
import { Link } from 'react-router-dom';
import ReactMarkdown from 'react-markdown';
import { 
  Heart, 
  MessageSquare, 
  Eye, 
  Clock, 
  Search, 
  Plus, 
  Folder, 
  X,
  BookOpen, 
  Terminal, 
  Briefcase, 
  TrendingUp, 
  Award, 
  Newspaper, 
  Lightbulb,
  ArrowRight
} from 'lucide-react';
import { articleStore } from '../lib/articleStore';
import { authStore } from '../lib/storage';

const CATEGORY_ICONS = {
  'Tous': BookOpen,
  'Tutoriel': Terminal,
  'Carrière': Briefcase,
  'Tech Trends': TrendingUp,
  'Success Story': Award,
  'Opinion': MessageSquare,
  'Actualités': Newspaper,
  'Général': Lightbulb
};

const CATEGORIES_LIST = [
  'Tous',
  'Tutoriel',
  'Carrière',
  'Tech Trends',
  'Success Story',
  'Opinion',
  'Actualités',
  'Général'
];

export default function Articles() {
  const session = authStore.getSession();
  const [activeCategory, setActiveCategory] = useState('Tous');
  const [searchQuery, setSearchQuery] = useState('');
  const [showCreateForm, setShowCreateForm] = useState(false);
  const [viewDraftsOnly, setViewDraftsOnly] = useState(false);
  const [articles, setArticles] = useState([]);
  const [likedArticles, setLikedArticles] = useState({});
  const [formState, setFormState] = useState({ status: 'idle', message: '' });
  
  const [formData, setFormData] = useState({
    title: '',
    preview: '',
    content: '',
    image: '',
    category: 'Tutoriel',
    tags: '',
    readTime: '4 min'
  });

  useEffect(() => {
    setArticles(articleStore.getArticles());
    setLikedArticles(articleStore.getLikesMap());
  }, []);

  const handleLike = (articleId, e) => {
    e.preventDefault();
    e.stopPropagation();
    const result = articleStore.toggleLike(articleId);
    setArticles(result.articles);
    setLikedArticles(result.likesMap);
  };

  const handleCreate = (isDraft = false) => {
    setFormState({ status: 'idle', message: '' });

    if (!session) {
      setFormState({ status: 'error', message: 'Veuillez vous connecter pour écrire un article.' });
      return;
    }

    if (!formData.title.trim() || !formData.preview.trim()) {
      setFormState({ status: 'error', message: 'Veuillez remplir le titre et le résumé.' });
      return;
    }

    const tags = formData.tags
      .split(',')
      .map((tag) => tag.trim())
      .filter(Boolean);

    const result = articleStore.addArticle({
      title: formData.title,
      preview: formData.preview,
      content: formData.content || formData.preview,
      image: formData.image?.trim() || "https://images.unsplash.com/photo-1618401471353-b98aedd07871?auto=format&fit=crop&w=600&q=80",
      category: formData.category,
      tags: tags.length > 0 ? tags : [formData.category],
      readTime: formData.readTime,
      author: session?.name || 'Anonyme',
    });

    if (!result.ok) {
      setFormState({ status: 'error', message: result.error });
      return;
    }

    // Dynamic resolution of new article in localized list with drafted/published flag
    const newArt = {
      ...result.article,
      image: formData.image?.trim() || "https://images.unsplash.com/photo-1618401471353-b98aedd07871?auto=format&fit=crop&w=600&q=80",
      content: formData.content || formData.preview,
      isDraft: isDraft,
      views: 1,
      date: "À l'instant"
    };

    const updatedArticles = [newArt, ...articles.filter(a => a.id !== result.article.id)];
    setArticles(updatedArticles);
    
    // Save state back to local storage
    articleStore.saveArticles(updatedArticles);

    setFormState({ 
      status: 'success', 
      message: isDraft ? 'Brouillon enregistré avec succès !' : 'Votre article a été publié avec succès !' 
    });

    setFormData({ title: '', preview: '', content: '', image: '', category: 'Tutoriel', tags: '', readTime: '4 min' });
    
    setTimeout(() => {
      setShowCreateForm(false);
      setFormState({ status: 'idle', message: '' });
    }, 1500);
  };

  // Dynamic computation of article counts per category (excluding drafts from public counters)
  const categoryCounts = useMemo(() => {
    const counts = { 'Tous': articles.filter(a => !a.isDraft).length };
    CATEGORIES_LIST.forEach(cat => {
      if (cat !== 'Tous') {
        counts[cat] = articles.filter(art => art.category === cat && !art.isDraft).length;
      }
    });
    return counts;
  }, [articles]);

  const filteredArticles = useMemo(() => {
    return articles.filter((art) => {
      // Drafts vs Published filter
      const matchesDraftState = viewDraftsOnly ? art.isDraft === true : !art.isDraft;
      
      const matchesCategory = activeCategory === 'Tous' || art.category === activeCategory;
      const matchesSearch = 
        art.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        art.preview.toLowerCase().includes(searchQuery.toLowerCase()) ||
        art.author.toLowerCase().includes(searchQuery.toLowerCase());
      return matchesDraftState && matchesCategory && matchesSearch;
    });
  }, [articles, activeCategory, searchQuery, viewDraftsOnly]);

  return (
    <section className="relative py-20 px-4 sm:px-6 lg:px-8 pattern-dots min-h-screen" style={{ backgroundColor: 'var(--bg)' }}>
      {/* Immersive space background grid */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(34,197,94,0.03)_0,transparent_100%)] pointer-events-none" />

      <div className="mx-auto max-w-6xl relative z-10">
        
        {/* Giant premium Hero Header Section */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-16 pb-12 border-b border-white/[0.04]">
          <div>
            <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-[9px] font-black tracking-widest uppercase mb-4" 
              style={{ background: 'rgba(34, 197, 94, 0.15)', border: '1px solid rgba(34, 197, 94, 0.3)', color: '#22C55E' }}>
              <span className="w-1.5 h-1.5 rounded-full bg-[#22C55E] animate-pulse" />
              La Voix de la Communauté
            </span>
            <h1 className="text-6xl md:text-7xl font-black italic uppercase tracking-tighter" style={{ color: 'var(--text-main)' }}>
              LE <span className="text-[#22C55E]" style={{ textShadow: '0 0 30px rgba(34,197,94,0.2)' }}>BLOG</span>
            </h1>
            <p className="mt-4 text-body max-w-xl opacity-70" style={{ color: 'var(--text-sub)' }}>
              Articles, tutoriels et insights de la communauté tech béninoise.
            </p>
          </div>

          <div className="flex items-center gap-3">
            {session ? (
              <button 
                onClick={() => setShowCreateForm(true)}
                className="flex items-center gap-2 px-5 py-2.5 rounded-full text-[10px] font-black uppercase tracking-wider transition-all duration-300 transform active:scale-95 animate-pulse"
                style={{ backgroundColor: '#22C55E', color: 'var(--bg)', boxShadow: '0 4px 20px rgba(34, 197, 94, 0.3)' }}
              >
                <Plus className="w-4 h-4 stroke-[3px]" />
                Écrire un article
              </button>
            ) : (
              <Link 
                to="/login"
                className="flex items-center gap-2 px-5 py-2.5 rounded-full text-[10px] font-black uppercase tracking-wider transition-all duration-300 transform active:scale-95 border"
                style={{ borderColor: '#22C55E', color: '#22C55E', background: 'rgba(34,197,94,0.05)', boxShadow: '0 0 15px rgba(34,197,94,0.1)' }}
              >
                <Plus className="w-4 h-4 stroke-[3px]" />
                Se connecter pour rédiger
              </Link>
            )}
            
            {session && (
              <button 
                onClick={() => setViewDraftsOnly(!viewDraftsOnly)}
                className="flex items-center gap-2 px-5 py-2.5 rounded-full text-[10px] font-black uppercase tracking-wider transition-all duration-300 border transform active:scale-95"
                style={
                  viewDraftsOnly 
                    ? { backgroundColor: '#22C55E', borderColor: '#22C55E', color: 'var(--bg)' } 
                    : { color: 'var(--text-main)', borderColor: 'white/10', background: 'rgba(255,255,255,0.02)' }
                }
              >
                <Folder className="w-4 h-4 stroke-[2.5px]" />
                {viewDraftsOnly ? "Tous les articles" : "Mes Brouillons"}
              </button>
            )}
          </div>
        </div>

        {/* Overhauled Writing Modal Panel (Split-Screen Editor + Live Preview) */}
        {showCreateForm && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 bg-black/85 backdrop-blur-md overflow-y-auto">
            <div className="relative w-full max-w-6xl h-[90vh] rounded-3xl overflow-hidden flex flex-col border border-white/10"
              style={{ background: 'var(--bg)' }}>
              
              {/* Header inside modal */}
              <div className="flex items-center justify-between p-6 border-b border-white/5 bg-black/40">
                <h3 className="text-lg font-black flex items-center gap-2" style={{ color: 'var(--text-main)' }}>
                  <span className="w-2.5 h-2.5 rounded bg-[#22C55E] animate-pulse" />
                  Rédacteur d'article
                </h3>
                <button 
                  onClick={() => setShowCreateForm(false)}
                  className="p-2 rounded-full hover:bg-white/15 transition-colors"
                >
                  <X className="w-5 h-5 text-white/50 hover:text-white" />
                </button>
              </div>

              {/* Grid content inside modal */}
              <div className="flex-grow overflow-y-auto grid grid-cols-1 lg:grid-cols-2">
                
                {/* Left Side: Rich Form inputs */}
                <div className="p-6 sm:p-8 space-y-5 border-r border-white/5 overflow-y-auto">
                  <div className="text-stag font-bold uppercase tracking-widest text-[#22C55E]">Édition</div>
                  
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="text-[9px] font-bold uppercase tracking-wider text-white/40">Titre de l'article *</label>
                      <input
                        type="text"
                        required
                        value={formData.title}
                        onChange={(e) => setFormData(p => ({ ...p, title: e.target.value }))}
                        placeholder="ex: Sécuriser vos serveurs SSH..."
                        className="mt-1.5 w-full rounded-xl px-4 py-2.5 text-xs focus:outline-none focus:border-[#22C55E]"
                        style={{ background: 'var(--surface)', border: '1px solid var(--border-col)', color: 'var(--text-main)' }}
                      />
                    </div>
                    <div>
                      <label className="text-[9px] font-bold uppercase tracking-wider text-white/40">Lien de l'image de couverture</label>
                      <input
                        type="text"
                        value={formData.image}
                        onChange={(e) => setFormData(p => ({ ...p, image: e.target.value }))}
                        placeholder="ex: https://images.unsplash.com/..."
                        className="mt-1.5 w-full rounded-xl px-4 py-2.5 text-xs focus:outline-none"
                        style={{ background: 'var(--surface)', border: '1px solid var(--border-col)', color: 'var(--text-main)' }}
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-3 gap-4">
                    <div className="col-span-2">
                      <label className="text-[9px] font-bold uppercase tracking-wider text-white/40">Catégorie</label>
                      <select
                        value={formData.category}
                        onChange={(e) => setFormData(p => ({ ...p, category: e.target.value }))}
                        className="mt-1.5 w-full rounded-xl px-4 py-2.5 text-xs focus:outline-none"
                        style={{ background: 'var(--surface)', border: '1px solid var(--border-col)', color: 'var(--text-main)' }}
                      >
                        {CATEGORIES_LIST.filter(c => c !== 'Tous').map(cat => (
                          <option key={cat} value={cat} className="bg-[#121217]">{cat}</option>
                        ))}
                      </select>
                    </div>
                    <div>
                      <label className="text-[9px] font-bold uppercase tracking-wider text-white/40">Lecture</label>
                      <input
                        type="text"
                        value={formData.readTime}
                        onChange={(e) => setFormData(p => ({ ...p, readTime: e.target.value }))}
                        placeholder="ex: 5 min"
                        className="mt-1.5 w-full rounded-xl px-4 py-2.5 text-xs focus:outline-none"
                        style={{ background: 'var(--surface)', border: '1px solid var(--border-col)', color: 'var(--text-main)' }}
                      />
                    </div>
                  </div>

                  <div>
                    <label className="text-[9px] font-bold uppercase tracking-wider text-white/40">Résumé court (Preview) *</label>
                    <textarea
                      rows={2}
                      required
                      value={formData.preview}
                      onChange={(e) => setFormData(p => ({ ...p, preview: e.target.value }))}
                      placeholder="Décrivez brièvement le sujet pour la carte de présentation..."
                      className="mt-1.5 w-full rounded-xl px-4 py-2.5 text-xs focus:outline-none resize-none"
                      style={{ background: 'var(--surface)', border: '1px solid var(--border-col)', color: 'var(--text-main)' }}
                    />
                  </div>

                  <div>
                    <label className="text-[9px] font-bold uppercase tracking-wider text-white/40">Contenu de l'article (Supporte le Markdown) *</label>
                    <textarea
                      rows={10}
                      value={formData.content}
                      onChange={(e) => setFormData(p => ({ ...p, content: e.target.value }))}
                      placeholder="# Votre Titre principal&#10;## Vos sous-parties...&#10;Utilisez les blocs de code: ```javascript ... ``` pour vos exemples de code."
                      className="mt-1.5 w-full rounded-xl px-4 py-2.5 text-xs focus:outline-none resize-none font-mono"
                      style={{ background: 'var(--surface)', border: '1px solid var(--border-col)', color: 'var(--text-main)' }}
                    />
                  </div>

                  <div>
                    <label className="text-[9px] font-bold uppercase tracking-wider text-white/40">Tags (séparés par des virgules)</label>
                    <input
                      type="text"
                      value={formData.tags}
                      onChange={(e) => setFormData(p => ({ ...p, tags: e.target.value }))}
                      placeholder="React, Docker, Cloud"
                      className="mt-1.5 w-full rounded-xl px-4 py-2.5 text-xs focus:outline-none"
                      style={{ background: 'var(--surface)', border: '1px solid var(--border-col)', color: 'var(--text-main)' }}
                    />
                  </div>
                </div>

                {/* Right Side: High-Fidelity Live Markdown Preview */}
                <div className="p-6 sm:p-8 bg-black/20 overflow-y-auto flex flex-col">
                  <div className="text-stag font-bold uppercase tracking-widest text-[#22C55E] mb-4">Prévisualisation en Direct</div>
                  
                  <div className="flex-grow rounded-2xl p-6 border border-white/5 bg-neutral-900/30 overflow-y-auto text-xs leading-relaxed space-y-4 max-h-[50vh] lg:max-h-none">
                    {formData.title ? (
                      <div>
                        <h1 className="text-lg font-extrabold text-white mb-2">{formData.title}</h1>
                        <div className="flex gap-2 mb-4">
                          <span className="px-2 py-0.5 rounded text-[8px] font-black bg-emerald-500/10 text-emerald-400">
                            {formData.category}
                          </span>
                        </div>
                        <hr className="border-white/5 my-4" />
                        <div className="markdown-body text-white/80">
                          <ReactMarkdown
                            components={{
                              h1: ({node, ...props}) => <h2 className="text-sm font-extrabold text-white mt-4 mb-2 pb-1 border-b border-white/5" {...props} />,
                              h2: ({node, ...props}) => <h3 className="text-xs font-black text-white mt-3 mb-1" {...props} />,
                              p: ({node, ...props}) => <p className="mb-2" {...props} />,
                              blockquote: ({node, ...props}) => (
                                <blockquote className="border-l-2 border-[#22C55E] bg-white/[0.01] pl-3 py-1 italic my-2 rounded-r" {...props} />
                              ),
                              code: ({node, inline, className, children, ...props}) => (
                                <code className="bg-white/5 px-1 rounded font-mono text-[10px] text-[#22C55E]" {...props}>
                                  {children}
                                </code>
                              )
                            }}
                          >
                            {formData.content || formData.preview || "*Écrivez votre contenu pour le prévisualiser ici...*"}
                          </ReactMarkdown>
                        </div>
                      </div>
                    ) : (
                      <div className="text-white/30 italic text-center py-20">
                        Renseignez un titre pour démarrer la prévisualisation.
                      </div>
                    )}
                  </div>

                  {formState.message && (
                    <div className="rounded-xl px-4 py-2.5 text-xs text-center mt-4"
                      style={formState.status === 'success' ? { background: 'rgba(34,197,94,0.15)', color: '#22C55E' } : { background: 'rgba(239,68,68,0.15)', color: '#EF4444' }}>
                      {formState.message}
                    </div>
                  )}

                  {/* Actions buttons inside modal */}
                  <div className="grid grid-cols-2 gap-4 mt-6 pt-4 border-t border-white/5">
                    <button 
                      onClick={() => handleCreate(true)}
                      className="py-3 rounded-xl text-[10px] font-black uppercase tracking-wider transition-all border border-white/10 hover:bg-white/5 text-white"
                    >
                      Sauvegarder Brouillon
                    </button>
                    <button 
                      onClick={() => handleCreate(false)}
                      className="py-3 rounded-xl text-[10px] font-black uppercase tracking-wider text-black transition-all hover:opacity-90"
                      style={{ backgroundColor: '#22C55E' }}
                    >
                      Publier l'article
                    </button>
                  </div>

                </div>

              </div>

            </div>
          </div>
        )}

        {/* Search input widget */}
        <div className="relative max-w-md mb-8">
          <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-white/40" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Rechercher un article..."
            className="w-full rounded-full pl-12 pr-6 py-3.5 text-xs focus:outline-none transition-colors border border-white/10 focus:border-[#22C55E]"
            style={{ background: 'var(--surface)', color: 'var(--text-main)' }}
          />
        </div>

        {/* Overhauled Layout: Grid Feed + Sidebar Categories Widget */}
        <div className="grid grid-cols-1 gap-8 lg:grid-cols-3 items-start">
          
          {/* Main Column - Articles Feed */}
          <div className="lg:col-span-2 space-y-6">
            {filteredArticles.length === 0 ? (
              <div className="rounded-3xl p-12 text-center border border-dashed border-white/10 bg-white/[0.01]">
                <BookOpen className="w-12 h-12 mx-auto opacity-30 mb-4" />
                <h4 className="text-body font-bold" style={{ color: 'var(--text-main)' }}>Aucun article trouvé</h4>
                <p className="text-xs opacity-60 mt-1" style={{ color: 'var(--text-sub)' }}>
                  {viewDraftsOnly ? "Vous n'avez pas encore enregistré de brouillons." : "Ajustez vos filtres ou lancez une autre recherche."}
                </p>
              </div>
            ) : (
              filteredArticles.map((art) => (
                <Link
                  key={art.id}
                  to={`/articles/${art.id}`}
                  className="rounded-3xl overflow-hidden flex flex-col md:flex-row transition-all duration-300 group block"
                  style={{ backgroundColor: 'var(--card-bg)', border: '1px solid var(--border-col)', minHeight: '190px' }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.borderColor = '#22C55E';
                    e.currentTarget.style.boxShadow = '0 10px 30px rgba(34, 197, 94, 0.05)';
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.borderColor = 'var(--border-col)';
                    e.currentTarget.style.boxShadow = 'none';
                  }}
                >
                  {/* Left Column: Premium Expanded Circular Visual Container */}
                  <div className="flex-shrink-0 flex items-center justify-center p-6 bg-neutral-950/40 relative w-full md:w-60 h-48 md:h-auto border-r border-white/[0.03] overflow-hidden">
                    {/* Large Spinning orbit glowing rings */}
                    <div className="absolute w-36 h-36 rounded-full border border-[#22C55E]/10 animate-[spin_25s_linear_infinite]" />
                    <div className="absolute w-32 h-32 rounded-full border border-dashed border-[#22C55E]/20 animate-[spin_12s_linear_infinite_reverse]" />
                    <div className="absolute w-24 h-24 rounded-full bg-[#22C55E]/5 blur-2xl pointer-events-none" />
                    
                    {/* Expanded Circular Image Wrapper */}
                    <div className="relative w-28 h-28 rounded-full overflow-hidden border-2 border-[#22C55E] shadow-[0_0_20px_rgba(34,197,94,0.25)] bg-neutral-900 transition-transform duration-300 group-hover:scale-105 flex-shrink-0">
                      <img 
                        src={art.image || "https://images.unsplash.com/photo-1618401471353-b98aedd07871?auto=format&fit=crop&w=300&q=80"} 
                        alt={art.title} 
                        className="w-full h-full object-cover"
                      />
                    </div>
                  </div>

                  {/* Right Column: Content Body */}
                  <div className="p-6 flex flex-col justify-between flex-grow">
                    <div>
                      {/* Top tags and category row */}
                      <div className="flex items-center gap-2 mb-2">
                        <span className="px-2 py-0.5 rounded text-[8px] font-black uppercase tracking-widest"
                          style={{ background: 'rgba(34,197,94,0.15)', border: '1px solid rgba(34,197,94,0.3)', color: '#22C55E' }}>
                          {art.category}
                        </span>
                        {art.tags.slice(0, 2).map(t => (
                          <span key={t} className="text-[9px] font-mono text-white/40">#{t}</span>
                        ))}
                        {art.isDraft && (
                          <span className="px-2 py-0.5 rounded text-[8px] font-black uppercase tracking-widest bg-yellow-500/10 border border-yellow-500/30 text-yellow-400">
                            Brouillon
                          </span>
                        )}
                      </div>

                      <h2 className="font-display text-base font-extrabold leading-snug group-hover:text-[#22C55E] transition-colors" 
                        style={{ color: 'var(--text-main)' }}>
                        {art.title}
                      </h2>
                      <p className="mt-2 text-xs leading-relaxed line-clamp-2 opacity-65" style={{ color: 'var(--text-sub)' }}>
                        {art.preview}
                      </p>
                    </div>

                    {/* Metadata Footer Row */}
                    <div className="mt-4 flex flex-wrap items-center justify-between gap-3 pt-4 border-t border-white/[0.04]">
                      {/* Left: Author + Timing info */}
                      <div className="flex items-center gap-3 text-[10px] text-white/50">
                        <span>Par <strong className="text-white/80">{art.author}</strong></span>
                        <span>·</span>
                        <div className="flex items-center gap-1">
                          <Clock className="w-3.5 h-3.5 opacity-60" />
                          <span>{art.readTime}</span>
                        </div>
                        <span>·</span>
                        <span className="opacity-80">{art.date}</span>
                      </div>

                      {/* Right: Likes, Comments, Views */}
                      <div className="flex items-center gap-3">
                        <div className="flex items-center gap-1 text-[10px] text-white/45">
                          <Eye className="w-3.5 h-3.5" />
                          <span>{art.views || 5}</span>
                        </div>
                        <div className="flex items-center gap-1 text-[10px] text-white/45">
                          <MessageSquare className="w-3.5 h-3.5" />
                          <span>{art.comments}</span>
                        </div>
                        <button
                          onClick={(e) => handleLike(art.id, e)}
                          className="flex items-center gap-1 text-[10px] font-bold transition-colors"
                          style={{ color: likedArticles[art.id] ? '#22C55E' : 'var(--text-sub)' }}
                        >
                          <Heart
                            className="w-3.5 h-3.5"
                            style={likedArticles[art.id] ? { fill: '#22C55E', color: '#22C55E' } : {}}
                          />
                          <span>{art.likes}</span>
                        </button>
                      </div>
                    </div>

                  </div>
                </Link>
              ))
            )}
          </div>

          {/* Right Column - Beautiful Catégories Sidebar widget */}
          <div className="rounded-3xl p-6 relative overflow-hidden" 
            style={{ background: 'var(--card-bg)', border: '1px solid var(--border-col)' }}>
            
            <h3 className="text-base font-black italic uppercase tracking-wider mb-6 text-[#22C55E] flex items-center gap-2">
              <span className="w-1.5 h-1.5 rounded-full bg-[#22C55E]" />
              Catégories
            </h3>

            <div className="space-y-1.5">
              {CATEGORIES_LIST.map((cat) => {
                const IconComponent = CATEGORY_ICONS[cat] || BookOpen;
                const isActive = activeCategory === cat;
                const count = categoryCounts[cat] || 0;

                return (
                  <button
                    key={cat}
                    onClick={() => {
                      setActiveCategory(cat);
                      setViewDraftsOnly(false); // Reset draft view to normal categories filtering
                      window.scrollTo({ top: 0, behavior: 'smooth' });
                    }}
                    className="w-full flex items-center justify-between px-4 py-3.5 rounded-2xl text-xs font-extrabold tracking-wide transition-all duration-300"
                    style={
                      isActive && !viewDraftsOnly
                        ? {
                            background: '#22C55E',
                            color: 'var(--bg)',
                            boxShadow: '0 4px 15px rgba(34, 197, 94, 0.25)'
                          }
                        : {
                            background: 'rgba(255, 255, 255, 0.01)',
                            border: '1px solid transparent',
                            color: 'var(--text-sub)'
                          }
                    }
                    onMouseEnter={(e) => {
                      if (!isActive || viewDraftsOnly) {
                        e.currentTarget.style.background = 'rgba(255, 255, 255, 0.03)';
                        e.currentTarget.style.borderColor = 'rgba(255, 255, 255, 0.04)';
                        e.currentTarget.style.color = '#22C55E';
                      }
                    }}
                    onMouseLeave={(e) => {
                      if (!isActive || viewDraftsOnly) {
                        e.currentTarget.style.background = 'rgba(255, 255, 255, 0.01)';
                        e.currentTarget.style.borderColor = 'transparent';
                        e.currentTarget.style.color = 'var(--text-sub)';
                      }
                    }}
                  >
                    <div className="flex items-center gap-3">
                      <IconComponent className="w-4 h-4" />
                      <span>{cat === 'Tous' ? 'Tous les articles' : cat}</span>
                    </div>
                    <span 
                      className="px-2.5 py-0.5 rounded-full text-[9px] font-black"
                      style={
                        isActive && !viewDraftsOnly
                          ? { background: 'rgba(0,0,0,0.15)', color: 'var(--bg)' } 
                          : { background: 'var(--surface)', color: 'var(--text-sub)' }
                      }
                    >
                      {count}
                    </span>
                  </button>
                );
              })}
            </div>

            {/* Quick community promotion callout */}
            <div className="mt-8 p-4 rounded-2xl bg-white/[0.01] border border-white/[0.03] text-center">
              <span className="text-[8px] font-black uppercase tracking-widest opacity-40 block mb-1">Partagez votre voix</span>
              <p className="text-[10px] leading-relaxed text-white/50">
                Vous avez appris quelque chose d'incroyable cette semaine ? Cliquez sur le bouton d'écriture pour inspirer la communauté.
              </p>
            </div>

          </div>

        </div>

      </div>
    </section>
  );
}
