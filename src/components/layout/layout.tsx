import { FC } from 'react';
import { Outlet } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { Header } from '../header/Header';
import { useAppSelector } from '../../redux/store';
import { viewControllerSelector } from '../../redux/selectors';
import { ChangeLanguageComponent } from '../change-language-component/change-language-component';
import { ThemeSwitchButton } from '../../ui/buttons/theme-switch-button/theme-switch-button';
import styles from './layout.module.css';

export const Layout: FC = () => {
  const { t } = useTranslation();
  const { colorTheme } = useAppSelector(viewControllerSelector);

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
