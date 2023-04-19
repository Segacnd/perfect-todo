import { FC } from 'react';
import { Outlet } from 'react-router-dom';
import styles from './form-layout.module.css';
import { ChangeLanguageComponent } from '../change-language-component/change-language-component';

export const FormLayout: FC = () => {
  return (
    <div className={styles.layout}>
      <div className={styles.content}>
        <Outlet />
        <div className={styles.buttonWrapper}>
          <ChangeLanguageComponent />
        </div>
      </div>
    </div>
  );
};
