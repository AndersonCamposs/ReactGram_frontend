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
const getUserPhotos = async (id, token) => {
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
const deletePhoto = async (id, token) => {
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

// UPDATE A PHOTO
const updatePhoto = async (data, id, token) => {
  const config = requestConfig('PUT', data, token);

  try {
    const res = await fetch(`${api}/photos/${id}`, config)
      .then((res) => res.json())
      .catch((error) => error);

    return res;
  } catch (error) {
    console.log(error);
  }
};

// GET PHOTO BY ID
const getPhoto = async (id, token) => {
  const config = requestConfig('GET', null, token);

  try {
    const res = await fetch(`${api}/photos/${id}`, config)
      .then((res) => res.json())
      .catch((error) => error);

    return res;
  } catch (error) {
    console.log(error);
  }
};

// LIKE A PHOTO
const likePhoto = async (id, token) => {
  const config = requestConfig('PUT', null, token);
  try {
    const res = await fetch(`${api}/photos/like/${id}`, config)
      .then((res) => res.json())
      .catch((error) => error);

    return res;
  } catch (error) {
    console.log(error);
  }
};

// ADD A COMMENT
const commentPhoto = async (data, id, token) => {
  const config = requestConfig('PUT', data, token);

  try {
    const res = await fetch(`${api}/photos/comment/${id}`, config)
      .then((res) => res.json())
      .catch((error) => error);

    return res;
  } catch (error) {
    console.log(error);
  }
};

// GET ALL PHOTOS
const getPhotos = async (token) => {
  const config = requestConfig('GET', null, token);

  try {
    const res = await fetch(`${api}/photos`, config)
      .then((res) => res.json())
      .catch((error) => error);

    return res;
  } catch (error) {
    console.log(error);
  }
};

// SEARCH PHOTO BY TITLE
const searchPhotos = async (query, token) => {
  const config = requestConfig('GET', null, token);

  try {
    const res = await fetch(`${api}/photos/search/?q=${query}`, config)
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
  updatePhoto,
  getPhoto,
  likePhoto,
  commentPhoto,
  getPhotos,
  searchPhotos,
};

export default photoService;
