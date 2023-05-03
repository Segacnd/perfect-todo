// import { render, screen, fireEvent, waitFor } from '@testing-library/react';
// import { describe, expect, it } from 'vitest';
// import userEvent from '@testing-library/user-event';
// import { Provider } from 'react-redux';
// import {
//   Route,
//   RouterProvider,
//   createBrowserRouter,
//   createMemoryRouter,
//   createRoutesFromElements,
// } from 'react-router-dom';
// import { PersistGate } from 'redux-persist/integration/react';
// import { App } from './App';
// import { Categories } from './components/categories/categories';
// import { persistor, store } from './redux/store';
// import { Layout } from './components/layout/layout';
// import { TodoPage } from './pages/todo-page/todo-page';
// import { Auth } from './pages/auth/auth';
// import { FormLayout } from './components/form-layout/form-layout';
// import { Register } from './pages/register/register';
// import { Profile } from './pages/profile/profile';
// import { authPath, layoutPath, profilePath, registrationPath, todoPagePath } from './routes';

// const router = createMemoryRouter(
//   createRoutesFromElements(
//     <Route>
//       <Route path={layoutPath} element={<Layout />}>
//         <Route index element={<App />} />
//         <Route path={todoPagePath} element={<TodoPage />} />
//       </Route>
//       <Route element={<FormLayout />}>
//         <Route path={authPath} element={<Auth />} />
//         <Route path={registrationPath} element={<Register />} />
//       </Route>
//       <Route path={profilePath} element={<Profile />} />
//     </Route>
//   )
// );

// describe('app', () => {
//   it('pass a valid email', async () => {
//     render(
//       <Provider store={store}>
//         <PersistGate loading={null} persistor={persistor}>
//           <RouterProvider router={router} />
//         </PersistGate>
//       </Provider>
//     );
//     const login = screen.getByTestId('email');
//     fireEvent.change(login, { target: { value: 'Segabelka@yandex.ru' } });
//     expect(screen.getByTestId('email')).toHaveValue('Segabelka@yandex.ru');
//     expect(screen.getByText('auth_button_text')).toBeInTheDocument();
//     expect(screen.getByText('auth_button_text')).toBeEnabled();
//   });
//   it('redirect to registration', async () => {
//     render(
//       <Provider store={store}>
//         <PersistGate loading={null} persistor={persistor}>
//           <RouterProvider router={router} />
//         </PersistGate>
//       </Provider>
//     );
//     const toRegister = screen.getByTestId('redirectToRegister');
//     expect(toRegister).toBeInTheDocument();
//     await userEvent.click(toRegister);
//     expect(screen.getByTestId('registrationTitle')).toBeInTheDocument();
//   });
//   it('redirect to auth', async () => {
//     render(
//       <Provider store={store}>
//         <PersistGate loading={null} persistor={persistor}>
//           <RouterProvider router={router} />
//         </PersistGate>
//       </Provider>
//     );
//     const toAuth = screen.getByTestId('redirectToAuth');
//     expect(toAuth).toBeInTheDocument();
//     await userEvent.click(toAuth);
//     expect(screen.getByTestId('authTitle')).toBeInTheDocument();
//   });
//   it('pass valid data in form', async () => {
//     render(
//       <Provider store={store}>
//         <PersistGate loading={null} persistor={persistor}>
//           <RouterProvider router={router} />
//         </PersistGate>
//       </Provider>
//     );
//     expect(screen.getByTestId('authTitle')).toBeInTheDocument();
//     const login = screen.getByTestId('email');
//     await userEvent.type(login, 'Segabelka@yandex.ru');
//     expect(login).toHaveValue('Segabelka@yandex.ru');
//   });
//   it('pass valid data in password', async () => {
//     render(
//       <Provider store={store}>
//         <PersistGate loading={null} persistor={persistor}>
//           <RouterProvider router={router} />
//         </PersistGate>
//       </Provider>
//     );
//     expect(screen.getByTestId('authTitle')).toBeInTheDocument();
//     const password = screen.getByTestId('password');
//     await userEvent.type(password, 'Baklajan111');
//     expect(password).toHaveValue('Baklajan111');
//   });
//   it('expect two value', async () => {
//     render(
//       <Provider store={store}>
//         <PersistGate loading={null} persistor={persistor}>
//           <RouterProvider router={router} />
//         </PersistGate>
//       </Provider>
//     );
//     const login = screen.getByTestId('email');
//     const password = screen.getByTestId('password');
//     const button = screen.getByTestId('button');
//     await userEvent.type(login, 'Segabelka@yandex.ru');
//     await userEvent.type(password, 'Baklajan111');
//     expect(login).toHaveValue('Segabelka@yandex.ru');
//     expect(password).toHaveValue('Baklajan111');
//     expect(button).toBeInTheDocument();
//     await userEvent.click(button);
//     expect(button).toBeInTheDocument();
//   });
// });
