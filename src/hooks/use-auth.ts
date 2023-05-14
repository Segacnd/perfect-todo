import { userSelector } from '../redux/selectors';
import { useAppSelector } from '../redux/store';

export const useAuth = () => {
  const { email, id, login, photoUrl } = useAppSelector(userSelector);

  return {
    isAuth: !!email,
    email,
    id,
    login,
    photoUrl,
  };
};
