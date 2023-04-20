import { FC } from 'react';
import ReactDOM from 'react-dom';
import axios from 'axios';
import { useFormik } from 'formik';
import * as yup from 'yup';
import { useTranslation } from 'react-i18next';
import styles from './add-todo-modal.module.css';
import { Button } from '../../buttons/default-button/button';
import { CloseButton } from '../../buttons/close-button/close-button';
import { useAppDispatch, useAppSelector } from '../../../redux/store';
import { addTodoActions } from '../../../redux/slices/add-todo-slice';
import { FormInput } from '../../inputs/default-input/form-tinput/form-input';
import { todosSelector } from '../../../redux/selectors';

export const AddTodoModal: FC = () => {
  const { t } = useTranslation();
  const dispatch = useAppDispatch();
  const { activeCategory } = useAppSelector(todosSelector);
  const formik = useFormik({
    initialValues: {
      title: '',
      text: '',
      categories: '',
      dateStarted: new Date().toISOString(),
      dateEnded: null,
      notes: [],
      userId: 12345,
    },
    validationSchema: yup.object({
      title: yup.string().required(`${t('form_errors_require')}`),
      text: yup.string().required(`${t('form_errors_require')}`),
      categories: yup.string().required(`${t('form_errors_require')}`),
    }),
    onSubmit: async (values) => {
      console.log(values);
      const { data } = await axios.post('https://64368e963e4d2b4a12d57f98.mockapi.io/todos', values);
      console.log(data);
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
        </div>
        <div className={styles.box}>
          <p>{t('form_add_todo_category')}</p>
          <FormInput
            onChange={formik.handleChange}
            value={formik.values.categories}
            placeholder={t('form_add_todo_category_placeholder')}
            name='categories'
            errortext={formik.touched.categories ? formik.errors.categories : ''}
            onBlur={formik.handleBlur}
          />
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
            value={formik.values.text}
            placeholder={t('form_add_todo_description_placeholder')}
            name='text'
            errortext={formik.touched.text ? formik.errors.text : ''}
            onBlur={formik.handleBlur}
          />
        </div>
        <Button disabled={!formik.isValid ? true : false} text='add' buttonClick={() => {}} buttonType='submit' />
      </form>
    </div>,
    document.getElementById('add-modal') as Element
  );
};
