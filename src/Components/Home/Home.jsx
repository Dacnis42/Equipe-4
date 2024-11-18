import React, { useState } from "react";
import './Home.css';
import Agenda from '../Agenda/Agenda';  // Importando o componente de agenda

const Home = () => {
  const [mensagem, setMensagem] = useState(null);

  const mensagens = [
    'Você é capaz de superar qualquer obstáculo!',
    'Nunca desista dos seus sonhos!',
    'Você é forte e resiliente!',
    'Acredite em si mesmo!',
    'O sucesso é seu!',
    'Não perca a fé!',
    'Você é incrível!',
    'Mantenha o foco!',
    'O melhor está por vir!',
  ];

  const bolinhas = Array(50).fill().map((_, index) => {
    const top = `${Math.random() * 100}%`;
    const left = `${Math.random() * 100}%`;
    return (
      <div 
        key={index} 
        className="bolinha" 
        style={{ top, left, position: 'absolute' }} 
        onClick={() => {
          const mensagemAleatoria = mensagens[Math.floor(Math.random() * mensagens.length)];
          setMensagem(mensagemAleatoria);
          setTimeout(() => {
            setMensagem(null);
          }, 3000);
        }}
      />
    );
  });

  return (
    <section id="home">
      {bolinhas}
      {mensagem && (
        <div className="mensagem-motivacional">
          {mensagem}
        </div>
      )}
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