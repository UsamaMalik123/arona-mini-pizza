export default function Hero() {
  return (
    <section className="hero" id="home">
      <div className="wrap hero-grid">
        <div>
          <div className="eyebrow">100 % Halal · Neukölln &amp; Mariendorf</div>
          <h1>
            <span className="script">Arona Mini Pizza</span>
            <span>Frisch</span>
            <span>vom <span className="hot">Blech.</span></span>
          </h1>
          <p className="lead">Ofenheiß vom Blech: knuspriger Boden, fruchtige Tomatensauce und reichlich Käse. Das Mini Pizza Stück für 3,00 €, die ganze Pizza ab 4,20 €.</p>
          <div className="btns">
            <a className="btn btn-hot" href="#menu">Speisekarte ansehen
              <svg width={18} height={18} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" aria-hidden="true"><path d="M5 12h14M13 6l6 6-6 6" /></svg></a>
            <a className="btn btn-wa" href="https://wa.me/493097004392" target="_blank" rel="noopener"><svg width={20} height={20} viewBox="0 0 24 24" fill="currentColor" aria-hidden="true"><path d="M12 2a10 10 0 0 0-8.6 15.1L2 22l5-1.3A10 10 0 1 0 12 2zm0 18.2a8.2 8.2 0 0 1-4.2-1.2l-.3-.2-3 .8.8-2.9-.2-.3A8.2 8.2 0 1 1 12 20.2zm4.5-6.1c-.2-.1-1.5-.7-1.7-.8s-.4-.1-.6.1-.7.8-.8 1-.3.2-.5.1a6.7 6.7 0 0 1-3.3-2.9c-.3-.4.2-.4.7-1.3.1-.2 0-.3 0-.4l-.8-1.8c-.2-.5-.4-.4-.6-.4h-.5a1 1 0 0 0-.7.3 3 3 0 0 0-.9 2.2 5.2 5.2 0 0 0 1.1 2.7 11.8 11.8 0 0 0 4.5 4c1.7.7 2.3.8 3.2.6a2.7 2.7 0 0 0 1.8-1.2 2.2 2.2 0 0 0 .1-1.3c0-.1-.2-.2-.5-.3z" /></svg>Per WhatsApp bestellen</a>
          </div>
          <div className="hero-stats">
            <div><b>3,00 €</b><span>Mini Pizza Stück</span></div>
            <div><b>450 °C</b><span>Heißer Ofen</span></div>
            <svg className="badge" viewBox="0 0 120 120" aria-label="100 % Halal">
              <circle cx={60} cy={60} r={58} fill="#45b24b" />
              <defs><path id="circ" d="M60 60m-44 0a44 44 0 1 1 88 0a44 44 0 1 1 -88 0" /></defs>
              <g className="ring"><text fontFamily="DM Sans,sans-serif" fontWeight={800} fontSize="11.5" fill="#fff" letterSpacing="2.6"><textPath href="#circ">100 % HALAL · 100 % HALAL · 100 % HALAL ·</textPath></text></g>
              <circle cx={60} cy={60} r={31} fill="none" stroke="#fff" strokeWidth={2} />
              <text x={60} y={68} textAnchor="middle" fontSize={24} fill="#fff" fontWeight={700}>حلال</text>
            </svg>
          </div>
        </div>
        <div className="stage" id="stage3d">
          <canvas id="tray3d" aria-label="3D Blechpizza, zum Drehen ziehen" role="img" />
          <div className="sticker"><small>Mini Pizza Stück</small><b>3,00 €</b></div>
          <div className="hint">↔ Ziehen zum Drehen</div>
        </div>
      </div>
    </section>
  );
}
