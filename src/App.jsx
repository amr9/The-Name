import { lazy, Suspense } from 'react';
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
import useSectionReveal from './hooks/useSectionReveal.js';
import useDocumentHead from './hooks/useDocumentHead.js';
import { routes } from './data/site.js';
// Home is the landing page, so it ships in the main bundle — splitting it
// would only add a second round trip before the first paint. Every other page
// is LAZY: its JavaScript is fetched the first time it is visited. Their CSS
// is NOT lazy — see pages/lazyPageStyles.js for why it must load here, in
// this position.
import Home from './pages/Home/Home.jsx';
import './pages/lazyPageStyles.js';
// The cafe page is parked, not deleted — uncomment this import and its route
// below (and the nav entry in data/site.js) to bring it back.
// const Cafe = lazy(() => import('./pages/Cafe/Cafe.jsx'));
const Kids = lazy(() => import('./pages/Kids/Kids.jsx'));
const Shop = lazy(() => import('./pages/Shop/Shop.jsx'));
const Brands = lazy(() => import('./pages/Brands/Brands.jsx'));
const Business = lazy(() => import('./pages/Business/Business.jsx'));
const Agency = lazy(() => import('./pages/Agency/Agency.jsx'));
const About = lazy(() => import('./pages/About/About.jsx'));
// The policies page is PARKED, not deleted — uncomment this import and its
// route below — and link to it from somewhere: the footer no longer does.
// const Policies = lazy(() => import('./pages/Policies/Policies.jsx'));
const NotFound = lazy(() => import('./pages/NotFound/NotFound.jsx'));

export default function App() {
  useCarouselAutoplay();
  useScrollToTop();
  useSectionReveal();
  useDocumentHead();
  const { pathname } = useLocation();

  return (
    <>
      <Navbar />
      {/* Keyed on the path so <main> remounts on every navigation, which is
          what replays the .page-enter animation. The scroll reset that pairs
          with it is hooks/useScrollToTop.js. */}
      <main key={pathname} className="page-enter">
        {/* While a lazy page's chunk downloads, an empty full-height block
            holds the footer down so it does not flash up under the navbar. */}
        <Suspense fallback={<div className="page-loading" />}>
          <Routes>
            {/* Paths come from `routes` in data/site.js — they spell the
                page's navbar name (Store → /store, Corporate gifts →
                /corporate-gifts), so a rename is made there, not here. */}
            <Route path={routes.home} element={<Home />} />
            {/* <Route path={routes.cafe} element={<Cafe />} /> */}
            <Route path={routes.shop} element={<Shop />} />
            <Route path={routes.brands} element={<Brands />} />
            {/* Customize Yours was its own page here; it is now a section of
                Home, so old links land on it. */}
            <Route path="/customize" element={<Navigate to="/#customize" replace />} />
            <Route path={routes.business} element={<Business />} />
            <Route path={routes.agency} element={<Agency />} />
            {/* Events is the Kids page under its new name (see routes.events). */}
            <Route path={routes.events} element={<Kids />} />
            {/* The enquiry form now lives at the foot of /about. */}
            <Route path={routes.about} element={<About />} />
            {/* The OLD paths, from before the URLs were renamed to match the
                navbar. They redirect rather than 404, so bookmarks and links
                already shared keep working. */}
            <Route path="/shop" element={<Navigate to={routes.shop} replace />} />
            <Route path="/business" element={<Navigate to={routes.business} replace />} />
            <Route path="/kids" element={<Navigate to={routes.events} replace />} />
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
        </Suspense>
      </main>
      <Footer />
      {/* The chat launcher floats in the bottom-right corner on every page.
          <BackToTop /> used to sit above it, off the same --fab-inset. */}
      {/* <BackToTop /> */}
      <ChatLauncher />
    </>
  );
}
