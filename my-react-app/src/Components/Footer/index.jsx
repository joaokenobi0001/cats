import React from 'react';
import { Link } from 'react-router-dom';
import CatsIcon from '../../Assets/catLogo.svg'; // Importa o SVG como imagem
import './style.css'; // Importa o CSS
function Footer() {
  return (
    <footer className="StyledFooter">
       <Link to="/doe">
          Doe <span><img></img></span>
      </Link>
      <img src={CatsIcon} alt="cats" className="cats-icon" />
      <p>Cats. Alguns direitos reservados.</p>
    </footer>
  );
}

export default Footer;
