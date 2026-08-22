/**
 * Single source of truth for résumé content. The WebGL field derives its
 * chapter bands from this array, so the scene and the document can never
 * drift out of sync.
 */

export interface Role {
  title: string;
  dates: string;
}

export interface Job {
  id: string;
  company: string;
  location: string;
  roles: Role[];
  bullets: string[];
}

export const PROFILE = {
  name: 'Jeff Shapiro',
  role: 'Staff Software Engineer',
  location: 'New York, NY',
  email: 'jeffreyhshapiro@gmail.com',
  linkedin: 'https://linkedin.com/in/jeffreyhshapiro',
  github: 'https://github.com/jeffreyhshapiro',
} as const;

export const JOBS: Job[] = [
  {
    id: 'ernesta',
    company: 'Ernesta',
    location: 'New York, NY',
    roles: [
      { title: 'Staff Software Engineer', dates: 'Feb 2026 - Present' },
      { title: 'Senior Software Engineer', dates: 'May 2023 - Feb 2026' },
    ],
    bullets: [
      'Brought organic search presence to top 5 (avg) for phrases such as "custom-sized rugs" by leading technical SEO implementation',
      'Integrated a server-side AB testing platform, enabling the product team to optimize UI/UX decisions and improve engagement and conversion rates through data-driven experimentation',
      'Integrated a search and discovery platform into the website, improving customer product discovery and enabling more flexible data-driven merchandising and enhanced recommendations',
      "Enable sharing of project and business knowledge by creating a central project context that's continuously updated and summarized by AI",
      'Small agile team of 5 engineers, building product and process from the ground up using Remix, React, Shopify, and Claude Code',
    ],
  },
  {
    id: 'bombas',
    company: 'Bombas',
    location: 'New York, NY',
    roles: [
      { title: 'Senior Software Engineer', dates: 'Dec 2021 - May 2023' },
      { title: 'Front End Engineer', dates: 'Oct 2018 - Dec 2021' },
    ],
    bullets: [
      'Developed a set of CMS-powered design system blocks, empowering merchandising and marketing teams to independently build static pages and update collection/product content',
      'Migrated collection page from Shopify Liquid to React, resulting in 50% faster page load speeds',
      'Joined a team of 2 engineers and helped grow it to about 12 engineers with product managers and designers',
    ],
  },
  {
    id: 'greats',
    company: 'Greats',
    location: 'Brooklyn, NY',
    roles: [{ title: 'Full Stack Developer', dates: 'Aug 2017 - Oct 2018' }],
    bullets: [
      'Led the development of the company Shopify ecommerce site',
      'Built custom services with Node that interact with the Shopify Admin API',
      'Rewrote the website (design and development) from the ground up and implemented development workflows with Node',
    ],
  },
  {
    id: 'idialogs',
    company: 'iDialogs',
    location: 'New York, NY',
    roles: [{ title: 'Web Developer', dates: 'Sep 2016 - Jul 2017' }],
    bullets: [
      'Developed a beta Alexa skill for recording patient data which resulted in raising $250k to support continued exploration of business opportunity',
      'Improved website Help section by creating a toolset that streamlined the process of generating user-facing documentation',
      'Performed QA and bug reporting for web, Android, and iOS applications',
    ],
  },
  {
    id: 'pharma',
    company: 'Pharma industry',
    location: '',
    roles: [{ title: 'Lab Technician', dates: '2014 - 2016' }],
    bullets: [],
  },
];

export const PROJECTS = [
  {
    name: 'Tab Cafe',
    href: 'https://tab.cafe',
    label: 'tab.cafe',
    description:
      'A browser-based guitar tab editor with AI-powered audio transcription. Hum or play a melody and it transcribes directly into tab notation.',
  },
];

export const EDUCATION = [
  { title: 'AI Engineering Fellow', dates: 'Oct 2025 - Dec 2025', school: 'Overclock Accelerator, Online' },
  { title: 'Web Development', dates: '2016', school: 'Rutgers Coding Bootcamp, New Brunswick, NJ' },
  { title: 'Master of Biotechnology', dates: '2013', school: 'University of Pennsylvania, Philadelphia, PA' },
  { title: 'BS Environmental Science', dates: '2011', school: 'Rutgers University, New Brunswick, NJ' },
];

/** Sections the field treats as chapters, in document order. */
export const CHAPTERS = ['intro', ...JOBS.map((j) => j.id), 'projects', 'education'] as const;
