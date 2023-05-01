import { FC } from 'react';
import { useTranslation } from 'react-i18next';
import { useAppDispatch, useAppSelector } from '../../redux/store';
import { categoryActions } from '../../redux/slices/category-slice';
import styles from './categories.module.css';
import { CloseButton } from '../../ui/buttons/close-button/close-button';
import { categorySelector, todosSelector } from '../../redux/selectors';
import { todosActions } from '../../redux/slices/fetch-todos-slice';

export const Categories: FC = () => {
  const { t } = useTranslation();
  const { isMobileModalOpen } = useAppSelector(categorySelector);
  const dispatch = useAppDispatch();
  const { categoryList } = useAppSelector(todosSelector);
  const sortTodos = (category: string) => {
    dispatch(todosActions.sortTodos(category));
  };
  return categoryList.length > 0 ? (
    <aside className={isMobileModalOpen ? styles.mobileVersion : ''}>
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
    </aside>
  ) : (
    <></>
  );
};
