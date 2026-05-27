import React from 'react';
import { Link } from 'react-router-dom';
import { Heart, MessageSquare, ArrowRight, Share2 } from 'lucide-react';

const accentMap = {
  orange: 'var(--accent-orange)',
  green: 'var(--accent-green)',
};

export default function ProjectCard({ project, onLike, isLiked, onShare, shareLabel }) {
  const accent = accentMap[project.accent] || 'var(--accent-orange)';

  return (
    <article
      className="rounded-lg overflow-hidden transition-all duration-300"
      style={{ backgroundColor: 'var(--card-bg)', border: '1px solid var(--border-col)' }}
      onMouseEnter={(event) => (event.currentTarget.style.borderColor = accent)}
      onMouseLeave={(event) => (event.currentTarget.style.borderColor = 'var(--border-col)')}
    >
      <div
        className="flex items-center justify-between px-5 py-4"
        style={{ background: 'linear-gradient(135deg, var(--surface) 0%, var(--glow-orange) 100%)' }}
      >
        <div>
          <div className="text-[10px] uppercase tracking-widest" style={{ color: 'var(--text-sub)' }}>
            {project.category}
          </div>
          <div className="font-display text-sm" style={{ color: 'var(--text-main)' }}>
            {project.title}
          </div>
        </div>
        {project.status && (
          <span
            className="rounded-full px-2.5 py-1 text-[9px] font-semibold"
            style={{ background: 'var(--glow-orange)', border: '1px solid var(--border-orange)', color: 'var(--accent-orange)' }}
          >
            {project.status}
          </span>
        )}
      </div>

      <div className="p-5">
        <p className="text-xs leading-relaxed" style={{ color: 'var(--text-sub)' }}>
          {project.summary}
        </p>

        <div className="mt-4 flex flex-wrap gap-1.5">
          {project.tags.map((tag) => (
            <span
              key={tag}
              className="rounded-full px-2.5 py-0.5 text-[9px] font-semibold"
              style={{ background: 'var(--glow-green)', border: '1px solid var(--border-col)', color: 'var(--accent-green)' }}
            >
              {tag}
            </span>
          ))}
        </div>

        <div className="mt-4 flex flex-wrap gap-2">
          {project.techStack.map((tech) => (
            <span
              key={tech}
              className="rounded px-2 py-0.5 text-[9px] font-semibold"
              style={{ background: 'var(--surface)', border: '1px solid var(--border-col)', color: 'var(--text-sub)' }}
            >
              {tech}
            </span>
          ))}
        </div>

        <div className="mt-5 flex items-center justify-between">
          <div className="flex items-center gap-4">
            <button
              onClick={() => onLike(project.id)}
              className="flex items-center gap-1.5 text-[10px] font-semibold"
              style={{ color: isLiked ? 'var(--accent-orange)' : 'var(--text-sub)' }}
            >
              <Heart className="h-4 w-4"
                style={isLiked ? { fill: 'var(--accent-orange)', color: 'var(--accent-orange)' } : {}}
              />
              <span>{project.likes}</span>
            </button>
            <div className="flex items-center gap-1.5 text-[10px]" style={{ color: 'var(--text-sub)' }}>
              <MessageSquare className="h-4 w-4" />
              <span>{project.comments.length}</span>
            </div>
          </div>
          <div className="flex items-center gap-3">
            <button
              onClick={() => onShare?.(project.id)}
              className="flex items-center gap-1 text-[10px] font-semibold"
              style={{ color: 'var(--accent-green)' }}
            >
              <Share2 className="h-3.5 w-3.5" />
              {shareLabel || 'Partager'}
            </button>
            <Link to={`/projects/${project.id}`} className="flex items-center gap-1 text-[10px] font-semibold"
              style={{ color: accent }}>
              Details <ArrowRight className="h-3.5 w-3.5" />
            </Link>
          </div>
        </div>
      </div>
    </article>
  );
}
