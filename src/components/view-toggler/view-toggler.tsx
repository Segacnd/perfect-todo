import { FC } from 'react';
import styles from './view-toggler.module.css';
import { SwitchButton } from '../../ui/buttons/switch-button/switch-button';

type ViewTogglerProps = {
  isChecked: boolean;
  setIsChecked: React.Dispatch<React.SetStateAction<boolean>>;
};

export const ViewToggler: FC<ViewTogglerProps> = ({ isChecked, setIsChecked }: ViewTogglerProps) => {
  return (
    <div className={styles.viewBar}>
      <p>{isChecked ? 'In progress' : 'Completed'}</p>
      <SwitchButton checked={isChecked} change={setIsChecked} />
    </div>
  );
};
