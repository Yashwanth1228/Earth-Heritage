/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './app/**/*.{js,jsx}',
    './components/**/*.{js,jsx}',
    './data/**/*.{js,jsx}',
    './lib/**/*.{js,jsx}'
  ],
  theme: {
    container: {
      center: true,
      padding: {
        DEFAULT: '1.25rem', // 20px
        sm: '1.5rem',       // 24px
        md: '2rem',         // 32px
        lg: '2.5rem',       // 40px
        xl: '3rem',         // 48px
        '2xl': '3.5rem'     // 56px
      }
    },
    extend: {
      fontFamily: {
        sans: ['var(--font-sans)', 'Inter', 'system-ui', '-apple-system', 'BlinkMacSystemFont', 'Segoe UI', 'Roboto', 'sans-serif'],
        serif: ['var(--font-serif)', 'Fraunces', 'Georgia', 'Cambria', 'serif'],
        display: ['var(--font-display)', 'var(--font-serif)', 'Fraunces', 'Georgia', 'serif'],
        montserrat: ['var(--font-montserrat)', 'Montserrat', 'system-ui', 'sans-serif'],
        farmhouse: ['Farmhouse', 'sans-serif'],
        script: ['GlitterySnowfall', 'cursive', 'sans-serif']
      },
      colors: {
        // Semantic Earth Heritage Brand Tokens (Derived from Logo)
        brand: {
          primary: 'var(--color-brand-primary)',
          'primary-hover': 'var(--color-brand-primary-hover)',
          secondary: 'var(--color-brand-secondary)',
          light: 'var(--color-brand-light)',
          deep: 'var(--color-brand-deep)'
        },
        accent: 'var(--color-accent)',
        // Semantic Surfaces & Backgrounds
        background: {
          DEFAULT: 'var(--color-background)',
          secondary: 'var(--color-background-secondary)',
          biscuit: 'var(--color-background-biscuit)',
          'biscuit-light': 'var(--color-background-biscuit-light)',
          'biscuit-deep': 'var(--color-background-biscuit-deep)',
          ivory: 'var(--color-background-ivory)',
          sage: 'var(--color-background-sage)',
          cream: 'var(--color-background-cream)'
        },
        surface: {
          DEFAULT: 'var(--color-surface)',
          warm: 'var(--color-surface-warm)',
          elevated: 'var(--color-surface-elevated)',
          subtle: 'var(--color-surface-subtle)',
          dark: 'var(--color-surface-dark)',
          'dark-elevated': 'var(--color-surface-dark-elevated)',
          overlay: 'var(--color-surface-overlay)'
        },
        // Semantic Text & Content
        text: {
          primary: 'var(--color-text-primary)',
          secondary: 'var(--color-text-secondary)',
          muted: 'var(--color-text-muted)',
          inverse: 'var(--color-text-inverse)',
          'inverse-secondary': 'var(--color-text-inverse-secondary)'
        },
        // Semantic Borders
        border: {
          DEFAULT: 'var(--color-border)',
          subtle: 'var(--color-border-subtle)',
          strong: 'var(--color-border-strong)',
          dark: 'var(--color-border-dark)'
        },
        // Status
        success: 'var(--color-success)',
        warning: 'var(--color-warning)',
        error: 'var(--color-error)'
      },
      maxWidth: {
        prose: '68ch',
        'content-narrow': 'var(--container-narrow)',
        'content-default': 'var(--container-default)',
        'content-wide': 'var(--container-wide)'
      },
      letterSpacing: {
        tighter: '-0.035em',
        tight: '-0.02em',
        normal: '0em',
        wide: '0.025em',
        wider: '0.06em',
        widest: '0.12em'
      },
      lineHeight: {
        display: '1.08',
        heading: '1.18',
        snug: '1.35',
        relaxed: '1.68'
      },
      borderRadius: {
        sm: '4px',
        DEFAULT: '6px',
        md: '8px',
        lg: '12px',
        xl: '16px'
      },
      boxShadow: {
        subtle: '0 1px 2px 0 rgba(0, 0, 0, 0.03)',
        card: '0 4px 16px -2px rgba(17, 22, 19, 0.04), 0 2px 6px -1px rgba(17, 22, 19, 0.02)',
        'card-hover': '0 12px 28px -4px rgba(17, 22, 19, 0.08), 0 4px 10px -2px rgba(17, 22, 19, 0.04)',
        elevation: '0 20px 40px -8px rgba(17, 22, 19, 0.12)'
      },
      transitionTimingFunction: {
        'corporate-smooth': 'cubic-bezier(0.16, 1, 0.3, 1)'
      }
    }
  },
  plugins: []
};
