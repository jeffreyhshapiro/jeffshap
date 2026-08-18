export interface Role {
  title: string;
  dates: string;
}

export interface Job {
  company: string;
  location: string;
  roles: Role[];
  bullets?: string[];
}

export interface Competency {
  area: string;
  items: string[];
}

export interface Project {
  name: string;
  href?: string;
  linkLabel?: string;
  description: string;
}

export interface Education {
  credential: string;
  school: string;
  dates: string;
}

export const PROFILE = {
  name: 'jeff shapiro',
  title: 'Software Engineer',
  tagline: 'software engineer | frontend, architecture, AI and LLMs',
  location: 'New York, NY',
  email: 'jeffreyhshapiro@gmail.com',
  linkedin: 'https://linkedin.com/in/jeffreyhshapiro',
  github: 'https://github.com/jeffreyhshapiro',
  intro:
    'I build for the web — frontend, architecture, and the systems underneath. Most of my career has been on ecommerce platforms: growing small teams, and building the infrastructure that lets designers, merchandisers, and marketers ship without waiting on engineering. Lately that means a lot of AI-assisted tooling. On the side, music and audio in the browser.',
};

export const COMPETENCIES: Competency[] = [
  {
    area: 'Web',
    items: ['React', 'Remix', 'TypeScript', 'Node', 'Shopify', 'Design systems'],
  },
  {
    area: 'AI',
    items: [
      'AI-assisted development',
      'Claude Code',
      'LLM-powered tooling',
      'Audio transcription',
    ],
  },
  {
    area: 'Platform',
    items: [
      'Frontend architecture',
      'Technical SEO',
      'A/B testing and experimentation',
      'Search and discovery',
      'Performance',
    ],
  },
];

export const PROJECTS: Project[] = [
  {
    name: 'Tab Cafe',
    href: 'https://tab.cafe',
    linkLabel: 'tab.cafe',
    description:
      'A browser-based guitar tab editor with AI-powered audio transcription. Hum or play a melody and it transcribes directly into tab notation — built for guitarists who want to capture ideas fast without knowing formal notation.',
  },
];

export const JOBS: Job[] = [
  {
    company: 'Ernesta',
    location: 'New York, NY',
    roles: [
      { title: 'Staff Software Engineer', dates: 'Feb 2026 — Present' },
      { title: 'Senior Software Engineer', dates: 'May 2023 — Feb 2026' },
    ],
    bullets: [
      'Brought organic search presence to top 5 (avg) for phrases such as "custom-sized rugs" by leading technical SEO implementation',
      'Integrated a server-side AB testing platform, enabling the product team to optimize UI/UX decisions and improve engagement and conversion rates through data-driven experimentation',
      'Integrated a search and discovery platform into the website, improving customer product discovery and enabling more flexible data-driven merchandising and enhanced recommendations',
      'Enabled sharing of project and business knowledge by creating a central project context that is continuously updated and summarized by AI',
      'Small agile team of 5 engineers, building product and process from the ground up using Remix, React, Shopify, and Claude Code',
    ],
  },
  {
    company: 'Bombas',
    location: 'New York, NY',
    roles: [
      { title: 'Senior Software Engineer', dates: 'Dec 2021 — May 2023' },
      { title: 'Front End Engineer', dates: 'Oct 2018 — Dec 2021' },
    ],
    bullets: [
      'Developed a set of CMS-powered design system blocks, empowering merchandising and marketing teams to independently build static pages and update collection/product content',
      'Migrated the collection page from Shopify Liquid to React, resulting in 50% faster page load speeds',
      'Joined a team of 2 engineers and helped grow it to about 12 engineers with product managers and designers',
    ],
  },
  {
    company: 'Greats',
    location: 'Brooklyn, NY',
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
    roles: [{ title: 'Web Developer', dates: 'Sep 2016 — Jul 2017' }],
    bullets: [
      'Developed a beta Alexa skill for recording patient data, which resulted in raising $250k to support continued exploration of the business opportunity',
      'Improved the website Help section by creating a toolset that streamlined the process of generating user-facing documentation',
      'Performed QA and bug reporting for web, Android, and iOS applications',
    ],
  },
  {
    company: 'Pharma industry',
    location: '',
    roles: [{ title: 'Lab Technician', dates: '2014 — 2016' }],
  },
];

export const EDUCATION: Education[] = [
  {
    credential: 'AI Engineering Fellow',
    school: 'Overclock Accelerator, Online',
    dates: '2025',
  },
  {
    credential: 'Web Development',
    school: 'Rutgers Coding Bootcamp, New Brunswick, NJ',
    dates: '2016',
  },
  {
    credential: 'Master of Biotechnology',
    school: 'University of Pennsylvania, Philadelphia, PA',
    dates: '2013',
  },
  {
    credential: 'BS Environmental Science',
    school: 'Rutgers University, New Brunswick, NJ',
    dates: '2011',
  },
];
