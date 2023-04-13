import './App.css';
import { FC } from 'react';
import { Categories } from './components/categories/categories';
import { TodosContainer } from './components/todos-container/todos-container';

export const App: FC = () => {
  return (
    <>
      <Categories />
      <TodosContainer />
    </>
  );
};
