import { FC, useId } from 'react';
import styles from './input.module.css';

type InputProps = {
  placeholder: string;
  labelText: string | undefined;
  value: string | undefined;
  change: (value: string) => void;
};

export const Input: FC<InputProps> = ({ placeholder, labelText, change, value }) => {
  const inputId = useId();

  return (
    <div className={styles.inputWrapper}>
      <input
        type='text'
        id={inputId}
        value={value}
        placeholder={placeholder}
        className={styles.input}
        onChange={(e: React.ChangeEvent<HTMLInputElement>) => change(e.target.value)}
      />
      {labelText && (
        <label className={styles.label} htmlFor={inputId}>
          {labelText}
        </label>
      )}
    </div>
  );
};
