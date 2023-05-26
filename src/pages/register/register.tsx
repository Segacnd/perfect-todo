import { FC, useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import * as yup from 'yup';
import { useFormik } from 'formik';
import { motion } from 'framer-motion';
import { Button } from '../../ui/buttons/default-button/button';
import styles from './register.module.css';
import { FormInput } from '../../ui/inputs/default-input/form-tinput/form-input';
import { emailRules, loginRules, passwordRules } from '../../validation/form-validation-schemes';
import { FileComponent } from '../../components/FileComponent';
import { Alert } from '../../ui/alert/alert';
import { useAppDispatch, useAppSelector } from '../../redux/store';
import { alertSelector, userSelector } from '../../redux/selectors';
import { authPath } from '../../routes';
import { registerUser, userActions } from '../../redux/slices/user-slice';
import { Status } from '../../enums/enums';
import { formAnimation, pAnimation, titleAnimation } from '../../animations/animations';

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
        .matches(emailRules.mailPattern, `${t('email_validation_error')}`),
      password: yup
        .string()
        .required(`${t('form_errors_require')}`)
        .matches(passwordRules.passwordPattern, `${t('password_validation_error')}`),
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
      <motion.h2
        initial='hidden'
        viewport={{ once: true }}
        whileInView='visible'
        variants={titleAnimation}
        className={styles.registerTitle}
        data-testid='registrationTitle'
      >
        {t('registration_title')}
      </motion.h2>
      <motion.form
        initial='hidden'
        whileInView='visible'
        variants={formAnimation}
        autoComplete='off'
        onSubmit={formik.handleSubmit}
        className={styles.registerForm}
      >
        <FormInput
          type='text'
          name='login'
          value={formik.values.login}
          placeholder={t('login_placeholder')}
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          supportText={`${t('form_errors_latin')}`}
          errorText={formik.touched.login ? formik.errors.login : ''}
        />
        <FormInput
          type='email'
          name='email'
          value={formik.values.email}
          placeholder={t('email_placeholder')}
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          supportText={`${t('form_errors_latin')}`}
          errorText={formik.touched.email ? formik.errors.email : ''}
        />
        <FormInput
          type='password'
          name='password'
          value={formik.values.password}
          placeholder={t('password_placeholder')}
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          supportText={`${t('password_validation_error')}`}
          errorText={formik.touched.password ? formik.errors.password : ''}
        />
        <FileComponent selectedFile={selectedFile} setSelectedFile={setSelectedFile} name='image_uploads' />
        <Button
          disabled={!formik.isValid ? true : false}
          text={t('registration_button_text')}
          buttonType='submit'
          size='standart'
          styleType='primary'
        />
      </motion.form>
      {isAlertOpen && <Alert alertText={t('unsuccessful_reg')} type='error' />}
      {isAlertOpen && <Alert alertText={t('successful_reg')} type='success' />}
      <motion.p
        initial='hidden'
        viewport={{ once: true }}
        whileInView='visible'
        variants={pAnimation}
        className={styles.registerSubTitle}
      >
        {t('registration_redirect_text')} <br />{' '}
        <Link to='/auth' data-testid='redirectToAuth'>
          {t('registration_link_text')}
        </Link>
      </motion.p>
    </>
  );
};
