'use client';

import { useRef } from 'react';
import { motion } from 'framer-motion';
import { useTheme } from '@/context/ThemeContext';

/**
 * On mobile browsers, the View Transition snapshot uses the "large viewport"
 * coordinate system (as if the toolbar were fully retracted), but
 * getBoundingClientRect() returns coordinates relative to the visual viewport.
 * The difference is the toolbar height — we need to add it to Y so the
 * animation circle originates from the button's visual position.
 */
function getMobileToolbarOffset(): number {
  if (typeof document === 'undefined') return 0;
  // 100vh on mobile = large viewport height (includes area behind toolbar)
  // window.innerHeight = current visual viewport height
  const probe = document.createElement('div');
  probe.style.cssText = 'position:fixed;top:0;left:0;height:100vh;width:0;pointer-events:none;visibility:hidden';
  document.body.appendChild(probe);
  const largeVH = probe.getBoundingClientRect().height;
  document.body.removeChild(probe);
  return Math.max(0, largeVH - window.innerHeight);
}

export default function ThemeToggle() {
  const { theme, toggleTheme } = useTheme();
  const buttonRef = useRef<HTMLButtonElement>(null);

  const handleClick = (e: React.MouseEvent<HTMLButtonElement>) => {
    const button = buttonRef.current;
    // Offset for mobile browser toolbar (address bar)
    const toolbarOffset = getMobileToolbarOffset();

    if (button) {
      const rect = button.getBoundingClientRect();
      const x = rect.left + rect.width / 2;
      const y = rect.top + rect.height / 2 + toolbarOffset;
      toggleTheme(x, y);
    } else {
      toggleTheme(e.clientX, e.clientY + toolbarOffset);
    }
  };

  return (
    <div style={{ width: 40, height: 40, flexShrink: 0 }}>
      <motion.button
        ref={buttonRef}
        onClick={handleClick}
        className="relative w-full h-full flex items-center justify-center rounded-full border border-[var(--border)] bg-[var(--background)] text-[var(--foreground)] hover:border-[#ff6b00] transition-colors"
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        aria-label={`Switch to ${theme === 'light' ? 'dark' : 'light'} mode`}
      >
      {/* Sun Icon */}
      <motion.svg
        className="absolute w-5 h-5"
        fill="none"
        stroke="currentColor"
        viewBox="0 0 24 24"
        initial={false}
        animate={{
          scale: theme === 'light' ? 1 : 0,
          rotate: theme === 'light' ? 0 : 90,
          opacity: theme === 'light' ? 1 : 0,
        }}
        transition={{ duration: 0.2 }}
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth={2}
          d="M12 3v1m0 16v1m9-9h-1M4 12H3m15.364 6.364l-.707-.707M6.343 6.343l-.707-.707m12.728 0l-.707.707M6.343 17.657l-.707.707M16 12a4 4 0 11-8 0 4 4 0 018 0z"
        />
      </motion.svg>

      {/* Moon Icon */}
      <motion.svg
        className="absolute w-5 h-5"
        fill="none"
        stroke="currentColor"
        viewBox="0 0 24 24"
        initial={false}
        animate={{
          scale: theme === 'dark' ? 1 : 0,
          rotate: theme === 'dark' ? 0 : -90,
          opacity: theme === 'dark' ? 1 : 0,
        }}
        transition={{ duration: 0.2 }}
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth={2}
          d="M20.354 15.354A9 9 0 018.646 3.646 9.003 9.003 0 0012 21a9.003 9.003 0 008.354-5.646z"
        />
      </motion.svg>
      </motion.button>
    </div>
  );
}
