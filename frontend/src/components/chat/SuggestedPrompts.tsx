const PROMPTS = [
  "Tell me about your career",
  "What are you working on?",
  "What's your background?",
  "How can I get in touch with you?",
  "Are you working on any fun projects?"
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
