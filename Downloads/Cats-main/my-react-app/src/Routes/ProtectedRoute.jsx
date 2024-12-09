import { useContext } from 'react';
import { Navigate } from 'react-router-dom';
import { UserContext } from '../context/UserContext';
import PropTypes from 'prop-types';  // Certifique-se de que você precisa disso

function ProtectedRoute({ children }) {
  const { login } = useContext(UserContext);

  if (login === true) {
    return children;
  } else if (login === false) {
    return <Navigate to="/login" />;
  } else {
    return <></>;
  }
}

// Usando PropTypes para validar 'children'
ProtectedRoute.propTypes = {
  children: PropTypes.node.isRequired,  // Garantir que o componente receberá filhos
};

export default ProtectedRoute;

