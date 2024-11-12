import React, { useState } from 'react';
import './style.css';

function Image({ alt, src }) {
  const [skeleton, setSkeleton] = useState(true);

  function handleLoad({ target }) {
    setSkeleton(false);
    target.style.opacity = 1;
  }

  return (
    <div className="StyleCard">
        <img src={src} className="img" alt={alt} onLoad={handleLoad} />
    </div>
  );
}

export default Image;
