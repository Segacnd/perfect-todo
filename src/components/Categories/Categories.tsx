import { FC } from 'react';
import { AddButton } from '../../ui/buttons/add-button/add-button';

export const Categories: FC = () => {
  return (
    <aside>
      <div className='category-header'>
        <h3>Categories</h3>
        <AddButton tooltipText='add new category' text='+' click={() => {}} />
      </div>
      <ul>
        <li>home</li>
        <li>work</li>
      </ul>
    </aside>
  );
};
