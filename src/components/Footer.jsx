import React from 'react';
import { Link } from 'react-router-dom';

export default function Footer() {
  return (
    <footer
      className="relative overflow-hidden py-16 px-4 sm:px-6 lg:px-8 pattern-circuit"
      style={{
        backgroundColor: 'var(--bg)',
        borderTop: '1px solid var(--border-col)'
      }}
    >
      {/* Orange corner glow */}
      <div
        className="absolute left-0 bottom-0 h-[250px] w-[250px] pointer-events-none blur-3xl"
        style={{ background: 'var(--glow-orange)' }}
      />

      {/* SVG Circuit Overlay */}
      <div className="absolute right-0 bottom-0 opacity-10 pointer-events-none w-[300px] h-[300px] md:w-[400px] md:h-[400px]">
        <svg viewBox="0 0 100 100" fill="none" stroke="currentColor" className="w-full h-full" strokeWidth="0.5" style={{ color: 'var(--accent-orange)' }}>
          <circle cx="10" cy="10" r="1" fill="currentColor" />
          <path d="M10 10 h20 v20 h20 v10 h10" />
          <circle cx="60" cy="40" r="1.5" fill="currentColor" />
          <path d="M60 40 v20 h-30 v10 h-10" />
          <circle cx="20" cy="70" r="1" fill="currentColor" />
          <path d="M60 40 h20 v20 h10" />
          <circle cx="90" cy="60" r="1.5" fill="currentColor" />
        </svg>
      </div>

      <div className="relative z-10 mx-auto max-w-5xl">
        <div className="grid grid-cols-1 gap-8 md:grid-cols-4">
          {/* Brand info */}
          <div className="md:col-span-2">
            <span className="text-xl font-display tracking-wider" style={{ color: 'var(--text-main)' }}>
              Dev<span style={{ color: 'var(--accent-orange)' }}>Bénin</span>
            </span>
            <p className="mt-4 max-w-sm text-small leading-relaxed font-light" style={{ color: 'var(--text-sub)' }}>
              La communauté nationale des créateurs, développeurs et professionnels du numérique au Bénin.
              Rejoignez-nous pour grandir ensemble.
            </p>
            <div className="mt-6 flex items-center gap-4">
              {/* GitHub */}
              <a href="#" style={{ color: 'var(--text-muted)' }} aria-label="Github"
                onMouseEnter={e => e.currentTarget.style.color = 'var(--accent-orange)'}
                onMouseLeave={e => e.currentTarget.style.color = 'var(--text-muted)'}
                className="transition-colors duration-200"
              >
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="h-4.5 w-4.5">
                  <path d="M15 22v-4a4.8 4.8 0 0 0-1-3.5c3 0 6-2 6-5.5.08-1.25-.27-2.48-1-3.5.28-1.15.28-2.35 0-3.5 0 0-1 0-3 1.5-2.64-.5-5.36-.5-8 0C6 2 5 2 5 2c-.3 1.15-.3 2.35 0 3.5A5.403 5.403 0 0 0 4 9c0 3.5 3 5.5 6 5.5-.39.49-.68 1.05-.85 1.65-.17.6-.22 1.23-.15 1.85v4" />
                  <path d="M9 18c-4.51 2-5-2-7-2" />
                </svg>
              </a>
              {/* LinkedIn */}
              <a href="#" style={{ color: 'var(--text-muted)' }} aria-label="LinkedIn"
                onMouseEnter={e => e.currentTarget.style.color = 'var(--accent-orange)'}
                onMouseLeave={e => e.currentTarget.style.color = 'var(--text-muted)'}
                className="transition-colors duration-200"
              >
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="h-4.5 w-4.5">
                  <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z" />
                  <rect x="2" y="9" width="4" height="12" />
                  <circle cx="4" cy="4" r="2" />
                </svg>
              </a>
              {/* Facebook */}
              <a href="#" style={{ color: 'var(--text-muted)' }} aria-label="Facebook"
                onMouseEnter={e => e.currentTarget.style.color = 'var(--accent-orange)'}
                onMouseLeave={e => e.currentTarget.style.color = 'var(--text-muted)'}
                className="transition-colors duration-200"
              >
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="h-4.5 w-4.5">
                  <path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z" />
                </svg>
              </a>
              {/* Twitter/X */}
              <a href="#" style={{ color: 'var(--text-muted)' }} aria-label="Twitter"
                onMouseEnter={e => e.currentTarget.style.color = 'var(--accent-orange)'}
                onMouseLeave={e => e.currentTarget.style.color = 'var(--text-muted)'}
                className="transition-colors duration-200"
              >
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="h-4.5 w-4.5">
                  <path d="M22 4s-.7 2.1-2 3.4c1.6 10-9.4 17.3-18 11.6 2.2.1 4.4-.6 6-2C3 15.5.5 9.6 3 5c2.2 2.6 5.6 4.1 9 4-.9-4.2 4-6.6 7-3.8 1.1 0 3-1.2 3-1.2z" />
                </svg>
              </a>
            </div>
          </div>

          {/* Navigation links */}
          <div>
            <h4
              className="text-stag mb-4"
              style={{ color: 'var(--accent-orange)' }}
            >
              Navigation
            </h4>
            <ul className="space-y-2.5 text-small font-medium" style={{ color: 'var(--text-sub)' }}>
              {['Accueil:#home', 'À Propos:#about', 'Projets:#home-projects', 'Challenges:/challenges'].map(item => {
                const [label, href] = item.split(':');
                const isSpa = href.startsWith('/');
                return (
                  <li key={href}>
                    {isSpa ? (
                      <Link
                        to={href}
                        className="transition-colors duration-150"
                        onMouseEnter={e => e.currentTarget.style.color = 'var(--accent-orange)'}
                        onMouseLeave={e => e.currentTarget.style.color = 'var(--text-sub)'}
                      >
                        {label}
                      </Link>
                    ) : (
                      <a
                        href={href}
                        className="transition-colors duration-150"
                        onMouseEnter={e => e.currentTarget.style.color = 'var(--accent-orange)'}
                        onMouseLeave={e => e.currentTarget.style.color = 'var(--text-sub)'}
                      >
                        {label}
                      </a>
                    )}
                  </li>
                );
              })}
            </ul>
          </div>

          {/* Community links */}
          <div>
            <h4
              className="text-stag mb-4"
              style={{ color: 'var(--accent-orange)' }}
            >
              Communauté
            </h4>
            <ul className="space-y-2.5 text-small font-medium" style={{ color: 'var(--text-sub)' }}>
              {['Membres:/membres', 'Blog Technique:#blog', 'Projets Locaux:/projects', 'Leaderboard:/leaderboard'].map(item => {
                const [label, href] = item.split(':');
                const isSpa = href.startsWith('/');
                return (
                  <li key={label}>
                    {isSpa ? (
                      <Link
                        to={href}
                        className="transition-colors duration-150"
                        onMouseEnter={e => e.currentTarget.style.color = 'var(--accent-orange)'}
                        onMouseLeave={e => e.currentTarget.style.color = 'var(--text-sub)'}
                      >
                        {label}
                      </Link>
                    ) : (
                      <a
                        href={href}
                        className="transition-colors duration-150"
                        onMouseEnter={e => e.currentTarget.style.color = 'var(--accent-orange)'}
                        onMouseLeave={e => e.currentTarget.style.color = 'var(--text-sub)'}
                      >
                        {label}
                      </a>
                    )}
                  </li>
                );
              })}
            </ul>
          </div>
        </div>

        {/* Footer bottom divider */}
        <div className="divider-orange mt-12" />

        {/* Copyright */}
        <div
          className="mt-6 flex flex-col sm:flex-row items-center justify-between gap-4 text-[10px] font-medium"
          style={{ color: 'var(--text-sub)' }}
        >
          <div>
            © {new Date().getFullYear()} DevBénin. Recréé pour le Challenge InnerBuild S02.
          </div>
          <div className="flex items-center gap-1.5 text-[9px]" style={{ color: 'var(--accent-orange)' }}>
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="h-3.5 w-3.5">
              <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
              <line x1="12" y1="8" x2="12" y2="12" />
              <line x1="12" y1="16" x2="12.01" y2="16" />
            </svg>
            <span>Fait avec passion par Excellence Team</span>
          </div>
        </div>
      </div>
    </footer>
  );
}
