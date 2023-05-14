import { Status } from '../enums/enums';
import { RootState } from './store';

export const viewControllerSelector = (state: RootState) => state.ViewController;
export const categorySelector = (state: RootState) => state.CategoryReducer;
export const addTodoSelector = (state: RootState) => state.AddTodoReducer;
export const todosSelector = (state: RootState) => state.TodosReducer;
export const todoSelector = (state: RootState) => state.TodoReducer;
export const userSelector = (state: RootState) => state.UserReducer;
export const alertSelector = (state: RootState) => state.AlertReducer;
export const editProfileSelector = (state: RootState) => state.EditProfileReducer;

export const isLoadingStatus = (state: RootState) =>
  [
    state.TodosReducer.status,
    state.TodoReducer.status,
    state.UserReducer.status,
    state.UserReducer.registerStatus,
    state.UserReducer.editProfileStatus,
  ].includes(Status.LOADING);
