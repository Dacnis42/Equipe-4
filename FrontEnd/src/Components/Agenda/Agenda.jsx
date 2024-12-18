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
  const [availableTimes, setAvailableTimes] = useState([
    '08:00', '09:00', '10:00', '11:00', '12:00', '13:00', '14:00', '15:00' 
  ]);
  const [bookedTimes, setBookedTimes] = useState({});
  const [loading, setLoading] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isDateSelected, setIsDateSelected] = useState(false);
  const originalTimes = [
    '08:00', '09:00', '10:00', '11:00', '12:00', '13:00', '14:00', '15:00' 
  ];

  const today = new Date();
  const formattedToday = today.toISOString().split('T')[0];

  useEffect(() => {
    // Carregar estado do localStorage
    const savedBookedTimes = localStorage.getItem('bookedTimes');
    if (savedBookedTimes) {
      setBookedTimes(JSON.parse(savedBookedTimes));
    }

    const savedModalState = localStorage.getItem('isModalOpen');
    if (savedModalState) {
      setIsModalOpen(JSON.parse(savedModalState));
    }

    const savedDateSelection = localStorage.getItem('isDateSelected');
    if (savedDateSelection) {
      setIsDateSelected(JSON.parse(savedDateSelection));
    }
  }, []);

  useEffect(() => {
    // Salvar mudanças relevantes no localStorage
    localStorage.setItem('bookedTimes', JSON.stringify(bookedTimes));
    localStorage.setItem('isModalOpen', JSON.stringify(isModalOpen));
    localStorage.setItem('isDateSelected', JSON.stringify(isDateSelected));
  }, [bookedTimes, isModalOpen, isDateSelected]);

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
    // if (selectedDate < formattedToday) {
    //   alert('Não é possível agendar para datas anteriores a hoje.');
    //   return;
    // }

    const selectedDay = new Date(info.dateStr).getUTCDay();
    if (selectedDay === 0 || selectedDay === 6) {
      alert('Agendamentos não são permitidos nos finais de semana.');
      return;
    }

    setSelectedDate(info.dateStr);
    setIsDateSelected(true);
  };

  const handleTimeSelect = (time) => {
    setSelectedTime(time);
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (parseInt(formData.idade) < 14) {
      alert('Você deve ter 14 anos ou mais para agendar uma consulta.');
      return;
    }

    if (!selectedDate || !selectedTime) {
      alert('Selecione uma data e horário.');
      return;
    }

    const data = { ...formData, dataConsulta: selectedDate, horarioConsulta: selectedTime };

    try {
      await axios.post('http://localhost:5000/api/agendamentos', data);
      alert('Consulta marcada com sucesso!');

      const updatedBookedTimes = {
        ...bookedTimes,
        [selectedDate]: [...(bookedTimes[selectedDate] || []), selectedTime]
      };
      setBookedTimes(updatedBookedTimes);

      setFormData({ nome: '', sobrenome: '', sexo: '', email: '', idade: '', telefone: '', descricao: '' });
      setSelectedTime(null);
      setAvailableTimes(originalTimes.filter(time => !updatedBookedTimes[selectedDate].includes(time)));
      closeModal();
    } catch (error) {
      console.error('Ocorreu um erro ao tentar marcar a consulta:', error.message);
      alert('Ocorreu um erro ao tentar marcar a consulta.');
    }
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setIsDateSelected(false);
  };

  const openModal = () => {
    setIsModalOpen(true);
    setSelectedDate(null);
    setSelectedTime(null);
  };

  return (
    <div className="App">
      <button onClick={openModal} className="btn-marcar-consulta">
        Marque sua consulta
      </button>

      {isModalOpen && (
        <div className="modal-overlay">
          <div className="modal-content">
            <button className="close-btn" onClick={closeModal}>X</button>

            {isDateSelected ? (
              <>
                <h2>Escolha o horário para o dia {selectedDate}</h2>
                <div>
                  {availableTimes.map(time => (
                    <button
                      key={time}
                      onClick={() => handleTimeSelect(time)}
                      className={selectedTime === time ? 'selected' : ''}
                    >
                      {time}
                    </button>
                  ))}
                </div>

                {selectedTime && (
                  <form onSubmit={handleSubmit}>
                    <input type="text" name="nome" value={formData.nome} onChange={handleInputChange} placeholder="Nome" required />
                    <input type="text" name="sobrenome" value={formData.sobrenome} onChange={handleInputChange} placeholder="Sobrenome" required />
                    <select name="sexo" value={formData.sexo} onChange={handleInputChange} required>
                      <option value="">Selecione o sexo</option>
                      <option value="m">Masculino</option>
                      <option value="f">Feminino</option>
                      <option value="p">Prefiro Não Declarar</option>
                    </select>
                    <input type="email" name="email" value={formData.email} onChange={handleInputChange} placeholder="Email" required />
                    <input type="number" name="idade" value={formData.idade} onChange={handleInputChange} placeholder="Idade" required />
                    <input type="text" name="telefone" value={formData.telefone} onChange={handleInputChange} placeholder="Telefone" required />
                    <textarea name="descricao" value={formData.descricao} onChange={handleInputChange} placeholder="Descrição do problema (opcional)" />
                    <button type="submit">Marcar Consulta</button>
                  </form>
                )}
              </>
            ) : (
              <>
                <FullCalendar
                  plugins={[dayGridPlugin, interactionPlugin]}
                  initialView="dayGridMonth"
                  dateClick={handleDateClick}
                  locales={[ptBrLocale]}
                  locale="pt-br"
                  firstDay={1}
                  timeZone="local"
                />
              </>
            )}
          </div>
        </div>
      )}
    </div>
  );
};

export default Agenda;
