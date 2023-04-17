import { FC } from 'react';
import styles from './switch-button.module.css';
import { TodoPreviewType } from '../../../redux/slices/view-controller-slice';

type SwitchButtonProps = {
  checked: TodoPreviewType;
  change: (value: TodoPreviewType) => void;
};

export const SwitchButton: FC<SwitchButtonProps> = ({ checked, change }) => {
  return (
    <label htmlFor='inputChecker' className={styles.switch}>
      <input
        id='inputChecker'
        type='checkbox'
        onClick={() => change(checked === 'inProgress' ? 'completed' : 'inProgress')}
        defaultChecked={checked === 'inProgress'}
      />
      <span className={`${styles.slider} ${styles.round}`} />
    </label>
  );
};
