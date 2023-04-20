import { FC, useId } from 'react';
import styles from './input.module.css';
import { Alert } from '../../alert/alert';

export interface IInputProps {
  name?: string;
  placeholder: string;
  labelText: string | undefined;
  isLabelOpen: boolean;
  value: string;
  change: (value: string) => void;
  setIsLabelOpen: React.Dispatch<React.SetStateAction<boolean>>;
  addNewNote: (note: string, e: React.FormEvent<HTMLFormElement>) => void;
}

export const Input: FC<IInputProps> = ({
  placeholder,
  labelText,
  change,
  value,
  setIsLabelOpen,
  isLabelOpen,
  name,
  addNewNote,
}) => {
  const inputId = useId();

  return (
    <div className={styles.inputWrapper}>
      <form onSubmit={(e) => addNewNote(value, e)} className={styles.notesForm}>
        <input
          name={name}
          id={inputId}
          value={value}
          placeholder={placeholder}
          className={styles.input}
          onChange={(e) => change(e.target.value)}
          onFocus={() => setIsLabelOpen(true)}
          onBlur={() => setIsLabelOpen(false)}
          maxLength={100}
        />
        {value.length >= 100 && <p className={styles.inputAlert}>текст не должен содержать более 100 символов</p>}
        {labelText && isLabelOpen && value.length < 100 && (
          <label className={styles.label} htmlFor={inputId}>
            {labelText}
          </label>
        )}
      </form>
    </div>
  );
};
