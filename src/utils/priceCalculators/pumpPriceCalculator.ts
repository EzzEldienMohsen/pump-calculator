/**
 * Pump Price Calculator
 * Calculates pump prices based on pump count and suction size
 */

import { normalizeCell, extractPriceFromRow, normalizeSizeValue } from '../fileProcessors/tableParser';
import { ERROR_MESSAGES, MIN_PRICE_THRESHOLD } from '../../constants';
import type { PriceCalculationResult } from '../../types';

/**
 * Determines pump header type based on pump count and row content
 */
const determineHeaderType = (pumpCount: string, rowStr: string, preferredType?: string): string | null => {
  // Create a regex pattern for flexible matching: "2" followed by optional space, then "pump" or "pmp"
  const createPumpPattern = (count: string) => {
    return new RegExp(`${count}\\s*(pump|pmp)`, 'i');
  };

  switch (pumpCount) {
    case '1':
      // More strict: must contain "1 pump" AND "header"
      if (createPumpPattern('1').test(rowStr) && rowStr.includes('header')) {
        return '1 Pump Headers';
      }
      break;
    case '2':
      // Must contain "2" followed by "pump" or "pmp"
      if (createPumpPattern('2').test(rowStr)) {
        if (preferredType) {
          // If user specified a preferred type, check if this row matches
          if (preferredType.includes('1D/1S') && rowStr.includes('1d/1s')) {
            return '2 Pump 1D/1S';
          }
          if (preferredType.includes('1D/1A') && rowStr.includes('1d/1a')) {
            return '2 Pump 1D/1A';
          }
        } else {
          // Auto-detect based on what's in the row
          if (rowStr.includes('1d/1s')) {
            return '2 Pump 1D/1S';
          }
          if (rowStr.includes('1d/1a')) {
            return '2 Pump 1D/1A';
          }
        }
      }
      break;
    case '3':
      // Must contain "3 pump" or "3pmp"
      if (createPumpPattern('3').test(rowStr)) {
        return '3 Pump D/S/A';
      }
      break;
    case '4':
      // Must contain "4 pump" or "4pmp"
      if (createPumpPattern('4').test(rowStr)) {
        return '4 Pump D/S/A/A';
      }
      break;
    default:
      return null;
  }
  return null;
};

/**
 * Checks if a row matches the suction size by comparing normalized decimal values
 */
const matchesSuctionSize = (row: Array<string | number>, normalizedSize: string): boolean => {
  return row.some(cell => {
    const cellStr = normalizeCell(cell);
    const cellNormalized = normalizeSizeValue(cellStr);
    return cellNormalized === normalizedSize;
  });
};

/**
 * Extracts all available pump sizes from the table
 */
const getAvailableSizes = (pumpTableData: Array<Array<string | number>>): string[] => {
  const sizes = new Set<string>();

  for (const row of pumpTableData) {
    for (const cell of row) {
      const cellStr = normalizeCell(cell);
      const normalized = normalizeSizeValue(cellStr);

      // Check if it looks like a size (between 0.5 and 10)
      const numValue = parseFloat(normalized);
      if (!isNaN(numValue) && numValue >= 0.5 && numValue <= 10) {
        sizes.add(normalized);
      }
    }
  }

  return Array.from(sizes).sort((a, b) => parseFloat(a) - parseFloat(b));
};

/**
 * Gets all available pump types for a given pump count
 */
export const getAvailablePumpTypes = (
  pumpTableData: Array<Array<string | number>>,
  pumpCount: string
): string[] => {
  const types = new Set<string>();

  for (const row of pumpTableData) {
    const rowStr = row.map(cell => String(cell || '')).join(' ').toLowerCase();
    const headerType = determineHeaderType(pumpCount, rowStr);

    console.log('🔍 Checking row for pump types:', {
      pumpCount,
      row,
      rowStr,
      detectedType: headerType
    });

    if (headerType) {
      types.add(headerType);
    }
  }

  console.log('✅ Available pump types for count', pumpCount, ':', Array.from(types));
  return Array.from(types);
};

/**
 * Finds column range for a pump type in header row
 */
const findPumpTypeColumns = (row: Array<string | number>, pumpCount: string): { start: number; end: number } | null => {
  const rowStr = row.map(cell => String(cell || '')).join(' ').toLowerCase();
  const headerType = determineHeaderType(pumpCount, rowStr);

  if (!headerType) return null;

  // Find the starting column index
  for (let i = 0; i < row.length; i++) {
    const cellStr = String(row[i] || '').toLowerCase();
    if (cellStr.includes(pumpCount) && (cellStr.includes('pump') || i + 1 < row.length && String(row[i + 1]).toLowerCase().includes('header'))) {
      // Found the start - now find the end (until next pump type or max 2 columns)
      let end = i;
      for (let j = i + 1; j < row.length && j <= i + 2; j++) {
        const nextCell = String(row[j] || '').toLowerCase();
        // Check for next pump type (handles typos like "PmP" instead of "Pump")
        if (nextCell.match(/[234]\s*(pump|pmp)/i)) {
          break; // Found next pump type
        }
        end = j;
      }
      return { start: i, end };
    }
  }
  return null;
};

/**
 * Calculates pump price based on table data
 */
export const calculatePumpPrice = (
  pumpTableData: Array<Array<string | number>>,
  pumpCount: string,
  suctionSize: string,
  pumpType?: string
): PriceCalculationResult => {
  // Validate inputs
  if (!pumpCount || !suctionSize) {
    return {
      success: false,
      error: ERROR_MESSAGES.PUMP_FIELDS_REQUIRED
    };
  }

  // Normalize suction size to decimal format (handles fractions and decimals)
  const normalizedSize = normalizeSizeValue(suctionSize);

  // Validate that the size exists in the table
  const availableSizes = getAvailableSizes(pumpTableData);
  if (!availableSizes.includes(normalizedSize)) {
    console.warn('❌ Invalid pump size:', {
      requestedSize: normalizedSize,
      availableSizes
    });
    return {
      success: false,
      error: `Invalid pump size "${suctionSize}". Available sizes: ${availableSizes.join(', ')}`
    };
  }

  let headerRowIndex = -1;
  let headerType = '';
  let columnRange: { start: number; end: number } | null = null;

  // Step 1: Find the header row with pump type
  for (let i = 0; i < pumpTableData.length; i++) {
    const row = pumpTableData[i];
    const rowStr = row.map(cell => String(cell || '')).join(' ').toLowerCase();

    const detectedHeaderType = determineHeaderType(pumpCount, rowStr, pumpType);
    if (detectedHeaderType) {
      // If pumpType is specified, only match that specific type
      if (pumpType && detectedHeaderType !== pumpType) {
        continue;
      }

      headerRowIndex = i;
      headerType = detectedHeaderType;
      columnRange = findPumpTypeColumns(row, pumpCount);
      console.log('📍 Found pump type header at row', i, ':', row, 'columns:', columnRange);
      break;
    }
  }

  // Step 2: If header found, look at subsequent rows for data
  if (headerRowIndex >= 0 && columnRange) {
    for (let i = headerRowIndex + 1; i < pumpTableData.length; i++) {
      const dataRow = pumpTableData[i];

      // Check if this data row has the suction size or header in the column range
      // Typically: [size, price, header] in a 3-column section
      let foundMatch = false;
      let matchedColumn = -1;

      for (let col = columnRange.start; col <= columnRange.end && col < dataRow.length; col++) {
        const cellStr = normalizeCell(dataRow[col]);
        const cellNormalized = normalizeSizeValue(cellStr);

        console.log('🔍 Checking cell:', {
          col,
          cellOriginal: dataRow[col],
          cellStr,
          cellNormalized,
          targetSize: normalizedSize,
          match: cellNormalized === normalizedSize
        });

        if (cellNormalized === normalizedSize) {
          foundMatch = true;
          matchedColumn = col;
          break;
        }
      }

      if (foundMatch) {
        // Found the suction size or header! Extract price from this section only (typically 3 columns: size, price, header)
        const sectionEnd = Math.min(columnRange.start + 3, dataRow.length);
        const relevantCells = dataRow.slice(columnRange.start, sectionEnd);
        const price = extractPriceFromRow(relevantCells, MIN_PRICE_THRESHOLD);

        console.log('✅ Pump Match Found:', {
          pumpCount,
          suctionSize: normalizedSize,
          headerType,
          matchedColumn,
          headerRow: pumpTableData[headerRowIndex],
          dataRow,
          relevantCells,
          extractedPrice: price
        });

        if (price !== null) {
          return {
            success: true,
            price,
            details: {
              pumpCount,
              suctionSize: normalizedSize,
              headerType,
              basePrice: price,
              rowData: dataRow
            }
          };
        }
      }
    }
  }

  console.warn('❌ No pump match found for:', {
    pumpCount,
    suctionSize: normalizedSize,
    availableSizes
  });

  // No match found
  return {
    success: false,
    error: `${ERROR_MESSAGES.NO_MATCH_FOUND}. Available sizes: ${availableSizes.join(', ')}`
  };
};
