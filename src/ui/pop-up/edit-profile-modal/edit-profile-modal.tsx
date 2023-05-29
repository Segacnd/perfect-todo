import { FC, useState } from 'react';
import ReactDOM from 'react-dom';
import { useTranslation } from 'react-i18next';
import { useFormik } from 'formik';
import * as yup from 'yup';
import styles from '../modal/modal.module.css';
import { CloseButton } from '../../buttons/close-button/close-button';
import { FormInput } from '../../inputs/default-input/form-tinput/form-input';
import { useAppDispatch, useAppSelector } from '../../../redux/store';
import { Button } from '../../buttons/default-button/button';
import { editProfileActions } from '../../../redux/slices/edit-profile-slice';
import { FileComponent } from '../../../components/FileComponent';
import { editProfile, userActions } from '../../../redux/slices/user-slice';
import { auth } from '../../../firebase-config';
import { userSelector } from '../../../redux/selectors';
import { Status } from '../../../enums/enums';
import { Alert } from '../../alert/alert';
import { alertActions } from '../../../redux/slices/alert-slice';

export const EditProfileModal: FC = () => {
  const dispatch = useAppDispatch();
  const { editProfileStatus } = useAppSelector(userSelector);
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const { t } = useTranslation();
  const closeModal = (): void => {
    dispatch(editProfileActions.editProfileModalTrigger(false));
  };
  const formik = useFormik({
    initialValues: {
      newUsername: '',
    },
    validationSchema: yup.object({
      newUsername: yup.string().required(`${t('form_errors_require')}`),
    }),
    onSubmit: async (values) => {
      dispatch(editProfileActions.editProfileModalTrigger(false));
      await dispatch(editProfile({ selectedFile, newLogin: values.newUsername }));
      dispatch(
        userActions.updateUserData({ login: auth.currentUser?.displayName, photoUrl: auth.currentUser?.photoURL })
      );
      dispatch(alertActions.setAlertStatus(true));
    },
  });

  return ReactDOM.createPortal(
    <div className={styles.modal}>
      <form onSubmit={formik.handleSubmit} className={styles.modalWrapper}>
        <div className={styles.modalHeader}>
          <h3>{t('change_data')}</h3>
          <CloseButton click={closeModal} />
        </div>
        <FormInput
          onChange={formik.handleChange}
          value={formik.values.newUsername}
          placeholder={t('update_username')}
          name='newUsername'
          errorText={formik.touched.newUsername ? formik.errors.newUsername : ''}
          onBlur={formik.handleBlur}
        />
        <FileComponent name='image_uploads' selectedFile={selectedFile} setSelectedFile={setSelectedFile} />
        <Button
          disabled={formik.errors.newUsername ? true : false}
          styleType='secondary'
          buttonType='submit'
          size='standart'
        >
          {t('button_text_create')}
        </Button>
      </form>

      {editProfileStatus === Status.SUCCESS && <Alert alertText='user is updated' type='success' />}
    </div>,
    document.getElementById('edit-modal') as Element
  );
};
