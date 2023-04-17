import { FC } from 'react';
import ReactDOM from 'react-dom';
import styles from './add-todo-modal.module.css';
import { Button } from '../../buttons/default-button/button';
import { CloseButton } from '../../buttons/close-button/close-button';
import { useAppDispatch } from '../../../redux/store';
import { addTodoActions } from '../../../redux/slices/add-todo-slice';

export const AddTodoModal: FC = () => {
  const dispatch = useAppDispatch();
  return ReactDOM.createPortal(
    <div className={styles.modalWrapper}>
      <div className={styles.modalContainer}>
        <div className={styles.closeButton}>
          <CloseButton click={() => dispatch(addTodoActions.addTodoModalToggler(false))} />
        </div>
        <div className={styles.modalHeader}>
          <h3>Add Todo</h3>
          <p className={styles.categoryText}>
            for category: <span>Home</span>
          </p>
        </div>
        <div className={styles.box}>
          <p>add todos title</p>
          <input type='text' id='123' placeholder='title' />
        </div>
        <div className={styles.box}>
          <p>add todos description</p>
          <input type='text' id='123' placeholder='description' />
        </div>
        <Button text='add' buttonClick={() => {}} buttonType='submit' />
      </div>
    </div>,
    document.getElementById('add-modal') as Element
  );
};
