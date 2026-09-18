# Painel de SLA — Compras · FUNCESI

Dashboard interno, somente leitura, pra acompanhamento do processo de compras em tempo quase
real — pensado pra ficar fixo numa TV do setor. Substitui o acompanhamento manual dos indicadores
de SLA, devolução, economia em negociação e atrasos por comprador.

---

## Visão Geral

O painel lê direto do TOTVS RM (via `Funcesi.DbConnector`) e organiza os indicadores em duas
colunas — **Atual** (últimos 3 meses, janela móvel) e **Ano** (acumulado do ano corrente):

- Volume de compras processadas (recebidos, autorizados, devolvidos, cancelados, pendentes)
- Pendentes de autorização, por faixa de risco (estourado / risco / tranquilo)
- Aderência ao SLA (% concluído dentro do prazo, meta 80%)
- Economia em negociação (cotado × negociado)
- % de pedidos por modalidade (Contratação Direta / Solicitação de Orçamento / Coleta Rápida)
- Desempenho + modalidade por comprador
- Devolução e reincidência
- Classificação de atrasos por comprador (só pedidos autorizados)

Sem autenticação — é um painel de leitura, não um sistema transacional.

---

## Stack

| Camada | Tecnologia |
|---|---|
| Frontend | React 19 + Vite, CSS puro (sem framework de UI) |
| Backend | C# .NET 9 (ASP.NET Core minimal API) |
| Acesso a dados | `Funcesi.DbConnector` (pacote NuGet compartilhado, Dapper/ODBC sobre FreeTDS) |
| Banco de Dados | TOTVS RM (SQL Server), somente leitura |
| Infra | Docker + Docker Compose |
| CI/CD | GitHub Actions → GitHub Container Registry (`ghcr.io`) |

---

## Estrutura do Projeto

```
FUN.API.COM.DashBoardCorrente/
├── backend/
│   ├── Modules/Dashboard/     # DashboardService (Monta* por indicador), Models, Endpoints
│   ├── Infra/Container/       # DI (AddDashboardCorrente)
│   ├── Dockerfile              # produção (multi-stage, FreeTDS)
│   └── Dockerfile.dev           # dev (dotnet watch)
├── frontend/
│   ├── src/
│   │   ├── screens/PainelSla.tsx   # layout das duas colunas
│   │   └── components/             # Card, Gauge, DonutC, StackedBar, Heatmap, etc.
│   ├── Dockerfile               # produção (build Vite + Nginx)
│   └── nginx.conf                # serve a SPA + proxy de /api pro backend
├── docker-compose.yml           # produção (imagens ghcr.io)
├── docker-compose.dev.yml       # desenvolvimento (build local + live-reload)
└── .github/workflows/deploy.yml # build + push das imagens no push pra main
```

---

## Como Rodar

### Pré-requisitos

- Docker e Docker Compose instalados
- `backend/.env.docker` com as credenciais do RM (não versionado — ver `Rm__*` em
  `backend/Modules/Dashboard`/`Funcesi.DbConnector` pra saber as chaves esperadas)

### Desenvolvimento (live-reload)

```bash
docker compose -f docker-compose.dev.yml up --build
```

| Serviço | URL |
|---|---|
| Frontend | http://localhost:3090 |
| Backend (API) | http://localhost:8090 |
| Swagger | http://localhost:8090/swagger/index.html |

### Produção

```bash
docker compose up -d
```

Utiliza as imagens publicadas no GitHub Container Registry
(`ghcr.io/airton659/dashboardcompras-backend` e `dashboardcompras-frontend`). As variáveis
`RM_HOST`/`RM_PORT`/`RM_NAME`/`RM_USER`/`RM_PASSWORD` são preenchidas na hora do deploy (ex.: tela
de "Environment variables" do Portainer).

O frontend é servido sob o path `/dash-compras-sla/` (configurado em `vite.config.ts`, `base`) —
o proxy reverso externo precisa rotear esse prefixo pro container do frontend.

---

## CI/CD

O workflow `.github/workflows/deploy.yml` builda e publica as duas imagens no GHCR a cada push na
branch `main`. Não há suíte de testes automatizada ainda.

---

## Banco de Dados

Consome o TOTVS RM (SQL Server) somente leitura, via `Funcesi.DbConnector`. Não há schema próprio
deste projeto — toda a leitura é sobre tabelas do RM (`TMOV`, `TMOVRELAC`, `TCITMORCAMENTO`,
`GUSUARIO`, etc.), documentado no `CLAUDE.md` do repositório `db-connector`.

---

## Licença

Projeto desenvolvido para uso interno da **FUNCESI — Fundação Comunitária de Ensino Superior de
Itabira**.
