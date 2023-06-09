import { FC, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { t } from 'i18next';
import styles from './todo-page.module.css';
import { Card } from '../../ui/card/card';
import { Button } from '../../ui/buttons/default-button/button';
import { useAppDispatch, useAppSelector } from '../../redux/store';
import { alertSelector, todoSelector } from '../../redux/selectors';
import { addNewNote, fetchTodoById, completeTodo, deleteTodo } from '../../redux/slices/fetch-todo-slice';
import { Alert } from '../../ui/alert/alert';
import { NotesForm } from '../../components/notes-form/notes-form';
import { Note } from '../../types';
import { alertActions } from '../../redux/slices/alert-slice';
import arrowIcon from '../../assets/arrow-icon.svg';

export const TodoPage: FC = () => {
  const { todo } = useAppSelector(todoSelector);
  const { isAlertOpen } = useAppSelector(alertSelector);
  const dispatch = useAppDispatch();
  const { id } = useParams();
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
      dispatch(alertActions.setAlertStatus(true));
    }
  };

  const navigate = useNavigate();
  const deleteCurrentTodo = () => {
    if (id) {
      dispatch(deleteTodo(id));
      navigate('/');
    }
  };

  const completeCurrentTodo = () => {
    if (id) {
      dispatch(fetchTodoById(id));
      dispatch(completeTodo(id));
      dispatch(alertActions.setAlertStatus(true));
    }
  };
  const deleteNote = (index: string) => {
    if (todo && id) {
      const newArr = todo.notes.filter((item) => item.id !== index);
      dispatch(fetchTodoById(id));
      dispatch(addNewNote({ updatedNotes: newArr, id }));
    }
  };

  return (
    <div className={styles.container}>
      <div className={styles.todoInfo}>
        <h1> {todo?.title}</h1>
        <p className={styles.cardDescription}>{todo?.description}</p>
      </div>
      <div className={styles.todoContent}>
        <div className={styles.inputWrapper}>
          <p className={styles.subtitle}>{t('add_note')}</p>
          <div className={styles.iwrapper}>
            <NotesForm handleSubmit={addNote} disabled={todo?.dateEnded ? true : false} />
          </div>
        </div>
        <div className={styles.noteContainer}>
          {todo &&
            todo.notes?.map((el) => (
              <Card noteText={el.note} key={el.id + el.note} index={el.id} deleteNote={deleteNote} />
            ))}
          {todo && todo.notes?.length === 0 && <p>{t('no_notes')}</p>}
        </div>
      </div>
      <div className={styles.buttonsContainer}>
        <Button
          styleType='primary'
          buttonType='button'
          buttonClick={() => navigate('/')}
          size='medium'
          customStyle={{ backgroundColor: '#f4f4f4' }}
        >
          <img src={arrowIcon} alt='arrow' />
          {t('to_main_page')}
        </Button>

        <div className={styles.mainButtons}>
          <Button styleType='distractive' buttonType='button' buttonClick={() => deleteCurrentTodo()} size='medium'>
            {t('delete_todo')}
          </Button>
          <Button
            buttonType='button'
            buttonClick={() => completeCurrentTodo()}
            styleType='secondary'
            disabled={todo?.dateEnded ? true : false}
            size='medium'
          >
            {t('complete_todo')}
          </Button>
        </div>
      </div>
      {todo?.dateEnded && isAlertOpen && <Alert type='success' alertText='congs,this todo is finished!' />}
      {isAlertOpen && todo?.dateEnded === null && <Alert alertText='больше 8 карточек нельзя!' type='error' />}
    </div>
  );
};
