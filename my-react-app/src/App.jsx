import React from 'react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Footer from './Components/Footer';
import Header from './Components/Header';
import Photo from './Components/Photo';
import { UserProvider } from './context/UserContext'; // Importa o UserProvider
import './index.css';
import Ajude from './Routes/AjudeOsAnimais'; // Corrigido para um caminho mais claro
import Home from './Routes/Home';
import Login from './Routes/Login';
import NotFound from './Routes/NotFound';
import ProtectedRoute from './Routes/ProtectedRoute';
import User from './Routes/User';
import UserProfile from './Routes/UserProfile';

function App() {
  return (
    <UserProvider> {/* Envolve o BrowserRouter com UserProvider */}
      <BrowserRouter>
        <Header />
        <main className='App-body'>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="doe" element={<Ajude />} />
            <Route path="login/*" element={<Login />} />
            <Route path="photo/:id" element={<Photo />} />
            <Route path="perfil/:user" element={<UserProfile />} />
            <Route
              path="conta/*"
              element={
                <ProtectedRoute>
                  <User />
                </ProtectedRoute>
              }
            />
            <Route path="*" element={<NotFound />} />
          </Routes>
        </main>
        <Footer />
      </BrowserRouter>
    </UserProvider>
  );
}

export default App;
