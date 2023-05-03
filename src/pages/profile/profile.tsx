import { FC, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useAppDispatch, useAppSelector } from '../../redux/store';
import { todosSelector, userSelector, viewControllerSelector } from '../../redux/selectors';
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
import edit from '../../assets/edit-profile-icon.svg';

export type ObjecType = {
  [key: string]: number;
};

export const Profile: FC = () => {
  const { id, login, photoUrl } = useAppSelector(userSelector);
  const { todos } = useAppSelector(todosSelector);
  const { colorTheme } = useAppSelector(viewControllerSelector);
  const dispatch = useAppDispatch();
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

  useEffect(() => {
    if (id) {
      dispatch(fetchTodos(id));
    }
  }, [dispatch, id]);

  return (
    <div className={styles.root} data-theme={colorTheme}>
      <div className={styles.widthContainer}>
        <div className={styles.headerContentWrapper}>
          <div className={styles.profileData}>
            <div className={styles.rightSide}>
              <img src={photoUrl ? photoUrl : userMockImgBlack} alt='' />
              <p className={styles.userNameWrapper}>
                {login} hello
                <button className={styles.editProfile} type='button'>
                  <img src={edit} alt='edit' />
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
                  <img src={arrow} alt='back' />
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
    </div>
  );
};
