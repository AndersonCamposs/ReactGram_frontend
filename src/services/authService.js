import { api, requestConfig } from '../utils/config';

// REGISTER AN USER
const register = async (data) => {
  const config = requestConfig('POST', data);

  try {
    const res = await fetch(`${api}/users/register`, config)
      .then((res) => res.json())
      .catch((error) => error);

    if (res._id) {
      localStorage.setItem('user', JSON.stringify(res));
    }

    return res;
  } catch (error) {
    console.log(error);
  }
};

// LOGOUT AN USER
const logout = () => {
  localStorage.removeItem('user');
};

// SIGN IN AN USER
const login = async (data) => {
  const config = requestConfig('POST', data);

  try {
    const res = await fetch(`${api}/users/login`, config)
      .then((res) => res.json())
      .catch((error) => error);

    if (res._id) {
      localStorage.setItem('user', JSON.stringify(res));
    }

    return res;
  } catch (error) {
    console.log(error);
  }
};

const authService = {
  register,
  logout,
  login,
};

export default authService;
