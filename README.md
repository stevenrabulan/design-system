# Steven Rabulan Design System

Design tokens and a Tailwind CSS v3 preset for stevenrabulan.com and related projects. v0.1 is tokens only. Components come later, after refinement in Claude Design.

Every value was pulled from the live site (`stevenrabulan` repo, June 2026). Nothing has been redesigned yet.

## What's in the box

| File | Purpose |
| --- | --- |
| `tokens.css` | Source of truth. CSS custom properties for color, type, layout, shape, elevation, motion |
| `tailwind-preset.js` | Tailwind v3 preset that maps utilities to the tokens. Holds no values of its own |
| `fonts.css` | Google Fonts import for Figtree and Libre Franklin. Skip it if you use `next/font` |
| `previews/` | HTML token cards for the Claude Design system pane. Not shipped to consumers |
| `scripts/check-tokens.mjs` | `npm test`. Fails if the preset uses an undefined token or the themes drift apart |

## Usage

Install from git (no npm publish needed):

```bash
npm install github:stevenrabulan/design-system#v0.1.0
```

Global stylesheet:

```css
@import "@stevenrabulan/design-system/fonts.css";
@import "@stevenrabulan/design-system/tokens.css";

@tailwind base;
@tailwind components;
@tailwind utilities;
```

`tailwind.config.ts`:

```ts
import type { Config } from 'tailwindcss';
import preset from '@stevenrabulan/design-system/tailwind-preset';

const config: Config = {
  presets: [preset],
  content: ['./app/**/*.{ts,tsx}', './components/**/*.{ts,tsx}'],
};

export default config;
```

### Themes

Semantic colors follow the shadcn/ui names, so shadcn components and the SaaS-Boilerplate projects work without renaming anything.

- `:root` and `.light` are the light theme. `.dark` is the dark theme.
- Either class works on any element, not just `<html>`. The homepage is mostly dark with one light section, so it would be `<html class="dark">` with `<section class="light bg-background">`.
- `brand-*` colors never change with the theme. Use them for fixed brand surfaces like the night gradient.

## Token reference

### Color

| Token | Light | Dark | Used for |
| --- | --- | --- | --- |
| `background` | `#f8f8f8` | `#1e1e2f` | Page and section fill |
| `foreground` | `#111827` | `#ffffff` | Headings, primary text |
| `card`, `popover` | `#ffffff` | `#2d2d44` | Raised surfaces |
| `primary` | `#4b2de2` | `#4b2de2` | CTA buttons, links, accent bar |
| `primary-hover` | `#3d24bf` | `#3d24bf` | CTA hover |
| `secondary` | `#f3f4f6` | `#2d2d44` | Secondary buttons |
| `muted` | `#f3f4f6` | `#2d2d44` | Table headers, quiet fills |
| `muted-foreground` | `#4b5563` | `#9ca3af` | Body copy, subheads, footer links |
| `accent` | `#f3f4f6` | `#2d2d44` | Hover fills (shadcn slot) |
| `destructive` | `#dc2626` | `#dc2626` | Not used on the site yet. Tailwind red-600 |
| `border`, `input` | `#d1d5db` | `#292939` / `#2d2d44` | Dividers, table rules, header bottom edge |
| `ring` | `#4b2de2` | `#4b2de2` | Focus ring |

Brand palette: `brand-violet`, `brand-violet-deep`, `brand-ink`, `brand-ink-raised`, `brand-paper`, `brand-night-start` (`#1a1a3e`), `brand-night-end` (`#0f0f23`), `brand-wave-back` (`#2d2d5a`), `brand-wave-front` (`#3d3d6a`). Utility: `bg-night` for the CTA gradient.

### Contrast (WCAG)

| Pair | Ratio | Result |
| --- | --- | --- |
| White on `primary` | 7.57:1 | AAA |
| `muted-foreground` on light `background` | 7.12:1 | AAA |
| `muted-foreground` on dark `background` | 6.45:1 | AA |
| `primary` on light `background` | 7.13:1 | AAA |
| `primary` on dark `background` | 2.16:1 | **Fails.** Use primary only as a fill on dark |

### Type

| Token | Tailwind | Value | Role |
| --- | --- | --- | --- |
| `--font-heading` | `font-heading` | Libre Franklin | Headings, buttons, logo |
| `--font-sans` | `font-sans` | Figtree | Body |
| `--text-display` | `text-display` | 3.75rem | Hero h1 (lg). 3rem md, 2.25rem mobile |
| `--text-h1` | `text-h1` | 2.25rem | Page titles |
| `--text-h2` | `text-h2` | 2.25rem | Section titles (md). 1.875rem mobile |
| `--text-h3` | `text-h3` | 1.25rem | Item titles |
| `--text-lead` | `text-lead` | 1.5rem | Hero subhead (md). 1.25rem mobile |
| `--text-body` | `text-body` | 1rem / 1.625 | Paragraphs |
| `--text-label` | `text-label` | 0.875rem | Compact buttons, footer nav |
| `--tracking-button` | `tracking-button` | 0.025em | Uppercase buttons |
| `--tracking-nav` | `tracking-nav` | 0.05em | Uppercase footer nav |

Responsive steps are applied with Tailwind breakpoints for now (for example `text-4xl md:text-5xl lg:text-display`).

### Layout, shape, motion

| Token | Tailwind | Value |
| --- | --- | --- |
| `--container-wide` | `max-w-container-wide` | 72rem |
| `--container-medium` | `max-w-container-medium` | 56rem |
| `--container-prose` | `max-w-container-prose` | 48rem |
| `--container-narrow` | `max-w-container-narrow` | 28rem |
| `--gutter` | `px-gutter` | 1.5rem |
| `--section-y-sm` / `--section-y` / `--section-y-lg` | `py-section-sm` / `py-section` / `py-section-lg` | 4 / 5 / 6rem |
| `--radius` | `rounded-lg` (`md`, `sm` derive from it) | 0.5rem |
| `--radius-pill` | `rounded-pill` | 9999px |
| `--accent-bar-width` x `--accent-bar-height` | `w-accent-bar-w h-accent-bar-h` | 3rem x 0.25rem |
| `--shadow-raised` | `shadow-raised` | Tailwind `shadow-lg` |
| `--blur-header` | `backdrop-blur-header` | 4px |
| `--duration-fast` | `duration-fast` | 150ms |
| `--ease-standard` | `ease-standard` | cubic-bezier(0.4, 0, 0.2, 1) |
| `--scale-hover` / `--scale-hover-logo` | `hover:scale-hover` / `hover:scale-hover-logo` | 1.02 / 1.05 |

## Migrating stevenrabulan.com

| Current class | Replace with |
| --- | --- |
| `bg-dark` | `bg-background` inside `.dark` |
| `bg-dark-lighter` | `bg-secondary` inside `.dark` |
| `bg-light` | `bg-background` inside `.light` |
| `bg-primary hover:bg-primary-hover` | Same classes, now token backed |
| `text-gray-400` (on dark) | `text-muted-foreground` |
| `text-gray-600`, `text-gray-700` (on light) | `text-muted-foreground` |
| `text-gray-900`, `text-white` | `text-foreground` |
| `border-gray-300`, `border-white/5` | `border-border` |
| `bg-gray-100` | `bg-muted` |
| `.wave-bg` gradient | `bg-night` (keep the wave pseudo-elements, but switch their fills to the wave tokens) |
| `max-w-6xl` / `4xl` / `3xl` / `md` | `max-w-container-wide` / `medium` / `prose` / `narrow` |
| `px-6`, `py-20`, `py-24`, `py-16` | `px-gutter`, `py-section`, `py-section-lg`, `py-section-sm` |

## Open questions for the Claude Design pass

1. **Primary on dark.** Violet `#4b2de2` is 2.16:1 on `#1e1e2f`, which rules out links and focus rings on dark surfaces. Options: a lighter violet for dark `primary` and `ring`, or a separate `--ring` value just for dark.
2. **Focus states.** The site has no visible focus styles at all. The `ring` token exists, but nothing uses it yet.
3. **Button sizes.** The site has two unnamed sizes (`px-6 py-3 text-sm` in the header, `px-8 py-4` elsewhere). Name them when Button becomes a component.
4. **Secondary hover.** It's `bg-dark` in `LinkButton` but `bg-gray-700` on the links page. Pick one.
5. **Destructive.** Borrowed from Tailwind red-600 because the site has no error states. Confirm or replace.
6. **Fluid type.** Right now type scales with breakpoints. Decide whether to switch to `clamp()` tokens.

## Development

```bash
npm test
```

Preview cards: serve the repo root (for example `python3 -m http.server`) and open `/previews/`. The first line of each card, `<!-- @dsCard group="..." -->`, is what the Claude Design system pane uses to group it.

Versioning: tag releases (`git tag v0.2.0`). Consumers pin to a tag in their git dependency.
