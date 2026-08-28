export function Gauge({ percentual }: { percentual: number }) {
  const pct = Math.round(percentual);
  const cor = pct >= 80 ? '#2FA35A' : pct >= 60 ? '#E0A020' : '#D64545';
  const dash = (pct / 100) * 138;

  return (
    <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center' }}>
      <svg viewBox="0 0 100 58" style={{ height: '12vh', width: 'auto', maxWidth: '100%' }}>
        <path d="M 6 52 A 44 44 0 0 1 94 52" fill="none" stroke="#e2e8f0" strokeWidth={11} strokeLinecap="round" />
        <path d="M 6 52 A 44 44 0 0 1 94 52" fill="none" stroke={cor} strokeWidth={11} strokeLinecap="round" strokeDasharray={`${dash} 999`} />
        <text x={50} y={46} textAnchor="middle" fontSize={24} fontWeight={900} fill="#1E2D7D" className="tnum">
          {pct}%
        </text>
      </svg>
      <span style={{ fontSize: '1.4vh', color: 'var(--slate)', marginTop: '.4vh' }}>Concluídos no prazo · meta 80%</span>
    </div>
  );
}
