import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { get_users } from '../api/user';
import ErrorMsg from '../Components/ErrorMsg';
import ListaUsers from '../Components/ListaUsers';
import Loading from '../Components/Loading';

function UserStats() {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  
  // Estados para os inputs de filtro
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [email, setEmail] = useState('');

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    const token = window.localStorage.getItem('token');
    if (!token) {
      setError("Token não encontrado no localStorage!");
      setLoading(false);
      return;
    }

    try {
      const { url, options } = get_users(token);
      const response = await axios({
        url,
        method: options.method,
        headers: options.headers,
        params: { firstName, lastName, email }, // Enviar parâmetros para filtro
      });

      if (response.status !== 200) {
        setError("Erro ao buscar usuários: " + response.statusText);
      } else {
        setData(response.data);
      }
    } catch (fetchError) {
      setError(fetchError.message);
    } finally {
      setLoading(false);
    }
  };

  const handleSearch = (e) => {
    e.preventDefault();
    setLoading(true);
    fetchData();
  };

  if (loading) return <Loading />;
  if (error) return <ErrorMsg error={error} />;

  return (
    <section className="StyledListaUsers">
      {data && data.user && data.user.length > 0 ? (
        <ListaUsers data={data.user} />
      ) : (
        <p>Nenhum usuário encontrado.</p>
      )}
    </section>
  );
}

export default UserStats;
