import React from 'react';
import { Link } from 'react-router-dom';
import './style.css'; // Importa o CSS

function Header({ user }) {
  return (
    <header className="StyledHeader">
      <nav className="container">
        <Link className="logo" to="/" aria-label="Dogs - Home">
          Cats <span style={{color: "pink", fontSize: '50px'}}>.</span>
        </Link>
        {user ? (
          <Link className="login-header" to="/conta">
            {user.nome}
          </Link>
        ) : (
          <Link className="login-header" to="/login">
            Login / Criar
          </Link>
        )}
      </nav>
    </header>
  );
}

export default Header;
