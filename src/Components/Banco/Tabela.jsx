import React from 'react';

const Tabela = ({ marcacoes }) => {
  return (
    <table className="tabela">
      <thead>
        <tr>
          <th>Nome</th>
          <th>Data</th>
        </tr>
      </thead>
      <tbody>
        {marcacoes.length > 0 ? (
          marcacoes.map((marcacao, index) => (
            <tr key={index}>
              <td>{marcacao.nome}</td>
              <td>{marcacao.data}</td>
            </tr>
          ))
        ) : (
          <tr>
            <td colSpan="2">Nenhuma marcação encontrada.</td>
          </tr>
        )}
      </tbody>
    </table>
  );
};

export default Tabela;
