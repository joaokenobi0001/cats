// App.js
import React from 'react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Footer from './Components/Footer';
import Header from './Components/Header';
import Photo from './Components/Photo';
//import { UserProvider } from './Context/UserContext'; // Import your UserProvider
import './index.css';
import Home from './Routes/Home';
import Login from './Routes/Login';
import NotFound from './Routes/NotFound';
//import ProtectedRoute from './Routes/ProtectedRoute';
import User from './Routes/User';
import UserProfile from './Routes/UserProfile';

function App() {
  return (
 
      <BrowserRouter>
        <Header />
        <main className='App-body'>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="login/*" element={<Login />} />
            <Route path="photo/:id" element={<Photo />} />
            <Route path="perfil/:user" element={<UserProfile />} />
            <Route
              path="conta/*"
              element={
            
                  <User />
             
              }
            />
            <Route path="*" element={<NotFound />} />
          </Routes>
        </main>
        <Footer />
      </BrowserRouter>
  
  );
}

export default App;
