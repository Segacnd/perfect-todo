import axios from 'axios';
import { PayloadAction, createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { INote, ITodo } from './fetch-todos-slice';

export const fetchTodoById = createAsyncThunk('todo/fetchTodoById', async (id: number) => {
  const { data } = await axios.get<ITodo[]>(`https://64368e963e4d2b4a12d57f98.mockapi.io/todos?id=${id}`);
  return data;
});
interface ITodoState {
  todo: ITodo[];
  status: string;
  notes: INote[];
}
const initialState: ITodoState = {
  todo: [],
  status: '',
  notes: [],
};
const todoSlice = createSlice({
  name: 'todo',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(fetchTodoById.pending, (state) => {
      state.todo = [];
      state.status = 'loading';
    });
    builder.addCase(fetchTodoById.fulfilled, (state, action: PayloadAction<ITodo[]>) => {
      state.todo = action.payload;
      state.status = 'success';
    });
    builder.addCase(fetchTodoById.rejected, (state) => {
      state.todo = [];
      state.status = 'error';
    });
  },
});

export const { reducer: TodoReducer, actions: todoActions } = todoSlice;
