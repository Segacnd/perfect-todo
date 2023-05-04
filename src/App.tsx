import { FC } from 'react';
import { Categories } from './components/categories/categories';
import { TodosContainer } from './components/todos-container/todos-container';
import { Modal } from './ui/pop-up/modal/modal';
import { useAppSelector } from './redux/store';
import { addTodoSelector, categorySelector } from './redux/selectors';
import { AddTodoModal } from './ui/pop-up/add-todo-modal/add-todo-modal';
import { Loader } from './ui/loader/loader';

export const App: FC = () => {
  const { modalIsOpen } = useAppSelector(categorySelector);
  const { isAddTodoModalOpen } = useAppSelector(addTodoSelector);
  return (
    <>
      {modalIsOpen && <Modal />}
      {isAddTodoModalOpen && <AddTodoModal />}
      <Loader />
      <Categories />
      <TodosContainer />
    </>
  );
};
