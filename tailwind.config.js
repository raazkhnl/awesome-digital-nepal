/** @type {import('tailwindcss').Config} */

/**
 * Tailwind configuration for Awesome Digital Nepal.
 *
 * The design language is "editorial atlas" — a sophisticated cream-on-ink
 * palette inspired by Nepali manuscript traditions, paired with a striking
 * crimson accent (Nepal's flag color, refined) and a deep indigo for
 * secondary structure. Saffron is used sparingly for highlights.
 *
 * All tokens are exposed as Tailwind theme colors AND as CSS variables in
 * `src/styles/index.css` so that components can switch between light/dark
 * mode without re-reading the JS config.
 */
export default {
  content: ['./index.html', './src/**/*.{js,jsx,ts,tsx}'],
  darkMode: 'class',
  theme: {
    extend: {
      colors: {
        // Light mode (default): warm cream parchment with deep ink
        parchment: '#F5F1E8',
        parchmentDeep: '#EDE5D2',
        ink: '#1A1A1A',
        inkSoft: '#3B3B3B',
        inkMuted: '#6B6B6B',
        // Accent palette — crimson (Nepal flag-inspired), refined
        crimson: {
          DEFAULT: '#B23A3A',
          dark: '#8E2A2A',
          light: '#D85F5F',
        },
        indigo: {
          DEFAULT: '#2B3A4F',
          dark: '#1B2735',
          light: '#48607E',
        },
        saffron: '#E8A33D',
        sage: '#7A8B6F',
        // Subtle dividers / borders
        rule: '#D9D0BC',
        ruleDark: '#3A3A3A',
        // Dark mode
        nightSky: '#0E1218',
        nightCard: '#161B23',
        nightInk: '#E8E4D8',
        nightInkSoft: '#B8B3A4',
        nightInkMuted: '#7A7568',
        nightRule: '#262C36',
      },
      fontFamily: {
        // Display: Fraunces — variable serif with personality
        display: ['Fraunces', 'Georgia', 'serif'],
        // Body: Newsreader — readable, sophisticated long-form serif
        body: ['Newsreader', 'Georgia', 'serif'],
        // Sans: Manrope — clean modern sans for UI chrome
        sans: ['Manrope', 'system-ui', '-apple-system', 'sans-serif'],
        // Mono: JetBrains Mono — for badges, code, metadata
        mono: ['"JetBrains Mono"', 'ui-monospace', 'monospace'],
      },
      letterSpacing: {
        tightest: '-0.04em',
        tighter: '-0.02em',
      },
      maxWidth: {
        content: '78rem',
      },
      keyframes: {
        fadeUp: {
          '0%': { opacity: '0', transform: 'translateY(10px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
        fadeIn: {
          '0%': { opacity: '0' },
          '100%': { opacity: '1' },
        },
        shimmer: {
          '0%': { backgroundPosition: '-200% 0' },
          '100%': { backgroundPosition: '200% 0' },
        },
      },
      animation: {
        'fade-up': 'fadeUp 0.6s cubic-bezier(0.16, 1, 0.3, 1) forwards',
        'fade-in': 'fadeIn 0.5s ease-out forwards',
        shimmer: 'shimmer 2s linear infinite',
      },
    },
  },
  plugins: [],
}
