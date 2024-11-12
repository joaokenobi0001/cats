import React from 'react';
import { Link } from 'react-router-dom';
import CatsIcon from '../../Assets/LogoCatPink.jpg';
import './style.css';

function Footer() {
  return (
    <footer className="StyledFooter">
      <Link to="/doe" className="donate-link">
        Doe
      </Link>
      <img src={CatsIcon} alt="cats" className="cats-icon" />
      <p>Cats. Alguns direitos reservados.</p>
    </footer>
  );
}

export default Footer;
