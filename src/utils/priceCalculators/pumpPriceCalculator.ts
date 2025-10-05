/**
 * Pump Price Calculator
 * Calculates pump prices based on pump count and suction size
 */

import { normalizeCell, extractPriceFromRow } from '../fileProcessors/tableParser';
import { ERROR_MESSAGES, MIN_PRICE_THRESHOLD } from '../../constants';
import type { PriceCalculationResult } from '../../types';

/**
 * Determines pump header type based on pump count and row content
 */
const determineHeaderType = (pumpCount: string, rowStr: string): string | null => {
  switch (pumpCount) {
    case '1':
      if (rowStr.includes('1 pump') || rowStr.includes('pump headers')) {
        return '1 Pump Headers';
      }
      break;
    case '2':
      if (rowStr.includes('2')) {
        return rowStr.includes('1d/1s') ? '2 Pump 1D/1S' : '2 Pump 1D/1A';
      }
      break;
    case '3':
      if (rowStr.includes('3')) {
        return '3 Pump D/S/A';
      }
      break;
    case '4':
      if (rowStr.includes('4')) {
        return '4 Pump D/S/A/A';
      }
      break;
    default:
      return null;
  }
  return null;
};

/**
 * Checks if a row matches the suction size
 */
const matchesSuctionSize = (row: Array<string | number>, normalizedSize: string): boolean => {
  return row.some(cell => {
    const cellStr = normalizeCell(cell);
    return cellStr === normalizedSize || cellStr.includes(normalizedSize);
  });
};

/**
 * Calculates pump price based on table data
 */
export const calculatePumpPrice = (
  pumpTableData: Array<Array<string | number>>,
  pumpCount: string,
  suctionSize: string
): PriceCalculationResult => {
  // Validate inputs
  if (!pumpCount || !suctionSize) {
    return {
      success: false,
      error: ERROR_MESSAGES.PUMP_FIELDS_REQUIRED
    };
  }

  // Normalize suction size (remove special characters)
  const normalizedSize = suctionSize.trim().replace(/[Ø"]/g, '').trim();

  let foundRow: Array<string | number> | null = null;
  let headerType = '';

  // Search for matching row
  for (const row of pumpTableData) {
    const rowStr = row.map(cell => String(cell || '')).join(' ').toLowerCase();

    // Check if row matches suction size
    const hasSizeMatch = matchesSuctionSize(row, normalizedSize);

    if (hasSizeMatch) {
      // Determine header type based on pump count
      const detectedHeaderType = determineHeaderType(pumpCount, rowStr);

      if (detectedHeaderType) {
        foundRow = row;
        headerType = detectedHeaderType;
        break;
      }
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
          pumpCount,
          suctionSize: normalizedSize,
          headerType,
          basePrice: price,
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
