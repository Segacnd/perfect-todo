import { FC } from 'react';
import styles from './switch-button.module.css';
import { useAppSelector } from '../../../redux/store';
import { viewControllerSelector } from '../../../redux/selectors';

type SwitchButtonProps = {
  change: (e: React.BaseSyntheticEvent) => void;
};

export const SwitchButton: FC<SwitchButtonProps> = ({ change }) => {
  const { todoPreviewType } = useAppSelector(viewControllerSelector);
  return (
    <label htmlFor='inputChecker' className={styles.switch}>
      <input id='inputChecker' type='checkbox' onClick={change} checked={todoPreviewType === 'inProgress'} />
      <span className={`${styles.slider} ${styles.round}`} />
    </label>
  );
};
