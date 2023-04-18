import { FC } from 'react';
import { Outlet } from 'react-router-dom';
import styles from './form-layout.module.css';

export const FormLayout: FC = () => {
  return (
    <div className={styles.layout}>
      <div className={styles.content}>
        <Outlet />
      </div>
    </div>
  );
};
