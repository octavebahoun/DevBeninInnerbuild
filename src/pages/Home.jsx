import React, { useEffect } from 'react';
import Hero from '../components/Hero';
import About from '../components/About';
import HomeProjects from '../components/HomeProjects';
import Challenges from '../components/Challenges';
import Community from '../components/Community';
import Blog from '../components/Blog';
import CTA from '../components/CTA';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

export default function Home() {
  useEffect(() => {
    // ── 1. Section dividers — animated orange line sweep ──────────────
    const dividers = document.querySelectorAll('.divider-orange, .divider-green');
    dividers.forEach(el => {
      gsap.fromTo(el,
        { scaleX: 0, transformOrigin: 'left center' },
        {
          scaleX: 1,
          duration: 1.2,
          ease: 'power3.out',
          scrollTrigger: { trigger: el, start: 'top 90%' },
        }
      );
    });

    // ── 2. Stat counters — count up animation ─────────────────────────
    const statEls = document.querySelectorAll('[data-count]');
    statEls.forEach(el => {
      const target = parseFloat(el.dataset.count);
      const suffix = el.dataset.suffix ?? '';
      ScrollTrigger.create({
        trigger: el,
        start: 'top 85%',
        once: true,
        onEnter: () => {
          gsap.fromTo(
            { val: 0 },
            {
              val: target,
              duration: 1.8,
              ease: 'power2.out',
              onUpdate() { el.textContent = Math.round(this.targets()[0].val) + suffix; },
            }
          );
        },
      });
    });

    // ── 3. Card grids — stagger batch ─────────────────────────────────
    const grids = document.querySelectorAll('[data-stagger-grid]');
    grids.forEach(grid => {
      const cards = grid.querySelectorAll('[data-stagger-card]');
      gsap.fromTo(cards,
        { opacity: 0, y: 44, scale: 0.95 },
        {
          opacity: 1, y: 0, scale: 1,
          duration: 0.65,
          ease: 'power2.out',
          stagger: 0.1,
          scrollTrigger: {
            trigger: grid,
            start: 'top 82%',
          },
        }
      );
    });

    // ── 4. Background parallax on sections ────────────────────────────
    const parallaxSections = document.querySelectorAll('[data-parallax]');
    parallaxSections.forEach(el => {
      gsap.to(el, {
        yPercent: -12,
        ease: 'none',
        scrollTrigger: {
          trigger: el,
          start: 'top bottom',
          end: 'bottom top',
          scrub: 1.5,
        },
      });
    });

    // ── 5. Section title stripe — reveal ──────────────────────────────
    gsap.utils.toArray('[data-gsap-title]').forEach(el => {
      gsap.fromTo(el,
        { opacity: 0, y: 30, skewY: 3 },
        {
          opacity: 1, y: 0, skewY: 0,
          duration: 0.8,
          ease: 'power3.out',
          scrollTrigger: { trigger: el, start: 'top 85%' },
        }
      );
    });

    return () => ScrollTrigger.getAll().forEach(t => t.kill());
  }, []);

  return (
    <>
      <Hero />
      <About />
      <Blog />
      <HomeProjects />
      <Challenges />
      <Community />
      <CTA />
    </>
  );
}
