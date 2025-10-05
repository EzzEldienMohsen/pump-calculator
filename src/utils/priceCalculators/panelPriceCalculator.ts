/**
 * Panel Price Calculator
 * Calculates electrical panel prices based on pump count, motor power, and panel type
 */

import { extractPriceFromRow } from '../fileProcessors/tableParser';
import { ERROR_MESSAGES, MIN_PRICE_THRESHOLD } from '../../constants';
import type { PriceCalculationResult } from '../../types';

/**
 * Checks if row matches motor power
 */
const matchesMotorPower = (row: Array<string | number>, motorPower: string): boolean => {
  const motorStr = motorPower.toLowerCase().replace(/[^0-9.]/g, '');
  return row.some(cell => {
    const cellStr = String(cell || '').toLowerCase().replace(/[^0-9.]/g, '');
    return cellStr === motorStr;
  });
};

/**
 * Calculates panel price based on table data
 */
export const calculatePanelPrice = (
  panelTableData: Array<Array<string | number>>,
  panelPumpCount: string,
  motorPower: string,
  panelType: string
): PriceCalculationResult => {
  // Validate inputs
  if (!panelPumpCount || !motorPower || !panelType) {
    return {
      success: false,
      error: ERROR_MESSAGES.PANEL_FIELDS_REQUIRED
    };
  }

  let foundRow: Array<string | number> | null = null;

  // Search for matching row
  for (const row of panelTableData) {
    const rowStr = row.map(cell => String(cell || '')).join(' ').toLowerCase();

    // Check if row matches pump count
    const hasPumpCount = rowStr.includes(panelPumpCount);

    // Check if row matches motor power
    const hasMotorPower = matchesMotorPower(row, motorPower);

    // Check if row matches panel type
    const hasPanelType = rowStr.includes(panelType.toLowerCase());

    // If all conditions match, we found the row
    if (hasPumpCount && hasMotorPower && hasPanelType) {
      foundRow = row;
      break;
    }
  }

  // If matching row found, extract price
  if (foundRow) {
    const price = extractPriceFromRow(foundRow, MIN_PRICE_THRESHOLD);

    if (price !== null) {
      return {
        success: true,
        price,
        details: {
          panelPumpCount,
          motorPower,
          panelType,
          price,
          rowData: foundRow
        }
      };
    } else {
      return {
        success: false,
        error: ERROR_MESSAGES.NO_PRICE_FOUND
      };
    }
  }

  // No match found
  return {
    success: false,
    error: ERROR_MESSAGES.NO_MATCH_FOUND
  };
};
