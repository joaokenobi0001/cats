import React, { useContext } from 'react';
import { Navigate, Route, Routes } from 'react-router-dom'; // Certifique-se de que Navigate está importado
import Head from '../Components/Head';
import UserHeader from '../Components/UserHeader';
import UserContext from '../context/UserContext'; // Corrigido aqui
import Feed from './Feed';
import NotFound from './NotFound';
import UserPhotoPost from './UserPhotoPost';
import UserStats from './UserStats';

function User() {
  const { user } = useContext(UserContext); // Corrigido aqui

  // Redireciona para login se user for undefined
  if (!user) {
    return <Navigate to="/login" />;
  }

  return (
    <section className="container">
      <Head title="Minha conta" />
      <UserHeader />
      <Routes>
        <Route path="/" element={<Feed user={user.id} />} />
        <Route path="postar" element={<UserPhotoPost />} />
        <Route path="estatisticas" element={<UserStats />} />
        <Route path="*" element={<NotFound />} />
      </Routes>
    </section>
  );
}

export default User;
