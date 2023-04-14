import styles from './todo-page.module.css';
import deleteIcon from '../assets/delete-icon.svg';
import completeIcon from '../assets/complete-circle.svg';
import { Card } from '../ui/card/card';

export const TodoPage = () => {
  return (
    <>
      <div className={styles.todoContent}>
        <div className={styles.topContent}>
          <div className={styles.title}>title</div>

          <input type='text' placeholder='write your note' className={styles.noteInput} />
        </div>
        <div className={styles.noteContainer}>
          <Card />
          <Card />
          <Card />
          <Card />
          <Card />
          <Card />
          <Card />
        </div>
      </div>
    </>
  );
};
