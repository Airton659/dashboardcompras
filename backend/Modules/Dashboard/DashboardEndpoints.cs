namespace DashboardCorrente.Modules.Dashboard;

public static class DashboardEndpoints
{
    public static IEndpointRouteBuilder MapDashboardEndpoints(this IEndpointRouteBuilder app)
    {
        app.MapGet("/api/dashboard", DashboardHandlers.ObterResumoAsync);

        return app;
    }
}
