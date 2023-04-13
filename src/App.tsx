import { useEffect, useState } from 'react';
import './App.css';
import { AddButton } from './ui/buttons/add-button/add-button';
import { TodoPreview } from './ui/todo-preview/todo-preview';
import { ViewToggler } from './components/view-toggler/view-toggler';

type ToDo = {
  userId: number;
  id: number;
  title: string;
  completed: boolean;
};

export const App = () => {
  const [todos, setTodos] = useState<ToDo[]>([]);
  const [isChecked, setIsChecked] = useState<boolean>(true);

  useEffect(() => {
    fetch('https://jsonplaceholder.typicode.com/todos')
      .then((data) => data.json())
      .then((data) => setTodos(data));
  }, []);

  return (
    <div className='App'>
      <h1 className='app-title'>Perfect To-Do</h1>
      <div className='container'>
        <header>Hello</header>
        <main>
          <aside>
            <div className='category-header'>
              <h3>Categories</h3>
              <AddButton tooltipText='add new category' text='+' click={() => {}} />
            </div>
            <ul>
              <li>home</li>
              <li>work</li>
            </ul>
          </aside>
          <section className='todos-container'>
            <div className='todos-header'>
              <h3>Home</h3>
              <ViewToggler isChecked={isChecked} setIsChecked={setIsChecked} />
              <AddButton tooltipText='add new todo' text='+' click={() => {}} />
            </div>
            <div className='todos-wrapper'>
              {todos &&
                todos
                  .filter((el) => (isChecked ? el.completed : !el.completed))
                  .map((el) => (
                    <TodoPreview key={el.id} text={el.title} completeTodo={() => {}} deleteTodo={() => {}} />
                  ))}
            </div>
          </section>
        </main>
      </div>
      <footer>created by Bergei</footer>
    </div>
  );
};
