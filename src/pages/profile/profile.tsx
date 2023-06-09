import { FC, useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { useAppDispatch, useAppSelector } from '../../redux/store';
import { editProfileSelector, todosSelector, userSelector, viewControllerSelector } from '../../redux/selectors';
import { fetchTodos } from '../../redux/slices/fetch-todos-slice';
import styles from './profile.module.css';
import { PieGrap } from '../../components/pie-graph/pie-graph';
import { LinearGraph } from '../../components/linear-graph/linear-graph';
import { daycount, today } from '../../constants';
import userMockImgBlack from '../../assets/acount-icon-black.svg';
import { ChangeLanguageComponent } from '../../components/change-language-component/change-language-component';
import { ThemeSwitchButton } from '../../ui/buttons/theme-switch-button/theme-switch-button';
import { ParallaxText } from '../../ui/parallax-text/parallax-text';
import arrow from '../../assets/arrow-icon.svg';
import whiteArrow from '../../assets/arrow-icon-white.svg';
import edit from '../../assets/edit-profile-icon.svg';
import { EditProfileModal } from '../../ui/pop-up/edit-profile-modal/edit-profile-modal';
import { editProfileActions } from '../../redux/slices/edit-profile-slice';
import { Tooltip } from '../../ui/pop-up/tooltip/tooltip';
import { Alert } from '../../ui/alert/alert';
import { Status } from '../../enums/enums';
import { Loader } from '../../ui/loader/loader';
import { userActions } from '../../redux/slices/user-slice';
import { auth } from '../../firebase-config';
import { Button } from '../../ui/buttons/default-button/button';

export type ObjecType = {
  [key: string]: number;
};

export const Profile: FC = () => {
  const { t } = useTranslation();
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);
  const { id, login, photoUrl, editProfileStatus } = useAppSelector(userSelector);
  const { todos } = useAppSelector(todosSelector);
  const { colorTheme } = useAppSelector(viewControllerSelector);
  const { isEditProfileModalOpen } = useAppSelector(editProfileSelector);
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const nonCompleted = todos.filter((el) => el.dateEnded === null);
  const completedTodos = todos.filter((el) => el.dateEnded !== null);

  const monthProgress = [...Array(daycount).keys()].map((x) => {
    const normalizeDays = x + 2;
    const date = new Date(today.getFullYear(), today.getMonth(), normalizeDays).toISOString().slice(0, 10);
    const counting = todos.filter((el) => el.dateStarted.slice(0, 10) === date);
    const ended = todos.filter((el) => el.dateEnded?.slice(0, 10) === date);
    const formattedDay = new Date(date).getDate();
    return { day: formattedDay, during: counting.length, ended: ended.length, title: 'completed' };
  });

  const categoryUsageCounter: ObjecType = {};
  todos.forEach((el) => {
    if (Object.keys(categoryUsageCounter).includes(el.category.toLowerCase())) {
      categoryUsageCounter[el.category.toLowerCase()] += 1;
    } else {
      categoryUsageCounter[el.category.toLowerCase()] = 1;
    }
  });

  const categoryArray = Object.entries(categoryUsageCounter).map((el, index) => {
    return {
      id: index,
      name: el[0],
      count: el[1],
    };
  });

  const [isTooltipOpen, setIsTooltipOpen] = useState<boolean>(false);

  const hideTooltip = (): void => {
    setIsTooltipOpen(false);
  };

  const showTooltip = (): void => {
    setIsTooltipOpen(true);
  };

  useEffect(() => {
    if (id) {
      dispatch(fetchTodos(id));
    }
  }, [dispatch, id]);
  useEffect(() => {
    if (editProfileStatus === Status.LOADING) {
      dispatch(
        userActions.updateUserData({ login: auth.currentUser?.displayName, photoUrl: auth.currentUser?.photoURL })
      );
    }
  }, [dispatch, editProfileStatus]);
  return (
    <div className={styles.root} data-theme={colorTheme}>
      <div className={styles.widthContainer}>
        <div className={styles.headerContentWrapper}>
          <div className={styles.profileData}>
            <div className={styles.rightSide}>
              <button type='button' onClick={() => setIsModalOpen((prev) => !prev)}>
                <img src={photoUrl ? photoUrl : userMockImgBlack} alt='' />
              </button>
              {isModalOpen && (
                <div className={styles.accountModal}>
                  <Button
                    size='medium'
                    buttonType='button'
                    styleType='distractive'
                    customStyle={{ backgroundColor: '#f6f6f6' }}
                    buttonClick={() => {
                      dispatch(userActions.removeUser());
                      navigate('/');
                    }}
                  >
                    {t('end session')}
                  </Button>
                </div>
              )}
              <p className={styles.userNameWrapper}>
                {login}
                <button
                  className={styles.editProfile}
                  type='button'
                  onMouseEnter={showTooltip}
                  onMouseLeave={hideTooltip}
                  onClick={() => dispatch(editProfileActions.editProfileModalTrigger(true))}
                >
                  <img className={styles.userAvatar} src={edit} alt='edit' />
                  {isTooltipOpen && <Tooltip text='edit account' />}
                </button>
              </p>
            </div>
            <div className={styles.leftSide}>
              <div className={styles.buttons}>
                <ChangeLanguageComponent />
                <ThemeSwitchButton />
              </div>
              <div className={styles.backWrapper}>
                <Link to='/' className={styles.goBack}>
                  <img src={colorTheme === 'light' ? arrow : whiteArrow} alt='back' />
                  <span>Go home </span>
                </Link>
              </div>
            </div>
          </div>
        </div>
        <div className={styles.section}>
          <ParallaxText baseVelocity={5}>{`Count of completed todos: ${completedTodos.length}`}</ParallaxText>
          <ParallaxText baseVelocity={-5}>{`Count of todos in progress: ${nonCompleted.length}`}</ParallaxText>
        </div>
        <div className={styles.container}>
          <div className={styles.graphWrapper}>
            <LinearGraph monthProgress={monthProgress} />
          </div>
          <div className={styles.pieWrapper}>
            <PieGrap array={categoryArray} />
          </div>
        </div>
      </div>
      {isEditProfileModalOpen && <EditProfileModal />}
      {editProfileStatus === Status.SUCCESS && <Alert alertText='user is updated' type='success' />}
      <Loader />
    </div>
  );
};
