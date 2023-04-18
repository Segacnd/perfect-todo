import { FC, useState } from 'react';
import { Link } from 'react-router-dom';
import styles from './todo-page.module.css';
import { Card } from '../ui/card/card';
import { Input } from '../ui/inputs/default-input/input';
import { Button } from '../ui/buttons/default-button/button';

export const TodoPage: FC = () => {
  const placeholderValue = 'write a note';
  const [noteValue, setNoteValue] = useState<string>('');
  const [isLabelOpen, setIsLabelOpen] = useState<boolean>(false);
  return (
    <div className={styles.container}>
      <div className={styles.todoInfo}>
        <h1>Wash a dishes</h1>
        <p className={styles.cardDescription}>
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Repellat, vero sequi! Tenetur magni cum
          reprehenderit, modi animi eos blanditiis consectetur doloribus inventore recusandae sit a obcaecati ex,
          nostrum voluptate enim?
        </p>
      </div>
      <div className={styles.todoContent}>
        <div className={styles.inputWrapper}>
          <p className={styles.subtitle}>You can add new note</p>
          <div className={styles.iwrapper}>
            <Input
              placeholder={placeholderValue}
              labelText='press Enter to add a note'
              change={(value) => setNoteValue(value)}
              value={noteValue}
              isLabelOpen={isLabelOpen}
              setIsLabelOpen={setIsLabelOpen}
            />
          </div>
        </div>
        <div className={styles.noteContainer}>
          <Card />
          <Card />
          <Card />
          <Card />
          <Card />
          <Card />
        </div>
      </div>
      <div className={styles.buttonsContainer}>
        <Link className={styles.goBackLink} to='/'>
          Back to main page
        </Link>
        <div className={styles.mainButtons}>
          <Button text='delete todo' buttonClick={() => {}} buttonType='button' />
          <Button text='complete todo' buttonClick={() => {}} buttonType='button' />
        </div>
      </div>
    </div>
  );
};
