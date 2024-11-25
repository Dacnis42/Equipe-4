import React, { useState } from 'react';
import { FaTrashAlt } from 'react-icons/fa'; // Importando o ícone da lixeira
import { Link } from 'react-router-dom'; // Importando o Link do react-router-dom
import './Banco.css';

const Banco = () => {
  // Dados das marcações. Agora incluindo a hora nas marcações.
  const [marcacoes, setMarcacoes] = useState([
    { id: 1, nome: 'João', data: '2024-11-25', hora: '10:00' },
    { id: 2, nome: 'Maria', data: '2024-11-26', hora: '14:00' },
    { id: 3, nome: 'José', data: '2024-11-25', hora: '16:00' }
  ]);

  const [filtroNome, setFiltroNome] = useState('');
  const [filtroData, setFiltroData] = useState('');
  const [alerta, setAlerta] = useState('');

  // Função para filtrar marcações
  const filtrarMarcacoes = () => {
    return marcacoes.filter(marcacao => {
      const nomeMatch = marcacao.nome.toLowerCase().includes(filtroNome.toLowerCase());
      const dataMatch = filtroData ? marcacao.data === filtroData : true;
      return nomeMatch && dataMatch;
    });
  };

  // Função para excluir uma marcação
  const excluirMarcacao = (id, nome) => {
    // Filtra as marcações, removendo a que foi excluída
    setMarcacoes(marcacoes.filter(marcacao => marcacao.id !== id));
    
    // Exibe o alerta de exclusão
    setAlerta(`A marcação de ${nome} foi excluída com sucesso!`);
    
    // Limpa o alerta após 3 segundos
    setTimeout(() => {
      setAlerta('');
    }, 3000);
  };

  return (
    <div className="banco-container">
      <h1>Controle de Marcações</h1>
      
      {/* Alerta de exclusão */}
      {alerta && <div className="alerta">{alerta}</div>}

      {/* Formulário de filtro */}
      <div className="filtro">
        <input
          type="text"
          placeholder="Pesquisar por nome"
          value={filtroNome}
          onChange={(e) => setFiltroNome(e.target.value)}
        />
        <input
          type="date"
          value={filtroData}
          onChange={(e) => setFiltroData(e.target.value)}
        />
      </div>

      {/* Tabela de marcações */}
      <table className="tabela">
        <thead>
          <tr>
            <th>Nome</th>
            <th>Data</th>
            <th>Hora</th> {/* Adicionando a coluna de hora */}
            <th>Ações</th>
          </tr>
        </thead>
        <tbody>
          {filtrarMarcacoes().length > 0 ? (
            filtrarMarcacoes().map((marcacao) => (
              <tr key={marcacao.id}>
                <td>{marcacao.nome}</td>
                <td>{marcacao.data}</td>
                <td>{marcacao.hora}</td> {/* Exibindo a hora */}
                <td>
                  <button 
                    className="excluir-btn" 
                    onClick={() => excluirMarcacao(marcacao.id, marcacao.nome)}
                  >
                    <FaTrashAlt /> {/* Usando o ícone da lixeira do react-icons */}
                  </button>
                </td>
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan="4" className="sem-marcacoes">
                Nenhuma marcação encontrada.
              </td>
            </tr>
          )}
        </tbody>
      </table>

      {/* Link de Voltar para a Home */}
      <div className="voltar-home">
        <Link to="/" className="voltar-btn">Voltar para Home</Link>
      </div>
    </div>
  );
};

export default Banco;
