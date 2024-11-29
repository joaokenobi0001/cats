import React from 'react';
import './style.css'; // Importa o CSS

function Input({ label, type, onChange, value, name, error, onBlur }) {
  return (
    <div className="StyledInput">
      <label htmlFor={name}>{label}</label>
      <input
        id={name}
        name={name}
        type={type}
        value={value}
        onChange={onChange}
        onBlur={onBlur}
      />
      {error && <p>{error}</p>}
    </div>
  );
}

export default Input;
