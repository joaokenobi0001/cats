import PropTypes from 'prop-types';
import React, { useState } from 'react';
import './style.css';

function EditarUser({ user, show, handleClose, handleUpdateUser }) {
  if (!user) return null; // Verifica se há um usuário para editar.

  const [name, setName] = useState(user.name);
  const [email, setEmail] = useState(user.email);
  const [role, setRole] = useState(user.role);

  const handleSave = () => {
    const updatedUser = { ...user, name, email, role };
    handleUpdateUser(updatedUser); // Passa o usuário atualizado para a função
    handleClose(); // Fecha o modal após salvar
  };

  return (
    <div className={`modal-editar-user ${show ? 'show' : ''}`} onClick={handleClose}>
      <div className="modal-content-editar-user" onClick={(e) => e.stopPropagation()}>
        <h2 className="modal-title-editar">Editar Usuário</h2>
        <form className="modal-form">
          <label>
            Nome:
            <input 
              type="text" 
              value={name} 
              onChange={(e) => setName(e.target.value)} 
              className="modal-input"
              placeholder="Digite o nome do usuário"
            />
          </label>
          <label>
            Email:
            <input 
              type="email" 
              value={email} 
              onChange={(e) => setEmail(e.target.value)} 
              className="modal-input"
              placeholder="Digite o email"
            />
          </label>
          <label>
            Função:
            <input 
              type="text" 
              value={role} 
              onChange={(e) => setRole(e.target.value)} 
              className="modal-input"
              placeholder="Digite a função"
            />
          </label>
          <div className="modal-buttons-editar">
            <button type="button" onClick={handleClose} className="btn-cancel-editar">Cancelar</button>
            <button type="button" onClick={handleSave} className="btn-save-editar">Salvar</button>
          </div>
        </form>
      </div>
    </div>
  );
}

EditarUser.propTypes = {
  user: PropTypes.object,
  show: PropTypes.bool,
  handleClose: PropTypes.func.isRequired,
  handleUpdateUser: PropTypes.func.isRequired, // Função para atualizar o usuário
};

export default EditarUser;
