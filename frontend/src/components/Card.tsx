import type { ReactNode } from 'react';

interface CardProps {
  area: string;
  titulo: string;
  meta?: string;
  children: ReactNode;
}

export function Card({ area, titulo, meta, children }: CardProps) {
  return (
    <div className={`card a-${area}`}>
      <div className="chead">
        <span className="ct">{titulo}</span>
        {meta && <div className="card-meta">{meta}</div>}
      </div>
      <div className="cbody">{children}</div>
    </div>
  );
}
