interface LinhaAtraso {
  label: string;
  dentro: number;
  fora: number;
  pct: number;
}

function corFaixa(p: number): string {
  return p < 50 ? '#E0A020' : '#D64545';
}

export function Heatmap({ rows }: { rows: LinhaAtraso[] }) {
  return (
    <div style={{ width: '100%' }}>
      {rows.map((r) => (
        <div key={r.label} style={{ display: 'flex', alignItems: 'center', gap: '.7vw', marginBottom: '.5vh' }}>
          <span
            style={{
              width: '12vw',
              textAlign: 'right',
              fontSize: '1.4vh',
              color: '#475569',
              whiteSpace: 'nowrap',
              overflow: 'hidden',
              textOverflow: 'ellipsis',
            }}
          >
            {r.label}
          </span>
          <div style={{ display: 'flex', gap: '.5vw', flex: 1 }}>
            <div
              className="tnum"
              style={{
                flex: 1,
                height: '2.6vh',
                borderRadius: '.6vh',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                color: '#fff',
                fontSize: '1.45vh',
                fontWeight: 700,
                background: '#94a3b8',
              }}
            >
              {r.dentro}
            </div>
            <div
              className="tnum"
              style={{
                flex: 1,
                height: '2.6vh',
                borderRadius: '.6vh',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                color: '#fff',
                fontSize: '1.45vh',
                fontWeight: 700,
                background: corFaixa(r.pct),
              }}
            >
              {r.fora} ({r.pct}%)
            </div>
          </div>
          <span className="tnum" style={{ width: '3.4vw', textAlign: 'right', fontSize: '1.45vh', fontWeight: 800, color: '#334155' }}>
            {r.dentro + r.fora}
          </span>
        </div>
      ))}
      <div style={{ display: 'flex', alignItems: 'center', gap: '.7vw', marginTop: '.2vh' }}>
        <span style={{ width: '12vw' }} />
        <div style={{ display: 'flex', gap: '.5vw', flex: 1 }}>
          <span style={{ flex: 1, textAlign: 'center', fontSize: '1.2vh', color: '#94a3b8' }}>No prazo</span>
          <span style={{ flex: 1, textAlign: 'center', fontSize: '1.2vh', color: '#94a3b8' }}>Em atraso</span>
        </div>
        <span style={{ width: '3.4vw', textAlign: 'right', fontSize: '1.2vh', color: '#94a3b8' }}>Total</span>
      </div>
      <div style={{ display: 'flex', alignItems: 'center', gap: '.7vw', marginTop: '.5vh' }}>
        <span style={{ width: '12vw' }} />
        <div style={{ display: 'flex', gap: '.5vw', flex: 1 }}>
          <span style={{ flex: 1 }} />
          <div className="legend" style={{ flex: 1, justifyContent: 'center', marginTop: 0 }}>
            <div className="lg">
              <span className="sw" style={{ background: '#E0A020' }} />
              Até 50%
            </div>
            <div className="lg">
              <span className="sw" style={{ background: '#D64545' }} />
              Acima de 50%
            </div>
          </div>
        </div>
        <span style={{ width: '3.4vw' }} />
      </div>
    </div>
  );
}
