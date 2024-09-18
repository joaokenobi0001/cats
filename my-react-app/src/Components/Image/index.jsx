import React, { useState } from 'react';
import './style.css'; // Certifique-se de que este caminho está correto

function Image({ alt, ...props }) {
  const [skeleton, setSkeleton] = useState(true);

  function handleLoad({ target }) {
    setSkeleton(false);
    target.style.opacity = 1;
  }

  return (
    <div className="StyledImage">
      {skeleton && <div className="skeleton"></div>}
      <img {...props} className='img' alt={alt} onLoad={handleLoad} />
    </div>
  );
}

export default Image;
