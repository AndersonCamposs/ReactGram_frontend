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
      });
  },
});

export const { resetMessage } = photoSlice.actions;
export default photoSlice.reducer;
