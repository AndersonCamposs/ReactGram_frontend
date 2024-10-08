import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';

import photoService from '../services/photoService';

const initialState = {
  photos: [],
  photo: {},
  error: false,
  success: false,
  loading: false,
  message: null,
};

// PUBLISH AN USER PHOTO
export const publishPhoto = createAsyncThunk('photo/publish', async (photo, thunkAPI) => {
  const token = thunkAPI.getState().auth.user.token;

  const data = await photoService.publishPhoto(photo, token);

  // CHECK FOR ERRORS
  if (data.errors) {
    return thunkAPI.rejectWithValue(data.errors[0]);
  }

  return data;
});

// GET USER PHOTOS
export const getUserPhotos = createAsyncThunk('photo/userphotos', async (id, thunkAPI) => {
  const token = thunkAPI.getState().auth.user.token;

  const data = await photoService.getUserPhotos(id, token);

  return data;
});

// DELETE A PHOTO
export const deletePhoto = createAsyncThunk('photo/delete', async (id, thunkAPI) => {
  const token = thunkAPI.getState().auth.user.token;

  const data = await photoService.deletePhoto(id, token);

  if (data.errors) {
    return thunkAPI.rejectWithValue(data.errors[0]);
  }

  return data;
});

// UPDATE A PHOTO
export const updatePhoto = createAsyncThunk('phot/upload', async (commentData, thunkAPI) => {
  const token = thunkAPI.getState().auth.user.token;

  const data = await photoService.updatePhoto({ title: commentData.title }, commentData.id, token);

  if (data.errors) {
    return thunkAPI.rejectWithValue(data.errors[0]);
  }

  return data;
});

// GET PHOTO BY ID
export const getPhoto = createAsyncThunk('photos/getphoto', async (id, thunkAPI) => {
  const token = thunkAPI.getState().auth.user.token;

  const data = await photoService.getPhoto(id, token);

  return data;
});

// LIKE A PHOTO
export const likePhoto = createAsyncThunk('photos/like', async (id, thunkAPI) => {
  const token = thunkAPI.getState().auth.user.token;

  const data = await photoService.likePhoto(id, token);

  // CHECK FOR ERRORS
  if (data.errors) {
    return thunkAPI.rejectWithValue(data.errors[0]);
  }

  return data;
});

// ADD A COMMENT
export const commentPhoto = createAsyncThunk('photo/comment', async (commentData, thunkAPI) => {
  const token = thunkAPI.getState().auth.user.token;

  const data = await photoService.commentPhoto({ comment: commentData.comment }, commentData.id, token);

  // CHECK FOR ERRORS
  if (data.errors) {
    return thunkAPI.rejectWithValue(data.errors[0]);
  }

  return data;
});

// GET ALL PHOTOS
// _ como primeiro argumento significa que ele é dispensado
export const getPhotos = createAsyncThunk('photos/getphotos', async (_, thunkAPI) => {
  const token = thunkAPI.getState().auth.user.token;

  const data = await photoService.getPhotos(token);

  return data;
});

// SEARCH PHOTO BY TITLE
export const searchPhotos = createAsyncThunk('photo/search', async (query, thunkAPI) => {
  const token = thunkAPI.getState().auth.user.token;

  const data = photoService.searchPhotos(query, token);

  return data;
});

export const photoSlice = createSlice({
  name: 'photo',
  initialState,
  reducers: {
    resetMessage: (state) => {
      state.message = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(publishPhoto.pending, (state) => {
        state.loading = true;
        state.error = false;
      })
      .addCase(publishPhoto.fulfilled, (state, action) => {
        state.loading = false;
        state.success = true;
        state.error = null;
        state.photo = action.payload;
        if (!Array.isArray(state.photos)) {
          state.photos = [];
        }
        state.photos.unshift(state.photo);
        state.message = 'Foto publicada com sucesso!';
      })
      .addCase(publishPhoto.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
        state.photo = {};
      })
      .addCase(getUserPhotos.pending, (state) => {
        state.loading = true;
        state.error = false;
      })
      .addCase(getUserPhotos.fulfilled, (state, action) => {
        state.loading = false;
        state.success = true;
        state.error = null;
        state.photos = action.payload;
      })
      .addCase(deletePhoto.pending, (state) => {
        state.loading = true;
        state.error = false;
      })
      .addCase(deletePhoto.fulfilled, (state, action) => {
        state.loading = false;
        state.success = true;
        state.error = null;
        if (!Array.isArray(state.photos)) {
          state.photos = [];
        }
        state.photos.filter((photo) => {
          return photo._id !== action.payload.id;
        });
        state.message = action.payload.message;
      })
      .addCase(deletePhoto.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
        state.photo = {};
      })
      .addCase(updatePhoto.pending, (state) => {
        state.loading = true;
        state.error = false;
      })
      .addCase(updatePhoto.fulfilled, (state, action) => {
        state.loading = false;
        state.success = true;
        state.error = null;
        if (!Array.isArray(state.photos)) {
          state.photos = [];
        }
        state.photos.map((photo) => {
          if (photo._id === action.payload.photo._id) {
            return (photo.title = action.payload.photo.title);
          }
          return photo;
        });
        state.message = action.payload.message;
      })
      .addCase(updatePhoto.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
        state.photo = {};
      })
      .addCase(getPhoto.pending, (state) => {
        state.loading = true;
        state.error = false;
      })
      .addCase(getPhoto.fulfilled, (state, action) => {
        state.loading = false;
        state.success = true;
        state.error = null;
        state.photo = action.payload;
      })
      .addCase(likePhoto.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      .addCase(likePhoto.fulfilled, (state, action) => {
        state.loading = false;
        state.success = true;
        state.error = null;

        if (action.payload.likes) {
          state.payload.likes.push(action.payload.userId);
        }

        if (!Array.isArray(state.photos)) {
          state.photos = [];
        }
        state.photos.map((photo) => {
          if (photo._id === action.payload.photoId) {
            return photo.likes.push(action.payload.userId);
          }
          return photo;
        });

        state.message = action.payload.message;
      })
      .addCase(commentPhoto.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      .addCase(commentPhoto.fulfilled, (state, action) => {
        state.loading = false;
        state.success = true;
        state.error = null;

        state.photo.comments.push(action.payload.comment);

        state.message = action.payload.message;
      })
      .addCase(getPhotos.pending, (state) => {
        state.loading = true;
        state.error = false;
      })
      .addCase(getPhotos.fulfilled, (state, action) => {
        state.loading = false;
        state.success = true;
        state.error = null;
        state.photos = action.payload;
      })
      .addCase(searchPhotos.pending, (state) => {
        state.loading = true;
        state.error = false;
      })
      .addCase(searchPhotos.fulfilled, (state, action) => {
        state.loading = false;
        state.success = true;
        state.error = null;
        state.photos = action.payload;
      });
  },
});

export const { resetMessage } = photoSlice.actions;
export default photoSlice.reducer;
