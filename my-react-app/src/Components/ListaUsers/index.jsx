import PropTypes from 'prop-types';
import React, { useEffect, useState } from 'react';
import ModalBloquear from '../BloqueUser'; // Importando o modal de bloquear
import EditarUser from '../EditarUser';
import ModalExcluir from '../ExcluirUser';
import './style.css';

function ListaUsers({ data }) {
  const [filteredData, setFilteredData] = useState(data);
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [role, setRole] = useState('');

  const [showModal, setShowModal] = useState(null); // Estado para controlar qual modal está sendo exibido
  const [userToEdit, setUserToEdit] = useState(null);
  const [userToBlock, setUserToBlock] = useState(null);

  const handleClose = () => {
    setShowModal(null); // Fechar qualquer modal
    setUserToEdit(null);
    setUserToBlock(null); // Limpar os dados do usuário
  };

  const handleShowEdit = (user) => {
    setUserToEdit(user);
    setShowModal('edit'); // Mostrar o modal de edição
  };

  const handleShowBlock = (user) => {
    setUserToBlock(user);
    setShowModal('block'); // Mostrar o modal de bloqueio
  };

  const handleShowDelete = (user) => {
    setUserToEdit(user); // Usando o estado de edição para excluir
    setShowModal('delete'); // Mostrar o modal de exclusão
  };

  const handleExcluirUser = (user) => {
    console.log('Excluir usuário', user);
    // Lógica de exclusão aqui
    handleClose(); // Fechar o modal após excluir
  };

  const handleBloquearUser = (user) => {
    console.log('Bloquear usuário', user);
    // Lógica de bloqueio aqui
    handleClose(); // Fechar o modal após bloquear
  };

  const filterData = () => {
    const filtered = data.filter((user) => {
      const matchesName = user.name?.toLowerCase().includes(name.toLowerCase());
      const matchesEmail = user.email?.toLowerCase().includes(email.toLowerCase());
      const matchesRole = user.role?.toLowerCase().includes(role.toLowerCase());

      return matchesName && matchesEmail && matchesRole;
    });
    setFilteredData(filtered);
  };

  useEffect(() => {
    filterData();
  }, [name, email, role, data]);

  return (
    <section className="StyledListaUsers">
      <div className="search-form-wrapper">
        <div className="search-form">
          <input
            type="text"
            placeholder="Nome"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
          <input
            type="email"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          <input
            type="text"
            placeholder="Função"
            value={role}
            onChange={(e) => setRole(e.target.value)}
          />
          <button className="StyledBuscar" type="button" onClick={filterData}>Buscar</button>
        </div>
      </div>
      <table>
        <thead>
          <tr>
            <th>Nome</th>
            <th>Email</th>
            <th>Função</th>
            <th>Bloqueado</th>
            <th></th>
            <th></th>
            <th></th>
          </tr>
        </thead>
        <tbody>
          {filteredData.map((user, index) => (
            <tr key={user.id} className={index === 0 ? 'highlight-row' : ''}>
              <td>{user.name || 'Nome não disponível'}</td>
              <td>{user.email || 'Email não disponível'}</td>
              <td>{user.role || 'Função não especificada'}</td>
              <td>{user.isBlocked ? 'Sim' : 'Não'}</td>
              <td>
                <img 
                  src="/src/Assets/excluir.svg" 
                  alt="Excluir" 
                  title="Excluir usuário" 
                  className="icon" 
                  onClick={() => handleShowDelete(user)}
                />
              </td>
              <td>
                <img 
                  src="/src/Assets/editar.svg" 
                  alt="Editar" 
                  title="Editar usuário" 
                  className="icon" 
                  onClick={() => handleShowEdit(user)}
                />
              </td>
              <td>
                <img 
                  src="/src/Assets/bloquear.svg" 
                  alt="Bloquear" 
                  title="Bloquear usuário" 
                  className="icon" 
                  onClick={() => handleShowBlock(user)}
                />
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      {/* Exibição do modal de edição */}
      {showModal === 'edit' && userToEdit && (
        <EditarUser 
          user={userToEdit} 
          show={showModal === 'edit'} 
          handleClose={handleClose} 
        />
      )}

      {/* Exibição do modal de exclusão */}
      {showModal === 'delete' && userToEdit && (
        <ModalExcluir
          user={userToEdit} 
          show={showModal === 'delete'} 
          handleClose={handleClose} 
        />
      )}

      {/* Exibição do modal de bloqueio */}
      {showModal === 'block' && userToBlock && (
        <ModalBloquear
          show={showModal === 'block'}
          handleClose={handleClose}
          handleBlock={() => handleBloquearUser(userToBlock)} 
        />
      )}
    </section>
  );
}

ListaUsers.propTypes = {
  data: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.number.isRequired,
      name: PropTypes.string,
      email: PropTypes.string,
      role: PropTypes.string,
      isBlocked: PropTypes.bool,
    })
  ),
};

export default ListaUsers;
