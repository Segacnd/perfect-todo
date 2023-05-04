import { FC } from 'react';
import classNames from 'classnames';
import styles from './button.module.css';

export type ButtonTypes = 'submit' | 'button';

type ButtonStyles = 'primary' | 'secondary' | 'distractive';
type ButtonSize = 'big' | 'medium' | 'small' | 'standart';
type IconSide = 'left' | 'right';

type CustomStyle = {
  [key: string]: string;
};

type ButtonProps = {
  text: string;
  buttonType: ButtonTypes;
  disabled?: boolean;
  buttonClick?: () => void;
  styleType: ButtonStyles;
  icon?: string;
  iconSide?: IconSide;
  customStyle?: CustomStyle;
  size: ButtonSize;
};

export const Button: FC<ButtonProps> = ({
  text,
  buttonType = 'button',
  disabled,
  buttonClick,
  styleType,
  icon,
  iconSide,
  customStyle,
  size,
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
      {icon && iconSide === 'left' && <img src={icon} alt='icon' />}
      {text}
      {icon && iconSide === 'right' && <img src={icon} alt='icon' />}
    </button>
  );
};
