export interface StatusPedido {
  estourados: number;
  risco: number;
  tranquilos: number;
}

export interface AderenciaSla {
  percentualDentroPrazo: number;
  metaPercentual: number;
}

export interface Devolucao {
  semDevolucao: number;
  devolvidos: number;
  taxaPercentual: number;
}

export interface Reincidencia {
  umaVez: number;
  reincidente: number;
  taxaPercentual: number;
}

export interface EconomiaNegociacao {
  valorCotado: number;
  valorNegociado: number;
  economia: number;
}

export interface DesempenhoComprador {
  comprador: string;
  codigo: string;
  dentroPrazo: number;
  foraPrazo: number;
  percentualDentroPrazo: number;
}

export interface ModalidadePorComprador {
  comprador: string;
  contratacaoDireta: number;
  solicitacaoOrcamento: number;
  coletaRapida: number;
}

export interface VolumeCompras {
  recebidos: number;
  autorizados: number;
  devolvidos: number;
  cancelados: number;
  pendentesAutorizacao: number;
}

export interface PeriodoAtual {
  volumeCompras: VolumeCompras;
  statusPedido: StatusPedido;
  aderenciaSla: AderenciaSla;
  modalidadePorComprador: ModalidadePorComprador[];
  desempenhoPorComprador: DesempenhoComprador[];
}

export interface PeriodoAno {
  statusPedido: StatusPedido;
  aderenciaSla: AderenciaSla;
  devolucao: Devolucao;
  reincidencia: Reincidencia;
  atrasosPorComprador: DesempenhoComprador[];
}

export interface DashboardResumo {
  atual: PeriodoAtual;
  ano: PeriodoAno;
  economia: EconomiaNegociacao;
}
