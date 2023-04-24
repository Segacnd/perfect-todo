import { PayloadAction, createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { addDoc, doc, getDoc, updateDoc } from 'firebase/firestore';
import { db, todosCollection } from '../../firebase-config';
import { ITodo } from './fetch-todos-slice';
import { Status } from '../../enums/enums';
import { Note } from '../../types';

export const fetchTodoById = createAsyncThunk('todo/fetchTodoById', async (id: string) => {
  const docRef = doc(todosCollection, id);
  const docSnap = await getDoc(docRef);
  if (docSnap.exists()) {
    const todo = { ...docSnap.data(), id: docSnap.id };
    console.log(todo);
    return todo;
  }
  return undefined;
});
export const addNewNote = createAsyncThunk(
  'todo/addNewNote',
  async ({ updatedNotes, id }: { updatedNotes: Note[]; id: string }) => {
    const todoDoc = doc(db, 'todos', id);
    const newFields = {
      notes: updatedNotes,
    };
    await updateDoc(todoDoc, newFields);

    console.log(todoDoc);
    console.log('sss');
  }
);
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
