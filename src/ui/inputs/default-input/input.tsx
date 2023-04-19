import { FC, useId } from 'react';
import styles from './input.module.css';

export interface IInputProps {
  name?: string;
  placeholder: string;
  labelText: string | undefined;
  isLabelOpen: boolean;
  value: string | undefined;
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
  const inputId = useId();

  return (
    <div className={styles.inputWrapper}>
      <input
        name={name}
        type='text'
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
