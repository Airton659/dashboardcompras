interface SegmentoDonut {
  label: string;
  value: number;
  color: string;
}

export function DonutC({
  segmentos,
  centro,
  tamanhoVh = 9.5,
}: {
  segmentos: SegmentoDonut[];
  centro: string;
  tamanhoVh?: number;
}) {
  const total = segmentos.reduce((s, x) => s + x.value, 0);
  const raio = 42;
  const circunferencia = 2 * Math.PI * raio;
  let acumulado = 0;
  const arcos = segmentos.map((s) => {
    const tamanho = (s.value / total) * circunferencia;
    const el = (
      <circle
        key={s.label}
        cx={60}
        cy={60}
        r={raio}
        fill="none"
        stroke={s.color}
        strokeWidth={17}
        strokeDasharray={`${tamanho} ${circunferencia - tamanho}`}
        strokeDashoffset={-acumulado}
      />
    );
    acumulado += tamanho;
    return el;
  });

  return (
    <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '1.3vw' }}>
      <svg viewBox="0 0 120 120" style={{ width: `${tamanhoVh}vh`, height: `${tamanhoVh}vh`, flex: 'none' }}>
        <g transform="rotate(-90 60 60)">{arcos}</g>
        <text x={60} y={60} textAnchor="middle" dominantBaseline="central" fontSize={27} fontWeight={900} fill="#1E2D7D" className="tnum">
          {centro}
        </text>
      </svg>
      <div style={{ display: 'flex', flexDirection: 'column', gap: '.4vh', minWidth: '10vw' }}>
        {segmentos.map((s) => (
          <span className="lg" key={s.label}>
            <span className="sw r" style={{ background: s.color }} />
            {s.label} <b className="tnum">{s.value}</b>
          </span>
        ))}
      </div>
    </div>
  );
}
