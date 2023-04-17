import { FC } from 'react';
import closeIcon from '../../../assets/close-black-icon.svg';
import styles from './close-button.module.css';

type ButtonProps = {
  click: () => void;
};

export const CloseButton: FC<ButtonProps> = ({ click }) => {
  return (
    <button type='button' onClick={click} className={styles.closeButton}>
      <img src={closeIcon} alt='close button' />
    </button>
  );
};
