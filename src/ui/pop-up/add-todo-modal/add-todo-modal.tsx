import { FC } from 'react';
import ReactDOM from 'react-dom';
import { useFormik } from 'formik';
import * as yup from 'yup';
import { useTranslation } from 'react-i18next';
import styles from './add-todo-modal.module.css';
import { Button } from '../../buttons/default-button/button';
import { CloseButton } from '../../buttons/close-button/close-button';
import { useAppDispatch } from '../../../redux/store';
import { addTodoActions } from '../../../redux/slices/add-todo-slice';
import { FormInput } from '../../inputs/default-input/form-tinput/form-input';

export const AddTodoModal: FC = () => {
  const { t } = useTranslation();
  const dispatch = useAppDispatch();
  const formik = useFormik({
    initialValues: {
      title: '',
      description: '',
    },
    validationSchema: yup.object({
      title: yup.string().required(`${t('form_errors_require')}`),
      description: yup.string().required(`${t('form_errors_require')}`),
    }),
    onSubmit: (values) => {
      console.log(JSON.stringify(values, null, 2));
    },
  });
  return ReactDOM.createPortal(
    <div className={styles.modalWrapper}>
      <form onSubmit={formik.handleSubmit} className={styles.modalContainer}>
        <div className={styles.closeButton}>
          <CloseButton click={() => dispatch(addTodoActions.addTodoModalToggler(false))} />
        </div>
        <div className={styles.modalHeader}>
          <h3>Add Todo</h3>
          <p className={styles.categoryText}>
            for category: <span>Home</span>
          </p>
        </div>
        <div className={styles.box}>
          <p>{t('form_add_todo_title')}</p>
          <FormInput
            onChange={formik.handleChange}
            value={formik.values.title}
            placeholder={t('form_add_todo_placeholder')}
            name='title'
            errortext={formik.touched.title ? formik.errors.title : ''}
            onBlur={formik.handleBlur}
          />
        </div>
        <div className={styles.box}>
          <p>{t('form_add_todo_description')}</p>
          <FormInput
            onChange={formik.handleChange}
            value={formik.values.description}
            placeholder={t('form_add_todo_description_placeholder')}
            name='description'
            errortext={formik.touched.description ? formik.errors.description : ''}
            onBlur={formik.handleBlur}
          />
        </div>
        <Button disabled={!formik.isValid ? true : false} text='add' buttonClick={() => {}} buttonType='submit' />
      </form>
    </div>,
    document.getElementById('add-modal') as Element
  );
};
