import { FC } from 'react';
import { Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import * as yup from 'yup';
import { useFormik } from 'formik';
import { getAuth, createUserWithEmailAndPassword } from 'firebase/auth';
import { Button } from '../../ui/buttons/default-button/button';
import styles from './register.module.css';
import { FormInput } from '../../ui/inputs/default-input/form-tinput/form-input';
import { loginRules } from '../../validation/form-validation-schemes';

export const Register: FC = () => {
  const { t } = useTranslation();
  const formik = useFormik({
    initialValues: {
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
    }),
    onSubmit: (values) => {
      const auth = getAuth();
      createUserWithEmailAndPassword(auth, values.email, values.password).then();
    },
  });

  return (
    <>
      <h2 className={styles.registerTitle}>{t('registration_title')}</h2>
      <form autoComplete='off' onSubmit={formik.handleSubmit} className={styles.registerForm}>
        <FormInput
          onChange={formik.handleChange}
          value={formik.values.email}
          placeholder='enter your email'
          name='email'
          errortext={formik.touched.email ? formik.errors.email : ''}
          onBlur={formik.handleBlur}
          type='email'
        />
        <FormInput
          onChange={formik.handleChange}
          value={formik.values.password}
          placeholder='enter your password'
          name='password'
          errortext={formik.touched.password ? formik.errors.password : ''}
          onBlur={formik.handleBlur}
          type='password'
        />
        <Button
          disabled={!formik.isValid ? true : false}
          text={t('registration_button_text')}
          buttonClick={() => {}}
          buttonType='submit'
        />
      </form>
      <p className={styles.registerSubTitle}>
        {t('registration_redirect_text')} <br /> <Link to='/auth'>{t('registration_link_text')}</Link>
      </p>
    </>
  );
};
