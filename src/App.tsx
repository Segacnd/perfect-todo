import { FC, useEffect } from 'react';
import './App.css';
import { getDocs } from 'firebase/firestore';
import { Categories } from './components/categories/categories';
import { TodosContainer } from './components/todos-container/todos-container';
import { Modal } from './ui/pop-up/modal/modal';
import { useAppSelector } from './redux/store';
import { addTodoSelector, categorySelector } from './redux/selectors';
import { AddTodoModal } from './ui/pop-up/add-todo-modal/add-todo-modal';

import { todosCollection } from './firebase-config';

export const App: FC = () => {
  const fetchPost = async () => {
    await getDocs(todosCollection).then((querySnapshot) => {
      const newData = querySnapshot.docs.map((doc) => ({ ...doc.data() }));
      console.log(newData);
    });
  };

  useEffect(() => {
    fetchPost();
  }, []);

  const { modalIsOpen } = useAppSelector(categorySelector);
  const { isAddTodoModalOpen } = useAppSelector(addTodoSelector);
  return (
    <>
      {modalIsOpen && <Modal />}
      {isAddTodoModalOpen && <AddTodoModal />}
      <Categories />
      <TodosContainer />
    </>
  );
};
