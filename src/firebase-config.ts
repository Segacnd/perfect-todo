import { initializeApp } from 'firebase/app';
import { CollectionReference, DocumentData, collection, getFirestore, getDocs } from 'firebase/firestore';
import { getStorage } from 'firebase/storage';
import { Todo, User } from './types';
import { UserState } from './redux/slices/user-slice';

const firebaseConfig = {
  apiKey: import.meta.env.VITE_API_KEY,
  authDomain: import.meta.env.VITE_AUTH_DOMAIN,
  projectId: import.meta.env.VITE_PROJECT_ID,
  storageBucket: import.meta.env.VITE_STORAGE_BUCKET,
  messagingSenderId: import.meta.env.VITE_MESSAGING_SENDER_ID,
  appId: import.meta.env.VITE_APP_ID,
  measurementId: import.meta.env.VITE_MEASUREMENT_ID,
};

const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);

export const createCollection = <T = DocumentData>(collectionName: string) => {
  return collection(db, collectionName) as CollectionReference<T>;
};

export const todosCollection = createCollection<Todo>('todos');
export const storage = getStorage(app);
