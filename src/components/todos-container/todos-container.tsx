import { useEffect, FC, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { motion, useDragControls } from 'framer-motion';
import { AddButton } from '../../ui/buttons/add-button/add-button';
import { TodoPreview } from '../../ui/todo-preview/todo-preview';
import { ViewToggler } from '../view-toggler/view-toggler';
import { useAppDispatch, useAppSelector } from '../../redux/store';
import { viewControllerSelector, todosSelector, userSelector } from '../../redux/selectors';
import { addTodoActions } from '../../redux/slices/add-todo-slice';
import burgerIcon from '../../assets/burger-icon.svg';
import styles from './todos-container.module.css';
import { categoryActions } from '../../redux/slices/category-slice';
import { fetchTodos } from '../../redux/slices/fetch-todos-slice';
import { formAnimation } from '../../animations/animations';

export const TodosContainer: FC = () => {
  const { t } = useTranslation();
  const { todos, activeCategory } = useAppSelector(todosSelector);
  const { todoPreviewType } = useAppSelector(viewControllerSelector);
  const { id } = useAppSelector(userSelector);
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const parentRef = useRef<HTMLDivElement>(null);
  const controls = useDragControls();
  useEffect(() => {
    if (id) {
      dispatch(fetchTodos(id));
    }
  }, [dispatch, id]);
  return (
    <section className={styles.todosContainer}>
      <motion.div initial='hidden' whileInView='visible' variants={formAnimation} className={styles.todosHeader}>
        <h3>{todos.length ? activeCategory : ''}</h3>
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
      </motion.div>
      <motion.div className={styles.todosWrapper} ref={parentRef}>
        {todos &&
          todos
            .filter((el) => (todoPreviewType === 'completed' ? el.dateEnded : !el.dateEnded))
            .filter((todo) => (activeCategory === 'all' ? todo : todo.category.toLowerCase() === activeCategory))
            .map((el) => (
              <motion.div
                style={{ touchAction: 'none' }}
                drag
                dragConstraints={parentRef}
                dragControls={controls}
                key={el.description}
              >
                <button type='button' onDoubleClick={() => navigate(`/todo/${el.id}`)} className={styles.navButton}>
                  <TodoPreview text={el.title} key={el.id} index={el.id} todo={el} />
                </button>
              </motion.div>
            ))}
        {todoPreviewType === 'inProgress' &&
          todos.filter((todo) => todo.dateStarted && !todo.dateEnded).length === 0 && (
            <p className={styles.noTodosText}>{t('no_todos_text')}</p>
          )}
        {todoPreviewType === 'completed' && todos.filter((todo) => todo.dateEnded).length === 0 && (
          <p className={styles.noTodosText}>{t('no_completed_todos_text')}</p>
        )}
      </motion.div>
    </section>
  );
};
