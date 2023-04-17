import { createSlice } from '@reduxjs/toolkit';

type CategoryState = {
  isAddTodoModalOpen: boolean;
};

const initialState: CategoryState = {
  isAddTodoModalOpen: false,
};

export const addTodoSlice = createSlice({
  name: 'add-todo',
  initialState,
  reducers: {
    addTodoModalToggler: (state, action) => {
      state.isAddTodoModalOpen = action.payload;
    },
  },
});

export const { reducer: AddTodoReducer, actions: addTodoActions } = addTodoSlice;
