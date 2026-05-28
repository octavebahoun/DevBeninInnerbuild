import React, { useEffect, useRef } from 'react';
import NeuronNetwork from './NeuronNetwork';
import { motion } from 'framer-motion';
import { gsap } from 'gsap';
import heroImg from '../assets/benin.webp';
import { useNavigate } from 'react-router-dom';

export default function Hero() {
  const imgRef      = useRef(null);
  const glowRef     = useRef(null);
  const floatTlRef  = useRef(null);
  const navigate    = useNavigate();

  /* ── GSAP animations on mount ── */
  useEffect(() => {
    const img  = imgRef.current;
    const glow = glowRef.current;
    if (!img || !glow) return;

    // 1. Entrance: slide in from right + fade
    gsap.fromTo(
      img,
      { x: 80, opacity: 0, rotate: 6, scale: 0.88 },
      {
        x: 0, opacity: 1, rotate: 0, scale: 1,
        duration: 1.1,
        delay: 0.35,
        ease: 'power3.out',
      }
    );

    // 2. Glow pulse entrance
    gsap.fromTo(
      glow,
      { opacity: 0, scale: 0.7 },
      { opacity: 1, scale: 1, duration: 1.2, delay: 0.5, ease: 'power2.out' }
    );

    // 3. Perpetual float
    floatTlRef.current = gsap.timeline({ repeat: -1, yoyo: true });
    floatTlRef.current.to(img, {
      y: -18,
      rotate: 2,
      duration: 2.8,
      delay: 1.4,
      ease: 'sine.inOut',
    });

    // 4. Glow breathe
    gsap.to(glow, {
      scale: 1.15,
      opacity: 0.7,
      duration: 2.8,
      delay: 1.4,
      repeat: -1,
      yoyo: true,
      ease: 'sine.inOut',
    });

    return () => {
      floatTlRef.current?.kill();
    };
  }, []);

  return (
    <section
      id="home"
      className="relative flex min-h-[90svh] items-center overflow-hidden py-20 px-4 sm:px-6 lg:px-8 pattern-dots"
      style={{ backgroundColor: 'var(--bg)' }}
    >
      {/* Three.js background */}
      <NeuronNetwork />

      {/* Top orange glow */}
      <div
        className="absolute top-0 left-1/2 -translate-x-1/2 h-[320px] w-[700px] pointer-events-none"
        style={{ background: 'radial-gradient(ellipse, var(--glow-orange) 0%, transparent 70%)' }}
      />

      {/* ── Two-column layout ── */}
      <div className="relative z-10 mx-auto w-full max-w-6xl flex flex-col-reverse md:flex-row items-center justify-between gap-12 md:gap-8">

        {/* ════ LEFT — Text content ════ */}
        <div className="flex-1 text-center md:text-left">
          {/* Badge */}
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="inline-flex items-center gap-2 rounded-full px-4 py-1.5 backdrop-blur-sm mb-6 cursor-pointer hover:border-[var(--accent-green)] transition-all duration-200"
            style={{ border: '1px solid var(--border-orange)', background: 'var(--glow-orange)' }}
            onClick={() => navigate('/challenges')}
          >
            <span className="relative flex h-2 w-2">
              <span
                className="absolute inline-flex h-full w-full animate-ping rounded-full opacity-75"
                style={{ background: 'var(--accent-orange)' }}
              />
              <span className="relative inline-flex h-2 w-2 rounded-full" style={{ background: 'var(--accent-orange)' }} />
            </span>
            <span className="text-stag" style={{ color: 'var(--accent-orange)' }}>
              🔥 [Nouveau] Challenges de Quiz hebdomadaires
            </span>
          </motion.div>

          {/* Title */}
          <motion.h1
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.7, delay: 0.1 }}
            className="text-h1"
            style={{ color: 'var(--text-main)' }}
          >
            Construisons l'avenir<br />
            <span style={{ color: 'var(--accent-orange)' }}>Tech</span> du Bénin<br />
            <span style={{ color: 'var(--accent-green)', opacity: 0.65 }} className="font-light">
              ensemble
            </span>
          </motion.h1>

          {/* Subtitle */}
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.3 }}
            className="mt-6 max-w-lg text-body mx-auto md:mx-0"
            style={{ color: 'var(--text-sub)' }}
          >
            La plus grande communauté de développeurs au Bénin. Apprenez, partagez vos connaissances
            et collaborez sur des projets open source innovants.
          </motion.p>

          {/* Buttons */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.4 }}
            className="mt-8 flex flex-wrap items-center justify-center md:justify-start gap-4"
          >
            <button 
              className="btn-orange rounded-md px-7 py-3.5 text-cta"
              onClick={() => navigate('/register')}
            >
              Rejoindre l'élite ↗
            </button>
            <button 
              className="btn-outline-orange rounded-md px-7 py-3.5 text-small font-semibold"
              onClick={() => navigate('/projects')}
            >
              Voir les projets →
            </button>
          </motion.div>

          {/* Stats */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.6 }}
            className="mt-10 flex flex-wrap items-center justify-center md:justify-start gap-8"
          >
            {[
              { val: '500+', label: 'Membres actifs' },
              { val: '80+',  label: 'Projets open source' },
              { val: '30+',  label: 'Challenges réalisés' },
            ].map(({ val, label }) => (
              <div key={label} className="text-center md:text-left">
                <div className="text-h2" style={{ color: 'var(--accent-orange)' }}>{val}</div>
                <div className="text-stag mt-1" style={{ color: 'var(--text-sub)' }}>{label}</div>
              </div>
            ))}
          </motion.div>
        </div>

        {/* ════ RIGHT — Hero image ════ */}
        <div className="flex-1 flex items-center justify-center md:justify-end relative">
          {/* Green/orange glow behind image — matches site palette */}
          <div
            ref={glowRef}
            className="absolute inset-0 m-auto rounded-full pointer-events-none"
            style={{
              width: '260px',
              height: '260px',
              background: 'radial-gradient(ellipse, var(--glow-orange) 0%, var(--glow-green) 55%, transparent 80%)',
              filter: 'blur(32px)',
            }}
          />

          {/* Decorative ring */}
          <div
            className="absolute rounded-full pointer-events-none"
            style={{
              width: '230px',
              height: '230px',
              border: '1px solid var(--border-orange)',
              opacity: 0.25,
            }}
          />
          <div
            className="absolute rounded-full pointer-events-none"
            style={{
              width: '290px',
              height: '290px',
              border: '1px dashed rgba(249,115,22,0.12)',
            }}
          />

          {/* The image itself */}
          <img
            ref={imgRef}
            src={heroImg}
            alt="DevBénin — plateforme tech béninoise"
            className="relative z-10 w-[180px] sm:w-[220px] md:w-[260px] lg:w-[300px] select-none pointer-events-none"
            style={{
              filter: 'drop-shadow(0 24px 48px rgba(34,197,94,0.3)) drop-shadow(0 8px 24px rgba(249,115,22,0.2))',
              opacity: 0, // GSAP will animate this in
            }}
            draggable={false}
          />
        </div>

      </div>

      {/* Bottom fade */}
      <div
        className="absolute bottom-0 left-0 right-0 h-28 pointer-events-none z-0"
        style={{ background: 'linear-gradient(to top, var(--bg), transparent)' }}
      />
    </section>
  );
}
