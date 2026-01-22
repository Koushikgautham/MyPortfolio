# Portfolio Project Context

## Overview

A modern, animated portfolio website inspired by award-winning agency sites like ChainGPT Labs. Features bold typography, smooth GSAP animations, and a clean black/white/orange aesthetic.

---

## Tech Stack

### Core Framework
- **Next.js 16.1.4** - React framework with App Router
- **React 19.2.3** - UI library
- **TypeScript 5** - Type safety

### Styling
- **Tailwind CSS 4** - Utility-first CSS framework
- **CSS Variables** - Custom theming system
- **PostCSS** - CSS processing

### Animation Libraries
- **Framer Motion 12.27.5** - React animation library for UI interactions
- **GSAP 3.14.2** - Professional-grade animations (text reveals, parallax)
- **GSAP ScrollTrigger** - Scroll-based animations
- **Lenis 1.3.17** - Smooth scrolling (configured, not yet initialized)

### 3D / Visual Effects
- **Three.js** - 3D graphics library
- **postprocessing** - Post-processing effects for Three.js
- **PixelBlast** - Interactive pixel pattern background effect (shadcn registry)

### Development
- **ESLint 9** - Code linting
- **Geist Font** - Typography (Sans + Mono variants)

---

## Design System

### Color Palette

```css
/* Light Mode (default) */
:root {
  --background: #ffffff;      /* Pure white */
  --foreground: #0a0a0a;      /* Near black */
  --accent: #ff6b00;          /* Orange - primary brand color */
  --accent-hover: #e65f00;    /* Darker orange for hover states */
  --muted: #737373;           /* Gray for secondary text */
  --border: #e5e5e5;          /* Light gray for borders */
  --card-bg: #fafafa;         /* Slightly off-white for cards */
}

/* Dark Mode */
.dark {
  --background: #0a0a0a;      /* Near black */
  --foreground: #fafafa;      /* Off white */
  --accent: #ff6b00;          /* Orange - stays the same */
  --accent-hover: #ff8533;    /* Lighter orange for dark mode */
  --muted: #a3a3a3;           /* Lighter gray for readability */
  --border: #262626;          /* Dark gray for borders */
  --card-bg: #171717;         /* Slightly lighter than background */
}
```

### Orange Accent Color Strategy
The orange accent color (`#ff6b00`) is **hardcoded** in components rather than using CSS variables to ensure it remains consistent across both light and dark modes. This prevents any potential issues with CSS variable resolution in different theme contexts.

**Where orange is used:**
- Logo box background
- CTA buttons (View Projects, Get In Touch)
- Decorative squares
- Hover states on social icons
- Animated underlines
- Text selection highlight
- PixelBlast background effect

### Typography Scale

| Element | Mobile | Tablet | Desktop |
|---------|--------|--------|---------|
| Hero Title | 14vw | 12vw | 10vw |
| Section Title | 2.25rem | 3.75rem | 4.5rem |
| Body Large | 1rem | 1.125rem | 1.25rem |
| Body | 0.875rem | 1rem | 1rem |
| Caption | 0.625rem | 0.75rem | 0.75rem |

### Font Weights
- **Black (900)** - Hero headlines
- **Bold (700)** - Section titles, nav items
- **Medium (500)** - Buttons, labels
- **Regular (400)** - Body text

### Spacing System
Uses Tailwind's default spacing scale with custom section padding:
- Mobile: `4rem 1rem`
- SM (640px): `5rem 1.5rem`
- MD (768px): `6rem 2rem`
- LG (1024px): `8rem 4rem`

---

## Interaction Styles

### Hover Effects
- **Buttons**: Scale 1.02-1.05 with color transition
- **Links**: Animated underline (accent color, left-to-right)
- **Cards**: translateY(-8px) + box-shadow
- **Social Icons**: Scale 1.1 + color change to accent

### Animations

#### Page Load Sequence
1. Navbar slides down (0.6s delay)
2. Category tags fade up (0.2s delay)
3. Hero line 1 characters animate (0.3s delay, 0.03s stagger)
4. Hero line 2 characters animate (0.6s delay, 0.03s stagger)
5. Orange squares pop in (0.8s, 1.0s, 1.2s delays)
6. Description fades up (1.0s delay)
7. CTA button fades up (1.2s delay)
8. Side labels fade in (1.2s delay)
9. Social links fade in (1.4s delay)
10. Scroll indicator fades in (2.0s delay)

#### Character Animation (GSAP)
```javascript
{
  opacity: 0 → 1,
  y: 80 → 0,
  rotateX: -90 → 0,
  stagger: 0.03,
  duration: 1,
  ease: 'power4.out'
}
```

#### Scroll Effects
- Hero content: Parallax fade out (y: 150, opacity: 0)
- Marquee: Continuous horizontal scroll (30s linear infinite)

### Micro-interactions
- Button shine effect on hover (gradient sweep)
- Hamburger → X transformation
- Scroll indicator bounce animation
- PixelBlast ripple effects on click (interactive background)
- Theme toggle sun/moon animation
- **Circular theme transition** - Theme change expands from toggle button

### Theme Transition Animation
Uses the View Transitions API for a smooth circular reveal effect:
```css
/* The new theme expands from the toggle button in a circle */
::view-transition-new(root) {
  animation: theme-transition-reveal 0.7s cubic-bezier(0.4, 0, 0.2, 1);
}

@keyframes theme-transition-reveal {
  from {
    clip-path: circle(0px at var(--theme-transition-x) var(--theme-transition-y));
  }
  to {
    clip-path: circle(var(--theme-transition-radius) at var(--theme-transition-x) var(--theme-transition-y));
  }
}
```
- Origin point: Center of the theme toggle button
- Duration: 0.7s with ease-out curve
- Falls back to instant transition in unsupported browsers

### PixelBlast Configuration (Hero Background)
```typescript
{
  variant: "circle",
  pixelSize: 5,
  color: "#ff6b00",        // Orange accent color
  patternScale: 2.5,
  patternDensity: 0.85,    // Higher density for better visibility in light mode
  enableRipples: true,
  rippleIntensityScale: 1.5,
  rippleThickness: 0.12,
  rippleSpeed: 0.35,
  speed: 0.25,
  edgeFade: 0.15,          // Reduced edge fade for more coverage
  transparent: true
}
```

---

## Component Architecture

```
components/
├── Navbar.tsx          # Fixed navigation with mobile menu + theme toggle
├── Hero.tsx            # Landing section with animations + PixelBlast
├── LogoMarquee.tsx     # Tech stack scrolling banner
├── ThemeToggle.tsx     # ✅ Dark/light mode toggle button
├── PixelBlast.tsx      # ✅ Three.js interactive pixel background effect
├── About.tsx           # (Planned) Bio section
├── Projects.tsx        # (Planned) Portfolio grid
├── Skills.tsx          # (Planned) Skills visualization
├── Experience.tsx      # (Planned) Timeline/cards
├── Contact.tsx         # (Planned) Contact form
└── Footer.tsx          # (Planned) Site footer

context/
└── ThemeContext.tsx    # ✅ Theme provider with localStorage persistence

lib/
└── utils.ts            # ✅ Utility functions (cn helper from shadcn)
```

---

## Current File Structure

```
portfolio/
├── app/
│   ├── layout.tsx      # Root layout, fonts, metadata, ThemeProvider
│   ├── page.tsx        # Home page composition
│   └── globals.css     # Global styles, CSS variables, dark mode
├── components/
│   ├── Hero.tsx        # ✅ Complete (dark mode support)
│   ├── Navbar.tsx      # ✅ Complete (includes ThemeToggle)
│   ├── LogoMarquee.tsx # ✅ Complete (dark mode support)
│   └── ThemeToggle.tsx # ✅ Complete
├── context/
│   └── ThemeContext.tsx # ✅ Theme state management
├── hooks/              # (Empty - for custom hooks)
├── public/
│   └── images/         # (Empty - for portfolio assets)
├── package.json
├── tsconfig.json
├── next.config.ts
├── postcss.config.mjs
└── eslint.config.mjs
```

---

## Responsive Breakpoints

| Breakpoint | Width | Target |
|------------|-------|--------|
| Default | 0-639px | Mobile phones |
| sm | 640px+ | Large phones |
| md | 768px+ | Tablets |
| lg | 1024px+ | Laptops |
| xl | 1280px+ | Desktops |
| 2xl | 1536px+ | Large screens |

### Mobile-First Approach
- Base styles target mobile
- Progressive enhancement for larger screens
- Touch targets minimum 44px on mobile
- Horizontal social links on mobile, vertical on desktop
- Side labels hidden below lg breakpoint

---

## Future Additions

### Planned Components

#### About Section
- Split layout: Image left, text right
- Animated stats/counters
- Download resume button
- Personal story with highlighted keywords

#### Projects Section
- Filterable grid (All, Web, Mobile, Design)
- Project cards with hover preview
- Modal or page for detailed case studies
- Tech stack badges per project
- Live demo + GitHub links

#### Skills Section
- Categorized skill groups (Frontend, Backend, Tools)
- Visual progress bars or radar chart
- Animated on scroll into view
- Icons for each technology

#### Experience Section
- Vertical timeline design
- Company logos
- Expandable job descriptions
- Duration badges

#### Contact Section
- Contact form with validation
- Email, LinkedIn, GitHub links
- Location map (optional)
- "Available for work" indicator

#### Footer
- Quick navigation links
- Social media icons
- Copyright notice
- Back to top button

### Enhancements

#### Performance
- [ ] Image optimization with next/image
- [ ] Lazy loading for below-fold sections
- [ ] Font subsetting
- [ ] Bundle analysis and optimization

#### Accessibility
- [ ] Skip to content link
- [ ] ARIA labels on all interactive elements
- [ ] Keyboard navigation support
- [ ] Reduced motion media query support
- [ ] Screen reader testing

#### SEO
- [ ] Open Graph meta tags
- [ ] Twitter card meta tags
- [ ] Structured data (JSON-LD)
- [ ] Sitemap generation
- [ ] robots.txt

#### Features
- [x] Dark mode toggle
- [ ] Smooth scroll with Lenis initialization
- [ ] Page transitions
- [ ] Loading state/skeleton
- [ ] 404 page design
- [ ] Blog section (optional)
- [ ] Internationalization (optional)

#### Analytics
- [ ] Google Analytics / Plausible
- [ ] Event tracking for CTA clicks
- [ ] Scroll depth tracking

---

## Design Inspiration

### Primary Reference
- **ChainGPT Labs** - Bold typography, orange accent, clean layout, partner marquee

### Style Elements Borrowed
- Giant viewport-width typography
- Outline text effect (stroke, no fill)
- Vertical side labels
- Small decorative squares
- Partner/tech logo marquee
- Minimal use of color (black, white, one accent)
- Geometric shapes and 3D elements

### Additional Inspiration Sources
- Awwwards portfolio sites
- Dribbble developer portfolios
- Linear.app (clean UI)
- Stripe (typography and spacing)

---

## Content Placeholders

### To Personalize
- Hero: "BUILDING DIGITAL" → Your name or brand
- Category tags: "Full Stack Developer • Creative"
- Description text
- Social media URLs (GitHub, LinkedIn, Twitter)
- Navbar logo letter "K" → Your initial
- Technologies in marquee
- Year in side label

### Content Needed
- Professional headshot
- Project screenshots/mockups
- Resume PDF
- Case study content
- Work experience details
- Testimonials (optional)

---

## Development Commands

```bash
# Development
npm run dev          # Start dev server at localhost:3000

# Build
npm run build        # Production build
npm run start        # Start production server

# Linting
npm run lint         # Run ESLint
```

---

## Deployment

### Recommended Platforms
- **Vercel** (recommended for Next.js)
- Netlify
- AWS Amplify

### Environment Variables
None required currently. Add as needed for:
- Contact form API endpoint
- Analytics IDs
- CMS API keys

---

## Notes

### Animation Performance
- GSAP animations use `will-change` automatically
- Framer Motion uses hardware acceleration
- Consider `transform` and `opacity` only for 60fps
- Test on low-end devices

### Browser Support
- Modern browsers (Chrome, Firefox, Safari, Edge)
- CSS variables require IE11+ polyfill if needed
- Backdrop-filter may need fallback for older browsers

### Known Considerations
- Outline text (`-webkit-text-stroke`) has limited browser support
- 3D transforms may cause rendering issues on some mobile devices
- Large viewport units (vw) should be tested across screen sizes
