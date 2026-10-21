export default function Bestsellers() {
  return (
    <section id="bestseller" aria-labelledby="best-h" style={{paddingTop: 30}}>
      <div className="wrap">
        <div className="sec-head reveal">
          <div className="eyebrow">Bestseller</div>
          <h2 id="best-h">Die Lieblinge <span className="script">vom Blech</span></h2>
        </div>
        <div className="best-grid" id="bestGrid" />
      </div>
    </section>
  );
}
