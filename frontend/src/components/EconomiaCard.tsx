export function EconomiaCard({ cotadoTxt, negTxt, econTxt }: { cotadoTxt: string; negTxt: string; econTxt: string }) {
  return (
    <div>
      <div style={{ textAlign: 'center', marginBottom: '1.4vh' }}>
        <div style={{ fontSize: '1.3vh', textTransform: 'uppercase', fontWeight: 700, color: 'var(--slate2)' }}>Economia</div>
        <div className="tnum" style={{ fontWeight: 900, fontSize: '3.8vh', color: '#2FA35A', lineHeight: 1.05 }}>
          {econTxt}
        </div>
      </div>
      <div style={{ borderTop: '1px solid #f1f5f9', paddingTop: '1.2vh' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'baseline', marginBottom: '.9vh' }}>
          <span style={{ fontSize: '1.5vh', color: 'var(--slate)' }}>Cotado</span>
          <span className="tnum" style={{ fontSize: '1.75vh', fontWeight: 700, color: '#475569' }}>
            {cotadoTxt}
          </span>
        </div>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'baseline' }}>
          <span style={{ fontSize: '1.5vh', color: 'var(--slate)' }}>Negociado</span>
          <span className="tnum" style={{ fontSize: '1.75vh', fontWeight: 700, color: '#1E2D7D' }}>
            {negTxt}
          </span>
        </div>
      </div>
    </div>
  );
}
