import { PayloadAction, createSlice } from '@reduxjs/toolkit';

type UserState = {
  email: string | null;
  id: string | null;
  token: string | null;
};

const initialState: UserState = {
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
    },
    removeUser(state) {
      state.email = null;
      state.id = null;
      state.token = null;
    },
  },
});

export const { reducer: UserReducer, actions: userActions } = userSlice;
