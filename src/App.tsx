import './App.css';
import { Categories } from './components/categories/categories';
import { TodosContainer } from './components/todos-container/todos-container';
import { FC } from 'react';

export const App: FC = () => {
  return (
    <>
      <Categories />
      <TodosContainer />
    </>
  );
};
