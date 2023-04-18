import { FC, useState } from 'react';
import { Link, useNavigate, useParams } from 'react-router-dom';
import styles from './todo-page.module.css';
import { Card } from '../ui/card/card';
import { Input } from '../ui/inputs/default-input/input';
import { CardButton } from '../ui/buttons/card-button/card-button';
import { useAppSelector } from '../redux/store';
import { todosSelector } from '../redux/selectors';

export const TodoPage: FC = () => {
  const placeholderValue = 'write a note';
  const [noteValue, setNoteValue] = useState<string>('');
  const [isLabelOpen, setIsLabelOpen] = useState<boolean>(false);
  const { todos } = useAppSelector(todosSelector);
  const { id } = useParams();
  const index = Number(id);
  console.log(index);
  console.log(todos);
  return (
    <div className={styles.container}>
      <div className={styles.todoContent}>
        <div className={styles.topContent}>
          <h1 className={styles.title}>{todos[index - 1]?.title}</h1>

          <Input
            placeholder={placeholderValue}
            labelText='press Enter to add a note'
            change={(value) => setNoteValue(value)}
            value={noteValue}
            isLabelOpen={isLabelOpen}
            setIsLabelOpen={setIsLabelOpen}
          />
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
      <p className={styles.cardDescription}>
        Lorem ipsum dolor sit amet consectetur adipisicing elit. Repellat, vero sequi! Tenetur magni cum reprehenderit,
        modi animi eos blanditiis consectetur doloribus inventore recusandae sit a obcaecati ex, nostrum voluptate enim?
      </p>
      <div className={styles.buttonsContainer}>
        <Link to='/'>
          <CardButton text='Back to main page' type='redirect' />
        </Link>
        <div className={styles.cardButtonsContainer}>
          <CardButton text='Complete todo' type='complete' />
          <CardButton text='Delete todo' type='delete' />
        </div>
      </div>
    </div>
  );
};
