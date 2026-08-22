import type { ReactNode } from 'react';
import { useReveal } from '../hooks/useReveal';

interface Props {
  children: ReactNode;
  /** Stagger index — each step delays the reveal slightly. */
  order?: number;
  className?: string;
  as?: 'div' | 'section' | 'li' | 'article';
}

export function Reveal({ children, order = 0, className = '', as = 'div' }: Props) {
  const { ref, shown } = useReveal<HTMLElement>();
  const Tag = as;

  return (
    <Tag
      ref={ref as React.Ref<never>}
      className={`reveal${shown ? ' reveal--in' : ''}${className ? ` ${className}` : ''}`}
      style={order ? ({ '--reveal-delay': `${Math.min(order, 6) * 70}ms` } as React.CSSProperties) : undefined}
    >
      {children}
    </Tag>
  );
}
