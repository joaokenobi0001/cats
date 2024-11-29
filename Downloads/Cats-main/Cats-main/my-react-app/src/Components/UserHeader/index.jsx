import React, { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';
import Title from '../Title';
import UserHeaderNav from '../UserHeaderNav';
import './style.css';

function UserHeader() {
  const [title, setTitle] = useState('');
  const location = useLocation();

  useEffect(() => {
    const { pathname } = location;
    switch (pathname) {
      case '/conta/postar':
        setTitle('Poste sua foto');
        break;
      case '/conta/estatisticas':
        setTitle('Estatísticas');
        break;
      default:
        setTitle('Minha conta');
    }
  }, [location]);

  return (
    <header className="StyledUserHeader">
      <Title type="h1">{title}</Title>
      <UserHeaderNav />
    </header>
  );
}

export default UserHeader;
