import { ChangeEvent, DetailedHTMLProps, FC, InputHTMLAttributes, useState } from 'react';
import classNames from 'classnames';
import { IInputProps } from '../input';
import styles from './form-input.module.css';
import open from '../../../../assets/eye-open.svg';
import close from '../../../../assets/eye-close.svg';

interface IFormInputProps extends Omit<IInputProps, 'change' | 'labelText' | 'setIsLabelOpen' | 'isLabelOpen'> {
  onChange: (e: ChangeEvent) => void;
  onBlur?: (e: DetailedHTMLProps<InputHTMLAttributes<HTMLInputElement>, HTMLInputElement>) => void;
  errorText?: string;
  supportText?: string;
  type?: string;
  disabled?: boolean;
  labelText?: string;
  passCheck?: boolean;
  accept?: string;
  dti?: string;
  inputMode?: 'none' | 'search' | 'text' | 'tel' | 'url' | 'email' | 'numeric' | 'decimal';
}

export const FormInput: FC<IFormInputProps> = (props) => {
  const [inputType, setInputType] = useState<'text' | 'password'>('password');
  const { type, name, accept, dti, errorText, supportText, disabled, labelText, passCheck } = props;
  return (
    <div className={classNames(styles.inputWrapper, { [styles.error]: errorText, disabled })}>
      {/* eslint-disable-next-line */}
      <input {...props} id={name} accept={accept} data-testid={dti} type={passCheck ? inputType : type} />
      {passCheck && (
        <button
          className={styles.showHidePasswordButton}
          type='button'
          onClick={() => setInputType((prev) => (prev === 'password' ? 'text' : 'password'))}
        >
          <img src={inputType === 'password' ? close : open} alt='show/hide password' />
        </button>
      )}
      <label htmlFor={name} className={errorText ? styles.error : ''}>
        {errorText || supportText}
      </label>
      <label htmlFor='file'>{labelText}</label>
    </div>
  );
};
