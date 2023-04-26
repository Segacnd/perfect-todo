import { FC } from 'react';
import styles from './card.module.css';
import pinSvg from '../../assets/pin.svg';
import closeNoteSvg from '../../assets/close-note.svg';

interface ICard {
  noteText: string;
  index: string;
  deleteNote: (index: string) => void;
}
export const Card: FC<ICard> = ({ noteText, index, deleteNote }) => {
  return (
    <div className={styles.note}>
      <p className={styles.noteText}>{noteText} </p>
      <img src={pinSvg} alt='pin' className={styles.pin} />
      <div className={styles.closeNote} onClick={() => deleteNote(index)} aria-hidden='true'>
        <img src={closeNoteSvg} alt='closeNoteSvg' />
      </div>
    </div>
  );
};
