import React, { FC, useId, useRef } from 'react';
import styles from './todo-preview.module.css';
import deleteIcon from '../../assets/delete-icon.svg';
import completeIcon from '../../assets/complete-circle.svg';
import completedIcon from '../../assets/success-icon.svg';
import { useAppDispatch } from '../../redux/store';
import { completeTodo, deleteTodo } from '../../redux/slices/fetch-todo-slice';
import { ITodo, fetchTodos } from '../../redux/slices/fetch-todos-slice';

type TodopreviewProps = {
  text: string;
  index: string;
  todo: ITodo;
};
export const TodoPreview: FC<TodopreviewProps> = ({ text, index, todo }) => {
  const id = useId();
  const dispatch = useAppDispatch();
  const deleteCurrentTodo = (e: React.MouseEvent) => {
    e.stopPropagation();
    dispatch(fetchTodos());
    dispatch(deleteTodo(index));
  };
  const completeCurrentTodo = (e: React.MouseEvent) => {
    e.stopPropagation();
    dispatch(fetchTodos());
    dispatch(completeTodo(index));
  };

  return (
    <div className={styles.previewWrapper}>
      <div className={styles.completeTodo}>
        <button type='button' id={id} onClick={(e) => completeCurrentTodo(e)}>
          <img src={todo.dateEnded ? completedIcon : completeIcon} alt='complete icon' />
        </button>
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
