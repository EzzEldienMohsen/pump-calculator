/**
 * Instructions Component
 * Displays usage instructions when no files are uploaded
 */

import React from 'react';
import { useTranslation } from 'react-i18next';
import { downloadTemplate } from '../utils/templateGenerator';

interface InstructionsProps {
  show: boolean;
}

/**
 * Instructions component
 */
const Instructions: React.FC<InstructionsProps> = ({ show }) => {
  const { t } = useTranslation();

  if (!show) return null;

  return (
    <div className="card bg-base-100 shadow-xl">
      <div className="card-body">
        <h2 className="card-title text-2xl text-indigo-900 dark:text-indigo-300">
          {t('instructions.title')}
        </h2>
        <ul className="list-disc list-inside space-y-2 text-gray-700 dark:text-gray-300">
          <li>{t('instructions.steps.step1')}</li>
          <li>{t('instructions.steps.step2')}</li>
          <li>{t('instructions.steps.step3')}</li>
          <li>{t('instructions.steps.step4')}</li>
          <li>{t('instructions.steps.step5')}</li>
        </ul>

        <div className="divider">{t('instructions.tableFormat')}</div>

        <div className="grid md:grid-cols-2 gap-4">
          <div className="bg-blue-50 dark:bg-blue-900/20 p-4 rounded-lg">
            <h3 className="font-bold text-blue-900 dark:text-blue-300 mb-2">
              {t('instructions.pumpTable.title')}
            </h3>
            <div className="text-sm space-y-1 text-gray-700 dark:text-gray-300">
              <p><strong>{t('instructions.pumpTable.columns')}</strong></p>
              <p>• {t('instructions.pumpTable.col1')}</p>
              <p>• {t('instructions.pumpTable.col2')}</p>
              <p>• {t('instructions.pumpTable.col3')}</p>
            </div>
          </div>

          <div className="bg-purple-50 dark:bg-purple-900/20 p-4 rounded-lg">
            <h3 className="font-bold text-purple-900 dark:text-purple-300 mb-2">
              {t('instructions.panelTable.title')}
            </h3>
            <div className="text-sm space-y-1 text-gray-700 dark:text-gray-300">
              <p><strong>{t('instructions.panelTable.columns')}</strong></p>
              <p>• {t('instructions.panelTable.col1')}</p>
              <p>• {t('instructions.panelTable.col2')}</p>
              <p>• {t('instructions.panelTable.col3')}</p>
              <p>• {t('instructions.panelTable.col4')}</p>
            </div>
          </div>
        </div>

        <div className="text-center mt-4">
          <button className="btn btn-outline btn-sm" onClick={downloadTemplate}>
            {t('instructions.downloadTemplate')}
          </button>
        </div>
      </div>
    </div>
  );
};

export default Instructions;
