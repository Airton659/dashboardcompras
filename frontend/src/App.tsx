import { useEffect, useRef, useState } from 'react';
import { buscarDashboard } from './api';
import { PainelSla } from './screens/PainelSla';
import type { DashboardResumo } from './types';

export default function App() {
  const [dados, setDados] = useState<DashboardResumo | null>(null);
  const [erro, setErro] = useState<string | null>(null);
  const [ultimaAtualizacao, setUltimaAtualizacao] = useState<Date | null>(null);
  const [atualizando, setAtualizando] = useState(false);
  const temDadosRef = useRef(false);

  useEffect(() => {
    function atualizar() {
      setAtualizando(true);
      buscarDashboard()
        .then((novo) => {
          temDadosRef.current = true;
          setDados(novo);
          setErro(null);
          setUltimaAtualizacao(new Date());
        })
        .catch(() => {
          if (!temDadosRef.current) setErro('Não foi possível carregar o dashboard.');
        })
        .finally(() => setAtualizando(false));
    }

    atualizar();
    const id = setInterval(atualizar, 15 * 60 * 1000);
    return () => clearInterval(id);
  }, []);

  if (erro) return <div style={{ padding: '2vh', color: '#D64545' }}>{erro}</div>;
  if (!dados) return <div style={{ padding: '2vh', color: '#64748b' }}>Carregando…</div>;

  return <PainelSla dados={dados} ultimaAtualizacao={ultimaAtualizacao} atualizando={atualizando} />;
}
