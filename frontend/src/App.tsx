import { useState, useRef } from 'react';
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

export function App() {
  const [mode, setMode] = useState<Mode>('chat');
  const [party, setParty] = useState(false);
  const [partyMsg] = useState(() => PARTY_MESSAGES[Math.floor(Math.random() * PARTY_MESSAGES.length)]);
  const clickCount = useRef(0);
  const clickTimer = useRef<ReturnType<typeof setTimeout> | null>(null);

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
        <ModeNav mode={mode} onChange={setMode} />
      </header>
      <main className="app__main">
        {mode === 'chat' && <ChatMode />}
        {mode === 'resume' && <ResumeMode />}
        {mode === '3d' && <ThreeDMode />}
      </main>
    </div>
  );
}

export default App;
