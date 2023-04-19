import { FC } from 'react';
import styles from './card.module.css';
import pinSvg from '../../assets/pin.svg';
import closeNoteSvg from '../../assets/close-note.svg';

interface ICard {
  noteText: string;
}
export const Card: FC<ICard> = ({ noteText }) => {
  return (
    <div className={styles.note}>
      <p className={styles.noteText}>{noteText} </p>
      <img src={pinSvg} alt='pin' className={styles.pin} />
      <div className={styles.closeNote}>
        <img src={closeNoteSvg} alt='closeNoteSvg' />
      </div>
    </div>
  );
};
