/**
 * Pump Calculator Component
 * Calculates pump prices based on user inputs
 */

import React from 'react';
import { useTranslation } from 'react-i18next';
import type { PumpDetails } from '../../types';

interface PumpCalculatorProps {
  pumpCount: string;
  setPumpCount: (value: string) => void;
  suctionSize: string;
  setSuctionSize: (value: string) => void;
  onCalculate: () => void;
  calculatedPrice: number | null;
  details: PumpDetails | null;
}

/**
 * PumpCalculator component
 */
const PumpCalculator: React.FC<PumpCalculatorProps> = ({
  pumpCount,
  setPumpCount,
  suctionSize,
  setSuctionSize,
  onCalculate,
  calculatedPrice,
  details
}) => {
  const { t } = useTranslation();

  return (
    <div className="border-2 border-blue-200 rounded-lg p-4 bg-blue-50 dark:bg-blue-900/20 dark:border-blue-800">
      <h3 className="font-bold text-lg text-blue-900 dark:text-blue-100 mb-4">
        {t('calculator.pump.title')}
      </h3>

      <div className="space-y-3">
        {/* Pump Count Input */}
        <div>
          <label className="label">
            <span className="label-text font-semibold">{t('calculator.pump.pumpCount')}</span>
          </label>
          <input
            type="number"
            placeholder={t('calculator.pump.selectCount')}
            className="input input-bordered w-full"
            value={pumpCount}
            onChange={(e) => setPumpCount(e.target.value)}
            min="1"
          />
        </div>

        {/* Suction Size Input */}
        <div>
          <label className="label">
            <span className="label-text font-semibold">{t('calculator.pump.suctionSize')}</span>
          </label>
          <input
            type="text"
            placeholder={t('calculator.pump.suctionPlaceholder')}
            className="input input-bordered w-full"
            value={suctionSize}
            onChange={(e) => setSuctionSize(e.target.value)}
          />
        </div>

        {/* Calculate Button */}
        <button
          className="btn btn-primary w-full"
          onClick={onCalculate}
        >
          {t('calculator.pump.calculate')}
        </button>
      </div>

      {/* Display Result */}
      {calculatedPrice !== null && details && (
        <div className="mt-4 p-3 bg-green-50 dark:bg-green-900/20 rounded-lg border-2 border-green-300 dark:border-green-700">
          <p className="text-sm text-gray-600 dark:text-gray-300">{details.headerType}</p>
          <p className="text-2xl font-bold text-green-600 dark:text-green-400">
            {calculatedPrice.toFixed(2)} {t('calculator.total.currency')}
          </p>
        </div>
      )}
    </div>
  );
};

export default PumpCalculator;
