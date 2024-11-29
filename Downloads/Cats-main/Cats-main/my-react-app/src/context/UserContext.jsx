import React, { createContext, useContext, useState } from 'react';

// Criação do contexto
const UserContext = createContext();

// Provider do contexto
export const UserProvider = ({ children }) => {
    const [user, setUser] = useState(null);

    const userLogout = () => {
        // Lógica de logout aqui
        setUser(null);
    };

    return (
        <UserContext.Provider value={{ user, setUser, userLogout }}>
            {children}
        </UserContext.Provider>
    );
};

// Hook personalizado para acessar o contexto
export const useUserContext = () => useContext(UserContext);

// Exportação padrão do contexto
export default UserContext;
