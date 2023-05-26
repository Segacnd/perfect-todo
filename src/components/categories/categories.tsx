import { FC } from 'react';
import { useTranslation } from 'react-i18next';
import { motion } from 'framer-motion';
import { useAppDispatch, useAppSelector } from '../../redux/store';
import { categoryActions } from '../../redux/slices/category-slice';
import styles from './categories.module.css';
import { CloseButton } from '../../ui/buttons/close-button/close-button';
import { categorySelector, todosSelector } from '../../redux/selectors';
import { todosActions } from '../../redux/slices/fetch-todos-slice';
import { titleAnimation } from '../../animations/animations';

export const Categories: FC = () => {
  const { t } = useTranslation();
  const { isMobileModalOpen } = useAppSelector(categorySelector);
  const dispatch = useAppDispatch();
  const { categoryList } = useAppSelector(todosSelector);
  const sortTodos = (category: string) => {
    dispatch(todosActions.sortTodos(category));
    dispatch(categoryActions.mobileToggler(false));
  };
  return categoryList.length > 0 ? (
    <motion.aside
      initial='hidden'
      whileInView='visible'
      variants={titleAnimation}
      className={isMobileModalOpen ? styles.mobileVersion : ''}
      data-testid='test'
    >
      <div className={styles.categoryHeader}>
        <div className={styles.buttonWrapper}>
          <CloseButton click={() => dispatch(categoryActions.mobileToggler(false))} />
        </div>
        <h3>{t('categories')}</h3>
      </div>
      <ul className={styles.categoryList}>
        <li>
          <button type='button' onClick={() => sortTodos('all')}>
            all
          </button>
        </li>
        {categoryList.map((category) => (
          <li key={category + Date.now()}>
            <button type='button' onClick={() => sortTodos(category)}>
              {category}
            </button>
          </li>
        ))}
      </ul>
    </motion.aside>
  ) : (
    <></>
  );
};
