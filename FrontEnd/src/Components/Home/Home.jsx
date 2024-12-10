import React from "react";
import './Home.css';
import Agenda from '../Agenda/Agenda';
import { FaWhatsapp } from 'react-icons/fa'; // Importando o ícone do WhatsApp

const Home = () => {
  const whatsappNumber = '5511999999999'; // Substitua pelo número desejado
  const message = 'Olá, gostaria de saber mais informações!'; // Mensagem padrão
  const whatsappUrl = `https://wa.me/${whatsappNumber}?text=${encodeURIComponent(message)}`;

  return (
    <section id="home">
      <div id="cta">
        <h1 className="title">
          Atendimento <br />
          <span>Psicológico</span>
        </h1>
        <p className="description">
          Você merece viver uma vida plena e saudável, não hesite em buscar apoio.
        </p>
     <div className="display">
        <div id="home-btn"> 
          <Agenda />
          
        </div>
        <div className="wpp">
          <a href={whatsappUrl} target="_blank" rel="noopener noreferrer" className="wpp-link">
            <FaWhatsapp className="wpp-icon" />
          </a>
        </div>
      </div>
      </div>
      <div id="banner">
        <img className="banner-img" src="./Assets/online2.png" alt="Logo" />
      </div>
    </section>
  );
};

export default Home;
