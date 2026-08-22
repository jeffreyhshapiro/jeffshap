export interface Role {
  title: string;
  dates: string;
}

export interface Job {
  company: string;
  location: string;
  /** Most recent role first. */
  roles: Role[];
  /** Compact range shown on the timeline rail. */
  span: string;
  bullets: string[];
  /** Technologies named in the resume for this role. */
  stack?: string[];
}

export interface Project {
  name: string;
  href?: string;
  hrefLabel?: string;
  description: string;
}

export interface Education {
  credential: string;
  school: string;
  dates: string;
}

export const PROFILE = {
  name: 'Jeff Shapiro',
  title: 'Staff Software Engineer',
  location: 'New York, NY',
  email: 'jeffreyhshapiro@gmail.com',
  linkedin: 'https://linkedin.com/in/jeffreyhshapiro',
  github: 'https://github.com/jeffreyhshapiro',
} as const;

export const JOBS: Job[] = [
  {
    company: 'Ernesta',
    location: 'New York, NY',
    span: '2023 — Now',
    roles: [
      { title: 'Staff Software Engineer', dates: 'Feb 2026 — Present' },
      { title: 'Senior Software Engineer', dates: 'May 2023 — Feb 2026' },
    ],
    bullets: [
      'Brought organic search presence to top 5 (avg) for phrases such as "custom-sized rugs" by leading technical SEO implementation',
      'Integrated a server-side AB testing platform, enabling the product team to optimize UI/UX decisions and improve engagement and conversion rates through data-driven experimentation',
      'Integrated a search and discovery platform into the website, improving customer product discovery and enabling more flexible data-driven merchandising and enhanced recommendations',
      "Enable sharing of project and business knowledge by creating a central project context that's continuously updated and summarized by AI",
      'Small agile team of 5 engineers, building product and process from the ground up',
    ],
    stack: ['Remix', 'React', 'Shopify', 'Claude Code'],
  },
  {
    company: 'Bombas',
    location: 'New York, NY',
    span: '2018 — 2023',
    roles: [
      { title: 'Senior Software Engineer', dates: 'Dec 2021 — May 2023' },
      { title: 'Front End Engineer', dates: 'Oct 2018 — Dec 2021' },
    ],
    bullets: [
      'Developed a set of CMS-powered design system blocks, empowering merchandising and marketing teams to independently build static pages and update collection/product content',
      'Migrated collection page from Shopify Liquid to React, resulting in 50% faster page load speeds',
      'Joined a team of 2 engineers and helped grow it to about 12 engineers with product managers and designers',
    ],
  },
  {
    company: 'Greats',
    location: 'Brooklyn, NY',
    span: '2017 — 2018',
    roles: [{ title: 'Full Stack Developer', dates: 'Aug 2017 — Oct 2018' }],
    bullets: [
      'Led the development of the company Shopify ecommerce site',
      'Built custom services with Node that interact with the Shopify Admin API',
      'Rewrote the website (design and development) from the ground up and implemented development workflows with Node',
    ],
  },
  {
    company: 'iDialogs',
    location: 'New York, NY',
    span: '2016 — 2017',
    roles: [{ title: 'Web Developer', dates: 'Sep 2016 — Jul 2017' }],
    bullets: [
      'Developed a beta Alexa skill for recording patient data which resulted in raising $250k to support continued exploration of business opportunity',
      'Improved website Help section by creating a toolset that streamlined the process of generating user-facing documentation',
      'Performed QA and bug reporting for web, Android, and iOS applications',
    ],
  },
  {
    company: 'Pharma industry',
    location: '',
    span: '2014 — 2016',
    roles: [{ title: 'Lab Technician', dates: '2014 — 2016' }],
    bullets: [],
  },
];

export const PROJECTS: Project[] = [
  {
    name: 'Tab Cafe',
    href: 'https://tab.cafe',
    hrefLabel: 'tab.cafe',
    description:
      'A browser-based guitar tab editor with AI-powered audio transcription. Hum or play a melody and it transcribes directly into tab notation.',
  },
];

export const EDUCATION: Education[] = [
  { credential: 'AI Engineering Fellow', school: 'Overclock Accelerator, Online', dates: 'Oct 2025 — Dec 2025' },
  { credential: 'Web Development', school: 'Rutgers Coding Bootcamp, New Brunswick, NJ', dates: '2016' },
  { credential: 'Master of Biotechnology', school: 'University of Pennsylvania, Philadelphia, PA', dates: '2013' },
  { credential: 'BS Environmental Science', school: 'Rutgers University, New Brunswick, NJ', dates: '2011' },
];

/** Themes drawn from the record above — used for the "what he's good at" panel. */
export const FOCUS_AREAS: { label: string; body: string }[] = [
  {
    label: 'Commerce at scale',
    body: 'Nine years building storefronts and the systems behind them — Shopify, Remix, React — for teams where the site is the business.',
  },
  {
    label: 'Search & discovery',
    body: 'Technical SEO that moved core phrases into the top 5, plus a search and discovery platform integration that made merchandising data-driven.',
  },
  {
    label: 'Experimentation',
    body: 'Server-side A/B testing wired into the product loop, so UI and UX calls get settled by evidence instead of argument.',
  },
  {
    label: 'AI in the workflow',
    body: 'A continuously summarized project context that keeps a team aligned, and day-to-day building with Claude Code.',
  },
];
