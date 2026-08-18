# Design notes — "Workbench"

## The idea

A well-made physical object rather than a web template: warm clay paper, deep teal ink, and
brass hardware, with panels that sit on the page like parts laid out on a bench. Jeff's work
is consistently about building the thing *underneath* — CMS blocks, design systems, a tab
editor for guitarists who don't read notation — so the site is built to feel made rather than
generated, with the craft in the materials instead of in decoration.

## Typography

System stacks only — no CDN, no self-hosted binaries, nothing to load at runtime.

- **Display — `Avenir Next` → `Avenir` → `Futura` → `Century Gothic` → `system-ui`.**
  A geometric humanist sans with actual personality: the single-storey `a` and wide round
  bowls give the lowercase `jeff shapiro` real character at 88px. Set tight
  (`-0.035em`, `line-height: 0.98`) so the name reads as a mark, not a heading.
- **Body — `Charter` → `Iowan Old Style` → `Palatino` → `Georgia`.**
  A transitional serif for all prose. This is the warmth: bullets and the intro read like a
  printed document, which suits a resume better than yet another UI sans, and it makes the
  geometric display face feel deliberate by contrast.
- **Utility — `ui-monospace` / `SF Mono`.** Dates, section eyebrows, the location stamp.
  Monospace is reserved strictly for data — anything that is a fact rather than a sentence.

Three faces, three jobs, no overlap.

## Palette

Committed to a real color pair rather than grey-on-white. Teal is the primary ink and brass
ochre is the accent; terracotta/clay is defined but deliberately kept as a supporting tint so
the page doesn't become a single warm wash.

| Token | Light | Dark |
| --- | --- | --- |
| `--paper` | `#f4ece0` warm oat | `#17120e` warm brown-black |
| `--panel` | `#fbf6ee` | `#201a15` |
| `--ink` | `#22322e` deep teal-black | `#f0e6d8` warm cream |
| `--teal` | `#175c53` | `#6cb9a9` |
| `--ochre` | `#a8681c` | `#d69b4f` |

Dark mode is a lamp on a workbench, not an inverted greyscale: the ground is brown-black,
text is warm cream rather than white, and shadows are tuned separately per scheme. Shadows in
light mode carry a brown cast (`rgba(74,51,30,…)`) instead of neutral black, which is most of
why the panels read as paper on wood. The body carries two very low-opacity radial washes in
ochre and teal — a hint of tone variation across the page, no image, no gradient hero.

## Layout

- Single 720px measure, but the page varies its surface treatment by content type rather than
  putting everything in the same box. **Competencies and education are panels** (raised, warm
  border, 16px radius). **Experience hangs off a timeline rule** with a dot per company that
  fills ochre on hover — chronology is real information here, so it gets a structural device.
  **The intro is a bordered pull-quote**, not a card.
- Section labels are set as an eyebrow with a rule running out to the edge — a bench line.
- Home is a full-height composition: oversized lowercase name, the strings, tagline, and a
  pill primary action with contact links beside it.

## Motion

All of it is behind `prefers-reduced-motion`, and the reduced-motion path is handled twice —
CSS forces `.reveal` visible and disables animation, and `useReveal` skips the
IntersectionObserver entirely and marks everything visible. Content is never hidden behind an
animation that might not run.

- Sections fade and rise 14px on scroll, once, then unobserve.
- Panels lift 2–3px with a deepened shadow and an ochre-tinted border on hover.
- The primary action lifts on hover and presses back down on `:active`.

## The one flourish

Six lines under the name on the landing page — guitar strings, low to high, with stroke widths
tapering from the bass string to the treble. Hovering a string plucks it: a damped
`scaleY` oscillation that settles back to rest, and the set warms from paper-rule to ochre
when the pointer is anywhere near. It is the only ornament on the page, it's monochrome, it
carries no audio, and it's `aria-hidden`. This is the nod to Tab Cafe and the guitar playing —
present for anyone who notices, invisible to anyone who doesn't.

## Content changes

Only one, and it's wording, not fact. The intro paragraph was tightened from the AI-written
draft — "Most of my career has been spent on ecommerce platforms" → "Most of my career has
been in ecommerce", "move without waiting on engineering" → "ship without waiting on
engineering", and the trailing clause became its own short sentence ("On the side, music and
audio in the browser."). Same claims, fewer words, less draft-like cadence. No jobs,
projects, dates, skills, or credentials were altered — everything still renders from
`data.ts`.

The home tagline is split on its existing pipe and re-set as `software engineer — frontend,
architecture, AI and LLMs`, with the role in full-strength ink and the focus areas softened.
The exact words and the lowercase are unchanged; only the separator is rendered differently.
The landing CTA reads "Read the resume" rather than "Resume →" — it says what happens.

## Deliberately not done

- **No dark-mode toggle.** `prefers-color-scheme` only; a toggle is state and chrome this
  site doesn't need.
- **No serif display face.** Cream + high-contrast serif + terracotta is the current default
  look for this kind of page; the brief asked for warmth, so the warmth comes from a
  geometric sans over a serif *body*, which is the less-traveled pairing.
- **No glassmorphism, no gradient hero, no purple.** The only translucency is the sticky
  topbar, which needs it to stay legible over scrolling content.
- **No guitar theme.** No fretboard background, no note glyphs, no audio, no tab notation as
  decoration. The strings are the entire gesture and they stop there.
- **No icons or logos.** Company names carry themselves.
- **No project grid.** There is one project; a grid built for one card is a lie about scale.

## Verification

`npm run build` and `npm run lint` both pass from the repo root. Both routes were checked in a
browser in light and dark at 1280px and at 390px — no horizontal overflow at mobile
(`scrollWidth === innerWidth === 390`), focus states are visible in ochre, and the scroll
reveal was confirmed to complete on scroll and to no-op under reduced motion. Print styles
drop the topbar, flatten to white, and unhide every revealed section.
