import React, { useState, useEffect } from 'react';
import axios from 'axios';
import TabelaFiltros from './TabelaFiltros';
import './Tabela.css';

const Tabela = ({ updateAvailableTimes }) => {
  const [agendamentos, setAgendamentos] = useState([]);
  const [filters, setFilters] = useState({ nome: '', data: '' });
  const [selectedDate, setSelectedDate] = useState('');
  const [bookedTimes, setBookedTimes] = useState({});
  const [availableTimes, setAvailableTimes] = useState([]);
  const [originalTimes, setOriginalTimes] = useState([]);

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

  // Cancelar um agendamento
  const cancelBooking = async (time) => {
    try {
      const data = { data_consulta: selectedDate, horario_consulta: time };

      // Faz o DELETE no banco
      await axios.delete('http://localhost:5000/api/agendamentos', { data });

      // Remove o horário dos agendamentos
      const updatedBookedTimes = { ...bookedTimes };
      const updatedBookings = updatedBookedTimes[selectedDate].filter((h) => h !== time);
      updatedBookedTimes[selectedDate] = updatedBookings;
      setBookedTimes(updatedBookedTimes);

      // Salva os agendamentos no localStorage
      localStorage.setItem('bookedTimes', JSON.stringify(updatedBookedTimes));

      // Reabilita o horário na lista de horários disponíveis
      setAvailableTimes(originalTimes.filter((t) => !updatedBookings.includes(t)));

      alert('Agendamento cancelado com sucesso!');
    } catch (error) {
      console.error('Erro ao cancelar o agendamento:', error.message);
      alert('Erro ao tentar cancelar o agendamento.');
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
                  <button onClick={() => cancelBooking(agendamento.horario_consulta)}>
                    Cancelar
                  </button>
                </td>
              </tr>
            ))
          )}
        </tbody>
      </table>
      {selectedDate && bookedTimes[selectedDate] && bookedTimes[selectedDate].length > 0 && (
        <div>
          <h3>Agendamentos já realizados para {selectedDate}</h3>
          <ul>
            {bookedTimes[selectedDate].map((time) => (
              <li key={time}>
                {time}
                <button onClick={() => cancelBooking(time)}>Cancelar</button>
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
};

export default Tabela;
