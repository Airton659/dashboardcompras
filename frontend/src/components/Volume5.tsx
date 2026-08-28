import { Fragment } from 'react';

interface Volume {
  receb: number;
  aut: number;
  dev: number;
  canc: number;
  pend: number;
}

export function Volume5({ v }: { v: Volume }) {
  const items = [
    { l: 'Recebidos', v: v.receb, c: '#475569' },
    { l: 'Autorizados', v: v.aut, c: '#2FA35A' },
    { l: 'Devolvidos', v: v.dev, c: '#D64545' },
    { l: 'Cancelados', v: v.canc, c: '#94a3b8' },
    { l: 'Pendentes de autorização', v: v.pend, c: '#1E2D7D' },
  ];

  return (
    <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-around', height: '100%' }}>
      {items.map((x, i) => (
        <Fragment key={x.l}>
          {i > 0 && <div style={{ width: '2px', height: '6vh', background: 'var(--line)' }} />}
          <div style={{ textAlign: 'center', padding: '0 .2vw' }}>
            <div className="tnum" style={{ fontWeight: 900, fontSize: '4.6vh', color: x.c, lineHeight: 1 }}>
              {x.v}
            </div>
            <div
              style={{
                fontSize: '1.1vh',
                textTransform: 'uppercase',
                fontWeight: 700,
                color: 'var(--slate2)',
                marginTop: '.5vh',
                maxWidth: '8.5vw',
                lineHeight: 1.2,
                marginLeft: 'auto',
                marginRight: 'auto',
              }}
            >
              {x.l}
            </div>
          </div>
        </Fragment>
      ))}
    </div>
  );
}
