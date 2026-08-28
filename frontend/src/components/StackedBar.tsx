interface Segmento {
  label: string;
  value: number;
  color: string;
}

export function StackedBar({ segmentos, alturaVh = 3.4 }: { segmentos: Segmento[]; alturaVh?: number }) {
  const total = segmentos.reduce((s, x) => s + x.value, 0);

  return (
    <>
      <div style={{ display: 'flex', width: '100%', height: `${alturaVh}vh`, borderRadius: '.8vh', overflow: 'hidden' }}>
        {segmentos.map((s) => {
          const w = (s.value / total) * 100;
          return (
            <div
              key={s.label}
              className="tnum"
              style={{
                width: `${w}%`,
                background: s.color,
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                color: '#fff',
                fontSize: '1.8vh',
                fontWeight: 800,
              }}
            >
              {w > 6 ? s.value : ''}
            </div>
          );
        })}
      </div>
      <div className="legend">
        {segmentos.map((s) => (
          <div className="lg" key={s.label}>
            <span className="sw" style={{ background: s.color }} />
            {s.label} <b className="tnum" style={{ marginLeft: '.2vw' }}>{s.value}</b>
          </div>
        ))}
      </div>
    </>
  );
}
