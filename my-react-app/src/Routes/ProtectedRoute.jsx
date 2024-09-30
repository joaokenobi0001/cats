import React, { useContext } from 'react';
import { Navigate } from 'react-router-dom';
import { UserContext } from '../context/UserContext'; // Corrigido aqui

function ProtectedRoute({ children }) {
  const { user } = useContext(UserContext); // Corrigido aqui

  if (user) {
    return children;
  } else {
    return <Navigate to="/login" />;
  }
}

export default ProtectedRoute;
