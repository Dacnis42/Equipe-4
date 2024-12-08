import React from 'react';

const Filtro = ({ setQueryNome, setQueryData }) => {
  return (
    <div className="filtro">
      {/* Campo para pesquisa por nome */}
      <input
        type="text"
        placeholder="Pesquisar por nome..."
        onChange={(e) => setQueryNome(e.target.value)}
      />

      {/* Campo para pesquisa por data */}
      <input
        type="date"
        onChange={(e) => setQueryData(e.target.value)}
      />
    </div>
  );
};

export default Filtro;
