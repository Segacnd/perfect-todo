import { FC } from 'react';
import ReactDOM from 'react-dom';
import { addDoc } from 'firebase/firestore';
import { useFormik } from 'formik';
import * as yup from 'yup';
import { useTranslation } from 'react-i18next';
import { todosCollection, db } from '../../../firebase-config';
import styles from './add-todo-modal.module.css';
import { Button } from '../../buttons/default-button/button';
import { CloseButton } from '../../buttons/close-button/close-button';
import { useAppDispatch, useAppSelector } from '../../../redux/store';
import { addTodoActions } from '../../../redux/slices/add-todo-slice';
import { FormInput } from '../../inputs/default-input/form-tinput/form-input';
import { todosSelector } from '../../../redux/selectors';
import { fetchTodos } from '../../../redux/slices/fetch-todos-slice';

// import { ITodo } from '../../../redux/slices/fetch-todos-slice';
// import { Note } from '../../../types';

export const AddTodoModal: FC = () => {
  const { t } = useTranslation();
  const dispatch = useAppDispatch();
  const { activeCategory } = useAppSelector(todosSelector);
  const createTodo = async (values: any) => {
    await addDoc(todosCollection, values);
    console.log(db);
  };

  const formik = useFormik({
    initialValues: {
      title: '',
      description: '',
      category: '',
      id: '',
      dateStarted: new Date().toISOString(),
      dateEnded: null,
      notes: [],
      user: '',
    },
    validationSchema: yup.object({
      title: yup.string().required(`${t('form_errors_require')}`),
      description: yup.string().required(`${t('form_errors_require')}`),
      category: yup.string().required(`${t('form_errors_require')}`),
    }),
    onSubmit: async (values) => {
      createTodo(values);
      dispatch(fetchTodos());
      dispatch(addTodoActions.addTodoModalToggler(false));
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
            value={formik.values.category}
            placeholder={t('form_add_todo_category_placeholder')}
            name='category'
            errortext={formik.touched.category ? formik.errors.category : ''}
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
