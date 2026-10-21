export default function Locations() {
  return (
    <section className="loc" id="standorte" aria-labelledby="loc-h">
      <div className="wrap">
        <div className="sec-head reveal">
          <div className="eyebrow">Standorte</div>
          <h2 id="loc-h">Zweimal <span className="script">in</span> Berlin</h2>
        </div>
        <div className="phone reveal">
          <svg width={40} height={40} viewBox="0 0 24 24" fill="#25d366" aria-hidden="true"><path d="M12 2a10 10 0 0 0-8.6 15.1L2 22l5-1.3A10 10 0 1 0 12 2z" /></svg>
          <div><small>Schneller per WhatsApp</small><b style={{fontFamily: 'var(--display)', fontSize: 'clamp(1.4rem,3.6vw,2rem)', textTransform: 'uppercase'}}>Bestellen &amp; Fragen</b></div>
          <div className="btns"><a className="btn btn-wa" href="https://wa.me/493097004392" target="_blank" rel="noopener"><svg width={20} height={20} viewBox="0 0 24 24" fill="currentColor" aria-hidden="true"><path d="M12 2a10 10 0 0 0-8.6 15.1L2 22l5-1.3A10 10 0 1 0 12 2zm0 18.2a8.2 8.2 0 0 1-4.2-1.2l-.3-.2-3 .8.8-2.9-.2-.3A8.2 8.2 0 1 1 12 20.2zm4.5-6.1c-.2-.1-1.5-.7-1.7-.8s-.4-.1-.6.1-.7.8-.8 1-.3.2-.5.1a6.7 6.7 0 0 1-3.3-2.9c-.3-.4.2-.4.7-1.3.1-.2 0-.3 0-.4l-.8-1.8c-.2-.5-.4-.4-.6-.4h-.5a1 1 0 0 0-.7.3 3 3 0 0 0-.9 2.2 5.2 5.2 0 0 0 1.1 2.7 11.8 11.8 0 0 0 4.5 4c1.7.7 2.3.8 3.2.6a2.7 2.7 0 0 0 1.8-1.2 2.2 2.2 0 0 0 .1-1.3c0-.1-.2-.2-.5-.3z" /></svg>WhatsApp öffnen</a></div>
        </div>
        <div className="loc-grid">
          <article className="shop reveal">
            <div className="map"><svg viewBox="0 0 400 200" preserveAspectRatio="xMidYMid slice" aria-hidden="true"><rect width={400} height={200} fill="#15110e" /><g stroke="#2a221c" strokeWidth={16} fill="none" strokeLinecap="round"><path d="M200 -10 L215 210" /><path d="M-10 70 L410 90" /><path d="M-10 160 L410 140" /></g><g stroke="#3a3027" strokeWidth={4} fill="none"><path d="M60 -10 L90 210" /><path d="M330 -10 L300 210" /></g><circle cx={207} cy={100} r={46} fill="#ff7b2e" opacity=".14" /></svg>
              <svg className="pin" width={40} height={52} viewBox="0 0 40 52" aria-hidden="true"><path d="M20 52C8 36 0 27 0 19a20 20 0 1 1 40 0c0 8-8 17-20 33z" fill="#e5392c" /><circle cx={20} cy={19} r={8} fill="#fff" /></svg></div>
            <div className="body">
              <span className="area">Neukölln</span>
              <h3>Hermannstraße 168</h3>
              <p>12051 Berlin-Neukölln</p>
              <span className="open" id="openNK"><i /><span>Täglich 11:00 – 23:00</span></span>
              <dl className="hrs"><dt>Laden</dt><dd>11:00 – 23:00</dd><dt>Lieferung</dt><dd>11:00 – 22:00</dd></dl>
              <div className="contact"><small style={{color: 'var(--muted)', fontWeight: 800, textTransform: 'uppercase', letterSpacing: '.12em', fontSize: '.72rem'}}>Telefon</small>
                <div className="num"><b id="telNK">030 97004392</b><button className="copy" data-copy="030 97004392" data-target="telNK">Kopieren</button></div></div>
              <div className="btns"><a className="btn btn-wa" href="https://wa.me/493097004392" target="_blank" rel="noopener"><svg width={20} height={20} viewBox="0 0 24 24" fill="currentColor" aria-hidden="true"><path d="M12 2a10 10 0 0 0-8.6 15.1L2 22l5-1.3A10 10 0 1 0 12 2zm0 18.2a8.2 8.2 0 0 1-4.2-1.2l-.3-.2-3 .8.8-2.9-.2-.3A8.2 8.2 0 1 1 12 20.2zm4.5-6.1c-.2-.1-1.5-.7-1.7-.8s-.4-.1-.6.1-.7.8-.8 1-.3.2-.5.1a6.7 6.7 0 0 1-3.3-2.9c-.3-.4.2-.4.7-1.3.1-.2 0-.3 0-.4l-.8-1.8c-.2-.5-.4-.4-.6-.4h-.5a1 1 0 0 0-.7.3 3 3 0 0 0-.9 2.2 5.2 5.2 0 0 0 1.1 2.7 11.8 11.8 0 0 0 4.5 4c1.7.7 2.3.8 3.2.6a2.7 2.7 0 0 0 1.8-1.2 2.2 2.2 0 0 0 .1-1.3c0-.1-.2-.2-.5-.3z" /></svg>WhatsApp</a><a className="btn btn-hot" href="https://www.google.com/maps/search/?api=1&query=Arona+Mini+Pizza+Hermannstra%C3%9Fe+168+12051+Berlin" target="_blank" rel="noopener">Route planen</a></div>
            </div>
          </article>
          <article className="shop reveal">
            <div className="map"><svg viewBox="0 0 400 200" preserveAspectRatio="xMidYMid slice" aria-hidden="true"><rect width={400} height={200} fill="#15110e" /><g stroke="#2a221c" strokeWidth={16} fill="none" strokeLinecap="round"><path d="M-10 110 L410 95" /><path d="M140 -10 L165 210" /></g><g stroke="#3a3027" strokeWidth={4} fill="none"><path d="M-10 40 Q200 70 410 30" /><path d="M290 -10 L270 210" /></g><rect x={176} y={112} width={44} height={22} rx={4} fill="#2f6bd8" opacity=".7" /><text x={198} y={128} textAnchor="middle" fontFamily="DM Sans,sans-serif" fontWeight={800} fontSize={14} fill="#fff">U</text><circle cx={160} cy={100} r={46} fill="#ff7b2e" opacity=".14" /></svg>
              <svg className="pin" style={{left: '40%'}} width={40} height={52} viewBox="0 0 40 52" aria-hidden="true"><path d="M20 52C8 36 0 27 0 19a20 20 0 1 1 40 0c0 8-8 17-20 33z" fill="#e5392c" /><circle cx={20} cy={19} r={8} fill="#fff" /></svg></div>
            <div className="body">
              <span className="area">Mariendorf · am U-Bhf Alt-Mariendorf</span>
              <h3>Reißeckstraße 2Y</h3>
              <p>12107 Berlin</p>
              <p>Öffnungszeiten: <span className="fill">[bitte ergänzen]</span></p>
              <div className="contact"><small style={{color: 'var(--muted)', fontWeight: 800, textTransform: 'uppercase', letterSpacing: '.12em', fontSize: '.72rem'}}>Telefon</small>
                <div className="num"><b id="telMD">030 70176900</b><button className="copy" data-copy="030 70176900" data-target="telMD">Kopieren</button></div></div>
              <div className="btns"><a className="btn btn-hot" href="https://www.google.com/maps/search/?api=1&query=Rei%C3%9Feckstra%C3%9Fe+2+12107+Berlin" target="_blank" rel="noopener">Route planen</a></div>
            </div>
          </article>
        </div>
      </div>
    </section>
      
  );
}
