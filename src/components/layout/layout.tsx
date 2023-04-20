import { FC, useEffect } from 'react';
import { Outlet, useNavigate } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { Header } from '../header/Header';
import { useAppSelector } from '../../redux/store';
import { viewControllerSelector } from '../../redux/selectors';
import styles from './layout.module.css';
import { useAuth } from '../../hooks/use-auth';

export const Layout: FC = () => {
  const { t } = useTranslation();
  const { colorTheme } = useAppSelector(viewControllerSelector);
  const navigate = useNavigate();
  const { isAuth } = useAuth();
  useEffect(() => {
    if (!isAuth) {
      navigate('/auth');
    }
  }, [isAuth, navigate]);

  return (
    <div className={styles.app} data-theme={colorTheme}>
      <h1 className={styles.appTitle}>{t('app_title')}</h1>
      <div className={styles.container}>
        <Header />
        <main>
          <Outlet />
        </main>
      </div>
      <footer>{t('app_author')}</footer>
    </div>
  );
};
