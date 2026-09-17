import { Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar/Navbar.jsx';
import Footer from './components/Footer/Footer.jsx';
import ChatLauncher from './components/ChatLauncher/ChatLauncher.jsx';
import useCarouselAutoplay from './hooks/useCarouselAutoplay.js';
import Home from './pages/Home/Home.jsx';
// The cafe page is parked, not deleted — uncomment this import and its route
// below (and the nav entry in data/site.js) to bring it back.
// import Cafe from './pages/Cafe/Cafe.jsx';
import Kids from './pages/Kids/Kids.jsx';
import Shop from './pages/Shop/Shop.jsx';
import Business from './pages/Business/Business.jsx';
import About from './pages/About/About.jsx';

export default function App() {
  useCarouselAutoplay();

  return (
    <>
      <Navbar />
      <main>
        <Routes>
          <Route path="/" element={<Home />} />
          {/* <Route path="/cafe" element={<Cafe />} /> */}
          <Route path="/kids" element={<Kids />} />
          <Route path="/shop" element={<Shop />} />
          <Route path="/business" element={<Business />} />
          {/* The enquiry form now lives at the foot of /about. */}
          <Route path="/about" element={<About />} />
        </Routes>
      </main>
      <Footer />
      <ChatLauncher />
    </>
  );
}
