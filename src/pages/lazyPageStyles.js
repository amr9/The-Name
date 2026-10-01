// The stylesheets of every LAZY page (App.jsx), imported up front.
//
// Pages load their JavaScript on first visit, but their CSS must NOT: a lazy
// chunk's CSS is injected AFTER theme.css, and that silently flips every tie
// between a page rule and a theme.css rule of equal specificity (theme.css
// used to win them all, because main.jsx imports App before it). Measured
// when lazy loading went in: the 404 column grew from 677px to 1240px, the
// About title lost its optical -2.4px, the Events cards' gaps changed — 514
// computed-style differences across the site. Importing the CSS here, at
// the point App.jsx used to import the pages, keeps the cascade
// byte-for-byte what it was. It costs ~25 KB of CSS in the main bundle.
//
// ORDER MATTERS and must match what eager imports would produce: each page in
// App.jsx's route order, with the component CSS it pulls in placed before it
// (depth-first). When a lazy page is added, or one starts importing a new
// component stylesheet, add it here in the same position.
import '../components/Carousel.css';
import '../components/VideoPlaceholder/VideoPlaceholder.css';
import './Kids/Kids.css';
import '../components/ProductCard/ProductCard.css';
import './Shop/Shop.css';
import './Brands/Brands.css';
import '../components/PackagesPanel/PackagesPanel.css';
import './Business/Business.css';
import './Agency/Agency.css';
import './About/About.css';
import './NotFound/NotFound.css';
