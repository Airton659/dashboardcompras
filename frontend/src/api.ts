import type { DashboardResumo } from './types';

export async function buscarDashboard(): Promise<DashboardResumo> {
  const resposta = await fetch('/api/dashboard');
  if (!resposta.ok) throw new Error('Falha ao carregar o dashboard');
  return resposta.json();
}
