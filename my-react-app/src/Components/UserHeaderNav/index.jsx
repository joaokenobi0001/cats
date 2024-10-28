import React, { useContext, useEffect, useState } from 'react';
import { NavLink, useLocation, useNavigate } from 'react-router-dom';
import UserContext from '../../context/UserContext'; // Certifique-se de que o caminho está correto
import useMedia from '../../Utils/useMedia';
import './style.css'; // Importa o CSS

function UserHeaderNav() {
  const { data, userLogout } = useContext(UserContext); // Verifique se userLogout está disponível aqui
  const navigate = useNavigate();
  const mobile = useMedia('(max-width: 40rem)');
  const [mobileMenu, setMobileMenu] = useState(false);
  const { pathname } = useLocation();

  useEffect(() => {
    setMobileMenu(false);
  }, [pathname]);

  const handleLogout = () => {
    console.log("Tentando sair..."); // Verificação para depuração
    userLogout(); // Chama a função de logout
    console.log("Usuário deslogado"); // Verificação para depuração
    navigate('/login'); // Redireciona para a página de login após o logout
  };

  return (
    <>
      {mobile && (
        <button
          aria-label="Menu"
          className={`mobile-button ${mobileMenu ? 'active' : ''}`}
          onClick={() => setMobileMenu(!mobileMenu)}
        ></button>
      )}
      <nav className={`StyledHeaderUserNav ${mobile ? 'mobile' : ''} ${mobileMenu ? 'active' : ''}`}>
        <NavLink to="/conta" end>
          <img src="/src/Assets/feed.svg" alt="Minhas Fotos" />
          {mobile && 'Meus gatos'}
        </NavLink>
        {data && data.user.role === 'admin' && ( 
          <>
            <NavLink to="/conta/estatisticas">
              <img src="/src/Assets/estatisticas.svg" alt="Usuários" />
              {mobile && 'Usuários'}
            </NavLink>
            <NavLink to="/conta/postar">
              <img src="/src/Assets/adicionar.svg" alt="Adicionar Foto" />
              {mobile && 'Postar'}
            </NavLink>
          </>
        )}
        <button onClick={handleLogout} aria-label="Sair" className="logout-button">
          <img src="/src/Assets/sair.svg" alt="Sair" />
          {mobile && 'Sair'}
        </button>
      </nav>
    </>
  );
}

export default UserHeaderNav;
