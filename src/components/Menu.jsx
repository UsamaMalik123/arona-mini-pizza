export default function Menu() {
  return (
    <section className="menu" id="menu" aria-labelledby="menu-h">
      <div className="wrap">
        <div className="sec-head reveal">
          <div className="eyebrow">Speisekarte</div>
          <h2 id="menu-h"><span className="tri"><span className="g">Spei</span><span className="w">sek</span><span className="r">arte</span></span></h2>
          <p>Jede Pizza mit Tomatensauce und Käse, in Ø 20 cm oder Ø 28 cm. Hochgestellte Zeichen verweisen auf Allergene und Zusatzstoffe.</p>
        </div>
        <div className="board reveal">
          <div className="board-top">
            <div className="tabs" role="tablist" aria-label="Kategorien">
              <button className="tab" role="tab" id="tab-pizza" aria-selected="true" aria-controls="panel-pizza">Pizza</button>
              <button className="tab" role="tab" id="tab-mini" aria-selected="false" aria-controls="panel-mini">Mini Pizza &amp; Dessert</button>
              <button className="tab" role="tab" id="tab-drinks" aria-selected="false" aria-controls="panel-drinks">Getränke</button>
            </div>
            <div className="sizes" id="sizes" aria-label="Größe">
              <button className="size" id="size-both" aria-pressed="true" data-size="both">Beide</button>
              <button className="size" id="size-20" aria-pressed="false" data-size={20}>Ø 20 cm</button>
              <button className="size" id="size-28" aria-pressed="false" data-size={28}>Ø 28 cm</button>
            </div>
          </div>
          <div role="tabpanel" id="panel-pizza" aria-labelledby="tab-pizza"><div className="menu-list" id="pizzaList" /></div>
          <div role="tabpanel" id="panel-mini" aria-labelledby="tab-mini" hidden>
            <div className="mini">
              <img id="miniImg" alt="Mini Pizza Stück" width={200} height={157} />
              <div><h3><span className="tri"><span className="g">Mi</span><span className="w">ni Piz</span><span className="r">za</span></span> Stück</h3><p>Das schnelle Stück auf die Hand, frisch aus der Auslage.</p></div>
              <div className="price">3.00€</div>
            </div>
            <h3 style={{fontSize: '1.9rem', margin: '6px 0', textTransform: 'uppercase'}}><span className="tri"><span className="g">Desse</span><span className="r">rt</span></span></h3>
            <div className="menu-list" id="dessertList" />
          </div>
          <div role="tabpanel" id="panel-drinks" aria-labelledby="tab-drinks" hidden><div className="menu-list" id="drinkList" /></div>
          <details className="allergens">
            <summary>Allergene &amp; Zusatzstoffe</summary>
            <p>A glutenhaltiges Getreide · C Eier · D Fisch · G Milch/Laktose · 1 mit Farbstoff · 3 mit Antioxidationsmittel · 4 mit Säuerungsmittel · 5 mit Konservierungsstoff · 6 mit Süßstoff · 9 mit Stabilisatoren · 11 koffeinhaltig · 12 Phenylalaninquelle · 13 taurinhaltig. Gerne geben wir Ihnen eine mündliche Auskunft, eine schriftliche Dokumentation liegt auf Wunsch aus. Alle Preise in € inkl. MwSt. Änderungen und Irrtümer vorbehalten.</p>
          </details>
        </div>
      </div>
    </section>
  );
}
