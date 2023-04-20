import { FC } from 'react';
import errorIcon from '../../assets/warning-circle-icon.svg';
// import successIcon from '../../assets/success-icon.svg';
import closeIcon from '../../assets/close-action-active-icon.svg';
import styles from './alert.module.css';

interface IAlert {
  className: string;
  alertText: string;
}
export const Alert: FC<IAlert> = ({ alertText, className }) => {
  return (
    <div className={`${styles[className]} `}>
      <div className={styles.icon}>
        <img src={errorIcon} alt='icon' />
      </div>
      <p className={styles.title}>{alertText}</p>
      <button type='button'>
        <img src={closeIcon} alt='close' />
      </button>
    </div>
  );
};
