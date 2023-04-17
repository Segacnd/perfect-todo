import './App.css';
import { FC } from 'react';
import { Categories } from './components/categories/categories';
import { TodosContainer } from './components/todos-container/todos-container';
import { Modal } from './ui/pop-up/modal/modal';
import { useAppSelector } from './redux/store';
import { categorySelector } from './redux/selectors';

export const App: FC = () => {
  const { modalIsOpen } = useAppSelector(categorySelector);
  return (
    <>
      {modalIsOpen && <Modal />}
      <Categories />
      <TodosContainer />
    </>
  );
};
