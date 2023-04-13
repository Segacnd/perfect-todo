import { FC, useId } from 'react';
import styles from './todo-preview.module.css';

import deleteIcon from '../../assets/delete-icon.svg';
import completeIcon from '../../assets/complete-circle.svg';

type TodopreviewProps = {
  text: string;
  completeTodo: () => void;
  deleteTodo: (id: number) => void;
};

export const TodoPreview: FC<TodopreviewProps> = ({ text, completeTodo, deleteTodo }) => {
  const id = useId();

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
        <button type='button' onClick={() => deleteTodo}>
          <img src={deleteIcon} alt='delete icon' />
        </button>
      </div>
    </div>
  );
};
