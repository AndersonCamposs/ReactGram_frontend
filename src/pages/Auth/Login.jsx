import './Auth.css';

// COMPONENTS
import { Link } from 'react-router-dom';
import Message from '../../components/Message';

// HOOKS
import { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';

// REDUX
import { reset, login } from '../../slices/authSlice';

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const { loading, error } = useSelector((state) => state.auth);

  const dispatch = useDispatch();

  const handleSubmit = (e) => {
    e.preventDefault();

    const user = {
      email,
      password,
    };

    dispatch(login(user));
  };

  // CLEAN ALL AUTH STATES
  useEffect(() => {
    dispatch(reset());
  }, [dispatch]);

  return (
    <div id="login">
      <h2>ReactGram</h2>
      <p className="subtitle">Faça login para ver o que há de novo.</p>
      <form onSubmit={(e) => handleSubmit(e)}>
        <input type="text" placeholder="E-mail" onChange={(e) => setEmail(e.target.value)} value={email || ''} />
        <input
          type="password"
          placeholder="Senha"
          onChange={(e) => setPassword(e.target.value)}
          value={password || ''}
        />
        {!loading && <input type="submit" value="Entrar" />}
        {loading && <input type="submit" value="Aguarde..." />}
        {error && <Message msg={error} type="error" />}
      </form>
      <p>
        Não tem uma conta? <Link to="/register">Clique aqui e registre-se.</Link>
      </p>
    </div>
  );
};

export default Login;
