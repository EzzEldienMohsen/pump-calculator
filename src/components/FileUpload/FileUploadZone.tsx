/**
 * File Upload Zone Component
 * Provides a drag-and-drop file upload interface
 */

import React from 'react';
import { useTranslation } from 'react-i18next';
import { Upload } from 'lucide-react';

interface FileUploadZoneProps {
  onFileSelect: (e: React.ChangeEvent<HTMLInputElement>) => void;
  acceptedTypes: string;
  label: string;
  borderColor?: string;
}

/**
 * FileUploadZone component
 */
const FileUploadZone: React.FC<FileUploadZoneProps> = ({
  onFileSelect,
  acceptedTypes,
  label,
  borderColor = 'border-blue-300 hover:border-blue-500'
}) => {
  const { t } = useTranslation();

  return (
    <div className="flex items-center justify-center w-full">
      <label className={`flex flex-col items-center justify-center w-full h-32 border-2 border-dashed rounded-lg cursor-pointer bg-gray-50 dark:bg-gray-800 hover:bg-gray-100 dark:hover:bg-gray-700 ${borderColor} transition-all`}>
        <div className="flex flex-col items-center justify-center pt-5 pb-6">
          <Upload className={`w-8 h-8 mb-2 ${borderColor.includes('blue') ? 'text-blue-500' : 'text-purple-500'}`} />
          <p className="text-sm text-gray-700 dark:text-gray-300 font-semibold">{label}</p>
          <p className="text-xs text-gray-500 dark:text-gray-400">{t('fileUpload.fileTypes')}</p>
        </div>
        <input
          type="file"
          className="hidden"
          accept={acceptedTypes}
          onChange={onFileSelect}
        />
      </label>
    </div>
  );
};

export default FileUploadZone;
