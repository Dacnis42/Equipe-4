import React, { useState, useEffect } from 'react';
import FullCalendar from '@fullcalendar/react';
import dayGridPlugin from '@fullcalendar/daygrid';
import interactionPlugin from '@fullcalendar/interaction';
import axios from 'axios';
import ptBrLocale from '@fullcalendar/core/locales/pt-br';
import './Agenda.css';

const Agenda = () => {
  const [selectedDate, setSelectedDate] = useState(null);
  const [selectedTime, setSelectedTime] = useState(null);
  const [formData, setFormData] = useState({
    nome: '',
    sobrenome: '',
    sexo: '',
    email: '',
    idade: '',
    telefone: '',
    descricao: ''
  });
  const [availableTimes, setAvailableTimes] = useState([]);
  const [bookedTimes, setBookedTimes] = useState({});
  const [loading, setLoading] = useState(false);
  const [showCalendarModal, setShowCalendarModal] = useState(false); // Modal de calendário
  const [showFormModal, setShowFormModal] = useState(false); // Modal de cadastro de agendamento

  const originalTimes = [
    '08:00', '09:00', '10:00', '11:00', '12:00', '13:00', '14:00', '15:00'
  ];

  const today = new Date();
  const formattedToday = today.toISOString().split('T')[0];

  useEffect(() => {
    const fetchBookedTimes = async () => {
      setLoading(true);
      try {
        const response = await axios.get('http://localhost:5000/api/agendamentos');
        const agendamentos = response.data;

        const newBookedTimes = {};
        agendamentos.forEach(agendamento => {
          if (!newBookedTimes[agendamento.data_consulta]) {
            newBookedTimes[agendamento.data_consulta] = [];
          }
          newBookedTimes[agendamento.data_consulta].push(agendamento.horario_consulta);
        });

        setBookedTimes(newBookedTimes);
      } catch (error) {
        console.error('Erro ao buscar agendamentos:', error.message);
        alert('Ocorreu um erro ao buscar agendamentos.');
      } finally {
        setLoading(false);
      }
    };

    fetchBookedTimes();
  }, []);

  useEffect(() => {
    if (selectedDate) {
      const bookedOnSelectedDate = bookedTimes[selectedDate] || [];
      const currentTime = new Date().toISOString().split('T')[1].substring(0, 5);
      setAvailableTimes(originalTimes.filter(time =>
        !bookedOnSelectedDate.includes(time) && (selectedDate !== formattedToday || time > currentTime)
      ));
    }
  }, [selectedDate, bookedTimes]);

  const handleDateClick = (info) => {
    const selectedDate = new Date(info.dateStr).toISOString().split('T')[0];

    if (selectedDate < formattedToday) {
      alert('Não é possível agendar para datas anteriores a hoje.');
      return;
    }

    const selectedDay = new Date(info.dateStr).getUTCDay();
    if (selectedDay === 0 || selectedDay === 6) {
      alert('Agendamentos não estão disponíveis nos finais de semana.');
      return;
    }

    setSelectedDate(selectedDate); // Atualiza a data selecionada sem fechar o modal
  };

  const handleTimeSelect = (time) => {
    setSelectedTime(time);
    setShowFormModal(true); // Abre o modal de cadastro após selecionar a hora
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!selectedDate || !selectedTime) {
      alert('Por favor, selecione uma data e um horário.');
      return;
    }

    const data = {
      nome: formData.nome,
      sobrenome: formData.sobrenome,
      sexo: formData.sexo,
      email: formData.email,
      idade: formData.idade,
      telefone: formData.telefone,
      descricao: formData.descricao,
      data_consulta: selectedDate,
      horario_consulta: selectedTime
    };

    try {
      await axios.post('http://localhost:5000/api/agendamentos', data);
      alert('Consulta agendada com sucesso!');
      setFormData({
        nome: '',
        sobrenome: '',
        sexo: '',
        email: '',
        idade: '',
        telefone: '',
        descricao: ''
      });
      setSelectedDate(null);
      setSelectedTime(null);
      setShowFormModal(false); // Fecha o modal de cadastro
    } catch (error) {
      console.error('Erro ao agendar consulta:', error);
      alert('Ocorreu um erro ao agendar a consulta.');
    }
  };

  return (
    <div className="App">
      <button className="show-calendar-btn" onClick={() => setShowCalendarModal(true)}>
        Marcar Consulta
      </button>

      {/* Modal de Calendário */}
      {showCalendarModal && (
        <div className="calendar-modal">
          <div className="modal-content">
            <button className="close-calendar-btn" onClick={() => setShowCalendarModal(false)}>
              X
            </button>

            <FullCalendar
              plugins={[dayGridPlugin, interactionPlugin]}
              locale={ptBrLocale}
              initialView="dayGridMonth"
              dateClick={handleDateClick}
              events={[]}
            />

            {selectedDate && (
              <div className="timeslot-container">
                <h2>Selecione um horário para o dia {selectedDate}</h2>
                {availableTimes.map((time, index) => (
                  <button
                    key={index}
                    onClick={() => handleTimeSelect(time)}
                    className={selectedTime === time ? 'selected' : ''}
                  >
                    {time}
                  </button>
                ))}
              </div>
            )}
          </div>
        </div>
      )}

      {/* Modal de Cadastro */}
      {showFormModal && (
        <div className="calendar-modal">
          <div className="modal-content">
            <button className="close-calendar-btn" onClick={() => setShowFormModal(false)}>
              X
            </button>

            <h2>Cadastro de Consulta</h2>
            <form onSubmit={handleSubmit}>
              <input
                type="text"
                placeholder="Nome"
                value={formData.nome}
                onChange={(e) => setFormData({ ...formData, nome: e.target.value })}
                required
              />
              <input
                type="text"
                placeholder="Sobrenome"
                value={formData.sobrenome}
                onChange={(e) => setFormData({ ...formData, sobrenome: e.target.value })}
                required
              />
              <input
                type="email"
                placeholder="E-mail"
                value={formData.email}
                onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                required
              />
              <input
                type="text"
                placeholder="Telefone"
                value={formData.telefone}
                onChange={(e) => setFormData({ ...formData, telefone: e.target.value })}
                required
              />
              <textarea
                placeholder="Descrição"
                value={formData.descricao}
                onChange={(e) => setFormData({ ...formData, descricao: e.target.value })}
              />
              <div className="modal-actions">
                <button type="submit">Confirmar Agendamento</button>
                <button type="button" onClick={() => setShowFormModal(false)}>Cancelar</button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default Agenda;
