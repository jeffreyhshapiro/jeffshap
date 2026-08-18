import { useEffect } from 'react';
import { Routes, Route, Link, useLocation } from 'react-router-dom';
import { PROFILE } from './data';
import { Home } from './pages/Home';
import { Resume } from './pages/Resume';

const META: Record<string, { title: string; description: string }> = {
  '/': {
    title: 'Jeff Shapiro | Software Engineer',
    description:
      'Jeff Shapiro is a software engineer in New York City working on frontend, architecture, AI and LLMs.',
  },
  '/resume': {
    title: 'Resume | Jeff Shapiro',
    description:
      'Resume of Jeff Shapiro, a software engineer in New York City working on frontend, architecture, AI and LLMs.',
  },
};

function useMeta(pathname: string) {
  useEffect(() => {
    const meta = META[pathname] ?? META['/'];
    document.title = meta.title;
    for (const selector of [
      'meta[name="description"]',
      'meta[property="og:description"]',
      'meta[name="twitter:description"]',
    ]) {
      document.querySelector(selector)?.setAttribute('content', meta.description);
    }
    for (const selector of [
      'meta[property="og:title"]',
      'meta[name="twitter:title"]',
    ]) {
      document.querySelector(selector)?.setAttribute('content', meta.title);
    }
  }, [pathname]);
}

export function App() {
  const { pathname } = useLocation();
  const isHome = pathname === '/';
  useMeta(pathname);

  return (
    <div className={`page${isHome ? ' page--home' : ''}`}>
      {!isHome && (
        <header className="topbar">
          <div className="topbar__inner">
            <Link className="topbar__wordmark" to="/">jeff shapiro</Link>
            <nav className="topbar__links" aria-label="Contact">
              <a href={`mailto:${PROFILE.email}`}>Email</a>
              <a href={PROFILE.linkedin} target="_blank" rel="noreferrer">LinkedIn</a>
              <a href={PROFILE.github} target="_blank" rel="noreferrer">GitHub</a>
            </nav>
          </div>
        </header>
      )}
      <main className={isHome ? 'main main--home' : 'main'}>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/resume" element={<Resume />} />
          <Route path="*" element={<Home />} />
        </Routes>
      </main>
    </div>
  );
}

export default App;
