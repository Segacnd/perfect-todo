import { FC } from 'react';
import './App.css';
import { Categories } from './components/Categories/Categories';
import { TodosContainer } from './components/todos-container/todos-container';

export const App: FC = () => {
  return (
    <>
      <Categories />
      <TodosContainer />
    </>
  );
};
