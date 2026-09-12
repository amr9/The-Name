import { Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar/Navbar.jsx';
import Footer from './components/Footer/Footer.jsx';
import { WhatsAppFab } from './components/WhatsAppButton.jsx';
import useCarouselAutoplay from './hooks/useCarouselAutoplay.js';
import Home from './pages/Home/Home.jsx';
import Cafe from './pages/Cafe/Cafe.jsx';
import Shop from './pages/Shop/Shop.jsx';
import Business from './pages/Business/Business.jsx';
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
          <Route path="/cafe" element={<Cafe />} />
          <Route path="/shop" element={<Shop />} />
          <Route path="/business" element={<Business />} />
          <Route path="/contact" element={<Contact />} />
        </Routes>
      </main>
      <Footer />
      <WhatsAppFab />
    </>
  );
}
