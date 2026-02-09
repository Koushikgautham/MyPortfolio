'use client';

import { createContext, useContext, useEffect, useState, useCallback } from 'react';

type Theme = 'light' | 'dark';

interface TransitionState {
  active: boolean;
  x: number;
  y: number;
  targetTheme: Theme;
}

interface ThemeContextType {
  theme: Theme;
  toggleTheme: (x?: number, y?: number) => void;
  isTransitioning: boolean;
  transition: TransitionState | null;
  completeTransition: () => void;
}

const ThemeContext = createContext<ThemeContextType | undefined>(undefined);

// Check if View Transitions API is supported
const supportsViewTransitions = () => {
  return typeof document !== 'undefined' && 'startViewTransition' in document;
};

export function ThemeProvider({ children }: { children: React.ReactNode }) {
  const [theme, setTheme] = useState<Theme>('dark');
  const [mounted, setMounted] = useState(false);
  const [isTransitioning, setIsTransitioning] = useState(false);
  const [transition, setTransition] = useState<TransitionState | null>(null);

  // Load theme from localStorage on mount - dark is default
  useEffect(() => {
    setMounted(true);
    const savedTheme = localStorage.getItem('theme') as Theme | null;
    const prefersLight = window.matchMedia('(prefers-color-scheme: light)').matches;

    if (savedTheme) {
      setTheme(savedTheme);
      if (savedTheme === 'dark') {
        document.documentElement.classList.add('dark');
      } else {
        document.documentElement.classList.remove('dark');
      }
    } else if (prefersLight) {
      setTheme('light');
      document.documentElement.classList.remove('dark');
    } else {
      // Default to dark
      setTheme('dark');
      document.documentElement.classList.add('dark');
    }
  }, []);

  const applyTheme = useCallback((newTheme: Theme) => {
    const root = document.documentElement;
    if (newTheme === 'dark') {
      root.classList.add('dark');
    } else {
      root.classList.remove('dark');
    }
    localStorage.setItem('theme', newTheme);
    setTheme(newTheme);
  }, []);

  const completeTransition = useCallback(() => {
    setTransition(null);
    setIsTransitioning(false);
    // Clean up transition direction class
    document.documentElement.classList.remove('theme-transition-to-dark', 'theme-transition-to-light');
  }, []);

  const toggleTheme = useCallback((x?: number, y?: number) => {
    const newTheme = theme === 'light' ? 'dark' : 'light';
    const root = document.documentElement;

    // If no coordinates provided, just toggle without animation
    if (x === undefined || y === undefined) {
      applyTheme(newTheme);
      return;
    }

    // Calculate the maximum radius needed to cover the entire screen
    const maxRadius = Math.hypot(
      Math.max(x, window.innerWidth - x),
      Math.max(y, window.innerHeight - y)
    );

    // Add class to indicate transition direction (for CSS z-index control)
    root.classList.remove('theme-transition-to-dark', 'theme-transition-to-light');
    root.classList.add(newTheme === 'dark' ? 'theme-transition-to-dark' : 'theme-transition-to-light');

    // Check if View Transitions API is supported
    if (supportsViewTransitions()) {
      setIsTransitioning(true);

      // Inject dynamic keyframes with exact pixel coordinates
      // This avoids both CSS custom property inheritance issues and
      // Web Animations API pseudoElement compatibility issues on mobile
      const styleId = 'theme-transition-keyframes';
      let styleEl = document.getElementById(styleId) as HTMLStyleElement | null;
      if (!styleEl) {
        styleEl = document.createElement('style');
        styleEl.id = styleId;
        document.head.appendChild(styleEl);
      }
      styleEl.textContent = `
        @keyframes theme-circle-expand {
          from { clip-path: circle(0px at ${x}px ${y}px); }
          to { clip-path: circle(${maxRadius}px at ${x}px ${y}px); }
        }
        @keyframes theme-circle-shrink {
          from { clip-path: circle(${maxRadius}px at ${x}px ${y}px); }
          to { clip-path: circle(0px at ${x}px ${y}px); }
        }
      `;

      // Use View Transitions API
      const doc = document as Document & {
        startViewTransition: (callback: () => void) => {
          finished: Promise<void>;
          ready: Promise<void>;
        }
      };

      const viewTransition = doc.startViewTransition(() => {
        applyTheme(newTheme);
      });

      viewTransition.finished.then(() => {
        setIsTransitioning(false);
        root.classList.remove('theme-transition-to-dark', 'theme-transition-to-light');
        // Clean up dynamic keyframes
        const el = document.getElementById(styleId);
        if (el) el.remove();
      }).catch(() => {
        setIsTransitioning(false);
        root.classList.remove('theme-transition-to-dark', 'theme-transition-to-light');
        const el = document.getElementById(styleId);
        if (el) el.remove();
      });
    } else {
      // Fallback: Use manual overlay animation
      setIsTransitioning(true);
      setTransition({
        active: true,
        x,
        y,
        targetTheme: newTheme,
      });

      // Apply theme after a small delay to let the overlay start expanding
      setTimeout(() => {
        applyTheme(newTheme);
      }, 50);
    }
  }, [theme, applyTheme]);

  // Prevent flash of wrong theme
  if (!mounted) {
    return null;
  }

  return (
    <ThemeContext.Provider value={{ theme, toggleTheme, isTransitioning, transition, completeTransition }}>
      {children}
      {/* Fallback transition overlay for browsers without View Transitions API */}
      {transition && (
        <FallbackTransition
          x={transition.x}
          y={transition.y}
          targetTheme={transition.targetTheme}
          onComplete={completeTransition}
        />
      )}
    </ThemeContext.Provider>
  );
}

// Fallback transition component for browsers without View Transitions API
function FallbackTransition({
  x,
  y,
  targetTheme,
  onComplete,
}: {
  x: number;
  y: number;
  targetTheme: Theme;
  onComplete: () => void;
}) {
  const [scale, setScale] = useState(() => {
    // For dark-to-light, start expanded and shrink
    if (targetTheme === 'light') {
      const maxRadius = Math.hypot(
        Math.max(x, window.innerWidth - x),
        Math.max(y, window.innerHeight - y)
      );
      return maxRadius * 2.5;
    }
    return 0;
  });

  useEffect(() => {
    // Calculate the maximum radius needed to cover the entire screen
    const maxRadius = Math.hypot(
      Math.max(x, window.innerWidth - x),
      Math.max(y, window.innerHeight - y)
    );

    // Start the animation on next frame
    requestAnimationFrame(() => {
      if (targetTheme === 'dark') {
        // Light to dark: expand dark circle
        setScale(maxRadius * 2.5);
      } else {
        // Dark to light: shrink dark circle to reveal light
        setScale(0);
      }
    });

    // Complete after animation
    const timer = setTimeout(() => {
      onComplete();
    }, 750);

    return () => clearTimeout(timer);
  }, [x, y, targetTheme, onComplete]);

  // For dark-to-light, we show a dark overlay that shrinks
  // For light-to-dark, we show a dark overlay that expands
  const overlayColor = targetTheme === 'dark' ? '#0a0a0a' : '#0a0a0a';

  return (
    <div
      className="fixed inset-0 pointer-events-none"
      style={{ zIndex: 99999 }}
    >
      <div
        style={{
          position: 'absolute',
          left: x,
          top: y,
          width: '2px',
          height: '2px',
          borderRadius: '50%',
          backgroundColor: overlayColor,
          transform: `translate(-50%, -50%) scale(${scale})`,
          transition: 'transform 0.7s cubic-bezier(0.4, 0, 0.2, 1)',
        }}
      />
    </div>
  );
}

export function useTheme() {
  const context = useContext(ThemeContext);
  if (context === undefined) {
    throw new Error('useTheme must be used within a ThemeProvider');
  }
  return context;
}
