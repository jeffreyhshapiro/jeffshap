/**
 * Single source of truth for who this site says Jeff is, and for the
 * metadata derived from it.
 *
 * ─────────────────────────────────────────────────────────────────────
 * TO CHANGE THE POSITIONING, EDIT `POSITIONING` BELOW. NOTHING ELSE.
 *
 * The visible headline, the meta description, and the page title are all
 * built from it, so they cannot drift apart. To become just "a software
 * engineer", set `focus: null` and every derived string drops the
 * consumer-brand framing on its own.
 * ─────────────────────────────────────────────────────────────────────
 *
 * SITE is consumed twice:
 *  - vite.config.ts injects it into index.html at build time, so crawlers
 *    and link unfurlers see it in the served markup without running JS.
 *  - App.tsx re-applies it at runtime, keeping the tags correct if
 *    anything later changes them client-side.
 */

const POSITIONING = {
  /** The role, on its own. This is the part that never needs qualifying. */
  role: 'Software engineer',

  /** Same role in title case, for the <title> tag. */
  roleTitleCase: 'Software Engineer',

  /**
   * What the role is currently pointed at, or null for no qualifier.
   * Set to null to present simply as a software engineer.
   */
  focus: 'building for consumer brands' as string | null,

  /** Longest-serving proof, used only in metadata. null to omit. */
  evidence: '10 years experience building for consumer brands like Ernesta, Bombas, and Greats' as
    | string
    | null,

  location: 'New York',
} as const;

/** "Software engineer building for consumer brands." or just "Software engineer." */
export const HEADLINE = POSITIONING.focus
  ? `${POSITIONING.role} ${POSITIONING.focus}.`
  : `${POSITIONING.role}.`;

export const SITE = {
  name: 'Jeff Shapiro',
  title: `Jeff Shapiro | ${POSITIONING.roleTitleCase}, ${POSITIONING.location}`,
  description: POSITIONING.evidence
    ? `${POSITIONING.role} with ${POSITIONING.evidence}. Based in ${POSITIONING.location} City.`
    : `${POSITIONING.role} based in ${POSITIONING.location} City.`,
  url: 'https://shapiro.tech/',
  themeColor: '#faf6f0',
} as const;
