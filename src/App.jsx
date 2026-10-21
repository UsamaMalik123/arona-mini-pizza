import { useEffect } from 'react';
import Header from './components/Header.jsx';
import Hero from './components/Hero.jsx';
import Tickers from './components/Tickers.jsx';
import Kitchen from './components/Kitchen.jsx';
import Menu from './components/Menu.jsx';
import Film from './components/Film.jsx';
import Bestsellers from './components/Bestsellers.jsx';
import Reviews from './components/Reviews.jsx';
import Locations from './components/Locations.jsx';
import WhatsAppFloat from './components/WhatsAppFloat.jsx';
import Flag from './components/Flag.jsx';
import Footer from './components/Footer.jsx';
import { initSite } from './engine/site.js';

export default function App() {
  useEffect(() => {
    initSite();
  }, []);

  return (
    <>
      <Header />
      <main>
        <Hero />
        <Tickers />
        <Kitchen />
        <Menu />
        <Film />
        <Bestsellers />
        <Reviews />
        <Locations />
      </main>
      <WhatsAppFloat />
      <Flag />
      <Footer />
    </>
  );
}
