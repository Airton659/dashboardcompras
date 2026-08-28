namespace DashboardCorrente.Modules.Dashboard;

public static class DashboardHandlers
{
    public static async Task<IResult> ObterResumoAsync(DashboardService dashboard) =>
        Results.Ok(await dashboard.ObterResumoAsync());
}
