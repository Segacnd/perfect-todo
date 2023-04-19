import { FC } from 'react';
import styles from './card-button.module.css';

type ButtonProps = {
  text?: string;
  type: 'redirect' | 'delete' | 'complete';
};
export const CardButton: FC<ButtonProps> = ({ text, type }) => {
  return <div className={`${styles[type]} ${styles.button}`}>{text}</div>;
};
