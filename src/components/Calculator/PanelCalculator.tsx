/**
 * Panel Calculator Component
 * Calculates electrical panel prices based on user inputs
 */

import React from 'react';
import { useTranslation } from 'react-i18next';
import { PANEL_TYPE_OPTIONS } from '../../constants';
import type { PanelDetails } from '../../types';

interface PanelCalculatorProps {
  panelPumpCount: string;
  setPanelPumpCount: (value: string) => void;
  motorPower: string;
  setMotorPower: (value: string) => void;
  panelType: string;
  setPanelType: (value: string) => void;
  onCalculate: () => void;
  calculatedPrice: number | null;
  details: PanelDetails | null;
}

/**
 * PanelCalculator component
 */
const PanelCalculator: React.FC<PanelCalculatorProps> = ({
  panelPumpCount,
  setPanelPumpCount,
  motorPower,
  setMotorPower,
  panelType,
  setPanelType,
  onCalculate,
  calculatedPrice,
  details
}) => {
  const { t } = useTranslation();

  return (
    <div className="border-2 border-purple-200 rounded-lg p-4 bg-purple-50 dark:bg-purple-900/20 dark:border-purple-800">
      <h3 className="font-bold text-lg text-purple-900 dark:text-purple-100 mb-4">
        {t('calculator.panel.title')}
      </h3>

      <div className="space-y-3">
        {/* Pump Count Input */}
        <div>
          <label className="label">
            <span className="label-text font-semibold">{t('calculator.panel.pumpCount')}</span>
          </label>
          <input
            type="number"
            placeholder={t('calculator.pump.selectCount')}
            className="input input-bordered w-full"
            value={panelPumpCount}
            onChange={(e) => setPanelPumpCount(e.target.value)}
            min="1"
          />
        </div>

        {/* Motor Power Input */}
        <div>
          <label className="label">
            <span className="label-text font-semibold">{t('calculator.panel.motorPower')}</span>
          </label>
          <input
            type="text"
            placeholder={t('calculator.panel.powerPlaceholder')}
            className="input input-bordered w-full"
            value={motorPower}
            onChange={(e) => setMotorPower(e.target.value)}
          />
        </div>

        {/* Panel Type Dropdown */}
        <div>
          <label className="label" htmlFor="panel-type">
            <span className="label-text font-semibold">{t('calculator.panel.panelType')}</span>
          </label>
          <select
            id="panel-type"
            className="select select-bordered w-full"
            value={panelType}
            onChange={(e) => setPanelType(e.target.value)}
          >
            <option value="">{t('calculator.panel.typePlaceholder')}</option>
            {PANEL_TYPE_OPTIONS.map(type => (
              <option key={type} value={type}>{type}</option>
            ))}
          </select>
        </div>

        {/* Calculate Button */}
        <button
          className="btn btn-secondary w-full"
          onClick={onCalculate}
        >
          {t('calculator.panel.calculate')}
        </button>
      </div>

      {/* Display Result */}
      {calculatedPrice !== null && details && (
        <div className="mt-4 p-3 bg-purple-100 dark:bg-purple-900/20 rounded-lg border-2 border-purple-300 dark:border-purple-700">
          <p className="text-sm text-gray-600 dark:text-gray-300">{details.panelType}</p>
          <p className="text-2xl font-bold text-purple-600 dark:text-purple-400">
            {calculatedPrice.toFixed(2)} {t('calculator.total.currency')}
          </p>
        </div>
      )}
    </div>
  );
};

export default PanelCalculator;
