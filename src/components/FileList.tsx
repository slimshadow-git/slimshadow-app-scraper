import React from 'react';
import { FileCard } from './FileCard';
import type { FileData } from '../types/api';

interface FileListProps {
  files: FileData[];
}

export function FileList({ files }: FileListProps) {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
      {files.map((file, index) => (
        <FileCard 
          key={`${file.file_name}-${file.link}-${index}`} 
          file={file} 
        />
      ))}
    </div>
  );
}