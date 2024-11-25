import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './Login.css';

const Login = ({ isOpen, onClose }) => {
  const [id, setId] = useState('');
  const [senha, setSenha] = useState('');
  const navigate = useNavigate();

  if (!isOpen) return null;

  const handleLogin = (e) => {
    e.preventDefault();
 
    if (id === 'tai77' && senha === '7772') {
      onClose();  
      setId('');
      setSenha('');
      navigate('/banco');
    } else {
      alert('ID ou senha incorretos!');
    }
  };

  const handleSair = () => {
    onClose();  
    navigate('/');
  };

  return (
    <div className={`modal-overlay ${isOpen ? 'show' : ''}`}>
      <div className="modal">
        <h2>Login</h2>
        <form onSubmit={handleLogin}>
          <input 
            type="text" 
            placeholder="Digite seu ID" 
            value={id} 
            onChange={(e) => setId(e.target.value)}
          />
          <input 
            type="password" 
            placeholder="Digite sua senha" 
            value={senha} 
            onChange={(e) => setSenha(e.target.value)}
          />
          <button type="submit">Entrar</button>
          <button type="button" onClick={handleSair}>Sair</button>
        </form>
      </div>
    </div>
  );
};

export default Login;