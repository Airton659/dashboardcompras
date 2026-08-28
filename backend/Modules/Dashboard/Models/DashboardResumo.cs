namespace DashboardCorrente.Modules.Dashboard.Models;

public record DashboardResumo
{
    public required StatusPedido StatusPedido { get; init; }
    public required AderenciaSla AderenciaSla { get; init; }
    public required Devolucao Devolucao { get; init; }
    public required Reincidencia Reincidencia { get; init; }
    public required EconomiaNegociacao Economia { get; init; }
    public required List<AtrasoGrupoProduto> AtrasosPorGrupoProduto { get; init; }
    public required List<DesempenhoComprador> DesempenhoPorComprador { get; init; }
    public required List<ModalidadePorComprador> ModalidadePorComprador { get; init; }
    public required VolumeCompras VolumeCompras { get; init; }
}

public record StatusPedido
{
    public required int Estourados { get; init; }
    public required int Risco { get; init; }
    public required int Tranquilos { get; init; }
}

public record AderenciaSla
{
    public required double PercentualDentroPrazo { get; init; }
    public required int MetaPercentual { get; init; }
}

public record Devolucao
{
    public required int SemDevolucao { get; init; }
    public required int Devolvidos { get; init; }
    public required double TaxaPercentual { get; init; }
}

public record Reincidencia
{
    public required int UmaVez { get; init; }
    public required int Reincidente { get; init; }
    public required double TaxaPercentual { get; init; }
}

public record EconomiaNegociacao
{
    public required decimal ValorCotado { get; init; }
    public required decimal ValorNegociado { get; init; }
    public required decimal Economia { get; init; }
}

public record AtrasoGrupoProduto
{
    public required string GrupoProduto { get; init; }
    public required int NoPrazo { get; init; }
    public required int EmAtraso { get; init; }
    public required double PercentualAtraso { get; init; }
}

public record DesempenhoComprador
{
    public required string Comprador { get; init; }
    public required int DentroPrazo { get; init; }
    public required int ForaPrazo { get; init; }
    public required double PercentualDentroPrazo { get; init; }
}

public record ModalidadePorComprador
{
    public required string Comprador { get; init; }
    public required int ContratacaoDireta { get; init; }
    public required int SolicitacaoOrcamento { get; init; }
    public required int ColetaRapida { get; init; }
}

public record VolumeCompras
{
    public required int Recebidos { get; init; }
    public required int Autorizados { get; init; }
    public required int Devolvidos { get; init; }
    public required int Cancelados { get; init; }
    public required int PendentesAutorizacao { get; init; }
}
