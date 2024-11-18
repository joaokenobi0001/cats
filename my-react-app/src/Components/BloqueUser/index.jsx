import PropTypes from 'prop-types';
import React from 'react';
import './style.css';

function ModalBloquear({ show, handleClose, handleDelete, userToBlock }) {
  return (
    <div className={`modal-bloquear ${show ? 'show' : ''}`} onClick={handleClose}>
      <div className="modal-content-bloquear" onClick={(e) => e.stopPropagation()}>
        <h2>Bloquear Usuário</h2>
        <p>Tem certeza que deseja bloquear este usuário: {userToBlock?.name}? </p>
        <div className="button-group-bloquear">
          <button type="button" className="bloquear" onClick={() => handleDelete(userToBlock.id)}>Bloquear</button>
          <button type="button" className="desbloquear" onClick={() => handleDelete(userToBlock.id)}>Desbloquear</button>
          <button type="button" className="cancel-bloq" onClick={handleClose}>Cancelar</button>
        </div>
      </div>
    </div>
  );
}

ModalBloquear.propTypes = {
  show: PropTypes.bool.isRequired,
  handleClose: PropTypes.func.isRequired,
  handleDelete: PropTypes.func.isRequired,
};

export default ModalBloquear;
