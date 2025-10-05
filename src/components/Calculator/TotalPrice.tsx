/**
 * Total Price Component
 * Displays the total calculated price with breakdown
 */

import React from 'react';
import { useTranslation } from 'react-i18next';

interface TotalPriceProps {
  totalPrice: number | null;
  pumpPrice: number | null;
  panelPrice: number | null;
  margin: string;
  setMargin: (value: string) => void;
  onExport: () => void;
}

/**
 * TotalPrice component
 */
const TotalPrice: React.FC<TotalPriceProps> = ({
  totalPrice,
  pumpPrice,
  panelPrice,
  margin,
  setMargin,
  onExport
}) => {
  const { t } = useTranslation();

  if (totalPrice === null) return null;

  const getPriceLabel = () => {
    if (pumpPrice && panelPrice) return t('calculator.total.both');
    if (pumpPrice) return t('calculator.total.pumpOnly');
    return t('calculator.total.panelOnly');
  };

  const marginValue = parseFloat(margin);
  const adjustedPrice = marginValue && marginValue > 0 ? totalPrice / marginValue : null;

  return (
    <div className="mt-6 space-y-4">
      {/* Margin Input */}
      <div className="p-4 bg-base-100 rounded-lg border-2 border-indigo-200">
        <label className="label">
          <span className="label-text font-semibold">
            {t('calculator.total.margin')} (Margin / الهامش)
          </span>
        </label>
        <input
          type="number"
          placeholder={t('calculator.total.marginPlaceholder')}
          className="input input-bordered w-full"
          value={margin}
          onChange={(e) => setMargin(e.target.value)}
          min="0"
          step="0.01"
        />
        <p className="text-xs text-gray-500 mt-1">
          {t('calculator.total.marginHint')}
        </p>
      </div>

      {/* Total Price Display */}
      <div className="p-6 bg-gradient-to-r from-green-500 to-emerald-600 rounded-xl shadow-lg">
        <div className="flex items-center justify-between text-white">
          <div>
            <p className="text-lg opacity-90">{t('calculator.total.title')}</p>
            <p className="text-sm opacity-75">{getPriceLabel()}</p>
          </div>
          <div className="text-left">
            <p className="text-5xl font-bold">{totalPrice.toFixed(2)}</p>
            <p className="text-xl opacity-90">{t('calculator.total.currency')}</p>
          </div>
        </div>

        {/* Price Breakdown */}
        {pumpPrice && panelPrice && (
          <div className="mt-4 pt-4 border-t border-white/30 text-white text-sm">
            <div className="flex justify-between">
              <span>{t('calculator.total.pumps')}:</span>
              <span className="font-semibold">{pumpPrice.toFixed(2)} {t('calculator.total.currency')}</span>
            </div>
            <div className="flex justify-between mt-1">
              <span>{t('calculator.total.panels')}:</span>
              <span className="font-semibold">{panelPrice.toFixed(2)} {t('calculator.total.currency')}</span>
            </div>
          </div>
        )}

        {/* Adjusted Price with Margin */}
        {adjustedPrice && (
          <div className="mt-4 pt-4 border-t border-white/30">
            <div className="flex items-center justify-between text-white">
              <div>
                <p className="text-sm opacity-75">{t('calculator.total.adjustedPrice')}</p>
                <p className="text-xs opacity-60">{t('calculator.total.afterMargin')} ({margin})</p>
              </div>
              <div className="text-left">
                <p className="text-3xl font-bold">{adjustedPrice.toFixed(2)}</p>
                <p className="text-sm opacity-90">{t('calculator.total.currency')}</p>
              </div>
            </div>
          </div>
        )}
      </div>

      {/* Export Button */}
      <button
        className="btn btn-primary w-full"
        onClick={onExport}
      >
        📊 {t('calculator.total.exportExcel')}
      </button>
    </div>
  );
};

export default TotalPrice;
