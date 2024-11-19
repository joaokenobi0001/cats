import React from 'react';
import './style.css';

function ModelAddAdmin({ show, handleClose }) {
  if (!show) return null; 
  return (
    <div className="modal">
      <div className="modal-content">
        <input
          type="text"
          value={userData.name || ''}
          onChange={(e) => setUserData({ ...userData, name: e.target.value })}
          placeholder="Nome"
          aria-label="Nome do usuário"
        />
        <input
          type="email"
          value={userData.email || ''}
          onChange={(e) => setUserData({ ...userData, email: e.target.value })}
          placeholder="Email"
          aria-label="Email do usuário"
        />
        <input
          type="password"
          value={userData.password || ''}
          onChange={(e) => setUserData({ ...userData, password: e.target.value })}
          placeholder="Senha"
          aria-label="Senha do usuário"
        />

        {/* O handleSubmit é chamado quando o botão de adicionar é clicado */}
        <button onClick={handleSubmit} className="add-btn">
          Adicionar Usuário
        </button>
        <button onClick={handleClose} className="close-btn">Cancelar</button>
      </div>
    </div>
  );
}

export default ModelAddAdmin;
