import React from 'react';
import ReactDOM from 'react-dom/client';
import { createBrowserRouter, RouterProvider, Route, createRoutesFromElements } from 'react-router-dom';
import { PersistGate } from 'redux-persist/integration/react';
import './index.css';
import './i18n';
import { Provider } from 'react-redux';
import { App } from './App';
import { Layout } from './components/layout/layout';
import { TodoPage } from './pages/todo-page';
import { store, persistor } from './redux/store';

const router = createBrowserRouter(
  createRoutesFromElements(
    <Route path='/' element={<Layout />}>
      <Route path='/' element={<App />} />
      <Route path='/todo/:id' element={<TodoPage />} />
    </Route>
  )
);

ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
  <React.StrictMode>
    <>
      <Provider store={store}>
        <PersistGate loading={null} persistor={persistor}>
          <RouterProvider router={router} />
        </PersistGate>
      </Provider>
    </>
  </React.StrictMode>
);
