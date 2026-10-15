import { Link } from 'react-router-dom';

// A link that may leave the site. A full URL (http/https) is a plain <a> —
// a router Link would treat it as a path inside the app — and anything else
// (a path, or a #section on the current page) is a router Link, so it keeps
// the /ar prefix in Arabic and does not reload the page. Used wherever a
// link's target comes from data and can be either, e.g. `shopLink`
// (data/site.js), which is the Odoo store while the Shop page is parked.
export default function SmartLink({ to, ...props }) {
  return /^https?:\/\//.test(to) ? <a href={to} {...props} /> : <Link to={to} {...props} />;
}
