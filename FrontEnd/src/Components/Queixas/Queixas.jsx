import React, { useRef, useState } from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/swiper-bundle.css';
import './Queixas.css';  // Certifique-se de importar o arquivo CSS corretamente

const Queixas = () => {
  const swiperRef = useRef(null);
  
  // Estado para controlar o índice do card que está sendo hovered
  const [hoveredIndex, setHoveredIndex] = useState(null);

  // Funções de navegação do swiper
  const handlePrev = () => {
    if (swiperRef.current) {
      swiperRef.current.swiper.slidePrev();
    }
  };

  const handleNext = () => {
    if (swiperRef.current) {
      swiperRef.current.swiper.slideNext();
    }
  };

  // Conteúdo dos slides
  const slidesContent = [
    "Quero descobrir como a terapia pode me ajudar.",
    "Me sinto ansioso e estressado o tempo todo.",
    "Sinto-me isolado e não sei como conectar com os outros.",
    "Dificuldades em lidar com emoções.",
    "Sinto-me sobrecarregado com o trabalho.",
    "Sinto-me sobrecarregado com o trabalho.",
    "Sinto-me sobrecarregado com o trabalho.",
    "Sinto-me sobrecarregado com o trabalho.",
  ];

  // Explicações sobre como a terapia pode ajudar
  const therapyHelpText = [
    "A terapia pode ajudar você a entender melhor suas emoções e buscar soluções para lidar com o estresse.",
    "Na terapia, você pode aprender técnicas para gerenciar a ansiedade e aliviar o estresse do dia a dia.",
    "A terapia oferece um espaço seguro para você explorar suas emoções e aprender a se conectar com os outros.",
    "Com a ajuda da terapia, você pode aprender a lidar melhor com suas emoções e encontrar equilíbrio em situações difíceis.",
    "A terapia pode ajudar a identificar fontes de sobrecarga no trabalho e desenvolver estratégias para melhorar o bem-estar.",
    "A terapia pode ajudar a desenvolver habilidades de gestão de tempo e organização para reduzir o estresse no trabalho.",
    "Na terapia, você pode explorar os fatores que estão causando sua sobrecarga e trabalhar para encontrar um caminho mais equilibrado.",
    "A terapia pode ajudar a encontrar formas de delegar tarefas e definir limites para melhorar sua qualidade de vida no trabalho."
  ];

  // Função para mostrar/ocultar o texto explicativo ao passar o mouse
  const handleMouseEnter = (index) => {
    setHoveredIndex(index);
  };

  const handleMouseLeave = () => {
    setHoveredIndex(null);
  };

  return (
    <>
      {/* Linha Ondulada */}
    

      <section id="queixas">
        <div className="queixa-titulo">O Que te trouxe Aqui?</div>
        <div className="container">
          <Swiper
            ref={swiperRef}
            spaceBetween={12}
            slidesPerView={3}
            navigation={{ nextEl: '.swiper-button-next', prevEl: '.swiper-button-prev' }}
          >
            {slidesContent.map((content, index) => (
              <SwiperSlide key={index}>
                <div
                  className="txquadro"
                  onMouseEnter={() => handleMouseEnter(index)}
                  onMouseLeave={handleMouseLeave}
                >
                  <p className="title">
                    {hoveredIndex === index ? therapyHelpText[index] : content}
                  </p>
                </div>
              </SwiperSlide>
            ))}
          </Swiper>
        </div>
        <div className="swiper-button-prev seta" onClick={handlePrev}></div>
        <div className="swiper-button-next seta" onClick={handleNext}></div>
        
      </section>
      {/* <div className="wavy-line" /> */}
    </>
  );
};

export default Queixas;