import type { DashboardResumo } from '../types';
import { Cabecalho } from '../components/Cabecalho';
import { Card } from '../components/Card';
import { StackedBar } from '../components/StackedBar';
import { Heatmap } from '../components/Heatmap';
import { DesempenhoModalidade } from '../components/DesempenhoModalidade';
import { ModalidadePercentual } from '../components/ModalidadePercentual';
import { Volume5 } from '../components/Volume5';
import { Gauge } from '../components/Gauge';
import { DonutC } from '../components/DonutC';
import { EconomiaBanner } from '../components/EconomiaBanner';

function abreviarMes(data: Date): string {
  return new Intl.DateTimeFormat('pt-BR', { month: 'short' }).format(data).replace('.', '');
}

function periodoAtual(hoje: Date): string {
  const inicio = new Date(hoje);
  inicio.setMonth(inicio.getMonth() - 3);
  return `últimos 3 meses · ${abreviarMes(inicio)}–${abreviarMes(hoje)}/${hoje.getFullYear()}`;
}

function periodoAno(hoje: Date): string {
  const inicio = new Date(hoje.getFullYear(), 0, 1);
  return `acumulado ${hoje.getFullYear()} · ${abreviarMes(inicio)}–${abreviarMes(hoje)}/${hoje.getFullYear()}`;
}

interface PainelSlaProps {
  dados: DashboardResumo;
  ultimaAtualizacao: Date | null;
  atualizando: boolean;
}

export function PainelSla({ dados, ultimaAtualizacao, atualizando }: PainelSlaProps) {
  const { atual, ano, economia } = dados;
  const hoje = new Date();

  return (
    <>
      <Cabecalho ultimaAtualizacao={ultimaAtualizacao} atualizando={atualizando} />
      <div className="main">
        <EconomiaBanner economia={economia} />

        <div className="columns">
          <div className="col">
            <div className="col-head">
              <h2>Atual</h2>
              <span className="range">{periodoAtual(hoje)}</span>
            </div>
            <div className="col-stack">
              <Card area="volume-atual" titulo="Volume de compras processadas">
                <Volume5
                  v={{
                    receb: atual.volumeCompras.recebidos,
                    aut: atual.volumeCompras.autorizados,
                    dev: atual.volumeCompras.devolvidos,
                    canc: atual.volumeCompras.cancelados,
                    pend: atual.volumeCompras.pendentesAutorizacao,
                  }}
                />
              </Card>

              <Card area="status-atual" titulo="Pendentes de autorização 2026">
                <StackedBar
                  alturaVh={2.6}
                  segmentos={[
                    { label: 'Estourados', value: atual.statusPedido.estourados, color: '#D64545' },
                    { label: 'Risco', value: atual.statusPedido.risco, color: '#E0A020' },
                    { label: 'Tranquilos', value: atual.statusPedido.tranquilos, color: '#2FA35A' },
                  ]}
                />
              </Card>

              <Card area="aderencia-atual" titulo="Aderência ao SLA">
                <Gauge percentual={atual.aderenciaSla.percentualDentroPrazo} alturaVh={6.5} />
              </Card>

              <Card area="modpct" titulo="% de pedidos por modalidade">
                <ModalidadePercentual rows={atual.modalidadePorComprador} />
              </Card>

              <Card
                area="grafico03"
                titulo="Desempenho + modalidade por comprador"
                meta="cor = mix de modalidade · selo = % concluído no prazo"
              >
                <DesempenhoModalidade desempenho={atual.desempenhoPorComprador} modalidade={atual.modalidadePorComprador} />
              </Card>
            </div>
          </div>

          <div className="col">
            <div className="col-head">
              <h2>Ano</h2>
              <span className="range">{periodoAno(hoje)}</span>
            </div>
            <div className="col-stack">
              <Card area="status-ano" titulo="Pendentes de autorização 2026">
                <StackedBar
                  alturaVh={2.6}
                  segmentos={[
                    { label: 'Estourados', value: ano.statusPedido.estourados, color: '#D64545' },
                    { label: 'Risco', value: ano.statusPedido.risco, color: '#E0A020' },
                    { label: 'Tranquilos', value: ano.statusPedido.tranquilos, color: '#2FA35A' },
                  ]}
                />
              </Card>

              <Card area="aderencia-ano" titulo="Aderência ao SLA">
                <Gauge percentual={ano.aderenciaSla.percentualDentroPrazo} alturaVh={6.5} />
              </Card>

              <Card area="devolucao" titulo="Devolução e reincidência">
                <div style={{ display: 'flex', flexDirection: 'column', justifyContent: 'space-evenly', height: '100%' }}>
                  <div>
                    <div className="sublabel">Taxa de devolução</div>
                    <DonutC
                      tamanhoVh={5}
                      centro={`${Math.round(ano.devolucao.taxaPercentual)}%`}
                      segmentos={[
                        { label: 'Sem devolução', value: ano.devolucao.semDevolucao, color: '#2FA35A' },
                        { label: 'Devolvidos', value: ano.devolucao.devolvidos, color: '#D64545' },
                      ]}
                    />
                  </div>
                  <div style={{ borderTop: '1px solid #f1f5f9', paddingTop: '.5vh' }}>
                    <div className="sublabel">Reincidência</div>
                    <DonutC
                      tamanhoVh={5}
                      centro={`${Math.round(ano.reincidencia.taxaPercentual)}%`}
                      segmentos={[
                        { label: '1 vez', value: ano.reincidencia.umaVez, color: '#E0A020' },
                        { label: 'Reincidente', value: ano.reincidencia.reincidente, color: '#D64545' },
                      ]}
                    />
                  </div>
                </div>
              </Card>

              <Card
                area="atrasos-comprador"
                titulo="Classificação de atrasos por comprador"
                meta="Considerando apenas pedidos autorizados"
              >
                <Heatmap
                  rows={ano.atrasosPorComprador.map((d) => ({
                    label: d.codigo,
                    dentro: d.dentroPrazo,
                    fora: d.foraPrazo,
                    pct: Math.round(100 - d.percentualDentroPrazo),
                  }))}
                />
              </Card>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
