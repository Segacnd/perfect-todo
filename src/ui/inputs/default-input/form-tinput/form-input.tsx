import { ChangeEvent, DetailedHTMLProps, FC, InputHTMLAttributes } from 'react';
import classNames from 'classnames';
import { IInputProps } from '../input';
import styles from './form-input.module.css';

interface IFormInputProps extends Omit<IInputProps, 'change' | 'labelText' | 'setIsLabelOpen' | 'isLabelOpen'> {
  onChange: (e: ChangeEvent) => void;
  onBlur?: (e: DetailedHTMLProps<InputHTMLAttributes<HTMLInputElement>, HTMLInputElement>) => void;
  errortext?: string;
  type?: string;
  disabled?: boolean;
}

export const FormInput: FC<IFormInputProps> = ({
  placeholder,
  onChange,
  value,
  name,
  errortext,
  onBlur,
  type = 'string',
  disabled,
}) => {
  return (
    <div className={classNames(styles.inputWrapper, { [styles.error]: errortext, disabled })}>
      <input
        onBlur={onBlur}
        id={name}
        type={type}
        placeholder={placeholder}
        onChange={onChange}
        value={value}
        name={name}
        disabled={disabled}
      />
      <label htmlFor={name}>{errortext}</label>
    </div>
  );
};
