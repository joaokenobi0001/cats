import React from 'react';
import './style.css'; // Importa o CSS

function Title({ type, children }) {
  return (
    <div className="StyledTitle">
      {type === 'h1' && <h1>{children}</h1>}
      {type === 'h2' && <h2>{children}</h2>}
      {type === 'h3' && <h2>{children}</h2>}
    </div>
  );
}

export default Title;
