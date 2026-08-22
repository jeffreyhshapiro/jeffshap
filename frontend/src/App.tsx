import { useEffect } from 'react';
import { Field } from './components/Field';

const TITLE = 'Jeff Shapiro | Staff Software Engineer | New York, NY';
const DESCRIPTION =
  'Jeff Shapiro is a Staff Software Engineer in New York, NY, building commerce platforms, design systems, and search and experimentation infrastructure.';

export function App() {
  useEffect(() => {
    document.title = TITLE;
    const set = (selector: string, attr: string, value: string) =>
      document.querySelector(selector)?.setAttribute(attr, value);

    set('meta[name="description"]', 'content', DESCRIPTION);
    set('meta[property="og:title"]', 'content', TITLE);
    set('meta[property="og:description"]', 'content', DESCRIPTION);
    set('meta[name="twitter:title"]', 'content', TITLE);
    set('meta[name="twitter:description"]', 'content', DESCRIPTION);
  }, []);

  return <Field />;
}

export default App;
