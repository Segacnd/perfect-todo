import { createSlice, PayloadAction } from '@reduxjs/toolkit';

type CategoryState = {
  modalIsOpen: boolean;
};

const initialState: CategoryState = {
  modalIsOpen: false,
};

export const categorySlice = createSlice({
  name: 'category',
  initialState,
  reducers: {
    modalToggler: (state, action) => {
      state.modalIsOpen = action.payload;
    },
  },
});

export const { reducer: CategoryReducer, actions: categoryActions } = categorySlice;
