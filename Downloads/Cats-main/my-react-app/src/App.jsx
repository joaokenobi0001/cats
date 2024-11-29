import React from 'react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Footer from './Components/Footer';
import Header from './Components/Header';
import { UserStorage } from './context/UserContext';
import './index.css';
import Ajude from './Routes/AjudeOsAnimais';
import Home from './Routes/Home';
import Login from './Routes/Login';
import NotFound from './Routes/NotFound';
import ProtectedRoute from './Routes/ProtectedRoute';
import User from './Routes/User';

function App() {
  return (
    <div className="App">
    <BrowserRouter>
      <UserStorage> 
        <Header />
        <main className='App-body'>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="doe" element={<Ajude />} />
            <Route path="login/*" element={<Login />} />
            <Route
              path="conta/*"
              element={
                <ProtectedRoute>
                  <User/>
                </ProtectedRoute>
              }
            />
            <Route path="*" element={<NotFound />} />
          </Routes>
        </main>
        <Footer />
      </UserStorage>
    </BrowserRouter>
    </div>
  );
}

export default App;
