import { FC, useState, useEffect, useCallback, Dispatch, SetStateAction } from 'react';
import { Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import styles from './pages/register/register.module.css';
import { FileInput } from '../ui/inputs/default-input/file-input/file-input';
import { useAppDispatch, useAppSelector } from '../redux/store';

type FileComponentProps = {
  selectedFile: File | null;
  setSelectedFile: Dispatch<SetStateAction<File | null>>;
};

export const FileComponent: FC<FileComponentProps> = ({ selectedFile, setSelectedFile }) => {
  const { t } = useTranslation();
  const dispatch = useAppDispatch();
  const [previewUrl, setPreviewUrl] = useState<string | null>(null);
  const handlePreview = useCallback(() => {
    const reader = new FileReader();
    if (selectedFile) {
      reader.readAsDataURL(selectedFile);
      reader.onload = () => {
        setPreviewUrl(reader.result as string);
      };
    }
  }, [selectedFile]);
  const handleFileInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSelectedFile(event.target.files ? event.target.files[0] : null);
    console.log(selectedFile);
  };
  useEffect(() => {
    handlePreview();
  }, [handlePreview]);
  return (
    <>
      <FileInput handleFileInputChange={handleFileInputChange} previewUrl={previewUrl} />
    </>
  );
};
