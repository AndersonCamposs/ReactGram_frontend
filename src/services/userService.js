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

// UPDATE USER DETAILS
const updateProfile = async (data, token) => {
  const config = requestConfig('PUT', data, token, true);
  try {
    const res = await fetch(`${api}/users`, config)
      .then((res) => res.json())
      .catch((error) => error);

    return res;
  } catch (error) {
    console.log(error);
  }
};

// GET USER DETAILS
const getUserDetails = async (id) => {
  const config = requestConfig('GET');

  try {
    const res = await fetch(`${api}/users/${id}`, config)
      .then((res) => res.json())
      .catch((error) => error);

    return res;
  } catch (error) {
    console.log(error);
  }
};

const userService = {
  profile,
  updateProfile,
  getUserDetails,
};

export default userService;
