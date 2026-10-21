export default function Film() {
  return (
    <section id="zubereitung" aria-labelledby="z-h" style={{paddingTop: 60}}>
      <div className="wrap">
        <div className="sec-head reveal">
          <div className="eyebrow">Zubereitung</div>
          <h2 id="z-h">So entsteht <span className="script">deine</span> Pizza</h2>
          <p>Vom Teig bis zum ersten Stück in sechs Schritten. Tippe oben auf einen Schritt, um direkt dorthin zu springen.</p>
        </div>
        <div className="player reveal">
          <canvas id="film" aria-label="Animation: So entsteht eine Blechpizza" role="img" />
          <div className="top"><div className="stories" id="stories" aria-label="Schritte der Zubereitung" /></div>
          <div className="bottom">
            <button className="play" id="playBtn" aria-label="Pause">
              <svg id="icoPause" viewBox="0 0 24 24" fill="currentColor"><rect x={6} y={4} width={4} height={16} rx={1} /><rect x={14} y={4} width={4} height={16} rx={1} /></svg>
              <svg id="icoPlay" viewBox="0 0 24 24" fill="currentColor" hidden><path d="M7 4l13 8-13 8z" /></svg>
            </button>
            <div className="now"><small id="nowStep">SCHRITT 1 / 6</small><b id="nowTitle">Teig ins Blech</b></div>
          </div>
        </div>
        <div className="feat">
          <div className="f reveal"><span className="k">Blech</span><h3>Dicker, weicher Boden</h3><p>Innen fluffig, unten knusprig.</p></div>
          <div className="f reveal"><span className="k">Käse</span><h3>Bis an den Rand</h3><p>Goldbraun überbacken, mit knusprigen Ecken.</p></div>
          <div className="f reveal"><span className="k">Halal</span><h3>Rind &amp; Pute</h3><p>Rindersalami, Putenschinken, Sucuk.</p></div>
          <div className="f reveal"><span className="k">1,00 €</span><h3>Getränke ab</h3><p>Von Capri Sun bis Ayran, alles gekühlt.</p></div>
        </div>
      </div>
    </section>
  );
}
