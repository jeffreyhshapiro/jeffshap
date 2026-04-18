const PROMPTS = [
  "What are you working on?",
  "What's your background?",
  "Tell me about Tab Cafe",
  "How do you think about frontend architecture?",
];

interface Props {
  onSelect: (prompt: string) => void;
  disabled: boolean;
}

export function SuggestedPrompts({ onSelect, disabled }: Props) {
  return (
    <div className="suggested-prompts">
      {PROMPTS.map((p) => (
        <button
          key={p}
          className="prompt-chip"
          onClick={() => onSelect(p)}
          disabled={disabled}
        >
          {p}
        </button>
      ))}
    </div>
  );
}
