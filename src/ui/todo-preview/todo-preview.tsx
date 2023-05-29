import React, { FC, useId, useState } from 'react';
import { motion } from 'framer-motion';
import { useTranslation } from 'react-i18next';
import styles from './todo-preview.module.css';
import deleteIcon from '../../assets/delete-icon.svg';
import completeIcon from '../../assets/complete-circle.svg';
import completedIcon from '../../assets/success-icon.svg';
import { useAppDispatch, useAppSelector } from '../../redux/store';
import { completeTodo, deleteTodo } from '../../redux/slices/fetch-todo-slice';
import { ITodo, fetchTodos } from '../../redux/slices/fetch-todos-slice';
import { userSelector } from '../../redux/selectors';
import { pAnimation } from '../../animations/animations';
import { Tooltip } from '../pop-up/tooltip/tooltip';

type TodopreviewProps = {
  text: string;
  index: string;
  todo: ITodo;
};
export const TodoPreview: FC<TodopreviewProps> = ({ text, index, todo }) => {
  const { t } = useTranslation();
  const [isTooltipOpen, setIsTooltipOpen] = useState<boolean>(false);
  const userState = useAppSelector(userSelector);
  const userId = userState.id;
  const id = useId();
  const dispatch = useAppDispatch();
  const deleteCurrentTodo = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (userId) {
      dispatch(fetchTodos(userId));
    }
    dispatch(deleteTodo(index));
  };
  const completeCurrentTodo = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (userId) {
      dispatch(fetchTodos(userId));
    }
    dispatch(completeTodo(index));
  };

  const showTooltip = () => {
    setIsTooltipOpen((prev) => !prev);

    const timeout = setTimeout(() => {
      setIsTooltipOpen(false);
      clearTimeout(timeout);
    }, 2000);
  };

  return (
    <motion.div
      onMouseEnter={showTooltip}
      onMouseLeave={() => setIsTooltipOpen(false)}
      initial='hidden'
      whileInView='visible'
      variants={pAnimation}
      className={styles.previewWrapper}
    >
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
      {isTooltipOpen && <Tooltip text={t('doubleclick_tooltip_text')} />}
    </motion.div>
  );
};
