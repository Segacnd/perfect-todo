import { FC } from 'react';
import { Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { useFormik } from 'formik';
import * as yup from 'yup';
import { Button } from '../../ui/buttons/default-button/button';
import styles from './auth.module.css';
import { FormInput } from '../../ui/inputs/default-input/form-tinput/form-input';
import { loginRules } from '../../validation/form-validation-schemes';

export const Auth: FC = () => {
  const { t } = useTranslation();
  const formik = useFormik({
    initialValues: {
      login: '',
    },
    validationSchema: yup.object({
      login: yup
        .string()
        .required(`${t('form_errors_require')}`)
        .matches(loginRules.latinPattern, `${t('form_errors_latin')}`),
    }),
    onSubmit: (values) => {
      console.log(JSON.stringify(values, null, 2));
    },
  });

  return (
    <>
      <h2 className={styles.authTitle}>{t('auth_title')}</h2>
      <form autoComplete='off' onSubmit={formik.handleSubmit} className={styles.authForm}>
        <FormInput
          onChange={formik.handleChange}
          value={formik.values.login}
          placeholder={t('auth_input_placeholder')}
          name='login'
          errortext={formik.errors.login}
        />
        <Button
          disabled={formik.errors.login ? true : false}
          text={t('auth_button_text')}
          buttonClick={() => {}}
          buttonType='submit'
        />
      </form>
      <p className={styles.authSubTitle}>
        {t('auth_redirect_text')} <br /> <Link to='/registration'>{t('auth_create_acc_text')}</Link>
      </p>
    </>
  );
};
