import { FC } from 'react';
import { useTranslation } from 'react-i18next';
import styles from './view-toggler.module.css';
import { SwitchButton } from '../../ui/buttons/switch-button/switch-button';
import { TodoPreviewType, viewControllerActions } from '../../redux/slices/view-controller-slice';
import { useAppDispatch, useAppSelector } from '../../redux/store';
import { viewControllerSelector } from '../../redux/selectors';

export const ViewToggler: FC = () => {
  const { t } = useTranslation();
  const { todoPreviewType } = useAppSelector(viewControllerSelector);
  const dispatch = useAppDispatch();

  const changeTodoType = (value: TodoPreviewType) => {
    dispatch(viewControllerActions.todoPreviewToggler(value));
  };

  return (
    <div className={styles.viewBar}>
      <p>{todoPreviewType === 'inProgress' ? `${t('todo_view_in_progress')}` : `${t('todo_view_completed')}`}</p>
      <SwitchButton checked={todoPreviewType} change={changeTodoType} />
    </div>
  );
};
