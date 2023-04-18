import { FC } from 'react';
import { useTranslation } from 'react-i18next';
import { AddButton } from '../../ui/buttons/add-button/add-button';
import { useAppDispatch, useAppSelector } from '../../redux/store';
import { categoryActions } from '../../redux/slices/category-slice';
import styles from './categories.module.css';
import { CloseButton } from '../../ui/buttons/close-button/close-button';
import { categorySelector } from '../../redux/selectors';

export const Categories: FC = () => {
  const { t } = useTranslation();
  const { isMobileModalOpen } = useAppSelector(categorySelector);
  const dispatch = useAppDispatch();
  const openCategory = () => {
    dispatch(categoryActions.modalToggler(true));
  };
  return (
    <aside className={isMobileModalOpen ? styles.mobileVersion : ''}>
      <div className={styles.categoryHeader}>
        <div className={styles.buttonWrapper}>
          <CloseButton click={() => dispatch(categoryActions.mobileToggler(false))} />
        </div>
        <h3>{t('categories')}</h3>
        <AddButton tooltipText='add new category' text='+' click={openCategory} />
      </div>
      <ul>
        <li>home</li>
        <li>work</li>
      </ul>
    </aside>
  );
};
