import { FC } from 'react';
import styles from './card.module.css';
import pinSvg from '../../assets/pin.svg';
import closeNoteSvg from '../../assets/close-note.svg';

export const Card: FC = () => {
  return (
    <div className={styles.note}>
      <p className={styles.noteText}>
        Lorem ipsum dolor sit, amet consectetur adipisicing elit. Quisquam deleniti placeat inventore eius ipsa
        reiciendis nihil. Beatae maiores consectetur molestias recusandae quam, incidunt iure natus, quas, assumenda
        blanditiis perferendis pariatur? Lorem ipsum dolor sit, amet consectetur adipisicing elit. Quisquam deleniti
        placeat inventore eius ipsa reiciendis nihil. Beatae maiores consectetur molestias recusandae quam, incidunt
        iure natus, quas, assumenda blanditiis perferendis pariatur?
      </p>
      <img src={pinSvg} alt='pin' className={styles.pin} />
      <div className={styles.closeNote}>
        <img src={closeNoteSvg} alt='closeNoteSvg' />
      </div>
    </div>
  );
};
