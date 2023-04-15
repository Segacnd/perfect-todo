import { FC } from 'react';
import { Outlet } from 'react-router-dom';
import useLocalStorage from 'use-local-storage';
import { useTranslation } from 'react-i18next';
import { Header } from '../header/Header';
import moonIcon from '../../assets/moon-icon.svg';
import sunIcon from '../../assets/sun-icon.svg';
import { useAppDispatch } from '../../redux/store';
import { viewControllerActions } from '../../redux/slices/view-controller-slice';

const langs = {
  en: { nativeName: 'English' },
  ru: { nativeName: 'Russian' },
};

export const Layout: FC = () => {
  const { t, i18n } = useTranslation();
  const dispatch = useAppDispatch();
  const defaultDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
  const [theme, setTheme] = useLocalStorage('theme', defaultDark ? 'dark' : 'light');

  const switchTheme = () => {
    const newTheme = theme === 'light' ? 'dark' : 'light';
    setTheme(newTheme);
    dispatch(viewControllerActions.themeToggler(newTheme));
  };

  return (
    <div className='App' data-theme={theme}>
      <h1 className='app-title'>{t('app_title')}</h1>
      <div className='container'>
        <Header />
        <main>
          <Outlet />
        </main>
        <button type='button' className='themeSwitcherButton' onClick={switchTheme}>
          <img src={theme === 'light' ? moonIcon : sunIcon} alt='theme icon' />
        </button>
        <div className='changeLanguageWrapper'>
          {Object.keys(langs).map((el) => (
            <button
              type='submit'
              key={el}
              onClick={() => i18n.changeLanguage(el)}
              disabled={i18n.resolvedLanguage === el}
            >
              {el}
            </button>
          ))}
        </div>
      </div>
      <footer>{t('app_author')}</footer>
    </div>
  );
};
