import { Link } from 'react-router-dom';
import { useChat } from '../../hooks/useChat';
import { MessageList } from './MessageList';
import { InputBar } from './InputBar';
import { SuggestedPrompts } from './SuggestedPrompts';

export function ChatMode() {
  const { messages, isStreaming, error, sendMessage, clearMessages } = useChat();
  const isEmpty = messages.length === 0;

  return (
    <div className="chat-mode">
      <div className="chat-mode__history">
        {isEmpty ? (
          <div className="chat-mode__empty">
            <p className="chat-mode__intro">
              Hi! Welcome to{" "}
              <a
                href="https://linkedin.com/in/jeffreyhshapiro"
                target="_blank"
                rel="noreferrer"
                className="chat-mode__intro-link"
              >
                Jeff Shapiro
              </a>
              's portfolio.
            </p>
            <p className="chat-mode__subline">
              Instead of reading a <Link to="/resume" className="chat-mode__intro-link">boring old resume</Link>, please have fun getting to know about my work and career with an AI chatbot
            </p>
          </div>
        ) : (
          <>
            <MessageList messages={messages} isStreaming={isStreaming} />
            <div className="chat-mode__clear">
              <button
                className="chat-mode__clear-btn"
                onClick={clearMessages}
                disabled={isStreaming}
              >
                clear conversation
              </button>
            </div>
          </>
        )}
        {error && <div className="chat-mode__error">{error}</div>}
      </div>
      <div className="chat-mode__input">
        <SuggestedPrompts onSelect={sendMessage} disabled={isStreaming} />
        <InputBar onSend={sendMessage} disabled={isStreaming} />
        <p className="chat-mode__disclaimer">
          The information in this chat may be incomplete or a little inaccurate,
          however the spirit is correct!
        </p>
      </div>
    </div>
  );
}
