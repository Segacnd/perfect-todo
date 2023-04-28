import { PayloadAction, createSlice } from '@reduxjs/toolkit';

export type UserState = {
  email: string | null;
  id: string | null;
  token: string | null;
  login: string | null;
};

const initialState: UserState = {
  login: null,
  email: null,
  id: null,
  token: null,
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
    },
    removeUser(state) {
      state.email = null;
      state.id = null;
      state.token = null;
      state.login = null;
    },
  },
});

export const { reducer: UserReducer, actions: userActions } = userSlice;
