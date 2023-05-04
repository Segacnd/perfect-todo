import { FC, useState, useEffect, useCallback, Dispatch, SetStateAction } from 'react';
import { FileInput } from '../ui/inputs/default-input/file-input/file-input';

type FileComponentProps = {
  selectedFile: File | null;
  setSelectedFile: Dispatch<SetStateAction<File | null>>;
};

export const FileComponent: FC<FileComponentProps> = ({ selectedFile, setSelectedFile }) => {
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
