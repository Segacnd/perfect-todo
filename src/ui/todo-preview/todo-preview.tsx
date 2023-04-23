import { FC, useId } from 'react';
import styles from './todo-preview.module.css';

import deleteIcon from '../../assets/delete-icon.svg';
import completeIcon from '../../assets/complete-circle.svg';
import { useAppDispatch } from '../../redux/store';
import { deleteTodo, fetchTodos } from '../../redux/slices/fetch-todos-slice';

type TodopreviewProps = {
  text: string;
  completeTodo?: () => void;

  index: string;
};
export const TodoPreview: FC<TodopreviewProps> = ({ text, completeTodo, index }) => {
  const id = useId();
  const dispatch = useAppDispatch();
  const deleteCurrentTodo = (e: React.MouseEvent) => {
    e.stopPropagation();
    dispatch(deleteTodo(index));
    console.log('event');
    dispatch(fetchTodos());
  };

  return (
    <div className={styles.previewWrapper}>
      <div className={styles.completeTodo}>
        <label htmlFor={id}>
          <img src={completeIcon} alt='complete icon' />
        </label>
        <input onChange={completeTodo} type='checkbox' name='' id={id} />
      </div>
      <p className={styles.todo}>{text}</p>
      <div className={styles.deleteTodo}>
        <button type='button' onClick={(e) => deleteCurrentTodo(e)}>
          <img src={deleteIcon} alt='delete icon' />
        </button>
      </div>
    </div>
  );
};
