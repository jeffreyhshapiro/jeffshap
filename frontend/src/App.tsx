import { useState } from 'react';
import { ModeNav } from './components/ModeNav';
import { ChatMode } from './components/chat/ChatMode';
import { ResumeMode } from './components/ResumeMode';
import { ThreeDMode } from './components/ThreeDMode';
import type { Mode } from './types';

export function App() {
  const [mode, setMode] = useState<Mode>('chat');

  return (
    <div className="app">
      <header className="app__header">
        <span className="app__wordmark">js</span>
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
