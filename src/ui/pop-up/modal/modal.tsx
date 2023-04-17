import { FC, useState } from 'react';
import ReactDOM from 'react-dom';
import { useTranslation } from 'react-i18next';
import styles from './modal.module.css';
import { CloseButton } from '../../buttons/close-button/close-button';
import { Button } from '../../buttons/default-button/button';
import { Input } from '../../inputs/default-input/input';
import { useAppDispatch } from '../../../redux/store';
import { categoryActions } from '../../../redux/slices/category-slice';

export const Modal: FC = () => {
  const { t } = useTranslation();
  const dispatch = useAppDispatch();
  const [value, setValue] = useState<string>('');

  const closeModal = (): void => {
    dispatch(categoryActions.modalToggler(false));
  };

  return ReactDOM.createPortal(
    <div className={styles.modal}>
      <div className={styles.modalWrapper}>
        <div className={styles.modalHeader}>
          <h3>{t('modal_add_new_category_title')}</h3>
          <CloseButton click={closeModal} />
        </div>
        <p>Lorem ipsum dolor sit amet consectetur, adipisicing elit. Officiis, eveniet?</p>
        <Input
          value={value}
          labelText=''
          placeholder={t('input_add_category_placeholder')}
          change={setValue}
          isLabelOpen={false}
          setIsLabelOpen={() => {}}
        />
        <Button text={t('button_text_create')} buttonClick={() => {}} buttonType='submit' />
      </div>
    </div>,
    document.getElementById('modal') as Element
  );
};
