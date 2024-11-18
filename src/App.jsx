import React from 'react';
import Navbar from './Components/Navbar/Navbar';
import Home from './Components/Home/Home';
import Faq from './Components/Faq/Faq';
import Servicos from './Components/Servicos/Servicos';
import Sobre from './Components/Sobre/Sobre';
import Footer from './Components/Footer/Footer';
import Queixas from './Components/Queixas/Queixas'; // Importando o componente Queixas
// import Login from './Components/Login/Login';
// import Banco from './Components/Banco/Banco';

function App() {
  return (
    <>
      <Navbar />
      <Home />
      {/* <Login/> */}
      {/* <Banco/> */}
      <Queixas /> {/* Renderizando o componente Queixas */}
      <Servicos />
      <Sobre />
      <Faq />
      <Footer />
    </>
  );
}

export default App;

