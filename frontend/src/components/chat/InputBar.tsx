import { useState, useRef, useEffect } from 'react';

interface Props {
  onSend: (content: string) => void;
  disabled: boolean;
}

export function InputBar({ onSend, disabled }: Props) {
  const [value, setValue] = useState('');
  const textareaRef = useRef<HTMLTextAreaElement>(null);

  useEffect(() => {
    if (textareaRef.current) {
      textareaRef.current.style.height = 'auto';
      textareaRef.current.style.height = `${textareaRef.current.scrollHeight}px`;
    }
  }, [value]);

  function handleKeyDown(e: React.KeyboardEvent<HTMLTextAreaElement>) {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      submit();
    }
  }

  function submit() {
    const trimmed = value.trim();
    if (!trimmed || disabled) return;
    onSend(trimmed);
    setValue('');
  }

  return (
    <div className="input-bar">
      <textarea
        ref={textareaRef}
        className="input-bar__textarea"
        value={value}
        onChange={(e) => setValue(e.target.value)}
        onKeyDown={handleKeyDown}
        placeholder="Ask me anything..."
        disabled={disabled}
        rows={1}
      />
      <button
        className="input-bar__send"
        onClick={submit}
        disabled={disabled || !value.trim()}
        aria-label="Send"
      >
        ↵
      </button>
    </div>
  );
}
