import { createContext, useState, useCallback, useEffect, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import PropTypes from 'prop-types';
import { loginUser, tokenValidate, userGet } from '../api/user'; // Supondo que você tenha essas funções de API

export const UserContext = createContext();

export const UserProvider = ({ children }) => {
  const [data, setData] = useState(null);
  const [login, setLogin] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  // Função para fazer logout
  const userLogout = useCallback(() => {
    setData(null);
    setError(null);
    setLogin(false);
    window.localStorage.removeItem('token');
    navigate('/login'); // Redireciona para login após o logout
  }, [navigate]);

  // Função para obter os dados do usuário
  const getUser = async (token) => {
    try {
      const { url, options } = await userGet(token);
      const response = await fetch(url, options);

      if (!response.ok) throw new Error('Erro ao obter dados do usuário.');

      const contentType = response.headers.get('Content-Type');
      // Verifica se a resposta é JSON
      if (!contentType || !contentType.includes('application/json')) {
        throw new Error('Resposta inválida: não é JSON.');
      }

      const json = await response.json();
      setData(json);
      setLogin(true);
    } catch (err) {
      setError(err.message);
      setLogin(false); // Caso haja erro, mantém o estado de login como false
    }
  };

  // Função para fazer login
  const userLogin = async (email, password) => {
    try {
      setError(null);
      setLoading(true);

      const body = { email, password };
      const { url, options } = loginUser(body);  // Obtendo URL e opções de login

      const response = await fetch(url, options);

      // Verificando o tipo de conteúdo
      const contentType = response.headers.get('Content-Type');
      console.log('Tipo de conteúdo da resposta:', contentType); // Adicionando log para verificar o tipo de resposta

      if (!contentType || !contentType.includes('application/json')) {
        const textResponse = await response.text(); // Pegando a resposta como texto para debugar
        throw new Error(`Resposta inválida: não é JSON. Resposta: ${textResponse}`);
      }

      const data = await response.json();  // Obtendo resposta JSON

      if (response.ok) {
        console.log('Login bem-sucedido:', data);
        const { token } = data;  // Supondo que a resposta contenha o token

        // Armazenando o token
        window.localStorage.setItem('token', token);

        // Ação adicional
        await getUser(token);
        navigate('/conta');
      } else {
        throw new Error(data.message || 'Erro: login inválido');
      }
    } catch (err) {
      console.error('Erro ao fazer login:', err.message);
      setError(err.message);  // Exibindo erro
      setLogin(false);  // Marcar login como false em caso de erro
    } finally {
      setLoading(false);  // Finalizando o carregamento
    }
  };

  // Efetua login automaticamente se o token estiver disponível
  useEffect(() => {
    const autoLogin = async () => {
      const token = window.localStorage.getItem('token');
      if (token) {
        try {
          setError(null);
          setLoading(true);
          const { url, options } = tokenValidate(token);
          const response = await fetch(url, options);

          // Verificando o tipo de conteúdo
          const contentType = response.headers.get('Content-Type');
          console.log('Tipo de conteúdo da resposta:', contentType); // Adicionando log para verificar o tipo de resposta

          if (!contentType || !contentType.includes('application/json')) {
            const textResponse = await response.text(); // Pegando a resposta como texto para debugar
            throw new Error(`Resposta inválida: não é JSON. Resposta: ${textResponse}`);
          }

          if (!response.ok) throw new Error('Token inválido!');
          await getUser(token);
        } catch (err) {
          console.error('Erro ao validar token:', err.message);
          userLogout();  // Caso o token seja inválido, faz logout
        } finally {
          setLoading(false);
        }
      } else {
        setLogin(false);  // Caso não haja token, mantém login como false
      }
    };
    autoLogin();
  }, [userLogout]);

  return (
    <UserContext.Provider value={{ userLogin, userLogout, data, error, loading, login }}>
      {children}
    </UserContext.Provider>
  );
};

// Validação das propriedades
UserProvider.propTypes = {
  children: PropTypes.node.isRequired, // Validando que 'children' deve ser um node
};

export const useUser = () => useContext(UserContext);
export default UserContext;


