import { useState, useRef, useEffect } from 'react';
import confetti from 'canvas-confetti';
import { Hero } from './components/Hero';
import { Focus } from './components/Focus';
import { Experience } from './components/Experience';
import { Projects } from './components/Projects';
import { Education } from './components/Education';
import { Footer } from './components/Footer';
import { PROFILE } from './data/resume';

const PARTY_MESSAGES = [
  'you found the secret',
  'ok you got me',
  'this took real commitment',
  'five clicks. respect.',
  'most people just read the resume',
];

const META = {
  title: 'Jeff Shapiro | Staff Software Engineer | Commerce, Search, and Web Platform',
  description:
    'Jeff Shapiro is a Staff Software Engineer in New York City building commerce storefronts and the search, experimentation, and content systems behind them.',
};

const NAV = [
  { href: '#focus-heading', label: 'Focus' },
  { href: '#experience-heading', label: 'Experience' },
  { href: '#projects-heading', label: 'Projects' },
  { href: '#contact', label: 'Contact' },
];

export function App() {
  const [party, setParty] = useState(false);
  const [partyMsg] = useState(
    () => PARTY_MESSAGES[Math.floor(Math.random() * PARTY_MESSAGES.length)]
  );
  const clickCount = useRef(0);
  const clickTimer = useRef<ReturnType<typeof setTimeout> | null>(null);
  const partyTimer = useRef<ReturnType<typeof setTimeout> | null>(null);

  useEffect(() => {
    document.title = META.title;
    const set = (selector: string, content: string) =>
      document.querySelector(selector)?.setAttribute('content', content);

    set('meta[name="description"]', META.description);
    set('meta[property="og:title"]', META.title);
    set('meta[property="og:description"]', META.description);
    set('meta[name="twitter:title"]', META.title);
    set('meta[name="twitter:description"]', META.description);
  }, []);

  useEffect(
    () => () => {
      if (clickTimer.current) clearTimeout(clickTimer.current);
      if (partyTimer.current) clearTimeout(partyTimer.current);
    },
    []
  );

  function handleWordmarkClick() {
    clickCount.current += 1;
    if (clickTimer.current) clearTimeout(clickTimer.current);
    clickTimer.current = setTimeout(() => {
      clickCount.current = 0;
    }, 800);

    if (clickCount.current >= 5) {
      clickCount.current = 0;
      setParty(true);
      if (partyTimer.current) clearTimeout(partyTimer.current);
      partyTimer.current = setTimeout(() => setParty(false), 3000);

      const reduced = window.matchMedia?.('(prefers-reduced-motion: reduce)').matches;
      if (!reduced) {
        confetti({ particleCount: 120, spread: 80, origin: { y: 0.3 } });
      }
    }
  }

  return (
    <div className="app">
      {party && (
        <div className="party-toast" role="status">
          {partyMsg}
        </div>
      )}

      <a className="skip-link" href="#main">
        Skip to content
      </a>

      <header className="app__header">
        <button
          type="button"
          className="app__wordmark"
          onClick={handleWordmarkClick}
          aria-label={PROFILE.name}
        >
          js
        </button>

        <nav className="app__nav" aria-label="Sections">
          {NAV.map((item) => (
            <a key={item.href} className="app__nav-link" href={item.href}>
              {item.label}
            </a>
          ))}
        </nav>
      </header>

      <main className="app__main" id="main">
        <Hero />
        <Focus />
        <Experience />
        <Projects />
        <Education />
      </main>

      <Footer />
    </div>
  );
}

export default App;
