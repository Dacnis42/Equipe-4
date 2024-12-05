import React, { useState } from "react";
import './Home.css';
import Agenda from '../Agenda/Agenda'; 

const Home = () => {
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

        <div id="home-btn">
          <Agenda />
        </div>
      </div>

      <div id="banner">
        <img className="banner-img" src="./Assets/online2.png" alt="Logo" />
      </div>
    </section>
  );
};

export default Home;