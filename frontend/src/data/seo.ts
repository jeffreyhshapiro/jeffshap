/**
 * Single source of truth for site metadata.
 *
 * Consumed twice:
 *  - vite.config.ts injects these into index.html at build time, so crawlers
 *    and link unfurlers see them in the served markup without running JS.
 *  - App.tsx re-applies them at runtime, keeping the tags correct if anything
 *    later changes them client-side.
 */

export const SITE = {
  name: 'Jeff Shapiro',
  title: 'Jeff Shapiro | Software Engineer, New York',
  description:
    'Software engineer with 10 years experience building for consumer brands like Ernesta, Bombas, and Greats. Based in New York City.',
  url: 'https://shapiro.tech/',
  themeColor: '#faf6f0',
} as const;

/** The page's visible headline. Kept here so it stays in step with the meta description. */
export const HEADLINE =
  'Software engineer with 10 years experience building for consumer brands like Ernesta, Bombas, and Greats.';
