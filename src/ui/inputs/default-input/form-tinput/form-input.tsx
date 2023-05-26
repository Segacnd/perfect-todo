import { ChangeEvent, DetailedHTMLProps, FC, InputHTMLAttributes } from 'react';
import classNames from 'classnames';
import { IInputProps } from '../input';
import styles from './form-input.module.css';

interface IFormInputProps extends Omit<IInputProps, 'change' | 'labelText' | 'setIsLabelOpen' | 'isLabelOpen'> {
  onChange: (e: ChangeEvent) => void;
  onBlur?: (e: DetailedHTMLProps<InputHTMLAttributes<HTMLInputElement>, HTMLInputElement>) => void;
  errorText?: string;
  supportText?: string;
  type?: string;
  disabled?: boolean;
  labelText?: string;
  accept?: string;
  dti?: string;
}

export const FormInput: FC<IFormInputProps> = ({
  placeholder,
  onChange,
  value,
  name,
  errorText,
  onBlur,
  type,
  disabled,
  labelText,
  accept,
  dti,
  supportText,
}) => {
  return (
    <div className={classNames(styles.inputWrapper, { [styles.error]: errorText, disabled })}>
      <input
        onBlur={onBlur}
        id={name}
        type={type}
        placeholder={placeholder}
        onChange={onChange}
        value={value}
        name={name}
        disabled={disabled}
        accept={accept}
        data-testid={dti}
      />
      <dialog>hello</dialog>

      <label htmlFor={name} className={errorText ? styles.error : ''}>
        {errorText || supportText}
      </label>
      <label htmlFor='file'>{labelText}</label>
    </div>
  );
};
