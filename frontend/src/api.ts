import type { DashboardResumo } from './types';

export async function buscarDashboard(): Promise<DashboardResumo> {
  const resposta = await fetch(`${import.meta.env.BASE_URL}api/dashboard`);
  if (!resposta.ok) throw new Error('Falha ao carregar o dashboard');
  return resposta.json();
}
