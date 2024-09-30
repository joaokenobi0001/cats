import React, { useContext } from 'react';
import { Route, Routes } from 'react-router-dom';
import UserHeader from '../Components/UserHeader';
import Feed from './Feed';
import UserPhotoPost from './UserPhotoPost';
import UserStats from './UserStats';
import { UserContext } from '../context/UserContext'; // Corrigido aqui
import Head from '../Components/Head';
import NotFound from './NotFound';

function User() {
  const { user } = useContext(UserContext); // Corrigido aqui

  if (!user) {
    return <Navigate to="/login" />; // Redireciona para login se user for undefined
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
