import { FC } from 'react';
import classNames from 'classnames';
import styles from './card-button.module.css';

type ButtonProps = {
  text: string;
  type: 'redirect' | 'delete' | 'complete';
};
export const CardButton: FC<ButtonProps> = ({ text, type }) => {
  const buttonClassNames = classNames(styles.button, {
    [styles.redirect]: type === 'redirect',
    [styles.delete]: type === 'delete',
    [styles.complete]: type === 'complete',
  });
  return <div className={buttonClassNames}>{text}</div>;
};
