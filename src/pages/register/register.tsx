import { FC, useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import * as yup from 'yup';
import { useFormik } from 'formik';
import { ref, uploadBytes, getDownloadURL } from 'firebase/storage';
import { createUserWithEmailAndPassword, updateProfile } from 'firebase/auth';
import { auth, storage } from '../../firebase-config';
import { Button } from '../../ui/buttons/default-button/button';
import styles from './register.module.css';
import { FormInput } from '../../ui/inputs/default-input/form-tinput/form-input';
import { loginRules } from '../../validation/form-validation-schemes';
import { FileComponent } from '../../components/FileComponent';
import { Alert } from '../../ui/alert/alert';
import { useAppDispatch, useAppSelector } from '../../redux/store';
import { alertSelector, userSelector } from '../../redux/selectors';
import { alertActions } from '../../redux/slices/alert-slice';
import { authPath } from '../../routes';
import { registerUser, updateUser, uploadFile, userActions } from '../../redux/slices/user-slice';
import { Status } from '../../enums/enums';

export const Register: FC = () => {
  const { t } = useTranslation();
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const dispatch = useAppDispatch();
  const { registerStatus } = useAppSelector(userSelector);
  const { isAlertOpen } = useAppSelector(alertSelector);
  const navigate = useNavigate();
  const formik = useFormik({
    initialValues: {
      login: '',
      email: '',
      password: '',
    },
    validationSchema: yup.object({
      email: yup
        .string()
        .required(`${t('form_errors_require')}`)
        .matches(loginRules.latinPattern, `${t('form_errors_latin')}`),
      password: yup
        .string()
        .required(`${t('form_errors_require')}`)
        .matches(loginRules.latinPattern, `${t('form_errors_latin')}`),
      login: yup
        .string()
        .required(`${t('form_errors_require')}`)
        .matches(loginRules.latinPattern, `${t('form_errors_latin')}`),
    }),
    onSubmit: async (values) => {
      dispatch(registerUser({ email: values.email, login: values.login, password: values.password, selectedFile }));
    },
  });
  useEffect(() => {
    if (registerStatus === Status.SUCCESS) {
      navigate(authPath);
      dispatch(userActions.resetStatus('registerStatus'));
    }
  }, [registerStatus, navigate, dispatch]);
  return (
    <>
      <h2 className={styles.registerTitle} data-testid='registrationTitle'>
        {t('registration_title')}
      </h2>
      <form autoComplete='off' onSubmit={formik.handleSubmit} className={styles.registerForm}>
        <FormInput
          onChange={formik.handleChange}
          value={formik.values.login}
          placeholder={t('login_placeholder')}
          name='login'
          errortext={formik.touched.login ? formik.errors.login : ''}
          onBlur={formik.handleBlur}
          type='text'
        />
        <FormInput
          onChange={formik.handleChange}
          value={formik.values.email}
          placeholder={t('email_placeholder')}
          name='email'
          errortext={formik.touched.email ? formik.errors.email : ''}
          onBlur={formik.handleBlur}
          type='email'
        />
        <FormInput
          onChange={formik.handleChange}
          value={formik.values.password}
          placeholder={t('password_placeholder')}
          name='password'
          errortext={formik.touched.password ? formik.errors.password : ''}
          onBlur={formik.handleBlur}
          type='password'
        />
        <FileComponent selectedFile={selectedFile} setSelectedFile={setSelectedFile} name='image_uploads' />
        <Button
          disabled={!formik.isValid ? true : false}
          text={t('registration_button_text')}
          buttonType='submit'
          size='standart'
          styleType='primary'
        />
      </form>
      {isAlertOpen && <Alert alertText={t('unsuccessful_reg')} type='error' />}
      {isAlertOpen && <Alert alertText={t('successful_reg')} type='success' />}
      <p className={styles.registerSubTitle}>
        {t('registration_redirect_text')} <br />{' '}
        <Link to='/auth' data-testid='redirectToAuth'>
          {t('registration_link_text')}
        </Link>
      </p>
    </>
  );
};
