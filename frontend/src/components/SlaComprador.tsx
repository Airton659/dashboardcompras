interface LinhaComprador {
  nome: string;
  dentro: number;
  fora: number;
}

export function SlaComprador({ rows }: { rows: LinhaComprador[] }) {
  const ordenado = [...rows].sort((a, b) => a.nome.localeCompare(b.nome, 'pt'));

  return (
    <div style={{ width: '100%' }}>
      {ordenado.map((r) => {
        const t = r.dentro + r.fora;
        const pd = Math.round((r.dentro / t) * 100);
        return (
          <div key={r.nome} style={{ display: 'flex', alignItems: 'center', gap: '.8vw', marginBottom: '.85vh' }}>
            <span
              style={{
                width: '9vw',
                textAlign: 'right',
                fontSize: '1.5vh',
                color: '#475569',
                whiteSpace: 'nowrap',
                overflow: 'hidden',
                textOverflow: 'ellipsis',
              }}
            >
              {r.nome}
            </span>
            <div style={{ flex: 1, display: 'flex', height: '2.8vh', borderRadius: '.6vh', overflow: 'hidden' }}>
              <div
                className="tnum"
                style={{
                  width: `${pd}%`,
                  background: '#2FA35A',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  color: '#fff',
                  fontSize: '1.4vh',
                  fontWeight: 700,
                }}
              >
                {pd > 10 ? r.dentro : ''}
              </div>
              <div
                className="tnum"
                style={{
                  width: `${100 - pd}%`,
                  background: '#D64545',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  color: '#fff',
                  fontSize: '1.4vh',
                  fontWeight: 700,
                }}
              >
                {100 - pd > 8 ? r.fora : ''}
              </div>
            </div>
            <span className="tnum" style={{ width: '4vw', textAlign: 'right', fontSize: '1.7vh', fontWeight: 800, color: '#1e293b' }}>
              {pd}%
            </span>
          </div>
        );
      })}
      <div className="legend">
        <div className="lg">
          <span className="sw" style={{ background: '#2FA35A' }} />
          Dentro do prazo
        </div>
        <div className="lg">
          <span className="sw" style={{ background: '#D64545' }} />
          Fora do prazo
        </div>
      </div>
    </div>
  );
}
