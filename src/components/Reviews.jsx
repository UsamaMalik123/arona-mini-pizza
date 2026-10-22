export default function Reviews() {
  return (
    <section id="bewertungen" aria-labelledby="rev-h" style={{paddingTop: 30}}>
      <div className="wrap">
        <div className="sec-head reveal">
          <div className="eyebrow">Bewertungen</div>
          <h2 id="rev-h">Schon <span className="script">probiert?</span></h2>
          <p>Deine Meinung hilft uns und allen, die noch überlegen. Bewerte deinen Laden direkt auf Google.</p>
        </div>
      <div className="rv-grid">
        <article className="rv-card reveal">
          <div className="rv-top">
            <span className="rv-av" style={{'--av':'#f4c24f'}} aria-hidden="true">C</span>
            <div className="rv-who"><b>Cüneyt Ö.</b><span>Neukölln</span></div>
            <span className="rv-tag">Google</span>
          </div>
          <div className="stars rv-stars" role="img" aria-label="5 von 5 Sternen"></div>
          <p>„It's a very nice establishment, I recommend it. Their pizzas are superb.“</p>
        </article>
        <article className="rv-card reveal">
          <div className="rv-top">
            <span className="rv-av" style={{'--av':'#7c4ddb'}} aria-hidden="true">V</span>
            <div className="rv-who"><b>Vincent J.</b><span>Neukölln</span></div>
            <span className="rv-tag">Google</span>
          </div>
          <div className="stars rv-stars" role="img" aria-label="5 von 5 Sternen"></div>
          <p>„Finally here in Neukölln too! I simply love it, it's the best mini pizza!“</p>
        </article>
        <article className="rv-card reveal">
          <div className="rv-top">
            <span className="rv-av" style={{'--av':'#45b24b'}} aria-hidden="true">G</span>
            <div className="rv-who"><b>Greta M.</b><span>Neukölln</span></div>
            <span className="rv-tag">Google</span>
          </div>
          <div className="stars rv-stars" role="img" aria-label="5 von 5 Sternen"></div>
          <p>„The best pizza in Neukölln tastes amazing!“</p>
        </article>
        <article className="rv-card reveal">
          <div className="rv-top">
            <span className="rv-av" style={{'--av':'#8e5bd6'}} aria-hidden="true">Z</span>
            <div className="rv-who"><b>Zyumbyulka K.</b><span>Neukölln</span></div>
            <span className="rv-tag">Google</span>
          </div>
          <div className="stars rv-stars" role="img" aria-label="5 von 5 Sternen"></div>
          <p>„Best mini pizza!!“</p>
        </article>
        <article className="rv-card reveal">
          <div className="rv-top">
            <span className="rv-av" style={{'--av':'#ff7b2e'}} aria-hidden="true">K</span>
            <div className="rv-who"><b>Kerim X.</b><span>Neukölln</span></div>
            <span className="rv-tag">Google</span>
          </div>
          <div className="stars rv-stars" role="img" aria-label="5 von 5 Sternen"></div>
          <p>„Tastes great. I think it's fantastic.“</p>
        </article>
      </div>
      <p className="rv-note">Echte Google-Bewertungen für Arona Mini Pizza Neukölln · von Google übersetzt</p>
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
