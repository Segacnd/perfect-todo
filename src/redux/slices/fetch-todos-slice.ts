import { PayloadAction, createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import axios from 'axios';
import { Status } from '../../enums/enums';

export const fetchTodos = createAsyncThunk('todos/fetchTodos', async () => {
  const { data } = await axios.get<ITodo[]>('https://64368e963e4d2b4a12d57f98.mockapi.io/todos');
  return data;
});
export interface ITodo {
  id: number;
  userId: number;
  categories: string;
  title: string;
  text: string;
  notes: INote[];
}

export interface INote {
  id: number;
  note: string;
}
export interface IState {
  todos: ITodo[];
  status: string;
  activeCategory: string;
  categoryList: string[];
}
const initialState: IState = {
  todos: [],
  status: Status.INIT,
  activeCategory: 'all',
  categoryList: [],
};

const todosSlice = createSlice({
  name: 'todos',
  initialState,
  reducers: {
    sortTodos: (state, action) => {
      state.activeCategory = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(fetchTodos.pending, (state) => {
      state.todos = [];
      state.categoryList = [];
      state.status = Status.LOADING;
    });
    builder.addCase(fetchTodos.fulfilled, (state, action: PayloadAction<ITodo[]>) => {
      state.todos = action.payload;
      state.categoryList = state.todos.map((todo) => todo.categories);
      state.status = Status.SUCCESS;
    });
    builder.addCase(fetchTodos.rejected, (state) => {
      state.todos = [];
      state.categoryList = [];
      state.status = Status.ERROR;
    });
  },
});

export const { reducer: TodosReducer, actions: todosActions } = todosSlice;
