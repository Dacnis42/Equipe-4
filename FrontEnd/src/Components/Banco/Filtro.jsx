import React from 'react';

const Filtro = ({ setQueryNome, setQueryData }) => {
  return (
    <div className="filtro">
      {}
      <input
        type="text"
        placeholder="Pesquisar por nome..."
        onChange={(e) => setQueryNome(e.target.value)}
      />

      {}
      <input
        type="date"
        onChange={(e) => setQueryData(e.target.value)}
      />
    </div>
  );
};

export default Filtro;
