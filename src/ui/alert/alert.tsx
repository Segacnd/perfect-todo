import { FC, useEffect } from 'react';
import classNames from 'classnames';
import errorIcon from '../../assets/warning-circle-icon.svg';
import closeIcon from '../../assets/close-action-active-icon.svg';
import successIcon from '../../assets/success-icon.svg';
import styles from './alert.module.css';
import { alertActions } from '../../redux/slices/alert-slice';
import { useAppDispatch, useAppSelector } from '../../redux/store';
import { alertSelector } from '../../redux/selectors';

interface IAlert {
  type: 'error' | 'success';
  alertText: string;
}
export const Alert: FC<IAlert> = ({ alertText, type }) => {
  const dispatch = useAppDispatch();
  const { isAlertOpen } = useAppSelector(alertSelector);

  useEffect(() => {
    const timer = setTimeout(() => {
      dispatch(alertActions.setAlertStatus(false));
    }, 4000);

    return () => clearTimeout(timer);
  }, [dispatch, isAlertOpen]);

  if (!isAlertOpen) {
    return null;
  }
  return (
    <div className={classNames([styles.alert, styles[type]])}>
      <div className={styles.icon}>
        <img src={type === 'success' ? successIcon : errorIcon} alt='icon' />
      </div>
      <p className={styles.title}>{alertText}</p>
      <button type='button' onClick={() => dispatch(alertActions.setAlertStatus(false))}>
        <img src={closeIcon} alt='close' />
      </button>
    </div>
  );
};
