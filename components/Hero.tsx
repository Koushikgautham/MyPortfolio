'use client';

import { useEffect, useRef } from 'react';
import { motion } from 'framer-motion';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import dynamic from 'next/dynamic';

// Dynamically import PixelBlast to avoid SSR issues with Three.js
const PixelBlast = dynamic(() => import('./PixelBlast'), { ssr: false });

gsap.registerPlugin(ScrollTrigger);

export default function Hero() {
  const sectionRef = useRef<HTMLElement>(null);
  const titleRef = useRef<HTMLHeadingElement>(null);
  const line1Ref = useRef<HTMLDivElement>(null);
  const line2Ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Animate first line characters
      if (line1Ref.current) {
        const chars = line1Ref.current.querySelectorAll('.char');
        gsap.fromTo(
          chars,
          { opacity: 0, y: 80, rotateX: -90 },
          {
            opacity: 1,
            y: 0,
            rotateX: 0,
            stagger: 0.03,
            duration: 1,
            ease: 'power4.out',
            delay: 0.3,
          }
        );
      }

      // Animate second line characters
      if (line2Ref.current) {
        const chars = line2Ref.current.querySelectorAll('.char');
        gsap.fromTo(
          chars,
          { opacity: 0, y: 80, rotateX: -90 },
          {
            opacity: 1,
            y: 0,
            rotateX: 0,
            stagger: 0.03,
            duration: 1,
            ease: 'power4.out',
            delay: 0.6,
          }
        );
      }

      // Parallax effect on scroll
      if (sectionRef.current) {
        gsap.to('.hero-content', {
          y: 150,
          opacity: 0,
          scrollTrigger: {
            trigger: sectionRef.current,
            start: 'top top',
            end: 'bottom top',
            scrub: 1,
          },
        });
      }
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  const line1 = 'BUILDING';
  const line2 = 'DIGITAL';

  return (
    <section
      ref={sectionRef}
      id="home"
      className="relative min-h-screen flex items-center overflow-hidden bg-[var(--background)] pt-20 md:pt-0 transition-colors duration-300"
    >
      {/* PixelBlast Background Effect */}
      <div className="absolute inset-0 z-0">
        <PixelBlast
          variant="square"
          pixelSize={3}
          color="#ff6b00"
          patternScale={2.5}
          patternDensity={0.85}
          enableRipples={true}
          rippleIntensityScale={1.5}
          rippleThickness={0.12}
          rippleSpeed={0.35}
          speed={0.25}
          edgeFade={0.15}
          transparent={true}
        />
      </div>

      {/* Vertical Side Label - Left (Hidden on mobile) */}
      <motion.div
        initial={{ opacity: 0, x: -20 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.8, delay: 1.2 }}
        className="absolute left-4 lg:left-6 top-1/2 -translate-y-1/2 hidden lg:flex flex-col items-center gap-4 z-20"
      >
        <div className="w-px h-16 lg:h-20 bg-[var(--border)]" />
        <span className="text-[10px] lg:text-xs font-medium tracking-widest text-[var(--muted)] vertical-text">
          PORTFOLIO
        </span>
        <div className="w-px h-16 lg:h-20 bg-[var(--border)]" />
      </motion.div>

      {/* Vertical Side Label - Right (Hidden on mobile) */}
      <motion.div
        initial={{ opacity: 0, x: 20 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.8, delay: 1.2 }}
        className="absolute right-4 lg:right-6 top-1/2 -translate-y-1/2 hidden lg:flex flex-col items-center gap-4 z-20"
      >
        <div className="w-px h-16 lg:h-20 bg-[var(--border)]" />
        <span className="text-[10px] lg:text-xs font-medium tracking-widest text-[var(--muted)] vertical-text">
          2026
        </span>
        <div className="w-px h-16 lg:h-20 bg-[var(--border)]" />
      </motion.div>

      {/* Social Links - Horizontal on mobile, Vertical on desktop */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, delay: 1.4 }}
        className="absolute left-1/2 -translate-x-1/2 bottom-24 flex flex-row gap-3 z-20 lg:hidden"
      >
        {[
          { name: 'GitHub', href: 'https://github.com/Koushikgautham', icon: 'M12 0C5.37 0 0 5.37 0 12c0 5.31 3.435 9.795 8.205 11.385.6.105.825-.255.825-.57 0-.285-.015-1.23-.015-2.235-3.015.555-3.795-.735-4.035-1.41-.135-.345-.72-1.41-1.23-1.695-.42-.225-1.02-.78-.015-.795.945-.015 1.62.87 1.845 1.23 1.08 1.815 2.805 1.305 3.495.99.105-.78.42-1.305.765-1.605-2.67-.3-5.46-1.335-5.46-5.925 0-1.305.465-2.385 1.23-3.225-.12-.3-.54-1.53.12-3.18 0 0 1.005-.315 3.3 1.23.96-.27 1.98-.405 3-.405s2.04.135 3 .405c2.295-1.56 3.3-1.23 3.3-1.23.66 1.65.24 2.88.12 3.18.765.84 1.23 1.905 1.23 3.225 0 4.605-2.805 5.625-5.475 5.925.435.375.81 1.095.81 2.22 0 1.605-.015 2.895-.015 3.3 0 .315.225.69.825.57A12.02 12.02 0 0024 12c0-6.63-5.37-12-12-12z' },
          { name: 'LinkedIn', href: 'https://www.linkedin.com/in/koushikgautham/', icon: 'M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 01-2.063-2.065 2.064 2.064 0 112.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z' },
          { name: 'Hexora', href: 'https://hexora.tech', icon: 'M21 16.5c0 .38-.21.71-.53.88l-7.9 4.44c-.16.12-.36.18-.57.18s-.41-.06-.57-.18l-7.9-4.44A.991.991 0 013 16.5v-9c0-.38.21-.71.53-.88l7.9-4.44c.16-.12.36-.18.57-.18s.41.06.57.18l7.9 4.44c.32.17.53.5.53.88v9z' },
        ].map((social) => (
          <motion.a
            key={social.name}
            href={social.href}
            target="_blank"
            rel="noopener noreferrer"
            className="w-11 h-11 flex items-center justify-center rounded-full border border-[var(--border)] bg-[var(--background)]/80 backdrop-blur-sm text-[var(--muted)] hover:text-[#ff6b00] hover:border-[#ff6b00] transition-colors"
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.95 }}
            aria-label={social.name}
          >
            <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
              <path d={social.icon} />
            </svg>
          </motion.a>
        ))}
      </motion.div>

      {/* Desktop Social Links - Vertical Right Side */}
      <motion.div
        initial={{ opacity: 0, x: 20 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.8, delay: 1.4 }}
        className="absolute right-6 bottom-32 hidden lg:flex flex-col items-center gap-3 z-20"
      >
        {[
          { name: 'GitHub', href: 'https://github.com/Koushikgautham', icon: 'M12 0C5.37 0 0 5.37 0 12c0 5.31 3.435 9.795 8.205 11.385.6.105.825-.255.825-.57 0-.285-.015-1.23-.015-2.235-3.015.555-3.795-.735-4.035-1.41-.135-.345-.72-1.41-1.23-1.695-.42-.225-1.02-.78-.015-.795.945-.015 1.62.87 1.845 1.23 1.08 1.815 2.805 1.305 3.495.99.105-.78.42-1.305.765-1.605-2.67-.3-5.46-1.335-5.46-5.925 0-1.305.465-2.385 1.23-3.225-.12-.3-.54-1.53.12-3.18 0 0 1.005-.315 3.3 1.23.96-.27 1.98-.405 3-.405s2.04.135 3 .405c2.295-1.56 3.3-1.23 3.3-1.23.66 1.65.24 2.88.12 3.18.765.84 1.23 1.905 1.23 3.225 0 4.605-2.805 5.625-5.475 5.925.435.375.81 1.095.81 2.22 0 1.605-.015 2.895-.015 3.3 0 .315.225.69.825.57A12.02 12.02 0 0024 12c0-6.63-5.37-12-12-12z' },
          { name: 'LinkedIn', href: 'https://www.linkedin.com/in/koushikgautham/', icon: 'M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 01-2.063-2.065 2.064 2.064 0 112.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z' },
          { name: 'Hexora', href: 'https://hexora.tech', icon: 'M21 16.5c0 .38-.21.71-.53.88l-7.9 4.44c-.16.12-.36.18-.57.18s-.41-.06-.57-.18l-7.9-4.44A.991.991 0 013 16.5v-9c0-.38.21-.71.53-.88l7.9-4.44c.16-.12.36-.18.57-.18s.41.06.57.18l7.9 4.44c.32.17.53.5.53.88v9z' },
        ].map((social) => (
          <motion.a
            key={social.name}
            href={social.href}
            target="_blank"
            rel="noopener noreferrer"
            className="w-10 h-10 flex items-center justify-center rounded-full border border-[var(--border)] bg-[var(--background)]/80 backdrop-blur-sm text-[var(--muted)] hover:text-[#ff6b00] hover:border-[#ff6b00] transition-colors"
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.95 }}
            aria-label={social.name}
          >
            <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
              <path d={social.icon} />
            </svg>
          </motion.a>
        ))}
      </motion.div>

      {/* Main Content */}
      <div className="hero-content relative z-10 w-full max-w-[1400px] mx-auto px-4 sm:px-6 md:px-8 lg:px-16">
        {/* Category Tags */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="flex flex-wrap items-center gap-2 sm:gap-4 mb-4 sm:mb-8"
        >
          <div className="w-2 h-2 sm:w-3 sm:h-3 bg-[#ff6b00]" />
          <span className="text-xs sm:text-sm font-medium tracking-wider text-[var(--muted)] uppercase">
            Full Stack Developer
          </span>
          <span className="text-xs sm:text-sm text-[var(--muted)]">•</span>
          <span className="text-xs sm:text-sm font-medium tracking-wider text-[var(--muted)] uppercase">
            Creative
          </span>
        </motion.div>

        {/* Giant Typography */}
        <h1
          ref={titleRef}
          className="mb-4 sm:mb-8"
          style={{ perspective: '1000px' }}
        >
          <div ref={line1Ref} className="overflow-hidden">
            <div className="flex">
              {line1.split('').map((char, i) => (
                <span
                  key={`l1-${i}`}
                  className="char inline-block text-[14vw] sm:text-[12vw] lg:text-[10vw] font-black tracking-tighter leading-[0.9] text-[var(--foreground)]"
                  style={{ transformOrigin: 'bottom' }}
                >
                  {char}
                </span>
              ))}
            </div>
          </div>
          <div ref={line2Ref} className="overflow-hidden">
            <div className="flex">
              {line2.split('').map((char, i) => (
                <span
                  key={`l2-${i}`}
                  className="char inline-block text-[14vw] sm:text-[12vw] lg:text-[10vw] font-black tracking-tighter leading-[0.9]"
                  style={{
                    transformOrigin: 'bottom',
                    WebkitTextStroke: '1px var(--foreground)',
                    WebkitTextFillColor: 'transparent',
                  }}
                >
                  {char}
                </span>
              ))}
            </div>
          </div>
        </h1>

        {/* Description and CTA Row */}
        <div className="flex flex-col gap-6 sm:gap-8 mt-6 sm:mt-12 lg:flex-row lg:items-end lg:justify-start">
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 1 }}
            className="text-base sm:text-lg lg:text-xl text-[var(--muted)] max-w-md leading-relaxed"
          >
            Crafting exceptional digital experiences — transforming creative ideas into
            powerful, scalable solutions.
          </motion.p>

          <motion.a
            href="#projects"
            onClick={(e) => {
              e.preventDefault();
              document.querySelector('#projects')?.scrollIntoView({ behavior: 'smooth' });
            }}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 1.2 }}
            className="inline-flex items-center justify-center sm:justify-start gap-3 px-6 sm:px-8 py-3 sm:py-4 bg-[#ff6b00] text-white font-medium text-sm uppercase tracking-wider hover:bg-[#e65f00] dark:hover:bg-[#ff8533] transition-colors group w-full sm:w-auto"
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
          >
            View Projects
            <svg
              className="w-4 h-4 transition-transform group-hover:translate-x-1"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
            </svg>
          </motion.a>
        </div>
      </div>

      {/* Scroll Indicator - Hidden on very small screens */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 2 }}
        className="absolute bottom-6 sm:bottom-10 left-1/2 -translate-x-1/2 hidden sm:block z-20"
      >
        <motion.div
          animate={{ y: [0, 8, 0] }}
          transition={{ duration: 1.5, repeat: Infinity }}
          className="flex flex-col items-center gap-2 text-[var(--muted)]"
        >
          <span className="text-xs uppercase tracking-widest">Scroll</span>
          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 14l-7 7m0 0l-7-7m7 7V3" />
          </svg>
        </motion.div>
      </motion.div>
    </section>
  );
}
