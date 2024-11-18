import React, { useState } from 'react';
import './Agenda.css'; // Estilos CSS externos

const Agenda = () => {
    const [showIframe, setShowIframe] = useState(false);
    const [showConfirmButton, setShowConfirmButton] = useState(false);

    const handleShowAgendamento = () => {
        setShowIframe(true);
        setShowConfirmButton(false); // Esconde o botão ao abrir o modal
    };

    const handleHideAgendamento = () => {
        setShowIframe(false);
        setShowConfirmButton(true); // Exibe o botão ao fechar o modal
    };

    const handleIframeLoad = () => {
        // Não é necessário alterar aqui
    };

    const handleConfirmAgendamento = () => {
        const whatsappNumber = '5571991079314';
        const message = 'Olá, gostaria de confirmar meu agendamento!';
        const whatsappUrl = `https://wa.me/${whatsappNumber}?text=${encodeURIComponent(message)}`;
        window.location.href = whatsappUrl;
    };

    return (
        <div className="app-container">
            {!showIframe ? (
                <button className="btn-primary" onClick={handleShowAgendamento}>
                    Marque sua consulta
                </button>
            ) : (
                <>
                    <div className="modal">
                        <div className="modal-content">
                            <iframe
                                src="https://calendar.google.com/calendar/appointments/schedules/AcZssZ2jUAubh1q9Xp8EmOxvFJphiQ_75XrBUwRXp5A5e7-msWvshB9Lvirtbo8sNG8mgklwo7H1XagZ?gv=true"
                                title="Agendamento de Compromissos"
                                className="iframe-agendamento"
                                onLoad={handleIframeLoad}
                            ></iframe>
                            <span className="close-modal" onClick={handleHideAgendamento}>
                                ← Voltar
                            </span>
                        </div>
                    </div>
                </>
            )}
            {showConfirmButton && (
                <div>               
                    <p>Para tirar qualquer dúvida, envie uma mensagem no WhatsApp:</p>
                    <button className="btn-confirm" onClick={handleConfirmAgendamento}>
                        Ir para o WhatsApp
                    </button>
                </div>
            )}
        </div>
    );
};

export default Agenda;