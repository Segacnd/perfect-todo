import { FC } from 'react';
import errorIcon from '../../assets/warning-circle-icon.svg';
import closeIcon from '../../assets/close-action-active-icon.svg';
import successIcon from '../../assets/success-icon.svg';
import styles from './alert.module.css';
import { alertActions } from '../../redux/slices/alert-slice';
import { useAppDispatch } from '../../redux/store';

interface IAlert {
  className: string;
  alertText: string;
  flag: string;
}
export const Alert: FC<IAlert> = ({ alertText, className, flag }) => {
  const dispatch = useAppDispatch();
  return (
    <div className={`${styles[className]} ${styles.alert} `}>
      <div className={styles.icon}>
        <img src={flag === 'success' ? successIcon : errorIcon} alt='icon' />
      </div>
      <p className={styles.title}>{alertText}</p>
      <button type='button' onClick={() => dispatch(alertActions.setAlertStatus(false))}>
        <img src={closeIcon} alt='close' />
      </button>
    </div>
  );
};
