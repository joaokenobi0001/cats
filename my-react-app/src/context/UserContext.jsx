import React, { createContext, useCallback, useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { loginUser, tokenValidate, userGet } from '../api/user';

export const UserContext = createContext();

export const UserStorage = ({ children }) => {
  const [data, setData] = useState(null);
  const [login, setLogin] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  const userLogout = useCallback(() => {
    setData(null);
    setError(null);
    setLogin(false);
    window.localStorage.removeItem('token');
  }, []);

  async function getUser(token) {
    try {
      const { url, options } = await userGet(token);
      const response = await fetch(url, options);
      if (!response.ok) throw new Error('Erro ao obter usuário.');
      const json = await response.json();
      setData(json);
      setLogin(true);
    } catch (error) {
      setError(error.message);
    }
  }

  async function userLogin(email, password) {
    try {
      setError(null);
      setLoading(true);
      const { url, options } = await loginUser({ email, password });
      const tokenRes = await fetch(url, options);
      if (!tokenRes.ok) throw new Error('Erro: login inválido.');
      const { token } = await tokenRes.json();
      window.localStorage.setItem('token', token);
      await getUser(token);
      navigate('/conta');
    } catch (e) {
      setError(e.message);
      setLogin(false);
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    async function autoLogin() {
      const token = window.localStorage.getItem('token');
      if (token) {
        try {
          setError(null);
          setLoading(true);
          const { url, options } = tokenValidate(token);
          const response = await fetch(url, options);
          if (!response.ok) throw new Error('Token inválido!');
          await getUser(token);
        } catch (e) {
          userLogout();
        } finally {
          setLoading(false);
        }
      } else {
        setLogin(false);
      }
    }
    autoLogin();
  }, [userLogout]);

  return (
    <UserContext.Provider value={{ userLogin, userLogout, data, error, loading, login }}>
      {children}
    </UserContext.Provider>
  );
};

export default UserContext;
