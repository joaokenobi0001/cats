import React, { useEffect, useState } from 'react';
import './style.css';

function ModelAdd({ userToAdd, handleAddUser, handleClose, show }) {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: ""
  });

  // Reseta os dados do formulário quando o modal é fechado
  useEffect(() => {
    if (!show) {
      setFormData({ name: "", email: "", password: "" });
    }
  }, [show]); // Dependência de 'show' para garantir que o modal seja atualizado

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = () => {
    // Verificar se todos os campos estão preenchidos antes de enviar
    if (!formData.name || !formData.email || !formData.password) {
      console.error("Campos obrigatórios faltando!");
      return;
    }

    console.log("Adicionando usuário:", formData);
    handleAddUser(formData); // Chama a função de adicionar usuário, passando formData

    handleClose(); // Fecha o modal
  };

  if (!show) return null;

  return (
    <div className={`modal ${show ? '' : 'hidden'}`}>
      <div className="modal-content">
        <h3>Adicionar Usuário</h3>
        <input
          type="text"
          name="name"
          value={formData.name}
          onChange={handleChange}
          placeholder="Nome"
          aria-label="Nome do usuário"
        />
        <input
          type="email"
          name="email"
          value={formData.email}
          onChange={handleChange}
          placeholder="Email"
          aria-label="Email do usuário"
        />
        <input
          type="password"
          name="password"
          value={formData.password}
          onChange={handleChange}
          placeholder="Senha"
          aria-label="Senha do usuário"
        />
        <button onClick={handleSubmit} className="add-btn">
          Adicionar Usuário
        </button>
        <button onClick={handleClose} className="close-btn">
          Cancelar
        </button>
      </div>
    </div>
  );
}

export default ModelAdd;
