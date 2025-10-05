/**
 * File Upload Card Component
 * Displays a card with file upload zone and file status
 */

import React from 'react';
import { useTranslation } from 'react-i18next';
import { FileText } from 'lucide-react';
import FileUploadZone from './FileUploadZone';

interface FileUploadCardProps {
  title: string;
  icon: React.ReactNode;
  titleColor: string;
  file: File | null;
  onFileUpload: (e: React.ChangeEvent<HTMLInputElement>) => void;
  acceptedTypes: string;
  uploadLabel: string;
  borderColor: string;
}

/**
 * FileUploadCard component
 */
const FileUploadCard: React.FC<FileUploadCardProps> = ({
  title,
  icon,
  titleColor,
  file,
  onFileUpload,
  acceptedTypes,
  uploadLabel,
  borderColor
}) => {
  const { t } = useTranslation();

  return (
    <div className="card bg-base-100 shadow-xl">
      <div className="card-body">
        <div className="flex items-center justify-between mb-4">
          <h2 className={`card-title ${titleColor}`}>
            {icon}
            {title}
          </h2>
        </div>

        <FileUploadZone
          onFileSelect={onFileUpload}
          acceptedTypes={acceptedTypes}
          label={uploadLabel}
          borderColor={borderColor}
        />

        {file && (
          <div className="alert alert-success mt-4">
            <FileText className="w-5 h-5" />
            <span className="text-sm">{file.name}</span>
          </div>
        )}
      </div>
    </div>
  );
};

export default FileUploadCard;
