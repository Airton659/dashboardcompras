import type { DashboardResumo } from '../types';
import { Cabecalho } from '../components/Cabecalho';
import { Card } from '../components/Card';
import { StackedBar } from '../components/StackedBar';
import { Heatmap } from '../components/Heatmap';
import { SlaComprador } from '../components/SlaComprador';
import { ModComprador } from '../components/ModComprador';
import { Volume5 } from '../components/Volume5';
import { Gauge } from '../components/Gauge';
import { DonutC } from '../components/DonutC';
import { EconomiaCard } from '../components/EconomiaCard';

const formatoMoeda = new Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL' });

interface PainelSlaProps {
  dados: DashboardResumo;
  ultimaAtualizacao: Date | null;
  atualizando: boolean;
}

export function PainelSla({ dados, ultimaAtualizacao, atualizando }: PainelSlaProps) {
  const {
    statusPedido,
    aderenciaSla,
    devolucao,
    reincidencia,
    economia,
    atrasosPorGrupoProduto,
    desempenhoPorComprador,
    modalidadePorComprador,
    volumeCompras,
  } = dados;

  return (
    <>
      <Cabecalho ultimaAtualizacao={ultimaAtualizacao} atualizando={atualizando} />
      <div className="grid">
        <Card area="status" titulo="Status do pedido">
          <StackedBar
            alturaVh={4}
            segmentos={[
              { label: 'Estourados', value: statusPedido.estourados, color: '#D64545' },
              { label: 'Risco', value: statusPedido.risco, color: '#E0A020' },
              { label: 'Tranquilos', value: statusPedido.tranquilos, color: '#2FA35A' },
            ]}
          />
        </Card>

        <Card area="aderencia" titulo="Aderência ao SLA">
          <Gauge percentual={aderenciaSla.percentualDentroPrazo} />
        </Card>

        <Card area="devolucao" titulo="Devolução e reincidência">
          <div style={{ display: 'flex', flexDirection: 'column', justifyContent: 'space-evenly', height: '100%' }}>
            <div>
              <div className="sublabel">Taxa de devolução</div>
              <DonutC
                tamanhoVh={8.5}
                centro={`${Math.round(devolucao.taxaPercentual)}%`}
                segmentos={[
                  { label: 'Sem devolução', value: devolucao.semDevolucao, color: '#2FA35A' },
                  { label: 'Devolvidos', value: devolucao.devolvidos, color: '#D64545' },
                ]}
              />
            </div>
            <div style={{ borderTop: '1px solid #f1f5f9', paddingTop: '.9vh' }}>
              <div className="sublabel">Reincidência</div>
              <DonutC
                tamanhoVh={8.5}
                centro={`${Math.round(reincidencia.taxaPercentual)}%`}
                segmentos={[
                  { label: '1 vez', value: reincidencia.umaVez, color: '#E0A020' },
                  { label: 'Reincidente', value: reincidencia.reincidente, color: '#D64545' },
                ]}
              />
            </div>
          </div>
        </Card>

        <Card area="economia" titulo="Economia em negociação">
          <EconomiaCard
            cotadoTxt={formatoMoeda.format(economia.valorCotado)}
            negTxt={formatoMoeda.format(economia.valorNegociado)}
            econTxt={formatoMoeda.format(economia.economia)}
          />
        </Card>

        <Card area="atrasos" titulo="Classificação de atrasos por grupo de produto — 7 maiores volumes">
          <Heatmap
            rows={atrasosPorGrupoProduto.map((g) => ({
              label: g.grupoProduto,
              dentro: g.noPrazo,
              fora: g.emAtraso,
              pct: Math.round(g.percentualAtraso),
            }))}
          />
        </Card>

        <Card area="desempenho" titulo="Desempenho do processo de compras">
          <SlaComprador
            rows={desempenhoPorComprador.map((d) => ({ nome: d.comprador, dentro: d.dentroPrazo, fora: d.foraPrazo }))}
          />
        </Card>

        <Card area="modalidade" titulo="Distribuição por modalidade por comprador">
          <ModComprador
            rows={modalidadePorComprador.map((m) => ({
              nome: m.comprador,
              cd: m.contratacaoDireta,
              so: m.solicitacaoOrcamento,
              cr: m.coletaRapida,
            }))}
          />
        </Card>

        <Card area="volume" titulo="Volume de compras processadas">
          <Volume5
            v={{
              receb: volumeCompras.recebidos,
              aut: volumeCompras.autorizados,
              dev: volumeCompras.devolvidos,
              canc: volumeCompras.cancelados,
              pend: volumeCompras.pendentesAutorizacao,
            }}
          />
        </Card>
      </div>
    </>
  );
}
