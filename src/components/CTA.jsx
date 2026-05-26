import React from 'react';

export default function CTA() {
  return (
    <section
      className="relative py-24 px-4 sm:px-6 lg:px-8 overflow-hidden pattern-dots"
      style={{ backgroundColor: 'var(--bg)', borderBottom: '1px solid var(--border-col)' }}
    >
      {/* Orange radial glow */}
      <div
        className="absolute left-1/2 top-1/2 h-[400px] w-[700px] -translate-x-1/2 -translate-y-1/2 rounded-full pointer-events-none blur-3xl"
        style={{ background: 'radial-gradient(ellipse, var(--glow-orange) 0%, transparent 70%)' }}
      />
      {/* Green secondary glow */}
      <div
        className="absolute right-0 bottom-0 h-[200px] w-[200px] rounded-full pointer-events-none blur-3xl"
        style={{ background: 'var(--glow-green)' }}
      />

      <div className="relative z-10 mx-auto max-w-4xl text-center">
        {/* Badge */}
        <span
          className="inline-flex items-center gap-2 rounded-full px-4 py-1.5 text-[10px] font-bold uppercase tracking-widest mb-6"
          style={{
            background: 'var(--glow-orange)',
            border: '1px solid var(--border-orange)',
            color: 'var(--accent-orange)'
          }}
        >
          <span
            className="inline-block h-1.5 w-1.5 rounded-full animate-pulse"
            style={{ background: 'var(--accent-orange)' }}
          />
          Rejoins l'élite dès aujourd'hui
        </span>

        <h2 className="font-display text-3xl sm:text-5xl md:text-6xl font-bold tracking-tight leading-tight" style={{ color: 'var(--text-main)' }}>
          PRÊT À PARTICIPER<br />
          AU <span style={{ color: 'var(--accent-orange)' }}>CHANGEMENT</span> ?
        </h2>

        <p
          className="mx-auto mt-6 max-w-xl text-sm sm:text-base font-medium leading-relaxed"
          style={{ color: 'var(--text-sub)' }}
        >
          Inscris-toi sur la plateforme, crée ton profil de développeur, publie tes projets
          et commence à collaborer avec les meilleurs esprits tech du Bénin.
        </p>

        {/* Divider orange */}
        <div className="divider-orange mx-auto mt-8 mb-8 max-w-xs" />

        <div className="flex flex-wrap items-center justify-center gap-4">
          <button className="btn-orange rounded-md px-8 py-4 font-display text-sm tracking-wider">
            Rejoindre la Communauté ↗
          </button>

          <button className="btn-outline-green rounded-md px-8 py-4 font-semibold text-sm">
            Voir le Classement
          </button>
        </div>

        {/* Trust indicators */}
        <div className="mt-10 flex flex-wrap items-center justify-center gap-6">
          {[
            { icon: '🔒', label: 'Accès sécurisé' },
            { icon: '🇧🇯', label: 'Made in Bénin' },
            { icon: '⚡', label: 'Open Source' },
          ].map(({ icon, label }) => (
            <div key={label} className="flex items-center gap-2 text-[10px] uppercase tracking-widest" style={{ color: 'var(--text-sub)' }}>
              <span>{icon}</span>
              <span>{label}</span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
