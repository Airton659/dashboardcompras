interface LinhaModalidade {
  contratacaoDireta: number;
  solicitacaoOrcamento: number;
  coletaRapida: number;
}

const SEGMENTOS = [
  { chave: 'contratacaoDireta' as const, label: 'Contratação Direta', color: '#2FA35A' },
  { chave: 'solicitacaoOrcamento' as const, label: 'Sol. de Orçamento', color: '#1E2D7D' },
  { chave: 'coletaRapida' as const, label: 'Coleta Rápida', color: '#0F766E' },
];

export function ModalidadePercentual({ rows }: { rows: LinhaModalidade[] }) {
  const totais = {
    contratacaoDireta: rows.reduce((s, r) => s + r.contratacaoDireta, 0),
    solicitacaoOrcamento: rows.reduce((s, r) => s + r.solicitacaoOrcamento, 0),
    coletaRapida: rows.reduce((s, r) => s + r.coletaRapida, 0),
  };
  const total = totais.contratacaoDireta + totais.solicitacaoOrcamento + totais.coletaRapida;

  return (
    <>
      <div className="modpct-bar">
        {SEGMENTOS.map((s) => {
          const v = totais[s.chave];
          const pct = total === 0 ? 0 : Math.round((v / total) * 100);
          return (
            <span key={s.chave} style={{ width: `${pct}%`, background: s.color }}>
              {pct}%
            </span>
          );
        })}
      </div>
      <div className="legend">
        {SEGMENTOS.map((s) => (
          <div className="lg" key={s.chave}>
            <span className="sw" style={{ background: s.color }} />
            {s.label} <b className="tnum">{totais[s.chave]}</b>
          </div>
        ))}
      </div>
    </>
  );
}
