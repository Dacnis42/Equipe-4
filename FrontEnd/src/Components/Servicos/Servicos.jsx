import React from 'react';
import './Servicos.css';

const Servicos = () => {
  return (
    <section id="servicos">
      <h2 className="servicos-titulo">Serviços</h2>

      <div className="card-container">
        <div className="card-wrapper">
          <div className="card">
            <div className="img-box">
              <img src="./Assets/presencial.png" alt="Atendimento Presencial" />
              <div className="content-overlay">
                <p>O atendimento psicológico presencial oferece acolhimento e conexão direta. 
                  Cuide de sua saúde mental com a confiança e o conforto de um atendimento pessoal..</p>
                <a href="#home" className="card-btn">Agende</a>
              </div>
            </div>
            <h2 className="subtitulo-card">Atendimento Presencial</h2>
          </div>
        </div>

        <div className="card-wrapper">
          <div className="card">
            <div className="img-box">
              <img src="./Assets/online.png" alt="Atendimento Online" />
              <div className="content-overlay">
                <p>
                O atendimento psicológico online oferece 
                comodidade, privacidade e flexibilidade. Cuide de sua saúde mental com praticidade, de onde estiver!</p>
                <a href="#home" className="card-btn">Agende</a>
              </div>
            </div>
            <h2 className="subtitulo-card">Atendimento Online</h2>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Servicos;