import { useContext } from 'react';
import { Link } from 'react-router-dom';
import CatsIcon from '../../Assets/LogoCatWhite.jpg';
import UserContext from '../../context/UserContext';
import './style.css';

function Header() {
  const { data, userLogout } = useContext(UserContext);  // Desestruturando userLogout para permitir o logout

  return (
    <header className="StyledHeader">
      <nav className="container">
        <Link className="logo" to="/" aria-label="Cats - Home">
          <div className="logo-card">
            <img src={CatsIcon} alt="Logo" className="logo-image" />
          </div>
        </Link>

        {data && data.user ? (
          <div className="user-links">
            <Link className="profile-button" to="/conta">
              Perfil
            </Link>
            <button className="logout-button" onClick={userLogout}>
              Sair
            </button>
          </div>
        ) : (
          <div className="auth-links">
            <Link className="login-header" to="/login">
              Login
            </Link>
            <Link className="register-header" to="/Cadastro">
              Cadastro
            </Link>
          </div>
        )}
      </nav>
    </header>
  );
}

export default Header;