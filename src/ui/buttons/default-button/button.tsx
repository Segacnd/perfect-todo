import { FC } from 'react';
import styles from './button.module.css';

export type ButtonTypes = 'submit' | 'button';

type ButtonProps = {
  text: string;
  buttonType: ButtonTypes;
  disabled?: boolean;
  buttonClick: () => void;
};

export const Button: FC<ButtonProps> = ({ text, buttonType = 'button', disabled, buttonClick }) => {
  return (
    <button
      disabled={disabled}
      className={styles.button}
      type={buttonType === 'submit' ? 'submit' : 'button'}
      onClick={buttonClick}
      data-testid='button'
    >
      {text}
    </button>
  );
};
