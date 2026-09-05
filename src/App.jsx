import { Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar.jsx';
import Footer from './components/Footer.jsx';
import ChatModal from './components/ChatModal.jsx';
import { WhatsAppFab } from './components/WhatsAppButton.jsx';
import { ChatProvider } from './context/ChatContext.jsx';
import useCarouselAutoplay from './hooks/useCarouselAutoplay.js';
import Home from './pages/Home/Home.jsx';
import Menu from './pages/Menu/Menu.jsx';
import Shop from './pages/Shop/Shop.jsx';
import Trade from './pages/Trade/Trade.jsx';
import './components/WhatsAppButton.css';

export default function App() {
  useCarouselAutoplay();

  return (
    <ChatProvider>
      <Navbar />
      <main>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/menu" element={<Menu />} />
          <Route path="/shop" element={<Shop />} />
          <Route path="/catering" element={<Trade />} />
        </Routes>
      </main>
      <Footer />
      <WhatsAppFab />
      <ChatModal />
    </ChatProvider>
  );
}
