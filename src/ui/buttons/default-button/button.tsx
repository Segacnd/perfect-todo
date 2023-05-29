import { FC, ReactNode } from 'react';
import classNames from 'classnames';
import styles from './button.module.css';

export type ButtonTypes = 'submit' | 'button';

type ButtonStyles = 'primary' | 'secondary' | 'distractive';
type ButtonSize = 'big' | 'medium' | 'small' | 'standart';

type CustomStyle = {
  [key: string]: string;
};

type ButtonProps = {
  buttonType: ButtonTypes;
  disabled?: boolean;
  buttonClick?: () => void;
  styleType: ButtonStyles;
  customStyle?: CustomStyle;
  size: ButtonSize;
  children: ReactNode;
};

export const Button: FC<ButtonProps> = ({
  buttonType = 'button',
  disabled,
  buttonClick,
  styleType,
  customStyle,
  size,
  children,
}) => {
  return (
    <button
      disabled={disabled}
      className={classNames([styles.button, styles[styleType], styles[size]], {})}
      type={buttonType === 'submit' ? 'submit' : 'button'}
      onClick={buttonClick}
      data-testid='button'
      style={customStyle}
    >
      {children}
    </button>
  );
};
