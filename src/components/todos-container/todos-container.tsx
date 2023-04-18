import { useEffect, useState, FC } from 'react';
import { Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { AddButton } from '../../ui/buttons/add-button/add-button';
import { TodoPreview } from '../../ui/todo-preview/todo-preview';
import { ViewToggler } from '../view-toggler/view-toggler';
import { useAppDispatch, useAppSelector } from '../../redux/store';
import { viewControllerSelector, todosSelector } from '../../redux/selectors';
import { addTodoActions } from '../../redux/slices/add-todo-slice';
import styles from './todos-container.module.css';
import { fetchTodos } from '../../redux/slices/fetch-todos-slice';

type ToDo = {
  userId: number;
  id: number;
  title: string;
  completed: boolean;
};

export const TodosContainer: FC = () => {
  const { t } = useTranslation();
  const { todos } = useAppSelector(todosSelector);
  const { todoPreviewType } = useAppSelector(viewControllerSelector);
  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(fetchTodos());
  }, [dispatch]);

  return (
    <section className={styles.todosContainer}>
      <div className={styles.todosHeader}>
        <h3>Home</h3>
        <ViewToggler />
        <AddButton
          tooltipText={t('tooltip_add_todo')}
          text='+'
          click={() => dispatch(addTodoActions.addTodoModalToggler(true))}
        />
      </div>
      <div className={styles.todosWrapper}>
        {todos &&
          todos
            .filter((el) => (todoPreviewType === 'completed' ? el.completed : !el.completed))
            .map((el) => (
              <Link to={`/todo/${el.id}`} key={el.id}>
                <TodoPreview text={el.title} completeTodo={() => {}} deleteTodo={() => {}} />
              </Link>
            ))}
      </div>
    </section>
  );
};
