import React from 'react';
import { Link } from 'react-router-dom';
import { Heart, MessageSquare, ArrowRight, Share2, Code } from 'lucide-react';

const accentMap = {
  orange: 'var(--accent-orange)',
  green: 'var(--accent-green)',
};

export default function ProjectCard({ project, onLike, isLiked, onShare, shareLabel }) {
  const accent = accentMap[project.accent] || 'var(--accent-orange)';

  return (
    <article
      className="rounded-3xl overflow-hidden transition-all duration-300 transform-style-3d group relative"
      style={{ 
        backgroundColor: 'var(--card-bg)', 
        border: '1px solid var(--border-col)',
        boxShadow: '0 4px 20px -5px rgba(0,0,0,0.1)'
      }}
      onMouseEnter={(event) => {
        event.currentTarget.style.borderColor = accent;
        event.currentTarget.style.transform = 'translateY(-6px)';
        event.currentTarget.style.boxShadow = `0 20px 40px -15px ${accent}25`;
      }}
      onMouseLeave={(event) => {
        event.currentTarget.style.borderColor = 'var(--border-col)';
        event.currentTarget.style.transform = 'translateY(0)';
        event.currentTarget.style.boxShadow = '0 4px 20px -5px rgba(0,0,0,0.1)';
      }}
    >
      {/* Visual distinctive header: IDE/Browser window style */}
      <div
        className="flex items-center justify-between px-5 py-3.5 relative overflow-hidden"
        style={{ background: 'var(--surface)', borderBottom: '1px solid var(--border-col)' }}
      >
        <div className="flex items-center gap-3">
          {/* Mock Browser Dots */}
          <div className="flex gap-1.5 items-center select-none pointer-events-none">
            <span className="w-2.5 h-2.5 rounded-full" style={{ backgroundColor: 'rgba(239, 68, 68, 0.4)' }} />
            <span className="w-2.5 h-2.5 rounded-full" style={{ backgroundColor: 'rgba(245, 158, 11, 0.4)' }} />
            <span className="w-2.5 h-2.5 rounded-full" style={{ backgroundColor: 'rgba(16, 185, 129, 0.4)' }} />
          </div>
          <span className="text-[10px] font-mono opacity-40 font-semibold" style={{ color: 'var(--text-main)' }}>
            project.json
          </span>
        </div>
        
        {project.status && (
          <span
            className="rounded px-2 py-0.5 text-[8px] font-bold uppercase tracking-wider"
            style={{ background: 'var(--glow-orange)', border: '1px solid var(--border-orange)', color: 'var(--accent-orange)' }}
          >
            {project.status}
          </span>
        )}
      </div>

      {/* Project Cover Image Section */}
      <div className="relative h-44 overflow-hidden group bg-neutral-950">
        <img 
          src={project.image || "https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?auto=format&fit=crop&w=600&q=80"} 
          alt={project.title} 
          className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
        />
        {/* Shadow overlays */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/10 to-transparent opacity-60" />
      </div>

      <div className="p-6 relative">
        {/* Subtle grid accent inside the card body */}
        <div className="absolute right-4 top-4 opacity-5 pointer-events-none group-hover:opacity-10 transition-opacity duration-300">
          <Code className="w-16 h-16" style={{ color: accent }} />
        </div>

        <div>
          <span className="text-stag font-semibold text-[8px]" style={{ color: 'var(--accent-orange)' }}>
            {project.category}
          </span>
          <h4 className="font-display text-h3 mt-1 group-hover:text-[var(--accent-orange)] transition-colors duration-300" style={{ color: 'var(--text-main)' }}>
            {project.title}
          </h4>
        </div>

        <p className="mt-3 text-small leading-relaxed font-light min-h-[48px]" style={{ color: 'var(--text-sub)' }}>
          {project.summary}
        </p>

        {/* Project Owner Profile Row */}
        <div className="mt-4 flex items-center gap-3 py-2.5 px-3.5 rounded-2xl bg-black/20 border border-white/[0.04]">
          <img 
            src={project.ownerAvatar || "https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?auto=format&fit=crop&w=80&h=80&q=80"} 
            alt={project.owner || 'Porteur'} 
            className="w-9.5 h-9.5 rounded-xl object-cover border border-white/10"
          />
          <div className="flex flex-col">
            <span className="text-[9px] font-bold uppercase tracking-wider opacity-60" style={{ color: 'var(--accent-orange)' }}>Porteur de projet</span>
            <span className="text-xs font-black mt-0.5" style={{ color: 'var(--text-main)' }}>{project.owner || 'Membre DevBenin'}</span>
          </div>
          <span className="ml-auto text-[9px] font-mono px-2 py-1 rounded bg-white/5 border border-white/10" style={{ color: 'var(--text-sub)' }}>
            {project.ownerEmail || 'contact@devbenin.bj'}
          </span>
        </div>

        {/* Tech tags stack */}
        <div className="mt-4 flex flex-wrap gap-1.5 pt-4" style={{ borderTop: '1px dashed var(--border-col)' }}>
          {project.tags.map((tag) => (
            <span
              key={tag}
              className="rounded-full px-2.5 py-0.5 text-[9px] font-bold tracking-wide uppercase"
              style={{ background: 'var(--glow-green)', border: '1px solid var(--border-col)', color: 'var(--accent-green)' }}
            >
              {tag}
            </span>
          ))}
        </div>

        <div className="mt-3 flex flex-wrap gap-1.5">
          {project.techStack.map((tech) => (
            <span
              key={tech}
              className="rounded px-2 py-0.5 text-[9px] font-mono font-semibold"
              style={{ background: 'var(--surface)', border: '1px solid var(--border-col)', color: 'var(--text-sub)' }}
            >
              {tech}
            </span>
          ))}
        </div>

        {/* Footer with stats */}
        <div className="mt-6 flex items-center justify-between pt-4" style={{ borderTop: '1px solid var(--border-col)' }}>
          <div className="flex items-center gap-4">
            <button
              onClick={() => onLike(project.id)}
              className="flex items-center gap-1.5 text-[10px] font-bold transition-transform active:scale-90"
              style={{ color: isLiked ? 'var(--accent-orange)' : 'var(--text-sub)' }}
            >
              <Heart className="h-4 w-4"
                style={isLiked ? { fill: 'var(--accent-orange)', color: 'var(--accent-orange)' } : {}}
              />
              <span>{project.likes}</span>
            </button>
            <div className="flex items-center gap-1.5 text-[10px] font-semibold" style={{ color: 'var(--text-sub)' }}>
              <MessageSquare className="h-4 w-4" />
              <span>{project.comments.length}</span>
            </div>
          </div>
          <div className="flex items-center gap-3">
            <button
              onClick={() => onShare?.(project.id)}
              className="flex items-center gap-1 text-[10px] font-bold hover:brightness-110"
              style={{ color: 'var(--accent-green)' }}
            >
              <Share2 className="h-3.5 w-3.5" />
              {shareLabel || 'Partager'}
            </button>
            <Link to={`/projects/${project.id}`} className="flex items-center gap-1 text-[10px] font-bold group-hover:translate-x-1 transition-transform duration-200"
              style={{ color: accent }}>
              Voir <ArrowRight className="h-3.5 w-3.5" />
            </Link>
          </div>
        </div>
      </div>
    </article>
  );
}
