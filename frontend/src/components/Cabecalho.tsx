export function Cabecalho({ ultimaAtualizacao, atualizando }: { ultimaAtualizacao: Date | null; atualizando: boolean }) {
  return (
    <div className="top">
      <div className="brand">
        <span className="logo">FUNCESI</span>
        <span className="hbar" />
        <span className="htitle">Painel de SLA — Setor de Compras</span>
      </div>
      <span className="hmeta">
        Referência: {new Date().getFullYear()}
        {ultimaAtualizacao &&
          ` · Última atualização: ${ultimaAtualizacao.toLocaleString('pt-BR', { dateStyle: 'short', timeStyle: 'short' })}`}
        {atualizando && ' · atualizando…'}
      </span>
    </div>
  );
}
