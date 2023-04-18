import { PayloadAction, createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import axios from 'axios';

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
interface IState {
  todos: ITodo[];
  status: string;
}
const initialState: IState = {
  todos: [],
  status: '',
};

const todosSlice = createSlice({
  name: 'todos',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(fetchTodos.pending, (state) => {
      state.todos = [];
      state.status = 'loading';
    });
    builder.addCase(fetchTodos.fulfilled, (state, action: PayloadAction<ITodo[]>) => {
      state.todos = action.payload;
      state.status = 'success';
    });
    builder.addCase(fetchTodos.rejected, (state) => {
      state.todos = [];
      state.status = 'error';
    });
  },
});

export const { reducer: TodosReducer, actions: todosActions } = todosSlice;
