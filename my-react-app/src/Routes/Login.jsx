import React, { useContext } from 'react';
import { Navigate, Route, Routes } from 'react-router-dom';
import UserContext from '../context/UserContext'; // Importa corretamente o UserContext

//import LoginCreate from './LoginCreate';
import LoginForm from './LoginForm';
import LoginPasswordLost from './LoginPasswordLost';
import LoginPasswordReset from './LoginPasswordReset';
import NotFound from './NotFound';

function Login() {
  const { user } = useContext(UserContext);

  if (user) return <Navigate to="/conta" />;
  return (
    <section className='login'>
      <div className='forms'>
        <Routes>
          <Route path='/' element={<LoginForm />} />
          <Route path='perdeu' element={<LoginPasswordLost />} />
          <Route path='resetar' element={<LoginPasswordReset />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </div>
    </section>
  );
}

export default Login;
