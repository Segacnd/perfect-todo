import { FC, useEffect } from 'react';
import { Outlet, useNavigate } from 'react-router-dom';
import styles from './form-layout.module.css';
import { ChangeLanguageComponent } from '../change-language-component/change-language-component';
import { useAuth } from '../../hooks/use-auth';

export const FormLayout: FC = () => {
  const navigate = useNavigate();
  const { isAuth } = useAuth();
  useEffect(() => {
    if (isAuth) {
      navigate('/');
    }
  }, [isAuth, navigate]);
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
