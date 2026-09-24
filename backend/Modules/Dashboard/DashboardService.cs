using DbConnector.Modules.Compras.Models;
using DbConnector.Modules.Compras.Queries;
using DashboardCorrente.Modules.Dashboard.Models;

namespace DashboardCorrente.Modules.Dashboard;

public class DashboardService(IPedidoCompraQueries pedidoCompraQueries)
{
    public async Task<DashboardResumo> ObterResumoAsync()
    {
        var pedidos = await pedidoCompraQueries.ListarAsync();
        var pedidosAtual = pedidos.Where(p => p.DataEntrada >= DateTime.Today.AddMonths(-3)).ToList();
        var pedidosAno = pedidos.Where(p => p.DataEntrada.Year == DateTime.Today.Year).ToList();

        return new DashboardResumo
        {
            Atual = new PeriodoAtual
            {
                VolumeCompras = MontarVolumeCompras(pedidosAtual),
                StatusPedido = MontarStatusPedido(pedidosAtual),
                AderenciaSla = MontarAderenciaSla(pedidosAtual),
                ModalidadePorComprador = MontarModalidadePorComprador(pedidosAtual),
                DesempenhoPorComprador = MontarDesempenhoPorComprador(pedidosAtual),
            },
            Ano = new PeriodoAno
            {
                StatusPedido = MontarStatusPedido(pedidosAno),
                AderenciaSla = MontarAderenciaSla(pedidosAno),
                Devolucao = MontarDevolucao(pedidosAno),
                Reincidencia = MontarReincidencia(pedidosAno),
                AtrasosPorComprador = MontarDesempenhoPorComprador(pedidosAno),
            },
            Economia = MontarEconomia(pedidos),
        };
    }

    static StatusPedido MontarStatusPedido(List<PedidoCompra> pedidos)
    {
        var abertos = pedidos.Where(p => p.Situacao == "Em aberto").ToList();
        var estourados = abertos.Count(p => p.StatusSla == "Fora do prazo");
        var risco = abertos.Count(p =>
            p.StatusSla == "Dentro do prazo" && p.DiasUteisEmCompras >= p.PrazoSlaDiasUteis * 0.7
        );
        var tranquilos = abertos.Count - estourados - risco;

        return new StatusPedido { Estourados = estourados, Risco = risco, Tranquilos = tranquilos };
    }

    static AderenciaSla MontarAderenciaSla(List<PedidoCompra> pedidos)
    {
        var concluidos = pedidos.Where(p => p.Situacao == "Concluido" && p.StatusSla is not null).ToList();
        var dentroPrazo = concluidos.Count(p => p.StatusSla == "Dentro do prazo");
        var percentual = concluidos.Count == 0 ? 0 : Math.Round(dentroPrazo * 100.0 / concluidos.Count, 1);

        return new AderenciaSla { PercentualDentroPrazo = percentual, MetaPercentual = 80 };
    }

    static Devolucao MontarDevolucao(List<PedidoCompra> pedidos)
    {
        var devolvidos = pedidos.Count(p => p.Situacao == "Devolvido");
        var taxa = pedidos.Count == 0 ? 0 : Math.Round(devolvidos * 100.0 / pedidos.Count, 1);

        return new Devolucao
        {
            SemDevolucao = pedidos.Count - devolvidos,
            Devolvidos = devolvidos,
            TaxaPercentual = taxa,
        };
    }

    static Reincidencia MontarReincidencia(List<PedidoCompra> pedidos)
    {
        var devolvidos = pedidos.Where(p => p.Situacao == "Devolvido").ToList();
        var reincidente = devolvidos.Count(p => p.IdMovPedidoDevolvido is not null);
        var taxa = devolvidos.Count == 0 ? 0 : Math.Round(reincidente * 100.0 / devolvidos.Count, 1);

        return new Reincidencia
        {
            UmaVez = devolvidos.Count - reincidente,
            Reincidente = reincidente,
            TaxaPercentual = taxa,
        };
    }

    static EconomiaNegociacao MontarEconomia(List<PedidoCompra> pedidos)
    {
        var cotado = pedidos.Sum(p => p.ValorCotado ?? 0);
        var negociado = pedidos.Sum(p => p.ValorNegociado ?? 0);

        return new EconomiaNegociacao { ValorCotado = cotado, ValorNegociado = negociado, Economia = cotado - negociado };
    }

    static List<DesempenhoComprador> MontarDesempenhoPorComprador(List<PedidoCompra> pedidos) =>
        pedidos
            .Where(p => p.Situacao == "Concluido" && p.NomeResponsavelCompras is not null && p.StatusSla is not null)
            .GroupBy(p => p.NomeResponsavelCompras!)
            .Select(g =>
            {
                var total = g.Count();
                var dentroPrazo = g.Count(p => p.StatusSla == "Dentro do prazo");
                return new DesempenhoComprador
                {
                    Comprador = g.Key,
                    Codigo = g.First().ChapaResponsavelCompras ?? "—",
                    DentroPrazo = dentroPrazo,
                    ForaPrazo = total - dentroPrazo,
                    PercentualDentroPrazo = total == 0 ? 0 : Math.Round(dentroPrazo * 100.0 / total, 1),
                };
            })
            .OrderBy(d => d.Comprador)
            .ToList();

    static List<ModalidadePorComprador> MontarModalidadePorComprador(List<PedidoCompra> pedidos) =>
        pedidos
            .Where(p => p.Modalidade is not null && p.NomeResponsavelCompras is not null)
            .GroupBy(p => p.NomeResponsavelCompras!)
            .Select(g => new ModalidadePorComprador
            {
                Comprador = g.Key,
                ContratacaoDireta = g.Count(p => p.Modalidade == "Contratacao Direta"),
                SolicitacaoOrcamento = g.Count(p => p.Modalidade == "Solicitacao de Orcamento"),
                ColetaRapida = g.Count(p => p.Modalidade == "Coleta Rapida"),
            })
            .OrderBy(m => m.Comprador)
            .ToList();

    static VolumeCompras MontarVolumeCompras(List<PedidoCompra> pedidos) =>
        new()
        {
            Recebidos = pedidos.Count,
            Autorizados = pedidos.Count(p => p.Situacao == "Concluido"),
            Devolvidos = pedidos.Count(p => p.Situacao == "Devolvido"),
            Cancelados = pedidos.Count(p => p.Situacao == "Cancelado"),
            PendentesAutorizacao = pedidos.Count(p => p.Situacao == "Em aberto"),
        };
}
