import React from 'react';
import { Link } from 'react-router-dom';
import CatsIcon from '../../Assets/LogoCatWhite.jpg';
import Pix from '../../Assets/pix.png';
import './style.css';

function Footer() {
  return (
    <footer className="StyledFooter">
    
      <Link to="/doe" className="donate-link">
          Cats
      </Link>

      
      <img src={CatsIcon} alt="cats" className="cats-icon" />
      <p>Cats. Alguns direitos reservados.</p>
    </footer>
  );
}

export default Footer;
