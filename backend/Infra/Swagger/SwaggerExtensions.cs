using Microsoft.OpenApi.Models;

namespace DashboardCorrente.Infra.Swagger;

public static class SwaggerExtensions
{
    public static IServiceCollection AddDashboardCorrenteSwagger(this IServiceCollection services)
    {
        services.AddEndpointsApiExplorer();
        services.AddSwaggerGen(options =>
        {
            options.SwaggerDoc("v1", new OpenApiInfo { Title = "Dashboard Corrente API", Version = "v1" });
        });

        return services;
    }
}
