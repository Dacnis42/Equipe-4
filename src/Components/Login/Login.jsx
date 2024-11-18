import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

function Login() {
  const navigate = useNavigate();
  const [showLogin, setShowLogin] = useState(false);
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  useEffect(() => {
    const handleKeyPress = (e) => {
      if (e.ctrlKey && e.key === 'y') {
        setShowLogin(true);
      }
    };

    window.addEventListener('keydown', handleKeyPress);

    return () => {
      window.removeEventListener('keydown', handleKeyPress);
    };
  }, []);

  const handleLogin = (e) => {
    e.preventDefault();

    if (username === 'LSAIT' && password === '7772') {
      navigate('/banco');
    } else {
      alert('Credenciais inválidas!');
    }
  };

  const handleCloseLogin = () => {
    setShowLogin(false);
  };

  return (
    <div>
      {showLogin && (
        <div className="login-overlay">
          <div className="login-form">
            <h2>Login</h2>
            <form onSubmit={handleLogin}>
              <div>
                <label htmlFor="username">Usuário:</label>
                <input
                  type="text"
                  id="username"
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                  required
                />
              </div>
              <div>
                <label htmlFor="password">Senha:</label>
                <input
                  type="password"
                  id="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                />
              </div>
              <div className="button-container">
                <button type="submit">Entrar</button>
                <button
                  type="button"
                  onClick={handleCloseLogin}
                  className="logout-btn"
                >
                  Sair
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}

export default Login;