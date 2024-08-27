import React from 'react';

const Gallery = () => {
  return (
    <div className="gallery-container" data-aos="fade-up">
      <div className="skeleton-grid" >
        {Array(20).fill().map((_, index) => (
          <div key={index} className="skeleton-box"></div>
        ))}
      </div>
      <h1 className="message" >Coming soon...</h1>
    </div>
  );
};

export default Gallery;
