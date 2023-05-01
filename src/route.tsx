import { Route, createRoutesFromElements, createBrowserRouter } from 'react-router-dom';
import { Layout } from './components/layout/layout';
import { App } from './App';
import { TodoPage } from './pages/todo-page/todo-page';
import { Auth } from './pages/auth/auth';
import { FormLayout } from './components/form-layout/form-layout';
import { Register } from './pages/register/register';
import { Profile } from './pages/profile/profile';

export const router = createBrowserRouter(
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
