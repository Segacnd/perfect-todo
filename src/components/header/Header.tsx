import { FC, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
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
  const { t } = useTranslation();
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);
  const dispatch = useAppDispatch();
  const { colorTheme } = useAppSelector(viewControllerSelector);
  const { login, photoUrl } = useAppSelector(userSelector);
  const navigate = useNavigate();
  const profileButtonHandler = () => {
    setIsModalOpen(false);
    navigate('/profile');
  };
  return (
    <header>
      <div className={styles.leftSide}>
        <ChangeLanguageComponent />
        <ThemeSwitchButton />
      </div>
      <Link to='/' className={styles.appTitle}>
        {t('app_title')}
      </Link>
      <div className={styles.rightSide}>
        <button type='button' onClick={() => setIsModalOpen((prev) => !prev)}>
          <p>{login}</p>
          {photoUrl ? (
            <img src={photoUrl} className={styles.userAvatar} alt='user avatar' />
          ) : (
            <img src={colorTheme === 'dark' ? accountIconWhite : accountIconBlack} alt='user avatar' />
          )}
        </button>
        {isModalOpen && (
          <div className={styles.accountModal}>
            <Button
              buttonType='button'
              styleType='secondary'
              size='medium'
              text='Profile'
              buttonClick={profileButtonHandler}
              customStyle={{ backgroundColor: '#f6f6f6' }}
            />
            <Button
              size='medium'
              buttonType='button'
              styleType='distractive'
              customStyle={{ backgroundColor: '#f6f6f6' }}
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
