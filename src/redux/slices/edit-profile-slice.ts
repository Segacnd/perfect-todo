import { createSlice } from '@reduxjs/toolkit';

type CategoryState = {
  isEditProfileModalOpen: boolean;
};
const initialState: CategoryState = {
  isEditProfileModalOpen: false,
};

export const editProfileSlice = createSlice({
  name: 'edit-profile',
  initialState,
  reducers: {
    editProfileModalTrigger: (state, action) => {
      state.isEditProfileModalOpen = action.payload;
    },
  },
});

export const { reducer: EditProfileReducer, actions: editProfileActions } = editProfileSlice;
