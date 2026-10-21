export default function Reviews() {
  return (
    <section id="bewertungen" aria-labelledby="rev-h" style={{paddingTop: 30}}>
      <div className="wrap">
        <div className="sec-head reveal">
          <div className="eyebrow">Bewertungen</div>
          <h2 id="rev-h">Schon <span className="script">probiert?</span></h2>
          <p>Deine Meinung hilft uns und allen, die noch überlegen. Bewerte deinen Laden direkt auf Google.</p>
        </div>
        <div className="rev-grid">
          <div className="rev-box reveal">
            <div className="stars" aria-hidden="true" />
            <span className="eyebrow" style={{color: 'var(--basil)'}}>Neukölln</span>
            <h3>Hermannstraße 168</h3>
            <p>Warst du in unserem Laden in Neukölln? Wir freuen uns über deine Sterne.</p>
            <div><a className="btn btn-green" href="https://www.google.com/maps/search/?api=1&query=Arona+Mini+Pizza+Hermannstra%C3%9Fe+168+Berlin" target="_blank" rel="noopener">Auf Google bewerten</a></div>
          </div>
          <div className="rev-box reveal">
            <div className="stars" aria-hidden="true" />
            <span className="eyebrow" style={{color: 'var(--basil)'}}>Mariendorf</span>
            <h3>U-Bhf Alt-Mariendorf</h3>
            <p>Schnell ein Stück vor der U-Bahn? Sag uns, wie es dir geschmeckt hat.</p>
            <div><a className="btn btn-green" href="https://www.google.com/maps/search/?api=1&query=Arona+Mini+Pizza+Rei%C3%9Feckstra%C3%9Fe+12107+Berlin" target="_blank" rel="noopener">Auf Google bewerten</a></div>
          </div>
        </div>
      </div>
    </section>
  );
}
