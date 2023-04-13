import { FC } from 'react';
import styles from './switch-button.module.css';

type SwitchButtonProps = {
  checked: boolean;
  change: React.Dispatch<React.SetStateAction<boolean>>;
};

export const SwitchButton: FC<SwitchButtonProps> = ({ checked, change }) => {
  return (
    <label htmlFor='inputChecker' className={styles.switch}>
      <input id='inputChecker' type='checkbox' onClick={() => change(!checked)} defaultChecked={checked} />
      <span className={`${styles.slider} ${styles.round}`} />
    </label>
  );
};
