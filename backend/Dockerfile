# syntax=docker/dockerfile:1
FROM mcr.microsoft.com/dotnet/sdk:9.0 AS build
WORKDIR /src
COPY . .
RUN --mount=type=secret,id=nuget_pat \
    if [ -f /run/secrets/nuget_pat ]; then \
      dotnet nuget add source "https://funcesi.pkgs.visualstudio.com/_packaging/funcesi/nuget/v3/index.json" \
        --name funcesi --username qualquer --password "$(cat /run/secrets/nuget_pat)" --store-password-in-clear-text; \
    fi && \
    dotnet publish -c Release -o /out

FROM mcr.microsoft.com/dotnet/aspnet:9.0
WORKDIR /app

RUN apt-get update && \
    apt-get install -y --no-install-recommends unixodbc tdsodbc && \
    rm -rf /var/lib/apt/lists/*

RUN printf '[FreeTDS]\nDescription=FreeTDS Driver\nDriver=/usr/lib/x86_64-linux-gnu/odbc/libtdsodbc.so\n' \
    > /etc/odbcinst.ini

COPY --from=build /out .

EXPOSE 8080
ENV ASPNETCORE_URLS=http://+:8080
ENTRYPOINT ["dotnet", "DashboardCorrente.dll"]
