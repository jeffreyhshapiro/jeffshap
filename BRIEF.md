# Portfolio redesign brief — Jeff Shapiro

You are redesigning a personal portfolio site. A working version already exists in this
worktree on branch `redesign-1`. Your job is to produce a DISTINCT visual design of it.

## The person

Jeff Shapiro, software engineer in New York, NY.
- Email: jeffreyhshapiro@gmail.com
- LinkedIn: https://linkedin.com/in/jeffreyhshapiro
- GitHub: https://github.com/jeffreyhshapiro
- Tagline he wrote himself, lowercase and pipe intact:
  `software engineer | frontend, architecture, AI and LLMs`
- He lowercased his name to `jeff shapiro` on the landing page. Keep that lowercase styling.

## Current state (what already exists — READ THE CODE FIRST)

- Vite + React 19 + TypeScript, deployed to Cloudflare Pages (`pages_build_output_dir = "frontend/dist"`).
- `frontend/src/data.ts` — ALL content as typed data: PROFILE, COMPETENCIES, PROJECTS, JOBS, EDUCATION.
- `frontend/src/pages/Home.tsx` — minimal landing: name, tagline, "Resume →" link.
- `frontend/src/pages/Resume.tsx` — competencies, projects, experience, education, contact footer.
- `frontend/src/App.tsx` — router shell, per-route <title>/description, header hidden on home.
- `frontend/src/index.css` — all styles. Warm paper palette, forest-green accent, dark mode
  via prefers-color-scheme, print styles.
- SPA deep links work via `frontend/public/_redirects`.

The site previously had an AI chat interface. It was deliberately removed. DO NOT bring back
any chatbot, AI assistant, or conversational UI. This is a static portfolio.

## Your task

Create ONE distinct design. Same content, same routes (`/` and `/resume`), same stack.
Change the visual design: typography, color, layout, spacing, motion, structure of the pages.

### Hard requirements (non-negotiable)

1. **Keep all content accurate.** Do not invent jobs, projects, skills, dates, or credentials.
   Everything must come from `data.ts`. You may re-word the intro paragraph prose, but never
   fabricate facts. The intro paragraph currently in data.ts is a draft written by an AI, not
   by Jeff — improving its wording is welcome; inventing new biography is not.
2. **Keep the two routes** `/` (landing) and `/resume`. Deep links must work.
3. **Keep it a static site.** No backend, no API calls, no external network requests at runtime
   (no CDN fonts, no remote images) — Cloudflare Pages serves it as static files.
   Self-host or system-stack any fonts you use.
4. **`npm run build` and `npm run lint` must both pass** from the repo root. Verify before finishing.
5. **Responsive.** Must work at 390px wide with no horizontal overflow, and at desktop widths.
6. **Accessible.** Real semantic headings, sufficient contrast in BOTH light and dark mode,
   visible focus states, `prefers-reduced-motion` respected for any motion.
7. **Dark mode must work** via `prefers-color-scheme` (or a toggle if your design wants one).
8. Do not delete `frontend/public/_redirects` or break the Cloudflare Pages config.

### Tone

"Professional and mildly cool." It should look like a senior engineer's site — considered,
confident, not a template. Mildly cool means one or two genuine moments of personality, not
a maximalist showcase. Restraint is part of the brief. No stock-template hero sections, no
gratuitous gradients-on-everything, no generic "I'm a passionate developer" energy.

## Deliverable

Commit your work to this worktree's branch. Then write a file `DESIGN_NOTES.md` at the repo root:
- The design direction in 2-3 sentences (what's the idea?)
- Specific choices: typeface stack, palette, layout system, any motion
- Anything you changed about content wording, and why
- Anything you deliberately did NOT do

Verify your build passes and screenshot/check both routes before you call it done.
Work autonomously — do not ask questions, make your best judgment and go.
