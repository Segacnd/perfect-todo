import { PayloadAction, createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { getDocs } from 'firebase/firestore';
import { Status } from '../../enums/enums';
import { todosCollection } from '../../firebase-config';
import { Note } from '../../types';

export const fetchTodos = createAsyncThunk('todos/fetchTodos', async (id: string) => {
  const res = await getDocs(todosCollection).then((querySnapshot) => {
    const data = querySnapshot.docs.map((doc) => ({ ...doc.data(), id: doc.id }));
    return data;
  });
  return res.filter((el) => el.user === id);
});

export interface ITodo {
  id: string;
  user: string | null;
  title: string;
  category: string;
  dateEnded: string | null;
  dateStarted: string;
  description: string;
  notes: Note[];
}

export interface ITodosState {
  todos: ITodo[];
  status: Status;
  activeCategory: string;
  categoryList: string[];
}
const initialState: ITodosState = {
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
      state.categoryList = [...new Set(state.todos.map((todo) => todo.category.toLowerCase()))];
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
