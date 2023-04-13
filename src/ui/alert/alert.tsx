import { FC } from 'react';
import errorIcon from '../../assets/warning-circle-icon.svg';
// import successIcon from '../../assets/success-icon.svg';
import closeIcon from '../../assets/close-action-active-icon.svg';
import styles from './alert.module.css';

export const Alert: FC = () => {
  return (
    <div className={`${styles.alertWrapper} ${styles.succesWrapper}`}>
      <div className={styles.icon}>
        <img src={errorIcon} alt='icon' />
      </div>
      <p className={styles.title}>Error</p>
      <button type='button'>
        <img src={closeIcon} alt='close' />
      </button>
    </div>
  );
};
