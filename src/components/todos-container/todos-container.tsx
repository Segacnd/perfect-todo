import { useEffect, useState, FC } from 'react';
import { useTranslation } from 'react-i18next';
import { AddButton } from '../../ui/buttons/add-button/add-button';
import { TodoPreview } from '../../ui/todo-preview/todo-preview';
import { ViewToggler } from '../view-toggler/view-toggler';

type ToDo = {
  userId: number;
  id: number;
  title: string;
  completed: boolean;
};

export const TodosContainer: FC = () => {
  const { t } = useTranslation();
  const [todos, setTodos] = useState<ToDo[]>([]);
  const [isChecked, setIsChecked] = useState<boolean>(true);

  useEffect(() => {
    fetch('https://jsonplaceholder.typicode.com/todos')
      .then((data) => data.json())
      .then((data) => setTodos(data));
  }, []);

  return (
    <section className='todos-container'>
      <div className='todos-header'>
        <h3>Home</h3>
        <ViewToggler isChecked={isChecked} setIsChecked={setIsChecked} />
        <AddButton tooltipText={t('tooltip_add_todo')} text='+' click={() => {}} />
      </div>
      <div className='todos-wrapper'>
        {todos &&
          todos
            .filter((el) => (isChecked ? el.completed : !el.completed))
            .map((el) => <TodoPreview key={el.id} text={el.title} completeTodo={() => {}} deleteTodo={() => {}} />)}
      </div>
    </section>
  );
};
