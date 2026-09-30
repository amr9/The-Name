import { Routes, Route, Navigate, useLocation } from 'react-router-dom';
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
import Business from './pages/Business/Business.jsx';
import About from './pages/About/About.jsx';
// The policies page is PARKED, not deleted — uncomment this import and its
// route below — and link to it from somewhere: the footer no longer does.
// import Policies from './pages/Policies/Policies.jsx';
import NotFound from './pages/NotFound/NotFound.jsx';
import { routes } from './data/site.js';

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
          {/* Paths come from `routes` in data/site.js — they spell the
              page's navbar name (Store → /store, Corporate gifts →
              /corporate-gifts), so a rename is made there, not here. */}
          <Route path={routes.home} element={<Home />} />
          {/* <Route path={routes.cafe} element={<Cafe />} /> */}
          <Route path={routes.kids} element={<Kids />} />
          <Route path={routes.shop} element={<Shop />} />
          {/* Customize Yours was its own page here; it is now a section of
              Home, so old links land on it. */}
          <Route path="/customize" element={<Navigate to="/#customize" replace />} />
          <Route path={routes.business} element={<Business />} />
          {/* The enquiry form now lives at the foot of /about. */}
          <Route path={routes.about} element={<About />} />
          {/* The OLD paths, from before the URLs were renamed to match the
              navbar. They redirect rather than 404, so bookmarks and links
              already shared keep working. */}
          <Route path="/shop" element={<Navigate to={routes.shop} replace />} />
          <Route path="/business" element={<Navigate to={routes.business} replace />} />
          {/* Terms, delivery/returns and privacy, all on one page; the
              footer's policy list links to the #anchors within it. PARKED. */}
          {/* <Route path="/policies" element={<Policies />} /> */}
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
