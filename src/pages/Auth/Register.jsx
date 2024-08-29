import './Auth.css';

// COMPONENTS
import { Link } from 'react-router-dom';
import Message from '../../components/Message';
// HOOKS
import { useState, useEffect } from 'react';

// REDUX
import { register, reset } from '../../slices/authSlice';
import { useSelector, useDispatch } from 'react-redux';

const Register = () => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');

  const dispatch = useDispatch();

  const { loading, error } = useSelector((state) => state.auth);

  const handleSubmit = (e) => {
    e.preventDefault();

    const user = {
      name,
      email,
      password,
      confirmPassword,
    };

    dispatch(register(user));
  };

  // CLEAN ALL AUTH STATES
  useEffect(() => {
    dispatch(reset());
  }, [dispatch]);

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
        {!loading && <input type="submit" value="Cadastrar" />}
        {loading && <input type="submit" value="Aguarde..." disabled />}
        {error && <Message msg={error} type="error" />}
      </form>
      <p>
        Já tem conta? <Link to="/login">Clique aqui</Link>
      </p>
    </div>
  );
};

export default Register;
