import { FC } from 'react';
import ReactDOM from 'react-dom';
import { useTranslation } from 'react-i18next';
import { useFormik } from 'formik';
import * as yup from 'yup';
import styles from './modal.module.css';
import { CloseButton } from '../../buttons/close-button/close-button';
import { Button } from '../../buttons/default-button/button';
import { useAppDispatch } from '../../../redux/store';
import { categoryActions } from '../../../redux/slices/category-slice';
import { FormInput } from '../../inputs/default-input/form-tinput/form-input';

export const Modal: FC = () => {
  const dispatch = useAppDispatch();
  const { t } = useTranslation();
  const closeModal = (): void => {
    dispatch(categoryActions.modalToggler(false));
  };
  const formik = useFormik({
    initialValues: {
      categoryName: '',
    },
    validationSchema: yup.object({
      categoryName: yup.string().required(`${t('form_errors_require')}`),
    }),
    onSubmit: () => {},
  });

  return ReactDOM.createPortal(
    <div className={styles.modal}>
      <form onSubmit={formik.handleSubmit} className={styles.modalWrapper}>
        <div className={styles.modalHeader}>
          <h3>{t('modal_add_new_category_title')}</h3>
          <CloseButton click={closeModal} />
        </div>
        <p>Lorem ipsum dolor sit amet consectetur, adipisicing elit. Officiis, eveniet?</p>
        <FormInput
          onChange={formik.handleChange}
          value={formik.values.categoryName}
          placeholder={t('input_add_category_placeholder')}
          name='categoryName'
          errorText={formik.touched.categoryName ? formik.errors.categoryName : ''}
          onBlur={formik.handleBlur}
        />
        <Button
          disabled={formik.errors.categoryName ? true : false}
          styleType='secondary'
          buttonType='submit'
          size='standart'
        >
          {t('button_text_create')}
        </Button>
      </form>
    </div>,
    document.getElementById('modal') as Element
  );
};
