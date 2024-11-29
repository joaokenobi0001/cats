import React, { useEffect, useState } from 'react';
import Button from '../Components/Button';
import ErrorMsg from '../Components/ErrorMsg';

function Perfil() {
  const [user, setUser] = useState(null);  // Armazena os dados do usuário
  const [error, setError] = useState(null);  // Armazena erros de requisição
  const [loading, setLoading] = useState(true);  // Controla o estado de carregamento

  // Pega o token JWT armazenado (pode ser no localStorage, sessionStorage, ou cookies)
  const token = localStorage.getItem('token');  // Supondo que o token está no localStorage

  useEffect(() => {
    if (!token) {
      setError("Usuário não está logado");
      setLoading(false);
      return;
    }

    // Fazendo a requisição para o backend para pegar o perfil do usuário
    const fetchProfile = async () => {
      try {
        const response = await fetch('http://localhost:5000/api/users/profile', {
          method: 'GET',
          headers: {
            'Authorization': `Bearer ${token}`,  // Passa o token no cabeçalho
          },
        });

        if (!response.ok) {
          const errorData = await response.json();
          setError(errorData.error || "Erro ao recuperar o perfil");
        } else {
          const data = await response.json();
          setUser(data.user);  // Armazena os dados do usuário na variável de estado
        }
      } catch (error) {
        setError("Erro ao conectar com o servidor");
      } finally {
        setLoading(false);
      }
    };

    fetchProfile();
  }, [token]);

  // Exibe a tela de carregamento ou erro se houver
  if (loading) return <div>Carregando...</div>;

  if (error) return <ErrorMsg error={error} />;

  // Exibe as informações do perfil do usuário
  return (
    <div className="perfil-container">
      <header>
        <h1>Perfil do Usuário</h1>
      </header>
      <main>
        <div className="perfil-info">
          <p><strong>Usuário:</strong> {user.username}</p>
          <p><strong>Email:</strong> {user.email}</p>
        </div>
        <Button content="Editar Perfil" onClick={() => alert('Funcionalidade de editar perfil ainda não implementada')} />
      </main>
      <footer>
        <Button content="Sair" onClick={() => {
          // Realiza o logout (limpa o token e redireciona para a página de login)
          localStorage.removeItem('token');
          window.location.href = '/login';  // Redireciona para o login (ou outra página)
        }} />
      </footer>
    </div>
  );
}

export default Perfil;
