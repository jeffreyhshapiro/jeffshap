# Design notes — "Spec sheet"

## Direction

The site is treated as a piece of engineering documentation: a precise, densely typeset
spec sheet rather than a marketing page. Every section is a labeled field in a two-column
record — a mono key in the left gutter, content in the measure, dates in a right-aligned
tabular column — so the whole document reads as one continuous aligned grid held together
by hairline rules. The intent is a well-set technical table or a beautifully typeset man
page: structure made visible, precision as the aesthetic. Deliberately *not* a fake
terminal — no phosphor green, no shell prompts, no ASCII art, no typewriter effects.

## Specific choices

**Type.** System mono stack throughout the structural layer:
`ui-monospace, 'SF Mono', 'JetBrains Mono', 'Cascadia Mono', Menlo, Consolas, monospace`.
Mono carries the identity — name, labels, keys, dates, competencies — while running prose
(the intro blurb, project descriptions, experience bullets) switches to the system sans for
readability at length. That mono/sans split is the typographic backbone: mono for anything
that is *data*, sans for anything that is *sentences*. No CDN or remote fonts; nothing is
loaded over the network at runtime.

Labels are set small (11–12px), uppercase, wide-tracked (0.12–0.14em); the name is set large
with tight negative tracking (-0.05em) so the mono reads as a wordmark rather than as code.
`font-variant-numeric: tabular-nums` is set globally so every date column aligns to the digit.

**Palette.** Cool neutrals, high contrast, one sharp accent.

| Token | Light | Dark |
| --- | --- | --- |
| `--paper` | `#f6f7f9` | `#0d1117` |
| `--rule` | `#d9dee4` | `#242c36` |
| `--ink` | `#0f141b` | `#e2e8f0` |
| `--ink-2` | `#525d6b` | `#98a4b3` |
| `--ink-3` | `#8b95a1` | `#6a7686` |
| `--accent` | `#0b57d0` | `#7fa8ff` |

A single instrument blue is the only chromatic element — used on the tagline pipe, the
competency area labels, links, and focus rings, and nowhere else. Dark mode is a near-black
editor ground rather than a pure `#000`, with the accent lightened to hold contrast against it.
Both schemes come from `prefers-color-scheme`; `color-scheme` is declared so form controls and
scrollbars follow.

**Layout.** One grid governs both routes: `--key-w: 108px` label gutter, fluid content column,
`--date-w: 158px` right-aligned date column, inside a `--measure: 940px` page. Section keys are
sticky, so the label of the section you are reading stays parked in the gutter as you scroll —
the detail a fellow engineer notices. Hairline rules separate sections; softer hairlines
separate rows within them. Education is a real `<table>` with `<th scope="col">` headers, since
it genuinely is tabular data. Prior roles at the same company nest under the company name behind
a vertical rule, which lets Ernesta and Bombas show promotion history without repeating the employer.

At ≤720px the grid collapses to a single column, the sticky key becomes an inline label with a
dashed rule running to the margin, and date columns unstack to the left. Verified at 390px with
no horizontal overflow (`scrollWidth === clientWidth === 390`).

**Landing.** The tagline is set as a signature line — Jeff's own string, lowercase and pipe intact,
against a 2px accent bar, with the pipe itself picked out in the accent. Above it an eyebrow row
(`SOFTWARE ENGINEER / NEW YORK, NY`) trails off into a dashed rule to the margin. Below, contact
details are a keyed field list on the same gutter grid as the resume, so the two routes are
visibly the same document system. It reads instantly to a recruiter: name, what he does, how to
reach him, one link onward.

**Motion.** Almost none, by choice. The CTA border and label shift color on hover and its arrow
slides 3px — 120ms, linear/ease-out. Nothing decorative, no scroll animation, no page-load
sequence. All transitions are disabled under `prefers-reduced-motion: reduce`.

**Accessibility.** Semantic `h1`/`h2`/`h3` per section, `aria-labelledby` on every section,
`<dl>` for key/value data, a real table with scoped headers for education, and a 2px accent
focus ring with 3px offset on every interactive element. Body text sits at `--ink-2` against
`--paper` in both schemes for comfortable contrast; structural labels that use the lighter
`--ink-3` are uppercase metadata, not reading copy.

## Content changes

Only the intro paragraph was re-worded, which the brief explicitly permits. It was tightened
from the AI-written draft — "Most of my career has been spent on ecommerce platforms" became
"Most of my career has been on ecommerce platforms:", the trailing clause was broken into two
short sentences ("Lately that means a lot of AI-assisted tooling. On the side, music and audio
in the browser."), and the drifting "move without waiting on engineering" became the more
concrete "ship without waiting on engineering". No facts, dates, employers, projects, or
credentials were added, removed, or altered. Everything else renders straight from `data.ts`.

The resume footer was changed from a prose "Get in touch" line to a labeled footer row
(location + Email/LinkedIn/GitHub), consistent with the document framing.

## Deliberately not done

- **No fake terminal.** No green-on-black, no `$` prompts, no blinking cursor, no ASCII art,
  no typewriter reveal. The brief called for technical *structure*, not terminal cosplay.
- **No numbered sections.** `01 / 02 / 03` markers are a common structural default, but these
  sections are not a sequence — order carries no meaning, so they are labeled, not numbered.
- **No theme toggle.** `prefers-color-scheme` is respected and a toggle would add UI chrome
  without adding information.
- **No syntax-highlighted code block or struct-definition hero.** It was the obvious move for
  this direction and would have cost legibility for a non-engineer reader. The tagline gets a
  signature line instead.
- **No scroll-triggered reveals, cursor effects, or gradients.** Density and alignment are the
  interest; motion would undercut the precision.
