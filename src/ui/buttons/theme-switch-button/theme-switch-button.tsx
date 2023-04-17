import { FC } from 'react';
import styles from './theme-switch-button.module.css';
import moonIcon from '../../../assets/moon-icon.svg';
import sunIcon from '../../../assets/sun-icon.svg';
import { viewControllerSelector } from '../../../redux/selectors';
import { useAppDispatch, useAppSelector } from '../../../redux/store';
import { viewControllerActions } from '../../../redux/slices/view-controller-slice';

export const ThemeSwitchButton: FC = () => {
  const { colorTheme } = useAppSelector(viewControllerSelector);
  const dispatch = useAppDispatch();
  const switchTheme = (): void => {
    const newTheme = colorTheme === 'light' ? 'dark' : 'light';
    dispatch(viewControllerActions.themeToggler(newTheme));
  };
  return (
    <>
      <button type='button' className={styles.themeSwitcherButton} onClick={switchTheme}>
        <img src={colorTheme === 'light' ? moonIcon : sunIcon} alt='theme icon' />
      </button>
    </>
  );
};
