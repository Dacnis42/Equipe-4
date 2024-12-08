import React, { useState, useEffect } from 'react';
import Navbar from './Components/Navbar/Navbar';
import Home from './Components/Home/Home';
import Faq from './Components/Faq/Faq';
import Servicos from './Components/Servicos/Servicos';
import Sobre from './Components/Sobre/Sobre';
import Footer from './Components/Footer/Footer';
import Queixas from './Components/Queixas/Queixas'; 
import Login from './Components/Login/Login';
import Banco from './Components/Banco/Banco';
import { BrowserRouter, Routes, Route } from 'react-router-dom';

function App() {
  const [isModalOpen, setIsModalOpen] = useState(false);

  useEffect(() => {
    const handleKeyPress = (e) => {
      if (e.ctrlKey && e.key === 'y') {
        setIsModalOpen(true);
      } else if (e.key === 'Escape') {
        setIsModalOpen(false);
      }
    };

    document.addEventListener('keydown', handleKeyPress);

    return () => {
      document.removeEventListener('keydown', handleKeyPress);
    };
  }, []);

  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={
          <>
            <Navbar />
            <Home />
            <Login isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} />
            <Queixas />
            <Servicos />
            <Sobre />
            <Faq />
            <Footer />
          </>
        } />
        <Route path="/banco" element={<Banco />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;