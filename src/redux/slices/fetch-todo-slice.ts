import { PayloadAction, createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { doc, getDoc } from 'firebase/firestore';
import { todosCollection } from '../../firebase-config';
import { ITodo } from './fetch-todos-slice';
import { Status } from '../../enums/enums';

export const fetchTodoById = createAsyncThunk('todo/fetchTodoById', async (id: string) => {
  const docRef = doc(todosCollection, id);
  const docSnap = await getDoc(docRef);
  if (docSnap.exists()) {
    const todo = { id: docSnap.id, ...docSnap.data() };
    return todo;
  }
  return undefined;
});
interface ITodoState {
  todo: ITodo | undefined;
  status: Status;
}
const initialState: ITodoState = {
  todo: undefined,
  status: Status.INIT,
};
const todoSlice = createSlice({
  name: 'todo',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(fetchTodoById.pending, (state) => {
      state.todo = undefined;
      state.status = Status.LOADING;
    });
    builder.addCase(fetchTodoById.fulfilled, (state, action: PayloadAction<ITodo | undefined>) => {
      state.todo = action.payload;
      state.status = Status.SUCCESS;
    });
    builder.addCase(fetchTodoById.rejected, (state) => {
      state.todo = undefined;
      state.status = Status.ERROR;
    });
  },
});

export const { reducer: TodoReducer, actions: todoActions } = todoSlice;
