import { createSlice } from '@reduxjs/toolkit';

export type UserState = {
  email: string | null;
  id: string | null;
  token: string | null;
  login: string | null;
  photoUrl: string | null;
};

const initialState: UserState = {
  login: null,
  email: null,
  id: null,
  token: null,
  photoUrl: null,
};

export const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    setUser(state, action) {
      state.email = action.payload.email;
      state.id = action.payload.id;
      state.token = action.payload.token;
      state.login = action.payload.login;
      state.photoUrl = action.payload.photoUrl;
    },
    removeUser(state) {
      state.email = null;
      state.id = null;
      state.token = null;
      state.login = null;
      state.photoUrl = null;
    },
  },
});

export const { reducer: UserReducer, actions: userActions } = userSlice;
