import React from 'react';
import './Sobre.css';
import { 
  FaFacebook, 
  FaInstagram, 
  FaLinkedin, 
  FaTwitter, 
  FaGraduationCap, 
  FaBriefcase, 
  FaHeart 
} from 'react-icons/fa';

const Sobre = () => {
  return (
    <section id="sobre" className="container">
      <div className="figure">
        <img 
          className="figure-img" 
          src="./Assets/taisf.png" 
          alt="Tainá Souza, psicóloga especializada em Terapia Cognitivo-Comportamental" 
        />
      </div>
      
      <div className="conteudo">
        <h2 className="titulo">OLÁ</h2>
        <p className="descricao">
        Sou tainá souza, Psicóloga especializada em Terapia Cognitivo-Comportamental (TCC), com foco no bem-estar emocional e psicológico.
        </p>
        
        <div className="formacao">
          <h4><FaGraduationCap /> Formação Acadêmica:</h4>
          <ul>
            <li>Graduação em Psicologia pela Universidade X</li>
            <li>Especialização em TCC pela Universidade Y</li>
          </ul>
        </div>
        
        <div className="especialidades">
          <h4><FaBriefcase /> Especialidades:</h4>
          <ul>
            <li>Terapia Cognitivo-Comportamental (TCC)</li>
            <li>Ansiedade e Depressão</li>
            <li>Gestão do Estresse e Bem-Estar</li>
          </ul>
        </div>   
        <div className="contato">
          <h4><FaHeart /> Entre em contato:</h4>
          <address>
            <p>Email: <a href="mailto:taina.souza@email.com">taina.souza@email.com</a></p>
            <p>Telefone: <a href="tel:+551112345678">(11) 1234-5678</a></p>
          </address>
          <div className="social-icons">
          <a href="https://facebook.com" target="_blank" rel="noopener noreferrer" aria-label="Facebook">
            <FaFacebook className="icon" /> 
          </a>
          <a href="https://instagram.com" target="_blank" rel="noopener noreferrer" aria-label="Instagram">
            <FaInstagram className="icon" /> 
          </a>
          <a href="https://linkedin.com" target="_blank" rel="noopener noreferrer" aria-label="LinkedIn">
            <FaLinkedin className="icon" /> 
          </a>
          <a href="https://twitter.com" target="_blank" rel="noopener noreferrer" aria-label="Twitter">
            <FaTwitter className="icon" /> 
          </a>
        </div>
        </div>
      </div>
    </section>
  );
};

export default Sobre;
