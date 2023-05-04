import { FC } from 'react';
import styles from './switch-button.module.css';
import { TodoPreviewType } from '../../../redux/slices/view-controller-slice';

type SwitchButtonProps = {
  change: (e: React.BaseSyntheticEvent) => void;
};

export const SwitchButton: FC<SwitchButtonProps> = ({ change }) => {
  return (
    <label htmlFor='inputChecker' className={styles.switch}>
      <input id='inputChecker' type='checkbox' onClick={change} defaultChecked />
      <span className={`${styles.slider} ${styles.round}`} />
    </label>
  );
};
