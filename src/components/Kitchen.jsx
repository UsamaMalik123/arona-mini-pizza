export default function Kitchen() {
  return (
    <section id="kueche" aria-labelledby="k-h">
      <div className="wrap">
        <div className="sec-head reveal">
          <div className="eyebrow">Aus unserer Küche</div>
          <h2 id="k-h">Echt <span className="script">lecker,</span> echt heiß</h2>
          <p>So kommt unsere Pizza aus dem Ofen: ein ganzes Blech, goldbraun gebacken, und dann in Stücke geschnitten auf die Hand.</p>
        </div>
        <div className="kitchen">
          <figure className="photo tall reveal"><img id="photoB" alt="Ganzes Blech Pizza mit Salami, Champignons und Peperoni" width={900} height={1275} />
            <figcaption><div><b>Das ganze Blech</b><span>Salami, Champignons und Peperoni</span></div></figcaption></figure>
          <div className="side">
            <figure className="photo wide reveal"><img id="photoA" alt="Mini Pizza Stücke auf einer Pappschale" width={1000} height={784} />
              <figcaption><div><b>Mini Pizza Stück</b><span>Direkt aus der Auslage</span></div><span className="pr">3,00 €</span></figcaption></figure>
            <div className="facts reveal">
              <div><b>100 %</b><span>Halal, auch Salami und Schinken</span></div>
              <div><b>450 °C</b><span>Heißer Ofen für den knusprigen Boden</span></div>
              <div><b>14</b><span>Pizzasorten auf der Karte</span></div>
              <div><b>2</b><span>Läden in Berlin</span></div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
