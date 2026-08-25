/**
 * Single source of truth for the site's headline and metadata.
 *
 * SITE is consumed twice:
 *  - vite.config.ts injects it into index.html at build time, so crawlers
 *    and link unfurlers see it in the served markup without running JS.
 *  - App.tsx re-applies it at runtime, keeping the tags correct if
 *    anything later changes them client-side.
 */

/** The page's visible headline. Edit this line to change the positioning. */
export const HEADLINE =
  'Software engineer building web systems for consumer brands, side projects, and the fun of it.';

export const SITE = {
  name: 'Jeff Shapiro',
  title: 'Jeff Shapiro | Software Engineer, New York',
  description:
    'Software engineer in New York building web systems for consumer brands, side projects, and the fun of it.',
  url: 'https://shapiro.tech/',
  themeColor: '#faf6f0',
} as const;
