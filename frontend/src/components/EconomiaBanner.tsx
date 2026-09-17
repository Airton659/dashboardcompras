interface EconomiaBannerProps {
  economia: { valorCotado: number; valorNegociado: number; economia: number };
}

const formatoMoeda = new Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL' });

export function EconomiaBanner({ economia }: EconomiaBannerProps) {
  const percentualNegociado = economia.valorCotado === 0 ? 0 : (economia.valorNegociado / economia.valorCotado) * 100;
  const percentualDiferenca = economia.valorCotado === 0 ? 0 : (economia.economia / economia.valorCotado) * 100;

  return (
    <div className="card banner">
      <div>
        <div className="eco-label">Economia em negociação</div>
        <div className="eco-figure tnum">{formatoMoeda.format(economia.economia)}</div>
      </div>
      <div className="compare">
        <div className="compare-line cotado">
          <span>Cotado</span>
          <b className="tnum">{formatoMoeda.format(economia.valorCotado)}</b>
        </div>
        <div className="compare-line negociado">
          <span>Negociado</span>
          <b className="tnum">{formatoMoeda.format(economia.valorNegociado)}</b>
        </div>
        <div className="compare-track">
          <div className="compare-fill" style={{ width: `${percentualNegociado}%` }} />
        </div>
      </div>
      <div className="obs">
        Diferença de {percentualDiferenca.toFixed(2).replace('.', ',')}% do valor cotado. Campo "desconto" da cotação:
        disponibilidade em verificação no RM.
      </div>
    </div>
  );
}
