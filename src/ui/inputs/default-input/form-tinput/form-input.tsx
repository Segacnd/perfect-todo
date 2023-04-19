import { ChangeEvent, DetailedHTMLProps, FC, InputHTMLAttributes } from 'react';
import classNames from 'classnames';
import { IInputProps } from '../input';
import styles from './form-input.module.css';

interface IFormInputProps extends Omit<IInputProps, 'change' | 'labelText' | 'setIsLabelOpen' | 'isLabelOpen'> {
  onChange: (e: ChangeEvent) => void;
  onBlur?: (e: DetailedHTMLProps<InputHTMLAttributes<HTMLInputElement>, HTMLInputElement>) => void;
  errortext?: string;
}

export const FormInput: FC<IFormInputProps> = ({ placeholder, onChange, value, name, errortext, onBlur }) => {
  return (
    <div className={classNames(styles.inputWrapper, { [styles.error]: errortext })}>
      <input
        onBlur={onBlur}
        id={name}
        type='text'
        placeholder={placeholder}
        onChange={onChange}
        value={value}
        name={name}
      />
      <label htmlFor={name}>{errortext}</label>
    </div>
  );
};
