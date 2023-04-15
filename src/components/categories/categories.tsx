import { FC } from 'react';
import { useTranslation } from 'react-i18next';
import { AddButton } from '../../ui/buttons/add-button/add-button';

export const Categories: FC = () => {
  const { t } = useTranslation();

  return (
    <aside>
      <div className='category-header'>
        <h3>{t('categories')}</h3>
        <AddButton tooltipText='add new category' text='+' click={() => {}} />
      </div>
      <ul>
        <li>home</li>
        <li>work</li>
      </ul>
    </aside>
  );
};
