import { useEffect, useState, FC } from 'react';
import { useTranslation } from 'react-i18next';
import { AddButton } from '../../ui/buttons/add-button/add-button';
import { TodoPreview } from '../../ui/todo-preview/todo-preview';
import { ViewToggler } from '../view-toggler/view-toggler';
import { useAppDispatch, useAppSelector } from '../../redux/store';
import { viewControllerSelector } from '../../redux/selectors';
import { addTodoActions } from '../../redux/slices/add-todo-slice';

type ToDo = {
  userId: number;
  id: number;
  title: string;
  completed: boolean;
};

export const TodosContainer: FC = () => {
  const { t } = useTranslation();
  const [todos, setTodos] = useState<ToDo[]>([]);
  const { todoPreviewType } = useAppSelector(viewControllerSelector);
  const dispatch = useAppDispatch();

  useEffect(() => {
    fetch('https://jsonplaceholder.typicode.com/todos')
      .then((data) => data.json())
      .then((data) => setTodos(data));
  }, []);

  return (
    <section className='todos-container'>
      <div className='todos-header'>
        <h3>Home</h3>
        <ViewToggler />
        <AddButton
          tooltipText={t('tooltip_add_todo')}
          text='+'
          click={() => dispatch(addTodoActions.addTodoModalToggler(true))}
        />
      </div>
      <div className='todos-wrapper'>
        {todos &&
          todos
            .filter((el) => (todoPreviewType === 'completed' ? el.completed : !el.completed))
            .map((el) => <TodoPreview key={el.id} text={el.title} completeTodo={() => {}} deleteTodo={() => {}} />)}
      </div>
    </section>
  );
};
