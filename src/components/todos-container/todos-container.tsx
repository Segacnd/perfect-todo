import { useEffect, useState, FC, useRef } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { deleteDoc, doc } from 'firebase/firestore';
import { AddButton } from '../../ui/buttons/add-button/add-button';
import { TodoPreview } from '../../ui/todo-preview/todo-preview';
import { ViewToggler } from '../view-toggler/view-toggler';
import { useAppDispatch, useAppSelector } from '../../redux/store';
import { viewControllerSelector, todosSelector } from '../../redux/selectors';
import { addTodoActions } from '../../redux/slices/add-todo-slice';
import burgerIcon from '../../assets/burger-icon.svg';
import styles from './todos-container.module.css';
import { categoryActions } from '../../redux/slices/category-slice';
import { fetchTodos } from '../../redux/slices/fetch-todos-slice';
import { Status } from '../../enums/enums';
import { db } from '../../firebase-config';

export const TodosContainer: FC = () => {
  const { t } = useTranslation();
  const { todos, activeCategory, status, categoryList } = useAppSelector(todosSelector);
  const { todoPreviewType } = useAppSelector(viewControllerSelector);
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  useEffect(() => {
    dispatch(fetchTodos());
    console.log('aa');
  }, [dispatch]);
  console.log(todos);
  return (
    <section className={styles.todosContainer}>
      <div className={styles.todosHeader}>
        <h3>Home</h3>
        <div className={styles.rightSide}>
          <ViewToggler />
          <AddButton
            tooltipText={t('tooltip_add_todo')}
            text='+'
            click={() => dispatch(addTodoActions.addTodoModalToggler(true))}
          />
          <button
            type='button'
            onClick={() => dispatch(categoryActions.mobileToggler(true))}
            className={styles.burgerWrapper}
          >
            <img src={burgerIcon} alt='burger' />
          </button>
        </div>
      </div>
      <div className={styles.todosWrapper}>
        {todos &&
          todos
            // .filter((el) => (todoPreviewType === 'completed' ? el.completed : !el.completed))
            .filter((todo) => (activeCategory === 'all' ? todo : todo.category === activeCategory))
            .map((el) => (
              <button type='button' onClick={() => navigate(`/todo/${el.id}`)} key={el.description}>
                <TodoPreview text={el.title} key={el.id} index={el.id} />
              </button>
            ))}
      </div>
    </section>
  );
};
