import { configureStore, combineReducers } from '@reduxjs/toolkit';
import { TypedUseSelectorHook, useDispatch, useSelector } from 'react-redux';
import { persistStore, persistReducer, FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER } from 'redux-persist';
import storage from 'redux-persist/lib/storage';
import { ViewController } from './slices/view-controller-slice';
import { CategoryReducer } from './slices/category-slice';
import { AddTodoReducer } from './slices/add-todo-slice';
import { TodosReducer } from './slices/fetch-todos-slice';
import { TodoReducer } from './slices/fetch-todo-slice';
import { UserReducer } from './slices/user-slice';
import { AlertReducer } from './slices/alert-slice';

const rootReducer = combineReducers({
  ViewController,
  CategoryReducer,
  AddTodoReducer,
  TodosReducer,
  TodoReducer,
  UserReducer,
  AlertReducer,
});

const persistConfig = {
  key: 'root',
  storage,
  whitelist: ['ViewController', 'UserReducer'],
};

const persistedReducer = persistReducer(persistConfig, rootReducer);

export const store = configureStore({
  reducer: persistedReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
      },
    }),
});
export const persistor = persistStore(store);

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
export const useAppDispatch: () => AppDispatch = useDispatch;
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;
