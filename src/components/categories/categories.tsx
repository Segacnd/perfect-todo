import { FC } from 'react';
import { useTranslation } from 'react-i18next';
import { AddButton } from '../../ui/buttons/add-button/add-button';
import { useAppDispatch } from '../../redux/store';
import { categoryActions } from '../../redux/slices/category-slice';

export const Categories: FC = () => {
  const { t } = useTranslation();
  const dispatch = useAppDispatch();
  const openCategory = () => {
    dispatch(categoryActions.modalToggler(true));
  };
  return (
    <aside>
      <div className='category-header'>
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
