import { api, requestConfig } from '../utils/config';

// GET USER DETAIL
const profile = async (data, token) => {
  const config = requestConfig('GET', data, token);

  try {
    const res = await fetch(`${api}/users/profile`, config)
      .then((res) => res.json())
      .catch((error) => error);

    return res;
  } catch (error) {
    console.log(error);
  }
};

const userService = {
  profile,
};

export default userService;
