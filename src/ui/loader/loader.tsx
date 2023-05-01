import styles from './loader.module.css';
import loader from '../../assets/loader.svg';

export const Loader: React.FC = () => {
  return (
    <div className={styles.loader} data-test-id='loader'>
      <img src={loader} alt='loader' className={styles.imageLoader} />
    </div>
  );
};
