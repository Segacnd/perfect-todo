import { FC } from 'react';
import accountIconBlack from '../../assets/acount-icon-black.svg';
import accountIconWhite from '../../assets/account-icon-white.svg';
import { useAppSelector } from '../../redux/store';
import { viewControllerSelector } from '../../redux/selectors';
import { ChangeLanguageComponent } from '../change-language-component/change-language-component';
import { ThemeSwitchButton } from '../../ui/buttons/theme-switch-button/theme-switch-button';
import styles from './header.module.css';

export const Header: FC = () => {
  const { colorTheme } = useAppSelector(viewControllerSelector);
  return (
    <header>
      <div className={styles.leftSide}>
        <ChangeLanguageComponent />
        <ThemeSwitchButton />
      </div>
      <div className={styles.rightSide}>
        <p>John Doe!</p>
        <button type='button'>
          <img src={colorTheme === 'dark' ? accountIconWhite : accountIconBlack} alt='user avatar' />
        </button>
      </div>
    </header>
  );
};
