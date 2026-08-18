# Design notes — "Editorial"

## The idea

The site is set like a literary journal rather than built like a web page. Typography *is*
the design system: there is no card, no shadow, no gradient, no border-radius anywhere on
the site. What little ornament exists — a hairline rule, a hanging quote mark, a dotted
leader — is doing a job that a printer would recognize. The landing page is a title page;
the resume is a two-column spread with the section rubrics hanging in the left margin.

## Typeface stack

Two roles, no webfonts (the brief forbids CDN fonts, and self-hosting a book face for two
pages of text isn't worth the payload):

- **Body and display** — `'Iowan Old Style', 'Palatino Linotype', Palatino, 'Book Antiqua',
  'Hoefler Text', Georgia, 'Times New Roman', serif`. Iowan Old Style ships on macOS/iOS and
  is a genuinely good book face; Palatino and Hoefler Text are close cousins, and Georgia is
  the honest fallback everywhere else. Everything that is *read* is set in this.
- **Utility** — `'Avenir Next Condensed', 'Helvetica Neue', Inter, system-ui, …`. Used only
  for things that are *scanned*, never read: section rubrics, dates, the location line, the
  footer links. Small, uppercase, letterspaced 0.16em.

The whole document runs `font-variant-numeric: oldstyle-num`, so dates sit in the text
with ascenders and descenders instead of standing up like lining figures. The utility face
overrides back to lining numerals where dates need to align in a column.

## Palette

Warm-neutral, ink on paper, one accent.

| Token | Light | Dark |
| --- | --- | --- |
| `--paper` | `#f7f5f1` | `#14130f` |
| `--ink` | `#1b1917` | `#ebe6dc` |
| `--ink-soft` | `#4a453e` | `#b6afa3` |
| `--ink-faint` | `#7d766c` | `#857e72` |
| `--rule` | `#d9d4ca` | `#35322b` |
| `--rubric` | `#7c2f2f` | `#d08a72` |

The accent is an **oxblood** — the color of a rubricated initial in a printed book — not the
terracotta that shows up on every warm-cream site. It appears in exactly four places: the
pipe in the tagline, the underline on the resume link, the hanging quote mark, and focus
outlines. In dark mode it warms to `#d08a72` to keep contrast on the dark ground.

Dark mode is `prefers-color-scheme` only. No toggle — a toggle is a control, and this design
didn't have a quiet enough place to put one.

## Layout system

- **Home** — a title page. A rule draws across the top, the name sits beneath it at
  `clamp(3.4rem, 15vw, 8.5rem)`, the tagline is a standfirst in italic, and a second rule
  carries the location and the one link out. Vertically centered, weighted low, mostly
  whitespace.
- **Resume** — a two-column grid: `var(--rail)` (8.5rem) for section rubrics, `--gutter`
  (2.5rem), then the text column. The rubrics are `position: sticky` so they behave like a
  running head — the section name stays with you while you read it. Prose is capped at
  `68ch`.
- **Below 46rem** — the rail collapses, rubrics become running heads above their sections,
  and the dotted leaders are hidden (at that width they read as clutter, not as a device).
  Verified: no horizontal overflow at 390px.

## The typographic moments

Three, and they all come from setting rather than effects:

1. **Dotted leaders on the role lines.** Each role runs title → leader rule → dates, the way
   a table of contents does. This is also what fixed a real structural problem: the previous
   layout paired the company with the first role's dates, which made a two-role job ambiguous.
2. **A raised initial on the intro paragraph.** Raised, not dropped — a drop cap at this size
   is costume, and a raised initial keeps the first line's baseline honest.
3. **The pull quote,** with the opening quotation mark hung outside the text block
   (`margin-left: -0.42em`) so the first letter stays optically flush. Text is
   `text-wrap: balance` so the three lines break evenly.

Plus a hanging indent on every bullet: the em-dash marker sits in the margin and the text
block stays flush left.

## Motion

Almost none, by design. On the landing page a rule draws itself in (`scaleX`) and the name,
tagline, and footer rise 0.5rem in sequence. That is the entire motion budget for the site.
The resume has none. `prefers-reduced-motion: reduce` collapses all animation and transition
durations to ~0 — verified in the browser that the name still renders at full opacity rather
than getting stuck invisible.

## Content changes

**None to the facts.** Every job, role, date, bullet, project, and credential is rendered
straight from `data.ts`. I did not touch `data.ts`.

Two wording changes, both in page copy rather than data:

- The resume footer read "Get in touch — <email>". It now reads "Currently building at
  Ernesta in New York. Reach me at <email>." Ernesta and New York both come from `data.ts`;
  this just states the present tense that the experience list already implies.
- The landing page link was "Resume →"; it is now "Read the resume →". The page is set like
  something to be read, and the verb matches.

The pull quote is lifted verbatim from the existing intro paragraph in `data.ts` — it is
Jeff's strongest line and it was buried mid-paragraph. I left the intro prose itself as
written; the brief allowed rewording it, but it is accurate and specific already, and the
raised initial gives it enough presence without a rewrite.

## Deliberately not done

- **No self-hosted webfont.** A system serif stack that degrades to Georgia is the right
  trade for a two-page static site; shipping 200kb of woff2 to get a marginally better
  italic isn't.
- **No dark-mode toggle.** No quiet place to put one.
- **No skill "tags" or pills.** Competencies are set as running text with hairline
  separators, the way a journal sets a list of contributors. Pills are a UI convention, not
  a typographic one, and they would have been the only rounded shape on the site.
- **No numbered section markers (01 / 02 / 03).** The sections aren't a sequence, so
  numbering them would encode something untrue.
- **No scroll-triggered reveals.** The direction called for restraint; animating content in
  as you scroll a resume is the opposite.
- **No chat/AI interface.** Explicitly out of scope per the brief.
