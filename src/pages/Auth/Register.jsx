import './Auth.css';

// COMPONENTS
import { Link } from 'react-router-dom';

// HOOKS
import { useState, useEffect } from 'react';

const Register = () => {
  const handleSubmit = (e) => {
    e.preventDefault();
  };

  return (
    <div>
      <h2>ReactGram</h2>
      <p className="subtitle">Cadastre-se para interagir com outros usuários.</p>
      <form onSubmit={(e) => handleSubmit(e)}>
        <input type="text" placeholder="Nome" />
        <input type="email" placeholder="E-mail" />
        <input type="password" placeholder="Senha" />
        <input type="password" placeholder="Confirmação de senha" />
        <input type="submit" value="Cadastrar" />
      </form>
      <p>
        Já tem conta? <Link to="/login">Clique aqui</Link>
      </p>
    </div>
  );
};

export default Register;
