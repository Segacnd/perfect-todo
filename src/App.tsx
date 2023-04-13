import { useEffect, useState } from 'react';
import './App.css';
import { AddButton } from './ui/buttons/add-button/add-button';
import { TodoPreview } from './ui/todo-preview/todo-preview';
import { ViewToggler } from './components/view-toggler/view-toggler';
import { Categories } from './components/Categories/Categories';
import { TodosContainer } from './components/TodosContainer/TodosContainer';

export const App = () => {
  return (
    <>
      <Categories />
      <TodosContainer />
    </>
  );
};
