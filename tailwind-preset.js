/**
 * Tailwind CSS v3 preset. Every value is a var() reference into tokens.css,
 * so import tokens.css once in the consuming app's global stylesheet.
 *
 * @type {import('tailwindcss').Config}
 */

const hsl = (name) => `hsl(var(--${name}) / <alpha-value>)`;

const pair = (name) => ({
  DEFAULT: hsl(name),
  foreground: hsl(`${name}-foreground`),
});

module.exports = {
  darkMode: ['class'],
  theme: {
    extend: {
      colors: {
        background: hsl('background'),
        foreground: hsl('foreground'),
        border: hsl('border'),
        input: hsl('input'),
        ring: hsl('ring'),
        primary: { ...pair('primary'), hover: hsl('primary-hover') },
        secondary: pair('secondary'),
        muted: pair('muted'),
        accent: pair('accent'),
        destructive: pair('destructive'),
        card: pair('card'),
        popover: pair('popover'),
        brand: {
          violet: hsl('brand-violet'),
          'violet-deep': hsl('brand-violet-deep'),
          ink: hsl('brand-ink'),
          'ink-raised': hsl('brand-ink-raised'),
          paper: hsl('brand-paper'),
          'night-start': hsl('brand-night-start'),
          'night-end': hsl('brand-night-end'),
          'wave-back': hsl('brand-wave-back'),
          'wave-front': hsl('brand-wave-front'),
        },
      },
      fontFamily: {
        sans: 'var(--font-sans)',
        heading: 'var(--font-heading)',
      },
      fontSize: {
        display: ['var(--text-display)', { lineHeight: 'var(--leading-tight)' }],
        h1: ['var(--text-h1)', { lineHeight: '2.5rem' }],
        h2: ['var(--text-h2)', { lineHeight: '2.5rem' }],
        h3: ['var(--text-h3)', { lineHeight: '1.75rem' }],
        lead: ['var(--text-lead)', { lineHeight: '2rem' }],
        body: ['var(--text-body)', { lineHeight: 'var(--leading-body)' }],
        label: ['var(--text-label)', { lineHeight: '1.25rem' }],
      },
      letterSpacing: {
        button: 'var(--tracking-button)',
        nav: 'var(--tracking-nav)',
      },
      maxWidth: {
        'container-wide': 'var(--container-wide)',
        'container-medium': 'var(--container-medium)',
        'container-prose': 'var(--container-prose)',
        'container-narrow': 'var(--container-narrow)',
      },
      spacing: {
        gutter: 'var(--gutter)',
        'section-sm': 'var(--section-y-sm)',
        section: 'var(--section-y)',
        'section-lg': 'var(--section-y-lg)',
        'accent-bar-w': 'var(--accent-bar-width)',
        'accent-bar-h': 'var(--accent-bar-height)',
      },
      borderRadius: {
        lg: 'var(--radius)',
        md: 'calc(var(--radius) - 2px)',
        sm: 'calc(var(--radius) - 4px)',
        pill: 'var(--radius-pill)',
      },
      boxShadow: {
        raised: 'var(--shadow-raised)',
      },
      backdropBlur: {
        header: 'var(--blur-header)',
      },
      transitionDuration: {
        fast: 'var(--duration-fast)',
      },
      transitionTimingFunction: {
        standard: 'var(--ease-standard)',
      },
      scale: {
        hover: 'var(--scale-hover)',
        'hover-logo': 'var(--scale-hover-logo)',
      },
      backgroundImage: {
        night: 'linear-gradient(135deg, hsl(var(--brand-night-start)) 0%, hsl(var(--brand-night-end)) 100%)',
      },
    },
  },
};
