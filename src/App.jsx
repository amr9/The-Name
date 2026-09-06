import { Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar/Navbar.jsx';
import Footer from './components/Footer/Footer.jsx';
import { WhatsAppFab } from './components/WhatsAppButton.jsx';
import useCarouselAutoplay from './hooks/useCarouselAutoplay.js';
import Home from './pages/Home/Home.jsx';
import Menu from './pages/Menu/Menu.jsx';
import VertexPieces from './pages/VertexPieces/VertexPieces.jsx';
import CateringEvents from './pages/CateringEvents/CateringEvents.jsx';
import Contact from './pages/Contact/Contact.jsx';
import './components/WhatsAppButton.css';

export default function App() {
  useCarouselAutoplay();

  return (
    <>
      <Navbar />
      <main>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/menu" element={<Menu />} />
          <Route path="/shop" element={<VertexPieces />} />
          <Route path="/catering" element={<CateringEvents />} />
          <Route path="/contact" element={<Contact />} />
        </Routes>
      </main>
      <Footer />
      <WhatsAppFab />
    </>
  );
}
