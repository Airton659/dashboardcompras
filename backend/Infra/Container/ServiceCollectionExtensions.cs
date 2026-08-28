using DbConnector.Shared.Infra.Container;
using DashboardCorrente.Infra.Swagger;
using DashboardCorrente.Modules.Dashboard;

namespace DashboardCorrente.Infra.Container;

public static class ServiceCollectionExtensions
{
    public static IServiceCollection AddDashboardCorrente(this IServiceCollection services, IConfiguration configuration)
    {
        services.AddDbConnector(configuration);
        services.AddDashboardCorrenteSwagger();
        services.AddScoped<DashboardService>();

        return services;
    }
}
