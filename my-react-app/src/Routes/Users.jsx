import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { get_users } from '../api/user';
import ErrorMsg from '../Components/ErrorMsg';
import Loading from '../Components/Loading';

function UserStats() {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const token = window.localStorage.getItem('token');
    if (!token) {
      console.error("Token não encontrado no localStorage!");
      setLoading(false);
      setError("Token não encontrado no localStorage!");
      return;
    }

    async function getData() {
      try {
        const { url, options } = get_users(token);
        
        if (!url || !options) {
          throw new Error('URL ou opções não foram definidas.');
        }

        const response = await axios({
          url,
          method: options.method,
          headers: options.headers,
        });

        if (response.status !== 200) {
          setError("Erro ao buscar usuários: " + response.statusText);
        } else {
          setData(response.data);
          console.log("Dados da API:", response.data);
        }
      } catch (fetchError) {
        setError(fetchError.message);
        console.error('Erro durante a requisição:', fetchError);
      } finally {
        setLoading(false);
      }
    }

    getData();
  }, []);

  if (loading) return <Loading />;
  if (error) return <ErrorMsg error={error} />;

  return (
    <section className="StyledListaUsers">
      <h2>Lista de Usuários</h2>
      {data && data.user && data.user.length > 0 ? (
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
            {data.user.map((user) => (
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
      ) : (
        <p>Nenhum usuário encontrado.</p>
      )}
    </section>
  );
}

export default UserStats;
