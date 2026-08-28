import type { ReactNode } from 'react';

interface CardProps {
  area: string;
  titulo: string;
  children: ReactNode;
}

export function Card({ area, titulo, children }: CardProps) {
  return (
    <div className={`card a-${area}`}>
      <div className="chead">
        <span className="ct">{titulo}</span>
      </div>
      <div className="cbody">{children}</div>
    </div>
  );
}
