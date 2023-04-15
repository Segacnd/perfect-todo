import { FC } from 'react';
import { useTranslation } from 'react-i18next';
import styles from './view-toggler.module.css';
import { SwitchButton } from '../../ui/buttons/switch-button/switch-button';

type ViewTogglerProps = {
  isChecked: boolean;
  setIsChecked: React.Dispatch<React.SetStateAction<boolean>>;
};

export const ViewToggler: FC<ViewTogglerProps> = ({ isChecked, setIsChecked }: ViewTogglerProps) => {
  const { t } = useTranslation();

  return (
    <div className={styles.viewBar}>
      <p>{isChecked ? `${t('todo_view_in_progress')}` : `${t('todo_view_completed')}`}</p>
      <SwitchButton checked={isChecked} change={setIsChecked} />
    </div>
  );
};
