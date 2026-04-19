import { useState, useRef, useEffect } from 'react';
import { Routes, Route, useLocation, useNavigate } from 'react-router-dom';
import confetti from 'canvas-confetti';
import { ModeNav } from './components/ModeNav';
import { ChatMode } from './components/chat/ChatMode';
import { ResumeMode } from './components/ResumeMode';
import { ThreeDMode } from './components/ThreeDMode';
import type { Mode } from './types';

const PARTY_MESSAGES = [
  'you found the secret',
  'ok you got me',
  'this took real commitment',
  'five clicks. respect.',
  'most people just read the resume',
];

const PATH_TO_MODE: Record<string, Mode> = {
  '/': 'chat',
  '/resume': 'resume',
  '/3d': '3d',
};

const MODE_TO_PATH: Record<Mode, string> = {
  chat: '/',
  resume: '/resume',
  '3d': '/3d',
};

const META: Record<Mode, { title: string; description: string }> = {
  chat: {
    title: 'Jeff Shapiro | Web-focused Software Engineer | Frontend, Architecture, and Systems',
    description: 'Jeff Shapiro is a software engineer based in NYC',
  },
  resume: {
    title: 'Resume | Jeff Shapiro | Software Engineer',
    description: 'Resume of Jeff Shapiro, a software engineer based in NYC specializing in frontend and architecture.',
  },
  '3d': {
    title: 'Jeff Shapiro | Software Engineer',
    description: 'Jeff Shapiro is a software engineer based in NYC',
  },
};

export function App() {
  const location = useLocation();
  const navigate = useNavigate();
  const mode: Mode = PATH_TO_MODE[location.pathname] ?? 'chat';

  const [party, setParty] = useState(false);
  const [partyMsg] = useState(() => PARTY_MESSAGES[Math.floor(Math.random() * PARTY_MESSAGES.length)]);
  const clickCount = useRef(0);
  const clickTimer = useRef<ReturnType<typeof setTimeout> | null>(null);

  useEffect(() => {
    const { title, description } = META[mode];
    document.title = title;
    document.querySelector('meta[name="description"]')?.setAttribute('content', description);
    document.querySelector('meta[property="og:title"]')?.setAttribute('content', title);
    document.querySelector('meta[property="og:description"]')?.setAttribute('content', description);
    document.querySelector('meta[name="twitter:title"]')?.setAttribute('content', title);
    document.querySelector('meta[name="twitter:description"]')?.setAttribute('content', description);
  }, [mode]);

  function handleModeChange(next: Mode) {
    navigate(MODE_TO_PATH[next]);
  }

  function handleWordmarkClick() {
    clickCount.current += 1;
    if (clickTimer.current) clearTimeout(clickTimer.current);
    clickTimer.current = setTimeout(() => { clickCount.current = 0; }, 800);

    if (clickCount.current >= 5) {
      clickCount.current = 0;
      setParty(true);
      setTimeout(() => setParty(false), 3000);
      confetti({ particleCount: 120, spread: 80, origin: { y: 0.3 } });
    }
  }

  return (
    <div className={`app${party ? ' app--party' : ''}`}>
      {party && <div className="party-toast">{partyMsg}</div>}
      <header className="app__header">
        <span className="app__wordmark" onClick={handleWordmarkClick} role="button" tabIndex={0}>js</span>
        <ModeNav mode={mode} onChange={handleModeChange} />
      </header>
      <main className="app__main">
        <Routes>
          <Route path="/" element={<ChatMode />} />
          <Route path="/resume" element={<ResumeMode />} />
          <Route path="/3d" element={<ThreeDMode />} />
        </Routes>
      </main>
    </div>
  );
}

export default App;
