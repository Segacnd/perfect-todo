import { FC, useEffect, useState } from 'react';
import { Link, useNavigate, useParams } from 'react-router-dom';
import styles from './todo-page.module.css';
import { Card } from '../ui/card/card';
import { Input } from '../ui/inputs/default-input/input';
import { Button } from '../ui/buttons/default-button/button';
import { useAppDispatch, useAppSelector } from '../redux/store';
import { todoSelector } from '../redux/selectors';
import { addNewNote, addNewNotee, fetchTodoById } from '../redux/slices/fetch-todo-slice';
import { INote, deleteTodo } from '../redux/slices/fetch-todos-slice';
import { Alert } from '../ui/alert/alert';
import { NotesForm } from '../components/notes-form/notes-form';
import { Note } from '../types';

export const TodoPage: FC = () => {
  const placeholderValue = 'write a note';
  const [noteValue, setNoteValue] = useState<string>('');
  const [isLabelOpen, setIsLabelOpen] = useState<boolean>(false);
  const { todo } = useAppSelector(todoSelector);
  const dispatch = useAppDispatch();
  const { id } = useParams();
  const { notes } = useAppSelector(todoSelector);
  const [showAlert, setShowAlert] = useState<boolean>(false);
  useEffect(() => {
    if (id) {
      dispatch(fetchTodoById(id));
    }
  }, [dispatch, id]);
  const updateNotes = (newNote: Note): Note[] => {
    if (!todo) {
      return [];
    }
    const currentNotes: Note[] = [...todo?.notes];
    return [...currentNotes, newNote];
  };
  const createNote = (text: string): Note => {
    return { note: text, id: (todo?.notes.length || 0).toString() };
  };

  const addNote = (note: string) => {
    const newNote = createNote(note);
    const newArr = updateNotes(newNote);
    if (todo && todo.notes?.length <= 7 && id) {
      const obj = { updatedNotes: newArr, id };
      dispatch(fetchTodoById(id));
      dispatch(addNewNote(obj));
    } else {
      setShowAlert(true);
    }
    console.log(todo?.notes.length);
  };
  if (todo) {
    console.log(todo);
  }
  const navigate = useNavigate();
  const deleteCurrentTodo = (index: string) => {
    dispatch(deleteTodo(index));
    navigate('/');
  };

  const completeCurrentTodo = (index: string) => {
    // dispatch(completeTodo(index));
  };

  return (
    <div className={styles.container}>
      <div className={styles.todoInfo}>
        <h1> {todo?.title}</h1>
        <p className={styles.cardDescription}>{todo?.description}</p>
      </div>
      <div className={styles.todoContent}>
        <div className={styles.inputWrapper}>
          <p className={styles.subtitle}>You can add new note</p>
          <div className={styles.iwrapper}>
            <NotesForm handleSubmit={addNote} />
          </div>
        </div>
        <div className={styles.noteContainer}>
          {notes?.map((el) => (
            <Card noteText={el.note} key={el.id + el.note} />
          ))}

          {showAlert && <Alert alertText='больше 8 карточек нельзя!' className='notesAlert' />}
          {notes?.length === 0 && <p>Пока что нет заметок</p>}
        </div>
      </div>
      <div className={styles.buttonsContainer}>
        <Link className={styles.goBackLink} to='/'>
          Back to main page
        </Link>
        <div className={styles.mainButtons}>
          <Button text='delete todo' buttonType='button' buttonClick={() => deleteCurrentTodo(todo!.id)} />
          <Button text='complete todo' buttonType='button' buttonClick={() => completeCurrentTodo(todo!.id)} />
        </div>
      </div>
    </div>
  );
};
