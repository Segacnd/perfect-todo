import { FC } from 'react';
import { Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { useFormik } from 'formik';
import * as yup from 'yup';
import { motion } from 'framer-motion';
import { Button } from '../../ui/buttons/default-button/button';
import styles from './auth.module.css';
import { FormInput } from '../../ui/inputs/default-input/form-tinput/form-input';
import { emailRules, loginRules } from '../../validation/form-validation-schemes';
import { useAppDispatch } from '../../redux/store';
import { loginUser } from '../../redux/slices/user-slice';
import { formAnimation, pAnimation, titleAnimation } from '../../animations/animations';

export const Auth: FC = () => {
  const { t } = useTranslation();
  const dispatch = useAppDispatch();

  const formik = useFormik({
    initialValues: {
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
        .matches(loginRules.latinPattern, `${t('form_errors_latin')}`),
    }),
    onSubmit: (values) => {
      dispatch(loginUser({ email: values.email, password: values.password }));
    },
  });
  return (
    <>
      <motion.h2
        viewport={{ once: true }}
        initial='hidden'
        whileInView='visible'
        variants={titleAnimation}
        className={styles.authTitle}
        data-testid='authTitle'
      >
        {t('auth_title')}
      </motion.h2>
      <motion.form
        initial='hidden'
        whileInView='visible'
        variants={formAnimation}
        autoComplete='off'
        onSubmit={formik.handleSubmit}
        className={styles.authForm}
      >
        <FormInput
          onChange={formik.handleChange}
          value={formik.values.email}
          placeholder={t('auth_input_placeholder_login')}
          name='email'
          errorText={formik.errors.email}
          supportText={formik.errors.email ? `${t('email_validation_support_text')}` : ''}
          type='email'
          dti='email'
          inputMode='email'
        />
        <FormInput
          onChange={formik.handleChange}
          value={formik.values.password}
          placeholder={t('auth_input_placeholder_password')}
          name='password'
          errorText={formik.touched.password ? formik.errors.password : ''}
          onBlur={formik.handleBlur}
          type='password'
          dti='password'
          inputMode='text'
          supportText={formik.errors.password ? `${t('password_validation_support_text')}` : ''}
        />
        <Button disabled={!formik.isValid ? true : false} buttonType='submit' size='standart' styleType='primary'>
          {t('auth_button_text')}
        </Button>
      </motion.form>
      <motion.p
        initial='hidden'
        viewport={{ once: true }}
        whileInView='visible'
        variants={pAnimation}
        className={styles.authSubTitle}
      >
        {t('auth_redirect_text')} <br />{' '}
        <Link to='/registration' data-testid='redirectToRegister'>
          {t('auth_create_acc_text')}
        </Link>
      </motion.p>
    </>
  );
};
