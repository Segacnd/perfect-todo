import { FC } from 'react';
import ReactDOM from 'react-dom';
import styles from './modal.module.css';
import { CloseButton } from '../../buttons/close-button/close-button';
import { Button } from '../../buttons/default-button/button';
import { Input } from '../../inputs/default-input/input';

export const Modal: FC = () => {
  return ReactDOM.createPortal(
    <div className={styles.modal}>
      <div className={styles.modalWrapper}>
        <div className={styles.modalHeader}>
          <h3>Add new category</h3>
          <CloseButton />
        </div>
        <p>Lorem ipsum dolor sit amet consectetur, adipisicing elit. Officiis, eveniet?</p>
        <Input value='' labelText='' placeholder='Please, enter a category name' change={() => {}} />
        <Button text='create' buttonClick={() => {}} buttonType='submit' />
      </div>
    </div>,
    document.getElementById('modal') as Element
  );
};
