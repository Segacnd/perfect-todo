import { userSelector } from '../redux/selectors';
import { useAppSelector } from '../redux/store';

export const useAuth = () => {
  const { email, id, token, login } = useAppSelector(userSelector);

  return {
    isAuth: !!email,
    email,
    token,
    id,
    login,
  };
};
