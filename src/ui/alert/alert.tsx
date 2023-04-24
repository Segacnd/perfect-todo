import { Dispatch, FC, SetStateAction } from 'react';
import errorIcon from '../../assets/warning-circle-icon.svg';
// import successIcon from '../../assets/success-icon.svg';
import closeIcon from '../../assets/close-action-active-icon.svg';
import styles from './alert.module.css';

interface IAlert {
  className: string;
  alertText: string;
  setShowAlert?: Dispatch<SetStateAction<boolean>>;
}
export const Alert: FC<IAlert> = ({ alertText, className, setShowAlert }) => {
  return (
    <div className={`${styles[className]} `}>
      <div className={styles.icon}>
        <img src={errorIcon} alt='icon' />
      </div>
      <p className={styles.title}>{alertText}</p>
      <button type='button' onClick={() => setShowAlert!(false)}>
        <img src={closeIcon} alt='close' />
      </button>
    </div>
  );
};
