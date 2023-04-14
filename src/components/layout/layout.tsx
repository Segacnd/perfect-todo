import { FC } from 'react';
import { Outlet } from 'react-router-dom';
import { Header } from '../header/Header';

export const Layout: FC = () => {
  return (
    <div className='App'>
      <h1 className='app-title'>Perfect To-Do</h1>
      <div className='container'>
        <Header />
        <main>
          <Outlet />
        </main>
      </div>

      <footer>created by Bergei</footer>
    </div>
  );
};
