// src/Routes/ProtectedRoute.jsx
import React from 'react';
import { Navigate } from 'react-router-dom';
import { useUserContext } from '../context/UserContext'; // Certifique-se de importar corretamente

const ProtectedRoute = ({ children }) => {
    const { user } = useUserContext() || {}; // Use o hook para obter o usuário

    if (!user) {
        // Se não houver usuário, redirecione para o login
        return <Navigate to="/login" />;
    }

    return children; // Retorne os filhos se o usuário estiver autenticado
};

export default ProtectedRoute;
