import { FC, useState } from 'react';
import ReactDOM from 'react-dom';
import { getAuth, updateProfile } from 'firebase/auth';
import { useTranslation } from 'react-i18next';
import { useFormik } from 'formik';
import * as yup from 'yup';
import { getDownloadURL, ref, uploadBytes } from 'firebase/storage';
import styles from '../modal/modal.module.css';
import { CloseButton } from '../../buttons/close-button/close-button';
import { FormInput } from '../../inputs/default-input/form-tinput/form-input';
import { useAppDispatch, useAppSelector } from '../../../redux/store';
import { Button } from '../../buttons/default-button/button';
import { editProfileActions } from '../../../redux/slices/edit-profile-slice';
import { FileComponent } from '../../../components/FileComponent';
import { userActions } from '../../../redux/slices/user-slice';
import { storage } from '../../../firebase-config';
import { userSelector } from '../../../redux/selectors';

export const EditProfileModal: FC = () => {
  const dispatch = useAppDispatch();
  const { login } = useAppSelector(userSelector);
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const { t } = useTranslation();
  const auth = getAuth();
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
      const storageRef = ref(storage, login ? login : '');
      if (selectedFile) {
        await uploadBytes(storageRef, selectedFile);
      }
      getDownloadURL(storageRef).then(async (downloadUrl) => {
        if (auth.currentUser) {
          await updateProfile(auth.currentUser, {
            displayName: values.newUsername,
            photoURL: downloadUrl,
          });
          dispatch(
            userActions.setUser({
              login: auth.currentUser?.displayName,
              photoUrl: auth.currentUser?.photoURL,
              email: auth.currentUser.email,
              id: auth.currentUser.uid,
              token: auth.currentUser.refreshToken,
            })
          );
        }
      });

      dispatch(editProfileActions.editProfileModalTrigger(false));
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
          errortext={formik.touched.newUsername ? formik.errors.newUsername : ''}
          onBlur={formik.handleBlur}
        />
        <FileComponent selectedFile={selectedFile} setSelectedFile={setSelectedFile} />
        <Button
          disabled={formik.errors.newUsername ? true : false}
          text={t('button_text_create')}
          styleType='secondary'
          buttonType='submit'
          size='standart'
        />
      </form>
    </div>,
    document.getElementById('edit-modal') as Element
  );
};
