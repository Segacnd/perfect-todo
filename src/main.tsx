import React from 'react';
import ReactDOM from 'react-dom/client';
import { RouterProvider, createBrowserRouter, createRoutesFromElements, Route } from 'react-router-dom';
import { PersistGate } from 'redux-persist/integration/react';
import './index.css';
import './i18n';
import { Provider } from 'react-redux';
import { store, persistor } from './redux/store';
import { Layout } from './components/layout/layout';
import { App } from './App';
import { TodoPage } from './pages/todo-page/todo-page';
import { FormLayout } from './components/form-layout/form-layout';
import { Auth } from './pages/auth/auth';
import { Register } from './pages/register/register';
import { Profile } from './pages/profile/profile';
import { authPath, layoutPath, profilePath, registrationPath, todoPagePath } from './routes';

const router = createBrowserRouter(
  createRoutesFromElements(
    <Route>
      <Route path={layoutPath} element={<Layout />}>
        <Route index element={<App />} />
        <Route path={todoPagePath} element={<TodoPage />} />
      </Route>
      <Route element={<FormLayout />}>
        <Route path={authPath} element={<Auth />} />
        <Route path={registrationPath} element={<Register />} />
      </Route>
      <Route path={profilePath} element={<Profile />} />
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
