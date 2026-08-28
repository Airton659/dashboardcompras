interface LinhaModalidade {
  nome: string;
  cd: number;
  so: number;
  cr: number;
}

const SEGMENTOS_MODALIDADE = [
  { chave: 'cd' as const, label: 'Contratação Direta', color: '#2FA35A' },
  { chave: 'so' as const, label: 'Solicitação de Orçamento', color: '#1E2D7D' },
  { chave: 'cr' as const, label: 'Coleta Rápida', color: '#0F766E' },
];

export function ModComprador({ rows }: { rows: LinhaModalidade[] }) {
  const ordenado = [...rows].sort((a, b) => a.nome.localeCompare(b.nome, 'pt'));

  return (
    <div style={{ width: '100%' }}>
      {ordenado.map((r) => {
        const t = r.cd + r.so + r.cr;
        return (
          <div key={r.nome} style={{ display: 'flex', alignItems: 'center', gap: '.7vw', marginBottom: '.75vh' }}>
            <span
              style={{
                width: '9vw',
                textAlign: 'right',
                fontSize: '1.45vh',
                color: '#475569',
                whiteSpace: 'nowrap',
                overflow: 'hidden',
                textOverflow: 'ellipsis',
              }}
            >
              {r.nome}
            </span>
            <div style={{ flex: 1, display: 'flex', height: '2.7vh', borderRadius: '.6vh', overflow: 'hidden' }}>
              {SEGMENTOS_MODALIDADE.map((s) => {
                const v = r[s.chave];
                const w = (v / t) * 100;
                return (
                  <div
                    key={s.chave}
                    className="tnum"
                    style={{
                      width: `${w}%`,
                      background: s.color,
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      color: '#fff',
                      fontSize: '1.3vh',
                      fontWeight: 700,
                    }}
                  >
                    {w > 8 ? v : ''}
                  </div>
                );
              })}
            </div>
            <span className="tnum" style={{ width: '3.2vw', textAlign: 'right', fontSize: '1.4vh', fontWeight: 800, color: '#334155' }}>
              {t}
            </span>
          </div>
        );
      })}
      <div className="legend" style={{ justifyContent: 'center' }}>
        {SEGMENTOS_MODALIDADE.map((s) => (
          <div className="lg" key={s.chave}>
            <span className="sw" style={{ background: s.color }} />
            {s.label}
          </div>
        ))}
      </div>
    </div>
  );
}
