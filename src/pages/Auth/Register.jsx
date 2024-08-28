import './Auth.css';

// COMPONENTS
import { Link } from 'react-router-dom';

// HOOKS
import { useState, useEffect } from 'react';

const Register = () => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();

    const user = {
      name,
      email,
      password,
      confirmPassword,
    };
  };

  return (
    <div id="register">
      <h2>ReactGram</h2>
      <p className="subtitle">Cadastre-se para interagir com outros usuários.</p>
      <form onSubmit={(e) => handleSubmit(e)}>
        <input type="text" placeholder="Nome" value={name || ''} onChange={(e) => setName(e.target.value)} />
        <input type="email" placeholder="E-mail" value={email || ''} onChange={(e) => setEmail(e.target.value)} />
        <input
          type="password"
          placeholder="Senha"
          value={password || ''}
          onChange={(e) => setPassword(e.target.value)}
        />
        <input
          type="password"
          placeholder="Confirmação de senha"
          value={confirmPassword || ''}
          onChange={(e) => setConfirmPassword(e.target.value)}
        />
        <input type="submit" value="Cadastrar" />
      </form>
      <p>
        Já tem conta? <Link to="/login">Clique aqui</Link>
      </p>
    </div>
  );
};

export default Register;
