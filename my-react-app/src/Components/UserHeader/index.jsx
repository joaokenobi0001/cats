import React, { useContext, useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';
import UserContext from '../../context/UserContext';
import Title from '../Title';
import UserHeaderNav from '../UserHeaderNav';
import './style.css';

function UserHeader() {
  const [title, setTitle] = useState('');
  const location = useLocation();
  const { data } = useContext(UserContext);

  useEffect(() => {
    const { pathname } = location;
    if (!data) return;

    switch (pathname) {
      case '/conta/postar':
        setTitle(data.user.role === 'admin' ? 'Postar' : 'My cats');
        break;
      case '/conta/estatisticas':
        setTitle(data.user.role === 'admin' ? 'Usuários' : 'My cats');
        break;
      default:
        setTitle('My cats');
    }
  }, [location, data]);

  if (!data) return null; // Certifique-se de que os dados do usuário foram carregados

  return (
    <header className="StyledUserHeader">
      <Title type="h1">{title}</Title>
      <UserHeaderNav />
    </header>
  );
}

export default UserHeader;
