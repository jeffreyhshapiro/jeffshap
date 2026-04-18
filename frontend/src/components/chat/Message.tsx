import type { Message as MessageType } from '../../types';

interface Props {
  message: MessageType;
  isStreamingThis: boolean;
}

export function Message({ message, isStreamingThis }: Props) {
  return (
    <div className={`message message--${message.role}`}>
      <div className="message__content">
        {message.content}
        {isStreamingThis && <span className="cursor" aria-hidden />}
      </div>
    </div>
  );
}
