import { FC } from 'react';
import { useNavigate } from 'react-router-dom';
import styles from './button.module.css';
import { useAppDispatch } from '../../../redux/store';
import { deleteTodo } from '../../../redux/slices/fetch-todos-slice';

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
    >
      {text}
    </button>
  );
};
