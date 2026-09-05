import { useState } from 'react';
import ImagePlaceholder from '../../components/ImagePlaceholder.jsx';
import { galleryItems, categories } from './data.js';
import './Gallery.css';

export default function Gallery() {
  const [filter, setFilter] = useState('All');
  const shown = filter === 'All' ? galleryItems : galleryItems.filter((g) => g.category === filter);

  return (
    <div className="container gallery-page">
      <span className="card-kicker">The mood</span>
      <h1>Gallery</h1>
      <p className="gallery-intro">A look at the room, the food, and the people who fill it.</p>

      <div className="seg gallery-filters">
        {categories.map((cat) => (
          <button
            key={cat}
            type="button"
            className="seg-opt"
            data-active={filter === cat}
            onClick={() => setFilter(cat)}
          >
            {cat}
          </button>
        ))}
      </div>

      <div className="gallery-grid">
        {shown.map((item) => (
          <figure key={item.label} className="gallery-item">
            <ImagePlaceholder label={item.label} ratio="4 / 5" />
            <figcaption>
              {item.label}
              <span className="gallery-item-tag">{item.category}</span>
            </figcaption>
          </figure>
        ))}
      </div>
    </div>
  );
}
