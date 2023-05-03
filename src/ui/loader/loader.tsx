import Lottie from 'lottie-react';
import styles from './loader.module.css';
import loadingAnimation from './loader-animation.json';

export const Loader: React.FC = () => {
  return (
    <div className={styles.loader} data-test-id='loader'>
      <div className={styles.container} data-test-id='loader'>
        <Lottie animationData={loadingAnimation} loop />
      </div>
    </div>
  );
};
