import React, { useEffect } from 'react';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import About from './components/About';
import Features from './components/Features';
import Challenges from './components/Challenges';
import Community from './components/Community';
import Blog from './components/Blog';
import CTA from './components/CTA';
import Footer from './components/Footer';
import { ThemeProvider } from './context/ThemeContext';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

export default function App() {
  useEffect(() => {
    // Reveal sections on scroll using GSAP
    const sections = ['#about', '#features', '#challenges', '#community', '#blog'];
    
    sections.forEach((selector) => {
      const element = document.querySelector(selector);
      if (!element) return;
      
      gsap.fromTo(
        element,
        { opacity: 0, y: 30 },
        {
          opacity: 1,
          y: 0,
          duration: 0.8,
          ease: 'power2.out',
          scrollTrigger: {
            trigger: element,
            start: 'top 85%',
            toggleActions: 'play none none none',
          },
        }
      );
    });
  }, []);

  return (
    <ThemeProvider>
      <div
        className="flex min-h-screen flex-col transition-colors duration-300"
        style={{ backgroundColor: 'var(--bg)', color: 'var(--text-main)' }}
      >
        <Navbar />
        <main className="flex-grow">
          <Hero />
          <About />
          <Features />
          <Challenges />
          <Community />
          <Blog />
          <CTA />
        </main>
        <Footer />
      </div>
    </ThemeProvider>
  );
}
