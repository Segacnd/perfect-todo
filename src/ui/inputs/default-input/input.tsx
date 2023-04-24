import { FC, useId } from 'react';
import styles from './input.module.css';
import { Alert } from '../../alert/alert';
import { useAppDispatch } from '../../../redux/store';
import { addNewNotee } from '../../../redux/slices/fetch-todo-slice';

export interface IInputProps {
  name?: string;
  placeholder: string;
  labelText: string | undefined;
  isLabelOpen: boolean;
  value: string;
  change: (value: string) => void;
  setIsLabelOpen: React.Dispatch<React.SetStateAction<boolean>>;
}

export const Input: FC<IInputProps> = ({
  placeholder,
  labelText,
  change,
  value,
  setIsLabelOpen,
  isLabelOpen,
  name,
}) => {
  const dispatch = useAppDispatch();
  const inputId = useId();

  return (
    <div className={styles.inputWrapper}>
      <input
        name={name}
        id={inputId}
        value={value}
        placeholder={placeholder}
        className={styles.input}
        onChange={(e) => change(e.target.value)}
        onFocus={() => setIsLabelOpen(true)}
        onBlur={() => setIsLabelOpen(false)}
      />
      {labelText && isLabelOpen && (
        <label className={styles.label} htmlFor={inputId}>
          {labelText}
        </label>
      )}
    </div>
  );
};
