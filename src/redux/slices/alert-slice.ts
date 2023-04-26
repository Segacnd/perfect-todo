import { createSlice } from '@reduxjs/toolkit';

type AlertState = {
  isAlertOpen: boolean;
};

const initialState: AlertState = {
  isAlertOpen: false,
};

export const alertSlice = createSlice({
  name: 'alertSlice',
  initialState,
  reducers: {
    setAlertStatus: (state, action) => {
      state.isAlertOpen = action.payload;
    },
  },
});

export const { reducer: AlertReducer, actions: alertActions } = alertSlice;
