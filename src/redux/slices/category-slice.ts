import { PayloadAction, createSlice } from '@reduxjs/toolkit';

type CategoryState = {
  modalIsOpen: boolean;
  isMobileModalOpen: boolean;
};

const initialState: CategoryState = {
  modalIsOpen: false,
  isMobileModalOpen: false,
};

export const categorySlice = createSlice({
  name: 'category',
  initialState,
  reducers: {
    modalToggler: (state, action: PayloadAction<boolean>) => {
      state.modalIsOpen = action.payload;
    },
    mobileToggler: (state, action: PayloadAction<boolean>) => {
      state.isMobileModalOpen = action.payload;
    },
  },
});

export const { reducer: CategoryReducer, actions: categoryActions } = categorySlice;
