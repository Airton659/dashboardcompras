using DashboardCorrente.Infra.Container;
using DashboardCorrente.Modules.Dashboard;
using DotNetEnv;

Env.NoClobber().TraversePath().Load();

var builder = WebApplication.CreateBuilder(args);
builder.Services.AddDashboardCorrente(builder.Configuration);

var app = builder.Build();

if (app.Environment.IsDevelopment())
{
    app.UseSwagger();
    app.UseSwaggerUI();
}

app.MapDashboardEndpoints();

await app.RunAsync();
