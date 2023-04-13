import { FC, useId, useState } from 'react';
import styles from './todo-preview.module.css';
import { Tooltip } from '../pop-up/tooltip/tooltip';

import deleteIcon from '../../assets/delete-icon.svg';
import completeIcon from '../../assets/complete-circle.svg';

type TodopreviewProps = {
  text: string;
  completeTodo: () => void;
  deleteTodo: (id: number) => void;
};

export const TodoPreview: FC<TodopreviewProps> = ({ text, completeTodo, deleteTodo }: TodopreviewProps) => {
  const [isLeftTooltipOpen, setIsLeftTooltipOpen] = useState<boolean>(false);
  const [isrightTooltipOpen, setIsRightTooltipOpen] = useState<boolean>(false);
  const id = useId();

  const showTooltip = (fn: React.Dispatch<React.SetStateAction<boolean>>): void => {
    fn(true);
  };

  const hideTooltip = (fn: React.Dispatch<React.SetStateAction<boolean>>): void => {
    fn(false);
  };

  return (
    <div className={styles.previewWrapper}>
      <div
        className={styles.completeTodo}
        onMouseEnter={() => showTooltip(setIsLeftTooltipOpen)}
        onMouseLeave={() => hideTooltip(setIsLeftTooltipOpen)}
      >
        <label htmlFor={id}>
          <img src={completeIcon} alt='complete icon' />
        </label>
        <input onChange={completeTodo} type='checkbox' name='' id={id} />
        {isLeftTooltipOpen && <Tooltip text='quick complete' />}
      </div>
      <p className={styles.todo}>{text}</p>
      <div
        className={styles.deleteTodo}
        onMouseEnter={() => showTooltip(setIsRightTooltipOpen)}
        onMouseLeave={() => hideTooltip(setIsRightTooltipOpen)}
      >
        <button type='button' onClick={() => deleteTodo}>
          <img src={deleteIcon} alt='delete icon' />
        </button>
        {isrightTooltipOpen && <Tooltip text='delete todo' />}
      </div>
    </div>
  );
};
