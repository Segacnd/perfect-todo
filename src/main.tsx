import React from 'react';
import ReactDOM from 'react-dom/client';
import { createBrowserRouter, RouterProvider, Route, createRoutesFromElements } from 'react-router-dom';

import './index.css';
import './i18n';
import { Provider } from 'react-redux';
import { App } from './App';
import { Layout } from './components/layout/layout';
import { store } from './redux/store';

const router = createBrowserRouter(
  createRoutesFromElements(
    <Route path='/' element={<Layout />}>
      <Route path='/' element={<App />} />
    </Route>
  )
);

ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
  <React.StrictMode>
    <>
      <Provider store={store}>
        <RouterProvider router={router} />
      </Provider>
    </>
  </React.StrictMode>
);
