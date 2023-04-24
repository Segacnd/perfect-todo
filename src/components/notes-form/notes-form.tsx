import { useFormik } from 'formik';
import { FC } from 'react';
import { FormInput } from '../../ui/inputs/default-input/form-tinput/form-input';

type NotesFormProps = {
  handleSubmit: (note: string) => void;
};

export const NotesForm: FC<NotesFormProps> = ({ handleSubmit }) => {
  const formik = useFormik({
    initialValues: {
      note: '',
    },
    onSubmit: (values) => {
      handleSubmit(values.note);
      formik.resetForm({ values: { note: '' } });
    },
  });
  return (
    <form autoComplete='off' onSubmit={formik.handleSubmit}>
      <FormInput
        placeholder='write a note'
        onChange={formik.handleChange}
        value={formik.values.note}
        name='note'
        errortext={formik.touched.note ? formik.errors.note : ''}
        onBlur={formik.handleBlur}
        type='string'
      />
    </form>
  );
};
