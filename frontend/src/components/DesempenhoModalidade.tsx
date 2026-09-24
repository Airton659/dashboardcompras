interface LinhaDesempenho {
  comprador: string;
  codigo: string;
  percentualDentroPrazo: number;
}

interface LinhaModalidade {
  comprador: string;
  contratacaoDireta: number;
  solicitacaoOrcamento: number;
  coletaRapida: number;
}

const SEGMENTOS_MODALIDADE = [
  { chave: 'contratacaoDireta' as const, label: 'Contratação Direta', color: '#2FA35A' },
  { chave: 'solicitacaoOrcamento' as const, label: 'Solicitação de Orçamento', color: '#1E2D7D' },
  { chave: 'coletaRapida' as const, label: 'Coleta Rápida', color: '#0F766E' },
];

function classePill(pct: number): string {
  if (pct >= 80) return 'pill pill-good';
  if (pct >= 60) return 'pill pill-warn';
  return 'pill pill-crit';
}

export function DesempenhoModalidade({
  desempenho,
  modalidade,
}: {
  desempenho: LinhaDesempenho[];
  modalidade: LinhaModalidade[];
}) {
  const modalidadePorComprador = new Map(modalidade.map((m) => [m.comprador, m]));
  const totais = modalidade.map((m) => m.contratacaoDireta + m.solicitacaoOrcamento + m.coletaRapida);
  const maiorTotal = Math.max(1, ...totais);
  const ordenado = [...desempenho].sort((a, b) => a.comprador.localeCompare(b.comprador, 'pt'));

  return (
    <>
      <div className="row-list">
        {ordenado.map((d) => {
          const m = modalidadePorComprador.get(d.comprador);
          const total = m ? m.contratacaoDireta + m.solicitacaoOrcamento + m.coletaRapida : 0;
          const larguraBarra = (total / maiorTotal) * 100;
          return (
            <div className="comp-row" key={d.comprador}>
              <span className="comp-name">{d.codigo}</span>
              <div className="comp-bar-wrap" style={{ width: `${larguraBarra}%` }}>
                {m &&
                  SEGMENTOS_MODALIDADE.map((s) => {
                    const v = m[s.chave];
                    const w = total === 0 ? 0 : (v / total) * 100;
                    return (
                      <div key={s.chave} className="tnum" style={{ width: `${w}%`, background: s.color }}>
                        {w > 10 ? v : ''}
                      </div>
                    );
                  })}
              </div>
              <span className={classePill(d.percentualDentroPrazo)}>{Math.round(d.percentualDentroPrazo)}%</span>
            </div>
          );
        })}
      </div>
      <div className="legend" style={{ justifyContent: 'center' }}>
        {SEGMENTOS_MODALIDADE.map((s) => (
          <div className="lg" key={s.chave}>
            <span className="sw" style={{ background: s.color }} />
            {s.label}
          </div>
        ))}
      </div>
    </>
  );
}
