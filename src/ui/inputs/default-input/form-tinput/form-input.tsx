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
  inputMode?: 'none' | 'search' | 'text' | 'tel' | 'url' | 'email' | 'numeric' | 'decimal';
}

export const FormInput: FC<IFormInputProps> = (props) => {
  const { name, accept, dti, errorText, supportText, disabled, labelText } = props;
  return (
    <div className={classNames(styles.inputWrapper, { [styles.error]: errorText, disabled })}>
      {/* eslint-disable-next-line */}
      <input {...props} id={name} accept={accept} data-testid={dti} />
      <dialog>hello</dialog>

      <label htmlFor={name} className={errorText ? styles.error : ''}>
        {errorText || supportText}
      </label>
      <label htmlFor='file'>{labelText}</label>
    </div>
  );
};
