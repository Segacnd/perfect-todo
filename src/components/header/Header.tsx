import { FC } from 'react';
import { useTranslation } from 'react-i18next';
import accountIconBlack from '../../assets/acount-icon-black.svg';
import accountIconWhite from '../../assets/account-icon-white.svg';
import { useAppSelector } from '../../redux/store';
import { viewControllerSelector } from '../../redux/selectors';

export const Header: FC = () => {
  const { t } = useTranslation();
  const { colorTheme } = useAppSelector(viewControllerSelector);
  return (
    <header>
      <p>{t('greetings_account_preview')}, John Doe!</p>
      <button type='button'>
        <img src={colorTheme === 'dark' ? accountIconWhite : accountIconBlack} alt='user avatar' />
      </button>
    </header>
  );
};
