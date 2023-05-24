import { initializeApp } from 'firebase/app';
import { CollectionReference, DocumentData, collection, getFirestore } from 'firebase/firestore';
import { getStorage } from 'firebase/storage';
import { getAuth } from 'firebase/auth';
import { Todo } from './types';

// const firebaseConfig = {
//   apiKey: import.meta.env.VITE_API_KEY,
//   authDomain: import.meta.env.VITE_AUTH_DOMAIN,
//   projectId: import.meta.env.VITE_PROJECT_ID,
//   storageBucket: import.meta.env.VITE_STORAGE_BUCKET,
//   messagingSenderId: import.meta.env.VITE_MESSAGING_SENDER_ID,
//   appId: import.meta.env.VITE_APP_ID,
//   measurementId: import.meta.env.VITE_MEASUREMENT_ID,
// };

const firebaseConfig = {
  apiKey: 'AIzaSyAWEj2bE5mIbpLif9w2Tj8wMIUAciW9SF8',
  authDomain: 'perfect-todo.firebaseapp.com',
  projectId: 'perfect-todo',
  storageBucket: 'perfect-todo.appspot.com',
  messagingSenderId: '6372102301',
  appId: '1:6372102301:web:e7a2c3fba0db2fc8af0474',
  measurementId: 'G-XH9H9RPZ6C',
};

const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);

export const createCollection = <T = DocumentData>(collectionName: string) => {
  return collection(db, collectionName) as CollectionReference<T>;
};

export const todosCollection = createCollection<Todo>('todos');
export const storage = getStorage(app);
export const auth = getAuth();
