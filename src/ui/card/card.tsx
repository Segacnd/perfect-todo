import { FC } from 'react';
import styles from './card.module.css';
import pinSvg from '../../assets/pin.svg';
import closeNoteSvg from '../../assets/close-note.svg';

export const Card: FC = () => {
  return (
    <div className={styles.note}>
      <p className={styles.noteText}>
        Lorem ipsum dolor, sit amet consectetur adipisicing elit. Excepturi aspernatur reprehenderit, cum
      </p>
      <img src={pinSvg} alt='pin' className={styles.pin} />
      <div className={styles.closeNote}>
        <img src={closeNoteSvg} alt='closeNoteSvg' />
      </div>
    </div>
  );
};
