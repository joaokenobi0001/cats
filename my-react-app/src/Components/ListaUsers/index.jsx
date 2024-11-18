import PropTypes from 'prop-types';
import React, { useEffect, useState } from 'react';
import { bloq_users, delete_users, desbloq_users, edit_users } from '../../api/user';
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

  const handleBloquearUser = async (id) => {
    const token = localStorage.getItem('token'); // Obtenha o token do localStorage (ou outra fonte)
    
    if (!token) {
      console.error('Token de autenticação não encontrado.');
      return;
    }
  
    const { url, options } = bloq_users(token, id);
  
    try {
      const response = await fetch(url, options);
      
      if (response.ok) {
        console.log(`Usuário com ID ${id} bloqueado com sucesso.`);
        // Atualize os dados localmente, se necessário
        const updatedData = filteredData.map((user) =>
          user.id === id ? { ...user, isBlocked: true } : user
        );
        setFilteredData(updatedData);
      } else {
        console.error('Erro ao bloquear o usuário:', await response.json());
      }
    } catch (error) {
      console.error('Erro ao conectar com a API:', error);
    } finally {
      handleClose(); // Feche o modal, independentemente do resultado
    }
  };

  const handleDesbloquearUser = async (id) => {
    const token = localStorage.getItem('token');
  
    if (!token) {
      console.error('Token de autenticação não encontrado.');
      return;
    }
  
    const { url, options } = desbloq_users(token, id);
  
    try {
      const response = await fetch(url, options);
      if (response.ok) {
        console.log(`Usuário com ID ${id} desbloqueado com sucesso.`);
        const updatedData = filteredData.map((user) =>
          user.id === id ? { ...user, isBlocked: false } : user
        );
        setFilteredData(updatedData);
      } else {
        console.error('Erro ao desbloquear o usuário:', await response.json());
      }
    } catch (error) {
      console.error('Erro ao conectar com a API:', error);
    }
  };
  
  const handleExcluirUser = async (id) => {
    const token = localStorage.getItem('token');
  
    if (!token) {
      console.error('Token de autenticação não encontrado.');
      return;
    }
  
    const { url, options } = delete_users(token, id);
  
    try {
      const response = await fetch(url, options);
      if (response.ok) {
        console.log(`Usuário com ID ${id} excluído com sucesso.`);
        setFilteredData(filteredData.filter((user) => user.id !== id));
      } else {
        console.error('Erro ao excluir o usuário:', await response.json());
      }
    } catch (error) {
      console.error('Erro ao conectar com a API:', error);
    }finally {
      handleClose(); // Feche o modal, independentemente do resultado
    }
  };
  
  const handleEditUser = async (id, updatedUserData) => {
    if (!id) {
      console.error('ID do usuário não encontrado.');
      return;
    }
  
    const token = localStorage.getItem('token');
    if (!token) {
      console.error('Token de autenticação não encontrado.');
      return;
    }
  
    const { url, options } = edit_users(token, id);
    options.body = JSON.stringify(updatedUserData);
  
    try {
      const response = await fetch(url, options);
      if (response.ok) {
        console.log(`Usuário com ID ${id} editado com sucesso.`);
        const updatedData = filteredData.map((user) =>
          user.id === id ? { ...user, ...updatedUserData } : user
        );
        setFilteredData(updatedData);
      } else {
        console.error('Erro ao editar o usuário:', await response.json());
      }
    } catch (error) {
      console.error('Erro ao conectar com a API:', error);
    }
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
        user={userToEdit} // Certifique-se de que `userToEdit` está correto
        show={showModal === 'edit'}
        handleClose={handleClose}
        handleUpdateUser={(updatedUserData) =>
          handleEditUser(userToEdit.id, updatedUserData) // Passa o ID correto
        }
      />      
      )}

      {/* Exibição do modal de exclusão */}
      {showModal === 'delete' && userToEdit && (
        <ModalExcluir
        userId={userToEdit.id} // Passa o ID do usuário selecionado
        show={showModal === 'delete'}
        handleClose={handleClose}
        handleDelete={(id) => {
          console.log('Excluindo usuário com ID:', id);
          handleExcluirUser(id); // Função que realiza a exclusão
        }}
      />
      
      )}

      {/* Exibição do modal de bloqueio */}
      {showModal === 'block' && userToBlock && (
      <ModalBloquear
        show={showModal === 'block'}
        handleClose={handleClose}
        handleBloquear={(id) => handleBloquearUser(id)}
        handleDesbloquear={(id) => handleDesbloquearUser(id)}
        userToBlock={userToBlock}
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
