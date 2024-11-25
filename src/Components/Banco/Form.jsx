import React, { useState } from 'react';

const Form = ({ adicionarMarcacao }) => {
  const [nome, setNome] = useState('');
  const [data, setData] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!nome || !data) {
      alert('Por favor, preencha todos os campos!');
      return;
    }

    // Adiciona a marcação
    adicionarMarcacao({ nome, data });
    
    // Limpa os campos
    setNome('');
    setData('');
  };

  return (
    <form onSubmit={handleSubmit} className="form">
      <input 
        type="text" 
        placeholder="Nome" 
        value={nome}
        onChange={(e) => setNome(e.target.value)}
      />
      <input 
        type="date" 
        value={data} 
        onChange={(e) => setData(e.target.value)} 
      />
      <button type="submit">Adicionar</button>
    </form>
  );
};

export default Form;
