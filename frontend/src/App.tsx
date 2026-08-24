import { useEffect } from 'react';
import { Resume } from './components/Resume';
import { SITE } from './data/seo';

/** Every meta tag driven by SITE, so adding a tag means adding one row. */
const META: [selector: string, content: string][] = [
  ['meta[name="description"]', SITE.description],
  ['meta[property="og:description"]', SITE.description],
  ['meta[name="twitter:description"]', SITE.description],
  ['meta[property="og:title"]', SITE.title],
  ['meta[name="twitter:title"]', SITE.title],
  ['meta[property="og:url"]', SITE.url],
  ['meta[name="author"]', SITE.name],
];

export function App() {
  useEffect(() => {
    document.title = SITE.title;
    for (const [selector, content] of META) {
      document.querySelector(selector)?.setAttribute('content', content);
    }
  }, []);

  return <Resume />;
}

export default App;
