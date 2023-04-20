import { FC, useEffect, useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import styles from './todo-page.module.css';
import { Card } from '../ui/card/card';
import { Input } from '../ui/inputs/default-input/input';
import { Button } from '../ui/buttons/default-button/button';
import { useAppDispatch, useAppSelector } from '../redux/store';
import { todoSelector } from '../redux/selectors';
import { fetchTodoById } from '../redux/slices/fetch-todo-slice';
import { INote } from '../redux/slices/fetch-todos-slice';
import { Alert } from '../ui/alert/alert';

export const TodoPage: FC = () => {
  const placeholderValue = 'write a note';
  const [noteValue, setNoteValue] = useState<string>('');
  const [isLabelOpen, setIsLabelOpen] = useState<boolean>(false);
  const { todo } = useAppSelector(todoSelector);
  const dispatch = useAppDispatch();
  const { id } = useParams();
  const index = Number(id);
  const [notes, setNotes] = useState<INote[]>([]);

  useEffect(() => {
    dispatch(fetchTodoById(index));
  }, [dispatch, index]);
  useEffect(() => {
    if (todo[0]) {
      setNotes(todo[0].notes);
    }
  }, [todo]);

  const addNewNote = (note: string, e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    setNotes([...notes, { id: notes.length + 1, note }]);
  };
  console.log(notes);
  console.log(notes.length);
  return (
    <div className={styles.container}>
      <div className={styles.todoInfo}>
        {todo.map((el) => (
          <h1 key={el.title}>{el.text}</h1>
        ))}
        {todo.map((el) => (
          <p key={el.text} className={styles.cardDescription}>
            {el.text}
          </p>
        ))}
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
              addNewNote={addNewNote}
            />
          </div>
        </div>
        <div className={styles.noteContainer}>
          {notes.length <= 8 ? (
            notes.map((el) => <Card noteText={el.note} key={el.id + el.note} />)
          ) : (
            <Alert alertText='больше 8 карточек нельзя!' className='notesAlert' />
          )}
          {notes.length === 0 && <p>Пока что нет заметок</p>}
        </div>
      </div>
      <div className={styles.buttonsContainer}>
        <Link className={styles.goBackLink} to='/'>
          Back to main page
        </Link>
        <div className={styles.mainButtons}>
          <Button text='delete todo' buttonType='button' />
          <Button text='complete todo' buttonType='button' />
        </div>
      </div>
    </div>
  );
};
