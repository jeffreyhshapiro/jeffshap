import DOMPurify from 'dompurify';
import type { Message as MessageType } from '../../types';

DOMPurify.addHook('afterSanitizeAttributes', (node) => {
  if (node.tagName === 'A') {
    node.setAttribute('target', '_blank');
    node.setAttribute('rel', 'noreferrer');
  }
});

const MARKDOWN_LINK_RE = /\[([^\]]+)\]\((https?:\/\/[^)]+)\)/g;

function render(content: string): string {
  const withLinks = content.replace(MARKDOWN_LINK_RE, (_, text, url) =>
    `<a href="${url}">${text}</a>`
  );
  return DOMPurify.sanitize(withLinks, {
    ALLOWED_TAGS: ['a'],
    ALLOWED_ATTR: ['href', 'target', 'rel'],
  });
}

interface Props {
  message: MessageType;
  isStreamingThis: boolean;
}

export function Message({ message, isStreamingThis }: Props) {
  return (
    <div className={`message message--${message.role}`}>
      <div
        className="message__content"
        dangerouslySetInnerHTML={{ __html: render(message.content) }}
      />
      {isStreamingThis && <span className="cursor" aria-hidden />}
    </div>
  );
}
