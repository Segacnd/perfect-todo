import { FC } from 'react';
import ReactDOM from 'react-dom';
import { useTranslation } from 'react-i18next';
import styles from './modal.module.css';
import { CloseButton } from '../../buttons/close-button/close-button';
import { Button } from '../../buttons/default-button/button';
import { Input } from '../../inputs/default-input/input';

export const Modal: FC = () => {
  const { t } = useTranslation();

  return ReactDOM.createPortal(
    <div className={styles.modal}>
      <div className={styles.modalWrapper}>
        <div className={styles.modalHeader}>
          <h3>{t('modal_add_new_category_title')}</h3>
          <CloseButton />
        </div>
        <p>Lorem ipsum dolor sit amet consectetur, adipisicing elit. Officiis, eveniet?</p>
        <Input value='' labelText='' placeholder={t('input_add_category_placeholder')} change={() => {}} />
        <Button text={t('button_text_create')} buttonClick={() => {}} buttonType='submit' />
      </div>
    </div>,
    document.getElementById('modal') as Element
  );
};
