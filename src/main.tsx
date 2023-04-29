import React from 'react';
import ReactDOM from 'react-dom/client';
import { createBrowserRouter, RouterProvider, Route, createRoutesFromElements } from 'react-router-dom';
import { PersistGate } from 'redux-persist/integration/react';
import './index.css';
import './i18n';
import { Provider } from 'react-redux';
import { App } from './App';
import { Layout } from './components/layout/layout';
import { TodoPage } from './pages/todo-page/todo-page';
import { store, persistor } from './redux/store';
import { FormLayout } from './components/form-layout/form-layout';
import { Auth } from './pages/auth/auth';
import { Register } from './pages/register/register';
import { Profile } from './pages/profile/profile';

const router = createBrowserRouter(
  createRoutesFromElements(
    <Route>
      <Route path='/' element={<Layout />}>
        <Route index element={<App />} />
        <Route path='/todo/:id' element={<TodoPage />} />
      </Route>
      <Route element={<FormLayout />}>
        <Route path='/auth' element={<Auth />} />
        <Route path='/registration' element={<Register />} />
      </Route>
      <Route path='/profile' element={<Profile />} />
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
