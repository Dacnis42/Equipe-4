import React, { useState, useEffect } from 'react';
import { FaTrashAlt } from 'react-icons/fa'; // Importando o ícone da lixeira
import { Link } from 'react-router-dom'; // Importando o Link do react-router-dom
import axios from 'axios'; // Usando axios para a comunicação com a API
import './Banco.css';

const Banco = () => {
  // Estados para armazenar as marcações, filtros e alertas
  const [marcacoes, setMarcacoes] = useState([]);
  const [filtroNome, setFiltroNome] = useState('');
  const [filtroData, setFiltroData] = useState('');
  const [alerta, setAlerta] = useState('');

  // Função para buscar marcações da API
  const fetchMarcacoes = async () => {
    try {
      const response = await axios.get('http://localhost:5000/api/agendamentos');
      setMarcacoes(response.data); // Preenche o estado com as marcações retornadas
    } catch (error) {
      console.error('Erro ao buscar as marcações:', error.message);
    }
  };

  useEffect(() => {
    fetchMarcacoes(); // Chama a função de fetch ao montar o componente
  }, []); // Só executa na primeira renderização

  // Função para filtrar as marcações
  const filtrarMarcacoes = () => {
    return marcacoes.filter(marcacao => {
      const nomeMatch = marcacao.nome.toLowerCase().includes(filtroNome.toLowerCase());
      const dataMatch = filtroData ? marcacao.data_consulta === filtroData : true;
      return nomeMatch && dataMatch;
    });
  };

  // Função para excluir uma marcação
  const excluirMarcacao = async (id, nome) => {
    try {
      await axios.delete(`http://localhost:5000/api/agendamentos/${id}`);
      setMarcacoes(marcacoes.filter(marcacao => marcacao.id !== id));
      setAlerta(`A marcação de ${nome} foi excluída com sucesso!`);
      setTimeout(() => {
        setAlerta('');
      }, 3000); // Limpa o alerta após 3 segundos
    } catch (error) {
      console.error('Erro ao excluir a marcação:', error.message);
      setAlerta('Ocorreu um erro ao excluir a marcação.');
      setTimeout(() => {
        setAlerta('');
      }, 3000);
    }
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
            <th>Hora</th>
            <th>Ações</th>
          </tr>
        </thead>
        <tbody>
          {filtrarMarcacoes().length > 0 ? (
            filtrarMarcacoes().map((marcacao) => (
              <tr key={marcacao.id}>
                <td>{marcacao.nome}</td>
                <td>{marcacao.data_consulta}</td>
                <td>{marcacao.horario_consulta}</td>
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
