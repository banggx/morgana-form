import Image from 'next/image';
import { useMemo } from 'react';

interface FileItemProps {
  isImage: boolean;
  url: string;
  name: string;
}
export function FileItem({ isImage, url, name }: FileItemProps) {
  return isImage 
    ? <img src={url} alt={name} className='w-full h-full object-cover' />
    : <Image src='/unknown-file.png' alt='' width={100} height={100} />
}

export function LocalFileItem({ file }: { file: File }) {
  const isImage = file.type.startsWith('image/');
  const url = useMemo(() => {
    if (isImage) {
      return URL.createObjectURL(file);
    }
    return '';
  }, [isImage, file]);
  
  return <FileItem url={url} isImage={isImage} name={file.name} />
}