import Lottie from 'lottie-react';
import styles from './loader.module.css';
import loadingAnimation from './loader-animation.json';
import { isLoadingStatus } from '../../redux/selectors';
import { useAppSelector } from '../../redux/store';

export const Loader: React.FC = () => {
  const isLayoutLoading = useAppSelector(isLoadingStatus);
  return (
    <div className={isLayoutLoading ? styles.loader : styles.hide} data-test-id='loader'>
      <div className={styles.container} data-test-id='loader'>
        <Lottie animationData={loadingAnimation} loop />
      </div>
    </div>
  );
};
