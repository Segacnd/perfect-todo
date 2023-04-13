import { FC } from 'react';
import styles from './tooltip.module.css';

type TooltipProps = {
  text: string;
};

export const Tooltip: FC<TooltipProps> = ({ text }) => {
  return <p className={styles.tooltip}>{text}</p>;
};
