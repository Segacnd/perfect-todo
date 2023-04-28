import { FC, useState } from 'react';
import accountIconBlack from '../../assets/acount-icon-black.svg';
import accountIconWhite from '../../assets/account-icon-white.svg';
import { useAppDispatch, useAppSelector } from '../../redux/store';
import { userSelector, viewControllerSelector } from '../../redux/selectors';
import { ChangeLanguageComponent } from '../change-language-component/change-language-component';
import { ThemeSwitchButton } from '../../ui/buttons/theme-switch-button/theme-switch-button';
import styles from './header.module.css';
import { Button } from '../../ui/buttons/default-button/button';
import { userActions } from '../../redux/slices/user-slice';

export const Header: FC = () => {
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);
  const dispatch = useAppDispatch();
  const { colorTheme } = useAppSelector(viewControllerSelector);
  const { login } = useAppSelector(userSelector);
  return (
    <header>
      <div className={styles.leftSide}>
        <ChangeLanguageComponent />
        <ThemeSwitchButton />
      </div>
      <div className={styles.rightSide}>
        <p>{login}</p>
        <button type='button' onClick={() => setIsModalOpen((prev) => !prev)}>
          <img src={colorTheme === 'dark' ? accountIconWhite : accountIconBlack} alt='user avatar' />
        </button>
        {isModalOpen && (
          <div className={styles.accountModal}>
            <p>account</p>
            <Button
              buttonType='button'
              buttonClick={() => {
                dispatch(userActions.removeUser());
              }}
              text='end session'
            />
          </div>
        )}
      </div>
    </header>
  );
};
