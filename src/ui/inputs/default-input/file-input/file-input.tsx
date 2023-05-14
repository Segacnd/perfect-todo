import { FC, useId } from 'react';
import { t } from 'i18next';
import addPhotoSvg from '../../../../assets/add-photo.svg';
import styles from './file-input.module.css';

type FileInputProps = {
  handleFileInputChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
  previewUrl: string | null;
  name: string;
};

export const FileInput: FC<FileInputProps> = ({ handleFileInputChange, previewUrl, name }) => {
  const inputId = useId();
  return (
    <div className={styles.file}>
      <label htmlFor={inputId}>
        <img src={addPhotoSvg} alt='addPhoto' />
      </label>
      <input type='file' name={name} accept='.jpg, .jpeg, .png' id={inputId} onChange={handleFileInputChange} />
      {previewUrl ? (
        <>
          <span>your chosen photo:</span>
          <img src={previewUrl} alt='Preview' />
        </>
      ) : (
        <span>{t('choose_your_image')}</span>
      )}
    </div>
  );
};
