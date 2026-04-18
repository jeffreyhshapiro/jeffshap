import { useEffect, useRef } from 'react';
import { Message } from './Message';
import type { Message as MessageType } from '../../types';

interface Props {
  messages: MessageType[];
  isStreaming: boolean;
}

export function MessageList({ messages, isStreaming }: Props) {
  const bottomRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  return (
    <div className="message-list">
      {messages.map((m, i) => (
        <Message
          key={m.id}
          message={m}
          isStreamingThis={isStreaming && i === messages.length - 1 && m.role === 'assistant'}
        />
      ))}
      <div ref={bottomRef} />
    </div>
  );
}
