import { Routes, Route, useLocation } from 'react-router-dom';
import Navbar from './components/Navbar/Navbar.jsx';
import Footer from './components/Footer/Footer.jsx';
import ChatLauncher from './components/ChatLauncher/ChatLauncher.jsx';
// The floating "back to the top" overlay is PARKED — uncomment this import
// and its element below to bring it back. The component and its CSS are kept
// intact; nothing else depends on it.
// import BackToTop from './components/BackToTop/BackToTop.jsx';
import useCarouselAutoplay from './hooks/useCarouselAutoplay.js';
import useScrollToTop from './hooks/useScrollToTop.js';
import Home from './pages/Home/Home.jsx';
// The cafe page is parked, not deleted — uncomment this import and its route
// below (and the nav entry in data/site.js) to bring it back.
// import Cafe from './pages/Cafe/Cafe.jsx';
import Kids from './pages/Kids/Kids.jsx';
import Shop from './pages/Shop/Shop.jsx';
import Customize from './pages/Customize/Customize.jsx';
import Business from './pages/Business/Business.jsx';
import About from './pages/About/About.jsx';
import Policies from './pages/Policies/Policies.jsx';
import NotFound from './pages/NotFound/NotFound.jsx';

export default function App() {
  useCarouselAutoplay();
  useScrollToTop();
  const { pathname } = useLocation();

  return (
    <>
      <Navbar />
      {/* Keyed on the path so <main> remounts on every navigation, which is
          what replays the .page-enter animation. The scroll reset that pairs
          with it is hooks/useScrollToTop.js. */}
      <main key={pathname} className="page-enter">
        <Routes>
          <Route path="/" element={<Home />} />
          {/* <Route path="/cafe" element={<Cafe />} /> */}
          <Route path="/kids" element={<Kids />} />
          <Route path="/shop" element={<Shop />} />
          {/* The store's /customizable-products page, under The Name Store. */}
          <Route path="/customize" element={<Customize />} />
          <Route path="/business" element={<Business />} />
          {/* The enquiry form now lives at the foot of /about. */}
          <Route path="/about" element={<About />} />
          {/* Terms, delivery/returns and privacy, all on one page; the
              footer's policy list links to the #anchors within it. */}
          <Route path="/policies" element={<Policies />} />
          {/* Catch-all. It must stay LAST — Routes picks the best match, but
              keeping it last also keeps the list readable as "everything
              above, then anything else". Paths that used to exist land here
              too: /contact (the form moved to the foot of /about) and /cafe
              (parked above). nginx.conf already serves index.html for any
              unmatched path, so a deep link reaches this rather than nginx's
              own 404. */}
          <Route path="*" element={<NotFound />} />
        </Routes>
      </main>
      <Footer />
      {/* The chat launcher floats in the bottom-right corner on every page.
          <BackToTop /> used to sit above it, off the same --fab-inset. */}
      {/* <BackToTop /> */}
      <ChatLauncher />
    </>
  );
}
