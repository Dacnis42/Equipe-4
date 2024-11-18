import React, { useState } from 'react';
import './Faq.css';


function FAQSection({ questions, containerClass }) {
  const [openIndex, setOpenIndex] = useState(null);

  const handleToggle = (index) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <div className={`faq-container ${containerClass}`}>
      {questions.map((question, index) => (
        <div key={index} className="faq-item">
          <button className="question" onClick={() => handleToggle(index)}>
            {question.question}
          </button>
          <div className={`answer ${openIndex === index ? 'open' : ''}`}>
            {question.answer}
          </div>
        </div>
      ))}
    </div>
  );
}

const questions1 = [
  { question: 'O que é Terapia?', answer: 'É uma forma de explicar conceitos complexos de maneira simples.' },
  { question: 'Com que frequência farei as sessões?', answer: 'Isso depende das suas necessidades e do plano de tratamento.' },
  { question: 'O que preciso para uma consulta online?', answer: 'Um dispositivo com acesso à internet e um espaço tranquilo.' },
  { question: 'Quanto tempo dura uma sessão?', answer: 'Geralmente, uma sessão dura cerca de 50 minutos.' }
];
function Faq() {
  return (
    <section id="faq"> {}
    <div class="shape-faq"></div>
      <h1 id="faq-title">Perguntas Frequentes</h1>
      <div className="faq-section">
        <FAQSection questions={questions1} containerClass="" />
      </div>
      <div id="fim"></div>
    </section> 
  );
}

export default Faq;

