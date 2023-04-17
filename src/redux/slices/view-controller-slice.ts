import { createSlice, PayloadAction } from '@reduxjs/toolkit';

export type ColorThemeType = 'light' | 'dark';
export type TodoPreviewType = 'inProgress' | 'completed';

type ViewControllerState = {
  colorTheme: ColorThemeType;
  todoPreviewType: TodoPreviewType;
};

const initialState: ViewControllerState = {
  colorTheme: 'light',
  todoPreviewType: 'inProgress',
};

export const viewControllerSlice = createSlice({
  name: 'viewController',
  initialState,
  reducers: {
    themeToggler: (state, action: PayloadAction<ColorThemeType>) => {
      state.colorTheme = action.payload;
    },
    todoPreviewToggler: (state, action: PayloadAction<TodoPreviewType>) => {
      state.todoPreviewType = action.payload;
    },
  },
});

export const { reducer: ViewController, actions: viewControllerActions } = viewControllerSlice;
