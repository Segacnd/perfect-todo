import { FC } from 'react';
import accountIconBlack from '../../assets/acount-icon-black.svg';
import accountIconWhite from '../../assets/account-icon-white.svg';
import { useAppSelector } from '../../redux/store';
import { viewControllerSelector } from '../../redux/selectors';

export const Header: FC = () => {
  const { colorTheme } = useAppSelector(viewControllerSelector);
  return (
    <header>
      <p>John Doe!</p>
      <button type='button'>
        <img src={colorTheme === 'dark' ? accountIconWhite : accountIconBlack} alt='user avatar' />
      </button>
    </header>
  );
};
