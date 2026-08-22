import { useEffect } from 'react';
import { Resume } from './components/Resume';

const TITLE = 'Jeff Shapiro | Staff Software Engineer, New York';
const DESCRIPTION =
  'Jeff Shapiro is a staff software engineer in New York City building web storefronts for consumer brands — front-end architecture, technical SEO, experimentation, and search.';

const META_SELECTORS = [
  'meta[name="description"]',
  'meta[property="og:description"]',
  'meta[name="twitter:description"]',
];

const TITLE_SELECTORS = [
  'meta[property="og:title"]',
  'meta[name="twitter:title"]',
];

export function App() {
  useEffect(() => {
    document.title = TITLE;
    for (const selector of TITLE_SELECTORS) {
      document.querySelector(selector)?.setAttribute('content', TITLE);
    }
    for (const selector of META_SELECTORS) {
      document.querySelector(selector)?.setAttribute('content', DESCRIPTION);
    }
  }, []);

  return <Resume />;
}

export default App;
