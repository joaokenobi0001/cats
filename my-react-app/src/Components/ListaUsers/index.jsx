import React from 'react';
import './ListaUsers.css';

function ListaUsers({ data }) {
  return (
    <section className="StyledListaUsers">
      <h2>Lista de Usuários</h2>
      <table>
        <thead>
          <tr>
            <th>ID</th>
            <th>Nome</th>
            <th>Email</th>
            <th>Função</th>
            <th>Bloqueado</th>
          </tr>
        </thead>
        <tbody>
          {data.map((user) => (
            <tr key={user.id}>
              <td>{user.id}</td>
              <td>{user.name}</td>
              <td>{user.email}</td>
              <td>{user.role}</td>
              <td>{user.isBlocked ? 'Sim' : 'Não'}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </section>
  );
}

export default ListaUsers;
