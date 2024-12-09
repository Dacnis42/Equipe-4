import React, { useState, useEffect } from 'react';
import axios from 'axios';
import TabelaFiltros from './TabelaFiltros';
import './Tabela.css';

const Tabela = ({ updateAvailableTimes }) => {
  const [agendamentos, setAgendamentos] = useState([]);
  const [filters, setFilters] = useState({ nome: '', data: '' });

  // Buscar agendamentos da API
  useEffect(() => {
    const fetchAgendamentos = async () => {
      try {
        const response = await axios.get('http://localhost:5000/api/agendamentos');
        setAgendamentos(response.data);
      } catch (error) {
        console.error('Erro ao buscar agendamentos:', error.message);
        alert('Ocorreu um erro ao buscar agendamentos.');
      }
    };

    fetchAgendamentos();
  }, []);

  const handleDelete = async (agendamento) => {
    try {
      // Verifique se existe o _id ou id no objeto agendamento
      const agendamentoId = agendamento._id || agendamento.id;
  
      if (!agendamentoId) {
        alert('ID do agendamento não encontrado');
        return;
      }
  
      // Realiza a exclusão com o ID correto
      await axios.delete(`http://localhost:5000/api/agendamentos/${agendamentoId}`);
  
      // Atualiza a lista de agendamentos após a exclusão
      setAgendamentos((prevAgendamentos) =>
        prevAgendamentos.filter((item) => item._id !== agendamentoId)
      );
      
      // Atualiza os horários disponíveis no componente Agenda
      updateAvailableTimes(agendamento.horario_consulta);

      alert('Agendamento excluído com sucesso!');
    } catch (error) {
      console.error('Erro ao excluir agendamento:', error.message);
      alert('Ocorreu um erro ao excluir o agendamento.');
    }
  };

  // Filtrar agendamentos
  const filteredAgendamentos = agendamentos.filter((agendamento) => {
    const nomeMatch = agendamento.nome.toLowerCase().includes(filters.nome.toLowerCase());
    const dataMatch = agendamento.data_consulta.includes(filters.data);
    return nomeMatch && dataMatch;
  });

  return (
    <div className="tabela-container">
      <h2>Lista de Agendamentos</h2>
      <TabelaFiltros filters={filters} setFilters={setFilters} />
      <table>
        <thead>
          <tr>
            <th>Nome</th>
            <th>Data</th>
            <th>Horário</th>
            <th>Email</th>
            <th>Idade</th>
            <th>Telefone</th>
            <th>Ações</th>
          </tr>
        </thead>
        <tbody>
          {filteredAgendamentos.length === 0 ? (
            <tr>
              <td colSpan="7">Nenhum agendamento encontrado.</td>
            </tr>
          ) : (
            filteredAgendamentos.map((agendamento) => (
              <tr key={agendamento._id}>
                <td>{agendamento.nome}</td>
                <td>{agendamento.data_consulta}</td>
                <td>{agendamento.horario_consulta}</td>
                <td>{agendamento.email}</td>
                <td>{agendamento.idade}</td>
                <td>{agendamento.telefone}</td>
                <td>
                  <button onClick={() => handleDelete(agendamento)}>Excluir</button>
                </td>
              </tr>
            ))
          )}
        </tbody>
      </table>
    </div>
  );
};

export default Tabela;