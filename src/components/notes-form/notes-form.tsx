import { useFormik } from 'formik';
import { FC } from 'react';
import * as yup from 'yup';
import { t } from 'i18next';
import { FormInput } from '../../ui/inputs/default-input/form-tinput/form-input';
import styles from './notes-form.module.css';

type NotesFormProps = {
  handleSubmit: (note: string) => void;
  disabled?: boolean;
};

export const NotesForm: FC<NotesFormProps> = ({ handleSubmit, disabled }) => {
  const formik = useFormik({
    initialValues: {
      note: '',
    },
    validationSchema: yup.object({
      note: yup.string().max(100, `${t('form_add_new_note')}`),
    }),
    onSubmit: (values) => {
      if (values.note) {
        handleSubmit(values.note);
      }
      formik.resetForm({ values: { note: '' } });
    },
  });
  return (
    <form autoComplete='off' onSubmit={formik.handleSubmit} className={styles.notesForm}>
      <FormInput
        placeholder={t('notes_input_placeholder')}
        onChange={formik.handleChange}
        value={formik.values.note}
        name='note'
        errorText={formik.errors.note}
        onBlur={formik.handleBlur}
        type='string'
        disabled={disabled}
      />
      {formik.dirty && !formik.errors.note && <p className={styles.inputPrompt}>{t('notes_input_prompt')}</p>}
    </form>
  );
};
