import React, { useContext } from 'react';
import { Link } from 'react-router-dom';
import CatsIcon from '../../Assets/LogoCatWhite.jpg';
import UserContext from '../../context/UserContext';
import './style.css';

function Header() {
  const { data } = useContext(UserContext);

  return (
    <header className="StyledHeader">
      <nav className="container">
        <Link className="logo" to="/" aria-label="Cats - Home">
          <div className="logo-card">
            <img src={CatsIcon} alt="Logo" className="logo-image" />
          </div>
        </Link>
        {data && data.user ? (
          <Link className="login-header" to="/conta">
            {data.user.name}
          </Link>
        ) : (
          <Link className="login-header" to="/login">
            Login
          </Link>
        )}
      </nav>
    </header>
  );
}

export default Header;
