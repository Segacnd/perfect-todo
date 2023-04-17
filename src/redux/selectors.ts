import { RootState } from './store';

export const viewControllerSelector = (state: RootState) => state.ViewController;
export const categorySelector = (state: RootState) => state.CategoryReducer;
export const addTodoSelector = (state: RootState) => state.AddTodoReducer;
