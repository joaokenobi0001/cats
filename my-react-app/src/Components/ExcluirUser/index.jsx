import PropTypes from 'prop-types';
import React from 'react';
import './style.css';

function ModalExcluir({ show, handleClose, handleDelete }) {
  return (
    <div className={`modal-excluir ${show ? 'show' : ''}`} onClick={handleClose}>
      <div className="modal-excluir-content" onClick={(e) => e.stopPropagation()}>
        <h2 className="modal-excluir-title">Excluir Usuário</h2>
        <p className="modal-excluir-text">Tem certeza que deseja excluir este usuário? Essa ação não poderá ser desfeita.</p>
        <div className="modal-excluir-button-group">
          <button type="button" className="modal-excluir-button delete" onClick={handleDelete}>Excluir</button>
          <button type="button" className="modal-excluir-button cancel" onClick={handleClose}>Cancelar</button>
        </div>
      </div>
    </div>
  );
}

ModalExcluir.propTypes = {
  show: PropTypes.bool.isRequired,
  handleClose: PropTypes.func.isRequired,
  handleDelete: PropTypes.func.isRequired,
};

export default ModalExcluir;
