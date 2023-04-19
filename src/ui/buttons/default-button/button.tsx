import { FC } from 'react';
import styles from './button.module.css';

export type ButtonTypes = 'submit' | 'button';

type ButtonProps = {
  text: string;
  buttonType: ButtonTypes;
  buttonClick: () => void;
  disabled?: boolean;
};

export const Button: FC<ButtonProps> = ({ text, buttonType = 'button', buttonClick, disabled }) => {
  return (
    <button
      disabled={disabled}
      className={styles.button}
      type={buttonType === 'submit' ? 'submit' : 'button'}
      onClick={buttonClick}
    >
      {text}
    </button>
  );
};
