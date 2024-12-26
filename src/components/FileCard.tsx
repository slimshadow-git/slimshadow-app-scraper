import React from 'react';
import { Download, Smartphone } from 'lucide-react';
import type { FileData } from '../types/api';
import { getAppNameAndVersion } from '../utils/appUtils';

interface FileCardProps {
  file: FileData;
}

export function FileCard({ file }: FileCardProps) {
  const { name, version } = getAppNameAndVersion(file.file_name);
  
  return (
    <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md p-4 hover:shadow-lg transition-shadow">
      <div className="flex flex-col gap-3">
        <div className="flex items-start gap-3">
          <Smartphone className="w-8 h-8 text-blue-600 dark:text-blue-400 flex-shrink-0" />
          <div className="flex-1 min-w-0">
            <h3 className="text-base font-medium text-gray-900 dark:text-gray-100">
              {name}
            </h3>
            <p className="text-sm text-gray-500 dark:text-gray-400">
              Version {version}
            </p>
          </div>
        </div>
        <a
          href={file.link}
          target="_blank"
          rel="noopener noreferrer"
          className="flex items-center gap-2 text-sm text-blue-600 dark:text-blue-400 hover:underline mt-2 group"
        >
          <Download className="w-4 h-4 group-hover:scale-110 transition-transform" />
          Download APK
        </a>
      </div>
    </div>
  );
}