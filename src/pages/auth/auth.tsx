import { FC } from 'react';
import { Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { useFormik } from 'formik';
import * as yup from 'yup';
import { getAuth, signInWithEmailAndPassword } from 'firebase/auth';
import { Button } from '../../ui/buttons/default-button/button';
import styles from './auth.module.css';
import { FormInput } from '../../ui/inputs/default-input/form-tinput/form-input';
import { loginRules } from '../../validation/form-validation-schemes';
import { useAppDispatch } from '../../redux/store';
import { userActions } from '../../redux/slices/user-slice';

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
        .matches(loginRules.latinPattern, `${t('form_errors_latin')}`),
      password: yup
        .string()
        .required(`${t('form_errors_require')}`)
        .matches(loginRules.latinPattern, `${t('form_errors_latin')}`),
    }),
    onSubmit: (values) => {
      const auth = getAuth();
      signInWithEmailAndPassword(auth, values.email, values.password).then(({ user }) => {
        dispatch(
          userActions.setUser({
            login: auth.currentUser?.displayName,
            email: user.email,
            id: user.uid,
            token: user.refreshToken,
            photoUrl: auth.currentUser?.photoURL,
          })
        );
      });
    },
  });

  return (
    <>
      <h2 className={styles.authTitle} data-testid='authTitle'>
        {t('auth_title')}
      </h2>
      <form autoComplete='off' onSubmit={formik.handleSubmit} className={styles.authForm}>
        <FormInput
          onChange={formik.handleChange}
          value={formik.values.email}
          placeholder={t('auth_input_placeholder_login')}
          name='email'
          errortext={formik.errors.email}
          type='email'
          dti='email'
        />
        <FormInput
          onChange={formik.handleChange}
          value={formik.values.password}
          placeholder={t('auth_input_placeholder_password')}
          name='password'
          errortext={formik.touched.password ? formik.errors.password : ''}
          onBlur={formik.handleBlur}
          type='password'
          dti='password'
        />
        <Button
          disabled={!formik.isValid ? true : false}
          text={t('auth_button_text')}
          buttonClick={() => {}}
          buttonType='submit'
        />
      </form>
      <p className={styles.authSubTitle}>
        {t('auth_redirect_text')} <br />{' '}
        <Link to='/registration' data-testid='redirectToRegister'>
          {t('auth_create_acc_text')}
        </Link>
      </p>
    </>
  );
};
