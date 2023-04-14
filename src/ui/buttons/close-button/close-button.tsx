import { FC } from 'react';
import closeIcon from '../../../assets/close-black-icon.svg';
import styles from './close-button.module.css';

export const CloseButton: FC = () => {
  return (
    <button type='button' className={styles.closeButton}>
      <img src={closeIcon} alt='close button' />
    </button>
  );
};
