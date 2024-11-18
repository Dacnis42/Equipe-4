import React from 'react';
import { useNavigate } from 'react-router-dom';

function Banco() {
  const navigate = useNavigate();

  return (
    <div>
      <h1>Bem-vindo à página do Banco!</h1>
      <p>Esta é a página de destino após um login bem-sucedido.</p>
      <button onClick={() => navigate('/home')}>Voltar para Home</button>
    </div>
  );
}

export default Banco;