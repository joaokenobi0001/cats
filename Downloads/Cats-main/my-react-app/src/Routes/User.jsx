import React, { useContext } from 'react';
import { Route, Routes } from 'react-router-dom';
import Head from '../Components/Head';
import UserHeader from '../Components/UserHeader';
import UserContext from '../context/UserContext';
import Feed from './Feed';
import NotFound from './NotFound';
import UserPhotoPost from './UserPhotoPost';
import Users from './Users';

function User() {
  const { data } = useContext(UserContext);

  if (!data) {
    return null; 
  }

  return (
    <section className="container">
      <Head title="Minha conta" />
      <UserHeader />
      <Routes>
        <Route path="/" element={<Feed user={data.user.id} />} />
        {data.user.role === 'admin' && (
          <>
            <Route path="postar" element={<UserPhotoPost />} />
            <Route path="usuarios" element={<Users />} />
          </>
        )}
        <Route path="*" element={<NotFound />} />
      </Routes>
    </section>
  );
}

export default User;
