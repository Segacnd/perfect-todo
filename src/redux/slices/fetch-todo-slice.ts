import { PayloadAction, createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { deleteDoc, doc, getDoc, updateDoc, addDoc } from 'firebase/firestore';
import { db, todosCollection } from '../../firebase-config';
import { ITodo } from './fetch-todos-slice';
import { Status } from '../../enums/enums';
import { Note, Todo } from '../../types';

export const fetchTodoById = createAsyncThunk('todo/fetchTodoById', async (id: string) => {
  const docRef = doc(todosCollection, id);
  const docSnap = await getDoc(docRef);
  if (docSnap.exists()) {
    const todo = { ...docSnap.data(), id: docSnap.id };
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
  }
);

export const completeTodo = createAsyncThunk('todo/completeTodo', async (id: string) => {
  const todoDoc = doc(db, 'todos', id);
  const newFields = {
    dateEnded: new Date().toISOString(),
  };
  await updateDoc(todoDoc, newFields);
});

export const deleteTodo = createAsyncThunk('todo/deleteTodo', async (id: string) => {
  const todoDoc = doc(db, 'todos', id);

  await deleteDoc(todoDoc);
});

export const addTodo = createAsyncThunk('todo/addTodo', async (values: Todo) => {
  await addDoc(todosCollection, values);
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
