import { api, requestConfig } from '../utils/config';

// PUBLISH AN USER PHOTO
const publishPhoto = async (data, token) => {
  const config = requestConfig('POST', data, token, true);

  try {
    const res = await fetch(`${api}/photos`, config)
      .then((res) => res.json())
      .catch((error) => error);

    return res;
  } catch (error) {
    console.log(error);
  }
};

// GET USER PHOTOS
export const getUserPhotos = async (id, token) => {
  const config = requestConfig('GET', null, token);

  try {
    const res = await fetch(`${api}/photos/user/${id}`, config)
      .then((res) => res.json())
      .catch((error) => error);

    return res;
  } catch (error) {
    console.log(error);
  }
};

// DELETE A PHOTO
export const deletePhoto = async (id, token) => {
  const config = requestConfig('DELETE', null, token);

  try {
    const res = await fetch(`${api}/photos/${id}`, config)
      .then((res) => res.json())
      .catch((error) => error);

    return res;
  } catch (error) {
    console.log(error);
  }
};

const photoService = {
  publishPhoto,
  getUserPhotos,
  deletePhoto,
};

export default photoService;
