import { useChat } from '../../hooks/useChat';
import { MessageList } from './MessageList';
import { InputBar } from './InputBar';
import { SuggestedPrompts } from './SuggestedPrompts';

export function ChatMode() {
  const { messages, isStreaming, error, sendMessage } = useChat();
  const isEmpty = messages.length === 0;

  return (
    <div className="chat-mode">
      <div className="chat-mode__history">
        {isEmpty ? (
          <div className="chat-mode__empty">
            <p className="chat-mode__intro">
              I'm an AI built to talk about Jeff's work. What would you like to know?
            </p>
            <SuggestedPrompts onSelect={sendMessage} disabled={isStreaming} />
          </div>
        ) : (
          <MessageList messages={messages} isStreaming={isStreaming} />
        )}
        {error && <div className="chat-mode__error">{error}</div>}
      </div>
      <div className="chat-mode__input">
        <InputBar onSend={sendMessage} disabled={isStreaming} />
        <p className="chat-mode__disclaimer">The information in this chat may be incomplete or a little inaccurate, however the spirit is correct!</p>
      </div>
    </div>
  );
}
