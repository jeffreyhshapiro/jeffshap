import type { Mode } from '../types';

interface Props {
  mode: Mode;
  onChange: (mode: Mode) => void;
}

const MODES: { id: Mode; label: string; available: boolean }[] = [
  { id: 'chat', label: 'Chat', available: true },
  { id: 'resume', label: 'Resume', available: true },
  // { id: '3d', label: '3D', available: false },
];

export function ModeNav({ mode, onChange }: Props) {
  return (
    <nav className="mode-nav" aria-label="Site modes">
      {MODES.map((m) => (
        <button
          key={m.id}
          className={`mode-nav__btn${mode === m.id ? ' mode-nav__btn--active' : ''}${!m.available ? ' mode-nav__btn--disabled' : ''}`}
          onClick={() => m.available && onChange(m.id)}
          disabled={!m.available}
          title={m.available ? undefined : 'Coming soon'}
          aria-current={mode === m.id ? 'page' : undefined}
        >
          {m.label}
        </button>
      ))}
    </nav>
  );
}
