import React, { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { Heart, Clock, Eye, ArrowLeft, Send } from 'lucide-react';
import ReactMarkdown from 'react-markdown';
import { articleStore } from '../lib/articleStore';
import { authStore } from '../lib/storage';

export default function ArticleDetail() {
  const { articleId } = useParams();
  const session = authStore.getSession();
  const [article, setArticle] = useState(null);
  const [isLiked, setIsLiked] = useState(false);
  const [commentText, setCommentText] = useState('');
  const [localComments, setLocalComments] = useState([]);

  useEffect(() => {
    // Dynamic views count incrementation happens automatically in getArticleById!
    const art = articleStore.getArticleById(articleId);
    if (art) {
      setArticle(art);
      const likesMap = articleStore.getLikesMap();
      setIsLiked(Boolean(likesMap[art.id]));
      
      // Load static comments simulated list
      setLocalComments([
        { id: 'sc_1', author: 'Bhilal CHITOU', text: "Super instructif ! J'ai hâte de lire la suite sur le sujet.", date: 'il y a 2h' },
        { id: 'sc_2', author: 'Cyrus Assogba', text: 'Très clair, merci pour ce partage de qualité !', date: 'il y a 1h' }
      ]);
    }
  }, [articleId]);

  const handleLike = () => {
    if (!article) return;
    const result = articleStore.toggleLike(article.id);
    const updated = result.articles.find(a => a.id === article.id);
    if (updated) {
      setArticle(updated);
      setIsLiked(result.likesMap[article.id]);
    }
  };

  const handleAddComment = (e) => {
    e.preventDefault();
    if (!commentText.trim()) return;

    const newComment = {
      id: `lc_${Date.now()}`,
      author: session?.name || 'Visiteur Anonyme',
      text: commentText,
      date: "À l'instant"
    };

    setLocalComments([...localComments, newComment]);
    setCommentText('');

    // Increment comments display metric on screen
    if (article) {
      setArticle(prev => ({
        ...prev,
        comments: (prev.comments || 0) + 1
      }));
    }
  };

  if (!article) {
    return (
      <section className="min-h-screen py-20 px-4 sm:px-6 lg:px-8" style={{ backgroundColor: 'var(--bg)', color: 'var(--text-main)' }}>
        <div className="mx-auto max-w-3xl">
          <Link to="/articles" className="inline-flex items-center gap-2 text-[10px] font-black uppercase tracking-wider"
            style={{ color: '#22C55E' }}>
            <ArrowLeft className="h-3.5 w-3.5" /> Retour au blog
          </Link>
          <div className="mt-6 rounded-3xl p-6 text-center border border-white/5" style={{ background: 'var(--card-bg)' }}>
            Article introuvable ou en cours de chargement.
          </div>
        </div>
      </section>
    );
  }

  return (
    <section className="min-h-screen py-20 px-4 sm:px-6 lg:px-8 relative" style={{ backgroundColor: 'var(--bg)' }}>
      {/* Subtle green ambient light */}
      <div className="absolute top-0 left-1/4 w-96 h-96 bg-[#22C55E]/5 blur-3xl pointer-events-none rounded-full" />

      <div className="mx-auto max-w-3xl relative z-10">
        
        {/* Back navigation */}
        <Link to="/articles" className="inline-flex items-center gap-2 text-[10px] font-black uppercase tracking-widest transition-colors hover:opacity-80"
          style={{ color: '#22C55E' }}>
          <ArrowLeft className="h-4 w-4 stroke-[3px]" /> Retour au blog
        </Link>

        {/* Overhauled Main Detail Container */}
        <article className="mt-8 rounded-3xl p-8 border border-white/[0.04] overflow-hidden" 
          style={{ backgroundColor: 'var(--card-bg)', boxShadow: '0 20px 40px rgba(0,0,0,0.2)' }}>
          
          {/* Header Row */}
          <div className="flex flex-wrap items-center gap-2.5 mb-6">
            <span className="px-2.5 py-0.5 rounded text-[8px] font-black uppercase tracking-widest"
              style={{ background: 'rgba(34,197,94,0.15)', border: '1px solid rgba(34,197,94,0.3)', color: '#22C55E' }}>
              {article.category}
            </span>
            {article.tags.map(t => (
              <span key={t} className="text-[10px] font-mono text-white/40">#{t}</span>
            ))}
          </div>

          <h1 className="text-3xl sm:text-4xl font-extrabold tracking-tight leading-tight" style={{ color: 'var(--text-main)' }}>
            {article.title}
          </h1>

          {/* Author and Metadata Bar */}
          <div className="mt-6 flex flex-wrap items-center justify-between gap-4 py-4 border-y border-white/[0.04]">
            <div className="flex items-center gap-3">
              {/* Circular author initial avatar */}
              <div className="w-10 h-10 rounded-full flex items-center justify-center text-xs font-black uppercase tracking-wider bg-neutral-900 border border-[#22C55E]"
                style={{ color: '#22C55E' }}>
                {article.author.slice(0, 2)}
              </div>
              <div>
                <div className="text-xs font-bold text-white/80">Par {article.author}</div>
                <div className="text-[10px] text-white/40 mt-0.5">{article.date}</div>
              </div>
            </div>

            <div className="flex items-center gap-4 text-white/50 text-[11px]">
              <div className="flex items-center gap-1">
                <Clock className="w-3.5 h-3.5" />
                <span>{article.readTime}</span>
              </div>
              <div className="flex items-center gap-1">
                <Eye className="w-3.5 h-3.5" />
                <span>{article.views || 5} vues</span>
              </div>
              <button 
                onClick={handleLike}
                className="flex items-center gap-1 font-bold transition-colors active:scale-90"
                style={{ color: isLiked ? '#22C55E' : 'var(--text-sub)' }}
              >
                <Heart className="w-3.5 h-3.5" style={isLiked ? { fill: '#22C55E', color: '#22C55E' } : {}} />
                <span>{article.likes} j'aime</span>
              </button>
            </div>
          </div>

          {/* Large cover visualization */}
          <div className="mt-8 rounded-2xl overflow-hidden h-72 sm:h-96 bg-neutral-950 border border-white/[0.04]">
            <img 
              src={article.image || "https://images.unsplash.com/photo-1618401471353-b98aedd07871?auto=format&fit=crop&w=800&q=80"} 
              alt={article.title} 
              className="w-full h-full object-cover"
            />
          </div>

          {/* Premium Markdown content render area */}
          <div className="mt-8 text-white/90 text-sm leading-relaxed space-y-4 markdown-body" style={{ color: 'var(--text-main)' }}>
            <ReactMarkdown
              components={{
                h1: ({node, ...props}) => <h2 className="text-xl font-extrabold text-white mt-8 mb-4 border-b border-white/5 pb-2" {...props} />,
                h2: ({node, ...props}) => <h3 className="text-lg font-black text-white mt-6 mb-3" {...props} />,
                p: ({node, ...props}) => <p className="leading-relaxed mb-4 opacity-85" style={{ color: 'var(--text-sub)' }} {...props} />,
                blockquote: ({node, ...props}) => (
                  <blockquote className="border-l-4 border-[#22C55E] bg-white/[0.02] pl-4 py-2 italic my-6 rounded-r-lg" {...props} />
                ),
                code: ({node, inline, className, children, ...props}) => {
                  const match = /language-(\w+)/.exec(className || '');
                  return !inline && match ? (
                    <pre className="bg-neutral-900 border border-white/5 p-4 rounded-xl overflow-x-auto my-6 font-mono text-xs text-emerald-400">
                      <code className={className} {...props}>
                        {children}
                      </code>
                    </pre>
                  ) : (
                    <code className="bg-white/5 px-1.5 py-0.5 rounded font-mono text-xs text-[#22C55E]" {...props}>
                      {children}
                    </code>
                  );
                }
              }}
            >
              {article.content}
            </ReactMarkdown>
          </div>

        </article>

        {/* Dynamic Comments Section */}
        <div className="mt-8 rounded-3xl p-8 border border-white/[0.04]" style={{ backgroundColor: 'var(--card-bg)' }}>
          <h3 className="text-lg font-black mb-6 text-white/90">
            Discussion ({article.comments || 0})
          </h3>

          {/* Comment Form */}
          <form onSubmit={handleAddComment} className="flex gap-4 items-start mb-8">
            <div className="w-9 h-9 rounded-full flex items-center justify-center text-xs font-black uppercase bg-neutral-900 border border-white/10 text-white/80">
              {session?.name ? session.name.slice(0, 2) : 'AN'}
            </div>
            <div className="flex-grow relative">
              <input 
                type="text"
                value={commentText}
                onChange={(e) => setCommentText(e.target.value)}
                placeholder={session ? "Partagez votre avis ou posez une question..." : "Connectez-vous pour participer à la discussion..."}
                disabled={!session}
                className="w-full rounded-2xl pl-4 pr-12 py-3 text-xs focus:outline-none transition-colors border border-white/10 focus:border-[#22C55E]"
                style={{ background: 'var(--surface)', color: 'var(--text-main)' }}
              />
              <button 
                type="submit" 
                disabled={!session || !commentText.trim()}
                className="absolute right-2 top-1/2 -translate-y-1/2 p-2 rounded-xl bg-[#22C55E] text-black disabled:opacity-30 disabled:bg-white/10 disabled:text-white/40 transition-all hover:scale-105"
              >
                <Send className="w-3.5 h-3.5 stroke-[2.5px]" />
              </button>
            </div>
          </form>

          {/* Comments List */}
          <div className="space-y-4">
            {localComments.map((c) => (
              <div key={c.id} className="p-4 rounded-2xl bg-white/[0.01] border border-white/[0.03] flex gap-4">
                <div className="w-8 h-8 rounded-full flex items-center justify-center text-[10px] font-black uppercase bg-neutral-900 border border-white/5 text-white/50">
                  {c.author.slice(0, 2)}
                </div>
                <div>
                  <div className="flex items-center gap-2">
                    <span className="text-xs font-bold text-white/80">{c.author}</span>
                    <span className="text-[9px] text-white/30">{c.date}</span>
                  </div>
                  <p className="text-xs text-white/60 mt-1 leading-relaxed">
                    {c.text}
                  </p>
                </div>
              </div>
            ))}
          </div>

        </div>

      </div>
    </section>
  );
}
