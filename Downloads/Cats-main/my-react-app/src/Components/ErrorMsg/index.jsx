import React from 'react';
import './style.css'; // Importa o CSS

function ErrorMsg({ error }) {
  if (!error) return null;
  return <p className="StyledErrorMsg">{error}</p>;
}

export default ErrorMsg;
