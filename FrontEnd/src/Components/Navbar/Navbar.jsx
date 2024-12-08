import React, { useState } from "react";
import './Navbar.css';

function Navbar() {
  // Estado para controlar se o menu está aberto ou fechado
  const [menuOpen, setMenuOpen] = useState(false);

  // Função para alternar o estado do menu
  const toggleMenu = () => {
    setMenuOpen(!menuOpen);
  };

  return (
    <>
     

      <div className="navbar flex">
       <span>Tainá Souza</span>

        <div className="navbar__menu-icon" onClick={toggleMenu}>
          <span className="bar"></span>
          <span className="bar"></span>
          <span className="bar"></span>
        </div>

    
        <nav className={`navbar__links ${menuOpen ? 'open' : ''}`}>
          <a className="nav-link" href="#home">Home</a>
          <a className="nav-link" href="#sobre">Sobre Mim</a>
          <a className="nav-link" href="#servicos">Serviços</a>
          <a className="nav-link" href="#queixas">Queixas</a>
          <a className="nav-link" href="#faq">FAQ</a>
        </nav>
      </div>
    </>
  );
}

export default Navbar;
