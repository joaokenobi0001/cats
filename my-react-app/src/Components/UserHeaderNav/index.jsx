import React, { useContext, useEffect, useState } from 'react';
import { NavLink, useLocation, useNavigate } from 'react-router-dom';
//import { ReactComponent as AdicionarFoto } from '../../Assets/adicionar.svg';
//import { ReactComponent as Estatisticas } from '../../Assets/estatisticas.svg';
//import { ReactComponent as MinhasFotos } from '../../Assets/feed.svg';
//import { ReactComponent as Sair } from '../../Assets/sair.svg';
//import UserContext from '../../Context/UserContext';
import useMedia from '../../Utils/useMedia';
import './style.css'; // Importa o CSS

function UserHeaderNav() {
  const { userLogout } = useContext(UserContext);
  const navigate = useNavigate();
  const mobile = useMedia('(max-width: 40rem)');
  const [mobileMenu, setMobileMenu] = useState(false);

  const { pathname } = useLocation();

  useEffect(() => {
    setMobileMenu(false)
  }, [pathname]);

  function handleLogout() {
    userLogout();
    navigate('/login');
  }

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
          <MinhasFotos />
          {mobile && 'Minhas fotos'}
        </NavLink>

        <NavLink to="/conta/estatisticas">
          <Estatisticas />
          {mobile && 'Estatísticas'}
        </NavLink>

        <NavLink to="/conta/postar">
          <AdicionarFoto />
          {mobile && 'Adicionar Foto'}
        </NavLink>

        <button onClick={handleLogout}>
          <Sair />
          {mobile && 'Sair'}
        </button>
      </nav>
    </>
  );
}

export default UserHeaderNav;
