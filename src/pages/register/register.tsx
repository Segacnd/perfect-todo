import { FC } from 'react';
import { Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import * as yup from 'yup';
import { useFormik } from 'formik';
import { Button } from '../../ui/buttons/default-button/button';
import styles from './register.module.css';
import { FormInput } from '../../ui/inputs/default-input/form-tinput/form-input';
import { loginRules } from '../../validation/form-validation-schemes';

export const Register: FC = () => {
  const { t } = useTranslation();
  const formik = useFormik({
    initialValues: {
      login: '',
      firstName: '',
      lastName: '',
    },
    validationSchema: yup.object({
      login: yup
        .string()
        .required(`${t('form_errors_require')}`)
        .matches(loginRules.latinPattern, `${t('form_errors_latin')}`),
      firstName: yup
        .string()
        .required(`${t('form_errors_require')}`)
        .matches(loginRules.latinPattern, `${t('form_errors_latin')}`),
      lastName: yup
        .string()
        .required(`${t('form_errors_require')}`)
        .matches(loginRules.latinPattern, `${t('form_errors_latin')}`),
    }),
    onSubmit: (values) => {
      console.log(JSON.stringify(values, null, 2));
    },
  });
  console.log(formik.errors);

  return (
    <>
      <h2 className={styles.registerTitle}>{t('registration_title')}</h2>
      <form autoComplete='off' onSubmit={formik.handleSubmit} className={styles.registerForm}>
        <FormInput
          onChange={formik.handleChange}
          value={formik.values.login}
          placeholder={t('registration_login_input')}
          name='login'
          errortext={formik.touched.login ? formik.errors.login : ''}
          onBlur={formik.handleBlur}
        />
        <FormInput
          onChange={formik.handleChange}
          value={formik.values.firstName}
          placeholder={t('registration_fname_input')}
          name='firstName'
          onBlur={formik.handleBlur}
          errortext={formik.touched.firstName ? formik.errors.firstName : ''}
        />
        <FormInput
          onChange={formik.handleChange}
          value={formik.values.lastName}
          placeholder={t('registration_lname_input')}
          name='lastName'
          errortext={formik.touched.lastName ? formik.errors.lastName : ''}
          onBlur={formik.handleBlur}
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
